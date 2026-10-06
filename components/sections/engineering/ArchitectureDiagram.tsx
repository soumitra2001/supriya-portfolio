"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Globe,
  Smartphone,
  Network,
  ShieldCheck,
  Cpu,
  Database,
  Zap,
  Radio,
  Activity,
  Layers,
  Box,
  Terminal,
  Cloud,
  CheckCircle2,
  ArrowDown,
  ArrowRight,
  Code2,
  Sparkles,
  Compass,
} from "lucide-react";
import { EngineeringTab } from "./data";

interface Props {
  tab: EngineeringTab;
}

export function ArchitectureDiagram({ tab }: Props) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="w-full h-full rounded-2xl bg-[#070b1a]/95 border border-blue-500/25 p-5 sm:p-7 relative overflow-hidden backdrop-blur-xl shadow-[0_0_50px_rgba(59,130,246,0.12)] flex flex-col justify-between min-h-[460px]">
      {/* Soft Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-60 h-60 bg-purple-600/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Diagram Canvas Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-800/60 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-slate-300 font-medium">
            System Architecture Flow
          </span>
        </div>
        <span className="font-mono text-[10px] text-blue-400 bg-blue-950/60 border border-blue-500/30 px-2.5 py-0.5 rounded-full">
          {tab.label}
        </span>
      </div>

      {/* Dynamic Diagram Variant */}
      <div className="relative z-10 flex-grow flex items-center justify-center py-2 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="w-full flex justify-center"
          >
            {tab.id === "backend" && (
              <BackendVisualization
                activeNode={activeNode}
                setActiveNode={setActiveNode}
              />
            )}
            {tab.id === "data-storage" && (
              <DataStorageVisualization
                activeNode={activeNode}
                setActiveNode={setActiveNode}
              />
            )}
            {tab.id === "realtime" && (
              <RealtimeVisualization
                activeNode={activeNode}
                setActiveNode={setActiveNode}
              />
            )}
            {tab.id === "infrastructure" && (
              <InfrastructureVisualization
                activeNode={activeNode}
                setActiveNode={setActiveNode}
              />
            )}
            {tab.id === "frontend" && (
              <FrontendVisualization
                activeNode={activeNode}
                setActiveNode={setActiveNode}
              />
            )}
            {tab.id === "tools-workflow" && (
              <ToolsWorkflowVisualization
                activeNode={activeNode}
                setActiveNode={setActiveNode}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Indicator */}
      <div className="relative z-10 pt-3 border-t border-slate-800/50 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Interactive flow
        </span>
        <span className="text-slate-400">Verified System Architecture</span>
      </div>
    </div>
  );
}

// ============================================================================
// 1. TAB 1 — BACKEND:
// Client -> API -> Auth/Middleware -> Backend Services -> PostgreSQL + Redis
// ============================================================================
function BackendVisualization({
  activeNode,
  setActiveNode,
}: {
  activeNode: string | null;
  setActiveNode: (id: string | null) => void;
}) {
  return (
    <div className="w-full max-w-md flex flex-col items-center gap-2">
      <FlowNode
        id="client"
        icon={<Globe className="w-4 h-4 text-cyan-400" />}
        title="Client"
        subtitle="Web &amp; Mobile Applications"
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        glowColor="border-cyan-500/40 text-cyan-300"
      />

      <FlowArrow label="HTTPS Requests" />

      <FlowNode
        id="api"
        icon={<Network className="w-4 h-4 text-blue-400" />}
        title="API"
        subtitle="REST Endpoints &amp; Routing"
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        glowColor="border-blue-500/40 text-blue-300"
      />

      <FlowArrow label="Validation &amp; JWT" />

      <FlowNode
        id="auth-middleware"
        icon={<ShieldCheck className="w-4 h-4 text-purple-400" />}
        title="Auth / Middleware"
        subtitle="Tenant Context, Rate Limiting &amp; Guards"
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        glowColor="border-purple-500/40 text-purple-300"
      />

      <FlowArrow label="Domain Execution" />

      <FlowNode
        id="backend-services"
        icon={<Cpu className="w-4 h-4 text-emerald-400" />}
        title="Backend Services"
        subtitle="Go Business Logic &amp; Goroutine Workers"
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        glowColor="border-emerald-500/40 text-emerald-300"
      />

      {/* Branching to PostgreSQL + Redis */}
      <div className="w-full h-6 relative my-0.5">
        <svg
          className="w-full h-full"
          viewBox="0 0 360 24"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M 180 0 C 180 12, 90 12, 90 24"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeOpacity="0.8"
          />
          <path
            d="M 180 0 C 180 12, 270 12, 270 24"
            stroke="#ec4899"
            strokeWidth="1.5"
            strokeOpacity="0.8"
          />
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        <div
          onMouseEnter={() => setActiveNode("postgres")}
          onMouseLeave={() => setActiveNode(null)}
          className={`rounded-xl p-3 bg-[#0a0f26] border transition-all duration-200 flex flex-col items-center text-center cursor-pointer ${
            activeNode === "postgres"
              ? "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.25)] scale-[1.02]"
              : "border-blue-500/35 shadow-[0_0_15px_rgba(59,130,246,0.12)] hover:border-blue-400"
          }`}
        >
          <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-1.5">
            <Database className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-white">PostgreSQL</span>
          <span className="text-[10px] text-slate-400 font-mono mt-0.5">
            Durable ACID Persistence
          </span>
        </div>

        <div
          onMouseEnter={() => setActiveNode("redis")}
          onMouseLeave={() => setActiveNode(null)}
          className={`rounded-xl p-3 bg-[#0a0f26] border transition-all duration-200 flex flex-col items-center text-center cursor-pointer ${
            activeNode === "redis"
              ? "border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.25)] scale-[1.02]"
              : "border-pink-500/35 shadow-[0_0_15px_rgba(236,72,153,0.12)] hover:border-pink-400"
          }`}
        >
          <div className="w-8 h-8 rounded-lg bg-pink-950/80 border border-pink-500/40 flex items-center justify-center text-pink-400 mb-1.5">
            <Zap className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-white">Redis</span>
          <span className="text-[10px] text-slate-400 font-mono mt-0.5">
            In-Memory Fast Cache
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 2. TAB 2 — DATA & STORAGE:
// Application -> Service Layer -> (Fork: Redis + PostgreSQL)
// ============================================================================
function DataStorageVisualization({
  activeNode,
  setActiveNode,
}: {
  activeNode: string | null;
  setActiveNode: (id: string | null) => void;
}) {
  return (
    <div className="w-full max-w-md flex flex-col items-center gap-3">
      <FlowNode
        id="app"
        icon={<Globe className="w-4 h-4 text-cyan-400" />}
        title="Application"
        subtitle="User Actions &amp; Workload Queries"
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        glowColor="border-cyan-500/40 text-cyan-300"
      />

      <FlowArrow label="Workload Ingestion" />

      <FlowNode
        id="service-layer"
        icon={<Layers className="w-4 h-4 text-purple-400" />}
        title="Service Layer"
        subtitle="Access Pattern Router &amp; Query Optimizer"
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        glowColor="border-purple-500/40 text-purple-300"
      />

      {/* Clean Fork Labels */}
      <div className="w-full flex items-center justify-around py-1">
        <span className="text-[10px] font-mono text-pink-400 bg-pink-950/40 px-2 py-0.5 rounded border border-pink-500/30">
          ↙ Fast-Access / Cache
        </span>
        <span className="text-[10px] font-mono text-blue-400 bg-blue-950/40 px-2 py-0.5 rounded border border-blue-500/30">
          ↘ Primary Persistent DB
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        <div
          onMouseEnter={() => setActiveNode("redis-layer")}
          onMouseLeave={() => setActiveNode(null)}
          className={`rounded-xl p-4 bg-[#0a0f26] border transition-all duration-200 flex flex-col items-center text-center cursor-pointer ${
            activeNode === "redis-layer"
              ? "border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.25)] scale-[1.02]"
              : "border-pink-500/35 shadow-[0_0_15px_rgba(236,72,153,0.12)] hover:border-pink-400"
          }`}
        >
          <div className="w-9 h-9 rounded-lg bg-pink-950/80 border border-pink-500/40 flex items-center justify-center text-pink-400 mb-2">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold text-white">Redis</span>
          <span className="text-[11px] text-slate-400 font-mono mt-1">
            Fast Cache &amp; Distributed Locks (&lt;2ms)
          </span>
        </div>

        <div
          onMouseEnter={() => setActiveNode("pg-layer")}
          onMouseLeave={() => setActiveNode(null)}
          className={`rounded-xl p-4 bg-[#0a0f26] border transition-all duration-200 flex flex-col items-center text-center cursor-pointer ${
            activeNode === "pg-layer"
              ? "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.25)] scale-[1.02]"
              : "border-blue-500/35 shadow-[0_0_15px_rgba(59,130,246,0.12)] hover:border-blue-400"
          }`}
        >
          <div className="w-9 h-9 rounded-lg bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-2">
            <Database className="w-5 h-5" />
          </div>
          <span className="text-sm font-bold text-white">PostgreSQL</span>
          <span className="text-[11px] text-slate-400 font-mono mt-1">
            Durable Relational ACID Store
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 3. TAB 3 — REAL-TIME SYSTEMS:
// Mobile/Device -> MQTT/WebSocket -> Real-time Service -> Redis/Processing -> Dashboard
// ============================================================================
function RealtimeVisualization({
  activeNode,
  setActiveNode,
}: {
  activeNode: string | null;
  setActiveNode: (id: string | null) => void;
}) {
  return (
    <div className="w-full max-w-md flex flex-col items-center gap-2">
      <FlowNode
        id="device"
        icon={<Smartphone className="w-4 h-4 text-sky-400" />}
        title="Mobile / Device"
        subtitle="GPS Telemetry &amp; Location Sensors"
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        glowColor="border-sky-500/40 text-sky-300"
      />

      <FlowArrow label="MQTT / WebSocket Stream" withParticle />

      <FlowNode
        id="mqtt-ws"
        icon={<Radio className="w-4 h-4 text-cyan-400" />}
        title="MQTT / WebSocket"
        subtitle="Lightweight Event Pub/Sub Broker"
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        glowColor="border-cyan-500/40 text-cyan-300"
      />

      <FlowArrow label="Event Ingestion" withParticle />

      <FlowNode
        id="realtime-service"
        icon={<Activity className="w-4 h-4 text-purple-400" />}
        title="Real-time Service"
        subtitle="Event Pipeline, Deduplication &amp; Geofencing"
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        glowColor="border-purple-500/40 text-purple-300"
      />

      <FlowArrow label="State &amp; Queuing" withParticle />

      <FlowNode
        id="redis-processing"
        icon={<Zap className="w-4 h-4 text-emerald-400" />}
        title="Redis / Processing"
        subtitle="Sliding Window Deduplication &amp; Worker Queues"
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        glowColor="border-emerald-500/40 text-emerald-300"
      />

      <FlowArrow label="Live UI Broadcast (<50ms)" withParticle />

      <FlowNode
        id="dashboard"
        icon={<Globe className="w-4 h-4 text-blue-400" />}
        title="Dashboard"
        subtitle="Live Map &amp; Real-time Operations UI"
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        glowColor="border-blue-500/40 text-blue-300"
      />
    </div>
  );
}

// ============================================================================
// 4. TAB 4 — INFRASTRUCTURE:
// Developer -> Docker -> Backend Services -> Database/Cache -> Production
// ============================================================================
function InfrastructureVisualization({
  activeNode,
  setActiveNode,
}: {
  activeNode: string | null;
  setActiveNode: (id: string | null) => void;
}) {
  return (
    <div className="w-full max-w-md flex flex-col items-center gap-2">
      <FlowNode
        id="dev"
        icon={<Terminal className="w-4 h-4 text-indigo-400" />}
        title="Developer"
        subtitle="Reproducible Code &amp; Environment Config"
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        glowColor="border-indigo-500/40 text-indigo-300"
      />

      <FlowArrow label="Build Container Images" />

      <FlowNode
        id="docker"
        icon={<Box className="w-4 h-4 text-blue-400" />}
        title="Docker"
        subtitle="Isolated Container Stacks &amp; Compose"
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        glowColor="border-blue-500/40 text-blue-300"
      />

      <FlowArrow label="Service Orchestration" />

      <FlowNode
        id="infra-services"
        icon={<Cpu className="w-4 h-4 text-emerald-400" />}
        title="Backend Services"
        subtitle="Stateless App Containers &amp; Internal Networks"
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        glowColor="border-emerald-500/40 text-emerald-300"
      />

      <FlowArrow label="Volume Mounts &amp; State" />

      <FlowNode
        id="infra-db"
        icon={<Database className="w-4 h-4 text-amber-400" />}
        title="Database / Cache"
        subtitle="PostgreSQL Volumes &amp; Redis Memory"
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        glowColor="border-amber-500/40 text-amber-300"
      />

      <FlowArrow label="Zero-Drift Deployment" />

      <FlowNode
        id="prod"
        icon={<Cloud className="w-4 h-4 text-purple-400" />}
        title="Production"
        subtitle="Predictable Linux Host &amp; Observability"
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        glowColor="border-purple-500/40 text-purple-300"
      />
    </div>
  );
}

// ============================================================================
// 5. TAB 5 — FRONTEND:
// Web / Mobile App -> REST API -> Backend -> Data / Services
// ============================================================================
function FrontendVisualization({
  activeNode,
  setActiveNode,
}: {
  activeNode: string | null;
  setActiveNode: (id: string | null) => void;
}) {
  return (
    <div className="w-full max-w-md flex flex-col items-center gap-3">
      <FlowNode
        id="front-app"
        icon={<Smartphone className="w-4 h-4 text-cyan-400" />}
        title="Web / Mobile App"
        subtitle="React &amp; React Native Client Interfaces"
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        glowColor="border-cyan-500/40 text-cyan-300"
      />

      <FlowArrow label="Type-Safe Payload &amp; Actions" />

      <FlowNode
        id="front-api"
        icon={<Network className="w-4 h-4 text-blue-400" />}
        title="REST API"
        subtitle="Clear Endpoints, Schema Contracts &amp; DTOs"
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        glowColor="border-blue-500/40 text-blue-300"
      />

      <FlowArrow label="Execute Business Rules" />

      <FlowNode
        id="front-backend"
        icon={<Cpu className="w-4 h-4 text-emerald-400" />}
        title="Backend"
        subtitle="Validation, Auth, &amp; Business Orchestration"
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        glowColor="border-emerald-500/40 text-emerald-300"
      />

      <FlowArrow label="Persistence &amp; State Sync" />

      <FlowNode
        id="front-data"
        icon={<Layers className="w-4 h-4 text-purple-400" />}
        title="Data / Services"
        subtitle="Durable State &amp; Downstream Synchronization"
        activeNode={activeNode}
        setActiveNode={setActiveNode}
        glowColor="border-purple-500/40 text-purple-300"
      />
    </div>
  );
}

// ============================================================================
// 6. TAB 6 — TOOLS & WORKFLOW:
// Idea -> Design -> Build -> Test -> Deploy -> Improve
// ============================================================================
function ToolsWorkflowVisualization({
  activeNode,
  setActiveNode,
}: {
  activeNode: string | null;
  setActiveNode: (id: string | null) => void;
}) {
  const steps = [
    { id: "idea", label: "Idea", sub: "Problem Definition & Requirements", icon: <Compass className="w-3.5 h-3.5 text-cyan-400" /> },
    { id: "design", label: "Design", sub: "Architecture & Schema Modeling", icon: <Layers className="w-3.5 h-3.5 text-blue-400" /> },
    { id: "build", label: "Build", sub: "Go, TypeScript & Container Setup", icon: <Code2 className="w-3.5 h-3.5 text-purple-400" /> },
    { id: "test", label: "Test", sub: "API Testing & Contract Verification", icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: "deploy", label: "Deploy", sub: "Reproducible Docker Container Deployment", icon: <Cloud className="w-3.5 h-3.5 text-amber-400" /> },
    { id: "improve", label: "Improve", sub: "Telemetry, Metrics & Rapid Iteration", icon: <Sparkles className="w-3.5 h-3.5 text-pink-400" /> },
  ];

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-1.5">
      {steps.map((s, idx) => (
        <React.Fragment key={s.id}>
          <div
            onMouseEnter={() => setActiveNode(s.id)}
            onMouseLeave={() => setActiveNode(null)}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
              activeNode === s.id
                ? "bg-[#0e1633] border border-blue-500/50 shadow-md shadow-blue-500/10 scale-[1.01]"
                : "bg-gradient-to-r from-[#0d1633] to-[#090d22] border border-slate-800 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1 rounded-md bg-slate-950 border border-slate-800 shrink-0">
                {s.icon}
              </div>
              <span className="font-semibold text-xs sm:text-sm text-white">
                {s.label}
              </span>
            </div>
            <span className="font-mono text-[11px] text-slate-400">
              {s.sub}
            </span>
          </div>

          {idx < steps.length - 1 && (
            <div className="py-0.5 flex items-center justify-center">
              <ArrowDown className="w-3 h-3 text-blue-400/70" />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ============================================================================
// Shared Reusable Flow Node
// ============================================================================
function FlowNode({
  id,
  icon,
  title,
  subtitle,
  activeNode,
  setActiveNode,
  glowColor,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  activeNode: string | null;
  setActiveNode: (id: string | null) => void;
  glowColor: string;
}) {
  const isHovered = activeNode === id;

  return (
    <div
      onMouseEnter={() => setActiveNode(id)}
      onMouseLeave={() => setActiveNode(null)}
      className={`rounded-xl transition-all duration-200 cursor-pointer select-none text-left p-3 sm:p-3.5 w-full ${
        isHovered
          ? `bg-[#0e1736] border ${glowColor} shadow-lg shadow-blue-500/15 scale-[1.01]`
          : "bg-gradient-to-b from-[#0d1633] to-[#080d22] border border-blue-500/30 hover:border-blue-400/50 text-slate-200"
      }`}
    >
      <div className="flex items-center gap-2 mb-0.5">
        <div className="p-1 rounded-md bg-slate-950/80 border border-slate-800 shrink-0">
          {icon}
        </div>
        <span className="font-semibold tracking-tight text-white text-xs sm:text-sm">
          {title}
        </span>
      </div>
      <p className="font-mono text-slate-400 text-[10px] sm:text-[11px] leading-tight">
        {subtitle}
      </p>
    </div>
  );
}

// ============================================================================
// Shared Animated Arrow with subtle particle pulse
// ============================================================================
function FlowArrow({
  label,
  withParticle = false,
}: {
  label: string;
  withParticle?: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center my-0.5 relative py-0.5 select-none">
      <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-slate-800/80 text-[10px] font-mono text-slate-300 shadow-sm">
        {withParticle && (
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
        )}
        <span>{label}</span>
        <ArrowDown className="w-2.5 h-2.5 text-blue-400" />
      </div>
    </div>
  );
}
