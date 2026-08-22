"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, X } from "lucide-react";
import { PROJECTS_DATA, CLUSTERS, CaseStudy } from "@/data/projects";
import { ExtrudedHeroHeading } from "@/components/ExtrudedHeroHeading";

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

/* ─── Scalloped Folder Tab (Horizontal) ─── */
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
  return (
    <motion.button
      whileHover={{ scaleY: 1.14, scaleX: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ transformOrigin: "bottom center" }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onMouseEnter={onMouseEnter}
      className="relative cursor-pointer focus:outline-none block group origin-bottom"
    >
      <svg
        className="w-[200px] h-[46px] md:w-[270px] md:h-[54px] drop-shadow-none block"
        viewBox="0 0 270 54"
        preserveAspectRatio="none"
      >
        <path
          d="M 0,54 L 0,20 Q 0,6 14,6 L 20,6 Q 28,6 28,0 L 242,0 Q 242,6 250,6 L 256,6 Q 270,6 270,20 L 270,54"
          fill={color}
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="1.5"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center px-4 pt-1 font-serif text-xs sm:text-sm md:text-base font-bold text-dark tracking-tight text-center select-none leading-tight">
        {title}
      </span>
    </motion.button>
  );
}

/* ─── Vertical Tab (Right Edge) ─── */
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
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: -8 }}
      transition={{ type: "spring", stiffness: 500, damping: 25 }}
      className="relative cursor-pointer focus:outline-none block w-16 md:w-20"
      style={{
        writingMode: "vertical-rl",
        backgroundColor: color,
        borderTopLeftRadius: "12px",
        borderBottomLeftRadius: "12px",
        borderRight: isActive ? "3px solid rgba(0,0,0,0.2)" : "none",
        boxShadow: isActive ? "-4px 0 20px rgba(0,0,0,0.3)" : "-2px 0 10px rgba(0,0,0,0.15)",
      }}
    >
      <div className="py-6 px-3 flex flex-col items-center gap-2 text-dark font-serif">
        <span className="text-sm md:text-base font-bold tracking-tight whitespace-nowrap">{title}</span>
        <span className="text-[0.6rem] font-mono uppercase tracking-widest opacity-60 whitespace-nowrap">{categoryLabel}</span>
      </div>
    </motion.button>
  );
}

/* ─── Scrapbook Phone Screen — renders a single phone mockup ─── */
function PhoneScreen({
  src, alt, caption, rotate, delay, className = "", zIndex = 1,
}: {
  src: string; alt: string; caption: string; rotate: number; delay: number; className?: string; zIndex?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${className}`}
      style={{ zIndex }}
    >
      {/* Phone bezel frame */}
      <div className="rounded-[2rem] bg-[#1a1a1a] p-[6px] shadow-2xl" style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.35), 0 8px 20px rgba(0,0,0,0.2)" }}>
        {/* Notch */}
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[60px] h-[18px] bg-[#1a1a1a] rounded-b-xl z-20" />
        <div className="rounded-[1.7rem] overflow-hidden bg-[#0B1120]">
          <div className="relative aspect-[9/19.5] w-full">
            <Image src={src} alt={alt} fill className="object-cover object-top" />
          </div>
        </div>
      </div>
      {/* Caption label */}
      <p className="font-mono text-[0.6rem] text-neutral-500 mt-3 text-center leading-tight px-2">{caption}</p>
    </motion.div>
  );
}

/* ─── Colored Scrapbook Info Card (Mosby style) ─── */
function ScrapbookInfoCard({
  title, caption, color, rotate, delay, className = "", hasClip = false,
}: {
  title: string; caption: string; color: string; rotate: number; delay: number; className?: string; hasClip?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay }}
      className={`p-5 md:p-6 shadow-xl border border-black/10 relative ${className}`}
      style={{ backgroundColor: color, color: "#0A0A0A" }}
    >
      {hasClip && <div className="absolute -top-5 -right-2 z-30"><Paperclip /></div>}
      <h4 className="font-display text-lg md:text-2xl uppercase tracking-tight leading-tight">{title}</h4>
      <p className="font-serif text-xs md:text-sm mt-2 leading-relaxed opacity-85">{caption}</p>
    </motion.div>
  );
}

/* ─── Project Detail Paper Card (Mosby Scrapbook Aesthetic) ─── */
function ProjectPaperCard({ project }: { project: CaseStudy }) {
  const isAppProject = project.flows.some((f) => f.imageAspect === "portrait");
  const color = project.categoryColor;

  return (
    <div className="bg-[#F5F3EE] text-dark relative shadow-2xl overflow-hidden">
      <div className="absolute -top-5 left-[12%] z-30"><Paperclip /></div>

      <div className="p-6 md:p-12 space-y-0">

        {/* ═══ HERO COVER — scattered phone collage for app projects ═══ */}
        {isAppProject ? (
          <div className="relative w-full mb-10" style={{ minHeight: "520px" }}>
            {/* Background bleed — category color wash */}
            <div className="absolute inset-x-0 top-8 bottom-20 -mx-12 rounded-sm" style={{ backgroundColor: color, opacity: 0.12 }} />

            {/* Scattered hero phones */}
            <div className="relative flex items-center justify-center gap-0 pt-4 pb-6">
              {project.flows[0]?.images.slice(0, 3).map((img, i) => {
                const rots = [-8, 0, 7];
                const offsets = ["-translate-x-6 translate-y-4", "z-10 scale-105", "translate-x-6 translate-y-6"];
                return (
                  <div key={i} className={`w-[140px] md:w-[185px] ${offsets[i] || ""}`}>
                    <PhoneScreen
                      src={img.src} alt={img.alt} caption="" rotate={rots[i] || 0} delay={0.15 * i}
                      zIndex={i === 1 ? 10 : 5}
                    />
                  </div>
                );
              })}
            </div>

            {/* Floating subtitle card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute bottom-0 right-4 md:right-10 max-w-xs bg-white/90 backdrop-blur-sm p-4 shadow-lg border border-black/10 rotate-1"
            >
              <p className="font-mono text-[0.6rem] uppercase tracking-widest opacity-50 mb-1">{project.dossierNumber}</p>
              <p className="font-serif text-sm text-neutral-800 leading-relaxed">{project.subtitle}</p>
            </motion.div>
          </div>
        ) : (
          <div className="relative aspect-[16/9] w-full overflow-hidden border border-black/20 shadow-lg -rotate-1 mb-10">
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
          // Alternating layout patterns for variety
          const pattern = idx % 5;

          if (!isPortrait) {
            // Non-portrait (landscape images) — original tilted card layout
            const rot = [-2, 3, -3, 2, -1][idx % 5];
            return (
              <div key={idx} className="relative mt-10 mb-16">
                <ScrapbookInfoCard title={flow.title} caption={flow.caption} color={color} rotate={rot} delay={0.1} className="max-w-md mb-6" hasClip={idx === 0} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {imgs.map((img, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? 2 : -3 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: 0.15 * (i + 1) }} className="bg-white p-3 shadow-xl border border-black/20">
                      <div className="relative aspect-[4/3] w-full overflow-hidden border border-black/10">
                        <Image src={img.src} alt={img.alt} fill className="object-cover" />
                      </div>
                      <p className="font-mono text-[0.65rem] text-neutral-600 mt-2 px-1">{img.caption}</p>
                    </motion.div>
                  ))}
                </div>
                <p className="font-serif text-base text-neutral-800 leading-relaxed max-w-2xl mt-6">{flow.description}</p>
              </div>
            );
          }

          /* ─── PORTRAIT / APP SCREEN LAYOUTS — 5 unique collage patterns ─── */
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
                            <PhoneScreen src={img.src} alt={img.alt} caption={img.caption} rotate={rots[i]} delay={0.2 + i * 0.12} zIndex={3 - i} />
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
                          <PhoneScreen src={img.src} alt={img.alt} caption={img.caption} rotate={i % 2 === 0 ? 3 : -2} delay={0.5 + i * 0.1} />
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
                            <PhoneScreen src={img.src} alt={img.alt} caption={img.caption} rotate={rots[i]} delay={0.1 + i * 0.1} zIndex={4 - i} />
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
                            <PhoneScreen src={img.src} alt={img.alt} caption={img.caption} rotate={rots[i]} delay={0.15 + i * 0.12} zIndex={3 - i} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {imgs.length > 3 && (
                    <div className="flex gap-4 mt-8 justify-start ml-4">
                      {imgs.slice(3).map((img, i) => (
                        <div key={i} className="w-[110px] md:w-[140px]">
                          <PhoneScreen src={img.src} alt={img.alt} caption={img.caption} rotate={i % 2 === 0 ? 4 : -3} delay={0.5 + i * 0.1} />
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
                          <PhoneScreen src={img.src} alt={img.alt} caption={img.caption} rotate={rots[i]} delay={0.15 + i * 0.1} zIndex={3 - i} />
                        </div>
                      );
                    })}
                    {imgs.length > 3 && (
                      <div className="absolute bottom-0 left-[10%] flex gap-3">
                        {imgs.slice(3).map((img, i) => (
                          <div key={i} className="w-[100px] md:w-[130px]">
                            <PhoneScreen src={img.src} alt={img.alt} caption={img.caption} rotate={i % 2 === 0 ? -3 : 4} delay={0.5 + i * 0.1} />
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
                      <PhoneScreen src={imgs[0]?.src || ""} alt={imgs[0]?.alt || ""} caption={imgs[0]?.caption || ""} rotate={-5} delay={0.1} zIndex={5} />
                    </div>
                    <ScrapbookInfoCard title={flow.title} caption={flow.caption} color={color} rotate={1} delay={0.25} className="max-w-xs md:-mx-4 z-10" hasClip />
                    <div className="w-[130px] md:w-[170px]">
                      <PhoneScreen src={imgs[1]?.src || ""} alt={imgs[1]?.alt || ""} caption={imgs[1]?.caption || ""} rotate={4} delay={0.2} zIndex={5} />
                    </div>
                  </div>
                  {imgs.length > 2 && (
                    <div className="flex justify-center gap-3 md:gap-5 mt-8">
                      {imgs.slice(2).map((img, i) => (
                        <div key={i} className="w-[105px] md:w-[140px]">
                          <PhoneScreen src={img.src} alt={img.alt} caption={img.caption} rotate={[3, -2, 4, -3][i % 4]} delay={0.4 + i * 0.1} />
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
                className="space-y-0 pb-32"
              >
                {CLUSTERS.map((cluster, clusterIdx) => {
                  const isHovered = hoveredCluster === cluster.id;
                  const isExpanded =
                    hoveredCluster !== null
                      ? isHovered
                      : clusterIdx === CLUSTERS.length - 1;
                  const zIndex = (clusterIdx + 1) * 10;

                  // Determine active project preview for expanded view
                  const activeSlug =
                    hoveredProjectSlug && cluster.projectSlugs.includes(hoveredProjectSlug)
                      ? hoveredProjectSlug
                      : cluster.projectSlugs[0];

                  const projectPreview = PROJECTS_DATA[activeSlug];

                  const isLastCluster = clusterIdx === CLUSTERS.length - 1;
                  const folderHeight = isExpanded
                    ? isLastCluster
                      ? "680px"
                      : "450px"
                    : "44px";

                  return (
                    <motion.div
                      key={cluster.id}
                      onMouseEnter={() => {
                        setHoveredCluster(cluster.id);
                        if (!hoveredProjectSlug || !cluster.projectSlugs.includes(hoveredProjectSlug)) {
                          setHoveredProjectSlug(cluster.projectSlugs[0]);
                        }
                      }}
                      onMouseLeave={() => {
                        setHoveredCluster(null);
                        setHoveredProjectSlug(null);
                      }}
                      animate={{ y: isHovered ? -3 : 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className={`relative cursor-pointer ${
                        clusterIdx > 0 ? "-mt-[44px] md:-mt-[52px]" : ""
                      }`}
                      style={{ zIndex }}
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
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* Folder Body (Mosby Dossier Layout) */}
                      <motion.div
                        onClick={() => setOpenProject(cluster.projectSlugs[0])}
                        animate={{
                          height: folderHeight,
                          paddingTop: isExpanded ? 24 : 10,
                          paddingBottom: isExpanded ? 28 : 10,
                        }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full relative overflow-hidden px-6 md:px-12 flex flex-col justify-start"
                        style={{
                          backgroundColor: cluster.color,
                          color: "#0A0A0A",
                          boxShadow: isExpanded
                            ? "0 14px 40px rgba(0,0,0,0.45)"
                            : "0 2px 10px rgba(0,0,0,0.2)",
                        }}
                      >
                        {/* Right-aligned category label header */}
                        <div className="flex items-center justify-end gap-2 font-mono text-xs md:text-sm font-bold uppercase tracking-widest opacity-90 h-6 shrink-0">
                          <span>{cluster.tag}</span>
                          <span className="text-sm font-extrabold">{isExpanded ? "∨" : "<"}</span>
                        </div>

                        {/* Category Overview Description on expansion */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.25 }}
                              className="mt-3 max-w-3xl flex flex-col justify-start"
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
                    style={{ backgroundColor: activeCluster?.color }}
                  >
                    {/* Paper card sitting inside the colored folder */}
                    <motion.div
                      initial={{ y: 80, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="m-3 md:m-6 relative"
                    >
                      <ProjectPaperCard project={activeProject!} />

                      {/* Next project button */}
                      {activeProject?.nextSlug && PROJECTS_DATA[activeProject.nextSlug] && (
                        <div className="flex justify-end p-6 pt-0">
                          <button
                            onClick={() => {
                              const nextSlug = activeProject!.nextSlug!;
                              setOpenProject(nextSlug);
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            className="inline-flex items-center gap-3 px-8 py-4 bg-catYellow hover:bg-catYellow/90 text-dark rounded-full font-serif text-lg font-bold shadow-xl transition-all transform hover:scale-105 cursor-pointer"
                          >
                            <span>Next: {PROJECTS_DATA[activeProject.nextSlug!].title} →</span>
                          </button>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>

                  {/* Right: Vertical tabs for sibling projects */}
                  <motion.div
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="hidden md:flex flex-col items-start gap-2 pt-16 -ml-1 relative z-10"
                  >
                    {getSiblingTabs().map((proj) => (
                      <VerticalTab
                        key={proj.slug}
                        title={proj.title}
                        color={proj.categoryColor}
                        categoryLabel={activeCluster?.tag || ""}
                        isActive={proj.slug === openProject}
                        onClick={() => setOpenProject(proj.slug)}
                      />
                    ))}

                    {/* Next project tab (different category) */}
                    {getNextProject() && !activeCluster?.projectSlugs.includes(getNextProject()!.slug) && (
                      <VerticalTab
                        title={getNextProject()!.title}
                        color={getNextProject()!.categoryColor}
                        categoryLabel={getNextProject()!.clusterLabel}
                        onClick={() => setOpenProject(getNextProject()!.slug)}
                      />
                    )}
                  </motion.div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </section>

      </div>
    </div>
  );
}
