import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ShieldAlert, Wifi, Terminal } from 'lucide-react';

const REVIEWS = [
  { id: '01', user: 'PLAYER ONE', msg: 'СИСТЕМА СТАБИЛЬНА. RTX 4090 ВЫДАЕТ ЗАПРЕДЕЛЬНЫЙ FPS.', status: 'CRITICAL SUCCESS' },
  { id: '02', user: 'RECON 93', msg: 'VIP-ЗОНА ОБНАРУЖЕНА. УРОВЕНЬ КОМФОРТА: КРИТИЧЕСКИЙ.', status: 'LINK ESTABLISHED' },
  { id: '03', user: 'GHOST KRD', msg: 'ПИНГ МИНИМАЛЕН. ОБЪЕКТ РЕКОМЕНДОВАН К ПОСЕЩЕНИЮ.', status: 'DATA VERIFIED' }
];

export function Review() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [index]);

  const handleManualSelect = useCallback((i) => {
    setIndex(i);
  }, []);

  const activeReview = REVIEWS[index];

  return (
    <section id='reviews' className="w-full py-10 md:py-20 bg-[#050505] flex items-center justify-center overflow-hidden border-t border-white/15 relative">
      
      <div className="absolute inset-0 pointer-events-none opacity-20 z-20 overflow-hidden">
        <div className="absolute inset-0 bg-repeat bg-[url('https://grainy-gradients.vercel.app')] opacity-30 mix-blend-overlay" />
        <div className="vhs-scanline absolute w-full h-0.5 bg-white/10 top-0" />
      </div>

      <div className="max-w-6xl w-full px-6 md:px-10 flex flex-col md:flex-row items-center gap-8 md:gap-20 z-10">
        
        {/* LEFT: HUD (На мобилках только заголовок и точки) */}
        <div className="w-full md:w-1/3 md:space-y-8 border-l-2 border-red-600 pl-6 md:pl-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-red-600 font-alumni text-[16px] md:text-[20px] tracking-[0.2em] uppercase">
              <ShieldAlert size={14} className="animate-pulse" /> Security Feed
            </div>
            <h2 className="text-5xl md:text-8xl font-alumni font-black italic uppercase tracking-wide text-white leading-[0.8]">
              USER <br /> <span className="text-red-600">REPORTS</span>
            </h2>
          </div>

          {/* Скрываем этот блок на мобилках полностью (hidden md:block) */}
          <div className="hidden md:block space-y-4 font-alumni text-[16px] text-zinc-600 uppercase tracking-widest bg-white/2 p-4 border border-white/5 backdrop-blur-sm">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span>Channel:</span> <span className="text-white">ZM LOG 0{activeReview.id}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span>Source:</span> <span className="text-white">{activeReview.user}</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span> <span className="text-green-500 animate-pulse">ACTIVE SIGNAL</span>
            </div>
          </div>

          <div className="flex gap-3">
            {REVIEWS.map((_, i) => (
              <button 
                key={i} 
                onClick={() => handleManualSelect(i)}
                className={`h-1 hidden md:block transition-all duration-500 ${index === i ? 'bg-red-600 w-12 md:w-16' : 'bg-zinc-800 w-6 md:w-8'}`} 
              />
            ))}
          </div>
        </div>

        {/* RIGHT: CONTENT (Поднят выше на мобилках) */}
        <div className="w-full md:w-2/3 relative min-h-auto md:min-h-70 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="relative w-full"
            >
              {/* MOBILE ONLY: Имя автора прямо над текстом */}
              <div className="flex lg:hidden items-center gap-2 mb-4 text-red-600 font-black italic text-[11px] uppercase tracking-[0.2em]">
                <Terminal size={12} /> [SOURCE: {activeReview.user}]
              </div>

              <div className="absolute -top-12 md:-top-20 -left-4 text-red-600/[0.07] font-black text-7xl md:text-[10rem] italic select-none pointer-events-none">
                REC
              </div>
              
              <blockquote className="text-3xl md:text-6xl font-black font-alumni italic uppercase tracking-tighter text-white leading-[0.95] relative z-10">
                "{activeReview.msg}"
              </blockquote>
              
              <div className="mt-6 md:mt-10 flex flex-wrap items-center gap-4 md:gap-6">
                <div className="flex items-center gap-2 px-3 py-1 bg-red-600 text-black font-black italic text-[12px] md:text-[14px] uppercase tracking-widest">
                  <Wifi size={12} fill="currentColor" /> Signal Verified
                </div>
                <div className="text-[14px] md:text-[18px] font-alumni text-zinc-500 italic uppercase tracking-[0.2em]">
                  // {activeReview.status}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute -bottom-10 right-0 p-4 border-r-2 border-b-2 border-red-600 hidden md:block">
            <Eye size={20} className="text-zinc-600 animate-pulse" />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes vhs-move { 0% { top: -10%; } 100% { top: 110%; } }
        .vhs-scanline { animation: vhs-move 8s linear infinite; }
      `}} />
    </section>
  );
}
