"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Target, Users, Zap } from "lucide-react";

import { Footer } from "@/components/footer";
import { GridBackground } from "@/components/grid-background";
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "@/components/icons";
import { Navbar } from "@/components/navbar";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Co-Founder & CEO",
    bio: "Former ML Lead at Google Brain. PhD in Computer Science from Stanford.",
    image: "/professional-asian-woman-ceo-headshot.jpg",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Marcus Johnson",
    role: "Co-Founder & CTO",
    bio: "Ex-Principal Engineer at OpenAI. 15+ years in distributed systems.",
    image: "/professional-black-cto.png",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Elena Rodriguez",
    role: "VP of Engineering",
    bio: "Previously built ML infrastructure at Meta. Expert in GPU optimization.",
    image: "/professional-latina-woman-engineer-headshot.jpg",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "David Park",
    role: "Head of Product",
    bio: "Former Product Lead at Anthropic. Passionate about developer experience.",
    image: "/professional-korean-man-product-manager-headshot.jpg",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Priya Sharma",
    role: "Head of Research",
    bio: "PhD from MIT. Published 30+ papers on large language models.",
    image: "/professional-indian-woman-researcher-headshot.jpg",
    social: {
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "James Mitchell",
    role: "VP of Sales",
    bio: "Former Enterprise Sales Director at AWS. Built $100M+ revenue teams.",
    image: "/professional-man-sales-executive-headshot.jpg",
    social: {
      twitter: "#",
      linkedin: "#",
    },
  },
];

const values = [
  {
    icon: Zap,
    title: "Speed Obsessed",
    description:
      "We believe every millisecond matters. Our infrastructure is built for the lowest latency possible.",
  },
  {
    icon: Target,
    title: "Customer First",
    description:
      "Every decision we make starts with our customers. Their success is our success.",
  },
  {
    icon: Users,
    title: "Open & Transparent",
    description:
      "We believe in open communication, transparent pricing, and honest relationships.",
  },
  {
    icon: Sparkles,
    title: "Innovation Driven",
    description:
      "We push the boundaries of what's possible in AI infrastructure every single day.",
  },
];

const stats = [
  { value: "500+", label: "Enterprise Customers" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "50B+", label: "API Calls / Month" },
  { value: "< 50ms", label: "Average Latency" },
];

function TeamCard({ member }: { member: (typeof teamMembers)[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-card border-border hover:border-primary/50 relative overflow-hidden rounded-2xl border transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(34,94,223,0.3)]">
        <div className="relative aspect-[3/4] overflow-hidden md:aspect-[4/5]">
          <Image
            src={member.image || "/placeholder.svg"}
            alt={member.name}
            fill
            loading="lazy"
            className="object-cover object-top grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
          />
          <div className="from-card via-card/40 absolute inset-0 bg-gradient-to-t to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />
        </div>

        <div className="absolute right-0 bottom-0 left-0 p-4 md:p-6">
          <div className="bg-primary/10 border-primary/20 mb-2 inline-flex items-center gap-1.5 rounded-full border px-3 py-1">
            <span className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full" />
            <span className="text-primary text-xs font-medium">{member.role}</span>
          </div>
          <h3 className="text-foreground mb-1 text-lg font-semibold md:text-xl">
            {member.name}
          </h3>
          <p
            className={`text-muted-foreground text-sm transition-all duration-500 ${
              isHovered
                ? "max-h-20 translate-y-0 opacity-100"
                : "max-h-0 translate-y-4 opacity-0"
            } overflow-hidden`}
          >
            {member.bio}
          </p>
          <div
            className={`mt-3 flex items-center gap-2 transition-all delay-100 duration-500 ${
              isHovered
                ? "max-h-12 translate-y-0 opacity-100"
                : "max-h-0 translate-y-4 opacity-0"
            } overflow-hidden`}
          >
            {member.social.twitter && (
              <Link
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background/50 border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 rounded-lg border p-2 transition-all"
                aria-label={`${member.name} on Twitter`}
              >
                <TwitterIcon />
              </Link>
            )}
            {member.social.linkedin && (
              <Link
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background/50 border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 rounded-lg border p-2 transition-all"
                aria-label={`${member.name} on LinkedIn`}
              >
                <LinkedInIcon />
              </Link>
            )}
            {member.social.github && (
              <Link
                href={member.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background/50 border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 rounded-lg border p-2 transition-all"
                aria-label={`${member.name} on GitHub`}
              >
                <GitHubIcon />
              </Link>
            )}
          </div>
        </div>

        <div className="absolute top-4 right-4 h-8 w-8 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="from-primary absolute top-0 right-0 h-[2px] w-full bg-gradient-to-l to-transparent" />
          <div className="from-primary absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b to-transparent" />
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      <ScrollToTop />
      <GridBackground />
      <Navbar />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px] overflow-hidden"
        style={{
          background:
            "radial-gradient(circle 800px at 50% -200px, rgba(34, 94, 223, 0.15), transparent 70%)",
        }}
      />
      <main className="relative z-10 pt-32 pb-20">
        <section className="container mx-auto mb-32 px-6 text-center md:mb-24">
          <div className="bg-primary/10 border-primary/20 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2">
            <Sparkles className="text-primary h-4 w-4" />
            <span className="text-primary text-sm font-medium">About Oxcil</span>
          </div>
          <h1 className="text-foreground mx-auto mb-6 max-w-4xl text-4xl font-bold text-balance md:text-5xl lg:text-6xl">
            Building the future of <span className="text-primary">AI infrastructure</span>
          </h1>
          <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg">
            We&apos;re a team of engineers, researchers, and builders on a mission to make
            AI inference fast, reliable, and accessible to everyone.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/contact">
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#team">Meet the Team</Link>
            </Button>
          </div>
        </section>

        <section className="container mx-auto mb-24 px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-card/50 border-border group hover:border-primary/30 relative rounded-xl border p-6 text-center transition-colors"
              >
                <div className="text-primary mb-2 text-3xl font-bold md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto mb-24 px-6">
          <div className="mx-auto max-w-4xl">
            <div className="bg-card/50 border-border relative overflow-hidden rounded-2xl border p-8 md:p-12">
              <div className="bg-primary/5 absolute top-0 right-0 h-64 w-64 rounded-full blur-3xl" />
              <div className="relative">
                <h2 className="text-foreground mb-6 text-2xl font-bold md:text-3xl">
                  Our Mission
                </h2>
                <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                  We founded Oxcil with a simple belief: AI should be accessible to every
                  developer and every company, regardless of scale. The infrastructure
                  that powers AI shouldn&apos;t be a bottleneck—it should be an enabler.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Today, we&apos;re building the most reliable, fastest, and most
                  cost-effective AI inference platform in the world. We&apos;re not just
                  building technology—we&apos;re building the foundation for the next
                  generation of AI-powered applications.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto mb-24 px-6">
          <div className="mb-12 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
              Our Values
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-card/50 border-border hover:border-primary/30 rounded-xl border p-6 transition-all duration-300"
              >
                <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
                  <value.icon className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-foreground mb-2 text-lg font-semibold">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="team" className="container mx-auto mb-24 px-6">
          <div className="mb-12 text-center">
            <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              World-class talent from the best AI and infrastructure companies
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <TeamCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </section>

        <section className="container mx-auto px-6">
          <div className="from-primary/10 to-primary/5 border-primary/20 relative overflow-hidden rounded-2xl border bg-gradient-to-br p-8 text-center md:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,94,223,0.1),transparent_50%)]" />
            <div className="relative">
              <h2 className="text-foreground mb-4 text-2xl font-bold md:text-3xl">
                Join Our Team
              </h2>
              <p className="text-muted-foreground mx-auto mb-8 max-w-xl">
                We&apos;re always looking for talented people who share our passion for
                building exceptional AI infrastructure. Check out our open positions.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="#">
                  View Open Positions <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
