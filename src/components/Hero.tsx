import React from 'react';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../lib/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-20">
      
      {/* Window Mockup */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-7xl bg-[#0c0c0c] rounded-2xl md:rounded-[2rem] border border-white/[0.08] overflow-hidden flex flex-col relative shadow-[0_0_100px_rgba(255,255,255,0.03)]"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-3xl aspect-square bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />

        {/* Window Header */}
        <div className="h-12 border-b border-white/[0.08] flex items-center px-6 bg-white/[0.02]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[0_0_10px_rgba(255,95,86,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_10px_rgba(255,189,46,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-[0_0_10px_rgba(39,201,63,0.5)]" />
          </div>
          <div className="ml-auto text-white/[0.3] font-mono text-xl leading-none font-light">
            about.tsx
          </div>
        </div>

        {/* Window Content */}
        <div className="flex-1 flex flex-col p-8 md:p-12 lg:p-16 relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-medium tracking-tight text-white mb-8">
            {t.hero.title} <span className="font-serif italic text-white/90 text-glow">Proxzy</span> — <br className="hidden md:block" />
            <span className="whitespace-pre-line">{t.hero.subtitle}</span>
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-secondary text-base md:text-lg leading-relaxed font-light">
            <div>
              <p className="mb-6">{t.hero.p1}</p>
              <p className="mb-6">{t.hero.p2}</p>
              <p className="text-white font-medium">{t.hero.p3}</p>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
              <h3 className="text-white font-medium mb-4 text-xl">{t.hero.stack}</h3>
              
              <div className="flex flex-col gap-4">
                <div>
                  <span className="text-white/80 block mb-1">Mobile:</span>
                  <span className="text-secondary/80 text-sm">React Native, JavaScript / TypeScript</span>
                </div>
                <div className="w-full h-px bg-white/10" />
                <div>
                  <span className="text-white/80 block mb-1">Gamedev:</span>
                  <span className="text-secondary/80 text-sm">Разработка механик, геймплейная логика, скриптинг (Lua / Java)</span>
                </div>
                <div className="w-full h-px bg-white/10" />
                <div>
                  <span className="text-white/80 block mb-1">{t.hero.tools}:</span>
                  <span className="text-secondary/80 text-sm">Git, Figma, VS Code</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-secondary"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 opacity-40" />
        </motion.div>
      </motion.div>

    </section>
  );
}
