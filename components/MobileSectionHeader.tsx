import React from 'react';
import { motion } from 'framer-motion';

interface MobileSectionHeaderProps {
    title: string;
    subtitle?: string;
    className?: string; // Allow custom classes if needed
}

export const MobileSectionHeader: React.FC<MobileSectionHeaderProps> = ({ title, subtitle, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`md:hidden fixed left-6 z-40 pointer-events-none ${className}`}
            style={{ top: 'max(1.5rem, env(safe-area-inset-top, 1.5rem))' }}
        >
            <div className="flex flex-col items-start">
                <h2 className="text-secondary font-display font-bold text-lg tracking-widest uppercase">
                    {title}
                </h2>
                {subtitle && (
                    <span className="text-tertiary/60 dark:text-white/60 text-[10px] font-body tracking-wider uppercase mt-1">
                        {subtitle}
                    </span>
                )}
            </div>
        </motion.div>
    );
};
