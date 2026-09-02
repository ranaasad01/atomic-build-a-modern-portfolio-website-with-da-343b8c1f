"use client";

import { useState, useRef, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { Mail, Code2 as Github, Briefcase as Linkedin, MessageCircle as Twitter, Send, CheckCircle, AlertCircle, MapPin, Clock } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { BRAND } from "@/lib/data";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";

const SOCIAL_LINKS = [
  {
    key: "github",
    platform: "GitHub",
    href: "https://github.com/alexmorrow",
    icon: Github,
    description: "See my open-source work",
    color: "hover:text-white",
    glow: "hover:shadow-[0_0_20px_rgba(139,92,246,0.35)]",
  },
  {
    key: "linkedin",
    platform: "LinkedIn",
    href: "https://linkedin.com/in/alexmorrow",
    icon: Linkedin,
    description: "Connect professionally",
    color: "hover:text-[var(--accent)]",
    glow: "hover:shadow-[0_0_20px_rgba(139,92,246,0.35)]",
  },
  {
    key: "twitter",
    platform: "Twitter",
    href: "https://twitter.com/alexmorrow_dev",
    icon: Twitter,
    description: "Follow my thoughts",
    color: "hover:text-[var(--accent)]",
    glow: "hover:shadow-[0_0_20px_rgba(139,92,246,0.35)]",
  },
  {
    key: "email",
    platform: "Email",
    href: "mailto:hello@alexmorrow.dev",
    icon: Mail,
    description: "hello@alexmorrow.dev",
    color: "hover:text-[var(--accent)]",
    glow: "hover:shadow-[0_0_20px_rgba(139,92,246,0.35)]",
  },
];

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const blobVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const successVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  function validate(data: FormState): FormErrors {
    const errs: FormErrors = {};
    if (!data.name.trim()) errs.name = "Name is required.";
    else if (data.name.trim().length < 2) errs.name = "Name must be at least 2 characters.";
    if (!data.email.trim()) errs.email = "Email is required.";
    else if (!validateEmail(data.email)) errs.email = "Please enter a valid email address.";
    if (!data.subject.trim()) errs.subject = "Subject is required.";
    else if (data.subject.trim().length < 4) errs.subject = "Subject must be at least 4 characters.";
    if (!data.message.trim()) errs.message = "Message is required.";
    else if (data.message.trim().length < 20) errs.message = "Message must be at least 20 characters.";
    return errs;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (touched[name]) {
      setErrors(validate(updated));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(form));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allTouched = { name: true, email: true, subject: true, message: true };
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");
    await new Promise((res) => setTimeout(res, 1600));
    setStatus("success");
  }

  function handleReset() {
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
    setTouched({});
    setStatus("idle");
  }

  const inputBase =
    "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-200 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30";
  const inputError = "border-red-500/60 focus:border-red-500 focus:ring-red-500/20";

  return (
    <main className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-hidden">
      {/* Ambient background blob */}
      <motion.div
        variants={blobVariants}
        initial="hidden"
        animate="visible"
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[var(--accent)]/10 blur-[120px] -z-0"
      />

      {/* Page Hero */}
      <Reveal>
        <section className="relative z-10 pt-28 pb-16 px-6 text-center">
          <motion.span
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-semibold tracking-widest uppercase"
          >
            Get in Touch
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white text-balance leading-tight"
          >
            Let&apos;s Build Something
            <br />
            <span className="text-[var(--accent)]">Together</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="mt-5 max-w-xl mx-auto text-white/55 text-base md:text-lg leading-relaxed text-pretty"
          >
            Have a project in mind, a question, or just want to say hello? I&apos;m always open to new conversations and opportunities.
          </motion.p>
        </section>
      </Reveal>

      {/* Two-column layout */}
      <Reveal>
        <section className="relative z-10 max-w-6xl mx-auto px-6 pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

            {/* Contact Form — left (3 cols) */}
            <div className="lg:col-span-3 relative">
              {/* Subtle purple gradient blob behind the card */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 rounded-3xl bg-[var(--accent)]/5 blur-2xl"
              />
              <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm shadow-[0_1px_2px_rgba(0,0,0,0.2),0_16px_48px_-12px_rgba(0,0,0,0.5)] p-8 md:p-10">
                {status === "success" ? (
                  <motion.div
                    variants={successVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col items-center justify-center text-center py-12 gap-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-[var(--accent)]/15 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-[var(--accent)]" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Message Sent!</h2>
                    <p className="text-white/55 max-w-xs leading-relaxed">
                      Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={handleReset}
                      className="mt-2 px-6 py-2.5 rounded-full bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--accent)]/80 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/60"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-white mb-1">Send a Message</h2>
                    <p className="text-white/40 text-sm mb-8">
                      Fill in the form below and I&apos;ll respond as soon as possible.
                    </p>
                    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
                      {/* Name + Email row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">
                            Name
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Alex Morris"
                            value={form.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${inputBase} ${errors.name && touched.name ? inputError : ""}`}
                          />
                          {errors.name && touched.name && (
                            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                              <AlertCircle className="w-3 h-3 flex-shrink-0" />
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">
                            Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`${inputBase} ${errors.email && touched.email ? inputError : ""}`}
                          />
                          {errors.email && touched.email && (
                            <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                              <AlertCircle className="w-3 h-3 flex-shrink-0" />
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label htmlFor="subject" className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">
                          Subject
                        </label>
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder="Project inquiry, collaboration, or just hello"
                          value={form.subject}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${inputBase} ${errors.subject && touched.subject ? inputError : ""}`}
                        />
                        {errors.subject && touched.subject && (
                          <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                            <AlertCircle className="w-3 h-3 flex-shrink-0" />
                            {errors.subject}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="block text-xs font-semibold text-white/50 mb-1.5 uppercase tracking-wider">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={6}
                          placeholder="Tell me about your project, timeline, or anything else you'd like to discuss..."
                          value={form.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`${inputBase} resize-none ${errors.message && touched.message ? inputError : ""}`}
                        />
                        <div className="flex items-start justify-between mt-1.5">
                          {errors.message && touched.message ? (
                            <p className="flex items-center gap-1 text-xs text-red-400">
                              <AlertCircle className="w-3 h-3 flex-shrink-0" />
                              {errors.message}
                            </p>
                          ) : (
                            <span />
                          )}
                          <span className="text-xs text-white/25 ml-auto">
                            {form.message.length} chars
                          </span>
                        </div>
                      </div>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={status === "submitting"}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--accent)] text-white font-semibold text-sm shadow-[0_0_24px_rgba(139,92,246,0.35)] hover:bg-[var(--accent)]/85 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]/60"
                      >
                        {status === "submitting" ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Right panel — social links + info (2 cols) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Quick info */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 shadow-[0_1px_2px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.4)]">
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-5">
                  Quick Info
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-[var(--accent)]" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 mb-0.5">Location</p>
                      <p className="text-sm text-white font-medium">{BRAND.location}</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-[var(--accent)]" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 mb-0.5">Response Time</p>
                      <p className="text-sm text-white font-medium">Within 24 hours</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-[var(--accent)]" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 mb-0.5">Email</p>
                      <a
                        href={`mailto:${BRAND.email}`}
                        className="text-sm text-white font-medium hover:text-[var(--accent)] transition-colors duration-200"
                      >
                        {BRAND.email}
                      </a>
                    </div>
                  </li>
                  {BRAND.available && (
                    <li className="flex items-center gap-3 pt-1">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </span>
                      <span className="text-sm text-emerald-400 font-medium">Available for new projects</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Social links */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 shadow-[0_1px_2px_rgba(0,0,0,0.15),0_8px_24px_-8px_rgba(0,0,0,0.4)]">
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-5">
                  Find Me Online
                </h3>
                <motion.ul
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-3"
                >
                  {SOCIAL_LINKS.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.li key={social.key} variants={fadeInUp}>
                        <motion.a
                          href={social.href}
                          target={social.key !== "email" ? "_blank" : undefined}
                          rel={social.key !== "email" ? "noopener noreferrer" : undefined}
                          whileHover={{ x: 4 }}
                          className={`group flex items-center gap-4 p-3 rounded-xl border border-white/5 bg-white/[0.03] transition-all duration-200 hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/5 ${social.glow}`}
                        >
                          <div className="w-9 h-9 rounded-lg bg-white/5 group-hover:bg-[var(--accent)]/15 flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                            <Icon className={`w-4 h-4 text-white/50 group-hover:text-[var(--accent)] transition-colors duration-200`} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white group-hover:text-[var(--accent)] transition-colors duration-200">
                              {social.platform}
                            </p>
                            <p className="text-xs text-white/35 truncate">{social.description}</p>
                          </div>
                        </motion.a>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </main>
  );
}