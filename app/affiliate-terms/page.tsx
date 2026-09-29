import React from "react";
import Link from "next/link";
import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";
import { ChevronRight, Share2 } from "lucide-react";

export const metadata = {
  title: "Affiliate & Referral Terms - Skill Aura Academy",
  description: "Terms and conditions governing the Skill Aura Academy Affiliate and Referral program.",
};

export default function AffiliateTermsPage() {
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
            Affiliate &amp; Referral Terms
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-[0.15em]">
            <Link href="/" className="hover:text-[#FDA31B] transition-colors">
              HOME
            </Link>
            <ChevronRight className="w-4 h-4 text-[#FDA31B]" />
            <span className="text-[#FDA31B]">AFFILIATE TERMS</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <main className="flex-1 py-12 sm:py-16 bg-white">
        <div className="container max-w-4xl">
          <div className="space-y-8 text-slate-700 leading-relaxed">
            
            {/* Header Note (Square Box) */}
            <div className="flex items-start gap-4 p-4 rounded-none bg-[#EAF5F3] border border-[#116E63]/20 text-[#116E63]">
              <Share2 className="w-6 h-6 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm font-medium">
                Welcome to the Skill Aura Academy Affiliate &amp; Referral Program! Last Updated: <span className="font-bold">September 2026</span>. Earn commissions by referring students to high-impact courses.
              </p>
            </div>

            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <span className="w-7 h-7 rounded-none bg-[#116E63] text-white text-xs flex items-center justify-center font-extrabold">1</span>
                Program Enrollment &amp; Eligibility
              </h2>
              <p className="text-sm sm:text-base">
                To join our referral network, you must complete the partner registration application and accept these terms. Anyone over 18 years of age with an active website, social media presence, or student community is eligible to apply.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <span className="w-7 h-7 rounded-none bg-[#116E63] text-white text-xs flex items-center justify-center font-extrabold">2</span>
                Referral Tracking &amp; Cookie Window
              </h2>
              <p className="text-sm sm:text-base">
                Affiliates receive unique referral tracking links and codes.
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-slate-600">
                <li>Referral tracking operates on a <strong className="text-slate-800">30-day cookie window</strong>.</li>
                <li>Commissions are attributed to the affiliate link used at the time of final enrollment checkout.</li>
                <li>Self-referrals (buying courses using your own affiliate link) are strictly prohibited and non-commissionable.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <span className="w-7 h-7 rounded-none bg-[#116E63] text-white text-xs flex items-center justify-center font-extrabold">3</span>
                Commission Rates &amp; Payout Terms
              </h2>
              <p className="text-sm sm:text-base">
                Commissions are calculated as a percentage of the net course fee paid by the referred student (excluding taxes and processing fees).
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-slate-600">
                <li>Payouts are generated monthly for balances exceeding the minimum payout threshold of ₹1,000 / $15.</li>
                <li>Payouts are disbursed via direct Bank Transfer, UPI, or PayPal on the 10th of every calendar month.</li>
                <li>Commissions for refunded enrollments will be deducted from subsequent payout cycles.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <span className="w-7 h-7 rounded-none bg-[#116E63] text-white text-xs flex items-center justify-center font-extrabold">4</span>
                Prohibited Promotional Practices
              </h2>
              <p className="text-sm sm:text-base">
                Affiliates must maintain high ethical standards. The following activities will lead to immediate account termination and forfeiture of pending earnings:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-slate-600">
                <li>Sending unsolicited bulk email (SPAM) or posting referral links on unauthorized forums.</li>
                <li>Bidding on trademarked brand keywords (e.g. &quot;Skill Aura Academy&quot;) in search engine ad campaigns.</li>
                <li>Making false, deceptive, or exaggerated claims regarding course outcomes or pricing.</li>
                <li>Creating websites that impersonate the official Skill Aura Academy website.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <span className="w-7 h-7 rounded-none bg-[#116E63] text-white text-xs flex items-center justify-center font-extrabold">5</span>
                Modification &amp; Termination
              </h2>
              <p className="text-sm sm:text-base">
                Skill Aura Academy reserves the right to modify commission rates, terms, or terminate the affiliate program at any time with 7 days prior notice to active partners.
              </p>
            </section>

            {/* Contact Box (Square) */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-6 rounded-none">
              <div>
                <h4 className="font-bold text-[#19232B]">Affiliate Partner Support</h4>
                <p className="text-xs text-slate-500">Contact our referral manager for custom partnerships.</p>
              </div>
              <a
                href="mailto:skillauraacademy.in@gmail.com"
                className="bg-[#116E63] hover:bg-[#0e574f] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-none transition-colors whitespace-nowrap"
              >
                Join Affiliate Program
              </a>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
