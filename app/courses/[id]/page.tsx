import Header from "../../../components/shared/Header";
import Footer from "../../../components/shared/Footer";
import CourseBanner from "../../../components/course/CourseBanner";
import CourseOverview, { CourseOverviewProps } from "../../../components/course/CourseOverview";
import CourseSidebar, { CourseSidebarProps } from "../../../components/course/CourseSidebar";

interface PageProps {
  params: Promise<{ id: string }>;
}

export interface CourseFullData {
  title: string;
  category: string;
  rating: number;
  reviewsCount: number;
  instructorName: string;
  instructorTitle: string;
  instructorImage: string;
  instructorRating: number;
  instructorStudents: string;
  instructorExperience: string;
  instructorBio: string;
  lastUpdated: string;
  language: string;
  priceInr: string;
  originalPriceInr: string;
  discountPercentage: string;
  previewImage: string;
  duration: string;
  lessons: string;
  seats: string;
  description: string;
  whatYouWillLearn: string[];
  totalModules: string;
  totalLessons: string;
  totalHours: string;
  curriculum: CourseOverviewProps["curriculum"];
}

const COURSES_MAP: Record<string, CourseFullData> = {
  "1": {
    title: "Video Editing Mastery",
    category: "Video Editing & Media",
    rating: 5.0,
    reviewsCount: 780,
    instructorName: "Kabir Mehta",
    instructorTitle: "Senior Post-Production Director",
    instructorImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300",
    instructorRating: 5.0,
    instructorStudents: "28,000+ Students",
    instructorExperience: "12+ Years Experience",
    instructorBio: "Kabir Mehta is an acclaimed video editor who has crafted viral commercials, YouTube edits, and short-form reels for leading brands and top creators.",
    lastUpdated: "September 2026",
    language: "Hindi & English",
    priceInr: "₹4,999",
    originalPriceInr: "₹9,999",
    discountPercentage: "50% OFF",
    previewImage: "/images/course-video.jpg",
    duration: "05 Months",
    lessons: "80 Lessons",
    seats: "120 Enrolled",
    description: "Master industry-standard mobile and desktop video editing software: InShot, CapCut, Alight Motion, Premiere Pro, and VN Editor to produce viral short-form reels, cinematic YouTube videos, and commercial client deliverables.",
    whatYouWillLearn: [
      "1) InShot: Fast mobile reel creation, aspect ratios, filters, and audio syncing.",
      "2) CapCut: Viral keyframe animations, smooth speed ramping, 3D zoom & auto-captions.",
      "3) Alight Motion: Custom visual effects, motion graphics, vector transitions & text presets.",
      "4) Premiere Pro: Professional multi-track workflow, Lumetri color grading & sound engineering.",
      "5) VN Editor: High-precision mobile trimming, velocity curves, FX transitions & 4K exports.",
      "Portfolio creation, client pitching templates, and commercial rate card frameworks.",
    ],
    totalModules: "5 Modules",
    totalLessons: "80 Lessons",
    totalHours: "130 Hours Total",
    curriculum: [
      {
        id: 1,
        title: "Module 1: InShot Masterclass (Mobile Reel Fundamentals)",
        lessonsCount: "14 Lessons",
        duration: "20 Hours",
        lessons: [
          { name: "InShot Interface, Aspect Ratios & Canvas Setup", duration: "40 mins", preview: true },
          { name: "Music Syncing, Voiceover & Multi-Layer Video Overlays", duration: "1 hr 10 mins", preview: true },
          { name: "Speed Controls, Filters & High-Bitrate Exporting", duration: "50 mins", preview: false },
        ],
      },
      {
        id: 2,
        title: "Module 2: CapCut Pro (Viral Animations & Auto-Captions)",
        lessonsCount: "18 Lessons",
        duration: "30 Hours",
        lessons: [
          { name: "Keyframe Animations, Masking & Green Screen Removal", duration: "1 hr 15 mins", preview: true },
          { name: "Trending Sound Sync, Auto-Captions & Dynamic Typography", duration: "1 hr", preview: false },
          { name: "Advanced 3D Zoom & Velocity Speed Curves", duration: "1 hr 20 mins", preview: false },
        ],
      },
      {
        id: 3,
        title: "Module 3: Alight Motion (Custom VFX & Motion Graphics)",
        lessonsCount: "16 Lessons",
        duration: "25 Hours",
        lessons: [
          { name: "Vector Graphics & Keyframe Transformation Masterclass", duration: "1 hr 10 mins", preview: false },
          { name: "Visual FX, Glow Effects, Blur Transitions & Presets", duration: "1 hr 30 mins", preview: false },
          { name: "XML Preset Creation & Batch Sharing", duration: "55 mins", preview: false },
        ],
      },
      {
        id: 4,
        title: "Module 4: Adobe Premiere Pro (Professional Production)",
        lessonsCount: "18 Lessons",
        duration: "35 Hours",
        lessons: [
          { name: "Timeline Organization, Shortcut Mastery & Rough Cut Speed", duration: "1 hr 20 mins", preview: true },
          { name: "Lumetri Color Grading, LUTs & Cinematic Tone Mapping", duration: "1 hr 45 mins", preview: false },
          { name: "Essential Sound Panel, Audio Ducking & SFX Sound Design", duration: "1 hr 15 mins", preview: false },
        ],
      },
      {
        id: 5,
        title: "Module 5: VN Video Editor & Final Client Deliverables",
        lessonsCount: "14 Lessons",
        duration: "20 Hours",
        lessons: [
          { name: "VN Multi-Track Timeline & Beat Marker Synchronization", duration: "1 hr", preview: false },
          { name: "Custom Curve Speed Adjustments & Zoom Shakes", duration: "50 mins", preview: false },
          { name: "Client Deliverable Formats, Codecs & Freelance Rate Cards", duration: "1 hr 10 mins", preview: false },
        ],
      },
    ],
  },

  "2": {
    title: "Poster & Logo Design",
    category: "Graphic Design & Branding",
    rating: 4.9,
    reviewsCount: 650,
    instructorName: "Rohan Verma",
    instructorTitle: "Lead Brand Identity & UI/UX Designer",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    instructorRating: 4.9,
    instructorStudents: "24,000+ Students",
    instructorExperience: "11+ Years Experience",
    instructorBio: "Rohan Verma has designed award-winning brand identities and promotional graphics for 200+ startups, international brands, and creator agencies.",
    lastUpdated: "September 2026",
    language: "Hindi & English",
    priceInr: "₹3,499",
    originalPriceInr: "₹6,999",
    discountPercentage: "50% OFF",
    previewImage: "/images/course-design.jpg",
    duration: "04 Months",
    lessons: "65 Lessons",
    seats: "110 Enrolled",
    description: "Master all modern graphic design and logo creation tools: Canva, Adobe Photoshop, Adobe Illustrator, PixelLab, and PhotoRoom to build stunning brand identities, commercial posters, and social banners.",
    whatYouWillLearn: [
      "1) Canva: Professional brand kits, typography pairing, social posters & client mockups.",
      "2) Adobe Photoshop: Photo manipulation, multi-layer composite blending & lighting.",
      "3) Adobe Illustrator: Vector logo creation, pen tool precision, geometric grids & typography.",
      "4) PixelLab: High-definition mobile poster design, 3D text effects & thumbnail creation.",
      "5) PhotoRoom: AI background cutouts, studio shadow generation & e-commerce product shots.",
      "Client pitching, Behance portfolio curation, and print-ready export standards.",
    ],
    totalModules: "5 Modules",
    totalLessons: "65 Lessons",
    totalHours: "110 Hours Total",
    curriculum: [
      {
        id: 1,
        title: "Module 1: Canva Pro Design & Brand Kits",
        lessonsCount: "12 Lessons",
        duration: "18 Hours",
        lessons: [
          { name: "Canva Design Principles: Grid, Spacing & Visual Hierarchy", duration: "45 mins", preview: true },
          { name: "Creating High-Converting Social Media Posters & Carousels", duration: "1 hr 15 mins", preview: true },
          { name: "Custom Brand Kit Setup & Team Collaboration", duration: "50 mins", preview: false },
        ],
      },
      {
        id: 2,
        title: "Module 2: Adobe Photoshop Poster Manipulation",
        lessonsCount: "15 Lessons",
        duration: "25 Hours",
        lessons: [
          { name: "Layer Masking, Selection Precision & Smart Objects", duration: "1 hr 10 mins", preview: true },
          { name: "Movie Poster Composite Blending, Lighting & Shadows", duration: "1 hr 40 mins", preview: false },
          { name: "Camera Raw Filter & Commercial Color Grading", duration: "1 hr", preview: false },
        ],
      },
      {
        id: 3,
        title: "Module 3: Adobe Illustrator Vector Logo Craftsmanship",
        lessonsCount: "16 Lessons",
        duration: "30 Hours",
        lessons: [
          { name: "Mastering the Pen Tool, Curves & Shape Builder", duration: "1 hr 20 mins", preview: true },
          { name: "Minimalist, Emblem & Geometric Vector Logo Conception", duration: "1 hr 45 mins", preview: false },
          { name: "Creating Complete Brand Guidelines & Vector Exports (SVG/EPS)", duration: "1 hr 15 mins", preview: false },
        ],
      },
      {
        id: 4,
        title: "Module 4: PixelLab Mobile Graphic Designing",
        lessonsCount: "12 Lessons",
        duration: "20 Hours",
        lessons: [
          { name: "PixelLab Mobile Workspace & Custom Font Imports", duration: "45 mins", preview: false },
          { name: "Designing Viral YouTube Thumbnails & Festival Posters", duration: "1 hr 10 mins", preview: false },
          { name: "3D Text Extrusion, Emboss & Texture Mapping", duration: "55 mins", preview: false },
        ],
      },
      {
        id: 5,
        title: "Module 5: PhotoRoom Studio Product Imagery & Portfolio",
        lessonsCount: "10 Lessons",
        duration: "17 Hours",
        lessons: [
          { name: "Instant AI Background Replacement & Studio Lighting", duration: "45 mins", preview: false },
          { name: "E-commerce Product Showcase Banners & Batch Processing", duration: "1 hr", preview: false },
          { name: "Building Your Behance Design Portfolio & Freelance Rates", duration: "1 hr 15 mins", preview: false },
        ],
      },
    ],
  },

  "3": {
    title: "Content Creation Mastery",
    category: "Social Media & Growth",
    rating: 4.9,
    reviewsCount: 710,
    instructorName: "Neha Kapoor",
    instructorTitle: "Social Media Strategist & Creator Coach",
    instructorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300",
    instructorRating: 4.9,
    instructorStudents: "32,000+ Students",
    instructorExperience: "9+ Years Experience",
    instructorBio: "Neha Kapoor has coached top creators and businesses to over 10 Million+ cumulative views and 100k+ organic follower milestones.",
    lastUpdated: "September 2026",
    language: "Hindi & English",
    priceInr: "₹4,499",
    originalPriceInr: "₹8,999",
    discountPercentage: "50% OFF",
    previewImage: "/images/course-content.jpg",
    duration: "04 Months",
    lessons: "60 Lessons",
    seats: "140 Enrolled",
    description: "A complete masterclass on building an explosive creator brand: Instagram organic growth, YouTube channel scaling, infinite content ideation systems, and high-retention viral scriptwriting.",
    whatYouWillLearn: [
      "1) Instagram Growth: Algorithm breakdown, viral reels, story funnels & DM automation.",
      "2) YouTube Growth: High-CTR thumbnails, title hooks, watch-time retention & SEO.",
      "3) Content Ideas: 30-day infinite ideation framework, trend surfing & competitor research.",
      "4) Script Writing: 3-second hook formulas, emotional storytelling & high-converting CTAs.",
      "Batch recording workflows to shoot 1 month of content in a single weekend.",
      "Monetization through brand collaborations, digital products, and affiliate links.",
    ],
    totalModules: "4 Modules",
    totalLessons: "60 Lessons",
    totalHours: "100 Hours Total",
    curriculum: [
      {
        id: 1,
        title: "Module 1: Instagram Growth Mastery & Reels Algorithm",
        lessonsCount: "15 Lessons",
        duration: "25 Hours",
        lessons: [
          { name: "Decoding the Instagram Algorithm & Account Optimization", duration: "45 mins", preview: true },
          { name: "Reels Viral Anatomy: Audio Trends, Hooks & Pacing", duration: "1 hr 10 mins", preview: true },
          { name: "Story Funnels & ManyChat Lead Generation Setup", duration: "1 hr", preview: false },
        ],
      },
      {
        id: 2,
        title: "Module 2: YouTube Channel Scaling & Audience Retention",
        lessonsCount: "15 Lessons",
        duration: "25 Hours",
        lessons: [
          { name: "YouTube Niche Selection & Keyword Search Intent", duration: "50 mins", preview: false },
          { name: "Designing Clickable Thumbnails with High CTR (10%+)", duration: "1 hr 20 mins", preview: false },
          { name: "Pacing & Pattern Interrupts for Maximum Watch Time", duration: "1 hr 15 mins", preview: false },
        ],
      },
      {
        id: 3,
        title: "Module 3: The Infinite Content Ideation System",
        lessonsCount: "14 Lessons",
        duration: "22 Hours",
        lessons: [
          { name: "Never Run Out of Ideas: The 5-Pillar Ideation Method", duration: "1 hr", preview: false },
          { name: "Competitor Analysis & Reddit/Twitter Mining for Hooks", duration: "55 mins", preview: false },
          { name: "Repurposing 1 Core Video into 10 Multi-Platform Formats", duration: "1 hr 10 mins", preview: false },
        ],
      },
      {
        id: 4,
        title: "Module 4: High-Converting Scriptwriting Masterclass",
        lessonsCount: "16 Lessons",
        duration: "28 Hours",
        lessons: [
          { name: "The 3-Second Viral Hook Vault & Psychology", duration: "1 hr 15 mins", preview: true },
          { name: "Short-Form Reel & Long-Form Video Scripting Frameworks", duration: "1 hr 30 mins", preview: false },
          { name: "Pitching Brands for Sponsored Deals & Sponsorship Pricing", duration: "1 hr", preview: false },
        ],
      },
    ],
  },

  "4": {
    title: "Knowledge Mastery",
    category: "Personal & Financial Growth",
    rating: 4.9,
    reviewsCount: 520,
    instructorName: "Vikramaditya Roy",
    instructorTitle: "Performance Coach & Affiliate Strategist",
    instructorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    instructorRating: 4.9,
    instructorStudents: "21,000+ Students",
    instructorExperience: "10+ Years Experience",
    instructorBio: "Vikramaditya Roy has scaled high-ticket affiliate funnels generating multi-lakh monthly recurring revenue and coached hundreds of leaders in personal charisma and executive presence.",
    lastUpdated: "September 2026",
    language: "Hindi & English",
    priceInr: "₹3,499",
    originalPriceInr: "₹6,999",
    discountPercentage: "50% OFF",
    previewImage: "/images/course1.jpg",
    duration: "03 Months",
    lessons: "45 Lessons",
    seats: "95 Enrolled",
    description: "Unlock high-income financial skills with Affiliate Marketing funnels and supercharge your self-worth and communication with elite Personality Development training.",
    whatYouWillLearn: [
      "1) Affiliate Marketing: High-ticket affiliate networks, traffic funnels & conversion landing pages.",
      "2) Personality Development: Unshakeable confidence, body language dominance & vocal tonality.",
      "Organic traffic generation through social channels without heavy ad budgets.",
      "Mindset engineering: Overcoming fear of speaking, camera shyness & imposter syndrome.",
      "Building trust and rapport with prospective buyers and high-value networks.",
      "Automating passive affiliate commissions with email and WhatsApp nurturing flows.",
    ],
    totalModules: "2 Modules",
    totalLessons: "45 Lessons",
    totalHours: "75 Hours Total",
    curriculum: [
      {
        id: 1,
        title: "Module 1: High-Ticket Affiliate Marketing Blueprint",
        lessonsCount: "23 Lessons",
        duration: "40 Hours",
        lessons: [
          { name: "Affiliate Marketing Fundamentals & Selecting High-Yield Niches", duration: "50 mins", preview: true },
          { name: "Building High-Converting Bridge Pages & Capture Pages", duration: "1 hr 20 mins", preview: true },
          { name: "Organic Traffic Strategies: Instagram, YouTube & Quora", duration: "1 hr 15 mins", preview: false },
          { name: "Email & WhatsApp Automation for 24/7 Passive Conversions", duration: "1 hr 30 mins", preview: false },
        ],
      },
      {
        id: 2,
        title: "Module 2: Personality Development & Executive Presence",
        lessonsCount: "22 Lessons",
        duration: "35 Hours",
        lessons: [
          { name: "The Psychology of Unshakeable Inner Confidence & Charisma", duration: "1 hr", preview: true },
          { name: "Body Language: Eye Contact, Posture & Spatial Authority", duration: "1 hr 10 mins", preview: false },
          { name: "Vocal Tonality, Pitch Control & Articulate Public Speaking", duration: "1 hr 25 mins", preview: false },
          { name: "Mastering Social Networking in High-Value Circles", duration: "1 hr", preview: false },
        ],
      },
    ],
  },

  "5": {
    title: "Business Mastery",
    category: "Entrepreneurship & Sales",
    rating: 5.0,
    reviewsCount: 640,
    instructorName: "Aditya Singhal",
    instructorTitle: "Serial Entrepreneur & Sales Strategist",
    instructorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    instructorRating: 5.0,
    instructorStudents: "19,500+ Students",
    instructorExperience: "13+ Years Experience",
    instructorBio: "Aditya Singhal has built and scaled multiple 7-figure businesses, leading enterprise sales teams to close multimillion-rupee contracts.",
    lastUpdated: "September 2026",
    language: "Hindi & English",
    priceInr: "₹4,999",
    originalPriceInr: "₹9,999",
    discountPercentage: "50% OFF",
    previewImage: "/images/course2.jpg",
    duration: "04 Months",
    lessons: "55 Lessons",
    seats: "105 Enrolled",
    description: "The complete playbook for high-performance business execution: practical problem solving, psychological sales techniques to sell anything, closing deals, and handling objections like a pro.",
    whatYouWillLearn: [
      "1) Problem Solving: Root cause analysis, first-principles thinking & business optimization.",
      "2) Sales Anything: Human buyer psychology, value proposition articulation & trust building.",
      "3) Sales Closing: High-ticket consultative closing, urgency triggers & agreement frameworks.",
      "4) Objection Handling: Overcoming 'too expensive', 'let me think', & price resistance easily.",
      "Discovery call frameworks that qualify prospects and lead directly to closed deals.",
      "Cold outreach, B2B lead generation scripts, and pipeline management.",
    ],
    totalModules: "4 Modules",
    totalLessons: "55 Lessons",
    totalHours: "95 Hours Total",
    curriculum: [
      {
        id: 1,
        title: "Module 1: First-Principles Problem Solving in Business",
        lessonsCount: "13 Lessons",
        duration: "20 Hours",
        lessons: [
          { name: "Root Cause Analysis & First-Principles Decision Making", duration: "45 mins", preview: true },
          { name: "Diagnosing Business Bottlenecks & Lean Optimization", duration: "1 hr 10 mins", preview: false },
          { name: "Strategic Goal Setting & Execution Systems", duration: "1 hr", preview: false },
        ],
      },
      {
        id: 2,
        title: "Module 2: Selling Anything to Anyone (Buyer Psychology)",
        lessonsCount: "14 Lessons",
        duration: "25 Hours",
        lessons: [
          { name: "The Emotional & Logical Triggers that Drive Purchases", duration: "1 hr 15 mins", preview: true },
          { name: "Positioning Offers with Irresistible Value Over Price", duration: "1 hr 20 mins", preview: false },
          { name: "Consultative Sales Discovery Questions that Sell Without Pushing", duration: "1 hr", preview: false },
        ],
      },
      {
        id: 3,
        title: "Module 3: High-Ticket Sales Closing Blueprint",
        lessonsCount: "14 Lessons",
        duration: "25 Hours",
        lessons: [
          { name: "The 7-Step High-Ticket Closing Script on Live Calls", duration: "1 hr 30 mins", preview: true },
          { name: "Creating Genuine Urgency & Risk-Reversal Guarantees", duration: "1 hr", preview: false },
          { name: "Securing Upfront Payments & Contract Finalization", duration: "50 mins", preview: false },
        ],
      },
      {
        id: 4,
        title: "Module 4: Master Objection Handling & Negotiation",
        lessonsCount: "14 Lessons",
        duration: "25 Hours",
        lessons: [
          { name: "Neutralizing 'I Need to Talk to My Partner / Think About It'", duration: "1 hr 15 mins", preview: false },
          { name: "Flipping Price Objections into ROI Conversations", duration: "1 hr 20 mins", preview: false },
          { name: "Win-Win Negotiation Frameworks for Enterprise Clients", duration: "1 hr", preview: false },
        ],
      },
    ],
  },

  "6": {
    title: "Facebook Ads Mastery",
    category: "Performance Marketing",
    rating: 4.9,
    reviewsCount: 580,
    instructorName: "Tanmay Deshmukh",
    instructorTitle: "Meta Certified Media Buyer & Performance Marketer",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    instructorRating: 4.9,
    instructorStudents: "16,000+ Students",
    instructorExperience: "8+ Years Experience",
    instructorBio: "Tanmay Deshmukh has managed over ₹5 Crore+ in Meta ad spend, delivering 4x–8x ROAS for e-commerce brands, real estate firms, and service agencies.",
    lastUpdated: "September 2026",
    language: "Hindi & English",
    priceInr: "₹3,999",
    originalPriceInr: "₹7,999",
    discountPercentage: "50% OFF",
    previewImage: "/images/course3.jpg",
    duration: "03 Months",
    lessons: "50 Lessons",
    seats: "130 Enrolled",
    description: "Launch, scale, and optimize highly profitable Facebook & Instagram Ads campaigns. Learn pixel tracking, CAPI, laser audience targeting, viral creative frameworks, and budget scaling strategies.",
    whatYouWillLearn: [
      "Meta Business Manager, Pixel setup, Conversions API (CAPI) & domain verification.",
      "Targeting strategies: Broad targeting, Interest stacking, Custom & Lookalike (LAL) Audiences.",
      "High-converting video ad creatives, static carousels & psychological ad copywriting.",
      "Campaign scaling frameworks (CBO vs ABO), horizontal & vertical scaling methods.",
      "Retargeting funnels that turn abandoned carts & profile visitors into paying customers.",
      "Diagnosing ad fatigue, troubleshooting disabled ad accounts & boosting ROAS.",
    ],
    totalModules: "4 Modules",
    totalLessons: "50 Lessons",
    totalHours: "85 Hours Total",
    curriculum: [
      {
        id: 1,
        title: "Module 1: Meta Ads Manager Setup & Technical Foundations",
        lessonsCount: "12 Lessons",
        duration: "20 Hours",
        lessons: [
          { name: "Business Manager Setup, Pixel & Conversions API (CAPI)", duration: "1 hr", preview: true },
          { name: "Event Match Quality & Custom Conversion Tracking", duration: "1 hr 15 mins", preview: true },
          { name: "Understanding Meta Campaign Objectives (Leads, Sales, Traffic)", duration: "45 mins", preview: false },
        ],
      },
      {
        id: 2,
        title: "Module 2: Laser Audience Targeting & Lookalike Magic",
        lessonsCount: "12 Lessons",
        duration: "20 Hours",
        lessons: [
          { name: "Broad vs Interest Targeting in the 2026 AI Algorithm", duration: "1 hr 10 mins", preview: false },
          { name: "Building 1%-5% Custom & Lookalike Audiences", duration: "1 hr", preview: false },
          { name: "Geographic, Demographic & Purchasing Behavior Filters", duration: "50 mins", preview: false },
        ],
      },
      {
        id: 3,
        title: "Module 3: High-Converting Ad Creatives & Copywriting",
        lessonsCount: "14 Lessons",
        duration: "25 Hours",
        lessons: [
          { name: "The Hook-Story-Offer Ad Copywriting Framework", duration: "1 hr 15 mins", preview: true },
          { name: "UGC Video Ads & Static Carousels that Stop the Scroll", duration: "1 hr 30 mins", preview: false },
          { name: "Split Testing (A/B Testing) Creatives for Maximum CTR", duration: "1 hr", preview: false },
        ],
      },
      {
        id: 4,
        title: "Module 4: Campaign Scaling & Retargeting Funnels",
        lessonsCount: "12 Lessons",
        duration: "20 Hours",
        lessons: [
          { name: "Advantage+ Campaign Budget Optimization (CBO) Scaling", duration: "1 hr 20 mins", preview: false },
          { name: "Multi-Tier Retargeting Funnels to Squeeze Max ROAS", duration: "1 hr 15 mins", preview: false },
          { name: "Account Health, Policy Compliance & Backup Setup", duration: "55 mins", preview: false },
        ],
      },
    ],
  },

  "7": {
    title: "Google Ads Mastery",
    category: "Search & PPC Advertising",
    rating: 4.9,
    reviewsCount: 490,
    instructorName: "Siddharth Rao",
    instructorTitle: "Google Ads Certified Specialist & PPC Consultant",
    instructorImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300",
    instructorRating: 4.9,
    instructorStudents: "14,800+ Students",
    instructorExperience: "10+ Years Experience",
    instructorBio: "Siddharth Rao has driven over 100,000+ qualified leads and millions in revenue across Google Search, YouTube Ads, and Performance Max campaigns.",
    lastUpdated: "September 2026",
    language: "Hindi & English",
    priceInr: "₹3,999",
    originalPriceInr: "₹7,999",
    discountPercentage: "50% OFF",
    previewImage: "/images/course-ai.jpg",
    duration: "03 Months",
    lessons: "50 Lessons",
    seats: "115 Enrolled",
    description: "Master Google Search Ads, YouTube Video Ads, Display Network, and Performance Max (PMax) campaigns with expert keyword research, negative keywords, smart bidding, and conversion tracking.",
    whatYouWillLearn: [
      "Google Ads account setup, MCC management & conversion tracking via GTM.",
      "High-intent keyword research (Exact, Phrase, Broad Match) & Negative Keyword Lists.",
      "Crafting high-Quality Score Responsive Search Ads with compelling ad extensions.",
      "Running high-converting YouTube Video Ads (In-Feed, Skippable & Non-Skippable).",
      "Performance Max (PMax) campaign setup, asset groups & AI audience signals.",
      "Bidding strategies: Target CPA, Target ROAS, Maximize Conversions & manual CPC.",
    ],
    totalModules: "4 Modules",
    totalLessons: "50 Lessons",
    totalHours: "85 Hours Total",
    curriculum: [
      {
        id: 1,
        title: "Module 1: Google Ads Foundations & High-Intent Keywords",
        lessonsCount: "12 Lessons",
        duration: "20 Hours",
        lessons: [
          { name: "Google Ads Interface, Account Architecture & Keyword Planner", duration: "1 hr", preview: true },
          { name: "Keyword Match Types, Search Term Reports & Negative Keywords", duration: "1 hr 15 mins", preview: true },
          { name: "Google Tag Manager (GTM) & Enhanced Conversion Tracking", duration: "1 hr 30 mins", preview: false },
        ],
      },
      {
        id: 2,
        title: "Module 2: Google Search Ads Architecture & Quality Score",
        lessonsCount: "14 Lessons",
        duration: "25 Hours",
        lessons: [
          { name: "Building Responsive Search Ads (RSA) with 10/10 Quality Score", duration: "1 hr 20 mins", preview: true },
          { name: "Ad Assets/Extensions: Sitelinks, Callouts & Structured Snippets", duration: "55 mins", preview: false },
          { name: "Landing Page Relevance & Conversion Rate Optimization", duration: "1 hr 10 mins", preview: false },
        ],
      },
      {
        id: 3,
        title: "Module 3: YouTube Video Ads & Display Network",
        lessonsCount: "12 Lessons",
        duration: "20 Hours",
        lessons: [
          { name: "YouTube Skippable In-Stream & Shorts Video Ad Setup", duration: "1 hr 15 mins", preview: false },
          { name: "Audience Placements, Custom Intent Segments & Topics", duration: "1 hr", preview: false },
          { name: "Google Display Network (GDN) Visual Banner Campaigns", duration: "50 mins", preview: false },
        ],
      },
      {
        id: 4,
        title: "Module 4: Performance Max (PMax) & Smart Bidding Strategies",
        lessonsCount: "12 Lessons",
        duration: "20 Hours",
        lessons: [
          { name: "PMax Campaign Setup, Asset Groups & Audience Signals", duration: "1 hr 25 mins", preview: false },
          { name: "Smart Bidding (tCPA, tROAS) vs Manual CPC Optimization", duration: "1 hr 10 mins", preview: false },
          { name: "Scaling Budgets & Client ROI Reporting Dashboards", duration: "1 hr", preview: false },
        ],
      },
    ],
  },
};

export default async function CourseDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const courseId = resolvedParams?.id || "1";
  const course = COURSES_MAP[courseId] || COURSES_MAP["1"];

  return (
    <div className="min-h-screen bg-[#F2F3F5] flex flex-col font-sans">
      {/* Navigation Header */}
      <Header />

      {/* Course Banner */}
      <CourseBanner
        title={course.title}
        category={course.category}
        rating={course.rating}
        reviewsCount={course.reviewsCount}
        instructorName={course.instructorName}
        lastUpdated={course.lastUpdated}
        language={course.language}
      />

      {/* Main Content & Sticky Sidebar Grid */}
      <main className="flex-1 container py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Overview & Curriculum (lg:col-span-8) */}
          <div className="lg:col-span-8">
            <CourseOverview
              description={course.description}
              whatYouWillLearn={course.whatYouWillLearn}
              totalModules={course.totalModules}
              totalLessons={course.totalLessons}
              totalHours={course.totalHours}
              curriculum={course.curriculum}
              instructorName={course.instructorName}
              instructorTitle={course.instructorTitle}
              instructorImage={course.instructorImage}
              instructorRating={course.instructorRating}
              instructorStudents={course.instructorStudents}
              instructorExperience={course.instructorExperience}
              instructorBio={course.instructorBio}
            />
          </div>

          {/* Right Column: Sticky Sidebar with INR Pricing (lg:col-span-4) */}
          <div className="lg:col-span-4 relative lg:sticky lg:top-24 h-fit">
            <CourseSidebar
              priceInr={course.priceInr}
              originalPriceInr={course.originalPriceInr}
              discountPercentage={course.discountPercentage}
              previewImage={course.previewImage}
              duration={course.duration}
              lessons={course.lessons}
              seats={course.seats}
              language={course.language}
              courseTitle={course.title}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
