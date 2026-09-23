import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { type Language, translations } from './i18n';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.ru;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('ru');

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
