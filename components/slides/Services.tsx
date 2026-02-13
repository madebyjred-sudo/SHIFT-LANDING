import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, BrainCircuit, Zap, TrendingUp, Smartphone, ArrowRight, Sparkles, Users, Map, Lightbulb, Monitor, Star, Search, Video, Cpu } from 'lucide-react';
import { useScene } from '../../contexts/SceneContext';
import { SlideId } from '../../types';
import { MobileSectionHeader } from '../MobileSectionHeader';
import { useLanguage } from '../../contexts/LanguageContext';

// Icons mapping to match translations order
const ServiceIcons = [
  Users,      // PR
  Map,        // Planning
  Lightbulb,  // Creativity
  Monitor,    // Digital
  Star,       // Influence
  Search,     // Data
  TrendingUp, // Performance
  Video,      // Production
  Cpu         // Technologies
];

const ServiceCard = ({ service, index }: { service: any, index: number }) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`group relative p-8 rounded-[2rem] overflow-hidden border transition-all duration-500 hover:shadow-2xl ${service.isSpecial
        ? 'bg-purple-500/5 border-purple-500/20 hover:border-purple-500/40 dark:bg-purple-500/10 dark:border-purple-500/30 dark:hover:border-purple-400'
        : 'bg-white/60 border-gray-200 hover:border-gray-300 hover:bg-white/80 dark:bg-white/5 dark:border-white/10 dark:hover:border-white/30 dark:hover:bg-white/10'
        } backdrop-blur-md shadow-sm dark:shadow-none`}
    >
      {/* Glow Effect for Special Card */}
      {service.isSpecial && (
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-purple-500/30 transition-colors" />
      )}

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className={`p-4 rounded-2xl ${service.isSpecial
            ? 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-200'
            : 'bg-tertiary/5 text-tertiary dark:bg-white/10 dark:text-white'
            }`}>
            <Icon size={32} strokeWidth={1.5} />
          </div>
          {service.isSpecial && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-600 dark:text-purple-200 border border-purple-500/30 flex items-center gap-1">
              <Sparkles size={12} /> New Core
            </span>
          )}
        </div>

        {/* Content */}
        <div className="mb-8">
          <h4 className="text-sm font-medium tracking-wider opacity-60 uppercase mb-2 text-tertiary dark:text-white font-display">{service.subtitle}</h4>
          <h3 className="text-3xl font-bold mb-4 leading-tight text-tertiary dark:text-white font-display">{service.title}</h3>
          <p className="text-lg opacity-80 leading-relaxed text-tertiary dark:text-white font-body">
            {service.description}
          </p>
        </div>

        {/* Interactive Features List */}
        <div className="mt-auto space-y-3">
          <div className="w-full h-px bg-gradient-to-r from-shift-tertiary/20 to-transparent dark:from-white/20 mb-4" />
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {service.features.map((feature: string, idx: number) => (
              <li key={idx} className="flex items-center gap-2 text-sm opacity-70 group-hover:opacity-100 transition-opacity text-tertiary dark:text-white font-body">
                <div className={`w-1.5 h-1.5 rounded-full ${service.isSpecial ? 'bg-purple-500 dark:bg-purple-400' : 'bg-tertiary dark:bg-white'}`} />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Hover Action */}
        <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
          <ArrowRight className={service.isSpecial ? 'text-purple-500 dark:text-purple-300' : 'text-tertiary dark:text-white'} />
        </div>
      </div>
    </motion.div>
  );
};

export const ServicesSlide: React.FC = () => {
  const { t } = useLanguage();
  const { goToSlide, setScrollLocked, nextSlide, prevSlide } = useScene();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const canNavigate = useRef(false); // Cooldown to prevent scroll skipping

  const services = t.services.items.map((item, index) => ({
    ...item,
    icon: ServiceIcons[index]
  }));

  // Lock scroll when this slide is active to prevent SceneController from hijacking scroll
  // AND set a cooldown for navigation to prevent inertia skips
  useEffect(() => {
    setScrollLocked(true);

    // Allow navigation after 2 seconds (prevents inertia from skipping slide)
    const timer = setTimeout(() => {
      canNavigate.current = true;
    }, 2000);

    return () => {
      setScrollLocked(false);
      clearTimeout(timer);
    };
  }, [setScrollLocked]);

  const handleWheel = (e: React.WheelEvent) => {
    const el = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const isAtTop = scrollTop === 0;
    // Tolerance for floating point calculation
    const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 5;

    // Check if user is scrolling past the boundary
    if (e.deltaY > 0 && isAtBottom) {
      if (!canNavigate.current) return; // Block exit during cooldown
      // Scrolling down at bottom -> Go to next slide
      nextSlide(true);
    } else if (e.deltaY < 0 && isAtTop) {
      if (!canNavigate.current) return; // Block exit during cooldown
      // Scrolling up at top -> Go to prev slide
      prevSlide(true);
    }
    // Else: let the element scroll naturally. 
    // Since we locked the global scroll, SceneController won't react.
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY; // Positive = swipe up (scroll down)

    const el = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const isAtTop = scrollTop === 0;
    const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 5;

    if (Math.abs(diff) > 50) { // Threshold for swipe
      if (diff > 0 && isAtBottom) {
        if (!canNavigate.current) return;
        nextSlide(true);
      } else if (diff < 0 && isAtTop) {
        if (!canNavigate.current) return;
        prevSlide(true);
      }
    }
  };

  return (
    <section
      ref={scrollContainerRef}
      className="relative w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar py-24 px-4 sm:px-6 lg:px-8"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Decor & Video */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Light Mode Overlay: Clean Professional White/Gray */}
        <div className="absolute inset-0 bg-slate-50/80 dark:hidden z-20 mix-blend-hard-light" />

        {/* Dark Mode Overlay: Deep Blue Immersive */}
        <div className="absolute inset-0 hidden dark:block bg-[#001D4A]/85 dark:bg-[#000F2B]/85 z-20 mix-blend-multiply" />
        <div className="absolute inset-0 hidden dark:block bg-gradient-to-br from-blue-900/40 to-black/40 z-25" />

        {/* Background Video - Visible texture in both modes */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60 dark:opacity-80 grayscale-[10%]"
        >
          <source src="videos/ecosystem-bg.mp4" type="video/mp4" />
        </video>

        {/* Floating Orb preserved but adjusted */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 z-30 mix-blend-screen" />
      </div>

      {/* --- DESKTOP LAYOUT (Original Grid + Sidebar) --- */}
      <div className="max-w-7xl mx-auto relative z-10 hidden md:block">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">

          {/* Sticky Sidebar (Left) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start mb-16 lg:mb-0 pt-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-tertiary dark:text-white font-display">
                {t.services.title}
              </h2>
              <p className="text-xl opacity-80 leading-relaxed mb-8 text-tertiary/80 dark:text-white/90 font-body">
                {t.services.subtitle}
              </p>

              <button
                onClick={() => goToSlide(SlideId.CONTACT, true)}
                className="group flex items-center gap-2 px-8 py-4 rounded-full bg-tertiary text-white dark:bg-white dark:text-blue-900 font-medium text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
              >
                {t.services.cta}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Scrollable Cards (Right) */}
          <div className="lg:col-span-8 flex flex-col gap-6 md:gap-8 pb-32 pt-32">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </div>


      {/* --- MOBILE LAYOUT (Horizontal Scroll + Glow) --- */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-0 pt-20 pb-8 md:hidden">

        <MobileSectionHeader title={t.nav.services} />

        {/* Horizontal Slider */}
        <div className="w-full overflow-x-auto pb-12 px-8 no-scrollbar flex gap-6 snap-x snap-mandatory">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="min-w-[85vw] snap-center relative group"
            >
              {/* Glowing Border Card */}
              <div className="relative h-full p-8 rounded-3xl bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 overflow-hidden transition-all duration-500 group-hover:bg-white/80 dark:group-hover:bg-white/10 group-hover:scale-[1.02] shadow-[0_0_30px_rgba(230,0,126,0.15)] dark:shadow-[0_0_30px_rgba(255,255,255,0.05)]">

                {/* Glow Gradient Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="mb-6 p-4 rounded-2xl bg-secondary/10 w-fit text-secondary group-hover:text-white group-hover:bg-secondary transition-colors duration-300">
                  <service.icon size={32} />
                </div>

                <h3 className="text-2xl font-display font-bold uppercase mb-4 text-tertiary dark:text-white">{service.title}</h3>

                <ul className="space-y-3">
                  {service.features.slice(0, 5).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm font-body text-tertiary/70 dark:text-white/70">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}

          {/* Spacer for horizontal scroll padding */}
          <div className="min-w-[4vw]"></div>
        </div>

        {/* Swipe Hint */}
        <div className="absolute bottom-24 w-full text-center text-xs font-display uppercase tracking-widest opacity-50 pointer-events-none text-tertiary dark:text-white">
          ← Desliza para explorar →
        </div>

      </div>
    </section>
  );
}
