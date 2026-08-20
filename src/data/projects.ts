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

export const PROJECTS_DATA: Record<string, CaseStudy> = {
  qwikamp: {
    slug: "qwikamp",
    title: "Qwikamp",
    subtitle: "Doorstep Bicycle Servicing & Retail Mobile Application",
    cluster: "product",
    clusterLabel: "Product Design & UX Systems",
    dossierNumber: "DOSSIER-01",
    year: "2026",
    role: "Lead UI/UX Designer & Systems Specialist",
    type: "Mobile Application (iOS & Android)",
    timeline: "Early 2026 (4 Weeks)",
    tools: ["Figma", "Flutter", "Firebase", "Adobe XD"],
    coverImage: "/images/qwikamp.png",
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
        title: "01. Onboarding & Virtual Bike Garage",
        subtitle: "Registration & Asset Digitization",
        caption: "Riders register their bicycles by selecting brand, drivetrain, and frame specs to enable predictive maintenance alerts.",
        description:
          "The garage screen acts as the central hub. Users can inspect component lifespan indicators (chain stretch, brake pad wear, tire tread) derived from logged ride mileage or simple time intervals.",
        images: [
          {
            src: "/images/qwikamp.png",
            alt: "Qwikamp Virtual Garage & Bike Profile Screen",
            caption: "FIG 1.1 — Garage Dashboard displaying component wear meters and quick service triggers.",
            size: "full"
          }
        ]
      },
      {
        title: "02. Doorstep Service Booking & Scheduler",
        subtitle: "Frictionless Diagnostics & Slot Reservation",
        caption: "A 3-step wizard allowing users to select standard tune-up packages or pin-point specific component issues.",
        description:
          "Instead of vague text boxes, users select issues via interactive 3D bike node diagrams. The system automatically calculates total cost, estimated labor duration, and nearest available certified mechanic slots.",
        images: [
          {
            src: "/images/qwikamp.png",
            alt: "Qwikamp Interactive Service Scheduler",
            caption: "FIG 2.1 — Step-by-step diagnostic selector with transparent price breakdowns.",
            size: "half"
          },
          {
            src: "/images/qwikamp.png",
            alt: "Qwikamp Mechanic Slot Chooser",
            caption: "FIG 2.2 — Real-time slot reservation matrix filtered by mechanic proximity.",
            size: "half"
          }
        ]
      },
      {
        title: "03. Real-Time Dispatch & Inspection Report",
        subtitle: "Order Tracking & Digital Approval",
        caption: "Live GPS tracking of mobile service vans and real-time digital inspection sign-offs.",
        description:
          "Once the mechanic arrives, they perform a 12-point diagnostic check and push a digital photo-verified report directly to the rider's phone. Riders approve additional recommended repairs with a single swipe.",
        images: [
          {
            src: "/images/qwikamp.png",
            alt: "Qwikamp Live Mechanic Dispatch Map & Inspection Sign-off",
            caption: "FIG 3.1 — GPS tracking view alongside photo-verified mechanic inspection cards.",
            size: "full"
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
    tag: "FILED UNDER: 01 / PRODUCT DESIGN & UX SYSTEMS",
    title: "Product Design & UX Systems",
    description:
      "Structuring end-to-end mobile applications and multi-platform service ecosystems. Grounded in user mental models, task flow efficiency, and scalable design component architectures.",
    projectSlugs: ["qwikamp", "fintech-banking"]
  },
  {
    id: "brand",
    tag: "FILED UNDER: 02 / BRAND & VISUAL IDENTITY",
    title: "Brand & Visual Identity",
    description:
      "Constructing cohesive visual identities, typographic systems, and brand toolkits that bridge digital interfaces with physical and strategic brand presence.",
    projectSlugs: ["step-out", "nivora"]
  },
  {
    id: "freelance",
    tag: "FILED UNDER: 03 / CLIENT & FREELANCE WORK",
    title: "Client & Freelance Work",
    description:
      "Direct client engagement, rapid prototyping, e-commerce storefront optimization, and neo-brutalist digital design solutions tailored for commercial impact.",
    projectSlugs: ["aurelle", "fiverr-freelance"]
  },
  {
    id: "research",
    tag: "FILED UNDER: 04 / RESEARCH & ENTERPRISE UX",
    title: "Research & Enterprise UX",
    description:
      "Methodical UX research, qualitative inquiry, quantitative survey synthesis, and ethnographic observation applied to complex financial and enterprise workflows.",
    projectSlugs: ["lloyds-ux"]
  }
];
