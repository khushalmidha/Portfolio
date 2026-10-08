// src/lib/utils/streak.ts
// Robust streak & calendar-day calculation using Asia/Kolkata timezone

export type Submission = {
  timestampSeconds: number; // Unix timestamp in seconds
  verdict?: "OK" | "ACCEPTED" | "WRONG_ANSWER" | "TIME_LIMIT_EXCEEDED" | string;
  problemId?: string;
};

export type StreakResult = {
  currentStreak: number;
  longestStreak: number;
  totalActiveDays: number;
  type: "solving_streak" | "activity_streak";
  activeDatesIST: string[]; // YYYY-MM-DD in Asia/Kolkata
};

/**
 * Converts a Unix epoch timestamp (in seconds) to a YYYY-MM-DD calendar date string in Asia/Kolkata (UTC+05:30)
 */
export function toKolkataDateString(epochSeconds: number): string {
  // Asia/Kolkata is UTC + 5 hours 30 minutes (19800 seconds)
  const kolkataOffsetMs = 5.5 * 60 * 60 * 1000;
  const date = new Date(epochSeconds * 1000 + kolkataOffsetMs);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Calculates calendar day difference between two YYYY-MM-DD date strings
 */
export function getDayDifference(dateStr1: string, dateStr2: string): number {
  const d1 = new Date(`${dateStr1}T00:00:00Z`).getTime();
  const d2 = new Date(`${dateStr2}T00:00:00Z`).getTime();
  const oneDayMs = 24 * 60 * 60 * 1000;
  return Math.round((d2 - d1) / oneDayMs);
}

/**
 * Computes streaks from a list of submissions.
 * If requireAccepted = true, only counts accepted/OK submissions.
 */
export function calculateStreak(
  submissions: Submission[],
  requireAccepted: boolean = false,
  referenceDateKolkata?: string
): StreakResult {
  if (!submissions || submissions.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalActiveDays: 0,
      type: requireAccepted ? "solving_streak" : "activity_streak",
      activeDatesIST: [],
    };
  }

  // Filter submissions
  const validSubmissions = requireAccepted
    ? submissions.filter(
        (s) => s.verdict === "OK" || s.verdict === "ACCEPTED"
      )
    : submissions;

  if (validSubmissions.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalActiveDays: 0,
      type: requireAccepted ? "solving_streak" : "activity_streak",
      activeDatesIST: [],
    };
  }

  // Extract unique sorted calendar days in Asia/Kolkata
  const uniqueDaysSet = new Set<string>();
  for (const s of validSubmissions) {
    uniqueDaysSet.add(toKolkataDateString(s.timestampSeconds));
  }

  const sortedDays = Array.from(uniqueDaysSet).sort(); // Ascending chronological

  let longestStreak = 0;
  let currentRunningStreak = 0;

  for (let i = 0; i < sortedDays.length; i++) {
    if (i === 0) {
      currentRunningStreak = 1;
    } else {
      const diff = getDayDifference(sortedDays[i - 1], sortedDays[i]);
      if (diff === 1) {
        currentRunningStreak += 1;
      } else if (diff > 1) {
        currentRunningStreak = 1;
      }
    }
    if (currentRunningStreak > longestStreak) {
      longestStreak = currentRunningStreak;
    }
  }

  // Calculate current streak relative to reference date (or today in IST)
  const nowEpoch = Math.floor(Date.now() / 1000);
  const refDate = referenceDateKolkata || toKolkataDateString(nowEpoch);
  const lastActiveDate = sortedDays[sortedDays.length - 1];
  const diffFromRef = getDayDifference(lastActiveDate, refDate);

  let currentStreak = 0;
  // If active today (diff === 0) or yesterday (diff === 1), streak is ongoing
  if (diffFromRef === 0 || diffFromRef === 1) {
    currentStreak = currentRunningStreak;
  } else {
    currentStreak = 0;
  }

  return {
    currentStreak,
    longestStreak,
    totalActiveDays: sortedDays.length,
    type: requireAccepted ? "solving_streak" : "activity_streak",
    activeDatesIST: sortedDays,
  };
}
