export interface EngineeringTab {
  id: string;
  label: string;
  iconName: string;
  title: string;
  description: string;
  technologies: string[];
  keyConcepts: string[];
  rightCardHeading: string;
  rightCardText: string;
}

export const ENGINEERING_TABS: EngineeringTab[] = [
  {
    id: "backend",
    label: "Backend",
    iconName: "Server",
    title: "Backend Engineering",
    description:
      "Building APIs and backend services that are practical, maintainable, and production-ready.",
    technologies: ["Go", "REST APIs", "PostgreSQL", "Redis"],
    keyConcepts: [
      "API design",
      "Business logic",
      "Authentication & authorization",
      "Background processing",
      "Error handling",
    ],
    rightCardHeading: "Reliable Backend",
    rightCardText:
      "I focus on clear service boundaries, predictable APIs, validation, error handling, and maintainable business logic.",
  },
  {
    id: "data-storage",
    label: "Data & Storage",
    iconName: "Database",
    title: "Data & Storage",
    description:
      "Choosing storage based on access patterns, consistency requirements, and workload.",
    technologies: ["PostgreSQL", "Redis", "Supabase"],
    keyConcepts: [
      "Relational data modelling",
      "Indexing",
      "Query optimisation",
      "Caching",
      "Data consistency",
    ],
    rightCardHeading: "Data that scales with the workload",
    rightCardText:
      "I use relational storage for durable business data and caching where fast reads or temporary state are important.",
  },
  {
    id: "realtime",
    label: "Real-time Systems",
    iconName: "Radio",
    title: "Real-time Systems",
    description:
      "Designing systems that continuously move events and updates between devices and backend services.",
    technologies: ["MQTT", "WebSockets", "Redis", "Go"],
    keyConcepts: [
      "Event-driven communication",
      "Live location",
      "Pub/Sub",
      "Background processing",
      "Real-time updates",
    ],
    rightCardHeading: "Real-time communication",
    rightCardText:
      "For location tracking and live updates, I work with event-driven communication patterns designed for continuous data exchange.",
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    iconName: "Box",
    title: "Infrastructure",
    description:
      "Running backend systems with predictable environments, deployment workflows, and observability.",
    technologies: ["Docker", "Docker Compose", "Linux", "Cloud Services"],
    keyConcepts: [
      "Containers",
      "Environment configuration",
      "Service orchestration",
      "Deployment",
      "Monitoring",
    ],
    rightCardHeading: "From code to production",
    rightCardText:
      "I use containerised environments and repeatable workflows to keep development and deployment consistent.",
  },
  {
    id: "frontend",
    label: "Frontend",
    iconName: "Layout",
    title: "Frontend & Apps",
    description:
      "Building interfaces that connect cleanly with backend systems and provide a useful user experience.",
    technologies: ["React", "React Native", "REST APIs"],
    keyConcepts: [
      "API integration",
      "Responsive interfaces",
      "Mobile applications",
      "State management",
      "User flows",
    ],
    rightCardHeading: "Connected experiences",
    rightCardText:
      "I care about clean communication between the interface and backend so features remain understandable and maintainable end to end.",
  },
  {
    id: "tools-workflow",
    label: "Tools & Workflow",
    iconName: "Wrench",
    title: "Tools & Workflow",
    description:
      "The tools and habits I use to move from an idea to working software.",
    technologies: ["Git", "GitHub", "VS Code", "Docker", "AI-assisted development"],
    keyConcepts: [
      "Version control",
      "API testing",
      "Debugging",
      "Documentation",
      "Rapid iteration",
    ],
    rightCardHeading: "Build → test → improve",
    rightCardText:
      "I use modern development tools and AI-assisted workflows to iterate quickly while keeping the underlying engineering understandable.",
  },
];
