"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  isExternal?: boolean;
  categories: string[];
  thumbnailType: "image" | "custom";
  imageSrc?: string;
  customThumbnail?: React.ReactNode;
  glowColor?: string;
  badge?: string;
  isActionCard?: boolean;
  actionText?: string;
}

export function ProjectCard({ project }: { project: ProjectItem }) {
  const CardContent = (
    <div
      className={`group relative flex flex-col justify-between h-full rounded-2xl bg-[#070b18]/90 border border-slate-800/80 p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-700 shadow-xl overflow-hidden cursor-pointer ${
        project.glowColor ? `hover:shadow-[0_10px_35px_${project.glowColor}]` : ""
      }`}
    >
      {/* Top Ambient Glow if specified */}
      {project.glowColor && (
        <div
          className="absolute -top-16 -left-16 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity duration-500"
          style={{ backgroundColor: project.glowColor }}
        />
      )}

      <div>
        {/* Top Header Row / Banner Preview */}
        {project.thumbnailType === "image" && project.imageSrc ? (
          <div className="relative w-full aspect-[16/8] rounded-xl overflow-hidden border border-slate-700/60 bg-slate-900 shadow-md mb-3 group/banner">
            <Image
              src={project.imageSrc}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b18]/60 via-transparent to-transparent pointer-events-none" />

            {/* Top-Right Arrow Action Button overlaid on banner */}
            <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-lg bg-slate-900/85 backdrop-blur-md border border-slate-700/70 group-hover:border-cyan-400/80 group-hover:bg-slate-800 flex items-center justify-center text-slate-300 group-hover:text-cyan-300 transition-all shadow-md">
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-3 mb-3">
            {/* Visual Custom Thumbnail */}
            <div className="relative w-14 h-10 sm:w-16 sm:h-11 rounded-xl overflow-hidden border border-slate-700/60 bg-slate-900 shadow-md shrink-0 flex items-center justify-center">
              {project.customThumbnail}
            </div>

            {/* Top-Right Arrow Action Button */}
            <div className="w-7 h-7 rounded-lg bg-slate-900/80 border border-slate-700/60 group-hover:border-cyan-400/80 group-hover:bg-slate-800 flex items-center justify-center text-slate-300 group-hover:text-cyan-300 transition-all shadow-sm shrink-0">
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        )}

        {/* Project Title */}
        <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors mb-1">
          {project.title}
        </h3>

        {/* Optional Private/Category Tag */}
        {project.badge && (
          <div className="mb-2">
            <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/90 border border-slate-800 text-slate-400">
              {project.badge}
            </span>
          </div>
        )}

        {/* Narrative Description */}
        <p className="text-xs sm:text-[13px] text-slate-300/90 leading-relaxed mb-3.5">
          {project.description}
        </p>
      </div>

      {/* Card Footer: Tech Badges or Action Button */}
      {project.isActionCard ? (
        <div className="pt-2">
          <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-slate-900 border border-slate-700/80 group-hover:border-cyan-400 group-hover:bg-slate-800 transition-colors shadow-sm">
            <span>{project.actionText || "View on GitHub →"}</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/40">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-900/80 text-slate-300 border border-slate-800/80 group-hover:border-slate-700 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  if (project.isExternal) {
    return (
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        {CardContent}
      </a>
    );
  }

  return (
    <Link href={project.link} className="block h-full">
      {CardContent}
    </Link>
  );
}
