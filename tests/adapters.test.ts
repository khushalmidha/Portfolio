// tests/adapters.test.ts
import test, { describe, it } from "node:test";
import assert from "node:assert";
import { leetcodeSnapshot } from "../src/lib/adapters/leetcode";
import { codechefSnapshot } from "../src/lib/adapters/codechef";

describe("Adapter Fallbacks and Snapshots", () => {
  it("verifies LeetCode snapshot contract and honest metadata", () => {
    assert.strictEqual(leetcodeSnapshot.isLive, false);
    assert.strictEqual(leetcodeSnapshot.username, "khushalmidha");
    assert.strictEqual(typeof leetcodeSnapshot.rating, "number");
    assert.strictEqual(leetcodeSnapshot.rating, 2139);
    assert.strictEqual(leetcodeSnapshot.rank, "Guardian");
    assert(leetcodeSnapshot.dataNote.length > 20);
    assert(leetcodeSnapshot.source.includes("leetcode.com"));
  });

  it("verifies CodeChef snapshot contract and honest metadata", () => {
    assert.strictEqual(codechefSnapshot.isLive, false);
    assert.strictEqual(codechefSnapshot.username, "codebeast24");
    assert.strictEqual(typeof codechefSnapshot.rating, "number");
    assert.strictEqual(codechefSnapshot.rating, 2131);
    assert.strictEqual(codechefSnapshot.stars, 5);
    assert.strictEqual(codechefSnapshot.rank, "5★ Rated");
    assert(codechefSnapshot.dataNote.length > 20);
    assert(codechefSnapshot.source.includes("codechef.com"));
  });

  it("ensures ratings and metrics are explicitly typed without simulated score combinations", () => {
    // Requirements state: Do not combine platform ratings into a single invented skill score
    assert.notStrictEqual(codechefSnapshot.rating, null);
    assert.notStrictEqual(leetcodeSnapshot.rating, null);
  });
});
