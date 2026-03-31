'use client';

import { motion } from 'framer-motion';
import { useRef, MouseEvent, ReactNode } from 'react';

export default function MagneticButton({ children, className }: { children: ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center (-1 to 1)
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    
    // Apply transform via style to avoid react state overhead
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = `translate(0px, 0px)`;
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block transition-transform duration-100 ease-out ${className}`}
    >
      {children}
    </motion.div>
  );
}
