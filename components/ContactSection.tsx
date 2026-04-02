'use client';

import { FormEvent, useRef, useState, ChangeEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-20%' });
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Project inquiry from ${form.name || 'a new lead'}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\n\nMessage:\n${form.message}`);
    const mailtoLink = `mailto:inquire@adudesigns.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative py-28 md:py-32 px-6 md:px-12 lg:px-16 bg-[#050505] border-t border-white/5"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.9 }}
        className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-start"
      >
        <div className="space-y-6">
          <span className="section-heading text-adu-gold text-sm md:text-base uppercase tracking-[0.35em] opacity-80">
            LET&apos;S CONNECT
          </span>
          <h2 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-[0.2em] text-white">
            Start the inquiry with the details that matter.
          </h2>
          <p className="max-w-xl text-white/70 leading-relaxed text-base md:text-lg">
            Share a few details about your project so we can tailor the experience, timing, and scope for your brand.
          </p>
          <div className="rounded-[2rem] border border-white/10 bg-[#0a0a0a]/90 p-8 shadow-[0_30px_90px_rgba(0,0,0,0.18)]">
            <p className="text-white/60 leading-relaxed text-sm md:text-base">
              We respond quickly and keep the process direct. The more precise your brief, the better the proposal.
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="rounded-[2rem] border border-white/10 bg-[#0b0b0b]/95 p-8 md:p-10 shadow-[0_30px_80px_rgba(0,0,0,0.2)]"
        >
          {submitted ? (
            <div className="space-y-6 text-center">
              <p className="text-adu-gold uppercase tracking-[0.35em] text-sm">SUBMITTED</p>
              <h3 className="text-3xl md:text-4xl font-orbitron font-bold text-white">
                Thank you.
              </h3>
              <p className="text-white/70 leading-relaxed">
                We&apos;ve captured your details. You can continue the conversation in your inbox.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-3 text-sm text-white/60">
                  Name
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="input-field"
                    required
                  />
                </label>
                <label className="flex flex-col gap-3 text-sm text-white/60">
                  Email
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    className="input-field"
                    required
                  />
                </label>
              </div>

              <label className="flex flex-col gap-3 text-sm text-white/60">
                Company / Brand
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Company name"
                  className="input-field"
                />
              </label>

              <label className="flex flex-col gap-3 text-sm text-white/60">
                Message
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Briefly describe your project goals"
                  className="input-field min-h-[180px] resize-none"
                  required
                />
              </label>

              <MagneticButton>
                <button
                  type="submit"
                  className="w-full rounded-full border border-adu-gold bg-adu-gold/5 px-6 py-4 text-sm font-orbitron uppercase tracking-[0.2em] text-adu-gold transition hover:bg-adu-gold hover:text-adu-black"
                >
                  Send inquiry
                </button>
              </MagneticButton>
            </form>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
