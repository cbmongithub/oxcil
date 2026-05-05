import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Style Guide - Oxcil",
  description:
    "Design system documentation for the Oxcil template. Explore colors, typography, components, and patterns.",
};

export default function StyleGuideLayout({ children }: { children: React.ReactNode }) {
  return children;
}
