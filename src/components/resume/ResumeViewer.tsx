"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  ExternalLink,
  ArrowLeft,
  Maximize2,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Award,
} from "lucide-react";
import { profile } from "@/lib/content/profile";

type ResumeTrack = {
  id: string;
  name: string;
  label: string;
  pdfPath: string;
  badge: string;
  summary: string;
};

const RESUME_TRACKS: ResumeTrack[] = [
  {
    id: "oncampus",
    name: "On-Campus Resume",
    label: "On-Campus (General SDE)",
    pdfPath: "/resume/Oncampus_Resume.pdf",
    badge: "Primary Verified",
    summary:
      "Comprehensive on-campus resume highlighting MediPulse, Jagrit, IIITLBachat, Coffeee.io internship, and competitive programming achievements.",
  },
  {
    id: "backend",
    name: "Backend & Systems",
    label: "Backend & Systems",
    pdfPath: "/resume/backend.pdf",
    badge: "Systems & Cloud",
    summary:
      "Focuses on distributed backend architectures (Kafka, Redis, WebRTC), MediPulse, IIITLBachat, and TriageAgent with LiteLLM.",
  },
  {
    id: "ml",
    name: "Machine Learning / AI",
    label: "AI & Machine Learning",
    pdfPath: "/resume/MLresume.pdf",
    badge: "AI & ML",
    summary:
      "Highlights PyTorch, GNNs, Transformers, XGBoost, ThreatGraph incident response, and Amazon ML School credentials.",
  },
  {
    id: "quant",
    name: "Quant Developer",
    label: "Quant & Low-Latency",
    pdfPath: "/resume/Quant_Resume.pdf",
    badge: "Quant & C++",
    summary:
      "Emphasizes deterministic C++ order books, Avellaneda-Stoikov market making, QuantDesk, and high-frequency algorithms.",
  },
  {
    id: "rubrik",
    name: "Distributed Security",
    label: "Distributed & Security",
    pdfPath: "/resume/Rubrik.pdf",
    badge: "Security & Scale",
    summary:
      "Focuses on real-time threat intelligence on AWS EC2, Temporal GNNs, and Zero-Trust automated host isolation.",
  },
];

export function ResumeViewer() {
  const [activeTrack, setActiveTrack] = useState<ResumeTrack>(RESUME_TRACKS[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div style={{ maxWidth: isFullscreen ? "100%" : "1100px", margin: "0 auto", width: "100%" }}>
      {/* Top action toolbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.5rem",
          padding: "1rem 1.25rem",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <FileText size={20} style={{ color: "var(--text-accent)" }} />
          <div>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
              {activeTrack.name}
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Khushal Midha • IIIT Lucknow • CGPA: 8.72/10
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexWrap: "wrap" }}>
          <button
            onClick={toggleFullscreen}
            className="btn btn-ghost"
            style={{ fontSize: "0.8125rem", padding: "0.45rem 0.875rem" }}
            title={isFullscreen ? "Exit wide view" : "Wide view"}
          >
            <Maximize2 size={14} /> {isFullscreen ? "Exit Wide" : "Expand"}
          </button>
          <a
            href={activeTrack.pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ fontSize: "0.8125rem", padding: "0.45rem 0.875rem" }}
          >
            <ExternalLink size={14} /> Open in Tab
          </a>
          <a
            href={activeTrack.pdfPath}
            download={`${profile.name.replace(/\s+/g, "_")}_${activeTrack.id}_Resume.pdf`}
            className="btn btn-primary"
            style={{ fontSize: "0.8125rem", padding: "0.45rem 0.875rem" }}
          >
            <Download size={14} /> Download PDF
          </a>
        </div>
      </div>

      {/* Track Selector Tabs */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          overflowX: "auto",
          paddingBottom: "0.75rem",
          marginBottom: "1.5rem",
        }}
        role="tablist"
        aria-label="Resume specialized roles"
      >
        {RESUME_TRACKS.map((track) => {
          const isSelected = track.id === activeTrack.id;
          return (
            <button
              key={track.id}
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveTrack(track)}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.8125rem",
                fontWeight: isSelected ? 600 : 500,
                borderRadius: "var(--radius-full)",
                border: isSelected ? "1px solid var(--accent)" : "1px solid var(--border)",
                background: isSelected ? "var(--accent)" : "var(--bg-card)",
                color: isSelected ? "#0A0D14" : "var(--text-secondary)",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>{track.label}</span>
              {isSelected && (
                <span
                  style={{
                    fontSize: "0.65rem",
                    padding: "0.1rem 0.35rem",
                    borderRadius: "8px",
                    background: "rgba(0,0,0,0.2)",
                    color: "#0A0D14",
                  }}
                >
                  Active
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Embedded PDF Viewer Container */}
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          boxShadow: "0 12px 36px rgba(0, 0, 0, 0.2)",
          position: "relative",
          marginBottom: "3rem",
        }}
      >
        {/* Viewer Chrome Bar */}
        <div
          style={{
            padding: "0.75rem 1.25rem",
            background: "var(--bg-secondary)",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#28CA41",
                display: "inline-block",
              }}
            />
            <span>Viewing: {activeTrack.pdfPath.replace("/resume/", "")}</span>
          </div>
          <span style={{ fontSize: "0.75rem" }}>
            Interactive Preview (Scrollable & Zoomable)
          </span>
        </div>

        {/* Embedded PDF iFrame */}
        <div style={{ width: "100%", height: isFullscreen ? "85vh" : "820px", background: "#525659" }}>
          <iframe
            src={`${activeTrack.pdfPath}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
            title={`Resume Preview - ${activeTrack.name}`}
            width="100%"
            height="100%"
            style={{ border: "none", display: "block" }}
          />
        </div>
      </div>

      {/* Summary info cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {/* Education & Academic */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
              color: "var(--text-accent)",
            }}
          >
            <GraduationCap size={18} />
            <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>Education</h3>
          </div>
          <p style={{ fontWeight: 600, fontSize: "0.9375rem", marginBottom: "0.25rem" }}>
            IIIT Lucknow
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
            B.Tech in Computer Science & Artificial Intelligence (2023 – 2027)
          </p>
          <div
            style={{
              fontSize: "0.8125rem",
              fontFamily: "var(--font-mono)",
              color: "var(--text-accent)",
              background: "rgba(78, 205, 196, 0.08)",
              padding: "0.3rem 0.6rem",
              borderRadius: "4px",
              display: "inline-block",
            }}
          >
            CGPA: 8.72 / 10
          </div>
        </div>

        {/* Experience */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
              color: "var(--text-accent)",
            }}
          >
            <Briefcase size={18} />
            <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>Internship Experience</h3>
          </div>
          <p style={{ fontWeight: 600, fontSize: "0.9375rem", marginBottom: "0.25rem" }}>
            SDE Intern — Coffeee.io
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
            Remote • Jun 2025 – Aug 2025
          </p>
          <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
            Built project assessment modules in Java Spring Boot & PostgreSQL; developed read-only AI evaluation assistant.
          </p>
        </div>

        {/* Highlights */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem",
              color: "var(--text-accent)",
            }}
          >
            <Award size={18} />
            <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>Contest Credentials</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
            <div>• <strong>LeetCode Guardian</strong> (Rating: 2,139 • Global Rank 10,971)</div>
            <div>• <strong>CodeChef 5★</strong> (Rating: 2,131 • Global Rank 31)</div>
            <div>• <strong>Codeforces Expert</strong> (Rating: 1,809)</div>
            <div>• <strong>Meta Hacker Cup 2025</strong> Round 3 Rank 186</div>
            <div>• <strong>ICPC Regionalist</strong> Amritapuri 2024-25</div>
          </div>
        </div>
      </div>
    </div>
  );
}
