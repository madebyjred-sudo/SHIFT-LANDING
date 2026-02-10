import React, { useEffect, useRef } from 'react';
import { useScene } from '../contexts/SceneContext';
import { SlideId } from '../types';
import { AnimatePresence, motion } from 'framer-motion';

// Import Slides
import { HeroSlide } from './slides/Hero';
import { ManifestoSlide } from './slides/Manifesto';
import { ProjectListSlide } from './slides/ProjectList';
import { ServicesSlide } from './slides/Services';
import { ContactSlide } from './slides/Contact';
import { GlobalBrandLogo } from './GlobalBrandLogo';

const slides = [
  { id: SlideId.HERO, component: HeroSlide },
  { id: SlideId.MANIFESTO, component: ManifestoSlide },
  { id: SlideId.WORK, component: ProjectListSlide },
  { id: SlideId.SERVICES, component: ServicesSlide },
  { id: SlideId.CONTACT, component: ContactSlide },
];

export const SceneController: React.FC = () => {
  const { currentSlide, direction, nextSlide, prevSlide, isScrollLocked } = useScene();
  const touchStart = useRef<number>(0);

  // Haptics Helper
  const triggerHaptic = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(5);
    }
  };

  // Trigger haptic on slide change
  useEffect(() => {
    triggerHaptic();
  }, [currentSlide]);

  // Wheel Handler
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrollLocked) return;

      // Debounce is handled in Context, but we can filter small movements here
      if (Math.abs(e.deltaY) > 20) {
        if (e.deltaY > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrollLocked) return;

      const touchEnd = e.changedTouches[0].clientY;
      const diff = touchStart.current - touchEnd;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextSlide, prevSlide, isScrollLocked]);

  // Robust "Cover + Fade" Transition
  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? '100%' : '-100%',
      zIndex: 20,
      opacity: 0,
    }),
    center: {
      zIndex: 10,
      y: 0,
      opacity: 1,
      transition: {
        y: { type: "spring" as const, stiffness: 300, damping: 30, mass: 1 },
        opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      // Parallax: Move slightly in opposite direction of entry to create depth
      y: direction > 0 ? '-20%' : '20%',
      scale: 0.95,
      opacity: 0,
      transition: {
        y: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
        scale: { duration: 0.6 }
      }
    })
  };

  const activeSlide = slides[currentSlide] || slides[0];
  const ActiveComponent = activeSlide.component;

  return (
    // Height uses var(--vh) fix for mobile browsers
    <div
      className="relative w-full overflow-hidden bg-surface-container dark:bg-tertiary transition-colors duration-500 text-tertiary dark:text-white"
      style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
    >
      <GlobalBrandLogo currentSlide={currentSlide} />

      <AnimatePresence initial={false} custom={direction}>
        <motion.div

          key={currentSlide}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          <ActiveComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};