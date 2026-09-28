"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Download } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sectionIds = ["contact", "about", "engineering", "projects", "tech-stack", "home"];
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        if (id === "home") {
          setActiveSection("home");
          break;
        }
        const el = document.getElementById(id);
        if (el && scrollPosition >= el.offsetTop) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Home", href: "/#" },
    { id: "tech-stack", label: "Tech Stack", href: "/#tech-stack" },
    { id: "projects", label: "Projects", href: "/#projects" },
    { id: "engineering", label: "Engineering", href: "/#engineering" },
    { id: "about", label: "About", href: "/#about" },
    { id: "contact", label: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#04060d]/85 backdrop-blur-md border-b border-slate-800/80 py-3.5 shadow-xl shadow-black/40"
            : "bg-transparent py-5"
        }`}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Brand Avatar & Name with Subtle Accent */}
          <Link
            href="/"
            aria-label="Home"
            className="group flex items-center gap-2.5 focus:outline-none z-10"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-700/80 flex items-center justify-center text-slate-200 font-medium text-sm shadow-sm group-hover:border-cyan-500/40 transition-all duration-300">
              <span>S</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-200 tracking-tight group-hover:text-white transition-colors">
                Supriya Ghorai
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/40" />
            </div>
          </Link>

          {/* Center: Desktop Nav Links (dead-center aligned with consistent spacing) */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setActiveSection(link.id)}
                  className={`relative text-[13px] font-medium transition-colors duration-200 py-1 ${
                    isActive ? "text-white font-semibold" : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Resume Button */}
          <div className="hidden md:flex items-center gap-3 z-10">
            {/* Resume Button */}
            <a
              href="#resume"
              onClick={(e) => {
                const el = document.getElementById("contact");
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500 hover:text-white transition-all shadow-sm shadow-black/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-30 bg-[#07090e]/95 backdrop-blur-xl border-b border-slate-800 p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => {
                    setActiveSection(link.id);
                    setMobileOpen(false);
                  }}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-900 hover:text-cyan-400 border border-transparent hover:border-slate-800 transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 mt-1 border-t border-slate-800 flex items-center justify-end">
                <a
                  href="#resume"
                  onClick={(e) => {
                    setMobileOpen(false);
                    const el = document.getElementById("contact");
                    if (el) {
                      e.preventDefault();
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="flex items-center justify-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold bg-slate-900 border border-slate-700/80 text-white hover:border-cyan-500 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Resume</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
