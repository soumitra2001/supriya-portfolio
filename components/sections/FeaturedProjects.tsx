"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FadeIn } from "@/components/animation/FadeIn";
import { ProjectCard, ProjectItem } from "@/components/projects/ProjectCard";
import { MapPin, Link2, LayoutDashboard, Cpu, Layers } from "lucide-react";

// ============================================================================
// Custom High-Fidelity Thumbnails for Project Cards
// ============================================================================

// 1. Marketing Campaign Platform: Admin Dashboard Preview
function MarketingPlatformThumbnail() {
  return (
    <div className="w-full h-full bg-[#0a0f1d] p-1.5 flex flex-col justify-between select-none font-sans overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-800 pb-1">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
          <span className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
        </div>
        <span className="text-[7px] font-mono text-cyan-400 bg-cyan-950/60 px-1 rounded">Admin</span>
      </div>
      <div className="grid grid-cols-3 gap-1 py-1">
        <div className="h-4 rounded bg-slate-800/80 border border-slate-700/50 flex items-center justify-center">
          <span className="text-[6px] text-slate-400">Pages</span>
        </div>
        <div className="h-4 rounded bg-slate-800/80 border border-slate-700/50 flex items-center justify-center">
          <span className="text-[6px] text-emerald-400">Live</span>
        </div>
        <div className="h-4 rounded bg-indigo-950/70 border border-indigo-700/50 flex items-center justify-center">
          <span className="text-[6px] text-indigo-300">Enquiry</span>
        </div>
      </div>
      <div className="w-full h-1.5 rounded bg-slate-800 overflow-hidden flex">
        <div className="h-full bg-indigo-500 w-3/4" />
        <div className="h-full bg-cyan-400 w-1/4" />
      </div>
    </div>
  );
}

// 2. URL Shortener Platform: Low-Latency Gateway
function UrlShortenerThumbnail() {
  return (
    <div className="w-full h-full bg-[#08101a] p-1.5 flex flex-col justify-between select-none font-mono overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-800 pb-1">
        <div className="flex items-center gap-1">
          <Link2 className="w-2.5 h-2.5 text-emerald-400" />
          <span className="text-[7px] text-emerald-300 font-semibold">flurn.to</span>
        </div>
        <span className="text-[6px] px-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          &lt;1.8ms
        </span>
      </div>
      <div className="bg-slate-950/80 rounded px-1.5 py-0.5 border border-slate-800 text-[6px] text-slate-400 truncate">
        /campaign-skyline
      </div>
      <div className="flex items-center justify-between text-[6px] text-slate-500">
        <span className="text-cyan-400">Redis Hit</span>
        <span className="text-emerald-400">200 OK</span>
      </div>
    </div>
  );
}

// 3. Hermes Geospatial Engine: Real-time Telemetry & Geofencing
function HermesThumbnail() {
  return (
    <div className="w-full h-full bg-[#070d1a] relative overflow-hidden flex items-center justify-center select-none">
      {/* Dark map grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:10px_10px] opacity-35" />
      
      {/* Route polyline */}
      <svg className="absolute inset-0 w-full h-full" fill="none">
        <path
          d="M 10,36 Q 30,16 55,22"
          stroke="#06b6d4"
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
      </svg>

      {/* Pulsing Pin */}
      <div className="absolute top-2 right-3 flex flex-col items-center">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping absolute" />
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
      </div>

      {/* Latency badge */}
      <div className="absolute bottom-1 inset-x-1 px-1 rounded bg-slate-900/90 border border-slate-800 flex justify-between items-center text-[6px] font-mono text-slate-300">
        <span className="text-cyan-400">WS: 38ms</span>
        <span className="text-emerald-400">PostGIS</span>
      </div>
    </div>
  );
}

// 4. Ganymede: High-Concurrency Backend Pipeline
function GanymedeThumbnail() {
  return (
    <div className="w-full h-full bg-[#0a0c16] p-1.5 flex flex-col justify-between select-none font-mono text-[7px] text-slate-300 overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-800 pb-0.5">
        <div className="flex items-center gap-1">
          <Cpu className="w-2.5 h-2.5 text-purple-400" />
          <span className="text-purple-300 font-bold">Ganymede</span>
        </div>
        <span className="text-[6px] text-purple-400">gRPC</span>
      </div>
      <div className="space-y-0.5 text-[6px]">
        <div className="text-slate-400"><span className="text-pink-400">go</span> workerPool(ctx)</div>
        <div className="text-slate-500">conn: 14.8k ops/s</div>
      </div>
      <div className="w-full bg-slate-800/80 rounded-full h-1 overflow-hidden">
        <div className="bg-purple-500 h-full w-4/5" />
      </div>
    </div>
  );
}

// 5. GitHub Octocat Thumbnail for More Projects
function GithubThumbnail() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 to-[#121629] flex items-center justify-center select-none">
      <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white shadow-inner">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      </div>
    </div>
  );
}

// ============================================================================
// Project Items Data Definition
// ============================================================================

const PROJECTS: ProjectItem[] = [
  {
    id: "tr-glowcare",
    title: "TR GlowCare",
    badge: "Client Production · Live Platform",
    description:
      "A complete full-stack clinical skincare and appointment platform featuring 'Book Now, Pay After Service', Cashfree dynamic UPI QR checkout, Supabase PostgreSQL, and in-house telemetry.",
    technologies: ["Next.js", "TypeScript", "Supabase", "Cashfree", "Tailwind CSS"],
    link: "/projects/tr-glowcare",
    categories: ["all", "featured", "web"],
    thumbnailType: "image",
    imageSrc: "/projects/tr-glowcare-hero.png",
    glowColor: "#8b5cf6",
  },
  {
    id: "marketing-campaign",
    title: "Marketing Campaign Platform",
    badge: "Internal Platform · Live Production",
    description:
      "Production multi-tenant CMS and high-conversion landing page engine enabling marketing ops to launch, test, and analyze 170+ localized apartment campaigns across Bangalore.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "REST APIs", "Tailwind CSS"],
    link: "/projects/marketing-campaign",
    categories: ["all", "featured", "backend", "web", "internal"],
    thumbnailType: "image",
    imageSrc: "/projects/marketing-campaign-admin.png",
    glowColor: "#10b981",
  },
  {
    id: "url-shortener",
    title: "URL Shortener",
    badge: "Go Microservice · Live Production",
    description:
      "High-throughput URL shortening and sub-2ms redirect engine with Redis cache-aside, custom alias collision protection, and non-blocking asynchronous clickstream telemetry.",
    technologies: ["Go (Golang)", "Redis", "MongoDB", "Gorilla Mux", "Docker"],
    link: "/projects/url-shortener",
    categories: ["all", "featured", "backend", "internal"],
    thumbnailType: "image",
    imageSrc: "/projects/url-shortener-banner.png",
    glowColor: "#06b6d4",
  },
  {
    id: "hermes",
    title: "Hermes Geospatial Engine",
    badge: "Monorepo System · Production",
    description:
      "Real-time teacher dispatch & telemetry monorepo (NestJS + React 18) featuring Kalman filter GPS jitter smoothing, Ray Casting polygon geofencing, sub-50ms WebSocket streams, and PostGIS queries.",
    technologies: ["NestJS", "React 18", "Socket.IO", "PostGIS", "Redis", "Docker"],
    link: "/projects/hermes",
    categories: ["all", "featured", "backend", "web"],
    thumbnailType: "custom",
    customThumbnail: <HermesThumbnail />,
    glowColor: "#0284c7",
  },
  {
    id: "ganymede",
    title: "Ganymede Core Platform",
    badge: "Core Architecture · High Concurrency",
    description:
      "Main distributed backend system powering high-concurrency microservices, asynchronous worker pools, gRPC event streaming, and resilient transaction pipelines across production workflows.",
    technologies: ["Golang", "gRPC", "Redis", "PostgreSQL", "Docker"],
    link: "/projects/hermes",
    categories: ["all", "backend"],
    thumbnailType: "custom",
    customThumbnail: <GanymedeThumbnail />,
    glowColor: "#a855f7",
  },
  {
    id: "github-more",
    title: "More Projects",
    badge: "Open Source · 20+ Repos",
    description:
      "Explore more of my open-source systems, developer tooling, distributed backend architectures, microservice prototypes, and performance experiments on GitHub.",
    technologies: [],
    link: "https://github.com/soumitra2001",
    isExternal: true,
    categories: ["all", "featured"],
    thumbnailType: "custom",
    customThumbnail: <GithubThumbnail />,
    isActionCard: true,
    actionText: "View on GitHub →",
    glowColor: "#38bdf8",
  },
];

const FILTER_TABS = [
  { id: "all", label: "All" },
  { id: "featured", label: "Featured" },
  { id: "backend", label: "Backend" },
  { id: "web", label: "Web Apps" },
  { id: "internal", label: "Internal Tools" },
];

export function FeaturedProjects() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredProjects =
    activeTab === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.categories.includes(activeTab));

  return (
    <section id="projects" className="pt-6 sm:pt-10 pb-16 sm:pb-24 relative bg-[#040714] text-slate-100 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-900/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-950/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============================================================ */}
        {/* Section Header: Preserving Text Verbatim + Hand-drawn Arrow  */}
        {/* ============================================================ */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 sm:mb-10 gap-6">
          <div>
            <div className="font-mono text-xs text-sky-400 font-semibold tracking-wider uppercase mb-2">
              FEATURED WORK
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-2">
              Some of the things I've built
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">
              Real-world projects solving actual business problems.
            </p>
          </div>

          {/* Hand-drawn Script & Curved Arrow (as inspired by Image 1) */}
          <div className="hidden sm:flex flex-col items-end relative select-none shrink-0 pb-1">
            <span
              className="text-2xl text-slate-300/80 -rotate-3 tracking-wide"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              Build / Explore / Repeat
            </span>
            <svg
              className="w-14 h-8 text-cyan-400/70 -mr-3 -mt-1 pointer-events-none"
              viewBox="0 0 60 36"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M 8 6 C 32 4, 46 12, 40 28" />
              <path d="M 34 22 L 40 29 L 47 24" />
            </svg>
          </div>
        </div>

        {/* ============================================================ */}
        {/* Filter Tabs (as inspired by Image 1)                          */}
        {/* ============================================================ */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-slate-800 text-white border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                    : "bg-slate-900/60 text-slate-400 border border-slate-800/80 hover:text-white hover:border-slate-700"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* 3-Column Responsive Grid (6 Cards Total)                      */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProjects.map((project, idx) => (
            <FadeIn
              key={project.id}
              delay={0.06 * idx}
              direction="up"
              distance={16}
            >
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
