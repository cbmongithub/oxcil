"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { SyntaxHighlighter } from "@/lib/syntax-highlighter";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "javascript" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isHighlightable = ["javascript", "typescript", "js", "ts", "jsx", "tsx"].includes(
    language
  );

  return (
    <div className="group relative">
      <pre className="bg-surface-dark overflow-x-auto rounded-lg border border-white/10 p-4 text-sm">
        {isHighlightable ? (
          <SyntaxHighlighter code={code} />
        ) : (
          <code className="text-muted-foreground">{code}</code>
        )}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 rounded-md border border-white/10 bg-white/5 p-2 opacity-0 transition-all group-hover:opacity-100 hover:bg-white/10"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="text-muted-foreground h-4 w-4" />
        )}
      </button>
    </div>
  );
}
