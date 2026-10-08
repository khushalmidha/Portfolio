"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Download, Mail, ChevronRight } from "lucide-react";
import { profile } from "@/lib/content/profile";

export function HeroSection() {
  const [focus, setFocus] = useState<"engineering" | "algorithms">("engineering");

  return (
    <section
      id="hero"
      aria-label="Introduction"
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      {/* Accent glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "20%",
          right: "-10%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(163,230,197,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container-wide" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "900px" }}>
          {/* Focus selector */}
          <div style={{ marginBottom: "2.5rem" }}>
            <div className="focus-selector" role="group" aria-label="Content focus">
              <button
                className={focus === "engineering" ? "active" : ""}
                onClick={() => setFocus("engineering")}
                aria-pressed={focus === "engineering"}
              >
                Engineering
              </button>
              <button
                className={focus === "algorithms" ? "active" : ""}
                onClick={() => setFocus("algorithms")}
                aria-pressed={focus === "algorithms"}
              >
                Algorithms
              </button>
            </div>
          </div>

          {/* Headline */}
          <h1
            className="display-xl animate-fade-up"
            style={{ marginBottom: "1.5rem" }}
          >
            {profile.headline}
          </h1>

          {/* Supporting copy */}
          <p
            className="animate-fade-up delay-100"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: "680px",
              marginBottom: "1rem",
            }}
          >
            {profile.subheadline}
          </p>

          {focus === "engineering" && (
            <p
              className="animate-fade-up delay-200"
              style={{
                fontSize: "0.9375rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                maxWidth: "600px",
                marginBottom: "2rem",
              }}
            >
              I&apos;m seeking{" "}
              {profile.lookingFor.join(", ")} — where I can contribute to substantial
              engineering challenges from day one.
            </p>
          )}

          {focus === "algorithms" && (
            <p
              className="animate-fade-up delay-200"
              style={{
                fontSize: "0.9375rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
                maxWidth: "600px",
                marginBottom: "2rem",
              }}
            >
              My competitive programming background spans 3000+ problems across
              Codeforces and LeetCode — with consistent performance in rated contests
              including ICPC, Meta Hacker Cup, and Adobe GenSolve.
            </p>
          )}

          {/* CTA buttons */}
          <div
            className="animate-fade-up delay-300"
            style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", marginBottom: "3.5rem" }}
          >
            <Link href="/#projects" className="btn btn-primary">
              View Projects <ArrowRight size={15} />
            </Link>
            <a href={profile.resume} download className="btn btn-secondary">
              <Download size={15} />
              Download Resume
            </a>
            <a href={`mailto:${profile.contact.email}`} className="btn btn-secondary">
              <Mail size={15} />
              Contact Me
            </a>
          </div>

          {/* Evidence row */}
          <div
            className="animate-fade-up delay-400"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              paddingTop: "2rem",
              borderTop: "1px solid var(--border)",
            }}
            role="list"
            aria-label="Credentials at a glance"
          >
            {profile.evidenceRow.map((item) => (
              <div
                key={item.label}
                role="listitem"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.125rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 600,
                    fontSize: "0.9375rem",
                    color: "var(--text-accent)",
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                  }}
                >
                  {item.sub}
                </span>
              </div>
            ))}
          </div>

          {/* Scroll cue */}
          <div
            className="animate-fade-up delay-500"
            style={{ marginTop: "4rem" }}
          >
            <Link
              href="/#projects"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "var(--text-muted)",
                fontSize: "0.8125rem",
                fontFamily: "var(--font-mono)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              aria-label="Scroll to projects section"
            >
              Scroll to projects <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
