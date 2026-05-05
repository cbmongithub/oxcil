"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Filter, Search } from "lucide-react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Model {
  name: string;
  provider: string;
  contextWindow: number;
  inputModalities: string[];
  outputModalities: string[];
  features: string[];
  inputPrice: number; // per 1M tokens
  outputPrice: number; // per 1M tokens
  latency: string;
  tokensPerSec: number;
}

const models: Model[] = [
  {
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    contextWindow: 128000,
    inputModalities: ["text", "vision"],
    outputModalities: ["text"],
    features: ["tool-calling", "json-mode", "function-calling"],
    inputPrice: 10.0,
    outputPrice: 30.0,
    latency: "8ms",
    tokensPerSec: 1250,
  },
  {
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    contextWindow: 200000,
    inputModalities: ["text", "vision"],
    outputModalities: ["text"],
    features: ["tool-calling", "json-mode", "streaming"],
    inputPrice: 3.0,
    outputPrice: 15.0,
    latency: "12ms",
    tokensPerSec: 1100,
  },
  {
    name: "Gemini 1.5 Pro",
    provider: "Google",
    contextWindow: 1000000,
    inputModalities: ["text", "vision", "audio"],
    outputModalities: ["text"],
    features: ["tool-calling", "json-mode", "function-calling", "streaming"],
    inputPrice: 3.5,
    outputPrice: 10.5,
    latency: "15ms",
    tokensPerSec: 980,
  },
  {
    name: "Llama 3.1 405B",
    provider: "Meta",
    contextWindow: 128000,
    inputModalities: ["text"],
    outputModalities: ["text"],
    features: ["tool-calling", "json-mode", "streaming"],
    inputPrice: 5.0,
    outputPrice: 15.0,
    latency: "18ms",
    tokensPerSec: 850,
  },
  {
    name: "Mistral Large 2",
    provider: "Mistral AI",
    contextWindow: 128000,
    inputModalities: ["text"],
    outputModalities: ["text"],
    features: ["tool-calling", "json-mode", "function-calling"],
    inputPrice: 4.0,
    outputPrice: 12.0,
    latency: "10ms",
    tokensPerSec: 1150,
  },
  {
    name: "Command R+",
    provider: "Cohere",
    contextWindow: 128000,
    inputModalities: ["text"],
    outputModalities: ["text"],
    features: ["tool-calling", "streaming", "rag-optimized"],
    inputPrice: 3.0,
    outputPrice: 15.0,
    latency: "14ms",
    tokensPerSec: 920,
  },
  {
    name: "GPT-4o",
    provider: "OpenAI",
    contextWindow: 128000,
    inputModalities: ["text", "vision", "audio"],
    outputModalities: ["text", "audio"],
    features: ["tool-calling", "json-mode", "function-calling", "streaming"],
    inputPrice: 5.0,
    outputPrice: 15.0,
    latency: "9ms",
    tokensPerSec: 1200,
  },
  {
    name: "Claude 3 Opus",
    provider: "Anthropic",
    contextWindow: 200000,
    inputModalities: ["text", "vision"],
    outputModalities: ["text"],
    features: ["tool-calling", "json-mode", "streaming"],
    inputPrice: 15.0,
    outputPrice: 75.0,
    latency: "20ms",
    tokensPerSec: 750,
  },
];

export default function ModelsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [selectedInputModalities, setSelectedInputModalities] = useState<string[]>([]);
  const [selectedOutputModalities, setSelectedOutputModalities] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showProviderFilter, setShowProviderFilter] = useState(false);
  const [showInputFilter, setShowInputFilter] = useState(false);
  const [showOutputFilter, setShowOutputFilter] = useState(false);
  const [showFeatureFilter, setShowFeatureFilter] = useState(false);

  const allProviders = Array.from(new Set(models.map((m) => m.provider)));
  const allInputModalities = Array.from(
    new Set(models.flatMap((m) => m.inputModalities))
  );
  const allOutputModalities = Array.from(
    new Set(models.flatMap((m) => m.outputModalities))
  );
  const allFeatures = Array.from(new Set(models.flatMap((m) => m.features)));

  const filteredModels = useMemo(() => {
    return models.filter((model) => {
      const matchesSearch =
        searchQuery === "" ||
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.provider.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesProvider =
        selectedProviders.length === 0 || selectedProviders.includes(model.provider);

      const matchesInputModality =
        selectedInputModalities.length === 0 ||
        selectedInputModalities.some((m) => model.inputModalities.includes(m));

      const matchesOutputModality =
        selectedOutputModalities.length === 0 ||
        selectedOutputModalities.some((m) => model.outputModalities.includes(m));

      const matchesFeature =
        selectedFeatures.length === 0 ||
        selectedFeatures.some((f) => model.features.includes(f));

      return (
        matchesSearch &&
        matchesProvider &&
        matchesInputModality &&
        matchesOutputModality &&
        matchesFeature
      );
    });
  }, [
    searchQuery,
    selectedProviders,
    selectedInputModalities,
    selectedOutputModalities,
    selectedFeatures,
  ]);

  const toggleFilter = (
    value: string,
    selectedArray: string[],
    setFunction: (arr: string[]) => void
  ) => {
    if (selectedArray.includes(value)) {
      setFunction(selectedArray.filter((item) => item !== value));
    } else {
      setFunction([...selectedArray, value]);
    }
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedProviders([]);
    setSelectedInputModalities([]);
    setSelectedOutputModalities([]);
    setSelectedFeatures([]);
  };

  const activeFilterCount =
    selectedProviders.length +
    selectedInputModalities.length +
    selectedOutputModalities.length +
    selectedFeatures.length;

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h1 className="text-foreground mb-4 text-4xl font-bold text-balance md:text-5xl lg:text-6xl">
              Model Pricing & Performance
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Compare 50+ LLMs by speed, cost, and capabilities. Find the perfect model
              for your use case.
            </p>
            <Link
              href="/signup"
              className="bg-primary hover:bg-primary/90 mt-6 inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-medium text-white transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="mx-auto mb-8 max-w-6xl">
            <div className="flex flex-col gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
                <Input
                  type="text"
                  placeholder="Search models or providers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-card h-12 border-white/10 pl-10"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <Filter className="text-muted-foreground h-4 w-4" />

                {/* Provider Filter */}
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowProviderFilter(!showProviderFilter)}
                    className="bg-card hover:bg-card/80 border-white/10"
                  >
                    Provider
                    {selectedProviders.length > 0 && (
                      <Badge
                        variant="secondary"
                        className="bg-primary border-primary ml-2"
                      >
                        {selectedProviders.length}
                      </Badge>
                    )}
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                  {showProviderFilter && (
                    <Card className="bg-card absolute top-full z-10 mt-2 min-w-[200px] border-white/10 p-2">
                      {allProviders.map((provider) => (
                        <button
                          key={provider}
                          onClick={() =>
                            toggleFilter(
                              provider,
                              selectedProviders,
                              setSelectedProviders
                            )
                          }
                          className="flex w-full items-center gap-2 rounded px-3 py-2 text-left hover:bg-white/5"
                        >
                          <div
                            className={`h-4 w-4 rounded border ${selectedProviders.includes(provider) ? "bg-primary border-primary" : "border-white/20"} flex items-center justify-center`}
                          >
                            {selectedProviders.includes(provider) && (
                              <Check className="h-3 w-3 text-white" />
                            )}
                          </div>
                          <span className="text-foreground text-sm">{provider}</span>
                        </button>
                      ))}
                    </Card>
                  )}
                </div>

                {/* Input Modality Filter */}
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowInputFilter(!showInputFilter)}
                    className="bg-card hover:bg-card/80 border-white/10"
                  >
                    Input
                    {selectedInputModalities.length > 0 && (
                      <Badge
                        variant="secondary"
                        className="bg-primary border-primary ml-2"
                      >
                        {selectedInputModalities.length}
                      </Badge>
                    )}
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                  {showInputFilter && (
                    <Card className="bg-card absolute top-full z-10 mt-2 min-w-[200px] border-white/10 p-2">
                      {allInputModalities.map((modality) => (
                        <button
                          key={modality}
                          onClick={() =>
                            toggleFilter(
                              modality,
                              selectedInputModalities,
                              setSelectedInputModalities
                            )
                          }
                          className="flex w-full items-center gap-2 rounded px-3 py-2 text-left hover:bg-white/5"
                        >
                          <div
                            className={`h-4 w-4 rounded border ${selectedInputModalities.includes(modality) ? "bg-primary border-primary" : "border-white/20"} flex items-center justify-center`}
                          >
                            {selectedInputModalities.includes(modality) && (
                              <Check className="h-3 w-3 text-white" />
                            )}
                          </div>
                          <span className="text-foreground text-sm capitalize">
                            {modality}
                          </span>
                        </button>
                      ))}
                    </Card>
                  )}
                </div>

                {/* Output Modality Filter */}
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowOutputFilter(!showOutputFilter)}
                    className="bg-card hover:bg-card/80 border-white/10"
                  >
                    Output
                    {selectedOutputModalities.length > 0 && (
                      <Badge
                        variant="secondary"
                        className="bg-primary border-primary ml-2"
                      >
                        {selectedOutputModalities.length}
                      </Badge>
                    )}
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                  {showOutputFilter && (
                    <Card className="bg-card absolute top-full z-10 mt-2 min-w-[200px] border-white/10 p-2">
                      {allOutputModalities.map((modality) => (
                        <button
                          key={modality}
                          onClick={() =>
                            toggleFilter(
                              modality,
                              selectedOutputModalities,
                              setSelectedOutputModalities
                            )
                          }
                          className="flex w-full items-center gap-2 rounded px-3 py-2 text-left hover:bg-white/5"
                        >
                          <div
                            className={`h-4 w-4 rounded border ${selectedOutputModalities.includes(modality) ? "bg-primary border-primary" : "border-white/20"} flex items-center justify-center`}
                          >
                            {selectedOutputModalities.includes(modality) && (
                              <Check className="h-3 w-3 text-white" />
                            )}
                          </div>
                          <span className="text-foreground text-sm capitalize">
                            {modality}
                          </span>
                        </button>
                      ))}
                    </Card>
                  )}
                </div>

                {/* Features Filter */}
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFeatureFilter(!showFeatureFilter)}
                    className="bg-card hover:bg-card/80 border-white/10"
                  >
                    Features
                    {selectedFeatures.length > 0 && (
                      <Badge
                        variant="secondary"
                        className="bg-primary border-primary ml-2"
                      >
                        {selectedFeatures.length}
                      </Badge>
                    )}
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                  {showFeatureFilter && (
                    <Card className="bg-card absolute top-full z-10 mt-2 min-w-[200px] border-white/10 p-2">
                      {allFeatures.map((feature) => (
                        <button
                          key={feature}
                          onClick={() =>
                            toggleFilter(feature, selectedFeatures, setSelectedFeatures)
                          }
                          className="flex w-full items-center gap-2 rounded px-3 py-2 text-left hover:bg-white/5"
                        >
                          <div
                            className={`h-4 w-4 rounded border ${selectedFeatures.includes(feature) ? "bg-primary border-primary" : "border-white/20"} flex items-center justify-center`}
                          >
                            {selectedFeatures.includes(feature) && (
                              <Check className="h-3 w-3 text-white" />
                            )}
                          </div>
                          <span className="text-foreground text-sm">{feature}</span>
                        </button>
                      ))}
                    </Card>
                  )}
                </div>

                {activeFilterCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Clear all ({activeFilterCount})
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mx-auto mb-4 max-w-6xl">
            <p className="text-muted-foreground text-sm">
              Showing {filteredModels.length} of {models.length} models
            </p>
          </div>

          {/* Models Table */}
          <div className="mx-auto max-w-6xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-muted-foreground px-4 py-4 text-left text-sm font-medium">
                      Model
                    </th>
                    <th className="text-muted-foreground px-4 py-4 text-left text-sm font-medium">
                      Context
                    </th>
                    <th className="text-muted-foreground px-4 py-4 text-left text-sm font-medium">
                      I/O
                    </th>
                    <th className="text-muted-foreground px-4 py-4 text-left text-sm font-medium">
                      Features
                    </th>
                    <th className="text-muted-foreground px-4 py-4 text-left text-sm font-medium">
                      Latency
                    </th>
                    <th className="text-muted-foreground px-4 py-4 text-left text-sm font-medium">
                      Price (per 1M tokens)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredModels.map((model, index) => (
                    <tr
                      key={index}
                      className="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
                    >
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-foreground font-medium">
                            {model.name}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            {model.provider}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-foreground font-mono">
                          {(model.contextWindow / 1000).toFixed(0)}K
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex flex-wrap gap-1">
                            {model.inputModalities.map((mod) => (
                              <Badge
                                key={mod}
                                variant="secondary"
                                className="bg-primary/10 text-primary border-primary/20 text-xs"
                              >
                                {mod}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {model.outputModalities.map((mod) => (
                              <Badge
                                key={mod}
                                variant="secondary"
                                className="bg-secondary/50 text-muted-foreground border-white/10 text-xs"
                              >
                                {mod}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex max-w-[200px] flex-wrap gap-1">
                          {model.features.slice(0, 2).map((feature) => (
                            <Badge
                              key={feature}
                              variant="outline"
                              className="text-muted-foreground border-white/10 text-xs"
                            >
                              {feature}
                            </Badge>
                          ))}
                          {model.features.length > 2 && (
                            <Badge
                              variant="outline"
                              className="text-muted-foreground border-white/10 text-xs"
                            >
                              +{model.features.length - 2}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-foreground font-mono font-medium">
                            {model.latency}
                          </span>
                          <span className="text-muted-foreground font-mono text-xs">
                            {model.tokensPerSec} tok/s
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-foreground font-mono">
                            In: ${model.inputPrice.toFixed(2)}
                          </span>
                          <span className="text-muted-foreground font-mono text-sm">
                            Out: ${model.outputPrice.toFixed(2)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredModels.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">
                    No models found matching your filters.
                  </p>
                  <Button variant="ghost" onClick={clearAllFilters} className="mt-4">
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
