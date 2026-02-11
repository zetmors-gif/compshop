import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Activity, Cpu, Zap } from 'lucide-react';

const NAVLINKS = [
  { name: 'Price', href: '#price' },
  { name: 'Sectors', href: '#sector' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Оптимизированный обработчик скролла
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  // Блокировка скролла при открытом меню
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
  }, [isMobileMenuOpen]);

  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-black/90 backdrop-blur-xl border-red-600/50 py-4' 
          : 'bg-transparent border-transparent py-8'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className='flex gap-5'>
          <div className="bg-red-600 text-black px-3 md:px-5 py-1 font-black text-[12px] md:text-2xl inline-block italic -skew-x-12 tracking-tighter shadow-[0 0 25px rgba(220,38,38,0.5)] border-2 border-black">
            ZETMORS KRD 
          </div>
          {/* LEFT: HUD STATUS (Desktop only) */}
          <HUDStatus />
        </div>


        {/* RIGHT: NAV & ACTIONS */}
        <div className="flex items-center gap-6 lg:gap-10">
          <nav className="hidden md:flex items-center gap-8 font-black uppercase italic text-[12px] tracking-[0.3em]">
            {NAVLINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-zinc-400 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-600 transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          <JoinButton className="hidden sm:flex" />

          <button 
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="md:hidden text-white hover:text-red-600 transition-colors"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </header>
  );
}

// --- Вспомогательные компоненты для чистоты кода ---

const HUDStatus = () => (
  <div className="hidden lg:flex items-center gap-8 pointer-events-none select-none">
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0 0 10px #dc2626]" />
      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">System: Online</span>
    </div>
  </div>
);

const Logo = () => (
  <motion.div 
    whileHover={{ skewX: -5, scale: 1.02 }}
    className="relative group cursor-pointer"
  >
    <h1 className="text-3xl font-black italic tracking-tighter uppercase text-white">
      ZET<span className="text-red-600">MORS</span>
    </h1>
  </motion.div>
);

const JoinButton = ({ className = "" }) => (
  <button className={`items-center gap-2 bg-red-600 text-black px-5 py-2 font-bold text-[16px] uppercase tracking-widest hover:bg-white hover:-translate-y-0.5 transition-all active:translate-y-0 skew-x-[-15deg] ${className}`}>
    <Zap size={14} fill="currentColor" />
    Join
  </button>
);

const MobileMenu = ({ onClose }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/98 z-60 flex flex-col items-center justify-center md:hidden"
  >
    <button 
      onClick={onClose} 
      className="absolute top-8 right-8 text-white hover:text-red-600"
    >
      <X size={40} />
    </button>
    
    <div className="flex flex-col items-center gap-6">
      {NAVLINKS.map((link, i) => (
        <motion.a 
          key={link.name} 
          href={link.href} 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
          onClick={onClose}
          className="text-5xl font-black italic uppercase tracking-tighter text-white hover:text-red-600 transition-colors"
        >
          {link.name}
        </motion.a>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <JoinButton className="flex scale-125" />
      </motion.div>
    </div>
  </motion.div>
);
