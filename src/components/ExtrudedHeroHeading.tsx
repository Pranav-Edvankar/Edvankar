"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ExtrudedHeroHeadingProps {
  headingText?: string;
  className?: string;
}

// 7 distinct physical extrusion layers with progressive base depths (up to 44px).
const LAYER_CONFIGS = [
  { depth: 4.0,  color: "#ECE8DF", stroke: "rgba(0,0,0,0.15)" },
  { depth: 9.0,  color: "#D7D2C3", stroke: "rgba(0,0,0,0.18)" },
  { depth: 15.0, color: "#C1BBA8", stroke: "rgba(0,0,0,0.20)" },
  { depth: 22.0, color: "#ABA590", stroke: "rgba(0,0,0,0.22)" },
  { depth: 29.0, color: "#928D78", stroke: "rgba(0,0,0,0.25)" },
  { depth: 36.0, color: "#746F5C", stroke: "rgba(0,0,0,0.30)" },
  { depth: 44.0, color: "#545041", stroke: "rgba(0,0,0,0.35)" },
];

export function ExtrudedHeroHeading({
  headingText = "PRANAV EDVANKAR",
  className = "font-display text-6xl sm:text-8xl md:text-[9rem] lg:text-[11rem] leading-[0.88] uppercase tracking-tight text-light",
}: ExtrudedHeroHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const charRefs = useRef<{ [key: number]: HTMLSpanElement | null }>({});
  const shouldReduceMotion = useReducedMotion();

  // Track cursor position
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos(null);
  }, []);

  // Split heading into words (lines)
  const lines = headingText.trim().split(" ");
  let globalCharCounter = 0;

  return (
    <div
      ref={containerRef}
      className="relative inline-block cursor-pointer select-none group focus:outline-none p-12 -m-12"
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
                const uniqueCharId = globalCharCounter++;

                // Measure character spatial center and calculate continuous influence & magnetic pull
                let influence = 0;
                let dirX = 0;
                let dirY = 0;
                let magX = 0;
                let magY = 0;

                const el = charRefs.current[uniqueCharId];
                if (mousePos && el) {
                  const rect = el.getBoundingClientRect();
                  const charCenterX = rect.left + rect.width / 2;
                  const charCenterY = rect.top + rect.height / 2;

                  const dx = mousePos.x - charCenterX;
                  const dy = mousePos.y - charCenterY;
                  const dist = Math.hypot(dx, dy) || 1;

                  dirX = dx / dist;
                  dirY = dy / dist;

                  // Wide magnetic attraction field (300px radius around each letter)
                  // Magnetizes letters even when cursor is in the empty space surrounding the text
                  const radius = 300;
                  if (dist < radius) {
                    const norm = dist / radius;
                    influence = 0.5 * (1 + Math.cos(norm * Math.PI));
                  }

                  // Amplified magnetic pull vector reaching toward cursor (up to 48px displacement)
                  const maxMagneticDist = 48;
                  magX = dirX * Math.min(dist, maxMagneticDist) * influence * 0.95;
                  magY = dirY * Math.min(dist, maxMagneticDist) * influence * 0.95;
                }

                const isLetterActive = mousePos !== null && influence > 0.001;

                return (
                  <span
                    key={charIndex}
                    ref={(node) => {
                      charRefs.current[uniqueCharId] = node;
                    }}
                    className="relative inline-block"
                  >
                    {/* ── 7 Extrusion Layers (Wide Field Magnetic Extrusion) ── */}
                    {!shouldReduceMotion &&
                      LAYER_CONFIGS.map((layer, layerIndex) => {
                        const effectiveDepth = layer.depth * influence;
                        const layerOffsetX = isLetterActive ? magX + dirX * effectiveDepth : 0;
                        const layerOffsetY = isLetterActive ? magY + dirY * effectiveDepth : 0;

                        // Fast tracking when active, slow motion spring when settling back (~700ms)
                        const springStiffness = isLetterActive ? (220 - layerIndex * 12) : (55 - layerIndex * 3);
                        const springDamping = isLetterActive ? (20 + layerIndex * 1.0) : (14 + layerIndex * 0.8);
                        const springMass = isLetterActive ? (0.55 + layerIndex * 0.08) : (0.95 + layerIndex * 0.12);

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
                              x: layerOffsetX,
                              y: layerOffsetY,
                              opacity: isLetterActive ? 1 : 0,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: springStiffness,
                              damping: springDamping,
                              mass: springMass,
                            }}
                          >
                            {char}
                          </motion.span>
                        );
                      })}

                    {/* ── Primary Front Letter (Amplified Magnetic Pull) ── */}
                    <motion.span
                      className={`${className} relative z-30 inline-block`}
                      style={{
                        WebkitFontSmoothing: "antialiased",
                        MozOsxFontSmoothing: "grayscale",
                      }}
                      animate={{
                        x: isLetterActive ? magX : 0,
                        y: isLetterActive ? magY : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: isLetterActive ? 260 : 65,
                        damping: isLetterActive ? 20 : 15,
                        mass: isLetterActive ? 0.5 : 0.9,
                      }}
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
