'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface PreloaderProps {
  progress: number; // 0 to 100
}

export default function Preloader({ progress }: PreloaderProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-adu-black overflow-hidden font-rajdhani"
    >
      <div className="flex flex-col items-center gap-8 z-10">
        {/* Animated ADU Logo or simple text */}
        <motion.div
          animate={{ scale: [0.95, 1, 0.95], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-4"
        >
          <Image
            src="/logo.png"
            alt="ADU logo"
            width={48}
            height={48}
            className="rounded-full bg-white/5 p-2"
          />
          <span className="font-orbitron text-4xl font-bold tracking-[0.5em] text-white/80">
            ADU
          </span>
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-64 h-[2px] bg-white/10 relative overflow-hidden">
          {/* Progress Fill */}
          <motion.div
            className="absolute top-0 left-0 h-full bg-adu-gold shadow-[0_0_15px_rgba(212,175,55,0.8)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>

        {/* Percentage Text */}
        <div className="flex flex-col items-center gap-2 text-adu-gold">
          <span className="font-orbitron font-bold text-xl tracking-widest text-glow">
            {Math.floor(progress)}%
          </span>
          <span className="text-xs tracking-[0.4em] uppercase text-white/40">
            Initializing Sequence
          </span>
        </div>
      </div>

      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] bg-adu-gold/5 blur-[150px] rounded-full pointer-events-none" />
    </motion.div>
  );
}
