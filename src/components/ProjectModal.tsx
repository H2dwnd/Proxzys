import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Send } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useLanguage } from '../lib/LanguageContext';
import { useAuth } from '../lib/AuthContext';
import { api } from '../lib/api';
import type { Project } from './Projects';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const techLogos: Record<string, string> = {
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
  'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg',
  'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  'React Native': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  'Lua': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/lua/lua-original.svg'
};

const TechIcon = ({ tech }: { tech: string }) => {
  const logo = techLogos[tech];
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white/90">
      {logo && <img src={logo} alt={tech} className="w-4 h-4 object-contain" />}
      {tech}
    </div>
  );
};

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { t } = useLanguage();
  const { user, token } = useAuth();
  
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (project) {
      api.getComments(project.id).then(setComments).catch(console.error);
    }
  }, [project]);

  const handleAddComment = async () => {
    if (!token || !newComment.trim() || !project) return;
    setIsSubmitting(true);
    try {
      await api.addComment(project.id, token, newComment.trim());
      setNewComment('');
      const updated = await api.getComments(project.id);
      setComments(updated);
    } catch (e) {
      alert(t.comments.errorAdd);
    } finally {
      setIsSubmitting(false);
    }
  };

  

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-[#0c0c0c] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row pointer-events-auto"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors z-50 text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Image/Visuals */}
            <div className="w-full md:w-1/2 h-[300px] md:h-auto bg-[#141414] relative flex-shrink-0 border-b md:border-b-0 md:border-r border-white/5">
              {project.image_url ? (
                <img 
                  src={project.image_url} 
                  alt={project.title} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white/30 p-8 border-2 border-dashed border-white/10 rounded-2xl max-w-[80%]">
                    <p className="font-medium text-lg mb-2">Photo Placeholder</p>
                    <p className="text-sm">{t.comments.placeholder}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Info */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto no-scrollbar flex-1 min-h-0">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-2">
                {project.title}
              </h2>
              <p className="text-secondary mb-8">{project.category}</p>

              <div className="space-y-10">
                {/* Description */}
                <div>
                  <h3 className="text-white/90 font-medium mb-3 flex items-center gap-2">
                    {t.projectModal.description}
                  </h3>
                  <p className="text-secondary leading-relaxed text-sm md:text-base">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-white/90 font-medium mb-3 flex items-center gap-2">
                    {t.projectModal.techStack}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(tech => (
                      <TechIcon key={tech} tech={tech} />
                    ))}
                  </div>
                </div>


                {/* Comments Section */}
                <div className="pt-6 border-t border-white/10">
                  <h3 className="text-white/90 font-medium mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-white/50" />
                    {t.comments.title} ({comments.length})
                  </h3>
                  
                  {user ? (
                    <div className="flex gap-3 mb-6">
                      <input 
                        type="text"
                        placeholder={t.comments.write}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-white/30 transition-colors"
                      />
                      <button 
                        onClick={handleAddComment}
                        disabled={isSubmitting || !newComment.trim()}
                        className="p-2.5 bg-white text-black rounded-xl hover:bg-white/90 disabled:opacity-50 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-secondary text-sm mb-6 bg-white/5 p-3 rounded-xl">
                      {t.comments.loginRequired}
                    </p>
                  )}

                  <div className="flex flex-col gap-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-white/90 text-sm">{comment.user_name}</span>
                          <span className="text-secondary text-xs">{new Date(comment.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed">{comment.text}</p>
                      </div>
                    ))}
                    {comments.length === 0 && (
                      <p className="text-secondary text-sm text-center py-4">{t.comments.empty}</p>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
