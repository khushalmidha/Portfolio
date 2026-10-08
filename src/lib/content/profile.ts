// src/lib/content/profile.ts
// Primary source of truth for personal information
// Edit this file to update your portfolio content

export const profile = {
  name: "Khushal Midha",
  initials: "KM",
  headline: "I build systems. I solve hard problems.",
  subheadline:
    "CS & AI undergraduate at IIIT Lucknow building full-stack products, backend systems, and applied AI — with strong competitive programming credentials.",
  lookingFor: [
    "SDE roles",
    "SWE roles",
    "Backend engineering",
    "Quant developer opportunities",
  ],
  education: {
    institution: "Indian Institute of Information Technology, Lucknow",
    degree: "B.Tech in Computer Science and Artificial Intelligence",
    period: "August 2023 – July 2027",
    cgpa: "8.72 / 10",
    cgpaSource: "Resume",
  },
  contact: {
    email: "midhakhushal5@gmail.com",
    phone: "+91 90507 40836",
    showPhone: false, // set to true to make phone visible
  },
  social: {
    github: "https://github.com/khushalmidha",
    linkedin: "https://www.linkedin.com/in/khushal-midha-260bb3288/",
    codeforces: "https://codeforces.com/profile/Khushal_Midha",
    codechef: "https://www.codechef.com/users/codebeast24",
    leetcode: "https://leetcode.com/u/khushalmidha/",
  },
  resume: "/resume/Oncampus_Resume.pdf",
  evidenceRow: [
    { label: "3000+ problems solved", sub: "Codeforces + LeetCode" },
    { label: "Expert", sub: "Codeforces" },
    { label: "5★ rated", sub: "CodeChef" },
    { label: "ICPC Regionalist", sub: "2024–25" },
  ],
} as const;
