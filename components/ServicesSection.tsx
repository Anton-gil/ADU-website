'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SITE_DATA } from '@/data/siteData';

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-32 px-8 z-20 font-rajdhani flex items-center justify-center pointer-events-none"
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl mx-auto glass-panel p-8 md:p-16 relative pointer-events-auto bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10"
      >
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-adu-gold/50" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-adu-gold/50" />
        
        <span className="font-orbitron text-adu-gold text-sm tracking-[0.3em] mb-6 block">
          {SITE_DATA.services.label}
        </span>
        
        <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-16 uppercase">
          {SITE_DATA.services.heading}
        </h2>
        
        <div className="flex flex-col gap-10">
          {SITE_DATA.services.items.map((service, index) => (
            <motion.div 
              key={service.id} 
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
              className="group flex gap-6 items-start border-b border-white/5 pb-8"
            >
              <span className="font-orbitron text-white/20 text-xl font-bold mt-1">{service.id}</span>
              <div>
                <h3 className="font-orbitron tracking-widest text-2xl mb-2 group-hover:text-adu-gold transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/60 tracking-widest uppercase font-light leading-relaxed max-w-2xl text-sm md:text-base">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
