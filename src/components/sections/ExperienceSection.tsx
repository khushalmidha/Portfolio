import { experiences } from "@/lib/content/experience";
import { MapPin, Calendar, ExternalLink } from "lucide-react";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="section"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="container-wide">
        <div style={{ marginBottom: "4rem" }}>
          <div className="section-label">Work Experience</div>
          <h2 id="experience-heading" className="section-heading">
            Experience
          </h2>
        </div>

        <div style={{ maxWidth: "860px" }}>
          {experiences.map((exp) => (
            <article
              key={exp.id}
              aria-labelledby={`exp-${exp.id}-title`}
              style={{ marginBottom: "3rem" }}
            >
              <div
                className="card"
                style={{ padding: "2rem 2.5rem" }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "1rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.375rem" }}>
                      {exp.companyUrl ? (
                        <a
                          href={exp.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "1.375rem",
                            fontWeight: 600,
                            letterSpacing: "-0.02em",
                            color: "var(--text-primary)",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.375rem",
                            transition: "color 0.2s",
                          }}
                          className="company-link"
                        >
                          {exp.company} <ExternalLink size={14} />
                        </a>
                      ) : (
                        <span
                          style={{
                            fontFamily: "var(--font-display)",
                            fontSize: "1.375rem",
                            fontWeight: 600,
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {exp.company}
                        </span>
                      )}
                      <span className="badge" style={{ fontSize: "0.7rem", padding: "0.2rem 0.5rem" }}>
                        {exp.type}
                      </span>
                    </div>
                    <p
                      id={`exp-${exp.id}-title`}
                      style={{
                        color: "var(--text-accent)",
                        fontWeight: 600,
                        fontSize: "1rem",
                      }}
                    >
                      {exp.role}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.375rem",
                      textAlign: "right",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.375rem",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.8125rem",
                        color: "var(--text-secondary)",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Calendar size={12} />
                      {exp.dateDisplay}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.375rem",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.8125rem",
                        color: "var(--text-muted)",
                        justifyContent: "flex-end",
                      }}
                    >
                      <MapPin size={12} />
                      {exp.location}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.9375rem",
                    lineHeight: 1.7,
                    marginBottom: "1.5rem",
                  }}
                >
                  {exp.description}
                </p>

                {/* Contributions */}
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    marginBottom: "1.5rem",
                  }}
                  aria-label="Key contributions"
                >
                  {exp.contributions.map((c) => (
                    <li
                      key={c}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.625rem",
                        color: "var(--text-secondary)",
                        fontSize: "0.875rem",
                        lineHeight: 1.6,
                      }}
                    >
                      <span
                        style={{
                          color: "var(--text-accent)",
                          fontWeight: 600,
                          flexShrink: 0,
                          marginTop: "0.1875rem",
                        }}
                      >
                        ›
                      </span>
                      {c}
                    </li>
                  ))}
                </ul>

                {/* Note */}
                {exp.note && (
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--text-muted)",
                      fontStyle: "italic",
                      marginBottom: "1.5rem",
                      borderLeft: "2px solid var(--border)",
                      paddingLeft: "0.75rem",
                    }}
                  >
                    Note: {exp.note}
                  </p>
                )}

                {/* Stack */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }} aria-label="Technologies">
                  {exp.stack.map((tech) => (
                    <span key={tech} className="badge badge-neutral">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .company-link:hover { color: var(--text-accent) !important; }
      `}</style>
    </section>
  );
}
