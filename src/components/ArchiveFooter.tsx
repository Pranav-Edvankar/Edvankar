import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ArchiveFooter() {
  return (
    <footer className="border-t border-neutral-800 bg-dark py-16 md:py-20 px-6 md:px-12 mt-32 text-light">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
        
        {/* Left Column */}
        <div className="md:col-span-5 space-y-4">
          <Link href="/" className="group inline-block">
            <h3 className="font-display text-4xl md:text-5xl uppercase text-light tracking-tight group-hover:text-white transition-colors">
              PRANAV EDVANKAR
            </h3>
          </Link>
          <p className="font-serif text-sm text-muted leading-relaxed max-w-prose">
            Product designer with an IT background. Building mobile apps, design systems, and brand identities with Flutter and React in mind.
          </p>
          <p className="font-mono text-xs text-neutral-400">
            Based in Mumbai, India
          </p>
        </div>

        {/* Center Column: Navigation */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-display text-lg uppercase tracking-wider text-light border-b border-neutral-800 pb-2">
            NAVIGATION
          </h4>
          <ul className="font-serif space-y-2.5 text-sm text-muted">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Work / Projects
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                About & Journey
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/pranav-edvankar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
              </a>
            </li>
          </ul>
        </div>

        {/* Right Column: Direct Inquiries */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-display text-lg uppercase tracking-wider text-light border-b border-neutral-800 pb-2">
            GET IN TOUCH
          </h4>
          <p className="font-serif text-xs text-muted leading-relaxed">
            Open to full-time product design roles, design systems work, and freelance projects.
          </p>
          <div className="space-y-2 pt-1">
            <a
              href="mailto:pranavedvankar3@gmail.com"
              className="flex items-center justify-between p-3 border border-neutral-800 bg-neutral-900/50 hover:border-white transition-all group"
            >
              <span className="font-mono text-xs text-light group-hover:text-white">
                pranavedvankar3@gmail.com
              </span>
              <ArrowUpRight className="w-4 h-4 text-light group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-neutral-800 mt-12 pt-6 flex items-center justify-center text-xs text-muted font-mono text-center">
        <p>© {new Date().getFullYear()} Pranav Edvankar</p>
      </div>
    </footer>
  );
}
