"use client";

import React from "react";
import Link from "next/link";
import { Terminal, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <footer className="py-8 border-t border-slate-900 bg-[#07090e] text-xs font-mono text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Identity */}
        <div className="flex items-center gap-2 whitespace-nowrap">
          <div className="w-5 h-5 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Terminal className="w-3 h-3" />
          </div>
          <span className="text-slate-300 font-semibold">Supriya Ghorai</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400">Senior Software Engineer</span>
        </div>

        {/* Center: Clean Professional Links */}
        <div className="flex items-center gap-6 whitespace-nowrap text-slate-400">
          <a
            href="https://github.com/soumitra2001"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/itsmesupriya"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            LinkedIn
          </a>
          <Link
            href="/#contact"
            className="hover:text-white transition-colors"
          >
            Get in Touch
          </Link>
        </div>

        {/* Right: Copyright & Go Up Button */}
        <div className="flex items-center gap-3 whitespace-nowrap text-slate-500">
          <span>© {new Date().getFullYear()} Supriya Ghorai. All rights reserved.</span>
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            title="Scroll to top"
            className="group relative w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/60 hover:bg-slate-800/90 flex items-center justify-center transition-colors text-slate-300 hover:text-emerald-400 cursor-pointer shadow-md"
          >
            <div className="animate-arrow-jump flex items-center justify-center">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
