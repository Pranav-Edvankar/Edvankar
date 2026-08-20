"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CaseStudyRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();

  useEffect(() => {
    // Projects now open inline on the homepage — redirect there
    router.replace("/#work");
  }, [router]);

  return (
    <div className="min-h-screen bg-dark text-light flex items-center justify-center font-display text-2xl uppercase tracking-widest">
      <span className="text-muted">Redirecting to project archive…</span>
    </div>
  );
}
