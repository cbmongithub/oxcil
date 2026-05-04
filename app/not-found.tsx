import Link from "next/link";
import { Home, Search } from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="bg-background flex min-h-screen flex-col">
      <Navbar />

      <div className="relative flex flex-1 items-center justify-center overflow-hidden py-24 md:py-32">
        {/* Background grid */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(var(--grid-color) 1px, transparent 1px),
                linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-2xl px-4 text-center">
          <div className="relative mb-8">
            <h1 className="text-[12rem] leading-none font-bold tracking-tighter select-none md:text-[16rem]">
              <span className="from-primary via-primary/80 to-primary/20 bg-gradient-to-b bg-clip-text text-transparent">
                404
              </span>
            </h1>
          </div>

          {/* Message - removed animation classes */}
          <div className="space-y-4">
            <h2 className="text-foreground text-2xl font-semibold md:text-3xl">
              Page not found
            </h2>
            <p className="text-muted-foreground mx-auto max-w-md text-lg">
              The page you&apos;re looking for doesn&apos;t exist or has been moved to
              another location.
            </p>
          </div>

          {/* Action buttons - removed animation classes */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="group">
              <Link href="/">
                <Home className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="group bg-transparent">
              <Link href="/docs">
                <Search className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                Browse Docs
              </Link>
            </Button>
          </div>

          {/* Quick links - removed animation classes */}
          <div className="mt-16">
            <p className="text-muted-foreground mb-4 text-sm">
              Or check out these pages:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { label: "Models", href: "/models" },
                { label: "Playground", href: "/playground" },
                { label: "Blog", href: "/blog" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="border-border bg-card/50 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 rounded-full border px-4 py-2 text-sm transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
