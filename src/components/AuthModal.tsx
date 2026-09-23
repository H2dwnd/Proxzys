import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';
import { useAuth } from '../lib/AuthContext';
import { api } from '../lib/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const { t } = useLanguage();
  const { login } = useAuth();
  
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setName('');
      setPassword('');
      setError('');
    }
  }, [isOpen, initialMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !password) {
      setError(t.modal.fillFields);
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      if (mode === 'login') {
        const data = await api.login(name, password);
        login(data.token, data.user);
        onClose();
      } else {
        const data = await api.register(name, password);
        login(data.token, data.user);
        onClose();
      }
    } catch (err: any) {
      setError(err.message || t.modal.serverError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            <div className="p-8 pt-12">
              <h2 className="text-3xl font-medium tracking-tight text-white mb-2">
                {mode === 'login' ? t.modal.welcome : t.modal.create}
              </h2>
              <p className="text-secondary mb-6">
                {mode === 'login' ? t.modal.loginDesc : t.modal.regDesc}
              </p>

              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                {error && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
                    {error}
                  </div>
                )}
                
                <div>
                  <label className="text-xs text-secondary mb-1 block">{t.modal.name}</label>
                  <input 
                    type="text" 
                    placeholder={t.modal.namePlaceholder}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs text-secondary mb-1 block">{t.modal.password}</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                  />
                </div>

                <button 
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 bg-white text-black font-medium rounded-xl px-4 py-3 mt-4 hover:bg-white/90 transition-colors disabled:opacity-50"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {mode === 'login' ? t.auth.login : t.auth.register}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-secondary">
                {mode === 'login' ? (
                  <p>
                    {t.modal.noAccount}{' '}
                    <button onClick={() => setMode('register')} className="text-white hover:underline">
                      {t.auth.register}
                    </button>
                  </p>
                ) : (
                  <p>
                    {t.modal.hasAccount}{' '}
                    <button onClick={() => setMode('login')} className="text-white hover:underline">
                      {t.auth.login}
                    </button>
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
