/**
 * Single source of truth for all site copy.
 * Edit text here without touching any component file.
 *
 * Exported constants (each consumed by the like-named component/section):
 *   SITE         — brand identity + canonical URL/email/social (used by metadata & OG).
 *   NAV_LINKS    — navbar anchor links (label + in-page #href).
 *   HERO         — hero eyebrow/headline/subhead, CTAs, and animated stat counters.
 *   LOGO_STRIP   — "career stops" company logos for the marquee.
 *   SERVICES     — bento-grid cards (title, blurb, lucide icon, grid span, feature flag).
 *   SIDE_PROJECTS— "building in public" project cards (link/status/icon).
 *   TESTIMONIALS — quote cards (featured flag drives layout emphasis).
 *   CASE_STUDY   — selected-work outcomes + headline stat.
 *   APPROACH     — numbered "how I work" steps.
 *   ABOUT        — bio, headline, and highlight bullets.
 *   CONTACT      — contact-section copy + form field labels/placeholders/success state.
 */

export const SITE = {
  name: "OPS GS",
  fullName: "OPS GS LLC",
  tagline: "Tom Romano, Strategy & Operations Leader",
  url: "https://www.opsgs.com",
  email: "Tom@opsgs.com",
  linkedin: "https://www.linkedin.com/in/tomdromano",
  description:
    "Tom Romano. Strategy and operations leader, former Chief of Staff, AI builder. I build the operating systems that run executive teams, and publish the tools at OPS GS LLC.",
};

export const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
] as const;

export const HERO = {
  eyebrow: "Tom Romano, VP Strategy and Execution",
  headline: ["The Technical", "Chief of Staff."],
  subhead:
    "I help senior executives run their organizations. Operating rhythm, annual planning, launch governance, and the AI tools that make all of it faster. I build my own software because manual reporting takes too long and leadership still doesn't trust the data.",
  cta: {
    primary: { label: "Get in touch", href: "#contact" },
    secondary: { label: "See what I'm building", href: "#services" },
  },
  terminalStatus: "live",
  stats: [
    { value: 13, suffix: "+", label: "years partnering with executives" },
    { value: 1.9, prefix: "$", suffix: "B", label: "USIS segment scale" },
    { value: 480, prefix: "$", suffix: "M", label: "Equifax annual capex cycle" },
    { value: 30, suffix: "+", label: "products shipped a year" },
  ],
};

export const LOGO_STRIP = {
  label: "Career stops",
  companies: ["Equifax", "HP", "Cisco", "Microsoft"],
};

export const SERVICES = [
  {
    title: "Operating Rhythm",
    blurb:
      "Leadership meetings, quarterly and annual planning, strategic reviews. I own the calendars that turn priorities into commitments and the workback that makes sure those commitments are met.",
    icon: "Activity" as const,
    tag: "Rhythm of Business",
    span: "md:col-span-2 md:row-span-1",
    feature: false,
  },
  {
    title: "AI Tooling for Executives",
    blurb:
      "I rebuilt how USIS tracks and ships product. Disconnected Aha and Jira instances became one source of truth, then an agent-generated weekly deck that leadership runs delivery off, instead of static slides. Every item links back to its source.",
    icon: "Bot" as const,
    tag: "Automation",
    span: "md:col-span-2 md:row-span-2",
    feature: true,
  },
  {
    title: "Launch Governance",
    blurb:
      "Cross-functional pre-launch reviews. Product, marketing, sales, legal, and finance aligned before the go/no-go decision.",
    icon: "Rocket" as const,
    tag: "Releases",
    span: "md:col-span-2",
    feature: false,
  },
  {
    title: "Annual Planning",
    blurb:
      "Owned the annual planning and business case process for my function within Equifax's enterprise-wide capex planning cycle ($480M annually, per the 2025 10-K). The schedule and cadence I designed were adopted by peer planning leads across USIS, and finance uses the resulting milestones to drive executive sign-off.",
    icon: "ClipboardList" as const,
    tag: "Planning",
    span: "md:col-span-2",
    feature: false,
  },
  {
    title: "PMO and Product Operations",
    blurb:
      "I pitched and built the PMO at Equifax that grew into the Product Operations function I lead today. At HP, I ran a PMO team of 8.",
    icon: "Workflow" as const,
    tag: "Function Build",
    span: "md:col-span-2",
    feature: false,
  },
  {
    title: "Executive Accountability",
    blurb:
      "Live dashboards that leaders actually look at. PMs keep data current because leadership is watching in real time, not at end-of-quarter.",
    icon: "LineChart" as const,
    tag: "Visibility",
    span: "md:col-span-4",
    feature: false,
  },
];

export const SIDE_PROJECTS = {
  eyebrow: "Side Projects",
  headline: "Building in public.",
  subhead:
    "What I'm building outside of Equifax, at OPS GS LLC.",
  projects: [
    {
      title: "Competitive Intelligence Engine",
      description:
        "An LLM-powered research tool that automates industry analysis and produces executive-ready briefings. Built in Next.js, deployed on Vercel, powered by the Gemini API.",
      link: "https://fdd-engine.vercel.app/",
      linkLabel: "Try it live",
      status: "Live (WIP)",
      icon: "Search",
    },
    {
      title: "This Website, Open Sourced",
      description:
        "The site you're reading is open source. Next.js, deployed on Vercel, with a working contact form and the SEO already done. Fork it, point it at your own domain, and ship your own in an afternoon.",
      link: "https://github.com/Automating-my-Job/Website_Template",
      linkLabel: "Get the repo",
      status: "Open source",
      icon: "Code2",
    },
    {
      title: "Automated Financial Reporting",
      description:
        "Most financial reports are a mess of spreadsheets and hours of copy-paste into slides. I built a tool that ends that. It takes your raw numbers and turns them into a finished, board-ready deck, automatically, on a schedule.",
      link: "https://docs.google.com/presentation/d/1SHeFRgSpj6NZKAmR_jP-HXBn-VOX1Skc_9VlGrHm1mY/edit?slide=id.g3e72ab8d1ef_0_0#slide=id.g3e72ab8d1ef_0_0",
      linkLabel: "See it run",
      status: "Production", 
      icon: "Sparkles",
    },
  ],
};

export const TESTIMONIALS = {
  eyebrow: "What colleagues say",
  headline: "In their own words.",
  items: [
    {
      quote:
        "It was a pleasure working with Tom on the Digital Solutions Product leadership team at Equifax. I appreciated his ability to step into each new challenge with optimism, thoughtfulness and a desire to make improvements that would impact the team's success. As an HR Business Partner, I most appreciated Tom's desire and actions to be better himself as a people leader and to engage in leadership opportunities and roles outside of his own daily responsibilities to support employees. I wouldn't hesitate to work with Tom again in leadership roles and teams.",
      name: "April Collier",
      title: "HR Business Partner",
      company: "Equifax",
      relationship: "Worked together on same team",
      date: "August 2025",
      featured: true,
    },
    {
      quote:
        "Tom is a true Renaissance man. A chef. An auto mechanic. A home improver. A process improver. There appears to be no challenge that he won't undertake. And no skill that he won't work to master. He is a true problem solver. He puts in the time and energy to drill down until he finds scalable solutions. He's been a great addition to our team. And our business is better because he's here.",
      name: "Brad Wiskirchen",
      title: "Industrial Partner",
      company: "CVC Capital Partners",
      relationship: "Managed Tom directly",
      date: "April 2023",
      featured: false,
    },
    {
      quote:
        "Tom exemplifies excellence in all that he does. In our work together he has shown his visionary skills to drive a product transformation journey of empowerment, authenticity, and growth for a company reborn in the cloud age. I look forward to continuing our journey, learning from Tom's experiences to deploy global change across Equifax.",
      name: "David S. Hunt",
      title: "VP, Global Product Strategy & Operations",
      company: "Equifax",
      relationship: "Worked together on same team",
      date: "April 2024",
      featured: false,
    },
  ],
};

export const CASE_STUDY = {
  eyebrow: "Selected work",
  company: "Equifax USIS",
  headline: "From dirty data to a real-time executive operating system.",
  outcomes: [
    "Started with disconnected Aha and Jira instances nobody trusted. Built the integration between them so product and engineering were working from a single source of truth.",
    "Replaced noisy, executive-ignored slides with an agent-generated weekly deck: scorecards, epics, and release roadmaps, auto-built and delivered to leadership inboxes on a schedule.",
    "Every item in the deck is a live link back to its source in Aha. Executives don't receive a static report. They receive a portal. One click and they're in Aha making real-time changes.",
    "Leadership runs delivery off these decks now, instead of static slides. The process and framework were adopted as the standard across the ~$1.9B segment (2025 10-K). Other parts of the business have started adopting the same framework.",
  ],
  stat: { value: "~$1.9B", label: "USIS segment annual revenue (2025 10-K)" },
};

export const APPROACH = {
  eyebrow: "How I work",
  headline: "Diagnose. Build. Transfer. Move to the next thing.",
  subhead:
    "I'm at my best when an executive team has a problem they can describe but can't yet fix. I find the gap, build the system that closes it, and hand it back to the team that owns it.",
  steps: [
    {
      number: "01",
      title: "Diagnose",
      description:
        "Where does the decision actually stall? What does the executive team look at on Monday morning, and what do they wish they could see instead?",
    },
    {
      number: "02",
      title: "Architect",
      description:
        "Design the system: the reporting structure, the accountability layer, and the stack that keeps it running without manual effort.",
    },
    {
      number: "03",
      title: "Build",
      description:
        "Apps Script, Next.js, the Gemini and Anthropic APIs, Aha!, Jira, Salesforce. Working software, not slides about software.",
    },
    {
      number: "04",
      title: "Transfer",
      description:
        "Documentation, walkthroughs, and a ramped team that fully owns the system. Then on to the next problem the organization needs solved.",
    },
  ],
};

export const ABOUT = {
  eyebrow: "About",
  headline: "Thirteen years running executive operating systems.",
  subhead:
    "I came up through Program Management and Chief of Staff roles. Today I'm VP of Strategy and Execution at Equifax, leading a Product Operations function I helped build, and I publish my tools at OPS GS LLC.",
  bio: "I'm VP of Strategy and Execution at Equifax. I joined as Chief of Staff to the GM/SVP of Identity and Fraud inside Equifax's $1.9B U.S. Information Solutions segment, and I pitched and built a PMO that grew into the Product Operations function I run today. I also drove the integration of two acquired companies, Kount and Midigator, partnering across product, sales, marketing, legal, and HR. Before Equifax, I spent six years at HP as Chief of Staff and PMO lead inside the $18.9B Print business, where I directly managed a team of 8 supporting program management, budget, and vendor spend across a 350+ person global design organization. Earlier in my career I held contractor project roles at Cisco and Microsoft.",
  highlights: [
    "13+ years partnering with senior executives across HP and Equifax",
    "Built accountability tooling used across a 2,000+ person product organization",
    "Designed the planning cadence adopted as the standard across USIS",
    "At HP, built the business case for a $45M plan and won an 82% budget increase, up $23M",
    "MBA, plus PMP, Certified Scrum Master, and Prosci change management",
  ],
};


export const CONTACT = {
  eyebrow: "Get in touch",
  headline: "Let's talk.",
  subhead: "If you lead a People, Product, or Operations organization and want a Chief of Staff who runs your operating rhythm and builds the tools behind it, let's talk.",
  email: SITE.email,
  fields: {
    name: { label: "Name", placeholder: "Your name" },
    email: { label: "Work email", placeholder: "you@company.com" },
    message: {
      label: "Message",
      placeholder: "What are you working on?",
    },
    submit: "Send message",
  },
  success: {
    title: "Message received.",
    body: "I'll get back to you within one business day.",
  },
};

/**
 * HOME — the two-door fork at `/`. Brand line, then a hire door and a contract
 * door. Voice: neutral brand. See docs/VOICE.md.
 */
export const HOME = {
  eyebrow: "OPS GS, LLC | Tom@OpsGS.com",
  tagline: "I build the systems that run executive teams.",
  intro:
    "Tom Romano is a strategy and operations leader. OPS GS is the studio that automates the reporting behind the work.",
  doors: [
    {
      eyebrow: "Professional Background",
      title: "Looking for a leader?",
      body: "Thirteen years as a technical Chief of Staff across HP and Equifax. Operating rhythm, planning, and the AI tools that run executive teams.",
      cta: "See the work",
      href: "/work",
    },
    {
      eyebrow: "Automate a report",
      title: "Drowning in a report?",
      body: "OPS GS automates the report you rebuild by hand. We connect to your data and deliver it board-ready, on a schedule. The first build is free.",
      cta: "See what we do",
      href: "/services",
    },
  ],
} as const;

/**
 * SERVICE — `/services` copy: the OPS GS automated-reporting offer.
 * Voice: "we" for the studio, "I" only on the free-build line. No em dashes,
 * no AI tells. See docs/VOICE.md. Framed as inspired-by and independent.
 */
export const SERVICE = {
  hero: {
    eyebrow: "Tom Romano, OPS GS LLC",
    headline: ["The Operational", "Gold Standard."],
    tagline: "Your reports, built once and sent on schedule.",
    subhead:
      "You stop making them by hand. We connect to where your data lives, pull the current numbers, and send a finished, board-ready report on the schedule you set.",
    cta: { label: "Send me a report", href: "#contact" },
  },
  demo: {
    caption: "This is what lands in your inbox.",
    linkLabel: "See a real one run",
    href: "https://docs.google.com/presentation/d/1SHeFRgSpj6NZKAmR_jP-HXBn-VOX1Skc_9VlGrHm1mY/edit?slide=id.g3e72ab8d1ef_0_0#slide=id.g3e72ab8d1ef_0_0",
    // Before/after artifacts: a sample monthly P&L workbook and the board-ready
    // report it generates. Sample data only, no employer detail. Files live in
    // public/demo/ (also offered as downloads below the cards).
    before: {
      src: "/demo/before-spreadsheet.png",
      alt: "A monthly profit-and-loss spreadsheet maintained by hand, twelve columns of numbers",
      label: "Before: the spreadsheet you build by hand",
    },
    after: {
      src: "/demo/after-deck.png",
      alt: "The finished, board-ready report slide generated from that spreadsheet",
      label: "After: the board-ready report",
    },
    downloadsLabel: "Sample files:",
    downloads: [
      { label: "Workbook (.xlsx)", href: "/demo/ops-gs-sample-workbook.xlsx" },
      { label: "Finished report (.pdf)", href: "/demo/ops-gs-sample-report.pdf" },
    ],
  },
  offer: {
    headline: "Some reports you never stop building.",
    body: "The weekly exec update. The product dashboard. The month-end deck. Same layout, new numbers, every time. You copy, paste, and reformat for hours, and the report is stale by the time it sends. We end that. Hand us one report you build by hand, and we build the version that builds itself. You stop touching it.",
  },
  how: {
    eyebrow: "How it works",
    headline: "Three steps.",
    steps: [
      {
        number: "01",
        title: "Send the report that eats your time.",
        body: "Pick the one you dread. The worst one is the best place to start.",
      },
      {
        number: "02",
        title: "Show us where the numbers come from.",
        body: "A Tableau view, a spreadsheet, your project tool, your sales system, or a database. We read from the source you already pay for, so nothing has to be retyped.",
      },
      {
        number: "03",
        title: "Get it back on a schedule.",
        body: "Same format, real numbers, built fresh every time. It runs on its own and arrives in your inbox. You read it instead of making it.",
      },
    ],
  },
  simple: {
    headline: "No new software. No IT project.",
    body: "We connect to the same places you pull the numbers from now, and set it up once. After that it runs on its own. Nothing to install, nothing new to log into, no IT ticket. You point us to the source, and we do the rest.",
  },
  connects: {
    label: "Connects to",
    caption: "Your numbers probably already live in one of these.",
    sources: ["Tableau", "Aha!", "Jira", "Salesforce", "Google Sheets", "Excel", "a database"],
  },
  tech: {
    eyebrow: "Under the hood",
    headline: "Curious what makes this possible?",
    body: "For the technically minded: we connect to your tools through their own APIs and build the reports with Google Apps Script, so everything runs inside the Google and data environments you already trust. Nothing is copied to a separate service.",
    note: "We keep a full security and architecture write-up. We don't publish it online, but we're happy to walk an interested team through it once we've aligned on scope.",
  },
  proof: {
    eyebrow: "Why trust this",
    headline: "Built by an operator who runs reporting at scale.",
    body: "This is inspired by reporting work inside a $1.9B division, public in its 10-K. It was built independently at OPS GS, on my own time and tools, not lifted from any employer's systems. The same idea, rebuilt from scratch: connect to the source, pull the live numbers, and deliver a board-ready report on a schedule.",
    note: "OPS GS is a focused practice. You work directly with the person who builds your system.",
  },
  trust: {
    headline: "Your data stays yours.",
    lines: [
      "We build inside the tools your company already owns, so the report runs in your own accounts. Nothing moves to a new vendor.",
      "We only read your numbers. We never change them or store your systems.",
      "For the first build I only need the shape of the report: your headers and a sample with the numbers scrubbed. I'll sign your NDA before you send anything, and have it back the same day.",
    ],
  },
  free: {
    headline: "The first build is free.",
    body: "Not a trial. Not a teaser. A finished, working report, built for you, at no cost. I'm building my portfolio and I want honest reviews, so the first one's on me. You keep it either way, working or not.",
  },
  contact: {
    eyebrow: "Start your free build",
    headline: "Tell me about the report that's eating your week.",
    subhead:
      "A few quick questions. Enough for me to tell you whether I can automate it, and what it would take.",
    email: SITE.email,
    fields: {
      name: { label: "Name", placeholder: "Your name" },
      email: { label: "Work email", placeholder: "you@company.com" },
      message: {
        label: "The report",
        placeholder:
          "Which report do you rebuild by hand? Where does the data live (Tableau, Aha!, a database, an API, a spreadsheet)? How often, and who reads it?",
      },
      submit: "Send me a report",
    },
    success: {
      title: "Got it.",
      body: "I'll take a look and reply within one business day.",
    },
  },
} as const;