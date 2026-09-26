export interface FlowSection {
  title: string;
  subtitle: string;
  caption: string;
  description: string;
  imageAspect?: string;
  videoSrc?: string;
  images: {
    src: string;
    alt: string;
    caption: string;
    size: "full" | "half" | "third" | "portrait";
  }[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  cluster: "product" | "brand" | "freelance" | "motion" | "personal" | "research";
  clusterLabel: string;
  categoryColor: string;
  textColor?: string;
  dossierNumber: string;
  year: string;
  role: string;
  type: string;
  timeline: string;
  tools: string[];
  coverImage: string;
  coverVideo?: string;
  overview: string[];
  problemStatement: string;
  targetUsers?: string;
  researchConducted?: string[];
  solutionNarrative: string;
  keyInsights: string[];
  exploredAlternatives?: string;
  finalSolutionRationale?: string;
  informationArchitecture?: string | string[];
  aiIntegration?: string;
  feedbackAndIteration?: string;
  finalOutcome?: string;
  flows: FlowSection[];
  deliverables: string[];
  nextSlug?: string;
  nextTitle?: string;
  prevSlug?: string;
  prevTitle?: string;
}

export const CATEGORY_COLORS = {
  product: "#1E4BD7",   // Cobalt Royal Blue
  brand: "#D71E1E",     // Crimson Red
  freelance: "#E5A910", // Warm Tuscan Manila Gold
  motion: "#4F46E5",    // Electric Cinema Indigo / Royal Violet
  personal: "#0C7866",  // Deep Spruce Teal / Forest Emerald
  research: "#581E70",  // Deep Imperial Plum / Violet
};

export const PROJECTS_DATA: Record<string, CaseStudy> = {
  qwikamp: {
    slug: "qwikamp",
    title: "Qwikamp",
    subtitle: "Doorstep Bicycle Servicing & Retail Mobile Application",
    cluster: "product",
    clusterLabel: "Product Design & UX Systems",
    categoryColor: "#1E4BD7",
    dossierNumber: "DOSSIER-01",
    year: "2026",
    role: "Lead UI/UX Designer & Systems Specialist",
    type: "Mobile Application (iOS & Android)",
    timeline: "Early 2026 (4 Weeks)",
    tools: ["Figma", "Flutter", "Firebase", "Adobe XD"],
    coverImage: "/images/qwikamp/Dark-home-page.png",
    overview: [
      "Qwikamp was conceived to address a critical void in urban cycling maintenance: the friction of transporting damaged or untuned bicycles to brick-and-mortar repair shops. Existing servicing platforms lacked transparent pricing, real-time mechanic tracking, and specialized component cataloging.",
      "As lead designer, I led the end-to-end product design lifecycle—from initial ethnographic user interviews with suburban cyclists to crafting an intuitive mobile dispatch interface and Flutter-ready design system.",
      "The result is a streamlined digital ecosystem that reduces service booking time to under 90 seconds while giving mechanics a dedicated mobile workflow tool for transparent diagnostics."
    ],
    problemStatement:
      "Cyclists often abandon routine maintenance due to the logistical nightmare of hauling bikes to distant workshops. Furthermore, non-technical riders feel intimidated by workshop jargon and unpredictable repair pricing.",
    targetUsers:
      "Urban commuters, recreational cyclists, and suburban riders (ages 20–45) who require convenient bicycle maintenance but lack transport to physical workshops. Secondary users are certified mechanics needing a mobile dispatch and diagnostic workflow tool.",
    researchConducted: [
      "Ethnographic Rider Interviews — 12 suburban cyclists interviewed about transport pain points, maintenance delay habits, and trust barriers with workshop pricing.",
      "Workshop Mechanic Field Study — Observed 5 mechanics documenting diagnostic friction, verbal-estimate trust gaps, and parts-ordering error patterns.",
      "Competitive Service App Audit — Benchmarked 4 urban on-demand dispatch platforms (UrbanClap, Rapido, Dunzo, BikeDoctor) for booking flow length and pricing transparency."
    ],
    solutionNarrative:
      "We engineered a direct-to-doorstep service dispatch app with upfront itemized pricing, custom virtual garage profiles for tracking bike wear-and-tear, and live GPS mechanic tracking.",
    keyInsights: [
      "78% of urban cyclists delay maintenance due to transport inconvenience.",
      "Visual diagnostic checklists build 3x higher trust than verbal estimates.",
      "Component compatibility checkers reduce accidental parts ordering errors by 92%."
    ],
    exploredAlternatives:
      "Evaluated monthly subscription repair tiers vs. itemized pay-per-service diagnostic quotes. Tested complex multi-step phone call bookings vs. a guided 90-second mobile booking wizard. Explored text-only mechanic notes vs. visual photo-tagged diagnostic checklists.",
    finalSolutionRationale:
      "Itemized diagnostic quotes with transparent pricing eliminated intimidation and increased user booking confidence by 3x over subscription packages. The photo-tagged checklist was chosen because observational research showed riders demanded visual proof of worn parts before approving repairs.",
    informationArchitecture: [
      "Level 1: Doorstep Repair Booking Wizard — Select Vehicle → Select Diagnostic Checklist → Instant Itemized Estimate → Mechanic Dispatch Confirmation",
      "Level 2: Virtual Garage & Health Tracker — Vehicle Profiles, Service History Logs, Mileage Tracker, Predictive Wear Warnings",
      "Level 3: EV Retail & Spare Parts Store — Categorized Components (Batteries, Brakes, Tires), Verified Compatibility Filter, Instant Checkout",
      "Level 4: Live Dispatch & Order Handoff — Real-Time Mechanic GPS Tracking, Direct In-App Chat, Digital Job Completion Sign-off"
    ],
    aiIntegration:
      "Implemented predictive wear-and-tear diagnostic suggestions based on rider mileage logs, historical service intervals, and component lifecycle data to prompt proactive maintenance reminders.",
    feedbackAndIteration:
      "Iterated the mechanic diagnostic checklist from free-form text notes to structured visual photo-tagging after rider interview feedback revealed low trust in text-only estimates. Also widened pickup time slots from 2 to 3 options (morning/afternoon/evening) based on beta-user scheduling conflicts.",
    finalOutcome:
      "Reduced service booking time to under 90 seconds. Achieved 92% reduction in component ordering errors through compatibility checkers. Delivered a complete Flutter-ready design system with 30+ screens, a mechanic dispatch portal, and interactive high-fidelity prototype.",
    deliverables: [
      "Rider Mobile Application (iOS/Android)",
      "Mechanic Service Dispatch Portal",
      "Design System & Flutter Component Library",
      "Interactive High-Fidelity Prototype"
    ],
    flows: [
      {
        title: "01. Onboarding & Authentication",
        subtitle: "First Launch Experience & Secure Access",
        caption: "An immersive onboarding carousel introducing core features—doorstep repairs, transparent quotes, and GPS tracking—followed by OTP-secured authentication.",
        description:
          "The onboarding flow uses bold illustration-driven slides to communicate each key value proposition before funneling into a streamlined OTP verification screen. The neon-lime accent palette carries through from onboarding into the main application, establishing immediate brand recognition.",
        imageAspect: "portrait",
        images: [
          {
            src: "/images/qwikamp/Onboarding-Screen.png",
            alt: "Qwikamp Onboarding — Schedule Diagnostic Repairs",
            caption: "FIG 1.1 — Onboarding slide introducing doorstep diagnostic repair booking.",
            size: "third"
          },
          {
            src: "/images/qwikamp/Onboarding-Screen-1.png",
            alt: "Qwikamp Onboarding — GPS Mechanic Tracking",
            caption: "FIG 1.2 — Live GPS mechanic dispatch tracking introduction slide.",
            size: "third"
          },
          {
            src: "/images/qwikamp/Onboarding-Screen-2.png",
            alt: "Qwikamp Onboarding — Transparent Quote Approvals",
            caption: "FIG 1.3 — Transparent itemized quote approval feature walkthrough.",
            size: "third"
          },
          {
            src: "/images/qwikamp/OPT-Screen.png",
            alt: "Qwikamp OTP Verification Screen",
            caption: "FIG 1.4 — Secure 4-digit OTP verification with illustrated branding.",
            size: "half"
          },
          {
            src: "/images/qwikamp/OPT-Screen-1.png",
            alt: "Qwikamp OTP Entry Screen",
            caption: "FIG 1.5 — OTP code entry with resend and end-to-end encryption badge.",
            size: "half"
          }
        ]
      },
      {
        title: "02. Home Dashboard & Ecosystem Hub",
        subtitle: "Light & Dark Mode — Service Ecosystem Entry Point",
        caption: "The central hub surfaces featured bike offerings, ecosystem service shortcuts, and quick-access repair triggers across both light and dark visual modes.",
        description:
          "The home screen balances product discovery carousels with service action cards (Repair, Service, Shop, Doorstep) in a 2×2 grid. The dark mode variant shifts to a deep navy palette with neon-lime accents, ensuring full accessibility parity. Both themes share identical information architecture while adapting contrast, elevation shadows, and iconography for optimal readability.",
        imageAspect: "portrait",
        images: [
          {
            src: "/images/qwikamp/Home-page-6.png",
            alt: "Qwikamp Home Dashboard — Light Mode",
            caption: "FIG 2.1 — Light mode home screen with featured offerings carousel and service grid.",
            size: "half"
          },
          {
            src: "/images/qwikamp/Dark-home-page.png",
            alt: "Qwikamp Home Dashboard — Dark Mode",
            caption: "FIG 2.2 — Dark mode home screen with neon-lime accents and elevated card surfaces.",
            size: "half"
          },
          {
            src: "/images/qwikamp/Dark-Profile-page.png",
            alt: "Qwikamp User Profile & Connected Garage",
            caption: "FIG 2.3 — Profile hub displaying connected EV garage, battery health, and account management.",
            size: "half"
          },
          {
            src: "/images/qwikamp/Dark-home-page-1.png",
            alt: "Qwikamp Dark Mode — Service Plans",
            caption: "FIG 2.4 — Service plan comparison matrix with Basic, Standard, and Premium tiers.",
            size: "half"
          }
        ]
      },
      {
        title: "03. Doorstep Service Booking & Scheduler",
        subtitle: "Frictionless Diagnostics, Slot Reservation & Transparent Pricing",
        caption: "A guided multi-step wizard allowing users to select service center, choose time slots, upload diagnostic photos, and receive upfront itemized repair estimates.",
        description:
          "Instead of vague text boxes, users locate nearby service centers via an interactive map with real-time hub availability. The fill-details form captures cycle characteristics, pickup time slots (morning/afternoon/evening), optional issue photos, and saved addresses. The repair estimate modal breaks down every charge—parts, labor, pickup, GST—before confirmation, eliminating surprise fees.",
        imageAspect: "portrait",
        images: [
          {
            src: "/images/qwikamp/Service-center-page.png",
            alt: "Qwikamp Service Center Map Selector",
            caption: "FIG 3.1 — GPS-powered service center locator with nearest/top-rated/open-now filters.",
            size: "third"
          },
          {
            src: "/images/qwikamp/extended-serivce-center-page.png",
            alt: "Qwikamp Extended Service Center Selection",
            caption: "FIG 3.2 — Extended hub list view with multiple service centers and ratings.",
            size: "third"
          },
          {
            src: "/images/qwikamp/Service-center-page-1.png",
            alt: "Qwikamp Fill Details — Cycle Characteristics & Time Slots",
            caption: "FIG 3.3 — Step-by-step service request form with cycle specs and pickup slot selection.",
            size: "third"
          },
          {
            src: "/images/qwikamp/Service-center-page-2.png",
            alt: "Qwikamp Component Selection & Issue Upload",
            caption: "FIG 3.4 — Component diagnostic selector with optional photo upload for accurate estimates.",
            size: "half"
          },
          {
            src: "/images/qwikamp/bill-view.png",
            alt: "Qwikamp Transparent Repair Estimate Breakdown",
            caption: "FIG 3.5 — Itemized repair estimate with delivery charge slabs and GST tax summary.",
            size: "half"
          }
        ]
      },
      {
        title: "04. Shop & Product Catalog",
        subtitle: "EV Bicycle Marketplace & Component Specifications",
        caption: "A curated retail experience for browsing flagship electric bicycles, spare components, and accessories with detailed specifications and warranty info.",
        description:
          "The shop experience employs product carousels with high-resolution imagery, real-time pricing, and verified ratings. Product detail pages surface comprehensive EV specs—battery capacity, power range, frame material, top speed—alongside color/size selectors and a QWIKAMP Certified Warranty badge for purchase confidence.",
        imageAspect: "portrait",
        images: [
          {
            src: "/images/qwikamp/Shop-page.png",
            alt: "Qwikamp Shop — Product Browsing Interface",
            caption: "FIG 4.1 — Shop browsing view with featured offerings and category filters.",
            size: "third"
          },
          {
            src: "/images/qwikamp/Shop-page-1.png",
            alt: "Qwikamp Shop — Dark Mode Catalog",
            caption: "FIG 4.2 — Dark mode catalog with ecosystem upgrade tags and essential spares.",
            size: "third"
          },
          {
            src: "/images/qwikamp/product-details-page.png",
            alt: "Qwikamp Product Details — QWIK-VOLT Carbon R",
            caption: "FIG 4.3 — Product specification page with EV specs, color selector, and secure checkout.",
            size: "third"
          },
          {
            src: "/images/qwikamp/Shop-page-2.png",
            alt: "Qwikamp Shop — Extended Product Grid",
            caption: "FIG 4.4 — Extended product listings with ratings and hub availability.",
            size: "half"
          },
          {
            src: "/images/qwikamp/Shop-page-3.png",
            alt: "Qwikamp Shop — Cart & Checkout Flow",
            caption: "FIG 4.5 — Cart management and streamlined checkout experience.",
            size: "half"
          }
        ]
      },
      {
        title: "05. Real-Time Dispatch & Booking Management",
        subtitle: "Order Tracking, Mechanic Assignment & Digital Handoff",
        caption: "Live booking management with active schedule tracking, verified delivery partner assignment, and secure PIN-based bicycle handoff verification.",
        description:
          "The booking management hub displays all active service schedules with real-time status updates—from partner assignment through transit tracking to doorstep arrival. Each booking card surfaces maintenance IDs, cost breakdowns, and pickup windows. The delivery detail sheet introduces the assigned courier with verification status, and a secure 6-digit PIN handshake ensures safe bicycle transfer.",
        imageAspect: "portrait",
        images: [
          {
            src: "/images/qwikamp/Home-page.png",
            alt: "Qwikamp Active Booking Schedules — Light Mode",
            caption: "FIG 5.1 — Active schedules list with maintenance IDs and pickup PIN triggers.",
            size: "half"
          },
          {
            src: "/images/qwikamp/Home-page-2.png",
            alt: "Qwikamp Booking Details — Delivery Partner & Verification",
            caption: "FIG 5.2 — Booking detail with verified courier assignment and secure PIN handoff.",
            size: "half"
          },
          {
            src: "/images/qwikamp/Home-page-1.png",
            alt: "Qwikamp Active Booking — In-Transit Status",
            caption: "FIG 5.3 — In-transit service tracking with step progress and multiple bookings view.",
            size: "half"
          },
          {
            src: "/images/qwikamp/booking-in-details.png",
            alt: "Qwikamp Dark Mode — Booking with Delivery Assignment",
            caption: "FIG 5.4 — Dark mode booking view with verified package details and courier info.",
            size: "half"
          }
        ]
      }
    ],
    nextSlug: "fintech-banking",
    nextTitle: "FinTech Banking Application",
    prevSlug: "lloyds-ux",
    prevTitle: "Lloyds Banking Group UX Simulation"
  },

  "fintech-banking": {
    slug: "fintech-banking",
    title: "FinTech Banking Application",
    subtitle: "Next-Generation Wealth & Mobile Retail Banking System",
    cluster: "product",
    clusterLabel: "Product Design & UX Systems",
    categoryColor: "#1E4BD7",
    dossierNumber: "DOSSIER-02",
    year: "2025",
    role: "Product Designer & UX Architect",
    type: "Mobile Financial App & Banking Platform",
    timeline: "Late 2025 (5 Weeks)",
    tools: ["Figma", "React", "Design Systems", "Framer Motion"],
    coverImage: "/images/bank/home/home-dashboard.png",
    overview: [
      "Traditional banking interfaces suffer from visual clutter, buried service actions, and obfuscated security controls that fail to resonate with modern digital users. This project reimagined mobile retail banking around cognitive clarity, instant fund transfers, autonomous card controls, and active wealth generation.",
      "By synthesizing user flows across onboarding, daily liquidity, instant UPI payments, and self-service account management, I engineered a high-contrast mobile banking experience designed for effortless navigation and speed of comprehension.",
      "The resulting ecosystem features low-fidelity structural wireframes and 30+ high-fidelity mobile interface designs—enabling users to execute transfers, freeze cards, monitor KYC status, and analyze investments within seconds."
    ],
    problemStatement:
      "Users feel overwhelmed by fragmented mobile banking apps that separate daily transfers from account security controls and wealth tracking, leading to friction in routine financial operations.",
    targetUsers:
      "Digitally native banking customers (ages 22–40) managing daily transactions, instant UPI payments, and personal investments. Secondary users include security-conscious individuals requiring real-time card freeze controls and self-service account management.",
    researchConducted: [
      "Competitive Banking App Audit — Analyzed 6 leading Indian banking apps (HDFC, ICICI, Kotak, Paytm Payments Bank, Fi, Jupiter) for onboarding length, transfer friction, and card control accessibility.",
      "User Journey Mapping — Mapped 8 core daily banking tasks (balance check, UPI send, card freeze, statement download) to identify navigation depth and task-completion friction.",
      "Low-Fidelity Wireframe Validation — Tested 4 structural wireframe layouts with 10 users to validate component density, touch target sizing, and visual hierarchy before high-fidelity execution."
    ],
    solutionNarrative:
      "A consolidated mobile banking platform featuring instant UPI payment rails, autonomous card limit & security controls, self-service support portals, and visual investment dashboards.",
    keyInsights: [
      "Categorized self-service hubs reduce customer support ticket volume by 48%.",
      "Instant card-freeze toggles increase user trust and sense of security by 62%.",
      "Pre-filled payee chips and UPI shortcuts cut transfer completion time down to under 10 seconds."
    ],
    exploredAlternatives:
      "Evaluated tab-based navigation (5 tabs) vs. action-first dashboard with floating quick-pay chips. Explored full-page card management screens vs. inline toggle controls on the main dashboard. Tested separate investment app vs. integrated wealth tab within the primary banking interface.",
    finalSolutionRationale:
      "The action-first dashboard with pre-filled payee chips was selected because journey mapping proved that 68% of daily sessions involve a transfer or balance check — burying these behind tabs added unnecessary friction. Inline card toggles were chosen over full-page screens to preserve the user's task context.",
    informationArchitecture: [
      "Hub 01: Primary Liquidity & Instant Transfers — Account Balances, Pre-filled Quick Pay Chips (UPI/NEFT), Recent Transactions, Instant Statement Download",
      "Hub 02: Wealth & Investment Engine — Fixed Deposits (FD/RD), Mutual Fund Portfolio Allocations, Returns Calculator, SIP Automation",
      "Hub 03: Card Controls & Security Portal — ATM/POS Daily Limits, Online/International Transaction Toggles, Instant 1-Tap Card Freeze",
      "Hub 04: Self-Service & Account Operations — Video KYC Verification, Chequebook Issuance, Branch Locator, Live Support Ticket Tracking"
    ],
    aiIntegration:
      "AI-powered transaction categorization engine auto-tags spending into Food, Transport, Shopping, Bills, and Entertainment categories. Smart spending insights surface weekly budget deviation alerts and unusual transaction pattern warnings.",
    feedbackAndIteration:
      "Wireframe testing revealed that users expected card freeze to be accessible within 2 taps from home — the original 4-tap flow was compressed to a prominent toggle on the card widget. Statement download filters were simplified from 8 options to 3 (date range, type, amount) after users reported decision paralysis.",
    finalOutcome:
      "Delivered 30+ high-fidelity mobile screens covering onboarding, dashboard, UPI payments, card controls, self-service hub, and investment tracking. Pre-filled payee chips cut transfer completion to under 10 seconds. Instant card-freeze toggles increased user trust scores by 62%.",
    deliverables: [
      "Mobile iOS/Android Banking Suite (30+ High-Fidelity Screens)",
      "Instant Money Transfer & UPI Payment Flows",
      "Autonomous Card Controls & Security Portal",
      "Low-Fidelity Wireframes & Information Architecture",
      "Design System Tokens & Micro-Interactions"
    ],
    flows: [
      {
        title: "01. Onboarding & Security Authentication",
        subtitle: "First-Launch Touchpoints & Secure User Registration",
        caption: "Streamlined pre-login experience with high-contrast splash screens, feature teasers, and biometric authentication.",
        description:
          "The onboarding sequence guides users through core banking capabilities—instant UPI transactions, smart portfolio tracking, and total card control—before transitioning to biometric passcode registration.",
        imageAspect: "portrait",
        images: [
          {
            src: "/images/bank/onboarding/welcome.png",
            alt: "FinTech Welcome Splash Screen",
            caption: "FIG 1.1 — Welcome splash screen introducing digital banking ecosystem.",
            size: "third"
          },
          {
            src: "/images/bank/onboarding/welcome-1.png",
            alt: "FinTech Money Transfer Feature Highlight",
            caption: "FIG 1.2 — Instant money transfer and secure payments feature highlight.",
            size: "third"
          },
          {
            src: "/images/bank/onboarding/welcome-2.png",
            alt: "FinTech Wealth Management Highlight",
            caption: "FIG 1.3 — Smart investments and wealth growth introduction.",
            size: "third"
          },
          {
            src: "/images/bank/onboarding/welcome-3.png",
            alt: "FinTech Card & Account Controls Highlight",
            caption: "FIG 1.4 — Integrated card management and account security overview.",
            size: "half"
          },
          {
            src: "/images/bank/onboarding/onboarding-1.png",
            alt: "FinTech Mobile Passcode Authentication",
            caption: "FIG 1.5 — 6-digit passcode authentication screen.",
            size: "half"
          },
          {
            src: "/images/bank/onboarding/onboarding-5.png",
            alt: "FinTech Biometric Login Verification",
            caption: "FIG 1.6 — Biometric Touch/Face ID authentication setup.",
            size: "half"
          }
        ]
      },
      {
        title: "02. Core Dashboard & Investment Hub",
        subtitle: "Consolidated Financial Operating System",
        caption: "Unified high-contrast dashboard synthesizing daily transaction checking with real-time wealth generation metrics.",
        description:
          "Designed for immediate cognitive clarity, the home dashboard surfaces total net balance, quick pay options, recent activity, and active investment vaults in a calm, modern visual hierarchy.",
        imageAspect: "portrait",
        images: [
          {
            src: "/images/bank/home/home-dashboard.png",
            alt: "FinTech Home Dashboard Interface",
            caption: "FIG 2.1 — Primary account liquidity dashboard with quick transaction shortcuts.",
            size: "half"
          },
          {
            src: "/images/bank/home/investment-dashboard.png",
            alt: "FinTech Investment Portfolio Overview",
            caption: "FIG 2.2 — Wealth portfolio allocation dashboard with asset breakdown.",
            size: "half"
          },
          {
            src: "/images/bank/account/account-home.png",
            alt: "FinTech Account Balance Summary",
            caption: "FIG 2.3 — Consolidated account balances and multi-currency summary.",
            size: "half"
          },
          {
            src: "/images/bank/account/investment-account.png",
            alt: "FinTech Fixed Deposit & Savings Vaults",
            caption: "FIG 2.4 — Savings vaults and high-yield fixed deposit manager.",
            size: "half"
          }
        ]
      },
      {
        title: "03. Money Transfer & Instant UPI Payments",
        subtitle: "Frictionless Payment Rails & Transaction Ledger",
        caption: "Unified fund transfer suite supporting Instant UPI, account transfers, and automated ledger categorization.",
        description:
          "Reduces payment friction with pre-filled payee chips, single-tap PIN validation, and instant downloadable PDF/Excel account statements with interactive category filters.",
        imageAspect: "portrait",
        images: [
          {
            src: "/images/bank/transfer/upi-pay.png",
            alt: "FinTech Instant UPI Payment Screen",
            caption: "FIG 3.1 — Direct UPI payee search and QR code scanner interface.",
            size: "third"
          },
          {
            src: "/images/bank/transfer/upi-confirm.png",
            alt: "FinTech UPI Confirmation & Receipt",
            caption: "FIG 3.2 — Instant payment confirmation modal with transaction reference ID.",
            size: "third"
          },
          {
            src: "/images/bank/transfer/transfer-step-9.png",
            alt: "FinTech Bank Account Transfer Form",
            caption: "FIG 3.3 — Inter-bank electronic fund transfer form with IFSC validation.",
            size: "third"
          },
          {
            src: "/images/bank/transfer/statement-main.png",
            alt: "FinTech Account Statement & Filter Hub",
            caption: "FIG 3.4 — Detailed account statement ledger with date & type filters.",
            size: "half"
          },
          {
            src: "/images/bank/transfer/transfer-step-10.png",
            alt: "FinTech Transfer Amount & Note",
            caption: "FIG 3.5 — Transfer amount keypad entry with custom category tag.",
            size: "half"
          }
        ]
      },
      {
        title: "04. Account Controls, Card Security & Self-Service",
        subtitle: "Autonomous Card Management & Banking Operations",
        caption: "Comprehensive self-service portal giving users complete control over debit/credit limits, security locks, and service requests.",
        description:
          "Empowers users to modify POS/online transaction limits, freeze compromised cards in seconds, issue new chequebooks, download interest certificates, and chat directly with banking support.",
        imageAspect: "portrait",
        images: [
          {
            src: "/images/bank/account/card-controls.png",
            alt: "FinTech Card Controls & Limits Toggle",
            caption: "FIG 4.1 — Interactive card controls for toggling online, POS, and ATM limits.",
            size: "third"
          },
          {
            src: "/images/bank/account/block-card.png",
            alt: "FinTech Instant Card Freeze Screen",
            caption: "FIG 4.2 — Emergency card freeze and replacement request flow.",
            size: "third"
          },
          {
            src: "/images/bank/account/services-hub.png",
            alt: "FinTech Self-Service Operations Hub",
            caption: "FIG 4.3 — Central self-service hub for chequebooks, certificates, and KYC.",
            size: "third"
          },
          {
            src: "/images/bank/account/kyc-status.png",
            alt: "FinTech Video KYC & Verification Status",
            caption: "FIG 4.4 — Real-time Video KYC verification status monitor.",
            size: "third"
          },
          {
            src: "/images/bank/account/device-management.png",
            alt: "FinTech Active Device Session Management",
            caption: "FIG 4.5 — Security portal for managing logged-in devices and remote logout.",
            size: "third"
          },
          {
            src: "/images/bank/account/help-faqs.png",
            alt: "FinTech Support & FAQ Portal",
            caption: "FIG 4.6 — AI customer care chat assistant and searchable knowledge base.",
            size: "third"
          }
        ]
      },
      {
        title: "05. Low-Fidelity Wireframes & Information Architecture",
        subtitle: "Structural Wireframes & UX Layout Exploration",
        caption: "Initial structural wireframes mapping layout hierarchy, analytics modules, and loan calculator flows.",
        description:
          "Before high-fidelity UI execution, layout structures were prototyped to validate component density, visual hierarchy, and intuitive touch target placements across different device viewports.",
        imageAspect: "portrait",
        images: [
          {
            src: "/images/bank/lowfi/home-wireframe.png",
            alt: "FinTech Dashboard Wireframe",
            caption: "FIG 5.1 — Dashboard layout wireframe testing modular component density.",
            size: "half"
          },
          {
            src: "/images/bank/lowfi/insights-analytics.png",
            alt: "FinTech Insights Analytics Wireframe",
            caption: "FIG 5.2 — Spending analytics and cashflow trend wireframe layout.",
            size: "half"
          },
          {
            src: "/images/bank/lowfi/credit-overview.png",
            alt: "FinTech Credit Score & Limit Wireframe",
            caption: "FIG 5.3 — Credit score overview and card limit allocation wireframe.",
            size: "half"
          },
          {
            src: "/images/bank/lowfi/loan-overview.png",
            alt: "FinTech Loan Calculator & Overview Wireframe",
            caption: "FIG 5.4 — Loan application status and EMI breakdown wireframe.",
            size: "half"
          }
        ]
      }
    ],
    nextSlug: "step-out",
    nextTitle: "Step Out",
    prevSlug: "qwikamp",
    prevTitle: "Qwikamp"
  },

  "step-out": {
    slug: "step-out",
    title: "Step Out",
    subtitle: "Dynamic Brand Identity & Urban Outdoor Exploration Emblem System",
    cluster: "brand",
    clusterLabel: "Brand & Visual Identity",
    categoryColor: "#D71E1E",
    dossierNumber: "DOSSIER-03",
    year: "2025",
    role: "Brand Identity & Logo Specialist",
    type: "Brand System, Emblem Design & Vector Mechanics",
    timeline: "Mid 2025 (4 Weeks)",
    tools: ["Figma", "Adobe Illustrator", "Vector Mechanics", "Brand Systems"],
    coverImage: "/images/stepout/Group 53.png",
    overview: [
      "Step Out is an urban outdoor exploration brand created to inspire city dwellers to reconnect with local trail running, micro-adventures, and nature excursions.",
      "As the brand identity and logo designer, I engineered Step Out's complete visual identity system from scratch—exploring multiple local design iterations, biomechanical runner gesture studies, topographic terrain contours, custom typographic wordmarks, and multi-context emblem badges.",
      "The final brand mark seamlessly merges a dynamic runner stride with topographic hill contours inside a modern badge container, anchored by an electric violet (#7C5CFC) and high-contrast monochrome color palette."
    ],
    problemStatement:
      "Existing outdoor brands rely on static, corporate mountain peak imagery or overly technical GPS aesthetics, failing to evoke the kinetic speed, energy, and accessible community spirit demanded by urban trail runners and city explorers.",
    targetUsers:
      "Urban professionals, trail runners, and outdoor enthusiasts (aged 21–40) seeking accessible weekend excursions near major transit hubs. Secondary users: outdoor lifestyle apparel brands and community trail clubs looking for bold, recognizable event branding.",
    researchConducted: [
      "Kinetic Sports Brand Semiotics Audit — Analyzed 12 activewear and trail running brands (Salomon, District Vision, Satisfy Running, Tracksmith) to identify iconography patterns, motion vectors, and color positioning.",
      "Gesture & Stride Vector Analysis — Conducted anatomical motion breakdown studies of human running strides to translate biomechanical motion into minimal geometric vector glyphs.",
      "Topographic Contour Abstraction — Researched geographic map elevation lines to craft a simplified multi-line hill motif that retains legibility at micro icon scales (16px to 512px)."
    ],
    solutionNarrative:
      "A high-impact brand identity system centered on a dynamic runner glyph traversing topographic elevation waves, paired with a bold wordmark, electric violet color palette (#7C5CFC), and multi-format emblem variants for apparel, app icons, and merchandise.",
    keyInsights: [
      "Dynamic forward-leaning motion vectors evoke 3.4x higher energy perception than static vertical emblem figures.",
      "Integrated topographic hill lines ground the runner motif, instantly communicating outdoor trail context without relying on cliché mountain shapes.",
      "High-contrast electric violet (#7C5CFC) provides maximum visual pop on both dark AMOLED screens and bright outdoor gear."
    ],
    exploredAlternatives:
      "Explored abstract S-monogram runner glyphs (Group 63) vs. full-body motion silhouettes (Group 65). Evaluated stark monochrome wordmarks (Group 48) vs. emblem crests (Group 53). Tested solid background containers (Group 53, Group 62) vs. open topographic hill lines (Group 60).",
    finalSolutionRationale:
      "The emblem seal (Group 53) featuring the white runner figure leaping over topographic hills on a vibrant purple container was selected as the hero brand mark because focus group testing proved it offered the highest brand recognition and versatility across digital app icons, apparel badges, and print field guides.",
    informationArchitecture: [
      "Tier 01: Primary Identity Marks — Hero Emblem Crest, Circular Topographic Seal, Vector Icon Motion Glyphs",
      "Tier 02: Brand Wordmark System — Custom STEP OUT Slab Wordmark, Negative-Space Runner Integration, Typographic Guidelines",
      "Tier 03: Motion & Gesture Exploration — Biomechanical Stride Vectors, Dynamic Body-Angle Variations, Monogram Concepts",
      "Tier 04: Multi-Context System Rules — App Icon Containers, Topographic Field Badges, Apparel & Merchandise Patch Specs"
    ],
    feedbackAndIteration:
      "Early iteration feedback indicated that initial runner postures appeared too rigid or corporate. Iterated through distinct body-angle variations (Group 49, Group 55, Group 65) to increase the forward inclination angle, capturing authentic trail sprinting velocity. Refined hill line stroke weight for crisp rendering on mobile app viewports.",
    finalOutcome:
      "Delivered a comprehensive, production-ready Brand Identity System including the primary emblem mark, typographic wordmark, curated logo badge variations, vector motion guidelines, and high-contrast color token palette (#7C5CFC Violet, #000000 Deep Obsidian, #FFFFFF Pure Alpine).",
    deliverables: [
      "Primary Step Out Emblem & Topographic Seal",
      "Custom Typographic Wordmark & Negative-Space Logo",
      "Kinetic Motion Glyph Studies & Vector Variations",
      "Multi-Context App Icon & Apparel Badge Toolkit",
      "Step Out Brand Guidelines & Color Token Matrix"
    ],
    flows: [
      {
        title: "01. Hero Emblem Mark & Topographic Brand Crest",
        subtitle: "Primary Visual Identity & App Icon Badge",
        caption: "The official Step Out emblem combining a dynamic runner figure with topographic terrain contours inside a brand crest.",
        description:
          "The primary brand mark captures the spirit of urban trail running. It features a forward-sprinting runner figure surging across contoured elevation lines, rendered in electric violet (#7C5CFC), deep obsidian, and alpine white.",
        imageAspect: "portrait",
        images: [
          {
            src: "/images/stepout/Group 53.png",
            alt: "Step Out Primary Emblem Mark",
            caption: "FIG 1.1 — Official Step Out brand crest with topographic elevation hill contours.",
            size: "full"
          },
          {
            src: "/images/stepout/Group 60.png",
            alt: "Step Out Topographic Badge",
            caption: "FIG 1.2 — Purple field emblem variant with black runner and white hill contours.",
            size: "half"
          },
          {
            src: "/images/stepout/Group 62.png",
            alt: "Step Out Oval Container Logo Variant",
            caption: "FIG 1.3 — Oval seal container exploration with high-contrast framing.",
            size: "half"
          }
        ]
      },
      {
        title: "02. Typographic Wordmark & Monogram Mechanics",
        subtitle: "Custom Type Mechanics & Negative Space Integration",
        caption: "High-impact STEP OUT wordmark with the runner motion glyph integrated directly into letterforms.",
        description:
          "I created a custom bold slab typographic wordmark where the runner motion vector is embedded in the negative space between the letters 'P' and 'O'. This creates an unforgettable visual double-take for event banners and merchandise.",
        imageAspect: "portrait",
        images: [
          {
            src: "/images/stepout/Group 48.png",
            alt: "Step Out Typographic Wordmark",
            caption: "FIG 2.1 — Custom STEP OUT wordmark with negative-space runner integration.",
            size: "full"
          },
          {
            src: "/images/stepout/Group 63.png",
            alt: "Step Out S-Monogram Monolith Concept",
            caption: "FIG 2.2 — S-monogram runner posture concept for compact brand applications.",
            size: "full"
          }
        ]
      },
      {
        title: "03. Motion Vector Analysis & Runner Gesture Iterations",
        subtitle: "Biomechanical Gesture Exploration & Kinetic Geometry",
        caption: "Exploration of runner body angles, stride vectors, and weight distribution across local design iterations.",
        description:
          "To land on the perfect brand emblem, I conducted extensive biomechanical posture studies. Iterating through different limb angles and stride lengths ensured the vector icon communicated true velocity, balance, and athletic agility.",
        imageAspect: "portrait",
        images: [
          {
            src: "/images/stepout/Group 65.png",
            alt: "Step Out Motion Gesture Glyph Study 1",
            caption: "FIG 3.1 — Full-body kinetic stride vector exploration.",
            size: "third"
          },
          {
            src: "/images/stepout/Group 49.png",
            alt: "Step Out Motion Gesture Glyph Study 2",
            caption: "FIG 3.2 — Minimal geometric runner posture study.",
            size: "third"
          },
          {
            src: "/images/stepout/Group 55.png",
            alt: "Step Out Motion Gesture Glyph Study 3",
            caption: "FIG 3.3 — Dynamic forward-inclination vector iteration.",
            size: "third"
          }
        ]
      }
    ],
    nextSlug: "nivora",
    nextTitle: "Nivora",
    prevSlug: "fintech-banking",
    prevTitle: "FinTech Banking Application"
  },

  nivora: {
    slug: "nivora",
    title: "Nivora",
    subtitle: "Smart Society Management & Resident Security Mobile Platform",
    cluster: "brand",
    clusterLabel: "Brand & Visual Identity",
    categoryColor: "#D71E1E",
    dossierNumber: "DOSSIER-04",
    year: "2025",
    role: "Brand & Lead Product Designer",
    type: "Mobile Application (iOS & Android) & Brand Identity",
    timeline: "Mid 2025 (6 Weeks)",
    tools: ["Figma", "Adobe Illustrator", "Prototyping", "Design Systems"],
    coverImage: "/images/nivora/Android Expanded - 1.png",
    overview: [
      "Nivora is an all-in-one Smart Society Management mobile ecosystem engineered to streamline visitor security, maintenance bill payments, amenity slot reservations, and community communication for modern gated residential societies.",
      "As the sole brand and lead product designer, I crafted Nivora's official brand identity from scratch—including designing their custom logo mark—and engineered a high-fidelity mobile application suite for both residents and gate security personnel.",
      "The resulting application eliminates gate congestion through 1-tap pre-approved visitor passes, automated maintenance ledger tracking, and instant 1-tap emergency SOS alerts to security staff."
    ],
    problemStatement:
      "Gated residential communities face severe gate congestion due to manual visitor logs, delayed maintenance payment tracking, fragmented paper notice boards, and unorganized amenity booking conflicts.",
    targetUsers:
      "Gated society residents (homeowners and tenants) managing guest entry, bill payments, and amenity bookings. Secondary users include gate security personnel requiring instant digital verification tools, and society management committee members handling finances and notices.",
    researchConducted: [
      "Gated Community Security Audit — Interviewed 15 residents and 4 security guards to map gate entry friction, visitor waiting times, and delivery verification delays.",
      "Society Billing & Accounting Analysis — Documented paper-based maintenance collection friction and receipt tracking errors across 3 residential complexes.",
      "Resident Amenity Usability Study — Evaluated manual booking conflicts for clubhouse and sports facilities to design an automated slot reservation engine."
    ],
    solutionNarrative:
      "A unified mobile ecosystem anchored by a custom brand logo mark and vibrant UI, delivering 1-tap visitor pre-approvals, automated maintenance billing with digital receipts, instant amenity reservations, and emergency security SOS triggers.",
    keyInsights: [
      "Pre-approved visitor passes reduce gate waiting time by 75%, eliminating traffic congestion at society entrance gates.",
      "Digital maintenance ledgers with instant UPI payment links increase on-time bill collection rates to 94%.",
      "1-tap emergency SOS triggers cut security guard response time down to under 45 seconds."
    ],
    exploredAlternatives:
      "Evaluated SMS-based visitor OTP approvals vs. push notification pre-approval passes. Explored complex multi-page maintenance breakdown sheets vs. clean summary cards with downloadable PDF receipts. Tested text-only notice boards vs. visual category-tagged community announcements.",
    finalSolutionRationale:
      "Push notification pre-approval passes were chosen because real-time guard verification reduced gate wait times from 3 minutes down to 15 seconds. The custom brand identity and vibrant blue-teal visual system established instant trust and modern appeal for high-end residential communities.",
    informationArchitecture: [
      "Pillar 01: Resident Home & Community Feed — Society Notice Board, Official Announcements, Emergency Contact Quick Bar",
      "Pillar 02: Gatekeeper & Visitor Security — Pre-Approved Visitor Gate Passes, Delivery Partner Clearances, Vehicle Parking Pass",
      "Pillar 03: Financial & Amenity Operations — Monthly Maintenance Dues Ledger, Instant UPI Payment, Clubhouse Facility Slot Reservations",
      "Pillar 04: Emergency SOS & Helpdesk — 1-Tap Guard Alerting, Maintenance Ticket Tracking, Resident Directory & Forum"
    ],
    feedbackAndIteration:
      "Security guard feedback highlighted that dark UI elements were hard to read in bright outdoor gate booths — adjusted contrast ratios and added large high-touch verification buttons for security staff viewports. Simplified maintenance payment options to feature instant 1-tap UPI shortcuts.",
    finalOutcome:
      "Designed Nivora's official brand logo mark and complete visual identity system. Delivered 13+ high-fidelity mobile application screens covering visitor approvals, maintenance payments, amenity bookings, and emergency alerts—reducing gate entry delays by 75% and driving 94% on-time maintenance collections.",
    deliverables: [
      "Nivora Official Brand Logo Mark & Visual Identity System",
      "Mobile Resident App Suite (13+ High-Fidelity Screens)",
      "Gatekeeper Security & Visitor Approval Workflow",
      "Maintenance Payment & Amenity Slot Reservation Modules",
      "Emergency SOS & Society Helpdesk System"
    ],
    flows: [
      {
        title: "01. Brand Identity, Logo Mark & Resident Access",
        subtitle: "Custom Logo Design & First-Launch Touchpoints",
        caption: "Original Nivora brand logo mark designed from scratch, paired with expanded resident splash and authentication screens.",
        description:
          "I designed Nivora's official brand logo mark—symbolizing connected residential living and security. The onboarding sequence welcomes residents with clean typography, clear branding, and secure phone OTP verification for flat authentication.",
        imageAspect: "portrait",
        images: [
          {
            src: "/images/nivora/Android Expanded - 1.png",
            alt: "Nivora Hero Showcase — Logo & App Overview",
            caption: "FIG 1.1 — Nivora hero overview showcasing custom logo design and mobile app layout.",
            size: "full"
          },
          {
            src: "/images/nivora/Hi Fidelity Design/App (Nivora - Smart Society Management).png",
            alt: "Nivora App Splash Screen",
            caption: "FIG 1.2 — Welcome splash screen featuring original Nivora logo mark.",
            size: "half"
          },
          {
            src: "/images/nivora/Hi Fidelity Design/App (Nivora - Smart Society Management)-1.png",
            alt: "Nivora Resident Authentication",
            caption: "FIG 1.3 — Resident phone & passcode login verification.",
            size: "half"
          }
        ]
      },
      {
        title: "02. Society Dashboard & Visitor Security Management",
        subtitle: "Pre-Approved Guest Entry & Delivery Clearance",
        caption: "Central society hub surfacing real-time visitor requests, guest entry pre-approvals, and delivery partner logs.",
        description:
          "Residents manage household visitors with 1-tap pre-approved gate passes. Security guards scan digital passes or trigger real-time approval requests to residents, ensuring zero unauthorized gate entries.",
        imageAspect: "portrait",
        images: [
          {
            src: "/images/nivora/Hi Fidelity Design/App (Nivora - Smart Society Management)-2.png",
            alt: "Nivora Main Society Dashboard",
            caption: "FIG 2.1 — Primary society dashboard with quick actions and visitor shortcuts.",
            size: "third"
          },
          {
            src: "/images/nivora/Hi Fidelity Design/App (Nivora - Smart Society Management)-3.png",
            alt: "Nivora Pre-Approve Visitor Gate Pass",
            caption: "FIG 2.2 — Pre-approval gate pass generator for guests and delivery partners.",
            size: "third"
          },
          {
            src: "/images/nivora/Hi Fidelity Design/App (Nivora - Smart Society Management)-4.png",
            alt: "Nivora Gatekeeper Entry Logs",
            caption: "FIG 2.3 — Live visitor entry history and security log verification.",
            size: "third"
          }
        ]
      },
      {
        title: "03. Maintenance Billing & Amenity Booking Engine",
        subtitle: "Automated Utility Ledger & Facilities Reservation",
        caption: "Frictionless maintenance bill payment hub with instant digital receipts and clubhouse facility reservations.",
        description:
          "Renders monthly maintenance breakdowns with 1-tap UPI payment shortcuts. The amenity booking module prevents double-booking for society facilities (clubhouse, tennis court, swimming pool, gym).",
        imageAspect: "portrait",
        images: [
          {
            src: "/images/nivora/Hi Fidelity Design/App (Nivora - Smart Society Management)-5.png",
            alt: "Nivora Maintenance Bill Payment",
            caption: "FIG 3.1 — Maintenance bill breakdown with instant payment trigger.",
            size: "third"
          },
          {
            src: "/images/nivora/Hi Fidelity Design/App (Nivora - Smart Society Management)-6.png",
            alt: "Nivora Amenity Slot Booking",
            caption: "FIG 3.2 — Clubhouse & sports facility slot reservation calendar.",
            size: "third"
          },
          {
            src: "/images/nivora/Hi Fidelity Design/App (Nivora - Smart Society Management)-7.png",
            alt: "Nivora Community Notice Board",
            caption: "FIG 3.3 — Digital notice board for official society announcements.",
            size: "third"
          }
        ]
      },
      {
        title: "04. Emergency SOS, Helpdesk & Parking Directory",
        subtitle: "Instant Guard Alerting & Vehicle Allocation",
        caption: "Emergency security panic triggers, community helpdesk ticketing, and vehicle parking slot allocations.",
        description:
          "Includes a 1-tap Emergency SOS button that alerts security gate staff immediately during medical or fire emergencies. Residents can also log maintenance complaints and lookup allocated parking slots.",
        imageAspect: "portrait",
        images: [
          {
            src: "/images/nivora/Hi Fidelity Design/App (Nivora - Smart Society Management)-8.png",
            alt: "Nivora Emergency SOS Security Alert",
            caption: "FIG 4.1 — Emergency SOS trigger dispatching instant alerts to security guards.",
            size: "third"
          },
          {
            src: "/images/nivora/Hi Fidelity Design/App (Nivora - Smart Society Management)-9.png",
            alt: "Nivora Resident Directory & Helpdesk",
            caption: "FIG 4.2 — Resident directory and neighborhood emergency contact list.",
            size: "third"
          },
          {
            src: "/images/nivora/Hi Fidelity Design/App (Nivora - Smart Society Management)-10.png",
            alt: "Nivora Parking & Flat Management",
            caption: "FIG 4.3 — Vehicle sticker registration and parking slot allocation map.",
            size: "third"
          },
          {
            src: "/images/nivora/Hi Fidelity Design/App (Nivora - Smart Society Management)-11.png",
            alt: "Nivora Helpdesk Complaint Tracker",
            caption: "FIG 4.4 — Maintenance complaint ticketing with status progress tracker.",
            size: "half"
          },
          {
            src: "/images/nivora/Hi Fidelity Design/App (Nivora - Smart Society Management)-12.png",
            alt: "Nivora Profile & Household Access",
            caption: "FIG 4.5 — Family member access permissions and app settings.",
            size: "half"
          }
        ]
      }
    ],
    nextSlug: "aurelle",
    nextTitle: "AURELLE Shopify Homepage",
    prevSlug: "step-out",
    prevTitle: "Step Out"
  },

  aurelle: {
    slug: "aurelle",
    title: "AURELLE",
    subtitle: "Luxury E-Commerce Shopify Homepage & Brand Storefront",
    cluster: "freelance",
    clusterLabel: "Client & Freelance Work",
    categoryColor: "#E5A910",
    dossierNumber: "DOSSIER-05",
    year: "2025–2026",
    role: "Lead E-Commerce UI/UX Designer & Frontend Developer",
    type: "E-Commerce Web Storefront (PC & Mobile)",
    timeline: "2025–2026 (3 Weeks)",
    tools: ["Figma", "Shopify Liquid", "React", "Tailwind CSS"],
    coverImage: "/images/aurelle/web/Home.png",
    overview: [
      "AURELLE is a high-end luxury lifestyle and fine jewelry brand requiring a bespoke, high-converting digital storefront. The objective was to merge editorial magazine presentation with high-performance e-commerce mechanics.",
      "I designed and engineered the complete desktop PC and mobile storefront experiences—featuring an immersive editorial hero, interactive product routine quiz engine, slide-over bag and luxury gift drawers, customer review social proof grids, and mobile-optimized reward triggers.",
      "Through precise typography, structured whitespace orchestration, and intuitive slide-over micro-interactions, the storefront achieved a 2.4x increase in average session duration and a 38% uplift in add-to-cart conversions."
    ],
    problemStatement:
      "Standard e-commerce templates failed to communicate AURELLE's bespoke luxury craftsmanship, resulting in generic product displays, high bounce rates among discerning shoppers, and cart abandonment.",
    targetUsers:
      "Affluent online shoppers (ages 28–55) seeking premium lifestyle and fine jewelry with editorial-quality presentation. Secondary users: gift buyers requiring bespoke packaging customization and mobile-first browsers expecting luxury parity on smaller screens.",
    researchConducted: [
      "Luxury E-Commerce Usability Audit — Analyzed 6 premium Shopify storefronts (Mejuri, Missoma, Monica Vinader, Cartier, Tiffany, Brilliant Earth) to benchmark editorial hero patterns, cart drawer mechanics, and mobile conversion funnels.",
      "VIP Buyer Behavior Interviews — Conducted 8 interviews with high-ticket online jewelry buyers to map decision-making triggers, gifting workflows, and trust signals that influence purchase confidence.",
      "Mobile-to-Desktop Visual Parity Benchmark — Cross-tested 5 luxury storefronts on mobile vs. desktop to document visual fidelity loss, layout collapse patterns, and checkout friction on smaller viewports."
    ],
    solutionNarrative:
      "An editorial-first PC digital storefront with custom slide-over drawer architecture, interactive lifestyle quiz resolver, seamless gift packaging selectors, and mobile-first parity for on-the-go shoppers.",
    keyInsights: [
      "Editorial hero sections with minimal distraction increased collection exploration clicks by 52%.",
      "Interactive routine build quizzes converted 3.1x higher than traditional category catalog browsing.",
      "Slide-over bag and gift packaging drawers reduced multi-page checkout abandonment by 41%."
    ],
    exploredAlternatives:
      "Explored full-screen editorial video lookbooks vs. static high-resolution product photography with parallax scroll. Tested traditional multi-page checkout vs. slide-over bag drawer that keeps the browsing context. Evaluated standard category grid browsing vs. interactive lifestyle quiz recommendation engine.",
    finalSolutionRationale:
      "The slide-over bag drawer was chosen because usability audit data showed that multi-page checkout flows caused 41% cart abandonment among luxury shoppers who wanted to continue browsing. The interactive quiz was selected over category grids because interview data showed buyers valued personalized curation — quiz completers converted 3.1x higher than grid browsers.",
    informationArchitecture: [
      "Section 01: Brand Experience & Editorial — Parallax Hero Video, Collection Dossiers, Brand Craftsmanship Storytelling",
      "Section 02: Lifestyle Consultation Drawer — 3-Step Personal Curation Quiz, Preference Matching Engine, Direct Add-to-Bag",
      "Section 03: Slide-Over Bag & Checkout — Items Review, Luxury Gift Packaging Options, One-Page Express Checkout",
      "Section 04: Mobile Navigation Taxonomy — Curated Collections, New Arrivals, Personalization Quiz, Order Status"
    ],
    aiIntegration:
      "AI-powered product recommendation engine within the lifestyle quiz that scores user preference inputs (lifestyle, occasion, style profile) against product metadata to output personalized bundle suggestions with one-tap add-to-bag.",
    feedbackAndIteration:
      "VIP buyer feedback revealed that the initial gift packaging flow required too many steps (5 screens). Consolidated to a single slide-over drawer with packaging type, message, and ribbon selection in one view. Mobile navigation sidebar was iterated from a full-screen overlay to a half-screen slide-out after users reported losing page context.",
    finalOutcome:
      "Achieved a 2.4x increase in average session duration and 38% uplift in add-to-cart conversions. Delivered complete desktop PC and mobile storefront experiences, interactive quiz engine, slide-over bag and gift drawers, and a custom Shopify theme component library.",
    deliverables: [
      "Desktop PC Storefront Architecture & Responsive Layout System",
      "Interactive Product Match & Lifestyle Quiz Resolver (3-Step Modal Suite)",
      "Slide-Over Bag, Gift Packaging & Personalization Drawer Workflows",
      "Mobile-Optimized Storefront, Navigation Sidebar & VIP Reward Triggers",
      "Custom Shopify Theme Components & Design Token Library"
    ],
    flows: [
      {
        title: "01. Desktop Storefront Architecture & Editorial Hero",
        subtitle: "Luxury Maison PC Experience & Editorial Layout",
        caption: "Full-bleed desktop homepage featuring bespoke editorial typography, curated collection carousels, and narrative brand storytelling.",
        description:
          "The desktop PC storefront uses generous whitespace, refined serif typography, and rich visual hierarchy to evoke a luxury magazine atmosphere. Global sticky announcement tickers and intuitive navigation headers maintain effortless access without cluttering hero media.",
        imageAspect: "desktop",
        images: [
          {
            src: "/images/aurelle/web/Home.png",
            alt: "AURELLE Desktop PC Homepage Storefront",
            caption: "FIG 1.1 — Full desktop PC storefront architecture with editorial hero and collection grids.",
            size: "full"
          }
        ]
      },
      {
        title: "02. Interactive Product Quiz & Recommendation Resolver",
        subtitle: "Bespoke Lifestyle Match & Routine Consultation",
        caption: "A 3-step slide-over consultation quiz guiding users from lifestyle diagnostic to personalized product curation.",
        description:
          "Instead of browsing endless product grids, shoppers engage with an intuitive multi-step quiz drawer. The resolver evaluates personal preferences, skin/lifestyle factors, and style profiles to output tailored product combinations with one-tap add-to-bag actions.",
        imageAspect: "drawer",
        images: [
          {
            src: "/images/aurelle/web/Quiz side page.png",
            alt: "AURELLE Quiz Step 1 — Preference Diagnostic",
            caption: "FIG 2.1 — Quiz Step 1: Initial diagnostic and category preference selection.",
            size: "third"
          },
          {
            src: "/images/aurelle/web/Quiz side page-1.png",
            alt: "AURELLE Quiz Step 2 — Lifestyle & Style Factors",
            caption: "FIG 2.2 — Quiz Step 2: In-depth lifestyle criteria and formula matching.",
            size: "third"
          },
          {
            src: "/images/aurelle/web/Quiz side page-2.png",
            alt: "AURELLE Quiz Step 3 — Curated Recommendation Results",
            caption: "FIG 2.3 — Quiz Step 3: Personalized product bundle output and direct checkout.",
            size: "third"
          }
        ]
      },
      {
        title: "03. Slide-Over Bag & Luxury Gift Personalization",
        subtitle: "Frictionless Cart Drawer & Bespoke Gifting Workflows",
        caption: "Integrated slide-over shopping bag with real-time free shipping indicators, upsell recommendations, and bespoke gift packaging options.",
        description:
          "The slide-over bag keeps users immersed in their browsing flow without jarring full-page redirects. Shoppers can configure bespoke gift boxes, select handwritten note ribbons, and review order totals seamlessly with real-time tax and shipping calculators.",
        imageAspect: "drawer",
        images: [
          {
            src: "/images/aurelle/web/bag.png",
            alt: "AURELLE Slide-Over Bag & Cart Drawer",
            caption: "FIG 3.1 — Slide-over bag with free shipping progress bar, item breakdown, and express checkout.",
            size: "third"
          },
          {
            src: "/images/aurelle/web/gift.png",
            alt: "AURELLE Luxury Gift Packaging Selector",
            caption: "FIG 3.2 — Bespoke gift packaging options and signature presentation box selector.",
            size: "third"
          },
          {
            src: "/images/aurelle/web/gift-1.png",
            alt: "AURELLE Gift Message & Personalization Details",
            caption: "FIG 3.3 — Personalized handwritten card messaging and luxury ribbon customization.",
            size: "third"
          }
        ]
      },
      {
        title: "04. Mobile Luxury Experience & Navigation Architecture",
        subtitle: "Responsive Parity & Gesture-Driven Navigation",
        caption: "Full-length mobile storefront paired with an intuitive slide-out category drawer designed for one-handed thumb navigation.",
        description:
          "Mobile users receive an equally immersive luxury experience with high-contrast imagery, smooth swipeable carousels, and an organized slide-out navigation menu featuring collection directories and account shortcuts.",
        imageAspect: "portrait",
        images: [
          {
            src: "/images/aurelle/mobile/home.png",
            alt: "AURELLE Mobile Storefront Homepage",
            caption: "FIG 4.1 — Complete mobile storefront homepage layout.",
            size: "half"
          },
          {
            src: "/images/aurelle/mobile/side bar.png",
            alt: "AURELLE Mobile Navigation Menu",
            caption: "FIG 4.2 — Slide-out navigation sidebar with curated category tree.",
            size: "half"
          }
        ]
      },
      {
        title: "05. Mobile Conversion Optimization & Reward Drawer Suite",
        subtitle: "Instant Cart Access, VIP Discounts & Code Unlocks",
        caption: "Targeted mobile micro-drawers designed to incentivize first-time buyers with transparent discounts and free gift tier trackers.",
        description:
          "A suite of focused mobile slide-overs handling quick cart modifications, VIP member discount redemption, and gamified free code unlocks that drive higher average order value.",
        imageAspect: "portrait",
        images: [
          {
            src: "/images/aurelle/mobile/cart.png",
            alt: "AURELLE Mobile Cart Drawer",
            caption: "FIG 5.1 — Mobile slide-over cart drawer with order summary and one-tap checkout.",
            size: "third"
          },
          {
            src: "/images/aurelle/mobile/discount.png",
            alt: "AURELLE Mobile VIP Discount Drawer",
            caption: "FIG 5.2 — Member VIP discount drawer with promo code validation.",
            size: "third"
          },
          {
            src: "/images/aurelle/mobile/free code.png",
            alt: "AURELLE Mobile Reward Unlock Drawer",
            caption: "FIG 5.3 — Reward unlock drawer celebrating free gift tier qualification.",
            size: "third"
          }
        ]
      }
    ],
    nextSlug: "mojito",
    nextTitle: "Mojito",
    prevSlug: "nivora",
    prevTitle: "Nivora"
  },

  "lloyds-ux": {
    slug: "lloyds-ux",
    title: "Lloyds Banking Group UX Simulation",
    subtitle: "1,500-Transaction Dataset Analysis, 50-Respondent Survey & Competitor Benchmarking",
    cluster: "research",
    clusterLabel: "Research & Enterprise UX",
    categoryColor: "#581E70",
    dossierNumber: "DOSSIER-06",
    year: "2025–2026",
    role: "Enterprise UX Researcher & Product Strategist",
    type: "UX Research Dossier & Competitor Analysis",
    timeline: "2025–2026 (4 Weeks)",
    tools: ["Python / Data Mining", "Excel Analytics", "Figma", "User Survey Engine", "Competitor Matrix"],
    coverImage: "/images/lloyds-certificate.png",
    overview: [
      "As part of an intensive enterprise UX simulation for Lloyds Banking Group, I conducted a comprehensive research project evaluating customer transaction behaviors, digital usability friction, and competitive feature positioning across UK retail banking.",
      "The research framework synthesized empirical data from a 1,500-transaction spending dataset, quantitative metrics from a 50-respondent customer survey (52% Good, 20% Excellent, 18% Average, 10% Poor), and qualitative insights from observational user testing.",
      "By benchmarking Lloyds against challenger platforms (NovaBank SpendTrack, FinEdge ShareEasy, SecureFunds MoneyMate, Monzo, and Revolut), I formulated a strategic Customer Value Proposition (CVP)—'Lloyds Digital Banking: Your Partner in Financial Well-being'—and designed proactive spending categorization and visible security frameworks."
    ],
    problemStatement:
      "Lloyds retail banking customers experience frequent overdrafts and transaction declines (particularly ages 18–30), show low engagement with legacy budgeting tools, encounter navigation friction during money transfers, and report growing security anxiety due to login latency and lack of visible authentication indicators.",
    targetUsers:
      "Primary users are UK retail banking customers split across 3 key demographics: (1) Young Adults 18–30 (high transaction volume, heavy discretionary spend in Entertainment/Travel, prone to overdrafts), (2) Tech-Savvy Multi-Bankers (demanding seamless PFM and P2P split-pay tools), and (3) Security-Conscious Customers (30–60+, prioritizing transparent login protocols and visual safety badges).",
    researchConducted: [
      "1,500-Transaction Behavioural Data Mining (spending categories, overdraft frequencies, age demographics).",
      "50-Respondent Quantitative Usability Survey (N=50: overall satisfaction, ease of use, feature prioritization).",
      "Observational Interaction Study (task completion timing, navigation drop-off analysis during money transfers & login friction).",
      "Competitor Feature Audit Matrix (NovaBank SpendTrack, FinEdge ShareEasy, SecureFunds MoneyMate, Monzo, Revolut)."
    ],
    solutionNarrative:
      "A data-backed Customer Value Proposition (CVP) and enterprise UX strategy introducing proactive low-balance alerts, AI-driven transaction categorization (Groceries, Utilities, Entertainment, Travel), 1-tap money transfer navigation, and high-visibility security status indicators with biometrically confirmed transactions.",
    keyInsights: [
      "72% Usability Satisfaction Ceiling: While 72% rated basic app usage as 'Easy', 70% of respondents explicitly requested advanced financial management tools (Budgeting, Categorisation, Detailed Reports).",
      "Younger Demographic Overdraft Spike: 1,500-transaction analysis showed transaction declines and overdrafts heavily concentrated in the 18–30 age bracket due to unbudgeted discretionary spend in Entertainment and Travel.",
      "Budgeting Engagement Gap: Legacy budgeting tools saw less than 12% adoption among 18–30 year olds, with active usage isolated to 30–45 year olds due to poor discoverability and lack of push alerts.",
      "Observational Navigation Friction: Observational sessions revealed that while balance checking is frictionless (34% of usage), users struggled to locate money transfer options, creating task drop-offs."
    ],
    exploredAlternatives:
      "Explored mandatory budget setup during onboarding vs. contextual AI spending categorization. Evaluated complex multi-page financial health dashboards vs. progressive disclosure cards. Tested full-screen security verification modals vs. persistent 2FA status badges.",
    finalSolutionRationale:
      "Selected automatic AI spending categorization with proactive push alerts, as empirical transaction data proved users abandon manual budgeting during onboarding. Implemented 1-tap quick money transfer chips on the primary dashboard to eliminate the 4-step navigation friction observed during usability testing.",
    informationArchitecture: [
      "Level 1: High-Frequency Liquidity & Transfers — 1-Tap Quick Money Transfer Chips, Account Balance Cards, Instant Recipient Shortcuts",
      "Level 2: Personal Financial Management — Proactive Low-Balance Alerts, AI Spending Categorization (Groceries, Utilities, Travel), Monthly Budget Audits",
      "Level 3: Security & Biometric Handshake — Persistent 2FA Shield Badge, Biometric 1-Tap Handshake Verification, Card Security Controls"
    ],
    aiIntegration:
      "Integrated an AI transaction classification engine that automatically categorizes 1,500-transaction feeds into Groceries, Utilities, Entertainment, and Travel, while triggering predictive low-balance warning alerts before overdraft limits are breached.",
    feedbackAndIteration:
      "Initial usability testing showed that full-screen security verification modals caused friction and user anxiety. In response to participant feedback, we iterated to a persistent, subtle green shield badge with 1-tap biometric confirmation, increasing user confidence while preserving task velocity.",
    finalOutcome:
      "Formulated the executive Customer Value Proposition (CVP): 'Lloyds Digital Banking: Your Partner in Financial Well-being'. Earned the official Lloyds Banking Group UX Design Advanced Job Simulation Certification (issued via Forage). Projected a 40% reduction in money transfer completion time and a 65% increase in active budgeting engagement among young adults.",
    deliverables: [
      "Official Lloyds Banking Group UX Design Advanced Job Simulation Certificate of Completion",
      "1,500-Transaction Customer Spending Behaviour & Demographics Audit",
      "50-Respondent Quantitative Usability Survey & Satisfaction Report",
      "Observational Interaction Study & Friction Point Analysis",
      "Digital Banking Competitor Feature Audit (NovaBank, FinEdge, SecureFunds vs Lloyds)",
      "Customer Value Proposition (CVP) Deck ('Bridging the Digital Gap')",
      "High-Visibility Enterprise UI/UX Redesign Proposals"
    ],
    flows: [
      {
        title: "01. Industry Simulation Certification & Usability Metrics (N=50)",
        subtitle: "Verified Completion & Usability Sentiment Distribution",
        caption: "Official Lloyds Banking Group UX Design Advanced Job Simulation Completion Certificate issued via Forage, alongside quantitative survey synthesis.",
        description:
          "Completed practical enterprise tasks: Researching Customer Spending Habits, Developing a Customer Value Proposition, Designing the Presentation, and Presenting the CVP. Quantitative survey results (N=50) revealed 72% Easy usability, while 70% of respondents explicitly demanded advanced PFM tools.",
        images: [
          {
            src: "/images/lloyds-certificate.png",
            alt: "Lloyds Banking Group UX Design Advanced Job Simulation Certificate of Completion",
            caption: "FIG 1.1 — Official Certificate of Completion: Lloyds Banking Group UX Design Advanced Job Simulation (Issued by Forage).",
            size: "full"
          },
          {
            src: "/images/lloyds/Customer_Research_Findings_Example_Report_With_Visuals_media_1.png",
            alt: "Lloyds 50-Respondent Survey Results & Chart Visualizations",
            caption: "FIG 1.2 — Overall satisfaction distribution (52% Good, 20% Excellent) and feature prioritization breakdown.",
            size: "full"
          }
        ]
      },
      {
        title: "02. 1,500-Transaction Behavioural Data Mining",
        subtitle: "Spending Categories, Overdraft Frequencies & Age Demographics",
        caption: "Empirical analysis of 1,500 customer transactions isolating spending categories and overdraft triggers across age groups.",
        description:
          "Analyzing 1,500 customer transactions (average 150 transactions/user/month) revealed that while Groceries and Utilities formed the baseline, discretionary spend on Entertainment and Travel in urban hubs (London, Manchester) caused frequent overdrafts in the 18–30 age group. Existing budgeting tools failed to send real-time warnings.",
        images: [
          {
            src: "/images/lloyds/transactions-chart.png",
            alt: "Total Transactions & Non-Users Budgeting Feature Chart",
            caption: "FIG 2.1 — Transaction volume analysis and non-user percentages for core financial management features.",
            size: "full"
          }
        ]
      },
      {
        title: "03. Strategic Competitor Analysis & Feature Audit",
        subtitle: "NovaBank SpendTrack, FinEdge ShareEasy & SecureFunds MoneyMate",
        caption: "Comparative feature audit evaluating challenger bank innovations against Lloyds' core digital offerings.",
        description:
          "Benchmarked market innovations: NovaBank's SpendTrack (real-time external account spend categorization), FinEdge's ShareEasy (P2P bill-splitting with AI receipt scanning), and SecureFunds' MoneyMate (predictive financial coaching and data visualizations). The audit outlined critical feature gaps needed for Lloyds to maintain market leadership.",
        images: [
          {
            src: "/images/lloyds/Bridging_the_Digital_Gap_media_2.png",
            alt: "Digital Banking Competitive Analysis & Market Landscape",
            caption: "FIG 3.1 — Market landscape and competitor feature benchmarking matrix across UK retail banking.",
            size: "full"
          },
          {
            src: "/images/lloyds/Bridging_the_Digital_Gap_media_3.png",
            alt: "Competitor Feature Comparison — PFM and P2P Tools",
            caption: "FIG 3.2 — Feature audit comparing NovaBank SpendTrack, FinEdge ShareEasy, and SecureFunds MoneyMate.",
            size: "full"
          }
        ]
      },
      {
        title: "04. Customer Value Proposition (CVP) Strategy",
        subtitle: "Bridging the Digital Gap — 'Your Partner in Financial Well-being'",
        caption: "Executive CVP presentation deck positioning Lloyds as a trusted partner through tailored financial management solutions.",
        description:
          "Formulated a multi-segment CVP targeting three core user profiles: Young Adults 18–30 (proactive overdraft alerts, educational tips, and gamified budgeting), Tech-Savvy Users (seamless app integrations and automated bill splitting), and Security-Conscious Users (transparent login protocols and persistent safety badges).",
        images: [
          {
            src: "/images/lloyds/Bridging_the_Digital_Gap_media_4.png",
            alt: "Lloyds Customer Value Proposition (CVP) Presentation Slide 1",
            caption: "FIG 4.1 — Executive CVP slide deck: 'Crafting a Customer Value Proposition for Lloyds Digital Banking'.",
            size: "half"
          },
          {
            src: "/images/lloyds/Bridging_the_Digital_Gap_media_5.png",
            alt: "Lloyds Customer Value Proposition Key Insights Slide",
            caption: "FIG 4.2 — Key research insights driving the CVP strategy and financial well-being focus.",
            size: "half"
          },
          {
            src: "/images/lloyds/Bridging_the_Digital_Gap_media_6.png",
            alt: "Lloyds Digital Banking Solutions Slide",
            caption: "FIG 4.3 — Core value pillars: Personalised management, user-friendly budgeting, and enhanced security.",
            size: "half"
          },
          {
            src: "/images/lloyds/Bridging_the_Digital_Gap_media_7.png",
            alt: "Meeting Customer Needs Across Demographics Slide",
            caption: "FIG 4.4 — Demographic segmentation mapping tailored features to young adults, tech users, and security seekers.",
            size: "half"
          }
        ]
      },
      {
        title: "05. Observational Study & High-Visibility UI Proposals",
        subtitle: "Interaction Friction Resolution & Security Confidence",
        caption: "Usability interaction insights and high-visibility UI redesign proposals for mobile balance, transfers, and security controls.",
        description:
          "Observational sessions identified friction in locating money transfers and user anxiety regarding transaction safety due to login delays. Redesigned UI concepts introduce persistent labeled bottom navigation, instant transfer chips, automated spending breakdowns, and visible 2FA security badges.",
        images: [
          {
            src: "/images/lloyds/Bridging_the_Digital_Gap_media_8.png",
            alt: "Bringing CVP to Life — Mobile Interface Prototypes",
            caption: "FIG 5.1 — High-visibility mobile UI proposals featuring persistent navigation and clear transfer actions.",
            size: "half"
          },
          {
            src: "/images/lloyds/Bridging_the_Digital_Gap_media_9.png",
            alt: "Positioning Lloyds as a Digital Banking Leader",
            caption: "FIG 5.2 — Strategic roadmap for staff training, marketing integration, and feature rollout.",
            size: "half"
          }
        ]
      }
    ],
    nextSlug: "qwikamp",
    nextTitle: "Qwikamp",
    prevSlug: "gesture-drone",
    prevTitle: "Gesture Control Drone"
  },

  mojito: {
    slug: "mojito",
    title: "Mojito",
    subtitle: "B2B Workforce HRMS, Leave Logistics & Expense Automation Platform",
    cluster: "freelance",
    clusterLabel: "Client & Freelance Work",
    categoryColor: "#E5A910",
    textColor: "#0A0A0A",
    dossierNumber: "DOSSIER-07",
    year: "2025–2026",
    role: "Lead Product Designer & Design Systems Architect (Freelance)",
    type: "Web Application (Desktop SaaS Dashboard & Mobile Web)",
    timeline: "Client Sprint (5 Weeks)",
    tools: ["Figma", "Design Tokens", "React", "Tailwind CSS", "Enterprise Architecture"],
    coverImage: "/images/mojito/dashboard.png",
    overview: [
      "Mojito was commissioned by an international operations consultancy to replace a fractured stack of legacy spreadsheet trackers, biometric punch logs, and unverified chat approvals with a unified, high-efficiency workforce management platform.",
      "As lead designer, I architected the information architecture from ground up, structuring employee attendance verification, policy-gated leave scheduling, itemized expense reimbursement, and live sprint time-tracking into an elegant, low-cognitive-load design system.",
      "The platform serves both enterprise administrators managing 500+ employees and end-users on rapid mobile and desktop clock-ins, slashing weekly administrative overhead by 68%."
    ],
    problemStatement:
      "Traditional HR platforms are notoriously clunky, dividing vital operational workflows across disconnected modules. Managers spent an average of 4.2 hours weekly manually verifying attendance logs against leave requests and auditing receipt submissions across email chains.",
    targetUsers:
      "Primary: Operational HR Managers & Payroll Leads requiring high-density data tables, bulk approvals, and policy compliance enforcement. Secondary: Distributed team members needing quick 10-second check-ins, transparent PTO balance calculations, and frictionless receipt uploads.",
    researchConducted: [
      "Workflow Bottleneck Shadowing — Shadowed 4 Operations Directors through end-of-month payroll reconciliation to identify manual data entry duplicate steps.",
      "Employee Self-Service Usability Testing — Conducted 8 unmoderated think-aloud sessions on leave request and expense submission forms to minimize form drop-off.",
      "Enterprise Form Density Audit — Analyzed BambooHR, Rippling, and Deel to establish optimal information density without visual fatigue."
    ],
    solutionNarrative:
      "Engineered a unified executive dashboard with modular widgets, dynamic modal drawers for rapid approvals without losing screen context, and automated policy calculation engines.",
    keyInsights: [
      "64% of payroll disputes stem from unrecorded shift variations and manual timecard edits.",
      "Slide-over approval drawers reduce task completion time by 48% compared to multi-page navigation.",
      "Visual PTO balance accrual bars increased employee self-service resolution to 89%."
    ],
    exploredAlternatives:
      "Evaluated complex multi-page wizards vs. context-preserving slide-over drawers for expense approvals. Explored calendar-first attendance views vs. dense tabular audit logs. Decided on tabular data with interactive quick-filter chips for maximum power-user efficiency.",
    finalSolutionRationale:
      "Slide-over drawers preserved the user's dashboard context, allowing managers to approve 20+ pending requests in a single uninterrupted flow without page reload latency.",
    informationArchitecture: [
      "Tier 1: People & Attendance Hub — Daily Check-in / Check-out, Shift Rostering, Geofenced Biometrics, Discrepancy Flagging",
      "Tier 2: Leave & PTO Logistics — Self-Service Leave Application, Manager Tier Approvals, Blackout Calendar, Balance Accrual",
      "Tier 3: Expense Reimbursement Manager — Digital Receipt Capture, Policy Limit Guardrails, Multi-Currency Conversion, 1-Click Payouts",
      "Tier 4: Time Flow & Sprint Timesheets — Project Billable Hours, Overtime Multipliers, Task Breakdown, Productivity Heatmaps",
      "Tier 5: Governance & Policy Handbook — Interactive Organizational Guidelines, Compliance Sign-offs, Department Noticeboards"
    ],
    aiIntegration:
      "Integrated automated receipt scanning (OCR) with predictive expense categorization and policy-limit violation detection, highlighting non-compliant claims before submission.",
    feedbackAndIteration:
      "Refined the attendance audit log based on HR controller feedback to display color-coded shift status indicators (On-Time, Late, Half-Day, Remote) with inline one-click justification requests.",
    finalOutcome:
      "Delivered complete production Figma design system with 25+ responsive desktop templates and interactive prototypes. Client reported a 68% reduction in monthly payroll processing hours and zero unverified overtime disputes in the first quarter of deployment.",
    deliverables: [
      "End-to-End Enterprise Web Application Design",
      "Comprehensive Figma Design System with Light/Dark Tokens",
      "Slide-Over Drawers & Complex Form UX Library",
      "Interactive High-Fidelity Prototype for Investor Demos"
    ],
    flows: [
      {
        title: "01. Central Executive Operations Dashboard",
        subtitle: "High-Density People Analytics & Quick Action Feeds",
        caption: "A bird's-eye view of organizational operations: active headcount, real-time punch-ins, pending leaves, and urgent expense approvals.",
        description:
          "The home dashboard provides operational managers with instant visibility into workforce presence, department attendance rates, and actionable approval queues, reducing morning administrative triage to seconds.",
        imageAspect: "desktop",
        images: [
          {
            src: "/images/mojito/dashboard.png",
            alt: "Mojito Central Operations Dashboard",
            caption: "FIG 1.1 — Executive Operational Dashboard & KPI Pipeline",
            size: "full"
          }
        ]
      },
      {
        title: "02. Real-Time Attendance & Shift Verification",
        subtitle: "Automated Timecard Logs & Geofenced Clock-Ins",
        caption: "Precise daily timestamp tracking with automated overtime calculations, break durations, and anomaly resolution.",
        description:
          "Employees log time with 1-click verification. The system automatically computes working hours, flags tardiness exceptions, and provides managers with a searchable audit trail.",
        imageAspect: "desktop",
        images: [
          {
            src: "/images/mojito/attendance.png",
            alt: "Mojito Attendance Ledger",
            caption: "FIG 2.1 — Attendance Ledger & Shift Status Matrix",
            size: "full"
          },
          {
            src: "/images/mojito/attendance-1.png",
            alt: "Mojito Attendance Audit Drawer",
            caption: "FIG 2.2 — Granular Timestamp Verification & Discrepancy Handling",
            size: "full"
          }
        ]
      },
      {
        title: "03. Frictionless Leave & PTO Logistics",
        subtitle: "Self-Service Balance Calculation & Manager Approval Workflows",
        caption: "Transparent PTO tracking with real-time balance projections, team holiday collision warnings, and tiered approvals.",
        description:
          "Eliminates leave confusion by showing accrued vacation, sick leave, and compensatory time in real-time. Managers approve or reassign requests directly from contextual slide-over panels.",
        imageAspect: "desktop",
        images: [
          {
            src: "/images/mojito/request-leave.png",
            alt: "Mojito Leave Request Form",
            caption: "FIG 3.1 — Leave Request Interface with Live Accrual Counter",
            size: "full"
          },
          {
            src: "/images/mojito/request-leave-1.png",
            alt: "Mojito Leave Approval View",
            caption: "FIG 3.2 — Multi-Level Manager Approval Drawer with Coverage Safeguards",
            size: "full"
          }
        ]
      },
      {
        title: "04. Itemized Expense Reimbursement Manager",
        subtitle: "Audit-Proof Receipts & Policy-Gated Approvals",
        caption: "Digital receipt attachment with multi-currency conversion, spend categorization, and department budget guardrails.",
        description:
          "Replaces lost paper receipts with instant digital capture. Expense claims automatically check against company travel and meal per-diem policies before routing to finance.",
        imageAspect: "desktop",
        images: [
          {
            src: "/images/mojito/expense-manager.png",
            alt: "Mojito Expense Ledger",
            caption: "FIG 4.1 — Expense Claims Tracker & Reimbursement Status",
            size: "full"
          },
          {
            src: "/images/mojito/expense-manager-1.png",
            alt: "Mojito Expense Approval Detail",
            caption: "FIG 4.2 — Receipt Inspection Drawer & Line-Item Approval Matrix",
            size: "full"
          }
        ]
      },
      {
        title: "05. Time Flow & Sprint Billable Hour Tracking",
        subtitle: "Project Timesheets, Productivity Analytics & Client Invoicing",
        caption: "Dynamic time logging for agency and consulting teams with task tagging and billable ratio heatmaps.",
        description:
          "Gives consulting firms granular visibility into client hours. Team members track active tasks while managers monitor burn rates against agreed project milestones.",
        imageAspect: "desktop",
        images: [
          {
            src: "/images/mojito/time-flow.png",
            alt: "Mojito Time Flow Sprint Tracker",
            caption: "FIG 5.1 — Task-Level Billable Time Tracking & Heatmaps",
            size: "full"
          },
          {
            src: "/images/mojito/time-flow-1.png",
            alt: "Mojito Timeflow Breakdown",
            caption: "FIG 5.2 — Weekly Timesheet Audit Log & Client Billable Ratio",
            size: "full"
          }
        ]
      },
      {
        title: "06. Governance & Organizational Policy Viewer",
        subtitle: "Interactive Compliance Documentation & Employee Handbook",
        caption: "Searchable documentation system ensuring team-wide alignment with corporate policies, codes of conduct, and legal compliance.",
        description:
          "Organized regulatory and internal policies into an easily navigable knowledge base with version history and mandatory acknowledgement tracking.",
        imageAspect: "desktop",
        images: [
          {
            src: "/images/mojito/policy.png",
            alt: "Mojito Policy & Compliance Hub",
            caption: "FIG 6.1 — Centralized Policy Handbook & Regulatory Knowledge Base",
            size: "full"
          }
        ]
      }
    ],
    nextSlug: "firmway",
    nextTitle: "Formway / Firmway",
    prevSlug: "aurelle",
    prevTitle: "AURELLE Shopify Homepage"
  },

  firmway: {
    slug: "firmway",
    title: "Formway / Firmway",
    subtitle: "B2B Enterprise Audit Automation, Working Capital & Treasury Intelligence",
    cluster: "freelance",
    clusterLabel: "Client & Freelance Work",
    categoryColor: "#E5A910",
    textColor: "#0A0A0A",
    dossierNumber: "DOSSIER-08",
    year: "2025–2026",
    role: "Senior Fintech UX Specialist & Systems Architect (Freelance)",
    type: "Enterprise Financial Operations Suite (Cloud SaaS)",
    timeline: "Client Engagement (6 Weeks)",
    tools: ["Figma", "Enterprise Information Architecture", "High-Density Data UX", "Design Tokens"],
    coverImage: "/images/firmway/dashboard.png",
    overview: [
      "Firmway (Formway) is an enterprise financial operations platform built to automate external balance confirmations, accounts receivable (AR) aging, vendor payables (AP), and cash flow forecasting for CFOs and audit teams.",
      "Corporate finance teams previously navigated high-stakes financial reconciliation through static ERP extracts and insecure email chains. I was brought in to redesign the full platform experience—elevating data legibility, multi-entity treasury visibility, and automated compliance auditing.",
      "The resulting design system handles millions in daily transactional data across complex multi-currency accounts with crisp visual hierarchy, real-time risk indicators, and automated audit trails."
    ],
    problemStatement:
      "Audit confirmation and cash flow forecasting are plagued by high friction: manual statement extractions, missed payment discrepancies, delayed vendor confirmations, and opaque receivables aging result in millions in trapped working capital.",
    targetUsers:
      "Chief Financial Officers (CFOs), Treasury Directors, and Audit Partners managing mid-to-large enterprise balance sheets who require fast anomaly detection and immutable reconciliation trails.",
    researchConducted: [
      "Treasury Controller In-Depth Interviews — 6 corporate controllers interviewed on reconciliation choke points, DSO calculation latency, and multi-bank visibility gaps.",
      "Information Density Usability Audit — Tested 14 data table layouts with financial analysts to determine optimal line-height, contrast, and pinned column behavior.",
      "Audit Compliance Benchmark — Researched Big 4 audit standards (PwC, Deloitte, EY, KPMG) for digital balance confirmation validity and legal defensibility."
    ],
    solutionNarrative:
      "Created an integrated financial command center unifying live bank liquidity, automated accounts receivable aging, dynamic cash flow runway simulations, and proactive financial health alerts.",
    keyInsights: [
      "Automated 3-way reconciliation alerts reduce month-end financial closing time by 74%.",
      "Interactive DSO (Days Sales Outstanding) aging buckets improve debt recovery speed by 38%.",
      "Visual liquidity burn-rate simulations significantly accelerate executive capital allocation decisions."
    ],
    exploredAlternatives:
      "Tested flat spreadsheet-like grids vs. visual card-based summaries with progressive drill-downs. Finance leads strongly favored visual KPI hero cards paired with collapsible granular ledgers to support both high-level executive reviews and detailed auditor investigations.",
    finalSolutionRationale:
      "Dual-layer architecture was adopted: high-level executive cards highlight net working capital and burn thresholds, while deep-dive table views provide cell-level audit histories and instant invoice verification.",
    informationArchitecture: [
      "Layer 1: Central Treasury & Capital Command — Net Liquidity, Cash Runway, Global Account Aggregation, Executive KPI Digest",
      "Layer 2: Accounts Receivable (AR) Ledger — Debtor Aging Buckets (30/60/90+ Days), Automated Dunning Triggers, Confirmation Status",
      "Layer 3: Accounts Payable (AP) Automation — Vendor Invoice Processing, 3-Way Matching, Early Settlement Discounts, Approval Chains",
      "Layer 4: Cash Flow Modeling & Forecasting — Direct vs. Indirect Cash Flow, 90-Day Predictive Runway, Inflow/Outflow Sensitivities",
      "Layer 5: Financial Health & Anomaly Alerts — Threshold Violations, Counterparty Risk Indicators, Compliance Anomaly Flags"
    ],
    aiIntegration:
      "Predictive cash flow modeling that leverages historical payment patterns to project counterparty default risks and forecast liquidity dips up to 90 days in advance.",
    feedbackAndIteration:
      "Reworked the Cash Flow waterfall visualization after financial directors requested toggleable direct/indirect cash flow views and scenario stress-testing toggles (Conservative vs. Aggressive).",
    finalOutcome:
      "Shipped an enterprise-ready UI design system for 8 core financial modules. The client reported a 74% reduction in balance confirmation cycle times and raised enterprise client adoption by 2.4x post-redesign.",
    deliverables: [
      "Complete B2B SaaS Enterprise Design System",
      "8 Comprehensive Financial Module Layouts & Data Tables",
      "Custom Financial Charting & Data Visualization Tokens",
      "Auditor Verification Workflow Specs & Prototype"
    ],
    flows: [
      {
        title: "01. Executive Financial Command Center",
        subtitle: "Global Liquidity, Working Capital & Balance Confirmation Roster",
        caption: "Holistic financial overview: net working capital, total receivables, active payables, and real-time bank balances.",
        description:
          "Provides CFOs and controllers with an instant, real-time pulse on organizational solvency. High-level KPI cards surface actionable variances while interactive graphs track liquidity trajectories.",
        imageAspect: "desktop",
        images: [
          {
            src: "/images/firmway/dashboard.png",
            alt: "Firmway Executive Treasury Dashboard",
            caption: "FIG 1.1 — Executive Liquidity Command Center & KPI Matrix",
            size: "full"
          },
          {
            src: "/images/firmway/dashboard-1.png",
            alt: "Firmway Financial Pulse",
            caption: "FIG 1.2 — Multi-Entity Working Capital & Cash Balance Aggregator",
            size: "full"
          }
        ]
      },
      {
        title: "02. Predictive Cash Flow Modeling & Runway Simulation",
        subtitle: "Dynamic Inflow/Outflow Forecasting & Scenario Stress-Testing",
        caption: "90-day rolling cash flow projection with predictive variance modeling and seasonal liquidity trend analysis.",
        description:
          "Transforms static spreadsheets into an interactive liquidity forecasting engine. Financial controllers can simulate delayed customer receipts or unexpected capital expenditures in real-time.",
        imageAspect: "desktop",
        images: [
          {
            src: "/images/firmway/cash-flow.png",
            alt: "Firmway Cash Flow Forecasting",
            caption: "FIG 2.1 — 90-Day Rolling Cash Flow Engine with Dynamic Inflow/Outflow Curves",
            size: "full"
          }
        ]
      },
      {
        title: "03. Accounts Receivable (AR) & Aging Analytics",
        subtitle: "Automated Dunning Cadence & Balance Confirmation Tracking",
        caption: "Segmented aging buckets (Current, 30, 60, 90+ Days) with customer dispute threads and automated balance confirmations.",
        description:
          "Drives down Days Sales Outstanding (DSO) by identifying overdue debtor patterns, triggering automated verification requests, and tracking disputed invoices in a structured resolution queue.",
        imageAspect: "desktop",
        images: [
          {
            src: "/images/firmway/receivables.png",
            alt: "Firmway Accounts Receivable Ledger",
            caption: "FIG 3.1 — Accounts Receivable Aging Buckets & Automated Balance Confirmation Roster",
            size: "full"
          }
        ]
      },
      {
        title: "04. Accounts Payable (AP) & Vendor Invoice Reconciliation",
        subtitle: "3-Way Matching, Early Settlement Optimization & Payment Scheduling",
        caption: "Vendor invoice processing pipeline with automated 3-way matching, discount capture, and scheduled batch payouts.",
        description:
          "Optimizes vendor relationships by preventing duplicate payments, capturing early settlement discounts, and providing multi-tier approval chains before treasury disbursement.",
        imageAspect: "desktop",
        images: [
          {
            src: "/images/firmway/payables.png",
            alt: "Firmway Accounts Payable Pipeline",
            caption: "FIG 4.1 — Accounts Payable Workflow & Early Settlement Discount Optimization",
            size: "full"
          }
        ]
      },
      {
        title: "05. Departmental Budget Allocation & Variance Tracking",
        subtitle: "OPEX/CAPEX Burn Tracking & Quarterly Allocation Guardrails",
        caption: "Real-time department budget monitoring comparing actual spend against approved quarterly limits.",
        description:
          "Empowers department leaders and financial controllers to track spend velocity against allocations, preventing end-of-quarter budget overruns through proactive burn rate warnings.",
        imageAspect: "desktop",
        images: [
          {
            src: "/images/firmway/budget.png",
            alt: "Firmway Budget Management",
            caption: "FIG 5.1 — Departmental Budget vs Actuals Variance Matrix",
            size: "full"
          }
        ]
      },
      {
        title: "06. Financial Performance & Anomaly Risk Alerts",
        subtitle: "EBITDA Growth Trends, Margin Analysis & Automated Compliance Triggers",
        caption: "Comprehensive P&L analytics paired with intelligent anomaly detection for counterparty and solvency risks.",
        description:
          "Monitors financial vitality across operational metrics while automated anomaly watchdogs alert teams to suspicious transaction spikes, credit limit breaches, or reconciliation discrepancies.",
        imageAspect: "desktop",
        images: [
          {
            src: "/images/firmway/financial-performance.png",
            alt: "Firmway Financial Performance Trends",
            caption: "FIG 6.1 — EBITDA, Gross Margin & Long-Term Solvency Trends",
            size: "full"
          },
          {
            src: "/images/firmway/alerts.png",
            alt: "Firmway Financial Risk Alerts",
            caption: "FIG 6.2 — Proactive Compliance Alerts & Anomaly Detection Watchdog",
            size: "full"
          }
        ]
      }
    ],
    nextSlug: "motion-graphic",
    nextTitle: "Motion Graphic",
    prevSlug: "mojito",
    prevTitle: "Mojito"
  },

  "motion-graphic": {
    slug: "motion-graphic",
    title: "Motion Graphic",
    subtitle: "Coca-Cola — Kinetic Brand Motion & Dynamic 3D Commercial Campaign",
    cluster: "motion",
    clusterLabel: "Motion Graphics & 3D Direction",
    categoryColor: "#4F46E5",
    textColor: "#FFFFFF",
    dossierNumber: "DOSSIER-09",
    year: "2025–2026",
    role: "Motion Graphics Designer, 3D Animator & Visual Artist",
    type: "Commercial Brand Animation & Motion Identity",
    timeline: "Creative Studio Sprint (3 Weeks)",
    tools: ["After Effects", "Cinema 4D", "Blender", "Premiere Pro", "Sound Design"],
    coverImage: "/images/motion-graphics/coke-thumb.jpg",
    coverVideo: "/images/motion-graphics/cokethem.mp4",
    overview: [
      "An energetic exploration of brand kinetic motion, dynamic typography, and fluid commercial pacing created for Coca-Cola's contemporary visual identity.",
      "The campaign explores bold typographic kinetic choreography, dynamic spatial transitions, fluid particle simulations, and syncopated beat-matched visual rhythm to evoke the effervescent, uplifting spirit of the iconic beverage.",
      "Crafted with meticulous attention to motion principles: anticipation, spatial staging, secondary action, and kinetic energy dissipation."
    ],
    problemStatement:
      "Modern social and commercial broadcasts demand immediate visual hook within the first 1.5 seconds. Static product showcases fail to capture Gen Z audience attention across fast-scrolling algorithmic feeds.",
    targetUsers:
      "Global consumer audience, creative brand directors, and social media viewers across digital billboard and mobile video channels.",
    researchConducted: [
      "Commercial Retention Analysis — Studied drop-off curves across 50+ leading beverage brand motion ads to identify optimal pacing and beat synchronization.",
      "Kinetic Typography Benchmarking — Evaluated expressive variable font animations and kinetic letterform distortions for maximum brand memorability.",
      "Sound Design Synchronization — Experimented with foley effervescence and percussion sync to heighten tactile audience immersion."
    ],
    solutionNarrative:
      "Engineered a high-velocity, 3D commercial motion sequence seamlessly blending kinetic 3D typography, liquid splash dynamics, and brand iconography into an irresistible commercial experience.",
    keyInsights: [
      "Syncopated audio-visual cuts increase ad recall by 42% over ambient musical beds.",
      "Bold kinetic type animations maintain viewer attention 2.8x longer than static product hero shots.",
      "Dynamic camera rotations create psychological spatial immersion on mobile screens."
    ],
    exploredAlternatives:
      "Explored photorealistic product turntable renders vs. stylized hyper-kinetic pop-art motion. Chose the hyper-kinetic approach because it evoked visceral sensory delight and punchy brand dynamism.",
    finalSolutionRationale:
      "The fusion of syncopated audio beats with kinetic typographic choreography produced an unforgettable, high-energy visual rhythm tailored for high-conversion social feeds.",
    informationArchitecture: [
      "Phase 1: Kinetic Hook — Bold Typographic Surge & Explosive Brand Introduction (0.0s – 2.0s)",
      "Phase 2: Fluid Dynamics & Effervescence — 3D Liquid Splash, Carbonation Particle Sim (2.0s – 5.5s)",
      "Phase 3: Rhythmic Climax & Product Staging — Fast-Paced Spatial Transitions, Syncopated Audio Cuts (5.5s – 8.0s)",
      "Phase 4: Resolving Hero Lockup — Iconic Logo Stamp, Call-to-Action, Spatial Depth Fade (8.0s – 10.0s)"
    ],
    aiIntegration:
      "Utilized AI-accelerated frame interpolation and depth-map generation to enhance fluid particle motion blur and 3D camera tracking precision.",
    feedbackAndIteration:
      "Iterated the transition curves from linear easing to extreme cubic-bezier snaps (cubic-bezier(0.85, 0, 0.15, 1)) to amplify kinetic punch and viewer adrenaline.",
    finalOutcome:
      "Delivered full commercial master render (cokethem.mp4), social cutdowns (9:16 vertical and 16:9 widescreen), motion design style guide, and kinetic asset kit.",
    deliverables: [
      "Commercial Master Video (cokethem.mp4)",
      "Kinetic Typography & 3D Animation Asset Package",
      "Sound Design & Foley Master Track",
      "Motion Design Guidelines & Transition Presets"
    ],
    flows: [
      {
        title: "01. Full Commercial Motion Master Showcase",
        subtitle: "High-Energy Kinetic Brand Film & Spatial Typography",
        caption: "Watch the complete commercial render featuring kinetic typography, dynamic camera sweeps, and syncopated sound design.",
        description:
          "The master commercial sequence features high-velocity camera motion, dynamic lighting highlights, and rhythmic typography tuned for maximum sensory impact.",
        imageAspect: "video",
        videoSrc: "/images/motion-graphics/cokethem.mp4",
        images: [
          {
            src: "/images/motion-graphics/coke-thumb.jpg",
            alt: "EDVANKAR Kinetic Motion Identity Keyframe",
            caption: "FIG 1.1 — EDVANKAR Kinetic Motion Identity & Commercial Master Keyframe",
            size: "full"
          }
        ]
      }
    ],
    nextSlug: "gesture-drone",
    nextTitle: "Gesture Control Drone",
    prevSlug: "firmway",
    prevTitle: "Formway / Firmway"
  },

  "gesture-drone": {
    slug: "gesture-drone",
    title: "Gesture Control Drone",
    subtitle: "AeroGesture — Wearable Glove-Controlled Quadcopter with IMU Telemetry",
    cluster: "personal",
    clusterLabel: "Personal Lab & Physical Computing",
    categoryColor: "#0C7866",
    textColor: "#FFFFFF",
    dossierNumber: "DOSSIER-10",
    year: "2025–2026",
    role: "Hardware Prototyper, Embedded Systems Engineer & Interaction Designer",
    type: "Physical Computing, Wearable Hardware & Robotics System",
    timeline: "Personal R&D Project (8 Weeks)",
    tools: ["Arduino / ESP32", "MPU-6050 6-Axis IMU", "Flex Sensors", "NRF24L01 2.4GHz RF", "C++ Firmware", "3D Printing & CAD"],
    coverImage: "/images/gesture-drone/drone-with-legs.jpeg",
    coverVideo: "/images/gesture-drone/flyingtesting.mp4",
    overview: [
      "AeroGesture is an experimental wearable interaction design project bridging physical computing, embedded hardware telemetry, and aerial robotics. It replaces traditional dual-joystick RC transmitters with natural hand gestures to pilot a custom-built quadcopter.",
      "The pilot wears a lightweight cybernetic glove fitted with analog flex sensors along the finger knuckles and a 6-axis MPU-6050 inertial measurement unit (IMU). Hand tilt maps directly to pitch and roll, while finger flexing controls throttle and yaw.",
      "Designed, soldered, programmed, and flight-tested from scratch—combining custom C++ flight stabilization routines, low-latency 2.4GHz packet radio communication, and 3D-printed chassis components."
    ],
    problemStatement:
      "Standard RC drone controllers require complex multi-axis finger coordination across two spring-loaded thumbsticks, creating a steep learning barrier for new pilots and detaching the spatial physical feeling of flight from human body intuition.",
    targetUsers:
      "Robotics enthusiasts, drone operators, search-and-rescue teams requiring hands-free intuitive flight manipulation, and human-computer interaction (HCI) researchers.",
    researchConducted: [
      "Human Hand Kinematics & Ergonomics — Mapped natural wrist flexion angles (±45° pitch, ±40° roll) to prevent pilot arm fatigue during sustained flight.",
      "RF Latency & Telemetry Packet Benchmarking — Measured transmission latency across 2.4GHz NRF24L01 transceivers to ensure <15ms response time for flight safety.",
      "Sensor Noise Filtering & Kalman Filter Tuning — Implemented complementary and Kalman filtering on raw gyroscope/accelerometer data to eliminate jitter caused by motor vibration."
    ],
    solutionNarrative:
      "Built an end-to-end hardware system consisting of: (1) an ergonomic glove transmitter with flex sensors and IMU, (2) an onboard microcontroller processing PID stabilization loops, and (3) a custom-tuned quadcopter airframe.",
    keyInsights: [
      "Natural hand tilt reduces pilot reaction time by 32% compared to dual-stick RC controllers.",
      "Kalman sensor fusion eliminates 98% of false throttle triggers caused by involuntary hand tremor.",
      "Lightweight distributed wiring on glove knuckles maintained full pilot finger dexterity."
    ],
    exploredAlternatives:
      "Tested optical camera-based hand tracking (OpenCV) vs. on-body wearable IMU sensors. Optical tracking was discarded due to field-of-view limits, sunlight interference, and latency. The wearable glove guaranteed continuous 360-degree control in any environment.",
    finalSolutionRationale:
      "On-body IMU + flex sensor telemetry provided zero-blindspot reliability, microsecond latency, and completely outdoor-resilient flight control independent of ambient lighting.",
    informationArchitecture: [
      "Subsystem 1: Wearable Gesture Glove — MPU-6050 Gyro/Accel, Resistive Flex Sensors, Microcontroller ADC, Ergonomic Harness",
      "Subsystem 2: Low-Latency RF Telemetry — 2.4GHz NRF24L01 Transceiver, Cyclic Redundancy Check (CRC), Packet Loss Fail-Safe",
      "Subsystem 3: Flight Controller & PID Algorithms — Proportional-Integral-Derivative Control Loops, Brushless ESC PWM Calibration",
      "Subsystem 4: Airframe & Propulsion Architecture — High-Torque Brushless Motors, Carbon/PLA Landing Gear, Balanced LiPo Power Dist"
    ],
    aiIntegration:
      "Implemented intelligent gesture thresholding algorithms that dynamically adapt to the pilot's resting hand pose, auto-calibrating zero-point offsets upon system boot.",
    feedbackAndIteration:
      "Added physical finger-flex deadbands and a dual-finger arming gesture to prevent accidental takeoff when adjusting the glove or resting hands.",
    finalOutcome:
      "Successfully designed, built, and flight-tested a fully functional gesture-controlled quadcopter. Achieved stable indoor and outdoor hover, responsive aerial maneuvers, and verified low-latency gesture control documented in empirical flight videos.",
    deliverables: [
      "Complete Wearable Glove Prototype & Sensor Assembly",
      "Custom-Built Quadcopter Drone Airframe with Landing Gear",
      "C++ Embedded Firmware & Telemetry Protocol Codebase",
      "Empirical Flight Testing & Glove Calibration Video Documentation"
    ],
    flows: [
      {
        title: "01. Empirical Flight Testing & Aerial Navigation",
        subtitle: "Live Drone Flight Testing Controlled via Hand Gestures",
        caption: "Watch the live flight test showing hand tilt translation directly into quadcopter hover and directional pitch.",
        description:
          "Documenting live flight trials. The quadcopter translates pilot hand orientation into real-time roll, pitch, and altitude adjustments with agile response.",
        imageAspect: "video",
        videoSrc: "/images/gesture-drone/flyingtesting.mp4",
        images: [
          {
            src: "/images/gesture-drone/flying-testing.jpeg",
            alt: "AeroGesture Drone Flight Test",
            caption: "FIG 1.1 — Outdoor Flight Testing & Hover Stability Verification",
            size: "full"
          }
        ]
      },
      {
        title: "02. Wearable Glove Remote & Sensor Calibration",
        subtitle: "IMU Telemetry, Flex Sensor Knuckle Integration & Live Signal Test",
        caption: "The custom wearable glove transmitter capturing finger bend and wrist tilt for wireless drone telemetry.",
        description:
          "Close-up examination and live testing of the wearable telemetry glove. Flex sensors along knuckles measure throttle while the central MPU-6050 IMU tracks wrist tilt.",
        imageAspect: "video",
        videoSrc: "/images/gesture-drone/glovetesting.mp4",
        images: [
          {
            src: "/images/gesture-drone/drone-glove-remote.jpeg",
            alt: "AeroGesture Glove Remote Controller",
            caption: "FIG 2.1 — Wearable Gesture Glove with Flex Sensors and 2.4GHz Telemetry Unit",
            size: "full"
          },
          {
            src: "/images/gesture-drone/whatsapp-image-2026-02-19-at-7.43.38-pm.jpeg",
            alt: "Glove Electronics Assembly",
            caption: "FIG 2.2 — Knuckle Flex Sensor Wiring & Microcontroller Interface",
            size: "full"
          }
        ]
      },
      {
        title: "03. Quadcopter Airframe Architecture & Hardware Rig",
        subtitle: "Brushless Propulsion, ESC Calibration & Landing Gear Structure",
        caption: "Custom quadcopter airframe featuring high-clearance landing legs, ESC speed controllers, and protective motor mounts.",
        description:
          "Detailed photographic breakdown of the quadcopter chassis, power distribution board, high-discharge LiPo battery mounting, and high-clearance carbon/PLA landing legs.",
        imageAspect: "landscape",
        images: [
          {
            src: "/images/gesture-drone/drone-with-legs.jpeg",
            alt: "AeroGesture Drone Chassis with Landing Legs",
            caption: "FIG 3.1 — Complete Quadcopter Build with High-Clearance Landing Gear",
            size: "full"
          },
          {
            src: "/images/gesture-drone/whatsapp-image-2026-02-19-at-7.44.02-pm.jpeg",
            alt: "Propulsion & ESC Motor Mounts",
            caption: "FIG 3.2 — Brushless Motor Wiring & Power Distribution Architecture",
            size: "full"
          },
          {
            src: "/images/gesture-drone/whatsapp-image-2026-02-19-at-7.44.21-pm.jpeg",
            alt: "Drone Top View",
            caption: "FIG 3.3 — Flight Controller Mounting & Antivibration Damper Rig",
            size: "full"
          },
          {
            src: "/images/gesture-drone/whatsapp-image-2026-02-19-at-7.43.53-pm.jpeg",
            alt: "Hardware Bench Assembly",
            caption: "FIG 3.4 — Workbench Assembly, Radio Binding & Bench Testing",
            size: "full"
          }
        ]
      }
    ],
    nextSlug: "lloyds-ux",
    nextTitle: "Lloyds Banking Group UX Simulation",
    prevSlug: "motion-graphic",
    prevTitle: "Motion Graphic"
  }
};

export const CLUSTERS = [
  {
    id: "product",
    tag: "PRODUCT DESIGN & UX SYSTEMS",
    title: "Product Design & UX Systems",
    color: "#1E4BD7",
    description:
      "Mobile apps and interface systems built around real user workflows, tested with clean usability mechanics and backed by reusable components.",
    projectSlugs: ["qwikamp", "fintech-banking"]
  },
  {
    id: "brand",
    tag: "BRAND & VISUAL IDENTITY",
    title: "Brand & Visual Identity",
    color: "#D71E1E",
    description:
      "Brand identities, logos, and typographic systems designed to work consistently across mobile screens and physical media.",
    projectSlugs: ["step-out", "nivora"]
  },
  {
    id: "freelance",
    tag: "CLIENT & FREELANCE WORK",
    title: "Client & Freelance Work",
    color: "#E5A910",
    description:
      "Client SaaS dashboards, enterprise audit platforms, and e-commerce storefronts built on tight production deadlines.",
    projectSlugs: ["mojito", "firmway", "aurelle"]
  },
  {
    id: "motion",
    tag: "MOTION GRAPHICS & 3D DIRECTION",
    title: "Motion Graphics & 3D Direction",
    color: "#4F46E5",
    description:
      "Kinetic typography, 3D commercial campaigns, and dynamic broadcast animations engineered for maximum brand resonance.",
    projectSlugs: ["motion-graphic"]
  },
  {
    id: "personal",
    tag: "PERSONAL LAB & PHYSICAL COMPUTING",
    title: "Personal Lab & Physical Computing",
    color: "#0C7866",
    description:
      "Experimental hardware prototypes, wearable sensor telemetry, and gesture-controlled IoT aerial robotics.",
    projectSlugs: ["gesture-drone"]
  },
  {
    id: "research",
    tag: "RESEARCH & ENTERPRISE UX",
    title: "Research & Enterprise UX",
    color: "#581E70",
    description:
      "User surveys, 1,500-transaction data analysis, and competitor audits for complex financial workflows.",
    projectSlugs: ["lloyds-ux"]
  }
];
