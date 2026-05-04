import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "About Us - Oxcil",
  description:
    "Meet the team behind Oxcil. Learn about our mission to make AI inference infinitely scalable and affordable for every developer.",
  openGraph: {
    title: "About Us - Oxcil",
    description:
      "Meet the team behind Oxcil. Learn about our mission to make AI inference infinitely scalable and affordable for every developer.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
