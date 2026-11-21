"use client";

import React, { useState, useEffect } from "react";
import {
  Megaphone,
  Save,
  CheckCircle2,
  Globe,
  Tag,
  Phone,
  Mail,
  Sparkles,
  Layers,
  BookOpen,
  MessageSquare,
  HelpCircle,
  BarChart3,
  RotateCcw,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  ChevronRight,
  Eye,
  Star,
} from "lucide-react";
import {
  WebsiteCmsData,
  DEFAULT_CMS_DATA,
  getCmsData,
  saveCmsData,
  resetCmsData,
  HeroSlideItem,
  FaqContentItem,
  TestimonialContentItem,
  CounterMetricItem,
} from "../../lib/cmsData";

type CmsTab =
  | "announcement"
  | "hero"
  | "stats"
  | "about"
  | "testimonials"
  | "faqs"
  | "contact";

export default function SuperAdminCMS() {
  const [activeTab, setActiveTab] = useState<CmsTab>("announcement");
  const [cms, setCms] = useState<WebsiteCmsData>(DEFAULT_CMS_DATA);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [selectedSlideId, setSelectedSlideId] = useState<number>(1);
  const [editingFaqId, setEditingFaqId] = useState<number | null>(null);
  const [editingTestimonialId, setEditingTestimonialId] = useState<number | null>(null);

  // Load CMS data on mount
  useEffect(() => {
    setCms(getCmsData());
  }, []);

  const handleSaveAll = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    saveCmsData(cms);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetDefaults = () => {
    if (confirm("Reset all public website content back to factory defaults?")) {
      const def = resetCmsData();
      setCms(def);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  // -------------------------------------------------------------
  // SLIDES HANDLERS
  // -------------------------------------------------------------
  const updateCurrentSlide = (field: keyof HeroSlideItem, value: string) => {
    setCms((prev) => ({
      ...prev,
      heroSlides: prev.heroSlides.map((s) =>
        s.id === selectedSlideId ? { ...s, [field]: value } : s
      ),
    }));
  };

  const currentSlide =
    cms.heroSlides.find((s) => s.id === selectedSlideId) || cms.heroSlides[0];

  // -------------------------------------------------------------
  // COUNTER METRICS HANDLERS
  // -------------------------------------------------------------
  const updateMetric = (id: number, field: "count" | "label", value: string) => {
    setCms((prev) => ({
      ...prev,
      counterMetrics: prev.counterMetrics.map((m) =>
        m.id === id ? { ...m, [field]: value } : m
      ),
    }));
  };

  // -------------------------------------------------------------
  // FAQ HANDLERS
  // -------------------------------------------------------------
  const updateFaq = (id: number, field: "question" | "answer", value: string) => {
    setCms((prev) => ({
      ...prev,
      faqs: prev.faqs.map((f) =>
        f.id === id ? { ...f, [field]: value } : f
      ),
    }));
  };

  const deleteFaq = (id: number) => {
    if (confirm("Delete this FAQ item?")) {
      setCms((prev) => ({
        ...prev,
        faqs: prev.faqs.filter((f) => f.id !== id),
      }));
    }
  };

  const addFaq = () => {
    const newId = Date.now();
    const newFaq: FaqContentItem = {
      id: newId,
      question: "New Frequently Asked Question?",
      answer: "Provide a helpful, detailed answer for prospective students.",
    };
    setCms((prev) => ({
      ...prev,
      faqs: [...prev.faqs, newFaq],
    }));
    setEditingFaqId(newId);
  };

  // -------------------------------------------------------------
  // TESTIMONIAL HANDLERS
  // -------------------------------------------------------------
  const updateTestimonial = (
    id: number,
    field: keyof TestimonialContentItem,
    value: string | number
  ) => {
    setCms((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((t) =>
        t.id === id ? { ...t, [field]: value } : t
      ),
    }));
  };

  const deleteTestimonial = (id: number) => {
    if (confirm("Delete this student testimonial?")) {
      setCms((prev) => ({
        ...prev,
        testimonials: prev.testimonials.filter((t) => t.id !== id),
      }));
    }
  };

  const addTestimonial = () => {
    const newId = Date.now();
    const newTestimonial: TestimonialContentItem = {
      id: newId,
      name: "New Graduate Student",
      initials: "NG",
      role: "Freelance Creative",
      enrolledCourse: "Video Editing Mastery",
      quote:
        "Skill Aura Academy helped me learn industry tools and land high-paying clients directly from home!",
      rating: 5,
    };
    setCms((prev) => ({
      ...prev,
      testimonials: [...prev.testimonials, newTestimonial],
    }));
    setEditingTestimonialId(newId);
  };

  return (
    <div className="space-y-5 font-sans max-w-6xl text-slate-800 dark:text-slate-100">
      {/* Top Header Strip with Live Actions */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 rounded-[4px] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#116E63] dark:text-emerald-400">
              Website CMS Studio
            </span>
            <span className="text-slate-300 dark:text-slate-700">&bull;</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Live Content Editor</span>
          </div>
          <h2 className="text-base sm:text-2xl font-bold font-[family-name:var(--font-yantramanav)] uppercase text-slate-900 dark:text-white leading-tight">
            Public Website Dynamic Content Manager
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Update headlines, hero banners, statistics, FAQs, testimonials, and contact channels in real time.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset to default content"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            className="px-4 py-2 bg-[#116E63] hover:bg-[#0c5c53] text-white text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Live Content</span>
          </button>
        </div>
      </div>

      {/* Success Banner */}
      {savedSuccess && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-[4px] flex items-center gap-2 shadow-xs animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>All dynamic content changes have been saved and applied to the public website!</span>
        </div>
      )}

      {/* Main CMS Tabbed Navigation */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2 pt-2 rounded-[4px] shadow-2xs scrollbar-none">
        <button
          onClick={() => setActiveTab("announcement")}
          className={`px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors border-b-2 flex items-center gap-1.5 ${activeTab === "announcement"
            ? "border-[#116E63] text-[#116E63] dark:text-emerald-400 bg-teal-50/50 dark:bg-teal-950/40"
            : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
        >
          <Megaphone className="w-3.5 h-3.5" />
          <span>Announcement &amp; Promo</span>
        </button>

        <button
          onClick={() => setActiveTab("hero")}
          className={`px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors border-b-2 flex items-center gap-1.5 ${activeTab === "hero"
            ? "border-[#116E63] text-[#116E63] dark:text-emerald-400 bg-teal-50/50 dark:bg-teal-950/40"
            : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Hero Sliders ({cms.heroSlides.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("stats")}
          className={`px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors border-b-2 flex items-center gap-1.5 ${activeTab === "stats"
            ? "border-[#116E63] text-[#116E63] dark:text-emerald-400 bg-teal-50/50 dark:bg-teal-950/40"
            : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Key Metrics &amp; Stats</span>
        </button>

        <button
          onClick={() => setActiveTab("about")}
          className={`px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors border-b-2 flex items-center gap-1.5 ${activeTab === "about"
            ? "border-[#116E63] text-[#116E63] dark:text-emerald-400 bg-teal-50/50 dark:bg-teal-950/40"
            : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>About Us Section</span>
        </button>

        <button
          onClick={() => setActiveTab("testimonials")}
          className={`px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors border-b-2 flex items-center gap-1.5 ${activeTab === "testimonials"
            ? "border-[#116E63] text-[#116E63] dark:text-emerald-400 bg-teal-50/50 dark:bg-teal-950/40"
            : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Testimonials ({cms.testimonials.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("faqs")}
          className={`px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors border-b-2 flex items-center gap-1.5 ${activeTab === "faqs"
            ? "border-[#116E63] text-[#116E63] dark:text-emerald-400 bg-teal-50/50 dark:bg-teal-950/40"
            : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>FAQs ({cms.faqs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("contact")}
          className={`px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap cursor-pointer transition-colors border-b-2 flex items-center gap-1.5 ${activeTab === "contact"
            ? "border-[#116E63] text-[#116E63] dark:text-emerald-400 bg-teal-50/50 dark:bg-teal-950/40"
            : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Contact &amp; Social Channels</span>
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: ANNOUNCEMENT & PROMO VOUCHERS */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "announcement" && (
        <div className="space-y-4">
          {/* Top Announcement Bar Card */}
          <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-[4px] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Megaphone className="w-4 h-4 text-[#116E63]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-[family-name:var(--font-yantramanav)]">
                  Top Header Announcement Banner
                </h3>
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={cms.announcement.active}
                  onChange={(e) =>
                    setCms((prev) => ({
                      ...prev,
                      announcement: { ...prev.announcement, active: e.target.checked },
                    }))
                  }
                  className="w-4 h-4 accent-[#116E63]"
                />
                <span>Banner Visible Live</span>
              </label>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                  Banner Text / Special Announcement
                </label>
                <input
                  type="text"
                  value={cms.announcement.headline}
                  onChange={(e) =>
                    setCms((prev) => ({
                      ...prev,
                      announcement: { ...prev.announcement, headline: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] font-semibold text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                    Call To Action Button Text
                  </label>
                  <input
                    type="text"
                    value={cms.announcement.actionText}
                    onChange={(e) =>
                      setCms((prev) => ({
                        ...prev,
                        announcement: { ...prev.announcement, actionText: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                    Target URL / Route
                  </label>
                  <input
                    type="text"
                    value={cms.announcement.actionHref}
                    onChange={(e) =>
                      setCms((prev) => ({
                        ...prev,
                        announcement: { ...prev.announcement, actionHref: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Promo Coupon Card */}
          <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-[4px] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#116E63]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-[family-name:var(--font-yantramanav)]">
                  Sitewide Promo Discount Vouchers
                </h3>
              </div>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={cms.promoVoucher.active}
                  onChange={(e) =>
                    setCms((prev) => ({
                      ...prev,
                      promoVoucher: { ...prev.promoVoucher, active: e.target.checked },
                    }))
                  }
                  className="w-4 h-4 accent-[#116E63]"
                />
                <span>Voucher Active</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                  Coupon Code
                </label>
                <input
                  type="text"
                  value={cms.promoVoucher.couponCode}
                  onChange={(e) =>
                    setCms((prev) => ({
                      ...prev,
                      promoVoucher: {
                        ...prev.promoVoucher,
                        couponCode: e.target.value.toUpperCase(),
                      },
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] font-mono font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                  Discount Percentage (%)
                </label>
                <input
                  type="number"
                  value={cms.promoVoucher.discountPercent}
                  onChange={(e) =>
                    setCms((prev) => ({
                      ...prev,
                      promoVoucher: {
                        ...prev.promoVoucher,
                        discountPercent: Number(e.target.value),
                      },
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] font-mono font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                  Offer Description Tagline
                </label>
                <input
                  type="text"
                  value={cms.promoVoucher.description}
                  onChange={(e) =>
                    setCms((prev) => ({
                      ...prev,
                      promoVoucher: {
                        ...prev.promoVoucher,
                        description: e.target.value,
                      },
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] text-slate-800"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: HERO SLIDERS */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "hero" && (
        <div className="space-y-4">
          {/* Slide Selector Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {cms.heroSlides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setSelectedSlideId(slide.id)}
                className={`px-3.5 py-2 text-xs font-bold uppercase rounded-[4px] border cursor-pointer transition-colors flex items-center gap-1.5 ${selectedSlideId === slide.id
                  ? "bg-[#116E63] text-white border-[#116E63]"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
              >
                <span>Slide #{idx + 1}</span>
                <span className="text-[10px] opacity-80 truncate max-w-[120px]">
                  ({slide.titleHighlight})
                </span>
              </button>
            ))}
          </div>

          {/* Slide Editor Card */}
          <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-[4px] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-[family-name:var(--font-yantramanav)]">
                Editing Hero Slide #{cms.heroSlides.findIndex((s) => s.id === selectedSlideId) + 1}
              </h3>
              <span className="text-xs font-mono text-slate-500">ID: {currentSlide.id}</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                  Tagline (Small Upper Badge)
                </label>
                <input
                  type="text"
                  value={currentSlide.tagline}
                  onChange={(e) => updateCurrentSlide("tagline", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] font-semibold text-slate-800"
                />
              </div>

              {/* Title 3-Part Construct */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                    Title Prefix
                  </label>
                  <input
                    type="text"
                    value={currentSlide.titlePrefix}
                    onChange={(e) => updateCurrentSlide("titlePrefix", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                    Title Highlight Word (Orange/Teal)
                  </label>
                  <input
                    type="text"
                    value={currentSlide.titleHighlight}
                    onChange={(e) => updateCurrentSlide("titleHighlight", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] font-bold text-[#FDA31B]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                    Title Suffix
                  </label>
                  <input
                    type="text"
                    value={currentSlide.titleSuffix}
                    onChange={(e) => updateCurrentSlide("titleSuffix", e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                  Slide Description Paragraph
                </label>
                <textarea
                  rows={3}
                  value={currentSlide.description}
                  onChange={(e) => updateCurrentSlide("description", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] text-slate-700 leading-relaxed"
                />
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-[4px] space-y-2">
                  <span className="text-[10px] font-bold uppercase text-[#116E63] block">
                    Primary CTA Button
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Button Label"
                      value={currentSlide.primaryBtnText}
                      onChange={(e) => updateCurrentSlide("primaryBtnText", e.target.value)}
                      className="px-2.5 py-1.5 border border-slate-200 rounded-[4px] bg-white font-bold"
                    />
                    <input
                      type="text"
                      placeholder="Button Link"
                      value={currentSlide.primaryBtnHref}
                      onChange={(e) => updateCurrentSlide("primaryBtnHref", e.target.value)}
                      className="px-2.5 py-1.5 border border-slate-200 rounded-[4px] bg-white font-mono"
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-[4px] space-y-2">
                  <span className="text-[10px] font-bold uppercase text-[#FDA31B] block">
                    Secondary CTA Button
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Button Label"
                      value={currentSlide.secondaryBtnText}
                      onChange={(e) => updateCurrentSlide("secondaryBtnText", e.target.value)}
                      className="px-2.5 py-1.5 border border-slate-200 rounded-[4px] bg-white font-bold"
                    />
                    <input
                      type="text"
                      placeholder="Button Link"
                      value={currentSlide.secondaryBtnHref}
                      onChange={(e) => updateCurrentSlide("secondaryBtnHref", e.target.value)}
                      className="px-2.5 py-1.5 border border-slate-200 rounded-[4px] bg-white font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: KEY METRICS & COUNTERS */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "stats" && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-[4px] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-[family-name:var(--font-yantramanav)]">
                Homepage Hero Stats Counter (4 Key Highlights)
              </h3>
              <span className="text-xs font-mono text-slate-500">Live Metric Strip</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cms.counterMetrics.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-slate-50 border border-slate-200 rounded-[4px] space-y-2"
                >
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">
                    Metric Card #{idx + 1}
                  </span>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                      Display Number / Metric
                    </label>
                    <input
                      type="text"
                      value={item.count}
                      onChange={(e) => updateMetric(item.id, "count", e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-[4px] font-black text-sm text-[#116E63] font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                      Metric Label Description
                    </label>
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => updateMetric(item.id, "label", e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-[4px] text-xs font-semibold text-slate-800"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Live Strip Preview */}
            <div className="pt-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1.5">
                Live Stats Banner Preview
              </span>
              <div className="p-4 bg-[#116E63] text-white rounded-[4px] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {cms.counterMetrics.map((m) => (
                  <div key={m.id}>
                    <span className="text-xl sm:text-2xl font-black font-mono block">
                      {m.count}
                    </span>
                    <span className="text-[11px] font-bold opacity-90 block mt-0.5">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: ABOUT US SECTION */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "about" && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-[4px] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-[family-name:var(--font-yantramanav)]">
                About Section Narrative &amp; Highlights
              </h3>
              <span className="text-xs font-mono text-slate-500">Section #about</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                    Years of Service Floating Badge
                  </label>
                  <input
                    type="text"
                    value={cms.aboutSection.badgeYears}
                    onChange={(e) =>
                      setCms((prev) => ({
                        ...prev,
                        aboutSection: { ...prev.aboutSection, badgeYears: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-[4px] font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                    Badge Subtitle
                  </label>
                  <input
                    type="text"
                    value={cms.aboutSection.badgeSubtitle}
                    onChange={(e) =>
                      setCms((prev) => ({
                        ...prev,
                        aboutSection: { ...prev.aboutSection, badgeSubtitle: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-[4px] font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                    Headline Prefix
                  </label>
                  <input
                    type="text"
                    value={cms.aboutSection.headlinePrefix}
                    onChange={(e) =>
                      setCms((prev) => ({
                        ...prev,
                        aboutSection: { ...prev.aboutSection, headlinePrefix: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-[4px] font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                    Headline Highlight (Orange)
                  </label>
                  <input
                    type="text"
                    value={cms.aboutSection.headlineHighlight}
                    onChange={(e) =>
                      setCms((prev) => ({
                        ...prev,
                        aboutSection: { ...prev.aboutSection, headlineHighlight: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-[4px] font-bold text-[#FDA31B]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                  About Narrative Paragraph
                </label>
                <textarea
                  rows={3}
                  value={cms.aboutSection.description}
                  onChange={(e) =>
                    setCms((prev) => ({
                      ...prev,
                      aboutSection: { ...prev.aboutSection, description: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-[4px] text-slate-700 leading-relaxed"
                />
              </div>

              {/* Two Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-[4px] space-y-2">
                  <span className="text-[10px] font-bold uppercase text-[#116E63] block">
                    Feature Item #1
                  </span>
                  <input
                    type="text"
                    placeholder="Feature Title"
                    value={cms.aboutSection.feature1Title}
                    onChange={(e) =>
                      setCms((prev) => ({
                        ...prev,
                        aboutSection: { ...prev.aboutSection, feature1Title: e.target.value },
                      }))
                    }
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-[4px] bg-white font-bold"
                  />
                  <textarea
                    rows={2}
                    placeholder="Feature Description"
                    value={cms.aboutSection.feature1Desc}
                    onChange={(e) =>
                      setCms((prev) => ({
                        ...prev,
                        aboutSection: { ...prev.aboutSection, feature1Desc: e.target.value },
                      }))
                    }
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-[4px] bg-white text-xs"
                  />
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-[4px] space-y-2">
                  <span className="text-[10px] font-bold uppercase text-[#116E63] block">
                    Feature Item #2
                  </span>
                  <input
                    type="text"
                    placeholder="Feature Title"
                    value={cms.aboutSection.feature2Title}
                    onChange={(e) =>
                      setCms((prev) => ({
                        ...prev,
                        aboutSection: { ...prev.aboutSection, feature2Title: e.target.value },
                      }))
                    }
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-[4px] bg-white font-bold"
                  />
                  <textarea
                    rows={2}
                    placeholder="Feature Description"
                    value={cms.aboutSection.feature2Desc}
                    onChange={(e) =>
                      setCms((prev) => ({
                        ...prev,
                        aboutSection: { ...prev.aboutSection, feature2Desc: e.target.value },
                      }))
                    }
                    className="w-full px-2.5 py-1.5 border border-slate-200 rounded-[4px] bg-white text-xs"
                  />
                </div>
              </div>

              {/* Callout Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                    Callout Box Title
                  </label>
                  <input
                    type="text"
                    value={cms.aboutSection.calloutTitle}
                    onChange={(e) =>
                      setCms((prev) => ({
                        ...prev,
                        aboutSection: { ...prev.aboutSection, calloutTitle: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-[4px] font-bold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                    Callout Subtitle
                  </label>
                  <input
                    type="text"
                    value={cms.aboutSection.calloutSubtitle}
                    onChange={(e) =>
                      setCms((prev) => ({
                        ...prev,
                        aboutSection: { ...prev.aboutSection, calloutSubtitle: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-[4px]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                    Support Callout Phone
                  </label>
                  <input
                    type="text"
                    value={cms.aboutSection.calloutPhone}
                    onChange={(e) =>
                      setCms((prev) => ({
                        ...prev,
                        aboutSection: { ...prev.aboutSection, calloutPhone: e.target.value },
                      }))
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-[4px] font-mono font-bold text-[#116E63]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 5: TESTIMONIALS */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "testimonials" && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-[4px] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#116E63]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-[family-name:var(--font-yantramanav)]">
                  Student Success Testimonials &amp; Reviews ({cms.testimonials.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={addTestimonial}
                className="px-3 py-1.5 bg-[#116E63] hover:bg-[#0c5c53] text-white text-xs font-bold uppercase rounded-[4px] flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Review</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cms.testimonials.map((testi, idx) => (
                <div
                  key={testi.id}
                  className="p-4 bg-slate-50 border border-slate-200 rounded-[4px] space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-slate-500 font-mono">
                      Review #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => deleteTestimonial(testi.id)}
                      className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                      title="Delete Testimonial"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                        Student Name
                      </label>
                      <input
                        type="text"
                        value={testi.name}
                        onChange={(e) => updateTestimonial(testi.id, "name", e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-[4px] font-bold text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                        Student Career / Role
                      </label>
                      <input
                        type="text"
                        value={testi.role}
                        onChange={(e) => updateTestimonial(testi.id, "role", e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-[4px]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="col-span-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                        Enrolled Masterclass
                      </label>
                      <input
                        type="text"
                        value={testi.enrolledCourse}
                        onChange={(e) => updateTestimonial(testi.id, "enrolledCourse", e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-[4px] font-semibold text-[#116E63]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                        Star Rating (1-5)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={testi.rating}
                        onChange={(e) => updateTestimonial(testi.id, "rating", Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-[4px] font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                      Student Review Quote
                    </label>
                    <textarea
                      rows={2}
                      value={testi.quote}
                      onChange={(e) => updateTestimonial(testi.id, "quote", e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-[4px] text-xs text-slate-700 leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 6: FAQS */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "faqs" && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-[4px] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#116E63]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-[family-name:var(--font-yantramanav)]">
                  Frequently Asked Questions ({cms.faqs.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={addFaq}
                className="px-3 py-1.5 bg-[#116E63] hover:bg-[#0c5c53] text-white text-xs font-bold uppercase rounded-[4px] flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Question</span>
              </button>
            </div>

            <div className="space-y-3">
              {cms.faqs.map((faq, idx) => (
                <div
                  key={faq.id}
                  className="p-3.5 bg-slate-50 border border-slate-200 rounded-[4px] space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-[#116E63] font-mono">
                      Question #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => deleteFaq(faq.id)}
                      className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                      title="Delete Question"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                      Question Title
                    </label>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => updateFaq(faq.id, "question", e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-[4px] font-bold text-xs text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                      Detailed Answer
                    </label>
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => updateFaq(faq.id, "answer", e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-[4px] text-xs text-slate-700 leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 7: CONTACT & SOCIAL */}
      {/* ------------------------------------------------------------- */}
      {activeTab === "contact" && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-[4px] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#116E63]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-[family-name:var(--font-yantramanav)]">
                  Public Contact Information &amp; Social Channels
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500">Header &amp; Footer Info</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                  Official WhatsApp Number
                </label>
                <input
                  type="text"
                  value={cms.contactInfo.supportWhatsApp}
                  onChange={(e) =>
                    setCms((prev) => ({
                      ...prev,
                      contactInfo: { ...prev.contactInfo, supportWhatsApp: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-[4px] font-mono text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                  Support Telephone
                </label>
                <input
                  type="text"
                  value={cms.contactInfo.supportPhone}
                  onChange={(e) =>
                    setCms((prev) => ({
                      ...prev,
                      contactInfo: { ...prev.contactInfo, supportPhone: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-[4px] font-mono text-slate-900"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                  Official Support Email
                </label>
                <input
                  type="email"
                  value={cms.contactInfo.supportEmail}
                  onChange={(e) =>
                    setCms((prev) => ({
                      ...prev,
                      contactInfo: { ...prev.contactInfo, supportEmail: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-[4px] text-slate-900"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                  Operating / Support Hours
                </label>
                <input
                  type="text"
                  value={cms.contactInfo.workingHours}
                  onChange={(e) =>
                    setCms((prev) => ({
                      ...prev,
                      contactInfo: { ...prev.contactInfo, workingHours: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-[4px] text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                  Physical Academy Address
                </label>
                <input
                  type="text"
                  value={cms.contactInfo.address}
                  onChange={(e) =>
                    setCms((prev) => ({
                      ...prev,
                      contactInfo: { ...prev.contactInfo, address: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-[4px] text-slate-900"
                />
              </div>

              {/* Social URLs */}
              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                  Instagram URL
                </label>
                <input
                  type="text"
                  value={cms.contactInfo.instagramUrl}
                  onChange={(e) =>
                    setCms((prev) => ({
                      ...prev,
                      contactInfo: { ...prev.contactInfo, instagramUrl: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-[4px] font-mono text-slate-700"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                  YouTube Channel URL
                </label>
                <input
                  type="text"
                  value={cms.contactInfo.youtubeUrl}
                  onChange={(e) =>
                    setCms((prev) => ({
                      ...prev,
                      contactInfo: { ...prev.contactInfo, youtubeUrl: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-[4px] font-mono text-slate-700"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                  WhatsApp Community / Channel URL
                </label>
                <input
                  type="text"
                  value={cms.contactInfo.telegramUrl}
                  onChange={(e) =>
                    setCms((prev) => ({
                      ...prev,
                      contactInfo: { ...prev.contactInfo, telegramUrl: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-[4px] font-mono text-slate-700"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                  Facebook Page URL
                </label>
                <input
                  type="text"
                  value={cms.contactInfo.facebookUrl}
                  onChange={(e) =>
                    setCms((prev) => ({
                      ...prev,
                      contactInfo: { ...prev.contactInfo, facebookUrl: e.target.value },
                    }))
                  }
                  className="w-full px-3 py-2 border border-slate-200 rounded-[4px] font-mono text-slate-700"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Save Actions at Bottom */}
      <div className="pt-2 flex items-center justify-between border-t border-slate-200 bg-white p-4 rounded-[4px] shadow-xs">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Sparkles className="w-4 h-4 text-[#116E63]" />
          <span>Updates saved here take effect immediately across all public website pages.</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase rounded-[4px] transition-colors cursor-pointer"
          >
            Reset Defaults
          </button>
          <button
            type="button"
            onClick={handleSaveAll}
            className="px-5 py-2 bg-[#116E63] hover:bg-[#0c5c53] text-white text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Save All Content Live</span>
          </button>
        </div>
      </div>
    </div>
  );
}
