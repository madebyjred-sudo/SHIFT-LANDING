import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Maximize2, Trophy, Target, TrendingUp, Users } from 'lucide-react';
import Lenis from 'lenis';
import { projects } from '../data/projects';

interface CaseStudyProps {
    project: any;
    onClose: () => void;
}

const RevealImage = ({ src, className, aspect = "aspect-[16/9]" }: { src: string, className?: string, aspect?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    return (
        <div ref={ref} className={`relative overflow-hidden ${aspect} ${className}`}>
            <motion.div
                initial={{ clipPath: "inset(0% 0% 100% 0%)", scale: 1.1 }}
                animate={isInView ? { clipPath: "inset(0% 0% 0% 0%)", scale: 1 } : {}}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full"
            >
                <img src={src} className="w-full h-full object-cover" alt="Visual del proyecto" />
            </motion.div>
        </div>
    );
};

export const CaseStudyView: React.FC<CaseStudyProps> = ({ project, onClose }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ container: containerRef });
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);

    // Parallax for Hero
    const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    useEffect(() => {
        const lenis = new Lenis({
            wrapper: containerRef.current!,
            content: containerRef.current?.firstElementChild as HTMLElement,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <>
            <AnimatePresence>
                {isFullScreen && (project.fullVideoUrl || project.videoUrl) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
                    >
                        <button
                            onClick={() => setIsFullScreen(false)}
                            className="absolute top-8 right-8 z-[210] p-4 bg-white/10 backdrop-blur-lg rounded-full hover:scale-110 transition-transform border border-white/20 text-white"
                        >
                            <X size={24} />
                        </button>
                        {project.fullVideoUrl?.includes('youtube.com/embed') ? (
                            <iframe
                                src={`${project.fullVideoUrl}?autoplay=1`}
                                className="w-full h-full max-w-5xl aspect-video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={project.title}
                            />
                        ) : (
                            <video
                                key={project.fullVideoUrl || project.videoUrl}
                                className="w-full h-full object-contain"
                                controls
                                autoPlay
                                preload="auto"
                                playsInline
                            >
                                <source src={project.fullVideoUrl || project.videoUrl} type="video/mp4" />
                            </video>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ opacity: 0, y: '100%' }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: '20%' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-[100] bg-surface dark:bg-[#080808] text-tertiary dark:text-white"
            >
                {/* Scroll Container */}
                <div ref={containerRef} className="h-full w-full overflow-y-auto no-scrollbar">
                    <div className="relative"> {/* Content Wrapper for Lenis */}

                        {/* Mobile/Desktop Sticky Header & Close Button */}
                        <div className="fixed top-0 left-0 w-full z-[120] pointer-events-none p-6 md:p-8 flex justify-end mix-blend-difference text-white">
                            <button
                                onClick={onClose}
                                className="pointer-events-auto p-3 md:p-4 bg-white/20 backdrop-blur-xl rounded-full hover:scale-110 transition-transform border border-white/20 shadow-lg text-white"
                                aria-label="Cerrar proyecto"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Immersive Hero */}
                        <header className="relative w-full h-[80vh] md:h-screen overflow-hidden bg-tertiary dark:bg-[#0a0a0a]">
                            {/* Background media with parallax */}
                            <motion.div style={{ y: yHero }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
                                {project.videoUrl ? (
                                    <div className="w-full h-full relative">
                                        <video
                                            key={project.videoUrl}
                                            className={`w-full h-full object-cover pointer-events-none transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            preload="auto"
                                            onLoadedData={() => setVideoLoaded(true)}
                                        >
                                            <source src={project.videoUrl} type="video/mp4" />
                                        </video>
                                        {/* Fallback poster image while video loads */}
                                        {!videoLoaded && project.img && (
                                            <img src={project.img} className="absolute inset-0 w-full h-full object-cover" alt="" />
                                        )}
                                    </div>
                                ) : (
                                    <img src={project.img} className="w-full h-full object-cover" alt={project.title} />
                                )}
                            </motion.div>

                            {/* Dark overlay for title readability — always present */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 pointer-events-none" />

                            {(project.fullVideoUrl || project.videoUrl) && (
                                <button
                                    onClick={() => setIsFullScreen(true)}
                                    className="absolute bottom-8 right-8 md:bottom-32 md:right-24 z-20 p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors text-white border border-white/20 group"
                                    aria-label="Ver video pantalla completa"
                                >
                                    <Maximize2 size={24} className="group-hover:scale-110 transition-transform" />
                                </button>
                            )}

                            {/* Title — always visible immediately, no blend mode dependency */}
                            <div className="absolute bottom-0 left-0 p-6 md:p-24 w-full z-10">
                                <motion.h1
                                    initial={{ y: 60, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="text-[14vw] md:text-[14vw] font-display font-black uppercase leading-[0.85] md:leading-[0.8] tracking-tighter text-white"
                                    style={{ textShadow: '0 4px 40px rgba(0,0,0,0.4)' }}
                                >
                                    {project.title}
                                </motion.h1>
                            </div>
                        </header>

                        {/* Sticky Body Section */}
                        <section className="px-5 md:px-12 py-10 md:py-24 bg-surface dark:bg-[#080808] relative z-10 rounded-t-3xl -mt-8 shadow-2xl">
                            <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24">

                                {/* Sticky Sidebar (Desktop) / Static Info (Mobile) */}
                                <div className="lg:col-span-4 h-fit lg:sticky lg:top-12 flex flex-col gap-8 lg:gap-12 order-1">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <h5 className="text-xs font-display font-bold uppercase tracking-widest text-secondary mb-4">Descripción</h5>
                                        <p className="font-body text-xl md:text-2xl font-light leading-relaxed text-tertiary/90 dark:text-white/90">
                                            {project.story.challenge}
                                        </p>
                                    </motion.div>

                                    <div className="grid grid-cols-2 gap-8 border-t border-black/10 dark:border-white/10 pt-8">
                                        <div>
                                            <h5 className="text-[10px] font-display font-bold uppercase tracking-widest opacity-50 mb-2">Cliente</h5>
                                            <p className="font-display font-semibold text-lg">{project.client || "Confidencial"}</p>
                                        </div>
                                        <div>
                                            <h5 className="text-[10px] font-display font-bold uppercase tracking-widest opacity-50 mb-2">Año</h5>
                                            <p className="font-display font-semibold text-lg">{project.year || "2024"}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <h5 className="text-[10px] font-display font-bold uppercase tracking-widest opacity-50 mb-2">Servicios</h5>
                                            <div className="flex flex-wrap gap-2">
                                                {project.services?.map((s: string) => (
                                                    <span key={s} className="px-3 py-1 border border-black/10 dark:border-white/10 rounded-full text-xs font-display font-medium uppercase">{s}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Content Stream */}
                                <div className="lg:col-span-8 flex flex-col gap-16 md:gap-40 order-2">
                                    {/* Process / Shift */}
                                    <div>
                                        <h3 className="text-3xl md:text-5xl font-display font-bold mb-8">{project.story.shift}</h3>
                                        <div className="w-full h-[1px] bg-black/10 dark:bg-white/10 mb-12"></div>
                                    </div>

                                    {/* Media Grid */}
                                    <div className="flex flex-col gap-24">
                                        {/* Visual 1 - Full Width */}
                                        {project.gallery?.[0] && (
                                            <RevealImage src={project.gallery[0]} aspect="aspect-[16/9]" />
                                        )}

                                        {/* Visual 2 & 3 - Asymmetric Split */}
                                        {project.gallery?.[1] && project.gallery?.[2] && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end">
                                                <div className="md:mb-24">
                                                    <RevealImage src={project.gallery[1]} aspect="aspect-[3/4]" />
                                                    <p className="mt-4 text-xs font-display uppercase tracking-widest opacity-50">Experiencia Móvil</p>
                                                </div>
                                                <div>
                                                    <RevealImage src={project.gallery[2]} aspect="aspect-[4/5]" />
                                                </div>
                                            </div>
                                        )}

                                        {/* Visual 4 - Full Width */}
                                        {project.gallery?.[3] && (
                                            <RevealImage src={project.gallery[3]} aspect="aspect-[21/9]" />
                                        )}
                                    </div>

                                    {/* Impact */}
                                    <div className="bg-surface-container dark:bg-white/5 p-12 md:p-24 rounded-3xl">
                                        <h5 className="text-secondary font-display font-bold uppercase tracking-widest mb-12 text-center">El Impacto</h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                            {(() => {
                                                const iconMap = { Trophy, Target, TrendingUp, Users };
                                                const metrics = project.story.metrics || [
                                                    { icon: 'Trophy', label: "Premios", value: "3 Lions" },
                                                    { icon: 'Target', label: "Alcance", value: "+45M" },
                                                    { icon: 'TrendingUp', label: "Engagement", value: "12%" },
                                                    { icon: 'Users', label: "Conversión", value: "+150%" }
                                                ];

                                                return metrics.map((item: any, idx: number) => {
                                                    const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Trophy;
                                                    return (
                                                        <motion.div
                                                            key={idx}
                                                            initial={{ opacity: 0, y: 20 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                                                            className="flex flex-col items-center text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-secondary/50 transition-colors group"
                                                        >
                                                            <div className="p-4 bg-secondary/10 rounded-full mb-6 group-hover:bg-secondary/20 transition-colors">
                                                                <IconComponent className="w-8 h-8 text-secondary" />
                                                            </div>
                                                            <h3 className="text-3xl font-display font-bold text-tertiary dark:text-white mb-2">{item.value}</h3>
                                                            <p className="text-sm font-body uppercase tracking-widest opacity-60">{item.label}</p>
                                                        </motion.div>
                                                    );
                                                });
                                            })()}
                                        </div>
                                        <div className="mt-12 text-center">
                                            <p className="font-display font-medium text-2xl bg-clip-text text-transparent bg-gradient-to-r from-shift-tertiary to-shift-secondary dark:from-white dark:to-shift-secondary">
                                                {project.story.impact}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Next Project Footer */}
                        {(() => {
                            const currentIndex = projects.findIndex(p => p.id === project.id);
                            const nextProject = projects[(currentIndex + 1) % projects.length];

                            return (
                                <section className="h-[60vh] bg-tertiary text-white flex items-center justify-center relative overflow-hidden group cursor-pointer" onClick={onClose}>
                                    <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                                        <img src={nextProject.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" alt="Next Project" />
                                    </div>
                                    <div className="relative z-10 text-center flex flex-col items-center gap-8">
                                        <div className="space-y-4">
                                            <span className="block text-xs font-display font-bold uppercase tracking-widest text-secondary">Explorar más</span>
                                            <h2 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tighter group-hover:tracking-normal transition-all duration-500 max-w-4xl px-4">
                                                {nextProject.title}
                                            </h2>
                                        </div>

                                        {/* Next Project Preview */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            className="relative w-64 md:w-80 aspect-video rounded-xl overflow-hidden border border-white/20 shadow-2xl group-hover:scale-110 transition-transform duration-500"
                                        >
                                            <img src={nextProject.img} alt="" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                                                <p className="text-xs font-bold uppercase tracking-widest opacity-80">Siguiente</p>
                                                <p className="font-display font-bold text-lg leading-tight">{nextProject.cat}</p>
                                            </div>
                                        </motion.div>

                                        <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-500">
                                            <span className="flex items-center gap-2 font-display font-bold uppercase border-b-2 border-secondary pb-1 text-secondary">Ver Proyecto <ArrowRight size={16} /></span>
                                        </div>
                                    </div>
                                </section>
                            );
                        })()}
                    </div>
                </div>
            </motion.div>
        </>
    );
};
