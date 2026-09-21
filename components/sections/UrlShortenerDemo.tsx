"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FadeIn } from "@/components/animation/FadeIn";
import { RevealText } from "@/components/animation/RevealText";
import {
  Link2,
  ArrowRight,
  Database,
  Cpu,
  Check,
  Copy,
  Zap,
  Activity,
  ShieldCheck,
  RefreshCw,
  Clock,
} from "lucide-react";

export function UrlShortenerDemo() {
  const [inputUrl, setInputUrl] = useState(
    "https://trglowcare.com/skin-care/services/categories?category=clinical-hydra-reset"
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [shortCode, setShortCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({
    timeTaken: "2.8 ms",
    cacheStatus: "WRITE_THROUGH",
    bloomCheck: "PASSED (0 collisions)",
  });

  const sampleUrls = [
    "https://trglowcare.com/skin-care/services/categories",
    "https://github.com/supriyaghorai/high-throughput-go-services",
    "https://aws.amazon.com/blogs/architecture/resilient-iot-telemetry-pipelines",
  ];

  const handleSimulate = () => {
    if (!inputUrl || isProcessing) return;

    setIsProcessing(true);
    setCurrentStep(1);
    setShortUrl(null);
    setCopied(false);

    // Step 1: Hashing & Base62
    setTimeout(() => {
      setCurrentStep(2);
      // Step 2: Bloom Filter Check
      setTimeout(() => {
        setCurrentStep(3);
        // Step 3: Cache write
        setTimeout(() => {
          setCurrentStep(4);
          // Step 4: Complete
          const randomCode = Math.random().toString(36).substring(2, 8);
          setShortCode(randomCode);
          setShortUrl(`https://spr.dev/${randomCode}`);
          setStats({
            timeTaken: `${(Math.random() * 2 + 1.8).toFixed(1)} ms`,
            cacheStatus: "REDIS_SET_EX (TTL 86400s)",
            bloomCheck: "PROVEN_UNIQUE (O(1))",
          });
          setIsProcessing(false);
        }, 350);
      }, 350);
    }, 350);
  };

  const copyToClipboard = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pipelineSteps = [
    {
      id: 1,
      title: "Base62 Encoding",
      desc: "MurmurHash3 + Base62 charset mapping",
      icon: <Cpu className="w-4 h-4 text-emerald-400" />,
    },
    {
      id: 2,
      title: "Bloom Filter Check",
      desc: "O(1) in-memory collision detection",
      icon: <ShieldCheck className="w-4 h-4 text-cyan-400" />,
    },
    {
      id: 3,
      title: "Redis Cache-Aside",
      desc: "Sub-millisecond write with TTL jitter",
      icon: <Zap className="w-4 h-4 text-amber-400" />,
    },
    {
      id: 4,
      title: "PostgreSQL Write",
      desc: "Async WAL flush & audit index commit",
      icon: <Database className="w-4 h-4 text-indigo-400" />,
    },
  ];

  return (
    <section id="demo" className="py-24 relative border-t border-slate-800/60 tech-dot-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-3">
            <Activity className="w-3.5 h-3.5" />
            Interactive System Simulation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            <RevealText text="Live distributed URL shortener engine." as="span" />
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Test the pipeline in real-time. Watch the URL travel through hashing, Bloom filter collision checks, Redis caching, and persistent database commit.
          </p>
        </div>

        {/* Interactive Workspace Panel */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          {/* Input & Action */}
          <div className="mb-6">
            <label
              htmlFor="url-input"
              className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2"
            >
              Enter Target URL for Distributed Ingestion
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Link2 className="w-4 h-4" />
                </div>
                <input
                  id="url-input"
                  type="url"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://example.com/deep/resource"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-700/80 text-sm font-mono text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <button
                type="button"
                onClick={handleSimulate}
                disabled={isProcessing || !inputUrl}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 transition-all shadow-[0_0_20px_rgba(16,185,129,0.25)] shrink-0 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Execute Pipeline</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Quick Prefill Chips */}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="text-[11px] font-mono text-slate-500">Try sample:</span>
              {sampleUrls.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setInputUrl(url)}
                  className="text-[11px] font-mono text-slate-400 hover:text-emerald-400 hover:underline transition-colors truncate max-w-[200px]"
                >
                  {url.replace("https://", "")}
                </button>
              ))}
            </div>
          </div>

          {/* Pipeline Stages Visualizer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-8">
            {pipelineSteps.map((step) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id || shortUrl !== null;

              return (
                <div
                  key={step.id}
                  className={`p-3.5 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? "bg-emerald-500/10 border-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                      : isCompleted
                      ? "bg-slate-950/80 border-slate-700/60"
                      : "bg-slate-950/40 border-slate-800/50 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                      {step.icon}
                    </div>
                    {isCompleted && (
                      <Check className="w-4 h-4 text-emerald-400" />
                    )}
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    )}
                  </div>
                  <div className="text-xs font-semibold text-slate-200">
                    {step.title}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {step.desc}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Generated Result & Metrics */}
          <AnimatePresence>
            {shortUrl && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="p-5 rounded-xl bg-slate-950 border border-emerald-500/40 shadow-inner"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">
                      Generated Short URL (Redirect Ready)
                    </span>
                    <div className="text-lg sm:text-xl font-bold font-mono text-white mt-0.5">
                      {shortUrl}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors w-fit"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Telemetry Output */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 font-mono text-xs">
                  <div>
                    <span className="text-slate-500">Pipeline Latency:</span>
                    <div className="text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {stats.timeTaken}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500">Cache Strategy:</span>
                    <div className="text-slate-300 font-semibold mt-0.5">
                      {stats.cacheStatus}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500">Filter Validation:</span>
                    <div className="text-cyan-400 font-semibold mt-0.5">
                      {stats.bloomCheck}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
