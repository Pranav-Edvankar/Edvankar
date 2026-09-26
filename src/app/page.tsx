"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, X } from "lucide-react";
import { PROJECTS_DATA, CLUSTERS, CaseStudy } from "@/data/projects";
import { ExtrudedHeroHeading } from "@/components/ExtrudedHeroHeading";
import MosbyFolderStack from "@/components/MosbyFolderStack";
import QwikampInformationArchitecture from "@/components/QwikampInformationArchitecture";

/** Darkens a hex colour by a given factor (0–1). Zero-dependency, runs in JS. */
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

/* ─── Realistic Metallic Steel Paperclip ─── */
function Paperclip({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`w-7 h-13 md:w-9 md:h-16 drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)] select-none pointer-events-none ${className}`}
      viewBox="0 0 42 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Realistic Steel / Chrome Metallic Gradient */}
        <linearGradient id="clipSteelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FAFAFA" />
          <stop offset="20%" stopColor="#C8C8CC" />
          <stop offset="45%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#8E8E96" />
          <stop offset="90%" stopColor="#D4D4D8" />
          <stop offset="100%" stopColor="#5A5A62" />
        </linearGradient>

        {/* Specular Chrome Reflection Sheen */}
        <linearGradient id="clipShineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#A0A0A8" stopOpacity="0.3" />
          <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#6C6C74" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Cast Shadow Underlay */}
      <path
        d="M 15,16 L 15,44 A 6,6 0 0,0 27,44 L 27,16 A 9.5,9.5 0 0,0 8,16 L 8,48 A 13,13 0 0,0 34,48 L 34,22"
        stroke="rgba(0,0,0,0.38)"
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(1.5, 2.5)"
      />

      {/* Main Metallic Steel Wire */}
      <path
        d="M 15,16 L 15,44 A 6,6 0 0,0 27,44 L 27,16 A 9.5,9.5 0 0,0 8,16 L 8,48 A 13,13 0 0,0 34,48 L 34,22"
        stroke="url(#clipSteelGrad)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Core Specular Chrome Highlight */}
      <path
        d="M 15,16 L 15,44 A 6,6 0 0,0 27,44 L 27,16 A 9.5,9.5 0 0,0 8,16 L 8,48 A 13,13 0 0,0 34,48 L 34,22"
        stroke="url(#clipShineGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Dossier Technical Stamps / Compass SVGs ─── */
function DossierStamps() {
  return (
    <div className="flex items-center gap-2.5 sm:gap-6 md:gap-8 opacity-75 select-none shrink-0">
      {/* North Compass Arrow 1 */}
      <svg className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-current shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="13" />
        <path d="M16 5 L20 16 L16 13 L12 16 Z" fill="currentColor" />
        <text x="14" y="9" fontSize="5" fontWeight="bold" fill="currentColor">N</text>
      </svg>
      {/* Stamp Dial 2 */}
      <svg className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-current shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="12" strokeDasharray="2 2" />
        <polygon points="16,6 24,24 8,24" />
      </svg>
      {/* North Arrow 3 */}
      <svg className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-current shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 26 L26 6" />
        <path d="M18 6 L26 6 L26 14" />
        <text x="8" y="14" fontSize="6" fontWeight="bold" fill="currentColor">N</text>
      </svg>
      {/* Grid Globe 4 */}
      <svg className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-current shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="13" />
        <ellipse cx="16" cy="16" rx="6" ry="13" />
        <line x1="3" y1="16" x2="29" y2="16" />
      </svg>
      {/* Dial Wheel 5 (Hidden on extra small screens) */}
      <svg className="hidden xs:block w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-current shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="12" />
        <line x1="4" y1="16" x2="28" y2="16" />
      </svg>
      {/* Drafting Compass 6 (Desktop only) */}
      <svg className="hidden sm:block w-7 h-7 md:w-8 md:h-8 text-current shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 4 L6 28 M16 4 L26 28" />
        <line x1="9" y1="20" x2="23" y2="20" />
        <circle cx="16" cy="4" r="2" fill="currentColor" />
      </svg>
      {/* Technical Stamp 7 (Desktop only) */}
      <svg className="hidden md:block w-8 h-8 text-current shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="5" width="22" height="22" strokeDasharray="3 2" />
        <circle cx="16" cy="16" r="7" />
      </svg>
    </div>
  );
}

/* ─── Scalloped Folder Tab (Horizontal) — 2D Fake-3D Peek ─── */
const PEEK_TRANSITION_H = { duration: 0.28, ease: [0.25, 1, 0.5, 1] } as const;

function FolderTabH({
  title,
  color,
  onClick,
  onMouseEnter,
}: {
  title: string;
  color: string;
  onClick: () => void;
  onMouseEnter?: () => void;
}) {
  const darkColor = darkenHex(color, 0.22);
  const SVG_PATH = "M 0,54 L 0,20 Q 0,6 14,6 L 20,6 Q 28,6 28,0 L 242,0 Q 242,6 250,6 L 256,6 Q 270,6 270,20 L 270,54";

  return (
    <div
      className="relative cursor-pointer focus:outline-none inline-block group shrink-0"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onMouseEnter={onMouseEnter}
      style={{ isolation: "isolate" }}
    >
      {/* Flap Stage — Width naturally driven by text content */}
      <div className="relative h-[42px] sm:h-[48px] md:h-[54px] flex items-center justify-center px-4 sm:px-6 md:px-7">
        {/* InsideFace — static dark underside, fully hidden at rest */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
          aria-hidden
        >
          <svg
            className="w-full h-full block"
            viewBox="0 0 270 54"
            preserveAspectRatio="none"
          >
            <path
              d={SVG_PATH}
              fill={darkColor}
              stroke="rgba(0,0,0,0.22)"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* FrontFace — animates scaleY + skewX to fake top-edge hinge tilt */}
        <motion.div
          initial={false}
          whileHover={{ scaleY: 0.94, skewX: -2 }}
          transition={PEEK_TRANSITION_H}
          className="absolute inset-0"
          style={{
            transformOrigin: "top center",
            zIndex: 1,
          }}
        >
          <svg
            className="w-full h-full block"
            viewBox="0 0 270 54"
            preserveAspectRatio="none"
          >
            <path
              d={SVG_PATH}
              fill={color}
              stroke="rgba(0,0,0,0.15)"
              strokeWidth="1.5"
            />
          </svg>
          {/* Light-catching gradient overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.16 }}
            transition={PEEK_TRANSITION_H}
            style={{
              background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)",
            }}
            aria-hidden
          />
        </motion.div>

        {/* Natural text content width */}
        <span className="relative z-10 font-serif text-xs sm:text-sm md:text-base font-bold text-dark tracking-tight text-center select-none whitespace-nowrap pt-1">
          {title}
        </span>
      </div>
    </div>
  );
}

/* ─── Vertical Tab (Right Edge — Mosby File Folder Style) ─── */
function VerticalTab({
  title,
  color,
  categoryLabel,
  isActive,
  onClick,
}: {
  title: string;
  color: string;
  categoryLabel: string;
  isActive?: boolean;
  onClick: () => void;
}) {
  const darkColor = darkenHex(color, 0.22);
  const sharedRounded = { borderTopRightRadius: "12px", borderBottomRightRadius: "12px" };

  return (
    <div
      className="relative cursor-pointer block select-none"
      onClick={onClick}
    >
      {/* Flap Stage */}
      <div className="relative">
        {/* InsideFace */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            ...sharedRounded,
            backgroundColor: darkColor,
            zIndex: 0,
          }}
          aria-hidden
        />

        {/* FrontFace */}
        <motion.div
          initial={false}
          whileHover={{ x: 3 }}
          transition={{ duration: 0.18 }}
          className="relative px-2 sm:px-3 md:px-4 py-4 sm:py-6 md:py-8 shadow-md"
          style={{
            ...sharedRounded,
            backgroundColor: color,
            borderLeft: isActive ? "3px solid rgba(0,0,0,0.3)" : "none",
            zIndex: 1,
          }}
        >
          <div
            className="flex items-center justify-center font-serif text-xs sm:text-sm md:text-base font-bold tracking-tight whitespace-nowrap"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              color:
                color.toLowerCase() === "#f4c430" ||
                  color.toLowerCase() === "#e5a910" ||
                  color.toLowerCase() === "#f59e0b" ||
                  color.toLowerCase() === "#ffffff"
                  ? "#0A0A0A"
                  : "#FFFFFF",
            }}
          >
            <span>{title}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Lightbox Modal for Expanding Images ─── */
function ImageLightbox({
  image,
  onClose,
}: {
  image: { src: string; alt: string; caption?: string } | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10 focus:outline-none cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Expanded Image Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col items-center max-w-5xl max-h-[90vh] w-full"
          >
            <div className="relative w-full h-[75vh] md:h-[80vh] flex items-center justify-center">
              <Image
                src={image.src}
                alt={image.alt || "Design preview"}
                fill
                className="object-contain"
                priority
              />
            </div>
            {image.caption && (
              <div className="mt-4 bg-[#F5F3EE] text-dark p-3 md:p-4 rounded-md border border-black/20 shadow-xl max-w-xl text-center">
                <p className="font-serif text-sm md:text-base font-medium">{image.caption}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Scrapbook Phone Screen — Draggable & Expandable mockup ─── */
function PhoneScreen({
  src,
  alt,
  caption,
  rotate = 0,
  delay = 0.1,
  className = "",
  zIndex = 1,
  onExpand,
}: {
  src: string;
  alt: string;
  caption?: string;
  rotate: number;
  delay: number;
  className?: string;
  zIndex?: number;
  onExpand?: (img: { src: string; alt: string; caption?: string }) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative cursor-pointer select-none ${className}`}
      style={{ zIndex }}
      onClick={() => onExpand?.({ src, alt, caption })}
    >
      {/* Sleek, clean paper bezel frame */}
      <div className="rounded-[1.5rem] bg-white p-1.5 shadow-2xl border border-black/15 group-hover:border-black/30 transition-all hover:scale-[1.02]">
        <div className="rounded-[1.2rem] overflow-hidden bg-[#0B1120] relative">
          <div className="relative aspect-[9/19.5] w-full">
            <Image src={src} alt={alt} fill className="object-cover object-top pointer-events-none" />
          </div>
        </div>
      </div>
      {/* Caption label */}
      {caption && (
        <p className="font-mono text-[0.6rem] text-neutral-500 mt-2 text-center leading-tight px-2 pointer-events-none">
          {caption}
        </p>
      )}
    </motion.div>
  );
}

/* ─── Desktop PC Browser Screen Mockup — Authentic PC window chrome with scroll & expand ─── */
function DesktopScreen({
  src,
  alt,
  caption,
  rotate = 0,
  delay = 0.1,
  className = "",
  url = "aurelle-luxury.com",
  onExpand,
}: {
  src: string;
  alt: string;
  caption?: string;
  rotate?: number;
  delay?: number;
  className?: string;
  url?: string;
  onExpand?: (img: { src: string; alt: string; caption?: string }) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative cursor-pointer select-none ${className}`}
      onClick={() => onExpand?.({ src, alt, caption })}
    >
      {/* Sleek PC / Desktop Browser Frame */}
      <div className="rounded-xl md:rounded-2xl bg-[#1E1E24] shadow-2xl border border-black/30 overflow-hidden group hover:border-black/50 transition-all">
        {/* Browser Top Window Bar / Chrome */}
        <div className="bg-[#16161A] px-3.5 py-2.5 flex items-center justify-between border-b border-white/10 gap-3">
          {/* Traffic Light Control Dots */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 shadow-inner" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 shadow-inner" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 shadow-inner" />
          </div>

          {/* Tab & URL Address Bar */}
          <div className="flex-1 flex items-center justify-center max-w-md">
            <div className="w-full bg-[#0D0D11] text-neutral-300 rounded-md py-1 px-3 flex items-center justify-between text-[0.68rem] md:text-xs font-mono border border-white/5 shadow-inner">
              <span className="flex items-center gap-1.5 truncate text-neutral-400">
                <span className="text-emerald-400 text-[0.7rem]">🔒</span>
                <span className="text-neutral-200">{url}</span>
              </span>
              <span className="text-[0.6rem] uppercase tracking-wider text-neutral-500 hidden sm:inline">2026 PROD</span>
            </div>
          </div>

          {/* Browser Window Icons */}
          <div className="flex items-center gap-2 text-neutral-400 text-xs shrink-0">
            <span className="hover:text-white transition-colors cursor-pointer" title="Expand View">⛶</span>
          </div>
        </div>

        {/* Browser Viewport with Scrollable Preview */}
        <div className="relative bg-[#0F0F12] max-h-[460px] md:max-h-[620px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          <div className="relative w-full">
            <img
              src={src}
              alt={alt}
              className="w-full h-auto block pointer-events-none"
              loading="lazy"
            />
          </div>

          {/* Subtle scroll hint overlay on bottom */}
          <div className="sticky bottom-2 right-2 flex justify-end pointer-events-none pr-2 pb-2">
            <span className="bg-black/80 backdrop-blur-md text-white/90 text-[0.6rem] font-mono uppercase tracking-widest px-2.5 py-1 rounded border border-white/15 shadow-lg">
              ↕ Scroll Viewport • Click to Expand
            </span>
          </div>
        </div>
      </div>

      {caption && (
        <p className="font-mono text-[0.65rem] text-neutral-500 mt-2 text-center leading-tight px-2 pointer-events-none">
          {caption}
        </p>
      )}
    </motion.div>
  );
}

/* ─── Desktop Slide-Over Drawer Mockup ─── */
function DrawerScreen({
  src,
  alt,
  caption,
  rotate = 0,
  delay = 0.1,
  className = "",
  zIndex = 1,
  onExpand,
}: {
  src: string;
  alt: string;
  caption?: string;
  rotate?: number;
  delay?: number;
  className?: string;
  zIndex?: number;
  onExpand?: (img: { src: string; alt: string; caption?: string }) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative cursor-pointer select-none ${className}`}
      style={{ zIndex }}
      onClick={() => onExpand?.({ src, alt, caption })}
    >
      {/* Desktop Slide-over Drawer Frame */}
      <div className="rounded-xl bg-white shadow-2xl border border-black/20 overflow-hidden hover:border-black/40 transition-all hover:scale-[1.02]">
        {/* Drawer header bar */}
        <div className="bg-[#1C1C1F] px-3 py-2 flex items-center justify-between border-b border-black/10">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-white/90" />
            <span className="font-mono text-[0.6rem] text-neutral-300 uppercase tracking-wider">Slide-Over Panel</span>
          </div>
          <span className="text-neutral-400 text-xs">✕</span>
        </div>
        <div className="relative aspect-[524/1215] w-full bg-[#FAFAFA]">
          <Image src={src} alt={alt} fill className="object-cover object-top pointer-events-none" />
        </div>
      </div>
      {caption && (
        <p className="font-mono text-[0.6rem] text-neutral-500 mt-2 text-center leading-tight px-2 pointer-events-none">
          {caption}
        </p>
      )}
    </motion.div>
  );
}

/* ─── Studio Video Playback Frame (Mosby Production Reel & Footage Monitor) ─── */
function VideoScreen({
  src,
  poster,
  caption,
  title,
  rotate = 0,
  delay = 0.1,
  className = "",
  hasClip = false,
  aspectRatio = "16/9",
}: {
  src: string;
  poster?: string;
  caption?: string;
  title?: string;
  rotate?: number;
  delay?: number;
  className?: string;
  hasClip?: boolean;
  aspectRatio?: "16/9" | "4/3" | "9/16";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative select-none ${className}`}
    >
      {hasClip && (
        <div className="absolute -top-5 -right-3 z-30 pointer-events-none">
          <Paperclip />
        </div>
      )}

      {/* Production Studio Bezel & Video Player Monitor */}
      <div className="rounded-xl md:rounded-2xl bg-[#141417] shadow-2xl border border-black/40 overflow-hidden group hover:border-black/60 transition-all">
        {/* Studio Top Monitor Bar */}
        <div className="bg-[#0C0C0E] px-4 py-2.5 flex items-center justify-between border-b border-white/10 gap-3">
          {/* Status Indicators: REC dot & Resolution badge */}
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="flex items-center gap-1.5 font-mono text-[0.65rem] tracking-wider text-red-500 font-bold uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse inline-block" />
              LIVE PLAYBACK
            </span>
            <span className="hidden sm:inline-block bg-white/10 text-white/80 text-[0.6rem] font-mono px-2 py-0.5 rounded border border-white/5 uppercase tracking-widest">
              HD MASTER
            </span>
          </div>

          {/* Center Title or Timecode */}
          <div className="font-mono text-[0.65rem] sm:text-xs text-neutral-300 truncate tracking-wide font-medium">
            {title || "STUDIO PLAYBACK REEL"}
          </div>

          {/* Right Frame Specs */}
          <div className="flex items-center gap-2 font-mono text-[0.6rem] text-neutral-400 shrink-0">
            <span className="bg-black/60 px-2 py-0.5 rounded text-neutral-300 border border-white/10">60 FPS</span>
            <span className="hidden sm:inline text-neutral-500">MP4</span>
          </div>
        </div>

        {/* Video Viewport Container */}
        <div className={`relative w-full ${aspectRatio === "9/16" ? "aspect-[9/16] max-w-sm mx-auto" : "aspect-video"} bg-black overflow-hidden flex items-center justify-center`}>
          <video
            src={src}
            poster={poster}
            controls
            playsInline
            preload="metadata"
            className="w-full h-full object-contain bg-black"
          />
        </div>

        {/* Studio Bottom Bar with Meta */}
        <div className="bg-[#0C0C0E] px-3.5 py-2 flex items-center justify-between border-t border-white/10 text-neutral-400 font-mono text-[0.65rem]">
          <span className="flex items-center gap-1.5">
            <span className="text-emerald-400">●</span>
            <span>STEREO AUDIO</span>
          </span>
          <span className="text-neutral-500 text-[0.6rem] uppercase tracking-wider">
            MASTER CAM // PRODUCTION ARCHIVE
          </span>
        </div>
      </div>

      {caption && (
        <p className="font-mono text-[0.68rem] text-neutral-600 mt-2.5 text-center leading-relaxed px-2 pointer-events-none">
          {caption}
        </p>
      )}
    </motion.div>
  );
}

/* ─── Colored Scrapbook Info Card (Mosby style) ─── */
function ScrapbookInfoCard({
  title,
  caption,
  color,
  rotate,
  delay,
  className = "",
  hasClip = false,
}: {
  title: string;
  caption: string;
  color: string;
  rotate: number;
  delay: number;
  className?: string;
  hasClip?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay }}
      className={`p-5 md:p-6 shadow-xl border border-black/10 relative select-none ${className}`}
      style={{ backgroundColor: color, color: "#0A0A0A" }}
    >
      {hasClip && <div className="absolute -top-5 -right-2 z-30 pointer-events-none"><Paperclip /></div>}
      <h4 className="font-display text-lg md:text-2xl uppercase tracking-tight leading-tight pointer-events-none">{title}</h4>
      <p className="font-serif text-xs md:text-sm mt-2 leading-relaxed opacity-85 pointer-events-none">{caption}</p>
    </motion.div>
  );
}

/* ─── Project Detail Paper Card (Mosby Scrapbook Aesthetic with Lightbox) ─── */
function ProjectPaperCard({ project }: { project: CaseStudy }) {
  const hasHeroVideo = Boolean(project.coverVideo);
  const isDesktopProject = !hasHeroVideo && (project.slug === "aurelle" || project.flows.some((f) => f.imageAspect === "desktop"));
  const isAppProject = !hasHeroVideo && !isDesktopProject && project.flows.some((f) => f.imageAspect === "portrait");
  const color = project.categoryColor;
  const [expandedImage, setExpandedImage] = useState<{ src: string; alt: string; caption?: string } | null>(null);

  return (
    <div className="bg-[#F5F3EE] text-dark relative shadow-2xl overflow-hidden rounded-sm pl-6 sm:pl-9 md:pl-12">
      {/* Paperclip at top right of paper sheet */}
      <div className="absolute -top-5 right-[10%] sm:right-[15%] z-30 pointer-events-none"><Paperclip /></div>

      {/* Punched Holes on the Paper Sheet (Revealing the colored folder underneath) */}
      <div className="absolute left-2.5 sm:left-3.5 md:left-5 top-0 bottom-0 flex flex-col justify-around py-16 sm:py-28 pointer-events-none z-20">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 rounded-full border border-black/35 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.45)]"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Lightbox for expanding images */}
      <ImageLightbox image={expandedImage} onClose={() => setExpandedImage(null)} />

      <div className="p-2 sm:p-6 md:p-12 space-y-0">

        {/* ═══ HERO COVER — Video Player for video projects, Desktop PC Mockup for web, phone collage for apps ═══ */}
        {hasHeroVideo ? (
          <div className="relative w-full mb-10">
            <div className="absolute inset-x-0 top-6 bottom-16 -mx-4 sm:-mx-8 md:-mx-12 rounded-sm pointer-events-none" style={{ backgroundColor: color, opacity: 0.12 }} />

            <div className="max-w-4xl mx-auto px-1 sm:px-2 pt-2 pb-6 relative z-10">
              <VideoScreen
                src={project.coverVideo!}
                poster={project.coverImage}
                title={`${project.title} // Master Film`}
                caption={
                  project.slug === "motion-graphic"
                    ? "FIG 0.1 — EDVANKAR Motion Identity & Coca-Cola Kinetic Commercial Master (cokethem.mp4)"
                    : "FIG 0.1 — AeroGesture IMU Glove & Quadcopter Live Flight Testing"
                }
                rotate={-0.5}
                delay={0.1}
                hasClip
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="hidden sm:block absolute bottom-0 left-4 md:left-8 max-w-xs bg-white/95 backdrop-blur-sm p-4 shadow-lg border border-black/10 -rotate-1 select-none z-20"
            >
              <p className="font-mono text-[0.6rem] uppercase tracking-widest opacity-50 mb-1 pointer-events-none">{project.dossierNumber}</p>
              <p className="font-serif text-sm text-neutral-800 leading-relaxed pointer-events-none">{project.subtitle}</p>
            </motion.div>
          </div>
        ) : isDesktopProject ? (
          <div className="relative w-full mb-10">
            <div className="absolute inset-x-0 top-6 bottom-16 -mx-4 sm:-mx-8 md:-mx-12 rounded-sm pointer-events-none" style={{ backgroundColor: color, opacity: 0.12 }} />

            <div className="max-w-4xl mx-auto px-1 sm:px-2 pt-2 pb-6 relative z-10">
              <DesktopScreen
                src={project.coverImage || "/images/aurelle/web/Home.png"}
                alt={`${project.title} Desktop Storefront`}
                caption={
                  project.slug === "mojito"
                    ? "FIG 0.1 — Enterprise Workforce Operations Hub & People Analytics"
                    : project.slug === "firmway"
                      ? "FIG 0.1 — Financial Operations & Working Capital Command Center"
                      : "FIG 0.1 — Flagship E-Commerce & Web Experience"
                }
                rotate={-0.5}
                delay={0.1}
                url={
                  project.slug === "mojito"
                    ? "mojito.app/admin/dashboard"
                    : project.slug === "firmway"
                      ? "app.firmway.com/treasury"
                      : "aurelle-luxury.com/storefront"
                }
                onExpand={setExpandedImage}
              />
            </div>

            {project.slug === "aurelle" && (
              <div className="absolute bottom-2 sm:bottom-4 right-1 sm:right-6 md:right-12 w-[100px] sm:w-[150px] md:w-[180px] z-20">
                <div className="relative">
                  <div className="absolute -top-5 -right-2 z-30 pointer-events-none"><Paperclip /></div>
                  <PhoneScreen
                    src="/images/aurelle/mobile/home.png"
                    alt="AURELLE Mobile Parity"
                    caption="Mobile Parity"
                    rotate={4}
                    delay={0.35}
                    zIndex={25}
                    onExpand={setExpandedImage}
                  />
                </div>
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="hidden sm:block absolute bottom-0 left-4 md:left-8 max-w-xs bg-white/95 backdrop-blur-sm p-4 shadow-lg border border-black/10 -rotate-1 select-none z-20"
            >
              <p className="font-mono text-[0.6rem] uppercase tracking-widest opacity-50 mb-1 pointer-events-none">{project.dossierNumber}</p>
              <p className="font-serif text-sm text-neutral-800 leading-relaxed pointer-events-none">{project.subtitle}</p>
            </motion.div>
          </div>
        ) : isAppProject ? (
          <div className="relative w-full mb-10 overflow-hidden" style={{ minHeight: "420px" }}>
            <div className="absolute inset-x-0 top-8 bottom-20 -mx-4 sm:-mx-8 md:-mx-12 rounded-sm pointer-events-none" style={{ backgroundColor: color, opacity: 0.12 }} />

            <div className="relative flex items-center justify-center gap-1 sm:gap-2 pt-4 pb-6 max-w-full">
              {project.flows[0]?.images.slice(0, 3).map((img, i) => {
                const rots = [-6, 0, 6];
                const offsets = [
                  "-translate-x-1 sm:-translate-x-4 translate-y-2 sm:translate-y-4",
                  "z-10 scale-105",
                  "translate-x-1 sm:translate-x-4 translate-y-3 sm:translate-y-6",
                ];
                return (
                  <div key={i} className={`w-[90px] sm:w-[135px] md:w-[185px] shrink-0 ${offsets[i] || ""}`}>
                    <PhoneScreen
                      src={img.src}
                      alt={img.alt}
                      caption=""
                      rotate={rots[i] || 0}
                      delay={0.15 * i}
                      zIndex={i === 1 ? 10 : 5}
                      onExpand={setExpandedImage}
                    />
                  </div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute bottom-0 right-2 sm:right-4 md:right-10 max-w-[200px] sm:max-w-xs bg-white/90 backdrop-blur-sm p-3 sm:p-4 shadow-lg border border-black/10 rotate-1 select-none"
            >
              <p className="font-mono text-[0.55rem] sm:text-[0.6rem] uppercase tracking-widest opacity-50 mb-0.5 pointer-events-none">{project.dossierNumber}</p>
              <p className="font-serif text-xs sm:text-sm text-neutral-800 leading-snug pointer-events-none line-clamp-2 sm:line-clamp-none">{project.subtitle}</p>
            </motion.div>
          </div>
        ) : (
          <div
            onClick={() => setExpandedImage({ src: project.coverImage, alt: project.title, caption: project.title })}
            className="relative aspect-[16/9] w-full overflow-hidden border border-black/20 shadow-lg -rotate-1 mb-8 cursor-pointer hover:opacity-95 transition-opacity"
          >
            <Image src={project.coverImage} alt={project.title} fill className="object-cover" priority />
          </div>
        )}

        {/* ═══ OVERVIEW PROSE ═══ */}
        <div className="font-serif text-base sm:text-lg md:text-xl leading-relaxed text-neutral-900 max-w-3xl mx-auto space-y-5 mb-10">
          {project.overview.map((para, i) => (
            <p key={i} className={i === 0 ? "first-letter:text-5xl sm:first-letter:text-6xl first-letter:font-display first-letter:leading-none first-letter:float-left first-letter:mr-3 first-letter:mt-1" : ""}>
              {para}
            </p>
          ))}
        </div>

        {/* ═══ METADATA ═══ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 border border-black/15 bg-black/5 font-mono text-xs mb-12">
          <div><span className="font-bold block opacity-60">Role:</span><span className="font-serif text-xs sm:text-sm font-semibold">{project.role}</span></div>
          <div><span className="font-bold block opacity-60">Type:</span><span className="font-serif text-xs sm:text-sm font-semibold">{project.type}</span></div>
          <div><span className="font-bold block opacity-60">Timeline:</span><span className="font-serif text-xs sm:text-sm font-semibold">{project.timeline}</span></div>
          <div><span className="font-bold block opacity-60">Tools:</span><span className="font-serif text-xs sm:text-sm font-semibold">{project.tools.join(", ")}</span></div>
        </div>

        {/* ═══ STRUCTURED CASE STUDY QUESTIONS (PROBLEM, USERS, RESEARCH) ═══ */}
        <div className="space-y-6 mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Problem Statement */}
            <div className="p-5 bg-white border border-black/15 shadow-md relative">
              <span className="font-mono text-[0.65rem] uppercase tracking-widest text-neutral-500 font-bold block mb-1">01 // PROBLEM DEFINITION</span>
              <h4 className="font-display text-base uppercase tracking-tight text-dark mb-2">What problem were you solving?</h4>
              <p className="font-serif text-sm leading-relaxed text-neutral-800">{project.problemStatement}</p>
            </div>

            {/* Target Users */}
            {project.targetUsers && (
              <div className="p-5 bg-white border border-black/15 shadow-md relative">
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-neutral-500 font-bold block mb-1">02 // USER PERSONAS & AUDIENCE</span>
                <h4 className="font-display text-base uppercase tracking-tight text-dark mb-2">Who were the users?</h4>
                <p className="font-serif text-sm leading-relaxed text-neutral-800">{project.targetUsers}</p>
              </div>
            )}
          </div>

          {/* Research Methods */}
          {project.researchConducted && project.researchConducted.length > 0 && (
            <div className="p-5 bg-white border border-black/15 shadow-md">
              <span className="font-mono text-[0.65rem] uppercase tracking-widest text-neutral-500 font-bold block mb-1">03 // RESEARCH METHODOLOGY</span>
              <h4 className="font-display text-base uppercase tracking-tight text-dark mb-3">What research did you conduct?</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.researchConducted.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 bg-[#F9F8F5] border border-black/10">
                    <span className="font-mono text-xs font-bold text-white px-2 py-0.5 rounded shrink-0" style={{ backgroundColor: color }}>
                      R{i + 1}
                    </span>
                    <p className="font-serif text-xs leading-relaxed text-neutral-800">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ═══ KEY INSIGHTS ═══ */}
        {project.keyInsights && project.keyInsights.length > 0 && (
          <div className="mb-14 space-y-4">
            <div className="flex items-center gap-2 border-b border-black/15 pb-2">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">04 // INSIGHT DISCOVERY</span>
              <h4 className="font-display text-lg uppercase tracking-wider text-dark">What insights did you discover?</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.keyInsights.map((insight, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20, rotate: 0 }} whileInView={{ opacity: 1, y: 0, rotate: [-1, 1.5, -0.5, 0.8][i % 4] }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-4 border border-black/10 bg-white shadow-md">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: color }}>
                    INSIGHT 0{i + 1}
                  </span>
                  <p className="font-serif text-xs leading-relaxed mt-2 text-neutral-800">{insight}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ FLOW SECTIONS — EXPERIENCE STRUCTURE (IA, WIREFRAMES, PROTOTYPES, HI-FI) ═══ */}
        <div className="mb-8 pt-6 border-t border-black/15">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-500">05 // EXPERIENCE ARCHITECTURE & VISUAL FLOWS</span>
              <h3 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-dark">How did you structure the experience?</h3>
            </div>
            <span className="font-mono text-[0.65rem] uppercase tracking-widest text-neutral-500 bg-black/5 px-2.5 py-1 rounded border border-black/10">
              IA → Wireframes → Prototype → Hi-Fi
            </span>
          </div>

          {/* Dedicated Mosby-Style Information Architecture Blueprint for Qwikamp */}
          {project.slug === "qwikamp" && <QwikampInformationArchitecture />}

          {project.flows.map((flow, idx) => {
            const isVideoFlow = Boolean(flow.videoSrc) || flow.imageAspect === "video";
            const isDesktopFlow = !isVideoFlow && flow.imageAspect === "desktop";
            const isDrawerFlow = !isVideoFlow && flow.imageAspect === "drawer";
            const isPortrait = !isVideoFlow && flow.imageAspect === "portrait";
            const imgs = flow.images;
            const pattern = idx % 5;

            /* ─── VIDEO PLAYBACK FLOW ─── */
            if (isVideoFlow) {
              return (
                <div key={idx} className="relative mt-10 mb-20">
                  <ScrapbookInfoCard
                    title={flow.title}
                    caption={flow.caption}
                    color={color}
                    rotate={-1.5}
                    delay={0.1}
                    className="max-w-xl mb-8"
                    hasClip={idx === 0}
                  />
                  {flow.videoSrc && (
                    <div className="w-full max-w-4xl mb-6">
                      <VideoScreen
                        src={flow.videoSrc}
                        poster={imgs[0]?.src}
                        title={flow.title}
                        caption={flow.caption}
                        rotate={0.5}
                        delay={0.2}
                        hasClip
                      />
                    </div>
                  )}
                  {imgs.length > 0 && (!flow.videoSrc || imgs.length > 1) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      {(flow.videoSrc ? imgs.slice(1) : imgs).map((img, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * i }}
                          className="bg-white p-3 shadow-md border border-black/15 cursor-pointer select-none"
                          onClick={() => setExpandedImage({ src: img.src, alt: img.alt, caption: img.caption })}
                        >
                          <div className="relative aspect-[4/3] w-full overflow-hidden border border-black/10">
                            <Image src={img.src} alt={img.alt} fill className="object-cover" />
                          </div>
                          <p className="font-mono text-[0.65rem] text-neutral-600 mt-2 px-1">{img.caption}</p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="font-serif text-base text-neutral-800 leading-relaxed max-w-2xl mt-6">
                    {flow.description}
                  </motion.p>
                </div>
              );
            }

            /* ─── DESKTOP PC STOREFRONT FLOW ─── */
            if (isDesktopFlow) {
              const desktopUrl =
                project.slug === "mojito"
                  ? "mojito.app/admin"
                  : project.slug === "firmway"
                    ? "app.firmway.com"
                    : "aurelle-luxury.com";

              return (
                <div key={idx} className="relative mt-10 mb-20">
                  <ScrapbookInfoCard
                    title={flow.title}
                    caption={flow.caption}
                    color={color}
                    rotate={-1.5}
                    delay={0.1}
                    className="max-w-xl mb-8"
                    hasClip={idx === 0}
                  />
                  <div className="w-full">
                    {imgs.map((img, i) => (
                      <DesktopScreen
                        key={i}
                        src={img.src}
                        alt={img.alt}
                        caption={img.caption}
                        rotate={0.5}
                        delay={0.2}
                        url={desktopUrl}
                        onExpand={setExpandedImage}
                      />
                    ))}
                  </div>
                  <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="font-serif text-base text-neutral-800 leading-relaxed max-w-2xl mt-6">
                    {flow.description}
                  </motion.p>
                </div>
              );
            }

            /* ─── DESKTOP SLIDE-OVER DRAWER FLOW ─── */
            if (isDrawerFlow) {
              return (
                <div key={idx} className="relative mt-10 mb-20">
                  <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start mb-8">
                    <div className="lg:w-[35%] space-y-6 lg:sticky lg:top-20">
                      <ScrapbookInfoCard
                        title={flow.title}
                        caption={flow.caption}
                        color={color}
                        rotate={-2}
                        delay={0.1}
                        hasClip
                        className="w-full max-w-md"
                      />
                      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="font-serif text-base text-neutral-800 leading-relaxed">
                        {flow.description}
                      </motion.p>
                    </div>
                    <div className="lg:w-[65%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 w-full">
                      {imgs.map((img, i) => (
                        <div key={i} className="w-full">
                          <DrawerScreen
                            src={img.src}
                            alt={img.alt}
                            caption={img.caption}
                            rotate={[-2, 1.5, -1][i % 3]}
                            delay={0.2 + i * 0.12}
                            onExpand={setExpandedImage}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            if (!isPortrait) {
              // Non-portrait (landscape images)
              const rot = [-2, 3, -3, 2, -1][idx % 5];
              return (
                <div key={idx} className="relative mt-10 mb-16">
                  <ScrapbookInfoCard title={flow.title} caption={flow.caption} color={color} rotate={rot} delay={0.1} className="w-full max-w-md mb-6" hasClip={idx === 0} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {imgs.map((img, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? 2 : -3 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6, delay: 0.15 * (i + 1) }}
                        className="bg-white p-3 shadow-xl border border-black/20 select-none cursor-pointer"
                        onClick={() => setExpandedImage({ src: img.src, alt: img.alt, caption: img.caption })}
                      >
                        <div className="relative aspect-[4/3] w-full overflow-hidden border border-black/10 pointer-events-none">
                          <Image src={img.src} alt={img.alt} fill className="object-cover" />
                        </div>
                        <p className="font-mono text-[0.65rem] text-neutral-600 mt-2 px-1 pointer-events-none">{img.caption}</p>
                      </motion.div>
                    ))}
                  </div>
                  <p className="font-serif text-base text-neutral-800 leading-relaxed max-w-2xl mt-6">{flow.description}</p>
                </div>
              );
            }

            /* ─── PORTRAIT / APP SCREEN LAYOUTS — Responsive Collage Patterns ─── */
            return (
              <div key={idx} className="relative mt-6 mb-20">

                {pattern === 0 && (
                  <>
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <ScrapbookInfoCard title={flow.title} caption={flow.caption} color={color} rotate={-3} delay={0.1} className="w-full md:w-[280px] shrink-0 md:mt-16 md:sticky md:top-20" hasClip />
                      <div className="flex-1 flex items-end justify-center gap-1 sm:gap-2 relative w-full pt-4 pb-6" style={{ minHeight: "360px" }}>
                        {imgs.slice(0, 3).map((img, i) => {
                          const rots = [-5, 1, -4];
                          const yOff = [15, -8, 20];
                          return (
                            <div key={i} className="w-[90px] sm:w-[130px] md:w-[160px] shrink-0" style={{ transform: `translateY(${yOff[i]}px)` }}>
                              <PhoneScreen src={img.src} alt={img.alt} caption={img.caption} rotate={rots[i]} delay={0.2 + i * 0.12} zIndex={3 - i} onExpand={setExpandedImage} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {imgs.length > 3 && (
                      <div className="flex justify-center sm:justify-end gap-3 sm:gap-4 mt-6">
                        {imgs.slice(3).map((img, i) => (
                          <div key={i} className="w-[85px] sm:w-[110px] md:w-[140px] shrink-0">
                            <PhoneScreen src={img.src} alt={img.alt} caption={img.caption} rotate={i % 2 === 0 ? 3 : -2} delay={0.5 + i * 0.1} onExpand={setExpandedImage} />
                          </div>
                        ))}
                      </div>
                    )}
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="font-serif text-base text-neutral-800 leading-relaxed max-w-xl mt-8">
                      {flow.description}
                    </motion.p>
                  </>
                )}

                {pattern === 1 && (
                  <>
                    <div className="relative">
                      <div className="flex items-end justify-center gap-1 sm:gap-2 md:gap-4 max-w-full">
                        {imgs.slice(0, 4).map((img, i) => {
                          const rots = [3, -2, 2, -4];
                          const yOff = [8, -10, 4, 14];
                          return (
                            <div key={i} className="w-[72px] sm:w-[105px] md:w-[150px] shrink-0" style={{ transform: `translateY(${yOff[i]}px)` }}>
                              <PhoneScreen src={img.src} alt={img.alt} caption={img.caption} rotate={rots[i]} delay={0.1 + i * 0.1} zIndex={4 - i} onExpand={setExpandedImage} />
                            </div>
                          );
                        })}
                      </div>
                      <ScrapbookInfoCard title={flow.title} caption={flow.caption} color={color} rotate={2} delay={0.5} className="md:absolute md:-bottom-10 md:left-0 w-full max-w-sm mt-6 md:mt-0 z-20" />
                    </div>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="font-serif text-base text-neutral-800 leading-relaxed max-w-xl mt-10 md:mt-16 md:ml-auto md:mr-8">
                      {flow.description}
                    </motion.p>
                  </>
                )}

                {pattern === 2 && (
                  <>
                    <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-8 items-start">
                      <div className="w-full md:w-[45%] space-y-6">
                        <ScrapbookInfoCard title={flow.title} caption={flow.caption} color={color} rotate={-2} delay={0.1} hasClip className="w-full max-w-sm" />
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="font-serif text-base text-neutral-800 leading-relaxed">
                          {flow.description}
                        </motion.p>
                      </div>
                      <div className="w-full md:w-[55%] relative flex items-center justify-center gap-1 sm:gap-3 py-4" style={{ minHeight: "360px" }}>
                        {imgs.slice(0, 3).map((img, i) => {
                          const rots = [-4, 2, -3];
                          return (
                            <div key={i} className="w-[90px] sm:w-[120px] md:w-[155px] shrink-0">
                              <PhoneScreen src={img.src} alt={img.alt} caption={img.caption} rotate={rots[i]} delay={0.15 + i * 0.12} zIndex={3 - i} onExpand={setExpandedImage} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {imgs.length > 3 && (
                      <div className="flex gap-3 sm:gap-4 mt-6 justify-center md:justify-start md:ml-4">
                        {imgs.slice(3).map((img, i) => (
                          <div key={i} className="w-[85px] sm:w-[110px] md:w-[140px] shrink-0">
                            <PhoneScreen src={img.src} alt={img.alt} caption={img.caption} rotate={i % 2 === 0 ? 4 : -3} delay={0.5 + i * 0.1} onExpand={setExpandedImage} />
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {pattern === 3 && (
                  <>
                    <ScrapbookInfoCard title={flow.title} caption={flow.caption} color={color} rotate={3} delay={0.1} className="w-full max-w-md mb-4" hasClip />
                    <div className="relative flex items-center justify-center gap-1 sm:gap-3 py-4" style={{ minHeight: "360px" }}>
                      {imgs.slice(0, 3).map((img, i) => (
                        <div key={i} className="w-[90px] sm:w-[125px] md:w-[165px] shrink-0">
                          <PhoneScreen src={img.src} alt={img.alt} caption={img.caption} rotate={[2, -3, 3][i % 3]} delay={0.15 + i * 0.1} zIndex={3 - i} onExpand={setExpandedImage} />
                        </div>
                      ))}
                    </div>
                    {imgs.length > 3 && (
                      <div className="flex justify-center gap-2 sm:gap-3 mt-4">
                        {imgs.slice(3).map((img, i) => (
                          <div key={i} className="w-[80px] sm:w-[100px] md:w-[130px] shrink-0">
                            <PhoneScreen src={img.src} alt={img.alt} caption={img.caption} rotate={i % 2 === 0 ? -3 : 4} delay={0.5 + i * 0.1} onExpand={setExpandedImage} />
                          </div>
                        ))}
                      </div>
                    )}
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="font-serif text-base text-neutral-800 leading-relaxed max-w-2xl mt-6">
                      {flow.description}
                    </motion.p>
                  </>
                )}

                {pattern === 4 && (
                  <>
                    <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 md:gap-0">
                      <div className="w-[95px] sm:w-[130px] md:w-[170px] shrink-0">
                        <PhoneScreen src={imgs[0]?.src || ""} alt={imgs[0]?.alt || ""} caption={imgs[0]?.caption || ""} rotate={-4} delay={0.1} zIndex={5} onExpand={setExpandedImage} />
                      </div>
                      <ScrapbookInfoCard title={flow.title} caption={flow.caption} color={color} rotate={1} delay={0.25} className="max-w-[150px] sm:max-w-xs md:-mx-4 z-10 text-xs sm:text-sm" hasClip />
                      <div className="w-[95px] sm:w-[130px] md:w-[170px] shrink-0">
                        <PhoneScreen src={imgs[1]?.src || ""} alt={imgs[1]?.alt || ""} caption={imgs[1]?.caption || ""} rotate={3} delay={0.2} zIndex={5} onExpand={setExpandedImage} />
                      </div>
                    </div>
                    {imgs.length > 2 && (
                      <div className="flex justify-center gap-2 sm:gap-4 md:gap-5 mt-6">
                        {imgs.slice(2).map((img, i) => (
                          <div key={i} className="w-[85px] sm:w-[105px] md:w-[140px] shrink-0">
                            <PhoneScreen src={img.src} alt={img.alt} caption={img.caption} rotate={[3, -2, 4, -3][i % 4]} delay={0.4 + i * 0.1} onExpand={setExpandedImage} />
                          </div>
                        ))}
                      </div>
                    )}
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="font-serif text-base text-neutral-800 leading-relaxed max-w-xl mx-auto mt-6 md:mt-8 text-center">
                      {flow.description}
                    </motion.p>
                  </>
                )}

              </div>
            );
          })}
        </div>

        {/* ═══ STRATEGIC RATIONALE, AI, ITERATION & FINAL OUTCOME ═══ */}
        <div className="space-y-6 mt-16 pt-10 border-t border-black/15">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Explored Alternatives */}
            {project.exploredAlternatives && (
              <div className="p-5 bg-white border border-black/15 shadow-md">
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-neutral-500 font-bold block mb-1">06 // EXPLORED ALTERNATIVES</span>
                <h4 className="font-display text-base uppercase tracking-tight text-dark mb-2">What alternatives did you explore?</h4>
                <p className="font-serif text-sm leading-relaxed text-neutral-800">{project.exploredAlternatives}</p>
              </div>
            )}

            {/* Final Solution Rationale */}
            {project.finalSolutionRationale && (
              <div className="p-5 bg-white border border-black/15 shadow-md">
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-neutral-500 font-bold block mb-1">07 // SOLUTION RATIONALE</span>
                <h4 className="font-display text-base uppercase tracking-tight text-dark mb-2">Why did you choose the final solution?</h4>
                <p className="font-serif text-sm leading-relaxed text-neutral-800">{project.finalSolutionRationale}</p>
              </div>
            )}
          </div>

          {/* Information Architecture (IA) */}
          {(project.informationArchitecture || project.aiIntegration) && (
            <div className="p-6 bg-[#F4F1EA] border border-black/15 shadow-md mb-6">
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-purple-700 font-bold block">
                  08 // INFORMATION ARCHITECTURE (IA) & DESIGN SYSTEM TOKENS
                </span>
                {project.slug === "qwikamp" && (
                  <span className="font-mono text-[0.6rem] bg-purple-100 text-purple-900 border border-purple-300 px-2 py-0.5 rounded font-bold">
                    SPECIFICATION DOCUMENT
                  </span>
                )}
              </div>
              <h4 className="font-display text-base uppercase tracking-tight text-dark mb-3">
                How did you structure the Information Architecture (IA)?
              </h4>
              {project.slug === "qwikamp" ? (
                <div className="space-y-3 font-serif">
                  <div className="p-3 bg-blue-50/70 border border-blue-200 rounded text-xs text-blue-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span>Full 9-part specification from <code>UI_UX_INFORMATION_ARCHITECTURE.md</code> is rendered in Section 05 above.</span>
                    <a
                      href="#ia-spec"
                      className="font-mono text-[0.65rem] font-bold text-blue-700 hover:text-blue-900 uppercase tracking-wider shrink-0 underline decoration-blue-400"
                    >
                      ↑ Jump to Section 05 Spec
                    </a>
                  </div>
                  <div className="space-y-2 mt-2">
                    {Array.isArray(project.informationArchitecture) &&
                      project.informationArchitecture.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-white border border-black/15 shadow-2xs rounded-sm">
                          <span className="font-mono text-xs font-bold text-purple-800 bg-purple-100/80 border border-purple-300 px-2 py-0.5 rounded shrink-0">
                            IA-{String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="font-sans text-xs leading-relaxed text-neutral-900 font-medium">
                            {item}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              ) : Array.isArray(project.informationArchitecture) ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-3">
                  {project.informationArchitecture.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 bg-white/90 border border-black/15 shadow-sm rounded-sm">
                      <span className="font-mono text-xs font-bold text-purple-800 bg-purple-100/80 border border-purple-300 px-2 py-0.5 rounded shrink-0">
                        IA-{String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-sans text-xs leading-relaxed text-neutral-900 font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="font-serif text-sm leading-relaxed text-neutral-800">{project.informationArchitecture || project.aiIntegration}</p>
              )}
            </div>
          )}

          {/* Feedback & Iteration */}
          {project.feedbackAndIteration && (
            <div className="p-5 bg-white border border-black/15 shadow-md mb-6">
              <span className="font-mono text-[0.65rem] uppercase tracking-widest text-neutral-500 font-bold block mb-1">09 // FEEDBACK & ITERATION</span>
              <h4 className="font-display text-base uppercase tracking-tight text-dark mb-2">How did you respond to feedback?</h4>
              <p className="font-serif text-sm leading-relaxed text-neutral-800">{project.feedbackAndIteration}</p>
            </div>
          )}

          {/* Final Outcome */}
          {project.finalOutcome && (
            <div className="p-6 bg-white border-2 border-black/20 shadow-lg" style={{ borderLeft: `6px solid ${color}` }}>
              <span className="font-mono text-[0.65rem] uppercase tracking-widest text-neutral-500 font-bold block mb-1">10 // FINAL OUTCOME & DELIVERABLES</span>
              <h4 className="font-display text-lg uppercase tracking-tight text-dark mb-2">What was the final outcome?</h4>
              <p className="font-serif text-base leading-relaxed text-neutral-900 mb-4">{project.finalOutcome}</p>

              {project.deliverables && project.deliverables.length > 0 && (
                <div className="pt-3 border-t border-black/10">
                  <span className="font-mono text-[0.65rem] uppercase tracking-widest text-neutral-500 font-bold block mb-2">Project Deliverables:</span>
                  <div className="flex flex-wrap gap-2">
                    {project.deliverables.map((deliv, dIdx) => (
                      <span key={dIdx} className="font-mono text-[0.7rem] bg-[#F5F3EE] text-dark px-2.5 py-1 rounded border border-black/15">
                        ✓ {deliv}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═════════════════════════════════════════════
   MAIN HOMEPAGE COMPONENT
   ═════════════════════════════════════════════ */
export default function HomePage() {
  const [openProject, setOpenProject] = useState<string | null>(null);
  const [hoveredCluster, setHoveredCluster] = useState<string | null>(null);
  const [hoveredProjectSlug, setHoveredProjectSlug] = useState<string | null>(null);
  const [hoveredOverviewCluster, setHoveredOverviewCluster] = useState<string | null>(null);
  const folderRef = useRef<HTMLDivElement>(null);

  const activeProject = openProject ? PROJECTS_DATA[openProject] : null;
  const activeCluster = activeProject
    ? CLUSTERS.find((c) => c.projectSlugs.includes(openProject!))
    : null;

  // Scroll to top of page/folder when a project opens
  useEffect(() => {
    if (openProject) {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      const raf = requestAnimationFrame(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });

      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 50);

      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(timer);
      };
    }
  }, [openProject]);

  function handleClose() {
    setOpenProject(null);
    setHoveredCluster(null);
    setHoveredProjectSlug(null);
    setHoveredOverviewCluster(null);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "/");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, 50);
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }, 350);
    }
  }

  // Listen for navigation events from header/footer to return to folders
  useEffect(() => {
    const handleGoHome = () => {
      setOpenProject(null);
      setHoveredCluster(null);
      setHoveredProjectSlug(null);
      setHoveredOverviewCluster(null);
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", "/");
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    };

    const handleGoWork = () => {
      setOpenProject(null);
      setHoveredCluster(null);
      setHoveredProjectSlug(null);
      setHoveredOverviewCluster(null);
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", "/#work");
        setTimeout(() => {
          const el = folderRef.current || document.getElementById("work");
          el?.scrollIntoView({ behavior: "smooth" });
        }, 80);
      }
    };

    const handleHashChange = () => {
      if (window.location.hash === "#work") {
        handleGoWork();
      }
    };

    // If page is loaded or navigated to directly with /#work hash
    if (typeof window !== "undefined" && window.location.hash === "#work") {
      setTimeout(() => {
        const el = folderRef.current || document.getElementById("work");
        el?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }

    window.addEventListener("close-dossier-to-home", handleGoHome);
    window.addEventListener("close-dossier-to-work", handleGoWork);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("close-dossier-to-home", handleGoHome);
      window.removeEventListener("close-dossier-to-work", handleGoWork);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Get sibling projects in the same cluster
  function getSiblingTabs() {
    if (!activeCluster) return [];
    return activeCluster.projectSlugs.map((slug) => PROJECTS_DATA[slug]).filter(Boolean);
  }

  // Get next project across all projects
  function getNextProject(): CaseStudy | null {
    if (!activeProject?.nextSlug) return null;
    return PROJECTS_DATA[activeProject.nextSlug] || null;
  }

  return (
    <div className="relative min-h-screen bg-dark text-light">
      <div className="max-w-[1550px] mx-auto px-0 sm:px-6 md:px-8 lg:px-10">

        {/* ═══════ HERO SECTION ═══════ */}
        <AnimatePresence>
          {!openProject && (
            <motion.section
              key="hero"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
              className="pt-6 pb-4 sm:pt-8 sm:pb-6 md:pt-6 md:pb-6 lg:pt-8 lg:pb-8 px-4 sm:px-6 md:px-0"
            >
              <div className="space-y-4 max-w-6xl">
                <ExtrudedHeroHeading />
                {/* ── Mosby Subheading Glide Entrance (t = 0.9s, power4.out) ── */}
                <motion.p
                  initial={{ y: "2rem", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.65,
                    delay: 0.9,
                    ease: [0.165, 0.84, 0.44, 1],
                  }}
                  className="font-serif text-base md:text-xl text-muted leading-relaxed max-w-3xl italic"
                >
                  Product designer with an IT background. I design mobile apps, brand identities, and design systems, grounded by how code actually works in Flutter and React.
                </motion.p>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ═══════ CATEGORY RIBBONS + FOLDER TABS ═══════ */}
        <section id="work" ref={folderRef} className="scroll-mt-24 md:scroll-mt-28 w-full pt-2 sm:pt-4 md:pt-6">
          <AnimatePresence mode="wait">
            {!openProject ? (
              /* ─── INDEX VIEW: Authentic Mosby 3D Folder Stack ─── */
              <motion.div
                key="index"
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full pb-32"
              >
                <MosbyFolderStack
                  clusters={CLUSTERS}
                  projectsData={PROJECTS_DATA}
                  onSelectProject={(slug) => setOpenProject(slug)}
                />
              </motion.div>
            ) : (
              /* ─── OPEN FOLDER VIEW ─── */
              <motion.div
                key={`folder-${openProject}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="pb-32 pl-0 pr-3 sm:pr-6 md:px-0"
              >
                {/* Close / Back Button */}
                <div className="flex items-center justify-between mb-6 px-3 sm:px-6 md:px-0 relative z-30">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleClose();
                    }}
                    className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted hover:text-white transition-colors cursor-pointer py-2 pr-4 select-none focus:outline-none"
                    aria-label="Close dossier and return to index"
                  >
                    <X className="w-4 h-4 pointer-events-none" />
                    <span className="pointer-events-none">CLOSE DOSSIER // RETURN TO INDEX</span>
                  </button>
                  <span className="font-mono text-xs text-muted uppercase tracking-widest select-none">
                    {activeProject?.dossierNumber} // {activeProject?.year}
                  </span>
                </div>

                {/* Big project title (Mosby-style cropped title) */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mb-2 px-3 sm:px-6 md:px-0"
                >
                  <h2 className="font-display text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] leading-[0.82] uppercase tracking-tight text-light">
                    {activeProject?.title}
                  </h2>
                </motion.div>

                {/* Folder body: colored folder frame with paper card & right vertical tabs (Mosby style) */}
                <div className="relative flex items-stretch max-w-full pl-0">

                  {/* Center: Colored folder frame + White Paper card */}
                  <motion.div
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1 min-w-0 relative shadow-2xl rounded-l-md"
                    style={{ backgroundColor: activeCluster?.color }}
                  >
                    {/* Inner Paper Card Padding */}
                    <div className="p-2 sm:p-4 md:p-6">
                      {/* Top folder bar / header inside folder */}
                      <div className="flex items-center justify-between font-mono text-[0.62rem] sm:text-xs font-bold text-dark uppercase tracking-widest mb-3 px-2">
                        <span>FOLDER // {activeCluster?.title}</span>
                        <span>CONFIDENTIAL ARCHIVE</span>
                      </div>

                      {/* White / Cream Paper Card containing the Case Study content with punched holes on paper */}
                      {activeProject && <ProjectPaperCard project={activeProject} />}

                      {/* Technical stamps footer on paper frame */}
                      <div className="flex flex-wrap sm:flex-nowrap justify-between items-center text-dark pt-5 px-2 gap-2">
                        <DossierStamps />
                        <span className="font-mono text-[0.55rem] sm:text-[0.65rem] font-bold opacity-75 whitespace-nowrap shrink-0">
                          PAGE 01 / SCISSOR-CUT DOSSIER
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right: Vertical Staggered Tabs (Mosby style sticking out right edge on all screen sizes) */}
                  <div className="flex flex-col gap-2 pt-12 sm:pt-20 -ml-[1px] relative z-20 shrink-0">
                    {getSiblingTabs().map((tab) => (
                      <VerticalTab
                        key={tab.slug}
                        title={tab.title}
                        color={activeCluster?.color || "#4f46e5"}
                        categoryLabel={activeCluster?.tag || ""}
                        isActive={tab.slug === openProject}
                        onClick={() => setOpenProject(tab.slug)}
                      />
                    ))}
                  </div>

                </div>

                {/* Bottom Navigation — Next Project */}
                {getNextProject() && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 px-3 sm:px-6 md:px-0"
                  >
                    <div>
                      <span className="font-mono text-xs text-muted uppercase tracking-widest block mb-1">NEXT DOSSIER</span>
                      <h4 className="font-display text-3xl md:text-5xl uppercase text-light tracking-tight">{getNextProject()?.title}</h4>
                    </div>
                    <button
                      onClick={() => setOpenProject(getNextProject()!.slug)}
                      className="flex items-center gap-3 font-mono text-sm uppercase tracking-widest bg-white/10 hover:bg-white/20 text-light px-6 py-4 rounded-full transition-colors cursor-pointer"
                    >
                      <span>OPEN DOSSIER</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

              </motion.div>
            )}
          </AnimatePresence>
        </section>

      </div>
    </div>
  );
}
