import Link from "next/link";
import { ArrowUpRight, Award, GraduationCap, Code2, Palette, ShieldCheck, Download } from "lucide-react";

export const metadata = {
  title: "About & Philosophy — Pranav Edvankar Archive",
  description:
    "Background, design philosophy, and technical credentials of Pranav Edvankar. BSc IT graduate (CGPI 9.62) & Google UX Design Certified.",
};

export default function AboutPage() {
  return (
    <article className="min-h-screen bg-[#F5F3EE] bg-archive-grid pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="space-y-4 border-b border-[#DCD7C9] pb-8 pt-4">
          <div className="flex items-center gap-3">
            <span className="archive-stamp archive-stamp-rust">
              DOSSIER FILE // ABOUT & PHILOSOPHY
            </span>
            <span className="archive-tag text-xs text-[#7A786E]">
              LOCATION: MUMBAI, INDIA
            </span>
          </div>
          <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl text-[#1A1A18] tracking-tight leading-[0.95]">
            Biography & Design Philosophy
          </h1>
          <p className="font-editorial italic text-2xl text-[#8C3A27]">
            Research-informed UX grounded by real development mechanics.
          </p>
        </div>


        {/* First Person Long-Form Prose */}
        <div className="space-y-8 text-base md:text-lg text-[#1A1A18] leading-[1.75] font-normal">
          
          <div className="space-y-4">
            <span className="archive-tag text-xs text-[#8C3A27] font-bold block">
              I. THE HYBRID EVOLUTION
            </span>
            <p>
              My path into user experience design wasn’t linear—it began at the intersection of logical code structures and human perception. While earning my Bachelor of Science in Information Technology at Thakur Ramnarayan College (graduating with a CGPI of 9.62), I spent countess hours building software applications. But I quickly realized that even the most elegant backend codebase fails if the interface confuses the human on the other side of the glass.
            </p>
            <p className="text-[#5E5D57]">
              To formalize my methodology, I earned the Google UX Design Professional Certificate—grounding my technical background in rigorous user research, empathetic persona mapping, wireframing, and iterative usability testing.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#DCD7C9]">
            <span className="archive-tag text-xs text-[#8C3A27] font-bold block">
              II. BRIDGING FIGMA CRAFT WITH FLUTTER & REACT REALITY
            </span>
            <p>
              Many design portfolios showcase pristine, abstract UI screens that collapse the moment an engineer attempts to build them. My core philosophy is that design must be <em>implementation-real</em>. Because I write Flutter, React, HTML5, CSS3, and JavaScript, I design with a structural awareness of state management, layout flexboxes, design tokens, and API data flows.
            </p>
            <p className="text-[#5E5D57]">
              When I construct a Figma prototype or design system, I am not merely drawing shapes—I am engineering component logic, layout constraints, and micro-interactions that seamlessly transition into production repositories.
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#DCD7C9]">
            <span className="archive-tag text-xs text-[#8C3A27] font-bold block">
              III. THE ARCHIVAL METHODOLOGY
            </span>
            <p>
              Whether structuring a doorstep bicycle servicing app like Qwikamp, synthesizing 50 quantitative survey responses for a Lloyds Banking simulation, or crafting e-commerce storefronts like Aurelle, I treat every project as a research dossier. I believe digital interfaces should feel calm, quiet, and content-first—stripping away gratuitous visual gimmicks to illuminate core user utility.
            </p>
            <p className="font-editorial text-xl md:text-2xl text-[#8C3A27] italic pt-2 border-l-2 border-[#8C3A27] pl-4">
              "Great product design does not demand attention through noise; it earns trust through quiet clarity, structural precision, and frictionless utility."
            </p>
          </div>

        </div>


        {/* Academic & Professional Credentials Card */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border border-[#DCD7C9] bg-[#EFECE4]/70">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#8C3A27]" />
              <span className="archive-tag text-xs text-[#1A1A18] font-bold">
                ACADEMIC DEGREES
              </span>
            </div>
            <div>
              <h4 className="font-editorial text-xl text-[#1A1A18]">
                BSc Information Technology
              </h4>
              <p className="text-xs font-archive-mono text-[#5E5D57] mt-1">
                Thakur Ramnarayan College of Arts & Commerce
              </p>
              <div className="mt-2 inline-flex items-center gap-2 archive-stamp archive-stamp-rust text-[0.65rem]">
                CGPI: 9.62 / 10.0
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t md:border-t-0 md:border-l border-[#DCD7C9] pt-4 md:pt-0 md:pl-6">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#8C3A27]" />
              <span className="archive-tag text-xs text-[#1A1A18] font-bold">
                PROFESSIONAL CERTIFICATIONS
              </span>
            </div>
            <div>
              <h4 className="font-editorial text-xl text-[#1A1A18]">
                Google UX Design Certificate
              </h4>
              <p className="text-xs font-archive-mono text-[#5E5D57] mt-1">
                Google / Coursera Verified Professional Specialization
              </p>
              <div className="mt-2 inline-flex items-center gap-2 archive-stamp text-[0.65rem] text-[#7A786E]">
                STATUS: VERIFIED CREDENTIAL
              </div>
            </div>
          </div>
        </section>


        {/* ================= CREDENTIALS / SKILLS FILED LIST ================= */}
        <section className="space-y-6 border-t border-[#DCD7C9] pt-12">
          <div className="flex items-center justify-between border-b border-[#DCD7C9] pb-4">
            <div>
              <span className="archive-tag text-xs text-[#8C3A27]">
                [ ARCHIVAL INVENTORY // TECHNICAL CAPABILITIES ]
              </span>
              <h2 className="font-editorial text-3xl text-[#1A1A18] mt-1">
                Filed Credentials & Competencies
              </h2>
            </div>
            <span className="archive-stamp text-[0.65rem]">INDEX: SKILLS-01</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: Design Competencies */}
            <div className="p-5 border border-[#DCD7C9] bg-[#EFECE4] space-y-4">
              <div className="flex items-center gap-2 border-b border-[#DCD7C9] pb-2">
                <Palette className="w-4 h-4 text-[#8C3A27]" />
                <span className="archive-tag text-xs text-[#1A1A18] font-bold">
                  DESIGN & UX RESEARCH
                </span>
              </div>
              <ul className="space-y-2 text-xs font-archive-mono text-[#5E5D57]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8C3A27]" />
                  <span>User Research & Interviews</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8C3A27]" />
                  <span>Wireframing & Prototyping</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8C3A27]" />
                  <span>Information Architecture (IA)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8C3A27]" />
                  <span>Usability Testing & Analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8C3A27]" />
                  <span>Design Systems & Tokenization</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8C3A27]" />
                  <span>Human-Computer Interaction (HCI)</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Tools & Ecosystem */}
            <div className="p-5 border border-[#DCD7C9] bg-[#EFECE4] space-y-4">
              <div className="flex items-center gap-2 border-b border-[#DCD7C9] pb-2">
                <ShieldCheck className="w-4 h-4 text-[#8C3A27]" />
                <span className="archive-tag text-xs text-[#1A1A18] font-bold">
                  TOOLS & STACK
                </span>
              </div>
              <ul className="space-y-2 text-xs font-archive-mono text-[#5E5D57]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8C3A27]" />
                  <span>Figma (Advanced Auto-Layout)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8C3A27]" />
                  <span>Adobe XD & Illustrator</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8C3A27]" />
                  <span>Google AI Studio & Prompts</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8C3A27]" />
                  <span>Zeroheight & Design Docs</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8C3A27]" />
                  <span>Photoshop & Brand Mockups</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Frontend Development */}
            <div className="p-5 border border-[#DCD7C9] bg-[#EFECE4] space-y-4">
              <div className="flex items-center gap-2 border-b border-[#DCD7C9] pb-2">
                <Code2 className="w-4 h-4 text-[#8C3A27]" />
                <span className="archive-tag text-xs text-[#1A1A18] font-bold">
                  DEVELOPMENT FLUENCY
                </span>
              </div>
              <ul className="space-y-2 text-xs font-archive-mono text-[#5E5D57]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8C3A27]" />
                  <span>Flutter & Dart (Mobile Dev)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8C3A27]" />
                  <span>React & Next.js Frameworks</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8C3A27]" />
                  <span>HTML5 / Vanilla CSS / Tailwind</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8C3A27]" />
                  <span>JavaScript (ES6+)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8C3A27]" />
                  <span>Firebase Auth & Firestore</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#8C3A27]" />
                  <span>GitHub & Git Handoff</span>
                </li>
              </ul>
            </div>

          </div>
        </section>


        {/* Contact CTA */}
        <div className="p-8 border border-[#DCD7C9] bg-[#EFECE4]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h3 className="font-editorial text-2xl text-[#1A1A18]">
              Ready to examine a project together?
            </h3>
            <p className="text-xs font-archive-mono text-[#5E5D57] mt-1">
              Direct email response guaranteed within 24 hours.
            </p>
          </div>
          <Link
            href="/contact"
            className="archive-stamp archive-stamp-rust hover:bg-[#8C3A27] hover:text-white px-5 py-3 transition-all text-xs font-bold shrink-0"
          >
            DISPATCH INQUIRY
          </Link>
        </div>

      </div>
    </article>
  );
}
