"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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

  const content = (
    <div className="relative flex items-center justify-between gap-3 px-6 py-3 select-none">
      <div className="flex items-center gap-2 overflow-hidden">
        {dossierNumber && (
          <span className="font-mono text-[0.65rem] uppercase tracking-wider font-bold opacity-75 shrink-0">
            [{dossierNumber}]
          </span>
        )}
        <span className="font-serif font-bold text-base md:text-lg tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
          {title}
        </span>
      </div>

      {badgeText && (
        <span className="font-mono text-[0.6rem] uppercase tracking-widest px-1.5 py-0.5 border border-current opacity-70 shrink-0">
          {badgeText}
        </span>
      )}
    </div>
  );

  const containerClasses = `relative inline-block ${
    isVertical ? "writing-mode-vertical" : ""
  } ${className}`;

  if (isVertical) {
    return (
      <motion.div
        whileHover={{ x: -6 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="relative group cursor-pointer"
        style={{ writingMode: "vertical-rl" }}
        onClick={onClick}
      >
        {href ? (
          <Link href={href} className="block">
            <div
              className="px-4 py-6 rounded-l-lg border-l-4 border-t border-b border-black/20 font-serif text-lg font-bold shadow-2xl transition-transform"
              style={{ backgroundColor: color, color: textColor }}
            >
              <div className="flex items-center justify-between gap-4">
                {dossierNumber && (
                  <span className="font-mono text-xs opacity-75 font-normal">
                    {dossierNumber}
                  </span>
                )}
                <span className="tracking-tight">{title}</span>
              </div>
            </div>
          </Link>
        ) : (
          <div
            className="px-4 py-6 rounded-l-lg border-l-4 border-t border-b border-black/20 font-serif text-lg font-bold shadow-2xl"
            style={{ backgroundColor: color, color: textColor }}
          >
            <div className="flex items-center justify-between gap-4">
              {dossierNumber && (
                <span className="font-mono text-xs opacity-75 font-normal">
                  {dossierNumber}
                </span>
              )}
              <span className="tracking-tight">{title}</span>
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scaleY: 1.14, scaleX: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ transformOrigin: "bottom center" }}
      className={`relative inline-block cursor-pointer origin-bottom ${className}`}
      onClick={onClick}
    >
      {/* Folder Tab Scalloped SVG Outer Container */}
      <div className="relative group">
        {/* SVG Tab Background */}
        <svg
          className="w-full h-12 md:h-14 drop-shadow-md"
          viewBox="0 0 240 48"
          preserveAspectRatio="none"
        >
          <path
            d="M 0,48 L 0,18 C 6,18 12,0 24,0 L 216,0 C 228,0 234,18 240,18 L 240,48 Z"
            fill={color}
            stroke="rgba(0,0,0,0.25)"
            strokeWidth="1.5"
          />
        </svg>

        {/* Tab Text Content */}
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
      </div>
    </motion.div>
  );
}
