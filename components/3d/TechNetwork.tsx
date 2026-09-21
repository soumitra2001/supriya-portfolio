"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Cpu,
  Database,
  Radio,
  Server,
  Cloud,
  Layers,
  Activity,
  Zap,
  ShieldCheck,
} from "lucide-react";

interface NodeData {
  id: string;
  name: string;
  subtitle: string;
  role: string;
  x: number;
  y: number;
  color: string;
  glowColor: string;
  category: "core" | "network" | "storage" | "infra";
  icon: React.ComponentType<{ className?: string }>;
}

const NODES: NodeData[] = [
  {
    id: "core",
    name: "Go Engine",
    subtitle: "Core Microservices",
    role: "High-concurrency Goroutine worker pools, channel pipelines, and low-latency business logic.",
    x: 250,
    y: 190,
    color: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.4)",
    category: "core",
    icon: Cpu,
  },
  {
    id: "api",
    name: "gRPC & REST",
    subtitle: "API Gateway",
    role: "High-throughput edge routing, token bucket rate limiters, and payload serialization.",
    x: 100,
    y: 85,
    color: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.4)",
    category: "network",
    icon: Server,
  },
  {
    id: "mqtt",
    name: "MQTT / Kafka",
    subtitle: "Real-Time Telemetry",
    role: "Lightweight IoT pub/sub broker handling Hermes teacher location packets with QoS 1 guarantees.",
    x: 90,
    y: 295,
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.4)",
    category: "network",
    icon: Radio,
  },
  {
    id: "redis",
    name: "Redis Geo",
    subtitle: "Sub-ms Spatial Cache",
    role: "Geohash coordinate indexing (GEOADD), TR GlowCare slot reservation locks (SETNX), and pub/sub state.",
    x: 400,
    y: 85,
    color: "#f43f5e",
    glowColor: "rgba(244, 63, 94, 0.4)",
    category: "storage",
    icon: Database,
  },
  {
    id: "postgres",
    name: "PostgreSQL",
    subtitle: "ACID Persistence",
    role: "Normalized schema, temporal indexing for verified attendance logs, and transactional order ledgers.",
    x: 410,
    y: 295,
    color: "#818cf8",
    glowColor: "rgba(129, 140, 248, 0.4)",
    category: "storage",
    icon: Layers,
  },
  {
    id: "infra",
    name: "K8s & Docker",
    subtitle: "Cloud Infrastructure",
    role: "Containerized deployments, automatic health checks, and reproducible multi-tenant cloud topologies.",
    x: 250,
    y: 45,
    color: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.4)",
    category: "infra",
    icon: Cloud,
  },
  {
    id: "workers",
    name: "Worker Pools",
    subtitle: "Async Pipelines",
    role: "Bounded event consumers handling telemetry deduplication and batch clickstream flushes.",
    x: 250,
    y: 335,
    color: "#34d399",
    glowColor: "rgba(52, 211, 153, 0.4)",
    category: "core",
    icon: Zap,
  },
];

const CONNECTIONS: [string, string][] = [
  ["core", "api"],
  ["core", "mqtt"],
  ["core", "redis"],
  ["core", "postgres"],
  ["core", "infra"],
  ["core", "workers"],
  ["mqtt", "workers"],
  ["workers", "redis"],
  ["workers", "postgres"],
  ["api", "redis"],
];

export function TechNetwork() {
  const [activeNodeId, setActiveNodeId] = useState<string>("core");

  const activeNode = NODES.find((n) => n.id === activeNodeId) || NODES[0];

  const getNode = (id: string) => NODES.find((n) => n.id === id);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-4 select-none bg-transparent">
      {/* Interactive Topology Visualizer */}
      <div className="relative w-full max-w-[480px] aspect-[500/380] flex items-center justify-center">
        <svg
          viewBox="0 0 500 380"
          className="w-full h-full overflow-visible"
          fill="none"
        >
          <defs>
            <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#818cf8" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Connection Lines */}
          {CONNECTIONS.map(([src, dst]) => {
            const p1 = getNode(src);
            const p2 = getNode(dst);
            if (!p1 || !p2) return null;

            const isHighlighted =
              activeNodeId === src || activeNodeId === dst;

            return (
              <g key={`${src}-${dst}`}>
                {/* Background base wire */}
                <line
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={isHighlighted ? "url(#edgeGrad)" : "#1e293b"}
                  strokeWidth={isHighlighted ? 2.5 : 1}
                  strokeDasharray={isHighlighted ? "none" : "3 3"}
                  className="transition-all duration-300"
                />

                {/* Animated traveling data packet */}
                {isHighlighted && (
                  <circle r="3" fill="#34d399" filter="url(#nodeGlow)">
                    <animateMotion
                      path={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`}
                      dur="2.2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Core rotating orbit ring for the central Go Engine */}
          <g transform="translate(250, 190)">
            <circle
              r="46"
              fill="none"
              stroke="#10b981"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              opacity="0.35"
              className="animate-spin"
              style={{ animationDuration: "16s" }}
            />
          </g>

          {/* Nodes */}
          {NODES.map((node) => {
            const isSelected = activeNodeId === node.id;
            const isCore = node.category === "core";
            const radius = isCore ? 26 : 21;
            const Icon = node.icon;

            return (
              <g
                key={node.id}
                onClick={() => setActiveNodeId(node.id)}
                onMouseEnter={() => setActiveNodeId(node.id)}
                className="cursor-pointer"
              >
                {/* Outer Glow on hover */}
                {isSelected && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={radius + 8}
                    fill="none"
                    stroke={node.color}
                    strokeWidth="1.5"
                    opacity="0.6"
                    className="animate-pulse"
                  />
                )}

                {/* Node Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={radius}
                  fill="#0d121d"
                  stroke={isSelected ? node.color : "#334155"}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                  filter={isSelected ? "url(#nodeGlow)" : undefined}
                  className="transition-colors duration-200"
                />

                {/* Center dot / Accent */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelected ? 10 : 7}
                  fill={node.color}
                  opacity={isSelected ? 0.9 : 0.4}
                  className="transition-all duration-200"
                />

                {/* Node Label */}
                <text
                  x={node.x}
                  y={node.y + radius + 15}
                  textAnchor="middle"
                  fill={isSelected ? "#ffffff" : "#94a3b8"}
                  fontSize={isCore ? "11.5" : "10"}
                  fontFamily="ui-monospace, monospace"
                  fontWeight={isSelected ? "700" : "500"}
                  className="transition-colors duration-200 pointer-events-none"
                >
                  {node.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating System HUD Tooltip Card */}
      <div className="w-full mt-2 transition-all duration-300">
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-mono tracking-wider uppercase text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live Topology Inspector
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              Interactive Architecture
            </span>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: activeNode.color }}
            />
            <h4 className="text-xs sm:text-sm font-bold text-white">
              {activeNode.name}
            </h4>
            <span className="text-[10px] font-mono text-slate-400">
              ({activeNode.subtitle})
            </span>
          </div>

          <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
            {activeNode.role}
          </p>

          <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>Click or hover any node to inspect</span>
            <span className="text-emerald-400">Status: HEALTHY_ONLINE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
