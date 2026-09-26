"use client";

import React, { useState, useEffect } from "react";
import { CaseStudy } from "@/data/projects";
// import { DinoGame } from "./DinoGame";

interface ClusterData {
  id: string;
  tag: string;
  title: string;
  color: string;
  description: string;
  projectSlugs: string[];
}

interface MosbyFolderStackProps {
  clusters: ClusterData[];
  projectsData: Record<string, CaseStudy>;
  onSelectProject: (slug: string) => void;
}

// Exact Mosby SVG path for tangential S-curve folder tabs
const MOSBY_TAB_SVG_PATH =
  "M1.1449 -2.54901e-05L-521.145 -2.66006e-06C-531.065 -2.22644e-06 -540.343 4.90374 -545.932 13.0999L-558.55 31.6066C-563.837 39.3607 -572.615 44 -582 44L62 44C52.6151 44 43.8369 39.3607 38.5499 31.6066L25.9318 13.0999C20.3434 4.90373 11.0649 -2.59237e-05 1.1449 -2.54901e-05Z";

function getFolderTextColor(hexColor: string): string {
  // Use dark text for light/yellow/gold tones for 10/10 contrast
  const c = hexColor.toLowerCase();
  if (c === "#f4c430" || c === "#e5a910" || c === "#ffffff" || c === "#f59e0b") {
    return "#0A0A0A";
  }
  return "#FFFFFF";
}

export default function MosbyFolderStack({
  clusters,
  projectsData,
  onSelectProject,
}: MosbyFolderStackProps) {
  const [hoverGroupId, setHoverGroupId] = useState<number>(-1);
  const [hoverPageId, setHoverPageId] = useState<number>(-1);
  const [unfoldedGroupId, setUnfoldedGroupId] = useState<number>(-1);
  const [isEntering, setIsEntering] = useState(true);

  useEffect(() => {
    // 850ms matches the master timeline completion, then releases to full 3D interactive kinematics
    const timer = setTimeout(() => {
      setIsEntering(false);
    }, 850);
    return () => clearTimeout(timer);
  }, []);

  const stackLength = clusters.length;
  const isHovered = hoverGroupId !== -1;

  return (
    <div
      className={`mosby-stack ${isEntering ? "is-entering" : ""}`}
      style={{
        height: `calc(var(--stack-group-height-lg) + var(--stack-group-offset) * ${stackLength - 1})`,
      }}
      onMouseLeave={() => {
        setHoverGroupId(-1);
        setHoverPageId(-1);
        setUnfoldedGroupId(-1);
      }}
    >
      {clusters.map((cluster, groupId) => {
        const offsetMultiplier = stackLength - groupId - 1;
        const textColor = getFolderTextColor(cluster.color);

        const isLastGroup = groupId === stackLength - 1;
        const isCurrentUnfoldedGroup = unfoldedGroupId === groupId;
        // Default resting state: when mouse is away, the last group's summary is open by default
        const isDefaultOpen = unfoldedGroupId === -1 && hoverGroupId === -1 && isLastGroup;

        // Overview description & downward chevron are active ONLY when category header is hovered or default open
        const isCoverUnfolded = isCurrentUnfoldedGroup || isDefaultOpen;

        // When a category header is hovered, folders below it slide down to reveal the overview
        const isGroupPushed = unfoldedGroupId !== -1 && groupId > unfoldedGroupId;

        // Authentic Mosby Kinematics: When any folder tab in an earlier group is hovered, groups in front tilt back and sink 1rem
        const isGroupRotated = hoverGroupId !== -1 && unfoldedGroupId === -1 && groupId > hoverGroupId;

        const clusterProjects = cluster.projectSlugs
          .map((slug) => projectsData[slug])
          .filter(Boolean);

        const numPages = clusterProjects.length;
        const isThisGroupHovered = hoverGroupId === groupId;

        // Cover plate kinematics:
        // - Rotates back and sinks 1rem when ANY page in this cluster is hovered
        // - Also sinks 1rem on the last group (purple folder) whenever ANY group is hovered
        //   so that the purple folder sinks in sync with upper folders and covers the bottom edge 100%
        const isCoverRotated =
          (isThisGroupHovered && hoverPageId >= 0) ||
          (isLastGroup && hoverGroupId !== -1 && unfoldedGroupId === -1);
        // - Highlights with luminous specular overlay when the FRONT page (pageId 0) is hovered
        const isCoverHovered = isThisGroupHovered && hoverPageId === 0;

        return (
          <div
            key={cluster.id}
            className={`mosby-stack-group ${isGroupPushed ? "is-pushed-down" : ""} ${isGroupRotated ? "is-rotated" : ""
              } ${isCoverUnfolded ? "is-unfolded" : ""}`}
            style={
              {
                zIndex: groupId + 1,
                "--group-idx": groupId,
                "--offset-multiplier": offsetMultiplier,
              } as React.CSSProperties
            }
          >
            <div className="mosby-stack-group__inner">
              {/* ─── Stack Pages (One per project in this cluster) ─── */}
              {clusterProjects.map((project, pageId) => {
                const isThisPageHovered =
                  hoverGroupId === groupId && hoverPageId === pageId;
                // In Mosby: Preceding pages inside the active folder rotate back & sink 1rem
                // Also sink pages on last group when an earlier group is hovered
                const isPageRotated =
                  (hoverGroupId === groupId && hoverPageId !== -1 && pageId < hoverPageId) ||
                  (isLastGroup && hoverGroupId !== -1 && unfoldedGroupId === -1 && hoverGroupId < stackLength - 1);

                return (
                  <div
                    key={project.slug}
                    className={`mosby-stack-page ${isThisPageHovered ? "is-hovered" : ""
                      } ${isPageRotated ? "is-rotated" : ""}`}
                    style={{
                      // Natural stack layering: front page sits in front of back page
                      zIndex: numPages - pageId,
                    }}
                    onMouseEnter={() => {
                      setHoverGroupId(groupId);
                      setHoverPageId(pageId);
                      setUnfoldedGroupId(-1); // Tab hover stays in peeking mode
                    }}
                    onClick={() => onSelectProject(project.slug)}
                  >
                    {/* Page Solid Colored Body Plate */}
                    <div
                      className="mosby-stack-page__bg"
                      style={{ backgroundColor: cluster.color }}
                    />

                    {/* ─── Page Scalloped Tabs Header ─── */}
                    <div className="mosby-stack-page__header">
                      {clusterProjects.map((siblingProj, tabIdx) => {
                        // Only the tab corresponding to THIS page is visible
                        const isVisible = tabIdx === pageId;
                        const tabTextColor = getFolderTextColor(cluster.color);

                        return (
                          <div
                            key={siblingProj.slug}
                            className={`mosby-tag ${isVisible ? "is-visible" : ""}`}
                            style={
                              {
                                "--tag-bg": cluster.color,
                                "--tag-color": tabTextColor,
                              } as React.CSSProperties
                            }
                            onMouseEnter={(e) => {
                              e.stopPropagation();
                              setHoverGroupId(groupId);
                              setHoverPageId(tabIdx);
                              setUnfoldedGroupId(-1); // Tab hover stays in peeking mode
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectProject(siblingProj.slug);
                            }}
                          >
                            {/* Left Tangential Ear */}
                            <svg
                              className="mosby-tag__side mosby-tag__start"
                              viewBox="0 0 62 44"
                              preserveAspectRatio="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path
                                d={MOSBY_TAB_SVG_PATH}
                                fill="currentColor"
                              />
                            </svg>

                            {/* Middle Label */}
                            <div className="mosby-tag__middle">
                              <span className="hidden sm:inline">
                                {siblingProj.slug === "firmway" ? "Firmway" : siblingProj.title}
                              </span>
                              <span className="inline sm:hidden">
                                {siblingProj.slug === "fintech-banking"
                                  ? "FinTech"
                                  : siblingProj.slug === "lloyds-ux"
                                    ? "Lloyds UX"
                                    : siblingProj.slug === "firmway"
                                      ? "Firmway"
                                      : siblingProj.slug === "motion-graphic"
                                        ? "Motion"
                                        : siblingProj.slug === "gesture-drone"
                                          ? "Drone"
                                          : siblingProj.title}
                              </span>
                            </div>

                            {/* Right Tangential Ear */}
                            <svg
                              className="mosby-tag__side mosby-tag__end"
                              viewBox="0 0 62 44"
                              preserveAspectRatio="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path
                                d={MOSBY_TAB_SVG_PATH}
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                        );
                      })}
                    </div>

                    {/* Unfold trigger zone on right 33% of page */}
                    <div
                      className="mosby-stack-page__unfold-area"
                      onMouseEnter={() => {
                        setHoverGroupId(groupId);
                        setHoverPageId(pageId);
                        setUnfoldedGroupId(groupId);
                      }}
                      onMouseLeave={() => {
                        setUnfoldedGroupId(-1);
                      }}
                    />
                  </div>
                );
              })}

              {/* ─── Stack Cover Plate (Front Jacket Flap, Category Tag & Overview Description) ─── */}
              <div
                className={`mosby-stack-cover ${isCoverUnfolded ? "is-unfolded" : ""
                  } ${isCoverRotated ? "is-rotated" : ""} ${isCoverHovered ? "is-hovered" : ""
                  }`}
                style={
                  {
                    "--cover-bg": cluster.color,
                    color: textColor,
                    zIndex: numPages + 5,
                  } as React.CSSProperties
                }
              >
                {/* Category Overview Description (Visible when category header is hovered or default open) */}
                <div
                  className="mosby-cover__desc"
                  style={{
                    opacity: isCoverUnfolded ? 1 : 0,
                    pointerEvents: isCoverUnfolded ? "auto" : "none",
                    transform: isCoverUnfolded
                      ? "translateY(0)"
                      : "translateY(-8px)",
                  }}
                  onClick={() => onSelectProject(cluster.projectSlugs[0])}
                >
                  <p className="font-serif text-sm sm:text-base md:text-lg leading-relaxed font-medium opacity-95 max-w-2xl select-none">
                    {cluster.description}
                  </p>
                </div>

                {/* 100% Full-Width Dino Game at the Bottom of Lloyds Group Banking Simulation folder (Commented out)
                {isLastGroup && (
                  <div
                    className="absolute bottom-2 sm:bottom-4 left-0 right-0 w-full px-3 sm:px-6 md:px-10 pointer-events-auto z-30 transition-all duration-300"
                    style={{
                      opacity: isCoverUnfolded ? 1 : 0,
                      pointerEvents: isCoverUnfolded ? "auto" : "none",
                      transform: isCoverUnfolded ? "translateY(0)" : "translateY(12px)",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DinoGame themeColor="#FFFFFF" textColor="#FFFFFF" className="w-full" />
                  </div>
                )}
                */}

                {/* Right Category Label & Chevron Arrow (Desktop only) */}
                <div
                  className="mosby-cover__category hidden md:inline-flex cursor-pointer pointer-events-auto"
                  style={{ color: textColor }}
                  onMouseEnter={(e) => {
                    e.stopPropagation();
                    setHoverGroupId(groupId);
                    setHoverPageId(0);
                    setUnfoldedGroupId(groupId);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProject(cluster.projectSlugs[0]);
                  }}
                >
                  <span>{cluster.tag}</span>
                  <span className="mosby-cover__category-arrow text-base font-bold">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M2.5 3.75L6.17542 8.25L9.5 3.75"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
