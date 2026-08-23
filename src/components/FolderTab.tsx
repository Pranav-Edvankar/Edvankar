"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/** Darkens a hex colour by a given ratio (0–1). Pure CSS-free, runs in JS. */
function darkenHex(hex: string, amount = 0.18): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const dr = Math.max(0, Math.round(r * (1 - amount)));
  const dg = Math.max(0, Math.round(g * (1 - amount)));
  const db = Math.max(0, Math.round(b * (1 - amount)));
  return `#${dr.toString(16).padStart(2, "0")}${dg.toString(16).padStart(2, "0")}${db.toString(16).padStart(2, "0")}`;
}

/* Shared 2D hover transition */
const PEEK_TRANSITION = { duration: 0.28, ease: [0.25, 1, 0.5, 1] } as const;

interface FolderTabProps {
  title: string;
  color: string;
  textColor?: string;
  href?: string;
  active?: boolean;
  orientation?: "horizontal" | "vertical";
  className?: string;
  dossierNumber?: string;
  badgeText?: string;
  onClick?: () => void;
}

export function FolderTab({
  title,
  color,
  textColor = "#0A0A0A",
  href,
  active = false,
  orientation = "horizontal",
  className = "",
  dossierNumber,
  badgeText,
  onClick,
}: FolderTabProps) {
  const isVertical = orientation === "vertical";
  const darkColor = darkenHex(color, 0.22);

  // ── VERTICAL orientation (2D fake-3D hinge along left edge) ──────────────
  if (isVertical) {
    const sharedClasses =
      "px-4 py-6 rounded-l-lg border-l-4 border-t border-b border-black/20 font-serif text-lg font-bold flex items-center justify-between gap-4";

    const innerContent = (
      <>
        {dossierNumber && (
          <span className="font-mono text-xs opacity-75 font-normal">
            {dossierNumber}
          </span>
        )}
        <span className="tracking-tight">{title}</span>
      </>
    );

    return (
      <div
        className="relative cursor-pointer min-w-[60px] min-h-[140px]"
        style={{ writingMode: "vertical-rl", isolation: "isolate" }}
        onClick={onClick}
      >
        {/* Flap Stage */}
        <div className="relative w-full h-full">
          {/* InsideFace — static dark underside, fully hidden at rest */}
          <div
            className={`${sharedClasses} absolute inset-0 pointer-events-none`}
            style={{ backgroundColor: darkColor, color: textColor, zIndex: 0 }}
            aria-hidden
          >
            {innerContent}
          </div>

          {/* FrontFace — animates scaleX + skewY to fake left-edge hinge tilt */}
          <motion.div
            initial={false}
            whileHover={{ scaleX: 0.94, skewY: -2 }}
            transition={PEEK_TRANSITION}
            className={`${sharedClasses} absolute inset-0`}
            style={{
              backgroundColor: color,
              color: textColor,
              transformOrigin: "left center",
              zIndex: 1,
            }}
          >
            {href ? (
              <Link
                href={href}
                className="block w-full h-full flex items-center justify-between gap-4"
              >
                {innerContent}
              </Link>
            ) : (
              innerContent
            )}
            {/* Light-catching gradient overlay */}
            <motion.div
              className="absolute inset-0 rounded-l-lg pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.16 }}
              transition={PEEK_TRANSITION}
              style={{
                background:
                  "linear-gradient(to left, transparent 0%, rgba(0,0,0,0.7) 100%)",
              }}
              aria-hidden
            />
          </motion.div>
        </div>
      </div>
    );
  }

  // ── HORIZONTAL orientation (Scalloped SVG tab, 2D fake-3D top hinge) ─────
  const SVG_PATH =
    "M 0,48 L 0,18 C 6,18 12,0 24,0 L 216,0 C 228,0 234,18 240,18 L 240,48";

  const tabInner = (
    <div
      className="absolute inset-0 flex items-center justify-between px-6 pt-1"
      style={{ color: textColor }}
    >
      {href ? (
        <Link
          href={href}
          className="w-full flex items-center justify-between gap-3 text-current no-underline"
        >
          <div className="flex items-center gap-2 overflow-hidden">
            {dossierNumber && (
              <span className="font-mono text-[0.65rem] font-bold opacity-70 shrink-0">
                {dossierNumber}
              </span>
            )}
            <span className="font-serif font-bold text-sm md:text-base tracking-tight truncate">
              {title}
            </span>
          </div>
          {badgeText && (
            <span className="font-mono text-[0.6rem] uppercase tracking-widest px-1.5 py-0.5 border border-current opacity-70 shrink-0">
              {badgeText}
            </span>
          )}
        </Link>
      ) : (
        <div className="w-full flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-hidden">
            {dossierNumber && (
              <span className="font-mono text-[0.65rem] font-bold opacity-70 shrink-0">
                {dossierNumber}
              </span>
            )}
            <span className="font-serif font-bold text-sm md:text-base tracking-tight truncate">
              {title}
            </span>
          </div>
          {badgeText && (
            <span className="font-mono text-[0.6rem] uppercase tracking-widest px-1.5 py-0.5 border border-current opacity-70 shrink-0">
              {badgeText}
            </span>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`relative inline-block cursor-pointer ${className}`}
      onClick={onClick}
      style={{ isolation: "isolate" }}
    >
      {/* Flap Stage (Fixed Dimensions) */}
      <div className="relative w-[240px] h-12 md:h-14">
        {/* InsideFace — static dark underside, fully hidden at rest */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
          aria-hidden
        >
          <svg
            className="w-full h-full block"
            viewBox="0 0 240 48"
            preserveAspectRatio="none"
          >
            <path
              d={SVG_PATH}
              fill={darkColor}
              stroke="rgba(0,0,0,0.2)"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* FrontFace — animates scaleY + skewX to fake top-edge hinge tilt */}
        <motion.div
          initial={false}
          whileHover={{ scaleY: 0.94, skewX: -2 }}
          transition={PEEK_TRANSITION}
          className="absolute inset-0"
          style={{
            transformOrigin: "top center",
            zIndex: 1,
          }}
        >
          <svg
            className="w-full h-full block"
            viewBox="0 0 240 48"
            preserveAspectRatio="none"
          >
            <path
              d={SVG_PATH}
              fill={color}
              stroke="rgba(0,0,0,0.12)"
              strokeWidth="1.5"
            />
          </svg>
          {tabInner}
          {/* Light-catching gradient overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.16 }}
            transition={PEEK_TRANSITION}
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)",
            }}
            aria-hidden
          />
        </motion.div>
      </div>
    </div>
  );
}
