import SuperAdminDashboard from "../../components/super-admin/SuperAdminDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Super Admin Platform Console | SkillAura Academy",
  description: "Master administrative control station for managing student database, course video curriculums, and payout approvals.",
};

export default function SuperAdminPage() {
  return <SuperAdminDashboard />;
}