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
  metadataBase: new URL("https://edvankar.vercel.app"),
  title: "Pranav Edvankar - Product Designer",
  description: "Pranav Edvankar Portfolio",
  openGraph: {
    title: "Pranav Edvankar - Product Designer",
    description: "Pranav Edvankar Portfolio",
    url: "https://edvankar.vercel.app",
    siteName: "Pranav Edvankar",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/pe-logo.png",
        width: 600,
        height: 600,
        alt: "Pranav Edvankar - PE Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Pranav Edvankar - Product Designer",
    description: "Pranav Edvankar Portfolio",
    images: ["/images/pe-logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
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
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <ArchiveFooter />
      </body>
    </html>
  );
}
