"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ExternalLink, Github, BookOpen, Search, Sparkles, Globe } from "lucide-react";
import { allProjects, PROJECT_CATEGORIES, ProjectCategory } from "@/lib/content/allProjects";

export function ProjectsCatalogue() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return allProjects.filter((p) => {
      const matchesCategory =
        selectedCategory === "all" || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q)) ||
        p.language.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allProjects.length };
    allProjects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div style={{ marginTop: "2rem" }}>
      {/* Search and Category Filter Toolbar */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          marginBottom: "2.5rem",
        }}
      >
        {/* Search bar */}
        <div
          style={{
            position: "relative",
            maxWidth: "600px",
            width: "100%",
          }}
        >
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by name, language, or tech stack (e.g. C++, FastAPI, React)..."
            style={{
              width: "100%",
              padding: "0.75rem 1rem 0.75rem 2.75rem",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              color: "var(--text-primary)",
              fontSize: "0.875rem",
              outline: "none",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
            aria-label="Search all projects"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute",
                right: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                fontSize: "0.75rem",
                cursor: "pointer",
                padding: "0.25rem 0.5rem",
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
          role="tablist"
          aria-label="Project categories"
        >
          {PROJECT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: "0.5rem 1rem",
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  borderRadius: "var(--radius-full)",
                  border: isSelected
                    ? "1px solid var(--accent)"
                    : "1px solid var(--border)",
                  background: isSelected ? "var(--accent)" : "var(--bg-card)",
                  color: isSelected ? "#0A0D14" : "var(--text-secondary)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span>{cat.label}</span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    padding: "0.1rem 0.4rem",
                    borderRadius: "10px",
                    background: isSelected ? "rgba(0,0,0,0.15)" : "var(--bg-secondary)",
                    color: isSelected ? "#0A0D14" : "var(--text-muted)",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results summary */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
          fontSize: "0.8125rem",
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
        }}
      >
        <span>
          Showing {filteredProjects.length} of {allProjects.length} projects
        </span>
        {searchQuery && (
          <span>
            Filtering by &quot;{searchQuery}&quot;
          </span>
        )}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
                position: "relative",
              }}
              className="catalogue-card"
            >
              {/* Card top: Category & Badges */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.875rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    color: "var(--text-accent)",
                    background: "rgba(78, 205, 196, 0.08)",
                    padding: "0.2rem 0.55rem",
                    borderRadius: "4px",
                    border: "1px solid rgba(78, 205, 196, 0.2)",
                  }}
                >
                  {project.categoryLabel}
                </span>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {project.liveUrl && (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        fontSize: "0.7rem",
                        color: "#28CA41",
                        background: "rgba(40, 202, 65, 0.1)",
                        padding: "0.15rem 0.45rem",
                        borderRadius: "4px",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      <span
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "#28CA41",
                          display: "inline-block",
                        }}
                      />
                      Live Site
                    </span>
                  )}
                  {project.featured && (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        fontSize: "0.7rem",
                        color: "#FFB547",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      <Sparkles size={11} /> Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Tagline */}
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  marginBottom: "0.375rem",
                  color: "var(--text-primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                {project.name}
              </h3>

              <div
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--text-accent)",
                  fontFamily: "var(--font-mono)",
                  marginBottom: "0.75rem",
                }}
              >
                {project.tagline}
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  marginBottom: "1.25rem",
                  flex: 1,
                }}
              >
                {project.description}
              </p>

              {/* Highlight bullet if available */}
              {project.highlight && (
                <div
                  style={{
                    padding: "0.45rem 0.75rem",
                    background: "var(--bg-secondary)",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-muted)",
                    marginBottom: "1.25rem",
                    border: "1px dashed var(--border)",
                  }}
                >
                  ⚡ {project.highlight}
                </div>
              )}

              {/* Tech Stack Chips */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.375rem",
                  marginBottom: "1.5rem",
                }}
              >
                {project.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: "0.72rem",
                      fontFamily: "var(--font-mono)",
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border)",
                      color: "var(--text-secondary)",
                      padding: "0.15rem 0.45rem",
                      borderRadius: "3px",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  marginTop: "auto",
                  paddingTop: "1rem",
                  borderTop: "1px solid var(--border)",
                  flexWrap: "wrap",
                }}
              >
                {project.caseStudySlug && (
                  <Link
                    href={`/projects/${project.caseStudySlug}`}
                    className="btn btn-primary"
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.4rem 0.75rem",
                    }}
                  >
                    <BookOpen size={13} /> Deep Dive
                  </Link>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                    style={{
                      fontSize: "0.75rem",
                      padding: "0.4rem 0.75rem",
                    }}
                  >
                    <Globe size={13} /> Live Site <ExternalLink size={10} />
                  </a>
                )}

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.4rem 0.75rem",
                  }}
                  aria-label={`View ${project.name} on GitHub`}
                >
                  <Github size={13} /> Code
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            color: "var(--text-muted)",
          }}
        >
          <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
            No projects found matching &quot;{searchQuery}&quot; in this category.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="btn btn-secondary"
            style={{ fontSize: "0.8125rem", marginTop: "0.75rem" }}
          >
            Reset Filters
          </button>
        </div>
      )}

      <style jsx>{`
        .catalogue-card:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }
      `}</style>
    </div>
  );
}
