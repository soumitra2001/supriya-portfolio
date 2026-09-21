import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { UrlShortenerDemo } from "@/components/sections/UrlShortenerDemo";
import {
  Link2,
  ArrowLeft,
  Cpu,
  Database,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Server,
  Activity,
} from "lucide-react";

export const metadata: Metadata = {
  title: "URL Shortener System Design | Supriya Ghorai — Senior Software Engineer",
  description:
    "System design case study of a high-throughput URL shortener and clickstream telemetry engine built in Go with Base62, Bloom Filters, and Redis Cache-Aside.",
};

export default function UrlShortenerCaseStudyPage() {
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-4">
            <Link2 className="w-3.5 h-3.5" />
            Distributed System Design & Benchmark
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6">
            High-Throughput Distributed URL Shortener & Analytics
          </h1>
          <p className="text-base sm:text-xl text-slate-300 leading-relaxed">
            A deep dive into building a sub-8ms redirect engine in Go. How combining in-memory Bloom filters with distributed Redis cache-aside eliminates 99.2% of database reads while guaranteeing 0% hash collisions.
          </p>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800">
            <div>
              <div className="text-2xl font-bold font-mono text-cyan-400">&lt; 8ms</div>
              <div className="text-xs text-slate-400 mt-1">P99 Redirect Latency</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-emerald-400">99.2%</div>
              <div className="text-xs text-slate-400 mt-1">DB Read Offload</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-indigo-400">3.5B+</div>
              <div className="text-xs text-slate-400 mt-1">Key Capacity (Base62)</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-amber-400">0%</div>
              <div className="text-xs text-slate-400 mt-1">Hash Collisions</div>
            </div>
          </div>
        </div>

        {/* Interactive Live Playground */}
        <div className="my-12">
          <UrlShortenerDemo />
        </div>

        {/* Architecture Narrative */}
        <div className="max-w-4xl space-y-12 mt-16">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
              Core Technical Strategy
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Defeating Cache Penetration with In-Memory Bloom Filters
            </h2>
            <div className="text-slate-300 space-y-4 leading-relaxed text-sm sm:text-base">
              <p>
                In high-volume redirection services, malicious actors or broken crawlers frequently query non-existent short keys. Without protection, every miss misses the cache and hits the persistent SQL database, exhausting connection pools.
              </p>
              <p>
                I implemented a counting Bloom filter stored directly in service memory. Because Bloom filters provide a mathematical guarantee of <em>zero false negatives</em>, if the filter states a key is absent, the service immediately returns an HTTP 404 in under 1 millisecond without touching Redis or PostgreSQL.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="p-2 w-fit rounded-lg bg-cyan-500/10 text-cyan-400 mb-3">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                Distributed Base62 Generation
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                6-character alphanumeric keys yielding 62^6 (~56.8 billion) unique identifiers. Generated via MurmurHash3 on the target URL combined with tenant salt and collision detection counters.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="p-2 w-fit rounded-lg bg-emerald-500/10 text-emerald-400 mb-3">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                Asynchronous Clickstream Telemetry
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Redirection responses do not wait for analytics ingestion. User agent, IP geolocation, and referrer headers are pushed to an async channel, batched in memory, and flushed to time-series storage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
