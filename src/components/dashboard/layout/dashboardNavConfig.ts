import {
  Sparkles,
  BookOpen,
  Video,
  FileCheck,
  Award,
  CreditCard,
  FolderDown,
  Upload,
  Users,
  Layers,
  FolderTree,
  TicketPercent,
  BarChart3,
  User,
  PlayCircle,
  LucideIcon,
  Star,
  Bell,
} from "lucide-react";

export interface NavSubItem {
  id: string;
  label: string;
  badge?: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  group?: string;
  children?: NavSubItem[];
}

export const STUDENT_NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview", icon: Sparkles, group: "Main" },
  { id: "courses", label: "My Courses", icon: BookOpen, group: "Learning" },
  { id: "live", label: "Live Schedule", icon: Video, badge: "Live", group: "Learning" },
  { id: "assignments", label: "Assignments", icon: FileCheck, badge: "1 Due", group: "Learning" },
  { id: "resources", label: "Resources", icon: FolderDown, group: "Learning" },
  { id: "payments", label: "Installments", icon: CreditCard, badge: "৳4k Due", group: "Account" },
  { id: "certificate", label: "Certificate", icon: Award, group: "Account" },
  { id: "reviews", label: "My Reviews", icon: Star, group: "Account" },
  { id: "profile", label: "Settings", icon: User, group: "Account" },
];

export const INSTRUCTOR_NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview", icon: Sparkles, group: "Main" },
  { id: "batches", label: "Batches & Live Studio", icon: Video, badge: "Tonight", group: "Teaching" },
  { id: "grading", label: "Review Submissions", icon: FileCheck, badge: "3 Due", group: "Teaching" },
  { id: "materials", label: "Course Content Builder", icon: Upload, group: "Teaching" },
  { id: "resources", label: "Resources", icon: FolderDown, group: "Teaching" },
  { id: "profile", label: "Trainer Profile", icon: User, group: "Account" },
];

export const ADMIN_NAV_ITEMS: NavItem[] = [
  // CORE
  { id: "overview", label: "Dashboard Overview", icon: Sparkles, group: "Core" },
  { id: "admissions", label: "Admissions & Payments", icon: CreditCard, badge: "2 Pending", group: "Core" },

  // ACADEMY
  {
    id: "batch_management",
    label: "Courses & Batches",
    icon: Layers,
    group: "Academic",
    children: [
      { id: "categories", label: "Course Categories" },
      { id: "courses", label: "All Courses" },
      { id: "batches", label: "Active Batches" },
    ],
  },
  {
    id: "course_contents",
    label: "Course Curriculum",
    icon: BookOpen,
    group: "Academic",
    children: [
      { id: "modules", label: "Modules" },
      { id: "lessons", label: "Lessons" },
      { id: "assignments", label: "Assignments" },
      { id: "resources", label: "Resources" },
    ],
  },

  // USERS
  {
    id: "user_management",
    label: "User Management",
    icon: Users,
    group: "Users",
    children: [
      { id: "students", label: "Students Directory" },
      { id: "instructors", label: "Trainers & Mentors" },
    ],
  },

  // CMS
  {
    id: "cms",
    label: "CMS & Website",
    icon: FolderTree,
    group: "CMS & Media",
    children: [
      { id: "walkthroughs", label: "Live BIM Walkthroughs" },
      { id: "blogs", label: "Blogs & News" },
      { id: "galleries", label: "Photo Galleries" },
      { id: "portfolios", label: "Student Portfolios" },
      { id: "reviews", label: "Student Reviews" },
      { id: "notices", label: "Notices & Alerts" },
      { id: "contacts", label: "Contact Inquiries" },
    ],
  },

  // FINANCIAL & SETTINGS
  { id: "certificates", label: "Certificates", icon: Award, group: "Administration" },
  { id: "coupons", label: "Coupon Engine", icon: TicketPercent, badge: "Active", group: "Administration" },
  { id: "revenue", label: "Financial Reports", icon: BarChart3, group: "Administration" },
  { id: "settings", label: "System Settings", icon: User, group: "Administration" },
];
