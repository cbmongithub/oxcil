"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import type React from "react";

import { Logo } from "@/components/logo";

import { useLenis } from "./lenis-provider";

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
  const { setScrollLocked } = useLenis();

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

  useEffect(() => {
    setScrollLocked(isMobileMenuOpen);
    return () => setScrollLocked(false);
  }, [isMobileMenuOpen, setScrollLocked]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#")) {
      const hash = href.substring(1);

      if (pathname === "/") {
        e.preventDefault();
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        e.preventDefault();
        router.push("/");
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
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
      <header
        className={`animate-navbar-drop bg-background/80 border-border/50 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-md transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Logo size="sm" />
            </Link>

            {/* Navigation Links - Desktop */}
            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="nav-link-hover text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-muted-foreground hover:text-foreground hidden text-sm transition-colors sm:block"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="group text-foreground bg-background relative hidden rounded-md px-4 py-1.5 text-sm font-medium transition-colors sm:block"
              >
                <span
                  className="absolute -inset-px -z-10 rounded-md opacity-100 transition-opacity duration-[450ms] ease-in-out group-hover:opacity-0"
                  style={{
                    background:
                      "linear-gradient(to bottom right, hsla(218, 100%, 65%, 1), hsla(0, 20%, 99%, 0))",
                  }}
                />
                <span
                  className="absolute -inset-px -z-10 rounded-md opacity-0 transition-opacity duration-[450ms] ease-in-out group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(to top left, hsla(218, 100%, 65%, 1), hsla(0, 20%, 99%, 0))",
                  }}
                />
                Get Started
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground relative z-50 p-2 md:hidden"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <div className="relative h-6 w-6">
                  <Menu
                    className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                      isMobileMenuOpen
                        ? "scale-0 rotate-90 opacity-0"
                        : "scale-100 rotate-0 opacity-100"
                    }`}
                  />
                  <X
                    className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                      isMobileMenuOpen
                        ? "scale-100 rotate-0 opacity-100"
                        : "scale-0 -rotate-90 opacity-0"
                    }`}
                  />
                </div>
              </button>
            </div>
          </nav>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ease-out md:hidden ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Background overlay with fade */}
        <div
          className={`bg-background absolute inset-0 transition-opacity duration-500 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Animated gradient background */}
        <div
          className={`absolute inset-0 transition-all delay-100 duration-700 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.15) 0%, transparent 50%)",
          }}
        />

        {/* Menu content */}
        <div className="relative flex h-full flex-col items-center justify-center px-6">
          {/* Navigation links with staggered animation */}
          <nav className="flex flex-col items-center gap-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={`text-foreground hover:text-primary text-4xl font-bold transition-all duration-500 sm:text-5xl ${
                  isMobileMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${150 + index * 75}ms` : "0ms",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA buttons with delayed animation */}
          <div
            className={`mt-12 flex flex-col items-center gap-4 transition-all duration-500 ${
              isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{
              transitionDelay: isMobileMenuOpen ? "450ms" : "0ms",
            }}
          >
            <Link
              href="/login"
              onClick={() => handleLinkClick("/login")}
              className="text-muted-foreground hover:text-foreground text-lg transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              onClick={() => handleLinkClick("/signup")}
              className="group text-foreground bg-background relative rounded-lg px-8 py-3 text-lg font-medium transition-colors"
            >
              <span
                className="absolute -inset-px -z-10 rounded-lg opacity-100 transition-opacity duration-[450ms] ease-in-out group-hover:opacity-0"
                style={{
                  background:
                    "linear-gradient(to bottom right, hsla(218, 100%, 65%, 1), hsla(0, 20%, 99%, 0))",
                }}
              />
              <span
                className="absolute -inset-px -z-10 rounded-lg opacity-0 transition-opacity duration-[450ms] ease-in-out group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(to top left, hsla(218, 100%, 65%, 1), hsla(0, 20%, 99%, 0))",
                }}
              />
              Get Started
            </Link>
          </div>

          {/* Bottom decoration line with scale animation */}
          <div
            className={`via-primary/50 absolute bottom-12 left-1/2 h-px -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent transition-all duration-700 ${
              isMobileMenuOpen ? "w-48 opacity-100" : "w-0 opacity-0"
            }`}
            style={{
              transitionDelay: isMobileMenuOpen ? "500ms" : "0ms",
            }}
          />
        </div>
      </div>
    </>
  );
}
