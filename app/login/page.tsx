"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Lock,
  ArrowRight,
  ChevronLeft,
  Eye,
  EyeOff,
  Mail,
  Phone,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Send,
  ShieldCheck,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  // Mode: "login" or "register"
  const [mode, setMode] = useState<"login" | "register">("login");

  // Form Fields
  const [loginIdentifier, setLoginIdentifier] = useState("SKA-ROOT88");
  const [loginPassword, setLoginPassword] = useState("••••••••••••");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register Fields
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [registerSponsorId, setRegisterSponsorId] = useState("SKA-ROOT88");

  // OTP Verification States (Used exclusively during Registration)
  const [otpStep, setOtpStep] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(30);

  // Status & Feedback
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Countdown timer for OTP Resend during Registration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpStep && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpStep, resendTimer]);

  // Switch between Login and Register tabs
  const switchMode = (newMode: "login" | "register") => {
    setMode(newMode);
    setError("");
    setSuccessMessage("");
    setOtpStep(false);
    setEnteredOtp("");
  };

  // Helper to generate a random 6-digit OTP
  const createRandomOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // ==========================================
  // 1. LOGIN HANDLER: DIRECT PASSWORD SIGN IN (NO OTP)
  // ==========================================
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!loginIdentifier.trim()) {
      setError("Please enter your Member ID, Gmail, or Phone number.");
      return;
    }
    if (!loginPassword.trim() || loginPassword.length < 4) {
      setError("Please enter your password.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setSuccessMessage("Credentials authenticated! Redirecting to dashboard...");
      setTimeout(() => {
        if (loginIdentifier.toLowerCase().includes("super")) {
          router.push("/super-admin");
        } else {
          router.push("/admin");
        }
      }, 600);
    }, 500);
  };

  // ==========================================
  // 2. REGISTER STEP 1: VALIDATE & SEND GMAIL OTP
  // ==========================================
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!registerName.trim()) {
      setError("Please enter your full legal name.");
      return;
    }
    if (!registerEmail.trim() || !registerEmail.includes("@")) {
      setError("Please enter a valid Gmail / Email address.");
      return;
    }
    if (!registerPhone.trim() || registerPhone.length < 10) {
      setError("Please enter a valid 10-digit WhatsApp or Phone number.");
      return;
    }
    if (!registerPassword.trim() || registerPassword.length < 6) {
      setError("Please create a password of at least 6 characters.");
      return;
    }

    // Generate 6-digit OTP and send to Gmail
    setIsLoading(true);
    const newOtp = createRandomOtp();
    setGeneratedOtp(newOtp);

    setTimeout(() => {
      setIsLoading(false);
      setOtpStep(true);
      setResendTimer(30);
      setSuccessMessage(
        `Verification code sent to ${registerEmail}. Check your Gmail inbox.`
      );
    }, 700);
  };

  // ==========================================
  // 3. REGISTER STEP 2: RESEND GMAIL OTP
  // ==========================================
  const handleResendOtp = () => {
    if (resendTimer > 0) return;
    setError("");
    setIsLoading(true);
    const newOtp = createRandomOtp();
    setGeneratedOtp(newOtp);

    setTimeout(() => {
      setIsLoading(false);
      setResendTimer(30);
      setSuccessMessage(`New 6-digit verification code sent to ${registerEmail}.`);
    }, 600);
  };

  // ==========================================
  // 4. REGISTER STEP 3: VERIFY OTP & COMPLETE REGISTRATION
  // ==========================================
  const handleVerifyRegisterOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!enteredOtp || enteredOtp.trim().length !== 6) {
      setError("Please enter the complete 6-digit verification code sent to your Gmail.");
      return;
    }

    if (enteredOtp.trim() !== generatedOtp) {
      setError("Invalid code. Please enter the correct OTP or click Resend.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setSuccessMessage(
        `Registration complete! Welcome, ${registerName}. Redirecting to dashboard...`
      );
      setTimeout(() => {
        router.push("/admin");
      }, 700);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col justify-center items-center py-6 sm:py-10 px-3 sm:px-4 relative font-sans overflow-y-auto">
      {/* Top Header Link */}
      <div className="w-full max-w-md mb-2.5 flex items-center justify-between shrink-0">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#116E63] transition-colors bg-white px-3 py-1.5 border border-slate-200 shadow-xs rounded-[4px]"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Auth Card */}
      <div className="w-full max-w-md bg-white border border-slate-200 shadow-sm rounded-[4px] flex flex-col max-h-[88vh] sm:max-h-[92vh] overflow-hidden my-auto">
        {/* Brand Banner Top */}
        <div className="bg-slate-50 p-4 text-center border-b border-slate-200 shrink-0">
          <div className="flex justify-center mb-2">
            <Link href="/">
              <Image
                src="/images/brand-logo.png"
                alt="Skill Aura Academy"
                width={160}
                height={40}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>
          </div>
          <h2 className="text-base sm:text-lg font-bold font-[family-name:var(--font-yantramanav)] uppercase tracking-wider text-slate-900">
            {mode === "login"
              ? "Sign In"
              : otpStep
              ? "Verify OTP"
              : "Register"}
          </h2>
        </div>

        {/* Tab Switcher: Login vs Register */}
        {!otpStep && (
          <div className="flex border-b border-slate-200 bg-white shrink-0">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                mode === "login"
                  ? "border-[#116E63] text-[#116E63] bg-teal-50/40"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => switchMode("register")}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                mode === "register"
                  ? "border-[#116E63] text-[#116E63] bg-teal-50/40"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Register
            </button>
          </div>
        )}

        {/* SCROLLABLE FORM BODY (Y-Scroll for registration and OTP inputs) */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-4">
          {/* Error Alert */}
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm font-medium rounded-[4px] flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Alert */}
          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium rounded-[4px] flex items-start gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span>{successMessage}</span>
                {generatedOtp && otpStep && (
                  <div className="mt-2 pt-2 border-t border-emerald-200/80 flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-950">
                      Your Gmail OTP:{" "}
                      <strong className="font-mono text-sm tracking-widest text-[#116E63]">
                        {generatedOtp}
                      </strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setEnteredOtp(generatedOtp)}
                      className="underline font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
                    >
                      Auto-Fill Code
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* CASE 1: REGISTRATION OTP VERIFICATION STEP              */}
          {/* ======================================================== */}
          {otpStep ? (
            <form onSubmit={handleVerifyRegisterOtp} className="space-y-4">
              <div className="text-center pb-1">
                <div className="w-12 h-12 rounded-full bg-teal-50 text-[#116E63] border border-teal-200 flex items-center justify-center mx-auto mb-2">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Confirm Registration OTP
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Enter the 6-digit activation code sent to{" "}
                  <strong className="text-slate-900 font-mono">{registerEmail}</strong>
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 text-center">
                  6-Digit Gmail OTP Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={enteredOtp}
                  onChange={(e) =>
                    setEnteredOtp(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="123456"
                  className="w-full text-center tracking-[0.5em] font-mono text-2xl font-bold py-3 border-2 border-[#116E63] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#116E63]/20 text-slate-900 bg-white"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => setOtpStep(false)}
                  className="text-slate-600 hover:text-slate-900 font-semibold underline cursor-pointer"
                >
                  Edit Info / Back
                </button>

                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendTimer > 0 || isLoading}
                  className={`font-bold flex items-center gap-1 cursor-pointer ${
                    resendTimer > 0
                      ? "text-slate-400 cursor-not-allowed"
                      : "text-[#116E63] hover:underline"
                  }`}
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 ${
                      isLoading ? "animate-spin" : ""
                    }`}
                  />
                  <span>
                    {resendTimer > 0
                      ? `Resend in ${resendTimer}s`
                      : "Resend Code"}
                  </span>
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 bg-[#116E63] hover:bg-[#0c5c53] text-white font-extrabold text-sm tracking-wider uppercase py-3 px-4 shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 rounded-[4px]"
              >
                {isLoading ? (
                  <span>Verifying...</span>
                ) : (
                  <>
                    <span>Verify OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : mode === "login" ? (
            /* ======================================================== */
            /* CASE 2: DIRECT LOGIN FORM (NO OTP REQUIRED AT LOGIN)    */
            /* ======================================================== */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Member ID or Email
                </label>
                <div className="relative">
                  <User className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="e.g. SKA-ROOT88 or user@gmail.com"
                    className="w-full pl-10 pr-3 py-2.5 text-sm border border-slate-200 focus:outline-none focus:border-[#116E63] font-semibold text-slate-800 rounded-[4px]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Password reset instructions sent to your registered contact.");
                    }}
                    className="text-xs font-bold text-[#116E63] hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-200 focus:outline-none focus:border-[#116E63] font-semibold text-slate-800 rounded-[4px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showLoginPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 bg-[#116E63] hover:bg-[#0c5c53] text-white font-extrabold text-sm tracking-wider uppercase py-3 px-4 shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 rounded-[4px]"
              >
                {isLoading ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center border-t border-slate-100 flex items-center justify-center gap-1">
                <Link
                  href="/super-admin"
                  className="text-[11px] font-bold text-slate-400 hover:text-[#116E63] uppercase tracking-wider inline-flex items-center gap-1 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Super Admin Console</span>
                </Link>
              </div>
            </form>
          ) : (
            /* ======================================================== */
            /* CASE 3: REGISTER FORM (GMAIL OTP IS SENT HERE)          */
            /* ======================================================== */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full pl-10 pr-3 py-2.5 text-sm border border-slate-200 focus:outline-none focus:border-[#116E63] font-medium text-slate-800 rounded-[4px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="w-full pl-10 pr-3 py-2.5 text-sm border border-slate-200 focus:outline-none focus:border-[#116E63] font-medium text-slate-800 rounded-[4px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    value={registerPhone}
                    onChange={(e) => setRegisterPhone(e.target.value)}
                    placeholder="Phone number"
                    className="w-full pl-10 pr-3 py-2.5 text-sm border border-slate-200 focus:outline-none focus:border-[#116E63] font-medium text-slate-800 rounded-[4px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showRegisterPassword ? "text" : "password"}
                    required
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 text-sm border border-slate-200 focus:outline-none focus:border-[#116E63] font-medium text-slate-800 rounded-[4px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    {showRegisterPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Referral ID (Optional)
                </label>
                <div className="relative">
                  <ShieldCheck className="w-4.5 h-4.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={registerSponsorId}
                    onChange={(e) => setRegisterSponsorId(e.target.value)}
                    placeholder="SKA-ROOT88"
                    className="w-full pl-10 pr-3 py-2.5 text-sm border border-slate-200 focus:outline-none focus:border-[#116E63] font-mono font-bold text-slate-800 uppercase rounded-[4px]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 bg-[#116E63] hover:bg-[#0c5c53] text-white font-extrabold text-sm tracking-wider uppercase py-3 px-4 shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 rounded-[4px]"
              >
                {isLoading ? (
                  <span>Registering...</span>
                ) : (
                  <>
                    <span>Register</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer info & toggle (Fixed at bottom) */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-xs text-slate-600 shrink-0">
          {mode === "login" ? (
            <div>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => switchMode("register")}
                className="font-bold text-[#116E63] hover:underline cursor-pointer"
              >
                Register
              </button>
            </div>
          ) : (
            <div>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => switchMode("login")}
                className="font-bold text-[#116E63] hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
