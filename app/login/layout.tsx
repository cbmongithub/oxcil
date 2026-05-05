import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Login - Oxcil",
  description:
    "Sign in to your Oxcil account to access the dashboard, manage API keys, and monitor usage.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
