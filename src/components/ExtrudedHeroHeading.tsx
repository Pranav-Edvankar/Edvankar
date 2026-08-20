"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ExtrudedHeroHeadingProps {
  headingText?: string;
  className?: string;
}

// 7 distinct physical extrusion layers with progressive base depths.
const LAYER_CONFIGS = [
  { depth: 2.5, color: "#ECE8DF", stroke: "rgba(0,0,0,0.15)" },
  { depth: 5.0, color: "#D7D2C3", stroke: "rgba(0,0,0,0.18)" },
  { depth: 7.5, color: "#C1BBA8", stroke: "rgba(0,0,0,0.20)" },
  { depth: 10.0, color: "#ABA590", stroke: "rgba(0,0,0,0.22)" },
  { depth: 13.0, color: "#928D78", stroke: "rgba(0,0,0,0.25)" },
  { depth: 16.0, color: "#746F5C", stroke: "rgba(0,0,0,0.30)" },
  { depth: 19.0, color: "#545041", stroke: "rgba(0,0,0,0.35)" },
];

export function ExtrudedHeroHeading({
  headingText = "PRANAV EDVANKAR",
  className = "font-display text-6xl sm:text-8xl md:text-[9rem] lg:text-[11rem] leading-[0.88] uppercase tracking-tight text-light",
}: ExtrudedHeroHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dirVector, setDirVector] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const [activeLocation, setActiveLocation] = useState<{ lineIndex: number; charIndex: number } | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Update normalized cursor direction vector relative to heading center
  const updateDirection = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const distance = Math.hypot(dx, dy) || 1;

    const normX = dx / distance;
    const normY = dy / distance;

    const maxRadius = Math.max(rect.width, rect.height) / 2;
    const rawIntensity = Math.min(distance / (maxRadius * 0.5), 1.0);
    const intensity = 0.5 + rawIntensity * 0.5;

    setDirVector({
      x: normX * intensity,
      y: normY * intensity,
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    updateDirection(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    setActiveLocation(null);
  };

  // Split text into words (lines)
  const lines = headingText.trim().split(" ");

  return (
    <div
      ref={containerRef}
      className="relative inline-block cursor-pointer select-none group focus:outline-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      role="heading"
      aria-level={1}
      aria-label={headingText}
    >
      <div className="flex flex-col">
        {lines.map((lineText, lineIndex) => {
          const letters = lineText.split("");

          return (
            <div key={lineIndex} className="flex flex-row leading-[0.88]">
              {letters.map((char, charIndex) => {
                // Calculate proximity influence factor relative to currently hovered letter:
                // Hovered letter = 1.0 (100%)
                // Immediately adjacent letter (beside it) = 0.5 (50%)
                // Second neighbor = 0.15 (15%)
                // Farther letters = 0.0 (0%)
                let influence = 0;
                if (activeLocation !== null && activeLocation.lineIndex === lineIndex) {
                  const dist = Math.abs(charIndex - activeLocation.charIndex);
                  if (dist === 0) {
                    influence = 1.0;
                  } else if (dist === 1) {
                    influence = 0.5;
                  } else if (dist === 2) {
                    influence = 0.15;
                  }
                }

                const isHoveredExact = activeLocation?.lineIndex === lineIndex && activeLocation?.charIndex === charIndex;

                return (
                  <span
                    key={charIndex}
                    className="relative inline-block"
                    onMouseEnter={(e) => {
                      setActiveLocation({ lineIndex, charIndex });
                      updateDirection(e.clientX, e.clientY);
                    }}
                  >
                    {/* ── 7 Extrusion Layers (Proximity Weighted) ── */}
                    {!shouldReduceMotion &&
                      LAYER_CONFIGS.map((layer, layerIndex) => {
                        const effectiveDepth = layer.depth * influence;
                        const offsetX = dirVector.x * effectiveDepth;
                        const offsetY = dirVector.y * effectiveDepth;

                        const springStiffness = 360 - layerIndex * 15;
                        const springDamping = 22 + layerIndex * 1.2;
                        const springMass = 0.5 + layerIndex * 0.08;

                        return (
                          <motion.span
                            key={layerIndex}
                            aria-hidden="true"
                            className={`${className} absolute inset-0 pointer-events-none select-none`}
                            style={{
                              color: layer.color,
                              WebkitTextStroke: `1px ${layer.stroke}`,
                              zIndex: 20 - layerIndex,
                              WebkitFontSmoothing: "antialiased",
                              MozOsxFontSmoothing: "grayscale",
                            }}
                            initial={{ x: 0, y: 0, opacity: 0 }}
                            animate={{
                              x: offsetX,
                              y: offsetY,
                              opacity: influence > 0.02 ? 1 : 0,
                            }}
                            transition={
                              influence > 0.02
                                ? {
                                    type: "spring",
                                    stiffness: springStiffness,
                                    damping: springDamping,
                                    mass: springMass,
                                  }
                                : {
                                    type: "tween",
                                    ease: [0.4, 0.0, 0.2, 1],
                                    duration: 0.18,
                                  }
                            }
                          >
                            {char}
                          </motion.span>
                        );
                      })}

                    {/* ── Primary Front Letter ── */}
                    <motion.span
                      className={`${className} relative z-30 inline-block`}
                      style={{
                        WebkitFontSmoothing: "antialiased",
                        MozOsxFontSmoothing: "grayscale",
                      }}
                      animate={
                        isHoveredExact
                          ? {
                              x: dirVector.x * -1.5,
                              y: dirVector.y * -1.5,
                            }
                          : { x: 0, y: 0 }
                      }
                      transition={{ type: "spring", stiffness: 450, damping: 25 }}
                    >
                      {char}
                    </motion.span>
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
