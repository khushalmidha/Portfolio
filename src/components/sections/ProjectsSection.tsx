import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, BookOpen, ImageOff } from "lucide-react";
import { projects } from "@/lib/content/projects";
import { getFeaturedRepos } from "@/lib/adapters/github";
import { ProjectsTabContainer } from "./ProjectsTabContainer";

function BrowserFrame({
  url,
  screenshotPath,
  title,
  href,
  accentColor,
}: {
  url: string;
  screenshotPath: string;
  title: string;
  href: string;
  accentColor: string;
}) {
  return (
    <div className="browser-frame">
      {/* Browser chrome */}
      <div className="browser-bar">
        <div className="browser-dot" style={{ background: "#FF5F57" }} />
        <div className="browser-dot" style={{ background: "#FFBD2E" }} />
        <div className="browser-dot" style={{ background: "#28CA41" }} />
        <div className="browser-url">{url}</div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${title} in new tab`}
          style={{ color: "var(--text-muted)", display: "flex", marginLeft: "0.5rem", flexShrink: 0 }}
        >
          <ExternalLink size={11} />
        </a>
      </div>
      {/* Screenshot */}
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`View ${title} live demo`} tabIndex={-1}>
        <div style={{ position: "relative", aspectRatio: "16/10", background: "var(--bg-secondary)", overflow: "hidden" }}>
          <Image
            src={screenshotPath}
            alt={`Screenshot of ${title}`}
            fill
            style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            className="project-screenshot"
          />
          {/* Hover overlay */}
          <div
            className="screenshot-overlay"
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, ${accentColor}22, transparent)`,
              opacity: 0,
              transition: "opacity 0.3s",
            }}
          />
        </div>
      </a>
      <style>{`
        a:hover .project-screenshot { transform: scale(1.02); }
        a:hover + .screenshot-overlay, a:hover .screenshot-overlay { opacity: 1 !important; }
      `}</style>
    </div>
  );
}

function PreviewUnavailable({ title }: { title: string }) {
  return (
    <div className="browser-frame">
      <div className="browser-bar">
        <div className="browser-dot" style={{ background: "#FF5F57" }} />
        <div className="browser-dot" style={{ background: "#FFBD2E" }} />
        <div className="browser-dot" style={{ background: "#28CA41" }} />
        <div className="browser-url">preview unavailable</div>
      </div>
      <div className="preview-unavailable">
        <ImageOff size={28} aria-hidden="true" />
        <span>Preview of {title}</span>
        <span style={{ fontSize: "0.75rem" }}>Screenshot not yet captured</span>
      </div>
    </div>
  );
}

export async function ProjectsSection() {
  const { repos } = await getFeaturedRepos();
  const repoMap = Object.fromEntries(repos.map((r) => [r.name.toLowerCase(), r]));

  return (
    <section id="projects" aria-labelledby="projects-heading" className="section">
      <div className="container-wide">
        {/* Section header */}
        <div style={{ marginBottom: "3rem" }}>
          <div className="section-label">Selected Work</div>
          <h2 id="projects-heading" className="section-heading" style={{ marginBottom: "1rem" }}>
            Projects
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", maxWidth: "600px" }}>
            Explore flagship full-stack & AI architectures, or browse all 23 repositories across Quant, Machine Learning, Systems, and Web.
          </p>
        </div>

        <ProjectsTabContainer
          featuredChildren={
            <div style={{ display: "flex", flexDirection: "column", gap: "6rem" }}>
          {projects.map((project, i) => {
            const repoKey = project.slug === "iiitlbachat" ? "iiitlbachat" : project.slug;
            const repoData = repoMap[repoKey];
            const isEven = i % 2 === 0;

            return (
              <article
                key={project.slug}
                aria-labelledby={`project-${project.slug}-title`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "3rem",
                  alignItems: "center",
                }}
              >
                {/* Screenshot (order based on even/odd) */}
                <div style={{ order: isEven ? 0 : 1 }}>
                  {project.screenshotPath ? (
                    <BrowserFrame
                      url={project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      screenshotPath={project.screenshotPath}
                      title={project.title}
                      href={project.liveUrl}
                      accentColor={project.accentColor}
                    />
                  ) : (
                    <PreviewUnavailable title={project.title} />
                  )}
                </div>

                {/* Content */}
                <div style={{ order: isEven ? 1 : 0 }}>
                  {/* Project number */}
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      marginBottom: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span style={{ color: project.accentColor, fontWeight: 600 }}>
                      0{i + 1}
                    </span>
                    <span>—</span>
                    <span>{project.tagline}</span>
                  </div>

                  {/* Title */}
                  <h3
                    id={`project-${project.slug}-title`}
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      marginBottom: "1rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.9375rem",
                      lineHeight: 1.7,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Engineering highlights */}
                  <ul
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.375rem",
                      marginBottom: "1.5rem",
                    }}
                    aria-label={`Key highlights for ${project.title}`}
                  >
                    {project.highlights.slice(0, 4).map((h) => (
                      <li
                        key={h}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.625rem",
                          color: "var(--text-secondary)",
                          fontSize: "0.875rem",
                        }}
                      >
                        <span style={{ color: project.accentColor, fontWeight: 600, flexShrink: 0, marginTop: "0.125rem" }}>
                          ›
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Stack tags */}
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", marginBottom: "2rem" }}
                    aria-label="Technologies used"
                  >
                    {project.stack.map((tech) => (
                      <span key={tech} className="badge badge-neutral">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* GitHub metadata */}
                  {repoData && (
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        marginBottom: "1.5rem",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.8125rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      {repoData.stargazers_count > 0 && (
                        <span>★ {repoData.stargazers_count}</span>
                      )}
                      {repoData.language && <span>{repoData.language}</span>}
                    </div>
                  )}

                  {/* Action links */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ fontSize: "0.875rem", padding: "0.5rem 1rem", backgroundColor: project.accentColor, borderColor: project.accentColor }}
                      aria-label={`View ${project.title} live demo`}
                    >
                      <ExternalLink size={13} /> Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{ fontSize: "0.875rem", padding: "0.5rem 1rem" }}
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <Github size={13} /> Source
                    </a>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="btn btn-ghost"
                      style={{ fontSize: "0.875rem", padding: "0.5rem 1rem" }}
                      aria-label={`Read ${project.title} case study`}
                    >
                      <BookOpen size={13} /> Case Study
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
            </div>
          }
        />
      </div>
    </section>
  );
}
