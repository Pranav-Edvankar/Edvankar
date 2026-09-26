"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface NavItemProps {
  name: string;
  href: string;
  isActive: boolean;
}

function ScrambleNavLink({ name, href, isActive }: NavItemProps) {
  const [displayText, setDisplayText] = useState(name);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    let step = 0;
    const letters = name.replace(/\s+/g, "").split("");
    const totalSteps = 6;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      step++;
      setDisplayText(
        name
          .split("")
          .map((targetChar, index) => {
            if (targetChar === " ") return " ";
            // Stagger each letter's smooth resolution from left to right
            const threshold = (index + 1) * 2;
            if (step >= threshold) {
              return targetChar;
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );

      if (step >= totalSteps + name.length * 2) {
        if (timerRef.current) clearInterval(timerRef.current);
        setDisplayText(name);
      }
    }, 65);
  }, [name]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setDisplayText(name);
  }, [name]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <Link
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`font-display text-base md:text-lg uppercase tracking-wider transition-colors inline-flex items-center select-none ${
        isActive ? "text-white" : "text-neutral-400 hover:text-white"
      }`}
    >
      <motion.span
        animate={{ y: isHovered ? -1 : 0 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="inline-flex tracking-wider"
      >
        {displayText.split("").map((char, i) => (
          <span
            key={i}
            className="inline-block min-w-[0.62em] text-center transition-opacity duration-150 ease-out"
          >
            {char}
          </span>
        ))}
      </motion.span>
    </Link>
  );
}

export function ArchiveHeader() {
  const pathname = usePathname();

  const navItems = [
    { name: "WORK", href: "/#work" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.65,
        delay: 0.1,
        ease: [0.33, 1, 0.68, 1],
      }}
      className="fixed top-0 left-0 right-0 z-50 bg-dark/95 backdrop-blur-md border-b border-neutral-800 py-4"
    >
      <div className="max-w-[1550px] mx-auto px-4 md:px-8 lg:px-10 flex items-center justify-between">
        {/* Left: Wordmark / Name */}
        <Link
          href="/"
          className="flex items-center gap-3 font-display text-2xl md:text-3xl uppercase tracking-tight text-light hover:text-white transition-colors"
        >
          <span>PRANAV EDVANKAR</span>
          <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted border-l border-neutral-700 pl-3 hidden sm:inline-block font-normal">
            PRODUCT DESIGNER
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
              <ScrambleNavLink
                key={item.name}
                name={item.name}
                href={item.href}
                isActive={isActive}
              />
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
}
