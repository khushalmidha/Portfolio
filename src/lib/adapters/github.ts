// src/lib/adapters/github.ts
// Server-only GitHub adapter — never import from client components
// Uses GITHUB_TOKEN env var if available (least-privilege, read:public_repo scope)

import { cache } from "react";

const GITHUB_API = "https://api.github.com";
const GITHUB_USERNAME = "khushalmidha";
const CACHE_REVALIDATE = 3600; // 1 hour

export type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
};

type GitHubAPIRepo = {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
};

const FEATURED_REPOS = ["MediPulse", "jagrit", "IIITLBachat", "Quantdesk", "ThreatGraph"];

function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

// Last-known-good fallback snapshot
const FALLBACK_REPOS: GitHubRepo[] = [
  {
    name: "MediPulse",
    description:
      "Multi-tenant healthcare SaaS — appointments, OPD queues, WebRTC, AI triage",
    html_url: "https://github.com/khushalmidha/MediPulse",
    stargazers_count: 0,
    forks_count: 0,
    language: "TypeScript",
    updated_at: "2025-01-01T00:00:00Z",
    topics: ["healthcare", "mern", "kafka", "webrtc", "ai"],
  },
  {
    name: "jagrit",
    description: "Bilingual news platform with XGBoost ranking and NRMS evaluation",
    html_url: "https://github.com/khushalmidha/jagrit",
    stargazers_count: 0,
    forks_count: 0,
    language: "JavaScript",
    updated_at: "2025-01-01T00:00:00Z",
    topics: ["news", "ml", "xgboost", "pytorch", "nlp"],
  },
  {
    name: "IIITLBachat",
    description:
      "AI-assisted personal finance with voice entry and receipt extraction",
    html_url: "https://github.com/khushalmidha/IIITLBachat",
    stargazers_count: 0,
    forks_count: 0,
    language: "JavaScript",
    updated_at: "2025-01-01T00:00:00Z",
    topics: ["finance", "ai", "sarvam", "gemini"],
  },
  {
    name: "Quantdesk",
    description:
      "Deterministic C++ order book matching engine and algorithmic backtesting dashboard",
    html_url: "https://github.com/khushalmidha/Quantdesk",
    stargazers_count: 0,
    forks_count: 0,
    language: "C++",
    updated_at: "2026-07-14T00:00:00Z",
    topics: ["quantitative-trading", "cpp", "orderbook", "market-making"],
  },
  {
    name: "ThreatGraph",
    description:
      "Spatial-temporal cybersecurity threat intelligence engine with GNNs, Transformers, and Kafka",
    html_url: "https://github.com/khushalmidha/ThreatGraph",
    stargazers_count: 0,
    forks_count: 0,
    language: "Python",
    updated_at: "2026-09-29T00:00:00Z",
    topics: ["cybersecurity", "gnn", "transformers", "kafka", "fastapi"],
  },
];

export const getFeaturedRepos = cache(async (): Promise<{
  repos: GitHubRepo[];
  isLive: boolean;
  fetchedAt: string;
}> => {
  try {
    const results = await Promise.allSettled(
      FEATURED_REPOS.map(async (repoName) => {
        const res = await fetchWithTimeout(
          `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repoName}`,
          {
            headers: getHeaders(),
            next: { revalidate: CACHE_REVALIDATE },
          }
        );
        if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
        const data: GitHubAPIRepo = await res.json();
        return {
          name: data.name,
          description: data.description,
          html_url: data.html_url,
          stargazers_count: data.stargazers_count,
          forks_count: data.forks_count,
          language: data.language,
          updated_at: data.updated_at,
          topics: data.topics ?? [],
        } satisfies GitHubRepo;
      })
    );

    const repos = results
      .filter((r): r is PromiseFulfilledResult<GitHubRepo> => r.status === "fulfilled")
      .map((r) => r.value);

    if (repos.length === 0) {
      return { repos: FALLBACK_REPOS, isLive: false, fetchedAt: "fallback" };
    }

    return { repos, isLive: true, fetchedAt: new Date().toISOString() };
  } catch {
    return { repos: FALLBACK_REPOS, isLive: false, fetchedAt: "fallback" };
  }
});

export const getGitHubProfile = cache(async () => {
  try {
    const res = await fetchWithTimeout(
      `${GITHUB_API}/users/${GITHUB_USERNAME}`,
      {
        headers: getHeaders(),
        next: { revalidate: CACHE_REVALIDATE },
      }
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const data = await res.json();
    return {
      public_repos: data.public_repos as number,
      followers: data.followers as number,
      isLive: true,
    };
  } catch {
    return { public_repos: null, followers: null, isLive: false };
  }
});
