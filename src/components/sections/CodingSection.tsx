import Link from "next/link";
import { ExternalLink, TrendingUp, Code2 } from "lucide-react";
import { profile } from "@/lib/content/profile";

const platforms = [
  {
    id: "codeforces",
    name: "Codeforces",
    handle: "Khushal_Midha",
    rating: "1809",
    rank: "Expert",
    rankColor: "#1BAAD4",
    ratingNote: "Resume snapshot",
    profileUrl: profile.social.codeforces,
    icon: <Code2 size={20} />,
  },
  {
    id: "codechef",
    name: "CodeChef",
    handle: "codebeast24",
    rating: "2137",
    rank: "5★",
    rankColor: "#FFB547",
    ratingNote: "Resume snapshot",
    profileUrl: profile.social.codechef,
    icon: <TrendingUp size={20} />,
  },
  {
    id: "leetcode",
    name: "LeetCode",
    handle: "khushalmidha",
    rating: "2137",
    rank: "Guardian",
    rankColor: "#F9A825",
    ratingNote: "Resume snapshot",
    profileUrl: profile.social.leetcode,
    icon: <Code2 size={20} />,
  },
];

export function CodingSection() {
  return (
    <section
      id="coding"
      aria-labelledby="coding-heading"
      className="section"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="container-wide">
        <div style={{ marginBottom: "4rem" }}>
          <div className="section-label">Competitive Programming</div>
          <h2 id="coding-heading" className="section-heading" style={{ marginBottom: "1rem" }}>
            Coding Profiles
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", maxWidth: "520px" }}>
            3000+ problems solved across Codeforces and LeetCode. Ratings from resume
            — visit the{" "}
            <Link
              href="/coding"
              style={{ color: "var(--text-accent)", textDecoration: "none" }}
            >
              full analytics page
            </Link>{" "}
            for detail and live data.
          </p>
        </div>

        {/* Platform cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.25rem",
            marginBottom: "3rem",
          }}
        >
          {platforms.map((platform) => (
            <div key={platform.id} className="card" style={{ padding: "1.75rem" }}>
              {/* Platform name */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1.25rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.625rem",
                  }}
                >
                  <span style={{ color: platform.rankColor }}>{platform.icon}</span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: "1.0625rem",
                    }}
                  >
                    {platform.name}
                  </span>
                </div>
                <a
                  href={platform.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  aria-label={`Open ${platform.name} profile`}
                  style={{ padding: "0.375rem" }}
                >
                  <ExternalLink size={14} />
                </a>
              </div>

              {/* Handle */}
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8125rem",
                  color: "var(--text-muted)",
                  marginBottom: "1.25rem",
                }}
              >
                @{platform.handle}
              </div>

              {/* Rating + Rank */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.625rem",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: platform.rankColor,
                    lineHeight: 1,
                  }}
                  aria-label={`Rating ${platform.rating}`}
                >
                  {platform.rating}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: platform.rankColor,
                    opacity: 0.8,
                  }}
                >
                  {platform.rank}
                </span>
              </div>

              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                  fontStyle: "italic",
                  marginBottom: "1.25rem",
                }}
              >
                {platform.ratingNote}
              </div>

              <a
                href={platform.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ width: "100%", justifyContent: "center", fontSize: "0.8125rem" }}
                aria-label={`View full ${platform.name} profile`}
              >
                View Profile <ExternalLink size={12} />
              </a>
            </div>
          ))}
        </div>

        {/* Link to full analytics */}
        <div style={{ textAlign: "center" }}>
          <Link href="/coding" className="btn btn-primary" style={{ fontSize: "0.9375rem" }}>
            Full Analytics Dashboard →
          </Link>
        </div>
      </div>
    </section>
  );
}
