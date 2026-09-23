import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Heart, Eye, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../lib/LanguageContext';
import { useAuth } from '../lib/AuthContext';
import { api } from '../lib/api';
import ProjectModal from './ProjectModal';
import AdminPanel from './AdminPanel';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: ('C++' | 'Java' | 'JavaScript' | 'TypeScript' | 'React Native' | 'Lua')[];
  revenueData: number[];
  isDynamic?: boolean;
  image_url?: string;
}

function ProjectCard({ project, viewText, onClick, onDelete }: { project: Project, viewText: string, onClick: () => void, onDelete?: (e: React.MouseEvent) => void }) {
  const divRef = useRef<HTMLDivElement>(null);
  const { token, user } = useAuth();
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const [likedByMe, setLikedByMe] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const stats = await api.getProjectStats(project.id, token);
        setLikes(stats.likes);
        setViews(stats.views);
        setLikedByMe(stats.likedByMe);
      } catch (err) {}
    };
    loadStats();
  }, [project.id, token]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!token) {
      alert("Please login to like projects!");
      return;
    }
    setLikedByMe(!likedByMe);
    setLikes(prev => likedByMe ? prev - 1 : prev + 1);
    try {
      const data = await api.likeProject(project.id, token);
      setLikedByMe(data.liked);
    } catch (err) {
      setLikedByMe(!likedByMe);
      setLikes(prev => likedByMe ? prev + 1 : prev - 1);
    }
  };

  const handleCardClick = () => {
    api.viewProject(project.id).catch(() => {});
    setViews(prev => prev + 1);
    onClick();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={() => { setIsFocused(true); setOpacity(1); }}
      onBlur={() => { setIsFocused(false); setOpacity(0); }}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      onClick={handleCardClick}
      className="group relative overflow-hidden rounded-[2rem] bg-surface border border-white/5 cursor-pointer"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-30"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.06), transparent 40%)`,
        }}
      />
      
      <div className="relative h-[300px] md:h-[400px] w-full bg-[#141414] rounded-t-[2rem] border-b border-white/5 overflow-hidden">
        {project.image_url && (
          <img 
            src={project.image_url} 
            alt={project.title} 
            className="absolute inset-0 w-full h-full object-cover z-0" 
          />
        )}
        <div className="absolute top-6 right-6 z-40 flex items-center gap-2">
          {onDelete && (
             <button 
               onClick={onDelete}
               className="p-3 rounded-full bg-red-500/10 backdrop-blur-md border border-red-500/20 hover:bg-red-500/20 transition-colors text-red-500"
               title="Удалить проект"
             >
               <Trash2 className="w-4 h-4" />
             </button>
          )}
          <div className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-2 text-white/70 text-sm">
            <Eye className="w-4 h-4" />
            <span>{views}</span>
          </div>
          <button 
            onClick={handleLike}
            className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 transition-colors group/btn flex items-center gap-2"
          >
            <Heart className={cn("w-4 h-4 transition-colors", likedByMe ? "fill-red-500 text-red-500" : "text-white/70 group-hover/btn:text-white")} />
            {likes > 0 && <span className="text-white/80 text-sm font-medium">{likes}</span>}
          </button>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/[0.02] backdrop-blur-sm z-10">
          <span className="text-white bg-black/50 px-6 py-3 rounded-full flex items-center gap-2 font-medium border border-white/10">
            {viewText} <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>

      <div className="p-8 flex justify-between items-end relative z-20 bg-surface/50 backdrop-blur-md">
        <div>
          <h3 className="text-2xl font-medium text-white mb-2">{project.title}</h3>
          <p className="text-secondary">{project.category}</p>
        </div>
        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const { user, token } = useAuth();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dynamicProjects, setDynamicProjects] = useState<Project[]>([]);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const fetchDynamicProjects = async () => {
    try {
      const projs = await api.getDynamicProjects();
      setDynamicProjects(projs.map((p: any) => ({ ...p, isDynamic: true })));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchDynamicProjects();
  }, []);

  const handleDeleteRequest = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setProjectToDelete(id);
  };

  const confirmDelete = async () => {
    if (!token || !projectToDelete) return;
    try {
      await api.deleteDynamicProject(token, projectToDelete);
      fetchDynamicProjects();
    } catch (e) {
      alert('Ошибка при удалении');
    } finally {
      setProjectToDelete(null);
    }
  };

  const allProjects = dynamicProjects;
  
  // Split projects into two columns for masonry effect
  const leftColumn = allProjects.filter((_, i) => i % 2 === 0);
  const rightColumn = allProjects.filter((_, i) => i % 2 === 1);

  return (
    <>
      <section id="projects" className="w-full max-w-7xl py-32 flex flex-col gap-8 md:gap-16 pt-24">
        <div className="flex items-end justify-between mb-4 md:mb-8">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight">{t.projects.title}</h2>
        </div>
        
        <AdminPanel onProjectsChange={fetchDynamicProjects} />
        
        {allProjects.length === 0 ? (
          <div className="w-full py-20 text-center text-white/50 border border-white/10 rounded-[2rem] bg-white/[0.02]">
            {t.admin.emptyProjects}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="flex flex-col gap-6 md:gap-8 md:mt-16">
              {leftColumn.map(proj => (
                <ProjectCard 
                  key={proj.id} 
                  project={proj} 
                  viewText={t.projects.view} 
                  onClick={() => setSelectedProject(proj)} 
                  onDelete={proj.isDynamic && (user?.name === 'ilyxasuper' || user?.name === 'Proxzy') ? (e) => handleDeleteRequest(e, proj.id) : undefined}
                />
              ))}
            </div>
            <div className="flex flex-col gap-6 md:gap-8">
              {rightColumn.map(proj => (
                <ProjectCard 
                  key={proj.id} 
                  project={proj} 
                  viewText={t.projects.view} 
                  onClick={() => setSelectedProject(proj)} 
                  onDelete={proj.isDynamic && (user?.name === 'ilyxasuper' || user?.name === 'Proxzy') ? (e) => handleDeleteRequest(e, proj.id) : undefined}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {projectToDelete && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setProjectToDelete(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#111] border border-white/10 rounded-3xl p-6 md:p-8 max-w-sm w-full text-center shadow-2xl"
            >
              <h3 className="text-xl font-medium text-white mb-2">{t.admin.deleteTitle}</h3>
              <p className="text-secondary text-sm mb-6">{t.admin.deleteDesc}</p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setProjectToDelete(null)}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors font-medium text-sm border border-white/10"
                >
                  {t.admin.cancel}
                </button>
                <button 
                  onClick={confirmDelete}
                  className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors font-medium text-sm shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                >
                  {t.admin.delete}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
