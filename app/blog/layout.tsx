import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Oxcil",
  description:
    "Insights on AI infrastructure, model optimization, and the future of machine learning inference. Stay updated with the latest from Oxcil.",
  openGraph: {
    title: "Blog - Oxcil",
    description:
      "Insights on AI infrastructure, model optimization, and the future of machine learning inference.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
