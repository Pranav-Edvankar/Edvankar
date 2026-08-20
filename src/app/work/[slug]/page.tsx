import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS_DATA, CaseStudy } from "@/data/projects";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, FileText, Layers, Tag } from "lucide-react";

export async function generateStaticParams() {
  return Object.keys(PROJECTS_DATA).map((slug) => ({
    slug,
  }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project: CaseStudy = PROJECTS_DATA[slug];

  if (!project) {
    notFound();
  }

  const prevProject = project.prevSlug ? PROJECTS_DATA[project.prevSlug] : null;
  const nextProject = project.nextSlug ? PROJECTS_DATA[project.nextSlug] : null;

  return (
    <article className="min-h-screen bg-[#F5F3EE] bg-archive-grid pb-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Back Link & Dossier Header */}
        <div className="space-y-6 pt-4 border-b border-[#DCD7C9] pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 archive-tag text-xs text-[#1A1A18] hover:text-[#8C3A27] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO WORK INDEX</span>
            </Link>
            <div className="flex items-center gap-3">
              <span className="archive-stamp archive-stamp-rust">
                {project.dossierNumber}
              </span>
              <span className="archive-tag text-xs text-[#7A786E]">
                FILED UNDER: {project.clusterLabel.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl text-[#1A1A18] tracking-tight leading-[0.98]">
              {project.title}
            </h1>
            <p className="font-editorial italic text-2xl md:text-3xl text-[#8C3A27]">
              {project.subtitle}
            </p>
          </div>
        </div>


        {/* ================= 1. COVER IMAGE ================= */}
        <div className="space-y-3">
          <div className="relative aspect-[16/9] w-full border border-[#DCD7C9] bg-[#EFECE4] overflow-hidden shadow-sm">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="flex justify-between items-center text-xs font-archive-mono text-[#5E5D57]">
            <span>EXHIBIT COVER // ARCHIVAL RENDERING</span>
            <span>YEAR: {project.year}</span>
          </div>
        </div>


        {/* ================= 2. SMALL-CAPS METADATA ROW ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 border border-[#DCD7C9] bg-[#EFECE4]/70">
          <div className="space-y-1">
            <span className="archive-tag text-[0.65rem] text-[#8C3A27] font-bold block">
              ROLE
            </span>
            <span className="text-sm font-medium text-[#1A1A18] block">
              {project.role}
            </span>
          </div>
          <div className="space-y-1">
            <span className="archive-tag text-[0.65rem] text-[#8C3A27] font-bold block">
              TYPE
            </span>
            <span className="text-sm font-medium text-[#1A1A18] block">
              {project.type}
            </span>
          </div>
          <div className="space-y-1">
            <span className="archive-tag text-[0.65rem] text-[#8C3A27] font-bold block">
              TIMELINE
            </span>
            <span className="text-sm font-medium text-[#1A1A18] block">
              {project.timeline}
            </span>
          </div>
          <div className="space-y-1">
            <span className="archive-tag text-[0.65rem] text-[#8C3A27] font-bold block">
              TOOLS
            </span>
            <span className="text-sm font-medium text-[#1A1A18] block">
              {project.tools.join(", ")}
            </span>
          </div>
        </div>


        {/* ================= 3. NARRATIVE PROSE SECTIONS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-6">
          
          {/* Main Editorial Narrative (2-3 Paragraphs) */}
          <div className="md:col-span-8 space-y-6 text-base md:text-lg text-[#1A1A18] leading-[1.7]">
            <h2 className="font-editorial text-3xl text-[#1A1A18] border-b border-[#DCD7C9] pb-3">
              Context & Narrative Record
            </h2>
            {project.overview.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </div>

          {/* Research & Problem Specs Sidebar */}
          <div className="md:col-span-4 space-y-6">
            <div className="p-5 border border-[#DCD7C9] bg-[#EFECE4]/80 space-y-4">
              <span className="archive-tag text-[0.65rem] text-[#8C3A27] font-bold block border-b border-[#DCD7C9] pb-2">
                PROBLEM DEFINITION
              </span>
              <p className="text-xs md:text-sm text-[#5E5D57] leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-5 border border-[#DCD7C9] bg-[#EFECE4]/80 space-y-4">
              <span className="archive-tag text-[0.65rem] text-[#8C3A27] font-bold block border-b border-[#DCD7C9] pb-2">
                SOLUTION ARCHITECTURE
              </span>
              <p className="text-xs md:text-sm text-[#5E5D57] leading-relaxed">
                {project.solutionNarrative}
              </p>
            </div>
          </div>
        </div>


        {/* Key Takeaways & Field Notes */}
        {project.keyInsights && project.keyInsights.length > 0 && (
          <div className="p-8 border border-[#DCD7C9] bg-[#EFECE4]/60 space-y-4 my-8">
            <div className="flex items-center gap-3 border-b border-[#DCD7C9] pb-3">
              <span className="archive-stamp archive-stamp-rust text-[0.65rem]">
                FIELD OBSERVATIONS
              </span>
              <span className="archive-tag text-xs text-[#5E5D57]">
                KEY DATA INSIGHTS & USABILITY FINDINGS
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {project.keyInsights.map((insight, idx) => (
                <div key={idx} className="space-y-2">
                  <span className="font-archive-mono text-xs text-[#8C3A27]">
                    0{idx + 1}.
                  </span>
                  <p className="text-sm text-[#1A1A18] leading-normal font-medium">
                    {insight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* ================= 4. SUB-SECTIONS PER SCREEN / FLOW ================= */}
        <section className="space-y-20 pt-8 border-t border-[#DCD7C9]">
          <div className="space-y-2">
            <span className="archive-tag text-xs text-[#8C3A27]">
              [ INTERFACE BREAKDOWN // FLOW EXHIBITS ]
            </span>
            <h2 className="font-editorial text-4xl text-[#1A1A18]">
              Screen & Workflow Catalog
            </h2>
          </div>

          <div className="space-y-24">
            {project.flows.map((flow, flowIdx) => (
              <div key={flowIdx} className="space-y-8 border-b border-[#DCD7C9] pb-16 last:border-b-0">
                {/* Flow Header */}
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#8C3A27]" />
                    <span className="archive-tag text-xs text-[#8C3A27]">
                      {flow.subtitle}
                    </span>
                  </div>
                  <h3 className="font-editorial text-3xl md:text-4xl text-[#1A1A18]">
                    {flow.title}
                  </h3>
                  <p className="text-base text-[#5E5D57] leading-relaxed pt-1">
                    {flow.caption}
                  </p>
                  <p className="text-xs font-archive-mono text-[#7A786E]">
                    {flow.description}
                  </p>
                </div>

                {/* Irregular / Asymmetric Flow Images */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {flow.images.map((img, imgIdx) => {
                    const colSpan =
                      img.size === "full"
                        ? "md:col-span-12"
                        : img.size === "half"
                        ? "md:col-span-6"
                        : img.size === "third"
                        ? "md:col-span-4"
                        : "md:col-span-6";

                    const aspectRatio =
                      img.size === "full"
                        ? "aspect-[16/9]"
                        : img.size === "portrait"
                        ? "aspect-[9/16]"
                        : "aspect-[4/3]";

                    return (
                      <div key={imgIdx} className={`${colSpan} space-y-2`}>
                        <div
                          className={`relative ${aspectRatio} w-full border border-[#DCD7C9] bg-[#EFECE4] overflow-hidden shadow-xs`}
                        >
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="font-archive-mono text-xs text-[#5E5D57] pt-1">
                          {img.caption}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* Deliverables Inventory */}
        {project.deliverables && (
          <section className="p-8 border border-[#DCD7C9] bg-[#EFECE4]/80 space-y-4">
            <span className="archive-tag text-xs text-[#8C3A27] font-bold block">
              FINAL ARCHIVAL DELIVERABLES
            </span>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-[#1A1A18] font-archive-mono">
              {project.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8C3A27] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}


        {/* ================= 5. PREV / NEXT FILE NAVIGATION ================= */}
        <nav className="border-t border-[#DCD7C9] pt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          {prevProject ? (
            <Link
              href={`/work/${prevProject.slug}`}
              className="group flex flex-col text-left space-y-1 w-full sm:w-auto p-4 border border-[#DCD7C9] bg-[#EFECE4]/50 hover:border-[#8C3A27] transition-all"
            >
              <span className="archive-tag text-[0.65rem] text-[#5E5D57] flex items-center gap-1">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                PREVIOUS CASE FILE
              </span>
              <span className="font-editorial text-xl text-[#1A1A18] group-hover:text-[#8C3A27] transition-colors">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/work/${nextProject.slug}`}
              className="group flex flex-col text-right sm:text-right space-y-1 w-full sm:w-auto p-4 border border-[#DCD7C9] bg-[#EFECE4]/50 hover:border-[#8C3A27] transition-all ml-auto"
            >
              <span className="archive-tag text-[0.65rem] text-[#5E5D57] flex items-center justify-end gap-1">
                NEXT CASE FILE
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="font-editorial text-xl text-[#1A1A18] group-hover:text-[#8C3A27] transition-colors">
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>

      </div>
    </article>
  );
}
