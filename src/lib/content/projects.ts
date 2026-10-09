// src/lib/content/projects.ts
// Edit this file to update project information

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  accentColor: string;
  liveUrl: string;
  githubUrl: string;
  screenshotPath: string;
  stack: string[];
  highlights: string[];
  featured: boolean;
  focus: ("engineering" | "algorithms" | "both")[];
  caseStudy: {
    overview: string;
    problem: string;
    contribution: string;
    architecture: ArchBlock[];
    decisions: Decision[];
    challenges: Challenge[];
    results: string[];
  };
};

type ArchBlock = { title: string; description: string };
type Decision = { decision: string; rationale: string; tradeoff: string };
type Challenge = { challenge: string; solution: string };

export const projects: Project[] = [
  {
    slug: "medipulse",
    title: "MediPulse",
    tagline: "Multi-tenant healthcare SaaS platform",
    description:
      "A full-stack healthcare platform supporting appointments, live OPD queues, WebRTC consultations, hospital workflows, and AI-assisted triage — built with multi-tenant data boundaries and 7-role RBAC.",
    accentColor: "#4ECDC4",
    liveUrl: "https://www.medipulse.live/",
    githubUrl: "https://github.com/khushalmidha/MediPulse",
    screenshotPath: "/screenshots/medipulse.png",
    stack: [
      "MERN",
      "FastAPI",
      "Redis",
      "Kafka",
      "Socket.IO",
      "WebRTC",
      "HuggingFace",
      "RAG",
    ],
    highlights: [
      "125 REST APIs",
      "24 MongoDB models",
      "34 React pages",
      "7-role RBAC with JWT & Google OAuth",
      "AI triage via Gemini + custom RAG pipeline",
      "Atomic transactions & distributed locks",
      "Real-time OPD queues via Kafka + Socket.IO",
    ],
    featured: true,
    focus: ["engineering"],
    caseStudy: {
      overview:
        "MediPulse is a multi-tenant healthcare SaaS platform built to digitize end-to-end hospital workflows — from patient registration and appointment booking to live OPD queues, WebRTC video consultations, and AI-assisted triage. The platform supports 7 distinct roles across hospitals, clinics, patients, and administrators.",
      problem:
        "Hospital digitization tools are often siloed — appointment software doesn't talk to queue management, and triage tools are disconnected from consultation history. The goal was a unified platform that handles the full patient journey, including real-time coordination between hospital staff, doctors, and patients.",
      contribution:
        "Designed and implemented the full backend architecture including 125 REST APIs, 24 MongoDB data models, multi-tenant data isolation, RBAC using JWT and Google OAuth, real-time queues via Kafka and Socket.IO, WebRTC signaling for video consultations, and an AI triage pipeline integrating Gemini, Hugging Face Transformers, and a custom RAG system. Also built 34 React pages for the frontend.",
      architecture: [
        {
          title: "Multi-tenant Data Isolation",
          description:
            "Each hospital's data is scoped by a tenantId field enforced at the application layer on every database query. RBAC middleware validates role membership before any cross-tenant operation.",
        },
        {
          title: "Real-time OPD Queue",
          description:
            "Kafka topics per OPD handle patient token generation and queue advancement. Socket.IO rooms broadcast queue state to waiting patients and reception staff in real time.",
        },
        {
          title: "AI Triage Pipeline",
          description:
            "Patient symptoms are preprocessed and classified using Hugging Face models. A custom RAG pipeline retrieves relevant medical context from a vector store. Gemini generates structured triage recommendations shown to the attending physician.",
        },
        {
          title: "WebRTC Consultation",
          description:
            "Signaling is handled via Socket.IO. STUN/TURN configuration manages NAT traversal. Sessions are time-bounded and tied to appointment records.",
        },
        {
          title: "Financial Integrity",
          description:
            "Virtual wallet operations use atomic MongoDB transactions. Distributed locks (Redis) prevent duplicate refund processing. Idempotency keys ensure at-most-once semantics for payment events.",
        },
      ],
      decisions: [
        {
          decision: "Kafka over direct Socket.IO for queue events",
          rationale:
            "Queue state changes need durability and replay capability — if a Socket.IO server restarts, Kafka retains the event log and consumers can recover.",
          tradeoff:
            "Adds operational complexity; justified for a healthcare context where queue ordering must be reliable.",
        },
        {
          decision: "MongoDB for primary storage with 24 models",
          rationale:
            "Flexible document schema suited the varied data shapes across hospital types (clinics vs. large hospitals have different workflow structures).",
          tradeoff:
            "Requires careful application-level enforcement of consistency that a relational DB would handle natively.",
        },
        {
          decision: "Redis distributed locks for wallet operations",
          rationale:
            "Prevents race conditions in concurrent refund and payment scenarios without requiring a separate queue per operation.",
          tradeoff:
            "Lock TTL must be tuned carefully; too short risks duplicate operations, too long blocks legitimate concurrent requests.",
        },
      ],
      challenges: [
        {
          challenge: "Maintaining queue consistency across server restarts",
          solution:
            "Kafka consumer groups with explicit offset commits ensure each queue event is processed exactly once. Queue state is reconstructed from Kafka on startup.",
        },
        {
          challenge: "Cross-role access in a 7-role RBAC system",
          solution:
            "Role hierarchy is defined in a typed constants file. Middleware checks both role membership and resource ownership (tenantId scope) before forwarding requests.",
        },
        {
          challenge: "AI triage latency in a real-time context",
          solution:
            "Triage runs asynchronously — the initial consultation page loads immediately while triage results stream in. Heavy model inference runs on FastAPI workers with async processing.",
        },
      ],
      results: [
        "125 REST APIs serving 7 user roles across a unified hospital workflow",
        "Real-time OPD queue management with Kafka-backed durability",
        "WebRTC video consultations integrated into the appointment flow",
        "AI triage recommendations available before the physician enters the consultation",
        "Atomic wallet operations with idempotent refund processing",
      ],
    },
  },
  {
    slug: "jagrit",
    title: "Jagrit",
    tagline: "Bilingual news platform with ML-powered ranking",
    description:
      "A bilingual (Hindi/English) news platform with live RSS/API ingestion, Gemini-powered translation and Q&A, XGBoost feed ranking, and a PyTorch NRMS model for offline benchmarking.",
    accentColor: "#FF6B6B",
    liveUrl: "https://jagrit-eight.vercel.app/",
    githubUrl: "https://github.com/khushalmidha/jagrit",
    screenshotPath: "/screenshots/jagrit.png",
    stack: [
      "Node.js",
      "React",
      "FastAPI",
      "MongoDB",
      "Redis",
      "Kafka",
      "XGBoost",
      "PyTorch",
    ],
    highlights: [
      "RSS/API live content ingestion",
      "Gemini-powered Hindi↔English translation",
      "XGBoost personalized feed ranking",
      "PyTorch NRMS offline benchmark (AUC, nDCG)",
      "Kafka + Redis feature store",
      "Three-tier feed fallback architecture",
      "RAG-based contextual Q&A on articles",
    ],
    featured: true,
    focus: ["engineering", "algorithms"],
    caseStudy: {
      overview:
        "Jagrit is a bilingual news platform designed for Hindi and English readers. It ingests live content from RSS feeds and news APIs, translates between languages using Gemini, ranks personalized feeds using XGBoost, and offers RAG-based Q&A on article content. The system includes a PyTorch NRMS model for offline recommendation evaluation.",
      problem:
        "Hindi news aggregation typically requires separate tools for translation, ranking, and Q&A. The goal was a single platform where a reader can browse live bilingual news, ask questions about articles in natural language, and receive a personalized feed — with the ranking system evaluated against established ML benchmarks.",
      contribution:
        "Built the ingestion pipeline, translation layer, Kafka-Redis feature store, XGBoost ranker, RAG Q&A system, and the offline NRMS evaluation pipeline with AUC and nDCG metrics. Implemented the three-tier fallback architecture for feed resilience and the replay-based CTR simulation for offline evaluation.",
      architecture: [
        {
          title: "Content Ingestion",
          description:
            "RSS feeds and news APIs are polled on a schedule. Normalized articles are stored in MongoDB. Kafka handles asynchronous processing and fanout to downstream consumers.",
        },
        {
          title: "Translation & Q&A",
          description:
            "Gemini handles Hindi↔English translation for article content and user queries. The RAG pipeline retrieves relevant article segments before passing context to the LLM for Q&A responses.",
        },
        {
          title: "Feed Ranking",
          description:
            "XGBoost ranks candidate articles using features from the Redis feature store (click history, category affinity, recency signals). Feed ranking runs at request time using cached features.",
        },
        {
          title: "Offline Evaluation",
          description:
            "A PyTorch NRMS (Neural News Recommendation with Multi-head Self-attention) model is trained and evaluated offline using AUC and nDCG metrics. CTR simulation uses a replay-based approach on historical interaction logs.",
        },
        {
          title: "Three-tier Fallback",
          description:
            "Primary feed: personalized XGBoost ranking. Fallback 1: category-based trending articles. Fallback 2: chronological ingestion order. This ensures the feed is always populated even when personalization data is sparse.",
        },
      ],
      decisions: [
        {
          decision: "XGBoost for production ranking vs. NRMS for offline evaluation",
          rationale:
            "XGBoost serves ranking at low latency from a Redis feature store. NRMS is evaluated offline to benchmark neural approaches without the deployment complexity of serving a PyTorch model at request time.",
          tradeoff:
            "NRMS offline metrics are not directly comparable to XGBoost production ranking — they use different feature sets and evaluation conditions.",
        },
        {
          decision: "Replay-based CTR simulation",
          rationale:
            "Real production CTR data from a new platform would take months to accumulate. Replay simulation using historical patterns allows earlier model evaluation.",
          tradeoff:
            "Simulated CTR does not reflect true production user behavior. Results are clearly labeled as simulated.",
        },
      ],
      challenges: [
        {
          challenge: "Feed cold-start for new users without interaction history",
          solution:
            "New users fall through to the fallback tiers automatically. Category preferences collected during onboarding seed the feature store to accelerate personalization.",
        },
        {
          challenge: "Latency of Gemini translation on article ingestion",
          solution:
            "Translation runs asynchronously via Kafka consumers after ingestion. Articles are served in the original language immediately, with translated versions appearing as the async job completes.",
        },
      ],
      results: [
        "Bilingual news feed with live ingestion from RSS and news APIs",
        "XGBoost ranker with three-tier fallback for cold-start and sparse users",
        "NRMS model evaluated offline with AUC and nDCG metrics",
        "RAG-based Q&A on article content using Gemini",
        "Note: offline metrics and simulated CTR are not production performance figures",
      ],
    },
  },
  {
    slug: "iiitlbachat",
    title: "IIITLBachat",
    tagline: "AI-assisted personal finance with voice entry",
    description:
      "A multilingual personal and family finance platform with voice expense entry (Sarvam AI), collaborative expense circles, receipt extraction, anomaly detection, and an AI finance chatbot.",
    accentColor: "#A3E6C5",
    liveUrl: "https://iiitl-bachat.vercel.app/",
    githubUrl: "https://github.com/khushalmidha/IIITLBachat",
    screenshotPath: "/screenshots/iiitlbachat.png",
    stack: [
      "React",
      "Node.js",
      "MongoDB",
      "Gemini AI",
      "Sarvam AI",
      "Chart.js",
      "Google OAuth",
    ],
    highlights: [
      "Voice expense entry via Sarvam AI (Hindi + English)",
      "Collaborative family expense circles",
      "Receipt & PDF extraction with confidence scoring",
      "Overspend anomaly detection",
      "Finance chatbot via Gemini",
      "Spending heatmaps & budget dashboards",
      "Google OAuth authentication",
    ],
    featured: true,
    focus: ["engineering"],
    caseStudy: {
      overview:
        "IIITLBachat is a personal and family finance platform built for multilingual users. It combines voice-first expense entry using Sarvam AI's Hindi-English models, collaborative family expense circles, AI-powered receipt extraction, anomaly detection on spending patterns, and a Gemini-powered finance chatbot — all surfaced through spending heatmaps and budget tracking dashboards.",
      problem:
        "Personal finance apps designed for Indian users often miss voice-first, multilingual expense entry — a key usability requirement when many household finance decisions happen in Hindi. The goal was a platform where expense logging feels as natural as speaking, with AI-assisted extraction for receipts and bills.",
      contribution:
        "Built the full-stack application including voice expense pipeline using Sarvam AI, receipt and PDF extraction with confidence scoring, collaborative expense circle logic, anomaly detection for overspend patterns, Gemini-based finance chatbot, and the Chart.js visualization layer for heatmaps and budget tracking.",
      architecture: [
        {
          title: "Voice Expense Entry",
          description:
            "Audio input is sent to Sarvam AI's speech-to-text models for Hindi and English. Extracted text is parsed using Gemini to identify amount, category, and merchant — returning a structured expense object with a confidence score.",
        },
        {
          title: "Receipt & PDF Extraction",
          description:
            "Uploaded receipts and PDFs are processed using Gemini's multimodal capabilities. Each extracted line item includes a confidence score. Low-confidence items are flagged for user review before being committed to the ledger.",
        },
        {
          title: "Family Expense Circles",
          description:
            "A circle is a shared expense group. Members can log expenses against the circle, split costs, and view each member's contribution. Aggregation runs at request time from the shared ledger.",
        },
        {
          title: "Anomaly Detection",
          description:
            "Weekly budget baselines are established from historical spending per category. Significant deviations trigger an overspend alert surfaced in the dashboard.",
        },
        {
          title: "Finance Chatbot",
          description:
            "Gemini has read-only access to the user's expense history. The chatbot answers questions about spending patterns, budget status, and category breakdowns in natural language.",
        },
      ],
      decisions: [
        {
          decision: "Sarvam AI for Hindi speech recognition over generic STT",
          rationale:
            "Sarvam AI's models are specifically optimized for Indian languages, providing better accuracy on Hindi expense utterances than generic English STT models with Hindi input.",
          tradeoff:
            "Dependency on an external API; if Sarvam AI is unavailable, voice entry falls back to manual text entry.",
        },
        {
          decision: "Confidence scoring on extracted items",
          rationale:
            "Preventing incorrect auto-committed expenses is critical for a finance application. Confidence scoring allows high-confidence extractions to be auto-committed while routing uncertain items to user review.",
          tradeoff:
            "Adds a review step that interrupts the voice-first flow for ambiguous inputs.",
        },
      ],
      challenges: [
        {
          challenge: "Parsing informal Hindi expense utterances",
          solution:
            "After Sarvam AI transcribes the audio, Gemini normalizes informal language patterns (e.g., '200 rupay chai ke liye') into structured expense objects with category classification.",
        },
        {
          challenge: "Keeping chatbot responses grounded to actual user data",
          solution:
            "The chatbot receives a structured summary of the user's expense history as context — it does not have database write access and cannot invent spending data.",
        },
      ],
      results: [
        "Voice expense entry supporting Hindi and English input",
        "Receipt extraction with per-item confidence scoring",
        "Collaborative family expense circles with split tracking",
        "Overspend anomaly detection against weekly budget baselines",
        "Finance chatbot with read-only access to personal expense history",
        "Note: the app is accessible at https://iiitl-bachat.vercel.app/",
      ],
    },
  },
  {
    slug: "quantdesk",
    title: "QuantDesk",
    tagline: "Deterministic C++ order book & algorithmic backtesting suite",
    description:
      "A high-performance algorithmic trading platform with a deterministic C++ matching engine supporting LIMIT, MARKET, IOC, and FOK orders with price-time priority, Avellaneda-Stoikov market making, and an interactive React analytics dashboard for strategy replay.",
    accentColor: "#F59E0B",
    liveUrl: "https://quantdesk-mu.vercel.app/",
    githubUrl: "https://github.com/khushalmidha/Quantdesk",
    screenshotPath: "/screenshots/quantdesk.png",
    stack: [
      "C++20",
      "CMake",
      "GoogleTest",
      "Python",
      "React",
      "Quantitative Trading",
      "FastAPI",
    ],
    highlights: [
      "Deterministic C++ order book & matching engine",
      "Price-time priority with partial fills & multi-level sweeps",
      "LIMIT, MARKET, IOC, and FOK order execution",
      "Avellaneda-Stoikov inventory-based market making algorithm",
      "Cointegration pairs trading backtester in Python",
      "Interactive React depth-of-book and strategy replay dashboard",
      "GoogleTest suite ensuring zero execution drift",
    ],
    featured: true,
    focus: ["engineering", "algorithms", "both"],
    caseStudy: {
      overview:
        "QuantDesk is an institutional-grade quantitative trading backtesting and simulation suite. It pairs a deterministic C++20 limit order book matching engine with a Python quantitative research environment and an interactive React web dashboard for strategy replay, depth-of-book analysis, and performance analytics.",
      problem:
        "Standard backtesting libraries written purely in Python suffer from significant execution latency, unrealistic fill assumptions, and execution drift when simulating high-frequency or inventory-sensitive strategies like market making and pairs trading.",
      contribution:
        "Architected a native C++20 matching engine implementing price-time priority queues with microsecond event dispatching. Implemented an inventory-aware Avellaneda-Stoikov market maker that dynamically skews bid-ask spreads, and built a full-stack React frontend for historical order replay.",
      architecture: [
        {
          title: "Deterministic C++ Matching Engine",
          description:
            "Implemented price-time priority queues for bids and asks using memory-efficient contiguous price buckets. Supports LIMIT, MARKET, IOC (Immediate-or-Cancel), and FOK (Fill-or-Kill) orders with immediate partial fill settlement.",
        },
        {
          title: "Avellaneda-Stoikov Market Making",
          description:
            "Implemented the seminal Avellaneda-Stoikov optimal quoting model. As inventory accumulates in either direction, reservation prices skew quotes away from accumulating adverse inventory while maintaining target spread capture.",
        },
        {
          title: "Statistical Arbitrage & Cointegration",
          description:
            "Engineered a pairs trading pipeline in Python utilizing Johansen cointegration tests, rolling z-score spread calculations, and volatility-scaled half-life rebalancing thresholds.",
        },
        {
          title: "Interactive Strategy Replay Dashboard",
          description:
            "Built a React dashboard displaying real-time depth of book heatmaps, cumulative PnL trajectories, drawdown charts, and per-fill execution slippage logs.",
        },
      ],
      decisions: [
        {
          decision: "C++20 for core execution engine instead of Python",
          rationale:
            "Python backtesting introduces substantial runtime overhead and cannot accurately model deterministic microsecond execution without language runtime artifacts.",
          tradeoff:
            "Requires cross-language bindings and CMake build pipelines compared to an all-Python stack.",
        },
        {
          decision: "Avellaneda-Stoikov quoting over naive fixed spreads",
          rationale:
            "Fixed-spread market makers suffer heavy adverse selection during directional price shocks. Dynamic reservation pricing protects capital by penalizing inventory build-up.",
          tradeoff:
            "Requires accurate continuous estimation of volatility (gamma) and arrival intensity (kappa).",
        },
      ],
      challenges: [
        {
          challenge: "Ensuring 100% deterministic execution across test runs",
          solution:
            "Enforced explicit monotonic timestamp indexing, isolated PRNG seeding, and automated GoogleTest suites verifying exact order book state parity across runs.",
        },
        {
          challenge: "Handling multi-level liquidity sweeps without allocation bottlenecks",
          solution:
            "Designed a recursive price-level decrement loop that updates book volume in-place before emitting execution reports.",
        },
      ],
      results: [
        "Sub-microsecond order matching on synthetic and historical book feeds",
        "Deterministic order execution validated by comprehensive GoogleTest coverage",
        "Live interactive web dashboard deployed at https://quantdesk-mu.vercel.app/",
        "Supports full order lifecycle (LIMIT, MARKET, IOC, FOK) with partial fill logic",
      ],
    },
  },
  {
    slug: "threatgraph",
    title: "ThreatGraph",
    tagline: "Spatial-temporal threat intelligence with GNNs & Transformers",
    description:
      "A real-time cybersecurity threat detection and automated incident response platform on AWS EC2, streaming 10,000+ network flows/sec via Kafka through hybrid Temporal GNN + Transformer models (0.91 F1-score) with interactive 3D Force-Graph attack topologies and RAG-driven MITRE ATT&CK runbooks.",
    accentColor: "#A855F7",
    liveUrl: "http://threatgraph.duckdns.org/",
    githubUrl: "https://github.com/khushalmidha/ThreatGraph",
    screenshotPath: "/screenshots/threatgraph.png",
    stack: [
      "Python",
      "PyTorch",
      "GNNs",
      "FastAPI",
      "Kafka",
      "PostgreSQL",
      "NetworkX",
      "FAISS",
      "AWS EC2",
      "React",
    ],
    highlights: [
      "Spatial-temporal threat detection engine fusing GNNs & Transformers",
      "Streams 10,000+ network flows/sec through Kafka on AWS EC2",
      "0.91 F1-Score & 92% PR-AUC on imbalanced attack vectors",
      "RAG-driven AI SOC investigations mapped to MITRE ATT&CK runbooks",
      "Interactive 3D Force-Graph attack topology visualization",
      "Automated Zero-Trust containment via host micro-isolation",
    ],
    featured: true,
    focus: ["engineering", "algorithms", "both"],
    caseStudy: {
      overview:
        "ThreatGraph is an enterprise-scale threat intelligence and automated incident response system deployed on AWS EC2. It combines high-throughput Kafka streaming with hybrid Temporal Graph Neural Networks (GNNs) and Transformers to detect stealthy lateral movement across network hosts with sub-second latency.",
      problem:
        "Traditional Security Information and Event Management (SIEM) tools evaluate incoming log entries as isolated tabular events. They frequently miss sophisticated advanced persistent threats (APTs) that execute low-and-slow lateral movement across distributed enterprise subnets.",
      contribution:
        "Engineered an end-to-end telemetry pipeline processing 10k+ network flows/sec via Kafka on AWS EC2. Developed a spatial-temporal GNN model achieving a 0.91 F1-score on imbalanced attack datasets and integrated a RAG-powered MITRE ATT&CK SOC analyst agent for automated host containment.",
      architecture: [
        {
          title: "Spatial-Temporal GNN + Transformer Engine",
          description:
            "Constructs dynamic temporal graphs where nodes represent IP addresses/ports and directed edges encode network flows. Combines Graph Convolutional Networks (GCNs) with self-attention to capture multi-hop lateral movement patterns.",
        },
        {
          title: "High-Throughput Kafka Stream Pipeline",
          description:
            "Consumes 10,000+ network flow records per second from distributed sensors on AWS EC2, dispatching batched subgraphs to FastAPI inference workers with sub-second response times.",
        },
        {
          title: "RAG MITRE ATT&CK Analyst",
          description:
            "Embeds MITRE ATT&CK enterprise techniques into FAISS vector storage. When an anomalous graph pattern is detected, the LLM agent retrieves relevant tactics, techniques, and remediation procedures.",
        },
        {
          title: "3D Force-Graph Topology & Containment",
          description:
            "Visualizes enterprise network graphs in real time. Security operators can inspect compromise trajectories and trigger automated Zero-Trust host isolation via firewall API triggers.",
        },
      ],
      decisions: [
        {
          decision: "Graph Neural Networks over traditional tabular tree models",
          rationale:
            "Tabular classifiers miss relational topology across connected hosts. GNNs aggregate contextual neighbor embeddings across multiple network hops to surface coordinated intrusions.",
          tradeoff:
            "Higher computational footprint during dynamic subgraph construction compared to tabular inference.",
        },
        {
          decision: "Zero-Trust automated host micro-isolation",
          rationale:
            "Human SOC response times average several hours, during which ransomware spreads laterally. Automated quarantine upon high-confidence detection halts spread in milliseconds.",
          tradeoff:
            "Requires stringent precision thresholds (PR-AUC 92%) to avoid accidental disruption of legitimate enterprise operations.",
        },
      ],
      challenges: [
        {
          challenge: "Handling severe class imbalance in intrusion datasets (<0.1% attacks)",
          solution:
            "Utilized focal loss optimization and dynamic temporal subgraph sampling to ensure the model learned distinct anomaly representations without false-alarm saturation.",
        },
        {
          challenge: "Sub-second graph update latency under 10k flows/sec",
          solution:
            "Maintained incremental sliding-window neighborhood buffers in Redis rather than re-computing global topology matrices on every packet.",
        },
      ],
      results: [
        "10,000+ network flows per second sustained throughput on AWS EC2",
        "0.91 F1-Score and 92% PR-AUC on benchmark intrusion scenarios",
        "Sub-second alert dispatch with RAG MITRE ATT&CK incident runbooks",
        "Live deployment running at http://threatgraph.duckdns.org/",
      ],
    },
  },
];
