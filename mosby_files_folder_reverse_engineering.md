# 🗂️ Mosby's Files — Folder Interaction System: Full Reverse Engineering

> A complete technical breakdown of how [mosbyfiles.com](https://www.mosbyfiles.com/) creates the folder/filing cabinet illusion — from the stacked tabs on the homepage to the full folder-open page transition. Built by **Tubik Studio**.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Tech Stack](#2-tech-stack)
3. [The Mental Model](#3-the-mental-model)
4. [CSS Custom Properties (Design Tokens)](#4-css-custom-properties-design-tokens)
5. [Component Hierarchy](#5-component-hierarchy)
6. [Phase 1 — The Stack (Resting State)](#6-phase-1--the-stack-resting-state)
7. [Phase 2 — Hover (The "Peek" Illusion)](#7-phase-2--hover-the-peek-illusion)
8. [Phase 3 — Click (Separation + Route Transition)](#8-phase-3--click-separation--route-transition)
9. [Phase 4 — The Open Folder (Case Page)](#9-phase-4--the-open-folder-case-page)
10. [The Folder Tab (`.tag`) — SVG Anatomy](#10-the-folder-tab-tag--svg-anatomy)
11. [Color Palette & Typography](#11-color-palette--typography)
12. [Easing & Animation Timing](#12-easing--animation-timing)
13. [Responsive Behavior](#13-responsive-behavior)
14. [Reproduce-Anywhere Cheat Sheet](#14-reproduce-anywhere-cheat-sheet)

---

## 1. Architecture Overview

The entire interaction can be understood as a **physical filing cabinet metaphor** rendered with CSS 3D transforms and Vue/Nuxt page transitions:

```
┌─────────────────────────────────────────────┐
│ Homepage (.page-home)                       │
│                                             │
│   ┌─────────────────────────────────────┐   │
│   │ .stack  (perspective: 3000px)       │   │
│   │                                     │   │
│   │   ┌─ .stack-group [z:3] ──────────┐ │   │
│   │   │  .stack-cover (frontmost)      │ │   │
│   │   │  .stack-page  (Mary Colter)    │ │   │
│   │   │  .stack-page  (Louis Sullivan) │ │   │
│   │   └───────────────────────────────┘ │   │
│   │                                     │   │
│   │   ┌─ .stack-group [z:2] ──────────┐ │   │
│   │   │  .stack-cover                  │ │   │
│   │   │  .stack-page  (Louis Kahn)     │ │   │
│   │   │  .stack-page  (I.M. Pei)       │ │   │
│   │   │  .stack-page  (Paul Rudolph)   │ │   │
│   │   └───────────────────────────────┘ │   │
│   │                                     │   │
│   │   ┌─ .stack-group [z:1] ──────────┐ │   │
│   │   │  .stack-cover                  │ │   │
│   │   │  .stack-page  (Frank Gehry)    │ │   │
│   │   └───────────────────────────────┘ │   │
│   │                                     │   │
│   │   ┌─ .stack-group [z:0] ──────────┐ │   │
│   │   │  .stack-cover                  │ │   │
│   │   │  .stack-page  (FLW)            │ │   │
│   │   │  .stack-page  (Irving Gill)    │ │   │
│   │   └───────────────────────────────┘ │   │
│   └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

The **groups are stacked bottom-up** using `position: absolute; bottom: 0`, each group offset vertically by `--stack-group-offset` multiplied by its position. The frontmost group (highest z-index) sits at the top of the visual stack.

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Nuxt 3 (Vue 3 + SSR) |
| **Routing** | Vue Router (file-based via Nuxt) |
| **Animation** | CSS transitions + GSAP (for scroll-triggered character animations) |
| **Smooth Scroll** | Lenis |
| **CMS** | Storyblok |
| **Fonts** | `Signifier` (serif, custom), `Founders Grotesk X Condensed Bold` (headings, custom), `IBM Plex Mono` (captions, Google Fonts) |
| **Deployment** | Vercel |

---

## 3. The Mental Model

Think of a **physical hanging file folder system**:

1. **Stack (Resting)**: Folders are stacked on top of each other. You can only see the **tab labels** peeking above each folder.
2. **Hover ("Peek")**: When you hover over a tab, the folder above **tilts backward slightly** (3D rotation on X-axis), revealing a sliver of the folder below — like lifting a folder to peek.
3. **Click (Open)**: The stack separates, the selected folder gains space, and then the **folder cover flips open** (3D Y-axis rotation), revealing its interior contents.
4. **Interior (Case Page)**: Inside is a realistic folder — colored interior, a white "document sheet" with a binder clip column, notes, photos, and a scrapbook layout.

---

## 4. CSS Custom Properties (Design Tokens)

These are the core variables that control the entire system. Copy these exactly:

```css
:root {
  /* ─── Folder Stack ─── */
  --stack-border-radius: 4px;
  --stack-group-height-sm: 20vw;        /* collapsed height */
  --stack-group-height-lg: 80vh;        /* expanded height */
  --stack-group-offset: 3.75rem;        /* vertical gap between stacked groups */
  --stack-perspective: 3000px;          /* 3D perspective depth */
  --stack-rotation-angle: -3deg;        /* tilt angle on hover */
  --stack-rotation-offset: 1rem;        /* vertical shift when tilted */
  --stack-shadow: 0 -1px 8px rgba(0,0,0,.15);

  /* ─── Folder (Open State) ─── */
  --folder-shadow: 1px 0 8px rgba(0,0,0,.15);
  --folder-offset: 65vh;

  /* ─── Tabs ─── */
  --tag-height: 2.75rem;
  --tag-aspect-ratio: 1.409;            /* width/height of the curved tab ends */

  /* ─── Colors ─── */
  --color-light: #fdfaf7;
  --color-gray: #787a7f;
  --color-dark: #191919;
}
```

### Responsive overrides:

```css
@media (max-aspect-ratio: 2/1)  { --stack-group-height-sm: 15vw; }
@media (max-width: 1024px)      { --stack-group-height-sm: 20vh; }
@media (max-width: 768px)       { --tag-height: 2.25rem; }
@media (max-width: 480px)       { --stack-group-height-sm: 15vh; }
```

---

## 5. Component Hierarchy

```
.stack                          ← Main container, sets perspective
├── .stack-group                ← One per category (e.g. "Organic & Early Modernism")
│   ├── .stack-cover            ← The visible face of this category folder
│   │   ├── .stack-cover__desc  ← Category description text
│   │   ├── .stack-cover__category ← Category label + chevron icon
│   │   └── ::after             ← Pseudo-element for shadow/overlay on hover
│   │
│   └── .stack-page             ← One per architect (clickable <a> link)
│       ├── .stack-page__bg     ← Solid background color
│       ├── .stack-page__header ← Container for tabs
│       │   └── .tag            ← The tab label (with SVG curved edges)
│       │       ├── .tag__start ← SVG left curve
│       │       ├── .tag__middle ← Text label with bg color
│       │       └── .tag__end   ← SVG right curve
│       └── .stack-page__unfold-area ← Click/hover target zone (33% width)
```

---

## 6. Phase 1 — The Stack (Resting State)

### The `.stack` container

```css
.stack {
  display: flex;
  flex-direction: column;
  /* Total height = single group height + offset * (number of groups - 1) */
  height: calc(var(--stack-group-height-lg) + var(--stack-group-offset) * (N - 1));
  margin-inline: auto;
  margin-top: calc(var(--stack-group-offset) * N * -1); /* pulls into hero section */
  perspective: var(--stack-perspective);  /* ← THIS IS THE KEY to 3D */
  position: relative;
  width: calc(90% - .1rem);
}
```

### Each `.stack-group`

```css
.stack-group {
  /* Each group uses CSS custom props set via inline style */
  --cover-color: var(--v6d06ac9e);     /* text color */
  --cover-bg-color: var(--v182a34ec);  /* background color */

  bottom: 0;
  /* Height = base + offset * number of child pages */
  height: calc(var(--stack-group-height-lg) + var(--stack-group-offset) * var(--child-count));
  left: 0;
  margin-top: calc(var(--stack-border-radius) * -1);
  position: absolute;
  right: 0;
  transform-origin: bottom;         /* ← Tilt pivots from bottom edge */
  transform-style: preserve-3d;     /* ← Critical for 3D children */
  will-change: height;
  z-index: var(--z-index);          /* 0, 1, 2, 3 bottom to top */
}
```

**Key insight**: Groups are all `position: absolute; bottom: 0` — they stack upward from the bottom. The `z-index` controls visual stacking order, and each group's `height` is progressively larger to account for more tab rows.

### The `.stack-cover` (category face)

```css
.stack-cover {
  align-items: flex-start;
  background-color: var(--cover-bg-color);
  border-radius: 4px 4px 0 0;
  bottom: 0;
  height: 100%;
  justify-content: flex-end;
  pointer-events: none;              /* Tabs handle the clicks */
  right: 0;
  transform-origin: bottom;
  z-index: 100;
}

/* Pseudo-element for the hover highlight overlay */
.stack-cover::after {
  background: linear-gradient(0deg, #ffffff0d, #ffffff0d);
  border-radius: inherit;
  box-shadow: var(--stack-shadow);   /* 0 -1px 8px rgba(0,0,0,.15) */
  content: "";
  height: 100%;
  inset: 0;
  opacity: 0;                        /* Hidden by default */
  position: absolute;
  width: 100%;
  z-index: 5;
}
```

### Each `.stack-page` (individual architect card)

```css
.stack-page {
  border-radius: var(--stack-border-radius) var(--stack-border-radius) 0 0;
  bottom: 0;
  height: 100%;
  left: 0;
  position: absolute;
  right: 0;
  transform: translateZ(0);         /* GPU layer */
  transform-origin: bottom;          /* ← SAME pivot point */
  transform-style: preserve-3d;
  width: 100%;
  z-index: var(--page-z-index);     /* 0 for front, -1, -2 for behind */
}
```

---

## 7. Phase 2 — Hover (The "Peek" Illusion)

> [!IMPORTANT]
> This is the most critical illusion. When you hover on a tab (like "Frank Lloyd Wright"), the **entire stack-group ABOVE** it tilts backward in 3D space, revealing the cover of the group below.

### How it works

JavaScript listens for hover events on the `.stack-page__unfold-area` (a 33% width zone on the right side of each page). On hover, it adds the class `.is-rotated` to the stack-group and `.is-hovered` to the cover.

### CSS for the tilt:

```css
/* The ENTIRE group tilts backward */
.stack-group.is-rotated {
  height: calc(
    var(--stack-group-height-lg) +
    var(--stack-group-offset) * var(--child-count) -
    1rem  /* ← slightly shorter to enhance the peek gap */
  );
  transform: rotateX(var(--stack-rotation-angle))    /* -3deg backward tilt */
             translateZ(calc(2px * var(--z-index)));  /* slight depth offset */
}

/* Individual pages also tilt */
.stack-page.is-rotated {
  transform: translateY(var(--stack-rotation-offset))  /* 1rem down */
             rotateX(var(--stack-rotation-angle));       /* -3deg */
}

/* The cover also tilts */
.stack-cover.is-rotated {
  transform: translateY(var(--stack-rotation-offset))
             rotateX(var(--stack-rotation-angle));
}

/* Cover gets the light overlay on hover */
.stack-cover.is-hovered::after {
  opacity: 1;
}
```

### The visual result:

```
BEFORE HOVER:                    AFTER HOVER:
┌──────────────────┐             ┌──────────────────┐
│ Group 3 (front)  │             │ ╱ Group 3 tilted ╱│  ← rotateX(-3deg)
│ Mary Colter      │             │╱   backward     ╱ │
├──────────────────┤             ├──────────────────┤
│ Group 2          │             │ PEEK GAP ↑↑↑    │  ← You see group 2's
│ Louis Kahn       │             │ Group 2 visible  │     cover through gap
├──────────────────┤             ├──────────────────┤
│ Group 1          │             │ Group 1          │
├──────────────────┤             ├──────────────────┤
│ Group 0 (back)   │             │ Group 0          │
└──────────────────┘             └──────────────────┘
```

### The illusion explained:

1. The `-3deg` rotation on X-axis makes the top edge recede (like the top of a folder lifting).
2. `perspective: 3000px` on the parent gives subtle but realistic depth.
3. `transform-origin: bottom` means the rotation pivots at the bottom — like opening a book cover.
4. The `1rem` translateY pushes the tilted group down slightly, opening a visible gap.
5. The `::after` overlay with white semi-transparent gradient simulates light catching the folder surface.
6. The `box-shadow` on `::after` casts a soft shadow downward.

### Transition:

```css
.__app:not(.is-loading) .stack-group {
  transition: transform .65s cubic-bezier(.33, 1, .68, 1),
              height .65s cubic-bezier(.33, 1, .68, 1);
}

.stack-cover {
  transition: transform .65s cubic-bezier(.33, 1, .68, 1);
}

.stack-cover::after {
  transition: opacity .65s cubic-bezier(.33, 1, .68, 1);
}
```

---

## 8. Phase 3 — Click (Separation + Route Transition)

When you click a tab (e.g. "Frank Lloyd Wright"), the Nuxt router navigates to `/cases/frank-lloyd-wright`. The page transition involves:

### Step 1: Stack Unfolding

The `.is-unfolded` class is added to the stack-group. This increases the group's height dramatically, pushing the groups apart:

```css
.stack-group.is-unfolded {
  height: calc(
    var(--stack-group-height-lg) -
    var(--stack-group-height-sm) +
    var(--stack-group-offset) +
    var(--stack-group-offset) * var(--child-count)
  );
}
```

The chevron icon also rotates to indicate "open":

```css
.stack-cover.is-unfolded .stack-cover__category .iconify {
  transform: rotate(0);  /* from 90deg → 0deg */
}
```

### Step 2: Route Change → Case Page

The Vue router transitions to the case page. The `.case-temp` component handles the bridge animation — it renders a temporary version of the remaining stack below the hero section:

```css
.case-temp {
  display: flex;
  flex-direction: column;
  height: calc(var(--stack-group-height-lg) + var(--stack-group-offset) * (N - 1));
  left: 0;
  perspective: var(--stack-perspective);
  pointer-events: none;
  position: absolute;
  right: 0;
  top: calc(100vh - var(--stack-group-offset) * 4);
  z-index: 5;
}
```

### Step 3: Folder Rotation (The "Opening")

On the case page, the `.case-folder` component appears. It has a **cover** that flips open using a 3D Y-axis rotation:

```css
.case-folder {
  perspective: var(--stack-perspective);
  position: relative;
  transform-origin: top right;
  width: 100%;
  will-change: transform, width, height;
}

/* The cover flips from closed to open */
.case-folder__cover {
  border-radius: 0 var(--stack-border-radius) var(--stack-border-radius) 0;
  height: 100%;
  width: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transform: rotateY(-180deg);         /* ← Fully open state */
  transform-origin: left;              /* ← Hinge is on the left */
  transform-style: preserve-3d;
  z-index: 10;
}
```

### The cover has two faces:

```css
/* Front of the cover (same color as the folder) */
.case-folder__cover__front {
  background: var(--first-case-color);
  backface-visibility: hidden;
  z-index: 2;
}

/* Back of the cover (interior color, visible when flipped) */
.case-folder__cover__back {
  background-color: var(--case-color);
  backface-visibility: hidden;
  transform: rotateX(180deg);   /* Flipped to show on the back */
}

/* Subtle gradient on the back = depth illusion */
.case-folder__cover__back__overlay {
  background: linear-gradient(90deg, #fff0, #ffffff0d);
  opacity: 1;
}
```

### Cover shadow for depth:

```css
.case-folder__cover__shadow {
  box-shadow: 0 0 250px rgba(0, 0, 0, .5);
  opacity: 0;  /* Animated in via JS/GSAP */
}

.case-folder__cover__front__shadow {
  box-shadow: var(--folder-shadow);  /* 1px 0 8px rgba(0,0,0,.15) */
}

.case-folder__cover__front__overlay {
  background: linear-gradient(0deg, #ffffff0d, #ffffff0d);
}
```

---

## 9. Phase 4 — The Open Folder (Case Page)

Once the folder is fully open, you see a richly designed interior:

### Folder Interior (`.case-folder__inner`)

```css
.case-folder__inner {
  background-color: var(--case-color);  /* e.g. #1E4BD7 for FLW */
  border-radius: 0 var(--stack-border-radius) var(--stack-border-radius) 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: var(--container-offset);
}
```

### The Document Sheet (`.case-folder-sheet`)

This is the white "paper" inside the folder:

```css
.case-folder-sheet {
  background-color: #fffcf9;              /* Warm off-white paper color */
  border-radius: 4px;
  color: var(--color-dark);               /* Dark text */
  padding: var(--padding-l) var(--padding-l) var(--padding-l) calc(var(--clip-size) + 1rem);
  position: relative;
  z-index: 0;
  aspect-ratio: 210/297;                  /* A4 paper proportions! */
  width: calc(var(--case-content-width) - var(--container-offset) * 2);
}
```

> [!TIP]
> The `aspect-ratio: 210/297` enforces A4 paper proportions — a brilliant detail that sells the folder realism.

### The Binder Clip Column (`.case-folder-sheet__clip`)

The left side has a column of dots simulating the binder holes of a real folder:

```css
.case-folder-sheet__clip {
  align-items: center;
  border-right: 1px solid #b8b3ae;       /* Subtle divider line */
  bottom: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: var(--clip-size);              /* 5rem on desktop, 2.5rem mobile */
  z-index: 5;
}

/* Each binder hole */
.case-folder-sheet__clip span {
  background-color: var(--case-color);   /* Folder color shows through */
  border-radius: 50%;
  display: inline-block;
  height: clamp(10px, 1.33vw, 20px);
  width: clamp(10px, 1.33vw, 20px);
}
```

### Paper Texture Overlays

Two texture overlays create the aged paper look:

```css
/* Subtle paper grain */
.case-folder-sheet__overlay {
  background-image: url(/images/avif/sheet_overlay.avif);
  mix-blend-mode: exclusion;
  opacity: 0.4;
}

/* Aging/stain marks */
.case-folder-sheet__marks {
  background-image: url(/images/avif/sheet_marks.avif);
  mix-blend-mode: exclusion;
}
```

### The Side Tabs (`.case-folder-tags`)

When the folder is open, the tabs move to the right edge (rotated 90°):

```css
.case-folder-tags {
  display: flex;
  position: absolute;
  right: 0;
  top: var(--stack-border-radius);
  transform: translate(100%, -100%) rotate(90deg);  /* ← Rotated to sit on edge */
  transform-origin: left bottom;
  width: 100%;
  z-index: -1;
}
```

Each tab page has a hover effect that lifts it slightly:

```css
@media (hover: hover) {
  .case-folder-tags__page:hover {
    transform: translateY(-10px);
  }

  /* Shadow appears below lifted tab */
  .case-folder-tags__page:hover::after {
    opacity: 1;
  }
}

.case-folder-tags__page::after {
  box-shadow: 0 -10px 20px rgba(0, 0, 0, .5);
  opacity: 0;
  transition: opacity .325s cubic-bezier(.33, 1, .68, 1);
}
```

### The Drop-cap (First Letter)

The biographical text uses a classic drop-cap:

```css
.case-folder-sheet__desc p:first-child:first-letter {
  display: inline-block;
  float: left;
  font-size: 5em;
  line-height: .425;
  margin-right: 1rem;
  margin-top: .21em;
}
```

---

## 10. The Folder Tab (`.tag`) — SVG Anatomy

The tabs use a clever SVG shape for the curved file-folder look:

```html
<div class="tag is-visible" style="--color:#fff; --bg-color:#1E4BD7;">
  <!-- Left curve (mirrored) -->
  <svg class="tag__side tag__start" viewBox="0 0 62 44" preserveAspectRatio="none">
    <path d="M1.1449 -2.54901e-05L-521.145 ... L62 44C52.6151 44 43.8369 39.3607
             38.5499 31.6066L25.9318 13.0999C20.3434 4.90373 11.0649 -2.59237e-05
             1.1449 -2.54901e-05Z" fill="currentColor"/>
  </svg>

  <!-- Text label -->
  <div class="tag__middle">
    <span>Frank Lloyd Wright</span>
  </div>

  <!-- Right curve -->
  <svg class="tag__side tag__end" viewBox="0 0 62 44" preserveAspectRatio="none">
    <!-- Same path as start -->
  </svg>
</div>
```

### Tab styling:

```css
.tag {
  align-items: flex-start;
  color: var(--color);
  display: flex;
  font-family: Signifier, serif;
  font-size: 1.625rem;
  height: var(--tag-height);          /* 2.75rem */
  white-space: nowrap;
  opacity: 0;                        /* Hidden by default */
  pointer-events: none;
}

.tag.is-visible {
  opacity: 1;
  pointer-events: auto;
}

.tag__middle {
  align-items: center;
  background-color: var(--bg-color);
  display: flex;
  height: 100%;
  justify-content: center;
  z-index: 5;
}

/* The left SVG is mirrored horizontally */
.tag__start {
  transform: scale(-1, 1.01) translate(-1px);
  color: var(--bg-color);
}

.tag__end {
  transform: scaleY(1.01) translate(-1px);
  color: var(--bg-color);
}
```

> [!TIP]
> The SVG path creates a classic file-folder tab silhouette with curved corners. The `preserveAspectRatio="none"` allows it to stretch to any height while `color: var(--bg-color)` + `fill="currentColor"` lets you recolor it via CSS.

### Simplified SVG path breakdown:

The path essentially draws this shape:

```
    ╭────────────╮
   ╱              ╲
  ╱                ╲
 ╱                  ╲
╱____________________╲
```

It's a trapezoid with rounded top corners — the classic "file folder tab" shape.

---

## 11. Color Palette & Typography

### Folder Colors

| Category | Background | Text |
|----------|-----------|------|
| Organic & Early Modernism | `#1E4BD7` (blue) | `#fff` |
| Irving Gill | `#D71E1E` (red) | `#fff` |
| Expressive | `#0C7866` (teal) | `#fff` |
| Monumental Modernism | `#581E70` (purple) | `#fff` |
| I.M. Pei | `#FFE927` (yellow) | `#000` |
| Paul Rudolph | `#000000` (black) | `#fff` |
| Contextual & Transitional | `#D71E1E` (red) | `#fff` |
| Louis Sullivan | `#1E4BD7` (blue) | `#fff` |

### Fonts

```css
/* Body & paragraph text */
font-family: Signifier, serif;
font-weight: 400;

/* Headings */
font-family: Founders Grotesk, sans-serif;
font-weight: 700;
text-transform: uppercase;

/* Captions & labels */
font-family: IBM Plex Mono, sans-serif;
```

### Page Background

```css
--color-dark: #191919;       /* Body background */
--color-light: #fdfaf7;      /* Text and paper */
```

---

## 12. Easing & Animation Timing

The site uses a **single consistent easing** for almost all animations:

```css
/* The signature easing — an ease-out with slight overshoot */
cubic-bezier(.33, 1, .68, 1)
```

### Timing values:

| Animation | Duration | Easing |
|-----------|----------|--------|
| Stack group tilt (hover) | `0.65s` | `cubic-bezier(.33, 1, .68, 1)` |
| Stack group height change | `0.65s` | `cubic-bezier(.33, 1, .68, 1)` |
| Cover overlay opacity | `0.65s` | `cubic-bezier(.33, 1, .68, 1)` |
| Cover rotation | `0.65s` | `cubic-bezier(.33, 1, .68, 1)` |
| Chevron rotation | `0.65s` | `cubic-bezier(.33, 1, .68, 1)` |
| Popup enter | `0.7s` | linear |
| Popup leave | `0.65s` | linear |
| Tab hover (case page) | `0.325s` | `cubic-bezier(.33, 1, .68, 1)` |
| Header hide/show | `0.65s` / `0.325s` | `cubic-bezier(.33, 1, .68, 1)` |

---

## 13. Responsive Behavior

### Desktop (≥ 1025px)
- Stack width: `calc(90% - .1rem)`
- Full 3D perspective effects
- Tags at `font-size: 1.625rem`
- Sheet has `aspect-ratio: 210/297` (A4)
- Clip column width: `5rem`

### Tablet (≤ 1024px)
- Stack width: `100%`
- `--stack-group-height-sm: 20vh`
- Tags at `font-size: 1.25rem`
- Sheet loses A4 aspect ratio
- Clip column width: `5rem`

### Mobile (≤ 480px)
- `--stack-group-height-sm: 15vh`
- Tags at `font-size: 15px` with negative margins to fit
- Cover description hidden
- Clip column width: `2.5rem`
- Sheet padding reduced

---

## 14. Reproduce-Anywhere Cheat Sheet

### Minimum CSS to recreate the core illusion:

```css
/* 1. The Stack Container */
.stack {
  perspective: 3000px;
  position: relative;
  height: 80vh;
}

/* 2. Each Folder Group */
.folder-group {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: calc(80vh + 3.75rem * var(--child-count));
  transform-origin: bottom;
  transform-style: preserve-3d;
  transition: transform 0.65s cubic-bezier(.33, 1, .68, 1),
              height 0.65s cubic-bezier(.33, 1, .68, 1);
}

/* 3. Hover → Tilt backward */
.folder-group.is-peeked {
  transform: rotateX(-3deg) translateZ(2px);
}

/* 4. Cover face */
.folder-cover {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: var(--folder-color);
  border-radius: 4px 4px 0 0;
  transform-origin: bottom;
  transition: transform 0.65s cubic-bezier(.33, 1, .68, 1);
}

/* 5. Cover hover overlay */
.folder-cover::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05));
  box-shadow: 0 -1px 8px rgba(0,0,0,0.15);
  opacity: 0;
  transition: opacity 0.65s cubic-bezier(.33, 1, .68, 1);
}

.folder-cover.is-hovered::after {
  opacity: 1;
}

/* 6. Open folder cover (case page) */
.folder-open-cover {
  transform: rotateY(-180deg);
  transform-origin: left;
  transform-style: preserve-3d;
}

.folder-open-cover .front,
.folder-open-cover .back {
  backface-visibility: hidden;
  position: absolute;
  inset: 0;
}

.folder-open-cover .back {
  transform: rotateX(180deg);
}

/* 7. Interior paper sheet */
.document-sheet {
  background: #fffcf9;
  aspect-ratio: 210 / 297;
  border-radius: 4px;
  padding: 5rem 5rem 5rem calc(5rem + 1rem);
}

/* 8. Binder holes */
.binder-column {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 5rem;
  border-right: 1px solid #b8b3ae;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.binder-hole {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--folder-color);
}
```

### Minimum JS for the hover interaction:

```javascript
// Listen for hover on tabs
document.querySelectorAll('.stack-page').forEach(page => {
  const group = page.closest('.stack-group');
  const cover = group.querySelector('.stack-cover');

  // Get all groups above this one
  const allGroups = [...document.querySelectorAll('.stack-group')];
  const groupIndex = allGroups.indexOf(group);
  const groupsAbove = allGroups.filter((_, i) => i > groupIndex);

  page.addEventListener('mouseenter', () => {
    // Tilt all groups above this one
    groupsAbove.forEach(g => g.classList.add('is-peeked'));
    cover.classList.add('is-hovered');
  });

  page.addEventListener('mouseleave', () => {
    groupsAbove.forEach(g => g.classList.remove('is-peeked'));
    cover.classList.remove('is-hovered');
  });
});
```

### Key principles to remember:

> [!IMPORTANT]
> 1. **`perspective`** on the parent container is what makes the 3D tilt look real
> 2. **`transform-origin: bottom`** is critical — it makes the rotation hinge at the bottom like a real folder
> 3. **`transform-style: preserve-3d`** must be on every 3D container
> 4. **`backface-visibility: hidden`** on the folder cover's front/back faces prevents seeing through
> 5. **The shadow + overlay `::after`** on hover is what sells the "gap" illusion — without it, the tilt looks flat
> 6. **The SVG tab shape** uses `preserveAspectRatio="none"` so it stretches to any size
> 7. **Paper texture overlays** with `mix-blend-mode: exclusion` at low opacity create the aged look
> 8. **A4 aspect-ratio (210/297)** on the document sheet makes it feel like a real paper document
> 9. **Binder holes** colored with the folder color create the see-through effect
> 10. Use **one consistent easing** (`cubic-bezier(.33, 1, .68, 1)`) for everything — it creates cohesion

---

## SVG Tab Path (Ready to Copy)

```html
<svg viewBox="0 0 62 44" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1.1449 -2.54901e-05L-521.145 -2.66006e-06C-531.065 -2.22644e-06
           -540.343 4.90374 -545.932 13.0999L-558.55 31.6066C-563.837 39.3607
           -572.615 44 -582 44L62 44C52.6151 44 43.8369 39.3607 38.5499
           31.6066L25.9318 13.0999C20.3434 4.90373 11.0649 -2.59237e-05
           1.1449 -2.54901e-05Z" fill="currentColor"/>
</svg>
```

---

> **Credit**: This interaction design was crafted by [Tubik Studio](https://tubikstudio.com). This document is a reverse-engineering for educational purposes.
