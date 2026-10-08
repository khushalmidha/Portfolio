// src/lib/content/achievements.ts
// Source: Verified from certificates provided by Khushal Midha
// Dates and ranks are certificate-verified unless noted

export type Achievement = {
  id: string;
  title: string;
  organization: string;
  date: string; // ISO date string (certificate-verified)
  dateDisplay: string;
  category: "competition" | "selection" | "hackathon" | "recognition";
  result: string;
  scale?: string;
  certificateNote?: string;
  verifiedBy: "certificate" | "resume" | "resume-note";
  certificateUrl?: string;
  proofUrl?: string;
};

export const achievements: Achievement[] = [
  {
    id: "meta-hacker-cup-2025",
    title: "Meta Hacker Cup 2025",
    organization: "Meta",
    date: "2025-01-01", // year verified from certificate
    dateDisplay: "2025",
    category: "competition",
    result: "Round 3 — Rank 186",
    scale: "Global competition",
    certificateNote:
      "Certificate confirms progression: Practice 857th → Round 1 342nd → Round 2 245th → Round 3 186th",
    verifiedBy: "certificate",
    certificateUrl: "/certificates/meta-hacker-cup-2025.png",
    proofUrl: "https://drive.google.com/file/d/1_NaRLSRc_Up69mdPD2T93Fm0R_jqc8j2/view?usp=sharing",
  },
  {
    id: "amazon-ml-school-2025",
    title: "Amazon ML Summer School 2025",
    organization: "Amazon",
    date: "2025-09-10",
    dateDisplay: "August–September 2025",
    category: "selection",
    result: "Selected & Attended",
    scale: "~3,000 selected from ~85,000 applicants (resume-reported scale)",
    certificateNote:
      "Letter of Acknowledgement dated September 10, 2025. Program ran Aug 9–31, 2025.",
    verifiedBy: "certificate",
    certificateUrl: "/certificates/amazon-ml-school-2025.png",
    proofUrl: "https://drive.google.com/file/d/1qn8YGoCJy-A-J5HYMJ9ZrGtkxBBXXv3F/view?usp=sharing",
  },
  {
    id: "amazon-ml-challenge-2026",
    title: "Amazon ML Challenge 2026",
    organization: "Amazon",
    date: "2026-01-01", // year from resume
    dateDisplay: "2026",
    category: "competition",
    result: "Top 50 — 11,000+ teams",
    scale: "11,000+ teams",
    certificateNote: "Rank and scale from resume; exact rank not certificate-verified",
    verifiedBy: "resume",
  },
  {
    id: "adobe-gensolve-2024",
    title: "Adobe GenSolve",
    organization: "Adobe",
    date: "2024-12-08",
    dateDisplay: "December 8, 2024",
    category: "competition",
    result: "Top 5% — 54,000+ participants",
    scale: "54,000+ participants",
    certificateNote:
      "Certificate from Harpreet Kaur, Director – Adobe India Talent Acquisition. Date: 12/08/2024.",
    verifiedBy: "certificate",
    certificateUrl: "/certificates/adobe-gensolve.png",
    proofUrl: "https://drive.google.com/file/d/1ayHmk92KJzqC-nZtHEPJdA1BPzwnR0MT/view?usp=sharing",
  },
  {
    id: "flipkart-grid-7",
    title: "Flipkart GRID 7.0",
    organization: "Flipkart",
    date: "2025-08-15",
    dateDisplay: "August 15, 2025",
    category: "competition",
    result: "National Semi-Finalist",
    scale: "National level",
    certificateNote:
      "Certificate from Seema Nair, CHRO – Flipkart. Date: 15 August 2025.",
    verifiedBy: "certificate",
    certificateUrl: "/certificates/flipkart-grid-7.png",
  },
  {
    id: "icpc-regionalist-2024",
    title: "ICPC Amritapuri Regional",
    organization: "ICPC",
    date: "2024-11-01", // approximate — 2024-25 season
    dateDisplay: "2024–25",
    category: "competition",
    result: "Regionalist — Team Overshadowed",
    scale: "Regional level",
    certificateNote: "From resume; year 2024–25 season",
    verifiedBy: "resume",
  },
  {
    id: "codefest25-prelims",
    title: "CodeFest'25 Prelims",
    organization: "IICPC (Intercollegiate Informatic and Competitive Programming Camp)",
    date: "2025-01-01",
    dateDisplay: "2025",
    category: "competition",
    result: "Rank 301",
    scale: "National — sponsored by Jane Street, Jump Trading, Citadel, HRT, D.E. Shaw",
    certificateNote: "Certificate from IICPC verified. Rank 301 confirmed.",
    verifiedBy: "certificate",
    certificateUrl: "/certificates/codefest25-rank301.png",
  },
  {
    id: "error404-hackathon-2024",
    title: "ERROR 404 Hackathon",
    organization: "ERROR 404",
    date: "2024-10-19",
    dateDisplay: "October 19–20, 2024",
    category: "hackathon",
    result: "First Place — Health & Wellbeing Edition",
    scale: "Certificate confirmed",
    certificateNote:
      "Certificate of Excellence. Signed by Akshay Srinivas (President), Kevin Madhan (Vice President), Siddharth Premanand (President).",
    verifiedBy: "certificate",
    certificateUrl: "/certificates/error404-hackathon.png",
  },
  {
    id: "freshers-cup-2024",
    title: "Freshers Cup 2024",
    organization: "CP Wing, Axios, IIIT Lucknow",
    date: "2024-09-01", // approximate — freshman year
    dateDisplay: "2024",
    category: "recognition",
    result: "Winner — 250+ peers",
    scale: "250+ participants",
    certificateNote: "From resume",
    verifiedBy: "resume",
  },
];
