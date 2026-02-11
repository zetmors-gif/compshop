import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Shield, Radio, MapPin, Send, Cpu, ChevronRight, VenetianMask } from 'lucide-react';

// Константы вынесены во избежание пересоздания при каждом рендере
const PROTOCOLS = ['DAY BUFF', 'NIGHT SHIFT', '24H BURST'];
const SOCIALLINKS = [
  { icon: VenetianMask, label: 'VK' },
  { icon: Send, label: 'Tg' },
  { icon: Radio, label: 'Admin' }
];

// Мелкие компоненты для оптимизации рендера
const FormField = ({ label, type, placeholder, subLabel }) => (
  <div className="space-y-1">
    <div className="flex justify-between items-center">
      <label className="text-[14px] font-alumni text-zinc-600 uppercase tracking-widest font-black">
        {label}
      </label>
      {subLabel && <span className="text-[12px] text-zinc-800 font-alumni">{subLabel}</span>}
    </div>
    <input 
      type={type} 
      placeholder={placeholder} 
      className="w-full bg-black border border-white/10 p-3 text-[18px] font-alumni outline-none focus:border-red-600 transition-all uppercase placeholder:text-zinc-800" 
    />
  </div>
);

const InfoNode = memo(({ title, children, icon: Icon }) => (
  <div className="py-8 px-8 bg-zinc-900/20 border border-white/5 relative group overflow-hidden">
    {Icon && <Icon className="absolute -top-2 -right-2 text-red-600/5 w-24 h-24 rotate-12 transition-transform group-hover:rotate-0" />}
    <h4 className="text-[14px] font-black text-red-600 uppercase tracking-[0.2em]  relative z-10">{title}</h4>
    <div className="relative z-10">{children}</div>
  </div>
));

export function Footer() {
  const [protocol, setProtocol] = useState('NIGHT SHIFT');

  return (
    <footer id="contact" className="w-full bg-[#030303] text-white py-10 px-6 md:px-20 border-t-2 border-red-600/20 relative overflow-hidden">
      
      {/* BACKGROUND SCANNER - Исправлен градиент */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-red-600/5 to-transparent pointer-events-none" />

      <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-12 gap-12 relative z-10">
        
        {/* LEFT: TACTICAL REGISTRATION */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 space-y-8"
        >
          

          <div className="grid md:grid-cols-2 gap-8 bg-zinc-900/30 p-8 border border-white/5 relative">
            <div className="flex items-center gap-4 text-red-600">
              <Shield size={24} className="animate-pulse" />
              <h2 className="text-4xl font-black font-alumni italic uppercase tracking-tighter leading-none">
              Access Authorization
              </h2>
            </div>
            <div></div>
            <div className="space-y-6">
              <FormField label="User Alias" type="text" placeholder="GHOST UNIT" subLabel="ID REQUIRED" />
              <FormField label="Comms Link" type="tel" placeholder="+7 (___) ___" subLabel="SECURE LINE" />
            </div>

            <div className="space-y-4">
              <label className="text-[14px] text-zinc-600 uppercase tracking-widest font-black font-alumni italic">
                Select Shift Protocol
              </label>
              <div className="grid grid-cols-1 gap-2">
                {PROTOCOLS.map(p => (
                  <button 
                    key={p} 
                    onClick={() => setProtocol(p)}
                    className={`py-2 px-4 text-[19px] font-black font-alumni text-left transition-all border ${
                      protocol === p ? 'bg-red-600 text-black border-red-600' : 'bg-black text-zinc-500 border-white/30 hover:border-white/50'
                    }`}
                  >
                    <span className={`inline-block w-2 transition-opacity ${protocol === p ? 'opacity-100' : 'opacity-50'}`}></span> {p}
                  </button>
                ))}
              </div>
            </div>

            <button className="md:col-span-2 group relative py-4 bg-white text-black font-sans font-black uppercase text-[13px] lg:text-[18px] overflow-hidden transition-transform active:scale-[0.98]">
               <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
               <span className="relative z-10 flex items-center justify-center gap-4 group-hover:text-white transition-colors">
                  Инициировать запрос <ChevronRight size={18} />
               </span>
            </button>
          </div>
        </motion.div>

        {/* RIGHT: INFO NODES */}
        <div className="lg:col-span-5 grid grid-cols-1 gap-12">
          <InfoNode title="Base Coordinates" icon={MapPin}>
            <p className="mt-4 text-5xl font-black font-alumni italic uppercase tracking-tighter text-zinc-300 leading-tight">
              Краснодар, Северная
            </p>
            <div className="mt-2 flex items-center gap-2 text-[12px] font-mono text-zinc-600">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0 0 5px #22c55e]" /> 
               Signal Available: 24/7
            </div>
          </InfoNode>

          <InfoNode title="Uplink Channels">
            <div className="flex flex-wrap gap-2 lg:gap-4">
              {SOCIALLINKS.map(({ icon: Icon, label }) => (
                <button 
                  key={label} 
                  className="flex items-center gap-3 px-2.5 lg:px-4 py-3 mt-7 border border-white/10 transition-all hover:border-red-600 hover:bg-white hover:text-black group/btn"
                >
                  <Icon size={20} className="transition-transform group-hover/btn:scale-110" /> 
                  <span className="text-[13px] lg:text-[14px] font-black uppercase tracking-widest">{label}</span>
                </button>
              ))}
            </div>
          </InfoNode>
        </div>
      </div>
    </footer>
  );
}
