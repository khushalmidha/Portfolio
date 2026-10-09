// src/lib/adapters/leetcode.ts
// LeetCode does not have an official public API.
// We use a snapshot approach with owner-maintained JSON data.
// Third-party endpoints are documented but not relied upon without verification.

export type LeetCodeSnapshot = {
  username: string;
  rating: number | null;
  maxRating: number | null;
  rank: string; // e.g. "Guardian"
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  contestsParticipated: number | null;
  globalRank: number | null;
  badges: string[];
  // Meta
  isLive: false;
  snapshotDate: string;
  source: string;
  dataNote: string;
};

// Owner-maintained snapshot — update this object when you refresh stats
// Source: https://leetcode.com/u/khushalmidha/
export const leetcodeSnapshot: LeetCodeSnapshot = {
  username: "khushalmidha",
  rating: 2139,
  maxRating: 2139,
  rank: "Guardian",
  totalSolved: 2000,
  easySolved: 0,
  mediumSolved: 0,
  hardSolved: 0,
  contestsParticipated: 20,
  globalRank: 10971,
  badges: ["Guardian"],
  isLive: false,
  snapshotDate: "2026-03-01",
  source: "https://leetcode.com/u/khushalmidha/",
  dataNote:
    "Verified profile snapshot: Rating 2139 (Guardian), Global Rank 10,971 / 887,132, 20 contests attended.",
};

// Attempt to fetch from an unofficial proxy endpoint (documented, not guaranteed stable)
// This is disabled by default. Enable by setting LEETCODE_LIVE=true in env.
export async function tryFetchLeetCodeLive(username: string): Promise<Partial<LeetCodeSnapshot> | null> {
  if (process.env.LEETCODE_LIVE !== "true") return null;

  try {
    // Note: This endpoint is unofficial and may change without notice
    // Documented at: https://leetcode-stats-api.herokuapp.com/
    const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status === "error") return null;
    return {
      totalSolved: data.totalSolved,
      easySolved: data.easySolved,
      mediumSolved: data.mediumSolved,
      hardSolved: data.hardSolved,
      isLive: false, // treated as snapshot even if fetched live — endpoint not stable
    };
  } catch {
    return null;
  }
}
