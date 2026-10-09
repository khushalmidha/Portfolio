"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X, FileText, ExternalLink } from "lucide-react";
import { profile } from "@/lib/content/profile";

const navLinks = [
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/coding", label: "Coding" },
  { href: "/#achievements", label: "Achievements" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on route change / resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`nav-bar ${scrolled ? "scrolled" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-wide" style={{ display: "flex", alignItems: "center", width: "100%", gap: "2rem" }}>
          {/* Logo */}
          <Link href="/" className="nav-logo" onClick={() => setMobileOpen(false)}>
            Khushal Midha
          </Link>

          {/* Desktop links */}
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "0.25rem", flex: 1, justifyContent: "center" }}>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginLeft: "auto" }}>
            <a
              href={profile.resume}
              download
              className="btn btn-secondary"
              style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}
              aria-label="Download resume"
            >
              <FileText size={14} />
              Resume
            </a>
            <button
              onClick={toggle}
              className="btn btn-ghost"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              style={{ padding: "0.5rem" }}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          {/* Mobile actions */}
          <div className="show-mobile" style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginLeft: "auto" }}>
            <button
              onClick={toggle}
              className="btn btn-ghost"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              style={{ padding: "0.5rem" }}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="btn btn-ghost"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              style={{ padding: "0.5rem" }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="mobile-menu-overlay show-mobile"
          aria-label="Mobile navigation"
        >
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                onClick={() => setMobileOpen(false)}
                style={{ fontSize: "1.25rem", padding: "0.875rem 0.75rem" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div style={{ marginTop: "2rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
            <a
              href={profile.resume}
              download
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => setMobileOpen(false)}
            >
              <FileText size={16} />
              Download Resume
            </a>
          </div>
          <div style={{ marginTop: "auto", paddingTop: "2rem" }}>
            <div style={{ display: "flex", gap: "1rem" }}>
              <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: "0.8125rem" }}>
                GitHub <ExternalLink size={12} />
              </a>
              <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: "0.8125rem" }}>
                LinkedIn <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
