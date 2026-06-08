# Security Policy

## Reporting a vulnerability

If you find a security issue, please email **tom@opsgs.com** with the details
instead of opening a public issue. I aim to acknowledge reports within a few
business days.

## Scope

This repository is a static marketing site (Next.js, App Router) with a single
server endpoint: a contact form (`app/api/contact/route.ts`) that relays a
message via Resend. There is no user database, no authentication, and no stored
personal data.

## Posture

- Secrets (e.g. the Resend API key) are provided through host environment
  variables only. None are committed to this repository.
- Security headers and a Content-Security-Policy are set in `next.config.ts`.
- The contact endpoint validates and length-caps input, escapes the email body,
  uses an origin allowlist, and includes a honeypot. Durable rate limiting is
  enforced at the hosting edge rather than in application memory.
