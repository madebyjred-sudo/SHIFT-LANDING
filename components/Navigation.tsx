import React, { useState, useEffect } from 'react';
import { useScene } from '../contexts/SceneContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Home, Briefcase, Mail, Sparkles, Users } from 'lucide-react';

export const Navigation: React.FC = () => {
    const { currentSlide, goToSlide, direction } = useScene();
    const { theme, toggleTheme } = useTheme();

    // Mobile Nav Visibility Logic - ALWAYS VISIBLE for App-like experience
    const [isVisible, setIsVisible] = useState(true);

    // Removed "Hide on Scroll" logic to ensure the Island is always available for navigation.
    // UseEffect disabled/removed.

    const navItems = ['Inicio', 'Filosofía', 'Portafolio', 'Servicios', 'Contacto'];

    return (
        <>
            {/* --- DESKTOP NAVIGATION --- */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Apple easing
                className="hidden md:flex fixed top-0 left-0 w-full px-12 py-8 z-50 justify-between items-center pointer-events-none"
            >
                {/* Logo Area - aligned with Menu Bar */}
                {/* Logo Area - Spacer (GlobalBrandLogo occupies this visually) */}
                <button
                    className="flex items-center cursor-pointer group pointer-events-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-lg overflow-visible opacity-0"
                    onClick={() => goToSlide(0)}
                    aria-label="Shift Agency - Inicio"
                >
                    <div className="h-7 w-[100px]" /> {/* Spacer to keep layout */}
                </button>

                {/* Desktop Navigation - LIQUID GLASS PILL */}
                <div className="flex items-center gap-1 liquid-glass p-1.5 rounded-full shadow-glass pointer-events-auto">
                    {navItems.map((item, idx) => (
                        <button
                            key={item}
                            onClick={() => goToSlide(idx)}
                            className={`relative px-6 py-2.5 rounded-full transition-all duration-300 font-display text-xs font-medium tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${currentSlide === idx
                                ? 'text-white'
                                : 'text-tertiary dark:text-white/70 hover:text-secondary dark:hover:text-secondary'
                                }`}
                        >
                            {currentSlide === idx && (
                                <motion.div
                                    layoutId="navPill"
                                    className="absolute inset-0 bg-secondary/90 dark:bg-secondary/90 backdrop-blur-sm rounded-full shadow-sm -z-10"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            {item}
                        </button>
                    ))}

                    <div className="w-[1px] h-5 bg-tertiary/10 dark:bg-white/10 mx-2" role="presentation"></div>

                    {/* Theme Toggle Desktop */}
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-tertiary dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
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
            <div className="md:hidden fixed z-50 bottom-12 left-0 w-full flex justify-center pointer-events-none">
                <AnimatePresence>
                    {isVisible && (
                        <motion.div
                            initial={{ y: 100, opacity: 0, scale: 0.9 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 100, opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 200, damping: 25 }}
                            className="pointer-events-auto bg-white/90 dark:bg-[#1a1a1a]/90 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-full px-6 py-4 flex items-center gap-7 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                        >
                            <NavIcon
                                icon={<Home size={22} />}
                                label="Inicio"
                                isActive={currentSlide === 0}
                                onClick={() => goToSlide(0)}
                            />
                            <NavIcon
                                icon={<Briefcase size={22} />}
                                label="Portafolio"
                                isActive={currentSlide === 2}
                                onClick={() => goToSlide(2)}
                            />
                            <NavIcon
                                icon={<Sparkles size={22} />}
                                label="Servicios"
                                isActive={currentSlide === 3}
                                onClick={() => goToSlide(3)}
                            />
                            <NavIcon
                                icon={<Mail size={22} />}
                                label="Contacto"
                                isActive={currentSlide === 4}
                                onClick={() => goToSlide(4)}
                            />

                            <div className="w-[1px] h-6 bg-black/10 dark:bg-white/10"></div>

                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-full text-tertiary/60 dark:text-white/60 active:scale-90 transition-transform hover:text-tertiary dark:hover:text-white"
                            >
                                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div >

            {/* Mobile Top Logo REMOVED - Replaced by MobileSectionHeader per user request */}
        </>
    );
};

const NavIcon = ({ icon, label, isActive, onClick }: { icon: any, label: string, isActive: boolean, onClick: () => void }) => {
    return (
        <button
            onClick={onClick}
            className={`relative flex flex-col items-center justify-center gap-1 transition-all duration-300 ${isActive ? 'text-secondary scale-110' : 'text-tertiary/50 dark:text-white/50 hover:text-tertiary dark:hover:text-white'}`}
            aria-label={label}
        >
            <div className="relative z-10 p-1">
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