"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Users,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Calendar,
  BookOpen,
  Copy,
  Check,
  X,
  Plus,
  Eye,
  Download,
  Share2,
  Wallet,
  TrendingUp,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Award,
  Receipt,
  FileText,
  CreditCard,
} from "lucide-react";
import { getKycRecords } from "../../lib/kycData";

export interface SuperAdminStudent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarImage: string;
  kycVerified: boolean;
  status: "active" | "inactive";
  joinDate: string;
  purchasedCourse: {
    courseName: string;
    courseFee: number;
    purchaseDate: string;
    paymentStatus: "Paid" | "Pending";
    progressPercent: number;
  };
  sponsor: {
    sponsorId: string;
    sponsorName: string;
    sponsorPhone?: string;
  };
  referrals: {
    totalDirects: number;
    totalCommissionEarned: number;
    directStudents: {
      id: string;
      name: string;
      coursePurchased: string;
      feePaid: number;
      commissionGenerated: number;
      enrolledDate: string;
    }[];
  };
}

const INITIAL_SUPER_ADMIN_STUDENTS: SuperAdminStudent[] = [
  {
    id: "SKA-1045",
    name: "Priya Sharma",
    email: "priya.sharma@gmail.com",
    phone: "+91 98234 11209",
    avatarImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    kycVerified: true,
    status: "active",
    joinDate: "28 Jan 2026",
    purchasedCourse: {
      courseName: "Business Mastery & High-Ticket Closing",
      courseFee: 4999,
      purchaseDate: "28 Jan 2026",
      paymentStatus: "Paid",
      progressPercent: 88,
    },
    sponsor: {
      sponsorId: "SKA-ROOT88",
      sponsorName: "SkillAura Master (Aman Singhania)",
      sponsorPhone: "+91 91442 88641",
    },
    referrals: {
      totalDirects: 14,
      totalCommissionEarned: 142500,
      directStudents: [
        {
          id: "SKA-1284",
          name: "Deepak Patel",
          coursePurchased: "Business Mastery",
          feePaid: 4999,
          commissionGenerated: 3250,
          enrolledDate: "20 Feb 2026",
        },
        {
          id: "SKA-1310",
          name: "Sneha Kapoor",
          coursePurchased: "Poster & Logo Design",
          feePaid: 3499,
          commissionGenerated: 2275,
          enrolledDate: "02 Mar 2026",
        },
        {
          id: "SKA-1520",
          name: "Vikrant Rao",
          coursePurchased: "Video Editing Mastery",
          feePaid: 2999,
          commissionGenerated: 1950,
          enrolledDate: "18 Mar 2026",
        },
      ],
    },
  },
  {
    id: "SKA-1052",
    name: "Rajesh Mehta",
    email: "rajesh.mehta@gmail.com",
    phone: "+91 98450 77123",
    avatarImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    kycVerified: true,
    status: "active",
    joinDate: "01 Feb 2026",
    purchasedCourse: {
      courseName: "Business Mastery & High-Ticket Closing",
      courseFee: 4999,
      purchaseDate: "01 Feb 2026",
      paymentStatus: "Paid",
      progressPercent: 95,
    },
    sponsor: {
      sponsorId: "SKA-ROOT88",
      sponsorName: "SkillAura Master (Aman Singhania)",
      sponsorPhone: "+91 91442 88641",
    },
    referrals: {
      totalDirects: 16,
      totalCommissionEarned: 156800,
      directStudents: [
        {
          id: "SKA-1144",
          name: "Kavita Joshi",
          coursePurchased: "Poster & Logo Design",
          feePaid: 3499,
          commissionGenerated: 2275,
          enrolledDate: "14 Feb 2026",
        },
        {
          id: "SKA-1205",
          name: "Suresh Nair",
          coursePurchased: "Content Creation Mastery",
          feePaid: 2499,
          commissionGenerated: 1625,
          enrolledDate: "22 Feb 2026",
        },
      ],
    },
  },
  {
    id: "SKA-1120",
    name: "Rahul Verma",
    email: "rahul.verma@gmail.com",
    phone: "+91 97123 44556",
    avatarImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    kycVerified: true,
    status: "active",
    joinDate: "05 Feb 2026",
    purchasedCourse: {
      courseName: "Video Editing Mastery & Cinematic Reels",
      courseFee: 2999,
      purchaseDate: "05 Feb 2026",
      paymentStatus: "Paid",
      progressPercent: 72,
    },
    sponsor: {
      sponsorId: "SKA-ROOT88",
      sponsorName: "SkillAura Master (Aman Singhania)",
      sponsorPhone: "+91 91442 88641",
    },
    referrals: {
      totalDirects: 9,
      totalCommissionEarned: 68200,
      directStudents: [
        {
          id: "SKA-1601",
          name: "Sameer Khan",
          coursePurchased: "Full Stack Web Dev",
          feePaid: 7999,
          commissionGenerated: 5200,
          enrolledDate: "22 Mar 2026",
        },
      ],
    },
  },
  {
    id: "SKA-1188",
    name: "Ananya Roy",
    email: "ananya.roy@yahoo.com",
    phone: "+91 99201 88765",
    avatarImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    kycVerified: true,
    status: "active",
    joinDate: "12 Feb 2026",
    purchasedCourse: {
      courseName: "Facebook & Instagram Ads Growth Mastery",
      courseFee: 3999,
      purchaseDate: "12 Feb 2026",
      paymentStatus: "Paid",
      progressPercent: 64,
    },
    sponsor: {
      sponsorId: "SKA-ROOT88",
      sponsorName: "SkillAura Master (Aman Singhania)",
      sponsorPhone: "+91 91442 88641",
    },
    referrals: {
      totalDirects: 7,
      totalCommissionEarned: 45600,
      directStudents: [],
    },
  },
  {
    id: "SKA-1144",
    name: "Kavita Joshi",
    email: "kavita.joshi@gmail.com",
    phone: "+91 97890 33412",
    avatarImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    kycVerified: true,
    status: "active",
    joinDate: "14 Feb 2026",
    purchasedCourse: {
      courseName: "Poster, Brand Identity & Logo Design Mastery",
      courseFee: 3499,
      purchaseDate: "14 Feb 2026",
      paymentStatus: "Paid",
      progressPercent: 100,
    },
    sponsor: {
      sponsorId: "SKA-1052",
      sponsorName: "Rajesh Mehta",
      sponsorPhone: "+91 98450 77123",
    },
    referrals: {
      totalDirects: 8,
      totalCommissionEarned: 62400,
      directStudents: [
        {
          id: "SKA-1480",
          name: "Amit Kumar",
          coursePurchased: "Full Stack Web Dev",
          feePaid: 7999,
          commissionGenerated: 5200,
          enrolledDate: "05 Mar 2026",
        },
        {
          id: "SKA-1512",
          name: "Pooja Mishra",
          coursePurchased: "Video Editing Mastery",
          feePaid: 2999,
          commissionGenerated: 1950,
          enrolledDate: "15 Mar 2026",
        },
      ],
    },
  },
  {
    id: "SKA-1205",
    name: "Suresh Nair",
    email: "suresh.nair@hotmail.com",
    phone: "+91 96112 55901",
    avatarImage: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200",
    kycVerified: true,
    status: "active",
    joinDate: "22 Feb 2026",
    purchasedCourse: {
      courseName: "Content Creation Mastery & Viral Scripting",
      courseFee: 2499,
      purchaseDate: "22 Feb 2026",
      paymentStatus: "Paid",
      progressPercent: 52,
    },
    sponsor: {
      sponsorId: "SKA-1052",
      sponsorName: "Rajesh Mehta",
      sponsorPhone: "+91 98450 77123",
    },
    referrals: {
      totalDirects: 6,
      totalCommissionEarned: 38200,
      directStudents: [],
    },
  },
  {
    id: "SKA-1284",
    name: "Deepak Patel",
    email: "deepak.patel@gmail.com",
    phone: "+91 94231 66789",
    avatarImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
    kycVerified: true,
    status: "active",
    joinDate: "20 Feb 2026",
    purchasedCourse: {
      courseName: "Business Mastery & High-Ticket Closing",
      courseFee: 4999,
      purchaseDate: "20 Feb 2026",
      paymentStatus: "Paid",
      progressPercent: 82,
    },
    sponsor: {
      sponsorId: "SKA-1045",
      sponsorName: "Priya Sharma",
      sponsorPhone: "+91 98234 11209",
    },
    referrals: {
      totalDirects: 6,
      totalCommissionEarned: 28400,
      directStudents: [],
    },
  },
  {
    id: "SKA-1310",
    name: "Sneha Kapoor",
    email: "sneha.k@gmail.com",
    phone: "+91 91234 55678",
    avatarImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    kycVerified: false,
    status: "active",
    joinDate: "02 Mar 2026",
    purchasedCourse: {
      courseName: "Poster, Brand Identity & Logo Design Mastery",
      courseFee: 3499,
      purchaseDate: "02 Mar 2026",
      paymentStatus: "Paid",
      progressPercent: 90,
    },
    sponsor: {
      sponsorId: "SKA-1045",
      sponsorName: "Priya Sharma",
      sponsorPhone: "+91 98234 11209",
    },
    referrals: {
      totalDirects: 4,
      totalCommissionEarned: 15900,
      directStudents: [],
    },
  },
  {
    id: "SKA-1480",
    name: "Amit Kumar",
    email: "amit.kumar@gmail.com",
    phone: "+91 98980 11223",
    avatarImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    kycVerified: true,
    status: "active",
    joinDate: "05 Mar 2026",
    purchasedCourse: {
      courseName: "Full Stack Web Development & Freelancing",
      courseFee: 7999,
      purchaseDate: "05 Mar 2026",
      paymentStatus: "Paid",
      progressPercent: 44,
    },
    sponsor: {
      sponsorId: "SKA-1144",
      sponsorName: "Kavita Joshi",
      sponsorPhone: "+91 97890 33412",
    },
    referrals: {
      totalDirects: 5,
      totalCommissionEarned: 24800,
      directStudents: [],
    },
  },
  {
    id: "SKA-1512",
    name: "Pooja Mishra",
    email: "pooja.mishra@gmail.com",
    phone: "+91 97765 44332",
    avatarImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
    kycVerified: false,
    status: "active",
    joinDate: "15 Mar 2026",
    purchasedCourse: {
      courseName: "Video Editing Mastery & Cinematic Reels",
      courseFee: 2999,
      purchaseDate: "15 Mar 2026",
      paymentStatus: "Paid",
      progressPercent: 30,
    },
    sponsor: {
      sponsorId: "SKA-1144",
      sponsorName: "Kavita Joshi",
      sponsorPhone: "+91 97890 33412",
    },
    referrals: {
      totalDirects: 4,
      totalCommissionEarned: 13500,
      directStudents: [],
    },
  },
  {
    id: "SKA-1520",
    name: "Vikrant Rao",
    email: "vikrant.rao@gmail.com",
    phone: "+91 96543 22110",
    avatarImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200",
    kycVerified: true,
    status: "active",
    joinDate: "18 Mar 2026",
    purchasedCourse: {
      courseName: "Video Editing Mastery & Cinematic Reels",
      courseFee: 2999,
      purchaseDate: "18 Mar 2026",
      paymentStatus: "Paid",
      progressPercent: 25,
    },
    sponsor: {
      sponsorId: "SKA-1045",
      sponsorName: "Priya Sharma",
      sponsorPhone: "+91 98234 11209",
    },
    referrals: {
      totalDirects: 2,
      totalCommissionEarned: 6500,
      directStudents: [],
    },
  },
  {
    id: "SKA-1601",
    name: "Sameer Khan",
    email: "sameer.khan@outlook.com",
    phone: "+91 95432 11009",
    avatarImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
    kycVerified: true,
    status: "active",
    joinDate: "22 Mar 2026",
    purchasedCourse: {
      courseName: "Full Stack Web Development & Freelancing",
      courseFee: 7999,
      purchaseDate: "22 Mar 2026",
      paymentStatus: "Paid",
      progressPercent: 15,
    },
    sponsor: {
      sponsorId: "SKA-1120",
      sponsorName: "Rahul Verma",
      sponsorPhone: "+91 97123 44556",
    },
    referrals: {
      totalDirects: 3,
      totalCommissionEarned: 11200,
      directStudents: [],
    },
  },
];

const AVAILABLE_COURSES = [
  { name: "Business Mastery & High-Ticket Closing", fee: 4999 },
  { name: "Video Editing Mastery & Cinematic Reels", fee: 2999 },
  { name: "Poster, Brand Identity & Logo Design Mastery", fee: 3499 },
  { name: "Content Creation Mastery & Viral Scripting", fee: 2499 },
  { name: "Facebook & Instagram Ads Growth Mastery", fee: 3999 },
  { name: "Full Stack Web Development & Freelancing", fee: 7999 },
];

export default function SuperAdminStudentsManager() {
  const [students, setStudents] = useState<SuperAdminStudent[]>(INITIAL_SUPER_ADMIN_STUDENTS);

  // Synchronize KYC status from unified KYC registry
  useEffect(() => {
    const syncKyc = () => {
      const kycRecords = getKycRecords();
      setStudents((prev) =>
        prev.map((s) => {
          const matchingKyc = kycRecords.find((k) => k.studentId === s.id);
          if (matchingKyc) {
            return {
              ...s,
              kycVerified: matchingKyc.status === "verified",
            };
          }
          return s;
        })
      );
    };

    syncKyc();
    window.addEventListener("skillaura_kyc_updated", syncKyc);
    window.addEventListener("storage", syncKyc);
    return () => {
      window.removeEventListener("skillaura_kyc_updated", syncKyc);
      window.removeEventListener("storage", syncKyc);
    };
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [kycFilter, setKycFilter] = useState<"all" | "verified" | "pending">("all");
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [selectedStudent, setSelectedStudent] = useState<SuperAdminStudent | null>(null);
  const [drawerTab, setDrawerTab] = useState<"purchase" | "details" | "referrals">("purchase");
  const [copiedId, setCopiedId] = useState(false);
  const [copiedInvoice, setCopiedInvoice] = useState(false);

  const handleCopyInvoice = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedInvoice(true);
    setTimeout(() => setCopiedInvoice(false), 2000);
  };

  // Enroll Student Modal State
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [newStudentForm, setNewStudentForm] = useState({
    name: "",
    email: "",
    phone: "",
    courseName: AVAILABLE_COURSES[0].name,
    courseFee: AVAILABLE_COURSES[0].fee,
    sponsorId: "SKA-ROOT88",
    sponsorName: "SkillAura Master (Aman Singhania)",
    kycVerified: true,
  });

  const filteredStudents = students.filter((s) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      s.name.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      s.phone.includes(searchQuery) ||
      s.purchasedCourse.courseName.toLowerCase().includes(q) ||
      s.sponsor.sponsorName.toLowerCase().includes(q) ||
      s.sponsor.sponsorId.toLowerCase().includes(q);

    const matchesKyc =
      kycFilter === "all" ||
      (kycFilter === "verified" && s.kycVerified) ||
      (kycFilter === "pending" && !s.kycVerified);

    const matchesCourse =
      courseFilter === "all" || s.purchasedCourse.courseName === courseFilter;

    return matchesSearch && matchesKyc && matchesCourse;
  });

  // KPI Calculations
  const totalStudentsCount = students.length;
  const totalVerifiedCount = students.filter((s) => s.kycVerified).length;
  const totalCourseRevenue = students.reduce((sum, s) => sum + s.purchasedCourse.courseFee, 0);
  const totalReferralCommissions = students.reduce(
    (sum, s) => sum + s.referrals.totalCommissionEarned,
    0
  );

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleToggleKyc = (studentId: string) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId ? { ...s, kycVerified: !s.kycVerified } : s
      )
    );
    if (selectedStudent && selectedStudent.id === studentId) {
      setSelectedStudent((prev) =>
        prev ? { ...prev, kycVerified: !prev.kycVerified } : null
      );
    }
  };

  const handleCourseChange = (courseName: string) => {
    const found = AVAILABLE_COURSES.find((c) => c.name === courseName);
    setNewStudentForm((prev) => ({
      ...prev,
      courseName,
      courseFee: found ? found.fee : 4999,
    }));
  };

  const handleAddStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentForm.name.trim()) return;

    const newStudent: SuperAdminStudent = {
      id: `SKA-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newStudentForm.name.trim(),
      email: newStudentForm.email.trim() || "student@example.com",
      phone: newStudentForm.phone.trim() || "+91 98000 12345",
      avatarImage: "/images/founder.jpeg",
      kycVerified: newStudentForm.kycVerified,
      status: "active",
      joinDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      purchasedCourse: {
        courseName: newStudentForm.courseName,
        courseFee: newStudentForm.courseFee,
        purchaseDate: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        paymentStatus: "Paid",
        progressPercent: 0,
      },
      sponsor: {
        sponsorId: newStudentForm.sponsorId,
        sponsorName: newStudentForm.sponsorName,
      },
      referrals: {
        totalDirects: 0,
        totalCommissionEarned: 0,
        directStudents: [],
      },
    };

    setStudents([newStudent, ...students]);
    setIsAddStudentOpen(false);
    setNewStudentForm({
      name: "",
      email: "",
      phone: "",
      courseName: AVAILABLE_COURSES[0].name,
      courseFee: AVAILABLE_COURSES[0].fee,
      sponsorId: "SKA-ROOT88",
      sponsorName: "SkillAura Master (Aman Singhania)",
      kycVerified: true,
    });
  };

  const handleExportCSV = () => {
    const headers = [
      "Student ID",
      "Full Name",
      "Email",
      "Phone",
      "Course Purchased",
      "Course Fee (INR)",
      "Purchase Date",
      "Referred By (Sponsor Name)",
      "Sponsor ID",
      "Direct Referrals Made",
      "Referral Income Earned (INR)",
      "KYC Status",
    ];

    const rows = students.map((s) => [
      s.id,
      `"${s.name}"`,
      s.email,
      `"${s.phone}"`,
      `"${s.purchasedCourse.courseName}"`,
      s.purchasedCourse.courseFee,
      s.purchasedCourse.purchaseDate,
      `"${s.sponsor.sponsorName}"`,
      s.sponsor.sponsorId,
      s.referrals.totalDirects,
      s.referrals.totalCommissionEarned,
      s.kycVerified ? "Verified" : "Pending",
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SkillAura_Students_Directory_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 font-sans text-slate-800 dark:text-slate-100">
      {/* ================= 1. FOUR TOP EXECUTIVE METRICS ================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Total Enrolled Students */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-[4px] shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Total Enrolled Students
            </span>
            <Users className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
            {totalStudentsCount} Learners
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Active learning &amp; affiliate accounts</span>
          </div>
        </div>

        {/* Metric 2: Total Course Sales Volume */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-[4px] shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Course Sales Volume
            </span>
            <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono">
            ₹{totalCourseRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Average: ₹{(totalCourseRevenue / totalStudentsCount).toFixed(0)} per enrollment
          </div>
        </div>

        {/* Metric 3: Referral Commissions Generated */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-[4px] shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Referral Payouts Earned
            </span>
            <Wallet className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-700 dark:text-amber-400 font-mono">
            ₹{totalReferralCommissions.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
            <span>Distributed to active student referrers</span>
          </div>
        </div>

        {/* Metric 4: KYC Verification Ratio */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-[4px] shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              KYC Compliance
            </span>
            <ShieldCheck className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
            {totalVerifiedCount} / {totalStudentsCount}
          </div>
          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium mt-1">
            {Math.round((totalVerifiedCount / totalStudentsCount) * 100)}% verified with PAN/Aadhaar
          </div>
        </div>
      </div>

      {/* ================= 2. MAIN DIRECTORY TABLE CONTAINER ================= */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[4px] shadow-xs overflow-hidden">
        {/* Controls Bar: Search, Course Filter, KYC Filter, Action Buttons */}
        <div className="p-3 sm:p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/60 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by student, ID, email, phone, course, sponsor..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[4px] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#116E63] dark:focus:border-emerald-500"
              />
            </div>

            {/* Quick Actions: Export & Enroll */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <button
                onClick={handleExportCSV}
                className="px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-[4px] flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Export Student Directory to CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>

              <button
                onClick={() => setIsAddStudentOpen(true)}
                className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-[#116E63] hover:bg-[#0c5950] dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-[4px] flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Enroll Student</span>
              </button>
            </div>
          </div>

          {/* Filter Bar: Course Dropdown & KYC Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Filter Course:
              </span>
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-[4px] px-2.5 py-1 focus:outline-none focus:border-[#116E63]"
              >
                <option value="all">All Courses ({students.length})</option>
                {AVAILABLE_COURSES.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[4px] p-0.5 self-start sm:self-auto">
              <button
                onClick={() => setKycFilter("all")}
                className={`px-2.5 py-1 text-[11px] font-bold uppercase rounded-[3px] transition-colors cursor-pointer ${kycFilter === "all"
                  ? "bg-[#116E63] dark:bg-emerald-600 text-white"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
              >
                All ({students.length})
              </button>
              <button
                onClick={() => setKycFilter("verified")}
                className={`px-2.5 py-1 text-[11px] font-bold uppercase rounded-[3px] transition-colors cursor-pointer ${kycFilter === "verified"
                  ? "bg-[#116E63] dark:bg-emerald-600 text-white"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
              >
                Verified ({totalVerifiedCount})
              </button>
              <button
                onClick={() => setKycFilter("pending")}
                className={`px-2.5 py-1 text-[11px] font-bold uppercase rounded-[3px] transition-colors cursor-pointer ${kycFilter === "pending"
                  ? "bg-[#116E63] dark:bg-emerald-600 text-white"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
              >
                Pending ({students.length - totalVerifiedCount})
              </button>
            </div>
          </div>
        </div>

        {/* Master Student Roster Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs min-w-[960px]">
            <thead>
              <tr className="bg-slate-100/80 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 uppercase font-bold text-[10px] tracking-wider">
                <th className="py-3 px-3 w-12 text-center">SL No.</th>
                <th className="py-3 px-3">Student</th>
                <th className="py-3 px-3">Course Purchased</th>
                <th className="py-3 px-3">Sponsor</th>
                <th className="py-3 px-3 text-center">Students Added</th>
                <th className="py-3 px-3 text-center">Income Generated</th>
                <th className="py-3 px-3 text-center">Company Profit</th>
                <th className="py-3 px-3 text-center">KYC Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-medium text-slate-800 dark:text-slate-200">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-500">
                    No students matched your search filter.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student, idx) => {
                  const directSalesTotal =
                    student.referrals.directStudents.reduce((acc, d) => acc + d.feePaid, 0) ||
                    student.referrals.totalDirects * 4999;
                  const companyProfitGenerated =
                    Math.round(directSalesTotal * 0.35 + student.purchasedCourse.courseFee * 0.35);

                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* 1. SL No. */}
                      <td className="py-3 px-3 text-center font-mono font-semibold text-slate-500 dark:text-slate-400 text-xs">
                        {idx + 1}
                      </td>

                      {/* 2. Student (Minimized: Clean Avatar, Name & ID only) */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 relative shrink-0 bg-slate-100 dark:bg-slate-800 shadow-2xs">
                            <Image
                              src={student.avatarImage || "/images/founder.jpeg"}
                              alt={student.name}
                              fill
                              sizes="32px"
                              className="object-cover object-top"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm truncate leading-tight">
                              {student.name}
                            </div>
                            <span className="font-mono text-[10px] text-[#116E63] dark:text-emerald-400 font-semibold block mt-0.5">
                              {student.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* 3. Course Purchased: Course Name, Purchase Date, and Amount (Extra Content Removed) */}
                      <td className="py-3 px-3">
                        <div
                          className="font-bold text-slate-900 dark:text-white text-xs truncate max-w-[210px]"
                          title={student.purchasedCourse.courseName}
                        >
                          {student.purchasedCourse.courseName}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5 text-xs">
                          <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                            ₹{student.purchasedCourse.courseFee.toLocaleString()}
                          </span>
                          <span className="text-slate-300 dark:text-slate-600">&bull;</span>
                          <span className="text-slate-500 dark:text-slate-400 text-[11px] font-mono">
                            {student.purchasedCourse.purchaseDate}
                          </span>
                        </div>
                      </td>

                      {/* 4. Sponsor (Minimized: Name & ID only) */}
                      <td className="py-3 px-3">
                        <div
                          className="font-semibold text-slate-900 dark:text-white text-xs truncate max-w-[170px]"
                          title={student.sponsor.sponsorName}
                        >
                          {student.sponsor.sponsorName.split(" (")[0]}
                        </div>
                        <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">
                          {student.sponsor.sponsorId}
                        </span>
                      </td>

                      {/* 5. Students Added (Minimized: Clean count) */}
                      <td className="py-3 px-3 text-center">
                        <span className="font-mono font-bold text-slate-900 dark:text-white text-xs">
                          {student.referrals.totalDirects}
                        </span>
                      </td>

                      {/* 6. Income Generated (Minimized: Clean amount) */}
                      <td className="py-3 px-3 text-center">
                        <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm">
                          ₹{student.referrals.totalCommissionEarned.toLocaleString()}
                        </span>
                      </td>

                      {/* 7. Company Profit (Minimized: Clean profit) */}
                      <td className="py-3 px-3 text-center">
                        <span className="font-mono font-bold text-[#116E63] dark:text-teal-300 text-xs sm:text-sm">
                          +₹{companyProfitGenerated.toLocaleString()}
                        </span>
                      </td>

                      {/* 8. KYC Status */}
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => handleToggleKyc(student.id)}
                          className={`inline-flex items-center gap-1 text-[11px] font-bold cursor-pointer transition-colors ${
                            student.kycVerified
                              ? "text-emerald-700 dark:text-emerald-400 hover:text-emerald-900"
                              : "text-amber-700 dark:text-amber-400 hover:text-amber-900"
                          }`}
                          title="Click to toggle KYC status"
                        >
                          {student.kycVerified ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                              <span>Verified</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                              <span>Pending</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* 9. Action: Inspect (Opens Full Details & Purchase Ledger) */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => {
                            setSelectedStudent(student);
                            setDrawerTab("purchase");
                          }}
                          className="px-2.5 py-1 text-[11px] font-bold text-[#116E63] dark:text-emerald-400 hover:text-white bg-teal-50 dark:bg-teal-950/60 hover:bg-[#116E63] dark:hover:bg-emerald-600 border border-teal-200 dark:border-teal-800 rounded-[4px] transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= 3. 360° STUDENT INSPECTOR SLIDE-OVER DRAWER ================= */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedStudent(null)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-10">
            <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
              {/* Drawer Scrollable Content */}
              <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#116E63] dark:text-emerald-400" />
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white font-[family-name:var(--font-yantramanav)]">
                      Student 360° Information
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-[4px] cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Profile Card */}
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-[4px] space-y-2">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto border-2 border-[#116E63] dark:border-emerald-500 p-0.5 relative shadow-xs bg-white dark:bg-slate-800">
                    <Image
                      src={selectedStudent.avatarImage || "/images/founder.jpeg"}
                      alt={selectedStudent.name}
                      fill
                      className="object-cover object-top rounded-full"
                    />
                  </div>

                  <div>
                    <h4 className="font-bold text-base text-slate-900 dark:text-white uppercase leading-tight">
                      {selectedStudent.name}
                    </h4>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <span className="font-mono text-xs font-bold text-[#116E63] dark:text-emerald-400">
                        {selectedStudent.id}
                      </span>
                      <button
                        onClick={() => handleCopy(selectedStudent.id)}
                        className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                        title="Copy ID"
                      >
                        {copiedId ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleToggleKyc(selectedStudent.id)}
                      className={`text-xs font-bold uppercase tracking-wider cursor-pointer hover:underline inline-flex items-center gap-1 ${selectedStudent.kycVerified
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-amber-700 dark:text-amber-400"
                        }`}
                    >
                      {selectedStudent.kycVerified
                        ? "KYC Verified ✓"
                        : "KYC Pending (Click to Verify)"}
                    </button>
                  </div>

                  {/* Student Full Contact Strip (Moved to Inspect for Clean Table) */}
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700/80 flex items-center justify-around text-xs">
                    <a
                      href={`https://wa.me/${selectedStudent.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 dark:text-emerald-400 hover:underline font-mono font-bold flex items-center gap-1"
                      title="Chat on WhatsApp"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{selectedStudent.phone}</span>
                    </a>
                    <span className="text-slate-300 dark:text-slate-700">&bull;</span>
                    <a
                      href={`mailto:${selectedStudent.email}`}
                      className="text-slate-600 dark:text-slate-300 hover:underline font-mono truncate max-w-[170px]"
                      title="Send Email"
                    >
                      {selectedStudent.email}
                    </a>
                  </div>
                </div>

                {/* Course Name, Purchase Date & Amount (Extra Content Removed) */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-[4px] space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider block">
                        Course Name
                      </span>
                      <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                        {selectedStudent.purchasedCourse.courseName}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider block">
                        Amount
                      </span>
                      <div className="font-mono font-black text-emerald-700 dark:text-emerald-400 text-sm sm:text-base">
                        ₹{selectedStudent.purchasedCourse.courseFee.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="pt-1.5 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Purchase Date:</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {selectedStudent.purchasedCourse.purchaseDate}
                    </span>
                  </div>
                </div>

                {/* Drawer Tab Switcher: Course & Purchase vs Details vs Referrals */}
                <div className="flex border-b border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setDrawerTab("purchase")}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${drawerTab === "purchase"
                      ? "border-[#116E63] text-[#116E63] dark:border-emerald-400 dark:text-emerald-400 font-extrabold"
                      : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                      }`}
                  >
                    Course &amp; Purchase
                  </button>
                  <button
                    onClick={() => setDrawerTab("details")}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${drawerTab === "details"
                      ? "border-[#116E63] text-[#116E63] dark:border-emerald-400 dark:text-emerald-400 font-extrabold"
                      : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                      }`}
                  >
                    Profile &amp; Sponsor
                  </button>
                  <button
                    onClick={() => setDrawerTab("referrals")}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-colors ${drawerTab === "referrals"
                      ? "border-[#116E63] text-[#116E63] dark:border-emerald-400 dark:text-emerald-400 font-extrabold"
                      : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white"
                      }`}
                  >
                    Referrals ({selectedStudent.referrals.totalDirects})
                  </button>
                </div>

                {drawerTab === "purchase" ? (
                  /* TAB 1: DETAILED COURSE PURCHASE & AMOUNT BREAKDOWN */
                  <div className="space-y-4 text-xs">
                    {/* Invoice & Order Card */}
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-[4px] space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                          <Receipt className="w-3.5 h-3.5 text-[#116E63] dark:text-emerald-400" />
                          <span>Tax Invoice &amp; Payment Receipt</span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Paid in Full
                        </span>
                      </div>

                      {/* Invoice Details Grid */}
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase block">
                            Invoice Number:
                          </span>
                          <div className="font-mono font-bold text-slate-900 dark:text-white flex items-center gap-1 mt-0.5">
                            <span>INV-SA-2026-{selectedStudent.id.replace("SKA-", "")}</span>
                            <button
                              onClick={() => handleCopyInvoice(`INV-SA-2026-${selectedStudent.id.replace("SKA-", "")}`)}
                              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                              title="Copy Invoice"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase block">
                            Transaction Ref:
                          </span>
                          <div className="font-mono font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 mt-0.5 truncate">
                            <span>TXN-2026-{selectedStudent.id.replace("SKA-", "")}89</span>
                            <button
                              onClick={() => handleCopyInvoice(`TXN-2026-${selectedStudent.id.replace("SKA-", "")}89`)}
                              className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                              title="Copy Txn Ref"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase block">
                            Payment Date:
                          </span>
                          <span className="font-mono text-slate-800 dark:text-slate-200">
                            {selectedStudent.purchasedCourse.purchaseDate}, 11:30 AM
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase block">
                            Payment Method:
                          </span>
                          <span className="font-mono text-slate-800 dark:text-slate-200">
                            UPI / Razorpay Instant
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Course Itemization & Financial Amount Card */}
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-[4px] space-y-2.5">
                      <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-slate-700">
                        <BookOpen className="w-3.5 h-3.5 text-[#116E63] dark:text-emerald-400" />
                        <span>Course Pricing &amp; Amount Breakdown</span>
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block text-sm">
                              {selectedStudent.purchasedCourse.courseName}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">
                              Lifetime Masterclass Full Curriculum &bull; HD Video Sessions
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-1.5">
                          <div className="flex justify-between text-slate-600 dark:text-slate-400">
                            <span>Base Course Price (Excl. Tax):</span>
                            <span className="font-mono font-medium text-slate-800 dark:text-slate-200">
                              ₹{Math.round(selectedStudent.purchasedCourse.courseFee / 1.18).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between text-slate-600 dark:text-slate-400">
                            <span>Goods &amp; Services Tax (GST 18%):</span>
                            <span className="font-mono font-medium text-slate-800 dark:text-slate-200">
                              ₹{(selectedStudent.purchasedCourse.courseFee - Math.round(selectedStudent.purchasedCourse.courseFee / 1.18)).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700 text-sm">
                            <span className="font-bold text-slate-900 dark:text-white uppercase">
                              Total Course Fee Paid:
                            </span>
                            <span className="font-mono font-black text-emerald-700 dark:text-emerald-400 text-lg">
                              ₹{selectedStudent.purchasedCourse.courseFee.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Financial Distribution on This Purchase */}
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-[4px] space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                        Platform Revenue &amp; Commission Allocation (On This Course)
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[4px]">
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block uppercase">
                            Direct Sponsor (65%)
                          </span>
                          <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-sm block mt-0.5">
                            ₹{Math.round(selectedStudent.purchasedCourse.courseFee * 0.65).toLocaleString()}
                          </span>
                          <span className="text-[10px] text-slate-400 truncate block">
                            Paid to: {selectedStudent.sponsor.sponsorName}
                          </span>
                        </div>

                        <div className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[4px]">
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold block uppercase">
                            Company Profit (35%)
                          </span>
                          <span className="font-mono font-bold text-[#116E63] dark:text-teal-300 text-sm block mt-0.5">
                            +₹{Math.round(selectedStudent.purchasedCourse.courseFee * 0.35).toLocaleString()}
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            SkillAura Platform Net
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Learning Access & Progress */}
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-[4px] space-y-2">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-slate-600 dark:text-slate-400">
                          Course Learning Progress:
                        </span>
                        <span className="text-[#116E63] dark:text-emerald-400 font-mono font-bold">
                          {selectedStudent.purchasedCourse.progressPercent}% Completed
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#116E63] dark:bg-emerald-500 rounded-full transition-all"
                          style={{
                            width: `${selectedStudent.purchasedCourse.progressPercent}%`,
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 dark:text-slate-400">
                        <span>Access Status: <strong>Lifetime Unlimited</strong></span>
                        <span>Certificate: <strong>SkillAura Certified</strong></span>
                      </div>
                    </div>

                    {/* Quick Copy Feedback */}
                    {copiedInvoice && (
                      <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs font-bold rounded-[4px] text-center flex items-center justify-center gap-1.5 animate-in fade-in">
                        <Check className="w-3.5 h-3.5" />
                        <span>Invoice Reference Copied to Clipboard!</span>
                      </div>
                    )}
                  </div>
                ) : drawerTab === "details" ? (
                  /* TAB 2: PROFILE & SPONSOR DETAILS */
                  <div className="space-y-4 text-xs">
                    {/* SECTION: PURCHASED COURSE SUMMARY */}
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-[4px] space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                        Course Enrollment Summary
                      </span>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white text-sm">
                            {selectedStudent.purchasedCourse.courseName}
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            Purchased on: {selectedStudent.purchasedCourse.purchaseDate}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-black text-emerald-700 dark:text-emerald-400 text-base">
                            ₹{selectedStudent.purchasedCourse.courseFee.toLocaleString()}
                          </div>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                            Paid ✓
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* SECTION: REFERRED BY (SPONSOR INFO) */}
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-[4px] space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                        Referred By (Affiliate Sponsor)
                      </span>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">
                            {selectedStudent.sponsor.sponsorName}
                          </div>
                          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                            Sponsor ID: <strong className="text-[#116E63] dark:text-emerald-400">{selectedStudent.sponsor.sponsorId}</strong>
                          </div>
                        </div>
                        {selectedStudent.sponsor.sponsorPhone && (
                          <a
                            href={`https://wa.me/${selectedStudent.sponsor.sponsorPhone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Contact Sponsor</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* SECTION: CONTACT INFORMATION */}
                    <div className="divide-y divide-slate-100 dark:divide-slate-800 border-t border-slate-200 dark:border-slate-800 pt-2">
                      <div className="py-2 flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">
                          WhatsApp / Phone:
                        </span>
                        <span className="font-mono font-bold text-slate-900 dark:text-white">
                          {selectedStudent.phone}
                        </span>
                      </div>
                      <div className="py-2 flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">
                          Official Email:
                        </span>
                        <span className="font-mono text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                          {selectedStudent.email}
                        </span>
                      </div>
                      <div className="py-2 flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">
                          Admission Date:
                        </span>
                        <span className="font-mono text-slate-700 dark:text-slate-300">
                          {selectedStudent.joinDate}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* TAB 2: REFERRALS ROSTER */
                  <div className="space-y-3 text-xs">
                    {/* Summary Card */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-[4px] border border-slate-200 dark:border-slate-700">
                      <div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">
                          Total Direct Students
                        </span>
                        <span className="font-mono font-black text-slate-900 dark:text-white text-base">
                          {selectedStudent.referrals.totalDirects} Learners
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">
                          Commissions Earned
                        </span>
                        <span className="font-mono font-black text-emerald-700 dark:text-emerald-400 text-base">
                          ₹{selectedStudent.referrals.totalCommissionEarned.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Downline Students Referred List */}
                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                        Students Enrolled via {selectedStudent.name}&apos;s Referral Code:
                      </h4>

                      {selectedStudent.referrals.directStudents.length === 0 ? (
                        <div className="py-8 text-center bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-[4px] p-4 text-slate-400">
                          No downline referrals enrolled yet.
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {selectedStudent.referrals.directStudents.map((ref) => (
                            <div
                              key={ref.id}
                              className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] flex items-center justify-between"
                            >
                              <div>
                                <div className="font-bold text-slate-900 dark:text-white">
                                  {ref.name}
                                </div>
                                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                                  ID: {ref.id} &bull; {ref.coursePurchased}
                                </div>
                                <div className="text-[10px] text-slate-400 mt-0.5">
                                  Enrolled: {ref.enrolledDate}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-xs">
                                  +₹{ref.commissionGenerated.toLocaleString()}
                                </div>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  Fee: ₹{ref.feePaid.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center gap-2">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="flex-1 py-2 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase rounded-[4px] hover:bg-white dark:hover:bg-slate-800 cursor-pointer"
                >
                  Close
                </button>
                <a
                  href={`https://wa.me/${selectedStudent.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 bg-[#116E63] hover:bg-[#0c5950] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold uppercase rounded-[4px] shadow-xs cursor-pointer text-center flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 4. ENROLL STUDENT MODAL ================= */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 max-w-md w-full p-5 border border-slate-200 dark:border-slate-800 shadow-2xl rounded-[4px] space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
                Enroll New Student &amp; Assign Course
              </h3>
              <button
                onClick={() => setIsAddStudentOpen(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-[4px] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddStudentSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newStudentForm.name}
                  onChange={(e) =>
                    setNewStudentForm({ ...newStudentForm, name: e.target.value })
                  }
                  placeholder="e.g. Vikram Singhania"
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] text-slate-900 dark:text-white focus:outline-none focus:border-[#116E63]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={newStudentForm.phone}
                    onChange={(e) =>
                      setNewStudentForm({ ...newStudentForm, phone: e.target.value })
                    }
                    placeholder="+91 98000 12345"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] text-slate-900 dark:text-white focus:outline-none focus:border-[#116E63]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={newStudentForm.email}
                    onChange={(e) =>
                      setNewStudentForm({ ...newStudentForm, email: e.target.value })
                    }
                    placeholder="student@example.com"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] text-slate-900 dark:text-white focus:outline-none focus:border-[#116E63]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                  Purchased Course *
                </label>
                <select
                  value={newStudentForm.courseName}
                  onChange={(e) => handleCourseChange(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] text-slate-900 dark:text-white focus:outline-none focus:border-[#116E63]"
                >
                  {AVAILABLE_COURSES.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name} (₹{c.fee.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Course Fee (INR)
                  </label>
                  <input
                    type="number"
                    value={newStudentForm.courseFee}
                    onChange={(e) =>
                      setNewStudentForm({
                        ...newStudentForm,
                        courseFee: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] text-slate-900 dark:text-white focus:outline-none focus:border-[#116E63] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Referred By (Sponsor ID)
                  </label>
                  <input
                    type="text"
                    value={newStudentForm.sponsorId}
                    onChange={(e) =>
                      setNewStudentForm({
                        ...newStudentForm,
                        sponsorId: e.target.value,
                      })
                    }
                    placeholder="SKA-ROOT88"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-[4px] text-slate-900 dark:text-white focus:outline-none focus:border-[#116E63] font-mono"
                  />
                </div>
              </div>

              <div className="pt-1 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="kyc-verified-box"
                  checked={newStudentForm.kycVerified}
                  onChange={(e) =>
                    setNewStudentForm({
                      ...newStudentForm,
                      kycVerified: e.target.checked,
                    })
                  }
                  className="rounded text-[#116E63] focus:ring-[#116E63]"
                />
                <label
                  htmlFor="kyc-verified-box"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer"
                >
                  Mark student KYC as Verified
                </label>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddStudentOpen(false)}
                  className="flex-1 py-2 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase rounded-[4px] hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#116E63] hover:bg-[#0c5950] dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold uppercase rounded-[4px] shadow-xs cursor-pointer"
                >
                  Confirm Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
