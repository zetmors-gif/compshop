import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ShieldAlert, Wifi } from 'lucide-react';

const REVIEWS = [
  { id: '01', user: 'PLAYER ONE', msg: 'СИСТЕМА СТАБИЛЬНА. RTX 4090 ВЫДАЕТ ЗАПРЕДЕЛЬНЫЙ FPS.', status: 'CRITICAL SUCCESS' },
  { id: '02', user: 'RECON 93', msg: 'VIP-ЗОНА ОБНАРУЖЕНА. УРОВЕНЬ КОМФОРТА: КРИТИЧЕСКИЙ.', status: 'LINK ESTABLISHED' },
  { id: '03', user: 'GHOST KRD', msg: 'ПИНГ МИНИМАЛЕН. ОБЪЕКТ РЕКОМЕНДОВАН К ПОСЕЩЕНИЮ.', status: 'DATA VERIFIED' }
];

export function Review() {
  const [index, setIndex] = useState(0);

  // Умный сброс таймера при ручном переключении
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [index]); // Перезапуск при смене индекса гарантирует полный цикл ожидания

  const handleManualSelect = useCallback((i) => {
    setIndex(i);
  }, []);

  const activeReview = REVIEWS[index];

  return (
    <section id='reviews' className="w-full py-32 md:py-40 bg-[#050505] flex items-center justify-center overflow-hidden border-t border-white/5 relative">
      
      {/* VHS NOISE LAYER */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-20 overflow-hidden">
        <div className="absolute inset-0 bg-repeat bg-[url('https://grainy-gradients.vercel.app')] opacity-30 mix-blend-overlay will-change-transform" />
        <div className="vhs-scanline absolute w-full h-[2px] bg-white/10 top-0 shadow-[0 0 15px rgba(255,255,255,0.2)]" />
      </div>

      <div className="max-w-6xl w-full px-6 md:px-10 flex flex-col md:flex-row items-center gap-12 md:gap-20 z-10">
        
        {/* LEFT: STATIC HUD */}
        <div className="w-full md:w-1/3 space-y-8 border-l-2 border-red-600 pl-6 md:pl-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-red-600 font-mono text-[10px] tracking-[0.5em] uppercase">
              <ShieldAlert size={14} className="animate-pulse" /> Security Feed
            </div>
            <h2 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter text-white leading-[0.8]">
              USER <br /> <span className="text-red-600">REPORTS</span>
            </h2>
          </div>

          <div className="space-y-4 font-mono text-[10px] text-zinc-600 uppercase tracking-widest bg-white/2 p-4 border border-white/5 backdrop-blur-sm">
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
                aria-label={`Go to review ${i + 1}`}
                className={`h-1.5 transition-all duration-500 ${index === i ? 'bg-red-600 w-16' : 'bg-zinc-800 w-8 hover:bg-zinc-600'}`} 
              />
            ))}
          </div>
        </div>

        {/* RIGHT: ANIMATED CONTENT */}
        <div className="w-full md:w-2/3 relative min-h-[280px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, skewX: 10, x: 30 }}
              animate={{ opacity: 1, skewX: 0, x: 0 }}
              exit={{ opacity: 0, skewX: -10, x: -30 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="relative w-full"
            >
              <div className="absolute -top-16 md:-top-20 -left-6 text-red-600/[0.07] font-black text-8xl md:text-[10rem] italic select-none pointer-events-none">
                REC
              </div>
              
              <blockquote className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white leading-[0.95] relative z-10 max-w-2xl">
                "{activeReview.msg}"
              </blockquote>
              
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 px-4 py-1.5 bg-red-600 text-black font-black italic text-[10px] uppercase tracking-widest shadow-[0 0 20px rgba(220,38,38,0.3)]">
                  <Wifi size={12} fill="currentColor" /> Signal Verified
                </div>
                <div className="text-[10px] font-mono text-zinc-500 italic uppercase tracking-[0.2em]">
                  // DECRYPTED: {activeReview.status}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* EYE INDICATOR */}
          <div className="absolute -bottom-10 right-0 p-4 border-r-2 border-b-2 border-red-600/20 hidden md:block">
            <Eye size={20} className="text-zinc-800 animate-pulse" />
          </div>
        </div>
      </div>

      {/* TECH FOOTER */}
      <div className="absolute bottom-6 left-10 right-10 font-mono text-[8px] text-white/5 uppercase tracking-[1em] flex justify-between items-center pointer-events-none">
        <span>KRR COMM INTERCEPT V.1.0</span>
        <span className="hidden lg:inline">ZetMors Gaming Complex // Systems Ready // {new Date().getFullYear()}</span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes vhs-move {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        .vhs-scanline {
          animation: vhs-move 8s linear infinite;
        }
      `}} />
    </section>
  );
}
