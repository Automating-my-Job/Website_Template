"use client";

/**
 * Contact section with an animated form / success-state swap.
 *
 * Reusable across pages via the `content` prop (defaults to CONTACT, the hire
 * copy). The /services page passes SERVICE.contact so the same form serves the
 * free-build intake with its own copy. `showLinkedIn` hides the LinkedIn link
 * on the services page (it is a hire signal).
 *
 * Submit flow: handleSubmit POSTs the form JSON to /api/contact, then drives a
 * status state machine ("idle" -> "submitting" -> "success" | "error"). On a
 * non-ok response the server's `error` message is surfaced inline; network
 * failures show a generic message. On success the form is replaced (via
 * AnimatePresence) by a confirmation card.
 *
 * Spam protection: a visually-hidden honeypot field (`company_website`) is sent
 * along with the real fields; bots that fill it are silently dropped server-side.
 */

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { LinkedInIcon } from "@/components/icons";
import { CONTACT, SITE } from "@/lib/content";
import { EASE } from "@/lib/motion";

type Status = "idle" | "submitting" | "success" | "error";
type ContactContent = typeof CONTACT;

export function Contact({
  content = CONTACT,
  showLinkedIn = true,
}: {
  content?: ContactContent;
  showLinkedIn?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "", company_website: "" });

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  // Status state machine: idle -> submitting -> success | error.
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-edge bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-quaternary transition-colors focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20";

  return (
    <section id="contact" className="relative scroll-mt-24 bg-surface-100 py-24 md:py-32">
      <div className="container">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="text-center">
            <span className="eyebrow">{content.eyebrow}</span>
            <h2 className="mt-4 text-balance text-display-lg text-ink">{content.headline}</h2>
            <p className="mt-4 text-ink-secondary">{content.subhead}</p>
            {showLinkedIn && SITE.linkedin && (
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-600"
              >
                <LinkedInIcon size={15} />
                Connect on LinkedIn
              </a>
            )}
          </div>

          {/* Form / Success state */}
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-accent/20 bg-accent-light p-12 text-center"
              >
                <CheckCircle2 size={40} className="text-accent" />
                <h3 className="text-xl font-medium text-ink">{content.success.title}</h3>
                <p className="text-ink-secondary">{content.success.body}</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                onSubmit={handleSubmit}
                noValidate
                className="mt-12 flex flex-col gap-5"
              >
                {/* Honeypot: hidden from real users; bots that fill it are dropped server-side */}
                <div
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
                >
                  <label htmlFor="contact-company-website">Company website</label>
                  <input
                    id="contact-company-website"
                    type="text"
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.company_website}
                    onChange={(e) => update("company_website", e.target.value)}
                  />
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-xs font-medium text-ink-tertiary">
                    {content.fields.name.label}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder={content.fields.name.placeholder}
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={inputClass}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-xs font-medium text-ink-tertiary">
                    {content.fields.email.label}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder={content.fields.email.placeholder}
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={inputClass}
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-xs font-medium text-ink-tertiary">
                    {content.fields.message.label}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    placeholder={content.fields.message.placeholder}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    className={inputClass}
                    style={{ resize: "vertical" }}
                  />
                </div>

                {/* Error message */}
                <AnimatePresence>
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600"
                    >
                      <AlertCircle size={16} className="shrink-0" />
                      {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-primary mt-2 justify-center disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    "Sending…"
                  ) : (
                    <>
                      {content.fields.submit}
                      <Send size={15} />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
