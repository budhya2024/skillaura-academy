export interface HeroSlideItem {
  id: number;
  tagline: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  bgImage: string;
  primaryBtnText: string;
  primaryBtnHref: string;
  secondaryBtnText: string;
  secondaryBtnHref: string;
}

export interface CounterMetricItem {
  id: number;
  count: string;
  label: string;
}

export interface AboutContentConfig {
  badgeYears: string;
  badgeSubtitle: string;
  headlinePrefix: string;
  headlineHighlight: string;
  description: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  calloutTitle: string;
  calloutSubtitle: string;
  calloutPhone: string;
}

export interface FaqContentItem {
  id: number;
  question: string;
  answer: string;
}

export interface TestimonialContentItem {
  id: number;
  name: string;
  initials: string;
  role: string;
  enrolledCourse: string;
  quote: string;
  avatarBg?: string;
  rating: number;
}

export interface AnnouncementConfig {
  active: boolean;
  headline: string;
  actionText: string;
  actionHref: string;
}

export interface PromoVoucherConfig {
  couponCode: string;
  discountPercent: number;
  active: boolean;
  description: string;
}

export interface ContactInfoConfig {
  supportWhatsApp: string;
  supportPhone: string;
  supportEmail: string;
  address: string;
  workingHours: string;
  facebookUrl: string;
  instagramUrl: string;
  telegramUrl: string;
  youtubeUrl: string;
}

export interface WebsiteCmsData {
  announcement: AnnouncementConfig;
  promoVoucher: PromoVoucherConfig;
  heroSlides: HeroSlideItem[];
  counterMetrics: CounterMetricItem[];
  aboutSection: AboutContentConfig;
  faqs: FaqContentItem[];
  testimonials: TestimonialContentItem[];
  contactInfo: ContactInfoConfig;
}

export const DEFAULT_CMS_DATA: WebsiteCmsData = {
  announcement: {
    active: false,
    headline: "🔥 Special Launch Offer: Earn up to 70% Direct Commission on All Student Enrollments — Start Learning Today!",
    actionText: "ENROLL NOW",
    actionHref: "/#courses",
  },
  promoVoucher: {
    couponCode: "SKILL50",
    discountPercent: 50,
    active: true,
    description: "Flat 50% Off on all practical masterclasses for early enrolled students.",
  },
  heroSlides: [
    {
      id: 1,
      tagline: "100% FREELANCING & CLIENT JOB OPPORTUNITY GUARANTEE",
      titlePrefix: "Master In-Demand Skills & ",
      titleHighlight: "Earn",
      titleSuffix: " Online",
      description:
        "Skill Aura Academy provides guaranteed freelancing & client job opportunities to every enrolled student who masters high-income practical skills in Video Editing, Design, Content Creation, Performance Ads, and Sales.",
      bgImage: "/images/hero1.jpg",
      primaryBtnText: "ABOUT MORE",
      primaryBtnHref: "/about",
      secondaryBtnText: "EXPLORE COURSES",
      secondaryBtnHref: "/#courses",
    },
    {
      id: 2,
      tagline: "LEARN PRACTICAL SKILLS • GET CLIENT PROJECTS",
      titlePrefix: "Launch Your High-Income ",
      titleHighlight: "Freelancing",
      titleSuffix: " Career",
      description:
        "Join over 25,000+ ambitious students. Learn 100% online through live hands-on projects, industry tools, and dedicated 1-on-1 freelancing client acquisition mentorship.",
      bgImage: "/images/hero2.jpg",
      primaryBtnText: "EXPLORE COURSES",
      primaryBtnHref: "/#courses",
      secondaryBtnText: "APPLY NOW",
      secondaryBtnHref: "/#courses",
    },
    {
      id: 3,
      tagline: "COMMISSION & LEARNING PLATFORM",
      titlePrefix: "Empowering Students to Become ",
      titleHighlight: "Independent",
      titleSuffix: " Earners",
      description:
        "Develop high-demand skills while earning through our affiliate system. Step-by-step guidance from industry experts with 15+ years of real-world coaching experience.",
      bgImage: "/images/hero3.jpg",
      primaryBtnText: "START LEARNING",
      primaryBtnHref: "/#courses",
      secondaryBtnText: "CONTACT US",
      secondaryBtnHref: "/contact",
    },
  ],
  counterMetrics: [
    {
      id: 1,
      count: "25,000+",
      label: "Students Guided",
    },
    {
      id: 2,
      count: "7+",
      label: "Practical Masterclasses",
    },
    {
      id: 3,
      count: "100%",
      label: "Online Practical System",
    },
    {
      id: 4,
      count: "98%",
      label: "Client Work Success Rate",
    },
  ],
  aboutSection: {
    badgeYears: "15+ Years Of",
    badgeSubtitle: "Quality Education Service",
    headlinePrefix: "Learn High-Income Skills. ",
    headlineHighlight: "Get Freelance Work.",
    description:
      "Skill Aura Academy is a 100% online practical academy. Our mission is simple: teach in-demand digital skills and provide direct freelancing job & client project opportunities for every dedicated student.",
    feature1Title: "100% Practical Curriculum",
    feature1Desc: "Live projects, industry workflow templates, and hands-on exercises in every masterclass.",
    feature2Title: "Direct Client & Freelance Support",
    feature2Desc: "Our dedicated mentorship cell connects students directly to paying client gigs and job roles.",
    calloutTitle: "Direct WhatsApp Line",
    calloutSubtitle: "Instant Student Support",
    calloutPhone: "+91 91442 88641",
  },
  faqs: [
    {
      id: 1,
      question: "How does Skill Aura Academy provide freelancing job opportunities?",
      answer:
        "Upon completing your practical masterclass and mastering the required tools, our dedicated mentorship team directly connects you to live client projects, gig assignments, and remote freelance opportunities to help you start earning immediately.",
    },
    {
      id: 2,
      question: "Are the masterclasses conducted 100% online?",
      answer:
        "Yes! All 7 masterclasses are delivered through our 100% online practical learning system. You can join live interactive sessions or watch high-definition recordings flexibly from your mobile phone or laptop at any time.",
    },
    {
      id: 3,
      question: "How do I enroll and confirm my admission?",
      answer:
        "Simply click the 'ENROLL NOW' button on any course. Fill out the short registration form, and your enrollment request will be processed immediately with instant WhatsApp confirmation and support from our admissions team.",
    },
    {
      id: 4,
      question: "Will I receive an accredited certification upon completion?",
      answer:
        "Yes! After successfully completing all module assignments and the capstone portfolio project, you will receive a verified Skill Aura Academy Certificate of Completion to showcase to global clients.",
    },
    {
      id: 5,
      question: "What kind of student support and mentorship is provided?",
      answer:
        "You receive direct 1-on-1 problem-solving support, WhatsApp community access, live feedback on client work, and personal guidance from Founder & CEO Subha Kumar Mahata.",
    },
  ],
  testimonials: [
    {
      id: 1,
      name: "Rahul Sharma",
      initials: "RS",
      role: "Freelance Video Editor",
      enrolledCourse: "Video Editing Mastery",
      quote:
        "After completing the Video Editing Mastery masterclass in Premiere Pro & CapCut, the academy connected me directly to my first freelance clients. I am now editing full-time from home!",
      rating: 5,
    },
    {
      id: 2,
      name: "Priya Patel",
      initials: "PP",
      role: "Graphic & Logo Designer",
      enrolledCourse: "Poster & Logo Design",
      quote:
        "Learning vector branding in Illustrator and social creatives in Photoshop gave me an elite portfolio. The 1-on-1 mentorship and client assistance were truly game-changing!",
      rating: 5,
    },
    {
      id: 3,
      name: "Ankit Verma",
      initials: "AV",
      role: "Content Creator & YouTuber",
      enrolledCourse: "Content Creation Mastery",
      quote:
        "Skill Aura Academy taught me algorithmic video retention, scripting, and mobile production. My channel scaled from 2,000 to 85,000 subscribers in less than four months!",
      rating: 5,
    },
    {
      id: 4,
      name: "Sneha Mukherjee",
      initials: "SM",
      role: "Performance Media Buyer",
      enrolledCourse: "Facebook & Meta Ads Mastery",
      quote:
        "Generating profitable ROAS for e-commerce brands was my dream. With Subha Sir's live campaign audits, I now manage ₹2.5 Lakhs in monthly ad budgets for local businesses.",
      rating: 5,
    },
  ],
  contactInfo: {
    supportWhatsApp: "+91 91442 88641",
    supportPhone: "+91 91442 88641",
    supportEmail: "skillauraacademy.in@gmail.com",
    address: "Kharagpur, Paschim Medinipur, West Bengal - 721301, India",
    workingHours: "Monday - Saturday: 9:00 AM - 8:00 PM IST",
    facebookUrl: "https://www.facebook.com/share/1EQZ7zHQaZ/",
    instagramUrl: "https://www.instagram.com/skillaura.academy_?stkn=c3N5eW1uamp1bndu",
    telegramUrl: "https://whatsapp.com/channel/0029Vb8yz5uG8l55QwjXzE0w",
    youtubeUrl: "https://youtube.com/@skillauraacademy",
  },
};

const STORAGE_KEY = "skillaura_public_cms_data_v1";
export const CMS_UPDATE_EVENT = "skillaura_cms_update";

export function getCmsData(): WebsiteCmsData {
  if (typeof window === "undefined") {
    return DEFAULT_CMS_DATA;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CMS_DATA;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_CMS_DATA,
      ...parsed,
      announcement: { ...DEFAULT_CMS_DATA.announcement, ...(parsed.announcement || {}) },
      promoVoucher: { ...DEFAULT_CMS_DATA.promoVoucher, ...(parsed.promoVoucher || {}) },
      aboutSection: { ...DEFAULT_CMS_DATA.aboutSection, ...(parsed.aboutSection || {}) },
      contactInfo: { ...DEFAULT_CMS_DATA.contactInfo, ...(parsed.contactInfo || {}) },
      heroSlides: parsed.heroSlides?.length ? parsed.heroSlides : DEFAULT_CMS_DATA.heroSlides,
      counterMetrics: parsed.counterMetrics?.length ? parsed.counterMetrics : DEFAULT_CMS_DATA.counterMetrics,
      faqs: parsed.faqs?.length ? parsed.faqs : DEFAULT_CMS_DATA.faqs,
      testimonials: parsed.testimonials?.length ? parsed.testimonials : DEFAULT_CMS_DATA.testimonials,
    };
  } catch {
    return DEFAULT_CMS_DATA;
  }
}

export function saveCmsData(data: WebsiteCmsData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new Event(CMS_UPDATE_EVENT));
  } catch (err) {
    console.error("Failed to save CMS data:", err);
  }
}

export function resetCmsData(): WebsiteCmsData {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(STORAGE_KEY);
      window.dispatchEvent(new Event(CMS_UPDATE_EVENT));
    } catch (err) {
      console.error("Failed to reset CMS data:", err);
    }
  }
  return DEFAULT_CMS_DATA;
}
