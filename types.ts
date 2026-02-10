import React from 'react';

export enum SlideId {
  HERO = 0,
  MANIFESTO = 1,
  WORK = 2,
  SERVICES = 3,
  CONTACT = 4,
}

export interface SlideData {
  id: SlideId;
  label: string;
  component: React.FC;
}

export interface SceneState {
  currentSlide: number;
  direction: number; // 1 for down, -1 for up
  isTransitioning: boolean;
  isScrollLocked: boolean;
}

export interface SceneContextType extends SceneState {
  nextSlide: (force?: boolean) => void;
  prevSlide: (force?: boolean) => void;
  goToSlide: (index: number, force?: boolean) => void;
  setTransitioning: (state: boolean) => void;
  setScrollLocked: (locked: boolean) => void;
  totalSlides: number;
}