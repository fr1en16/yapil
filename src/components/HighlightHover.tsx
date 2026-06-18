"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion, type ValueAnimationTransition } from "motion/react";
import { cn } from "@/lib/utils";

interface HighlightHoverProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  effect?: ValueAnimationTransition;
  highlightColor: string;
  hoverTextColor?: string;
  barThickness?: number; // ratio relative to font size
  gapRatio?: number; // vertical gap relative to font size
  [key: string]: any; // Allow extra props (e.g. href, target, rel, onClick)
}

export const HighlightHover = ({
  children,
  as: Tag = "span",
  className,
  effect = { type: "spring", stiffness: 260, damping: 24 },
  highlightColor,
  hoverTextColor = "#fff",
  barThickness = 0.12,
  gapRatio = 0.03,
  ...rest
}: HighlightHoverProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  const MotionTag = useMemo(() => motion.create(Tag), [Tag]);

  // Set dynamic CSS vars
  useEffect(() => {
    const applyVars = () => {
      if (ref.current) {
        const size = parseFloat(
          getComputedStyle(ref.current).fontSize
        );
        ref.current.style.setProperty("--hh-bar", `${size * barThickness}px`);
        ref.current.style.setProperty("--hh-gap", `${size * gapRatio}px`);
      }
    };
    applyVars();
    window.addEventListener("resize", applyVars);
    return () => window.removeEventListener("resize", applyVars);
  }, [barThickness, gapRatio]);

  const barAnim = {
    rest: { 
      height: "var(--hh-bar, 2px)",
      bottom: "-1px",
      backgroundColor: "currentColor",
      transition: effect
    },
    hover: { 
      height: "100%", 
      bottom: "0px",
      backgroundColor: highlightColor,
      transition: effect 
    },
  };

  const overlayAnim = {
    rest: { 
      height: "0%", 
      bottom: "-1px",
      transition: effect 
    },
    hover: { 
      height: "100%", 
      bottom: "0px",
      transition: effect 
    },
  };

  return (
    <MotionTag
      ref={ref}
      whileHover="hover"
      animate="rest"
      initial="rest"
      className={cn("relative inline-block cursor-pointer", className)}
      {...rest}
    >
      {/* Base text layer (resting color) */}
      <span className="relative block text-current">
        {children}

        {/* Masked text overlay (white on hover, reveals from bottom to top) */}
        <motion.div
          aria-hidden="true"
          variants={overlayAnim}
          className="absolute left-0 w-full overflow-hidden select-none pointer-events-none"
          style={{
            zIndex: 2,
            bottom: 0,
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "100%",
              color: hoverTextColor,
              whiteSpace: "nowrap",
            }}
          >
            {children}
          </span>
        </motion.div>
      </span>

      {/* Growing background bar (orange on hover) */}
      <motion.div
        aria-hidden="true"
        variants={barAnim}
        className="absolute left-0 w-full"
        style={{
          zIndex: 1,
        }}
      />
    </MotionTag>
  );
};
