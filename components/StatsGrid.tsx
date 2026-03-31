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

  // Create staggered parallax transforms for up to 4 columns
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y4 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const parallaxTransforms = [y1, y2, y3, y4];

  return (
    <section ref={containerRef} className="py-32 px-8 max-w-7xl mx-auto border-t border-white/5 font-rajdhani relative overflow-hidden">
      <motion.h3 
        style={{ y: useTransform(scrollYProgress, [0, 1], [20, -20]) }}
        className="font-orbitron text-white/30 tracking-[0.3em] text-sm mb-16 uppercase"
      >
        // DATA_CORE
      </motion.h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {SITE_DATA.stats.map((stat, i) => (
          <motion.div 
            key={i} 
            style={{ y: parallaxTransforms[i % 4] }}
            className="flex flex-col relative pt-8 group cursor-default"
          >
            {/* Animated Gold Top Border */}
            <motion.div 
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 1, delay: stat.delay, ease: "easeOut" }}
              className="absolute top-0 left-0 h-[2px] bg-adu-gold shadow-[0_0_10px_rgba(212,175,55,1)]"
            />
            
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: stat.delay + 0.2 }}
              className="font-orbitron font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-2"
            >
              {stat.value}
            </motion.span>
            
            <motion.span 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: stat.delay + 0.4 }}
              className="text-white/60 tracking-[0.2em] text-sm md:text-base group-hover:text-adu-gold transition-colors"
            >
              {stat.label}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
