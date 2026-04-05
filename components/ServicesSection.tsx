'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SITE_DATA } from '@/data/siteData';

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section 
      id="services"
      ref={containerRef}
      className="relative py-28 md:py-32 px-6 md:px-12 lg:px-16 z-20 font-rajdhani flex items-center justify-center pointer-events-none"
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl mx-auto pointer-events-auto"
      >
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-[0.25em]">
            {SITE_DATA.services.heading}
          </h2>
        </div>

        <div className="grid gap-8">
          {SITE_DATA.services.items.map((service, index) => (
            <motion.div 
              key={service.id} 
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
              className="group relative rounded-[2rem] border border-white/10 bg-[#0f0f0f]/90 p-8 md:p-10 shadow-[0_22px_80px_rgba(0,0,0,0.18)] overflow-hidden"
            >
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-adu-gold/40 to-transparent" />
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-orbitron text-2xl md:text-3xl text-adu-gold opacity-80">
                    {service.id}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-orbitron tracking-[0.18em] text-white group-hover:text-adu-gold transition-colors">
                    {service.title}
                  </h3>
                </div>
                <p className="text-white/70 leading-relaxed text-base md:text-lg max-w-3xl">
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
