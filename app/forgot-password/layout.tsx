import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "Reset Password - Oxcil",
  description: "Reset your Oxcil account password securely.",
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
