// src/lib/content/allProjects.ts
// Comprehensive catalogue of all verified repositories and projects built by Khushal Midha

export type ProjectCategory = "all" | "fullstack" | "ai-ml" | "quant" | "security";

export type CatalogueProject = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  categoryLabel: string;
  language: string;
  tech: string[];
  githubUrl: string;
  liveUrl?: string | null;
  featured?: boolean;
  caseStudySlug?: string | null;
  stars?: number;
  highlight?: string;
};

export const PROJECT_CATEGORIES: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "fullstack", label: "Full-Stack Web" },
  { id: "ai-ml", label: "AI & Machine Learning" },
  { id: "quant", label: "Quant & Low-Latency" },
  { id: "security", label: "Security & Systems" },
];

export const allProjects: CatalogueProject[] = [
  {
    id: "medipulse",
    name: "MediPulse",
    tagline: "Multi-tenant healthcare SaaS with live queues & AI triage",
    description:
      "Full-stack healthcare platform with 125 REST APIs, 24 MongoDB models, 34 React pages, live OPD queues, WebRTC consultations, 7-role RBAC, and AI triage via Gemini + FastAPI.",
    category: "fullstack",
    categoryLabel: "Full-Stack SaaS",
    language: "JavaScript / Python",
    tech: ["MERN", "FastAPI", "Redis", "Kafka", "Socket.IO", "WebRTC", "RAG"],
    githubUrl: "https://github.com/khushalmidha/MediPulse",
    liveUrl: "https://www.medipulse.live/",
    featured: true,
    caseStudySlug: "medipulse",
    highlight: "125 REST APIs • 7-Role RBAC • Live OPD Queues",
  },
  {
    id: "jagrit",
    name: "Jagrit",
    tagline: "Bilingual news platform with ML ranking & NRMS evaluation",
    description:
      "Bilingual (Hindi/English) news aggregator with live RSS ingestion, Gemini translation & RAG Q&A, XGBoost feed ranking, and PyTorch NRMS recommendation benchmarks.",
    category: "ai-ml",
    categoryLabel: "AI & ML",
    language: "Python / JavaScript",
    tech: ["PyTorch", "XGBoost", "FastAPI", "Node.js", "Kafka", "Redis", "Gemini AI"],
    githubUrl: "https://github.com/khushalmidha/jagrit",
    liveUrl: "https://jagrit-eight.vercel.app/",
    featured: true,
    caseStudySlug: "jagrit",
    highlight: "XGBoost Ranking • PyTorch NRMS • 3-Tier Fallback",
  },
  {
    id: "iiitlbachat",
    name: "IIITLBachat",
    tagline: "AI personal finance tracker with multilingual voice entry",
    description:
      "Campus student personal finance platform with Sarvam AI Hinglish voice expense logging, Gemini Flash receipt OCR, collaborative family expense circles, and overspend anomaly detection.",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    language: "JavaScript",
    tech: ["React", "Node.js", "MongoDB", "Gemini AI", "Sarvam AI", "Chart.js"],
    githubUrl: "https://github.com/khushalmidha/IIITLBachat",
    liveUrl: "https://iiitl-bachat.vercel.app/",
    featured: true,
    caseStudySlug: "iiitlbachat",
    highlight: "Voice Input • Gemini OCR • Budget Analytics",
  },
  {
    id: "threatgraph",
    name: "ThreatGraph",
    tagline: "Spatial-temporal threat intelligence with GNNs & Transformers",
    description:
      "AWS EC2 threat detection engine streaming 10,000+ network flows/sec via Kafka through hybrid Temporal GNN + Transformer models (0.91 F1-score) with RAG MITRE ATT&CK analyst runbooks.",
    category: "security",
    categoryLabel: "Security & Systems",
    language: "Python",
    tech: ["Python", "PyTorch", "GNNs", "FastAPI", "Kafka", "PostgreSQL", "FAISS", "AWS EC2"],
    githubUrl: "https://github.com/khushalmidha/ThreatGraph",
    liveUrl: "http://threatgraph.duckdns.org/",
    featured: true,
    caseStudySlug: "threatgraph",
    highlight: "10k flows/sec • 0.91 F1-Score • MITRE ATT&CK RAG",
  },
  {
    id: "quantdesk",
    name: "QuantDesk",
    tagline: "C++ algorithmic trading order book & backtesting engine",
    description:
      "Deterministic C++ order book & matching engine with price-time priority, partial fills, LIMIT/MARKET/IOC/FOK orders, Avellaneda-Stoikov market making, and React analytics dashboard.",
    category: "quant",
    categoryLabel: "Quant & Low-Latency",
    language: "C++ / Python",
    tech: ["C++20", "CMake", "GoogleTest", "Python", "React", "Quantitative Trading"],
    githubUrl: "https://github.com/khushalmidha/Quantdesk",
    liveUrl: "https://quantdesk-mu.vercel.app/",
    featured: true,
    caseStudySlug: "quantdesk",
    highlight: "Deterministic Engine • Avellaneda-Stoikov • C++20",
  },
  {
    id: "triageagent",
    name: "TriageAgent",
    tagline: "Provider-agnostic clinical AI triage & automated QA evaluator",
    description:
      "AI support agent utilizing LiteLLM and FAISS for semantic retrieval (RAG), improving intent classification by 37%, with a 6-signal risk escalation engine and LLM-as-a-Judge evaluation (1.0 Cohen's Kappa).",
    category: "ai-ml",
    categoryLabel: "AI & ML",
    language: "Python",
    tech: ["Python", "LiteLLM", "FAISS", "RAG", "Sentence-Transformers", "LLMs"],
    githubUrl: "https://github.com/khushalmidha/TriageAgent",
    featured: true,
    highlight: "+37% Intent Accuracy • 1.0 Cohen's Kappa QA",
  },
  {
    id: "pixel-perfect",
    name: "pixel-perfect",
    tagline: "High-precision web canvas & UI layout rendering engine",
    description:
      "Sub-pixel canvas rendering tool for designers and front-end developers, featuring layer transformations, vector geometry calculation, and instant CSS export.",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    language: "TypeScript",
    tech: ["TypeScript", "Next.js", "React", "Canvas API", "Tailwind CSS"],
    githubUrl: "https://github.com/khushalmidha/pixel-perfect",
    liveUrl: "https://pixel-perfect-virid.vercel.app/",
    highlight: "Sub-pixel Precision • Canvas Vector Engine",
  },
  {
    id: "chessgrind",
    name: "chessgrind",
    tagline: "Real-time multiplayer chess with move validation & analytics",
    description:
      "Interactive multiplayer chess application powered by Java Spring Boot backend, real-time WebSocket matchmaking, move notation parsing, and game replay evaluation.",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    language: "Java / React",
    tech: ["Java", "Spring Boot", "WebSockets", "React", "Chess Engine"],
    githubUrl: "https://github.com/khushalmidha/chessgrind",
    liveUrl: "https://chessgrind-xi.vercel.app/",
    highlight: "WebSocket Matchmaking • Replay Analytics",
  },
  {
    id: "cybermart",
    name: "CyberMart",
    tagline: "E-waste circular economy buy & sell marketplace",
    description:
      "Circular economy platform facilitating electronic waste collection, certified recycler transactions, scrap classification, and reverse logistics tracking.",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    language: "TypeScript",
    tech: ["TypeScript", "Next.js", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/khushalmidha/CyberMart",
    liveUrl: "https://cyber-mart-5khh.vercel.app/",
    highlight: "Circular Economy • Reverse Logistics",
  },
  {
    id: "mindchain",
    name: "MindChain",
    tagline: "Decentralized mental health privacy & audit ledger",
    description:
      "Web3 platform using smart contracts to store tamper-proof verification proofs for mental health consultations while keeping private clinical records encrypted off-chain.",
    category: "security",
    categoryLabel: "Security & Systems",
    language: "JavaScript / Solidity",
    tech: ["Solidity", "Ethereum", "Web3.js", "React", "Node.js"],
    githubUrl: "https://github.com/khushalmidha/MindChain",
    liveUrl: "https://mind-chain-dusky.vercel.app/",
    highlight: "Smart Contracts • Privacy-Preserving Ledger",
  },
  {
    id: "jobfinder",
    name: "JobFinder",
    tagline: "Smart job search portal with automated application pipeline",
    description:
      "Job hunting dashboard featuring automated keyword matching against job listings, application status kanban boards, and interview schedule tracking.",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    language: "JavaScript",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/khushalmidha/JobFinder",
    liveUrl: "https://job-finder-nu-gilt.vercel.app/",
    stars: 1,
    highlight: "Keyword Scoring • Application Kanban",
  },
  {
    id: "submission",
    name: "Submission",
    tagline: "Automated programming assignment evaluator & grading system",
    description:
      "Academic code submission engine that automatically compiles and executes student submissions against hidden test suites with detailed execution telemetry.",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    language: "JavaScript",
    tech: ["React", "Node.js", "Express", "Docker Sandbox"],
    githubUrl: "https://github.com/khushalmidha/Submission",
    liveUrl: "https://submission-virid.vercel.app/",
    highlight: "Automated Grading • Sandboxed Execution",
  },
  {
    id: "sanctum-sanctorum",
    name: "sanctum-sanctorum",
    tagline: "Isolated Linux sandbox for secure untrusted code execution",
    description:
      "Linux containerization runtime leveraging namespaces, cgroups v2, and seccomp filters to safely run arbitrary untrusted user code with CPU, memory, and disk quotas.",
    category: "security",
    categoryLabel: "Security & Systems",
    language: "Python",
    tech: ["Python", "Linux Namespaces", "cgroups", "Seccomp", "OS Security"],
    githubUrl: "https://github.com/khushalmidha/sanctum-sanctorum",
    highlight: "Linux Namespaces • cgroups Quota Enforcement",
  },
  {
    id: "order-book-reconstruction",
    name: "order_book_reconstruction",
    tagline: "Sub-microsecond limit order book reconstruction in C++",
    description:
      "High-frequency market microstructure engine parsing raw ITCH/OUCH market feeds into level-2 and level-3 depth books with lock-free memory allocation.",
    category: "quant",
    categoryLabel: "Quant & Low-Latency",
    language: "C++",
    tech: ["C++20", "Order Book", "Market Microstructure", "Low Latency", "ITCH"],
    githubUrl: "https://github.com/khushalmidha/order_book_reconstruction",
    highlight: "Level-3 Book • Sub-microsecond Parser",
  },
  {
    id: "blockhouse-execution-analysis",
    name: "blockhouse-execution-analysis",
    tagline: "Quantitative trade execution & market impact modeling",
    description:
      "Quantitative research suite analyzing slippage, transaction cost analysis (TCA), and market impact modeling against TWAP and VWAP execution algorithms.",
    category: "quant",
    categoryLabel: "Quant & Low-Latency",
    language: "Jupyter Notebook",
    tech: ["Python", "Pandas", "NumPy", "TCA Analysis", "VWAP/TWAP"],
    githubUrl: "https://github.com/khushalmidha/blockhouse-execution-analysis",
    highlight: "Transaction Cost Analysis • Market Impact Curves",
  },
  {
    id: "ordernow",
    name: "Ordernow",
    tagline: "Concurrent low-latency order routing & matching prototype",
    description:
      "Multithreaded C++ order router benchmarking lock-free circular queues against mutex-locked buffers under high order arrival rates.",
    category: "quant",
    categoryLabel: "Quant & Low-Latency",
    language: "C++",
    tech: ["C++", "Multithreading", "Lock-free Queues", "Order Routing"],
    githubUrl: "https://github.com/khushalmidha/Ordernow",
    highlight: "Lock-Free Ring Buffer • Concurrent Matching",
  },
  {
    id: "superresnet",
    name: "SuperResNET",
    tagline: "Deep residual network for single-image super-resolution",
    description:
      "PyTorch implementation of deep residual convolutional neural networks for single-image super-resolution (SISR), featuring perceptual loss and bicubic upsampling comparison.",
    category: "ai-ml",
    categoryLabel: "AI & ML",
    language: "Python",
    tech: ["PyTorch", "ResNet", "Computer Vision", "Deep Learning"],
    githubUrl: "https://github.com/khushalmidha/SuperResNET",
    highlight: "Perceptual Loss • PSNR/SSIM Benchmarking",
  },
  {
    id: "senti-analysis",
    name: "Senti-Analysis",
    tagline: "Financial news sentiment analysis & market trend classifier",
    description:
      "Natural language processing pipeline comparing fine-tuned transformer models against lexicon baselines for predicting directional shifts from market headlines.",
    category: "ai-ml",
    categoryLabel: "AI & ML",
    language: "Jupyter Notebook",
    tech: ["Python", "Transformers", "BERT", "NLTK", "Scikit-Learn"],
    githubUrl: "https://github.com/khushalmidha/Senti-Analysis",
    highlight: "Transformer NLP • Headline Sentiment",
  },
  {
    id: "healthbridge",
    name: "HealthBridge",
    tagline: "Telemedicine doctor-patient coordination portal",
    description:
      "Doctor consultation and appointment scheduling system with patient health record uploads, slot management, and automated prescription generation.",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    language: "JavaScript",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/khushalmidha/HealthBridge",
    highlight: "Doctor Rosters • Digital Prescriptions",
  },
  {
    id: "boldnarrative",
    name: "BoldNarrative",
    tagline: "Full-stack publishing & content management platform",
    description:
      "Modern editorial platform with rich text authoring, category filtering, reading time estimates, and author profile pages.",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    language: "JavaScript",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    githubUrl: "https://github.com/khushalmidha/BoldNarrative",
    highlight: "Markdown CMS • Author Profiles",
  },
  {
    id: "inventory-forecasting",
    name: "Inventory_forcasting",
    tagline: "Supply chain demand forecasting with ARIMA & Prophet",
    description:
      "Time-series predictive modeling on multi-store inventory datasets comparing ARIMA, SARIMA, and Facebook Prophet to optimize warehouse replenishment cycles.",
    category: "ai-ml",
    categoryLabel: "AI & ML",
    language: "Jupyter Notebook",
    tech: ["Python", "Prophet", "Time-Series", "ARIMA", "Pandas"],
    githubUrl: "https://github.com/khushalmidha/Inventory_forcasting",
    highlight: "Time-Series • SARIMA & Prophet Optimization",
  },
  {
    id: "blog-app",
    name: "Blog-App",
    tagline: "Full-stack blog application with JWT authentication",
    description:
      "Responsive blogging application featuring secure JWT authentication, rich markdown post editor, tags taxonomy, and comment threads.",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    language: "JavaScript",
    tech: ["Node.js", "Express", "JWT", "MongoDB"],
    githubUrl: "https://github.com/khushalmidha/Blog-App",
    highlight: "JWT Security • Markdown Publishing",
  },
  {
    id: "netflix-clone",
    name: "netflix.clone",
    tagline: "Responsive streaming UI replica with interactive carousels",
    description:
      "Pixel-faithful implementation of the Netflix streaming dashboard with horizontal content carousels, responsive media queries, and hero video preview styling.",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    language: "CSS / HTML",
    tech: ["HTML5", "CSS3", "Responsive Design", "Flexbox/Grid"],
    githubUrl: "https://github.com/khushalmidha/netflix.clone",
    highlight: "Pixel-Accurate UI • CSS Flex/Grid Carousels",
  },
];
