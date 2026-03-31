'use client';

import { motion } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';

export default function Footer() {
  const socials = ['TW', 'IG', 'LI', 'BE'];

  return (
    <footer className="border-t border-white/5 py-12 px-8 font-rajdhani text-white">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Main Footer Content */}
        <div className="w-full flex flex-col md:flex-row justify-between mb-16 gap-12 border-b border-white/5 pb-16">
          
          {/* Left: Logo + Tagline + Socials */}
          <div className="md:w-1/2 flex flex-col gap-8">
            <div className="flex items-center gap-4 cursor-default">
              <MagneticButton>
                <img 
                  src="logo.png" 
                  alt="ADU Logo" 
                  className="h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                />
              </MagneticButton>
            </div>
            
            <p className="text-white/50 tracking-widest max-w-sm">
              We craft digital experiences that demand attention. Engineered for the future.
            </p>

            <div className="flex gap-6 mt-4">
              {socials.map((social) => (
                <MagneticButton key={social}>
                  <a 
                    href="#" 
                    className="font-orbitron font-bold text-white/30 hover:text-adu-gold transition-colors tracking-widest text-sm inline-block p-2"
                  >
                    [{social}]
                  </a>
                </MagneticButton>
              ))}
            </div>
          </div>

          {/* Right: CTA */}
          <div className="md:w-1/2 flex flex-col items-start md:items-end gap-6 text-left md:text-right">
            <h3 className="font-orbitron font-bold text-3xl md:text-4xl uppercase tracking-widest text-white/90">
              LET&apos;S BUILD SOMETHING.
            </h3>
            
            <MagneticButton>
              <button className="px-8 py-4 bg-white hover:bg-adu-gold text-adu-black font-orbitron font-bold tracking-[0.2em] transition-colors duration-300">
                INQUIRE@ADUDESIGNS.COM
              </button>
            </MagneticButton>
          </div>
          
        </div>

        {/* Bottom Copyright */}
        <div className="w-full flex justify-between items-center text-xs tracking-widest text-white/20 uppercase font-orbitron">
          <span>&copy; {new Date().getFullYear()} ADU DESIGNS.</span>
          <span>ALL SYSTEMS NORMAL.</span>
        </div>
      </div>
    </footer>
  );
}
