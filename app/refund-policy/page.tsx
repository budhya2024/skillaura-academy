import React from "react";
import Link from "next/link";
import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";
import { ChevronRight, RefreshCw } from "lucide-react";

export const metadata = {
  title: "Refund Policy - Skill Aura Academy",
  description: "Review our transparent Refund and Cancellation Policy for courses at Skill Aura Academy.",
};

export default function RefundPolicyPage() {
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
            Refund &amp; Cancellation Policy
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-[0.15em]">
            <Link href="/" className="hover:text-[#FDA31B] transition-colors">
              HOME
            </Link>
            <ChevronRight className="w-4 h-4 text-[#FDA31B]" />
            <span className="text-[#FDA31B]">REFUND POLICY</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <main className="flex-1 py-12 sm:py-16 bg-white">
        <div className="container max-w-4xl">
          <div className="space-y-8 text-slate-700 leading-relaxed">
            
            {/* Header Note (Square Box) */}
            <div className="flex items-start gap-4 p-4 rounded-none bg-[#EAF5F3] border border-[#116E63]/20 text-[#116E63]">
              <RefreshCw className="w-6 h-6 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm font-medium">
                Skill Aura Academy is committed to student satisfaction. Last Updated: <span className="font-bold">September 2026</span>. Please read our refund guidelines below.
              </p>
            </div>

            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <span className="w-7 h-7 rounded-none bg-[#116E63] text-white text-xs flex items-center justify-center font-extrabold">1</span>
                Eligibility for Refund
              </h2>
              <p className="text-sm sm:text-base">
                We offer a money-back guarantee for most of our self-paced masterclasses under the following conditions:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-slate-600">
                <li>Refund requests must be submitted within <strong className="text-slate-800">7 calendar days</strong> of the course purchase date.</li>
                <li>You have viewed less than <strong className="text-slate-800">25%</strong> of the total course video lectures.</li>
                <li>You have not downloaded core certificates, proprietary templates, or exclusive course bundles.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <span className="w-7 h-7 rounded-none bg-[#116E63] text-white text-xs flex items-center justify-center font-extrabold">2</span>
                Non-Refundable Items &amp; Services
              </h2>
              <p className="text-sm sm:text-base">
                The following services and products are strictly non-refundable:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-slate-600">
                <li>1-on-1 personalized mentorship sessions or live bootcamps that have already commenced.</li>
                <li>Digital downloads or standalone downloadable resource toolkits.</li>
                <li>Course registrations purchased during special promotional flash sales explicitly marked as non-refundable.</li>
                <li>Any enrollment completed more than 7 days prior to the refund request.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <span className="w-7 h-7 rounded-none bg-[#116E63] text-white text-xs flex items-center justify-center font-extrabold">3</span>
                How to Request a Refund
              </h2>
              <p className="text-sm sm:text-base">
                To initiate a refund request, please follow these simple steps:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-sm sm:text-base text-slate-600">
                <li>Send an email to <a href="mailto:skillauraacademy.in@gmail.com" className="text-[#116E63] font-bold underline">skillauraacademy.in@gmail.com</a> from your registered email ID.</li>
                <li>Include your <strong className="text-slate-800">Order ID / Transaction Ref</strong>, course name, and reason for refund.</li>
                <li>Our support team will review your account metrics within 24 to 48 business hours.</li>
              </ol>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <span className="w-7 h-7 rounded-none bg-[#116E63] text-white text-xs flex items-center justify-center font-extrabold">4</span>
                Processing &amp; Payout Timeline
              </h2>
              <p className="text-sm sm:text-base">
                Once approved, refunds are credited back to the original payment source (UPI, Credit/Debit Card, Net Banking) within <strong className="text-slate-800">5 to 7 business days</strong> depending on your bank processing speed.
              </p>
            </section>

            {/* Contact Box (Square) */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-6 rounded-none">
              <div>
                <h4 className="font-bold text-[#19232B]">Need Help with a Refund?</h4>
                <p className="text-xs text-slate-500">Contact our billing team directly.</p>
              </div>
              <a
                href="mailto:skillauraacademy.in@gmail.com"
                className="bg-[#116E63] hover:bg-[#0e574f] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-none transition-colors whitespace-nowrap"
              >
                Request Support
              </a>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
