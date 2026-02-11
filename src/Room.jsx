import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Zap, Shield, ChevronRight, Activity } from 'lucide-react';

const ZONES = [
  { id: '03', name: 'VIP', price: '250', cpu: 'i9-14900kf', gpu: 'RTX 4090', hz: '360Hz', color: '#ff0000', offset: -180 },
  { id: '02', name: 'ELITE', price: '130', cpu: 'i7-13700kf', gpu: 'RTX 4070', hz: '240Hz', color: '#dc2626', offset: 0 },
  { id: '01', name: 'CORE', price: '80', cpu: 'i5-12400f', gpu: 'RTX 3060', hz: '144Hz', color: '#52525b', offset: 180 },
];

// Оптимизированная сетка (мемоизирована, чтобы не перерисовывать 16 дивов зря)
const PCGrid = memo(({ active }) => (
  <div className="grid grid-cols-4 gap-4 p-6 relative z-10">
    {Array.from({ length: 16 }).map((_, i) => (
      <div 
        key={i} 
        className={`w-3 h-3 rounded-sm transition-all duration-700 ${
          active ? 'bg-red-600 shadow-[0 0 12px #ff0000] scale-110' : 'bg-zinc-700/30'
        }`} 
        style={{ transitionDelay: `${i * 15}ms` }}
      />
    ))}
  </div>
));

export function Hall() {
  const [active, setActive] = useState(ZONES[1]);

  return (
    <section id='sector' className="w-full min-h-auto bg-[#020202] flex items-center justify-center p-4 md:p-20 overflow-hidden relative border-t border-white/15 select-none">
      
      {/* BACKGROUND DECOR */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl w-full flex flex-col lg:grid lg:grid-cols-2 gap-5 lg:gap-20 items-center z-10">
        
        {/* MOBILE SELECTOR: Горизонтальный список (только для мобилок) */}
        <div className="grid grid-cols-3 lg:hidden w-full gap-2 mt-5">
          {ZONES.map((zone) => {
            const isActive = active.id === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => setActive(zone)}
                className={`px-2 py-3 border-l-2 transition-all duration-300 flex flex-col items-start ${
                  isActive 
                    ? 'border-red-600 bg-red-600/20 text-white' 
                    : 'border-white/10 bg-white/5 text-white/40'
                }`}
              >
                <span className="text-[10px] font-black uppercase tracking-widest italic block opacity-70">
                  Zone
                </span>
                <span className="text-sm md:text-base font-bold uppercase italic truncate w-full text-left">
                  {zone.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* LEFT: 3D TOWER (Скрыта на мобилках) */}
        <div className="hidden lg:flex relative h-125 md:h-175 items-center justify-center perspective-[1500px]">
          {ZONES.map((zone) => {
            const isActive = active.id === zone.id;
            return (
              <motion.div
                key={zone.id}
                onMouseEnter={() => setActive(zone)}
                animate={{ 
                  rotateX: 55, rotateZ: -35,
                  z: isActive ? 100 : 0,
                  y: zone.offset + (isActive ? -30 : 0),
                  opacity: isActive ? 1 : 0.4,
                  scale: isActive ? 1.15 : 1
                }}
                transition={{ type: 'spring', stiffness: 120, damping: 25 }}
                className={`absolute w-70 md:w-[320px] h-80 border-2 cursor-pointer flex items-center justify-center 
                  transform-3d backface-hidden transition-colors duration-500
                  ${isActive ? 'border-red-600 bg-red-600/20 shadow-[0 0 60px rgba(220,38,38,0.3)]' : 'border-white/10 bg-white/5 backdrop-blur-sm'}
                `}
              >
                <div className="absolute -right-0.5 top-0 w-1 h-full bg-red-600/40 transform-[rotateY(90deg)] origin-left" />
                <div className="absolute top-4 left-4 font-black italic text-[20px] text-white/30 uppercase tracking-[0.3em]">
                  {zone.name}
                </div>
                <PCGrid active={isActive} />
                {isActive && (
                  <motion.div 
                    className="absolute inset-0 border-t-2 border-red-500/50 bg-linear-to-b from-red-500/20 to-transparent pointer-events-none"
                    initial={{ top: '0%' }}
                    animate={{ top: '100%' }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT: HUD UI */}
        <div className="relative w-full min-h-112.5 lg:min-h-125 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full p-6 md:p-10 border-l-4 border-red-600 bg-zinc-900/40 backdrop-blur-2xl space-y-6 md:space-y-8 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center gap-3 text-red-600 font-black text-[12px] md:text-[14px] tracking-[0.2em] uppercase italic">
                <Activity size={14} className="animate-pulse" /> data link: established
              </div>

              <h2 className="text-4xl md:text-6xl font-extrabold italic uppercase tracking-wide leading-none text-white">
                {active.name}
              </h2>

              <div className="flex items-baseline gap-2">
                <span className="text-6xl md:text-8xl font-black italic text-white">{active.price}</span>
                <span className="text-red-600 font-bold text-xl md:text-3xl uppercase italic">rub/hr</span>
              </div>

              <div className="grid grid-cols-1 gap-4 border-y border-white/10 py-6 md:py-8">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 md:w-12 md:h-12 border border-red-600/30 flex items-center justify-center text-red-500 bg-red-600/5">
                    <Cpu size={20} />
                  </div>
                  <div className="text-sm md:text-base font-black uppercase tracking-tight italic text-zinc-200">
                    {active.gpu} <span className="text-zinc-600 mx-2">//</span> {active.hz}
                  </div>
                </div>
                {/* Вторая строка характеристик на мобилках скрыта или уменьшена для компактности */}
                <div className="hidden xs:flex items-center gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 border border-white/10 flex items-center justify-center text-zinc-500 bg-white/5">
                    <Shield size={20} />
                  </div>
                  <div className="text-[12px] md:text-[14px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                    Neural Link: <span className="text-white">Active</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-white text-black py-4 font-black uppercase text-[16px] md:text-[18px] active:bg-red-600 active:text-white transition-all flex items-center justify-center gap-4 group relative">
                <span>ВХОД В СИСТЕМУ</span> 
                <ChevronRight size={16} />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://grainy-gradients.vercel.app')] mix-blend-overlay" />
    </section>
  );
}
