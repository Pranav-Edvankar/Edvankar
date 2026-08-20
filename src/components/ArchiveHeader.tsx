"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

export function ArchiveHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeString(now.toLocaleTimeString("en-US", options) + " IST");
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Work", href: "/#work" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F5F3EE]/90 backdrop-blur-md border-b border-[#DCD7C9] py-3 shadow-xs"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left: Wordmark / Dossier Title */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3"
          >
            <span className="font-editorial text-xl md:text-2xl font-medium tracking-tight text-[#1A1A18] group-hover:text-[#8C3A27] transition-colors">
              Pranav Edvankar
            </span>
            <span className="archive-tag text-[0.65rem] text-[#7A786E] border-l border-[#DCD7C9] pl-3 hidden sm:inline-block">
              RESEARCH ARCHIVE & DOSSIER
            </span>
          </Link>
        </div>

        {/* Center: Live Location Clock Badge (Hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-3 px-3 py-1 border border-[#DCD7C9] bg-[#EFECE4]/60 rounded-xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8C3A27] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8C3A27]"></span>
          </span>
          <span className="archive-tag text-[0.62rem] text-[#5E5D57]">
            MUMBAI, IN — {timeString || "12:00 IST"}
          </span>
        </div>

        {/* Right: Editorial Links */}
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
                className={`archive-tag text-xs tracking-widest relative transition-colors ${
                  isActive
                    ? "text-[#8C3A27] font-semibold"
                    : "text-[#1A1A18] hover:text-[#8C3A27]"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#8C3A27]" />
                )}
              </Link>
            );
          })}
          
          <a
            href="mailto:pranavedvankar3@gmail.com"
            className="hidden sm:inline-flex items-center gap-1 archive-stamp archive-stamp-rust hover:bg-[#8C3A27] hover:text-white transition-all text-[0.68rem]"
          >
            INQUIRE
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </nav>
      </div>
    </header>
  );
}
