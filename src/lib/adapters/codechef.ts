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
  rating: 2131,
  maxRating: 2131,
  stars: 5,
  rank: "5★ Rated",
  problemsSolved: null,
  contestsParticipated: 27,
  countryRank: null,
  globalRank: 31,
  isLive: false,
  snapshotDate: "2026-03-01",
  source: "https://www.codechef.com/users/codebeast24",
  dataNote:
    "Verified profile snapshot: Rating 2131 (5-star), Global Rank 31 in Starters 203, 27 contests participated.",
};
