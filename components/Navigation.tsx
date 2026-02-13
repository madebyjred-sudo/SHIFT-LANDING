import React, { useState } from 'react';
import { useScene } from '../contexts/SceneContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, Briefcase, Sparkles, Mail, Sun, Moon } from 'lucide-react';
import { SlideId } from '../types';

export const Navigation: React.FC = () => {
    const { currentSlide, goToSlide } = useScene();
    const { theme, toggleTheme } = useTheme();

    // Mobile Nav always visible for app-like experience
    const [isVisible] = useState(true);

    const { t, language, toggleLanguage } = useLanguage();

    const navItems = [
        { id: SlideId.HERO, label: t.nav.home, icon: Home },
        { id: SlideId.MANIFESTO, label: t.nav.philosophy, icon: BookOpen },
        { id: SlideId.WORK, label: t.nav.portfolio, icon: Briefcase },
        { id: SlideId.SERVICES, label: t.nav.services, icon: Sparkles },
        { id: SlideId.CONTACT, label: t.nav.contact, icon: Mail },
    ];

    // Force navigation — always works regardless of scroll lock
    const navigate = (slideId: SlideId) => goToSlide(slideId, true);

    return (
        <>
            {/* --- DESKTOP NAVIGATION --- */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="hidden md:flex fixed top-0 left-0 w-full px-12 py-8 z-50 justify-between items-center pointer-events-none"
            >
                {/* Logo Spacer (GlobalBrandLogo occupies this visually) */}
                <button
                    className="flex items-center cursor-pointer group pointer-events-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-lg overflow-visible opacity-0"
                    onClick={() => navigate(SlideId.HERO)}
                    aria-label="Shift Agency - Home"
                >
                    <div className="h-7 w-[100px]" />
                </button>

                {/* Desktop Navigation — LIQUID GLASS PILL */}
                <div className="flex items-center gap-1 liquid-glass-nav p-1.5 rounded-full pointer-events-auto">
                    {navItems.map(({ label, id }) => (
                        <button
                            key={label}
                            onClick={() => navigate(id)}
                            aria-current={currentSlide === id ? 'page' : undefined}
                            className={`relative px-6 py-2.5 rounded-full transition-all duration-300 font-display text-xs font-medium tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${currentSlide === id
                                ? 'text-white'
                                : 'text-tertiary dark:text-white/70 hover:text-secondary dark:hover:text-secondary'
                                }`}
                        >
                            {currentSlide === id && (
                                <motion.div
                                    layoutId="navPill"
                                    className="absolute inset-0 bg-secondary/90 dark:bg-secondary/90 backdrop-blur-sm rounded-full shadow-sm -z-10"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            {label}
                        </button>
                    ))}

                    <div className="w-[1px] h-5 bg-tertiary/10 dark:bg-white/10 mx-2" role="presentation"></div>

                    {/* Language Switcher Desktop */}
                    <button
                        onClick={toggleLanguage}
                        className="px-3 py-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-xs font-mono font-bold text-tertiary dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary uppercase"
                        aria-label="Switch Language"
                    >
                        {language === 'es' ? 'EN' : 'ES'}
                    </button>

                    {/* Theme Toggle Desktop */}
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-tertiary dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                        aria-label={theme === 'light' ? 'Activate dark mode' : 'Activate light mode'}
                    >
                        <motion.div
                            initial={false}
                            animate={{ rotate: theme === 'light' ? 0 : 180 }}
                            transition={{ duration: 0.5, ease: "backOut" }}
                        >
                            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                        </motion.div>
                    </button>
                </div>
            </motion.nav>

            {/* --- MOBILE NAVIGATION: LIQUID ISLAND --- */}
            <div className="md:hidden fixed z-50 left-0 w-full flex justify-center pointer-events-none" style={{ bottom: 'max(3rem, calc(env(safe-area-inset-bottom, 0px) + 0.75rem))' }}>
                <AnimatePresence>
                    {isVisible && (
                        <motion.div
                            initial={{ y: 100, opacity: 0, scale: 0.9 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 100, opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                            className="pointer-events-auto liquid-glass-island rounded-full px-5 py-3.5 flex items-center gap-5"
                        >
                            {navItems.map(item => (
                                <NavIcon
                                    key={item.id}
                                    icon={<item.icon size={20} />}
                                    label={item.label}
                                    isActive={currentSlide === item.id}
                                    onClick={() => navigate(item.id)}
                                />
                            ))}

                            <div className="w-[1px] h-6 bg-black/10 dark:bg-white/10"></div>

                            <button
                                onClick={toggleLanguage}
                                className="px-2 py-1 rounded-full text-xs font-mono font-bold text-tertiary/60 dark:text-white/60 active:scale-90 transition-transform hover:text-tertiary dark:hover:text-white uppercase"
                            >
                                {language === 'es' ? 'EN' : 'ES'}
                            </button>

                            <button
                                onClick={toggleTheme}
                                className="p-1.5 rounded-full text-tertiary/60 dark:text-white/60 active:scale-90 transition-transform hover:text-tertiary dark:hover:text-white"
                                aria-label={theme === 'light' ? 'Dark mode' : 'Light mode'}
                            >
                                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

const NavIcon = ({ icon, label, isActive, onClick }: { icon: any, label: string, isActive: boolean, onClick: () => void }) => {
    return (
        <button
            onClick={onClick}
            className={`relative flex flex-col items-center justify-center gap-0.5 transition-all duration-300 ${isActive ? 'text-secondary scale-110' : 'text-tertiary/50 dark:text-white/50 hover:text-tertiary dark:hover:text-white'}`}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
        >
            <div className="relative z-10 p-0.5">
                {icon}
            </div>
            {isActive && (
                <motion.div
                    layoutId="activeDot"
                    className="absolute -bottom-1 w-1 h-1 bg-secondary rounded-full"
                />
            )}
        </button>
    );
};