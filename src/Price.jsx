import { motion } from 'framer-motion';
import { ChevronRight, TerminalSquare } from 'lucide-react';

const PLANS = [
  { id: "ZM-01", name: "CORE", price: "80", specs: ["i5-12400", "RTX 3060", "144Hz"], status: "STABLE", load: "42%" },
  { id: "ZM-02", name: "ELITE", price: "130", specs: ["i7-13700", "RTX 4070", "240Hz"], status: "ULTRA", load: "89%", active: true },
  { id: "ZM-03", name: "VIP", price: "250", specs: ["i9-14900", "RTX 4090", "360Hz"], status: "OVERCLOCK", load: "15%" }
];

// Вспомогательный компонент для угловых элементов
const CornerDecor = ({ active }) => {
  const base = `absolute w-4 h-4 border-2 ${active ? 'border-red-600' : 'border-white/20'}`;
  return (
    <>
      <div className={`${base} top-0 left-0 border-r-0 border-b-0`} />
      <div className={`${base} top-0 right-0 border-l-0 border-b-0`} />
      <div className={`${base} bottom-0 left-0 border-r-0 border-t-0`} />
      <div className={`${base} bottom-0 right-0 border-l-0 border-t-0`} />
    </>
  );
};

export function Price() {
  return (
    <section id='price' className="w-full bg-[#030303] py-20 px-4 md:px-10 border-t border-white/5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app')] mix-blend-overlay" />
      
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {PLANS.map((plan, i) => {
          const accentColor = plan.active ? 'border-red-600 shadow-[0 0 30px rgba(220,38,38,0.1)]' : 'border-white/10';
          
          return (
            <motion.div 
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative p-8 border ${accentColor} bg-black/40 backdrop-blur-sm group transition-all duration-500 will-change-transform`}
            >
              <CornerDecor active={plan.active} />

              {/* HEADER */}
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-2">
                  <TerminalSquare size={14} className="text-red-600" />
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{plan.id}</span>
                </div>
                <div className={`text-[10px] font-black px-2 py-0.5 ${plan.active ? 'bg-red-600 text-black' : 'bg-zinc-800 text-zinc-400'}`}>
                  {plan.status}
                </div>
              </div>

              <h3 className="text-5xl font-black italic uppercase tracking-tighter mb-8 group-hover:text-red-600 transition-colors">
                {plan.name}
              </h3>

              {/* HARDWARE GRID */}
              <div className="grid grid-cols-2 gap-4 mb-12">
                {plan.specs.map((spec, idx) => (
                  <div key={idx} className="border border-white/5 p-3 bg-white/2 hover:bg-white/5 transition-colors">
                    <div className="text-[8px] text-zinc-600 uppercase mb-1 font-bold">Slot 0{idx + 1}</div>
                    <div className="text-xs font-black tracking-tight uppercase">{spec}</div>
                  </div>
                ))}
                <div className="border border-red-600/20 p-3 bg-red-600/3 flex items-center justify-between">
                   <div className="text-[8px] text-red-600/50 uppercase font-bold tracking-tighter leading-none">Load<br/>Level</div>
                   <div className="text-sm font-black text-red-600 italic leading-none">{plan.load}</div>
                </div>
              </div>

              {/* PRICE & ACTION */}
              <div className="space-y-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black tracking-tighter italic">{plan.price}</span>
                  <span className="text-red-600 font-bold text-xl uppercase tracking-widest italic">rub</span>
                  <span className="text-zinc-600 text-[10px] font-mono ml-auto tracking-widest">/HOUR</span>
                </div>

                <button className="relative w-full overflow-hidden group/btn block outline-none">
                  <div className="absolute inset-0 bg-red-600 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 ease-out" />
                  <div className="relative z-10 py-5 border border-white/10 group-hover/btn:border-red-600 transition-colors flex items-center justify-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] group-hover/btn:text-black transition-colors">Инициация входа</span>
                    <ChevronRight size={14} className="group-hover/btn:text-black transition-colors" />
                  </div>
                </button>
              </div>

              {/* MARQUEE DECOR */}
              <div className="absolute bottom-2 left-8 right-8 overflow-hidden opacity-10 pointer-events-none select-none">
                 <div className="text-[6px] font-mono whitespace-nowrap animate-marquee uppercase tracking-[1em] will-change-transform">
                    system check: active // hardware access: granted // latency: 1ms // buffer: optimized // 
                 </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
      `}} />
    </section>
  );
}
