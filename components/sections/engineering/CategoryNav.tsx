"use client";

import React, { useRef, useEffect } from "react";
import {
  Server,
  Database,
  Radio,
  Box,
  Layout,
  Wrench,
  Cpu,
} from "lucide-react";
import { ENGINEERING_TABS, EngineeringTab } from "./data";

interface Props {
  selectedTabId: string;
  onSelectTab: (tabId: string) => void;
}

export function CategoryNav({ selectedTabId, onSelectTab }: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll active item into view on mobile
  useEffect(() => {
    if (activeBtnRef.current && scrollContainerRef.current) {
      activeBtnRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedTabId]);

  const getIcon = (iconName: string, isSelected: boolean) => {
    const className = `w-4 h-4 transition-colors ${
      isSelected ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"
    }`;

    switch (iconName) {
      case "Server":
        return <Server className={className} />;
      case "Database":
        return <Database className={className} />;
      case "Radio":
        return <Radio className={className} />;
      case "Box":
        return <Box className={className} />;
      case "Layout":
        return <Layout className={className} />;
      case "Wrench":
        return <Wrench className={className} />;
      default:
        return <Cpu className={className} />;
    }
  };

  return (
    <>
      {/* ================================================================== */}
      {/* Mobile & Tablet Horizontal Scroll Bar (< 1024px)                  */}
      {/* ================================================================== */}
      <div
        ref={scrollContainerRef}
        role="tablist"
        aria-label="Engineering topics"
        className="flex lg:hidden items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none scroll-smooth w-full"
      >
        {ENGINEERING_TABS.map((tab) => {
          const isSelected = selectedTabId === tab.id;
          return (
            <button
              key={tab.id}
              ref={isSelected ? activeBtnRef : null}
              role="tab"
              aria-selected={isSelected}
              id={`tab-${tab.id}`}
              aria-controls={`panel-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                isSelected
                  ? "bg-[#0e1730] border-blue-500/50 text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                  : "bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800/50"
              }`}
            >
              {getIcon(tab.iconName, isSelected)}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================================================================== */}
      {/* Desktop Vertical Navigation (>= 1024px) - Clean floating items     */}
      {/* ================================================================== */}
      <div
        role="tablist"
        aria-label="Engineering topics"
        className="hidden lg:flex flex-col gap-2.5 w-full justify-between h-full py-1"
      >
        {ENGINEERING_TABS.map((tab) => {
          const isSelected = selectedTabId === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isSelected}
              id={`tab-${tab.id}`}
              aria-controls={`panel-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 border ${
                isSelected
                  ? "bg-[#0e1730]/95 border-blue-500/40 text-white shadow-[0_0_20px_rgba(59,130,246,0.18)]"
                  : "bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 hover:border-slate-800/60"
              }`}
            >
              <div className="shrink-0">{getIcon(tab.iconName, isSelected)}</div>
              <span
                className={`text-sm font-medium leading-none ${
                  isSelected ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}
