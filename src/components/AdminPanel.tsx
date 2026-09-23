import React, { useState, useRef } from 'react';
import { api } from '../lib/api';
import { useAuth } from '../lib/AuthContext';
import { useLanguage } from '../lib/LanguageContext';
import { Plus, X, Image as ImageIcon } from 'lucide-react';

export default function AdminPanel({ onProjectsChange }: { onProjectsChange: () => void }) {
  const { user, token } = useAuth();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [tech, setTech] = useState('');
  const [image, setImage] = useState<File | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (user?.name !== 'ilyxasuper' && user?.name !== 'Proxzy') return null;

  const handleAdd = async () => {
    if (!token) return;
    try {
      const techArray = tech.split(',').map(t => t.trim()).filter(t => t);
      const revenueData = [0, 0, 0, 0, 0, 0]; // dummy data

      const formData = new FormData();
      formData.append('id', 'proj_' + Date.now());
      formData.append('title', title);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('tech', JSON.stringify(techArray));
      formData.append('revenueData', JSON.stringify(revenueData));
      
      if (image) {
        formData.append('image', image);
      }

      await api.addDynamicProject(token, formData);
      
      setTitle(''); setCategory(''); setDescription(''); setTech(''); setImage(null);
      setIsOpen(false);
      onProjectsChange();
    } catch (e) {
      alert(t.admin.errorAdd);
    }
  };

  return (
    <div id="admin" className="w-full flex flex-col items-center justify-center mb-8 border-t border-white/10 pt-8 mt-4">
      <h2 className="text-3xl font-medium tracking-tight mb-6">{t.admin.panel}</h2>
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#FFBD2E]/20 text-[#FFBD2E] border border-[#FFBD2E]/50 rounded-full hover:bg-[#FFBD2E]/30 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" /> {t.admin.addProject}
        </button>
      ) : (
        <div className="w-full max-w-2xl bg-[#111] border border-white/10 p-6 rounded-[2rem] relative">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          
          <h3 className="text-xl font-medium text-white mb-6">{t.admin.addNew}</h3>
          
          <div className="flex flex-col gap-4">
            <input 
              placeholder={t.admin.title} value={title} onChange={e => setTitle(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white/30 outline-none" 
            />
            <input 
              placeholder={t.admin.category} value={category} onChange={e => setCategory(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white/30 outline-none" 
            />
            <textarea 
              placeholder={t.admin.description} value={description} onChange={e => setDescription(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white/30 outline-none min-h-[100px]" 
            />
            <input 
              placeholder={t.admin.tech} value={tech} onChange={e => setTech(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-white/30 outline-none" 
            />
            
            <div className="flex items-center gap-4">
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={(e) => setImage(e.target.files?.[0] || null)} 
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors text-sm text-white/90"
              >
                <ImageIcon className="w-4 h-4" /> 
                {image ? image.name : t.admin.uploadCover}
              </button>
              {image && (
                <button onClick={() => setImage(null)} className="text-red-400 text-sm hover:underline">
                  {t.admin.clear}
                </button>
              )}
            </div>
            
            <button 
              onClick={handleAdd}
              className="bg-white text-black font-medium py-3 rounded-xl mt-2 hover:bg-white/90"
            >
              {t.admin.save}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
