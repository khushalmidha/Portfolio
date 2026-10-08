// src/lib/adapters/codechef.ts
// CodeChef does not have an official public data API for individual user stats.
// We use a snapshot approach with owner-maintained values.

export type CodeChefSnapshot = {
  username: string;
  rating: number;
  maxRating: number | null;
  stars: number; // 5 = 5-star
  rank: string; // display label
  problemsSolved: number | null;
  contestsParticipated: number | null;
  countryRank: number | null;
  globalRank: number | null;
  // Meta
  isLive: false;
  snapshotDate: string;
  source: string;
  dataNote: string;
};

// Owner-maintained snapshot — update when you refresh stats
// Source: https://www.codechef.com/users/codebeast24
export const codechefSnapshot: CodeChefSnapshot = {
  username: "codebeast24",
  rating: 2137,
  maxRating: 2137,
  stars: 5,
  rank: "5★ Rated",
  problemsSolved: null, // Update with actual count from profile
  contestsParticipated: null,
  countryRank: null,
  globalRank: null,
  isLive: false,
  snapshotDate: "2025-10-01",
  source: "https://www.codechef.com/users/codebeast24",
  dataNote:
    "CodeChef does not provide an official public API for user statistics. Rating 2137 (5-star) is resume-reported. Visit the profile link for current values.",
};
