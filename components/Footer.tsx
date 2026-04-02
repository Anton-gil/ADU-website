'use client';

import { motion } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';

export default function Footer() {
  const socials = ['TW', 'IG', 'LI', 'BE'];

  return (
    <footer className="border-t border-white/5 py-16 px-6 md:px-12 lg:px-16 font-rajdhani text-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start border-b border-white/5 pb-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4 cursor-default">
              <MagneticButton>
                <img 
                  src="logo.png" 
                  alt="ADU Logo" 
                  className="h-12 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </MagneticButton>
              <span className="font-orbitron text-sm uppercase tracking-[0.35em] text-white/50">
                ADU Designs
              </span>
            </div>
            
            <p className="max-w-lg text-white/60 leading-relaxed">
              We craft digital experiences that demand attention. Engineered for clarity, performance, and premium brand perception.
            </p>

            <div className="flex flex-wrap gap-4 mt-3">
              {socials.map((social) => (
                <MagneticButton key={social}>
                  <a 
                    href="#" 
                    className="font-orbitron font-bold text-white/40 hover:text-adu-gold transition-colors text-sm inline-flex items-center justify-center px-3 py-2 border border-white/10 rounded-full"
                  >
                    {social}
                  </a>
                </MagneticButton>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 text-left lg:text-right">
            <div>
              <h3 className="font-orbitron font-bold text-3xl md:text-4xl uppercase tracking-[0.25em] text-white/90">
                LET&apos;S BUILD SOMETHING.
              </h3>
              <p className="mt-4 text-white/60 leading-relaxed max-w-sm">
                Ready for an elevated online experience? Reach out and let&apos;s make it feel premium.
              </p>
            </div>
            
            <MagneticButton>
              <button
                type="button"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="px-8 py-4 bg-white text-adu-black font-orbitron font-bold tracking-[0.18em] uppercase transition-colors duration-300 hover:bg-adu-gold hover:text-adu-black rounded-full"
              >
                INQUIRE@ADUDESIGNS.COM
              </button>
            </MagneticButton>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center text-xs tracking-[0.35em] text-white/20 uppercase font-orbitron">
          <span>&copy; {new Date().getFullYear()} ADU DESIGNS.</span>
          <span>ALL SYSTEMS NORMAL.</span>
        </div>
      </div>
    </footer>
  );
}
