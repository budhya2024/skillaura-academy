export interface Lesson {
  id: string;
  name: string;
  duration: string;
  completed: boolean;
  description?: string;
  resources?: { name: string; size: string }[];
}

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  lessons: Lesson[];
}

export interface EnrolledCourse {
  id: number;
  title: string;
  category: string;
  image: string;
  instructor: string;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  status: "in-progress" | "completed";
  modules: CourseModule[];
}

export const ENROLLED_COURSES_DATA: EnrolledCourse[] = [
  {
    id: 1,
    title: "Business Mastery & High-Ticket Closing",
    category: "Business & Sales",
    image: "/images/course2.jpg",
    instructor: "SkillAura Master Team",
    totalLessons: 8,
    completedLessons: 5,
    duration: "70 Hours",
    status: "in-progress",
    modules: [
      {
        id: "m1",
        title: "Module 1: Psychological Selling Fundamentals",
        duration: "12 Hours",
        lessons: [
          {
            id: "l1-1",
            name: "The Psychology of Buying Decisions",
            duration: "45 mins",
            completed: true,
            description: "Understand core buyer emotions, subconscious friction points, and value perception.",
            resources: [{ name: "Buyer-Psychology-Guide.pdf", size: "2.4 MB" }],
          },
          {
            id: "l1-2",
            name: "Building Instant Rapport & Trust",
            duration: "50 mins",
            completed: true,
            description: "Master tone, pacing, and conversation openers that establish authority on calls.",
            resources: [{ name: "Rapport-Scripts.pdf", size: "1.8 MB" }],
          },
          {
            id: "l1-3",
            name: "Identifying Customer Pain Points & Urgency",
            duration: "55 mins",
            completed: true,
            description: "Effective questioning frameworks to uncover urgency and budget capabilities.",
            resources: [{ name: "Discovery-Questions.pdf", size: "1.2 MB" }],
          },
        ],
      },
      {
        id: "m2",
        title: "Module 2: High-Ticket Objection Elimination",
        duration: "18 Hours",
        lessons: [
          {
            id: "l2-1",
            name: "Mastering the 'Too Expensive' Objection",
            duration: "40 mins",
            completed: true,
            description: "Reframing price into return on investment and demonstrating high daily value.",
          },
          {
            id: "l2-2",
            name: "Closing Frameworks for Active Direct Sales",
            duration: "60 mins",
            completed: true,
            description: "Live step-by-step objection handling and closing formulas for high-ticket offers.",
            resources: [{ name: "Closing-Formulas.pdf", size: "3.1 MB" }],
          },
          {
            id: "l2-3",
            name: "Creating Urgency Without False Hype",
            duration: "35 mins",
            completed: false,
            description: "Ethical urgency tactics and authentic onboarding capacity management.",
          },
        ],
      },
      {
        id: "m3",
        title: "Module 3: Scaling Direct Conversions",
        duration: "20 Hours",
        lessons: [
          {
            id: "l3-1",
            name: "Automating Follow-up Workflows & CRM",
            duration: "45 mins",
            completed: false,
            description: "Setting up WhatsApp & email sequences that recover interested prospects.",
          },
          {
            id: "l3-2",
            name: "Live Roleplay & Call Breakdown Analysis",
            duration: "90 mins",
            completed: false,
            description: "Real closed deal recordings reviewed line-by-line with actionable commentary.",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Video Editing Mastery & Cinematic Reels",
    category: "Video Editing",
    image: "/images/video.jpeg",
    instructor: "Alex Rivera",
    totalLessons: 7,
    completedLessons: 4,
    duration: "100 Hours",
    status: "in-progress",
    modules: [
      {
        id: "m2-1",
        title: "Module 1: Mobile & Desktop Workflows (Premiere & CapCut)",
        duration: "20 Hours",
        lessons: [
          {
            id: "l2-1-1",
            name: "Timeline Setup and Keyframe Animation",
            duration: "50 mins",
            completed: true,
            description: "Optimal aspect ratios, project canvas settings, and smooth keyframe curves.",
            resources: [{ name: "CapCut-Presets.zip", size: "18 MB" }],
          },
          {
            id: "l2-1-2",
            name: "Sound Design & Cinematic Impact Effects",
            duration: "60 mins",
            completed: true,
            description: "Layering whooshes, risers, and sound hits to drive viewer retention.",
            resources: [{ name: "Sound-Effects-Pack.zip", size: "45 MB" }],
          },
          {
            id: "l2-1-3",
            name: "Color Grading with Pro LUTs",
            duration: "45 mins",
            completed: true,
            description: "Exposure balance, skin tones, and applying cinematic color profiles.",
          },
        ],
      },
      {
        id: "m2-2",
        title: "Module 2: Viral Hooks & Fast Paced Retention Edits",
        duration: "30 Hours",
        lessons: [
          {
            id: "l2-2-1",
            name: "First 3-Second Retention Mastery",
            duration: "40 mins",
            completed: true,
            description: "Creating visual patterns and hooks that stop users from scrolling away.",
          },
          {
            id: "l2-2-2",
            name: "Dynamic Typography & Motion Titles",
            duration: "55 mins",
            completed: false,
            description: "Word-by-word animated captions, highlight boxes, and animated graphics.",
          },
        ],
      },
      {
        id: "m2-3",
        title: "Module 3: Client Reels Delivery & Pricing",
        duration: "25 Hours",
        lessons: [
          {
            id: "l2-3-1",
            name: "Repurposing Long Podcasts into Viral Shorts",
            duration: "65 mins",
            completed: false,
            description: "Extracting high-impact moments and formatting for vertical platforms.",
          },
          {
            id: "l2-3-2",
            name: "Pitching Video Editing Retainers to Brands",
            duration: "50 mins",
            completed: false,
            description: "How to package monthly retainers and deliver client files efficiently.",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Poster, Brand Identity & Logo Design Mastery",
    category: "Graphic Design",
    image: "/images/course-design.jpg",
    instructor: "Priya Sharma",
    totalLessons: 6,
    completedLessons: 6,
    duration: "80 Hours",
    status: "completed",
    modules: [
      {
        id: "m3-1",
        title: "Module 1: Visual Design Theory & Vector Geometry",
        duration: "25 Hours",
        lessons: [
          {
            id: "l3-1-1",
            name: "Color Harmony, Contrast & Typography Hierarchy",
            duration: "60 mins",
            completed: true,
            description: "Selecting clean palettes and readable font combinations for brand systems.",
          },
          {
            id: "l3-1-2",
            name: "Vector Logo Crafting in Illustrator & Canva",
            duration: "75 mins",
            completed: true,
            description: "Pen tool mastery, grid systems, and exporting sharp vector marks.",
          },
        ],
      },
      {
        id: "m3-2",
        title: "Module 2: Client Brand Guidelines & Portfolio Delivery",
        duration: "35 Hours",
        lessons: [
          {
            id: "l3-2-1",
            name: "Exporting Multi-Asset Brand Guidelines",
            duration: "60 mins",
            completed: true,
            description: "Compiling brand manuals, logo variations, and color specifications.",
          },
          {
            id: "l3-2-2",
            name: "Live Client Case Study & Mockups",
            duration: "90 mins",
            completed: true,
            description: "Creating realistic 3D mockups for merchandise, cards, and digital assets.",
          },
        ],
      },
      {
        id: "m3-3",
        title: "Module 3: Freelance Portfolio & Client Acquisition",
        duration: "20 Hours",
        lessons: [
          {
            id: "l3-3-1",
            name: "Building a Portfolio That Attracts High-Paying Clients",
            duration: "55 mins",
            completed: true,
            description: "Curating case studies and crafting project stories that win freelance deals.",
          },
          {
            id: "l3-3-2",
            name: "Pricing Logo & Identity Packages Confidently",
            duration: "60 mins",
            completed: true,
            description: "Value pricing strategies and contract essentials for design projects.",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Content Creation Mastery & Viral Scripting",
    category: "Social Media",
    image: "/images/course-content.jpg",
    instructor: "Rahul Verma",
    totalLessons: 6,
    completedLessons: 2,
    duration: "65 Hours",
    status: "in-progress",
    modules: [
      {
        id: "m4-1",
        title: "Module 1: Audience Research & Content Architecture",
        duration: "18 Hours",
        lessons: [
          {
            id: "l4-1-1",
            name: "Reverse-Engineering 1M+ View Reels & Shorts",
            duration: "45 mins",
            completed: true,
            description: "Analyzing pacing, topic selection, and audio triggers that fuel algorithmic reach.",
          },
          {
            id: "l4-1-2",
            name: "High-Retention Storytelling Frameworks",
            duration: "50 mins",
            completed: true,
            description: "Condensing stories into engaging 60-second scripts with clear calls to action.",
          },
        ],
      },
      {
        id: "m4-2",
        title: "Module 2: Monetization & Sponsor Partnerships",
        duration: "22 Hours",
        lessons: [
          {
            id: "l4-2-1",
            name: "Pitching Brands for Sponsored Content",
            duration: "40 mins",
            completed: false,
            description: "Creating simple media kits and pitching brand marketing managers directly.",
          },
          {
            id: "l4-2-2",
            name: "Affiliate Funnels & Automated Link Delivery",
            duration: "45 mins",
            completed: false,
            description: "Directing viewers into automated recommendation funnels that earn commission.",
          },
        ],
      },
      {
        id: "m4-3",
        title: "Module 3: Omnichannel Content Scaling",
        duration: "25 Hours",
        lessons: [
          {
            id: "l4-3-1",
            name: "Cross-Posting to YouTube Shorts, Instagram & LinkedIn",
            duration: "55 mins",
            completed: false,
            description: "Repurposing one core video idea across platforms without duplicating work.",
          },
          {
            id: "l4-3-2",
            name: "Building an Active Community of Loyal Followers",
            duration: "50 mins",
            completed: false,
            description: "Engagement tactics that turn passive viewers into repeat buyers and subscribers.",
          },
        ],
      },
    ],
  },
];
