'use client';

import { useState, useEffect } from 'react';
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ScrollCanvas from '@/components/ScrollCanvas';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import CTASection from '@/components/CTASection';
import StatsGrid from '@/components/StatsGrid';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Force scroll to top on load to fix mid-scroll restoration issues
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollY } = useScroll();

  // Map 0 -> 1000px to complete the 120-frame animation (approx 1.5 scrolls)
  const canvasProgress = useTransform(scrollY, [0, 1000], [0, 1]);

  // Dim and blur background when user scrolls past 800px (Hero exit)
  const canvasOpacity = useTransform(scrollY, [600, 1200], [1, 0.2]);
  const canvasBlur = useTransform(scrollY, [600, 1200], ["blur(0px)", "blur(8px)"]);

  return (
    <main className="relative bg-[#050505] min-h-screen text-white selection:bg-adu-gold selection:text-adu-black overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader 
            progress={progress} 
            key="preloader" 
          />
        )}
      </AnimatePresence>

      <Navbar />
      
      {/* FIXED SEQUENCE BACKGROUND */}
      <motion.div 
        style={{ opacity: canvasOpacity, filter: canvasBlur }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <div className="absolute inset-0 z-0">
          <ScrollCanvas 
            scrollYProgress={canvasProgress} 
            totalFrames={120} 
            imageFolderPath="frames" 
            onProgress={setProgress}
            onLoadComplete={() => setIsLoading(false)}
          />
        </div>
        {/* Darkening gradient over canvas to ensure text is legible everywhere */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/40 to-[#050505]/60 pointer-events-none z-10" />
      </motion.div>

      {/* NORMAL DOCUMENT FLOW */}
      <div className="relative z-10 w-full flex flex-col">
        {/* Uses 150vh height to give the user enough scroll space to watch the moon spin */}
        <Hero />
        
        {/* Scrolling content sections */}
        <AboutSection />
        <ServicesSection />
        <CTASection />
        
        {/* Bottom content with solid backing to finish the scroll */}
        <div className="relative bg-[#050505]/90 backdrop-blur-xl border-t border-white/5">
          <StatsGrid />
          <Features />
          <Footer />
        </div>
      </div>
    </main>
  );
}
