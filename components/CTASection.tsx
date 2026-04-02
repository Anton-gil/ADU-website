'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SITE_DATA } from '@/data/siteData';
import MagneticButton from './MagneticButton';

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 flex flex-col items-center justify-center z-20 font-rajdhani"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8 }}
        className="glass-panel p-10 md:p-16 lg:p-20 w-full max-w-5xl flex flex-col items-center text-center relative pointer-events-auto"
      >
        <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-adu-gold" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-adu-gold" />
        
        <h2 className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white uppercase tracking-[0.25em]">
          {SITE_DATA.cta.heading}
        </h2>
        
        <p className="font-rajdhani tracking-[0.25em] text-white/70 mb-12 text-sm md:text-base border-t border-white/10 pt-6 px-6 md:px-12 max-w-2xl">
          {SITE_DATA.cta.subtext}
        </p>
        
        <MagneticButton>
          <button
            type="button"
            onClick={scrollToContact}
            className="relative overflow-hidden px-14 py-5 border border-adu-gold text-adu-gold font-orbitron tracking-[0.2em] font-bold group cursor-none rounded-full bg-white/5 transition-all duration-300 hover:bg-adu-gold hover:text-adu-black"
          >
            <span className="relative z-10 transition-colors duration-500 uppercase">
              {SITE_DATA.cta.buttonText}
            </span>
            <div className="absolute inset-0 bg-adu-gold opacity-0 group-hover:opacity-100 transition duration-300" />
          </button>
        </MagneticButton>
      </motion.div>
    </section>
  );
}
