"use client";

import { useEffect } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    yapilLenis?: Lenis;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    const prefersNativeScroll =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 767px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersNativeScroll) {
      return;
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      stopInertiaOnNavigate: true,
    });

    window.yapilLenis = lenis;
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }

    // Setup RequestAnimationFrame loop for Lenis
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Clean up on unmount
    return () => {
      cancelAnimationFrame(rafId);
      if (window.yapilLenis === lenis) {
        delete window.yapilLenis;
      }
      const legacyWindow = window as unknown as { lenis?: Lenis };
      if (legacyWindow.lenis === lenis) {
        delete legacyWindow.lenis;
      }
      lenis.destroy();
      resizeObserver.disconnect();
    };
  }, []);

  return null;
}
