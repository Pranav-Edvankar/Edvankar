import type { Metadata } from "next";
import { Anton, Lora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ArchiveHeader } from "@/components/ArchiveHeader";
import { ArchiveFooter } from "@/components/ArchiveFooter";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PRANAV EDVANKAR — UI/UX Designer Scrapbook & Dossier",
  description:
    "Dark-themed research archive & scrapbook dossier of Pranav Edvankar. Product design, enterprise research, and Flutter/React development.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${lora.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-dark text-light font-serif selection:bg-white selection:text-dark">
        <ArchiveHeader />
        <main className="flex-1 pt-20 md:pt-24">{children}</main>
        <ArchiveFooter />
      </body>
    </html>
  );
}
