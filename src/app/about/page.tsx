import Link from "next/link";
import { GraduationCap, Award, Palette, ShieldCheck, Code2 } from "lucide-react";

export const metadata = {
  title: "ABOUT & PHILOSOPHY — PRANAV EDVANKAR SCRAPBOOK",
  description:
    "Background, design philosophy, and technical credentials of Pranav Edvankar. BSc IT graduate (CGPI 9.62) & Google UX Design Certified.",
};

export default function AboutPage() {
  return (
    <article className="min-h-screen bg-dark text-light pb-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-16 pt-8">
        
        {/* Header */}
        <div className="space-y-4 border-b border-neutral-800 pb-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-3 py-1 border border-neutral-800 bg-neutral-900 text-light">
            <span>DOSSIER FILE // ABOUT & PHILOSOPHY</span>
          </div>
          <h1 className="font-display text-6xl sm:text-8xl md:text-[9rem] uppercase tracking-tight text-light leading-[0.88]">
            BIOGRAPHY & PHILOSOPHY
          </h1>
          <p className="font-serif italic text-xl md:text-3xl text-light font-normal">
            Research-informed UX grounded by real development mechanics.
          </p>
        </div>

        {/* Main Paper Card */}
        <div className="bg-paper-card p-8 md:p-14 text-dark space-y-10 shadow-2xl relative">
          
          <div className="space-y-4 font-serif text-base md:text-lg leading-relaxed text-neutral-900 max-w-prose">
            <span className="font-display text-xl uppercase tracking-wider text-dark block border-b border-black/20 pb-2">
              I. THE HYBRID EVOLUTION
            </span>
            <p>
              My path into user experience design wasn’t linear—it began at the intersection of logical code structures and human perception. While earning my Bachelor of Science in Information Technology at Thakur Ramnarayan College (graduating with a CGPI of 9.62), I spent countess hours building software applications. But I quickly realized that even the most elegant backend codebase fails if the interface confuses the human on the other side of the glass.
            </p>
            <p className="text-neutral-700">
              To formalize my methodology, I earned the Google UX Design Professional Certificate—grounding my technical background in rigorous user research, empathetic persona mapping, wireframing, and iterative usability testing.
            </p>
          </div>

          <div className="space-y-4 font-serif text-base md:text-lg leading-relaxed text-neutral-900 max-w-prose pt-6 border-t border-black/20">
            <span className="font-display text-xl uppercase tracking-wider text-dark block border-b border-black/20 pb-2">
              II. BRIDGING FIGMA CRAFT WITH FLUTTER & REACT REALITY
            </span>
            <p>
              Many design portfolios showcase pristine, abstract UI screens that collapse the moment an engineer attempts to build them. My core philosophy is that design must be <em>implementation-real</em>. Because I write Flutter, React, HTML5, CSS3, and JavaScript, I design with a structural awareness of state management, layout flexboxes, design tokens, and API data flows.
            </p>
          </div>

          {/* Academic & Professional Credentials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-black/20">
            <div className="p-5 border border-black/20 bg-black/5 space-y-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-catBlue" />
                <span className="font-display text-lg uppercase tracking-wider">ACADEMIC DEGREE</span>
              </div>
              <h4 className="font-serif text-xl font-bold">BSc Information Technology</h4>
              <p className="font-mono text-xs text-neutral-700">Thakur Ramnarayan College (CGPI: 9.62 / 10.0)</p>
            </div>

            <div className="p-5 border border-black/20 bg-black/5 space-y-2">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-catRed" />
                <span className="font-display text-lg uppercase tracking-wider">CERTIFICATION</span>
              </div>
              <h4 className="font-serif text-xl font-bold">Google UX Design Professional</h4>
              <p className="font-mono text-xs text-neutral-700">Google / Coursera Verified Credential</p>
            </div>
          </div>

        </div>

        {/* Skills Grid */}
        <section className="space-y-6">
          <h2 className="font-display text-4xl uppercase tracking-tight text-light">
            FILED COMPETENCIES & STACK
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-neutral-900 border border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
                <Palette className="w-4 h-4 text-catBlue" />
                <span className="font-display text-lg uppercase">DESIGN & RESEARCH</span>
              </div>
              <ul className="font-mono text-xs space-y-2 text-muted uppercase">
                <li>• User Research & Interviews</li>
                <li>• Wireframing & Prototyping</li>
                <li>• Information Architecture</li>
                <li>• Usability Testing</li>
              </ul>
            </div>

            <div className="p-6 bg-neutral-900 border border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
                <ShieldCheck className="w-4 h-4 text-catRed" />
                <span className="font-display text-lg uppercase">TOOLS & ECOSYSTEM</span>
              </div>
              <ul className="font-mono text-xs space-y-2 text-muted uppercase">
                <li>• Figma (Advanced Auto-Layout)</li>
                <li>• Adobe XD & Illustrator</li>
                <li>• Zeroheight & Design Tokens</li>
                <li>• Photoshop & Brand Mockups</li>
              </ul>
            </div>

            <div className="p-6 bg-neutral-900 border border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
                <Code2 className="w-4 h-4 text-white" />
                <span className="font-display text-lg uppercase">DEVELOPMENT FLUENCY</span>
              </div>
              <ul className="font-mono text-xs space-y-2 text-muted uppercase">
                <li>• Flutter & Dart (Mobile)</li>
                <li>• React & Next.js Frameworks</li>
                <li>• HTML5 / CSS3 / Tailwind</li>
                <li>• Firebase Auth & Firestore</li>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </article>
  );
}
