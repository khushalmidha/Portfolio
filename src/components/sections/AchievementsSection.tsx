import { achievements } from "@/lib/content/achievements";
import { Trophy, Award, Code2, Star, ExternalLink } from "lucide-react";

const categoryConfig: Record<
  string,
  { icon: React.ReactNode; color: string; label: string }
> = {
  competition: {
    icon: <Trophy size={14} />,
    color: "#FFB547",
    label: "Competition",
  },
  selection: {
    icon: <Star size={14} />,
    color: "#A3E6C5",
    label: "Selection",
  },
  hackathon: {
    icon: <Code2 size={14} />,
    color: "#FF6B6B",
    label: "Hackathon",
  },
  recognition: {
    icon: <Award size={14} />,
    color: "#8B9CF7",
    label: "Recognition",
  },
};

export function AchievementsSection() {
  const sorted = [...achievements].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className="section"
    >
      <div className="container-wide">
        <div style={{ marginBottom: "4rem" }}>
          <div className="section-label">Recognition</div>
          <h2 id="achievements-heading" className="section-heading" style={{ marginBottom: "1rem" }}>
            Achievements
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", maxWidth: "480px" }}>
            Competitions, selections, and recognitions — verified from certificates.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ maxWidth: "800px" }}>
          <ol style={{ listStyle: "none" }} aria-label="Achievement timeline">
            {sorted.map((achievement, i) => {
              const config = categoryConfig[achievement.category];
              return (
                <li
                  key={achievement.id}
                  className="timeline-item"
                  style={{
                    paddingBottom: i < sorted.length - 1 ? "2.5rem" : 0,
                  }}
                >
                  {/* Date */}
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      marginBottom: "0.375rem",
                    }}
                  >
                    {achievement.dateDisplay}
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-md)",
                      padding: "1.25rem 1.5rem",
                      transition: "border-color 0.2s",
                    }}
                    className="achievement-card"
                  >
                    {/* Category badge */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.375rem",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.7rem",
                        fontWeight: 500,
                        color: config.color,
                        marginBottom: "0.5rem",
                        opacity: 0.85,
                      }}
                    >
                      {config.icon}
                      {config.label.toUpperCase()}
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.125rem",
                        fontWeight: 600,
                        marginBottom: "0.375rem",
                        color: "var(--text-primary)",
                      }}
                    >
                      {achievement.title}
                    </h3>

                    {/* Organization */}
                    <p
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.875rem",
                        marginBottom: "0.625rem",
                      }}
                    >
                      {achievement.organization}
                    </p>

                    {/* Result — prominent */}
                    <p
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.9375rem",
                        fontWeight: 600,
                        color: config.color,
                        marginBottom: achievement.scale ? "0.375rem" : 0,
                      }}
                    >
                      {achievement.result}
                    </p>

                    {/* Scale */}
                    {achievement.scale && (
                      <p
                        style={{
                          fontSize: "0.8125rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {achievement.scale}
                      </p>
                    )}

                    {/* Verification note & certificate link */}
                    {achievement.verifiedBy === "certificate" && (
                      <div
                        style={{
                          marginTop: "0.875rem",
                          paddingTop: "0.625rem",
                          borderTop: "1px dashed var(--border)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                          gap: "0.5rem",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.25rem",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.725rem",
                            color: "var(--text-muted)",
                          }}
                        >
                          ✓ Certificate verified
                        </span>
                        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
                          {achievement.certificateUrl && (
                            <a
                              href={achievement.certificateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.25rem",
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.725rem",
                                color: "var(--accent)",
                                textDecoration: "underline",
                                textUnderlineOffset: "2px",
                              }}
                            >
                              View Certificate <ExternalLink size={10} />
                            </a>
                          )}
                          {achievement.proofUrl && (
                            <a
                              href={achievement.proofUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.25rem",
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.725rem",
                                color: "var(--text-secondary)",
                                textDecoration: "underline",
                                textUnderlineOffset: "2px",
                              }}
                            >
                              Drive Proof <ExternalLink size={10} />
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <style>{`
        .achievement-card:hover {
          border-color: var(--border-accent) !important;
        }
      `}</style>
    </section>
  );
}
