# Khushal Midha — Personal Engineering Portfolio

A refined engineering portfolio and systems showcase built for **Khushal Midha**, targeting **SDE, SWE, backend systems, and quant developer** roles. Designed around the concept **"Precision meets product"** — marrying analytical dashboards with design studio craft.

---

## 🚀 Live Demo & Structure

- **Framework**: Next.js 16 (App Router, Turbopack, React 19)
- **Styling**: Vanilla CSS Design System with Tailwind CSS v4 utility tokens
- **Typography**: Space Grotesk (headings), Inter (body), JetBrains Mono (metrics & code)
- **Charts**: Recharts (Codeforces contest rating progression & analytics)
- **Testing & Verification**: Node Test Runner (`npm test`), TypeScript strict checking (`npm run type-check`), ESLint flat config (`npm run lint`), Playwright browser test suite (`npx tsx scripts/verify-website.ts`)
- **Automated Screenshots**: Playwright headless capture (`npm run screenshots`)

### Page Routes

- `/` — Flagship landing page: Hero focus selector, flagship project previews, engineering experience, CP credentials overview, certificate-verified achievements, skills by project evidence, and verified contact actions.
- `/coding` — Deep-dive competitive programming analytics: Live Codeforces rating progression chart with division zones, LeetCode Guardian snapshot, CodeChef 5★ snapshot, contest timeline, and transparent data source disclosures.
- `/projects/medipulse` — Full architectural case study for **MediPulse** (Multi-tenant Healthcare SaaS, 125 REST APIs, Kafka OPD queues, WebRTC, Gemini AI triage).
- `/projects/jagrit` — Full architectural case study for **Jagrit** (Bilingual news platform, XGBoost ranking, PyTorch NRMS benchmark, Kafka feature store).
- `/projects/iiitlbachat` — Full architectural case study for **IIITLBachat** (AI voice finance platform via Sarvam AI & Gemini, family expense circles).
- `/sitemap.xml` & `/robots.txt` — SEO search engine indexing and crawl directives.

---

## 🛠️ Verification & Quality Checks

All checks have been executed and verified locally:

```bash
# 1. Run unit tests (Asia/Kolkata timezone streaks, date math, adapter fallbacks)
npm test

# 2. Type checking (Strict TypeScript without emit)
npm run type-check

# 3. Linting (ESLint 9 flat config, zero errors/warnings)
npm run lint

# 4. Production build (Static site generation with SSG routes)
npm run build

# 5. Automated end-to-end browser verification & preview generation
npx tsx scripts/verify-website.ts

# 6. Capture or refresh live project screenshots
npm run screenshots
```

---

## 🌐 GitHub & Vercel Deployment Setup

Follow these exact steps to deploy the portfolio to production on Vercel:

### 1. Initialize and Push to GitHub

1. Create a new repository on [GitHub](https://github.com/new) (e.g. `portfolio` or `khushalmidha-portfolio`). Keep it **Public** (or Private if you prefer).
2. Link your local repository and push:
   ```bash
   cd portfolio-app
   git remote add origin https://github.com/khushalmidha/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```

### 2. Connect to Vercel

1. Log in to [Vercel](https://vercel.com).
2. Click **Add New...** → **Project**.
3. Import your GitHub repository (`<your-repo-name>`).
4. In the project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `portfolio-app` (or `./` if the root of repo is the app directory)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 3. Configure Environment Variables in Vercel

In Vercel **Settings** → **Environment Variables**, configure the following:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Your canonical domain (e.g. `https://khushalmidha.dev` or `https://your-portfolio.vercel.app`) |
| `GITHUB_TOKEN` | Optional | GitHub personal access token (`read:public_repo` scope) to avoid GitHub API rate limits (60 req/hr unauthenticated vs 5,000 req/hr authenticated). **Server-only; never exposed to browser.** |
| `LEETCODE_LIVE` | Optional | Set to `"false"` (default). Set to `"true"` only if you wish to query the unofficial proxy API. |

### 4. Deployments, Previews & Custom Domains

- **Production Branch**: Any push or pull request merge into `main` automatically triggers a production deployment.
- **Preview Deployments**: Opening a pull request or pushing to feature branches creates isolated, ephemeral preview deployments with unique URLs.
- **Custom Domain**:
  1. In Vercel, go to **Settings** → **Domains**.
  2. Enter your custom domain (e.g., `khushalmidha.dev`).
  3. Configure DNS records with your registrar (`CNAME` pointing to `cname.vercel-dns.com` or `A` record `76.76.21.21`).
  4. Vercel automatically issues and renews free SSL certificates.

### 5. Deployment Triggers vs. Data Cache Refresh

It is important to understand how updates propagate:
- **Code Changes**: Pushing commits to GitHub triggers a Vercel build and instant site deployment.
- **External Data Refresh**: Codeforces rating and GitHub repository data use Next.js time-based revalidation (`revalidate = 3600`, 1 hour). When visitors load the site, Next.js serves the cached static page and refreshes stale data in the background without needing a redeploy.
- **Snapshot Fallbacks**: If Codeforces or GitHub APIs are rate-limited or unreachable, the site automatically falls back to typed, last-known-good snapshots without crashing.

---

## 📝 Content Maintenance Guide

All editable content is centralized in type-safe, validated TypeScript modules:

### 1. Updating Personal Information & Contact Visibility
- File: `src/lib/content/profile.ts`
- Toggle `contact.showPhone: true` to display phone number.
- Update headline, subheadline, education, or social profiles.

### 2. Updating Projects & Case Studies
- File: `src/lib/content/projects.ts`
- Modify or add projects to the `projects` array.
- Each project supports architectural highlights, technology tags, decisions, trade-offs, and case study sections.

### 3. Adding or Updating Achievements
- File: `src/lib/content/achievements.ts`
- Add certificates to `public/certificates/<filename>.png`.
- Link them using `certificateUrl: "/certificates/<filename>.png"` and/or `proofUrl: "<drive_or_ranklist_url>"`.
- The UI automatically renders verified badges and clickable verification modals/links.

### 4. Updating Competitive Programming Snapshots
- **LeetCode**: `src/lib/adapters/leetcode.ts` — update `leetcodeSnapshot` with problems solved, contest rating, and rank.
- **CodeChef**: `src/lib/adapters/codechef.ts` — update `codechefSnapshot` with stars, rating, and global ranking.
- **Codeforces**: `src/lib/adapters/codeforces.ts` — automatically fetches live stats; update `FALLBACK` object for offline resilience.

### 5. Refreshing Project Screenshots
- Run: `npm run screenshots -- --force`
- The Playwright script captures live viewports (1280x800) of `https://www.medipulse.live/`, `https://jagrit-eight.vercel.app/`, and `https://iiitl-bachat.vercel.app/login` without auth bypass.

### 6. Replacing the Resume
- Replace `public/resume/Oncampus_Resume.pdf` with your new PDF resume file.
- The navbar and contact CTA download links automatically serve the updated PDF.

---

## 🔍 Unresolved Facts & Transparency Disclosures

The following details are transparently documented and preserved without inventing unverified claims:

1. **Amazon ML Challenge 2026**: Exact final rank is reported as "Rank under 50" (from resume); specific numeric placing can be updated once final certificates are issued.
2. **LeetCode Problem Breakdown**: Total count is listed as 2000+ (from resume / aggregate 3000+ across platforms); per-difficulty counts (Easy/Medium/Hard) are currently left as snapshots pending owner profile breakdown.
3. **IIITLBachat Demo**: The live demo link directs to the genuine public login interface (`https://iiitl-bachat.vercel.app/login`); no artificial mock data or authentication bypass is used.
4. **CodeChef & LeetCode APIs**: Official public APIs do not exist for LeetCode or CodeChef; data is presented honestly as verified snapshots rather than fake real-time streams.
