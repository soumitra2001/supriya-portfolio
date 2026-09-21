"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FadeIn } from "@/components/animation/FadeIn";
import { RevealText } from "@/components/animation/RevealText";
import {
  Cpu,
  Database,
  Radio,
  Server,
  Layers,
  CheckCircle2,
  Code2,
  Zap,
  ShieldAlert,
} from "lucide-react";

interface TechTopic {
  id: string;
  title: string;
  tag: string;
  icon: React.ReactNode;
  purpose: string;
  productionUsage: string[];
  tradeoffs: string;
  codeSnippet: string;
}

const TOPICS: TechTopic[] = [
  {
    id: "go-concurrency",
    title: "Go Concurrency & Goroutine Worker Pools",
    tag: "Golang / Concurrency",
    icon: <Cpu className="w-5 h-5 text-emerald-400" />,
    purpose:
      "Leverage lightweight CSP primitives (channels, select statements, worker pools, and sync.WaitGroup) to process high-volume background tasks with bounded memory and predictable CPU consumption.",
    productionUsage: [
      "Worker pool architecture to ingest concurrent GPS telemetry without spawning unbounded goroutines",
      "Graceful shutdown handling using context.WithCancel and signal interceptors",
      "Buffered channels with backpressure signaling when downstream sinks experience latency spikes",
    ],
    tradeoffs:
      "Unbounded goroutines risk memory exhaustion under sustained DDoS or upstream broker spikes. Solution: Fixed worker pools with job queues and leaky bucket rate limiting.",
    codeSnippet: `// Bounded worker pool pattern in Go
type Job struct {
    TeacherID string
    Latitude  float64
    Longitude float64
    Timestamp int64
}

func StartDispatcher(ctx context.Context, numWorkers int, jobs <-chan Job) {
    var wg sync.WaitGroup
    for i := 0; i < numWorkers; i++ {
        wg.Add(1)
        go func(workerID int) {
            defer wg.Done()
            for {
                select {
                case <-ctx.Done():
                    return // Graceful cancellation
                case job, ok := <-jobs:
                    if !ok {
                        return
                    }
                    processGeofence(job)
                }
            }
        }(i)
    }
    wg.Wait()
}`,
  },
  {
    id: "redis-geospatial",
    title: "Redis Geospatial Indexing & Distributed Locks",
    tag: "In-Memory / Fast State",
    icon: <Database className="w-5 h-5 text-rose-400" />,
    purpose:
      "Sub-millisecond geospatial coordinate indexing using Geohash sorted sets (GEOSEARCH / GEORADIUS) combined with atomic distributed locking (Redlock / SETNX) to guarantee zero double-bookings.",
    productionUsage: [
      "Real-time teacher proximity queries against school boundary polygons in Hermes",
      "Atomically locking appointment slots during TR GlowCare checkout to prevent race conditions",
      "Distributed cache-aside pattern with TTL jitter to eliminate cache stampedes",
    ],
    tradeoffs:
      "In-memory storage is volatile and RAM-constrained. Solution: Dual-write or write-behind replication to PostgreSQL with write-ahead logs (AOF) enabled on Redis.",
    codeSnippet: `// Redis Geospatial query + Distributed Slot Lock
// 1. Index location: GEOADD teachers:geo <long> <lat> <teacher_id>
// 2. Query within 150m of school geofence center:
results, err := rdb.GeoSearchLocation(ctx, "teachers:geo", &redis.GeoSearchLocationQuery{
    Longitude: schoolLng,
    Latitude:  schoolLat,
    Radius:    150,
    Unit:      "m",
    WithDist:  true,
    Count:     50,
}).Result()

// Atomic slot lock for TR GlowCare appointments:
locked, err := rdb.SetNX(ctx, "slot_lock:"+slotID, userID, 5*time.Minute).Result()
if !locked {
    return ErrSlotAlreadyReserved
}`,
  },
  {
    id: "mqtt-telemetry",
    title: "Real-Time Telemetry & MQTT Event Pipelines",
    tag: "IoT / Streaming",
    icon: <Radio className="w-5 h-5 text-sky-400" />,
    purpose:
      "Ultra-lightweight publish-subscribe protocol ideal for mobile telemetry with high latency, unstable cellular connections, and constrained battery budgets.",
    productionUsage: [
      "Client telemetry transmission using QoS 1 (at-least-once delivery) for critical boundary crossings",
      "Topic segregation per institution: /schools/{id}/teachers/{id}/telemetry",
      "Last Will and Testament (LWT) payloads to instantly detect unexpected mobile device disconnects",
    ],
    tradeoffs:
      "QoS 1 causes duplicate packets under network flapping. Solution: Idempotent Redis deduplication with sliding time windows.",
    codeSnippet: `// MQTT Telemetry Subscriber with Idempotent Deduplication
func HandleIncomingPacket(client mqtt.Client, msg mqtt.Message) {
    var payload TelemetryPayload
    if err := json.Unmarshal(msg.Payload(), &payload); err != nil {
        return
    }

    // Check sliding window deduplication in Redis (SETNX with 10s TTL)
    dedupKey := fmt.Sprintf("dedup:%s:%d", payload.DeviceID, payload.Sequence)
    isNew, _ := rdb.SetNX(ctx, dedupKey, "1", 10*time.Second).Result()
    if !isNew {
        return // Drop duplicate packet safely
    }

    jobQueue <- payload.ToJob()
}`,
  },
  {
    id: "postgres-acid",
    title: "PostgreSQL Schema Design & ACID Guarantees",
    tag: "Database / Persistence",
    icon: <Layers className="w-5 h-5 text-indigo-400" />,
    purpose:
      "Strict data integrity, normalized schemas, composite indexing on time-series queries, and transactional guarantees for financial and compliance records.",
    productionUsage: [
      "Strict audit log tables for verified teacher check-in timestamps and geofence entry proofs",
      "TR GlowCare order ledger, payment reconciliations, and customer histories",
      "Composite B-tree indexes for fast tenant-scoped temporal lookups (e.g. school_id, date, created_at)",
    ],
    tradeoffs:
      "High write volumes on analytics data can bloat tables. Solution: Table partitioning by month/tenant and offloading raw telemetry to compressed cold storage.",
    codeSnippet: `// Schema: Strict Check-In Verification Table
CREATE TABLE teacher_checkins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID NOT NULL REFERENCES teachers(id),
    school_id UUID NOT NULL REFERENCES schools(id),
    geofence_id UUID NOT NULL REFERENCES geofences(id),
    checkin_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    latitude NUMERIC(10, 7) NOT NULL,
    longitude NUMERIC(10, 7) NOT NULL,
    accuracy_meters NUMERIC(5, 2) NOT NULL,
    verification_source VARCHAR(32) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_checkins_school_date 
ON teacher_checkins (school_id, checkin_time DESC);`,
  },
  {
    id: "bloom-caching",
    title: "Bloom Filters & Cache-Aside Architecture",
    tag: "High-Throughput / Optimization",
    icon: <Server className="w-5 h-5 text-amber-400" />,
    purpose:
      "Eliminate database lookup overhead for non-existent keys (preventing cache penetration attacks) and reduce roundtrip latency to sub-10ms for millions of reads.",
    productionUsage: [
      "URL Shortener redirects: query in-memory Bloom filter before hitting Redis or Postgres",
      "0% false negatives guarantee: if Bloom filter returns false, key definitely doesn't exist",
      "Layered caching (L1 in-memory sync.Map + L2 Redis cluster) for hottest read items",
    ],
    tradeoffs:
      "Bloom filters have a small false positive probability and cannot delete keys. Solution: Scalable counting Bloom filters or periodic filter rebuilds via background workers.",
    codeSnippet: `// High-Performance Bloom Filter Guard
func ResolveShortURL(shortCode string) (*URLRecord, error) {
    // Step 1: Bloom Filter Fast Check (O(1) memory lookup)
    if !bloomFilter.Test([]byte(shortCode)) {
        return nil, ErrNotFound // Instant rejection, zero DB load
    }

    // Step 2: L1 In-Memory Cache
    if record, found := localCache.Get(shortCode); found {
        return record, nil
    }

    // Step 3: L2 Redis Cache
    if val, err := rdb.Get(ctx, "url:"+shortCode).Result(); err == nil {
        return parseRecord(val), nil
    }

    // Step 4: Fallback to PostgreSQL
    return fetchFromDBAndPopulateCache(shortCode)
}`,
  },
];

export function EngineeringPlayground() {
  const [selectedTopic, setSelectedTopic] = useState<TechTopic>(TOPICS[0]);

  return (
    <section id="engineering" className="py-24 relative border-t border-slate-800/60 tech-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-14">
          <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Under The Hood
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            <RevealText text="System design & technical architecture playground." as="span" />
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            Every technology choice is a trade-off. Click a technical domain below to inspect real-world production patterns, design rationales, and Go code implementations.
          </p>
        </div>

        {/* Interactive Topic Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {TOPICS.map((topic) => {
            const isSelected = selectedTopic.id === topic.id;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => setSelectedTopic(topic)}
                className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? "bg-slate-800/90 border-emerald-500/50 shadow-lg shadow-emerald-500/5"
                    : "bg-slate-900/50 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700"
                }`}
              >
                <div className="mb-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                  {topic.icon}
                </div>
                <span className="text-xs font-mono text-slate-400 mb-1">
                  {topic.tag}
                </span>
                <span
                  className={`text-xs sm:text-sm font-semibold leading-snug line-clamp-2 ${
                    isSelected ? "text-emerald-400" : "text-slate-200"
                  }`}
                >
                  {topic.title}
                </span>

                {isSelected && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 border-2 border-emerald-400/80 rounded-xl pointer-events-none"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Detail Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTopic.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
          >
            {/* Left: Architecture Breakdown */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {selectedTopic.tag}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  {selectedTopic.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {selectedTopic.purpose}
                </p>

                <div className="mb-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    How I Use It In Production
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedTopic.productionUsage.map((useCase, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Trade-off Warning Box */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 mt-4">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1 font-semibold">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Engineering Trade-off & Mitigation
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {selectedTopic.tradeoffs}
                </p>
              </div>
            </div>

            {/* Right: Code Implementation Display */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex items-center justify-between px-4 py-2.5 rounded-t-xl bg-slate-950 border-x border-t border-slate-800 font-mono text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  implementation.go
                </span>
                <span className="text-[11px] text-slate-500">Go 1.22+ / Concurrency</span>
              </div>
              <div className="relative p-4 sm:p-5 rounded-b-xl bg-slate-950/90 border border-slate-800 font-mono text-xs sm:text-[13px] text-slate-200 overflow-x-auto shadow-inner leading-relaxed flex-grow">
                <pre>
                  <code>{selectedTopic.codeSnippet}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
