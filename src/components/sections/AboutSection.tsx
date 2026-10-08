import { skillGroups } from "@/lib/content/skills";
import { profile } from "@/lib/content/profile";

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="container-wide">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* About text */}
          <div>
            <div className="section-label">Background</div>
            <h2 id="about-heading" className="section-heading" style={{ marginBottom: "1.5rem" }}>
              About
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                color: "var(--text-secondary)",
                fontSize: "0.9375rem",
                lineHeight: 1.75,
              }}
            >
              <p>
                I&apos;m a second-year B.Tech student in Computer Science and AI at{" "}
                <strong style={{ color: "var(--text-primary)" }}>
                  {profile.education.institution}
                </strong>
                , maintaining a{" "}
                <span
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-accent)" }}
                >
                  {profile.education.cgpa}
                </span>{" "}
                GPA.
              </p>
              <p>
                I build substantial software — from multi-tenant healthcare platforms with
                real-time queues and AI triage, to bilingual news systems with ML-powered
                ranking. I care about backend architecture, data consistency, and systems
                that work under pressure.
              </p>
              <p>
                Competitive programming sharpens the other half of my thinking — I&apos;ve solved
                3000+ problems and competed at ICPC, Meta Hacker Cup, and Amazon ML Challenge.
                That discipline shows up in how I approach production code.
              </p>
              <p>
                I&apos;m open to{" "}
                <strong style={{ color: "var(--text-primary)" }}>
                  SDE, SWE, backend engineering, and quant developer
                </strong>{" "}
                opportunities where I can contribute immediately and continue growing
                through hard problems.
              </p>
            </div>

            {/* Education card */}
            <div
              style={{
                marginTop: "2.5rem",
                padding: "1.25rem 1.5rem",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "0.75rem",
                }}
              >
                Education
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "1rem",
                  marginBottom: "0.25rem",
                }}
              >
                {profile.education.institution}
              </div>
              <div style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
                {profile.education.degree}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  marginTop: "0.75rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8125rem",
                }}
              >
                <div>
                  <span style={{ color: "var(--text-muted)" }}>Period </span>
                  <span style={{ color: "var(--text-secondary)" }}>{profile.education.period}</span>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)" }}>CGPA </span>
                  <span style={{ color: "var(--text-accent)", fontWeight: 600 }}>
                    {profile.education.cgpa}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <div className="section-label">Technical Skills</div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.5rem",
                fontWeight: 600,
                marginBottom: "2rem",
              }}
            >
              Skills
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
              {skillGroups.map((group) => (
                <div key={group.id}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "0.625rem",
                    }}
                  >
                    {group.label}
                  </div>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}
                    role="list"
                    aria-label={`${group.label} skills`}
                  >
                    {group.skills.map((skill) => (
                      <span
                        key={skill.name}
                        role="listitem"
                        className={
                          skill.projectEvidence && skill.projectEvidence.length > 0
                            ? "badge"
                            : "badge badge-neutral"
                        }
                        title={
                          skill.projectEvidence && skill.projectEvidence.length > 0
                            ? `Used in: ${skill.projectEvidence.join(", ")}`
                            : undefined
                        }
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p
              style={{
                marginTop: "1.5rem",
                fontSize: "0.8125rem",
                color: "var(--text-muted)",
                fontStyle: "italic",
                lineHeight: 1.6,
              }}
            >
              Highlighted skills have direct project evidence. No arbitrary proficiency
              percentages — see project case studies for depth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
