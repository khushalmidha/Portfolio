import Link from "next/link";
import { profile } from "@/lib/content/profile";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg-secondary)",
        padding: "3rem 0 2rem",
      }}
    >
      <div className="container-wide" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
              }}
            >
              K<span style={{ color: "var(--accent)" }}>.</span>Midha
            </div>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.875rem",
                lineHeight: 1.6,
                maxWidth: "280px",
              }}
            >
              CS & AI undergraduate at IIIT Lucknow. Building systems, solving hard problems.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "1rem",
              }}
            >
              Navigate
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { href: "/#projects", label: "Projects" },
                { href: "/#experience", label: "Experience" },
                { href: "/coding", label: "Coding" },
                { href: "/#achievements", label: "Achievements" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  className="footer-link"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Profiles */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "1rem",
              }}
            >
              Profiles
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                { href: profile.social.github, label: "GitHub" },
                { href: profile.social.linkedin, label: "LinkedIn" },
                { href: profile.social.codeforces, label: "Codeforces" },
                { href: profile.social.codechef, label: "CodeChef" },
                { href: profile.social.leetcode, label: "LeetCode" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.875rem",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    transition: "color 0.2s",
                  }}
                  className="footer-link"
                >
                  {link.label}
                  <ExternalLink size={10} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "1rem",
              }}
            >
              Contact
            </div>
            <a
              href={`mailto:${profile.contact.email}`}
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.875rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                transition: "color 0.2s",
              }}
              className="footer-link"
            >
              <Mail size={13} />
              {profile.contact.email}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          <span style={{ color: "var(--text-muted)", fontSize: "0.8125rem" }}>
            © {year} {profile.name}. Built with Next.js & Tailwind CSS.
          </span>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              aria-label="GitHub profile"
              style={{ padding: "0.375rem" }}
            >
              <Github size={16} />
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              aria-label="LinkedIn profile"
              style={{ padding: "0.375rem" }}
            >
              <Linkedin size={16} />
            </a>
            <a
              href={`mailto:${profile.contact.email}`}
              className="btn btn-ghost"
              aria-label="Send email"
              style={{ padding: "0.375rem" }}
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link:hover { color: var(--text-accent) !important; }
      `}</style>
    </footer>
  );
}
