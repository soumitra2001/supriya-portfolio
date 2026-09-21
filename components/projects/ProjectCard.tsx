"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ExternalLink, Activity, Database, Server, Sparkles } from "lucide-react";

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  status: string;
  statusType: "live" | "production" | "architecture";
  description: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  caseStudyUrl: string;
  externalUrl?: string;
  icon: React.ReactNode;
  featured?: boolean;
}

export function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col rounded-2xl bg-slate-900/70 border border-slate-800/80 p-6 sm:p-8 backdrop-blur-md overflow-hidden transition-colors hover:border-slate-700/90 shadow-xl ${
        project.featured
          ? "lg:col-span-2 border-emerald-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90"
          : ""
      }`}
    >
      {/* Subtle hover gradient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />

      {/* Top Meta Bar */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700/60 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
            {project.icon}
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              {project.category}
            </span>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium ${
              project.statusType === "production"
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                : project.statusType === "live"
                ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {project.status}
          </span>
        </div>
      </div>

      {/* Project Title & Subtitle */}
      <div className="mb-4">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-xs font-mono text-slate-400 mt-1">
          {project.subtitle}
        </p>
      </div>

      {/* Narrative Description */}
      <p className="text-sm text-slate-300 leading-relaxed mb-6 flex-grow">
        {project.description}
      </p>

      {/* Key Architecture Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/60 font-mono">
        {project.metrics.map((m, idx) => (
          <div key={idx}>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">
              {m.label}
            </div>
            <div className="text-sm sm:text-base font-bold text-slate-200 mt-0.5">
              {m.value}
            </div>
          </div>
        ))}
      </div>

      {/* Tech Stack Badges */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800/70 text-slate-300 border border-slate-700/50"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* CTA Links */}
      <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80 mt-auto">
        <Link
          href={project.caseStudyUrl}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group/link"
        >
          <span>Read Architecture Case Study</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>

        {project.externalUrl && (
          <a
            href={project.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors ml-auto"
          >
            <span>Live Product</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
