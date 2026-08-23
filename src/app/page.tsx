"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, X } from "lucide-react";
import { PROJECTS_DATA, CLUSTERS, CaseStudy } from "@/data/projects";
import { ExtrudedHeroHeading } from "@/components/ExtrudedHeroHeading";

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

/* ─── Paperclip SVG ─── */
function Paperclip({ className = "" }: { className?: string }) {
  return (
    <svg className={`w-8 h-14 text-neutral-400 drop-shadow-lg ${className}`} viewBox="0 0 24 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 6v18a4 4 0 0 1-8 0V8a6 6 0 0 1 12 0v16a8 8 0 0 1-16 0V10" /></svg>
  );
}

/* ─── Dossier Technical Stamps / Compass SVGs ─── */
function DossierStamps() {
  return (
    <div className="flex items-center gap-6 md:gap-10 opacity-75 pt-10 select-none">
      {/* North Compass Arrow 1 */}
      <svg className="w-7 h-7 md:w-9 md:h-9 text-current" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="13" />
        <path d="M16 5 L20 16 L16 13 L12 16 Z" fill="currentColor" />
        <text x="14" y="9" fontSize="5" fontWeight="bold" fill="currentColor">N</text>
      </svg>
      {/* Stamp Dial 2 */}
      <svg className="w-7 h-7 md:w-9 md:h-9 text-current" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="12" strokeDasharray="2 2" />
        <polygon points="16,6 24,24 8,24" />
      </svg>
      {/* North Arrow 3 */}
      <svg className="w-7 h-7 md:w-9 md:h-9 text-current" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 26 L26 6" />
        <path d="M18 6 L26 6 L26 14" />
        <text x="8" y="14" fontSize="6" fontWeight="bold" fill="currentColor">N</text>
      </svg>
      {/* Grid Globe 4 */}
      <svg className="w-7 h-7 md:w-9 md:h-9 text-current" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="13" />
        <ellipse cx="16" cy="16" rx="6" ry="13" />
        <line x1="3" y1="16" x2="29" y2="16" />
      </svg>
      {/* Dial Wheel 5 */}
      <svg className="w-7 h-7 md:w-9 md:h-9 text-current" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="16" cy="16" r="12" />
        <line x1="4" y1="16" x2="28" y2="16" />
      </svg>
      {/* Drafting Compass 6 */}
      <svg className="w-7 h-7 md:w-9 md:h-9 text-current" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 4 L6 28 M16 4 L26 28" />
        <line x1="9" y1="20" x2="23" y2="20" />
        <circle cx="16" cy="4" r="2" fill="currentColor" />
      </svg>
      {/* Technical Stamp 7 */}
      <svg className="w-7 h-7 md:w-9 md:h-9 text-current" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
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
      className="relative cursor-pointer focus:outline-none block group"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onMouseEnter={onMouseEnter}
      style={{ isolation: "isolate" }}
    >
      {/* Flap Stage */}
      <div className="relative w-[200px] h-[46px] md:w-[270px] md:h-[54px]">
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
          <span className="absolute inset-0 flex items-center justify-center px-4 pt-1 font-serif text-xs sm:text-sm md:text-base font-bold text-dark tracking-tight text-center select-none leading-tight">
            {title}
          </span>
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
      </div>
    </div>
  );
}

/* ─── Vertical Tab (Right Edge) — 2D Fake-3D Peek ─── */
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
  const sharedRounded = { borderTopLeftRadius: "12px", borderBottomLeftRadius: "12px" };

  return (
    <div
      className="relative cursor-pointer block w-16 md:w-20"
      style={{ writingMode: "vertical-rl", isolation: "isolate" }}
      onClick={onClick}
    >
      {/* Flap Stage */}
      <div className="relative w-full h-full">
        {/* InsideFace — static dark underside, fully hidden at rest */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            ...sharedRounded,
            backgroundColor: darkColor,
            zIndex: 0,
          }}
          aria-hidden
        />

        {/* FrontFace — animates scaleX + skewY to fake left-edge hinge tilt */}
        <motion.div
          initial={false}
          whileHover={{ scaleX: 0.94, skewY: -2 }}
          transition={PEEK_TRANSITION_H}
          style={{
            ...sharedRounded,
            backgroundColor: color,
            borderRight: isActive ? "3px solid rgba(0,0,0,0.2)" : "none",
            transformOrigin: "left center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div className="py-6 px-3 flex flex-col items-center gap-2 text-dark font-serif">
            <span className="text-sm md:text-base font-bold tracking-tight whitespace-nowrap">{title}</span>
            <span className="text-[0.6rem] font-mono uppercase tracking-widest opacity-60 whitespace-nowrap">{categoryLabel}</span>
          </div>
          {/* Light-catching gradient overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.16 }}
            transition={PEEK_TRANSITION_H}
            style={{
              ...sharedRounded,
              background: "linear-gradient(to left, transparent 0%, rgba(0,0,0,0.7) 100%)",
            }}
            aria-hidden
          />
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
  rotate,
  delay,
  className = "",
  zIndex = 1,
  onExpand,
}: {
  src: string;
  alt: string;
  caption: string;
  rotate: number;
  delay: number;
  className?: string;
  zIndex?: number;
  onExpand?: (img: { src: string; alt: string; caption?: string }) => void;
}) {
  return (
    <motion.div
      drag
      dragElastic={0.15}
      whileDrag={{ scale: 1.08, zIndex: 50, cursor: "grabbing" }}
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{ zIndex }}
      onTap={() => onExpand?.({ src, alt, caption })}
    >
      {/* Sleek, clean paper bezel frame (no notch blocking the design) */}
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

/* ─── Colored Scrapbook Info Card (Mosby style - Draggable) ─── */
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
      drag
      dragElastic={0.15}
      whileDrag={{ scale: 1.05, zIndex: 50, cursor: "grabbing" }}
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay }}
      className={`p-5 md:p-6 shadow-xl border border-black/10 relative cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{ backgroundColor: color, color: "#0A0A0A" }}
    >
      {hasClip && <div className="absolute -top-5 -right-2 z-30 pointer-events-none"><Paperclip /></div>}
      <h4 className="font-display text-lg md:text-2xl uppercase tracking-tight leading-tight pointer-events-none">{title}</h4>
      <p className="font-serif text-xs md:text-sm mt-2 leading-relaxed opacity-85 pointer-events-none">{caption}</p>
    </motion.div>
  );
}

/* ─── Project Detail Paper Card (Mosby Scrapbook Aesthetic with Drag & Lightbox) ─── */
function ProjectPaperCard({ project }: { project: CaseStudy }) {
  const isAppProject = project.flows.some((f) => f.imageAspect === "portrait");
  const color = project.categoryColor;
  const [expandedImage, setExpandedImage] = useState<{ src: string; alt: string; caption?: string } | null>(null);

  return (
    <div className="bg-[#F5F3EE] text-dark relative shadow-2xl overflow-hidden">
      <div className="absolute -top-5 left-[12%] z-30 pointer-events-none"><Paperclip /></div>

      {/* Lightbox for expanding images */}
      <ImageLightbox image={expandedImage} onClose={() => setExpandedImage(null)} />

      <div className="p-6 md:p-12 space-y-0">

        {/* ═══ HERO COVER — scattered phone collage for app projects ═══ */}
        {isAppProject ? (
          <div className="relative w-full mb-10" style={{ minHeight: "520px" }}>
            {/* Background bleed — category color wash */}
            <div className="absolute inset-x-0 top-8 bottom-20 -mx-12 rounded-sm pointer-events-none" style={{ backgroundColor: color, opacity: 0.12 }} />

            {/* Scattered hero phones */}
            <div className="relative flex items-center justify-center gap-0 pt-4 pb-6">
              {project.flows[0]?.images.slice(0, 3).map((img, i) => {
                const rots = [-8, 0, 7];
                const offsets = ["-translate-x-6 translate-y-4", "z-10 scale-105", "translate-x-6 translate-y-6"];
                return (
                  <div key={i} className={`w-[140px] md:w-[185px] ${offsets[i] || ""}`}>
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

            {/* Floating subtitle card */}
            <motion.div
              drag
              dragElastic={0.15}
              whileDrag={{ scale: 1.05, zIndex: 50 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute bottom-0 right-4 md:right-10 max-w-xs bg-white/90 backdrop-blur-sm p-4 shadow-lg border border-black/10 rotate-1 cursor-grab active:cursor-grabbing select-none"
            >
              <p className="font-mono text-[0.6rem] uppercase tracking-widest opacity-50 mb-1 pointer-events-none">{project.dossierNumber}</p>
              <p className="font-serif text-sm text-neutral-800 leading-relaxed pointer-events-none">{project.subtitle}</p>
            </motion.div>
          </div>
        ) : (
          <div
            onClick={() => setExpandedImage({ src: project.coverImage, alt: project.title, caption: project.title })}
            className="relative aspect-[16/9] w-full overflow-hidden border border-black/20 shadow-lg -rotate-1 mb-10 cursor-pointer hover:opacity-95 transition-opacity"
          >
            <Image src={project.coverImage} alt={project.title} fill className="object-cover" priority />
          </div>
        )}

        {/* ═══ OVERVIEW PROSE ═══ */}
        <div className="font-serif text-lg md:text-xl leading-relaxed text-neutral-900 max-w-3xl mx-auto space-y-6 mb-12">
          {project.overview.map((para, i) => (
            <p key={i} className={i === 0 ? "first-letter:text-6xl first-letter:font-display first-letter:leading-none first-letter:float-left first-letter:mr-3 first-letter:mt-1" : ""}>
              {para}
            </p>
          ))}
        </div>

        {/* ═══ METADATA ═══ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 border border-black/15 bg-black/5 font-mono text-xs mb-14">
          <div><span className="font-bold block opacity-60">Role:</span><span className="font-serif text-sm font-semibold">{project.role}</span></div>
          <div><span className="font-bold block opacity-60">Type:</span><span className="font-serif text-sm font-semibold">{project.type}</span></div>
          <div><span className="font-bold block opacity-60">Timeline:</span><span className="font-serif text-sm font-semibold">{project.timeline}</span></div>
          <div><span className="font-bold block opacity-60">Tools:</span><span className="font-serif text-sm font-semibold">{project.tools.join(", ")}</span></div>
        </div>

        {/* ═══ FLOW SECTIONS — Mosby scrapbook collage layouts ═══ */}
        {project.flows.map((flow, idx) => {
          const isPortrait = flow.imageAspect === "portrait";
          const imgs = flow.images;
          const pattern = idx % 5;

          if (!isPortrait) {
            // Non-portrait (landscape images) — draggable cards with expand on click
            const rot = [-2, 3, -3, 2, -1][idx % 5];
            return (
              <div key={idx} className="relative mt-10 mb-16">
                <ScrapbookInfoCard title={flow.title} caption={flow.caption} color={color} rotate={rot} delay={0.1} className="max-w-md mb-6" hasClip={idx === 0} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {imgs.map((img, i) => (
                    <motion.div
                      key={i}
                      drag
                      dragElastic={0.15}
                      whileDrag={{ scale: 1.05, zIndex: 50, cursor: "grabbing" }}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? 2 : -3 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, delay: 0.15 * (i + 1) }}
                      className="bg-white p-3 shadow-xl border border-black/20 cursor-grab active:cursor-grabbing select-none"
                      onTap={() => setExpandedImage({ src: img.src, alt: img.alt, caption: img.caption })}
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

          /* ─── PORTRAIT / APP SCREEN LAYOUTS — 5 unique collage patterns with drag & expand ─── */
          return (
            <div key={idx} className="relative mt-6 mb-20">

              {pattern === 0 && (
                /* Pattern A: Info card left + staggered phone trio right, text below */
                <>
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <ScrapbookInfoCard title={flow.title} caption={flow.caption} color={color} rotate={-3} delay={0.1} className="md:w-[280px] shrink-0 md:mt-16 md:sticky md:top-20" hasClip />
                    <div className="flex-1 flex items-end justify-center gap-0 md:gap-2 flex-wrap relative" style={{ minHeight: "400px" }}>
                      {imgs.slice(0, 3).map((img, i) => {
                        const rots = [-6, 2, -4];
                        const yOff = [20, -10, 30];
                        return (
                          <div key={i} className="w-[120px] md:w-[160px]" style={{ transform: `translateY(${yOff[i]}px)` }}>
                            <PhoneScreen src={img.src} alt={img.alt} caption={img.caption} rotate={rots[i]} delay={0.2 + i * 0.12} zIndex={3 - i} onExpand={setExpandedImage} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* Remaining images as small pair below */}
                  {imgs.length > 3 && (
                    <div className="flex justify-end gap-4 mt-6 -mr-4 md:mr-0">
                      {imgs.slice(3).map((img, i) => (
                        <div key={i} className="w-[110px] md:w-[140px]">
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
                /* Pattern B: Full-width 4-phone spread with info card overlapping from bottom-left */
                <>
                  <div className="relative">
                    <div className="flex items-end justify-center gap-2 md:gap-4">
                      {imgs.slice(0, 4).map((img, i) => {
                        const rots = [4, -2, 3, -5];
                        const yOff = [10, -15, 5, 20];
                        return (
                          <div key={i} className="w-[100px] md:w-[150px]" style={{ transform: `translateY(${yOff[i]}px)` }}>
                            <PhoneScreen src={img.src} alt={img.alt} caption={img.caption} rotate={rots[i]} delay={0.1 + i * 0.1} zIndex={4 - i} onExpand={setExpandedImage} />
                          </div>
                        );
                      })}
                    </div>
                    {/* Overlapping info card */}
                    <ScrapbookInfoCard title={flow.title} caption={flow.caption} color={color} rotate={2} delay={0.5} className="md:absolute md:-bottom-10 md:left-0 max-w-sm mt-6 md:mt-0 z-20" />
                  </div>
                  <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="font-serif text-base text-neutral-800 leading-relaxed max-w-xl mt-16 md:ml-auto md:mr-8">
                    {flow.description}
                  </motion.p>
                </>
              )}

              {pattern === 2 && (
                /* Pattern C: Editorial — text left, stacked phones right with overlap */
                <>
                  <div className="flex flex-col-reverse md:flex-row gap-8 items-start">
                    <div className="md:w-[45%] space-y-6">
                      <ScrapbookInfoCard title={flow.title} caption={flow.caption} color={color} rotate={-2} delay={0.1} hasClip className="max-w-sm" />
                      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="font-serif text-base text-neutral-800 leading-relaxed">
                        {flow.description}
                      </motion.p>
                    </div>
                    <div className="md:w-[55%] relative flex items-start justify-center" style={{ minHeight: "450px" }}>
                      {imgs.slice(0, 3).map((img, i) => {
                        const positions = [
                          "absolute top-0 left-[5%]",
                          "absolute top-12 left-[30%]",
                          "absolute top-4 right-[5%]",
                        ];
                        const rots = [-5, 3, -3];
                        return (
                          <div key={i} className={`w-[130px] md:w-[155px] ${positions[i]}`}>
                            <PhoneScreen src={img.src} alt={img.alt} caption={img.caption} rotate={rots[i]} delay={0.15 + i * 0.12} zIndex={3 - i} onExpand={setExpandedImage} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {imgs.length > 3 && (
                    <div className="flex gap-4 mt-8 justify-start ml-4">
                      {imgs.slice(3).map((img, i) => (
                        <div key={i} className="w-[110px] md:w-[140px]">
                          <PhoneScreen src={img.src} alt={img.alt} caption={img.caption} rotate={i % 2 === 0 ? 4 : -3} delay={0.5 + i * 0.1} onExpand={setExpandedImage} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {pattern === 3 && (
                /* Pattern D: Wide scattered spread — 3 top + info card bottom-right + 2 smaller bottom-left */
                <>
                  <ScrapbookInfoCard title={flow.title} caption={flow.caption} color={color} rotate={3} delay={0.1} className="max-w-md mb-4" hasClip />
                  <div className="relative" style={{ minHeight: "480px" }}>
                    {imgs.slice(0, 3).map((img, i) => {
                      const positions = [
                        "absolute top-0 left-0",
                        "absolute top-6 left-[35%]",
                        "absolute top-0 right-0",
                      ];
                      const rots = [3, -4, 5];
                      return (
                        <div key={i} className={`w-[125px] md:w-[165px] ${positions[i]}`}>
                          <PhoneScreen src={img.src} alt={img.alt} caption={img.caption} rotate={rots[i]} delay={0.15 + i * 0.1} zIndex={3 - i} onExpand={setExpandedImage} />
                        </div>
                      );
                    })}
                    {imgs.length > 3 && (
                      <div className="absolute bottom-0 left-[10%] flex gap-3">
                        {imgs.slice(3).map((img, i) => (
                          <div key={i} className="w-[100px] md:w-[130px]">
                            <PhoneScreen src={img.src} alt={img.alt} caption={img.caption} rotate={i % 2 === 0 ? -3 : 4} delay={0.5 + i * 0.1} onExpand={setExpandedImage} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="font-serif text-base text-neutral-800 leading-relaxed max-w-2xl mt-6">
                    {flow.description}
                  </motion.p>
                </>
              )}

              {pattern === 4 && (
                /* Pattern E: Centered duo with info card sandwiched between, remaining below */
                <>
                  <div className="flex flex-col md:flex-row items-center gap-4 md:gap-0">
                    <div className="w-[130px] md:w-[170px]">
                      <PhoneScreen src={imgs[0]?.src || ""} alt={imgs[0]?.alt || ""} caption={imgs[0]?.caption || ""} rotate={-5} delay={0.1} zIndex={5} onExpand={setExpandedImage} />
                    </div>
                    <ScrapbookInfoCard title={flow.title} caption={flow.caption} color={color} rotate={1} delay={0.25} className="max-w-xs md:-mx-4 z-10" hasClip />
                    <div className="w-[130px] md:w-[170px]">
                      <PhoneScreen src={imgs[1]?.src || ""} alt={imgs[1]?.alt || ""} caption={imgs[1]?.caption || ""} rotate={4} delay={0.2} zIndex={5} onExpand={setExpandedImage} />
                    </div>
                  </div>
                  {imgs.length > 2 && (
                    <div className="flex justify-center gap-3 md:gap-5 mt-8">
                      {imgs.slice(2).map((img, i) => (
                        <div key={i} className="w-[105px] md:w-[140px]">
                          <PhoneScreen src={img.src} alt={img.alt} caption={img.caption} rotate={[3, -2, 4, -3][i % 4]} delay={0.4 + i * 0.1} onExpand={setExpandedImage} />
                        </div>
                      ))}
                    </div>
                  )}
                  <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="font-serif text-base text-neutral-800 leading-relaxed max-w-xl mx-auto mt-8 text-center">
                    {flow.description}
                  </motion.p>
                </>
              )}

            </div>
          );
        })}

        {/* ═══ KEY INSIGHTS ═══ */}
        {project.keyInsights && project.keyInsights.length > 0 && (
          <div className="border-t border-black/15 pt-8 space-y-4">
            <h4 className="font-display text-xl uppercase tracking-wider text-dark">KEY FINDINGS</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.keyInsights.map((insight, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20, rotate: 0 }} whileInView={{ opacity: 1, y: 0, rotate: [-1, 1.5, -0.5][i % 3] }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-4 border border-black/10 bg-black/5 shadow-md">
                  <span className="font-display text-lg text-dark">0{i + 1}.</span>
                  <p className="font-serif text-sm leading-relaxed mt-1 text-neutral-800">{insight}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
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

  // Scroll to top of folder when a project opens
  useEffect(() => {
    if (openProject && folderRef.current) {
      setTimeout(() => {
        folderRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    }
  }, [openProject]);

  function handleClose() {
    setOpenProject(null);
  }

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
    <div className="relative min-h-screen bg-dark text-light overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12">

        {/* ═══════ HERO SECTION ═══════ */}
        <AnimatePresence>
          {!openProject && (
            <motion.section
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
              className="pt-20 pb-16 md:pt-32 md:pb-24"
            >
              <div className="space-y-6 max-w-5xl">
                <ExtrudedHeroHeading />
                <p className="font-serif text-lg md:text-2xl text-muted leading-relaxed max-w-3xl italic">
                  A project exploring end-to-end product design, enterprise UX research, and scalable design systems — bridging Figma craft with Flutter & React development reality.
                </p>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ═══════ CATEGORY RIBBONS + FOLDER TABS ═══════ */}
        <section id="work" ref={folderRef} className={openProject ? "pt-4" : ""}>
          <AnimatePresence mode="wait">
            {!openProject ? (
              /* ─── INDEX VIEW: Stacked Ribbons ─── */
              <motion.div
                key="index"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onMouseLeave={() => {
                  setHoveredCluster(null);
                  setHoveredProjectSlug(null);
                  setHoveredOverviewCluster(null);
                }}
                className="space-y-0 pb-32"
              >
                {CLUSTERS.map((cluster, clusterIdx) => {
                  const isHovered = hoveredCluster === cluster.id;
                  const isLastCluster = clusterIdx === CLUSTERS.length - 1;
                  const isShowOverview = hoveredOverviewCluster === cluster.id;
                  const isHoveredTab = hoveredCluster === cluster.id && hoveredOverviewCluster === null;
                  const showOverviewText = isShowOverview || (hoveredCluster === null && isLastCluster);

                  const hoveredClusterIndex = CLUSTERS.findIndex((c) => c.id === hoveredCluster);
                  const isBelowHovered = hoveredClusterIndex !== -1 && clusterIdx > hoveredClusterIndex;

                  const isExpanded =
                    hoveredCluster !== null
                      ? isHovered
                      : isLastCluster;

                  const folderHeight = isShowOverview
                    ? (isLastCluster ? "680px" : "450px")
                    : (isLastCluster ? "680px" : "44px");

                  const zIndex = (clusterIdx + 1) * 10;

                  return (
                    <motion.div
                      key={cluster.id}
                      animate={{
                        y: isHovered ? -3 : 0,
                      }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className={`relative ${
                        clusterIdx > 0 ? "-mt-[48px] md:-mt-[56px]" : ""
                      }`}
                      style={{
                        zIndex,
                      }}
                    >
                      {/* Folder tabs sitting seamlessly on top edge with clean spacing */}
                      <div className="flex items-end pl-4 md:pl-10 -mb-[2px] relative z-10 gap-3 md:gap-5">
                        {cluster.projectSlugs.map((slug, idx) => {
                          const project = PROJECTS_DATA[slug];
                          if (!project) return null;
                          return (
                            <div
                              key={slug}
                              style={{
                                zIndex: cluster.projectSlugs.length - idx + 10,
                              }}
                            >
                              <FolderTabH
                                title={project.title}
                                color={cluster.color}
                                onClick={() => setOpenProject(slug)}
                                onMouseEnter={() => {
                                  setHoveredCluster(cluster.id);
                                  setHoveredProjectSlug(slug);
                                  setHoveredOverviewCluster(null);
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* Folder Body (Mosby Dossier Layout with 3D Tilt) */}
                      <motion.div
                        onMouseEnter={() => {
                          setHoveredCluster(cluster.id);
                          setHoveredOverviewCluster(cluster.id);
                          if (!hoveredProjectSlug || !cluster.projectSlugs.includes(hoveredProjectSlug)) {
                            setHoveredProjectSlug(cluster.projectSlugs[0]);
                          }
                        }}
                        onClick={() => setOpenProject(cluster.projectSlugs[0])}
                        animate={{
                          height: folderHeight,
                          paddingTop: isExpanded ? 24 : 10,
                          paddingBottom: isExpanded ? 28 : 10,
                        }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full relative overflow-hidden px-6 md:px-12 flex flex-col justify-start cursor-pointer rounded-t-sm"
                        style={{
                          backgroundColor: cluster.color,
                          color: "#0A0A0A",
                          boxShadow: isExpanded
                            ? "0 20px 45px rgba(0,0,0,0.4)"
                            : "none",
                        }}
                      >
                        {/* 2-Layer Folder Opening Illusion (Front Lip & Subtle Inner Crease) */}
                        <div className="absolute top-0 inset-x-0 h-full pointer-events-none overflow-hidden">
                          {/* Inner Folder Crease Shadow (Slightly Darker Tint of Folder Color) */}
                          <motion.div
                            initial={false}
                            animate={{
                              opacity: isHoveredTab ? 1 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-0 inset-x-0 h-4 z-0"
                            style={{
                              backgroundColor: cluster.color,
                              filter: "brightness(0.82)",
                            }}
                          />

                          {/* Layer 2: Front Folder Lip Layer (Sliding Down Seamlessly) */}
                          <motion.div
                            initial={false}
                            animate={{
                              y: isHoveredTab ? 10 : 0,
                            }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute top-0 inset-x-0 h-11 z-10"
                            style={{
                              backgroundColor: cluster.color,
                              filter: "brightness(0.96)",
                            }}
                          />
                        </div>

                        {/* Right-aligned category label header */}
                        <div className="flex items-center justify-end gap-2 font-mono text-xs md:text-sm font-bold uppercase tracking-widest opacity-90 h-6 shrink-0 group relative z-20">
                          <span>{cluster.tag}</span>
                          <span className="text-sm font-extrabold transition-transform group-hover:scale-125">
                            {showOverviewText ? "∨" : "<"}
                          </span>
                        </div>

                        {/* Category Overview Description on expansion */}
                        <AnimatePresence>
                          {showOverviewText && (
                            <motion.div
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.25 }}
                              className="mt-3 max-w-3xl flex flex-col justify-start relative z-20"
                            >
                              <p className="font-mono text-sm md:text-base leading-relaxed opacity-90 font-medium">
                                {cluster.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              /* ─── OPEN FOLDER VIEW ─── */
              <motion.div
                key={`folder-${openProject}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="pb-32"
              >
                {/* Close / Back Button */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={handleClose}
                    className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted hover:text-catYellow transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    <span>CLOSE DOSSIER — RETURN TO INDEX</span>
                  </button>
                  <span className="font-mono text-xs text-muted uppercase tracking-widest">
                    {activeProject?.dossierNumber} // {activeProject?.year}
                  </span>
                </div>

                {/* Big project title (Mosby-style cropped title) */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mb-2"
                >
                  <h2 className="font-display text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] leading-[0.82] uppercase tracking-tight text-light">
                    {activeProject?.title}
                  </h2>
                </motion.div>

                {/* Folder body: colored background + paper card + vertical tabs */}
                <div className="relative flex">

                  {/* Left: Dot markers / side rail */}
                  <div className="hidden md:flex flex-col items-center gap-10 pt-20 pr-4 relative z-10">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <div key={n} className="w-3.5 h-3.5 rounded-full shadow-md" style={{ backgroundColor: activeCluster?.color }} />
                    ))}
                    <div className="space-y-2 font-mono text-[0.6rem] text-muted uppercase tracking-widest mt-4">
                      <div><span className="font-bold">Role:</span></div>
                      <div className="text-light text-[0.55rem] max-w-[100px] leading-tight">{activeProject?.role}</div>
                      <div className="mt-3"><span className="font-bold">Timeline:</span></div>
                      <div className="text-light text-[0.55rem] max-w-[100px] leading-tight">{activeProject?.timeline}</div>
                    </div>
                  </div>

                  {/* Center: Colored folder background + Paper card */}
                  <motion.div
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1 relative"
                  >
                    {/* Colored Folder Frame */}
                    <div
                      className="p-3 sm:p-5 md:p-8 rounded-t-lg shadow-2xl relative"
                      style={{ backgroundColor: activeCluster?.color }}
                    >
                      {/* Top folder bar / header inside folder */}
                      <div className="flex items-center justify-between font-mono text-xs font-bold text-dark uppercase tracking-widest mb-4 px-2">
                        <span>FOLDER // {activeCluster?.title}</span>
                        <span>CONFIDENTIAL ARCHIVE</span>
                      </div>

                      {/* White / Cream Paper Card containing the Case Study content */}
                      {activeProject && <ProjectPaperCard project={activeProject} />}

                      {/* Technical stamps footer on paper frame */}
                      <div className="flex justify-between items-center text-dark pt-6 px-2">
                        <DossierStamps />
                        <span className="font-mono text-[0.65rem] opacity-75">PAGE 01 / SCISSOR-CUT DOSSIER</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right: Vertical Category Tabs for quick switching */}
                  <div className="hidden lg:flex flex-col gap-2 pt-28 -ml-1 relative z-20">
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
                    className="mt-20 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6"
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
