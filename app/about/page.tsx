"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { MapPin, Mail, Calendar, Code2, Layers, Database, Wrench, Palette, ArrowRight, CheckCircle } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { BRAND } from "@/lib/data";
import { fadeInUp, staggerContainer, slideInLeft, slideInRight, scaleIn } from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

interface SkillItem {
  label: string;
  category: string;
}

const SKILLS: SkillItem[] = [
  // Languages
  { label: "TypeScript", category: "Languages" },
  { label: "JavaScript", category: "Languages" },
  { label: "Python", category: "Languages" },
  { label: "Rust", category: "Languages" },
  { label: "Go", category: "Languages" },
  { label: "SQL", category: "Languages" },
  // Frameworks
  { label: "React", category: "Frameworks" },
  { label: "Next.js", category: "Frameworks" },
  { label: "Node.js", category: "Frameworks" },
  { label: "Express", category: "Frameworks" },
  { label: "tRPC", category: "Frameworks" },
  { label: "Prisma", category: "Frameworks" },
  { label: "Tailwind CSS", category: "Frameworks" },
  { label: "Framer Motion", category: "Frameworks" },
  // Tools
  { label: "Git", category: "Tools" },
  { label: "Docker", category: "Tools" },
  { label: "Kubernetes", category: "Tools" },
  { label: "GitHub Actions", category: "Tools" },
  { label: "Vercel", category: "Tools" },
  { label: "AWS", category: "Tools" },
  { label: "Figma", category: "Tools" },
  // Design
  { label: "UI Design", category: "Design" },
  { label: "Design Systems", category: "Design" },
  { label: "Prototyping", category: "Design" },
  { label: "Motion Design", category: "Design" },
];

const SKILL_CATEGORIES = ["Languages", "Frameworks", "Tools", "Design"] as const;

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Languages: <Code2 className="h-4 w-4" />,
  Frameworks: <Layers className="h-4 w-4" />,
  Tools: <Wrench className="h-4 w-4" />,
  Design: <Palette className="h-4 w-4" />,
};

interface ExperienceEntry {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
}

const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "exp-1",
    period: "2022 — Present",
    role: "Senior Full-Stack Engineer",
    company: "Luminary Labs",
    location: "Berlin, Germany",
    description:
      "Leading product engineering for a B2B SaaS platform serving 40,000+ users. Architected a real-time collaboration layer, reduced API latency by 60%, and mentored a team of five engineers.",
    highlights: [
      "Rebuilt the core data pipeline in Rust, cutting processing time by 4x",
      "Introduced design-system tokens adopted across three product lines",
      "Shipped zero-downtime migrations for a 200 GB PostgreSQL database",
    ],
  },
  {
    id: "exp-2",
    period: "2020 — 2022",
    role: "Full-Stack Developer",
    company: "Orbit Digital",
    location: "Amsterdam, Netherlands",
    description:
      "Built and maintained client-facing web applications for fintech and e-commerce clients. Owned the frontend architecture and drove adoption of TypeScript across the engineering team.",
    highlights: [
      "Delivered a React-based trading dashboard used by 5,000 daily active traders",
      "Reduced bundle size by 45% through code-splitting and tree-shaking",
      "Established end-to-end testing practices with Playwright",
    ],
  },
  {
    id: "exp-3",
    period: "2018 — 2020",
    role: "Frontend Developer",
    company: "Pixel & Co.",
    location: "London, UK",
    description:
      "Joined as the second frontend hire at a fast-growing design studio. Translated complex Figma designs into pixel-perfect, accessible React components and built the studio's internal component library.",
    highlights: [
      "Created a component library used across 12 client projects",
      "Improved Lighthouse accessibility scores from 62 to 98 across all sites",
      "Collaborated directly with designers to define the studio's motion language",
    ],
  },
  {
    id: "exp-4",
    period: "2016 — 2018",
    role: "Junior Web Developer",
    company: "Freelance",
    location: "Remote",
    description:
      "Started career building websites and web apps for small businesses and startups. Developed a strong foundation in HTML, CSS, JavaScript, and WordPress while managing client relationships independently.",
    highlights: [
      "Delivered 20+ projects on time and within budget",
      "Built a custom booking system for a Berlin-based hospitality group",
      "Learned the full product lifecycle from brief to deployment",
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const avatarVariants: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function AvatarBlock() {
  const t = useTranslations();
  return (
    <motion.div
      variants={avatarVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center gap-6"
    >
      {/* Avatar placeholder */}
      <div className="relative">
        <div className="h-52 w-52 rounded-2xl bg-gradient-to-br from-[var(--brand-accent)]/30 via-[var(--brand-accent)]/10 to-transparent border border-[var(--brand-accent)]/20 flex items-center justify-center shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)]">
          <span className="text-7xl font-bold text-[var(--brand-accent)] select-none">
            {BRAND.name.charAt(0)}
          </span>
        </div>
        {/* Available badge */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-emerald-400 whitespace-nowrap">
            {t("about.available")}
          </span>
        </div>
      </div>

      {/* Quick meta */}
      <div className="flex flex-col items-center gap-2 text-sm text-[var(--muted-foreground)]">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          <span>{BRAND.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Mail className="h-3.5 w-3.5" />
          <a
            href={`mailto:${BRAND.email}`}
            className="hover:text-[var(--brand-accent)] transition-colors duration-200"
          >
            {BRAND.email}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

interface SkillTagProps {
  label: string;
}

function SkillTag({ label }: SkillTagProps) {
  return (
    <motion.span
      variants={scaleIn}
      whileHover={{ scale: 1.06 }}
      className="inline-flex items-center rounded-lg border border-[var(--brand-accent)]/15 bg-[var(--brand-accent)]/5 px-3 py-1.5 text-sm font-medium text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--brand-accent)]/40 hover:bg-[var(--brand-accent)]/10 cursor-default"
    >
      {label}
    </motion.span>
  );
}

interface TimelineCardProps {
  entry: ExperienceEntry;
  index: number;
}

function TimelineCard({ entry, index }: TimelineCardProps) {
  const t = useTranslations();
  const isLeft = index % 2 === 0;
  const cardVariant = isLeft ? slideInLeft : slideInRight;

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-start">
      {/* Left slot */}
      <div className={isLeft ? "md:text-right" : "md:col-start-3"}>
        {isLeft ? (
          <Reveal delay={index * 0.08}>
            <motion.div
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="rounded-2xl border border-white/8 bg-white/3 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.2),0_16px_40px_-16px_rgba(0,0,0,0.4)] hover:border-[var(--brand-accent)]/25 transition-colors duration-300"
            >
              <CardContent entry={entry} t={t} />
            </motion.div>
          </Reveal>
        ) : (
          <div className="hidden md:block" />
        )}
      </div>

      {/* Center dot */}
      <div className="hidden md:flex flex-col items-center gap-0 pt-6">
        <div className="h-3 w-3 rounded-full bg-[var(--brand-accent)] shadow-[0_0_12px_var(--brand-accent)] ring-4 ring-[var(--brand-accent)]/20" />
        <div className="w-px flex-1 bg-gradient-to-b from-[var(--brand-accent)]/40 to-transparent min-h-[120px]" />
      </div>

      {/* Right slot */}
      <div className={!isLeft ? "" : "md:col-start-3"}>
        {!isLeft ? (
          <Reveal delay={index * 0.08}>
            <motion.div
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="rounded-2xl border border-white/8 bg-white/3 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.2),0_16px_40px_-16px_rgba(0,0,0,0.4)] hover:border-[var(--brand-accent)]/25 transition-colors duration-300"
            >
              <CardContent entry={entry} t={t} />
            </motion.div>
          </Reveal>
        ) : (
          <div className="hidden md:block" />
        )}
      </div>

      {/* Mobile card (always visible, no alternating) */}
      <div className="md:hidden col-span-1">
        <Reveal delay={index * 0.08}>
          <div className="rounded-2xl border border-white/8 bg-white/3 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.2),0_16px_40px_-16px_rgba(0,0,0,0.4)]">
            <CardContent entry={entry} t={t} />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function CardContent({ entry, t }: { entry: ExperienceEntry; t: ReturnType<typeof useTranslations> }) {
  return (
    <>
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="h-3.5 w-3.5 text-[var(--brand-accent)]" />
        <span className="text-xs font-semibold tracking-widest uppercase text-[var(--brand-accent)]">
          {entry.period}
        </span>
      </div>
      <h3 className="text-lg font-bold text-[var(--foreground)] leading-tight mb-0.5">
        {entry.role}
      </h3>
      <p className="text-sm font-medium text-[var(--muted-foreground)] mb-1">
        {entry.company}
      </p>
      <div className="flex items-center gap-1 mb-3">
        <MapPin className="h-3 w-3 text-[var(--muted-foreground)]" />
        <span className="text-xs text-[var(--muted-foreground)]">{entry.location}</span>
      </div>
      <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">
        {entry.description}
      </p>
      <ul className="space-y-2">
        {entry.highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-[var(--muted-foreground)]">
            <CheckCircle className="h-3.5 w-3.5 text-[var(--brand-accent)] mt-0.5 shrink-0" />
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* ── Hero ── */}
      <Reveal>
        <section className="relative overflow-hidden pt-32 pb-20 px-6">
          {/* Background glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-start justify-center"
          >
            <div className="h-[500px] w-[700px] rounded-full bg-[var(--brand-accent)]/6 blur-[120px] -translate-y-1/3" />
          </div>

          <div className="relative mx-auto max-w-4xl text-center">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--brand-accent)]/20 bg-[var(--brand-accent)]/8 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-[var(--brand-accent)]"
            >
              {t("about.eyebrow")}
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-balance leading-[1.05] mb-6"
            >
              {t("about.heroTitle")}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-[var(--muted-foreground)] leading-relaxed max-w-2xl mx-auto text-pretty"
            >
              {t("about.heroSubtitle")}
            </motion.p>
          </div>
        </section>
      </Reveal>

      {/* ── Bio ── */}
      <Reveal>
        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-16 items-start">
              {/* Avatar */}
              <AvatarBlock />

              {/* Bio text */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="space-y-5"
              >
                <motion.h2
                  variants={fadeInUp}
                  className="text-3xl md:text-4xl font-bold tracking-tight"
                >
                  {t("about.bioName")}
                  <span className="block text-[var(--brand-accent)]">{t("about.bioRole")}</span>
                </motion.h2>

                <motion.p variants={fadeInUp} className="text-[var(--muted-foreground)] leading-relaxed">
                  {t("about.bio1")}
                </motion.p>

                <motion.p variants={fadeInUp} className="text-[var(--muted-foreground)] leading-relaxed">
                  {t("about.bio2")}
                </motion.p>

                <motion.p variants={fadeInUp} className="text-[var(--muted-foreground)] leading-relaxed">
                  {t("about.bio3")}
                </motion.p>

                {/* Stat pills */}
                <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 pt-2">
                  {[
                    { value: "8+", label: t("about.statYears") },
                    { value: "60+", label: t("about.statProjects") },
                    { value: "3", label: t("about.statCountries") },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-white/8 bg-white/3 px-5 py-3 text-center"
                    >
                      <div className="text-2xl font-extrabold text-[var(--brand-accent)]">
                        {stat.value}
                      </div>
                      <div className="text-xs text-[var(--muted-foreground)] mt-0.5">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Skills ── */}
      <Reveal>
        <section className="px-6 py-20 bg-white/[0.02] border-y border-white/5">
          <div className="mx-auto max-w-5xl">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="mb-12 text-center"
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-[var(--brand-accent)] mb-3">
                {t("about.skillsEyebrow")}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                {t("about.skillsTitle")}
              </h2>
            </motion.div>

            <div className="space-y-10">
              {SKILL_CATEGORIES.map((cat, catIdx) => {
                const items = SKILLS.filter((s) => s.category === cat);
                return (
                  <Reveal key={cat} delay={catIdx * 0.06}>
                    <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-4 items-start">
                      <div className="flex items-center gap-2 text-sm font-semibold text-[var(--muted-foreground)] pt-1.5">
                        <span className="text-[var(--brand-accent)]">
                          {CATEGORY_ICONS[cat]}
                        </span>
                        {cat}
                      </div>
                      <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        className="flex flex-wrap gap-2"
                      >
                        {items.map((skill) => (
                          <SkillTag key={skill.label} label={skill.label} />
                        ))}
                      </motion.div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Experience Timeline ── */}
      <Reveal>
        <section className="px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="mb-16 text-center"
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-[var(--brand-accent)] mb-3">
                {t("about.expEyebrow")}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                {t("about.expTitle")}
              </h2>
            </motion.div>

            {/* Desktop alternating timeline */}
            <div className="hidden md:flex flex-col gap-0">
              {EXPERIENCE.map((entry, i) => (
                <TimelineCard key={entry.id} entry={entry} index={i} />
              ))}
            </div>

            {/* Mobile stacked timeline */}
            <div className="md:hidden flex flex-col gap-6 relative">
              <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--brand-accent)]/40 via-[var(--brand-accent)]/20 to-transparent" />
              {EXPERIENCE.map((entry, i) => (
                <Reveal key={entry.id} delay={i * 0.08}>
                  <div className="pl-10 relative">
                    <div className="absolute left-1.5 top-6 h-3 w-3 rounded-full bg-[var(--brand-accent)] shadow-[0_0_10px_var(--brand-accent)] ring-4 ring-[var(--brand-accent)]/20" />
                    <div className="rounded-2xl border border-white/8 bg-white/3 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
                      <CardContent entry={entry} t={useTranslations()} />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── CTA ── */}
      <Reveal>
        <section className="px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <div className="relative overflow-hidden rounded-3xl border border-[var(--brand-accent)]/20 bg-gradient-to-br from-[var(--brand-accent)]/10 via-[var(--brand-accent)]/5 to-transparent p-12 text-center shadow-[0_4px_24px_-8px_rgba(0,0,0,0.4)]">
              {/* Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <div className="h-64 w-64 rounded-full bg-[var(--brand-accent)]/15 blur-[80px]" />
              </div>

              <div className="relative">
                <p className="text-xs font-semibold tracking-widest uppercase text-[var(--brand-accent)] mb-4">
                  {t("about.ctaEyebrow")}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-balance">
                  {t("about.ctaTitle")}
                </h2>
                <p className="text-[var(--muted-foreground)] leading-relaxed mb-8 max-w-xl mx-auto text-pretty">
                  {t("about.ctaBody")}
                </p>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-accent)] px-8 py-3.5 text-sm font-bold text-[var(--brand-accent-fg)] shadow-[0_4px_20px_-4px_var(--brand-accent)] transition-all duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-2"
                  >
                    {t("about.ctaButton")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}