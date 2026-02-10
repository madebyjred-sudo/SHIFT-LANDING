import React from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useScene } from '../../contexts/SceneContext';
import { SlideId } from '../../types';
import { MobileSectionHeader } from '../MobileSectionHeader';

const phrase = "Nacimos en el 82, evolucionamos para el 2030. Combinamos más de 40 años de experiencia con la disrupción de una startup.";

// Data Nodes - Subtle background activity
const DataNodes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-10">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-secondary"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.5, 0.1]
          }}
          transition={{
            duration: Math.random() * 5 + 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

export const ManifestoSlide: React.FC = () => {
  const words = phrase.split(" ");
  const shouldReduceMotion = useReducedMotion();
  const { theme } = useTheme();
  const { goToSlide } = useScene();

  // Card Tilt Logic - High Friction
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 }); // Heavier
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], shouldReduceMotion ? ["0deg", "0deg"] : ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], shouldReduceMotion ? ["0deg", "0deg"] : ["-3deg", "3deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
      y: 20,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row items-center justify-center p-8 md:p-24 relative perspective-1000 bg-surface-container dark:bg-transparent">
      {/* Mobile Header - Uniform */}
      <MobileSectionHeader title="Filosofía" subtitle="02 — El Poder de Shift" />

      {/* Data Nodes Background */}
      <DataNodes />

      <div className="md:w-1/2 relative z-10 pt-16 md:pt-0">
        <h3 className="hidden md:flex text-secondary font-display font-bold mb-6 md:mb-8 text-xs md:text-sm tracking-widest uppercase items-center gap-2">
          <span className="w-6 h-[2px] bg-secondary rounded-full"></span>
          02 — El Poder de Shift
        </h3>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="flex flex-wrap"
          aria-label={phrase}
        >
          {words.map((word, index) => (
            <motion.span
              variants={child}
              key={index}
              aria-hidden="true"
              className="mr-2 md:mr-3 mb-1 md:mb-2 text-[1.75rem] md:text-5xl lg:text-6xl font-display font-bold uppercase text-tertiary dark:text-white leading-tight"
            >
              {word.toLowerCase().includes("experiencia") || word.toLowerCase().includes("startup") ? (
                <span className="text-secondary">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <div className="md:w-1/3 mt-8 md:mt-0 relative z-10 pl-0 md:pl-12" style={{ perspective: 1000 }}>
        <motion.button
          type="button"
          onClick={() => goToSlide(SlideId.SERVICES)}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="liquid-glass w-full text-left p-6 md:p-10 rounded-3xl relative overflow-hidden group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary transition-all duration-500"
          aria-label="Shift Porter Novelli. Parte de Garnier Group y red global."
        >
          {/* Gloss Highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50 pointer-events-none"></div>

          <div className="relative z-10 transform translate-z-20">
            <div className="w-2 h-2 bg-secondary rounded-full mb-4 md:mb-6 animate-pulse"></div>
            <h4 className="font-display font-bold text-tertiary dark:text-white mb-3 md:mb-4 text-lg md:text-xl">Globales y Latinos</h4>
            <p className="font-body text-tertiary/80 dark:text-white/80 text-sm md:text-base leading-relaxed mb-6 md:mb-8">
              Somos parte del Garnier Group y la red global Porter Novelli. Con presencia en toda Latinoamérica y nuestro Hub en Miami, no solo gestionamos reputación — creamos cultura.
            </p>

            {/* AWARDS GRAPHIC PLACEMENT */}
            <div className="mb-6 md:mb-8 p-3 md:p-4 rounded-xl border border-tertiary/10 dark:border-white/10">
              <img
                src="/AWRDS%20SHIFT.svg"
                alt="Reconocidos con los más importantes galardones a nivel global"
                className={`w-full h-auto opacity-90 ${theme === 'dark' ? 'invert' : ''}`}
              />
            </div>

            <div className="flex items-center gap-2 text-sm font-display font-bold text-secondary group-hover:gap-3 transition-all">
              Explora nuestros servicios <span className="text-lg">→</span>
            </div>
          </div>

        </motion.button>
      </div>
    </div>
  );
};