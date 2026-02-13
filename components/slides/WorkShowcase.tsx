import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useScene } from '../../contexts/SceneContext';
import { CaseStudyView } from '../CaseStudyView';

import { projects } from '../../data/projects';

export const WorkShowcaseSlide: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { setScrollLocked } = useScene();
  const shouldReduceMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);

  // Lock global scroll/slide transition when modal is open
  useEffect(() => {
    setScrollLocked(!!selectedId);
  }, [selectedId, setScrollLocked]);

  const selectedProject = projects.find(p => p.id === selectedId);

  return (
    <div className="w-full h-full flex flex-col justify-center relative overflow-hidden bg-surface-container dark:bg-transparent">
      <div className="px-8 md:px-24 mb-8 md:mb-12 relative z-10">
        <h3 className="text-secondary font-display font-bold text-xs md:text-sm tracking-widest uppercase mb-2">03 — Projects</h3>
        <h2 className="font-display font-bold text-4xl md:text-6xl text-tertiary dark:text-white">Case Studies</h2>
      </div>

      {/* ENDLESS MARQUEE */}
      <div
        className="relative w-full overflow-hidden group"
        role="region"
        aria-label="Project carousel"
      >
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-shift-surface-container dark:from-[#050914] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-shift-surface-container dark:from-[#050914] to-transparent z-10 pointer-events-none"></div>

        <motion.div
          className="flex gap-8 md:gap-12 w-max px-8"
          animate={shouldReduceMotion || (isPaused && !selectedId) ? { x: 0 } : { x: ["0%", "-50%"] }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ width: "fit-content" }}
          onHoverStart={() => setIsPaused(true)}
          onHoverEnd={() => setIsPaused(false)}
        >
          {/* Double the list for infinite loop effect */}
          {[...projects, ...projects].map((project, index) => (
            <motion.button
              key={`${project.id}-${index}`}
              className="relative min-w-[70vw] md:min-w-[35vw] aspect-[16/9] md:aspect-[4/3] cursor-pointer text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-secondary"
              onClick={() => setSelectedId(project.id)}
              onHoverStart={() => {
                setIsPaused(true);
                setHoveredIndex(index);
              }}
              onHoverEnd={() => {
                setIsPaused(false);
                setHoveredIndex(null);
              }}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
              initial="rest"
              whileHover="hover"
              whileFocus="hover"
              aria-label={`Ver caso de estudio: ${project.title} - ${project.cat}`}
            >
              <motion.div
                className="w-full h-full rounded-2xl overflow-hidden shadow-elevation-2 relative border-2 border-transparent transition-all"
                variants={{
                  rest: {
                    y: 0,
                    scale: 1,
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    borderColor: "rgba(0,0,0,0)"
                  },
                  hover: {
                    y: shouldReduceMotion ? 0 : -12,
                    scale: shouldReduceMotion ? 1 : 1.02,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 0 25px 2px rgba(255, 0, 255, 0.6)",
                    borderColor: "rgba(255, 0, 255, 0.3)"
                  }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img
                  src={project.img}
                  alt=""
                  className="w-full h-full object-cover"
                />

                {/* Video Preview on Hover */}
                {hoveredIndex === index && project.videoUrl && (
                  <div className="absolute inset-0 z-20 bg-black pointer-events-none">
                    <video
                      key={project.videoUrl}
                      className="w-full h-full object-cover pointer-events-none"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                    >
                      <source src={project.videoUrl} type="video/mp4" />
                    </video>
                  </div>
                )}

                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 md:p-8 flex flex-col justify-end pointer-events-none">
                  <span className="text-secondary font-display text-xs font-bold uppercase tracking-wider mb-2">{project.cat}</span>
                  <h3 className="text-2xl md:text-4xl font-display font-bold text-white uppercase">{project.title}</h3>
                </div>
              </motion.div>
            </motion.button>
          ))}
        </motion.div>

        <div className="absolute bottom-4 right-12 text-xs font-display font-bold uppercase tracking-widest text-tertiary/70 dark:text-white/70 pointer-events-none bg-white/50 dark:bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
          Click to view case study
        </div>
      </div>

      {/* NEW CASE STUDY VIEW */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyView project={selectedProject} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};