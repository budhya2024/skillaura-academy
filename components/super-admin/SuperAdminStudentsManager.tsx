"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MOCK_DOWNLINE_LIST,
  DownlineMember,
} from "../../lib/networkData";
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
} from "lucide-react";

export interface StudentRecord extends DownlineMember {
  kycVerified: boolean;
  avatarImage: string;
}

const INITIAL_STUDENTS: StudentRecord[] = MOCK_DOWNLINE_LIST.map((s, idx) => ({
  ...s,
  kycVerified: idx % 4 !== 0, // majority verified
  avatarImage: idx % 2 === 0
    ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
}));

export default function SuperAdminStudentsManager() {
  const [students, setStudents] = useState<StudentRecord[]>(INITIAL_STUDENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [kycFilter, setKycFilter] = useState<"all" | "verified" | "pending">("all");
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Add Student modal
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [newStudentForm, setNewStudentForm] = useState({
    name: "",
    email: "",
    phone: "",
    package: "Business Mastery & High-Ticket Closing",
    fee: 4999,
  });

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.phone?.includes(searchQuery) ||
      s.package.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesKyc =
      kycFilter === "all" ||
      (kycFilter === "verified" && s.kycVerified) ||
      (kycFilter === "pending" && !s.kycVerified);

    return matchesSearch && matchesKyc;
  });

  const totalVerifiedCount = students.filter((s) => s.kycVerified).length;
  const totalEarnings = students.reduce((acc, s) => acc + s.totalCommission, 0);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
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

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent: StudentRecord = {
      id: `SKA-DIR-${String(students.length + 1).padStart(3, "0")}`,
      name: newStudentForm.name,
      email: newStudentForm.email || "student@example.com",
      phone: newStudentForm.phone || "+91 98000 12345",
      sponsorId: "ROOT-GEN0",
      sponsorName: "Direct Admission",
      level: 1,
      leg: "left",
      package: newStudentForm.package,
      rank: "Active Student",
      status: "active",
      personalActiveSales: 1,
      activeCommissionPaid: 0,
      totalCommission: Math.round(Number(newStudentForm.fee) * 0.65),
      joinDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      directs: 0,
      kycVerified: true,
      avatarImage: "/images/founder.jpeg",
    };

    setStudents([newStudent, ...students]);
    setIsAddStudentOpen(false);
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Top Banner Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200 p-3.5 rounded-[4px] shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Total Students
          </span>
          <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono block mt-0.5">
            {students.length}
          </span>
          <span className="text-[10px] text-slate-400">Enrolled active learners</span>
        </div>

        <div className="bg-white border border-slate-200 p-3.5 rounded-[4px] shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            KYC Verified
          </span>
          <span className="text-xl sm:text-2xl font-black text-emerald-700 font-mono block mt-0.5">
            {totalVerifiedCount} / {students.length}
          </span>
          <span className="text-[10px] text-emerald-600 font-medium">
            {Math.round((totalVerifiedCount / students.length) * 100)}% Verified
          </span>
        </div>

        <div className="bg-white border border-slate-200 p-3.5 rounded-[4px] shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Active Commissions
          </span>
          <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono block mt-0.5">
            ₹{totalEarnings.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-400">Earned by students</span>
        </div>

        <div className="bg-white border border-slate-200 p-3.5 rounded-[4px] shadow-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Status
          </span>
          <span className="text-xl sm:text-2xl font-black text-teal-700 font-mono block mt-0.5">
            100% Active
          </span>
          <span className="text-[10px] text-teal-600 font-medium">All students active</span>
        </div>
      </div>

      {/* Main Student Directory Table */}
      <div className="bg-white border border-slate-200 rounded-[4px] shadow-xs overflow-hidden">
        {/* Controls Bar */}
        <div className="p-3 sm:p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/60">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search students by name, ID, phone, email, course..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-[4px] p-0.5">
              <button
                onClick={() => setKycFilter("all")}
                className={`px-2.5 py-1 text-[11px] font-bold uppercase rounded-[3px] cursor-pointer ${
                  kycFilter === "all"
                    ? "bg-[#116E63] text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setKycFilter("verified")}
                className={`px-2.5 py-1 text-[11px] font-bold uppercase rounded-[3px] cursor-pointer ${
                  kycFilter === "verified"
                    ? "bg-[#116E63] text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                KYC Verified
              </button>
              <button
                onClick={() => setKycFilter("pending")}
                className={`px-2.5 py-1 text-[11px] font-bold uppercase rounded-[3px] cursor-pointer ${
                  kycFilter === "pending"
                    ? "bg-[#116E63] text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Pending
              </button>
            </div>

            <button
              onClick={() => setIsAddStudentOpen(true)}
              className="bg-[#116E63] hover:bg-[#0c5c53] text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-[4px] flex items-center gap-1 cursor-pointer transition-colors shadow-xs shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Enroll Student</span>
            </button>
          </div>
        </div>

        {/* Students Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs min-w-[700px]">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 uppercase font-bold text-[10px] tracking-wider">
                <th className="py-2.5 px-3 sm:px-4">Student</th>
                <th className="py-2.5 px-3">Contact</th>
                <th className="py-2.5 px-3">Enrolled Course</th>
                <th className="py-2.5 px-3">Join Date</th>
                <th className="py-2.5 px-3 text-center">KYC Status</th>
                <th className="py-2.5 px-3 text-right">Income Earned</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="py-2.5 px-3 sm:px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 relative shrink-0 bg-slate-100 shadow-2xs">
                        <Image
                          src={student.avatarImage || "/images/founder.jpeg"}
                          alt={student.name}
                          fill
                          sizes="32px"
                          className="object-cover object-top"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 leading-tight">
                          {student.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500">
                          {student.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-2.5 px-3">
                    <div className="text-[11px] text-slate-700 font-mono">
                      {student.phone}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[140px]">
                      {student.email}
                    </div>
                  </td>

                  <td className="py-2.5 px-3">
                    <span className="font-semibold text-slate-800 block truncate max-w-[200px]">
                      {student.package}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Level {student.level} &bull; {student.rank}
                    </span>
                  </td>

                  <td className="py-2.5 px-3 font-mono text-slate-600 text-[11px]">
                    {student.joinDate}
                  </td>

                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => handleToggleKyc(student.id)}
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-[3px] border cursor-pointer ${
                        student.kycVerified
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                          : "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                      }`}
                      title="Click to toggle verification status"
                    >
                      {student.kycVerified ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Verified</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Pending</span>
                        </>
                      )}
                    </button>
                  </td>

                  <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700 text-xs sm:text-sm">
                    ₹{student.totalCommission.toLocaleString()}
                  </td>

                  <td className="py-2.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-[#116E63] text-slate-700 hover:text-white font-bold text-[10px] uppercase tracking-wider rounded-[3px] transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RIGHT-SIDE SLIDE-OVER DRAWER: INSPECT STUDENT */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedStudent(null)}
          ></div>

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
              <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Student Information Inspector
                  </span>
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="p-1 text-slate-400 hover:text-slate-800 rounded-[4px]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Profile Card */}
                <div className="text-center p-4 bg-slate-50 border border-slate-200 rounded-[4px] space-y-2">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto border-2 border-emerald-500 p-0.5 relative shadow-xs bg-white">
                    <Image
                      src={selectedStudent.avatarImage || "/images/founder.jpeg"}
                      alt={selectedStudent.name}
                      fill
                      className="object-cover object-top rounded-full"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-slate-900 uppercase">
                      {selectedStudent.name}
                    </h3>
                    <div className="flex items-center justify-center gap-1.5 mt-0.5">
                      <span className="font-mono text-xs font-bold text-slate-600 bg-white px-2 py-0.5 rounded-[3px] border border-slate-200">
                        {selectedStudent.id}
                      </span>
                      <button
                        onClick={() => handleCopyId(selectedStudent.id)}
                        className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                        title="Copy Student ID"
                      >
                        {copiedId ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-center">
                    <button
                      onClick={() => handleToggleKyc(selectedStudent.id)}
                      className={`text-xs font-bold px-3 py-1 rounded-[4px] border cursor-pointer ${
                        selectedStudent.kycVerified
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : "bg-amber-50 text-amber-800 border-amber-200"
                      }`}
                    >
                      {selectedStudent.kycVerified ? "KYC Verified ✓" : "KYC Pending — Click to Verify"}
                    </button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-2 bg-slate-50/60 p-3 rounded-[4px] border border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">
                      Income Earned
                    </span>
                    <span className="font-mono font-black text-emerald-700 text-base">
                      ₹{selectedStudent.totalCommission.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">
                      Direct Referrals
                    </span>
                    <span className="font-mono font-black text-slate-900 text-base">
                      {selectedStudent.directs} Students
                    </span>
                  </div>
                </div>

                {/* Information Breakdown */}
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-slate-500 font-medium">WhatsApp / Phone:</span>
                    <span className="font-mono font-bold text-slate-900">
                      {selectedStudent.phone}
                    </span>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Email Address:</span>
                    <span className="font-mono text-slate-800 truncate max-w-[200px]">
                      {selectedStudent.email}
                    </span>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Enrolled Course:</span>
                    <span className="font-bold text-slate-900 truncate max-w-[190px]">
                      {selectedStudent.package}
                    </span>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Admission Date:</span>
                    <span className="font-mono text-slate-700">
                      {selectedStudent.joinDate}
                    </span>
                  </div>
                  <div className="py-2.5 flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Sponsor Name:</span>
                    <span className="text-slate-800 font-medium">
                      {selectedStudent.sponsorName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center gap-2">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="flex-1 py-2 border border-slate-200 text-xs font-bold text-slate-700 uppercase rounded-[4px] hover:bg-white"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    alert(`Direct WhatsApp message link opened for ${selectedStudent.phone}`);
                  }}
                  className="flex-1 py-2 bg-[#116E63] hover:bg-[#0c5c53] text-white text-xs font-bold uppercase rounded-[4px] shadow-xs cursor-pointer"
                >
                  Message Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ENROLL STUDENT */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white max-w-md w-full p-5 border border-slate-300 shadow-xl space-y-4 rounded-[4px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider font-[family-name:var(--font-yantramanav)]">
                Enroll New Student
              </h3>
              <button
                onClick={() => setIsAddStudentOpen(false)}
                className="text-slate-400 hover:text-slate-700 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                  Student Legal Name
                </label>
                <input
                  type="text"
                  required
                  value={newStudentForm.name}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, name: e.target.value })}
                  placeholder="e.g. Mohit Sharma"
                  className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                  Gmail / Email
                </label>
                <input
                  type="email"
                  required
                  value={newStudentForm.email}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, email: e.target.value })}
                  placeholder="mohit.sharma@gmail.com"
                  className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] text-slate-800"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={newStudentForm.phone}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, phone: e.target.value })}
                  placeholder="+91 98234 56789"
                  className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] font-mono text-slate-800"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 uppercase block mb-1">
                  Course Package
                </label>
                <select
                  value={newStudentForm.package}
                  onChange={(e) => setNewStudentForm({ ...newStudentForm, package: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-[4px] focus:outline-none focus:border-[#116E63] font-bold text-slate-700"
                >
                  <option value="Business Mastery & High-Ticket Closing">Business Mastery &amp; High-Ticket Closing</option>
                  <option value="Video Editing Mastery & Cinematic Reels">Video Editing Mastery</option>
                  <option value="Poster, Brand Identity & Logo Design">Poster &amp; Logo Design</option>
                  <option value="Content Creation Mastery & Viral Scripting">Content Creation Mastery</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddStudentOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold uppercase rounded-[4px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#116E63] hover:bg-[#0c5c53] text-white text-xs font-bold uppercase tracking-wider rounded-[4px] cursor-pointer shadow-xs"
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