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
  rating: 2137,
  maxRating: 2137,
  rank: "Guardian",
  totalSolved: 2000, // Update with actual count from profile
  easySolved: 0, // Update with actual breakdown
  mediumSolved: 0,
  hardSolved: 0,
  contestsParticipated: null,
  globalRank: null,
  badges: [],
  isLive: false,
  snapshotDate: "2025-10-01",
  source: "https://leetcode.com/u/khushalmidha/",
  dataNote:
    "LeetCode does not have an official public API. These values are from a manual snapshot. Rating 2137 (Guardian) is resume-reported. Total problems solved and difficulty breakdown require manual update from the LeetCode profile. Visit the profile link for current values.",
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
