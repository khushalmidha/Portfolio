// src/lib/content/skills.ts

export type SkillGroup = {
  id: string;
  label: string;
  skills: Skill[];
};

export type Skill = {
  name: string;
  projectEvidence?: string[]; // project slugs this skill appears in
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages & Algorithms",
    skills: [
      { name: "C++", projectEvidence: [] },
      { name: "C", projectEvidence: [] },
      { name: "Python", projectEvidence: ["medipulse", "jagrit"] },
      { name: "Java", projectEvidence: ["coffeee-io"] },
      { name: "JavaScript", projectEvidence: ["medipulse", "jagrit", "iiitlbachat"] },
      { name: "TypeScript", projectEvidence: [] },
      { name: "SQL", projectEvidence: ["coffeee-io"] },
      { name: "Data Structures & Algorithms", projectEvidence: [] },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "React", projectEvidence: ["medipulse", "jagrit", "iiitlbachat"] },
      { name: "HTML / CSS", projectEvidence: ["medipulse", "jagrit", "iiitlbachat"] },
      { name: "Tailwind CSS", projectEvidence: ["jagrit"] },
      { name: "Chart.js", projectEvidence: ["iiitlbachat"] },
    ],
  },
  {
    id: "backend",
    label: "Backend & Systems",
    skills: [
      { name: "Node.js / Express", projectEvidence: ["medipulse", "jagrit", "iiitlbachat"] },
      { name: "Spring Boot", projectEvidence: ["coffeee-io"] },
      { name: "FastAPI", projectEvidence: ["medipulse", "jagrit"] },
      { name: "Redis", projectEvidence: ["medipulse", "jagrit", "coffeee-io"] },
      { name: "Kafka", projectEvidence: ["medipulse", "jagrit"] },
      { name: "Socket.IO", projectEvidence: ["medipulse"] },
      { name: "WebRTC", projectEvidence: ["medipulse"] },
      { name: "REST APIs", projectEvidence: ["medipulse", "jagrit", "iiitlbachat"] },
      { name: "Docker", projectEvidence: ["coffeee-io"] },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    skills: [
      { name: "MongoDB", projectEvidence: ["medipulse", "jagrit", "iiitlbachat"] },
      { name: "PostgreSQL", projectEvidence: ["coffeee-io"] },
      { name: "MySQL", projectEvidence: [] },
    ],
  },
  {
    id: "ml-ai",
    label: "ML & AI",
    skills: [
      { name: "PyTorch", projectEvidence: ["jagrit"] },
      { name: "XGBoost", projectEvidence: ["jagrit"] },
      { name: "Scikit-learn", projectEvidence: [] },
      { name: "HuggingFace Transformers", projectEvidence: ["medipulse"] },
      { name: "RAG Pipelines", projectEvidence: ["medipulse", "jagrit"] },
      { name: "LLM Integrations", projectEvidence: ["medipulse", "jagrit", "iiitlbachat"] },
      { name: "Gemini API", projectEvidence: ["medipulse", "jagrit", "iiitlbachat"] },
    ],
  },
];
