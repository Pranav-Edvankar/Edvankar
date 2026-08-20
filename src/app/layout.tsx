import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ArchiveHeader } from "@/components/ArchiveHeader";
import { ArchiveFooter } from "@/components/ArchiveFooter";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pranav Edvankar — UI/UX Designer & Research Archive",
  description:
    "Personal design archive and portfolio of Pranav Edvankar. End-to-end product design, research-driven UX systems, and Flutter/React implementation.",
  keywords: [
    "Pranav Edvankar",
    "UI UX Designer",
    "Product Design Portfolio",
    "UX Research Archive",
    "Flutter Developer",
    "Design Systems",
    "Mumbai UX Designer"
  ],
  authors: [{ name: "Pranav Edvankar" }],
  openGraph: {
    title: "Pranav Edvankar — Research Archive & Dossier",
    description:
      "Quiet, intentional product design & research archive. Specializing in mobile apps, design systems, and financial interfaces.",
    type: "website",
    locale: "en_US",
    siteName: "Pranav Edvankar Archive"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F5F3EE] text-[#1A1A18]">
        <ArchiveHeader />
        <main className="flex-1 pt-24 md:pt-32">{children}</main>
        <ArchiveFooter />
      </body>
    </html>
  );
}
