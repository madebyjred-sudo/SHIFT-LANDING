import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { SceneContextType, SlideId } from '../types';

const TOTAL_SLIDES = 5;
const SCROLL_COOLDOWN = 800;

const SceneContext = createContext<SceneContextType | undefined>(undefined);

export const SceneProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(SlideId.HERO);
  const [direction, setDirection] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isScrollLocked, setScrollLocked] = useState<boolean>(false);
  const [lastScrollTime, setLastScrollTime] = useState<number>(0);

  const safeSetSlide = useCallback((newIndex: number, newDirection: number, force: boolean = false) => {
    // If locked (e.g., modal is open), do not change slides unless forced
    if (isScrollLocked && !force) return;

    const now = Date.now();
    if (now - lastScrollTime < SCROLL_COOLDOWN && !force) return;

    if (newIndex >= 0 && newIndex < TOTAL_SLIDES) {
      setDirection(newDirection);
      setIsTransitioning(true);
      setCurrentSlide(newIndex);
      setLastScrollTime(now);

      setTimeout(() => {
        setIsTransitioning(false);
      }, SCROLL_COOLDOWN);
    }
  }, [lastScrollTime, isScrollLocked]);

  const nextSlide = useCallback((force?: boolean) => {
    safeSetSlide(currentSlide + 1, 1, force);
  }, [currentSlide, safeSetSlide]);

  const prevSlide = useCallback((force?: boolean) => {
    safeSetSlide(currentSlide - 1, -1, force);
  }, [currentSlide, safeSetSlide]);

  const goToSlide = useCallback((index: number, force?: boolean) => {
    if (index === currentSlide) return;
    const newDirection = index > currentSlide ? 1 : -1;
    safeSetSlide(index, newDirection, force);
  }, [currentSlide, safeSetSlide]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrollLocked) return;

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          prevSlide();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, isScrollLocked]);

  return (
    <SceneContext.Provider
      value={{
        currentSlide,
        direction,
        isTransitioning,
        isScrollLocked,
        nextSlide,
        prevSlide,
        goToSlide,
        setTransitioning: setIsTransitioning,
        setScrollLocked,
        totalSlides: TOTAL_SLIDES,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
};

export const useScene = () => {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error('useScene must be used within a SceneProvider');
  }
  return context;
};