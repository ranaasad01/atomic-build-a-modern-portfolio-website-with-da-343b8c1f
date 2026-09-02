"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { X, ExternalLink, Code2 as Github, ArrowRight, Layers, Globe, Smartphone, Palette, Code2 } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

// ─── Project Data ────────────────────────────────────────────────────────────

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: "Web" | "Mobile" | "Design" | "OSS";
  image: string;
  featured: boolean;
  liveUrl?: string;
  repoUrl?: string;
  year: string;
  role: string;
}

const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Meridian Finance",
    description: "A real-time personal finance dashboard with budget tracking, spending analytics, and bank sync via Plaid.",
    longDescription: "Meridian Finance gives users a single view of their financial life. I built the full stack: a Next.js frontend with recharts-powered analytics, a Node/Express API, and Plaid integration for live bank data. The dashboard updates every 30 seconds and highlights anomalous spending automatically.",
    tags: ["Next.js", "TypeScript", "Plaid API", "PostgreSQL", "Recharts"],
    category: "Web",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/daaf51aae4a34af7a2a010c9a94090d3.webp",
    featured: true,
    liveUrl: "https://meridian.finance",
    repoUrl: "https://github.com/alexmorrow/meridian",
    year: "2024",
    role: "Full-Stack Developer",
  },
  {
    id: "p2",
    title: "Canopy CMS",
    description: "A headless CMS with a visual block editor, multi-locale support, and a GraphQL content API.",
    longDescription: "Canopy is a headless CMS I built for a Berlin agency that needed multi-brand, multi-language content management. The block editor is built with Tiptap, content is stored in Supabase, and the public GraphQL API is generated automatically from the schema. Supports 12 locales and 5 simultaneous brand workspaces.",
    tags: ["React", "Tiptap", "GraphQL", "Supabase", "Node.js"],
    category: "Web",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Stride%20Running",
    featured: true,
    liveUrl: "https://canopy.cms",
    repoUrl: "https://github.com/alexmorrow/canopy",
    year: "2024",
    role: "Lead Developer",
  },
  {
    id: "p3",
    title: "Stride Running",
    description: "A cross-platform training app for runners with GPS route tracking, interval timers, and weekly load analysis.",
    longDescription: "Stride is a React Native app for iOS and Android. It uses the device GPS to record runs, calculates pace and elevation, and builds a weekly training load chart to help runners avoid overtraining. Syncs with Apple Health and Google Fit. Over 4,000 active users since launch.",
    tags: ["React Native", "Expo", "MapboxGL", "SQLite", "Apple Health"],
    category: "Mobile",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/051e5ac6fc3a44da9d88cabe97a48eb1.png",
    featured: true,
    liveUrl: "https://strideapp.run",
    repoUrl: "https://github.com/alexmorrow/stride",
    year: "2023",
    role: "Solo Developer",
  },
  {
    id: "p4",
    title: "Forma Design System",
    description: "A component library and Figma token system used across three production products at a SaaS company.",
    longDescription: "Forma is a design system I built while consulting for a Berlin SaaS company. It covers 60+ React components, a Figma token library synced via Style Dictionary, and a Storybook documentation site. The system reduced cross-team design inconsistency by standardising spacing, color, and typography tokens.",
    tags: ["React", "Storybook", "Figma Tokens", "Style Dictionary", "Radix UI"],
    category: "Design",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/86decf49ca244748a83b13f8d9b2bd20.png",
    featured: false,
    repoUrl: "https://github.com/alexmorrow/forma",
    year: "2023",
    role: "Design Engineer",
  },
  {
    id: "p5",
    title: "tinyq",
    description: "A zero-dependency TypeScript job queue for Node.js backed by Redis Streams, with a web UI for monitoring.",
    longDescription: "tinyq is an open-source job queue I wrote to replace BullMQ in a project where I needed finer control over retry logic and dead-letter handling. It uses Redis Streams natively, has no peer dependencies beyond ioredis, and ships with a minimal web UI for inspecting queues and replaying failed jobs. 340+ GitHub stars.",
    tags: ["TypeScript", "Node.js", "Redis", "Open Source"],
    category: "OSS",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/475fe6435c83413aa304e0620daecdc7.JPG",
    featured: false,
    repoUrl: "https://github.com/alexmorrow/tinyq",
    year: "2023",
    role: "Author & Maintainer",
  },
  {
    id: "p6",
    title: "Habitat Property",
    description: "A property search platform with map-based browsing, saved searches, and agent contact flows.",
    longDescription: "Habitat is a property listing platform built for a German real estate startup. It features a Mapbox-powered map view, server-side filtered search with Elasticsearch, saved search alerts via email, and a contact flow that routes enquiries to the right agent. Built with Next.js App Router and a Django REST backend.",
    tags: ["Next.js", "Mapbox", "Elasticsearch", "Django", "PostgreSQL"],
    category: "Web",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/c95e8817021e47a69837deec43eb6e81.jpg",
    featured: false,
    liveUrl: "https://habitat.de",
    year: "2022",
    role: "Frontend Lead",
  },
  {
    id: "p7",
    title: "Pocket Sous Chef",
    description: "A meal planning app that generates weekly menus from pantry inventory and dietary preferences.",
    longDescription: "Pocket Sous Chef is a React Native app that lets users log their pantry, set dietary preferences, and receive a generated weekly meal plan. Recipes are stored locally with SQLite; the generation algorithm is a constraint-satisfaction solver written in TypeScript. No backend required — fully offline-capable.",
    tags: ["React Native", "TypeScript", "SQLite", "Expo"],
    category: "Mobile",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/bbe715f9e1ba407fb725945bde80217b.webp",
    featured: false,
    repoUrl: "https://github.com/alexmorrow/pocket-sous-chef",
    year: "2022",
    role: "Solo Developer",
  },
  {
    id: "p8",
    title: "use-intersection",
    description: "A tiny React hook wrapping IntersectionObserver with TypeScript generics and SSR safety.",
    longDescription: "use-intersection is a 600-byte React hook I extracted from several projects. It wraps IntersectionObserver with a clean API, handles SSR gracefully (returns false on the server), and is fully typed with TypeScript generics. Published on npm with 1,200+ weekly downloads.",
    tags: ["TypeScript", "React", "npm", "Open Source"],
    category: "OSS",
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/b96ae34cea18433781dedff1697cd459.webp",
    featured: false,
    repoUrl: "https://github.com/alexmorrow/use-intersection",
    year: "2022",
    role: "Author",
  },
];

// ─── Category Filter Config ───────────────────────────────────────────────────

type FilterCategory = "All" | "Web" | "Mobile" | "Design" | "OSS";

const FILTER_CATEGORIES: { label: FilterCategory; icon: React.ReactNode }[] = [
  { label: "All",    icon: <Layers size={14} /> },
  { label: "Web",    icon: <Globe size={14} /> },
  { label: "Mobile", icon: <Smartphone size={14} /> },
  { label: "Design", icon: <Palette size={14} /> },
  { label: "OSS",    icon: <Code2 size={14} /> },
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// ─── ProjectCard ──────────────────────────────────────────────────────────────

function ProjectCard({ project, onClick, index }: { project: Project; onClick: () => void; index: number }) {
  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/4 cursor-pointer",
        "shadow-[0_1px_2px_rgba(0,0,0,0.2),0_8px_32px_-8px_rgba(0,0,0,0.4)]",
        "transition-shadow duration-300 hover:shadow-[0_2px_4px_rgba(0,0,0,0.3),0_16px_48px_-8px_rgba(0,0,0,0.5)]",
        project.featured && index === 0 ? "md:col-span-2" : "",
      )}
    >
      {/* Image */}
      <div className={cn(
        "relative overflow-hidden bg-white/5",
        project.featured && index === 0 ? "h-64 md:h-80" : "h-48",
      )}>
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {project.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-xs font-semibold text-black">
            Featured
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-0.5 text-xs text-white/70 backdrop-blur-sm">
          {project.year}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-base font-semibold text-white leading-snug group-hover:text-[var(--accent)] transition-colors duration-200">
            {project.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-white/60 line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white/8 px-2 py-0.5 text-xs text-white/50"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="rounded-md bg-white/8 px-2 py-0.5 text-xs text-white/40">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/8 pt-3 mt-1">
          <span className="text-xs text-white/40">{project.role}</span>
          <span className="flex items-center gap-1 text-xs font-medium text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            View case study <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

// ─── ProjectDetailModal ───────────────────────────────────────────────────────

function ProjectDetailModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#111] shadow-[0_24px_80px_rgba(0,0,0,0.7)]"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Image */}
          <div className="relative h-56 overflow-hidden rounded-t-2xl bg-white/5">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-[var(--accent)] font-medium">{project.category}</span>
                  <span className="text-white/20">·</span>
                  <span className="text-xs text-white/40">{project.year}</span>
                </div>
                <h2 className="text-xl font-bold text-white">{project.title}</h2>
                <p className="text-sm text-white/50 mt-0.5">{project.role}</p>
              </div>
              <button
                onClick={onClose}
                className="flex-shrink-0 rounded-full p-2 text-white/40 hover:bg-white/8 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Description */}
            <p className="mt-5 text-sm leading-relaxed text-white/70">
              {project.longDescription}
            </p>

            {/* Tech Stack */}
            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            {(project.liveUrl || project.repoUrl) && (
              <div className="mt-6 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
                  >
                    <ExternalLink size={14} />
                    Live Site
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl border border-white/12 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10"
                  >
                    <Github size={14} />
                    Source Code
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const handleClose = useCallback(() => setSelectedProject(null), []);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* ── Hero ── */}
      <Reveal>
        <section className="relative overflow-hidden px-6 pb-16 pt-28 md:pt-36 md:pb-20">
          {/* Background glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-72 w-[600px] rounded-full bg-[var(--accent)]/8 blur-[100px]"
          />
          <div className="relative mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-3 flex items-center gap-2"
            >
              <span className="h-px w-8 bg-[var(--accent)]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                Selected Work
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
              className="text-4xl font-bold tracking-tight text-white md:text-6xl"
            >
              Projects
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.16 }}
              className="mt-4 max-w-xl text-base leading-relaxed text-white/55 md:text-lg"
            >
              Eight projects across web, mobile, design systems, and open source. Each one built to ship, not just to demo.
            </motion.p>
          </div>
        </section>
      </Reveal>

      {/* ── Filter Tabs ── */}
      <Reveal delay={0.05}>
        <section className="sticky top-0 z-20 border-b border-white/8 bg-[var(--background)]/90 backdrop-blur-md px-6 py-3">
          <div className="mx-auto max-w-5xl">
            <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-none">
              {FILTER_CATEGORIES.map(({ label, icon }) => (
                <button
                  key={label}
                  onClick={() => setActiveFilter(label)}
                  className={cn(
                    "flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium border transition-all duration-200",
                    activeFilter === label
                      ? "bg-[var(--accent)] border-[var(--accent)] text-black"
                      : "border-white/10 bg-white/4 text-white/50 hover:border-white/20 hover:text-white/80",
                  )}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Project Grid ── */}
      <section className="px-6 py-14 md:py-20">
        <div className="mx-auto max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="py-24 text-center text-white/30 text-sm">
              No projects in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <Reveal>
        <section className="border-t border-white/8 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-5xl flex flex-col items-center gap-5 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Have a project in mind?
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-white/50">
              I take on a small number of freelance projects each quarter. If you have something concrete to build, get in touch.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              Start a conversation <ArrowRight size={14} />
            </a>
          </div>
        </section>
      </Reveal>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal project={selectedProject} onClose={handleClose} />
        )}
      </AnimatePresence>
    </main>
  );
}