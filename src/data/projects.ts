export interface FlowSection {
  title: string;
  subtitle: string;
  caption: string;
  description: string;
  imageAspect?: string;
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
  cluster: "product" | "brand" | "freelance" | "research";
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
  overview: string[];
  problemStatement: string;
  solutionNarrative: string;
  keyInsights: string[];
  flows: FlowSection[];
  deliverables: string[];
  nextSlug?: string;
  nextTitle?: string;
  prevSlug?: string;
  prevTitle?: string;
}

export const CATEGORY_COLORS = {
  product: "#2E5EFF",   // Blue
  brand: "#E63946",     // Red
  freelance: "#F4C430", // Yellow
  research: "#7B2CBF",  // Purple
};

export const PROJECTS_DATA: Record<string, CaseStudy> = {
  qwikamp: {
    slug: "qwikamp",
    title: "Qwikamp",
    subtitle: "Doorstep Bicycle Servicing & Retail Mobile Application",
    cluster: "product",
    clusterLabel: "Product Design & UX Systems",
    categoryColor: "#2E5EFF",
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
    solutionNarrative:
      "We engineered a direct-to-doorstep service dispatch app with upfront itemized pricing, custom virtual garage profiles for tracking bike wear-and-tear, and live GPS mechanic tracking.",
    keyInsights: [
      "78% of urban cyclists delay maintenance due to transport inconvenience.",
      "Visual diagnostic checklists build 3x higher trust than verbal estimates.",
      "Component compatibility checkers reduce accidental parts ordering errors by 92%."
    ],
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
    subtitle: "Next-Generation Wealth & Retail Banking Dashboard",
    cluster: "product",
    clusterLabel: "Product Design & UX Systems",
    categoryColor: "#2E5EFF",
    dossierNumber: "DOSSIER-02",
    year: "2025",
    role: "Product Designer & UX Architect",
    type: "Mobile Financial App & Web Dashboard",
    timeline: "Late 2025 (5 Weeks)",
    tools: ["Figma", "React", "Design Systems", "Framer Motion"],
    coverImage: "/images/fintech.png",
    overview: [
      "Traditional banking interfaces suffer from clutter, obfuscated fees, and rigid account hierarchies that fail to resonate with modern digital investors. This project reimagined daily retail banking around cognitive clarity and active wealth generation.",
      "By conducting task-analysis sessions across 25 young professionals, I developed a unified financial workspace that synthesizes checking balances, automated investment vaults, and multi-currency transfers into a calm, high-contrast dashboard.",
      "The design architecture prioritizes speed of comprehension—enabling users to evaluate their net financial trajectory within 3 seconds of unlocking the app."
    ],
    problemStatement:
      "Users feel overwhelmed by fragmented banking dashboards that separate daily expenses from long-term investments, leading to financial anxiety and poor money management habits.",
    solutionNarrative:
      "A consolidated financial operating system featuring customizable smart vaults, instant round-up savings, and micro-analytics that translate dense transaction ledgers into human-readable insights.",
    keyInsights: [
      "Contextual visual groupings reduce transaction lookup time by 64%.",
      "Micro-animations on savings milestones increase automated vault retention by 41%.",
      "Single-tap biometric security sign-offs drastically improve high-value transfer completion rates."
    ],
    deliverables: [
      "Mobile iOS Banking App Suite",
      "Web Portfolio Management Dashboard",
      "Design System Tokens & Accessibility Specs",
      "Micro-Interaction Prototype Library"
    ],
    flows: [
      {
        title: "01. Consolidated Wealth Overview",
        subtitle: "Minimalist Account Architecture",
        caption: "High-contrast financial summary replacing cluttered menus with modular data cards.",
        description:
          "The main screen balances primary account liquidity with long-term asset allocation charts. Tap-and-hold gestures reveal instant breakdown categories without triggering page navigations.",
        images: [
          {
            src: "/images/fintech.png",
            alt: "FinTech Wealth Overview Dashboard",
            caption: "FIG 1.1 — Main liquidity overview with real-time portfolio curve.",
            size: "full"
          }
        ]
      },
      {
        title: "02. Smart Saving Vaults & Goal Tracking",
        subtitle: "Automated Micro-Investing Systems",
        caption: "Rule-based savings containers designed to automate emergency funds and leisure goals.",
        description:
          "Users establish rules such as 'Round up coffee purchases to nearest $5' or 'Deposit 10% on payday'. Interactive slider widgets visualize projected growth over 6, 12, and 36 months.",
        images: [
          {
            src: "/images/fintech.png",
            alt: "FinTech Smart Vaults Interface",
            caption: "FIG 2.1 — Automated goal vault creation matrix and projected interest simulator.",
            size: "full"
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
    subtitle: "Brand Identity & Urban Outdoor Exploration Platform",
    cluster: "brand",
    clusterLabel: "Brand & Visual Identity",
    categoryColor: "#E63946",
    dossierNumber: "DOSSIER-03",
    year: "2025",
    role: "Brand & UX Designer",
    type: "Brand System & Mobile Experience",
    timeline: "Mid 2025 (3 Weeks)",
    tools: ["Figma", "Adobe Illustrator", "Photoshop"],
    coverImage: "/images/stepout.png",
    overview: [
      "Step Out was created to bridge urban living with local outdoor discovery. The project encompasses a complete visual identity system—including typography, iconography, and color palettes—alongside a companion mobile app for discovering nearby hiking trails and community excursions.",
      "The brand identity uses a restrained earth-and-clay palette paired with raw architectural typography, reflecting both urban grit and natural terrain.",
      "Every touchpoint was crafted to feel tactile and archival, positioning Step Out not as a commercial utility, but as an curated field guide for city dwellers."
    ],
    problemStatement:
      "Urban residents find existing trail apps overly technical and disconnected from local community culture, making outdoor activity feel daunting rather than restorative.",
    solutionNarrative:
      "A refined brand identity and minimalist discovery app that curates micro-adventures within 45 minutes of urban transit hubs, complete with community trail reports and offline field maps.",
    keyInsights: [
      "Restrained typography elevates perceived platform trust among urban demographic segments.",
      "Curated 2-hour weekend trail guides had 3x higher bookmark rates than endless search lists."
    ],
    deliverables: [
      "Complete Brand Identity Guidelines",
      "Logo Mark & Topographic Icon Suite",
      "Mobile Discovery App Wireframes & UI",
      "Print Trail Maps & Marketing Ephemera"
    ],
    flows: [
      {
        title: "01. Brand Mark & Typographic System",
        subtitle: "Visual Identity & Grid Guidelines",
        caption: "Custom typographic logo mark inspired by topographic elevation lines and architectural signage.",
        description:
          "The brand mark utilizes tight geometric tracking paired with high-contrast slab accents. Guidelines define clear space, apparel embroidery specs, and digital display rules across all viewport scales.",
        images: [
          {
            src: "/images/stepout.png",
            alt: "Step Out Logo Guidelines and Brand Grid",
            caption: "FIG 1.1 — Topographic grid construction of the Step Out emblem and color system.",
            size: "full"
          }
        ]
      },
      {
        title: "02. Trail Discovery & Micro-Adventure Feed",
        subtitle: "Editorial Content Curation",
        caption: "Magazine-style trail listings prioritizing imagery, trail difficulty tags, and transit accessibility.",
        description:
          "Instead of standard map pins, trails are showcased as curated editorial dossiers detailing elevation gain, shade coverage, and nearby espresso bars.",
        images: [
          {
            src: "/images/stepout.png",
            alt: "Step Out App Trail Feed Interface",
            caption: "FIG 2.1 — Editorial trail card layout with interactive transit filters.",
            size: "full"
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
    subtitle: "Visual Identity & Design System (Lekeamp Internship)",
    cluster: "brand",
    clusterLabel: "Brand & Visual Identity",
    categoryColor: "#E63946",
    dossierNumber: "DOSSIER-04",
    year: "2025",
    role: "Visual Identity & Design System Intern",
    type: "Corporate Brand & Design System",
    timeline: "Summer 2025 (8 Weeks)",
    tools: ["Figma", "Design Tokens", "Adobe XD", "Zeroheight"],
    coverImage: "/images/nivora.png",
    overview: [
      "During my design internship at Lekeamp, I led the brand identity expansion and design system documentation for Nivora—a high-growth SaaS workspace platform.",
      "My responsibility was to unify disparate marketing assets, establish tokenized typography scales, construct reusable UI component libraries, and author comprehensive usage guidelines.",
      "The final Nivora design system reduced component duplication by 45% across engineering teams and established a strong visual standard for future product iterations."
    ],
    problemStatement:
      "Rapid product expansion led to fragmented visual assets, inconsistent color implementations across web and desktop platforms, and high handoff friction between design and frontend teams.",
    solutionNarrative:
      "A centralized design system built on design tokens, strict accessibility standards, and comprehensive component documentation in Figma and Zeroheight.",
    keyInsights: [
      "Design tokenization cut UI bug reports by 38% within the first 6 weeks of adoption.",
      "Standardized layout grids reduced frontend sprint estimation variances significantly."
    ],
    deliverables: [
      "Nivora Design System Library (Figma)",
      "Multi-Theme Color Token Architecture",
      "Brand Guidelines & Asset Export Toolkit",
      "Cross-Platform UI Component Spec"
    ],
    flows: [
      {
        title: "01. Design Token Architecture",
        subtitle: "Semantic Variables & Color Tokens",
        caption: "Systematic organization of background, border, surface, and interactive tokens.",
        description:
          "Established semantic naming conventions (e.g. `sys.color.surface.paper`, `sys.color.brand.accent`) to ensure seamless light/dark theme parity and code syncing.",
        images: [
          {
            src: "/images/nivora.png",
            alt: "Nivora Design Token Specs and Component Library",
            caption: "FIG 1.1 — Color token taxonomy and component variant matrix.",
            size: "full"
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
    categoryColor: "#F4C430",
    dossierNumber: "DOSSIER-05",
    year: "2025–2026",
    role: "Lead E-Commerce UI/UX Designer",
    type: "E-Commerce Web Storefront",
    timeline: "2025–2026 (3 Weeks)",
    tools: ["Figma", "Shopify Liquid", "React", "Tailwind CSS"],
    coverImage: "/images/aurelle.png",
    overview: [
      "AURELLE is a high-end luxury lifestyle brand requiring a bespoke, high-converting digital storefront. The objective was to merge editorial magazine presentation with high-performance e-commerce mechanics.",
      "I designed and developed the desktop and mobile homepage experience—featuring sticky navigation tickers, interactive product system resolvers, customer review masonry grids, and an intuitive quiz CTA container.",
      "Through precise typography and whitespace orchestration, the site achieved a 2.4x increase in average session duration and a 38% uplift in add-to-cart actions."
    ],
    problemStatement:
      "Standard e-commerce templates failed to communicate AURELLE's bespoke craftsmanship, resulting in generic product displays and high bounce rates among discerning shoppers.",
    solutionNarrative:
      "An editorial-first digital storefront featuring dynamic layout resolvers, interactive product quiz engines, and luxury micro-interactions that elevate brand prestige while streamlining checkout.",
    keyInsights: [
      "Editorial hero sections with minimal distraction increased collection clicks by 52%.",
      "Interactive routine build quizzes converted 3.1x higher than traditional category browsing."
    ],
    deliverables: [
      "Desktop & Mobile Homepage Layout Architecture",
      "Interactive Product Quiz Resolver UI",
      "Custom Shopify Theme Components",
      "Responsive Style Guide & Asset Library"
    ],
    flows: [
      {
        title: "01. Editorial Hero & Sticky Header",
        subtitle: "First Impression & Brand Immersiveness",
        caption: "Generous typography paired with high-resolution imagery and a sticky global ticker.",
        description:
          "The hero section balances bold headline typography with quiet metadata badges. The header maintains persistent accessibility without obscuring hero media.",
        images: [
          {
            src: "/images/aurelle.png",
            alt: "AURELLE Desktop Homepage Hero Interface",
            caption: "FIG 1.1 — Desktop hero section showcasing layout parity and editorial typography.",
            size: "full"
          }
        ]
      },
      {
        title: "02. System Resolver & Credibility Grid",
        subtitle: "Interactive Product Matching & Social Proof",
        caption: "A 2-column interactive widget allowing users to select personal skin/lifestyle profiles.",
        description:
          "Users select their specific goals to instantly filter recommended collections, supported by verified customer review masonry cards and press highlights.",
        images: [
          {
            src: "/images/aurelle.png",
            alt: "AURELLE System Resolver & Customer Reviews Grid",
            caption: "FIG 2.1 — Interactive product resolver and customer review masonry layout.",
            size: "full"
          }
        ]
      }
    ],
    nextSlug: "fiverr-freelance",
    nextTitle: "Fiverr Client Work",
    prevSlug: "nivora",
    prevTitle: "Nivora"
  },

  "fiverr-freelance": {
    slug: "fiverr-freelance",
    title: "Fiverr Client Work",
    subtitle: "Neo-Brutalist & Monochrome Brand Identities",
    cluster: "freelance",
    clusterLabel: "Client & Freelance Work",
    categoryColor: "#F4C430",
    dossierNumber: "DOSSIER-06",
    year: "2024–2026",
    role: "Freelance UI/UX & Brand Specialist",
    type: "Client Design Suite (15+ Global Projects)",
    timeline: "2024–2026 (Ongoing)",
    tools: ["Figma", "Adobe Creative Suite", "Webflow", "HTML/CSS"],
    coverImage: "/images/fiverr.png",
    overview: [
      "Over two years of active freelance engagement on Fiverr, I delivered 15+ custom web design and brand identity projects for international founders, creative agencies, and indie software developers.",
      "My portfolio highlights neo-brutalist digital design, monochrome portfolio architectures, and conversion-focused web layouts engineered to stand out in saturated markets.",
      "Maintaining a 5-star seller rating, I managed end-to-end client communication, requirements scoping, wireframing, and final developer handoff."
    ],
    problemStatement:
      "Indie founders and agencies struggle to differentiate their digital identity from generic SaaS templates on tight timelines and budgets.",
    solutionNarrative:
      "High-impact, custom visual direction leveraging monochrome contrast, sharp geometric borders, bold typography, and rapid prototyping workflows.",
    keyInsights: [
      "High-contrast neo-brutalist layouts deliver 28% higher brand recall for indie tech platforms.",
      "Structured client intake questionnaires reduce project revision cycles from 4 down to 1."
    ],
    deliverables: [
      "15+ Completed Web & Mobile UI Projects",
      "Custom Neo-Brutalist & Monochrome Brand Toolkits",
      "Figma Handoff Files & Interactive Prototypes",
      "Client Testimonials & 5-Star Delivery Archive"
    ],
    flows: [
      {
        title: "01. Neo-Brutalist Web Layout Suite",
        subtitle: "High-Contrast Visual Experimentation",
        caption: "Sharp grid systems, raw line art, and high-impact typography for digital agency landing pages.",
        description:
          "Exploration of stark monochrome themes paired with high-contrast accent buttons and raw archival line indicators.",
        images: [
          {
            src: "/images/fiverr.png",
            alt: "Fiverr Neo-Brutalist Portfolio Interface Examples",
            caption: "FIG 1.1 — Neo-brutalist landing page design layout for indie tech clients.",
            size: "full"
          }
        ]
      }
    ],
    nextSlug: "lloyds-ux",
    nextTitle: "Lloyds Banking Group UX Simulation",
    prevSlug: "aurelle",
    prevTitle: "AURELLE Shopify Homepage"
  },

  "lloyds-ux": {
    slug: "lloyds-ux",
    title: "Lloyds Banking Group UX Simulation",
    subtitle: "Competitor Research, 50-Respondent Survey & Ethnographic Study",
    cluster: "research",
    clusterLabel: "Research & Enterprise UX",
    categoryColor: "#7B2CBF",
    dossierNumber: "DOSSIER-07",
    year: "2025",
    role: "Enterprise UX Researcher & Product Strategist",
    type: "Research Dossier & Enterprise Case Study",
    timeline: "2025 (4 Weeks)",
    tools: ["Figma", "UserZoom", "Survey Synthesis", "Affinity Mapping"],
    coverImage: "/images/lloyds.png",
    overview: [
      "As part of an intensive enterprise UX simulation for Lloyds Banking Group, I conducted a methodical research project to evaluate friction points in traditional retail banking mobile onboarding and payment workflows.",
      "The research framework combined quantitative data from a 50-respondent survey with qualitative ethnographic observations, competitive benchmarking against challenger banks (Revolut, Monzo), and affinity mapping.",
      "The findings culminated in an executive research dossier and a series of high-fidelity dashboard wireframe proposals that reduced account setup friction by an estimated 40%."
    ],
    problemStatement:
      "Enterprise banking applications suffer from multi-step identity verification drop-offs and complex menu hierarchies, causing higher customer acquisition costs.",
    solutionNarrative:
      "A restructured onboarding architecture derived from 50-person survey insights, introducing progressive disclosure, clear verification progress indicators, and simplified navigation nodes.",
    keyInsights: [
      "62% of respondents abandoned account creation if ID verification exceeded 4 minutes.",
      "Progressive disclosure during registration boosted user task completion confidence by 55%.",
      "74% preferred biometrically authenticated single-tap approvals over SMS OTP codes."
    ],
    deliverables: [
      "50-Respondent Quantitative Survey Synthesis Report",
      "Competitor Feature Audit Matrix (Revolut vs Monzo vs Lloyds)",
      "User Persona Cards & Affinity Map Canvas",
      "Redesigned Enterprise Onboarding Wireframe Suite"
    ],
    flows: [
      {
        title: "01. Survey Synthesis & Affinity Mapping",
        subtitle: "Quantitative Data & Qualitative Clustering",
        caption: "Data visualization from 50 survey respondents highlighting key drop-off points.",
        description:
          "Synthesized survey responses into 4 core thematic clusters: Security Trust, Onboarding Velocity, Fee Transparency, and Navigation Simplicity.",
        images: [
          {
            src: "/images/lloyds.png",
            alt: "Lloyds Banking UX Research Synthesis and Affinity Map",
            caption: "FIG 1.1 — Quantitative survey distribution and affinity mapping canvas.",
            size: "full"
          }
        ]
      },
      {
        title: "02. Redesigned Enterprise Dashboard & Onboarding",
        subtitle: "Evidence-Based UX Solution",
        caption: "Wireframe proposals addressing user friction identified during research phases.",
        description:
          "The proposed onboarding flow breaks identity verification into 3 logical stages with clear real-time validation badges and inline help guides.",
        images: [
          {
            src: "/images/lloyds.png",
            alt: "Redesigned Enterprise Mobile Banking Screens",
            caption: "FIG 2.1 — High-fidelity enterprise banking wireframes featuring progressive disclosure.",
            size: "full"
          }
        ]
      }
    ],
    nextSlug: "qwikamp",
    nextTitle: "Qwikamp",
    prevSlug: "fiverr-freelance",
    prevTitle: "Fiverr Client Work"
  }
};

export const CLUSTERS = [
  {
    id: "product",
    tag: "PRODUCT DESIGN & UX SYSTEMS",
    title: "Product Design & UX Systems",
    color: "#2E5EFF",
    description:
      "Structuring end-to-end mobile applications and multi-platform service ecosystems. Grounded in user mental models, task flow efficiency, and scalable design component architectures.",
    projectSlugs: ["qwikamp", "fintech-banking"]
  },
  {
    id: "brand",
    tag: "BRAND & VISUAL IDENTITY",
    title: "Brand & Visual Identity",
    color: "#E63946",
    description:
      "Constructing cohesive visual identities, typographic systems, and brand toolkits that bridge digital interfaces with physical and strategic brand presence.",
    projectSlugs: ["step-out", "nivora"]
  },
  {
    id: "freelance",
    tag: "CLIENT & FREELANCE WORK",
    title: "Client & Freelance Work",
    color: "#F4C430",
    description:
      "Direct client engagement, rapid prototyping, e-commerce storefront optimization, and neo-brutalist digital design solutions tailored for commercial impact.",
    projectSlugs: ["aurelle", "fiverr-freelance"]
  },
  {
    id: "research",
    tag: "RESEARCH & ENTERPRISE UX",
    title: "Research & Enterprise UX",
    color: "#7B2CBF",
    description:
      "Methodical UX research, qualitative inquiry, quantitative survey synthesis, and ethnographic observation applied to complex financial and enterprise workflows.",
    projectSlugs: ["lloyds-ux"]
  }
];
