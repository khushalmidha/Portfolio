"use client";

import { useState } from "react";
import { Sparkles, Grid } from "lucide-react";
import { ProjectsCatalogue } from "./ProjectsCatalogue";

export function ProjectsTabContainer({
  featuredChildren,
}: {
  featuredChildren: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<"featured" | "all">("featured");

  return (
    <div>
      {/* Tab Switcher */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginBottom: "3rem",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "1rem",
          flexWrap: "wrap",
        }}
        role="tablist"
        aria-label="Projects view mode"
      >
        <button
          role="tab"
          aria-selected={activeTab === "featured"}
          onClick={() => setActiveTab("featured")}
          className={`btn ${activeTab === "featured" ? "btn-primary" : "btn-ghost"}`}
          style={{ fontSize: "0.875rem", padding: "0.55rem 1.125rem" }}
        >
          <Sparkles size={15} /> Flagship Case Studies (3)
        </button>
        <button
          role="tab"
          aria-selected={activeTab === "all"}
          onClick={() => setActiveTab("all")}
          className={`btn ${activeTab === "all" ? "btn-primary" : "btn-ghost"}`}
          style={{ fontSize: "0.875rem", padding: "0.55rem 1.125rem" }}
        >
          <Grid size={15} /> All Projects & Repositories (23)
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "featured" ? (
        <div>
          {featuredChildren}
          {/* Switcher prompt at the bottom */}
          <div
            style={{
              marginTop: "5rem",
              padding: "2rem",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div>
              <h4 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.25rem" }}>
                Looking for more projects across Quant, AI, and Systems?
              </h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", margin: 0 }}>
                Explore 20+ additional repositories spanning C++ order books, threat graphs, and full-stack platforms.
              </p>
            </div>
            <button
              onClick={() => setActiveTab("all")}
              className="btn btn-secondary"
              style={{ fontSize: "0.875rem" }}
            >
              <Grid size={15} /> Browse All 23 Projects
            </button>
          </div>
        </div>
      ) : (
        <ProjectsCatalogue />
      )}
    </div>
  );
}
