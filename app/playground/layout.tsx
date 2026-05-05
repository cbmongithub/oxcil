import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "API Playground - Oxcil",
  description:
    "Test AI models in real-time with our interactive playground. No API key required. Compare responses across different models.",
  openGraph: {
    title: "API Playground - Oxcil",
    description:
      "Test AI models in real-time with our interactive playground. No API key required.",
  },
};

export default function PlaygroundLayout({ children }: { children: React.ReactNode }) {
  return children;
}
