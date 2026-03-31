'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const { scrollY } = useScroll();
  
  // Fade OUT scroll prompt
  const promptOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    <section className="relative h-[150vh] pointer-events-none z-10 font-rajdhani">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-end pb-16 overflow-hidden">
        {/* Scroll indicator */}
        <motion.div 
          style={{ opacity: promptOpacity }}
          className="flex flex-col items-center gap-6 text-white/50 animate-pulse pointer-events-none"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
