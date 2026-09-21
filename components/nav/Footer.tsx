"use client";

import React from "react";
import Link from "next/link";
import { Terminal, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 border-t border-slate-900 bg-[#07090e] text-xs font-mono text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <span className="text-slate-300 font-semibold">
            Supriya Ghorai
          </span>
          <span className="text-slate-600">/</span>
          <span>Senior Software Engineer</span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/projects/hermes" className="hover:text-emerald-400 transition-colors">
            Hermes Case Study
          </Link>
          <Link href="/projects/tr-glowcare" className="hover:text-emerald-400 transition-colors">
            TR GlowCare
          </Link>
          <Link href="/projects/url-shortener" className="hover:text-emerald-400 transition-colors">
            URL Shortener
          </Link>
          <a
            href="https://trglowcare.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors"
          >
            trglowcare.com
          </a>
        </div>

        <div>
          <span>© {new Date().getFullYear()} Supriya Ghorai. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
