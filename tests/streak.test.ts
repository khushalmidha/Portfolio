// tests/streak.test.ts
import test, { describe, it } from "node:test";
import assert from "node:assert";
import {
  toKolkataDateString,
  getDayDifference,
  calculateStreak,
  type Submission,
} from "../src/lib/utils/streak";

describe("Asia/Kolkata Timezone & Date Calculations", () => {
  it("correctly converts UTC timestamps to Asia/Kolkata dates across UTC midnight", () => {
    // 2026-03-15 18:29:00 UTC -> 2026-03-15 23:59:00 IST (UTC + 5:30)
    // Epoch: 1773600540
    const ts1 = Date.UTC(2026, 2, 15, 18, 29, 0) / 1000;
    assert.strictEqual(toKolkataDateString(ts1), "2026-03-15");

    // 2026-03-15 18:31:00 UTC -> 2026-03-16 00:01:00 IST (Crossed midnight in India!)
    const ts2 = Date.UTC(2026, 2, 15, 18, 31, 0) / 1000;
    assert.strictEqual(toKolkataDateString(ts2), "2026-03-16");
  });

  it("calculates exact calendar day differences", () => {
    assert.strictEqual(getDayDifference("2026-01-01", "2026-01-02"), 1);
    assert.strictEqual(getDayDifference("2026-01-01", "2026-01-01"), 0);
    assert.strictEqual(getDayDifference("2026-01-01", "2026-01-10"), 9);
    assert.strictEqual(getDayDifference("2026-02-28", "2026-03-01"), 1);
  });
});

describe("Streak Calculation Rules", () => {
  it("handles empty submissions array cleanly", () => {
    const result = calculateStreak([]);
    assert.strictEqual(result.currentStreak, 0);
    assert.strictEqual(result.longestStreak, 0);
    assert.strictEqual(result.totalActiveDays, 0);
  });

  it("computes consecutive days correctly with multiple submissions per day", () => {
    // 3 consecutive days in IST: 2026-03-10, 2026-03-11, 2026-03-12
    const base = Date.UTC(2026, 2, 10, 10, 0, 0) / 1000; // 2026-03-10 IST
    const daySec = 86400;

    const submissions: Submission[] = [
      { timestampSeconds: base, verdict: "OK" },
      { timestampSeconds: base + 3600, verdict: "OK" }, // same day duplicate
      { timestampSeconds: base + daySec, verdict: "OK" }, // day 2
      { timestampSeconds: base + daySec * 2, verdict: "OK" }, // day 3
    ];

    const result = calculateStreak(submissions, true, "2026-03-12");
    assert.strictEqual(result.totalActiveDays, 3);
    assert.strictEqual(result.longestStreak, 3);
    assert.strictEqual(result.currentStreak, 3);
    assert.strictEqual(result.type, "solving_streak");
  });

  it("filters non-accepted submissions when requireAccepted is true", () => {
    const base = Date.UTC(2026, 2, 10, 10, 0, 0) / 1000;
    const daySec = 86400;

    const submissions: Submission[] = [
      { timestampSeconds: base, verdict: "OK" },
      { timestampSeconds: base + daySec, verdict: "WRONG_ANSWER" }, // Failed attempt!
      { timestampSeconds: base + daySec * 2, verdict: "OK" },
    ];

    // As solving streak (only accepted count)
    const solving = calculateStreak(submissions, true, "2026-03-12");
    // Day 2 has no OK submission -> streak broke!
    assert.strictEqual(solving.longestStreak, 1);
    assert.strictEqual(solving.totalActiveDays, 2);

    // As activity streak (all attempts count)
    const activity = calculateStreak(submissions, false, "2026-03-12");
    assert.strictEqual(activity.longestStreak, 3);
    assert.strictEqual(activity.totalActiveDays, 3);
    assert.strictEqual(activity.type, "activity_streak");
  });

  it("detects broken streaks if inactive for >1 day", () => {
    const base = Date.UTC(2026, 2, 10, 10, 0, 0) / 1000;
    const submissions: Submission[] = [
      { timestampSeconds: base, verdict: "OK" },
      { timestampSeconds: base + 86400, verdict: "OK" },
      // 2 day gap
      { timestampSeconds: base + 86400 * 4, verdict: "OK" },
    ];

    const result = calculateStreak(submissions, true, "2026-03-14");
    assert.strictEqual(result.longestStreak, 2);
    assert.strictEqual(result.currentStreak, 1);
  });
});
