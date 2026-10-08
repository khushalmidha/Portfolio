// src/lib/adapters/codeforces.ts
// Uses the official Codeforces API (no auth required for public data)
// API docs: https://codeforces.com/apiHelp

import { cache } from "react";

const CF_HANDLE = "Khushal_Midha";
const CF_API = "https://codeforces.com/api";
const CACHE_REVALIDATE = 3600;

export type CFRatingChange = {
  contestId: number;
  contestName: string;
  handle: string;
  rank: number;
  ratingUpdateTimeSeconds: number;
  oldRating: number;
  newRating: number;
};

export type CFUserInfo = {
  handle: string;
  rating?: number;
  maxRating?: number;
  rank?: string;
  maxRank?: string;
  contribution?: number;
  friendOfCount?: number;
};

// Snapshot fallback — last known values from resume
const FALLBACK: {
  user: CFUserInfo;
  ratingHistory: CFRatingChange[];
  solvedCount: number | null;
  isLive: boolean;
  fetchedAt: string;
  dataNote: string;
} = {
  user: {
    handle: CF_HANDLE,
    rating: 1809,
    maxRating: 1809,
    rank: "expert",
    maxRank: "expert",
  },
  ratingHistory: [],
  solvedCount: null,
  isLive: false,
  fetchedAt: "snapshot",
  dataNote:
    "Rating 1809 (Expert) is from resume. Live data unavailable — check codeforces.com/profile/Khushal_Midha for current rating.",
};

async function cfFetch<T>(
  endpoint: string,
  params: Record<string, string>
): Promise<{ ok: true; result: T } | { ok: false }> {
  const url = new URL(`${CF_API}/${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url.toString(), {
      signal: controller.signal,
      next: { revalidate: CACHE_REVALIDATE },
    });
    clearTimeout(timeout);
    if (!res.ok) return { ok: false };
    const data = await res.json();
    if (data.status !== "OK") return { ok: false };
    return { ok: true, result: data.result as T };
  } catch {
    clearTimeout(timeout);
    return { ok: false };
  }
}

export const getCodeforcesData = cache(async () => {
  try {
    const [userResult, ratingResult] = await Promise.allSettled([
      cfFetch<CFUserInfo[]>("user.info", { handles: CF_HANDLE }),
      cfFetch<CFRatingChange[]>("user.rating", { handle: CF_HANDLE }),
    ]);

    const userOk =
      userResult.status === "fulfilled" && userResult.value.ok
        ? userResult.value
        : null;
    const ratingOk =
      ratingResult.status === "fulfilled" && ratingResult.value.ok
        ? ratingResult.value
        : null;

    if (!userOk && !ratingOk) {
      return FALLBACK;
    }

    return {
      user: userOk ? userOk.result[0] : FALLBACK.user,
      ratingHistory: ratingOk ? ratingOk.result : [],
      solvedCount: null, // CF API doesn't expose solved count directly
      isLive: !!(userOk || ratingOk),
      fetchedAt: new Date().toISOString(),
      dataNote:
        "Solved count not available via official CF API. Rating and contest history are live.",
    };
  } catch {
    return FALLBACK;
  }
});
