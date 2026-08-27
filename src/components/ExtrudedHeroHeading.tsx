"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ExtrudedHeroHeadingProps {
  headingText?: string;
  className?: string;
}

// Crisp physical extrusion layers with clean solid tones (zero blur, zero strokes)
const LAYER_CONFIGS = [
  { depth: 6.0,  color: "#E8E4D9" },
  { depth: 13.0, color: "#D4CFC2" },
  { depth: 21.0, color: "#BFB9AB" },
  { depth: 30.0, color: "#A8A293" },
  { depth: 40.0, color: "#8E8878" },
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
                  const radius = 300;
                  if (dist < radius) {
                    const norm = dist / radius;
                    influence = 0.5 * (1 + Math.cos(norm * Math.PI));
                  }

                  // Magnetic pull displacement
                  const maxMagneticDist = 42;
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
                    {/* ── Crisp Extrusion Layers (Clean solid planes, zero blur) ── */}
                    {!shouldReduceMotion &&
                      LAYER_CONFIGS.map((layer, layerIndex) => {
                        const effectiveDepth = layer.depth * influence;
                        const layerOffsetX = isLetterActive ? magX + dirX * effectiveDepth : 0;
                        const layerOffsetY = isLetterActive ? magY + dirY * effectiveDepth : 0;

                        const springStiffness = isLetterActive ? (220 - layerIndex * 15) : (55 - layerIndex * 4);
                        const springDamping = isLetterActive ? (20 + layerIndex * 1.0) : (14 + layerIndex * 0.8);
                        const springMass = isLetterActive ? (0.55 + layerIndex * 0.08) : (0.95 + layerIndex * 0.12);

                        return (
                          <motion.span
                            key={layerIndex}
                            aria-hidden="true"
                            className={`${className} absolute inset-0 pointer-events-none select-none`}
                            style={{
                              color: layer.color,
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

                    {/* ── Primary Front Letter (Sharp & Crisp) ── */}
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
