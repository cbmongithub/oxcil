"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

import { Footer } from "@/components/footer";
import { GridBackground } from "@/components/grid-background";
import { Navbar } from "@/components/navbar";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import { blogPosts, categories, getFeaturedPost } from "@/lib/blog-data";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const featuredPost = getFeaturedPost();

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts.filter((p) => !p.featured)
      : blogPosts.filter((p) => p.category === activeCategory && !p.featured);

  return (
    <div className="bg-background min-h-screen">
      <ScrollToTop />
      <GridBackground />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle 800px at 50% -200px, rgba(34, 94, 223, 0.15), transparent 70%)`,
        }}
      />
      <Navbar />

      <main className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Badge variant="outline" className="border-primary/30 text-primary mb-4">
              Blog
            </Badge>
            <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
              Insights & Updates
            </h1>
            <p className="text-muted-foreground text-lg">
              Deep dives into AI infrastructure, product updates, tutorials, and industry
              analysis from the Oxcil team.
            </p>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <Link href={`/blog/${featuredPost.slug}`} className="group mb-16 block">
              <Card className="bg-surface-elevated border-border hover:border-primary/30 overflow-hidden transition-colors">
                <div className="grid gap-0 md:grid-cols-2">
                  <div className="relative aspect-[16/10] md:aspect-auto">
                    <Image
                      src={featuredPost.coverImage || "/placeholder.svg"}
                      alt={featuredPost.title}
                      fill
                      priority
                      className="object-cover"
                    />
                    <div className="to-surface-elevated/80 absolute inset-0 hidden bg-gradient-to-r from-transparent md:block" />
                  </div>
                  <div className="flex flex-col justify-center p-8 md:p-10">
                    <div className="mb-4 flex items-center gap-3">
                      <Badge className="bg-primary/10 text-primary border-0">
                        Featured
                      </Badge>
                      <Badge variant="outline" className="border-border">
                        {featuredPost.category}
                      </Badge>
                    </div>
                    <h2 className="text-foreground group-hover:text-primary mb-3 text-2xl font-bold transition-colors md:text-3xl">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 line-clamp-2">
                      {featuredPost.excerpt}
                    </p>
                    <div className="text-muted-foreground mb-6 flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {new Date(featuredPost.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Image
                        src={featuredPost.author.avatar || "/placeholder.svg"}
                        alt={featuredPost.author.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="text-foreground text-sm font-medium">
                          {featuredPost.author.name}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {featuredPost.author.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          )}

          {/* Category Filter */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-surface-elevated text-muted-foreground hover:text-foreground border-border border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.slice(0, 1).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <Card className="bg-surface-elevated border-border hover:border-primary/30 h-full overflow-hidden transition-colors">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={post.coverImage || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <Badge variant="outline" className="border-border text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-muted-foreground text-xs">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-foreground group-hover:text-primary mb-2 line-clamp-2 text-lg font-semibold transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image
                          src={post.author.avatar || "/placeholder.svg"}
                          alt={post.author.name}
                          width={28}
                          height={28}
                          className="rounded-full"
                        />
                        <span className="text-muted-foreground text-xs">
                          {post.author.name}
                        </span>
                      </div>
                      <span className="text-muted-foreground text-xs">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
            {filteredPosts.slice(1).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <Card className="bg-surface-elevated border-border hover:border-primary/30 h-full overflow-hidden transition-colors">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.coverImage || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <Badge variant="outline" className="border-border text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-muted-foreground text-xs">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-foreground group-hover:text-primary mb-2 line-clamp-2 text-lg font-semibold transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image
                          src={post.author.avatar || "/placeholder.svg"}
                          alt={post.author.name}
                          width={28}
                          height={28}
                          className="rounded-full"
                        />
                        <span className="text-muted-foreground text-xs">
                          {post.author.name}
                        </span>
                      </div>
                      <span className="text-muted-foreground text-xs">
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">No posts found in this category.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
