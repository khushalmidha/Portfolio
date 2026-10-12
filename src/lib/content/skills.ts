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
    label: "Languages",
    skills: [
      { name: "Python", projectEvidence: ["jagrit", "threatgraph", "quantdesk", "medipulse"] },
      { name: "C++", projectEvidence: [] },
      { name: "C", projectEvidence: [] },
      { name: "JavaScript", projectEvidence: ["medipulse", "jagrit", "iiitlbachat"] },
      { name: "TypeScript", projectEvidence: ["quantdesk"] },
      { name: "Java", projectEvidence: ["coffeee-io"] },
      { name: "SQL", projectEvidence: ["threatgraph", "quantdesk", "coffeee-io"] },
    ],
  },
  {
    id: "ml-ai",
    label: "Machine Learning & AI",
    skills: [
      { name: "PyTorch", projectEvidence: ["jagrit", "threatgraph"] },
      { name: "FAISS (Vector Search)", projectEvidence: ["jagrit", "threatgraph"] },
      { name: "Recommender Systems (Two-Tower)", projectEvidence: ["jagrit"] },
      { name: "Computer Vision (ResNet-50)", projectEvidence: ["jagrit"] },
      { name: "Graph Neural Networks (GNNs)", projectEvidence: ["threatgraph"] },
      { name: "Transformers", projectEvidence: ["threatgraph", "medipulse"] },
      { name: "XGBoost", projectEvidence: ["jagrit"] },
      { name: "Scikit-learn", projectEvidence: ["jagrit", "threatgraph"] },
      { name: "MLOps (MLflow)", projectEvidence: ["jagrit", "threatgraph"] },
      { name: "LLMs & Agentic AI", projectEvidence: ["threatgraph", "jagrit", "medipulse"] },
      { name: "RAG & Semantic Caching", projectEvidence: ["threatgraph", "medipulse", "jagrit"] },
    ],
  },
  {
    id: "backend",
    label: "Backend & Systems",
    skills: [
      { name: "FastAPI", projectEvidence: ["jagrit", "threatgraph", "medipulse"] },
      { name: "Redis", projectEvidence: ["jagrit", "threatgraph", "quantdesk", "medipulse"] },
      { name: "Apache Kafka", projectEvidence: ["jagrit", "threatgraph", "medipulse"] },
      { name: "Node.js / Express.js", projectEvidence: ["medipulse", "jagrit", "iiitlbachat"] },
      { name: "Spring Boot", projectEvidence: ["coffeee-io"] },
      { name: "REST API Design", projectEvidence: ["medipulse", "jagrit", "threatgraph", "iiitlbachat"] },
    ],
  },
  {
    id: "database",
    label: "Databases",
    skills: [
      { name: "PostgreSQL", projectEvidence: ["threatgraph", "quantdesk", "coffeee-io"] },
      { name: "MongoDB", projectEvidence: ["medipulse", "jagrit", "iiitlbachat"] },
      { name: "MySQL", projectEvidence: [] },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "React.js", projectEvidence: ["jagrit", "threatgraph", "quantdesk", "medipulse", "iiitlbachat"] },
      { name: "TypeScript", projectEvidence: ["quantdesk"] },
      { name: "HTML & CSS", projectEvidence: ["medipulse", "jagrit", "iiitlbachat"] },
      { name: "Tailwind CSS", projectEvidence: ["jagrit", "quantdesk"] },
      { name: "Bootstrap", projectEvidence: [] },
    ],
  },
  {
    id: "technical-courses",
    label: "CS Fundamentals & Technical Skills",
    skills: [
      { name: "Data Structures & Algorithms", projectEvidence: [] },
      { name: "Competitive Programming", projectEvidence: [] },
      { name: "Object Oriented Programming", projectEvidence: ["coffeee-io"] },
      { name: "Database Management Systems", projectEvidence: ["threatgraph", "coffeee-io"] },
      { name: "Computer Networks", projectEvidence: ["threatgraph"] },
      { name: "Operating Systems", projectEvidence: [] },
    ],
  },
];

