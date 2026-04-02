'use client';

import { useRef, MouseEvent } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { SITE_DATA } from '@/data/siteData';
import { ShieldAlert } from 'lucide-react';

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const sectionY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>, currentTarget: HTMLDivElement) => {
    const rect = currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    currentTarget.style.setProperty("--mouse-x", `${x}px`);
    currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.section 
      style={{ y: sectionY }}
      ref={containerRef} 
      className="py-24 md:py-28 px-6 md:px-12 max-w-7xl mx-auto font-rajdhani relative border-t border-white/5 bg-[#080808]"
    >
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/20" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/20" />

      <h3 className="section-heading text-adu-gold text-2xl md:text-3xl mb-16 uppercase text-center relative z-10">
        CORE PROTOCOLS
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {SITE_DATA.features.map((feature, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.975 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.975 }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            className="group relative rounded-[2rem] border border-white/10 bg-[#0a0a0a]/95 p-10 overflow-hidden transition-all duration-500 hover:border-adu-gold/25 hover:bg-[#111111]"
          >
            <div 
              className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
              style={{
                background: `radial-gradient(450px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(212,175,55,0.1), transparent 35%)`
              }}
            />

            <div className="absolute top-0 left-0 w-full h-[2px] bg-adu-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />
            
            <div className="relative z-10">
              <div className="mb-6 text-adu-gold opacity-90">
                 <ShieldAlert size={24} />
              </div>

              <h4 className="font-orbitron tracking-[0.18em] text-white text-2xl md:text-3xl mb-4 uppercase group-hover:text-adu-gold transition-colors">
                {feature.title}
              </h4>
              
              <p className="text-white/65 tracking-[0.08em] text-sm md:text-base leading-relaxed transition-colors">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
