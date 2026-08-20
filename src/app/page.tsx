"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, FileText, ChevronRight, Sparkles, FolderArchive, Layers, Terminal } from "lucide-react";
import { PROJECTS_DATA, CLUSTERS } from "@/data/projects";

export default function HomePage() {
  const [activeHoverProject, setActiveHoverProject] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <div className="relative min-h-screen bg-[#F5F3EE] bg-archive-grid">
      {/* Background Archival Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-archive-dots" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        
        {/* ================= HERO SECTION ================= */}
        <section className="pt-8 pb-24 md:py-32 border-b border-[#DCD7C9] relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 max-w-5xl"
          >
            {/* Archive Taxonomy Header */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="archive-stamp archive-stamp-rust">
                DOSSIER REF // 2026-PE
              </span>
              <span className="archive-tag text-xs text-[#5E5D57]">
                [ CLASSIFIED: PUBLIC DESIGN ARCHIVE ]
              </span>
              <span className="archive-tag text-xs text-[#7A786E] border-l border-[#DCD7C9] pl-3 hidden sm:inline-block">
                FILE SIZE: 07 CASE RECORDS
              </span>
            </div>

            {/* Name Heading */}
            <div className="space-y-3">
              <h1 className="font-editorial text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] tracking-tight text-[#1A1A18] leading-[0.95]">
                Pranav Edvankar
              </h1>
              <p className="font-editorial italic text-2xl md:text-3xl text-[#8C3A27] font-normal tracking-tight pt-1">
                UI/UX Designer — end-to-end product design, from research to interface.
              </p>
            </div>

            {/* First Person Editorial Intro */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
              <div className="md:col-span-8 space-y-4 text-base md:text-lg text-[#1A1A18] leading-[1.7] font-normal">
                <p>
                  I blend research-informed UX with hands-on visual craft, grounded by a development background in Flutter and React that makes designs implementation-real.
                </p>
                <p className="text-[#5E5D57]">
                  Based in Mumbai, I structure complex digital products into calm, systematic, and intentional user experiences—stripping away visual noise to focus on core user mechanics and clear information architecture.
                </p>
              </div>

              {/* Dossier Quick Specs Box */}
              <div className="md:col-span-4 p-5 border border-[#DCD7C9] bg-[#EFECE4]/70 space-y-3 self-start">
                <div className="archive-tag text-[0.65rem] text-[#8C3A27] border-b border-[#DCD7C9] pb-1 font-bold flex justify-between items-center">
                  <span>SYSTEM METRICS</span>
                  <span>STATUS: ACTIVE</span>
                </div>
                <div className="space-y-2 text-xs font-archive-mono text-[#5E5D57]">
                  <div className="flex justify-between border-b border-[#E2DFC9] pb-1">
                    <span>DEGREE:</span>
                    <span className="text-[#1A1A18] font-medium">BSc IT (CGPI 9.62)</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E2DFC9] pb-1">
                    <span>CERT:</span>
                    <span className="text-[#1A1A18] font-medium">Google UX Design</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E2DFC9] pb-1">
                    <span>CORE:</span>
                    <span className="text-[#1A1A18] font-medium">Design & Dev Hybrid</span>
                  </div>
                  <div className="flex justify-between">
                    <span>FOCUS:</span>
                    <span className="text-[#8C3A27] font-medium">Enterprise & Mobile</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>


        {/* ================= THEMATIC CLUSTERS ================= */}
        <section id="work" className="py-24 space-y-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#DCD7C9] pb-6 gap-4">
            <div>
              <span className="archive-tag text-xs text-[#8C3A27]">
                [ ARCHIVE CLASSIFICATION // CATEGORY FILES ]
              </span>
              <h2 className="font-editorial text-4xl md:text-5xl tracking-tight text-[#1A1A18] mt-1">
                Thematic Work Clusters
              </h2>
            </div>
            <p className="text-xs font-archive-mono text-[#5E5D57] max-w-xs">
              Projects organized by architectural domain. Click any title to open the full dossier file.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-28 md:space-y-36"
          >
            {CLUSTERS.map((cluster, clusterIndex) => (
              <motion.div
                key={cluster.id}
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 border-b border-[#DCD7C9]/80 pb-20 relative group"
              >
                {/* Cluster Metadata Column */}
                <div className="md:col-span-5 space-y-4 pr-0 md:pr-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#8C3A27]" />
                    <span className="archive-tag text-xs text-[#8C3A27] font-semibold tracking-wider">
                      {cluster.tag}
                    </span>
                  </div>
                  <h3 className="font-editorial text-3xl md:text-4xl text-[#1A1A18] tracking-tight">
                    {cluster.title}
                  </h3>
                  <p className="text-sm md:text-base text-[#5E5D57] leading-relaxed font-normal">
                    {cluster.description}
                  </p>
                  <div className="archive-stamp text-[0.65rem] text-[#7A786E]">
                    CONTAINED DOSSIERS: {cluster.projectSlugs.length.toString().padStart(2, "0")}
                  </div>
                </div>

                {/* Project Clickable Text Links Column */}
                <div className="md:col-span-7 space-y-8 flex flex-col justify-center">
                  {cluster.projectSlugs.map((slug) => {
                    const project = PROJECTS_DATA[slug];
                    if (!project) return null;

                    const isHovered = activeHoverProject === slug;

                    return (
                      <div
                        key={slug}
                        onMouseEnter={() => setActiveHoverProject(slug)}
                        onMouseLeave={() => setActiveHoverProject(null)}
                        className="relative border-b border-[#DCD7C9] pb-6 last:border-b-0 transition-all"
                      >
                        <Link
                          href={`/work/${slug}`}
                          className="group/link block space-y-2"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-3">
                                <span className="archive-tag text-[0.65rem] text-[#8C3A27] font-bold">
                                  {project.dossierNumber}
                                </span>
                                <span className="archive-tag text-[0.65rem] text-[#7A786E]">
                                  // {project.year}
                                </span>
                              </div>
                              <h4 className="font-editorial text-2xl md:text-3xl text-[#1A1A18] group-hover/link:text-[#8C3A27] transition-colors tracking-tight flex items-center gap-2">
                                <span>{project.title}</span>
                                <ArrowUpRight className="w-5 h-5 text-[#8C3A27] opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all duration-300" />
                              </h4>
                            </div>

                            {/* Thumbnail Preview Badge */}
                            <div className="w-20 h-14 relative border border-[#DCD7C9] bg-[#EFECE4] overflow-hidden hidden sm:block shrink-0 group-hover/link:border-[#8C3A27] transition-colors">
                              <Image
                                src={project.coverImage}
                                alt={project.title}
                                fill
                                className="object-cover group-hover/link:scale-105 transition-transform duration-500"
                              />
                            </div>
                          </div>

                          <p className="text-xs md:text-sm text-[#5E5D57] group-hover/link:text-[#1A1A18] transition-colors max-w-xl">
                            {project.subtitle}
                          </p>

                          {/* Tools taxonomy tags */}
                          <div className="flex flex-wrap gap-2 pt-1">
                            {project.tools.slice(0, 4).map((tool) => (
                              <span
                                key={tool}
                                className="text-[0.65rem] font-archive-mono px-2 py-0.5 border border-[#E2DFC9] bg-[#EFECE4]/50 text-[#5E5D57]"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>


        {/* ================= ASYMMETRIC CLIPPINGS GRID STRIP ================= */}
        <section className="py-24 border-t border-[#DCD7C9] space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="archive-tag text-xs text-[#8C3A27]">
                [ EXHIBIT STRIP // CASE STUDY SCREENSHOTS ]
              </span>
              <h2 className="font-editorial text-4xl md:text-5xl tracking-tight text-[#1A1A18] mt-1">
                Archival Interface Clippings
              </h2>
            </div>
            <p className="text-xs font-archive-mono text-[#5E5D57]">
              Asymmetric layout of interface artifacts pinned to the drafting board.
            </p>
          </div>

          {/* Asymmetric Clipping Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Clipping 1: Large Featured Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-7 border border-[#DCD7C9] bg-[#EFECE4] p-4 relative group shadow-sm"
            >
              <div className="flex items-center justify-between border-b border-[#DCD7C9] pb-2 mb-3">
                <span className="archive-tag text-[0.65rem] text-[#8C3A27]">
                  CLIPPING 01 // QWIKAMP MOBILE DISPATCH
                </span>
                <span className="archive-stamp text-[0.6rem]">FIG. 01-A</span>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden border border-[#DCD7C9]">
                <Image
                  src="/images/qwikamp.png"
                  alt="Qwikamp App Screenshot"
                  fill
                  className="object-cover group-hover:scale-103 transition-transform duration-700"
                />
              </div>
              <div className="mt-3 flex justify-between items-center text-xs font-archive-mono text-[#5E5D57]">
                <span>Qwikamp Servicing & Dispatch Flow</span>
                <Link
                  href="/work/qwikamp"
                  className="text-[#8C3A27] hover:underline flex items-center gap-1"
                >
                  VIEW DOSSIER <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>

            {/* Clipping 2 & 3: Stacked Small Cutouts */}
            <div className="md:col-span-5 space-y-6">
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="border border-[#DCD7C9] bg-[#EFECE4] p-4 relative group shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-[#DCD7C9] pb-2 mb-3">
                  <span className="archive-tag text-[0.65rem] text-[#8C3A27]">
                    CLIPPING 02 // FINTECH WEALTH DASHBOARD
                  </span>
                  <span className="archive-stamp text-[0.6rem]">FIG. 02-B</span>
                </div>
                <div className="relative aspect-[16/9] overflow-hidden border border-[#DCD7C9]">
                  <Image
                    src="/images/fintech.png"
                    alt="FinTech Wealth Dashboard"
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                </div>
                <div className="mt-2 flex justify-between items-center text-xs font-archive-mono text-[#5E5D57]">
                  <span>Smart Vaults & Portfolio Summary</span>
                  <Link
                    href="/work/fintech-banking"
                    className="text-[#8C3A27] hover:underline flex items-center gap-1"
                  >
                    VIEW FILE <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="border border-[#DCD7C9] bg-[#EFECE4] p-4 relative group shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-[#DCD7C9] pb-2 mb-3">
                  <span className="archive-tag text-[0.65rem] text-[#8C3A27]">
                    CLIPPING 03 // AURELLE STOREFRONT
                  </span>
                  <span className="archive-stamp text-[0.6rem]">FIG. 03-C</span>
                </div>
                <div className="relative aspect-[16/9] overflow-hidden border border-[#DCD7C9]">
                  <Image
                    src="/images/aurelle.png"
                    alt="Aurelle Storefront Screenshot"
                    fill
                    className="object-cover group-hover:scale-103 transition-transform duration-700"
                  />
                </div>
                <div className="mt-2 flex justify-between items-center text-xs font-archive-mono text-[#5E5D57]">
                  <span>Editorial E-Commerce Homepage</span>
                  <Link
                    href="/work/aurelle"
                    className="text-[#8C3A27] hover:underline flex items-center gap-1"
                  >
                    VIEW FILE <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>

            </div>

            {/* Clipping 4: Offset Wide Research Matrix Strip */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="md:col-span-12 border border-[#DCD7C9] bg-[#EFECE4] p-5 relative group shadow-sm mt-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#DCD7C9] pb-3 mb-4 gap-2">
                <div className="flex items-center gap-3">
                  <span className="archive-tag text-[0.68rem] text-[#8C3A27]">
                    CLIPPING 04 // LLOYDS UX RESEARCH CANVAS & AFFINITY MAP
                  </span>
                  <span className="archive-stamp text-[0.6rem]">EXHIBIT 04-D</span>
                </div>
                <span className="archive-tag text-[0.62rem] text-[#7A786E]">
                  50-RESPONDENT SURVEY // COMPETITOR AUDIT MATRIX
                </span>
              </div>
              <div className="relative aspect-[21/9] overflow-hidden border border-[#DCD7C9]">
                <Image
                  src="/images/lloyds.png"
                  alt="Lloyds UX Research Canvas"
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-700"
                />
              </div>
              <div className="mt-3 flex justify-between items-center text-xs font-archive-mono text-[#5E5D57]">
                <span>Enterprise UX Research Dossier & Quantitative Survey Analysis</span>
                <Link
                  href="/work/lloyds-ux"
                  className="text-[#8C3A27] hover:underline flex items-center gap-1"
                >
                  FULL RESEARCH FILE <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ================= ARCHIVE INQUIRY BANNER ================= */}
        <section className="py-20 border-t border-[#DCD7C9] my-12 bg-[#EFECE4]/60 p-8 md:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <span className="archive-stamp archive-stamp-rust">
              [ TRANSMISSION INVITATION ]
            </span>
            <h2 className="font-editorial text-4xl md:text-5xl text-[#1A1A18] tracking-tight">
              Initiate a Design Collaboration
            </h2>
            <p className="text-base text-[#5E5D57] leading-relaxed">
              Whether you need end-to-end mobile product design, a scalable design system, or quantitative UX research synthesis—I am available for select contract design engagements.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/contact"
                className="archive-stamp archive-stamp-rust hover:bg-[#8C3A27] hover:text-white px-5 py-3 transition-all text-xs font-bold"
              >
                OPEN CONTACT DOSSIER
              </Link>
              <Link
                href="/about"
                className="px-5 py-3 border border-[#DCD7C9] bg-[#F5F3EE] hover:border-[#1A1A18] transition-all text-xs font-archive-mono text-[#1A1A18]"
              >
                READ BACKGROUND & PHILOSOPHY
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
