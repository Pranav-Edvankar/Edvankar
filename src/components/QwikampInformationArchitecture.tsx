"use client";

import React from "react";
import {
  Bike,
  Wrench,
  Sparkles,
  Home as HomeIcon,
  ShoppingCart,
  Truck,
  ShieldCheck,
  FileText,
  Layers,
  GitBranch,
  CheckCircle2,
  ChevronDown,
  ArrowDown,
  ArrowRight,
  Clock,
  CreditCard,
  Lock,
  Compass,
  AlertTriangle,
  Info,
  Lightbulb,
  Check,
  User,
  MapPin,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import MermaidDiagram from "./MermaidDiagram";

/* ─── Paperclip Ornament ─── */
function MetallicPaperclip({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`w-7 h-13 md:w-8 md:h-15 drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)] select-none pointer-events-none ${className}`}
      viewBox="0 0 42 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="iaClipSteel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FAFAFA" />
          <stop offset="20%" stopColor="#C8C8CC" />
          <stop offset="45%" stopColor="#FFFFFF" />
          <stop offset="70%" stopColor="#8E8E96" />
          <stop offset="90%" stopColor="#D4D4D8" />
          <stop offset="100%" stopColor="#5A5A62" />
        </linearGradient>
      </defs>
      <path
        d="M 15,16 L 15,44 A 6,6 0 0,0 27,44 L 27,16 A 9.5,9.5 0 0,0 8,16 L 8,48 A 13,13 0 0,0 34,48 L 34,22"
        stroke="rgba(0,0,0,0.35)"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(1.5, 2)"
      />
      <path
        d="M 15,16 L 15,44 A 6,6 0 0,0 27,44 L 27,16 A 9.5,9.5 0 0,0 8,16 L 8,48 A 13,13 0 0,0 34,48 L 34,22"
        stroke="url(#iaClipSteel)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── Technical Blueprint Stamp ─── */
function BlueprintCompassStamp({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 select-none opacity-80 ${className}`}>
      <svg className="w-8 h-8 text-current shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="16" cy="16" r="13" strokeDasharray="3 1.5" />
        <circle cx="16" cy="16" r="4" fill="currentColor" fillOpacity="0.1" />
        <path d="M16 3 L16 29 M3 16 L29 16" strokeDasharray="2 2" />
        <path d="M16 6 L20 16 L16 13 L12 16 Z" fill="currentColor" />
        <text x="14" y="9.5" fontSize="4.5" fontWeight="bold" fill="currentColor" fontFamily="monospace">N</text>
        <circle cx="16" cy="16" r="1" fill="currentColor" />
      </svg>
      <div className="font-mono text-[0.62rem] uppercase leading-tight tracking-wider text-neutral-600">
        <div className="font-bold text-neutral-800">ARCH-SPEC // IA-SYS-105</div>
        <div>SCALE 1:1 • 105 SVG SCREENS AUDITED</div>
      </div>
    </div>
  );
}

/* ─── Mermaid Chart Definitions Directly from UI_UX_INFORMATION_ARCHITECTURE.md ─── */
const MERMAID_CHARTS = {
  section1_overview: `
graph TD
    A[Onboarding Screen Carousel] --> B[Login Screen]
    B --> C[Verification / OTP Screen]
    C --> D[Home Page - Light & Dark Modes]

    subgraph Nav_Entry ["Home Navigation & Entry Points"]
        D -->|Navbar / Hero / 2x2 Grid| E[Shop Page]
        D -->|Navbar / Hero / 2x2 Grid| F[Repair Page - Service Center Map]
        D -->|2x2 Grid / Services| G[Service Your Cycle Page]
        D -->|2x2 Grid / Services| H[Doorstep Repair Page]
        D -->|Navbar Icon / Bottom Bar| I[Cart Page]
        D -->|Navbar Icon / Bottom Bar| J[Profile Page]
    end

    subgraph Cart_Panels ["Cart Page - Unified Management (4 Panels)"]
        I --> I1[Purchases Panel]
        I --> I2[Repair Panel]
        I --> I3[Service Panel]
        I --> I4[Doorstep Panel]
    end

    subgraph Secondary_Screens ["Detailed Views & Modal Overlays"]
        E --> E1[Product Details Page]
        E1 --> E2[Payment Success Screen]
        F --> F1[Extended Service Center Page]
        I1 & I2 & I3 & I4 --> K[Bill View / Invoice Sheet]
    end
`,

  section3_1_auth: `
sequenceDiagram
    autonumber
    actor User
    participant Onboarding as Onboarding Screen (1-3)
    participant Auth as Login Screen (OPT Screen.svg)
    participant OTP as Verification Screen (OPT Screen-1.svg)
    participant Home as Home Page

    User->>Onboarding: View Carousel (Shop, Repair, Service, Doorstep)
    Onboarding->>Auth: Click "Get Started" / "Log In"
    User->>Auth: Enter Mobile Number / Email
    Auth->>OTP: Send OTP & Navigate
    User->>OTP: Input 4/6-Digit Verification PIN
    OTP->>Home: Validate & Redirect to Home Page
`,

  section3_2_shop: `
flowchart LR
    A[Shop Catalog] --> B[Product Details Page]
    B --> C[Checkout & Payment]
    C --> D[Payment Success Screen]
    D --> E[Cart: Purchases Panel]
    E --> F{Delivery Partner Arrives?}
    F -->|Yes| G[Enter Delivery PIN]
    G --> H[Order Completed & Delivered]
    E --> I[View Bill / Invoice Sheet]
`,

  section3_3_repair: `
flowchart TD
    A[Repair Entry: Navbar / Grid / Hero] --> B[Service Center Map View]
    B -->|Filter: Nearby / Top-Rated / Open Now| C[Select Service Center]
    C -->|Optional| C1[Extended Service Center Info]
    C & C1 --> D[Fill Details Form]
    D --> E[View Estimated Price & Confirm]
    E --> F[Cart: Repair Panel]
    F --> G[Pickup PIN Verification at Home]
    G --> H[Notification: Reached Service Center]
    H --> I[Service Center Sends Quotation Sheet]
    I --> J{User Decision}
    J -->|Accept| K[Cycle Repaired]
    K --> L[Delivery Partner Arrives Home]
    L --> M[Enter Delivery PIN]
    M --> N[Status: Repaired & Delivered]
    J -->|Reject| O[Cycle Returned Unrepaired]
    O --> P[User Pays Logistics Fee]
    P --> Q[Enter Delivery PIN]
    Q --> R[Status: Delivered Unrepaired]
    F & I --> S[View Bill / Invoice]
`,

  section3_4_service: `
flowchart LR
    A[Service Page] --> B[Select Plan: Basic / Standard / Premium]
    B --> C[Fill Cycle Details & Location]
    C --> D[View Estimated Cost & Book]
    D --> E[Cart: Service Panel]
    E --> F[Enter Pickup PIN to Delivery Partner]
    F --> G[Notification: Reached Service Center]
    G --> H[Service Completed & Dispatched]
    H --> I[Enter Delivery PIN to Partner]
    I --> J[Status: Service Completed]
`,

  section3_5_doorstep: `
flowchart LR
    A[Doorstep Page] --> B[Select Plan: Basic / Standard / Premium]
    B --> C[Fill Details & Preferred Time Slot]
    C --> D[View Estimated Cost & Book]
    D --> E[Cart: Doorstep Panel]
    E --> F[Mechanic Arrives at Home]
    F --> G[Enter Arrival PIN to Start Repair]
    G --> H[Status: Repairing at Home]
    H --> I[Job Completion & Sign-off]
    I --> J[Status: Doorstep Repair Completed]
`,

  section4_cart: `
graph TD
    Sub[Cart Central Navigation Bar] --> P1[1. Purchases Panel]
    Sub --> P2[2. Repair Panel]
    Sub --> P3[3. Service Panel]
    Sub --> P4[4. Doorstep Panel]

    P1 --> |Tracks| T1[Cycle Purchases & Store Deliveries]
    P2 --> |Tracks| T2[Workshop Pickups, Quotations & Deliveries]
    P3 --> |Tracks| T3[Subscription Maintenance Visits & Center Logs]
    P4 --> |Tracks| T4[At-Home Mechanic Appointments & Work Progress]

    P1 & P2 & P3 & P4 --> Invoice[Bill View Sheet - Itemized Charges & Taxes]
`,

  section5_pin_handshake: `
sequenceDiagram
    autonumber
    actor User
    participant Partner as Delivery Partner / Mechanic
    participant App as Qwikamp App (Cart Panel)

    alt Stage A: Home Pickup Verification
        Partner->>User: Arrives at Home & Gives Pickup PIN
        User->>App: Inputs Pickup PIN into Cart Panel
        App->>Partner: Validates PIN & Unlocks Collection
    else Stage B: Home Delivery Verification
        Partner->>User: Arrives at Home & Gives Delivery PIN
        User->>App: Inputs Delivery PIN into Cart Panel
        App->>Partner: Validates PIN & Unlocks Handover
    else Stage C: Doorstep Mechanic Arrival
        Partner->>User: Mechanic Arrives & Gives Arrival PIN
        User->>App: Inputs Arrival PIN into Cart Panel
        App->>Partner: Job Session Started
    end
`,
};

export function QwikampInformationArchitecture() {
  return (
    <div id="ia-spec" className="relative w-full my-8 border-2 border-black/25 bg-[#F9F8F5] shadow-2xl rounded-sm">
      {/* ─── Archival Drafting Grid Background ─── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      {/* ─── Top-Right Corner Paperclip ─── */}
      <div className="absolute -top-4 right-8 z-30 pointer-events-none">
        <MetallicPaperclip />
      </div>

      {/* ═════════════════════════════════════════════════════════════════
          HEADER: DOCUMENT TITLE & ARCHIVAL SPEC STRIP
          ═════════════════════════════════════════════════════════════════ */}
      <header className="relative z-10 border-b-2 border-black/20 bg-[#F4F1EA] px-4 sm:px-6 py-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2E5EFF] animate-pulse" />
              <span className="font-mono text-[0.65rem] sm:text-xs font-bold uppercase tracking-widest text-[#2E5EFF]">
                MASTER SPECIFICATION // UI_UX_INFORMATION_ARCHITECTURE.md
              </span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-neutral-950 leading-tight">
              Qwikamp — UI/UX Information Architecture &amp; Systems Architecture
            </h3>
          </div>
          <BlueprintCompassStamp className="hidden sm:flex" />
        </div>

        {/* Document Meta Callout */}
        <div className="mt-4 p-3.5 bg-white/90 border border-black/15 rounded-sm font-mono text-[0.68rem] text-neutral-800 space-y-1.5 shadow-2xs">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span><strong>Document Version:</strong> 1.1.0 (Post Design SVG Audit)</span>
            <span className="text-neutral-400">•</span>
            <span><strong>Source-of-Truth Reference:</strong> <code className="bg-black/5 px-1 py-0.5 rounded text-neutral-900">svgqwikamp</code> Asset Corpus (105 SVG Screens &amp; States)</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span><strong>Target Platform:</strong> Mobile &amp; Web Applications</span>
            <span className="text-neutral-400">•</span>
            <span><strong>Design System:</strong> Qwikamp Design System (4-Tier Token Architecture)</span>
          </div>
          <div>
            <strong>Core Domains:</strong> E-Commerce Shopping, Workshop Repairs, Subscription Maintenance, Doorstep Repairs
          </div>
        </div>
      </header>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 1: SYSTEM OVERVIEW & CORE INFORMATION ARCHITECTURE
          ═════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 p-4 sm:p-6 md:p-8 border-b-2 border-black/20 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-neutral-900 text-white">
              SECTION 1
            </span>
            <span className="font-mono text-[0.7rem] uppercase tracking-widest text-neutral-500 font-bold">
              SYSTEM OVERVIEW &amp; CORE INFORMATION ARCHITECTURE
            </span>
          </div>
          <h4 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-neutral-950">
            1. System Overview &amp; Core Information Architecture
          </h4>
          <p className="font-serif text-sm sm:text-base text-neutral-800 leading-relaxed mt-2 max-w-4xl">
            Qwikamp is an end-to-end cycling mobility ecosystem integrating retail shopping, workshop repairs, subscription maintenance plans, and on-demand doorstep mechanical services.
          </p>
        </div>

        {/* ── Mermaid Diagram: System Overview (graph TD) ── */}
        <MermaidDiagram
          chart={MERMAID_CHARTS.section1_overview}
          caption="SECTION 1 MERMAID DIAGRAM // GRAPH TD — CORE INFORMATION ARCHITECTURE"
        />
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 2: GLOBAL SITEMAP & NAVIGATION HIERARCHY
          ═════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 p-4 sm:p-6 md:p-8 border-b-2 border-black/20 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-neutral-900 text-white">
              SECTION 2
            </span>
            <span className="font-mono text-[0.7rem] uppercase tracking-widest text-neutral-500 font-bold">
              GLOBAL SITEMAP &amp; NAVIGATION HIERARCHY
            </span>
          </div>
          <h4 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-neutral-950">
            2. Global Sitemap &amp; Navigation Hierarchy
          </h4>
          <h5 className="font-display text-base uppercase text-neutral-800 mt-2">
            2.1 Navigation Hierarchy &amp; Entry Points Matrix
          </h5>
          <p className="font-serif text-xs sm:text-sm text-neutral-700 leading-relaxed mt-1">
            The complete matrix mapping all 13 core application destinations, production SVG file assets, user entry points, navigation scope, and primary operational purpose.
          </p>
        </div>

        {/* Matrix Table with Clean Horizontal Overflow Scroll Container */}
        <div className="border-2 border-black/20 bg-white rounded-sm shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-serif border-collapse min-w-[760px]">
              <thead>
                <tr className="bg-[#F4F1EA] border-b-2 border-black/20 font-mono text-[0.65rem] uppercase text-neutral-900 tracking-wider">
                  <th className="p-3 border-r border-black/15 font-bold">Page / Section</th>
                  <th className="p-3 border-r border-black/15 font-bold">SVG File Reference</th>
                  <th className="p-3 border-r border-black/15 font-bold">Entry Points</th>
                  <th className="p-3 border-r border-black/15 font-bold">Navigation Scope</th>
                  <th className="p-3 font-bold">Primary Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                <tr className="hover:bg-neutral-50">
                  <td className="p-3 border-r border-black/10 font-bold text-neutral-950">Onboarding</td>
                  <td className="p-3 border-r border-black/10 font-mono text-[0.65rem] text-blue-700">`Onboarding Screen*.svg`, `ONBORDING FLOW.svg`</td>
                  <td className="p-3 border-r border-black/10">App Launch (First Time)</td>
                  <td className="p-3 border-r border-black/10">Modal / Slide Flow</td>
                  <td className="p-3 text-neutral-700">Feature Highlights &amp; Value Proposition</td>
                </tr>
                <tr className="hover:bg-neutral-50 bg-[#FBF9F5]/40">
                  <td className="p-3 border-r border-black/10 font-bold text-neutral-950">Login</td>
                  <td className="p-3 border-r border-black/10 font-mono text-[0.65rem] text-blue-700">`OPT Screen.svg`</td>
                  <td className="p-3 border-r border-black/10">Post-Onboarding / Session Expiry</td>
                  <td className="p-3 border-r border-black/10">Dedicated Auth Screen</td>
                  <td className="p-3 text-neutral-700">Mobile Number / Email Authentication</td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="p-3 border-r border-black/10 font-bold text-neutral-950">OTP Verification</td>
                  <td className="p-3 border-r border-black/10 font-mono text-[0.65rem] text-blue-700">`OPT Screen-1.svg`</td>
                  <td className="p-3 border-r border-black/10">Post-Login Submission</td>
                  <td className="p-3 border-r border-black/10">Dedicated Auth Screen</td>
                  <td className="p-3 text-neutral-700">Security Code Validation</td>
                </tr>
                <tr className="hover:bg-neutral-50 bg-[#FBF9F5]/40">
                  <td className="p-3 border-r border-black/10 font-bold text-neutral-950">Home Page</td>
                  <td className="p-3 border-r border-black/10 font-mono text-[0.65rem] text-blue-700">`Home page*.svg`, `Dark home page*.svg`</td>
                  <td className="p-3 border-r border-black/10">Authenticated Root</td>
                  <td className="p-3 border-r border-black/10">Top Nav, Hero, 2x2 Grid, Bottom Nav</td>
                  <td className="p-3 text-neutral-700">Main Hub &amp; Direct Shortcuts (Light &amp; Dark)</td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="p-3 border-r border-black/10 font-bold text-neutral-950">Shop Page</td>
                  <td className="p-3 border-r border-black/10 font-mono text-[0.65rem] text-blue-700">`Shop page*.svg`</td>
                  <td className="p-3 border-r border-black/10">Navbar, 2x2 Grid, Hero CTA</td>
                  <td className="p-3 border-r border-black/10">Catalog, Filters, Cycle Cards</td>
                  <td className="p-3 text-neutral-700">Browse &amp; Filter Cycles</td>
                </tr>
                <tr className="hover:bg-neutral-50 bg-[#FBF9F5]/40">
                  <td className="p-3 border-r border-black/10 font-bold text-neutral-950">Product Details</td>
                  <td className="p-3 border-r border-black/10 font-mono text-[0.65rem] text-blue-700">`product details page.svg`</td>
                  <td className="p-3 border-r border-black/10">Shop Catalog Card Click</td>
                  <td className="p-3 border-r border-black/10">Image Carousel, Specs, Color Picker, Buy CTA</td>
                  <td className="p-3 text-neutral-700">Detailed Specs &amp; Purchase Trigger</td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="p-3 border-r border-black/10 font-bold text-neutral-950">Repair Page</td>
                  <td className="p-3 border-r border-black/10 font-mono text-[0.65rem] text-blue-700">`Service center page*.svg`</td>
                  <td className="p-3 border-r border-black/10"><strong className="text-red-700 font-mono text-[0.65rem]">3 Entry Points:</strong> Navbar, Hero Section, 2x2 Grid</td>
                  <td className="p-3 border-r border-black/10">Map Search, Filter Tabs, Workshop Pins</td>
                  <td className="p-3 text-neutral-700">Select Service Center &amp; View Map</td>
                </tr>
                <tr className="hover:bg-neutral-50 bg-[#FBF9F5]/40">
                  <td className="p-3 border-r border-black/10 font-bold text-neutral-950">Extended Service Center</td>
                  <td className="p-3 border-r border-black/10 font-mono text-[0.65rem] text-blue-700">`extended serivce center page.svg`</td>
                  <td className="p-3 border-r border-black/10">Service Center Pin Click</td>
                  <td className="p-3 border-r border-black/10">Workshop Profile, Hours, Ratings, Slots</td>
                  <td className="p-3 text-neutral-700">Workshop Details &amp; Rating Review</td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="p-3 border-r border-black/10 font-bold text-neutral-950">Service Your Cycle</td>
                  <td className="p-3 border-r border-black/10 font-mono text-[0.65rem] text-blue-700">`Home page-*.svg` (Services section)</td>
                  <td className="p-3 border-r border-black/10">2x2 Grid, Home Services Section</td>
                  <td className="p-3 border-r border-black/10">Plan Cards (Basic/Standard/Premium), Details</td>
                  <td className="p-3 text-neutral-700">Book Subscription Maintenance Plans</td>
                </tr>
                <tr className="hover:bg-neutral-50 bg-[#FBF9F5]/40">
                  <td className="p-3 border-r border-black/10 font-bold text-neutral-950">Doorstep Repair</td>
                  <td className="p-3 border-r border-black/10 font-mono text-[0.65rem] text-blue-700">`Home page-*.svg` (Doorstep section)</td>
                  <td className="p-3 border-r border-black/10">2x2 Grid, Home Services Section</td>
                  <td className="p-3 border-r border-black/10">Plan Selection, Details Form, Slot Picker</td>
                  <td className="p-3 text-neutral-700">Book At-Home Technician Visit</td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="p-3 border-r border-black/10 font-bold text-neutral-950">Cart Page</td>
                  <td className="p-3 border-r border-black/10 font-mono text-[0.65rem] text-blue-700">`booking in details*.svg` (16 states)</td>
                  <td className="p-3 border-r border-black/10">Top Navbar Icon, Bottom Bar</td>
                  <td className="p-3 border-r border-black/10">4 Sub-Panels (Purchases, Repair, Service, Doorstep)</td>
                  <td className="p-3 text-neutral-700">Booking Status, PIN Entry, Quotation Approval</td>
                </tr>
                <tr className="hover:bg-neutral-50 bg-[#FBF9F5]/40">
                  <td className="p-3 border-r border-black/10 font-bold text-neutral-950">Bill View / Invoice</td>
                  <td className="p-3 border-r border-black/10 font-mono text-[0.65rem] text-blue-700">`bill view*.svg` (3 states)</td>
                  <td className="p-3 border-r border-black/10">Cart Card &quot;View Bill&quot; Button</td>
                  <td className="p-3 border-r border-black/10">Itemized Invoice, Tax, Logistics Fees</td>
                  <td className="p-3 text-neutral-700">Breakdown of Spares, Labor, Logistics</td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="p-3 border-r border-black/10 font-bold text-neutral-950">Profile Page</td>
                  <td className="p-3 border-r border-black/10 font-mono text-[0.65rem] text-blue-700">`Dark Profile page.svg`</td>
                  <td className="p-3 border-r border-black/10">Top Navbar Avatar, Bottom Bar</td>
                  <td className="p-3 border-r border-black/10">Account Settings, Orders, Saved Cycles</td>
                  <td className="p-3 text-neutral-700">User Details, Preferences &amp; Presets</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 3: DETAILED USER FLOW ARCHITECTURES
          ═════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 p-4 sm:p-6 md:p-8 border-b-2 border-black/20 space-y-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-neutral-900 text-white">
              SECTION 3
            </span>
            <span className="font-mono text-[0.7rem] uppercase tracking-widest text-neutral-500 font-bold">
              DETAILED USER FLOW ARCHITECTURES
            </span>
          </div>
          <h4 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-neutral-950">
            3. Detailed User Flow Architectures
          </h4>
        </div>

        {/* ─── 3.1 Authentication & Onboarding Flow ─── */}
        <div className="p-5 bg-white border-2 border-black/20 rounded-sm shadow-md space-y-4">
          <div className="border-b border-black/10 pb-2">
            <span className="font-mono text-[0.62rem] text-neutral-500 uppercase tracking-widest block">FLOW SPEC 3.1</span>
            <h5 className="font-display text-lg uppercase text-neutral-900">
              3.1 Authentication &amp; Onboarding Flow
            </h5>
          </div>

          {/* Mermaid Diagram: 3.1 sequenceDiagram */}
          <MermaidDiagram
            chart={MERMAID_CHARTS.section3_1_auth}
            caption="3.1 MERMAID DIAGRAM // SEQUENCEDRAGAM — AUTHENTICATION & ONBOARDING"
          />
        </div>

        {/* ─── 3.2 Shopping Page Flow (E-Commerce & Cycle Delivery) ─── */}
        <div className="p-5 bg-white border-2 border-blue-500/70 rounded-sm shadow-md space-y-4">
          <div className="border-b border-black/10 pb-2 flex items-center justify-between">
            <div>
              <span className="font-mono text-[0.62rem] text-blue-700 uppercase tracking-widest block font-bold">FLOW SPEC 3.2</span>
              <h5 className="font-display text-lg uppercase text-neutral-900">
                3.2 Shopping Page Flow (E-Commerce &amp; Cycle Delivery)
              </h5>
            </div>
            <span className="font-mono text-[0.62rem] bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded font-bold">
              DELIVERY PIN HANDOVER
            </span>
          </div>

          <div className="space-y-2 font-serif text-xs leading-relaxed text-neutral-800">
            <p><strong>1. Catalog Browsing (`Shop page*.svg`):</strong> Browse categories (Mountain, Road, Electric, Hybrid) with dynamic filters.</p>
            <p><strong>2. Product Details View (`product details page.svg`):</strong> View technical specifications, color variants, sizing guide, and pricing.</p>
            <p><strong>3. Checkout &amp; Payment:</strong> Input delivery address, choose payment method (Card/UPI/NetBanking), submit payment.</p>
            <p><strong>4. Payment Confirmation:</strong> Screen displays &quot;Paid Successfully&quot; with booking transaction ID.</p>
            <div className="p-3 bg-blue-50/60 border border-blue-300 rounded space-y-1">
              <strong>5. Cart Page (Purchases Panel - `booking in details*.svg`):</strong>
              <ul className="list-disc list-inside space-y-0.5 pl-1">
                <li>Item moves to <strong>Cart Page -&gt; Purchases Panel</strong>.</li>
                <li>Displays real-time status: <code className="font-mono text-[0.65rem] bg-white px-1 border border-black/10 rounded">Booking Confirmed</code> → <code className="font-mono text-[0.65rem] bg-white px-1 border border-black/10 rounded">Dispatched with Delivery Partner</code>.</li>
                <li><strong>Delivery PIN Handover Protocol:</strong> When delivery partner arrives, user provides/inputs the <strong>Delivery PIN</strong> generated by delivery partner to verify partner authenticity and unlock final handover.</li>
                <li>View Itemized Bill (<code className="font-mono text-[0.65rem] text-blue-700">bill view.svg</code>).</li>
                <li>Final status: <code className="font-mono text-[0.65rem] bg-emerald-100 text-emerald-900 px-1 border border-emerald-300 rounded">Delivered Successfully</code>.</li>
              </ul>
            </div>
          </div>

          {/* Mermaid Diagram: 3.2 flowchart LR */}
          <MermaidDiagram
            chart={MERMAID_CHARTS.section3_2_shop}
            caption="3.2 MERMAID DIAGRAM // FLOWCHART LR — SHOPPING PAGE FLOW"
          />
        </div>

        {/* ─── 3.3 Repair Page Flow (Workshop Pickup & Service Center) ─── */}
        <div className="p-5 bg-white border-2 border-red-500/70 rounded-sm shadow-md space-y-4">
          <div className="border-b border-black/10 pb-2 flex items-center justify-between">
            <div>
              <span className="font-mono text-[0.62rem] text-red-700 uppercase tracking-widest block font-bold">FLOW SPEC 3.3</span>
              <h5 className="font-display text-lg uppercase text-neutral-900">
                3.3 Repair Page Flow (Workshop Pickup &amp; Service Center)
              </h5>
            </div>
            <span className="font-mono text-[0.62rem] bg-red-50 text-red-800 border border-red-200 px-2 py-0.5 rounded font-bold">
              QUOTATION ARBITRATION
            </span>
          </div>

          <div className="p-3 bg-red-50/50 border border-red-200 rounded font-serif text-xs text-red-950">
            <strong className="font-mono text-[0.65rem] uppercase block mb-0.5">Entry Shortcuts:</strong>
            Accessible via <strong>Navbar</strong>, <strong>Hero Section</strong>, or <strong>2x2 Home Grid</strong>.
          </div>

          <div className="space-y-3 font-serif text-xs leading-relaxed text-neutral-800">
            <div className="p-3 bg-[#F9F8F5] border border-black/10 rounded">
              <strong className="text-neutral-950 block mb-1">1. Service Center Discovery Map (`Service center page*.svg`):</strong>
              <ul className="list-disc list-inside space-y-0.5 pl-1">
                <li>Opens full interactive map displaying local verified workshops.</li>
                <li>Dynamic Filter Tabs: <code className="font-mono text-[0.65rem] bg-white px-1 border border-black/10 rounded">Nearby Centers</code>, <code className="font-mono text-[0.65rem] bg-white px-1 border border-black/10 rounded">Top-Rated Centers</code>, <code className="font-mono text-[0.65rem] bg-white px-1 border border-black/10 rounded">Open Now</code>.</li>
                <li>Option to open <code className="font-mono text-[0.65rem] text-blue-700">extended serivce center page.svg</code> for full workshop profile, working hours, and customer reviews.</li>
                <li>User selects preferred Service Center.</li>
              </ul>
            </div>

            <div className="p-3 bg-[#F9F8F5] border border-black/10 rounded">
              <strong className="text-neutral-950 block mb-1">2. Repair Details Form:</strong>
              <ul className="list-disc list-inside space-y-0.5 pl-1">
                <li><strong>Service Type:</strong> General Overhaul, Tune-up, Component Replacement.</li>
                <li><strong>Repair Category:</strong> Brakes, Gears, Chain, Suspension, Frame, Custom.</li>
                <li><strong>Cycle Metadata:</strong> Cycle Brand/Name &amp; Color.</li>
                <li><strong>Pickup Time Slot:</strong> Schedule time for cycle pickup from home to service center.</li>
                <li><strong>Issue Description:</strong> Elaborate problem description / photo attachments.</li>
                <li><strong>Current Location:</strong> Auto-GPS pin drop or custom address entry.</li>
              </ul>
            </div>

            <div className="p-3 bg-[#F9F8F5] border border-black/10 rounded">
              <strong className="text-neutral-950 block mb-0.5">3. Price Estimation &amp; Booking:</strong>
              Displays <strong>Estimated Cost</strong> (non-final preview: basic inspection + pickup/delivery charges). User confirms booking.
            </div>

            <div className="p-3 bg-red-50/50 border border-red-300 rounded space-y-2">
              <strong className="text-red-950 block">4. Cart Page (Repair Panel) Management &amp; Quotation Logic (`booking in details-*.svg`):</strong>
              <ul className="list-disc list-inside space-y-0.5 pl-1">
                <li>Booking appears under <strong>Cart → Repair Panel</strong>.</li>
                <li><strong>Pickup PIN Phase:</strong> Delivery partner arrives at user home to pick up cycle. User enters <strong>Pickup PIN</strong> (provided by partner) to authorize collection.</li>
                <li><strong>In-Transit Status:</strong> Updates to <code className="font-mono text-[0.65rem] bg-white px-1 border border-black/10 rounded">In Transit</code> → <code className="font-mono text-[0.65rem] bg-white px-1 border border-black/10 rounded">Reached Service Center</code>.</li>
                <li><strong>Quotation Stage:</strong> Service center inspects cycle and issues an itemized quotation inside the Cart Repair Panel.</li>
                <li>
                  <strong>User Decision Branch:</strong>
                  <ul className="list-circle list-inside pl-4 mt-1 space-y-1">
                    <li><strong>ACCEPT QUOTATION:</strong> Service center executes repair. Repaired cycle dispatched. Delivery partner arrives at home -&gt; User enters <strong>Delivery PIN</strong> -&gt; Status <code className="font-mono text-[0.65rem] bg-white text-emerald-800 px-1 rounded">Repaired &amp; Delivered</code>.</li>
                    <li><strong>REJECT QUOTATION:</strong> Cycle returned home without repairs. User pays pickup &amp; delivery fee only. Delivery partner arrives at home -&gt; User enters <strong>Delivery PIN</strong> -&gt; Status <code className="font-mono text-[0.65rem] bg-white text-amber-800 px-1 rounded">Returned Unrepaired</code>.</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          {/* Mermaid Diagram: 3.3 flowchart TD */}
          <MermaidDiagram
            chart={MERMAID_CHARTS.section3_3_repair}
            caption="3.3 MERMAID DIAGRAM // FLOWCHART TD — REPAIR PAGE FLOW & QUOTATION ARBITRATION"
          />
        </div>

        {/* ─── 3.4 Service Your Cycle Flow (Subscription Plans) ─── */}
        <div className="p-5 bg-white border-2 border-purple-500/70 rounded-sm shadow-md space-y-4">
          <div className="border-b border-black/10 pb-2 flex items-center justify-between">
            <div>
              <span className="font-mono text-[0.62rem] text-purple-700 uppercase tracking-widest block font-bold">FLOW SPEC 3.4</span>
              <h5 className="font-display text-lg uppercase text-neutral-900">
                3.4 Service Your Cycle Flow (Subscription Plans)
              </h5>
            </div>
            <span className="font-mono text-[0.62rem] bg-purple-50 text-purple-800 border border-purple-200 px-2 py-0.5 rounded font-bold">
              3 TIERS • PREVENTIVE OVERHAUL
            </span>
          </div>

          <div className="space-y-3 font-serif text-xs leading-relaxed text-neutral-800">
            <div className="p-3 bg-[#F9F8F5] border border-black/10 rounded space-y-1.5">
              <strong className="text-neutral-950 block">1. Plan Selection: Choose from 3 Subscription Plans:</strong>
              <div className="space-y-1 pl-1">
                <div>🟢 <strong>Basic Plan:</strong> Quarterly checkups, chain lubrication, brake adjustment.</div>
                <div>🔵 <strong>Standard Plan:</strong> Bi-monthly tune-ups, wheel alignment, free cable replacements.</div>
                <div>🟣 <strong>Premium Plan:</strong> Monthly comprehensive overhaul, priority workshop booking, free wear-and-tear parts.</div>
              </div>
            </div>

            <div className="p-3 bg-[#F9F8F5] border border-black/10 rounded">
              <strong className="text-neutral-950 block mb-0.5">2. Details Form &amp; Estimation:</strong>
              Input Cycle Name, Color, Pickup Time Slot, Current Location, and specific issues. View estimated add-on cost (if non-covered services requested).
            </div>

            <div className="p-3 bg-purple-50/50 border border-purple-300 rounded space-y-1">
              <strong className="text-purple-950 block">3. Cart Page (Service Panel) Tracking (`booking in details-*.svg`):</strong>
              <ul className="list-disc list-inside space-y-0.5 pl-1">
                <li>Card created in <strong>Cart → Service Panel</strong>.</li>
                <li>Delivery partner pickup at home → <strong>Pickup PIN Entry</strong> (provided by delivery partner).</li>
                <li>Real-time status update: <code className="font-mono text-[0.65rem] bg-white px-1 border border-black/10 rounded">Reached Service Center</code>.</li>
                <li>Servicing completion details and full service log displayed in panel.</li>
                <li>Delivery back to home → <strong>Delivery PIN Entry</strong> (provided by delivery partner).</li>
                <li>Status updated to: <code className="font-mono text-[0.65rem] bg-emerald-100 text-emerald-900 px-1 border border-emerald-300 rounded">Serviced &amp; Delivered</code>.</li>
              </ul>
            </div>
          </div>

          {/* Mermaid Diagram: 3.4 flowchart LR */}
          <MermaidDiagram
            chart={MERMAID_CHARTS.section3_4_service}
            caption="3.4 MERMAID DIAGRAM // FLOWCHART LR — SERVICE YOUR CYCLE FLOW"
          />
        </div>

        {/* ─── 3.5 Doorstep Repair Flow (At-Home Mechanic Service) ─── */}
        <div className="p-5 bg-white border-2 border-emerald-500/70 rounded-sm shadow-md space-y-4">
          <div className="border-b border-black/10 pb-2 flex items-center justify-between">
            <div>
              <span className="font-mono text-[0.62rem] text-emerald-700 uppercase tracking-widest block font-bold">FLOW SPEC 3.5</span>
              <h5 className="font-display text-lg uppercase text-neutral-900">
                3.5 Doorstep Repair Flow (At-Home Mechanic Service)
              </h5>
            </div>
            <span className="font-mono text-[0.62rem] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold">
              ZERO-TRANSIT SERVICE
            </span>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-300 rounded font-serif text-xs text-amber-950 flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Key Distinction:</strong> Unlike workshop repair/servicing, a mechanic travels directly to the user&apos;s home location to repair the cycle on-site without transporting it away.
            </div>
          </div>

          <div className="space-y-2 font-serif text-xs leading-relaxed text-neutral-800">
            <p><strong>1. Plan Selection:</strong> Select doorstep plan (<strong>Basic</strong>, <strong>Standard</strong>, <strong>Premium</strong>).</p>
            <p><strong>2. Details &amp; Scheduling:</strong> Input Cycle Name, Color, Specific Issues, Preferred Home Slot, Location. Review estimated price breakdown.</p>
            <p><strong>3. Booking Confirmation:</strong> Card created under <strong>Cart → Doorstep Panel</strong>.</p>
            <div className="p-3 bg-emerald-50/50 border border-emerald-300 rounded space-y-1">
              <strong className="text-emerald-950 block">4. Doorstep Execution &amp; PIN Verification (`booking in details-*.svg`):</strong>
              <ul className="list-disc list-inside space-y-0.5 pl-1">
                <li>Mechanic assigned &amp; arrives at home location.</li>
                <li><strong>Arrival PIN Entry:</strong> User inputs the PIN provided by the mechanic to initiate the doorstep job session.</li>
                <li>Real-time status: <code className="font-mono text-[0.65rem] bg-white px-1 border border-black/10 rounded">Mechanic Working at Home</code>.</li>
                <li>Completion check &amp; digital invoice sign-off (<code className="font-mono text-[0.65rem] text-blue-700">bill view.svg</code>).</li>
                <li>Status updated to: <code className="font-mono text-[0.65rem] bg-emerald-100 text-emerald-900 px-1 border border-emerald-300 rounded">Doorstep Repair Completed</code>.</li>
              </ul>
            </div>
          </div>

          {/* Mermaid Diagram: 3.5 flowchart LR */}
          <MermaidDiagram
            chart={MERMAID_CHARTS.section3_5_doorstep}
            caption="3.5 MERMAID DIAGRAM // FLOWCHART LR — DOORSTEP REPAIR FLOW"
          />
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 4: CART SYSTEM & MULTI-PANEL ARCHITECTURE
          ═════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 p-4 sm:p-6 md:p-8 border-b-2 border-black/20 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-neutral-900 text-white">
              SECTION 4
            </span>
            <span className="font-mono text-[0.7rem] uppercase tracking-widest text-neutral-500 font-bold">
              CART SYSTEM &amp; MULTI-PANEL ARCHITECTURE
            </span>
          </div>
          <h4 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-neutral-950">
            4. Cart System &amp; Multi-Panel Architecture
          </h4>
          <p className="font-serif text-xs sm:text-sm text-neutral-700 leading-relaxed mt-2 max-w-4xl">
            The Cart Page serves as the operational command center for all user bookings, divided into 4 dedicated panels:
          </p>
        </div>

        {/* Mermaid Diagram: Section 4 (graph TD) */}
        <MermaidDiagram
          chart={MERMAID_CHARTS.section4_cart}
          caption="SECTION 4 MERMAID DIAGRAM // GRAPH TD — CART MULTI-PANEL COMMAND CENTER"
        />

        {/* ─── 4.1 Card State Matrix Across Cart Panels Table ─── */}
        <div>
          <h5 className="font-display text-base uppercase text-neutral-800 mb-2">
            4.1 Card State Matrix Across Cart Panels
          </h5>
          <div className="border-2 border-black/20 bg-white rounded-sm shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-serif border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-[#F4F1EA] border-b-2 border-black/20 font-mono text-[0.65rem] uppercase text-neutral-900 tracking-wider">
                    <th className="p-3 border-r border-black/15 font-bold">Panel Name</th>
                    <th className="p-3 border-r border-black/15 font-bold">SVG Design State Mapping</th>
                    <th className="p-3 border-r border-black/15 font-bold">Key Data Elements Shown</th>
                    <th className="p-3 border-r border-black/15 font-bold">Interactive Actions Available</th>
                    <th className="p-3 font-bold">Verification Required</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  <tr className="hover:bg-neutral-50">
                    <td className="p-3 border-r border-black/10 font-bold text-blue-900">Purchases Panel</td>
                    <td className="p-3 border-r border-black/10 font-mono text-[0.65rem] text-blue-700">`booking in details-1.svg` to `3.svg`</td>
                    <td className="p-3 border-r border-black/10">Cycle Specs, Order ID, Price, Delivery Partner Details, Status Timeline</td>
                    <td className="p-3 border-r border-black/10">View Invoice, Track Delivery, Contact Partner</td>
                    <td className="p-3 font-mono font-bold text-purple-900 text-[0.68rem]">Delivery PIN (Partner → User)</td>
                  </tr>
                  <tr className="hover:bg-neutral-50 bg-[#FBF9F5]/40">
                    <td className="p-3 border-r border-black/10 font-bold text-red-900">Repair Panel</td>
                    <td className="p-3 border-r border-black/10 font-mono text-[0.65rem] text-red-700">`booking in details-4.svg` to `9.svg`</td>
                    <td className="p-3 border-r border-black/10">Service Center Name, Cycle Info, Pickup Slot, Quotation Sheet, Status</td>
                    <td className="p-3 border-r border-black/10"><strong className="text-red-700">Accept/Reject Quotation</strong>, Call Center, View Bill</td>
                    <td className="p-3 font-mono font-bold text-purple-900 text-[0.68rem]">Pickup PIN &amp; Delivery PIN</td>
                  </tr>
                  <tr className="hover:bg-neutral-50">
                    <td className="p-3 border-r border-black/10 font-bold text-purple-900">Service Panel</td>
                    <td className="p-3 border-r border-black/10 font-mono text-[0.65rem] text-purple-700">`booking in details-10.svg` to `12.svg`</td>
                    <td className="p-3 border-r border-black/10">Subscription Tier, Service Checklist, Workshop Log, Status Timeline</td>
                    <td className="p-3 border-r border-black/10">View Inspection Report, Rate Workshop</td>
                    <td className="p-3 font-mono font-bold text-purple-900 text-[0.68rem]">Pickup PIN &amp; Delivery PIN</td>
                  </tr>
                  <tr className="hover:bg-neutral-50 bg-[#FBF9F5]/40">
                    <td className="p-3 border-r border-black/10 font-bold text-emerald-900">Doorstep Panel</td>
                    <td className="p-3 border-r border-black/10 font-mono text-[0.65rem] text-emerald-700">`booking in details-13.svg` to `15.svg`</td>
                    <td className="p-3 border-r border-black/10">Mechanic Profile, Visit Time Slot, Issue Log, Live Repair Status</td>
                    <td className="p-3 border-r border-black/10">Call Mechanic, Extend Scope, Sign-off</td>
                    <td className="p-3 font-mono font-bold text-purple-900 text-[0.68rem]">Mechanic Arrival PIN</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 5: SECURITY & VERIFICATION PIN SYSTEM ARCHITECTURE
          ═════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 p-4 sm:p-6 md:p-8 border-b-2 border-black/20 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-neutral-900 text-white">
              SECTION 5
            </span>
            <span className="font-mono text-[0.7rem] uppercase tracking-widest text-neutral-500 font-bold">
              SECURITY &amp; VERIFICATION PIN SYSTEM ARCHITECTURE
            </span>
          </div>
          <h4 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-neutral-950">
            5. Security &amp; Verification PIN System Architecture
          </h4>
          <p className="font-serif text-xs sm:text-sm text-neutral-700 leading-relaxed mt-2 max-w-4xl">
            To prevent unauthorized handovers, ensure partner verification, and secure physical handoffs, Qwikamp implements a strict 3-tier PIN verification model:
          </p>
        </div>

        {/* Mermaid Diagram: Section 5 sequenceDiagram */}
        <MermaidDiagram
          chart={MERMAID_CHARTS.section5_pin_handshake}
          caption="SECTION 5 MERMAID DIAGRAM // SEQUENCEDRAGAM — 3-TIER PIN CUSTODY HANDSHAKE"
        />
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 6: COMPONENT-LEVEL SCREEN INVENTORY & STRUCTURE
          ═════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 p-4 sm:p-6 md:p-8 border-b-2 border-black/20 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-neutral-900 text-white">
              SECTION 6
            </span>
            <span className="font-mono text-[0.7rem] uppercase tracking-widest text-neutral-500 font-bold">
              COMPONENT-LEVEL SCREEN INVENTORY &amp; STRUCTURE
            </span>
          </div>
          <h4 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-neutral-950">
            6. Component-Level Screen Inventory &amp; Structure
          </h4>
        </div>

        {/* 4 Screen Inventories (Vertical Stack) */}
        <div className="space-y-4 font-serif text-xs">
          {/* 6.1 Home Page */}
          <div className="p-4 bg-white border border-black/15 rounded-sm shadow-sm space-y-2">
            <h5 className="font-display text-base uppercase text-neutral-900">
              6.1 Home Page Layout Architecture (`Home page*.svg`, `Dark home page*.svg`)
            </h5>
            <ul className="list-disc list-inside space-y-1 text-neutral-800 pl-1 leading-relaxed">
              <li><strong>Header:</strong> Location Selector, Search Bar, Cart Icon (with active badge count), Profile Shortcut.</li>
              <li><strong>Hero Banner:</strong> Dynamic Promotional Banner &amp; Quick CTA (&quot;Book Urgent Repair&quot;).</li>
              <li>
                <strong>2x2 Feature Action Grid:</strong>
                <ol className="list-decimal list-inside pl-4 space-y-0.5 mt-1 font-sans text-neutral-900">
                  <li>🚴 <strong>Shop Cycles:</strong> Direct route to retail catalog.</li>
                  <li>🛠️ <strong>Repair Cycle:</strong> Direct route to nearby workshop map.</li>
                  <li>🧰 <strong>Service Cycle:</strong> Direct route to subscription plans.</li>
                  <li>🏡 <strong>Doorstep Repair:</strong> Direct route to at-home mechanic booking.</li>
                </ol>
              </li>
              <li><strong>Quick Status Section:</strong> Active booking summary widget linked to relevant Cart Panel.</li>
            </ul>
          </div>

          {/* 6.2 Service Center Map Page */}
          <div className="p-4 bg-white border border-black/15 rounded-sm shadow-sm space-y-2">
            <h5 className="font-display text-base uppercase text-neutral-900">
              6.2 Service Center Map Page Architecture (`Service center page*.svg`)
            </h5>
            <ul className="list-disc list-inside space-y-1 text-neutral-800 pl-1 leading-relaxed">
              <li><strong>Top Bar:</strong> Location Input &amp; View Switcher (Map View / List View).</li>
              <li><strong>Filter Tabs:</strong> <code className="font-mono text-[0.65rem] bg-[#F4F1EA] px-1 border border-black/10 rounded">Nearby Centers</code> | <code className="font-mono text-[0.65rem] bg-[#F4F1EA] px-1 border border-black/10 rounded">Top-Rated Centers</code> | <code className="font-mono text-[0.65rem] bg-[#F4F1EA] px-1 border border-black/10 rounded">Open Now</code>.</li>
              <li><strong>Map Viewport:</strong> Custom Map Pins with ratings and turn-around times.</li>
              <li><strong>Center Sheet Card:</strong> Center Name, Distance, Rating, Available Slots, &quot;Select Center&quot; Button.</li>
            </ul>
          </div>

          {/* 6.3 Extended Service Center Page */}
          <div className="p-4 bg-white border border-black/15 rounded-sm shadow-sm space-y-2">
            <h5 className="font-display text-base uppercase text-neutral-900">
              6.3 Extended Service Center Page Architecture (`extended serivce center page.svg`)
            </h5>
            <ul className="list-disc list-inside space-y-1 text-neutral-800 pl-1 leading-relaxed">
              <li><strong>Header:</strong> Workshop Image Banner, Workshop Name, Verified Badge, Rating Stars.</li>
              <li><strong>Body:</strong> Address, Working Hours (<code className="font-mono text-[0.65rem] text-emerald-700 bg-emerald-50 px-1 rounded">Open Now</code>), Contact Number, List of Amenities &amp; Specialized Services.</li>
              <li><strong>Reviews Section:</strong> Customer ratings, feedback tags.</li>
              <li><strong>Footer CTA:</strong> &quot;Select This Workshop &amp; Proceed to Booking&quot;.</li>
            </ul>
          </div>

          {/* 6.4 Bill View / Invoice Sheet */}
          <div className="p-4 bg-white border border-black/15 rounded-sm shadow-sm space-y-2">
            <h5 className="font-display text-base uppercase text-neutral-900">
              6.4 Bill View / Invoice Sheet Architecture (`bill view*.svg`)
            </h5>
            <ul className="list-disc list-inside space-y-1 text-neutral-800 pl-1 leading-relaxed">
              <li><strong>Header:</strong> Order / Booking Reference ID, Date &amp; Time Stamp, Service Provider Details.</li>
              <li>
                <strong>Itemized Breakdown Table:</strong>
                <ul className="list-circle list-inside pl-4 space-y-0.5 mt-0.5">
                  <li>Base Fee / Inspection Fee.</li>
                  <li>Spares &amp; Component Charges (Itemized).</li>
                  <li>Repair Labor Fee.</li>
                  <li>Logistics / Pickup &amp; Home Delivery Charges.</li>
                </ul>
              </li>
              <li><strong>Tax &amp; Discount Summary:</strong> GST breakdown, promo code applied, final total amount.</li>
              <li><strong>Payment Status Badge:</strong> <code className="font-mono text-[0.65rem] bg-emerald-50 text-emerald-800 px-1 border border-emerald-300 rounded">Paid Online</code> / <code className="font-mono text-[0.65rem] bg-amber-50 text-amber-800 px-1 border border-amber-300 rounded">Pending Handover Payment</code>.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 7: DESIGN SYSTEM TOKEN ALIGNMENT
          ═════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 p-4 sm:p-6 md:p-8 border-b-2 border-black/20 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-neutral-900 text-white">
              SECTION 7
            </span>
            <span className="font-mono text-[0.7rem] uppercase tracking-widest text-neutral-500 font-bold">
              DESIGN SYSTEM TOKEN ALIGNMENT
            </span>
          </div>
          <h4 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-neutral-950">
            7. Design System Token Alignment
          </h4>
          <p className="font-serif text-xs sm:text-sm text-neutral-700 leading-relaxed mt-2 max-w-4xl">
            All UI components and flows leverage the <strong>Qwikamp Design System 4-Tier Token Architecture</strong>:
          </p>
        </div>

        {/* 4 Tiers (Vertical Stack) */}
        <div className="space-y-3 font-serif text-xs">
          <div className="p-3.5 bg-white border border-black/15 rounded-sm shadow-2xs">
            <span className="font-mono text-[0.65rem] font-bold text-blue-700 block mb-1">1. BRAND LAYER (`brand.*`)</span>
            <p className="text-neutral-800 leading-relaxed">
              Slate, Gray, Blue, Green, Red, Orange, Lime palettes, Inter font families, 8pt spacing grid.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-black/15 rounded-sm shadow-2xs">
            <span className="font-mono text-[0.65rem] font-bold text-emerald-700 block mb-1">2. ALIAS LAYER (`alias.*`)</span>
            <p className="text-neutral-800 leading-relaxed">
              Primary/Secondary/Tertiary semantic tokens, Information/Success/Error/Warning aliases.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-black/15 rounded-sm shadow-2xs space-y-1">
            <span className="font-mono text-[0.65rem] font-bold text-purple-700 block mb-1">3. MAPPED COMPONENT LAYER (`maps.*`)</span>
            <ul className="list-disc list-inside space-y-0.5 text-neutral-800 pl-1">
              <li><code className="font-mono text-[0.65rem] text-purple-800">maps.surface.*</code>: Surface cards for Cart panels, bill views, &amp; map bottom sheets (Light &amp; Dark theme mapped).</li>
              <li><code className="font-mono text-[0.65rem] text-purple-800">maps.text.*</code>: High-contrast headings and status texts for light/dark themes.</li>
              <li><code className="font-mono text-[0.65rem] text-purple-800">maps.border.*</code>: Active state borders for selected service centers and plan cards.</li>
            </ul>
          </div>

          <div className="p-3.5 bg-white border border-black/15 rounded-sm shadow-2xs">
            <span className="font-mono text-[0.65rem] font-bold text-amber-700 block mb-1">4. RESPONSIVE LAYER (`responsive.*`)</span>
            <p className="text-neutral-800 leading-relaxed">
              H1-H6, Hero, Paragraph, and Caption typography scales across viewport sizes.
            </p>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 8: DESIGN SOURCE-OF-TRUTH AUDIT (`svgqwikamp` VERIFICATION)
          ═════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 p-4 sm:p-6 md:p-8 border-b-2 border-black/20 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-neutral-900 text-white">
              SECTION 8
            </span>
            <span className="font-mono text-[0.7rem] uppercase tracking-widest text-neutral-500 font-bold">
              DESIGN SOURCE-OF-TRUTH AUDIT
            </span>
          </div>
          <h4 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-neutral-950">
            8. Design Source-of-Truth Audit (`svgqwikamp` Verification)
          </h4>
        </div>

        {/* Audit Table with Horizontal Scroll Wrapper */}
        <div className="border-2 border-black/20 bg-white rounded-sm shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-serif border-collapse min-w-[720px]">
              <thead>
                <tr className="bg-[#F4F1EA] border-b-2 border-black/20 font-mono text-[0.65rem] uppercase text-neutral-900 tracking-wider">
                  <th className="p-3 border-r border-black/15 font-bold">Category</th>
                  <th className="p-3 border-r border-black/15 font-bold">SVGs Found</th>
                  <th className="p-3 border-r border-black/15 font-bold">Verified Architecture Features</th>
                  <th className="p-3 font-bold">Alignment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                <tr className="hover:bg-neutral-50">
                  <td className="p-3 border-r border-black/10 font-bold text-neutral-900">Onboarding &amp; Auth</td>
                  <td className="p-3 border-r border-black/10 font-mono text-[0.65rem] text-blue-700">6 SVGs (`Onboarding Screen*.svg`, `OPT Screen*.svg`)</td>
                  <td className="p-3 border-r border-black/10">3-step carousel, Mobile number auth, OTP verification code screen</td>
                  <td className="p-3 font-mono font-bold text-emerald-800 text-[0.68rem]">100% Verified</td>
                </tr>
                <tr className="hover:bg-neutral-50 bg-[#FBF9F5]/40">
                  <td className="p-3 border-r border-black/10 font-bold text-neutral-900">Home Page</td>
                  <td className="p-3 border-r border-black/10 font-mono text-[0.65rem] text-blue-700">56 SVGs (`Home page*.svg`, `Dark home page*.svg`)</td>
                  <td className="p-3 border-r border-black/10">Light/Dark modes, Top Nav, Hero Banner, 2x2 Action Grid, 3 Repair shortcuts</td>
                  <td className="p-3 font-mono font-bold text-emerald-800 text-[0.68rem]">100% Verified</td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="p-3 border-r border-black/10 font-bold text-neutral-900">Shop &amp; Product</td>
                  <td className="p-3 border-r border-black/10 font-mono text-[0.65rem] text-blue-700">13 SVGs (`Shop page*.svg`, `product details page.svg`)</td>
                  <td className="p-3 border-r border-black/10">Catalog filters, Cycle cards, Product details carousel, Specs sheet, Buy CTA</td>
                  <td className="p-3 font-mono font-bold text-emerald-800 text-[0.68rem]">100% Verified</td>
                </tr>
                <tr className="hover:bg-neutral-50 bg-[#FBF9F5]/40">
                  <td className="p-3 border-r border-black/10 font-bold text-neutral-900">Service Centers</td>
                  <td className="p-3 border-r border-black/10 font-mono text-[0.65rem] text-blue-700">5 SVGs (`Service center page*.svg`, `extended...svg`)</td>
                  <td className="p-3 border-r border-black/10">Map view, 3 filter tabs (Nearby/Top-Rated/Open Now), Extended profile sheet</td>
                  <td className="p-3 font-mono font-bold text-emerald-800 text-[0.68rem]">100% Verified</td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="p-3 border-r border-black/10 font-bold text-neutral-900">Cart &amp; Booking</td>
                  <td className="p-3 border-r border-black/10 font-mono text-[0.65rem] text-blue-700">16 SVGs (`booking in details*.svg`)</td>
                  <td className="p-3 border-r border-black/10">4 Sub-Panels (Purchases, Repair, Service, Doorstep), PIN entry modals, Quotation box</td>
                  <td className="p-3 font-mono font-bold text-emerald-800 text-[0.68rem]">100% Verified</td>
                </tr>
                <tr className="hover:bg-neutral-50 bg-[#FBF9F5]/40">
                  <td className="p-3 border-r border-black/10 font-bold text-neutral-900">Invoice / Bill</td>
                  <td className="p-3 border-r border-black/10 font-mono text-[0.65rem] text-blue-700">3 SVGs (`bill view*.svg`)</td>
                  <td className="p-3 border-r border-black/10">Itemized parts/labor costs, delivery fee breakdown, tax total, payment badge</td>
                  <td className="p-3 font-mono font-bold text-emerald-800 text-[0.68rem]">100% Verified</td>
                </tr>
                <tr className="hover:bg-neutral-50">
                  <td className="p-3 border-r border-black/10 font-bold text-neutral-900">User Profile</td>
                  <td className="p-3 border-r border-black/10 font-mono text-[0.65rem] text-blue-700">1 SVG (`Dark Profile page.svg`)</td>
                  <td className="p-3 border-r border-black/10">Account details, saved cycles, active plan badges, order history</td>
                  <td className="p-3 font-mono font-bold text-emerald-800 text-[0.68rem]">100% Verified</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 9: SUMMARY OF FLOW VERIFICATION RULES
          ═════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 p-4 sm:p-6 md:p-8 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-neutral-900 text-white">
              SECTION 9
            </span>
            <span className="font-mono text-[0.7rem] uppercase tracking-widest text-neutral-500 font-bold">
              FLOW VERIFICATION RULES
            </span>
          </div>
          <h4 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-neutral-950">
            9. Summary of Flow Verification Rules
          </h4>
        </div>

        {/* Alert 1: IMPORTANT */}
        <div className="p-4 bg-amber-50/80 border-l-4 border-amber-600 border-y border-r border-black/10 rounded-sm font-serif text-xs text-amber-950 space-y-1 shadow-2xs">
          <div className="flex items-center gap-2 font-mono text-[0.68rem] font-bold uppercase tracking-wider text-amber-900">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
            <span>IMPORTANT — Delivery Partner PIN Verification Rule:</span>
          </div>
          <p className="leading-relaxed">
            In all delivery and pickup operations (Shop Delivery, Workshop Pickup, Workshop Delivery), the delivery partner generates a unique PIN upon arrival, which the user must enter into the app to complete the step.
          </p>
        </div>

        {/* Alert 2: NOTE */}
        <div className="p-4 bg-blue-50/80 border-l-4 border-blue-600 border-y border-r border-black/10 rounded-sm font-serif text-xs text-blue-950 space-y-1 shadow-2xs">
          <div className="flex items-center gap-2 font-mono text-[0.68rem] font-bold uppercase tracking-wider text-blue-900">
            <Info className="w-4 h-4 text-blue-700 shrink-0" />
            <span>NOTE — Workshop Quotation Decision Rule:</span>
          </div>
          <p className="leading-relaxed">
            If a user <strong>rejects</strong> a workshop quotation, the cycle is returned unrepaired, but the user is billed for pickup and delivery logistics. If <strong>accepted</strong>, repair costs are added to the final bill, payable before delivery.
          </p>
        </div>

        {/* Alert 3: TIP */}
        <div className="p-4 bg-emerald-50/80 border-l-4 border-emerald-600 border-y border-r border-black/10 rounded-sm font-serif text-xs text-emerald-950 space-y-1 shadow-2xs">
          <div className="flex items-center gap-2 font-mono text-[0.68rem] font-bold uppercase tracking-wider text-emerald-900">
            <Lightbulb className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>TIP — Doorstep Repair Advantage:</span>
          </div>
          <p className="leading-relaxed">
            Doorstep repair bypasses workshop logistics completely. The PIN is validated upon mechanic arrival, enabling instant home repair with zero transit time.
          </p>
        </div>
      </section>

      {/* ─── Footer Dossier Strip ─── */}
      <footer className="relative z-10 border-t-2 border-black/20 bg-[#F4F1EA] px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between text-neutral-600 font-mono text-[0.65rem] gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-bold text-neutral-800">QWIKAMP MOBILITY SYSTEMS</span>
          <span>•</span>
          <span>UI_UX_INFORMATION_ARCHITECTURE.md</span>
          <span>•</span>
          <span>105 PRODUCTION SVGS AUDITED</span>
        </div>
        <div className="text-neutral-500 font-bold">
          100% SPECIFICATION ALIGNMENT
        </div>
      </footer>
    </div>
  );
}

export default QwikampInformationArchitecture;
