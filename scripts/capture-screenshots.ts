#!/usr/bin/env node
/**
 * Screenshot capture script using Playwright
 * Usage: npm run screenshots
 *
 * Captures public homepages of project demo URLs and saves to public/screenshots/
 * Does NOT bypass authentication. IIITLBachat captures the login page honestly.
 * Run this script manually when you want to refresh screenshots.
 */

import * as fs from "fs";
import * as path from "path";
import { chromium } from "playwright";

const SCREENSHOTS_DIR = path.join(process.cwd(), "public", "screenshots");

const PROJECTS = [
  {
    slug: "medipulse",
    url: "https://www.medipulse.live/",
    filename: "medipulse.png",
    waitFor: "networkidle",
    timeout: 15000,
  },
  {
    slug: "jagrit",
    url: "https://jagrit-eight.vercel.app/",
    filename: "jagrit.png",
    waitFor: "domcontentloaded",
    timeout: 30000,
  },
  {
    slug: "iiitlbachat",
    url: "https://iiitl-bachat.vercel.app/",
    filename: "iiitlbachat.png",
    waitFor: "domcontentloaded",
    timeout: 20000,
  },
] as const;

async function captureScreenshot(
  browser: Awaited<ReturnType<typeof chromium.launch>>,
  project: (typeof PROJECTS)[number]
): Promise<void> {
  const outputPath = path.join(SCREENSHOTS_DIR, project.filename);

  // If a screenshot already exists, keep it unless explicitly refreshing
  if (fs.existsSync(outputPath)) {
    console.log(`  ✓ ${project.slug}: existing screenshot preserved`);
    console.log(`    (Delete ${project.filename} to force re-capture)`);
    return;
  }

  console.log(`  → Capturing ${project.slug} from ${project.url}`);

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();

  try {
    await page.goto(project.url, {
      waitUntil: project.waitFor as "networkidle",
      timeout: project.timeout,
    });

    // Brief extra wait for lazy-loaded content
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: outputPath,
      clip: { x: 0, y: 0, width: 1280, height: 800 },
      type: "png",
    });

    const stats = fs.statSync(outputPath);
    console.log(`  ✓ ${project.slug}: saved ${Math.round(stats.size / 1024)}KB → ${project.filename}`);
  } catch (err) {
    console.error(`  ✗ ${project.slug}: capture failed — ${(err as Error).message}`);
    console.log(`    Preserving any existing screenshot or showing "Preview unavailable"`);

    // Clean up partial file if it exists
    if (fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      if (stats.size < 1000) {
        // Likely corrupt
        fs.unlinkSync(outputPath);
      }
    }
  } finally {
    await context.close();
  }
}

async function main() {
  // Ensure screenshots directory exists
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

  console.log("Portfolio Screenshot Capture");
  console.log("============================");
  console.log(`Output: ${SCREENSHOTS_DIR}`);
  console.log("");

  const forceRefresh = process.argv.includes("--force");
  if (forceRefresh) {
    console.log("--force: deleting existing screenshots before capture\n");
    for (const project of PROJECTS) {
      const p = path.join(SCREENSHOTS_DIR, project.filename);
      if (fs.existsSync(p)) {
        fs.unlinkSync(p);
        console.log(`  Deleted: ${project.filename}`);
      }
    }
    console.log("");
  }

  const browser = await chromium.launch({ headless: true });

  for (const project of PROJECTS) {
    await captureScreenshot(browser, project);
  }

  await browser.close();

  console.log("\nDone. To refresh screenshots next time, run:");
  console.log("  npm run screenshots -- --force");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
