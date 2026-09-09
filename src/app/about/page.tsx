import Link from "next/link";
import { GraduationCap, Award, Palette, ShieldCheck, Code2 } from "lucide-react";

export const metadata = {
  title: "About & Journey // Pranav Edvankar",
  description:
    "The personal journey, background, and design philosophy of Pranav Edvankar. From building drone frames and studying IT to designing products at Lekeamp Mobility.",
};

export default function AboutPage() {
  return (
    <article className="min-h-screen bg-dark text-light pb-32">
      <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-16 pt-8">
        
        {/* Header */}
        <div className="space-y-4 border-b border-neutral-800 pb-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest px-3 py-1 border border-neutral-800 bg-neutral-900 text-light">
            <span>ABOUT // MY JOURNEY</span>
          </div>
          <h1 className="font-display text-6xl sm:text-8xl md:text-[9rem] uppercase tracking-tight text-light leading-[0.88]">
            MY PATH TO DESIGN
          </h1>
          <p className="font-serif italic text-xl md:text-3xl text-light font-normal">
            From building physical drone frames and writing code to designing products people actually use.
          </p>
        </div>

        {/* Main Paper Card */}
        <div className="bg-paper-card p-8 md:p-14 text-dark space-y-10 shadow-2xl relative">
          
          <div className="space-y-4 font-serif text-base md:text-lg leading-relaxed text-neutral-900 max-w-prose">
            <span className="font-display text-xl uppercase tracking-wider text-dark block border-b border-black/20 pb-2">
              I. FINDING THE FLOW STATE
            </span>
            <p>
              Whenever I sit down to design, I lose track of time. Hours slip by without me noticing, and I can stay locked into the work for as long as it takes. During my Information Technology degree at Thakur Ramnarayan College, I wrote plenty of code, but writing backend logic never gave me that feeling.
            </p>
            <p className="text-neutral-800">
              The first time I truly felt that creative pull was during a college project where we built a gesture-controlled drone from scratch. Beyond the sensors and code, I designed the drone frame itself, building three physical prototypes until the balance and structure worked. That project clarified something for me: I enjoyed shaping how things look, feel, and function much more than writing database queries.
            </p>
          </div>

          <div className="space-y-4 font-serif text-base md:text-lg leading-relaxed text-neutral-900 max-w-prose pt-6 border-t border-black/20">
            <span className="font-display text-xl uppercase tracking-wider text-dark block border-b border-black/20 pb-2">
              II. THE HARD QUESTION AFTER GRADUATION
            </span>
            <p>
              When I graduated with my BSc IT (finishing with a 9.62 CGPI), I had to make an honest decision about where to direct my career. Taking an ordinary software engineering role felt like the safe default, but my heart was clearly in design.
            </p>
            <p className="text-neutral-800">
              I committed eight months to completing the Google UX Design Professional Certificate. Going deep into user interviews, wireframing, information architecture, and usability testing confirmed what I felt during the drone build: product design was the work I wanted to do every single day.
            </p>
          </div>

          <div className="space-y-4 font-serif text-base md:text-lg leading-relaxed text-neutral-900 max-w-prose pt-6 border-t border-black/20">
            <span className="font-display text-xl uppercase tracking-wider text-dark block border-b border-black/20 pb-2">
              III. LESSONS FROM THE DEEP END
            </span>
            <p>
              Finishing course assignments is very different from designing inside a fast-moving company. During my UI/UX design internship at Lekeamp Mobility, I quickly discovered the gaps in my practical knowledge, and I had to learn fast on real projects like Nivora, Step Out, and Qwikamp.
            </p>
            <p className="text-neutral-800">
              Designing logos for Nivora and Step Out was particularly challenging because I had never created brand identities from scratch before. Translating stakeholder expectations into distinctive, balanced marks took multiple rounds of critique and adjustment.
            </p>
            <p className="text-neutral-800">
              On Qwikamp, earlier developers had used AI tools to quickly generate screens, which left the interface covered in disjointed purple gradients that completely clashed with the brand. I established a clear design system based on the company logo colors and rebuilt the layouts. I also noticed that users struggled to find the app core feature: doorstep servicing. To fix this, I made servicing accessible across three key touchpoints: a hero promotional banner, a 2x2 core feature grid right below the fold, and a permanent entry in the main navigation.
            </p>
          </div>

          <div className="space-y-4 font-serif text-base md:text-lg leading-relaxed text-neutral-900 max-w-prose pt-6 border-t border-black/20">
            <span className="font-display text-xl uppercase tracking-wider text-dark block border-b border-black/20 pb-2">
              IV. DESIGNING WITH CODE IN MIND
            </span>
            <p>
              Because I write Flutter, React, HTML, and CSS, I understand how layouts behave when they leave Figma. I don&apos;t design screens that look nice in isolation but fall apart when an engineer handles responsive breakpoints, component states, or API data loading. Knowing development mechanics keeps my design work practical, buildable, and respectful of engineering constraints.
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
              <p className="font-mono text-xs text-neutral-700">Google / Coursera Verified Credential (8 Months)</p>
            </div>
          </div>

        </div>

        {/* Skills Grid */}
        <section className="space-y-6">
          <h2 className="font-display text-4xl uppercase tracking-tight text-light">
            SKILLS & TOOLS
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
                <span className="font-display text-lg uppercase">TOOLS & SYSTEMS</span>
              </div>
              <ul className="font-mono text-xs space-y-2 text-muted uppercase">
                <li>• Figma (Components & Auto-Layout)</li>
                <li>• Adobe Illustrator & Photoshop</li>
                <li>• Design Systems & Tokens</li>
                <li>• Low & High Fidelity Mockups</li>
              </ul>
            </div>

            <div className="p-6 bg-neutral-900 border border-neutral-800 space-y-3">
              <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
                <Code2 className="w-4 h-4 text-white" />
                <span className="font-display text-lg uppercase">DEVELOPMENT</span>
              </div>
              <ul className="font-mono text-xs space-y-2 text-muted uppercase">
                <li>• Flutter & Dart</li>
                <li>• React & Next.js</li>
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
