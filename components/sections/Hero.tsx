"use client";

import React from "react";
import Link from "next/link";
import { RevealText } from "@/components/animation/RevealText";
import { FadeIn } from "@/components/animation/FadeIn";
import { MagneticButton } from "@/components/animation/MagneticButton";
import { HeroScene } from "@/components/3d/HeroScene";
import { ArrowRight, Cpu, Layers, ShieldCheck, Database, Radio, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden tech-grid-bg">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Technical Narrative & Headlines */}
          <div className="lg:col-span-7 flex flex-col z-10">
            {/* Status Pill */}
            <FadeIn direction="down" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 backdrop-blur-md mb-6 w-fit shadow-inner">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-mono text-xs text-slate-300">
                  Senior Software Engineer <span className="text-slate-500">/</span> Backend & Distributed Systems
                </span>
              </div>
            </FadeIn>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              <RevealText
                text="Architecting resilient distributed systems and scalable services."
                as="span"
                delay={0.2}
                stagger={0.035}
              />
            </h1>

            {/* Bio Synopsis */}
            <FadeIn delay={0.4} direction="up" distance={20}>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
                I design and build reliable backend platforms, low-latency APIs, and mission-critical business workflows from the ground up—primarily in <span className="text-emerald-400 font-semibold font-mono">Go</span>. From real-time geospatial tracking to live consumer health platforms like <span className="text-slate-100 font-medium">TR GlowCare</span>, I focus on clean architecture, predictable concurrency, and real-world business impact.
              </p>
            </FadeIn>

            {/* Core Tech Stack Micro-Tags */}
            <FadeIn delay={0.5} direction="up" distance={15}>
              <div className="flex flex-wrap items-center gap-2 mb-10">
                <span className="text-xs font-mono text-slate-500 mr-1 flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" /> Stack:
                </span>
                {[
                  "Golang",
                  "Distributed Systems",
                  "Redis Geo & Pub/Sub",
                  "PostgreSQL",
                  "MQTT / Event Pipelines",
                  "Clean Architecture",
                  "Docker",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-900/90 text-slate-300 border border-slate-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </FadeIn>

            {/* Primary Action Buttons */}
            <FadeIn delay={0.6} direction="up" distance={15}>
              <div className="flex flex-wrap items-center gap-4">
                <MagneticButton strength={0.25}>
                  <Link
                    href="/projects/hermes"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.45)] group"
                  >
                    <span>Hermes System Deep Dive</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </MagneticButton>

                <MagneticButton strength={0.2}>
                  <Link
                    href="#projects"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 transition-all hover:border-slate-600"
                  >
                    <Layers className="w-4 h-4 text-emerald-400" />
                    <span>Explore Projects</span>
                  </Link>
                </MagneticButton>

                <Link
                  href="#demo"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors ml-2 py-2"
                >
                  <span>Interactive Demo</span>
                  <span className="text-emerald-400">→</span>
                </Link>
              </div>
            </FadeIn>

            {/* Engineering Highlights Quick Stat Ribbon */}
            <FadeIn delay={0.7} direction="up" distance={10}>
              <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-slate-800/80 max-w-lg">
                <div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                    &lt; 50ms
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Geospatial Ingestion Latency
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">
                    Production
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    TR GlowCare Live in BLR
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-indigo-400">
                    100%
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    End-to-End Ownership
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: 3D System Topology Canvas */}
          <div className="lg:col-span-5 relative w-full h-[450px] sm:h-[520px] lg:h-[600px] flex items-center justify-center">
            {/* Ambient Backing Card */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-slate-900/60 to-slate-950/90 border border-slate-800/80 backdrop-blur-xl -z-10 shadow-2xl overflow-hidden">
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* Header Label on 3D Container */}
              <div className="absolute top-4 left-5 right-5 flex items-center justify-between text-[11px] font-mono text-slate-400 pointer-events-none z-10 border-b border-slate-800/60 pb-2.5">
                <span className="flex items-center gap-2 text-slate-300">
                  <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  CLUSTER_TOPOLOGY.SYS
                </span>
                <span className="text-slate-500">R3F / WEBGL ENGINE</span>
              </div>
            </div>

            {/* Interactive 3D Canvas */}
            <HeroScene />
          </div>
        </div>
      </div>
    </section>
  );
}
