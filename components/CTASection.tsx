'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SITE_DATA } from '@/data/siteData';
import MagneticButton from './MagneticButton';

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[80vh] py-32 flex flex-col items-center justify-center z-20 font-rajdhani"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8 }}
        className="glass-panel p-12 md:p-24 flex flex-col items-center text-center relative pointer-events-auto bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10"
      >
        {/* Decorative Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-adu-gold" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-adu-gold" />
        
        <h2 className="font-orbitron text-5xl md:text-7xl font-bold mb-6 text-glow uppercase">
          {SITE_DATA.cta.heading}
        </h2>
        
        <p className="font-rajdhani tracking-[0.3em] text-white/60 mb-12 text-sm md:text-base border-t border-white/10 pt-6 px-12 max-w-2xl block uppercase">
          {SITE_DATA.cta.subtext}
        </p>
        
        <MagneticButton>
          <button className="relative overflow-hidden px-14 py-6 bg-transparent border border-adu-gold text-adu-gold font-orbitron tracking-[0.2em] font-bold group cursor-none">
            <span className="relative z-10 transition-colors duration-500 group-hover:text-adu-black uppercase">
              {SITE_DATA.cta.buttonText}
            </span>
            <div className="absolute inset-0 bg-adu-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
          </button>
        </MagneticButton>
      </motion.div>
    </section>
  );
}
