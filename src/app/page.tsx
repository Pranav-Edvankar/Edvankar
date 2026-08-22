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

/* ─── Project Detail Paper Card ─── */
function ProjectPaperCard({ project }: { project: CaseStudy }) {
  return (
    <div className="bg-[#F5F3EE] text-dark relative shadow-2xl">
      {/* Paperclip decoration */}
      <div className="absolute -top-5 left-[12%] z-30"><Paperclip /></div>

      <div className="p-8 md:p-14 space-y-12">
        {/* Cover Image */}
        <div className={`relative w-full overflow-hidden border border-black/20 shadow-lg -rotate-1 ${project.coverImage.includes('qwikamp')
            ? 'aspect-[16/9] bg-[#0B1120] flex items-center justify-center'
            : 'aspect-[16/9]'
          }`}>
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className={project.coverImage.includes('qwikamp') ? 'object-contain' : 'object-cover'}
            priority
          />
        </div>

        {/* Opening serif prose with a drop cap */}
        <div className="font-serif text-lg md:text-xl leading-relaxed text-neutral-900 max-w-3xl mx-auto space-y-6">
          {project.overview.map((para, i) => (
            <p key={i} className={i === 0 ? "first-letter:text-6xl first-letter:font-display first-letter:leading-none first-letter:float-left first-letter:mr-3 first-letter:mt-1" : ""}>
              {para}
            </p>
          ))}
        </div>

        {/* Metadata Box */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 border border-black/15 bg-black/5 font-mono text-xs">
          <div><span className="font-bold block opacity-60">Role:</span><span className="font-serif text-sm font-semibold">{project.role}</span></div>
          <div><span className="font-bold block opacity-60">Type:</span><span className="font-serif text-sm font-semibold">{project.type}</span></div>
          <div><span className="font-bold block opacity-60">Timeline:</span><span className="font-serif text-sm font-semibold">{project.timeline}</span></div>
          <div><span className="font-bold block opacity-60">Tools:</span><span className="font-serif text-sm font-semibold">{project.tools.join(", ")}</span></div>
        </div>

        {/* Scattered Flow Cards */}
        {project.flows.map((flow, idx) => {
          const rotations = [-2, 3, -3, 2, -1, 4];
          const rot = rotations[idx % rotations.length];
          const isPortrait = flow.imageAspect === "portrait";
          const hasThirds = flow.images.some((img) => img.size === "third");
          return (
            <div key={idx} className="relative mt-8">
              {/* Color info card */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: rot }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="p-6 shadow-xl border border-black/15 relative inline-block max-w-md mb-6"
                style={{ backgroundColor: project.categoryColor, color: "#0A0A0A" }}
              >
                {idx === 0 && <div className="absolute -top-5 -right-2 z-30"><Paperclip /></div>}
                <h4 className="font-display text-xl md:text-2xl uppercase tracking-tight">{flow.title}</h4>
                <p className="font-serif text-sm mt-2 leading-relaxed opacity-90">{flow.caption}</p>
              </motion.div>

              {/* Tilted photo cards — dynamic grid based on image sizes */}
              <div className={`grid gap-6 ${hasThirds
                  ? 'grid-cols-2 md:grid-cols-3'
                  : 'grid-cols-1 md:grid-cols-2'
                }`}>
                {flow.images.map((img, imgIdx) => {
                  const imgRot = isPortrait
                    ? (imgIdx % 2 === 0 ? 1 : -1.5)
                    : (imgIdx % 2 === 0 ? 2 : -3);
                  return (
                    <motion.div
                      key={imgIdx}
                      initial={{ opacity: 0, y: 30, rotate: 0 }}
                      whileInView={{ opacity: 1, y: 0, rotate: imgRot }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, delay: 0.15 * (imgIdx + 1) }}
                      className={`bg-white p-3 shadow-xl border border-black/20 ${isPortrait ? 'bg-gradient-to-b from-white to-neutral-50' : ''
                        }`}
                    >
                      <div className={`relative w-full overflow-hidden border border-black/10 ${isPortrait
                          ? 'aspect-[9/19]'
                          : 'aspect-[4/3]'
                        }`}>
                        <Image src={img.src} alt={img.alt} fill className={isPortrait ? 'object-contain' : 'object-cover'} />
                      </div>
                      <p className="font-mono text-[0.65rem] text-neutral-600 mt-2 px-1">{img.caption}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Description */}
              <p className="font-serif text-base text-neutral-800 leading-relaxed max-w-2xl mt-6">{flow.description}</p>
            </div>
          );
        })}

        {/* Key Insights */}
        {project.keyInsights && project.keyInsights.length > 0 && (
          <div className="border-t border-black/15 pt-8 space-y-4">
            <h4 className="font-display text-xl uppercase tracking-wider text-dark">KEY FINDINGS</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.keyInsights.map((insight, i) => (
                <div key={i} className="p-4 border border-black/10 bg-black/5">
                  <span className="font-display text-lg text-dark">0{i + 1}.</span>
                  <p className="font-serif text-sm leading-relaxed mt-1 text-neutral-800">{insight}</p>
                </div>
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
                      className={`relative cursor-pointer ${clusterIdx > 0 ? "-mt-[44px] md:-mt-[52px]" : ""
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
