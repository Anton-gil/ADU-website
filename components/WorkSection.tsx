'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SITE_DATA } from '@/data/siteData';
import MagneticButton from '@/components/MagneticButton';

export default function WorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-20%' });

  const workMotionProps = (index: number) => {
    const directions = [ { x: -40, y: 0 }, { x: 0, y: 40 }, { x: 40, y: 0 } ];
    const direction = directions[index % directions.length];
    return {
      initial: { opacity: 0, x: direction.x, y: direction.y, scale: 0.96 },
      animate: isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, x: direction.x, y: direction.y, scale: 0.96 },
      transition: { duration: 0.85, delay: index * 0.12, ease: 'easeOut' },
    } as const;
  };

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative py-28 md:py-32 px-6 md:px-12 lg:px-16 bg-[#050505] border-t border-white/5 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.85 }}
        className="pointer-events-none absolute inset-0"
      >
        <motion.div
          initial={{ rotate: 0, opacity: 0.08, scale: 0.9 }}
          animate={isInView ? { rotate: 360, opacity: 0.18, scale: 1 } : { rotate: 0, opacity: 0 }}
          transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
          className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-adu-gold/10 bg-[conic-gradient(at_top_left,_rgba(212,175,55,0.18),_transparent_25%,_rgba(212,175,55,0.08),_transparent_55%)] blur-3xl"
        />
        <motion.div
          initial={{ rotate: 0, opacity: 0.05, scale: 0.8 }}
          animate={isInView ? { rotate: -360, opacity: 0.1, scale: 0.85 } : { rotate: 0, opacity: 0 }}
          transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
          className="absolute left-1/2 top-[25%] h-[420px] w-[420px] -translate-x-1/2 rounded-full border border-white/10 bg-[radial-gradient(circle,_rgba(255,255,255,0.08),_transparent_45%)] blur-2xl"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.85 }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-12 max-w-3xl">
          <span className="section-heading text-adu-gold text-xs uppercase tracking-[0.35em] opacity-80">
            WORK
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl font-orbitron font-bold uppercase tracking-[0.16em] text-white">
            Selected case studies with premium detail.
          </h2>
          <p className="mt-5 text-base md:text-lg leading-relaxed text-white/70">
            High-end digital experiences built for clear business impact, refined aesthetics, and conversion focus.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {SITE_DATA.nav.work.map((project, index) => (
            <motion.article
              key={project.name}
              {...workMotionProps(index)}
              className="group rounded-[2rem] border border-white/10 bg-[#0b0b0b]/95 p-6 transition hover:border-adu-gold/25"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.35em] text-adu-gold opacity-80">
                  {project.category}
                </span>
                <div className="h-12 w-12 rounded-3xl bg-white/5" />
              </div>
              <h3 className="mt-5 text-xl font-orbitron text-white">{project.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{project.description}</p>
              <MagneticButton>
                <Link
                  href={`/work/${project.slug}`}
                  className="mt-6 inline-flex rounded-full border border-adu-gold bg-adu-gold/5 px-5 py-3 text-xs uppercase tracking-[0.2em] text-adu-gold transition hover:bg-adu-gold hover:text-adu-black"
                >
                  {project.cta}
                </Link>
              </MagneticButton>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
