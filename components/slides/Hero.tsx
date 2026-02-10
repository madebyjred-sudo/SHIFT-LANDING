import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { useScene } from '../../contexts/SceneContext';
// Watermark SVG - Resonancia art (inline for theme color control)
const ResonanciaWatermark = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 390.98 309.97"
    className="w-full h-auto object-contain !opacity-[0.08] dark:!opacity-[0.1] text-primary dark:text-white"
    aria-hidden
  >
    <path
      fill="none"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeWidth="0.8"
      d="M2.28,306.15c4.41-18.87,11.53-36.7,20.89-53.06,11.55-20.18,26.54-38.12,44.18-53.06-6.09,26.05-17.3,50.1-32.53,71.07-9.41,12.96-20.34,24.72-32.54,35.05ZM356.11,271.16c-15.26-21-26.51-45.12-32.6-71.21-34.55-29.2-79.24-46.82-128.04-46.82s-93.56,17.65-128.12,46.89c3.41-14.57,5.22-29.77,5.22-45.38,0-16.99-2.14-33.49-6.15-49.23-16.79-14.39-31.14-31.54-42.36-50.74C14.9,39.02,7.82,21.98,3.23,3.95c11.81,10.13,22.42,21.62,31.59,34.24,14.48,19.94,25.32,42.68,31.59,67.24,34.7,29.74,79.78,47.71,129.06,47.71s94.3-17.93,128.97-47.62c6.27-24.63,17.15-47.4,31.66-67.38,9.18-12.63,19.81-24.14,31.66-34.27-4.6,18.06-11.68,35.13-20.85,50.82-11.25,19.24-25.64,36.42-42.47,50.82-4.01,15.72-6.13,32.18-6.13,49.14,0,15.59,1.79,30.76,5.2,45.3,17.67,14.95,32.71,32.94,44.27,53.15,9.39,16.39,16.5,34.25,20.92,53.15-12.22-10.34-23.17-22.12-32.6-35.08Z"
    />
  </svg>
);

export const HeroSlide: React.FC = () => {
  const { goToSlide } = useScene();
  const shouldReduceMotion = useReducedMotion();

  // Parallax Physics - Heavier, "High Friction" feel
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 30, mass: 2 }; // Heavier mass
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (shouldReduceMotion) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPct = (clientX / innerWidth) - 0.5;
      const yPct = (clientY / innerHeight) - 0.5;
      x.set(xPct);
      y.set(yPct);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, shouldReduceMotion]);

  // Parallax transforms - subtle deep movement
  const bgX = useTransform(mouseXSpring, [-0.5, 0.5], shouldReduceMotion ? ['0%', '0%'] : ['-8%', '8%']);
  const bgY = useTransform(mouseYSpring, [-0.5, 0.5], shouldReduceMotion ? ['0%', '0%'] : ['-8%', '8%']);

  const textX = useTransform(mouseXSpring, [-0.5, 0.5], shouldReduceMotion ? ['0%', '0%'] : ['2%', '-2%']);
  const textY = useTransform(mouseYSpring, [-0.5, 0.5], shouldReduceMotion ? ['0%', '0%'] : ['2%', '-2%']);

  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-white dark:bg-[#050505]">

      {/* Background - Massive Resonancia Art Watermark */}
      <div
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden"
        aria-hidden
      >
        {/* Animated Background Video (WebP) */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src="hero-bg.webp"
            alt="Background Texture"
            className="w-full h-full object-cover opacity-[0.025] mix-blend-screen dark:mix-blend-screen contrast-125"
          />
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.1, opacity: 1 }} // Reduced scale to keep it centered and contained
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 w-[95vw] h-[95vw] md:w-[85vw] md:h-[85vw] text-primary dark:text-white mix-blend-multiply dark:mix-blend-screen flex items-center justify-center"
        >
          <ResonanciaWatermark />
        </motion.div>
      </div>

      {/* Main Grid Container */}
      <div className="relative z-10 w-full max-w-[1800px] h-full grid grid-cols-1 md:grid-cols-2 px-8 md:px-24">

        {/* LEFT COLUMN: Large Logo */}
        {/* LEFT COLUMN: Placeholder for Global Logo Alignment */}
        <div className="hidden md:flex items-center justify-center md:justify-end md:pr-16 h-[40vh] md:h-full order-1 md:order-1 pointer-events-none">
          {/* The GlobalBrandLogo will seamlessly position itself here when in Hero state */}
        </div>

        {/* RIGHT COLUMN: Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-center items-center md:items-start text-center md:text-left h-full order-2 md:order-2 md:pl-16"
        >
          {/* Main Title Group */}
          <div className="flex flex-col items-center md:items-start leading-[0.9] mb-6 md:mb-8 relative z-20">
            <div className="overflow-visible">
              <motion.h1
                variants={{ hidden: { y: 100 }, visible: { y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
                className="font-glitz text-[12vw] md:text-[5.5vw] font-bold uppercase tracking-normal text-primary dark:text-white"
              >
                Somos
              </motion.h1>
            </div>

            <div className="overflow-visible">
              <motion.h1
                variants={{ hidden: { y: 100 }, visible: { y: 0, transition: { delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] } } }}
                className="font-glitz text-[12vw] md:text-[5.5vw] font-bold uppercase tracking-normal relative group cursor-pointer"
                data-cursor="hover"
              >
                <span className="relative inline-block">
                  {/* Base Magenta Gradient to match mockup */}
                  <span
                    className="bg-gradient-to-r from-[#E6007E] via-[#FF00FF] to-[#E6007E] bg-clip-text text-transparent animate-gradient"
                    style={{ backgroundSize: '200% 100%', animation: 'gradient-shift 3s ease infinite' }}
                  >
                    Imparables
                  </span>
                  {/* Shimmer Overlay */}
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ backgroundSize: '200% 100%', animation: 'shimmer 2s ease-in-out infinite' }}
                  >
                    Imparables
                  </span>
                </span>
              </motion.h1>
            </div>
          </div>

          {/* Description */}
          <motion.div
            variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { delay: 0.3, duration: 1 } } }}
            className="flex flex-col gap-2 text-primary dark:text-white font-body mb-8"
          >
            <div className="text-sm md:text-lg font-medium tracking-wide leading-relaxed">
              Comunicación <span className="font-bold">estratégica</span>, <br />
              inteligencia de datos y tecnología <span className="font-bold">creativa</span>.
            </div>
            <div className="text-sm md:text-lg font-medium tracking-wide leading-relaxed mt-2">
              Transformamos <span className="font-bold">marcas</span>, influimos <span className="font-bold">mercados</span><br />
              y movemos <span className="font-bold">políticas</span> en toda Latinoamérica.
            </div>
          </motion.div>

          {/* CTA */}
          <motion.button
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 1 } } }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 py-3 bg-secondary text-white font-display text-sm md:text-base font-bold uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(255,0,255,0.4)] hover:shadow-[0_0_30px_rgba(255,0,255,0.6)] transition-shadow duration-300"
            type="button"
            onClick={() => goToSlide(2)}
          >
            Descubre el Impacto
          </motion.button>

        </motion.div>
      </div>

    </div>
  );
};