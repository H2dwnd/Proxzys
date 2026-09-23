import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import AuthModal from './components/AuthModal';
import LoadingScreen from './components/LoadingScreen';
import { LanguageProvider } from './lib/LanguageContext';

function AppContent() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <div className={`min-h-screen bg-[#060606] text-primary selection:bg-white/20 font-sans selection:text-white relative ${isLoading ? 'overflow-hidden h-screen' : ''}`}>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent" />
      
      <Header onOpenAuth={handleOpenAuth} />
      
      <main className="flex flex-col items-center px-4 md:px-8 w-full mx-auto selection:bg-white/20 pb-20">
        <Hero />
        <Projects />
        <Contact />
      </main>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        initialMode={authMode} 
      />
    </div>
  );
}

import { AuthProvider } from './lib/AuthContext';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
