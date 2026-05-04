"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Zap, Database, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { CodeBlock } from "@/components/docs/code-block";
import { CopyPageButton } from "@/components/docs/copy-page-button";
import type { DocsSectionId } from "@/lib/docs-content";

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState<DocsSectionId>("introduction");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <DocsHeader />

      <div className="flex pt-16">
        <DocsSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

        <main className="max-w-4xl flex-1 px-6 py-12 lg:ml-64 lg:px-12">
          {/* Introduction */}
          <section id="introduction" className="mb-16">
            <div className="text-muted-foreground mb-4 flex items-center gap-2 text-sm">
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Documentation</span>
            </div>
            <div className="mb-4 flex items-start justify-between gap-4">
              <h1 className="text-4xl font-bold">Introduction</h1>
              <CopyPageButton />
            </div>
            <p className="text-muted-foreground mb-8 text-lg">
              Oxcil provides a unified API to access 50+ AI models with industry-leading
              latency and 99.99% uptime. Our intelligent routing automatically selects the
              best model for your use case.
            </p>
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="bg-surface-elevated rounded-lg border border-white/10 p-4">
                <Zap className="text-primary mb-3 h-8 w-8" />
                <h3 className="mb-1 font-semibold">12ms Latency</h3>
                <p className="text-muted-foreground text-sm">
                  Average response time across all models
                </p>
              </div>
              <div className="bg-surface-elevated rounded-lg border border-white/10 p-4">
                <Database className="text-primary mb-3 h-8 w-8" />
                <h3 className="mb-1 font-semibold">50+ Models</h3>
                <p className="text-muted-foreground text-sm">
                  Access GPT-4, Claude, Llama, and more
                </p>
              </div>
              <div className="bg-surface-elevated rounded-lg border border-white/10 p-4">
                <Key className="text-primary mb-3 h-8 w-8" />
                <h3 className="mb-1 font-semibold">One API Key</h3>
                <p className="text-muted-foreground text-sm">
                  Single key for all model providers
                </p>
              </div>
            </div>
          </section>

          {/* Quickstart */}
          <section id="quickstart" className="mb-16">
            <h2 className="mb-4 text-2xl font-bold">Quickstart</h2>
            <p className="text-muted-foreground mb-6">
              Get started with Oxcil in under 5 minutes. Install our SDK and make your
              first API call.
            </p>
            <h3 className="mb-3 text-lg font-semibold">1. Install the SDK</h3>
            <CodeBlock code="npm install @oxcil/sdk" language="bash" />
            <h3 className="mt-6 mb-3 text-lg font-semibold">2. Initialize the client</h3>
            <CodeBlock
              language="typescript"
              code={`import { Oxcil } from '@oxcil/sdk'

const Oxcil = new Oxcil({
  apiKey: 'YOUR_API_KEY'
})`}
            />
            <h3 className="mt-6 mb-3 text-lg font-semibold">
              3. Make your first request
            </h3>
            <CodeBlock
              language="typescript"
              code={`const response = await Oxcil.chat.completions.create({
  model: 'gpt-4-turbo',
  messages: [
    { role: 'user', content: 'Hello, how are you?' }
  ]
})

console.log(response.choices[0].message.content)`}
            />
          </section>

          {/* Authentication */}
          <section id="authentication" className="mb-16">
            <h2 className="mb-4 text-2xl font-bold">Authentication</h2>
            <p className="text-muted-foreground mb-6">
              All API requests require an API key. You can create and manage API keys in
              your dashboard.
            </p>
            <h3 className="mb-3 text-lg font-semibold">Using your API key</h3>
            <p className="text-muted-foreground mb-4">
              Include your API key in the{" "}
              <code className="bg-surface-dark rounded px-2 py-0.5 text-sm">
                Authorization
              </code>{" "}
              header:
            </p>
            <CodeBlock
              language="bash"
              code={`curl https://api.Oxcil.ai/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-4-turbo",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'`}
            />
          </section>

          {/* Chat Completions */}
          <section id="chat-completions" className="mb-16">
            <h2 className="mb-4 text-2xl font-bold">Chat Completions</h2>
            <p className="text-muted-foreground mb-6">
              Create chat completions using any supported model. The API is compatible
              with the OpenAI format.
            </p>
            <h3 className="mb-3 text-lg font-semibold">Request</h3>
            <CodeBlock
              language="typescript"
              code={`const response = await Oxcil.chat.completions.create({
  model: 'claude-3-opus',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Explain quantum computing.' }
  ],
  temperature: 0.7,
  max_tokens: 1000
})`}
            />
            <h3 className="mt-6 mb-3 text-lg font-semibold">Response</h3>
            <CodeBlock
              language="json"
              code={`{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1703654321,
  "model": "claude-3-opus",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Quantum computing is..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 25,
    "completion_tokens": 150,
    "total_tokens": 175
  }
}`}
            />
          </section>

          {/* Embeddings */}
          <section id="embeddings" className="mb-16">
            <h2 className="mb-4 text-2xl font-bold">Embeddings</h2>
            <p className="text-muted-foreground mb-6">
              Generate vector embeddings for text using models like
              text-embedding-3-large.
            </p>
            <CodeBlock
              language="typescript"
              code={`const embedding = await Oxcil.embeddings.create({
  model: 'text-embedding-3-large',
  input: 'The quick brown fox jumps over the lazy dog'
})

console.log(embedding.data[0].embedding) // [0.0023, -0.0045, ...]`}
            />
          </section>

          {/* Models */}
          <section id="models" className="mb-16">
            <h2 className="mb-4 text-2xl font-bold">Models</h2>
            <p className="text-muted-foreground mb-6">
              List available models and retrieve model information.
            </p>
            <CodeBlock
              language="typescript"
              code={`// List all available models
const models = await Oxcil.models.list()

// Get specific model info
const model = await Oxcil.models.retrieve('gpt-4-turbo')
console.log(model.context_length) // 128000`}
            />
            <div className="mt-6">
              <Link
                href="/models"
                className="text-primary inline-flex items-center gap-1 hover:underline"
              >
                View all available models <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* Model Routing */}
          <section id="model-routing" className="mb-16">
            <h2 className="mb-4 text-2xl font-bold">Model Routing</h2>
            <p className="text-muted-foreground mb-6">
              Let Oxcil automatically select the best model for your request based on
              cost, latency, and capability.
            </p>
            <CodeBlock
              language="typescript"
              code={`const response = await Oxcil.chat.completions.create({
  model: 'auto', // Oxcil selects the best model
  messages: [
    { role: 'user', content: 'Write a haiku about coding' }
  ],
  routing: {
    optimize: 'cost', // 'cost' | 'latency' | 'quality'
    fallback: ['gpt-4-turbo', 'claude-3-opus']
  }
})`}
            />
          </section>

          {/* Streaming */}
          <section id="streaming" className="mb-16">
            <h2 className="mb-4 text-2xl font-bold">Streaming</h2>
            <p className="text-muted-foreground mb-6">
              Stream responses token by token for real-time user experiences.
            </p>
            <CodeBlock
              language="typescript"
              code={`const stream = await Oxcil.chat.completions.create({
  model: 'gpt-4-turbo',
  messages: [{ role: 'user', content: 'Tell me a story' }],
  stream: true
})

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '')
}`}
            />
          </section>

          {/* Function Calling */}
          <section id="function-calling" className="mb-16">
            <h2 className="mb-4 text-2xl font-bold">Function Calling</h2>
            <p className="text-muted-foreground mb-6">
              Enable models to call functions and interact with external tools.
            </p>
            <CodeBlock
              language="typescript"
              code={`const response = await Oxcil.chat.completions.create({
  model: 'gpt-4-turbo',
  messages: [{ role: 'user', content: 'What is the weather in Tokyo?' }],
  tools: [
    {
      type: 'function',
      function: {
        name: 'get_weather',
        description: 'Get current weather for a location',
        parameters: {
          type: 'object',
          properties: {
            location: { type: 'string', description: 'City name' }
          },
          required: ['location']
        }
      }
    }
  ]
})`}
            />
          </section>

          {/* API Keys */}
          <section id="api-keys" className="mb-16">
            <h2 className="mb-4 text-2xl font-bold">API Keys</h2>
            <p className="text-muted-foreground mb-6">
              Manage your API keys securely. Never expose keys in client-side code.
            </p>
            <div className="bg-surface-elevated mb-6 rounded-lg border border-yellow-500/20 p-4">
              <p className="text-sm text-yellow-500">
                <strong>Security Warning:</strong> Keep your API keys secure. Do not share
                them or expose them in browser code.
              </p>
            </div>
            <CodeBlock
              language="bash"
              code={`# Store your API key in environment variables
export Oxcil_API_KEY="inf_sk_..."`}
            />
          </section>

          {/* Rate Limits */}
          <section id="rate-limits" className="mb-16">
            <h2 className="mb-4 text-2xl font-bold">Rate Limits</h2>
            <p className="text-muted-foreground mb-6">
              Rate limits vary by plan. Check response headers for your current usage.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left font-semibold">Plan</th>
                    <th className="px-4 py-3 text-left font-semibold">Requests/min</th>
                    <th className="px-4 py-3 text-left font-semibold">Tokens/min</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3">Developer</td>
                    <td className="px-4 py-3">60</td>
                    <td className="px-4 py-3">40,000</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3">Pro</td>
                    <td className="px-4 py-3">500</td>
                    <td className="px-4 py-3">200,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">Enterprise</td>
                    <td className="px-4 py-3">Unlimited</td>
                    <td className="px-4 py-3">Custom</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3 className="mt-6 mb-3 text-lg font-semibold">Rate limit headers</h3>
            <CodeBlock
              language="http"
              code={`X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1703654400`}
            />
          </section>

          {/* Footer navigation */}
          <div className="mt-16 border-t border-white/10 pt-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground mb-1 text-sm">Questions?</p>
                <Link href="/contact" className="text-primary hover:underline">
                  Contact our team
                </Link>
              </div>
              <Link href="/signup">
                <Button className="bg-primary hover:bg-primary/90">
                  Get your API key
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
