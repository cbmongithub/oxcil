import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import type React from "react";

import { Footer } from "@/components/footer";
import { GridBackground } from "@/components/grid-background";
import { LinkedInIcon, TwitterIcon } from "@/components/icons";
import { Navbar } from "@/components/navbar";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { blogPosts, getBlogPost } from "@/lib/blog-data";
import { SyntaxHighlighter } from "@/lib/syntax-highlighter";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const renderContent = (content: string) => {
    const lines = content.trim().split("\n");
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeContent = "";
    let codeLanguage = "";
    let listItems: React.ReactNode[] = [];
    let listType: "ul" | "ol" | null = null;

    const flushList = () => {
      if (listItems.length > 0 && listType) {
        const ListTag = listType;
        elements.push(
          <ListTag
            key={`list-${elements.length}`}
            className={`${listType === "ul" ? "list-disc" : "list-decimal"} text-muted-foreground mb-6 space-y-2 pl-6`}
          >
            {listItems}
          </ListTag>
        );
        listItems = [];
        listType = null;
      }
    };

    const renderInlineFormatting = (text: string, keyPrefix: string) => {
      // Handle bold, inline code, and links
      const parts: React.ReactNode[] = [];
      let remaining = text;
      let partIndex = 0;

      while (remaining.length > 0) {
        // Check for inline code first
        const codeMatch = remaining.match(/^`([^`]+)`/);
        if (codeMatch) {
          parts.push(
            <code
              key={`${keyPrefix}-code-${partIndex}`}
              className="bg-primary/10 text-primary rounded px-1.5 py-0.5 font-mono text-sm"
            >
              {codeMatch[1]}
            </code>
          );
          remaining = remaining.slice(codeMatch[0].length);
          partIndex++;
          continue;
        }

        // Check for bold
        const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
        if (boldMatch) {
          parts.push(
            <strong
              key={`${keyPrefix}-bold-${partIndex}`}
              className="text-foreground font-semibold"
            >
              {boldMatch[1]}
            </strong>
          );
          remaining = remaining.slice(boldMatch[0].length);
          partIndex++;
          continue;
        }

        // Find next special character or end of string
        const nextSpecial = remaining.search(/`|\*\*/);
        if (nextSpecial === -1) {
          parts.push(remaining);
          break;
        } else if (nextSpecial > 0) {
          parts.push(remaining.slice(0, nextSpecial));
          remaining = remaining.slice(nextSpecial);
          partIndex++;
        } else {
          // Edge case: special char at start but didn't match pattern
          parts.push(remaining[0]);
          remaining = remaining.slice(1);
          partIndex++;
        }
      }

      return parts;
    };

    lines.forEach((line, index) => {
      // Code block handling
      if (line.startsWith("```")) {
        flushList();
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = line.slice(3).trim();
          codeContent = "";
        } else {
          const isJS = ["javascript", "js", "typescript", "ts", "jsx", "tsx"].includes(
            codeLanguage.toLowerCase()
          );
          elements.push(
            <div
              key={index}
              className="border-border my-6 overflow-hidden rounded-lg border"
            >
              {codeLanguage && (
                <div className="bg-surface-elevated border-border border-b px-4 py-2">
                  <span className="text-muted-foreground font-mono text-xs uppercase">
                    {codeLanguage}
                  </span>
                </div>
              )}
              <div className="bg-surface-dark overflow-x-auto p-4">
                {isJS ? (
                  <SyntaxHighlighter code={codeContent.trim()} />
                ) : (
                  <pre className="font-mono text-sm">
                    <code className="text-foreground">{codeContent.trim()}</code>
                  </pre>
                )}
              </div>
            </div>
          );
          inCodeBlock = false;
        }
        return;
      }

      if (inCodeBlock) {
        codeContent += line + "\n";
        return;
      }

      // Headers
      if (line.startsWith("# ")) {
        flushList();
        elements.push(
          <h1
            key={index}
            className="text-foreground mt-12 mb-6 text-3xl font-bold first:mt-0 md:text-4xl"
          >
            {line.slice(2)}
          </h1>
        );
        return;
      }
      if (line.startsWith("## ")) {
        flushList();
        elements.push(
          <h2
            key={index}
            className="text-foreground mt-10 mb-4 text-2xl font-bold md:text-3xl"
          >
            {line.slice(3)}
          </h2>
        );
        return;
      }
      if (line.startsWith("### ")) {
        flushList();
        elements.push(
          <h3
            key={index}
            className="text-foreground mt-8 mb-3 text-xl font-semibold md:text-2xl"
          >
            {line.slice(4)}
          </h3>
        );
        return;
      }

      // Unordered list items
      if (line.startsWith("- ")) {
        if (listType !== "ul") {
          flushList();
          listType = "ul";
        }
        listItems.push(
          <li key={index} className="leading-relaxed">
            {renderInlineFormatting(line.slice(2), `li-${index}`)}
          </li>
        );
        return;
      }

      // Ordered list items
      if (/^\d+\.\s/.test(line)) {
        if (listType !== "ol") {
          flushList();
          listType = "ol";
        }
        listItems.push(
          <li key={index} className="leading-relaxed">
            {renderInlineFormatting(line.replace(/^\d+\.\s/, ""), `li-${index}`)}
          </li>
        );
        return;
      }

      // Empty line
      if (!line.trim()) {
        flushList();
        return;
      }

      // Regular paragraph
      flushList();
      elements.push(
        <p key={index} className="text-muted-foreground mb-6 text-lg leading-relaxed">
          {renderInlineFormatting(line, `p-${index}`)}
        </p>
      );
    });

    // Flush any remaining list
    flushList();

    return elements;
  };

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  return (
    <div className="bg-background min-h-screen">
      <ScrollToTop />
      <GridBackground />
      <Navbar />

      <main className="relative z-10 pt-32 pb-20">
        <article className="container mx-auto max-w-4xl px-6">
          {/* Back link */}
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <Badge variant="outline" className="border-primary/30 text-primary">
                {post.category}
              </Badge>
              <span className="text-muted-foreground flex items-center gap-1.5 text-sm">
                <Calendar className="h-4 w-4" />
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="text-muted-foreground flex items-center gap-1.5 text-sm">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
            <h1 className="text-foreground mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="text-muted-foreground text-xl">{post.excerpt}</p>
          </header>

          {/* Author & Share */}
          <div className="border-border mb-10 flex items-center justify-between border-b pb-10">
            <div className="flex items-center gap-4">
              <Image
                src={post.author.avatar || "/placeholder.svg"}
                alt={post.author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="text-foreground font-medium">{post.author.name}</p>
                <p className="text-muted-foreground text-sm">{post.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 bg-transparent"
                aria-label="Share on Twitter"
              >
                <TwitterIcon />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 bg-transparent"
                aria-label="Share on LinkedIn"
              >
                <LinkedInIcon />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 bg-transparent"
                aria-label="Share article"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Cover Image */}
          <div className="relative mb-12 aspect-[21/9] overflow-hidden rounded-xl">
            <Image
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div>{renderContent(post.content)}</div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="border-border mt-16 border-t pt-16">
              <h2 className="text-foreground mb-8 text-2xl font-bold">
                Related Articles
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group"
                  >
                    <div className="bg-surface-elevated border-border hover:border-primary/30 overflow-hidden rounded-lg border transition-colors">
                      <div className="relative aspect-[16/9]">
                        <Image
                          src={related.coverImage || "/placeholder.svg"}
                          alt={related.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-foreground group-hover:text-primary line-clamp-2 font-semibold transition-colors">
                          {related.title}
                        </h3>
                        <p className="text-muted-foreground mt-2 text-sm">
                          {related.readTime}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}
