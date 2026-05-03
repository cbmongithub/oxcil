"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const navLinks = [
  { label: "Platform", href: "/#platform" },
  { label: "Models", href: "/models" },
  { label: "Playground", href: "/playground" },
  { label: "Pricing", href: "/#pricing" },
];

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      const hash = href.substring(1);

      if (pathname === "/") {
        e.preventDefault();
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        e.preventDefault();
        router.push("/");
        window.setTimeout(() => {
          document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }

    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);

    if (!href.startsWith("/#")) {
      router.push(href);
    }
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: isVisible ? 0 : -96 }}
        transition={{ type: "spring", stiffness: 320, damping: 36, mass: 0.8 }}
        className="bg-background/78 border-border/60 supports-backdrop-filter:bg-background/70 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Logo size="sm" />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-muted-foreground hover:text-foreground rounded-md px-3 py-2 text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="text-muted-foreground hover:text-foreground hidden rounded-md px-3 py-2 text-sm transition-colors sm:block"
            >
              Login
            </Link>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/signup">Get Started</Link>
            </Button>

            <button
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              className="text-foreground hover:bg-accent hover:text-accent-foreground inline-flex size-10 items-center justify-center rounded-md transition-colors md:hidden"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
              type="button"
            >
              <span className="relative size-6">
                <motion.span
                  initial={false}
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                    rotate: isMobileMenuOpen ? 90 : 0,
                  }}
                  transition={{ duration: 0.18 }}
                  className="absolute inset-0"
                >
                  <Menu className="size-6" />
                </motion.span>
                <motion.span
                  initial={false}
                  animate={{
                    opacity: isMobileMenuOpen ? 1 : 0,
                    rotate: isMobileMenuOpen ? 0 : -90,
                  }}
                  transition={{ duration: 0.18 }}
                  className="absolute inset-0"
                >
                  <X className="size-6" />
                </motion.span>
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-background/92 fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto flex h-full max-w-7xl flex-col justify-between px-4 pt-24 pb-8 sm:px-6 lg:px-8"
            >
              <div className="space-y-10">
                <div className="border-border/60 bg-card/70 rounded-2xl border p-4 backdrop-blur-md">
                  <p className="text-muted-foreground text-xs tracking-[0.24em] uppercase">
                    Navigation
                  </p>
                  <nav className="mt-4 flex flex-col gap-1">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.22, delay: 0.04 + index * 0.06 }}
                      >
                        <Link
                          href={link.href}
                          onClick={(e) => handleAnchorClick(e, link.href)}
                          className="hover:bg-accent hover:text-accent-foreground text-foreground flex items-center justify-between rounded-xl px-4 py-4 text-2xl font-semibold tracking-tight transition-colors"
                        >
                          <span>{link.label}</span>
                          <span className="text-muted-foreground text-sm">
                            0{index + 1}
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.22, delay: 0.18 }}
                className="flex flex-col gap-3"
              >
                <Link
                  href="/login"
                  onClick={() => handleLinkClick("/login")}
                  className="text-muted-foreground hover:text-foreground rounded-md px-1 py-2 text-base transition-colors"
                >
                  Login
                </Link>
                <Button asChild size="lg" className="w-full">
                  <Link href="/signup" onClick={() => handleLinkClick("/signup")}>
                    Get Started
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
