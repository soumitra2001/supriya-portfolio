import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { HermesScrollytelling } from "@/components/projects/HermesScrollytelling";
import {
  Radio,
  ArrowLeft,
  CheckCircle2,
  ShieldAlert,
  Server,
  Database,
  Cpu,
  Zap,
  Clock,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Hermes Case Study | Supriya Ghorai — Senior Software Engineer",
  description:
    "Technical case study on Hermes: A real-time teacher location tracking and automated geofence check-in platform built with Go, MQTT, Redis Geospatial, and PostgreSQL.",
};

export default function HermesCaseStudyPage() {
  return (
    <main className="min-h-screen bg-[#07090e] text-slate-100 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects</span>
          </Link>
        </div>

        {/* Hero Header */}
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-4">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            Distributed IoT & Geospatial Telemetry
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            Hermes: Real-Time Teacher Location Tracking & Auto Check-In
          </h1>
          <p className="text-base sm:text-xl text-slate-300 leading-relaxed">
            How I architected a low-latency, battery-aware distributed telemetry system that ingests mobile GPS streams over MQTT, performs sub-meter spatial evaluations in Redis, and automates institutional attendance verification.
          </p>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800">
            <div>
              <div className="text-2xl font-bold font-mono text-emerald-400">&lt; 50ms</div>
              <div className="text-xs text-slate-400 mt-1">End-to-End Latency</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-cyan-400">100%</div>
              <div className="text-xs text-slate-400 mt-1">Packet Deduplication</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-indigo-400">150m</div>
              <div className="text-xs text-slate-400 mt-1">Campus Geofence Radius</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-amber-400">70%</div>
              <div className="text-xs text-slate-400 mt-1">Battery Draw Reduction</div>
            </div>
          </div>
        </div>
      </div>

      {/* GSAP Scrollytelling Section */}
      <section className="my-12 border-y border-slate-800/80 bg-slate-950/40">
        <HermesScrollytelling />
      </section>

      {/* Technical Deep Dive Narrative */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mt-20">
        {/* Section 1: Problem & Constraints */}
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
            The Operational Problem
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Eliminating Manual Friction Under Adverse Network Conditions
          </h2>
          <div className="text-slate-300 space-y-4 leading-relaxed text-sm sm:text-base">
            <p>
              Educational institutions with distributed rural and urban campuses suffered from high friction in attendance reporting. Manual biometric devices generated long queues, while GPS-based mobile apps frequently killed phone batteries within 3 hours or lost telemetry in network dead zones.
            </p>
            <p>
              The core challenge was threefold: (1) achieve sub-minute accuracy for arrival detection, (2) operate reliably over patchy 3G/4G cellular networks without missing check-in timestamps, and (3) conserve battery so teachers could leave telemetry active for a full 8-hour workday.
            </p>
          </div>
        </div>

        {/* Section 2: Architecture Solutions */}
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
            Engineering Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Lightweight Telemetry & In-Memory Geospatial Spatial Lookups
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
              <div className="p-2 w-fit rounded-lg bg-emerald-500/10 text-emerald-400 mb-3">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                Adaptive Telemetry Frequencies
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Integrated motion sensor heuristics on the mobile client. When stationary, GPS sampling throttles down to 60-second intervals. When rapid velocity change is detected, sampling increases to 15 seconds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
              <div className="p-2 w-fit rounded-lg bg-rose-500/10 text-rose-400 mb-3">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                Redis Geospatial Indexing
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Rather than executing expensive GIS bounding queries inside relational tables, active coordinates are stored in Redis Geohash sorted sets via <code>GEOADD</code> and queried in sub-millisecond time.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
              <div className="p-2 w-fit rounded-lg bg-sky-500/10 text-sky-400 mb-3">
                <Radio className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                MQTT Over WebSockets with QoS 1
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Leveraged MQTT pub/sub for tiny message overhead (2-byte packet headers). Cellular disconnections cause packets to queue in a local SQLite ring buffer, flushing automatically upon reconnection.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
              <div className="p-2 w-fit rounded-lg bg-indigo-500/10 text-indigo-400 mb-3">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                Go Worker Pool Ingestion
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                A bounded pool of Goroutine workers ingests telemetry from message channels. Idempotent Redis sliding keys prevent duplicate check-in events when packet retries arrive simultaneously.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Key Results & Impact */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/70 to-slate-950 border border-emerald-500/30">
          <h3 className="text-xl font-bold text-white mb-4">
            Production Outcomes
          </h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
              <span>
                <strong>Zero manual check-in friction:</strong> Verified staff arrival within 150-meter campus perimeter automatically with zero user taps required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
              <span>
                <strong>Sub-50ms ingestion:</strong> Real-time administration board receives instant dispatch status across 200+ concurrent staff.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
              <span>
                <strong>100% audit integrity:</strong> Stored cryptographically verifiable check-in records in PostgreSQL with full offline resilience.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
