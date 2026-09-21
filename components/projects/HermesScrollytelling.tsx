"use client";

import React, { useEffect, useRef, useState } from "react";
import { registerGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  Radio,
  Smartphone,
  Server,
  Database,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  Activity,
  Layers,
  Zap,
} from "lucide-react";

interface StepInfo {
  step: number;
  title: string;
  badge: string;
  description: string;
  techNote: string;
}

const STEPS: StepInfo[] = [
  {
    step: 1,
    title: "1. Teacher Begins Transit",
    badge: "GPS Telemetry Start",
    description:
      "The mobile client awakens via motion co-processor triggers, acquiring high-accuracy GPS coordinates (lat, long, accuracy, timestamp) while optimizing for minimal battery consumption.",
    techNote: "Adaptive frequency: 15s in transit, dropping to 60s when stationary via accelerometer thresholds.",
  },
  {
    step: 2,
    title: "2. Mobile App MQTT Publisher",
    badge: "QoS 1 Telemetry Stream",
    description:
      "Coordinates are serialized into compact binary JSON payloads and published to the institutional MQTT topic over TLS with QoS 1 guarantees.",
    techNote: "Topic: /schools/{id}/teachers/{id}/telemetry with local SQLite offline queueing on disconnect.",
  },
  {
    step: 3,
    title: "3. Distributed Ingestion & Deduplication",
    badge: "Go Ingestion Workers",
    description:
      "Go microservice worker pools consume telemetry streams. Sliding-window Redis keys verify and drop any duplicate packets caused by cellular network retries.",
    techNote: "Worker pool size bounded to CPU cores; sliding window SETNX with 10-second TTL guarantees idempotency.",
  },
  {
    step: 4,
    title: "4. Redis Geospatial Coordinate Indexing",
    badge: "In-Memory Geohashing",
    description:
      "Coordinates are indexed into Redis sorted sets using GEOADD. This allows instant distance evaluations and spatial nearest-neighbor lookups in sub-millisecond time.",
    techNote: "Spatial queries execute in O(log(N) + M) time with microsecond memory reads.",
  },
  {
    step: 5,
    title: "5. Dynamic Geofence Polygon Evaluation",
    badge: "Perimeter Calculation",
    description:
      "The system computes spatial proximity against the school campus boundary polygon. As the teacher crosses the 150-meter outer perimeter, verification workflows trigger.",
    techNote: "Ray-casting point-in-polygon algorithm combined with fast bounding-box pre-filtering.",
  },
  {
    step: 6,
    title: "6. Zero-Click Automated Check-In",
    badge: "ACID Transaction & WebSockets",
    description:
      "Perimeter breach confirmed with required GPS accuracy threshold. An automated check-in record is written to PostgreSQL, real-time staff attendance boards update via WebSockets, and tracking frequency drops to save battery.",
    techNote: "PostgreSQL audit log written with cryptographic payload hash; admin dashboard notified in < 40ms.",
  },
];

export function HermesScrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const packetRef = useRef<SVGCircleElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState<number>(1);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const { gsap, ScrollTrigger } = registerGSAP();

    const ctx = gsap.context(() => {
      // Timeline pinned to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3500", // 3.5 viewport heights of smooth scrolling
          pin: pinRef.current,
          scrub: 0.8,
          onUpdate: (self) => {
            const step = Math.min(
              6,
              Math.max(1, Math.floor(self.progress * 6) + 1)
            );
            setActiveStep(step);
          },
        },
      });

      // Animate packet along path
      if (pathRef.current && packetRef.current) {
        const pathLength = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        // 1. Line draws
        tl.to(
          pathRef.current,
          {
            strokeDashoffset: 0,
            ease: "none",
            duration: 5,
          },
          0
        );

        // 2. Nodes illuminate progressively
        tl.to("#node-teacher", { scale: 1.15, duration: 0.5 }, 0.2);
        tl.to("#node-mobile", { scale: 1.15, duration: 0.5 }, 0.8);
        tl.to("#node-mqtt", { scale: 1.15, duration: 0.5 }, 1.6);
        tl.to("#node-worker", { scale: 1.15, duration: 0.5 }, 2.5);
        tl.to("#node-redis", { scale: 1.15, duration: 0.5 }, 3.3);
        tl.to("#node-geofence", { scale: 1.25, duration: 0.6 }, 4.0);
        tl.to("#node-checkin", { scale: 1.3, duration: 0.8 }, 4.6);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const currentStepData = STEPS[activeStep - 1] || STEPS[0];

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        ref={pinRef}
        className="w-full h-screen flex flex-col justify-between py-6 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-emerald-400 tracking-wider uppercase">
                  Hermes Telemetry Pipeline
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  GSAP Scrub Active
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Interactive Architecture Scrollytelling
              </h3>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate-400">
            <span>Scroll Down to Progress Timeline</span>
            <span className="text-emerald-400 font-bold">[{activeStep} / 6]</span>
          </div>
        </div>

        {/* Middle: Interactive Architecture SVG Flow */}
        <div className="relative w-full flex-grow flex items-center justify-center my-4">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 tech-grid-bg opacity-40 -z-10 rounded-2xl border border-slate-800/60" />

          <svg
            viewBox="0 0 960 380"
            className="w-full h-auto max-h-[420px] select-none"
            fill="none"
          >
            {/* Defs for gradients & glows */}
            <defs>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="30%" stopColor="#06b6d4" />
                <stop offset="60%" stopColor="#3b82f6" />
                <stop offset="85%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>

              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Static Background Path Line */}
            <path
              d="M 100 190 C 200 190, 220 100, 320 100 C 420 100, 440 280, 540 280 C 640 280, 680 130, 780 130 C 830 130, 850 190, 880 190"
              stroke="#1e293b"
              strokeWidth="4"
              strokeDasharray="6 6"
            />

            {/* Active Scrubbed Path Line */}
            <path
              ref={pathRef}
              d="M 100 190 C 200 190, 220 100, 320 100 C 420 100, 440 280, 540 280 C 640 280, 680 130, 780 130 C 830 130, 850 190, 880 190"
              stroke="url(#line-gradient)"
              strokeWidth="5"
              filter="url(#glow)"
              strokeLinecap="round"
            />

            {/* Node 1: Teacher */}
            <g id="node-teacher" className="transition-all duration-300">
              <circle cx="100" cy="190" r="32" fill="#0d121d" stroke="#10b981" strokeWidth="3" />
              <circle cx="100" cy="190" r="14" fill="#10b981" opacity={activeStep >= 1 ? 1 : 0.4} />
              <text x="100" y="240" textAnchor="middle" fill="#f8fafc" fontSize="13" fontFamily="monospace" fontWeight="600">
                1. Teacher
              </text>
              <text x="100" y="258" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                GPS Device
              </text>
            </g>

            {/* Node 2: Mobile App */}
            <g id="node-mobile" className="transition-all duration-300">
              <circle cx="320" cy="100" r="30" fill="#0d121d" stroke="#06b6d4" strokeWidth="3" />
              <circle cx="320" cy="100" r="13" fill="#06b6d4" opacity={activeStep >= 2 ? 1 : 0.4} />
              <text x="320" y="55" textAnchor="middle" fill="#f8fafc" fontSize="13" fontFamily="monospace" fontWeight="600">
                2. Mobile App
              </text>
              <text x="320" y="72" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                MQTT Pub (QoS 1)
              </text>
            </g>

            {/* Node 3: MQTT Broker */}
            <g id="node-mqtt" className="transition-all duration-300">
              <circle cx="430" cy="190" r="32" fill="#0d121d" stroke="#38bdf8" strokeWidth="3" />
              <circle cx="430" cy="190" r="14" fill="#38bdf8" opacity={activeStep >= 3 ? 1 : 0.4} />
              <text x="430" y="240" textAnchor="middle" fill="#f8fafc" fontSize="13" fontFamily="monospace" fontWeight="600">
                3. MQTT Broker
              </text>
              <text x="430" y="258" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                Topic Ingestion
              </text>
            </g>

            {/* Node 4: Go Workers */}
            <g id="node-worker" className="transition-all duration-300">
              <circle cx="540" cy="280" r="32" fill="#0d121d" stroke="#3b82f6" strokeWidth="3" />
              <circle cx="540" cy="280" r="14" fill="#3b82f6" opacity={activeStep >= 4 ? 1 : 0.4} />
              <text x="540" y="330" textAnchor="middle" fill="#f8fafc" fontSize="13" fontFamily="monospace" fontWeight="600">
                4. Go Workers
              </text>
              <text x="540" y="348" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                Deduplication
              </text>
            </g>

            {/* Node 5: Redis Geospatial */}
            <g id="node-redis" className="transition-all duration-300">
              <circle cx="680" cy="200" r="34" fill="#0d121d" stroke="#f43f5e" strokeWidth="3" />
              <circle cx="680" cy="200" r="15" fill="#f43f5e" opacity={activeStep >= 5 ? 1 : 0.4} />
              <text x="680" y="252" textAnchor="middle" fill="#f8fafc" fontSize="13" fontFamily="monospace" fontWeight="600">
                5. Redis Geo
              </text>
              <text x="680" y="270" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">
                Sub-ms Spatial
              </text>
            </g>

            {/* Node 6: Geofence Check-In Trigger */}
            <g id="node-geofence" className="transition-all duration-300">
              <circle cx="880" cy="190" r="38" fill="#0d121d" stroke="#10b981" strokeWidth="4" />
              <circle cx="880" cy="190" r="18" fill="#10b981" opacity={activeStep >= 6 ? 1 : 0.4} />
              <text x="880" y="246" textAnchor="middle" fill="#f8fafc" fontSize="13" fontFamily="monospace" fontWeight="600">
                6. Auto Check-In
              </text>
              <text x="880" y="264" textAnchor="middle" fill="#34d399" fontSize="11" fontFamily="monospace">
                Campus Verified!
              </text>
            </g>
          </svg>
        </div>

        {/* Bottom Narration Card Synced to Scroll */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {currentStepData.badge}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Pipeline Stage {activeStep} of 6
                </span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                {currentStepData.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentStepData.description}
              </p>
            </div>

            <div className="md:col-span-4 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 font-mono">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1 text-emerald-400">
                <Zap className="w-3.5 h-3.5" /> Technical Specification
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {currentStepData.techNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
