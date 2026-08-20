"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function ArchiveHeader() {
  const pathname = usePathname();

  const navItems = [
    { name: "WORK", href: "/#work" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-md border-b border-neutral-800 py-4">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left: Wordmark / Name */}
        <Link
          href="/"
          className="flex items-center gap-3 font-display text-2xl md:text-3xl uppercase tracking-tight text-light hover:text-catYellow transition-colors"
        >
          <span>PRANAV EDVANKAR</span>
          <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted border-l border-neutral-700 pl-3 hidden sm:inline-block font-normal">
            SCRAPBOOK DOSSIER
          </span>
        </Link>

        {/* Right: Text links */}
        <nav className="flex items-center gap-6 md:gap-8">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`font-display text-base md:text-lg uppercase tracking-wider transition-colors relative ${
                  isActive
                    ? "text-catYellow"
                    : "text-light hover:text-catYellow"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-catYellow" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
