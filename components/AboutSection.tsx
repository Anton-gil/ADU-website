'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20%" });

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-32 px-8 z-20 font-rajdhani flex items-center justify-center pointer-events-none"
    >
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-5xl mx-auto flex flex-col items-center text-center pointer-events-auto"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 mb-16 relative">
          {/* Logo */}
          <motion.img 
            initial={{ scale: 0.9, opacity: 0, x: -50 }}
            animate={isInView ? { scale: 1, opacity: 1, x: 0 } : { scale: 0.9, opacity: 0, x: -50 }}
            transition={{ duration: 1, delay: 0.2 }}
            src="logo.png" 
            alt="ADU Logo" 
            className="h-64 md:h-[32rem] w-auto object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          />

          {/* Text Group */}
          <div className="flex flex-col items-center md:items-start relative">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[18vw] md:text-[14vw] font-orbitron font-black leading-none tracking-tighter text-adu-gold drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]"
            >
              ADU
            </motion.h1>
            
            <motion.h2 
              initial={{ y: 10, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-4xl md:text-6xl font-orbitron font-bold tracking-[0.4em] ml-1 md:ml-2 mt-4 text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.9)]"
            >
              DESIGNS
            </motion.h2>
          </div>
        </div>

        {/* Paragraph */}
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
           transition={{ duration: 0.8, delay: 0.8 }}
           className="relative"
        >
          {/* Decorative lines */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-8 w-24 h-[1px] bg-gradient-to-r from-transparent via-adu-gold/50 to-transparent" />
          
          <p className="text-xl md:text-2xl font-rajdhani font-light tracking-[0.2em] text-white/80 max-w-2xl mx-auto uppercase leading-loose">
            We build web designs that transcend.
          </p>
        </motion.div>
        
      </motion.div>
    </section>
  );
}
