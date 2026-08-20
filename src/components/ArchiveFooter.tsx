import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ArchiveFooter() {
  return (
    <footer className="border-t border-[#DCD7C9] bg-[#EFECE4]/50 py-16 px-6 md:px-12 mt-32 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 text-[#1A1A18]">
        {/* Left Column */}
        <div className="md:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <span className="archive-tag text-xs text-[#8C3A27]">
              [ DOSSIER CATALOGUE // 2026 ]
            </span>
            <h3 className="font-editorial text-3xl md:text-4xl mt-2 tracking-tight">
              Pranav Edvankar
            </h3>
            <p className="text-sm text-[#5E5D57] leading-relaxed mt-3 max-w-sm">
              UI/UX Designer bridging user research, visual craft, and Flutter/React implementation. Quiet, intentional digital solutions.
            </p>
          </div>
          <div className="archive-stamp inline-self-start text-[0.65rem] text-[#5E5D57]">
            CATALOGUE ID: PE-2026-ARCHIVE
          </div>
        </div>

        {/* Center Column: Index Navigation */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="archive-tag text-xs text-[#1A1A18] font-bold border-b border-[#DCD7C9] pb-2">
            NAVIGATION INDEX
          </h4>
          <ul className="space-y-2 text-sm text-[#5E5D57]">
            <li>
              <Link href="/" className="hover:text-[#8C3A27] transition-colors">
                Index / Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#8C3A27] transition-colors">
                About & Philosophy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#8C3A27] transition-colors">
                Transmissions / Contact
              </Link>
            </li>
            <li>
              <Link href="/work/qwikamp" className="hover:text-[#8C3A27] transition-colors">
                Case File: Qwikamp
              </Link>
            </li>
            <li>
              <Link href="/work/aurelle" className="hover:text-[#8C3A27] transition-colors">
                Case File: Aurelle
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Column: Direct Inquiries */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="archive-tag text-xs text-[#1A1A18] font-bold border-b border-[#DCD7C9] pb-2">
            DIRECT TRANSMISSION
          </h4>
          <p className="text-xs text-[#5E5D57] leading-relaxed">
            Open for select UI/UX product design contracts, enterprise research consultations, and design system engineering.
          </p>
          <div className="space-y-2 pt-2">
            <a
              href="mailto:pranavedvankar3@gmail.com"
              className="flex items-center justify-between p-3 border border-[#DCD7C9] bg-[#F5F3EE] hover:border-[#8C3A27] hover:bg-[#F5F3EE] transition-all group"
            >
              <span className="font-archive-mono text-xs font-medium text-[#1A1A18] group-hover:text-[#8C3A27]">
                pranavedvankar3@gmail.com
              </span>
              <ArrowUpRight className="w-4 h-4 text-[#8C3A27] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            
            <a
              href="https://linkedin.com/in/pranav-edvankar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 border border-[#DCD7C9] bg-[#F5F3EE] hover:border-[#8C3A27] transition-all group text-xs text-[#5E5D57]"
            >
              <span className="font-archive-mono group-hover:text-[#1A1A18]">
                linkedin.com/in/pranav-edvankar
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#5E5D57] group-hover:text-[#8C3A27]" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-[#DCD7C9] mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-[#7A786E] gap-4">
        <span>© {new Date().getFullYear()} PRANAV EDVANKAR. ALL RIGHTS RESERVED.</span>
        <span className="font-archive-mono text-[0.65rem]">
          DESIGNED IN THE SPIRIT OF ARCHIVAL DOSSIERS // BUILT WITH NEXT.JS & TAILWIND
        </span>
      </div>
    </footer>
  );
}
