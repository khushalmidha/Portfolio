import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { ProjectsCatalogue } from "@/components/sections/ProjectsCatalogue";

export const metadata: Metadata = {
  title: "All Projects & Repositories — Khushal Midha",
  description:
    "Comprehensive directory of all software engineering, quant trading, AI/ML, and security systems built by Khushal Midha (IIIT Lucknow).",
};

export default function AllProjectsPage() {
  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
      <section
        style={{
          padding: "3rem 0 5rem",
        }}
      >
        <div className="container-wide">
          {/* Breadcrumb */}
          <div style={{ marginBottom: "2rem" }}>
            <Link
              href="/"
              className="btn btn-ghost"
              style={{
                fontSize: "0.8125rem",
                padding: "0.4rem 0.75rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <ArrowLeft size={14} /> Back to Home
            </Link>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: "3rem" }}>
            <div className="section-label">Complete Archive</div>
            <h1
              className="section-heading"
              style={{ marginBottom: "1rem", fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              All Projects & Repositories
            </h1>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.0625rem",
                maxWidth: "680px",
                lineHeight: 1.7,
              }}
            >
              A complete, verified index of 23 software engineering builds, distributed systems,
              algorithmic trading engines, and machine learning models — complete with live demo
              deployments and source code.
            </p>
          </div>

          {/* Catalogue */}
          <ProjectsCatalogue />
        </div>
      </section>
    </div>
  );
}
