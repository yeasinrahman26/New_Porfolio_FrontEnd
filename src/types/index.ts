import { IconType } from "react-icons";

// API response types (what comes from the backend)
export interface ApiProject {
  _id: string;
  title: string;
  description: string;
  overview_body: string | null;
  tags: string[];
  gradient: string | null;
  emoji: string | null;
  images: {
    url: string;
    alt: string;
    order: number;
  }[];
  live_url: string | null;
  github_url: string | null;
  featured: boolean;
  status: "draft" | "published";
  order_index: number;
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  created_at: string;
  updated_at: string;
}

export interface ApiSkill {
  _id: string;
  name: string;
  icon_name: string;
  color: string;
  percentage: number;
  category: "Frontend" | "Backend" | "Database" | "Tools" | "Deployment";
  order_index: number;
  created_at: string;
}

// Frontend-friendly types (mapped from API)
export interface Project {
  id: string;
  title: string;
  description: string;
  overviewBody: string | null;
  tags: string[];
  gradient: string | null;
  emoji: string | null;
  images: {
    url: string;
    alt: string;
    order: number;
  }[];
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  status: "draft" | "published";
  orderIndex: number;
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  iconName: string;
  color: string;
  percentage: number;
  category: "Frontend" | "Backend" | "Database" | "Tools" | "Deployment";
  orderIndex: number;
}

// Keep your existing types
export interface ContactMessage {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}
