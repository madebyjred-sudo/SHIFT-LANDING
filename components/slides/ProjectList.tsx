import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { useScene } from '../../contexts/SceneContext';
import { CaseStudyView } from '../CaseStudyView';
import { ArrowUpRight } from 'lucide-react';
import { MobileSectionHeader } from '../MobileSectionHeader';

import { projects } from '../../data/projects';

// --- DESKTOP CURSOR COMPONENT ---
const CursorMedia: React.FC<{ activeProject: any | null, x: any, y: any }> = ({ activeProject, x, y }) => {
    return (
        <motion.div
            style={{
                x,
                y,
                translateX: '-50%',
                translateY: '-50%',
            }}
            animate={{
                opacity: activeProject ? 1 : 0,
                scale: activeProject ? 1 : 0.9
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 w-[400px] h-[500px] z-10 pointer-events-none hidden md:block overflow-hidden rounded-xl"
        >
            {activeProject?.img && (
                <img
                    key={activeProject.img}
                    src={activeProject.img}
                    className="w-full h-full object-cover grayscale contrast-125"
                    alt="Project Preview"
                />
            )}
            {activeProject && !activeProject.videoUrl && (
                <img
                    src={activeProject.img}
                    className="w-full h-full object-cover grayscale contrast-125"
                    alt="Project Preview"
                />
            )}
        </motion.div>
    );
};

// --- MOBILE CARD COMPONENT ---
const MobileProjectCard: React.FC<{ project: any, onClick: () => void }> = ({ project, onClick }) => {
    return (
        <motion.div
            className="min-w-[85vw] h-[60vh] snap-center flex flex-col justify-end relative rounded-3xl overflow-hidden shadow-lg mx-2"
            onClick={onClick}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ amount: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <img src={project.img} className="absolute inset-0 w-full h-full object-cover grayscale contrast-125" alt={project.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-shift-tertiary/90 via-shift-tertiary/20 to-transparent"></div>

            <div className="relative z-10 p-8 flex flex-col items-start gap-2">
                <span className="px-3 py-1 bg-secondary backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white">
                    {project.cat}
                </span>
                <h3 className="text-3xl font-display font-black uppercase text-white leading-none">
                    {project.title}
                </h3>
                <p className="text-sm font-body text-white/70">Para {project.client}</p>
            </div>
        </motion.div>
    );
}


export const ProjectListSlide: React.FC = () => {
    const [hoveredProject, setHoveredProject] = useState<number | null>(null);
    const [selectedProject, setSelectedProject] = useState<any | null>(null);
    const { setScrollLocked } = useScene();

    // Cursor Motion
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    useEffect(() => {
        setScrollLocked(!!selectedProject);
    }, [selectedProject, setScrollLocked]);

    const activeProject = hoveredProject
        ? projects.find(p => p.id === hoveredProject) || null
        : null;

    const stopPropagation = (e: React.TouchEvent | React.WheelEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="w-full h-full flex flex-col relative overflow-hidden">

            {/* --- MOBILE LAYOUT (Horizontal Carousel) --- */}
            <div className="md:hidden w-full h-full flex items-center bg-surface-container dark:bg-transparent relative">
                <MobileSectionHeader title="Portafolio" />
                <div
                    className="w-full flex overflow-x-auto snap-x snap-mandatory px-[7.5vw] py-12 gap-0 no-scrollbar"
                    onTouchStart={stopPropagation}
                    onTouchMove={stopPropagation}
                    onTouchEnd={stopPropagation}
                    onWheel={stopPropagation}
                >
                    {projects.map((project) => (
                        <MobileProjectCard
                            key={project.id}
                            project={project}
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                </div>
                {/* Hint */}
                <div className="absolute bottom-24 w-full text-center text-xs font-display uppercase tracking-widest opacity-50 pointer-events-none text-tertiary dark:text-white">
                    Desliza para explorar
                </div>
            </div>


            {/* --- DESKTOP LAYOUT (List + Hover) --- */}
            <div className="hidden md:flex w-full h-full pt-32 pb-12 px-12 flex-col">
                {/* Floating Cursor Media */}
                <CursorMedia activeProject={activeProject} x={springX} y={springY} />

                {/* Project List */}
                <div className="flex-1 max-w-[1600px] mx-auto w-full flex flex-col justify-center relative z-20">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full"
                    >
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                className="group relative border-b border-tertiary/10 dark:border-white/10"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                onMouseEnter={() => setHoveredProject(project.id)}
                                onMouseLeave={() => setHoveredProject(null)}
                                onClick={() => setSelectedProject(project)}
                            >
                                <div
                                    className={`flex flex-row items-center justify-between py-8 cursor-pointer transition-all duration-300 ${hoveredProject && hoveredProject !== project.id ? 'opacity-30' : 'opacity-100'}`}
                                >
                                    <div className="flex items-baseline gap-8 transition-transform duration-300 group-hover:translate-x-4">
                                        <h2
                                            className="text-4xl lg:text-5xl font-display font-bold uppercase text-tertiary dark:text-white mix-blend-exclusion"
                                        >
                                            {project.title}
                                        </h2>
                                        <span className="text-sm font-body text-tertiary/60 dark:text-white/60 uppercase tracking-widest group-hover:text-secondary transition-colors">
                                            {project.cat}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span className="text-sm font-body text-tertiary/60 dark:text-white/60 uppercase tracking-widest text-right">
                                            Cliente: {project.client}
                                        </span>
                                        <span className="text-tertiary dark:text-white transform rotate-0 group-hover:rotate-45 transition-transform duration-300 opacity-0 group-hover:opacity-100 group-hover:text-secondary">
                                            <ArrowUpRight size={24} />
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Case Study Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <CaseStudyView project={selectedProject} onClose={() => setSelectedProject(null)} />
                )}
            </AnimatePresence>
        </div>
    );
};