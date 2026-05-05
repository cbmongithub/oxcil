import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function DocsHeader() {
  return (
    <header className="bg-background/80 fixed top-0 right-0 left-0 z-50 border-b border-white/10 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <Image src="/Oxcil-logo.svg" alt="Oxcil" width={138} height={32} priority />
          </Link>
          <nav className="text-muted-foreground hidden items-center gap-6 text-sm md:flex">
            <Link href="/docs" className="text-foreground font-medium">
              Docs
            </Link>
            <Link href="/models" className="hover:text-foreground transition-colors">
              Models
            </Link>
            <Link href="/#pricing" className="hover:text-foreground transition-colors">
              Pricing
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
