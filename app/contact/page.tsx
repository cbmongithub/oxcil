"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { GridBackground } from "@/components/grid-background";
import {
  Calendar,
  Clock,
  Video,
  CheckCircle2,
  Building2,
  Users,
  Globe,
} from "lucide-react";

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
];

const benefits = [
  { icon: Building2, text: "Custom deployment options" },
  { icon: Users, text: "Dedicated support team" },
  { icon: Globe, text: "Global infrastructure" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    teamSize: "",
    message: "",
  });
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const today = new Date();
  const currentMonth = today.toLocaleString("default", { month: "long" });
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, today.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, today.getMonth(), 1).getDay();

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
    return (
      <div className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden">
        <GridBackground />
        <div className="relative z-10 px-4 text-center">
          <div className="bg-primary/20 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
            <CheckCircle2 className="text-primary h-10 w-10" />
          </div>
          <h1 className="text-foreground mb-4 text-3xl font-bold">
            Demo Request Received
          </h1>
          <p className="text-muted-foreground mx-auto mb-8 max-w-md">
            Thank you for your interest in Oxcil Enterprise. Our team will reach out
            within 24 hours to confirm your demo
            {selectedDate && selectedTime
              ? ` on ${currentMonth} ${selectedDate} at ${selectedTime}`
              : ""}
            .
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background relative flex min-h-screen overflow-hidden">
      <GridBackground />

      <div
        className="pointer-events-none absolute top-1/4 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(34, 94, 223, 0.06) 0%, transparent 70%)",
        }}
      />

      {/* Left side - Value props */}
      <div className="relative z-10 hidden flex-col justify-between p-12 lg:flex lg:w-2/5">
        <Link href="/" className="flex items-center">
          <Image src="/Oxcil-logo.svg" alt="Oxcil" width={138} height={32} priority />
        </Link>

        <div className="max-w-sm">
          <h1 className="text-foreground mb-4 text-3xl font-bold">
            Scale your AI infrastructure with confidence
          </h1>
          <p className="text-muted-foreground mb-8">
            Get a personalized demo of Oxcil Enterprise and discover how we can help your
            organization.
          </p>

          <ul className="space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="text-muted-foreground flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <benefit.icon className="text-primary h-5 w-5" />
                </div>
                <span>{benefit.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-primary/20 border-background flex h-8 w-8 items-center justify-center rounded-full border-2"
              >
                <span className="text-primary text-xs font-medium">
                  {String.fromCharCode(64 + i)}
                </span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm">
            Join <span className="text-foreground font-medium">500+</span> enterprise
            teams
          </p>
        </div>
      </div>

      {/* Right side - Form & Calendar */}
      <div className="relative z-10 flex w-full items-center justify-center p-6 lg:w-3/5 lg:p-12">
        <div className="w-full max-w-2xl">
          {/* Mobile logo */}
          <div className="mb-8 lg:hidden">
            <Link href="/" className="flex items-center justify-center">
              <Image src="/Oxcil-logo.svg" alt="Oxcil" width={138} height={32} priority />
            </Link>
          </div>

          <div className="bg-card/50 rounded-xl border border-white/5 p-8 backdrop-blur-sm">
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-foreground text-2xl font-semibold">Request a Demo</h2>
              <p className="text-muted-foreground mt-2 text-sm">
                Fill out the form and select a time that works for you
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="text-foreground mb-2 block text-sm font-medium"
                  >
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    required
                    className="text-foreground placeholder:text-muted-foreground focus:ring-primary/50 focus:border-primary w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 transition-all focus:ring-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="text-foreground mb-2 block text-sm font-medium"
                  >
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    required
                    className="text-foreground placeholder:text-muted-foreground focus:ring-primary/50 focus:border-primary w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 transition-all focus:ring-2 focus:outline-none"
                  />
                </div>
              </div>

              {/* Email & Company */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="text-foreground mb-2 block text-sm font-medium"
                  >
                    Work email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@company.com"
                    required
                    className="text-foreground placeholder:text-muted-foreground focus:ring-primary/50 focus:border-primary w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 transition-all focus:ring-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="text-foreground mb-2 block text-sm font-medium"
                  >
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Acme Inc."
                    required
                    className="text-foreground placeholder:text-muted-foreground focus:ring-primary/50 focus:border-primary w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 transition-all focus:ring-2 focus:outline-none"
                  />
                </div>
              </div>

              {/* Job Title & Team Size */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="jobTitle"
                    className="text-foreground mb-2 block text-sm font-medium"
                  >
                    Job title
                  </label>
                  <input
                    id="jobTitle"
                    name="jobTitle"
                    type="text"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="CTO"
                    required
                    className="text-foreground placeholder:text-muted-foreground focus:ring-primary/50 focus:border-primary w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 transition-all focus:ring-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="teamSize"
                    className="text-foreground mb-2 block text-sm font-medium"
                  >
                    Team size
                  </label>
                  <select
                    id="teamSize"
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleInputChange}
                    required
                    className="text-foreground focus:ring-primary/50 focus:border-primary w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 transition-all focus:ring-2 focus:outline-none"
                  >
                    <option value="" disabled>
                      Select team size
                    </option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>
              </div>

              {/* Calendar section */}
              <div className="border-t border-white/10 pt-6">
                <div className="mb-4 flex items-center gap-2">
                  <Calendar className="text-primary h-4 w-4" />
                  <span className="text-foreground text-sm font-medium">
                    Select a date & time
                  </span>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Mini calendar */}
                  <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <div className="mb-4 text-center">
                      <span className="text-foreground text-sm font-medium">
                        {currentMonth} {currentYear}
                      </span>
                    </div>
                    <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs">
                      {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                        <span key={day} className="text-muted-foreground py-1">
                          {day}
                        </span>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {calendarDays.map((day, index) => {
                        const isPast = day !== null && day < today.getDate();
                        const isWeekend =
                          day !== null &&
                          (new Date(currentYear, today.getMonth(), day).getDay() === 0 ||
                            new Date(currentYear, today.getMonth(), day).getDay() === 6);
                        const isDisabled = isPast || isWeekend;

                        return (
                          <button
                            key={index}
                            type="button"
                            disabled={day === null || isDisabled}
                            onClick={() => day && !isDisabled && setSelectedDate(day)}
                            className={`flex aspect-square items-center justify-center rounded text-xs transition-all ${day === null ? "invisible" : ""} ${isDisabled ? "text-muted-foreground/30 cursor-not-allowed" : "text-muted-foreground hover:bg-primary/20 hover:text-foreground"} ${selectedDate === day ? "bg-primary text-primary-foreground" : ""} `}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time slots */}
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <Clock className="text-muted-foreground h-4 w-4" />
                      <span className="text-muted-foreground text-xs">
                        Available times (EST)
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`rounded-lg border px-3 py-2 text-sm transition-all ${
                            selectedTime === time
                              ? "bg-primary text-primary-foreground border-primary"
                              : "text-muted-foreground hover:text-foreground border-white/10 bg-white/5 hover:bg-white/10"
                          } `}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    {selectedDate && selectedTime && (
                      <div className="text-primary mt-4 flex items-center gap-2 text-sm">
                        <Video className="h-4 w-4" />
                        <span>30 min video call</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="text-foreground mb-2 block text-sm font-medium"
                >
                  Anything else we should know? (optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your use case..."
                  rows={3}
                  className="text-foreground placeholder:text-muted-foreground focus:ring-primary/50 focus:border-primary w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 transition-all focus:ring-2 focus:outline-none"
                />
              </div>

              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground w-full py-2.5"
                disabled={isLoading || !selectedDate || !selectedTime}
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
                    Scheduling...
                  </span>
                ) : (
                  "Schedule Demo"
                )}
              </Button>
            </form>
          </div>

          <p className="text-muted-foreground mt-6 text-center text-sm">
            Not ready for a demo?{" "}
            <Link href="/signup" className="text-primary font-medium hover:underline">
              Start with Developer plan
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
