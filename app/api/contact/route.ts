/**
 * Contact form API route (POST /api/contact).
 * Security-critical: layered guards run in order before any email is sent —
 *   1. Origin allowlist (own domains + *.vercel.app previews) -> 403.
 *   2. In-memory per-IP rate limit (5/min) -> 429.
 *   3. JSON body parse + shape check -> 400.
 *   4. Honeypot field (company_website): silently 200 if filled (trap bots).
 *   5. Field type/presence validation -> 400.
 *   6. Length caps + email regex + min message length -> 400.
 *   7. Resend send to tom@opsgs.com with replyTo = submitter's email; HTML is escaped.
 * Note: the rate limiter is in-memory, so it resets on cold start and is
 * per-instance only (not shared across serverless lambdas).
 */
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Origin allowlist — only accept form POSTs that originate from our own site.
// MUST include the canonical www, the bare apex, and Vercel preview deploys
// (*.vercel.app). Omitting any of these would 403 legitimate submissions.
const ALLOWED_ORIGINS = new Set([
  "https://www.opsgs.com",
  "https://opsgs.com",
]);

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.has(origin)) return true;
  try {
    return new URL(origin).hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

// In-memory rate limiter — RATE_LIMIT submissions per IP per RATE_WINDOW_MS.
// NOTE: in-memory means per-instance and non-durable on serverless (it resets
// on cold start and is not shared across lambdas), so treat it as a cheap
// first-layer speed bump, NOT the real boundary. The durable rate limit should
// live at the platform edge (e.g. a Vercel WAF rule on /api/contact), which
// also can't be bypassed by spoofing x-forwarded-for. See SECURITY.md.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;
const RATE_MAP_MAX = 5_000;
const _rateMap = new Map<string, { n: number; reset: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  // Lazy sweep: when the map grows large, drop expired entries so a stream of
  // distinct IPs over a warm instance's lifetime can't grow it without bound.
  if (_rateMap.size > RATE_MAP_MAX) {
    for (const [key, entry] of _rateMap) {
      if (now > entry.reset) _rateMap.delete(key);
    }
  }

  const entry = _rateMap.get(ip);
  if (!entry || now > entry.reset) {
    _rateMap.set(ip, { n: 1, reset: now + RATE_WINDOW_MS });
    return false;
  }
  if (entry.n >= RATE_LIMIT) return true;
  entry.n++;
  return false;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: Request) {
  const headersList = await headers();

  // Reject submissions that don't originate from one of our own domains.
  if (!isAllowedOrigin(headersList.get("origin"))) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  // Rate limit: client IP from x-forwarded-for (first hop); 5 requests/IP/minute.
  const ip = headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests. Please wait a minute." }, { status: 429 });
  }
  // Parse JSON body; malformed JSON yields null (caught) and is rejected below.
  const body = await req.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message } = body as Record<string, unknown>;

  // Honeypot: a hidden field real users never see. Bots fill it; if populated
  // we silently accept (200) without sending, so the bot can't detect the trap.
  const honeypot = (body as Record<string, unknown>).company_website;
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  // Field validation: all three must be strings...
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  // ...and non-empty once trimmed.
  if (!name.trim() || !email.trim() || !message.trim()) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  // Length caps: bound payload size to prevent abuse (email cap = RFC 5321 max).
  if (name.length > 100 || email.length > 254 || message.length > 5000) {
    return NextResponse.json(
      { error: "One or more fields exceed the maximum allowed length." },
      { status: 400 }
    );
  }

  // Email format check.
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  // Require a minimally substantive message.
  if (message.trim().length < 10) {
    return NextResponse.json(
      { error: "Message must be at least 10 characters." },
      { status: 400 }
    );
  }

  // Require server-side API key; missing config is a 500, not a client error.
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  // Send via Resend. replyTo = submitter so Tom can reply directly; HTML body
  // is escapeHtml()'d to prevent injection (newlines -> <br /> for readability).
  const { error } = await resend.emails.send({
    from: "OPS GS Website <contact@opsgs.com>",
    to: "tom@opsgs.com",
    replyTo: email,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      <hr />
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
