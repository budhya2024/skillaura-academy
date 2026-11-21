export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
  createdAt: string;
  timestamp: number;
  status: "unread" | "read";
}

export const INITIAL_CONTACT_INQUIRIES: ContactInquiry[] = [
  {
    id: "inq-101",
    name: "Rohan Sharma",
    email: "rohan.sharma99@gmail.com",
    mobile: "+91 98765 43210",
    subject: "Digital Marketing & Performance Ads Enrollment",
    message: "I want to enroll in the Digital Marketing course. Does it cover practical campaigns on Facebook Ads and Google Ads? Can I access classes from mobile?",
    createdAt: "Today, 10:24 AM",
    timestamp: Date.now() - 1000 * 60 * 45,
    status: "unread",
  },
  {
    id: "inq-102",
    name: "Priya Patel",
    email: "priya.patel.creatives@gmail.com",
    mobile: "+91 97654 32109",
    subject: "Video Editing Mastery Software Requirements",
    message: "Are Premiere Pro and CapCut included in the curriculum? Also, do I need a high-end laptop or can I start with 8GB RAM?",
    createdAt: "Today, 09:15 AM",
    timestamp: Date.now() - 1000 * 60 * 120,
    status: "unread",
  },
  {
    id: "inq-103",
    name: "Aniket Verma",
    email: "aniket.verma.growth@gmail.com",
    mobile: "+91 96543 21098",
    subject: "Affiliate Referral Link & Commission Payouts",
    message: "I purchased Business Mastery yesterday. How do I get my unique sponsor link to start inviting members, and when are the 60% direct commissions settled?",
    createdAt: "Yesterday, 04:40 PM",
    timestamp: Date.now() - 1000 * 60 * 60 * 18,
    status: "read",
  },
  {
    id: "inq-104",
    name: "Sneha Reddy",
    email: "sneha.reddy.design@gmail.com",
    mobile: "+91 95432 10987",
    subject: "Graphic Design Certification Inquiry",
    message: "Is the certificate verified and verifiable by employers? Also what portfolio projects are created during the logo and branding modules?",
    createdAt: "Yesterday, 02:10 PM",
    timestamp: Date.now() - 1000 * 60 * 60 * 22,
    status: "read",
  },
  {
    id: "inq-105",
    name: "Amit Kulkarni",
    email: "amit.kulkarni88@gmail.com",
    mobile: "+91 94321 09876",
    subject: "Direct UPI / Google Pay Payment Option",
    message: "Can I transfer the course fee directly via UPI QR code or phone number? Need admission confirmation immediately.",
    createdAt: "2 days ago",
    timestamp: Date.now() - 1000 * 60 * 60 * 48,
    status: "unread",
  },
];

const STORAGE_KEY = "skillAuraContactInquiries";

export const getContactInquiries = (): ContactInquiry[] => {
  if (typeof window === "undefined") return INITIAL_CONTACT_INQUIRIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CONTACT_INQUIRIES));
      return INITIAL_CONTACT_INQUIRIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_CONTACT_INQUIRIES;
  } catch (e) {
    console.error("Failed to parse contact inquiries from localStorage", e);
    return INITIAL_CONTACT_INQUIRIES;
  }
};

export const saveContactInquiries = (inquiries: ContactInquiry[]): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
    window.dispatchEvent(new Event("skillaura_inquiries_updated"));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {
    console.error("Failed to save contact inquiries to localStorage", e);
  }
};

export const addContactInquiry = (
  inquiry: Omit<ContactInquiry, "id" | "createdAt" | "timestamp" | "status">
): ContactInquiry => {
  const current = getContactInquiries();
  const dateStr = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const newInquiry: ContactInquiry = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    createdAt: dateStr,
    timestamp: Date.now(),
    status: "unread",
  };

  const updated = [newInquiry, ...current];
  saveContactInquiries(updated);
  return newInquiry;
};

export const updateInquiryStatus = (
  id: string,
  status: "unread" | "read"
): void => {
  const current = getContactInquiries();
  const updated = current.map((item) =>
    item.id === id ? { ...item, status } : item
  );
  saveContactInquiries(updated);
};

export const deleteContactInquiry = (id: string): void => {
  const current = getContactInquiries();
  const updated = current.filter((item) => item.id !== id);
  saveContactInquiries(updated);
};
