import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Terms of Service - Oxcil",
  description:
    "Oxcil Terms of Service. Read our terms and conditions for using the platform.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
