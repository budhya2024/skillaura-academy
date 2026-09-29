import React from "react";
import Link from "next/link";
import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";
import { ChevronRight, FileText } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions - Skill Aura Academy",
  description: "Read the Terms & Conditions governing your use of Skill Aura Academy platform, courses, and services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Header />

      {/* Hero Banner */}
      <section
        className="relative py-16 sm:py-20 bg-cover bg-center bg-fixed text-white overflow-hidden"
        style={{ backgroundImage: "url('/images/hero1.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#012758]/90 backdrop-blur-[2px]"></div>
        <div className="container relative z-10 text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-[family-name:var(--font-yantramanav)] tracking-wide">
            Terms &amp; Conditions
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-[0.15em]">
            <Link href="/" className="hover:text-[#FDA31B] transition-colors">
              HOME
            </Link>
            <ChevronRight className="w-4 h-4 text-[#FDA31B]" />
            <span className="text-[#FDA31B]">TERMS &amp; CONDITIONS</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <main className="flex-1 py-12 sm:py-16 bg-white">
        <div className="container max-w-4xl">
          <div className="space-y-8 text-slate-700 leading-relaxed">
            
            {/* Header Note Box (Square) */}
            <div className="flex items-start gap-4 p-4 rounded-none bg-[#EAF5F3] border border-[#116E63]/20 text-[#116E63]">
              <FileText className="w-6 h-6 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm font-medium">
                Last Updated: <span className="font-bold">September 2026</span>. Please read these terms carefully before accessing or enrolling in any courses on Skill Aura Academy.
              </p>
            </div>

            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <span className="w-7 h-7 rounded-none bg-[#116E63] text-white text-xs flex items-center justify-center font-extrabold">1</span>
                Acceptance of Terms
              </h2>
              <p className="text-sm sm:text-base">
                By accessing, browsing, or creating an account on Skill Aura Academy (&quot;Platform&quot;, &quot;We&quot;, &quot;Us&quot;, or &quot;Our&quot;), you agree to comply with and be bound by these Terms and Conditions. If you do not agree to all terms, please refrain from using our platform.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <span className="w-7 h-7 rounded-none bg-[#116E63] text-white text-xs flex items-center justify-center font-extrabold">2</span>
                User Account &amp; Registration
              </h2>
              <p className="text-sm sm:text-base">
                To access certain courses and interactive features, you must register for an account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-slate-600">
                <li>Provide accurate, current, and complete registration information.</li>
                <li>Maintain the confidentiality and security of your account credentials.</li>
                <li>Promptly notify us of any unauthorized use or security breach involving your account.</li>
                <li>Be solely responsible for all activities occurring under your account username and password.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <span className="w-7 h-7 rounded-none bg-[#116E63] text-white text-xs flex items-center justify-center font-extrabold">3</span>
                Intellectual Property &amp; Course Content
              </h2>
              <p className="text-sm sm:text-base">
                All learning materials, videos, graphics, course content, logos, and software available on Skill Aura Academy are the exclusive property of Skill Aura Academy or its licensors.
              </p>
              <p className="text-sm sm:text-base">
                Enrolled students are granted a limited, personal, non-transferable, non-exclusive license to view the course content for personal educational purposes. You may not record, redistribute, re-sell, publicize, or copy any course content without prior written permission.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <span className="w-7 h-7 rounded-none bg-[#116E63] text-white text-xs flex items-center justify-center font-extrabold">4</span>
                Code of Conduct &amp; User Behavior
              </h2>
              <p className="text-sm sm:text-base">
                We foster a respectful, supportive, and safe learning environment. Users agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-slate-600">
                <li>Harass, abuse, or post defamatory content in discussion forums or community channels.</li>
                <li>Post or transmit malicious code, viruses, or spam.</li>
                <li>Attempt to gain unauthorized access to platform servers or user data.</li>
                <li>Use automated bots or scrapers to extract course information.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <span className="w-7 h-7 rounded-none bg-[#116E63] text-white text-xs flex items-center justify-center font-extrabold">5</span>
                Payments &amp; Fees
              </h2>
              <p className="text-sm sm:text-base">
                Course pricing, discounts, and payment terms are specified at checkout. Prices are subject to change. Payments processed via third-party gateways (e.g., Razorpay, UPI, cards) are subject to their respective security standards and terms.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <span className="w-7 h-7 rounded-none bg-[#116E63] text-white text-xs flex items-center justify-center font-extrabold">6</span>
                Termination
              </h2>
              <p className="text-sm sm:text-base">
                Skill Aura Academy reserves the right to suspend or terminate your access to the platform immediately, without prior notice, if you breach any provision of these Terms &amp; Conditions.
              </p>
            </section>

            {/* Contact Box (Square) */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-6 rounded-none">
              <div>
                <h4 className="font-bold text-[#19232B]">Have Questions about Terms?</h4>
                <p className="text-xs text-slate-500">Contact our legal &amp; support team for assistance.</p>
              </div>
              <a
                href="mailto:skillauraacademy.in@gmail.com"
                className="bg-[#116E63] hover:bg-[#0e574f] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-none transition-colors whitespace-nowrap"
              >
                Contact Legal Support
              </a>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
