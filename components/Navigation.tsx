import React, { useState } from 'react';
import { useScene } from '../contexts/SceneContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Home, Briefcase, Mail, Sparkles, Users, BookOpen } from 'lucide-react';

export const Navigation: React.FC = () => {
    const { currentSlide, goToSlide } = useScene();
    const { theme, toggleTheme } = useTheme();

    // Mobile Nav always visible for app-like experience
    const [isVisible] = useState(true);

    const navItems = [
        { label: 'Inicio', index: 0 },
        { label: 'Filosofía', index: 1 },
        { label: 'Portafolio', index: 2 },
        { label: 'Servicios', index: 3 },
        { label: 'Contacto', index: 4 },
    ];

    // Force navigation — always works regardless of scroll lock
    const navigate = (index: number) => goToSlide(index, true);

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
                    onClick={() => navigate(0)}
                    aria-label="Shift Agency - Inicio"
                >
                    <div className="h-7 w-[100px]" />
                </button>

                {/* Desktop Navigation — LIQUID GLASS PILL */}
                <div className="flex items-center gap-1 liquid-glass-nav p-1.5 rounded-full pointer-events-auto">
                    {navItems.map(({ label, index }) => (
                        <button
                            key={label}
                            onClick={() => navigate(index)}
                            aria-current={currentSlide === index ? 'page' : undefined}
                            className={`relative px-6 py-2.5 rounded-full transition-all duration-300 font-display text-xs font-medium tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${currentSlide === index
                                ? 'text-white'
                                : 'text-tertiary dark:text-white/70 hover:text-secondary dark:hover:text-secondary'
                                }`}
                        >
                            {currentSlide === index && (
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

                    {/* Theme Toggle Desktop */}
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-tertiary dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                        aria-label={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
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
                            className="pointer-events-auto liquid-glass-island rounded-full px-5 py-3.5 flex items-center gap-5"
                        >
                            <NavIcon
                                icon={<Home size={20} />}
                                label="Inicio"
                                isActive={currentSlide === 0}
                                onClick={() => navigate(0)}
                            />
                            <NavIcon
                                icon={<BookOpen size={20} />}
                                label="Filosofía"
                                isActive={currentSlide === 1}
                                onClick={() => navigate(1)}
                            />
                            <NavIcon
                                icon={<Briefcase size={20} />}
                                label="Portafolio"
                                isActive={currentSlide === 2}
                                onClick={() => navigate(2)}
                            />
                            <NavIcon
                                icon={<Sparkles size={20} />}
                                label="Servicios"
                                isActive={currentSlide === 3}
                                onClick={() => navigate(3)}
                            />
                            <NavIcon
                                icon={<Mail size={20} />}
                                label="Contacto"
                                isActive={currentSlide === 4}
                                onClick={() => navigate(4)}
                            />

                            <div className="w-[1px] h-6 bg-black/10 dark:bg-white/10"></div>

                            <button
                                onClick={toggleTheme}
                                className="p-1.5 rounded-full text-tertiary/60 dark:text-white/60 active:scale-90 transition-transform hover:text-tertiary dark:hover:text-white"
                                aria-label={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
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