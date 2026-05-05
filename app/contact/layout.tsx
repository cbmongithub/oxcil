import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Contact Us - Oxcil",
  description:
    "Get in touch with our team. Schedule a demo, discuss enterprise solutions, or learn how Oxcil can power your AI applications.",
  openGraph: {
    title: "Contact Us - Oxcil",
    description:
      "Get in touch with our team. Schedule a demo or discuss enterprise solutions.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
