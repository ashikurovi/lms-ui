"use client";

import React, { useState, useEffect } from "react";
import { AdminDashboardTab, PendingApproval } from "@/types/dashboard";
import AdminOverviewTab from "./AdminOverviewTab";
import AdminAdmissionsTab from "./AdminAdmissionsTab";
import AdminStudentsTab from "./AdminStudentsTab";
import AdminInstructorsTab from "./AdminInstructorsTab";
import AdminBatchesTab from "./AdminBatchesTab";
import AdminModulesTab from "./AdminModulesTab";
import AdminLessonsTab from "./AdminLessonsTab";
import AdminCouponsTab from "./AdminCouponsTab";
import AdminAssignmentsTab from "./AdminAssignmentsTab";
import AdminResourcesTab from "./AdminResourcesTab";
import AdminCertificatesTab from "./AdminCertificatesTab";
import AdminRevenueTab from "./AdminRevenueTab";
import AdminSettingsTab from "./AdminSettingsTab";
import AdminCategoriesTab from "./AdminCategoriesTab";
import AdminCoursesTab from "./AdminCoursesTab";
import AdminCreateBatchModal from "./AdminCreateBatchModal";
import { CreateBatchPayload } from "@/services/api/batchesApi";

import AdminBlogsTab from "./AdminBlogsTab";
import AdminGalleriesTab from "./AdminGalleriesTab";
import AdminPortfoliosTab from "./AdminPortfoliosTab";
import AdminWalkthroughsTab from "./AdminWalkthroughsTab";
import AdminReviewsTab from "./AdminReviewsTab";
import AdminNoticesTab from "./AdminNoticesTab";
import AdminContactsTab from "./AdminContactsTab";

const TAB_LABELS: Record<string, string> = {
  overview: "Dashboard Overview",
  admissions: "Admissions & Payments",
  students: "Students Directory",
  instructors: "Trainers & Mentors",
  categories: "Course Categories",
  courses: "All Courses",
  batches: "Batches",
  modules: "Modules",
  lessons: "Lessons",
  assignments: "Assignments",
  resources: "Resources",
  certificates: "Certificates",
  coupons: "Coupons",
  revenue: "Financial Reports",
  settings: "System Settings",
  blogs: "Blogs & Articles",
  galleries: "Photo Galleries",
  portfolios: "Student Portfolios",
  walkthroughs: "Live BIM Walkthroughs",
  reviews: "Student Reviews",
  notices: "Notices & Announcements",
  contacts: "Contact Messages",
};

export default function AdminDashboardView({ adminTab, setAdminTab }: { adminTab: AdminDashboardTab; setAdminTab: (tab: AdminDashboardTab) => void }) {
  const [isCreateBatchModalOpen, setIsCreateBatchModalOpen] = useState(false);
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { enrollmentsApi } = await import("@/services/api/enrollmentsApi");
        const res = await enrollmentsApi.getAllEnrollments({ limit: 50 });
        if (res.statusCode === 200 && res.data?.items) {
          const apiApprovals: PendingApproval[] = res.data.items.map((e) => {
            const total = Number(e.total_amount) || 0;
            const paid = Number(e.paid_amount) || 0;
            const due = Math.max(0, total - paid);
            
            return {
              id: e.id,
              name: e.student?.name || "Student",
              course: e.batch?.course?.title || e.batch?.name || "BIM Engineering Course",
              method: e.paid_amount ? `Direct (৳${paid})` : "Manual Entry",
              amount: `৳${(paid || total).toLocaleString()}`,
              phone: e.student?.phone || "N/A",
              status: e.status?.toLowerCase() === "active" ? "Approved" : e.status?.toLowerCase() === "cancelled" ? "Rejected" : "Pending",
              batch: e.batch?.name,
              email: e.student?.email,
              totalFee: `৳${total.toLocaleString()}`,
              advancePaid: `৳${paid.toLocaleString()}`,
              dueAmount: `৳${due.toLocaleString()}`,
            };
          });
          setPendingApprovals(apiApprovals);
        }
      } catch { }
    })();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const { enrollmentsApi } = await import("@/services/api/enrollmentsApi");
      await enrollmentsApi.updateEnrollment(id, { status: "active" });
    } catch { }
    setPendingApprovals((prev) => prev.map((item) => (item.id === id ? { ...item, status: "Approved" } : item)));
  };

  const handleReject = async (id: string) => {
    try {
      const { enrollmentsApi } = await import("@/services/api/enrollmentsApi");
      await enrollmentsApi.updateEnrollment(id, { status: "cancelled" });
    } catch { }
    setPendingApprovals((prev) => prev.map((item) => (item.id === id ? { ...item, status: "Rejected" } : item)));
  };

  const handleLaunchBatch = async (newBatch: CreateBatchPayload) => {
    setIsCreateBatchModalOpen(false);
  };

  return (
    <div key={adminTab} className="animate-fade-in-up space-y-6 font-sans">
      {/* Top Breadcrumb & Status */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/70 text-xs text-slate-500 font-medium">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setAdminTab("overview")}
            className="hover:text-[#0077b6] transition-colors cursor-pointer"
          >
            Admin Console
          </button>
          <span className="text-slate-300">/</span>
          <span className="font-bold text-slate-900">
            {TAB_LABELS[adminTab] || adminTab}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Super Admin Mode</span>
        </div>
      </div>

      {adminTab === "overview" && (
        <AdminOverviewTab pendingApprovals={pendingApprovals} onApprove={handleApprove} onReject={handleReject} onNavigateToAdmissions={() => setAdminTab("admissions")} onOpenCreateBatch={() => setIsCreateBatchModalOpen(true)} />
      )}
      {adminTab === "admissions" && <AdminAdmissionsTab pendingApprovals={pendingApprovals} onApprove={handleApprove} onReject={handleReject} />}
      {adminTab === "students" && <AdminStudentsTab />}
      {adminTab === "instructors" && <AdminInstructorsTab />}
      {adminTab === "categories" && <AdminCategoriesTab />}
      {adminTab === "courses" && <AdminCoursesTab />}
      {adminTab === "batches" && <AdminBatchesTab />}
      {adminTab === "modules" && <AdminModulesTab />}
      {adminTab === "lessons" && <AdminLessonsTab />}
      {adminTab === "assignments" && <AdminAssignmentsTab />}
      {adminTab === "resources" && <AdminResourcesTab />}
      {adminTab === "certificates" && <AdminCertificatesTab />}
      {adminTab === "coupons" && <AdminCouponsTab />}
      {adminTab === "revenue" && <AdminRevenueTab />}
      {adminTab === "settings" && <AdminSettingsTab />}
      {adminTab === "blogs" && <AdminBlogsTab />}
      {adminTab === "galleries" && <AdminGalleriesTab />}
      {adminTab === "portfolios" && <AdminPortfoliosTab />}
      {adminTab === "walkthroughs" && <AdminWalkthroughsTab />}
      {adminTab === "reviews" && <AdminReviewsTab />}
      {adminTab === "notices" && <AdminNoticesTab />}
      {adminTab === "contacts" && <AdminContactsTab />}
      <AdminCreateBatchModal isOpen={isCreateBatchModalOpen} onClose={() => setIsCreateBatchModalOpen(false)} onCreate={handleLaunchBatch} />
    </div>
  );
}
