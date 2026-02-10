import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface GlobalBrandLogoProps {
    currentSlide: number;
}

export const GlobalBrandLogo: React.FC<GlobalBrandLogoProps> = ({ currentSlide }) => {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // IF currentSlide === 0 (Hero):
    //   Desktop: Centered in Left Column (25% left, 50% top)
    //   Mobile:  Centered Top (50% left, 12% top)
    // IF currentSlide > 0 (Scrolled):
    //   Desktop: Top Left Navigation (1.5rem, 1.5rem)
    //   Mobile:  Logo handled by Navigation.tsx (we fade this one out)

    const isHero = currentSlide === 0;

    // Define target properties based on state
    const targetProps = isHero
        ? (isMobile
            ? { top: '12%', left: '50%', x: '-50%', y: '-50%', width: '35vw', maxWidth: '160px', height: 'auto', opacity: 1 } // Mobile Hero
            : { top: '50%', left: '25%', x: '-50%', y: '-50%', width: '18vw', maxWidth: 'none', height: 'auto', opacity: 1 }  // Desktop Hero
        )
        : (isMobile
            ? { top: '1.5rem', left: '1.5rem', x: '0%', y: '0%', width: '100px', height: 'auto', opacity: 0 } // Mobile Scrolled: HIDDEN (replaced by Section Titles)
            : { top: '1.5rem', left: '1.5rem', x: '0%', y: '0%', width: 'auto', height: '1.5rem', opacity: 1 } // Desktop Scrolled (Top Left)
        );

    return (
        <motion.div
            layout
            className="fixed z-[60] pointer-events-none"
            initial={false}
            animate={targetProps}
            transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
            }}
        >
            {/* The Logo Image */}
            <motion.div
                className="w-full h-full relative aspect-[340/115]"
                layout
            >
                <div
                    className="w-full h-full bg-primary dark:bg-white transition-colors duration-500 block"
                    style={{
                        maskImage: 'url("logo-FULL.svg")',
                        maskRepeat: 'no-repeat',
                        maskSize: 'contain',
                        maskPosition: isHero ? 'center' : 'left center',
                        WebkitMaskImage: 'url("logo-FULL.svg")',
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskSize: 'contain',
                        WebkitMaskPosition: isHero ? 'center' : 'left center'
                    }}
                />
            </motion.div>
        </motion.div>
    );
};
