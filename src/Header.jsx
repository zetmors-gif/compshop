import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';

const NAVLINKS = [
  { name: 'Price', href: '#price' },
  { name: 'Sectors', href: '#sector' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Блокировка скролла страницы
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* ГЛАВНЫЙ ХЕДЕР */}
      <header 
        className={`fixed top-0 left-0 w-full transition-all duration-500 border-b ${
          isScrolled 
            ? 'bg-black/95 backdrop-blur-xl border-red-600/50 py-3 md:py-4' 
            : 'bg-transparent border-transparent py-5 md:py-8'
        }`}
        style={{ zIndex: 1000 }} // Самый высокий приоритет
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between relative">
          
          {/* LEFT: LOGO & HUD */}
          <div className='flex items-center gap-5'>
            <div className="bg-red-600 text-black px-3 md:px-5 py-1 font-black text-[14px] md:text-2xl inline-block italic -skew-x-12 tracking-tighter border-2 border-black shadow-[0_0_20px_rgba(220,38,38,0.3)]">
              ZETMORS KRD 
            </div>
            {/* Вернули HUD Status */}
            <HUDStatus />
          </div>

          {/* RIGHT: NAV & ACTIONS */}
          <div className="flex items-center gap-6 lg:gap-10">
            <nav className="hidden md:flex items-center gap-8 font-black uppercase italic text-[12px] tracking-[0.3em]">
              {NAVLINKS.map((link) => (
                <a key={link.name} href={link.href} className="text-zinc-400 hover:text-white transition-colors relative group">
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-red-600 transition-all group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Вернули кнопку Join (для десктопа) */}
            <JoinButton className="hidden sm:flex" />

            {/* ЕДИНАЯ КНОПКА (Она не улетит, так как хедер выше оверлея) */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white hover:text-red-600 transition-all p-2 outline-none"
            >
              {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </header>

      {/* МОБИЛЬНОЕ МЕНЮ (Вынесено из хедера) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black/98 flex flex-col items-center justify-center md:hidden"
            style={{ zIndex: 900 }} // Ниже хедера
          >
            <div className="flex flex-col items-center gap-8">
              {NAVLINKS.map((link, i) => (
                <motion.a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-4xl font-black italic uppercase tracking-tighter text-white hover:text-red-600"
                >
                  {link.name}
                </motion.a>
              ))}
              
              {/* Кнопка Join в мобильном меню */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <JoinButton className="flex scale-125 mt-6" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ ---

const HUDStatus = () => (
  <div className="hidden lg:flex items-center gap-8 pointer-events-none select-none">
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_#dc2626]" />
      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">System: Online</span>
    </div>
  </div>
);

const JoinButton = ({ className = "" }) => (
  <button className={`items-center gap-2 bg-red-600 text-black px-5 py-2 font-bold text-[16px] uppercase tracking-widest hover:bg-white hover:-translate-y-0.5 transition-all active:translate-y-0 -skew-x-12 ${className}`}>
    <Zap size={14} fill="currentColor" />
    Join
  </button>
);
