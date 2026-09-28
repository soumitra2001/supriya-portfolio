"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FadeIn } from "@/components/animation/FadeIn";
import { X } from "lucide-react";

// ============================================================================
// OFFICIAL HIGH-FIDELITY BRAND ICONS
// ============================================================================

// 1. Go: Official speed lines + GO in vibrant cyan
function GoBrandIcon({ className = "w-14 h-8 sm:w-16 sm:h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 45" className={className} fill="none">
      {/* Speed lines */}
      <path d="M3 13h20M1 22h26M5 31h18" stroke="#00d8ff" strokeWidth="3.6" strokeLinecap="round" />
      {/* G */}
      <path
        d="M44 10.5c-8 0-14 5.5-14 13s6 13 14 13c5.2 0 9.8-2.5 12-7.2h-11.5v-5.8h18v14.5c-4.8 4.2-11 5.8-18.5 5.8-13 0-22-9-22-20.3s9-20.3 22-20.3c7 0 13 2.4 17.5 6.5l-4.8 5.4c-3.5-3.2-8-4.6-13-4.6z"
        fill="#00d8ff"
      />
      {/* O */}
      <path
        d="M82 10.5c-12 0-21 9-21 20.3s9 20.3 21 20.3 21-9 21-20.3-9-20.3-21-20.3zm0 32.5c-7.5 0-13-6-13-12.2s5.5-12.2 13-12.2 13 6 13 12.2-5.5 12.2-13 12.2z"
        fill="#00d8ff"
      />
    </svg>
  );
}

// 2. PostgreSQL: Official Slonik elephant head vector
function PostgresBrandIcon({ className = "w-11 h-11 sm:w-12 sm:h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 25.6 25.6" className={className} fill="none">
      <path
        d="M18.983 18.636c.163-1.357.114-1.555 1.124-1.336l.257.023c.777.035 1.793-.125 2.4-.402 1.285-.596 2.047-1.592.78-1.33-2.89.596-3.1-.383-3.1-.383 3.053-4.53 4.33-10.28 3.227-11.687-3.004-3.84-8.205-2.024-8.292-1.976l-.028.005c-.57-.12-1.2-.19-1.93-.2-1.308-.02-2.3.343-3.054.914 0 0-9.277-3.822-8.846 4.807.092 1.836 2.63 13.9 5.66 10.25C8.29 15.987 9.36 14.86 9.36 14.86c.53.353 1.167.533 1.834.468l.052-.044a2.01 2.01 0 0 0 .021.518c-.78.872-.55 1.025-2.11 1.346-1.578.325-.65.904-.046 1.056.734.184 2.432.444 3.58-1.162l-.046.183c.306.245.285 1.76.33 2.842s.116 2.093.337 2.688.48 2.13 2.53 1.7c1.713-.367 3.023-.896 3.143-5.81"
        fill="#122a42"
      />
      <path
        d="M23.535 15.6c-2.89.596-3.1-.383-3.1-.383 3.053-4.53 4.33-10.28 3.228-11.687-3.004-3.84-8.205-2.023-8.292-1.976l-.028.005a10.31 10.31 0 0 0-1.929-.201c-1.308-.02-2.3.343-3.054.914 0 0-9.278-3.822-8.846 4.807.092 1.836 2.63 13.9 5.66 10.25C8.29 15.987 9.36 14.86 9.36 14.86c.53.353 1.167.533 1.834.468l.052-.044a2.02 2.02 0 0 0 .021.518c-.78.872-.55 1.025-2.11 1.346-1.578.325-.65.904-.046 1.056.734.184 2.432.444 3.58-1.162l-.046.183c.306.245.52 1.593.484 2.815s-.06 2.06.18 2.716.48 2.13 2.53 1.7c1.713-.367 2.6-1.32 2.725-2.906.088-1.128.286-.962.3-1.97l.16-.478c.183-1.53.03-2.023 1.085-1.793l.257.023c.777.035 1.794-.125 2.39-.402 1.285-.596 2.047-1.592.78-1.33z"
        fill="#336791"
      />
      <path
        d="M12.814 16.467c-.08 2.846.02 5.712.298 6.4s.875 2.05 2.926 1.612c1.713-.367 2.337-1.078 2.607-2.647l.633-5.017M10.356 2.2S1.072-1.596 1.504 7.033c.092 1.836 2.63 13.9 5.66 10.25C8.27 15.95 9.27 14.907 9.27 14.907m6.1-13.4c-.32.1 5.164-2.005 8.282 1.978 1.1 1.407-.175 7.157-3.228 11.687"
        stroke="#ffffff"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.425 15.17s.2.98 3.1.382c1.267-.262.504.734-.78 1.33-1.054.49-3.418.615-3.457-.06-.1-1.745 1.244-1.215 1.147-1.652-.088-.394-.69-.78-1.086-1.744-.347-.84-4.76-7.29 1.224-6.333.22-.045-1.56-5.7-7.16-5.782S7.99 8.196 7.99 8.196"
        stroke="#ffffff"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <path
        d="M11.247 15.768c-.78.872-.55 1.025-2.11 1.346-1.578.325-.65.904-.046 1.056.734.184 2.432.444 3.58-1.163.35-.49-.002-1.27-.482-1.468-.232-.096-.542-.216-.94.23z"
        stroke="#ffffff"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <path
        d="M11.196 15.753c-.08-.513.168-1.122.433-1.836.398-1.07 1.316-2.14.582-5.537-.547-2.53-4.22-.527-4.22-.184s.166 1.74-.06 3.365c-.297 2.122 1.35 3.916 3.246 3.733"
        stroke="#ffffff"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse cx="10.8" cy="8.1" rx="0.5" ry="0.4" fill="#ffffff" />
      <ellipse cx="18.9" cy="7.9" rx="0.5" ry="0.4" fill="#ffffff" />
    </svg>
  );
}

// 3. Redis: Official 3D isometric layered red slabs
function RedisBrandIcon({ className = "w-11 h-11 sm:w-12 sm:h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none">
      {/* Top slab */}
      <polygon points="32,5 7,18 32,31 57,18" fill="#E64438" />
      <polygon points="7,18 32,31 32,37 7,24" fill="#B3251A" />
      <polygon points="57,18 32,31 32,37 57,24" fill="#C93126" />
      {/* White shine accent on top */}
      <ellipse cx="32" cy="18" rx="5" ry="2.4" fill="#FFFFFF" opacity="0.95" />
      {/* Middle slab */}
      <path d="M7,28 L32,41 L57,28" stroke="#E64438" strokeWidth="5" strokeLinejoin="round" />
      <polygon points="7,31 32,44 32,49 7,36" fill="#B3251A" />
      <polygon points="57,31 32,44 32,49 57,36" fill="#C93126" />
      {/* Bottom slab */}
      <path d="M7,40 L32,53 L57,40" stroke="#E64438" strokeWidth="5" strokeLinejoin="round" />
      <polygon points="7,43 32,56 32,60 7,47" fill="#B3251A" />
      <polygon points="57,43 32,56 32,60 57,47" fill="#C93126" />
    </svg>
  );
}

// 4. Docker: Official whale carrying container blocks
function DockerBrandIcon({ className = "w-12 h-10 sm:w-14 sm:h-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="#2496ED">
      {/* Containers */}
      <rect x="23" y="13" width="6.5" height="5.8" rx="0.8" />
      <rect x="31" y="13" width="6.5" height="5.8" rx="0.8" />
      <rect x="15" y="20.5" width="6.5" height="5.8" rx="0.8" />
      <rect x="23" y="20.5" width="6.5" height="5.8" rx="0.8" />
      <rect x="31" y="20.5" width="6.5" height="5.8" rx="0.8" />
      <rect x="39" y="20.5" width="6.5" height="5.8" rx="0.8" />
      <rect x="7" y="28" width="6.5" height="5.8" rx="0.8" />
      <rect x="15" y="28" width="6.5" height="5.8" rx="0.8" />
      <rect x="23" y="28" width="6.5" height="5.8" rx="0.8" />
      <rect x="31" y="28" width="6.5" height="5.8" rx="0.8" />
      <rect x="39" y="28" width="6.5" height="5.8" rx="0.8" />
      {/* Whale body */}
      <path d="M63 34.5c-1.5-7-8.2-7.5-11.8-7 0-3.5-2.4-5.2-4.2-5.6-.8 3.5-3.2 4.8-4.5 5.1H4c-1.2 3.8-1.5 8 0 13.5 3 8.5 10.5 12.8 20.8 12.8 17.5 0 29.5-9 31.8-15.5 4.4 0.5 9.2-1 12.4-2.8z" />
      {/* Eye */}
      <circle cx="15" cy="38.5" r="1.6" fill="#FFFFFF" />
    </svg>
  );
}

// 5. Kubernetes: Blue heptagon with 7-spoke white steering wheel
function KubernetesBrandIcon({ className = "w-11 h-11 sm:w-12 sm:h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none">
      {/* Heptagon outline */}
      <polygon points="32,3 57,14 63,40 46,59 18,59 1,40 7,14" fill="#326CE5" />
      {/* Center wheel hub */}
      <circle cx="32" cy="33" r="8" fill="#FFFFFF" />
      <circle cx="32" cy="33" r="3.4" fill="#326CE5" />
      {/* 7 spokes with rounded handles */}
      <line x1="32" y1="17" x2="32" y2="49" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" />
      <line x1="16.5" y1="24" x2="47.5" y2="42" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" />
      <line x1="16.5" y1="42" x2="47.5" y2="24" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="32" cy="17" r="2.2" fill="#FFFFFF" />
      <circle cx="32" cy="49" r="2.2" fill="#FFFFFF" />
      <circle cx="16.5" cy="24" r="2.2" fill="#FFFFFF" />
      <circle cx="47.5" cy="42" r="2.2" fill="#FFFFFF" />
      <circle cx="16.5" cy="42" r="2.2" fill="#FFFFFF" />
      <circle cx="47.5" cy="24" r="2.2" fill="#FFFFFF" />
    </svg>
  );
}

// 6. AWS: Official white lettering with orange smile arrow
function AwsBrandIcon({ className = "w-12 h-9 sm:w-14 sm:h-10" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <span className="font-black text-white text-base tracking-wider leading-none">aws</span>
      <svg viewBox="0 0 46 14" className="w-10 h-3 mt-0.5" fill="none">
        <path d="M2 3.5C14 11 32 11 44 3.5" stroke="#FF9900" strokeWidth="3" strokeLinecap="round" />
        <path d="M39 2.5L44 3.5L40.5 8" stroke="#FF9900" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </div>
  );
}

// 7. TypeScript: Official blue square with TS
function TypeScriptBrandIcon({ className = "w-11 h-11 sm:w-12 sm:h-12" }: { className?: string }) {
  return (
    <div className={`rounded-xl bg-[#3178C6] flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(49,120,198,0.4)] ${className}`}>
      <span className="text-base font-black tracking-tight">TS</span>
    </div>
  );
}

// 8. React: Official cyan atom
function ReactBrandIcon({ className = "w-11 h-11 sm:w-12 sm:h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="#61DAFB" strokeWidth="3.4">
      <ellipse cx="32" cy="32" rx="27" ry="10" />
      <ellipse cx="32" cy="32" rx="27" ry="10" transform="rotate(60 32 32)" />
      <ellipse cx="32" cy="32" rx="27" ry="10" transform="rotate(120 32 32)" />
      <circle cx="32" cy="32" r="4.2" fill="#61DAFB" stroke="none" />
    </svg>
  );
}

// 9. MongoDB: Official leaf logo with subtle white middle stick/stem
function MongoBrandIcon({ className = "w-8 h-11 sm:w-9 sm:h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 148 300" className={className} fill="none">
      {/* Outer/Left leaf body in official green */}
      <path
        d="M134.44,120.34C119.13,52.8,87.22,34.82,79.08,22.11a144.57,144.57,0,0,1-8.9-17.42c-.43,6-1.22,9.78-6.32,14.33C53.62,28.15,10.13,63.59,6.47,140.33c-3.41,71.55,52.6,115.67,60,120.23,5.69,2.8,12.62.06,16-2.51,27-18.53,63.89-67.93,52-137.71"
        fill="#10AA50"
      />
      {/* Right leaf shading in deeper contrast green */}
      <path
        d="M82.7,257.92h0c-7.64-3.53-9.85-20.06-10.19-35.46a725.83,725.83,0,0,0,1.65-76.35c-.4-13.36.19-123.74-3.29-139.9A134.29,134.29,0,0,0,79.08,22.1c8.14,12.72,40.06,30.7,55.36,98.24C146.36,190,109.67,239.27,82.7,257.92Z"
        fill="#0D803D"
      />
      {/* Subtle white center spine running through the leaf */}
      <path
        d="M74.5,35 L74.5,225"
        stroke="#FFFFFF"
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.8"
      />
      {/* Middle stick/stem in clean subtle white */}
      <path
        d="M72.5,222.46c-1.41,17.71-2.42,28-6,38.12,0,0,2.35,16.86,4,34.72h5.84a324.73,324.73,0,0,1,6.37-37.39C75.15,254.19,72.79,238,72.5,222.46Z"
        fill="#FFFFFF"
        opacity="0.9"
      />
    </svg>
  );
}

// 10. Google Cloud (GCP): Official multi-colored cloud logo
function GoogleCloudBrandIcon({ className = "w-11 h-11 sm:w-12 sm:h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <path
        d="M40.728 20.488l2.05.035 5.57-5.57.27-2.36C44.2 8.657 38.367 6.26 31.993 6.26c-11.54 0-21.28 7.852-24.163 18.488.608-.424 1.908-.106 1.908-.106l11.13-1.83s.572-.947.862-.9A13.88 13.88 0 0 1 32 17.375c3.3.007 6.34 1.173 8.728 3.102z"
        fill="#ea4335"
      />
      <path
        d="M56.17 24.77c-1.293-4.77-3.958-8.982-7.555-12.177l-7.887 7.887c3.16 2.55 5.187 6.452 5.187 10.82v1.392c3.837 0 6.954 3.124 6.954 6.954 0 3.837-3.124 6.954-6.954 6.954H32.007L30.615 48v8.346l1.392 1.385h13.908A18.11 18.11 0 0 0 64 39.647c-.007-6.155-3.1-11.6-7.83-14.876z"
        fill="#4285f4"
      />
      <path
        d="M18.085 57.74h13.9V46.6h-13.9a6.89 6.89 0 0 1-2.862-.622l-2.007.615-5.57 5.57-.488 1.88a18 18 0 0 0 10.926 3.689z"
        fill="#34a853"
      />
      <path
        d="M18.085 21.57A18.11 18.11 0 0 0 0 39.654c0 5.873 2.813 11.095 7.166 14.403l8.064-8.064a6.96 6.96 0 0 1-4.099-6.339c0-3.837 3.124-6.954 6.954-6.954 2.82 0 5.244 1.7 6.34 4.1l8.064-8.064c-3.307-4.353-8.53-7.166-14.403-7.166z"
        fill="#fbbc05"
      />
    </svg>
  );
}

// 11. "and more..." circular glyph
function AndMoreGlyph({ className = "w-10 h-10 sm:w-11 sm:h-11" }: { className?: string }) {
  return (
    <div className={`rounded-full border border-slate-600/70 bg-slate-900/90 flex items-center justify-center text-slate-300 ${className}`}>
      <span className="font-mono text-sm tracking-widest font-black leading-none pb-0.5">•••</span>
    </div>
  );
}

// ============================================================================
// PRIMARY ROW DATA (10 Core Tools + "and more...")
// ============================================================================

interface PrimaryTech {
  id: string;
  name: string;
  icon: (props: { className?: string }) => React.JSX.Element;
  description: string;
  role: string;
}

const PRIMARY_ROW: PrimaryTech[] = [
  {
    id: "go",
    name: "Go",
    icon: GoBrandIcon,
    role: "Primary Language",
    description: "High-concurrency microservices, goroutine worker pools, low latency.",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    icon: PostgresBrandIcon,
    role: "Relational DB",
    description: "Multi-tenant ACID schemas, GiST spatial indexing, connection pooling.",
  },
  {
    id: "redis",
    name: "Redis",
    icon: RedisBrandIcon,
    role: "In-Memory State",
    description: "Sub-millisecond caching, GEOSEARCH proximity, Redlock distributed locking.",
  },
  {
    id: "docker",
    name: "Docker",
    icon: DockerBrandIcon,
    role: "Containerization",
    description: "Multi-stage builds, minimal alpine/scratch runtime containers.",
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    icon: KubernetesBrandIcon,
    role: "Orchestration",
    description: "Automated scaling, horizontal pod autoscalers (HPA), rolling zero-downtime deploys.",
  },
  {
    id: "aws",
    name: "AWS",
    icon: AwsBrandIcon,
    role: "Cloud Infrastructure",
    description: "EKS, RDS PostgreSQL Aurora, S3 object storage, CloudFront CDN.",
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: TypeScriptBrandIcon,
    role: "Type System",
    description: "Strict end-to-end type safety, shared Zod schemas, interface consistency.",
  },
  {
    id: "react",
    name: "React",
    icon: ReactBrandIcon,
    role: "UI Framework",
    description: "Interactive operational consoles, state management, concurrent rendering.",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    icon: MongoBrandIcon,
    role: "NoSQL Document DB",
    description: "Flexible schema storage for unstructured telemetry audit logs and variable shift histories.",
  },
  {
    id: "gcp",
    name: "GCP",
    icon: GoogleCloudBrandIcon,
    role: "Google Cloud Platform",
    description: "GKE Kubernetes clusters, Cloud Storage buckets, BigQuery analytics pipelines.",
  },
];

// Additional tools revealed when "and more..." is toggled
const EXTENDED_TOOLS = [
  { name: "Apache Kafka", tag: "Event Streaming", detail: "Partitioned asynchronous pipelines for telemetry ingest." },
  { name: "gRPC & Protobuf", tag: "High-Speed RPC", detail: "Binary HTTP/2 serialization for inter-service communication." },
  { name: "React Native", tag: "Mobile Engineering", detail: "Cross-platform mobile applications with background location sync." },
  { name: "Prometheus & Grafana", tag: "Observability", detail: "p99 latency tracking, custom Go runtime metrics." },
  { name: "Python", tag: "Tooling & ETL", detail: "Automated test harness, Locust high-concurrency load testing." },
  { name: "Next.js", tag: "Web Applications", detail: "Server components, streaming SSR, and edge execution." },
  { name: "Linux & Bash", tag: "Systems Engineering", detail: "Kernel TCP epoll buffer tuning, systemd daemon management." },
  { name: "GitHub Actions", tag: "CI/CD Automation", detail: "Automated test suites, container vulnerability scans." },
];

// ============================================================================
// TECH STACK COMPONENT
// ============================================================================

export function TechStack() {
  const [showExtended, setShowExtended] = useState(false);
  const [selectedTech, setSelectedTech] = useState<PrimaryTech | null>(null);

  return (
    <section
      id="tech-stack"
      className="relative pt-2 pb-3 sm:pb-5 overflow-hidden bg-[#030612] text-slate-100"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(6,182,212,0.08),transparent_60%)] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full">
        {/* ================================================================= */}
        {/* EXACT REFERENCE CARD CONTAINER                                    */}
        {/* ================================================================= */}
        <FadeIn direction="up" delay={0.1}>
          <div className="relative rounded-3xl bg-[#040816]/90 border border-sky-900/40 p-5 sm:p-7 md:p-8 backdrop-blur-2xl shadow-[0_12px_45px_rgba(0,0,0,0.65)]">
            {/* Top ambient highlight line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.8)]" />

            {/* Header: Centered Eyebrow + Glowing Title (Exact replica of Reference Image 2) */}
            <div className="flex flex-col items-center justify-center text-center mb-6 sm:mb-8">
              {/* Eyebrow: — TECH STACK — */}
              <div className="flex items-center justify-center gap-2.5 mb-2">
                <div className="h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-cyan-400/80" />
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-cyan-400/90 uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                  TECH STACK
                </span>
                <div className="h-[1px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-cyan-400/80" />
              </div>

              {/* Title with Glowing Cyan Flairs: — Tools I use to build and ship — */}
              <div className="flex items-center justify-center gap-3 sm:gap-5">
                <div className="h-[2px] w-6 sm:w-12 rounded-full bg-gradient-to-r from-transparent via-cyan-400/80 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  Tools I use to build and ship
                </h2>
                <div className="h-[2px] w-6 sm:w-12 rounded-full bg-gradient-to-l from-transparent via-cyan-400/80 to-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              </div>
            </div>

            {/* 11-Card Row matching Reference Image with PROMINENT, LARGE ICONS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2.5 sm:gap-3">
              {PRIMARY_ROW.map((tech) => {
                const IconComp = tech.icon;
                const isSelected = selectedTech?.id === tech.id;
                return (
                  <button
                    key={tech.id}
                    onClick={() => setSelectedTech(isSelected ? null : tech)}
                    aria-label={`Technology: ${tech.name}`}
                    className={`group relative flex flex-col items-center justify-between p-3 sm:p-3.5 rounded-2xl transition-all duration-200 text-center cursor-pointer min-h-[115px] sm:min-h-[125px] focus:outline-none focus:ring-1 focus:ring-cyan-400/50 ${
                      isSelected
                        ? "bg-[#0b1633] border-cyan-400/80 shadow-[0_0_20px_rgba(34,211,238,0.3)] -translate-y-1"
                        : "bg-[#060b19] hover:bg-[#091228] border border-sky-950/80 hover:border-cyan-400/50 hover:shadow-[0_0_18px_rgba(6,182,212,0.22)] hover:-translate-y-0.5"
                    }`}
                  >
                    {/* Top Icon Area: Generously sized and centered to fill box comfortably */}
                    <div className="w-full flex-1 flex items-center justify-center py-1">
                      <div className="transform transition-transform duration-200 group-hover:scale-110 flex items-center justify-center">
                        <IconComp />
                      </div>
                    </div>

                    {/* Bottom Label Area */}
                    <div className="w-full pt-1.5 border-t border-slate-800/40 group-hover:border-cyan-500/30 transition-colors">
                      <span className="block text-[11px] sm:text-xs font-semibold text-slate-200 group-hover:text-white truncate">
                        {tech.name}
                      </span>
                    </div>

                    {/* Active Pip */}
                    {isSelected && (
                      <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                    )}
                  </button>
                );
              })}

              {/* 11th Card: "and more..." */}
              <button
                onClick={() => setShowExtended(!showExtended)}
                aria-label="View extended tech stack"
                className={`group relative flex flex-col items-center justify-between p-3 sm:p-3.5 rounded-2xl transition-all duration-200 text-center cursor-pointer min-h-[115px] sm:min-h-[125px] focus:outline-none focus:ring-1 focus:ring-cyan-400/50 ${
                  showExtended
                    ? "bg-[#0b1633] border-cyan-400/80 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                    : "bg-[#060b19] hover:bg-[#091228] border border-sky-950/80 hover:border-cyan-400/50 hover:shadow-[0_0_18px_rgba(6,182,212,0.22)] hover:-translate-y-0.5"
                }`}
              >
                <div className="w-full flex-1 flex items-center justify-center py-1">
                  <div className="transform transition-transform duration-200 group-hover:scale-110 flex items-center justify-center">
                    <AndMoreGlyph />
                  </div>
                </div>
                <div className="w-full pt-1.5 border-t border-slate-800/40 group-hover:border-cyan-500/30 transition-colors">
                  <span className="block text-[11px] sm:text-xs font-medium text-slate-400 group-hover:text-cyan-300">
                    {showExtended ? "collapse" : "and more..."}
                  </span>
                </div>
              </button>
            </div>

            {/* Quick Context Card when an item is selected */}
            <AnimatePresence>
              {selectedTech && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden mt-5"
                >
                  <div className="p-4 rounded-xl bg-[#070e24] border border-cyan-500/30 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                        {React.createElement(selectedTech.icon, { className: "w-7 h-7" })}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{selectedTech.name}</span>
                          <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                            {selectedTech.role}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5">{selectedTech.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedTech(null)}
                      className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                      aria-label="Close"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Extended Tools Drawer (revealed only on clicking "and more...") */}
            <AnimatePresence>
              {showExtended && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-6 pt-5 border-t border-slate-800/80"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
                      Additional Architecture & Protocols
                    </span>
                    <button
                      onClick={() => setShowExtended(false)}
                      className="text-xs text-slate-500 hover:text-slate-300"
                    >
                      Close ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {EXTENDED_TOOLS.map((tool, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-[#060b1b] border border-slate-800 hover:border-cyan-500/40 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-white">{tool.name}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-900 text-cyan-400 border border-slate-800">
                            {tool.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug">{tool.detail}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
