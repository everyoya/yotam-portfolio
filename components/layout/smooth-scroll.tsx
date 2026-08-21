"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

import { features } from "@/lib/config";

const LENIS_OPTIONS = {
  duration: 1.05,
  easing: (t: number) => 1 - Math.pow(1 - t, 3),
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.15,
  syncTouch: false,
};

export function SmoothScroll({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  useEffect(() => {
    if (!features.smoothScroll) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis(LENIS_OPTIONS);
    let frameId = 0;

    function raf(time: number): void {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    }

    frameId = window.requestAnimationFrame(raf);

    function handleAnchorClick(e: MouseEvent): void {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const element = document.querySelector(href);
      if (!element) return;

      e.preventDefault();
      lenis.scrollTo(element as HTMLElement, {
        offset: -100,
        duration: 0.9,
      });
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
