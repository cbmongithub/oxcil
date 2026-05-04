"use client";

import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does Oxcil's pricing work?",
    answer:
      "We offer simple pay-as-you-go pricing based on token usage. You only pay for what you use with no minimum commitments. Enterprise customers can access custom pricing with volume discounts and dedicated support.",
  },
  {
    question: "What models are available on the platform?",
    answer:
      "Oxcil provides access to 50+ state-of-the-art models including GPT-4, Claude 3, Llama 3, Mistral, and more. We continuously add new models as they become available, ensuring you always have access to the latest capabilities.",
  },
  {
    question: "How fast is the inference?",
    answer:
      "Our infrastructure delivers sub-100ms latency for most models with edge deployments across 200+ global locations. We optimize for both throughput and latency, with some models achieving 10,000+ tokens per second.",
  },
  {
    question: "Can I switch between models without changing my code?",
    answer:
      "Yes, Oxcil's unified API allows you to seamlessly switch between any supported model with a single parameter change. No code refactoring required - just update the model name in your request.",
  },
  {
    question: "What security certifications do you have?",
    answer:
      "We are SOC 2 Type II certified and GDPR compliant. Enterprise customers can access additional security features including VPC deployment, dedicated instances, and custom data retention policies.",
  },
  {
    question: "Do you offer custom model fine-tuning?",
    answer:
      "Yes, Enterprise customers can fine-tune select models on their proprietary data. Our team provides guidance on dataset preparation, training parameters, and deployment of fine-tuned models.",
  },
];

export function FaqSection() {
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

  return (
    <section
      ref={sectionRef}
      className="bg-background relative overflow-hidden py-24 md:py-32"
    >
      {/* Subtle horizontal blur ray */}
      <div className="bg-primary pointer-events-none absolute top-1/2 left-1/2 h-[100px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08] blur-[80px]" />

      <div className="flex w-full justify-center px-4 md:px-6">
        <div className="w-full max-w-3xl">
          {/* Header */}
          <div className="mb-12 text-center md:mb-16">
            <h2
              className={`text-foreground mb-4 text-3xl font-bold text-balance md:text-4xl lg:text-5xl ${
                isVisible ? "animate-slide-up-section" : "opacity-0"
              }`}
            >
              Frequently asked questions
            </h2>
            <p
              className={`text-muted-foreground mx-auto max-w-2xl text-lg ${
                isVisible ? "animate-slide-up-section-delayed" : "opacity-0"
              }`}
            >
              Everything you need to know about Oxcil and our inference platform.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div
            className={`${isVisible ? "animate-slide-up-section-delayed" : "opacity-0"}`}
            style={{ animationDelay: "0.3s" }}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="group border-white/10"
                >
                  <AccordionTrigger className="text-foreground hover:text-primary py-5 text-left text-base font-medium transition-colors hover:no-underline md:text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 text-base leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
