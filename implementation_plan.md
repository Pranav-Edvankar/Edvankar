# 🔍 Edvankar Portfolio vs. Mosby's Files — Folder Animation Audit

A point-by-point analysis of your portfolio's folder system against the [Mosby's Files reverse-engineering spec](file:///c:/Users/Pratik-PC/Downloads/ed/Edvankar/mosby_files_folder_reverse_engineering.md).

---

## Summary Scorecard

| Phase | Mosby's Spec | Your Implementation | Score |
|-------|-------------|-------------------|-------|
| **Phase 1: Stack** | 3D perspective stacking, `position: absolute; bottom: 0` | 2D vertical stacking with negative margins | ⚠️ 3/10 |
| **Phase 2: Hover Peek** | `rotateX(-3deg)` on all groups ABOVE, perspective tilt | `scaleY(0.94) + skewX(-2)` on individual tab only | ⚠️ 2/10 |
| **Phase 3: Click/Open** | Stack separation → cover flip (`rotateY(-180deg)`) | `AnimatePresence` fade swap (no 3D flip) | ❌ 1/10 |
| **Phase 4: Interior** | Folder cover, A4 sheet, binder holes, paper textures | Colored frame + cream paper card (partial) | ✅ 6/10 |
| **Tab Shape** | SVG trapezoid with curved shoulders (`fill="currentColor"`) | SVG scalloped arch path (different silhouette) | ⚠️ 5/10 |
| **Easing/Timing** | One unified `cubic-bezier(.33,1,.68,1)` at `0.65s` | Mixed easings, mostly `0.25-0.35s` with `[0.22,1,0.36,1]` | ⚠️ 4/10 |

**Overall: ~3.5/10** — The aesthetic *direction* is right (dark theme, folder metaphor, scrapbook interior), but the core mechanical illusions that make Mosby's feel physical are all missing.

---

## Phase-by-Phase Breakdown

### Phase 1: The Stack (Resting State) — ⚠️ 3/10

#### What Mosby's Does

```
perspective: 3000px on .stack container
Each .stack-group: position: absolute; bottom: 0
Height: calc(80vh + 3.75rem * child-count)
z-index: ascending from back to front
transform-style: preserve-3d
```

The groups all **anchor to the bottom** and grow upward. Each group is taller than the previous, so tabs naturally peek above. The `perspective` makes everything feel 3D even at rest.

#### What You Do ([page.tsx L803-L814](file:///c:/Users/Pratik-PC/Downloads/ed/Edvankar/src/app/page.tsx#L803-L814))

```tsx
// Negative margins create overlap, not 3D stacking
className={`relative ${clusterIdx > 0 ? "-mt-[48px] md:-mt-[56px]" : ""}`}
style={{ zIndex }}

// Height is toggled between fixed values
animate={{ height: folderHeight }}  // "44px" or "450px" or "680px"
```

#### Issues

| Issue | Severity |
|-------|----------|
| **No `perspective`** on any container — no 3D depth whatsoever | 🔴 Critical |
| **No `position: absolute; bottom: 0`** anchoring — folders stack top-down with negative margins, which breaks the physical metaphor | 🔴 Critical |
| **No `transform-style: preserve-3d`** — 3D children can't render | 🔴 Critical |
| Fixed pixel heights (`44px`, `450px`) instead of viewport-relative `calc(80vh + ...)` — doesn't scale | 🟡 Medium |
| Folders use `overflow: hidden` — clips content during animations | 🟡 Medium |

---

### Phase 2: Hover / The "Peek" Illusion — ⚠️ 2/10

#### What Mosby's Does

When you hover on "Frank Lloyd Wright" (group 0), **ALL groups above** (groups 1, 2, 3) get:

```css
.stack-group.is-rotated {
  transform: rotateX(-3deg) translateZ(2px);
}
```

This tilts the **entire stack above** backward, creating a gap between the hovered group and the ones above it. Combined with:
- `transform-origin: bottom` (hinge at the base)
- `perspective: 3000px` (subtle depth)
- A `::after` overlay with `box-shadow` for the "light catching"

#### What You Do ([page.tsx L803-L808](file:///c:/Users/Pratik-PC/Downloads/ed/Edvankar/src/app/page.tsx#L803-L808) + [FolderTabH L127-L131](file:///c:/Users/Pratik-PC/Downloads/ed/Edvankar/src/app/page.tsx#L127-L131))

```tsx
// Group level — only a tiny 3px Y shift
animate={{ y: isHovered ? -3 : 0 }}

// Tab level — 2D scale+skew faking 3D
whileHover={{ scaleY: 0.94, skewX: -2 }}
style={{ transformOrigin: "top center" }}
```

#### Issues

| Issue | Severity |
|-------|----------|
| **No 3D rotation** — using 2D `scaleY + skewX` looks flat, not physical | 🔴 Critical |
| **Only the individual tab animates** — Mosby's tilts ALL folders above the hovered one. Your groups above don't move at all | 🔴 Critical |
| **No `rotateX` tilt** on the folder body — the body just shifts `y: -3` (barely visible) | 🔴 Critical |
| The "front/dark layer" peek technique (`scaleY: 0.94` revealing darkened layer behind) is a clever 2D approximation, but visually unconvincing compared to real 3D | 🟡 Medium |
| **No shadow/overlay** on the cover that appears on hover (Mosby's `::after` with `box-shadow: 0 -1px 8px rgba(0,0,0,.15)`) | 🟡 Medium |
| The inner-crease div ([L871-L882](file:///c:/Users/Pratik-PC/Downloads/ed/Edvankar/src/app/page.tsx#L871-L882)) is a nice touch but it's a tiny `h-4` bar, not the full-surface tilt illusion | 🟢 Minor |

---

### Phase 3: Click / Folder Opening — ❌ 1/10

#### What Mosby's Does (3-step sequence)

1. **Stack separates**: `.is-unfolded` increases the group's height, pushing other groups away
2. **Route transitions**: Nuxt navigates to `/cases/frank-lloyd-wright` with a bridging animation (`.case-temp`)
3. **Cover flips open**: The `.case-folder__cover` does `rotateY(-180deg)` with `transform-origin: left` — a true 3D book-like opening with `backface-visibility: hidden` on front/back faces

#### What You Do ([page.tsx L765-L770](file:///c:/Users/Pratik-PC/Downloads/ed/Edvankar/src/app/page.tsx#L765-L770) and [L930-L936](file:///c:/Users/Pratik-PC/Downloads/ed/Edvankar/src/app/page.tsx#L930-L936))

```tsx
// Everything is done with AnimatePresence mode="wait"
// Index view fades out:
exit={{ opacity: 0 }}

// Open folder fades in:
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.4 }}
```

#### Issues

| Issue | Severity |
|-------|----------|
| **No folder cover flip** — the most iconic Mosby animation is completely missing. You just fade in/out. | 🔴 Critical |
| **No stack separation animation** — all folders vanish instantly, replaced by a flat layout. Mosby's shows the other folders sliding away before the selected one opens. | 🔴 Critical |
| **No `backface-visibility`** or dual-sided cover element — no front/back faces for the folder cover | 🔴 Critical |
| **No bridging animation** between the stack view and the open folder — the visual continuity is broken entirely | 🟠 High |
| The folder body slides up with `y: 60 → 0` ([L982-L984](file:///c:/Users/Pratik-PC/Downloads/ed/Edvankar/src/app/page.tsx#L982-L984)) which is nice but it's not a physical "opening" — it's a generic content entrance | 🟡 Medium |

---

### Phase 4: The Open Folder Interior — ✅ 6/10

This is your strongest area. You've captured the **spirit** well.

#### What Mosby's Does

| Feature | Mosby's |
|---------|---------|
| Folder interior | Colored background (e.g. `#1E4BD7`) |
| Paper sheet | `#fffcf9`, `aspect-ratio: 210/297` (A4) |
| Binder holes | Circular dots in `space-around` column, colored with folder color |
| Paper texture | `sheet_overlay.avif` + `sheet_marks.avif` with `mix-blend-mode: exclusion` |
| Drop-cap | `first-letter` with `font-size: 5em; float: left` |
| Side tabs | Rotated 90° on right edge, hover lifts with shadow |
| Folder cover | Visible as flipped element (back face showing) |

#### What You Have

| Feature | Yours | Match? |
|---------|-------|--------|
| Colored background | ✅ `backgroundColor: activeCluster?.color` ([L990](file:///c:/Users/Pratik-PC/Downloads/ed/Edvankar/src/app/page.tsx#L990)) | ✅ |
| Paper card | ✅ `bg-[#F5F3EE]` cream color ([L401](file:///c:/Users/Pratik-PC/Downloads/ed/Edvankar/src/app/page.tsx#L401)) | ✅ Close |
| Binder holes | ✅ Dot markers in left column ([L968-L971](file:///c:/Users/Pratik-PC/Downloads/ed/Edvankar/src/app/page.tsx#L968-L971)) | ✅ |
| Paper texture overlay | ❌ No texture overlays | 🔴 Missing |
| A4 aspect ratio | ❌ Paper card has no aspect ratio constraint | 🟡 Missing |
| Drop-cap | ✅ `first-letter:text-6xl first-letter:float-left` ([L463](file:///c:/Users/Pratik-PC/Downloads/ed/Edvankar/src/app/page.tsx#L463)) | ✅ |
| Side tabs (rotated) | ✅ Vertical tabs on right edge ([L1010-L1021](file:///c:/Users/Pratik-PC/Downloads/ed/Edvankar/src/app/page.tsx#L1010-L1021)) | ✅ Partial |
| Folder cover (flipped) | ❌ No cover element at all | 🔴 Missing |
| Paperclip | ✅ SVG paperclip component ([L24-L28](file:///c:/Users/Pratik-PC/Downloads/ed/Edvankar/src/app/page.tsx#L24-L28)) | ✅ |
| Compass/stamp icons | ✅ DossierStamps component ([L31-L75](file:///c:/Users/Pratik-PC/Downloads/ed/Edvankar/src/app/page.tsx#L31-L75)) | ✅ Bonus |
| Scrapbook layout | ✅ Multiple collage patterns with drag | ✅ Good |

---

### Tab Shape — ⚠️ 5/10

#### Mosby's tab SVG:

A **trapezoid with wide curved shoulders** — like a real file folder tab:

```
    ╭────────────╮
   ╱              ╲
  ╱                ╲
 ╱                  ╲
╱____________________╲
```

Uses `fill="currentColor"` + `color: var(--bg-color)` so color is CSS-controlled.

#### Your tab SVG ([page.tsx L92](file:///c:/Users/Pratik-PC/Downloads/ed/Edvankar/src/app/page.tsx#L92)):

A **scalloped arch** with rounded corners:

```
M 0,54 L 0,20 Q 0,6 14,6 L 20,6 Q 28,6 28,0 L 242,0 Q 242,6 250,6 L 256,6 Q 270,6 270,20 L 270,54
```

This has a different visual language — more like a browser tab than a file folder tab. The Mosby path uses a wider, flatter trapezoid shape with the characteristic file-cabinet curve.

---

### Easing & Timing — ⚠️ 4/10

| Property | Mosby's | Yours |
|----------|---------|-------|
| Main easing | `cubic-bezier(.33, 1, .68, 1)` | `[0.22, 1, 0.36, 1]` |
| Main duration | `0.65s` | `0.25-0.35s` |
| Consistency | **One easing everywhere** | Mixed (some `0.28s`, some `0.35s`, some `0.5s`) |

Your animations are **too fast** (0.25-0.35s vs Mosby's 0.65s). This makes them feel snappy but not **luxurious**. The Mosby timing gives that weighty, physical feeling.

---

## Priority Implementation Plan

### 🔴 P0 — Must Fix (Core Illusion is Broken Without These)

1. **Add `perspective: 3000px`** to the stack container
2. **Restructure stack to `position: absolute; bottom: 0`** with height-based stacking
3. **Add `rotateX(-3deg)` hover** that tilts ALL groups above the hovered one
4. **Build the folder cover flip** (`rotateY` with front/back faces and `backface-visibility: hidden`)
5. **Add stack separation animation** before the open transition (height expand pushing groups apart)

### 🟠 P1 — High Impact Visual Fixes

6. **Switch tab SVG** to the Mosby trapezoid path
7. **Slow down all animations** to `0.65s` with `cubic-bezier(.33, 1, .68, 1)`
8. **Add paper texture overlays** (`mix-blend-mode: exclusion` on the cream paper)
9. **Add `aspect-ratio: 210/297`** to the paper card
10. **Add hover shadow/overlay** on the folder body (the `::after` pseudo-element)

### 🟡 P2 — Polish

11. Add viewport-relative heights (`calc(80vh + ...)`) instead of fixed pixel values
12. Remove `overflow: hidden` from folder bodies during animations
13. Add the bridging animation between index and open states
14. Make the vertical side tabs hover-lift with shadow (yours currently only do 2D peek)
15. Add `transform-style: preserve-3d` throughout the 3D chain

---

> [!IMPORTANT]
> The single biggest gap is that your entire stack system operates in **2D**. Mosby's entire magic comes from `perspective` + `rotateX` + `transform-origin: bottom` — a 3-property combination that turns flat divs into physical folder flaps. Without it, no amount of scaling or skewing will look right.

> [!TIP]
> Start with P0 items 1-3. Just adding `perspective: 3000px` to your stack wrapper and switching from `y: -3` to `rotateX(-3deg)` on hover will immediately make your portfolio feel 10x more physical.
