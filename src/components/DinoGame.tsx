"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

/* ─── Senior Pixel Art Realistic Cloud System ───
 * Volumetric 3D-shaded pixel cloud formations with directional sunlight:
 *   '.' = Sky / Transparent
 *   '@' = Specular Sunlight Crest Highlight (facing sun top-left)
 *   '*' = Bright Sunlit Fluff (upper billow volume)
 *   '#' = Dense Midtone Body (core cloud mass)
 *   '=' = Crevasse Shadow (valleys between billowing lobes)
 *   '~' = Underbelly Ambient Shade (ground-facing base)
 *   ':' = Bayer Dithered Vapor Fringe (dissolving airy edge)
 */

const CLOUD_PATTERN_CUMULUS = [
  "....................:@@@@@@@@@@*:.............",
  "...................:@@@@@@@@@@@@*:............",
  "..................:@@@@@@@@@@@@@**:...........",
  ".............:@@@@@@@@@@@@@@@@@**##@.:........",
  "............@@@@@@@@@@@@@@@@@@***##@@@*.......",
  "...........@@@@@@@@@@@@@@@@@@***##=@@@@*......",
  "....:@@@@@@@@@@@@@@@@@@@@@@****###=@@@**=.....",
  "...@@@@@@@@@@@@@@@@**@@******###==@@@**##@@@..",
  "..:@@@@@@@@@@@@@@*********#####===@***##=@@@*.",
  "..@@@@@@@***@@*****##########==~=****##==@@**#",
  "..*@@@@***#*****####==========~=**####==@***#=",
  "..******##########===~=~=~=~=~=####====~**##=~",
  "..:######=========~=~...:.:.:.======~=~###==~.",
  "...======.........=:.................:.~=~=~..",
  "..............................................",
];

const CLOUD_PATTERN_CRUISER = [
  "......................:@@@@@@@@@@@@*:...................",
  "...............:.:@:.:@@@@@@@@@@@@@**:..................",
  "..............@@@@@@@@@@@@@@@@@@@@@**#:.................",
  ".............@@@@@@@@@@@@@@@@@@@@@@**##@@@@:............",
  "............@@@@@@@@@@@@@@@@@@@@@@***##@@@@@*...........",
  ".......:.:.@@@@@@@@@@@@@@@@@@@@@@***##=@@@@@**@@@:......",
  "....:@@@@@@@@@@@@@@@@@@@@@@@@@*****###@@@@@@**@@@@@*....",
  "...@@@@@@@@@@@@@@@@@***@@@*******###==@@@@***##@@@@*#...",
  "..:@@@@@@@@*@@@@@*************#####==@@@****##@@@@**#...",
  "..@@@@@@@@**********############===~=*****###=@@***#=@*:",
  "..*@@@@@****#########===####======~=***####===***##==@*#",
  "..********########===~=~.~===~=~=~#######====####==~**##",
  "..:########===~===~=~=~...:.:=:.:.========~=~=====~*##==",
  "...==##==.........=:.:..............=~=~=~=:..........=:",
  "........................................................",
];

const CLOUD_PATTERN_CIRRUS = [
  "......................................",
  ".............:@@@@@@@@@:.:.:@:.:......",
  "......:.@.:@@@@@@@@@@@@**@@@@@@@@*:...",
  "...@@@@@@@@@@@@@@@@@@@***#@@@@@@**#=..",
  "..@@@@@@@@*@@@@@@@@****###@@@***###=:.",
  ".*@@@@@@************####==***####==~**",
  "..#*****############====~###====~=**##",
  "...==##====~=~===~=~=~=:.:.:=:=#####=~",
  "......:.~.:.....................:=~=:. ",
];

const CLOUD_PATTERN_CLOUDLET = [
  "............:.:...........",
  ".........:@@@@@@@:........",
  "........:@@@@@@@@*:.......",
  ".......:@@@@@@@@@*#:.:....",
  "....@@@@@@@@@@@@**#@@@@...",
  "...@@@@@@@@@@@***##@@@@*#.",
  "..@@@@@@*******###=@@@**#.",
  "..@@@@**#****###===@***#=:",
  "..*****#######==~=***##=~.",
  "...####==~===~=~=####==~=.",
  "....~=~=~.........==~=~...",
];

interface PixelSpan {
  type: "@" | "*" | "#" | "=" | "~" | ":" | "E" | "X";
  x: number;
  w: number;
}

interface CompiledCloud {
  width: number;
  height: number;
  spansByRow: PixelSpan[][];
}

function compileCloudPattern(rows: string[]): CompiledCloud {
  const height = rows.length;
  const width = rows[0]?.length || 0;
  const spansByRow: PixelSpan[][] = [];

  for (let r = 0; r < height; r++) {
    const rowStr = rows[r];
    const rowSpans: PixelSpan[] = [];
    let currentType: string | null = null;
    let startX = 0;

    for (let c = 0; c < rowStr.length; c++) {
      const char = rowStr[c];
      if (char !== "." && char !== " ") {
        if (currentType === char) {
          // continue same span
        } else {
          if (currentType !== null) {
            rowSpans.push({ type: currentType as any, x: startX, w: c - startX });
          }
          currentType = char;
          startX = c;
        }
      } else {
        if (currentType !== null) {
          rowSpans.push({ type: currentType as any, x: startX, w: c - startX });
          currentType = null;
        }
      }
    }

    if (currentType !== null) {
      rowSpans.push({ type: currentType as any, x: startX, w: rowStr.length - startX });
    }

    spansByRow.push(rowSpans);
  }

  return { width, height, spansByRow };
}

const COMPILED_CLOUDS: CompiledCloud[] = [
  compileCloudPattern(CLOUD_PATTERN_CUMULUS),  // 0: Realistic Volumetric Cumulus
  compileCloudPattern(CLOUD_PATTERN_CRUISER),  // 1: Horizon Stratocumulus Cruiser
  compileCloudPattern(CLOUD_PATTERN_CIRRUS),   // 2: Feathery High Cirrus
  compileCloudPattern(CLOUD_PATTERN_CLOUDLET), // 3: Fair-Weather Pocket Cloudlet
];

/* ─── Realistic Pixel Art Obstacles: Cacti & Pterosaur ─── */
// Small Saguaro (12 x 18): Staggered arms, ribbed body, root flare
const SPRITE_CACTUS_SMALL = [
  "...@@*#=....",
  "...@@*#=....",
  "...@@*#=..*.",
  "...@@*#=.@*=",
  ".*.@@*#=.@*=",
  "@*=.@*#=.@*=",
  "@*=.@*#=.@*=",
  "@*=.@*###**=",
  "@*##@**##=..",
  ".==#@**#=...",
  "...@@*#=....",
  "...@@*#=....",
  "...@@*#=....",
  "...@@*#=....",
  "...@@*#=....",
  "...@@*#=....",
  "..@@@**##=..",
  ".@@@@***##=.",
];

// Large Saguaro Cluster (18 x 22): Tall Saguaro + Companion baby cactus & desert mound
const SPRITE_CACTUS_LARGE = [
  ".....@@*#=........",
  ".....@@*#=........",
  ".....@@*#=...*....",
  ".....@@*#=.@*#=...",
  "..*..@@*#=.@*#=...",
  "@*#=.@@*#=.@*#=...",
  "@*#=.@@*#=.@*#=...",
  "@*#=.@@*####**#=..",
  "@*##@@@***##===...",
  ".==#@@@**#=.......",
  ".....@@*#=........",
  ".....@@*#=........",
  ".....@@*#=........",
  ".....@@*#=...@@*#.",
  ".....@@*#=..@***#=",
  ".....@@*#=..@***#=",
  ".....@@*#=..@***#=",
  ".....@@*#=..@***#=",
  "....@@@**#==@***#=",
  "...@@@@***##@@**#=",
  "..@@@@@****###**#=",
  ".@@@@@@*****####*=",
];

// Pterodactyl Bird Frame 1: Wing Up (18 x 13)
const SPRITE_BIRD_UP = [
  ".......@@@........",
  "......@**@........",
  ".....@***#@.......",
  "....@***##*@......",
  "...@***##==*@.....",
  "..@***##====*@....",
  ".@***##======*@...",
  "@@@@***#####@@@@..",
  "@**#*@@@@@@@@@@@..",
  ".@*#==@@***####@..",
  "..==@@@@***##=@@..",
  "....@@@***#===....",
  ".....@**##==......",
];

// Pterodactyl Bird Frame 2: Wing Down (18 x 13)
const SPRITE_BIRD_DOWN = [
  "@@@@..............",
  "@**#*@@@@@@@@@@@..",
  ".@*#==@@***####@..",
  "..==@@@@***##=@@..",
  "....@@@***#===....",
  "...@***##======*@.",
  "..@***##========*@",
  ".@***##==========*",
  ".@**##===========*",
  "..@*#============*",
  "...@#============*",
  "....@============*",
  ".....@**##==......",
];

const COMPILED_CACTUS_SMALL = compileCloudPattern(SPRITE_CACTUS_SMALL);
const COMPILED_CACTUS_LARGE = compileCloudPattern(SPRITE_CACTUS_LARGE);
const COMPILED_BIRD_UP = compileCloudPattern(SPRITE_BIRD_UP);
const COMPILED_BIRD_DOWN = compileCloudPattern(SPRITE_BIRD_DOWN);

interface GroundFeature {
  x: number;
  dy: number;
  w: number;
  h: number;
  type: "pebble_3d" | "surface_crest" | "fissure" | "dash" | "gravel";
  alpha?: number;
}

const DESERT_GROUND_FEATURES: GroundFeature[] = [
  { x: 14, dy: 4, w: 4, h: 2, type: "pebble_3d" },
  { x: 28, dy: -1, w: 7, h: 1, type: "surface_crest" },
  { x: 48, dy: 8, w: 3, h: 2, type: "gravel", alpha: 0.50 },
  { x: 68, dy: 3, w: 6, h: 3, type: "fissure" },
  { x: 92, dy: 5, w: 5, h: 1, type: "dash", alpha: 0.65 },
  { x: 114, dy: 3, w: 5, h: 3, type: "pebble_3d" },
  { x: 138, dy: -1, w: 9, h: 1, type: "surface_crest" },
  { x: 162, dy: 7, w: 4, h: 2, type: "gravel", alpha: 0.45 },
  { x: 184, dy: 4, w: 6, h: 2, type: "dash", alpha: 0.70 },
  { x: 206, dy: 9, w: 3, h: 1, type: "gravel", alpha: 0.40 },
  { x: 228, dy: 2, w: 8, h: 3, type: "fissure" },
  { x: 254, dy: 4, w: 6, h: 3, type: "pebble_3d" },
  { x: 282, dy: -1, w: 6, h: 1, type: "surface_crest" },
  { x: 304, dy: 6, w: 5, h: 1, type: "dash", alpha: 0.60 },
  { x: 326, dy: 8, w: 4, h: 2, type: "gravel", alpha: 0.50 },
  { x: 348, dy: 3, w: 7, h: 3, type: "pebble_3d" },
  { x: 378, dy: 5, w: 4, h: 1, type: "dash", alpha: 0.55 },
  { x: 402, dy: 2, w: 7, h: 3, type: "fissure" },
  { x: 430, dy: -1, w: 8, h: 1, type: "surface_crest" },
  { x: 456, dy: 7, w: 4, h: 2, type: "pebble_3d" },
];

/* ─── 16-Bit Masterpiece Cute Dinosaur (Unified Single Character) ───
 * Sculpted with accurate theropod dinosaur anatomy & cute chibi proportions:
 *   - Pure monochrome themeColor identical to clouds and road
 *   - Volumetric alpha tokens:
 *       '@' = 1.00 (Specular sunlight highlight on cranium, dorsal plates, snout crest)
 *       '*' = 0.90 (Sunlit scale/flesh volume)
 *       '#' = 0.78 (Dense core body mass)
 *       '=' = 0.50 (Jaw crease, mouth cavity, armpit, thigh separation shadow)
 *       '~' = 0.32 (Underbelly ambient bounce)
 *       'E' = Interactive Eye Socket with Mouse-Tracking Pupil & Catchlight
 *       'X' = Shocked / Dizzy Game Over Eye
 *   - Dimensions:
 *       Standing: 22 width x 24 height
 *       Ducking: 30 width x 14 height
 */

// 1. IDLE (22 x 24): Cute standing / ready pose with perky tail, tiny arms, and 3-toed feet
const SPRITE_DINO_IDLE = [
  "............@@@@@@@...", // 00: Cute rounded cranium dome
  "..........@@*********.", // 01: Cranium top & snout bridge
  ".........@***#EEEE***@", // 02: Brow, eye socket, upper snout
  ".........@***#EEEE***@", // 03: Big eye socket, rounded snout
  ".........@*##########.", // 04: Chubby cheek & rounded snout front
  ".........@*#####====..", // 05: Cute smile crease & upper lip
  ".........@*###===.....", // 06: Open happy mouth cavity
  ".........@*#####*#....", // 07: Cute baby lower jaw / chin!
  "..........@******#....", // 08: Throat curve
  ".........@@*******#...", // 09: Dorsal plate 1 top & neck
  "@.......@@@********#..", // 10: Tail tip & plate 1 base
  "@@*....@@@***#@@@@@@..", // 11: Tail & plate 2 & cute baby arm!
  "@@**#.@@******#@**#...", // 12: Tail & plate 2 base & baby hand
  "@@***@@********#==....", // 13: Tail into back & round belly
  "@@****************#...", // 14: Solid torso & pot-belly
  ".@@***************#...", // 15: Full solid body
  "..@***************#...", // 16: Pelvis & thigh root
  "...@****#..@******#...", // 17: Thigh separation
  "...@****#...@*****#...", // 18: Thigh mass
  "....@***#....@****#...", // 19: Calves
  "....@**#.....@***#....", // 20: Digitigrade ankles
  "....@**#.....@***#....", // 21: Ankle joints
  "...@@**=....@@**=.....", // 22: Foot pads
  "...@@***....@@***.....", // 23: 3-toed cute claws planted flush
];

// 2. RUN0 (22 x 24): Right foot planted, left kicking back in stride
const SPRITE_DINO_RUN0 = [
  "............@@@@@@@...", // 00
  "..........@@*********.", // 01
  ".........@***#EEEE***@", // 02
  ".........@***#EEEE***@", // 03
  ".........@*##########.", // 04
  ".........@*#####====..", // 05
  ".........@*###===.....", // 06
  ".........@*#####*#....", // 07
  "..........@******#....", // 08
  ".........@@*******#...", // 09
  "@.......@@@********#..", // 10
  "@@*....@@@***#@@@@@@..", // 11: Arms forward
  "@@**#.@@******#@**#...", // 12
  "@@***@@********#==....", // 13
  "@@****************#...", // 14
  ".@@***************#...", // 15
  "..@***************#...", // 16
  "...@****#...@*****#...", // 17: Rear leg lifted back, front leg forward
  "...@****#....@****#...", // 18
  "....@***#.....@***#...", // 19
  "....@**#......@**#....", // 20
  ".....==......@@**=....", // 21: Rear leg kicked up
  "............@@***.....", // 22: Front foot planted!
  "............@@***.....", // 23: Ground contact
];

// 3. RUN1 (22 x 24): Alternate stride with left foot planted, right kicking back
const SPRITE_DINO_RUN1 = [
  "............@@@@@@@...", // 00
  "..........@@*********.", // 01
  ".........@***#EEEE***@", // 02
  ".........@***#EEEE***@", // 03
  ".........@*##########.", // 04
  ".........@*#####====..", // 05
  ".........@*###===.....", // 06
  ".........@*#####*#....", // 07
  "..........@******#....", // 08
  ".........@@*******#...", // 09
  "@.......@@@********#..", // 10
  "@@*....@@@***#@@@@@@..", // 11
  "@@**#.@@******#@**#...", // 12
  "@@***@@********#==....", // 13
  "@@****************#...", // 14
  ".@@***************#...", // 15
  "..@***************#...", // 16
  "...@****#...@*****#...", // 17: Alternate running stride
  "....@***#....@****#...", // 18
  "....@***#.....@***#...", // 19
  "....@**#.......==.....", // 20: Front leg kicked up
  "...@@**=..............", // 21
  "...@@***..............", // 22: Rear foot planted!
  "...@@***..............", // 23: Ground contact
];

// 4. JUMP (22 x 24): Airborne tuck with arms raised and feet pulled up
const SPRITE_DINO_JUMP = [
  "............@@@@@@@...", // 00
  "..........@@*********.", // 01
  ".........@***#EEEE***@", // 02
  ".........@***#EEEE***@", // 03
  ".........@*##########.", // 04
  ".........@*#####====..", // 05
  ".........@*###===.....", // 06
  ".........@*#####*#....", // 07
  "..........@******#....", // 08
  ".........@@*******#...", // 09
  "@.......@@@********#..", // 10
  "@@*....@@@***#@@@@@@..", // 11: Little arms up cheering
  "@@**#.@@******#@**#...", // 12
  "@@***@@********#==....", // 13
  "@@****************#...", // 14
  ".@@***************#...", // 15
  "..@***************#...", // 16
  "...@****#..@******#...", // 17: Both legs tucked up tight!
  "....@***#==*#=........", // 18: Tucked knees
  ".....@*#=..==.........", // 19: Tucked feet
  "......................", // 20: Airborne!
  "......................", // 21: Airborne!
  "......................", // 22: Clear air below
  "......................", // 23: Clear air above ground
];

// 5. DEAD (22 x 24): Dizzy / shocked cartoon eyes upon collision
const SPRITE_DINO_DEAD = [
  "............@@@@@@@...", // 00
  "..........@@*********.", // 01
  ".........@***#XXXX***@", // 02: Shocked X eye!
  ".........@***#XXXX***@", // 03: Shocked X eye!
  ".........@*##########.", // 04
  ".........@*#####====..", // 05
  ".........@*###===.....", // 06
  ".........@*#####*#....", // 07
  "..........@******#....", // 08
  ".........@@*******#...", // 09
  "@.......@@@********#..", // 10
  "@@*....@@@***#@@@@@@..", // 11: Shocked arms
  "@@**#.@@******#@**#...", // 12
  "@@***@@********#==....", // 13
  "@@****************#...", // 14
  ".@@***************#...", // 15
  "..@***************#...", // 16
  "...@****#..@******#...", // 17
  "...@****#...@*****#...", // 18
  "....@***#....@****#...", // 19
  "....@**#.....@***#....", // 20
  "....@**#.....@***#....", // 21
  "...@@**=....@@**=.....", // 22
  "...@@***....@@***.....", // 23
];

// 6. DUCK0 (30 x 14): Low streamlined predatory scuttle
const SPRITE_DINO_DUCK0 = [
  "....................@@@@@@@...", // 00: Low flat cranium
  "..................@@*********.", // 01: Low head & snout
  ".........@@@.....@***#EEEE***@", // 02: Plate 1 & eye
  ".......@@***@...@***#EEEE***@", // 03: Plate 1 & eye + snout
  ".....@@*****@...@*##########.", // 04: Plate 2 & snout
  "...@@*******@@@@@*#####====..", // 05: Plate 2 & mouth crease
  ".@@***********#@*###===......", // 06: Streamlined spine & mouth
  "@@************#@*#####*#@@@@.", // 07: Solid body & tiny arm forward!
  "@@************#@******#@**#..", // 08: Belly & 2-claw hand
  "@***##@@*******#==............", // 09: Underbelly & rear leg forward
  "@*#.....@***#....@***#.......", // 10: Low scuttle leg stride
  "==.....@**#=.....@**#=.......", // 11: Shins
  "......@@**=.....@@**=........", // 12: Foot pads
  "......@@***.....@@***........", // 13: Planted claws on ground
];

// 7. DUCK1 (30 x 14): Alternate scuttle stride
const SPRITE_DINO_DUCK1 = [
  "....................@@@@@@@...", // 00
  "..................@@*********.", // 01
  ".........@@@.....@***#EEEE***@", // 02
  ".......@@***@...@***#EEEE***@", // 03
  ".....@@*****@...@*##########.", // 04
  "...@@*******@@@@@*#####====..", // 05
  ".@@***********#@*###===......", // 06
  "@@************#@*#####*#@@@@.", // 07
  "@@************#@******#@**#..", // 08
  "@***##@@*******#==............", // 09
  "@*#......@***#....@***#......", // 10: Alternate scuttle stride
  "==......@**#=.....@**#=......", // 11
  ".......@@**=.....@@**=.......", // 12
  ".......@@***.....@@***.......", // 13
];

const COMPILED_DINO_IDLE = compileCloudPattern(SPRITE_DINO_IDLE);
const COMPILED_DINO_RUN0 = compileCloudPattern(SPRITE_DINO_RUN0);
const COMPILED_DINO_RUN1 = compileCloudPattern(SPRITE_DINO_RUN1);
const COMPILED_DINO_JUMP = compileCloudPattern(SPRITE_DINO_JUMP);
const COMPILED_DINO_DEAD = compileCloudPattern(SPRITE_DINO_DEAD);
const COMPILED_DINO_DUCK0 = compileCloudPattern(SPRITE_DINO_DUCK0);
const COMPILED_DINO_DUCK1 = compileCloudPattern(SPRITE_DINO_DUCK1);

function drawPixelSprite(
  ctx: CanvasRenderingContext2D,
  sprite: CompiledCloud,
  originX: number,
  originY: number,
  pixelSize: number,
  mainColor: string,
  onSpecialSpan?: (span: PixelSpan, drawX: number, drawY: number) => void
) {
  sprite.spansByRow.forEach((rowSpans, rowIndex) => {
    const drawY = originY + rowIndex * pixelSize;

    rowSpans.forEach((span) => {
      if (span.type === "E" || span.type === "X") {
        if (onSpecialSpan) onSpecialSpan(span, originX + span.x * pixelSize, drawY);
        return;
      }

      // Monochrome Volumetric System matching clouds, terrain & obstacles
      let tokenAlpha = 0.78;
      if (span.type === "@") {
        tokenAlpha = 1.0; // Specular crest highlight
      } else if (span.type === "*") {
        tokenAlpha = 0.90; // Sunlit scale/flesh volume
      } else if (span.type === "#") {
        tokenAlpha = 0.78; // Dense muscle mass
      } else if (span.type === "=") {
        tokenAlpha = 0.50; // Crevasse / jawline shadow
      } else if (span.type === "~") {
        tokenAlpha = 0.32; // Underbelly ambient
      }

      ctx.fillStyle = mainColor;
      ctx.globalAlpha = tokenAlpha;
      ctx.fillRect(
        originX + span.x * pixelSize,
        drawY,
        span.w * pixelSize,
        pixelSize
      );
    });
  });
}

interface CloudItem {
  x: number;
  y: number;
  speed: number;
  layer: number; // 0: Far, 1: Mid, 2: Near
  archetype: number; // 0..3
  seed: number; // For phase-shifted harmonic buoyancy
}

interface DinoGameProps {
  className?: string;
  themeColor?: string; // Hex color for T-Rex, obstacles, ground line & text (default black #000000)
  textColor?: string;
}

export function DinoGame({ className = "", themeColor = "#000000", textColor = "#000000" }: DinoGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [gameState, setGameState] = useState<"IDLE" | "PLAYING" | "GAMEOVER">("IDLE");
  const [, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive mobile check
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== "undefined" && window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Sound Synth using Web Audio API
  const playSound = useCallback((type: "jump" | "score" | "hit") => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === "jump") {
        osc.type = "square";
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(480, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === "score") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === "hit") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(50, now + 0.2);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch {
      // Audio Context fallback
    }
  }, []);

  // Load high score from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("mosby_dino_hi_score");
      if (saved) {
        setHighScore(parseInt(saved, 10) || 0);
      }
    }
  }, []);

  // Engine state refs
  const engineRef = useRef({
    state: "IDLE" as "IDLE" | "PLAYING" | "GAMEOVER",
    score: 0,
    highScore: 0,
    speed: 5.5,
    frameCount: 0,
    idleTimer: 0,
    mousePos: null as { x: number; y: number } | null,
    dino: {
      x: 30,
      y: 82,
      width: 44,
      height: 48,
      vy: 0,
      gravity: 0.65,
      jumpForce: -13.0,
      isGrounded: true,
      legFrame: 0,
      isDucking: false,
      currPupil: { x: 0, y: 0 },
      headOffset: { x: 0, y: 0 },
    },
    obstacles: [] as Array<{
      x: number;
      y: number;
      width: number;
      height: number;
      type: "cactus_small" | "cactus_large" | "bird";
    }>,
    clouds: [
      { x: 20, y: 6, speed: 0.20, layer: 0, archetype: 2, seed: 1.2 },
      { x: 170, y: 14, speed: 0.42, layer: 1, archetype: 0, seed: 3.5 },
      { x: 350, y: 7, speed: 0.24, layer: 0, archetype: 3, seed: 5.1 },
      { x: 490, y: 18, speed: 0.68, layer: 2, archetype: 1, seed: 2.8 },
      { x: 670, y: 13, speed: 0.40, layer: 1, archetype: 0, seed: 4.4 },
      { x: 840, y: 6, speed: 0.22, layer: 0, archetype: 2, seed: 0.9 },
    ] as CloudItem[],
    groundOffset: 0,
    dustParticles: [] as Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
    }>,
  });

  // Mouse / Cursor Tracking Listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const CANVAS_WIDTH = isMobile ? 480 : 850;
        const CANVAS_HEIGHT = isMobile ? 160 : 145;
        const relX = ((e.clientX - rect.left) / rect.width) * CANVAS_WIDTH;
        const relY = ((e.clientY - rect.top) / rect.height) * CANVAS_HEIGHT;
        engineRef.current.mousePos = { x: relX, y: relY };
      }
    };

    const handleMouseLeave = () => {
      engineRef.current.mousePos = null;
    };

    const container = containerRef.current;
    window.addEventListener("mousemove", handleMouseMove);
    if (container) {
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (container) {
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isMobile]);

  // Sync high score ref
  useEffect(() => {
    engineRef.current.highScore = highScore;
  }, [highScore]);

  // Action trigger (Jump / Start / Restart)
  const triggerAction = useCallback(() => {
    const engine = engineRef.current;
    if (engine.state === "IDLE" || engine.state === "GAMEOVER") {
      engine.state = "PLAYING";
      engine.score = 0;
      engine.speed = 5.5;
      engine.frameCount = 0;
      engine.dino.y = 82;
      engine.dino.vy = 0;
      engine.dino.isGrounded = true;
      engine.obstacles = [];
      engine.dustParticles = [];
      setGameState("PLAYING");
      setScore(0);
      playSound("jump");
    } else if (engine.state === "PLAYING") {
      if (engine.dino.isGrounded) {
        engine.dino.vy = engine.dino.jumpForce;
        engine.dino.isGrounded = false;
        playSound("jump");
      }
    }
  }, [playSound]);

  // Key Listener for Space / ArrowUp / W / ArrowDown / S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp" || e.key === "w" || e.key === "W") {
        if (containerRef.current?.contains(document.activeElement) || engineRef.current.state === "PLAYING") {
          e.preventDefault();
        }
        triggerAction();
      } else if (e.code === "ArrowDown" || e.key === "s" || e.key === "S") {
        if (engineRef.current.state === "PLAYING") {
          e.preventDefault();
          engineRef.current.dino.isDucking = true;
          if (!engineRef.current.dino.isGrounded) {
            engineRef.current.dino.vy += 4;
          }
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "ArrowDown" || e.key === "s" || e.key === "S") {
        engineRef.current.dino.isDucking = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [triggerAction]);

  // Main Render & Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    // Mobile vs Desktop Canvas Specs
    const CANVAS_WIDTH = isMobile ? 480 : 850;
    const CANVAS_HEIGHT = isMobile ? 160 : 145;
    const GROUND_Y = isMobile ? 136 : 130;
    const dinoScale = isMobile ? 1.25 : 1.0;

    const render = () => {
      const engine = engineRef.current;
      const { dino } = engine;
      const s = dinoScale;

      if (!engine.dustParticles) engine.dustParticles = [];
      if (!engine.obstacles) engine.obstacles = [];
      if (!engine.clouds) engine.clouds = [];

      engine.idleTimer = (engine.idleTimer + 1) % 10000;

      // ── Cloud Animation (Continuous across ALL states: IDLE, PLAYING, GAMEOVER) ──
      const pixelSize = Math.max(1, Math.round(2 * s));

      engine.clouds.forEach((cloud) => {
        // Multi-tier parallax kinematics:
        // Near layers accelerate more than far layers during running
        const layerMultiplier = 1.0 + cloud.layer * 0.32;
        const runFactor = engine.state === "PLAYING"
          ? (0.85 + (engine.speed / 5.5) * 0.35) * layerMultiplier
          : 0.85;

        cloud.x -= cloud.speed * runFactor;

        const sprite = COMPILED_CLOUDS[cloud.archetype] || COMPILED_CLOUDS[0];
        const cloudPxWidth = sprite.width * pixelSize;

        // Clean pop-free wrap: only reset when the rightmost pixel is well off-screen
        if (cloud.x < -(cloudPxWidth + 40)) {
          cloud.x = CANVAS_WIDTH + 20 + Math.random() * 80;

          // Re-roll archetype & altitude harmonious with the layer's atmosphere
          if (cloud.layer === 0) {
            cloud.y = 4 + Math.random() * 8; // High distant sky (Y: 4-12)
            cloud.archetype = Math.random() > 0.45 ? 2 : 3;
            cloud.speed = 0.18 + Math.random() * 0.08;
          } else if (cloud.layer === 1) {
            cloud.y = 12 + Math.random() * 10; // Mid sky (Y: 12-22)
            cloud.archetype = Math.random() > 0.35 ? 0 : 3;
            cloud.speed = 0.38 + Math.random() * 0.12;
          } else {
            cloud.y = 18 + Math.random() * 12; // Low-mid sky (Y: 18-30)
            cloud.archetype = Math.random() > 0.4 ? 1 : 0;
            cloud.speed = 0.62 + Math.random() * 0.15;
          }
        }
      });

      // Dynamic Dino Hitbox & Resting Y
      const dinoWidth = (dino.isDucking ? 60 : 44) * dinoScale;
      const dinoHeight = (dino.isDucking ? 28 : 48) * dinoScale;
      dino.width = dinoWidth;
      dino.height = dinoHeight;

      // ── Physics Updates ──
      if (engine.state === "PLAYING") {
        engine.frameCount++;
        engine.score = Math.floor(engine.frameCount / 5);

        if (engine.frameCount % 300 === 0 && engine.speed < 14) {
          engine.speed += 0.4;
        }

        if (engine.score > 0 && engine.score % 100 === 0 && engine.frameCount % 5 === 0) {
          playSound("score");
        }

        dino.vy += dino.gravity;
        dino.y += dino.vy;

        const restingY = GROUND_Y - dinoHeight;

        if (dino.y >= restingY) {
          dino.y = restingY;
          dino.vy = 0;
          dino.isGrounded = true;
        } else if (dino.isGrounded) {
          dino.y = restingY;
        }

        if (engine.frameCount % 5 === 0) {
          dino.legFrame = (dino.legFrame + 1) % 2;
        }

        // Loop 480px desert road strata tile smoothly
        engine.groundOffset = (engine.groundOffset + engine.speed) % 480;

        // Dynamic Running Dust Particle Emitter
        if (dino.isGrounded && engine.frameCount % 4 === 0) {
          engine.dustParticles.push({
            x: dino.x + (dino.isDucking ? 4 * s : 8 * s),
            y: GROUND_Y - 2 * s,
            vx: -(1.5 + Math.random() * 1.8),
            vy: -(0.3 + Math.random() * 0.7),
            life: 14,
            maxLife: 14,
            size: Math.random() > 0.5 ? 2 * s : 3 * s,
          });
        }

        // Obstacle Spawning with authentic pixel dimensions
        const minGap = (isMobile ? 180 : 230) + engine.speed * 12;
        const lastObstacle = engine.obstacles[engine.obstacles.length - 1];

        if (!lastObstacle || CANVAS_WIDTH - lastObstacle.x > minGap) {
          if (Math.random() < 0.024) {
            const rand = Math.random();

            if (rand < 0.48) {
              const sprite = COMPILED_CACTUS_SMALL;
              const w = sprite.width * pixelSize;
              const h = sprite.height * pixelSize;
              engine.obstacles.push({
                x: CANVAS_WIDTH,
                y: GROUND_Y - h,
                width: w,
                height: h,
                type: "cactus_small",
              });
            } else if (rand < 0.82) {
              const sprite = COMPILED_CACTUS_LARGE;
              const w = sprite.width * pixelSize;
              const h = sprite.height * pixelSize;
              engine.obstacles.push({
                x: CANVAS_WIDTH,
                y: GROUND_Y - h,
                width: w,
                height: h,
                type: "cactus_large",
              });
            } else if (engine.score > 140) {
              const sprite = COMPILED_BIRD_UP;
              const w = sprite.width * pixelSize;
              const h = sprite.height * pixelSize;
              const birdY = Math.random() > 0.5 ? GROUND_Y - 48 * s : GROUND_Y - 30 * s;
              engine.obstacles.push({
                x: CANVAS_WIDTH,
                y: Math.round(birdY),
                width: w,
                height: h,
                type: "bird",
              });
            }
          }
        }

        // Move & Collide
        for (let i = engine.obstacles.length - 1; i >= 0; i--) {
          const obs = engine.obstacles[i];
          obs.x -= engine.speed;

          if (obs.x < -60) {
            engine.obstacles.splice(i, 1);
            continue;
          }

          const dinoBox = {
            left: dino.x + 8 * dinoScale,
            right: dino.x + dino.width - 8 * dinoScale,
            top: dino.y + 6 * dinoScale,
            bottom: dino.y + dinoHeight - 2,
          };

          const obsBox = {
            left: obs.x + 3 * s,
            right: obs.x + obs.width - 3 * s,
            top: obs.y + 3 * s,
            bottom: obs.y + obs.height - 2,
          };

          if (
            dinoBox.left < obsBox.right &&
            dinoBox.right > obsBox.left &&
            dinoBox.top < obsBox.bottom &&
            dinoBox.bottom > obsBox.top
          ) {
            engine.state = "GAMEOVER";
            playSound("hit");
            setGameState("GAMEOVER");
            if (engine.score > engine.highScore) {
              engine.highScore = engine.score;
              setHighScore(engine.score);
              if (typeof window !== "undefined") {
                localStorage.setItem("mosby_dino_hi_score", engine.score.toString());
              }
            }
          }
        }

        if (engine.frameCount % 5 === 0) {
          setScore(engine.score);
        }
      }

      // ── Dino Eye & Head Mouse Vector Calculations ──
      const dx = dino.x;
      const dy = dino.y;

      const eyeCenterX = dx + (dino.isDucking ? 24 * pixelSize : 16 * pixelSize);
      const eyeCenterY = dy + 3 * pixelSize;

      let targetPupilShiftX = 0;
      let targetPupilShiftY = 0;
      let targetHeadShiftX = 0;
      let targetHeadShiftY = 0;

      if (engine.mousePos) {
        const diffX = engine.mousePos.x - eyeCenterX;
        const diffY = engine.mousePos.y - eyeCenterY;
        const dist = Math.hypot(diffX, diffY);
        if (dist > 1) {
          const dirX = diffX / dist;
          const dirY = diffY / dist;
          const maxPupilRangeX = 1.0 * pixelSize;
          const maxPupilRangeY = 0.5 * pixelSize;
          targetPupilShiftX = dirX * maxPupilRangeX;
          targetPupilShiftY = dirY * maxPupilRangeY;

          if (engine.state === "IDLE") {
            targetHeadShiftX = Math.max(-1.5 * s, Math.min(2.5 * s, dirX * 2.2 * s));
            targetHeadShiftY = Math.max(-2.2 * s, Math.min(2.2 * s, dirY * 2.2 * s));
          }
        }
      } else if (engine.state === "IDLE") {
        // Soft ambient idle look around when mouse is away
        const gazeAngle = engine.idleTimer * 0.025;
        targetPupilShiftX = Math.cos(gazeAngle) * 0.7 * pixelSize;
        targetPupilShiftY = Math.sin(gazeAngle * 0.7) * 0.4 * pixelSize;
      }

      // Smooth lerp for pupil offset and head tilt
      dino.currPupil.x += (targetPupilShiftX - dino.currPupil.x) * 0.22;
      dino.currPupil.y += (targetPupilShiftY - dino.currPupil.y) * 0.22;
      dino.headOffset.x += (targetHeadShiftX - dino.headOffset.x) * 0.18;
      dino.headOffset.y += (targetHeadShiftY - dino.headOffset.y) * 0.18;

      // ── DRAW CANVAS GRAPHICS ──
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      const mainColor = themeColor || "#000000";
      const txtColor = textColor || "#000000";

      // 1. Realistic Volumetric Pixel Art Clouds
      ctx.fillStyle = mainColor;
      ctx.imageSmoothingEnabled = false;

      engine.clouds.forEach((cloud) => {
        const sprite = COMPILED_CLOUDS[cloud.archetype] || COMPILED_CLOUDS[0];

        // Atmospheric micro-buoyancy (gentle harmonic float)
        const floatBob = Math.sin(engine.idleTimer * 0.022 + cloud.seed) * (1.2 * s);
        const originX = Math.round(cloud.x);
        const originY = Math.round(cloud.y + floatBob);

        // Calibrated 3-tier atmospheric layer alphas
        let baseAlpha = 0.55;
        if (cloud.layer === 0) baseAlpha = 0.32; // Distant high-altitude wisps
        else if (cloud.layer === 1) baseAlpha = 0.58; // Midground cumulus
        else if (cloud.layer === 2) baseAlpha = 0.85; // Majestic foreground cruisers

        sprite.spansByRow.forEach((rowSpans, rowIndex) => {
          const drawY = originY + rowIndex * pixelSize;

          rowSpans.forEach((span) => {
            let tokenAlpha = baseAlpha;
            if (span.type === "@") {
              tokenAlpha = Math.min(1.0, baseAlpha * 1.35); // Specular crest highlight
            } else if (span.type === "*") {
              tokenAlpha = Math.min(0.96, baseAlpha * 1.15); // Fluffy sunlit volume
            } else if (span.type === "#") {
              tokenAlpha = baseAlpha * 0.90; // Dense midtone body
            } else if (span.type === "=") {
              tokenAlpha = baseAlpha * 0.60; // Crevasse / valley crease shadow
            } else if (span.type === "~") {
              tokenAlpha = baseAlpha * 0.38; // Underbelly ambient ground-bounce shade
            } else if (span.type === ":") {
              tokenAlpha = baseAlpha * 0.20; // Wispy Bayer vapor fringe
            }

            ctx.globalAlpha = tokenAlpha;
            ctx.fillRect(
              originX + span.x * pixelSize,
              drawY,
              span.w * pixelSize,
              pixelSize
            );
          });
        });
      });
      ctx.globalAlpha = 1.0;

      // Update Dust Particles
      for (let i = engine.dustParticles.length - 1; i >= 0; i--) {
        const p = engine.dustParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        if (p.life <= 0) {
          engine.dustParticles.splice(i, 1);
        }
      }

      // 2. Realistic Desert Road & Strata Terrain
      ctx.fillStyle = mainColor;
      ctx.imageSmoothingEnabled = false;

      // A. Ground baseline (solid top crust)
      const baseLineHeight = Math.max(1, Math.round(2 * s));
      ctx.globalAlpha = 0.90;
      ctx.fillRect(0, GROUND_Y, CANVAS_WIDTH, baseLineHeight);

      // B. Desert Surface & Sub-Surface Gravel Strata (Rich 480px Tile Pattern)
      const tileWidth = 480;
      const startX = -Math.floor(engine.groundOffset % tileWidth);

      for (let offset = startX; offset < CANVAS_WIDTH; offset += tileWidth) {
        DESERT_GROUND_FEATURES.forEach((feat) => {
          const gx = Math.round(offset + feat.x * s);
          const gy = Math.round(GROUND_Y + feat.dy * s);
          const gw = Math.round(feat.w * s);
          const gh = Math.round(feat.h * s);

          if (gx + gw > 0 && gx < CANVAS_WIDTH) {
            if (feat.type === "pebble_3d") {
              // 3D Volumetric Pebble: Sunlit crest + shadow base
              ctx.globalAlpha = 0.85;
              ctx.fillRect(gx, gy, Math.max(1, gw - 1), 1 * s);
              ctx.globalAlpha = 0.45;
              ctx.fillRect(gx + 1, gy + 1 * s, Math.max(1, gw - 1), Math.max(1, gh - 1 * s));
            } else if (feat.type === "surface_crest") {
              // Micro-elevation along top edge
              ctx.globalAlpha = 0.95;
              ctx.fillRect(gx, GROUND_Y - 1 * s, gw, 1 * s);
            } else if (feat.type === "fissure") {
              // Ground crack notch
              ctx.globalAlpha = 0.35;
              ctx.fillRect(gx, gy, 2 * s, 1 * s);
              ctx.fillRect(gx + 2 * s, gy + 1 * s, 2 * s, 1 * s);
              ctx.fillRect(gx + 4 * s, gy + 2 * s, 2 * s, 1 * s);
            } else {
              // Fine gravel dash / fleck
              ctx.globalAlpha = feat.alpha || 0.60;
              ctx.fillRect(gx, gy, gw, gh);
            }
          }
        });
      }
      ctx.globalAlpha = 1.0;

      // C. Dynamic Running Dust Particles
      engine.dustParticles.forEach((p) => {
        const alpha = (p.life / p.maxLife) * 0.45;
        ctx.fillStyle = mainColor;
        ctx.globalAlpha = alpha;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
      });
      ctx.globalAlpha = 1.0;

      // 3. Realistic & Cute Volumetric Dinosaur (Unified Single Character)
      const breathY = engine.state === "IDLE" ? Math.sin(engine.idleTimer * 0.08) * (1.2 * s) : 0;
      const originX = Math.round(dx);
      const originY = Math.round(dy + breathY);

      let currentDinoSprite: CompiledCloud;
      if (engine.state === "GAMEOVER") {
        currentDinoSprite = COMPILED_DINO_DEAD;
      } else if (dino.isDucking) {
        currentDinoSprite = dino.legFrame === 0 ? COMPILED_DINO_DUCK0 : COMPILED_DINO_DUCK1;
      } else if (!dino.isGrounded) {
        currentDinoSprite = COMPILED_DINO_JUMP;
      } else if (engine.state === "IDLE") {
        currentDinoSprite = COMPILED_DINO_IDLE;
      } else {
        currentDinoSprite = dino.legFrame === 0 ? COMPILED_DINO_RUN0 : COMPILED_DINO_RUN1;
      }

      let eyeSocketPos: { x: number; y: number; w: number; h: number; isDead: boolean } | null = null;

      drawPixelSprite(ctx, currentDinoSprite, originX, originY, pixelSize, mainColor, (span, sx, sy) => {
        if (!eyeSocketPos) {
          eyeSocketPos = {
            x: sx,
            y: sy,
            w: span.w * pixelSize,
            h: pixelSize * 2,
            isDead: span.type === "X" || engine.state === "GAMEOVER",
          };
        }
      });

      // Render Dynamic Eye inside the Unified Character's Eye Socket
      if (eyeSocketPos) {
        const { x: ex, y: ey, w: ew, h: eh, isDead } = eyeSocketPos;

        // Eye Sclera (White base for high contrast & expressive cute eyes)
        ctx.fillStyle = "#FFFFFF";
        ctx.globalAlpha = 1.0;
        ctx.fillRect(ex, ey, ew, eh);

        if (isDead) {
          // Cute Stunned / Dizzy Cartoon 'X'
          ctx.fillStyle = "#18181b";
          ctx.globalAlpha = 1.0;
          const xThick = Math.max(1, Math.round(1.4 * s));
          const px1 = Math.round(ex + 1 * s);
          const px2 = Math.round(ex + ew - 1 * s - xThick);
          const py1 = Math.round(ey + 0.5 * s);
          const py2 = Math.round(ey + eh - 0.5 * s - xThick);
          const midX = Math.round(ex + ew / 2 - xThick / 2);
          const midY = Math.round(ey + eh / 2 - xThick / 2);

          ctx.fillRect(px1, py1, xThick, xThick);
          ctx.fillRect(px2, py1, xThick, xThick);
          ctx.fillRect(midX, midY, xThick, xThick);
          ctx.fillRect(px1, py2, xThick, xThick);
          ctx.fillRect(px2, py2, xThick, xThick);
        } else {
          // Cute Natural Idle Eyelid Blink (~8 frames every ~3.6s)
          const isBlinking = engine.state === "IDLE" && (engine.idleTimer % 220 < 8);

          if (isBlinking) {
            // Cute closed happy eyelid
            ctx.fillStyle = "#18181b";
            ctx.globalAlpha = 1.0;
            ctx.fillRect(ex, Math.round(ey + eh / 2), ew, Math.max(1, Math.round(1.2 * s)));
            // Cute curved outer eyelash
            ctx.fillRect(
              ex + ew - Math.max(1, Math.round(1.5 * s)),
              Math.round(ey + eh / 2 - 1 * s),
              Math.max(1, Math.round(1.5 * s)),
              Math.max(1, Math.round(1.5 * s))
            );
          } else {
            // Expressive Big Pupil with Mouse Tracking
            const pw = Math.max(1, Math.round(2.0 * s));
            const ph = Math.max(1, Math.round(2.0 * s));
            let px = ex + ew / 2 - pw / 2 + dino.currPupil.x;
            let py = ey + eh / 2 - ph / 2 + dino.currPupil.y;
            px = Math.max(ex + 0.5, Math.min(ex + ew - pw - 0.5, px));
            py = Math.max(ey + 0.5, Math.min(ey + eh - ph - 0.5, py));

            ctx.fillStyle = "#18181b";
            ctx.globalAlpha = 1.0;
            ctx.fillRect(Math.round(px), Math.round(py), pw, ph);

            // Specular Catchlight Sparkle Dot in top-left of pupil (Cute glistening eye!)
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(
              Math.round(px),
              Math.round(py),
              Math.max(1, Math.round(0.8 * s)),
              Math.max(1, Math.round(0.8 * s))
            );
          }
        }
      }
      ctx.globalAlpha = 1.0;

      // 4. Obstacles
      engine.obstacles.forEach((obs) => {
        ctx.fillStyle = mainColor;
        let sprite: CompiledCloud | null = null;

        if (obs.type === "cactus_small") {
          sprite = COMPILED_CACTUS_SMALL;
        } else if (obs.type === "cactus_large") {
          sprite = COMPILED_CACTUS_LARGE;
        } else if (obs.type === "bird") {
          const wingUp = Math.floor(engine.frameCount / 8) % 2 === 0;
          sprite = wingUp ? COMPILED_BIRD_UP : COMPILED_BIRD_DOWN;
        }

        if (sprite) {
          const originX = Math.round(obs.x);
          const originY = Math.round(obs.y);

          sprite.spansByRow.forEach((rowSpans, rowIndex) => {
            const drawY = originY + rowIndex * pixelSize;

            rowSpans.forEach((span) => {
              let tokenAlpha = 0.80;
              if (span.type === "@") {
                tokenAlpha = 1.0; // Direct sunlit crest / spine highlight
              } else if (span.type === "*") {
                tokenAlpha = 0.90; // Upper sunlit body
              } else if (span.type === "#") {
                tokenAlpha = 0.78; // Dense core mass
              } else if (span.type === "=") {
                tokenAlpha = 0.52; // Ribbed valley / crevasse shadow
              } else if (span.type === "~") {
                tokenAlpha = 0.32; // Underbelly ambient
              } else if (span.type === ":") {
                tokenAlpha = 0.20; // Fine fringe
              }

              ctx.globalAlpha = tokenAlpha;
              ctx.fillRect(
                originX + span.x * pixelSize,
                drawY,
                span.w * pixelSize,
                pixelSize
              );
            });
          });
        }
      });

      // 5. Score Text Header
      ctx.fillStyle = txtColor;
      ctx.font = isMobile ? "bold 13px monospace" : "bold 12px monospace";
      ctx.textAlign = "right";

      const currentScoreStr = String(engine.score).padStart(5, "0");
      const highScoreStr = String(engine.highScore).padStart(5, "0");
      ctx.fillText(`HI ${highScoreStr}  ${currentScoreStr}`, CANVAS_WIDTH - (isMobile ? 12 : 20), isMobile ? 24 : 22);

      // 6. Prompts
      if (engine.state === "IDLE") {
        ctx.textAlign = "center";
        ctx.font = isMobile ? "bold 12px monospace" : "bold 11px monospace";
        ctx.globalAlpha = 0.85 + Math.sin(engine.idleTimer * 0.1) * 0.15;
        ctx.fillText(
          isMobile ? "MOVE CURSOR TO LOOK • TAP TO RUN" : "MOVE CURSOR TO LOOK • PRESS SPACE OR CLICK TO RUN",
          CANVAS_WIDTH / 2,
          isMobile ? 60 : 56
        );
        ctx.font = isMobile ? "10px monospace" : "9px monospace";
        ctx.globalAlpha = 0.6;
        ctx.fillText(
          isMobile ? "TAP = JUMP / RESTART" : "SPACE / UP = JUMP  •  DOWN = DUCK",
          CANVAS_WIDTH / 2,
          isMobile ? 78 : 74
        );
        ctx.globalAlpha = 1.0;
      } else if (engine.state === "GAMEOVER") {
        ctx.textAlign = "center";
        ctx.font = isMobile ? "bold 15px monospace" : "bold 14px monospace";
        ctx.fillText("G A M E   O V E R", CANVAS_WIDTH / 2, isMobile ? 58 : 54);
        ctx.font = isMobile ? "bold 11px monospace" : "bold 10px monospace";
        ctx.globalAlpha = 0.85;
        ctx.fillText(
          isMobile ? "TAP ANYWHERE TO RETRY" : "PRESS SPACE OR TAP TO RETRY",
          CANVAS_WIDTH / 2,
          isMobile ? 80 : 76
        );
        ctx.globalAlpha = 1.0;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isMobile, playSound, textColor, themeColor]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className={`relative select-none outline-none cursor-pointer w-full ${className}`}
      onClick={triggerAction}
      onTouchStart={(e) => {
        e.preventDefault();
        triggerAction();
      }}
      aria-label="Chrome Dino Game - Press Space or Click to Jump"
    >
      <canvas
        ref={canvasRef}
        width={isMobile ? 480 : 850}
        height={isMobile ? 160 : 145}
        className="w-full h-auto block bg-transparent select-none pointer-events-none"
      />
    </div>
  );
}
