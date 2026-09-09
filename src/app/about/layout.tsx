import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ABOUT & PHILOSOPHY — PRANAV EDVANKAR SCRAPBOOK",
  description:
    "Background, design philosophy, and technical credentials of Pranav Edvankar. BSc IT graduate (CGPI 9.62) & Google UX Design Certified.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
