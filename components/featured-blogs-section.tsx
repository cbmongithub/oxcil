"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog-data";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export function FeaturedBlogsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Get 3 most recent posts for featured display
  const featuredPosts = blogPosts.slice(0, 3);

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

  return (
    <section
      ref={sectionRef}
      className="bg-background relative overflow-hidden py-24 md:py-32"
    >
      {/* Subtle glow */}
      <div className="bg-primary pointer-events-none absolute top-1/2 left-1/2 h-[100px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06] blur-[80px]" />

      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              className={`text-foreground mb-4 text-3xl font-bold text-balance md:text-4xl lg:text-5xl ${
                isVisible ? "animate-slide-up-section" : "opacity-0"
              }`}
            >
              Latest from our blog
            </h2>
            <p
              className={`text-muted-foreground max-w-2xl text-lg ${
                isVisible ? "animate-slide-up-section-delayed" : "opacity-0"
              }`}
            >
              Insights, tutorials, and updates from the Oxcil team.
            </p>
          </div>
          <div
            className={`${isVisible ? "animate-slide-up-section-delayed" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            <Button variant="outline" asChild className="group bg-transparent">
              <Link href="/blog">
                View all articles
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div
          className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ${
            isVisible ? "animate-slide-up-section-delayed" : "opacity-0"
          }`}
          style={{ animationDelay: "0.3s" }}
        >
          {featuredPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              <article className="border-border/50 bg-surface-elevated hover:border-primary/50 hover:shadow-primary/5 h-full overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg">
                {/* Cover Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.coverImage || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-primary/90 text-primary-foreground rounded-full px-2.5 py-1 text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-foreground group-hover:text-primary mb-2 line-clamp-2 text-lg font-semibold transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="text-muted-foreground flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
