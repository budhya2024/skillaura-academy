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
    title: "AI Mastery",
    category: "Artificial Intelligence",
    rating: 4.9,
    reviewsCount: 480,
    instructorName: "Aryan Sharma",
    instructorTitle: "AI Research Lead & Tech Consultant",
    instructorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    instructorRating: 4.9,
    instructorStudents: "18,900+ Students",
    instructorExperience: "8+ Years Experience",
    instructorBio: "Aryan Sharma has engineered scalable AI models for top tech firms and coached over 18,000 students in AI workflows, prompt engineering, and LLM automation.",
    lastUpdated: "September 2026",
    language: "English & Hindi",
    priceInr: "₹4,999",
    originalPriceInr: "₹9,999",
    discountPercentage: "50% OFF",
    previewImage: "/images/course-ai.jpg",
    duration: "06 Months",
    lessons: "85 Lessons",
    seats: "120 Enrolled",
    description: "Become an unstoppable AI powerhouse. Master ChatGPT prompt engineering, Midjourney image generation, Claude AI workflows, automated agentic pipelines, custom GPTs, and AI tools that automate business operations.",
    whatYouWillLearn: [
      "Master ChatGPT 4o, Claude 3.5, & DeepSeek for advanced business & coding workflows.",
      "Generate cinematic visual assets and logos using Midjourney v6 & Stable Diffusion.",
      "Build automated AI agents with Make.com, Zapier, and Python API integrations.",
      "Design high-converting prompts with structured frameworks for any domain.",
      "Monetize AI skills through freelancing, SaaS products, and consulting.",
      "Stay ahead of future AI developments with ethical guidelines and real-world projects.",
    ],
    totalModules: "4 Modules",
    totalLessons: "85 Lessons",
    totalHours: "140 Hours Total",
    curriculum: [
      {
        id: 1,
        title: "Module 1: AI Foundations & Advanced Prompting Techniques",
        lessonsCount: "20 Lessons",
        duration: "30 Hours",
        lessons: [
          { name: "Introduction to Generative AI & Large Language Models", duration: "45 mins", preview: true },
          { name: "Mastering ChatGPT Frameworks & Zero-Shot/Few-Shot Prompting", duration: "1 hr 15 mins", preview: true },
          { name: "Advanced Context Windowing & System Prompts", duration: "50 mins", preview: false },
        ],
      },
      {
        id: 2,
        title: "Module 2: AI Art & Visual Creation (Midjourney & DALL-E 3)",
        lessonsCount: "22 Lessons",
        duration: "35 Hours",
        lessons: [
          { name: "Midjourney v6 Parameters, Style Injections & Lighting", duration: "1 hr 10 mins", preview: false },
          { name: "Creating Photorealistic Images & Brand Visual Assets", duration: "1 hr", preview: false },
        ],
      },
      {
        id: 3,
        title: "Module 3: AI Automation & Agentic Workflow Engineering",
        lessonsCount: "23 Lessons",
        duration: "40 Hours",
        lessons: [
          { name: "Automating Daily Tasks with Make.com & OpenAI APIs", duration: "1 hr 30 mins", preview: false },
          { name: "Building Custom AI Chatbots & Customer Support Agents", duration: "1 hr 15 mins", preview: false },
        ],
      },
      {
        id: 4,
        title: "Module 4: Monetization & Capstone Project",
        lessonsCount: "20 Lessons",
        duration: "35 Hours",
        lessons: [
          { name: "Launch Your AI Consultancy or Freelance Agency", duration: "1 hr 45 mins", preview: false },
          { name: "Final Capstone AI System Deployment", duration: "2 hrs", preview: false },
        ],
      },
    ],
  },

  "2": {
    title: "Poster & Logo Design Mastery",
    category: "Graphic Design",
    rating: 4.8,
    reviewsCount: 390,
    instructorName: "Rohan Verma",
    instructorTitle: "Creative Director & Brand Strategist",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    instructorRating: 4.8,
    instructorStudents: "14,200+ Students",
    instructorExperience: "11+ Years Experience",
    instructorBio: "Rohan Verma is an award-winning graphic designer who has crafted brand identities for over 200 international clients and agencies.",
    lastUpdated: "August 2026",
    language: "English & Hindi",
    priceInr: "₹3,499",
    originalPriceInr: "₹6,999",
    discountPercentage: "50% OFF",
    previewImage: "/images/course-design.jpg",
    duration: "04 Months",
    lessons: "64 Lessons",
    seats: "100 Enrolled",
    description: "Transform into a master graphic designer. Learn color theory, typography, vector logo craftsmanship in Illustrator, movie poster manipulation in Photoshop, and client brand identity presentation.",
    whatYouWillLearn: [
      "Master Adobe Photoshop & Illustrator for high-end client deliverables.",
      "Understand grid systems, typography pairing, and optical visual balance.",
      "Design minimalist, memorable vector logos and complete brand style guides.",
      "Create high-impact promotional posters, social media banners, and print graphics.",
      "Prepare print-ready files (CMYK, bleed settings, vector export standards).",
      "Pitch logo concepts professionally and handle client revisions smoothly.",
    ],
    totalModules: "4 Modules",
    totalLessons: "64 Lessons",
    totalHours: "100 Hours Total",
    curriculum: [
      {
        id: 1,
        title: "Module 1: Design Fundamentals & Vector Mastery",
        lessonsCount: "16 Lessons",
        duration: "20 Hours",
        lessons: [
          { name: "Color Theory & Typography Psychology", duration: "40 mins", preview: true },
          { name: "Illustrator Pen Tool & Shape Builder Mastery", duration: "1 hr 10 mins", preview: true },
        ],
      },
      {
        id: 2,
        title: "Module 2: Professional Logo Design & Brand Identity",
        lessonsCount: "18 Lessons",
        duration: "30 Hours",
        lessons: [
          { name: "Logo Conception: Sketching to Vector", duration: "1 hr", preview: false },
          { name: "Creating Complete Brand Guidelines & Mockups", duration: "1 hr 20 mins", preview: false },
        ],
      },
      {
        id: 3,
        title: "Module 3: Movie Poster & Advertising Graphics in Photoshop",
        lessonsCount: "16 Lessons",
        duration: "25 Hours",
        lessons: [
          { name: "Photo Manipulation & Composite Blending", duration: "1 hr 30 mins", preview: false },
          { name: "Lighting, Dodge & Burn, and Color Grading Posters", duration: "1 hr 15 mins", preview: false },
        ],
      },
      {
        id: 4,
        title: "Module 4: Client Portfolio & Design Business Setup",
        lessonsCount: "14 Lessons",
        duration: "25 Hours",
        lessons: [
          { name: "Building a Behance & Dribbble Portfolio", duration: "1 hr", preview: false },
          { name: "Client Pricing & Contract Strategies", duration: "1 hr 10 mins", preview: false },
        ],
      },
    ],
  },

  "3": {
    title: "Attraction Mastery",
    category: "Personal Branding",
    rating: 4.9,
    reviewsCount: 510,
    instructorName: "Vikramaditya Roy",
    instructorTitle: "Executive Communication & Mindset Coach",
    instructorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    instructorRating: 4.9,
    instructorStudents: "22,000+ Students",
    instructorExperience: "12+ Years Experience",
    instructorBio: "Vikramaditya Roy has advised CEOs, influencers, and high-net-worth founders on personal authority, gravitas, and high-stakes negotiation.",
    lastUpdated: "September 2026",
    language: "English & Hindi",
    priceInr: "₹3,999",
    originalPriceInr: "₹7,999",
    discountPercentage: "50% OFF",
    previewImage: "/images/course-attraction.jpg",
    duration: "03 Months",
    lessons: "50 Lessons",
    seats: "90 Enrolled",
    description: "Unlock magnetic charisma, body language mastery, high-status voice modulation, personal branding psychology, and social dynamics to naturally attract opportunities and build strong networks.",
    whatYouWillLearn: [
      "Develop magnetic personal presence, confidence, and unshakeable poise.",
      "Master non-verbal communication, posture, eye contact, and spatial dominance.",
      "Refine voice tonality, pacing, and storytelling for public speaking & pitch meetings.",
      "Build an attractive personal brand online and offline.",
      "Understand human motivation, social proof, and influence dynamics.",
      "Overcome imposter syndrome and establish instant rapport with high-value individuals.",
    ],
    totalModules: "3 Modules",
    totalLessons: "50 Lessons",
    totalHours: "80 Hours Total",
    curriculum: [
      {
        id: 1,
        title: "Module 1: High-Status Mindset & Presence Dynamics",
        lessonsCount: "15 Lessons",
        duration: "25 Hours",
        lessons: [
          { name: "The Psychology of Natural Attraction & Authority", duration: "45 mins", preview: true },
          { name: "Body Language: Posture, Gaze & Non-Verbal Signals", duration: "1 hr", preview: true },
        ],
      },
      {
        id: 2,
        title: "Module 2: Vocal Mastery & Storytelling Dynamics",
        lessonsCount: "18 Lessons",
        duration: "30 Hours",
        lessons: [
          { name: "Voice Pitch, Tonality, & Pausing for Maximum Impact", duration: "1 hr 15 mins", preview: false },
          { name: "Crafting Compelling Personal Stories", duration: "55 mins", preview: false },
        ],
      },
      {
        id: 3,
        title: "Module 3: Social Networking & High-Value Relationship Building",
        lessonsCount: "17 Lessons",
        duration: "25 Hours",
        lessons: [
          { name: "Networking at Executive Events & High-Tier Circles", duration: "1 hr 20 mins", preview: false },
          { name: "Long-Term Relationship Nurturing", duration: "1 hr", preview: false },
        ],
      },
    ],
  },

  "4": {
    title: "Content Creation Mastery",
    category: "Social Media",
    rating: 4.9,
    reviewsCount: 620,
    instructorName: "Neha Kapoor",
    instructorTitle: "Social Growth Lead & Content Strategist",
    instructorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300",
    instructorRating: 4.9,
    instructorStudents: "30,000+ Students",
    instructorExperience: "9+ Years Experience",
    instructorBio: "Neha Kapoor has grown content accounts past 1 Million+ followers and advised top creator brands on monetization.",
    lastUpdated: "September 2026",
    language: "English & Hindi",
    priceInr: "₹4,499",
    originalPriceInr: "₹8,999",
    discountPercentage: "50% OFF",
    previewImage: "/images/course-content.jpg",
    duration: "04 Months",
    lessons: "72 Lessons",
    seats: "150 Enrolled",
    description: "Step-by-step framework to plan, record, script, edit, and scale content across Instagram Reels, YouTube, TikTok, and LinkedIn with viral hook formulas and automated posting systems.",
    whatYouWillLearn: [
      "Craft viral hooks, retention-focused scripts, and high-converting CTAs.",
      "Studio setup: lighting, mic technique, camera angles on smartphone & DSLR.",
      "Rapid content batching methods to produce 30 days of content in 1 weekend.",
      "Algorithm secrets for Instagram Reels, YouTube Shorts, and LinkedIn posts.",
      "Monetize content via brand deals, digital products, and affiliate funnels.",
      "Analytics tracking and organic audience growth strategies.",
    ],
    totalModules: "4 Modules",
    totalLessons: "72 Lessons",
    totalHours: "110 Hours Total",
    curriculum: [
      {
        id: 1,
        title: "Module 1: Content Ideation & Viral Scriptwriting",
        lessonsCount: "18 Lessons",
        duration: "25 Hours",
        lessons: [
          { name: "The 3-Second Viral Hook Architecture", duration: "45 mins", preview: true },
          { name: "Scriptwriting Templates for Short-Form & Long-Form Video", duration: "1 hr 10 mins", preview: true },
        ],
      },
      {
        id: 2,
        title: "Module 2: Creator Studio Setup & Filming",
        lessonsCount: "18 Lessons",
        duration: "25 Hours",
        lessons: [
          { name: "Lighting Techniques: 3-Point Setup on a Budget", duration: "1 hr", preview: false },
          { name: "Audio Engineering & Microphone Selection", duration: "50 mins", preview: false },
        ],
      },
      {
        id: 3,
        title: "Module 3: Editing Workflow & Platform Algorithms",
        lessonsCount: "20 Lessons",
        duration: "35 Hours",
        lessons: [
          { name: "CapCut & Premiere Pro for Fast-Paced Reel Edits", duration: "1 hr 25 mins", preview: false },
          { name: "Decoding the Instagram & YouTube Algorithms", duration: "1 hr", preview: false },
        ],
      },
      {
        id: 4,
        title: "Module 4: Monetization & Brand Partnerships",
        lessonsCount: "16 Lessons",
        duration: "25 Hours",
        lessons: [
          { name: "Pitching Brands for Sponsored Content", duration: "1 hr 15 mins", preview: false },
          { name: "Building Digital Products & Course Funnels", duration: "1 hr 30 mins", preview: false },
        ],
      },
    ],
  },

  "5": {
    title: "Video Editing Mastery",
    category: "Media Production",
    rating: 5.0,
    reviewsCount: 740,
    instructorName: "Kabir Mehta",
    instructorTitle: "Senior Post-Production Supervisor",
    instructorImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300",
    instructorRating: 5.0,
    instructorStudents: "25,000+ Students",
    instructorExperience: "14+ Years Experience",
    instructorBio: "Kabir Mehta has edited commercial campaigns for global brands, documentaries, and viral YouTube series.",
    lastUpdated: "September 2026",
    language: "English & Hindi",
    priceInr: "₹4,999",
    originalPriceInr: "₹9,999",
    discountPercentage: "50% OFF",
    previewImage: "/images/course-video.jpg",
    duration: "05 Months",
    lessons: "90 Lessons",
    seats: "110 Enrolled",
    description: "Become an elite video editor. Master Premiere Pro, DaVinci Resolve, After Effects motion graphics, cinematic color grading, sound design, and high-retention pacing.",
    whatYouWillLearn: [
      "Master Premiere Pro & DaVinci Resolve timeline shortcuts & proxy workflows.",
      "Cinematic Color Grading (LUTs, wheels, primary & secondary correction).",
      "Sound design mastery (foley, sound effects, audio ducking, equalization).",
      "After Effects motion graphics, keyframing, typography, and visual FX.",
      "High-retention editing style for YouTube, ads, and cinematic films.",
      "Client project workflows, file management, and high-bitrate rendering.",
    ],
    totalModules: "4 Modules",
    totalLessons: "90 Lessons",
    totalHours: "150 Hours Total",
    curriculum: [
      {
        id: 1,
        title: "Module 1: Premiere Pro Mastery & Rough Cut Speed",
        lessonsCount: "22 Lessons",
        duration: "35 Hours",
        lessons: [
          { name: "Interface, Timeline Shortcuts & Organization", duration: "50 mins", preview: true },
          { name: "Pacing & Storytelling Cut Techniques", duration: "1 hr 15 mins", preview: true },
        ],
      },
      {
        id: 2,
        title: "Module 2: Sound Design & Audio Polish",
        lessonsCount: "20 Lessons",
        duration: "30 Hours",
        lessons: [
          { name: "Audio Equalization, Compression, & Noise Reduction", duration: "1 hr", preview: false },
          { name: "Building Immersive Soundscapes with SFX & Music", duration: "1 hr 20 mins", preview: false },
        ],
      },
      {
        id: 3,
        title: "Module 3: DaVinci Resolve Color Grading Masterclass",
        lessonsCount: "24 Lessons",
        duration: "45 Hours",
        lessons: [
          { name: "Node Trees, Color Wheels & LUT Management", duration: "1 hr 30 mins", preview: false },
          { name: "Skin Tone Correction & Cinematic Film Looks", duration: "1 hr 45 mins", preview: false },
        ],
      },
      {
        id: 4,
        title: "Module 4: Motion Graphics & Client Deliverables",
        lessonsCount: "24 Lessons",
        duration: "40 Hours",
        lessons: [
          { name: "After Effects Lower Thirds & Kinetic Typography", duration: "1 hr 20 mins", preview: false },
          { name: "Export Formats, Bitrates, & Commercial Delivery", duration: "1 hr", preview: false },
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
          <div className="lg:col-span-4">
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
