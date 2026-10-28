"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Mail, MapPin, Circle, Sparkles, Star, Eye, FileCode, Terminal, Activity, Check } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { BRAND } from "@/lib/data";
import { fadeInUp, staggerContainer, scaleIn, slideInLeft, slideInRight } from "@/lib/motion";

const t_hero_title = "Full-Stack Developer";
const t_hero_subtitle = "Crafting digital experiences that leave a mark.";
const t_hero_location = "Berlin, Germany";
const t_hero_available = "Available for work";
const t_hero_cta_primary = "View Projects";
const t_hero_cta_secondary = "Get in Touch";
const t_hero_scroll = "Scroll to explore";

const FEATURED_PROJECTS = [
  {
    id: "luminary",
    title: "Luminary CMS",
    description:
      "A headless content management system built for editorial teams who move fast. Real-time collaboration, version history, and a clean API-first architecture.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "tRPC"],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/ca219a41b6c0442fb1759db97f120a61.png",
    featured: true,
    link: "https://github.com/alexmorrow",
  },
  {
    id: "vaultpay",
    title: "VaultPay",
    description:
      "A fintech dashboard for tracking multi-currency wallets, live exchange rates, and transaction analytics. Built with performance and clarity in mind.",
    tags: ["React", "Node.js", "Redis", "Stripe"],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/93e6c3058d6041908c2c1580b35da61f.jpg",
    featured: true,
    link: "https://github.com/alexmorrow",
  },
  {
    id: "motionkit",
    title: "MotionKit",
    description:
      "An open-source animation toolkit for React developers. Composable hooks, accessible by default, and zero runtime overhead when animations are disabled.",
    tags: ["TypeScript", "Framer Motion", "Storybook", "Vitest"],
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/b1e9921236124915821bf42b7f47f9f4.png",
    featured: true,
    link: "https://github.com/alexmorrow",
  },
];

const SKILLS = [
  { label: "TypeScript", category: "Language" },
  { label: "Rust", category: "Language" },
  { label: "Go", category: "Language" },
  { label: "React", category: "Frontend" },
  { label: "Next.js", category: "Frontend" },
  { label: "Tailwind CSS", category: "Frontend" },
  { label: "Node.js", category: "Backend" },
  { label: "tRPC", category: "Backend" },
  { label: "GraphQL", category: "Backend" },
  { label: "PostgreSQL", category: "Database" },
  { label: "Redis", category: "Database" },
  { label: "Docker", category: "DevOps" },
  { label: "Kubernetes", category: "DevOps" },
  { label: "Figma", category: "Design" },
];

const STATS = [
  { value: "6+", label: "Years building" },
  { value: "40+", label: "Projects shipped" },
  { value: "12", label: "Open-source libs" },
  { value: "98%", label: "Client retention" },
];

const SERVICES = [
  {
    icon: FileCode,
    title: "Full-Stack Engineering",
    description:
      "End-to-end product development from database schema to polished UI. I own the whole stack so nothing falls through the cracks.",
  },
  {
    icon: Terminal,
    title: "API Design",
    description:
      "Clean, versioned, well-documented APIs that your team will actually enjoy working with. REST, GraphQL, or tRPC — whatever fits.",
  },
  {
    icon: Activity,
    title: "Performance Audits",
    description:
      "Systematic profiling and optimization of slow web apps. Core Web Vitals, bundle analysis, database query tuning.",
  },
  {
    icon: Sparkles,
    title: "Technical Leadership",
    description:
      "Architecture reviews, code standards, and mentoring for growing engineering teams. Pragmatic decisions over dogma.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Alex rewrote our entire data pipeline in three weeks and cut our API response times by 70%. Genuinely one of the best engineers I've worked with.",
    name: "Mia Hoffmann",
    role: "CTO, Luminary Labs",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mia%20Hoffmann",
  },
  {
    quote:
      "The attention to detail is remarkable. Every component was accessible, every edge case handled. Our design team was impressed.",
    name: "Jonas Weber",
    role: "Product Lead, VaultPay",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jonas%20Weber",
  },
  {
    quote:
      "Alex doesn't just write code — they think about the product. The questions they asked in week one saved us months of rework.",
    name: "Sara Lindqvist",
    role: "Founder, Nordform",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara%20Lindqvist",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Language: "bg-[var(--tag-language)] text-[var(--tag-language-text)]",
  Frontend: "bg-[var(--tag-frontend)] text-[var(--tag-frontend-text)]",
  Backend: "bg-[var(--tag-backend)] text-[var(--tag-backend-text)]",
  Database: "bg-[var(--tag-database)] text-[var(--tag-database-text)]",
  DevOps: "bg-[var(--tag-devops)] text-[var(--tag-devops-text)]",
  Design: "bg-[var(--tag-design)] text-[var(--tag-design-text)]",
};

const heroVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const heroLine: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="home" className="relative min-h-[92vh] flex items-center overflow-hidden px-6 md:px-12 lg:px-24 pt-28 pb-20">
          {/* Background mesh */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute top-[-10%] left-[10%] h-[520px] w-[520px] rounded-full bg-[var(--accent)]/10 blur-[120px]" />
            <div className="absolute bottom-[5%] right-[5%] h-[360px] w-[360px] rounded-full bg-[var(--accent)]/6 blur-[100px]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_0%,var(--accent)/4,transparent_70%)]" />
          </div>

          <div className="mx-auto w-full max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-center">
              {/* Left: copy */}
              <motion.div variants={heroVariants} initial="hidden" animate="visible" className="space-y-8">
                {/* Status pill */}
                <motion.div variants={heroLine}>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/8 px-4 py-1.5 text-sm font-medium text-[var(--accent)]">
                    <Circle className="h-2 w-2 fill-[var(--accent)] text-[var(--accent)] animate-pulse" aria-hidden="true" />
                    {t_hero_available}
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.div variants={heroLine} className="space-y-2">
                  <p className="text-base font-medium tracking-widest uppercase text-[var(--muted-foreground)]">
                    {BRAND.name}
                  </p>
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-balance text-[var(--foreground)]">
                    {t_hero_title}
                    <span className="block text-[var(--accent)]">
                      &amp; Designer.
                    </span>
                  </h1>
                </motion.div>

                {/* Subhead */}
                <motion.p variants={heroLine} className="max-w-xl text-lg leading-relaxed text-[var(--muted-foreground)] text-pretty">I build digital experiences worth remembering. With deep expertise in TypeScript, React, and Node.js, I deliver products that are performant, inclusive, and a genuine pleasure to use.</motion.p>

                {/* Location */}
                <motion.div variants={heroLine} className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                  <MapPin className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                  {t_hero_location}
                </motion.div>

                {/* CTAs */}
                <motion.div variants={heroLine} className="flex flex-wrap gap-4 pt-2">
                  <Link href="/projects" className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-foreground)] shadow-[0_0_24px_var(--accent)/30] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_36px_var(--accent)/50] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">Projects</Link>
                  <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition-all duration-300 hover:border-[var(--accent)]/50 hover:bg-[var(--card-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
                    {t_hero_cta_secondary}
                  </Link>
                </motion.div>

                {/* Social links */}
                <motion.div variants={heroLine} className="flex items-center gap-4 pt-1">
                  <a href="https://github.com/alexmorrow" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-lg p-2 text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
                    <Github className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a href="https://linkedin.com/in/alexmorrow" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rounded-lg p-2 text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
                    <Linkedin className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a href="https://twitter.com/alexmorrow_dev" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="rounded-lg p-2 text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
                    <Twitter className="h-5 w-5" aria-hidden="true" />
                  </a>
                  <a href={`mailto:${BRAND.email}`} aria-label="Email" className="rounded-lg p-2 text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </a>
                </motion.div>
              </motion.div>

              {/* Right: stats card */}
              <motion.div variants={slideInRight} initial="hidden" animate="visible" className="hidden lg:grid grid-cols-2 gap-4 w-72">
                {STATS.map((stat) => (<motion.div key={stat.label} whileHover={{ y: -4, scale: 1.03 }} transition={{ duration: 0.25, ease: "easeOut" }} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-[0_1px_2px_rgba(0,0,0,0.12),0_8px_24px_-8px_rgba(0,0,0,0.3)] flex flex-col gap-1">
                  <span className="text-3xl font-bold text-[var(--accent)]">
                    {stat.value}
                  </span>
                  <span className="text-xs text-[var(--muted-foreground)] leading-snug">
                    {stat.label}
                  </span>
                </motion.div>))}
              </motion.div>
            </div>

            {/* Scroll hint */}
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.6 }} className="mt-16 text-xs tracking-widest uppercase text-[var(--muted-foreground)]/60 text-center">
              {t_hero_scroll}
            </motion.p>
          </div>
        </section>
      </Reveal>
      {/* ── FEATURED PROJECTS ────────────────────────────────────────────── */}
      <Reveal>
        <section id="projects" className="px-6 md:px-12 lg:px-24 py-24 md:py-32">
          <div className="mx-auto max-w-6xl space-y-14">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="space-y-3">
                <span className="text-xs font-semibold tracking-widest uppercase text-[var(--accent)]">
                  Selected Work
                </span>
                <h2 className="text-4xl font-bold tracking-tight text-[var(--foreground)]">
                  Projects I'm proud of
                </h2>
              </div>
              <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)] shrink-0">
                All projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            {/* Project cards — asymmetric bento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Large featured card */}
              <Reveal delay={0.05} className="md:row-span-2">
                <motion.article whileHover={{ y: -6 }} transition={{ duration: 0.3, ease: "easeOut" }} className="group h-full rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_32px_-8px_rgba(0,0,0,0.35)] flex flex-col">
                  <div className="relative h-64 md:h-80 overflow-hidden bg-[var(--card-hover)]">
                    <img src={FEATURED_PROJECTS[0].image} alt={FEATURED_PROJECTS[0].title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)]/80 to-transparent" />
                  </div>
                  <div className="flex flex-col flex-1 p-7 gap-4">
                    <div className="flex flex-wrap gap-2">
                      {FEATURED_PROJECTS[0].tags.map((tag) => (<span key={tag} className="rounded-full bg-[var(--accent)]/10 px-3 py-0.5 text-xs font-medium text-[var(--accent)]">
                        {tag}
                      </span>))}
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--foreground)]">
                      {FEATURED_PROJECTS[0].title}
                    </h3>
                    <p className="text-[var(--muted-foreground)] leading-relaxed flex-1">
                      {FEATURED_PROJECTS[0].description}
                    </p>
                    <a href={FEATURED_PROJECTS[0].link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--accent)]/80">
                      <Eye className="h-4 w-4" aria-hidden="true" />
                      View project
                    </a>
                  </div>
                </motion.article>
              </Reveal>

              {/* Two smaller cards */}
              {FEATURED_PROJECTS.slice(1).map((project, i) => (
                <Reveal key={project.id} delay={0.1 + i * 0.08}>
                  <motion.article whileHover={{ y: -4 }} transition={{ duration: 0.3, ease: "easeOut" }} className="group rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.1),0_8px_24px_-8px_rgba(0,0,0,0.3)] flex flex-col">
                    <div className="relative h-44 overflow-hidden bg-[var(--card-hover)]">
                      <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--card)]/70 to-transparent" />
                    </div>
                    <div className="flex flex-col flex-1 p-6 gap-3">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (<span key={tag} className="rounded-full bg-[var(--accent)]/10 px-3 py-0.5 text-xs font-medium text-[var(--accent)]">
                          {tag}
                        </span>))}
                      </div>
                      <h3 className="text-xl font-bold text-[var(--foreground)]">
                        {project.title}
                      </h3>
                      <p className="text-sm text-[var(--muted-foreground)] leading-relaxed flex-1">
                        {project.description}
                      </p>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--accent)]/80">
                        <Eye className="h-4 w-4" aria-hidden="true" />
                        View project
                      </a>
                    </div>
                  </motion.article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="services" className="px-6 md:px-12 lg:px-24 py-24 md:py-32 bg-[var(--section-tint)]">
          <div className="mx-auto max-w-6xl space-y-14">
            <div className="max-w-xl space-y-3">
              <span className="text-xs font-semibold tracking-widest uppercase text-[var(--accent)]">
                What I do
              </span>
              <h2 className="text-4xl font-bold tracking-tight text-[var(--foreground)]">
                Services built around your goals
              </h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                Whether you need a product built from scratch or an existing
                codebase brought up to speed, I bring the same level of care
                and craft to every engagement.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SERVICES.map((service, i) => {
                const Icon = service.icon;
                return (
                  <Reveal key={service.title} delay={i * 0.08}>
                    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25, ease: "easeOut" }} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.25)] flex flex-col gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent)]/12 text-[var(--accent)]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-semibold text-[var(--foreground)]">
                        {service.title}
                      </h3>
                      <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                        {service.description}
                      </p>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>
      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="skills" className="px-6 md:px-12 lg:px-24 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
              {/* Left */}
              <div className="space-y-6 lg:sticky lg:top-28">
                <span className="text-xs font-semibold tracking-widest uppercase text-[var(--accent)]">
                  Tech Stack
                </span>
                <h2 className="text-4xl font-bold tracking-tight text-[var(--foreground)]">
                  Tools I reach for every day
                </h2>
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  Six years of building production systems has taught me which
                  tools to trust. I pick the right one for the job — not the
                  trendiest one.
                </p>
                <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
                  {[
                    "Type-safe from database to UI",
                    "Accessibility baked in, not bolted on",
                    "Performance measured, not assumed",
                  ].map((point) => (<li key={point} className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]"
                      aria-hidden="true"
                    />
                    {point}
                  </li>))}
                </ul>
                <Link href="/about" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent)]/80">
                  More about me
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              {/* Right: skill pills */}
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="flex flex-wrap gap-3">
                {SKILLS.map((skill) => (<motion.span key={skill.label} variants={scaleIn} whileHover={{ scale: 1.06 }} className="rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--foreground)] shadow-[0_1px_2px_rgba(0,0,0,0.08)] transition-colors hover:border-[var(--accent)]/40 hover:text-[var(--accent)] cursor-default">
                  {skill.label}
                  <span className="ml-2 text-xs text-[var(--muted-foreground)]">
                    {skill.category}
                  </span>
                </motion.span>))}
              </motion.div>
            </div>
          </div>
        </section>
      </Reveal>
      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <Reveal>
        <section id="testimonials" className="px-6 md:px-12 lg:px-24 py-24 md:py-32 bg-[var(--section-tint)]">
          <div className="mx-auto max-w-6xl space-y-14">
            <div className="text-center space-y-3 max-w-xl mx-auto">
              <span className="text-xs font-semibold tracking-widest uppercase text-[var(--accent)]">
                Kind words
              </span>
              <h2 className="text-4xl font-bold tracking-tight text-[var(--foreground)]">
                What collaborators say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.1}>
                  <motion.figure whileHover={{ y: -4 }} transition={{ duration: 0.25, ease: "easeOut" }} className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-7 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_24px_-8px_rgba(0,0,0,0.25)] flex flex-col gap-5">
                    {/* Stars */}
                    <div className="flex gap-1" aria-label="5 stars">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star
                          key={si}
                          className="h-4 w-4 fill-[var(--accent)] text-[var(--accent)]"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <blockquote className="text-sm leading-relaxed text-[var(--muted-foreground)] flex-1">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="flex items-center gap-3">
                      <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-[var(--border)]" />
                      <div>
                        <p className="text-sm font-semibold text-[var(--foreground)]">
                          {t.name}
                        </p>
                        <p className="text-xs text-[var(--muted-foreground)]">
                          {t.role}
                        </p>
                      </div>
                    </figcaption>
                  </motion.figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>
      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <Reveal>
        <section id="contact" className="px-6 md:px-12 lg:px-24 py-24 md:py-32">
          <div className="mx-auto max-w-3xl">
            <motion.div whileHover={{ scale: 1.005 }} transition={{ duration: 0.3, ease: "easeOut" }} className="relative rounded-3xl border border-[var(--accent)]/20 bg-[var(--card)] p-12 md:p-16 text-center overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.1),0_16px_48px_-12px_rgba(0,0,0,0.4)]">
              {/* Glow */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,var(--accent)/12,transparent_70%)]" />

              <div className="space-y-6">
                <span className="inline-block rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/8 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-[var(--accent)]">
                  Open to opportunities
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--foreground)] text-balance">
                  Let's build something worth using.
                </h2>
                <p className="text-[var(--muted-foreground)] leading-relaxed max-w-lg mx-auto">
                  Have a project in mind or just want to talk shop? My inbox is
                  always open. I respond within 24 hours.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-2">
                  <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-[var(--accent-foreground)] shadow-[0_0_24px_var(--accent)/30] transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_40px_var(--accent)/50] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
                    Start a conversation
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <a href={`mailto:${BRAND.email}`} className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-transparent px-7 py-3.5 text-sm font-semibold text-[var(--foreground)] transition-all duration-300 hover:border-[var(--accent)]/50 hover:bg-[var(--card-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    {BRAND.email}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}