import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ResumeViewer } from "@/components/resume/ResumeViewer";

export const metadata: Metadata = {
  title: "Resume — Khushal Midha (IIIT Lucknow)",
  description:
    "View the verified on-campus and specialized engineering resumes of Khushal Midha (B.Tech CS & AI, IIIT Lucknow, CGPA: 8.72/10) with SDE internship experience, CP credentials, and flagship projects.",
};

export default function ResumePage() {
  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
      <section style={{ padding: "3rem 0 5rem" }}>
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
          <div style={{ marginBottom: "2.5rem" }}>
            <div className="section-label">Verified Curriculum Vitae</div>
            <h1
              className="section-heading"
              style={{ marginBottom: "0.75rem", fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Resume & Credentials
            </h1>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.0625rem",
                maxWidth: "680px",
                lineHeight: 1.7,
              }}
            >
              Direct in-browser interactive preview of my on-campus resume, along with role-specialized
              variations for Backend Systems, Machine Learning, and Quantitative Trading.
            </p>
          </div>

          {/* Interactive Viewer */}
          <ResumeViewer />
        </div>
      </section>
    </div>
  );
}
