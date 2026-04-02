'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Monitor,
  Layers,
  Sparkles,
  Code2,
  Wand2,
  LifeBuoy,
  ShieldCheck,
  Users,
} from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';
import { SITE_DATA } from '@/data/siteData';

const iconMap = {
  Monitor,
  Layers,
  Sparkles,
  Code2,
  Wand2,
  LifeBuoy,
  ShieldCheck,
  Users,
};

type PanelType = 'work' | 'services' | 'about';

export default function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.92]);
  const blur = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(12px)']);

  const [activeSection, setActiveSection] = useState<PanelType | null>(null);
  const [openPanel, setOpenPanel] = useState<PanelType | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePanel, setMobilePanel] = useState<PanelType | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (mobileOpen && mobileRef.current?.contains(target)) {
        return;
      }
      if (!rootRef.current?.contains(target)) {
        setOpenPanel(null);
        setMobileOpen(false);
        setMobilePanel(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenPanel(null);
        setMobileOpen(false);
        setMobilePanel(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const scrollToSection = (section: PanelType) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(section);
    }
  };

  const handleNavigation = (section: PanelType) => {
    setOpenPanel(null);
    setMobilePanel(null);
    setMobileOpen(false);
    scrollToSection(section);
  };

  const toggleMobilePanel = (panel: PanelType) => {
    setMobilePanel((current) => (current === panel ? null : panel));
  };

  const renderWorkPanel = () => (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr] p-8 lg:p-10">
      <div className="rounded-[2rem] border border-white/10 bg-[#0c0c0c]/95 p-8 lg:p-10">
        <span className="section-heading text-adu-gold text-xs uppercase tracking-[0.35em] opacity-80">
          WORK
        </span>
        <h3 className="mt-6 text-3xl md:text-4xl font-orbitron font-bold uppercase tracking-[0.14em] text-white">
          Featured projects with premium craft.
        </h3>
        <p className="mt-5 text-sm md:text-base leading-relaxed text-white/70 max-w-xl">
          Explore curated case studies built to elevate brands, create refined digital experiences, and convert with confidence.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {SITE_DATA.nav.work.map((item) => (
          <div key={item.name} className="group rounded-[2rem] border border-white/10 bg-[#0b0b0b]/95 p-6 transition hover:border-adu-gold/25">
            <span className="text-xs uppercase tracking-[0.35em] text-adu-gold opacity-85">
              {item.category}
            </span>
            <h4 className="mt-4 text-xl font-orbitron text-white">
              {item.name}
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {item.description}
            </p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <MagneticButton>
                <Link
                  href={`/work/${item.slug}`}
                  className="text-sm uppercase tracking-[0.2em] text-adu-gold transition-colors duration-300 hover:text-white"
                >
                  {item.cta}
                </Link>
              </MagneticButton>
              <div className="h-16 w-16 rounded-3xl bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderServicesPanel = () => (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr] p-8 lg:p-10">
      <div className="rounded-[2rem] border border-white/10 bg-[#0c0c0c]/95 p-8 lg:p-10">
        <span className="section-heading text-adu-gold text-xs uppercase tracking-[0.35em] opacity-80">
          SERVICES
        </span>
        <h3 className="mt-6 text-3xl md:text-4xl font-orbitron font-bold uppercase tracking-[0.14em] text-white">
          Design and growth services for premium brands.
        </h3>
        <p className="mt-5 text-sm md:text-base leading-relaxed text-white/70 max-w-xl">
          Discover the services that support your brand from launch to long-term digital presence.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {SITE_DATA.nav.servicesMenu.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] || ShieldCheck;
          return (
            <div key={item.title} className="group rounded-[2rem] border border-white/10 bg-[#0b0b0b]/95 p-6 transition hover:border-adu-gold/25">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-adu-gold">
                <Icon size={18} />
              </div>
              <h4 className="mt-4 text-xl font-orbitron text-white">
                {item.title}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {item.description}
              </p>
              <p className="mt-5 text-xs uppercase tracking-[0.3em] text-white/40">
                Get started →
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderAboutPanel = () => (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr] p-8 lg:p-10">
      <div className="rounded-[2rem] border border-white/10 bg-[#0c0c0c]/95 p-8 lg:p-10">
        <span className="section-heading text-adu-gold text-xs uppercase tracking-[0.35em] opacity-80">
          ABOUT
        </span>
        <h3 className="mt-6 text-3xl md:text-4xl font-orbitron font-bold uppercase tracking-[0.14em] text-white">
          Our perspective. Our process. Why we exist.
        </h3>
        <p className="mt-5 text-sm md:text-base leading-relaxed text-white/70 max-w-xl">
          {SITE_DATA.nav.aboutPanel.intro}
        </p>
        <p className="mt-4 text-sm md:text-base leading-relaxed text-white/70 max-w-xl">
          {SITE_DATA.nav.aboutPanel.mission}
        </p>
      </div>

      <div className="grid gap-4">
        <div className="rounded-[2rem] border border-white/10 bg-[#0b0b0b]/95 p-6">
          <h4 className="text-xl font-orbitron text-white">Why choose us</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/60">
            {SITE_DATA.nav.aboutPanel.reasons.map((reason) => (
              <li key={reason} className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-adu-gold" />
                {reason}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[#0b0b0b]/95 p-6">
          <h4 className="text-xl font-orbitron text-white">Values & process</h4>
          <div className="mt-4 grid gap-3 text-sm text-white/60">
            {SITE_DATA.nav.aboutPanel.values.map((value) => (
              <div key={value} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                {value}
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-white/60">{SITE_DATA.nav.aboutPanel.founder}</p>
          <MagneticButton>
            <button className="mt-8 rounded-full border border-adu-gold bg-adu-gold/5 px-6 py-3 text-sm uppercase tracking-[0.2em] text-adu-gold transition hover:bg-adu-gold hover:text-adu-black">
              {SITE_DATA.nav.aboutPanel.cta}
            </button>
          </MagneticButton>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={rootRef} className="relative">
      <motion.header
        style={{
          backgroundColor: `rgba(10, 10, 10, ${bgOpacity.get()})`,
          backdropFilter: blur,
        }}
        className="fixed top-0 left-0 right-0 z-50 h-24 flex items-center justify-between px-6 md:px-10 text-white border-b border-white/5 transition-colors duration-300"
      >
        <div className="flex items-center gap-4 cursor-pointer group">
          <MagneticButton>
            <img
              src="logo.png"
              alt="ADU Logo"
              className="h-10 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity"
            />
          </MagneticButton>
          <span className="font-orbitron tracking-[0.2em] text-sm uppercase hidden sm:block text-white/70">
            ADU Designs
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-10 font-rajdhani text-sm tracking-[0.2em] font-medium">
          {(['work', 'services', 'about'] as PanelType[]).map((item) => (
            <MagneticButton key={item}>
              <button
                type="button"
                onClick={() => handleNavigation(item)}
                className={`transition-colors duration-200 ${activeSection === item ? 'text-white' : 'text-white/70 hover:text-adu-gold'}`}
              >
                {item.toUpperCase()}
              </button>
            </MagneticButton>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <MagneticButton>
            <button className="hidden md:inline-flex px-6 py-2.5 border border-adu-gold text-adu-gold font-orbitron text-xs tracking-[0.15em] hover:bg-adu-gold hover:text-adu-black transition-all duration-300 shadow-[0_12px_40px_rgba(212,175,55,0.12)] rounded-full">
              INQUIRE
            </button>
          </MagneticButton>

          <MagneticButton>
            <button
              type="button"
              onClick={() => {
                setMobileOpen((current) => !current);
                setOpenPanel(null);
                setMobilePanel(null);
              }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#111111]/90 text-white transition hover:border-adu-gold"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </MagneticButton>
        </div>
      </motion.header>

      <AnimatePresence>
        {openPanel && (
          <motion.div
            key={openPanel}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-0 top-full z-40 pt-4 px-6 md:px-10"
          >
            <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#060606]/95 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              {openPanel === 'work' && renderWorkPanel()}
              {openPanel === 'services' && renderServicesPanel()}
              {openPanel === 'about' && renderAboutPanel()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-xl"
            ref={mobileRef}
          >
            <div
              className="absolute inset-0"
              onClick={() => {
                setMobileOpen(false);
                setMobilePanel(null);
              }}
            />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative mx-auto mt-24 w-full max-w-2xl rounded-[2rem] border border-white/10 bg-[#0b0b0b]/98 p-6 shadow-[0_40px_120px_rgba(0,0,0,0.4)]"
            >
              <div className="flex items-center justify-between gap-4 mb-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-adu-gold opacity-80">Menu</p>
                  <p className="mt-2 text-white/70 text-sm">Tap to expand each section.</p>
                </div>
                <MagneticButton>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      setMobilePanel(null);
                    }}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white"
                    aria-label="Close mobile menu"
                  >
                    <X size={20} />
                  </button>
                </MagneticButton>
              </div>

              <div className="space-y-4">
                {(['work', 'services', 'about'] as PanelType[]).map((item) => (
                  <div key={item} className="rounded-[1.75rem] border border-white/10 bg-[#111111]/95 overflow-hidden">
                    <div className="flex w-full items-center justify-between px-5 py-5">
                  <button
                    type="button"
                    onClick={() => handleNavigation(item)}
                    className="flex-1 text-left text-white/80 hover:text-white"
                  >
                    <span className="font-orbitron uppercase tracking-[0.22em] text-sm">
                      {item}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleMobilePanel(item)}
                    className="ml-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/70 hover:text-white transition"
                    aria-label={mobilePanel === item ? `Collapse ${item} details` : `Expand ${item} details`}
                  >
                    {mobilePanel === item ? '–' : '+'}
                  </button>
                </div>

                    <AnimatePresence>
                      {mobilePanel === item && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="border-t border-white/10 px-5 pb-5"
                        >
                          {item === 'work' && (
                            <div className="space-y-4">
                              {SITE_DATA.nav.work.map((entry) => (
                                <div key={entry.name} className="rounded-[1.5rem] bg-[#0a0a0a]/95 p-4">
                                  <p className="text-xs uppercase tracking-[0.35em] text-adu-gold">{entry.category}</p>
                                  <h4 className="mt-3 text-lg font-orbitron text-white">{entry.name}</h4>
                                  <p className="mt-2 text-sm leading-relaxed text-white/60">{entry.description}</p>
                                  <MagneticButton>
                                    <Link
                                      href={`/work/${entry.slug}`}
                                      className="mt-4 text-sm uppercase tracking-[0.2em] text-adu-gold"
                                    >
                                      {entry.cta}
                                    </Link>
                                  </MagneticButton>
                                </div>
                              ))}
                            </div>
                          )}

                          {item === 'services' && (
                            <div className="space-y-4">
                              {SITE_DATA.nav.servicesMenu.map((entry) => {
                                const Icon = iconMap[entry.icon as keyof typeof iconMap] || ShieldCheck;
                                return (
                                  <div key={entry.title} className="rounded-[1.5rem] bg-[#0a0a0a]/95 p-4">
                                    <div className="flex items-center gap-3">
                                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-adu-gold">
                                        <Icon size={16} />
                                      </div>
                                      <h4 className="text-base font-orbitron text-white">{entry.title}</h4>
                                    </div>
                                    <p className="mt-3 text-sm text-white/60 leading-relaxed">{entry.description}</p>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          {item === 'about' && (
                            <div className="space-y-4">
                              <p className="text-sm leading-relaxed text-white/70">{SITE_DATA.nav.aboutPanel.intro}</p>
                              <p className="text-sm leading-relaxed text-white/70">{SITE_DATA.nav.aboutPanel.mission}</p>
                              <div className="grid gap-3">
                                {SITE_DATA.nav.aboutPanel.reasons.map((reason) => (
                                  <div key={reason} className="rounded-[1.5rem] bg-[#0a0a0a]/95 p-4 text-sm text-white/60">
                                    {reason}
                                  </div>
                                ))}
                              </div>
                              <MagneticButton>
                                <button className="mt-4 rounded-full border border-adu-gold bg-adu-gold/5 px-5 py-3 text-sm uppercase tracking-[0.2em] text-adu-gold">
                                  {SITE_DATA.nav.aboutPanel.cta}
                                </button>
                              </MagneticButton>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
