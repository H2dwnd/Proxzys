import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, LogOut, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../lib/LanguageContext';
import { useAuth } from '../lib/AuthContext';
import type { Language } from '../lib/i18n';

interface HeaderProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

const languageOptions: { code: Language; name: string; flag: string }[] = [
  { code: 'ru', name: 'Русский', flag: 'https://flagcdn.com/w40/ru.png' },
  { code: 'kz', name: 'Қазақша', flag: 'https://flagcdn.com/w40/kz.png' },
  { code: 'uz', name: 'Oʻzbekcha', flag: 'https://flagcdn.com/w40/uz.png' },
  { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/us.png' },
];

export default function Header({ onOpenAuth }: HeaderProps) {
  const { lang, setLang, t } = useLanguage();
  const { user, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState('about');
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const currentLangOption = languageOptions.find(o => o.code === lang) || languageOptions[0];
  const langRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { key: 'about', name: t.nav.about, href: '#about' },
    { key: 'projects', name: t.nav.projects, href: '#projects' },
    { key: 'contact', name: t.nav.contact, href: '#contact' },
  ];

  if (user?.name === 'ilyxasuper' || user?.name === 'Proxzy') {
    navItems.push({ key: 'admin', name: t.admin.tab, href: '#admin' });
  }

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string, key: string) => {
    e.preventDefault();
    setActiveTab(key);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full max-w-7xl left-1/2 -translate-x-1/2 mx-auto z-50 flex items-center justify-between px-6 py-6 md:py-8 text-white before:absolute before:inset-0 before:bg-gradient-to-b before:from-[#060606]/90 before:via-[#060606]/50 before:to-transparent before:-z-10 before:pointer-events-none"
      >
        <div className="flex flex-col gap-0.5 pointer-events-auto cursor-pointer relative z-10" onClick={(e) => handleScroll(e as any, '#about', 'about')}>
          <span className="font-medium text-lg md:text-xl tracking-tight leading-none text-glow">Proxzy</span>
          <span className="text-secondary text-[10px] md:text-xs leading-none mt-1">Mobile & Indie Dev</span>
        </div>

        <nav className="hidden md:flex items-center gap-1 p-1 bg-white/[0.03] border border-white/5 rounded-full backdrop-blur-xl pointer-events-auto shadow-[0_4px_24px_rgba(0,0,0,0.5)] relative z-10">
          {navItems.map((tab) => (
            <a
              key={tab.key}
              href={tab.href}
              onClick={(e) => handleScroll(e, tab.href, tab.key)}
              className="relative px-5 lg:px-7 py-2 text-xs lg:text-sm font-medium rounded-full transition-colors"
            >
              <span className={cn("relative z-10 transition-colors duration-300 whitespace-nowrap", activeTab === tab.key ? "text-white" : "text-white/40 hover:text-white/80")}>
                {tab.name}
              </span>
              {activeTab === tab.key && (
                <motion.div
                  layoutId="activeNavTab"
                  className="absolute inset-0 bg-white/[0.08] rounded-full border border-white/10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 lg:w-12 h-[2px] bg-white rounded-full shadow-[0_0_15px_3px_rgba(255,255,255,0.7)]" />
                </motion.div>
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 lg:gap-4 pointer-events-auto relative z-10">
          <div className="relative" ref={langRef}>
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 p-2 px-3 rounded-full bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] transition-colors"
            >
              <img src={currentLangOption.flag} alt={currentLangOption.name} className="w-4 h-4 rounded-sm object-cover" />
              <span className="text-xs font-medium uppercase">{currentLangOption.code}</span>
              <ChevronDown className="w-3 h-3 text-white/50" />
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-40 bg-[#111] border border-white/10 rounded-2xl p-2 shadow-2xl z-50 flex flex-col gap-1"
                >
                  {languageOptions.map((option) => (
                    <button
                      key={option.code}
                      onClick={() => {
                        setLang(option.code);
                        setLangOpen(false);
                      }}
                      className={cn(
                        "flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm transition-colors hover:bg-white/10",
                        lang === option.code ? "bg-white/5 text-white" : "text-white/70"
                      )}
                    >
                      <img src={option.flag} alt={option.name} className="w-5 h-4 rounded-sm object-cover" />
                      <span>{option.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-full px-4 py-1.5 backdrop-blur-xl">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <User className="w-4 h-4 text-white/50" />
                  <span>{user.name}</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <button onClick={logout} className="text-white/50 hover:text-red-400 transition-colors" title={t.auth.logout}>
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => onOpenAuth('login')}
                  className="px-4 py-2 text-xs lg:text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  {t.auth.login}
                </button>
                <button 
                  onClick={() => onOpenAuth('register')}
                  className="px-4 py-2 text-xs lg:text-sm font-medium bg-white text-black rounded-full hover:bg-white/90 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)] whitespace-nowrap"
                >
                  {t.auth.register}
                </button>
              </>
            )}
          </div>

          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="flex md:hidden p-2 rounded-full bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] transition-colors"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col p-6 pointer-events-auto"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-medium text-xl tracking-tight leading-none text-glow text-white">Proxzy</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] transition-colors text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 text-2xl font-medium">
              {navItems.map((tab) => (
                <a
                  key={tab.key}
                  href={tab.href}
                  onClick={(e) => handleScroll(e, tab.href, tab.key)}
                  className={cn(
                    "transition-colors",
                    activeTab === tab.key ? "text-white" : "text-white/40 hover:text-white/80"
                  )}
                >
                  {tab.name}
                </a>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-4 pb-12">
              {user ? (
                <div className="flex flex-col gap-4">
                  <div className="w-full py-4 text-center text-lg font-medium bg-white/[0.05] border border-white/10 rounded-2xl text-white flex justify-center items-center gap-2">
                    <User className="w-5 h-5" />
                    {user.name}
                  </div>
                  <button 
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-4 text-center text-lg font-medium bg-red-500/10 text-red-400 rounded-2xl transition-colors active:bg-red-500/20 flex justify-center items-center gap-2"
                  >
                    <LogOut className="w-5 h-5" />
                    {t.auth.logout}
                  </button>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('login');
                    }}
                    className="w-full py-4 text-center text-lg font-medium bg-white/[0.05] border border-white/10 rounded-2xl text-white transition-colors active:bg-white/10"
                  >
                    {t.auth.login}
                  </button>
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAuth('register');
                    }}
                    className="w-full py-4 text-center text-lg font-medium bg-white text-black rounded-2xl transition-colors active:bg-white/80 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  >
                    {t.auth.register}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
