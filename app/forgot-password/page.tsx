"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GridBackground } from "@/components/grid-background";
import { ArrowLeft, Mail, CheckCircle2, KeyRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="bg-background relative flex min-h-screen overflow-hidden">
      {/* Background */}
      <GridBackground />

      {/* Subtle ambient glow */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(34, 94, 223, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Left side - Branding */}
      <div className="relative z-10 hidden flex-col justify-between p-12 lg:flex lg:w-1/2">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/Oxcil-logo.svg" alt="Oxcil" width={138} height={32} priority />
        </Link>

        {/* Security illustration / messaging */}
        <div className="max-w-md">
          <div className="mb-8">
            <div className="bg-primary/10 mb-6 flex h-20 w-20 items-center justify-center rounded-2xl">
              <KeyRound className="text-primary h-10 w-10" />
            </div>
            <h2 className="text-foreground mb-4 text-3xl font-semibold">
              Secure account recovery
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We take security seriously. Your password reset link will expire in 1 hour
              and can only be used once.
            </p>
          </div>

          {/* Security features */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                <CheckCircle2 className="text-primary h-4 w-4" />
              </div>
              <span className="text-foreground">End-to-end encrypted communications</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                <CheckCircle2 className="text-primary h-4 w-4" />
              </div>
              <span className="text-foreground">Single-use recovery links</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full">
                <CheckCircle2 className="text-primary h-4 w-4" />
              </div>
              <span className="text-foreground">
                SOC 2 Type II certified infrastructure
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-12">
          <div>
            <p className="text-foreground text-3xl font-semibold">256-bit</p>
            <p className="text-muted-foreground mt-1 text-sm">Encryption</p>
          </div>
          <div>
            <p className="text-foreground text-3xl font-semibold">99.99%</p>
            <p className="text-muted-foreground mt-1 text-sm">Uptime</p>
          </div>
          <div>
            <p className="text-foreground text-3xl font-semibold">24/7</p>
            <p className="text-muted-foreground mt-1 text-sm">Support</p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="relative z-10 flex w-full items-center justify-center p-6 lg:w-1/2 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 lg:hidden">
            <Link href="/" className="flex items-center justify-center">
              <Image src="/Oxcil-logo.svg" alt="Oxcil" width={138} height={32} priority />
            </Link>
          </div>

          {/* Form card */}
          <div className="bg-card/50 rounded-xl border border-white/5 p-8 backdrop-blur-sm">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Back link */}
                  <Link
                    href="/login"
                    className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-2 text-sm transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to sign in
                  </Link>

                  <div className="mb-8">
                    <h1 className="text-foreground text-2xl font-semibold">
                      Reset your password
                    </h1>
                    <p className="text-muted-foreground mt-2 text-sm">
                      Enter your email address and we'll send you a link to reset your
                      password.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="text-foreground mb-2 block text-sm font-medium"
                      >
                        Email address
                      </label>
                      <div className="relative">
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.com"
                          required
                          className="text-foreground placeholder:text-muted-foreground focus:ring-primary/50 focus:border-primary w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 pl-11 transition-all focus:ring-2 focus:outline-none"
                        />
                        <Mail className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground mt-2 w-full py-2.5"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending link...
                        </span>
                      ) : (
                        "Send reset link"
                      )}
                    </Button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="py-4 text-center"
                >
                  {/* Success state */}
                  <div className="bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle2 className="text-primary h-8 w-8" />
                    </motion.div>
                  </div>

                  <h1 className="text-foreground mb-2 text-2xl font-semibold">
                    Check your email
                  </h1>
                  <p className="text-muted-foreground mb-6 text-sm">
                    We've sent a password reset link to{" "}
                    <span className="text-foreground font-medium">{email}</span>
                  </p>

                  <div className="mb-6 rounded-lg border border-white/10 bg-white/5 p-4">
                    <p className="text-muted-foreground text-sm">
                      Didn't receive the email? Check your spam folder or{" "}
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-primary hover:underline"
                      >
                        try another email address
                      </button>
                    </p>
                  </div>

                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="w-full border-white/10 bg-transparent hover:bg-white/5"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to sign in
                    </Button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Help link */}
          <p className="text-muted-foreground mt-6 text-center text-sm">
            Need help?{" "}
            <Link href="/contact" className="text-primary font-medium hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
