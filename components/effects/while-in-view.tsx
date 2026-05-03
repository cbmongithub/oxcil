"use client";

import {
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

type WhileInViewProps<T extends ElementType = "div"> = {
  as?: T;
  hiddenClassName?: string;
  visibleClassName?: string;
  delay?: number;
  threshold?: number;
  onVisible?: () => void;
} & Omit<HTMLAttributes<HTMLElement>, "style"> & {
    style?: CSSProperties;
  };

export function WhileInView<T extends ElementType = "div">({
  as,
  hiddenClassName = "translate-y-6 opacity-0",
  visibleClassName = "translate-y-0 opacity-100",
  delay,
  threshold = 0.1,
  onVisible,
  className,
  style,
  ...props
}: WhileInViewProps<T>) {
  const Comp = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Reveal the element once, then disconnect so it does not retrigger on scroll.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          onVisible?.();
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, onVisible]);

  const mergedStyle: CSSProperties | undefined =
    delay === undefined
      ? style
      : {
          // Preserve the caller's inline styles while layering in the requested delay.
          transitionDelay: `${delay}ms`,
          ...style,
        };

  return (
    <Comp
      ref={ref}
      className={cn(isVisible ? visibleClassName : hiddenClassName, className)}
      style={mergedStyle}
      {...props}
    />
  );
}
