'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { SITE_DATA } from '@/data/siteData';

export default function StatsGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y4 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const parallaxTransforms = [y1, y2, y3, y4];

  return (
    <section ref={containerRef} className="py-28 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 font-rajdhani relative overflow-hidden">
      <motion.h3 
        style={{ y: useTransform(scrollYProgress, [0, 1], [20, -20]) }}
        className="section-heading text-white/30 text-sm md:text-base mb-12 uppercase"
      >
        DATA CORE
      </motion.h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {SITE_DATA.stats.map((stat, i) => (
          <motion.div 
            key={i} 
            style={{ y: parallaxTransforms[i % 4] }}
            className="relative rounded-[2rem] bg-[#080808] border border-white/10 p-8 md:p-10 overflow-hidden flex flex-col items-center justify-center text-center"
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1, delay: stat.delay, ease: "easeOut" }}
              className="absolute top-0 left-0 h-[3px] bg-adu-gold"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: stat.delay + 0.2 }}
              className="mb-4 w-full"
            >
              <span className="font-orbitron font-bold text-4xl md:text-5xl text-white block leading-tight">
                {stat.value}
              </span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: stat.delay + 0.4 }}
              className="w-full"
            >
              <span className="text-white/60 tracking-[0.15em] text-xs md:text-sm uppercase block font-rajdhani">
                {stat.label}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
