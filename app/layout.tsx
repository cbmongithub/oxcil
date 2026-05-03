import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import type { ReactNode } from "react";

import { Navbar } from "@/components/landing/navbar";
import { ThemeProvider } from "@/components/providers/theme-provider";

import "../styles/oxcil.css";

export const metadata: Metadata = {
  title: "Oxcil - AI Lead Infrastructure",
  description:
    "AI lead infrastructure for local service businesses, built around focused landing pages, routing logic, and workflow demos.",
  generator: "Oxcil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background">
      <body className="bg-background text-foreground relative min-h-screen font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          {process.env.NODE_ENV === "production" && <Analytics />}
        </ThemeProvider>
      </body>
    </html>
  );
}
