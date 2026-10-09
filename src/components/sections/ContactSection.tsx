"use client";

import { useState } from "react";
import { Copy, Check, Mail, Github, Linkedin, ExternalLink, FileText } from "lucide-react";
import { profile } from "@/lib/content/profile";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section"
    >
      <div className="container-narrow">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>
            Get In Touch
          </div>
          <h2 id="contact-heading" className="section-heading" style={{ marginBottom: "1.25rem" }}>
            Contact
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.0625rem",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            I&apos;m actively looking for SDE, SWE, backend engineering, and quant developer
            opportunities. If you have something interesting, let&apos;s talk.
          </p>
        </div>

        {/* Contact card */}
        <div
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-xl)",
            padding: "2.5rem",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {/* Email primary */}
          <div style={{ marginBottom: "2rem" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--text-muted)",
                marginBottom: "0.625rem",
              }}
            >
              Email
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                flexWrap: "wrap",
              }}
            >
              <a
                href={`mailto:${profile.contact.email}`}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "var(--text-accent)",
                  textDecoration: "none",
                  flex: 1,
                  minWidth: "200px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
                aria-label="Send email"
              >
                <Mail size={16} />
                {profile.contact.email}
              </a>
              <button
                onClick={copyEmail}
                className="btn btn-secondary"
                style={{ padding: "0.5rem 0.875rem", fontSize: "0.8125rem" }}
                aria-label={copied ? "Email copied!" : "Copy email address"}
              >
                {copied ? (
                  <>
                    <Check size={13} /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={13} /> Copy
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="divider" style={{ marginBottom: "2rem" }} />

          {/* Social links */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--text-muted)",
                marginBottom: "1rem",
              }}
            >
              Profiles
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {[
                {
                  label: "GitHub",
                  href: profile.social.github,
                  icon: <Github size={15} />,
                  sub: "@khushalmidha",
                },
                {
                  label: "LinkedIn",
                  href: profile.social.linkedin,
                  icon: <Linkedin size={15} />,
                  sub: "Khushal Midha",
                },
                {
                  label: "Codeforces",
                  href: profile.social.codeforces,
                  icon: <ExternalLink size={15} />,
                  sub: "Expert · 1809",
                },
                {
                  label: "LeetCode",
                  href: profile.social.leetcode,
                  icon: <ExternalLink size={15} />,
                  sub: "Guardian · 2137",
                },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.625rem 0.875rem",
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    textDecoration: "none",
                    transition: "border-color 0.2s, background 0.2s",
                    color: "var(--text-secondary)",
                  }}
                  className="contact-profile-link"
                >
                  <span style={{ color: "var(--text-muted)" }}>{link.icon}</span>
                  <span style={{ fontWeight: 500, fontSize: "0.875rem", color: "var(--text-primary)" }}>
                    {link.label}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {link.sub}
                  </span>
                  <ExternalLink size={11} style={{ marginLeft: "auto", opacity: 0.5 }} />
                </a>
              ))}
            </div>
          </div>

          <div className="divider" style={{ margin: "2rem 0" }} />

          {/* Resume download */}
          <a
            href={profile.resume}
            download
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
            aria-label="Download resume PDF"
          >
            <FileText size={15} />
            Download Resume (PDF)
          </a>
        </div>
      </div>

      <style>{`
        .contact-profile-link:hover {
          border-color: var(--border-accent) !important;
          background: var(--accent-dim) !important;
          color: var(--text-primary) !important;
        }
      `}</style>
    </section>
  );
}
