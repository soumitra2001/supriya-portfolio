import React from "react";
import { Metadata } from "next";
import { MarketingCampaignProjectView } from "@/components/projects/MarketingCampaignProjectView";

export const metadata: Metadata = {
  title: "Marketing Campaign Platform — Project Case Study | Supriya Ghorai",
  description:
    "A multi-tenant CMS & high-velocity landing page infrastructure enabling marketing ops to launch, test, and analyze 170+ localized apartment campaigns across Bangalore.",
};

export default function MarketingCampaignPage() {
  return <MarketingCampaignProjectView />;
}
