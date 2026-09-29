import React from "react";
import Link from "next/link";
import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";
import { ChevronRight, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - Skill Aura Academy",
  description: "Learn how Skill Aura Academy collects, uses, and safeguards your personal information and privacy.",
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-200 uppercase tracking-[0.15em]">
            <Link href="/" className="hover:text-[#FDA31B] transition-colors">
              HOME
            </Link>
            <ChevronRight className="w-4 h-4 text-[#FDA31B]" />
            <span className="text-[#FDA31B]">PRIVACY POLICY</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <main className="flex-1 py-12 sm:py-16 bg-white">
        <div className="container max-w-4xl">
          <div className="space-y-8 text-slate-700 leading-relaxed">
            
            {/* Header Note (Square Box) */}
            <div className="flex items-start gap-4 p-4 rounded-none bg-[#EAF5F3] border border-[#116E63]/20 text-[#116E63]">
              <ShieldCheck className="w-6 h-6 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm font-medium">
                At Skill Aura Academy, your privacy is our top priority. Last Updated: <span className="font-bold">September 2026</span>.
              </p>
            </div>

            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <span className="w-7 h-7 rounded-none bg-[#116E63] text-white text-xs flex items-center justify-center font-extrabold">1</span>
                Information We Collect
              </h2>
              <p className="text-sm sm:text-base">
                We collect personal and technical information when you register, enroll in courses, or interact with our platform:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-slate-600">
                <li><strong className="text-slate-800">Personal Information:</strong> Full Name, Email Address, Phone Number, Billing Details, and Educational Background.</li>
                <li><strong className="text-slate-800">Account Details:</strong> Usernames, encrypted passwords, and profile preferences.</li>
                <li><strong className="text-slate-800">Technical Data:</strong> IP Address, browser type, device information, operating system, and platform usage analytics.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <span className="w-7 h-7 rounded-none bg-[#116E63] text-white text-xs flex items-center justify-center font-extrabold">2</span>
                How We Use Your Information
              </h2>
              <p className="text-sm sm:text-base">
                Your data is utilized strictly for legitimate educational and operational purposes:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-sm sm:text-base text-slate-600">
                <li>To deliver, maintain, and personalize your learning experience and course access.</li>
                <li>To process transactions and issue course completion certificates.</li>
                <li>To send essential updates, receipts, assignment feedback, and support notices.</li>
                <li>To improve platform security, prevent fraud, and optimize platform speed and performance.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <span className="w-7 h-7 rounded-none bg-[#116E63] text-white text-xs flex items-center justify-center font-extrabold">3</span>
                Data Protection &amp; Security
              </h2>
              <p className="text-sm sm:text-base">
                We implement industry-standard encryption protocols (SSL/TLS), secure database firewalls, and strict access controls to safeguard your data from unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <span className="w-7 h-7 rounded-none bg-[#116E63] text-white text-xs flex items-center justify-center font-extrabold">4</span>
                Sharing of Information
              </h2>
              <p className="text-sm sm:text-base">
                We <strong className="text-slate-800">do not sell or rent</strong> your personal information to third parties. We may share necessary data with trusted service providers who assist us in operations (e.g. payment processors, email automation, video streaming) bound by strict confidentiality agreements.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <span className="w-7 h-7 rounded-none bg-[#116E63] text-white text-xs flex items-center justify-center font-extrabold">5</span>
                Cookies &amp; Analytics
              </h2>
              <p className="text-sm sm:text-base">
                Our platform uses cookies and session tracking technologies to store your preferences, remember active logins, and monitor traffic patterns. You can manage or disable cookies via your web browser settings.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#19232B] font-[family-name:var(--font-yantramanav)] flex items-center gap-2">
                <span className="w-7 h-7 rounded-none bg-[#116E63] text-white text-xs flex items-center justify-center font-extrabold">6</span>
                Your Privacy Rights
              </h2>
              <p className="text-sm sm:text-base">
                You have the right to request access to your personal data, request corrections, or request deletion of your account information at any time by contacting our privacy compliance officer.
              </p>
            </section>

            {/* Contact Box (Square) */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-6 rounded-none">
              <div>
                <h4 className="font-bold text-[#19232B]">Privacy Inquiries</h4>
                <p className="text-xs text-slate-500">Reach out if you have concerns about your data.</p>
              </div>
              <a
                href="mailto:skillauraacademy.in@gmail.com"
                className="bg-[#116E63] hover:bg-[#0e574f] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-none transition-colors whitespace-nowrap"
              >
                Email Privacy Team
              </a>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
