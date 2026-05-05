"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type React from "react";

import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/components/icons";
import { ThemeSwitcher } from "@/components/theme-switcher";

import { Logo } from "./logo";

const footerLinks = {
  Product: [
    { label: "Platform", href: "/#platform" },
    { label: "Models", href: "/models" }, // linked to models page
    { label: "Pricing", href: "/#pricing" }, // linked to pricing section
    { label: "Changelog", href: "#" },
  ],
  Developers: [
    { label: "Documentation", href: "/docs" }, // linked to docs page
    { label: "API Reference", href: "/docs#api-reference" }, // linked to API reference section
    { label: "Style Guide", href: "/style-guide" }, // Added Style Guide link
    { label: "Status", href: "#" },
  ],
  Company: [
    { label: "About", href: "/about" }, // Updated About link to /about page
    { label: "Blog", href: "/blog" }, // updated Blog link to point to /blog
    { label: "Careers", href: "#" },
    { label: "Contact", href: "/contact" }, // linked to contact page
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" }, // linked Privacy to new page
    { label: "Terms", href: "/terms" }, // linked Terms to new page
    { label: "Security", href: "#" },
    { label: "DPA", href: "#" },
  ],
};

const socialLinks = [
  { icon: TwitterIcon, href: "#", label: "Twitter" },
  { icon: GitHubIcon, href: "#", label: "GitHub" },
  { icon: LinkedInIcon, href: "#", label: "LinkedIn" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-background relative border-t border-white/5">
      {/* Subtle glow effect */}
      <div className="via-primary absolute top-0 left-1/2 h-[1px] w-[600px] -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent opacity-50" />

      <div className="container mx-auto px-6 pt-16 pb-8">
        {/* Top section with newsletter */}
        <div className="flex flex-col justify-between gap-12 border-b border-white/5 pb-12 lg:flex-row">
          {/* Newsletter signup */}
          <div className="max-w-md">
            <h3 className="text-foreground mb-2 text-xl font-semibold">
              Stay ahead of the curve
            </h3>
            <p className="text-muted-foreground mb-6 text-sm">
              Get the latest updates on new models, features, and AI insights delivered to
              your inbox.
            </p>

            {isSubmitted ? (
              <div className="text-primary flex items-center gap-2">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm">Thanks for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/50 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm transition-colors focus:ring-1 focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="group bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors"
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            )}
          </div>

          {/* Social links */}
          <div className="flex items-start gap-6">
            <ThemeSwitcher />
            <div className="flex items-start gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground rounded-lg border border-white/10 bg-white/5 p-2.5 transition-colors hover:border-white/20"
                  aria-label={social.label}
                >
                  <social.icon />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Logo and tagline */}
          <div className="col-span-2 mb-4 md:col-span-4 lg:col-span-1 lg:mb-0">
            <Link href="/" className="mb-4 inline-block">
              <Logo size="md" />
            </Link>
            <p className="text-muted-foreground max-w-[200px] text-sm">
              Infinitely scaleable inference for modern applications.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-foreground mb-4 text-sm font-medium">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Oxcil. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
