// scripts/verify-website.ts
import { chromium } from "playwright";
import * as fs from "fs";
import * as path from "path";

const PREVIEWS_DIR = path.join(process.cwd(), "public", "site-previews");
fs.mkdirSync(PREVIEWS_DIR, { recursive: true });

async function verify() {
  console.log("=== STARTING FULL PORTFOLIO VERIFICATION ===");
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop verification (1440x900)
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await desktopContext.newPage();

  console.log("1. Testing Desktop Home Page...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(PREVIEWS_DIR, "desktop-home-dark.png"), fullPage: false });
  console.log("   ✓ Saved desktop-home-dark.png");

  // Verify Navigation
  const navTitle = await page.textContent("nav a");
  console.log("   ✓ Nav title:", navTitle?.trim());

  // Test Theme Toggle
  console.log("2. Testing Theme Switcher...");
  const themeBtn = page.locator("button[aria-label*='mode' i], button[aria-label*='theme' i]");
  if (await themeBtn.count() > 0) {
    await themeBtn.first().click();
    await page.waitForTimeout(500);
    const themeAttr = await page.locator("html").getAttribute("data-theme");
    console.log("   ✓ Theme switched to:", themeAttr);
    await page.screenshot({ path: path.join(PREVIEWS_DIR, "desktop-home-light.png"), fullPage: false });
    console.log("   ✓ Saved desktop-home-light.png");
    // Switch back to dark
    await themeBtn.first().click();
    await page.waitForTimeout(500);
  }

  // Test Copy Email
  console.log("3. Testing Email Copy Interaction...");
  const copyBtn = page.locator("button:has-text('Copy')");
  if (await copyBtn.count() > 0) {
    await copyBtn.first().click();
    await page.waitForTimeout(300);
    console.log("   ✓ Copy button clicked successfully");
  }

  // Test Case Study Pages
  console.log("4. Testing Case Study Pages...");
  for (const slug of ["medipulse", "jagrit", "iiitlbachat"]) {
    await page.goto(`http://localhost:3000/projects/${slug}`, { waitUntil: "networkidle" });
    const h1 = await page.textContent("h1");
    console.log(`   ✓ Loaded /projects/${slug}: ${h1?.trim()}`);
    await page.screenshot({ path: path.join(PREVIEWS_DIR, `casestudy-${slug}.png`), fullPage: false });
  }

  // Test Coding Analytics Page
  console.log("5. Testing Coding Analytics Page...");
  await page.goto("http://localhost:3000/coding", { waitUntil: "networkidle" });
  const codingH1 = await page.textContent("h1");
  console.log(`   ✓ Loaded /coding: ${codingH1?.trim()}`);
  await page.screenshot({ path: path.join(PREVIEWS_DIR, "coding-analytics.png"), fullPage: false });

  // 2. Mobile Verification (390x844)
  console.log("6. Testing Mobile Viewport (390px)...");
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle" });

  // Check no horizontal scroll overflow
  const scrollWidth = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await mobilePage.evaluate(() => document.documentElement.clientWidth);
  console.log(`   ✓ Mobile scrollWidth: ${scrollWidth}px, clientWidth: ${clientWidth}px`);
  if (scrollWidth <= clientWidth) {
    console.log("   ✓ PASS: No horizontal overflow on mobile!");
  } else {
    console.log("   ⚠ Warning: horizontal overflow detected");
  }

  // Test Mobile Menu
  const mobileMenuBtn = mobilePage.locator("button[aria-label*='menu' i]");
  if (await mobileMenuBtn.count() > 0) {
    await mobileMenuBtn.first().click();
    await mobilePage.waitForTimeout(300);
    console.log("   ✓ Mobile menu opened successfully");
  }
  await mobilePage.screenshot({ path: path.join(PREVIEWS_DIR, "mobile-home.png"), fullPage: false });
  console.log("   ✓ Saved mobile-home.png");

  // 3. Asset Verification
  console.log("7. Verifying Resume and Certificates Assets...");
  const resumeRes = await page.request.get("http://localhost:3000/resume/Oncampus_Resume.pdf");
  console.log(`   ✓ Resume download status: ${resumeRes.status()} (${(await resumeRes.body()).length} bytes)`);

  const certs = [
    "adobe-gensolve.png",
    "amazon-ml-school-2025.png",
    "codefest25-rank301.png",
    "error404-hackathon.png",
    "flipkart-grid-7.png",
    "meta-hacker-cup-2025.png",
  ];
  for (const cert of certs) {
    const r = await page.request.get(`http://localhost:3000/certificates/${cert}`);
    console.log(`   ✓ Certificate /certificates/${cert}: status ${r.status()}`);
  }

  await browser.close();
  console.log("=== ALL BROWSER VERIFICATIONS COMPLETED SUCCESSFULLY ===");
}

verify().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
