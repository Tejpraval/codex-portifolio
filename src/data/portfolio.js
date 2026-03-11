import {
  BadgeCheck,
  BriefcaseBusiness,
  Github,
  Linkedin,
  Mail,
  Phone,
  Sparkles,
  ShieldCheck,
  Workflow,
  BrainCircuit,
  Rocket,
} from "lucide-react";

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export const heroLinks = [
  { label: "View Projects", href: "#projects", variant: "primary" },
  { label: "Download Resume", href: "#resume" },
  { label: "GitHub", href: "https://github.com/Tejpraval", icon: Github },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/tej-praval-pula", icon: Linkedin },
];

export const heroRoles = ["Full Stack Developer", "AI & ML Engineer", "Backend Systems Builder"];

export const heroProof = [
  "Computer Science (AI & ML) student at Lovely Professional University",
  "Full-stack projects across SaaS, policy systems, and AI workflows",
  "Internship experience in both AI experimentation and frontend delivery",
];

export const heroMetrics = [
  { value: "12+", label: "Projects Shipped" },
  { value: "2", label: "Internships" },
  { value: "18+", label: "Technologies Used" },
];

export const trustSignals = [
  {
    icon: Rocket,
    title: "Product-minded execution",
    copy: "Shipping interfaces that communicate credibility quickly and convert curiosity into trust.",
  },
  {
    icon: Workflow,
    title: "Backend and systems depth",
    copy: "Designing APIs, auth flows, rollout logic, and safer platform behavior with production discipline.",
  },
  {
    icon: BrainCircuit,
    title: "Applied AI fluency",
    copy: "Using ML pipelines and AI-native product ideas where they create real leverage, not noise.",
  },
  {
    icon: ShieldCheck,
    title: "Security-aware thinking",
    copy: "Comfortable with RBAC, policy evolution, API security, and access-control design constraints.",
  },
];

export const stats = [
  { label: "Projects Built", value: 12, suffix: "+" },
  { label: "Technologies Used", value: 18, suffix: "+" },
  { label: "Internships Completed", value: 2, suffix: "" },
];

export const interests = [
  "distributed systems",
  "AI-driven applications",
  "SaaS platforms",
  "developer tooling",
];

export const skillGroups = [
  {
    title: "Languages",
    items: ["C++", "TypeScript", "JavaScript", "Python", "C"],
  },
  {
    title: "Frontend",
    items: ["React.js", "HTML5", "CSS3", "Bootstrap", "Tailwind"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Middleware"],
  },
  {
    title: "Database",
    items: ["MongoDB", "MySQL"],
  },
  {
    title: "Tools",
    items: ["Git", "Postman", "MongoDB Compass", "Figma"],
  },
  {
    title: "Concepts",
    items: ["RBAC", "API Security", "Policy Versioning", "DSA"],
  },
];

export const projects = [
  {
    slug: "startupmatch",
    title: "StartupMatch",
    subtitle: "AI Co-Founder Finder",
    category: "Flagship SaaS",
    description:
      "A production-ready MERN SaaS app connecting startup founders through AI-driven compatibility scoring, real-time chat, and a project marketplace.",
    problem:
      "Early-stage founders often struggle to discover aligned collaborators with complementary skills, realistic availability, and credible intent to build.",
    role:
      "Worked across the full-stack product flow, including matching logic, auth flows, real-time communication, and marketplace-style collaboration surfaces.",
    impact:
      "Turned founder discovery into a more SaaS-like experience with compatibility scoring, accepted-match chat, and structured collaboration after discovery.",
    standout:
      "Built a weighted matching engine instead of a generic browse flow, combining skill complementarity, industry alignment, availability, experience, and personality overlap.",
    tech: ["MERN", "MongoDB", "Node.js", "React", "Tailwind", "Socket.io"],
    proof: ["Weighted matching engine", "Socket.io chat", "Project marketplace"],
    metrics: [
      { label: "Matching Model", value: "0-100 score" },
      { label: "Realtime Layer", value: "Socket.io" },
      { label: "Roles", value: "Founder / Admin" },
    ],
    github: "https://github.com/Tejpraval/groupprojectstartupmatch",
    demo: "https://groupprojectstartupmatch.vercel.app/",
    accent: "from-[#ff7a18] via-[#ffb173] to-[#ffd6b8]",
    architecture: [
      "Monorepo structure separating backend and frontend for a cleaner full-stack workflow",
      "Strict backend modular design with isolated auth, profiles, matches, and projects modules",
      "Context-driven frontend state for auth and socket connection handling",
    ],
    decisions: [
      "Used service-driven backend modules to keep controllers thin and business logic organized.",
      "Added a weighted compatibility engine rather than shallow profile browsing.",
      "Connected accepted matches with realtime chat to reduce friction after discovery.",
    ],
    highlights: ["Problem/Solution Fit", "Matching Logic", "Realtime System"],
    mock: {
      eyebrow: "Founder Discovery",
      title: "Match founders with intent, fit, and momentum",
      stats: ["AI scoring", "Live chat", "Admin analytics"],
    },
  },
  {
    slug: "policy-control-plane",
    title: "Governance Control Plane",
    subtitle: "Multi-Tenant Policy Lifecycle Engine",
    category: "Backend / Systems",
    description:
      "A production-grade SaaS governance platform for simulating, approving, executing, and rolling back policy changes across tenants.",
    problem:
      "Policy changes in multi-tenant systems can create hidden risk, unsafe privilege changes, and operational regressions if lifecycle controls are weak.",
    role:
      "Focused on the architecture and workflow design around policy simulation, approval authority, execution safety, and governance visibility.",
    impact:
      "Reframed governance as an engineered lifecycle with explicit state transitions, simulation output, risk-based approvals, and rollback support.",
    standout:
      "Implemented governance as a strict state machine where every mutation must move through draft, approval, execution, and controlled rollback paths.",
    tech: ["MERN", "TypeScript", "RBAC"],
    proof: ["RBAC + ABAC simulation", "Risk-based approvals", "Atomic rollback"],
    metrics: [
      { label: "Authorization", value: "RBAC + ABAC" },
      { label: "Execution", value: "Atomic" },
      { label: "State Model", value: "Lifecycle-driven" },
    ],
    github: "https://github.com/Tejpraval/tms",
    demo: "",
    accent: "from-[#0ea5e9] via-[#7dd3fc] to-[#d8f5ff]",
    architecture: [
      "Normalized domain models around Policy, PolicyVersion, PolicyApproval, User, and Role",
      "Hybrid authorization architecture with static RBAC, dynamic tenant roles, and zero-trust route protection",
      "Governance analytics derived from lifecycle state instead of shadow collections",
    ],
    decisions: [
      "Used explicit lifecycle transitions to reject illegal policy mutations server-side.",
      "Required risk-based approval authority so higher-risk changes demand stronger approval levels.",
      "Executed policy activation through transactions so rollback and state integrity stay deterministic.",
    ],
    highlights: ["Governed Changes", "Simulation", "Tenant Safety"],
    mock: {
      eyebrow: "Policy Governance",
      title: "Ship policy changes with simulation and control",
      stats: ["Simulation", "Approval flow", "Rollback"],
    },
  },
  {
    slug: "sentiment-analysis",
    title: "Sentiment Analysis of Social Media Comments",
    subtitle: "Coca-Cola Comment Classification",
    category: "Applied AI",
    description:
      "A sentiment classification system for Coca-Cola social media comments using Universal Sentence Encoder embeddings and classical ML models.",
    problem:
      "Brand comment streams are noisy and context-heavy, making simple TF-IDF baselines too weak for more reliable sentiment understanding.",
    role:
      "Worked on the experimentation flow, embedding strategy, model comparison, and evaluation setup for multi-class sentiment prediction.",
    impact:
      "Improved sentiment classification quality by moving from a 58% Naive Bayes baseline toward an 88.88% USE + ExtraTrees pipeline.",
    standout:
      "Combined modern sentence embeddings with traditional ML to reach strong accuracy without depending on heavier transformer pipelines.",
    tech: ["Python", "TensorFlow", "Scikit-learn"],
    proof: ["USE embeddings", "ExtraTrees", "88.88% accuracy"],
    metrics: [
      { label: "Final Accuracy", value: "88.88%" },
      { label: "Embedding", value: "USE" },
      { label: "Best Model", value: "ExtraTrees" },
    ],
    github: "https://github.com/Tejpraval/Sentiment_Analysis_of_Social_Media_Comments",
    demo: "",
    accent: "from-[#8b5cf6] via-[#c4b5fd] to-[#efe7ff]",
    architecture: [
      "Text preprocessing and semantic embedding with Universal Sentence Encoder",
      "Comparative model evaluation across Naive Bayes, k-NN, ExtraTrees, and CatBoost",
      "Evaluation workflow including confusion matrix, ROC curve, and F1-style performance analysis",
    ],
    decisions: [
      "Used semantic embeddings to move beyond shallow keyword-based baselines.",
      "Benchmarked multiple models before selecting ExtraTrees as the strongest practical option.",
      "Kept the system lightweight enough for academic and applied use without overengineering.",
    ],
    highlights: ["Embeddings", "Classification", "Experimentation"],
    mock: {
      eyebrow: "Applied ML",
      title: "Classify noisy social sentiment with semantic context",
      stats: ["USE embeddings", "ExtraTrees", "3 sentiment classes"],
    },
  },
  {
    slug: "flag-challenge-quiz",
    title: "Flag Challenge Quiz",
    subtitle: "Interactive Geography Quiz Game",
    category: "Frontend Product",
    description:
      "An interactive country-flag quiz with difficulty levels, instant feedback, countdown pressure, responsive design, and light/dark theme support.",
    problem:
      "Most quiz demos feel static or repetitive; the goal here was to make a lightweight browser game feel lively, replayable, and polished across devices.",
    role:
      "Built the client-side quiz flow, timed-question mechanics, theme switching, and responsive interface for both desktop and mobile use.",
    impact:
      "Turned a simple quiz concept into a more engaging interactive product with difficulty control, score tracking, feedback loops, and timed play.",
    standout:
      "Used animation, timed multiple-choice interactions, and theme toggling to make the experience feel more like a lightweight game than a static exercise.",
    tech: ["HTML", "CSS", "JavaScript"],
    proof: ["10-second timer", "Theme toggle", "Responsive gameplay"],
    metrics: [
      { label: "Difficulty Modes", value: "3" },
      { label: "Timer", value: "10 sec" },
      { label: "Platforms", value: "Desktop + Mobile" },
    ],
    github: "https://github.com/Tejpraval/Falgquiz",
    demo: "https://tejflagquiz.ccbp.tech/",
    accent: "from-[#f97316] via-[#fda4af] to-[#fde68a]",
    architecture: [
      "Difficulty-based question flow driven by client-side quiz data and timer logic",
      "Responsive UI with interactive feedback states for correct and incorrect answers",
      "Theme-switching layer to support both light and dark visual modes",
    ],
    decisions: [
      "Added difficulty selection so the quiz feels replayable instead of one-dimensional.",
      "Used a 10-second timer to create tension and make score tracking more meaningful.",
      "Built light/dark theme switching to make the visual identity feel more dynamic and polished.",
    ],
    highlights: ["Timed Play", "Theme Switch", "Responsive Quiz"],
    mock: {
      eyebrow: "Interactive Quiz",
      title: "Test flag knowledge with speed and feedback",
      stats: ["Easy/Medium/Hard", "Live score", "Dark mode"],
    },
  },
];

export const featuredProjects = projects.slice(0, 2);

export const experiences = [
  {
    title: "AI Intern",
    company: "Alpha Innovation",
    duration: "Aug 5, 2025 - Oct 5, 2025",
    description:
      "Worked on supervised classification models and AI experimentation pipelines.",
    certificate: "https://drive.google.com/drive/folders/1Bbd0r2km-gg9dmJkVMulrUfF4eNvpmSt?usp=sharing",
  },
  {
    title: "Frontend Developer",
    company: "Codtech IT Solutions",
    duration: "Mar 20, 2025 - Apr 20, 2025",
    description:
      "Developed responsive frontend applications using React and Bootstrap.",
    certificate: "https://drive.google.com/drive/folders/1hA23K0hDIb1xDeiRfyKsZYrGY1warGsb?usp=sharing",
  },
];

export const contacts = [
  {
    title: "Email",
    value: "tejpraval32@gmail.com",
    href: "mailto:tejpraval32@gmail.com",
    icon: Mail,
  },
  {
    title: "Phone",
    value: "+91 9676767993",
    href: "tel:+919676767993",
    icon: Phone,
  },
  {
    title: "LinkedIn",
    value: "tej-praval-pula",
    href: "https://www.linkedin.com/in/tej-praval-pula",
    icon: Linkedin,
  },
  {
    title: "GitHub",
    value: "Tejpraval",
    href: "https://github.com/Tejpraval",
    icon: Github,
  },
];

export const highlights = [
  {
    icon: Sparkles,
    title: "AI-native products",
    copy: "Designing software that feels intelligent, not just automated.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Production-minded systems",
    copy: "Building backend platforms with safer rollout patterns and sharp execution.",
  },
  {
    icon: BadgeCheck,
    title: "Recruiter-ready polish",
    copy: "Shipping interfaces that communicate credibility in the first few seconds.",
  },
];

export const recruiterSignals = [
  "Hands-on across backend systems, frontend delivery, and applied AI workflows",
  "Experience building products with realtime, SaaS, governance, and NLP use cases",
  "Strong bias toward shipping polished interfaces with technical depth underneath",
];

export const closingPillars = [
  "Open to internships, product roles, and serious startup opportunities",
  "Comfortable contributing across UI polish, backend architecture, and AI-driven features",
  "Best fit for teams that value execution quality, curiosity, and thoughtful systems design",
];
