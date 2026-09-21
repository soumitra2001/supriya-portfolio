"use client";

import React from "react";
import { FadeIn } from "@/components/animation/FadeIn";
import { RevealText } from "@/components/animation/RevealText";
import { ProjectCard, ProjectData } from "@/components/projects/ProjectCard";
import { Radio, HeartPulse, Link2, ArrowRight } from "lucide-react";
import Link from "next/link";

const PROJECTS: ProjectData[] = [
  {
    id: "hermes",
    title: "Hermes: Real-Time Teacher Location Tracking & Auto Check-In",
    subtitle: "Distributed IoT Telemetry & Dynamic Geospatial Geofencing Engine",
    category: "Real-Time / Distributed Systems",
    status: "Production Architecture",
    statusType: "production",
    featured: true,
    description:
      "A resilient distributed tracking platform engineered to ingest high-frequency mobile GPS coordinates via MQTT, calculate sub-meter polygon geofences inside Redis Geospatial, and trigger zero-latency automated check-ins and session dispatching without draining device battery.",
    technologies: [
      "Golang",
      "MQTT Broker",
      "Redis Geospatial",
      "PostgreSQL",
      "Goroutine Worker Pools",
      "Docker",
      "WebSockets",
    ],
    metrics: [
      { label: "Ingestion Latency", value: "< 50ms" },
      { label: "Geofence Precision", value: "Sub-meter" },
      { label: "Battery Optimization", value: "Adaptive Telemetry" },
    ],
    caseStudyUrl: "/projects/hermes",
    icon: <Radio className="w-5 h-5 text-emerald-400" />,
  },
  {
    id: "tr-glowcare",
    title: "TR GlowCare: At-Home Clinical Skincare & Wellness Platform",
    subtitle: "Full-Stack Production Healthcare Booking & Fulfillment Engine",
    category: "Production System / E-Commerce",
    status: "Live in Bangalore",
    statusType: "live",
    description:
      "Engineered the complete digital product architecture powering at-home clinical dermatology services in Bangalore. Built transactional slot-booking mechanisms with distributed locks to avoid double-bookings, customer care workflow pipelines, and an optimized, high-converting customer experience.",
    technologies: [
      "Next.js / TypeScript",
      "Node & Go APIs",
      "PostgreSQL",
      "Redis Slot Lock",
      "Payment Gateway",
      "Admin Ops Portal",
    ],
    metrics: [
      { label: "Active Market", value: "Bangalore (BLR)" },
      { label: "Customer Rating", value: "4.9 ★ (500+)" },
      { label: "Catalog Scale", value: "6+ Specialized Categories" },
    ],
    caseStudyUrl: "/projects/tr-glowcare",
    externalUrl: "https://trglowcare.com",
    icon: <HeartPulse className="w-5 h-5 text-rose-400" />,
  },
  {
    id: "url-shortener",
    title: "High-Throughput Distributed URL Shortener & Analytics",
    subtitle: "Low-Latency Base62 Engine with Bloom Filters & Cache-Aside",
    category: "System Design / Scalable APIs",
    status: "Interactive Benchmark",
    statusType: "architecture",
    description:
      "A high-concurrency URL shortening and clickstream telemetry service built in Go. Employs Bloom filters in memory to eliminate expensive DB queries on non-existent keys, distributed Base62 encoding, Redis cache-aside with TTL jitter, and asynchronous clickstream analytics ingestion.",
    technologies: [
      "Go (Golang)",
      "Bloom Filters",
      "Base62 Hashing",
      "Redis Cache",
      "PostgreSQL",
      "Async Event Pipelines",
    ],
    metrics: [
      { label: "Redirect P99", value: "< 8ms" },
      { label: "DB Read Reduction", value: "99.2% via Cache" },
      { label: "Collision Rate", value: "0% Guarantees" },
    ],
    caseStudyUrl: "/projects/url-shortener",
    icon: <Link2 className="w-5 h-5 text-cyan-400" />,
  },
];

export function FeaturedProjects() {
  return (
    <section id="projects" className="py-24 relative border-t border-slate-800/60 tech-dot-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Featured Engineering Projects
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              <RevealText text="Production systems & technical case studies." as="span" />
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Architectural decisions, trade-offs, and production engineering behind real products and distributed services.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((project, idx) => (
            <FadeIn key={project.id} delay={idx * 0.15} direction="up" distance={30}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>

        {/* Bottom Callout */}
        <FadeIn delay={0.4} direction="up" distance={20} className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
            <span>Want to see how Hermes processes location packets step-by-step?</span>
            <Link
              href="/projects/hermes"
              className="font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
            >
              Launch Interactive Hermes Scrollytelling
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
