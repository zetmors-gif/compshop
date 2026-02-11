import React, { Suspense, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, PerspectiveCamera, Preload } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function Tunnel() {
  const meshRef = useRef();

  // Оптимизированное создание текстуры с очисткой
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128; canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#ff0033'; 
    ctx.lineWidth = 4; // Сделали чуть ярче
    ctx.strokeRect(0, 0, 128, 128);
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(8, 20);
    return tex;
  }, []);

  // Очистка ресурсов при размонтировании
  useEffect(() => () => texture.dispose(), [texture]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Используем вращение и смещение с ограничением
    meshRef.current.rotation.z = t * 0.05;
    meshRef.current.material.map.offset.y = (-t * 0.2) % 1;
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[12, 12, 100, 24, 1, true]} />
      <meshBasicMaterial 
        map={texture} 
        side={THREE.BackSide} 
        transparent 
        opacity={0.3} 
        blending={THREE.AdditiveBlending} // Усиливает свечение на пересечениях
      />
    </mesh>
  );
}

export function TopMenu() {
  return (
    <div className="w-full bg-[#050505] text-white overflow-hidden">
      <section className="relative w-full h-screen overflow-hidden">
        {/* BACKGROUND LAYER */}
        <div className="absolute inset-0 z-0">
          <Canvas 
            dpr={[1, 1.5]} // Оптимизация для Retina-дисплеев
            gl={{ antialias: false, powerPreference: "high-performance" }}
          >
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={90} />
            {/* AmbientLight удален, так как BasicMaterial на него не реагирует */}
            <Suspense fallback={null}>
              <Tunnel />
              <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1.5} />
              <Preload all />
            </Suspense>
          </Canvas>
        </div>

        {/* CONTENT LAYER */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-4 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="pointer-events-auto flex flex-col items-center"
          > 
            {/* MAIN TITLE */}
            <div className="glitch-wrapper block select-none">
              <h1 
                className="glitch-text text-[110px] md:text-[10vw] font-extrabold uppercase italic leading-[0.8] mix-blend-difference"
                data-text="CYBER ARENA"
                style={{ textShadow: '0 0 15px rgba(255,0,0,0.3)' }}
              >
                CYBER <span className="text-red-600">ARENA</span>
              </h1>
            </div>

            {/* SUBTITLE */}
            <p className="mt-8 text-zinc-400 font-alumni tracking-[0.5em] text-[12px] md:text-[18px] uppercase bg-black/40 backdrop-blur-md py-2 px-2 md:px-8 border border-white/10 rounded-sm">
              Power / Speed / Precision / 24-7
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
