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
      className="py-24 px-8 max-w-7xl mx-auto font-rajdhani relative border-t border-white/5 bg-[#080808]"
    >
      
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/20" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/20" />

      <h3 className="font-orbitron font-bold text-adu-gold text-2xl tracking-[0.2em] mb-16 uppercase text-center text-glow relative z-10">
        CORE PROTOCOLS
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/5 p-[1px] relative z-10">
        {SITE_DATA.features.map((feature, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            className="group relative bg-[#0a0a0a] p-12 overflow-hidden transition-colors duration-500 hover:bg-[#0f0f0f]"
          >
            {/* Glow Effect */}
            <div 
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(400px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(212,175,55,0.15), transparent 40%)`
              }}
            />

            {/* Hover top line gold */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-adu-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />
            
            <div className="text-adu-gold mb-6 opacity-50 group-hover:opacity-100 transition-opacity relative z-10">
               <ShieldAlert size={24} />
            </div>

            <h4 className="font-orbitron tracking-widest text-[#e0e0e0] text-xl mb-4 uppercase group-hover:text-white transition-colors relative z-10">
              {feature.title}
            </h4>
            
            <p className="text-[#888] tracking-[0.1em] uppercase text-sm leading-relaxed group-hover:text-[#aaa] transition-colors relative z-10">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
