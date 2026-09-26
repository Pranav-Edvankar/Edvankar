"use client";

import React, { useEffect, useId, useState } from "react";

interface MermaidDiagramProps {
  chart: string;
  className?: string;
  caption?: string;
}

export function MermaidDiagram({ chart, className = "", caption }: MermaidDiagramProps) {
  const [svgContent, setSvgContent] = useState<string>("");
  const [showCode, setShowCode] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const rawId = useId();
  // Ensure valid DOM ID for Mermaid
  const chartId = `mermaid-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

  useEffect(() => {
    let isMounted = true;

    async function renderMermaid() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          securityLevel: "loose",
          themeVariables: {
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            fontSize: "12px",
            primaryColor: "#F4F1EA",
            primaryTextColor: "#171717",
            primaryBorderColor: "#171717",
            lineColor: "#404040",
            secondaryColor: "#E2E8F0",
            tertiaryColor: "#FFFFFF",
            noteBkgColor: "#FEF3C7",
            noteTextColor: "#78350F",
            actorBkg: "#F4F1EA",
            actorBorder: "#171717",
            actorTextColor: "#171717",
            signalColor: "#262626",
            signalTextColor: "#171717",
          },
        });

        // Clean up any stale elements with this ID before rendering
        const existingEl = document.getElementById(chartId);
        if (existingEl) {
          existingEl.remove();
        }

        const { svg } = await mermaid.render(chartId, chart.trim());
        if (isMounted) {
          setSvgContent(svg);
          setError(null);
        }
      } catch (err: any) {
        console.error("Mermaid rendering error:", err);
        if (isMounted) {
          setError(err?.message || "Failed to render Mermaid diagram");
        }
      }
    }

    renderMermaid();

    return () => {
      isMounted = false;
      const el = document.getElementById(chartId);
      if (el) el.remove();
    };
  }, [chart, chartId]);

  return (
    <div className={`w-full my-4 border-2 border-black/20 bg-white rounded-sm shadow-sm overflow-hidden ${className}`}>
      {/* Header Bar */}
      <div className="bg-[#F4F1EA] border-b border-black/15 px-3 py-2 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span className="font-bold text-neutral-800 uppercase tracking-wider text-[0.65rem]">
            {caption || "MERMAID DIAGRAM"}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setShowCode(!showCode)}
          className="text-[0.62rem] text-neutral-600 hover:text-neutral-950 font-bold uppercase tracking-wider underline cursor-pointer"
        >
          {showCode ? "Hide Mermaid Source" : "View Mermaid Source"}
        </button>
      </div>

      {/* Mermaid Raw Code Dropdown */}
      {showCode && (
        <div className="bg-neutral-900 text-neutral-100 p-3 border-b border-black/20 font-mono text-[0.7rem] overflow-x-auto">
          <pre>{chart.trim()}</pre>
        </div>
      )}

      {/* Rendered Diagram View */}
      <div className="p-4 sm:p-6 overflow-x-auto flex justify-center items-center bg-[#FAF9F6]">
        {error ? (
          <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs font-mono w-full">
            <div className="font-bold mb-1">Failed to render Mermaid syntax:</div>
            <pre className="text-[0.65rem] whitespace-pre-wrap">{error}</pre>
            <div className="mt-2 text-neutral-600">Raw Mermaid input:</div>
            <pre className="text-[0.65rem] bg-white p-2 border border-red-200 mt-1">{chart.trim()}</pre>
          </div>
        ) : svgContent ? (
          <div
            className="w-full flex justify-center [&>svg]:max-w-full [&>svg]:h-auto select-none"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        ) : (
          <div className="p-8 text-center font-mono text-xs text-neutral-500 animate-pulse">
            Rendering Mermaid Architecture Diagram...
          </div>
        )}
      </div>
    </div>
  );
}

export default MermaidDiagram;
