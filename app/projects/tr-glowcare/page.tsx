import React from "react";
import { Metadata } from "next";
import { TRGlowCareProjectView } from "@/components/projects/TRGlowCareProjectView";

export const metadata: Metadata = {
  title: "TR GlowCare — Project Case Study | Supriya Ghorai",
  description:
    "A premium at-home clinical skincare booking platform designed for real customers in Bangalore, featuring distributed Redis slot locks and real-time visitor telemetry.",
};

export default function TRGlowCarePage() {
  return <TRGlowCareProjectView />;
}
