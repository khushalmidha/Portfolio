import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ExternalLink,
  Github,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import { projects } from "@/lib/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Case Study`,
    description: project.description,
  };
}

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const { caseStudy } = project;

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Back */}
      <div className="container-wide" style={{ paddingTop: "2rem", paddingBottom: "1rem" }}>
        <Link
          href="/#projects"
          className="btn btn-ghost"
          style={{ padding: "0.375rem 0.625rem", fontSize: "0.875rem" }}
        >
          <ArrowLeft size={14} /> Back to Projects
        </Link>
      </div>

      {/* Hero */}
      <section
        aria-labelledby="case-study-title"
        style={{
          padding: "2rem 0 4rem",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse at 70% 50%, ${project.accentColor}08, transparent 60%)`,
            pointerEvents: "none",
          }}
        />
        <div className="container-wide" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            <div>
              {/* Number */}
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: project.accentColor,
                  marginBottom: "0.75rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Case Study — {project.tagline}
              </div>

              {/* Title */}
              <h1
                id="case-study-title"
                className="display-lg"
                style={{ marginBottom: "1.25rem" }}
              >
                {project.title}
              </h1>

              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "1.0625rem",
                  lineHeight: 1.7,
                  marginBottom: "2rem",
                }}
              >
                {project.description}
              </p>

              {/* Actions */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ backgroundColor: project.accentColor, borderColor: project.accentColor }}
                >
                  <ExternalLink size={14} /> Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <Github size={14} /> Source Code
                </a>
              </div>
            </div>

            {/* Screenshot */}
            <div className="browser-frame">
              <div className="browser-bar">
                <div className="browser-dot" style={{ background: "#FF5F57" }} />
                <div className="browser-dot" style={{ background: "#FFBD2E" }} />
                <div className="browser-dot" style={{ background: "#28CA41" }} />
                <div className="browser-url">
                  {project.liveUrl.replace("https://", "")}
                </div>
              </div>
              <div style={{ position: "relative", aspectRatio: "16/10", background: "var(--bg-secondary)" }}>
                <Image
                  src={project.screenshotPath}
                  alt={`Screenshot of ${project.title}`}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container-narrow" style={{ padding: "4rem clamp(1.25rem, 5vw, 4rem)" }}>

        {/* Stack */}
        <section aria-label="Technology stack" style={{ marginBottom: "3.5rem" }}>
          <div className="section-label">Stack</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.75rem" }}>
            {project.stack.map((tech) => (
              <span key={tech} className="badge">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Overview */}
        <Section title="Overview" label="01">
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.8 }}>
            {caseStudy.overview}
          </p>
        </Section>

        {/* Problem */}
        <Section title="The Problem" label="02">
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.8 }}>
            {caseStudy.problem}
          </p>
        </Section>

        {/* Contribution */}
        <Section title="My Contribution" label="03">
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.8 }}>
            {caseStudy.contribution}
          </p>
        </Section>

        {/* Architecture */}
        <Section title="Architecture" label="04">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {caseStudy.architecture.map((block, i) => (
              <div
                key={i}
                style={{
                  padding: "1.25rem 1.5rem",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  borderLeft: `3px solid ${project.accentColor}`,
                }}
              >
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    marginBottom: "0.625rem",
                    color: "var(--text-primary)",
                  }}
                >
                  {block.title}
                </h4>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", lineHeight: 1.7 }}>
                  {block.description}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Key Decisions */}
        <Section title="Engineering Decisions & Tradeoffs" label="05">
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {caseStudy.decisions.map((d, i) => (
              <div key={i} style={{ borderLeft: "1px solid var(--border)", paddingLeft: "1.5rem" }}>
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "1rem",
                    marginBottom: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <ChevronRight size={14} style={{ color: project.accentColor }} />
                  {d.decision}
                </h4>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "0.5rem" }}>
                  <strong style={{ color: "var(--text-primary)" }}>Rationale: </strong>
                  {d.rationale}
                </p>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                  <strong style={{ color: "var(--text-primary)" }}>Tradeoff: </strong>
                  {d.tradeoff}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* Challenges */}
        <Section title="Challenges & Solutions" label="06">
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {caseStudy.challenges.map((c, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    padding: "1rem 1.25rem",
                    background: "rgba(255, 100, 100, 0.04)",
                    border: "1px solid rgba(255, 100, 100, 0.12)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "rgba(255, 100, 100, 0.7)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Challenge
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                    {c.challenge}
                  </p>
                </div>
                <div
                  style={{
                    padding: "1rem 1.25rem",
                    background: "var(--accent-dim)",
                    border: "1px solid var(--border-accent)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--text-accent)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Solution
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                    {c.solution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Results */}
        <Section title="Evidence & Results" label="07">
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {caseStudy.results.map((r, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  color: "var(--text-secondary)",
                  fontSize: "0.9375rem",
                  lineHeight: 1.6,
                }}
              >
                <span
                  style={{
                    color: project.accentColor,
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: "0.125rem",
                  }}
                >
                  ›
                </span>
                {r}
              </li>
            ))}
          </ul>
        </Section>

        {/* Back */}
        <div style={{ paddingTop: "2rem", borderTop: "1px solid var(--border)", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/#projects" className="btn btn-secondary">
            <ArrowLeft size={14} /> All Projects
          </Link>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <Github size={14} /> View Repository
          </a>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <ExternalLink size={14} /> Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  label,
  children,
}: {
  title: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={`section-${label}`}
      style={{ marginBottom: "3.5rem" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            fontWeight: 600,
          }}
        >
          {label}
        </span>
        <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
        <h2
          id={`section-${label}`}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
