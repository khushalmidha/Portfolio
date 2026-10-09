import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { getCodeforcesData } from "@/lib/adapters/codeforces";
import { leetcodeSnapshot } from "@/lib/adapters/leetcode";
import { codechefSnapshot } from "@/lib/adapters/codechef";
import { profile } from "@/lib/content/profile";
import { CFRatingChart } from "@/components/charts/CFRatingChart";

export const metadata: Metadata = {
  title: "Coding Analytics",
  description:
    "Competitive programming profiles, rating history, and statistics for Khushal Midha across Codeforces, LeetCode, and CodeChef.",
};

export default async function CodingPage() {
  const cfData = await getCodeforcesData();

  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Header */}
      <section
        aria-label="Competitive programming overview"
        style={{
          padding: "3rem 0 4rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container-wide">
          <Link
            href="/"
            className="btn btn-ghost"
            style={{ padding: "0.375rem 0.625rem", fontSize: "0.875rem", marginBottom: "2rem", display: "inline-flex" }}
          >
            <ArrowLeft size={14} /> Home
          </Link>
          <div className="section-label">Competitive Programming</div>
          <h1 className="display-lg" style={{ marginBottom: "1rem", maxWidth: "600px" }}>
            Coding Analytics
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.0625rem",
              maxWidth: "600px",
              lineHeight: 1.7,
            }}
          >
            Rating history and statistics across Codeforces, LeetCode, and CodeChef. Live
            data where available; clearly labeled snapshots otherwise.
          </p>

          {/* Summary stats */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              marginTop: "2.5rem",
              paddingTop: "2.5rem",
              borderTop: "1px solid var(--border)",
            }}
            role="list"
            aria-label="Overall competitive programming summary"
          >
            {[
              { label: "Problems Solved", value: "3000+", sub: "CF + LC (resume)", platform: "" },
              { label: "Codeforces Rating", value: "1809", sub: "Expert", platform: "CF" },
              { label: "CodeChef Rating", value: "2137", sub: "5★", platform: "CC" },
              { label: "LeetCode Rating", value: "2137", sub: "Guardian", platform: "LC" },
            ].map((stat) => (
              <div
                key={stat.label}
                role="listitem"
                style={{
                  padding: "1.25rem 1.5rem",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  minWidth: "160px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--text-muted)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "var(--text-accent)",
                    lineHeight: 1.1,
                    marginBottom: "0.25rem",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Codeforces */}
      <section
        id="codeforces"
        aria-labelledby="cf-heading"
        style={{ padding: "4rem 0", borderBottom: "1px solid var(--border)" }}
      >
        <div className="container-wide">
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#1BAAD4",
                  marginBottom: "0.5rem",
                }}
              >
                Codeforces
              </div>
              <h2 id="cf-heading" style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                {cfData.user.handle}
              </h2>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.9375rem",
                    color: "#1BAAD4",
                    fontWeight: 600,
                  }}
                >
                  {cfData.user.rating ?? "N/A"} ({cfData.user.rank ?? "Expert"})
                </div>
                {cfData.user.maxRating && (
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9375rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    Peak: {cfData.user.maxRating}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: cfData.isLive ? "#28CA41" : "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: cfData.isLive ? "#28CA41" : "var(--text-muted)",
                    display: "inline-block",
                  }}
                />
                {cfData.isLive ? "Live data" : "Snapshot"}
              </span>
              <a
                href={profile.social.codeforces}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ fontSize: "0.8125rem", padding: "0.5rem 0.875rem" }}
              >
                Profile <ExternalLink size={12} />
              </a>
            </div>
          </div>


          {/* Rating chart */}
          {cfData.ratingHistory.length > 0 ? (
            <CFRatingChart data={cfData.ratingHistory} />
          ) : (
            <div
              style={{
                padding: "3rem",
                textAlign: "center",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.875rem",
              }}
            >
              Rating history chart unavailable — view full history on{" "}
              <a
                href={profile.social.codeforces}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--text-accent)", textDecoration: "none" }}
              >
                Codeforces profile
              </a>
            </div>
          )}
        </div>
      </section>

      {/* LeetCode */}
      <section
        id="leetcode"
        aria-labelledby="lc-heading"
        style={{ padding: "4rem 0", borderBottom: "1px solid var(--border)" }}
      >
        <div className="container-wide">
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#F9A825",
                  marginBottom: "0.5rem",
                }}
              >
                LeetCode
              </div>
              <h2 id="lc-heading" style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                {leetcodeSnapshot.username}
              </h2>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.9375rem", color: "#F9A825", fontWeight: 600 }}>
                  {leetcodeSnapshot.rating} ({leetcodeSnapshot.rank})
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--text-muted)", display: "inline-block" }} />
                Snapshot ({leetcodeSnapshot.snapshotDate})
              </span>
              <a
                href={profile.social.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ fontSize: "0.8125rem", padding: "0.5rem 0.875rem" }}
              >
                Profile <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Stats grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
              gap: "1rem",
            }}
          >
            {[
              { label: "Contest Rating", value: String(leetcodeSnapshot.rating), color: "#F9A825" },
              { label: "Level", value: leetcodeSnapshot.rank, color: "#F9A825" },
              { label: "Global Rank", value: "10,971 / 887k", color: "var(--text-accent)" },
              { label: "Contests Attended", value: `${leetcodeSnapshot.contestsParticipated}`, color: "var(--text-primary)" },
              { label: "Total Solved", value: `${leetcodeSnapshot.totalSolved}+`, color: "var(--text-primary)" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
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
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--text-muted)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: stat.color,
                    lineHeight: 1.1,
                  }}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CodeChef */}
      <section
        id="codechef"
        aria-labelledby="cc-heading"
        style={{ padding: "4rem 0" }}
      >
        <div className="container-wide">
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#FFB547",
                  marginBottom: "0.5rem",
                }}
              >
                CodeChef
              </div>
              <h2 id="cc-heading" style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                {codechefSnapshot.username}
              </h2>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.9375rem", color: "#FFB547", fontWeight: 600 }}>
                {codechefSnapshot.rating} ({codechefSnapshot.rank})
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                }}
              >
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--text-muted)", display: "inline-block" }} />
                Snapshot ({codechefSnapshot.snapshotDate})
              </span>
              <a
                href={profile.social.codechef}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ fontSize: "0.8125rem", padding: "0.5rem 0.875rem" }}
              >
                Profile <ExternalLink size={12} />
              </a>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
              gap: "1rem",
            }}
          >
            {[
              { label: "Rating", value: String(codechefSnapshot.rating), color: "#FFB547" },
              { label: "Division", value: "Div 1 (5★)", color: "#FFB547" },
              { label: "Rank", value: codechefSnapshot.rank, color: "var(--text-primary)" },
              { label: "Contest Rank", value: `Rank ${codechefSnapshot.globalRank} (Starters 203)`, color: "var(--text-accent)" },
              { label: "Contests Attended", value: `${codechefSnapshot.contestsParticipated}`, color: "var(--text-primary)" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
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
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--text-muted)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: stat.color,
                    lineHeight: 1.1,
                  }}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
