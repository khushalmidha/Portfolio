// src/lib/content/experience.ts

export type Experience = {
  id: string;
  company: string;
  companyUrl?: string;
  role: string;
  type: "internship" | "part-time" | "full-time";
  location: string;
  startDate: string;
  endDate: string;
  dateDisplay: string;
  description: string;
  contributions: string[];
  stack: string[];
  note?: string;
};

export const experiences: Experience[] = [
  {
    id: "coffeee-io",
    company: "Coffeee.io",
    companyUrl: "https://coffeee.io",
    role: "SDE Intern",
    type: "internship",
    location: "Remote",
    startDate: "2025-06-01",
    endDate: "2025-08-31",
    dateDisplay: "June 2025 – August 2025",
    description:
      "Built a project-based assessment module enabling candidates to debug live codebases through real error logs, evaluated by hidden automated test cases — and developed an AI assistant providing contextual hints without edit access.",
    contributions: [
      "Designed and built a project-based assessment module using Java, Spring Boot, React, and PostgreSQL",
      "Candidates debug live codebases surfaced through real error logs — simulating actual engineering debugging workflows",
      "Hidden test cases automatically grade candidate submissions against defined acceptance criteria",
      "Developed a read-only AI assistant that provides contextual hints using LLMs without allowing candidates to modify code",
      "Used Redis for caching hint state and Docker for isolated assessment environment execution",
      "AI assistant validated in staging; not yet in production rollout",
    ],
    stack: ["Java", "Spring Boot", "React", "PostgreSQL", "Redis", "Docker", "LLMs"],
    note:
      "AI assistant was validated in staging. Production rollout status is not confirmed.",
  },
];
