export interface KycRecord {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  avatarImage: string;
  docType: "Aadhaar Card" | "PAN Card" | "Voter ID" | "Passport";
  docNumber: string;
  frontDocUrl: string;
  backDocUrl?: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  upiId: string;
  accountHolderName: string;
  submittedDate: string;
  status: "pending" | "verified" | "rejected";
  reviewedDate?: string;
  rejectionReason?: string;
}

export const INITIAL_KYC_RECORDS: KycRecord[] = [
  {
    id: "KYC-2026-001",
    studentId: "SKA-ROOT88",
    studentName: "SkillAura Master (Aman Singhania)",
    studentEmail: "admin@skillauraacademy.in",
    studentPhone: "+91 91442 88641",
    avatarImage: "/images/founder.jpeg",
    docType: "Aadhaar Card",
    docNumber: "XXXX-XXXX-8842",
    frontDocUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600",
    backDocUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600",
    bankName: "HDFC Bank Ltd",
    accountNumber: "50100489123041",
    ifscCode: "HDFC000124",
    upiId: "skillaura@icici",
    accountHolderName: "Aman Singhania",
    submittedDate: "15-Jan-2026, 10:30 AM",
    status: "verified",
    reviewedDate: "15-Jan-2026, 12:45 PM",
  },
  {
    id: "KYC-2026-002",
    studentId: "SKA-1045",
    studentName: "Priya Sharma",
    studentEmail: "priya.sharma@gmail.com",
    studentPhone: "+91 98234 11209",
    avatarImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    docType: "Aadhaar Card",
    docNumber: "XXXX-XXXX-1120",
    frontDocUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600",
    backDocUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600",
    bankName: "HDFC Bank",
    accountNumber: "50100234112045",
    ifscCode: "HDFC0000120",
    upiId: "priya@okhdfcbank",
    accountHolderName: "Priya Sharma",
    submittedDate: "28-Jan-2026, 14:10 PM",
    status: "verified",
    reviewedDate: "28-Jan-2026, 16:30 PM",
  },
  {
    id: "KYC-2026-003",
    studentId: "SKA-1052",
    studentName: "Rajesh Mehta",
    studentEmail: "rajesh.mehta@gmail.com",
    studentPhone: "+91 98450 77123",
    avatarImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    docType: "PAN Card",
    docNumber: "ABCDE7712M",
    frontDocUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600",
    bankName: "ICICI Bank",
    accountNumber: "002401577123",
    ifscCode: "ICIC0000024",
    upiId: "rajesh@icici",
    accountHolderName: "Rajesh Mehta",
    submittedDate: "01-Feb-2026, 11:20 AM",
    status: "verified",
    reviewedDate: "01-Feb-2026, 15:10 PM",
  },
  {
    id: "KYC-2026-004",
    studentId: "SKA-1120",
    studentName: "Rahul Verma",
    studentEmail: "rahul.verma@gmail.com",
    studentPhone: "+91 97123 44556",
    avatarImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    docType: "Aadhaar Card",
    docNumber: "XXXX-XXXX-4455",
    frontDocUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600",
    backDocUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600",
    bankName: "Axis Bank",
    accountNumber: "9180100445567",
    ifscCode: "UTIB0000180",
    upiId: "rahul@axisbank",
    accountHolderName: "Rahul Verma",
    submittedDate: "05-Feb-2026, 09:30 AM",
    status: "verified",
    reviewedDate: "05-Feb-2026, 13:00 PM",
  },
  {
    id: "KYC-2026-005",
    studentId: "SKA-1144",
    studentName: "Kavita Joshi",
    studentEmail: "kavita.joshi@gmail.com",
    studentPhone: "+91 98334 89101",
    avatarImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    docType: "Aadhaar Card",
    docNumber: "XXXX-XXXX-8910",
    frontDocUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600",
    backDocUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600",
    bankName: "State Bank of India",
    accountNumber: "34891012345",
    ifscCode: "SBIN0001244",
    upiId: "kavita@oksbi",
    accountHolderName: "Kavita Joshi",
    submittedDate: "14-Feb-2026, 12:40 PM",
    status: "verified",
    reviewedDate: "14-Feb-2026, 17:15 PM",
  },
  {
    id: "KYC-2026-006",
    studentId: "SKA-1188",
    studentName: "Ananya Roy",
    studentEmail: "ananya.roy@gmail.com",
    studentPhone: "+91 98765 88765",
    avatarImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    docType: "Voter ID",
    docNumber: "VOT-WB-88765",
    frontDocUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600",
    bankName: "Kotak Mahindra Bank",
    accountNumber: "8876543210",
    ifscCode: "KKBK0000155",
    upiId: "ananya@kotak",
    accountHolderName: "Ananya Roy",
    submittedDate: "10-Feb-2026, 16:15 PM",
    status: "verified",
    reviewedDate: "11-Feb-2026, 10:00 AM",
  },
  {
    id: "KYC-2026-007",
    studentId: "SKA-1205",
    studentName: "Suresh Nair",
    studentEmail: "suresh.nair@gmail.com",
    studentPhone: "+91 98451 56589",
    avatarImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    docType: "Aadhaar Card",
    docNumber: "XXXX-XXXX-5658",
    frontDocUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600",
    backDocUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600",
    bankName: "Federal Bank",
    accountNumber: "156589001234",
    ifscCode: "FDRL0001565",
    upiId: "suresh@federal",
    accountHolderName: "Suresh Nair",
    submittedDate: "19-Nov-2026, 14:15 PM",
    status: "pending",
  },
  {
    id: "KYC-2026-008",
    studentId: "SKA-1284",
    studentName: "Deepak Patel",
    studentEmail: "deepak.patel@gmail.com",
    studentPhone: "+91 98250 12840",
    avatarImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
    docType: "PAN Card",
    docNumber: "XYZDP1284P",
    frontDocUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600",
    bankName: "Bank of Baroda",
    accountNumber: "012840001928",
    ifscCode: "BARB0VABHOP",
    upiId: "deepak@baroda",
    accountHolderName: "Deepak Patel",
    submittedDate: "20-Nov-2026, 09:20 AM",
    status: "pending",
  },
  {
    id: "KYC-2026-009",
    studentId: "SKA-1310",
    studentName: "Sneha Kapoor",
    studentEmail: "sneha.kapoor@gmail.com",
    studentPhone: "+91 98112 13100",
    avatarImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    docType: "Aadhaar Card",
    docNumber: "XXXX-XXXX-1310",
    frontDocUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600",
    backDocUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600",
    bankName: "Yes Bank",
    accountNumber: "013100234567",
    ifscCode: "YESB0000131",
    upiId: "sneha@yesbank",
    accountHolderName: "Sneha Kapoor",
    submittedDate: "02-Mar-2026, 11:45 AM",
    status: "verified",
    reviewedDate: "02-Mar-2026, 14:10 PM",
  },
  {
    id: "KYC-2026-010",
    studentId: "SKA-1480",
    studentName: "Amit Kumar",
    studentEmail: "amit.kumar@gmail.com",
    studentPhone: "+91 98980 11223",
    avatarImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    docType: "Aadhaar Card",
    docNumber: "XXXX-XXXX-1480",
    frontDocUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600",
    backDocUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600",
    bankName: "HDFC Bank",
    accountNumber: "50100480148022",
    ifscCode: "HDFC0000480",
    upiId: "amit.k@okhdfcbank",
    accountHolderName: "Amit Kumar",
    submittedDate: "20-Nov-2026, 15:40 PM",
    status: "pending",
  },
  {
    id: "KYC-2026-011",
    studentId: "SKA-1512",
    studentName: "Pooja Mishra",
    studentEmail: "pooja.mishra@gmail.com",
    studentPhone: "+91 97765 44332",
    avatarImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
    docType: "PAN Card",
    docNumber: "ABCDE1512P",
    frontDocUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600",
    bankName: "ICICI Bank",
    accountNumber: "004401512345",
    ifscCode: "ICIC0000044",
    upiId: "pooja.m@icici",
    accountHolderName: "Pooja Mishra",
    submittedDate: "14-Mar-2026, 10:15 AM",
    status: "pending",
  },
  {
    id: "KYC-2026-012",
    studentId: "SKA-1520",
    studentName: "Vikrant Rao",
    studentEmail: "vikrant.rao@gmail.com",
    studentPhone: "+91 96543 22110",
    avatarImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200",
    docType: "Aadhaar Card",
    docNumber: "XXXX-XXXX-1520",
    frontDocUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600",
    backDocUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600",
    bankName: "State Bank of India",
    accountNumber: "352001122334",
    ifscCode: "SBIN0000352",
    upiId: "vikrant@oksbi",
    accountHolderName: "Vikrant Rao",
    submittedDate: "18-Mar-2026, 14:20 PM",
    status: "verified",
    reviewedDate: "18-Mar-2026, 17:00 PM",
  },
  {
    id: "KYC-2026-013",
    studentId: "SKA-1601",
    studentName: "Sameer Khan",
    studentEmail: "sameer.khan@outlook.com",
    studentPhone: "+91 95432 11009",
    avatarImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
    docType: "Aadhaar Card",
    docNumber: "XXXX-XXXX-1601",
    frontDocUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600",
    backDocUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600",
    bankName: "Canara Bank",
    accountNumber: "160101008899",
    ifscCode: "CNRB0001601",
    upiId: "sameer@canara",
    accountHolderName: "Sameer Khan",
    submittedDate: "17-Nov-2026, 16:20 PM",
    status: "rejected",
    reviewedDate: "18-Nov-2026, 11:30 AM",
    rejectionReason: "Aadhaar card scan is blurry on the back address side. Please upload a clear original document photo or PDF.",
  },
];

const STORAGE_KEY = "skillAuraKycRegistry";

export function getKycRecords(): KycRecord[] {
  if (typeof window === "undefined") {
    return INITIAL_KYC_RECORDS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_KYC_RECORDS));
      return INITIAL_KYC_RECORDS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_KYC_RECORDS;
  } catch (err) {
    console.error("Failed to parse KYC records from localStorage:", err);
    return INITIAL_KYC_RECORDS;
  }
}

export function saveKycRecords(records: KycRecord[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    window.dispatchEvent(new Event("skillaura_kyc_updated"));
  } catch (err) {
    console.error("Failed to save KYC records to localStorage:", err);
  }
}

export function getStudentKyc(studentId: string): KycRecord | undefined {
  const records = getKycRecords();
  return records.find((r) => r.studentId === studentId);
}

export function updateStudentKycDetails(
  studentId: string,
  updates: Partial<KycRecord>
): KycRecord | null {
  const records = getKycRecords();
  const idx = records.findIndex((r) => r.studentId === studentId);
  if (idx === -1) return null;

  const updated: KycRecord = {
    ...records[idx],
    ...updates,
  };
  records[idx] = updated;
  saveKycRecords(records);
  return updated;
}

export function updateKycStatus(
  recordId: string,
  status: "pending" | "verified" | "rejected",
  rejectionReason?: string
): KycRecord | null {
  const records = getKycRecords();
  const idx = records.findIndex((r) => r.id === recordId);
  if (idx === -1) return null;

  const now = new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const updated: KycRecord = {
    ...records[idx],
    status,
    reviewedDate: now,
    rejectionReason: status === "rejected" ? rejectionReason : undefined,
  };

  records[idx] = updated;
  saveKycRecords(records);
  return updated;
}
