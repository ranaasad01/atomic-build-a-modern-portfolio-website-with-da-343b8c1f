export interface NavLink {
  label: string;
  href: string;
  key: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  featured?: boolean;
}

export interface SkillItem {
  name: string;
  category: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
}

export const BRAND = {
  name: "Alex Morris",
  tagline: "Full-Stack Developer",
  email: "hello@alexmorrow.dev",
  location: "Berlin, Germany",
  available: true,
} as const;

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "About", href: "/about", key: "about" },
  { label: "Projects", href: "/projects", key: "projects" },
  { label: "Contact", href: "/contact", key: "contact" },
];
