"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PricingSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const developerFeatures = [
    "Access to 50+ models",
    "Pay per token pricing",
    "Standard rate limits",
    "Community support",
    "Usage analytics dashboard",
    "API playground access",
  ];

  const enterpriseFeatures = [
    "Everything in Developer",
    "Custom model fine-tuning",
    "99.99% uptime SLA",
    "Dedicated support engineer",
    "Unlimited rate limits",
    "VPC deployment options",
  ];

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="bg-background relative overflow-hidden py-24 md:py-32"
    >
      <div className="bg-primary/[0.08] pointer-events-none absolute top-1/2 left-1/2 h-[200px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />
      <div className="flex w-full justify-center px-4">
        <div className="flex w-full max-w-4xl flex-col items-center gap-12">
          <div className="max-w-2xl text-center">
            <h2
              className={`text-foreground mb-4 text-3xl font-bold text-balance md:text-4xl lg:text-5xl ${
                isVisible ? "animate-slide-up-section" : "opacity-0"
              }`}
            >
              Simple, transparent pricing
            </h2>
            <p
              className={`text-muted-foreground text-lg leading-relaxed ${
                isVisible ? "animate-slide-up-section-delayed" : "opacity-0"
              }`}
            >
              Start building for free, scale when you&apos;re ready. No hidden fees, no
              surprises.
            </p>
          </div>

          <div
            className={`grid w-full gap-8 md:grid-cols-2 ${
              isVisible ? "animate-slide-up-section-delayed" : "opacity-0"
            }`}
            style={{ animationDelay: "0.4s" }}
          >
            <Card className="bg-surface-elevated relative flex flex-col overflow-hidden border-white/10">
              <div className="from-primary/5 pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent" />
              <CardHeader className="relative pb-0">
                <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
                  <svg
                    className="text-primary h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <CardTitle className="text-foreground text-2xl">Developer</CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                  Perfect for indie hackers and small teams getting started.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative flex flex-1 flex-col pt-6">
                <div className="mb-6">
                  <span className="text-foreground text-xl font-semibold">
                    Pay as you go
                  </span>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Only pay for what you use
                  </p>
                </div>
                <ul className="flex-1 space-y-4">
                  {developerFeatures.map((feature, index) => (
                    <li
                      key={index}
                      className="text-muted-foreground flex items-center gap-3"
                    >
                      <div className="bg-primary/10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                        <Check className="text-primary h-3 w-3" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 text-primary-foreground mt-8 w-full"
                >
                  <Link href="/signup">Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-surface-elevated border-primary/30 relative flex flex-col overflow-hidden">
              <div className="from-primary/10 pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent" />
              <CardHeader className="relative pb-0">
                <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-xl">
                  <svg
                    className="text-primary h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 21h18" />
                    <path d="M5 21V7l8-4v18" />
                    <path d="M19 21V11l-6-4" />
                    <path d="M9 9v.01" />
                    <path d="M9 12v.01" />
                    <path d="M9 15v.01" />
                    <path d="M9 18v.01" />
                  </svg>
                </div>
                <div className="flex items-center gap-3">
                  <CardTitle className="text-foreground text-2xl">Enterprise</CardTitle>
                  <span className="bg-primary/20 text-primary rounded-full px-2.5 py-0.5 text-xs font-medium">
                    Custom
                  </span>
                </div>
                <CardDescription className="text-muted-foreground mt-2">
                  For organizations that need advanced security and support.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative flex flex-1 flex-col pt-6">
                <div className="mb-6">
                  <span className="text-foreground text-xl font-semibold">
                    Custom pricing
                  </span>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Tailored to your needs
                  </p>
                </div>
                <ul className="flex-1 space-y-4">
                  {enterpriseFeatures.map((feature, index) => (
                    <li
                      key={index}
                      className="text-muted-foreground flex items-center gap-3"
                    >
                      <div className="bg-primary/10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
                        <Check className="text-primary h-3 w-3" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant="outline"
                  className="text-foreground mt-8 w-full border-white/20 bg-transparent hover:bg-white/5"
                >
                  <Link href="/contact">Request Demo</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
