'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';

export default function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);
  const blur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);

  return (
    <motion.header
      style={{
        backgroundColor: `rgba(10, 10, 10, ${bgOpacity.get()})`,
        backdropFilter: blur,
      }}
      className="fixed top-0 left-0 right-0 z-50 h-24 flex items-center justify-between px-8 text-white border-b border-white/5 transition-colors duration-300"
    >
      <div className="flex items-center gap-4 cursor-pointer group">
        <MagneticButton>
          <img 
            src="/logo.png" 
            alt="ADU Logo" 
            className="h-10 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
          />
        </MagneticButton>
        <span className="font-orbitron tracking-[0.2em] text-sm uppercase hidden sm:block">ADU Designs</span>
      </div>

      <nav className="hidden md:flex items-center gap-12 font-rajdhani text-sm tracking-[0.2em] font-medium text-white/70">
        <MagneticButton><span className="hover:text-adu-gold transition-colors cursor-pointer">WORK</span></MagneticButton>
        <MagneticButton><span className="hover:text-adu-gold transition-colors cursor-pointer">SERVICES</span></MagneticButton>
        <MagneticButton><span className="hover:text-adu-gold transition-colors cursor-pointer">ABOUT</span></MagneticButton>
      </nav>

      <MagneticButton>
        <button className="px-6 py-2.5 border border-adu-gold text-adu-gold font-orbitron text-xs tracking-[0.15em] hover:bg-adu-gold hover:text-adu-black transition-all duration-300 shadow-[0_0_10px_rgba(212,175,55,0.1)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] cursor-none">
          INQUIRE
        </button>
      </MagneticButton>
    </motion.header>
  );
}
