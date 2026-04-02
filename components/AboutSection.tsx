'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SITE_DATA } from '@/data/siteData';

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });

  return (
    <section 
      id="about"
      ref={containerRef}
      className="relative min-h-screen py-28 px-6 md:px-12 lg:px-16 z-20 font-rajdhani flex items-center justify-center pointer-events-none"
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-6xl mx-auto grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-16 pointer-events-auto"
      >
        <div className="flex flex-col justify-center gap-8 text-center xl:text-left">
          <span className="section-heading text-sm md:text-base tracking-[0.35em] text-adu-gold opacity-80 mb-2">
            PREMIUM DIGITAL STUDIO
          </span>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-[9vw] md:text-[7vw] lg:text-[6vw] leading-[0.88] font-orbitron font-black tracking-[-0.03em] text-adu-gold">
              ADU
            </h1>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold uppercase tracking-[0.35em] text-transparent [text-stroke:2px_rgba(255,255,255,0.9)]">
              DESIGNS
            </h2>
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto xl:mx-0 text-base md:text-xl leading-relaxed text-white/80"
          >
            {SITE_DATA.hero.tagline}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-xl mx-auto xl:mx-0 text-sm md:text-base tracking-[0.25em] text-white/50 uppercase"
          >
            {SITE_DATA.hero.scrollHint}
          </motion.div>
        </div>

        <motion.div
          initial={{ scale: 0.96, opacity: 0, x: 50 }}
          animate={isInView ? { scale: 1, opacity: 1, x: 0 } : { scale: 0.96, opacity: 0, x: 50 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="rounded-[2rem] border border-white/10 bg-[#0c0c0c]/80 p-8 md:p-10 shadow-[0_40px_120px_rgba(0,0,0,0.35)]"
        >
          <div className="mb-8">
            <span className="section-heading text-2xs uppercase tracking-[0.35em] text-adu-gold opacity-80 mb-3 block">
              WE TRANSFORM
            </span>
            <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-white mb-4">
              Elevated digital identity with precision-led design.
            </h3>
            <p className="text-sm md:text-base text-white/60 leading-relaxed">
              Build a refined online presence with a brand experience that feels executive, minimal, and built to convert.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/5 bg-white/5 p-6">
              <p className="uppercase tracking-[0.3em] text-white/50 text-xs mb-3">Strategy</p>
              <p className="text-sm text-white/80 leading-relaxed">
                Clarity-first approach to positioning, storytelling, and conversion flows.
              </p>
            </div>
            <div className="rounded-3xl border border-white/5 bg-white/5 p-6">
              <p className="uppercase tracking-[0.3em] text-white/50 text-xs mb-3">Craft</p>
              <p className="text-sm text-white/80 leading-relaxed">
                High-end visuals, polished interaction, and UI systems that feel modern.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
