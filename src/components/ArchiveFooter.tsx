import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ArchiveFooter() {
  return (
    <footer className="border-t border-neutral-800 bg-dark py-20 px-6 md:px-12 mt-32 text-light">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Left Column */}
        <div className="md:col-span-5 space-y-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-catYellow block">
              [ SCRAPBOOK INDEX // 2026 ]
            </span>
            <h3 className="font-display text-4xl md:text-5xl uppercase text-light tracking-tight mt-2">
              PRANAV EDVANKAR
            </h3>
            <p className="font-serif text-sm text-muted leading-relaxed max-w-prose mt-3">
              UI/UX Designer bridging user research, visual craft, and Flutter/React implementation. Tactile, research-driven digital dossiers.
            </p>
          </div>
        </div>

        {/* Center Column: Navigation */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-display text-lg uppercase tracking-wider text-light border-b border-neutral-800 pb-2">
            INDEX NAVIGATION
          </h4>
          <ul className="font-serif space-y-2 text-sm text-muted">
            <li>
              <Link href="/" className="hover:text-catYellow transition-colors">
                Index / Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-catYellow transition-colors">
                About & Philosophy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-catYellow transition-colors">
                Direct Contact
              </Link>
            </li>
            <li>
              <Link href="/work/qwikamp" className="hover:text-catYellow transition-colors">
                Case File: Qwikamp
              </Link>
            </li>
            <li>
              <Link href="/work/aurelle" className="hover:text-catYellow transition-colors">
                Case File: Aurelle
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Column: Direct Inquiries */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-display text-lg uppercase tracking-wider text-light border-b border-neutral-800 pb-2">
            DIRECT DISPATCH
          </h4>
          <p className="font-serif text-xs text-muted leading-relaxed">
            Open for select UI/UX product design contracts, enterprise research consultations, and design system engineering.
          </p>
          <div className="space-y-2 pt-2">
            <a
              href="mailto:pranavedvankar3@gmail.com"
              className="flex items-center justify-between p-3 border border-neutral-800 bg-neutral-900/50 hover:border-catYellow transition-all group"
            >
              <span className="font-mono text-xs text-light group-hover:text-catYellow">
                pranavedvankar3@gmail.com
              </span>
              <ArrowUpRight className="w-4 h-4 text-catYellow group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-neutral-800 mt-16 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-muted gap-4 font-mono">
        <span>© {new Date().getFullYear()} PRANAV EDVANKAR. ALL RIGHTS RESERVED.</span>
        <span className="uppercase tracking-widest text-[0.68rem]">
          DARK SCRAPBOOK DOSSIER // BUILT WITH NEXT.JS & TAILWIND
        </span>
      </div>
    </footer>
  );
}
