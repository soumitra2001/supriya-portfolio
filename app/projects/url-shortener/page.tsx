import React from "react";
import { Metadata } from "next";
import { UrlShortenerProjectView } from "@/components/projects/UrlShortenerProjectView";

export const metadata: Metadata = {
  title: "URL Shortener — Project Case Study | Supriya Ghorai",
  description:
    "A sub-2ms low-latency URL shortening, alias collision resolution, and real-time clickstream telemetry infrastructure built in Go, Redis, and MongoDB.",
};

export default function UrlShortenerPage() {
  return <UrlShortenerProjectView />;
}
