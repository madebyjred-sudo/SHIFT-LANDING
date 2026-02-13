import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="hidden md:block fixed bottom-0 left-0 w-full z-[100] border-t border-tertiary/10 dark:border-white/10 bg-white/90 dark:bg-[#050505]/80 backdrop-blur-md transition-colors duration-500 shadow-sm md:shadow-none">
      <div className="w-full max-w-[1800px] mx-auto px-6 py-3 md:py-4 flex flex-row justify-between items-center">

        {/* Left: Copyright */}
        <div className="flex items-center gap-2 opacity-80 md:opacity-60 hover:opacity-100 transition-opacity cursor-default">
          <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-primary"></span>
          <p className="text-[10px] font-mono text-tertiary dark:text-white uppercase tracking-widest font-medium">
            © 2025 Shift Porter Novelli
          </p>
        </div>

        {/* Right: Links */}
        <div className="flex items-center gap-4 md:gap-8 pointer-events-auto">
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-[10px] font-display font-bold uppercase tracking-widest text-tertiary/80 dark:text-white/70 hover:text-primary dark:hover:text-secondary transition-colors">
              Legal
            </a>
            <a href="#" className="text-[10px] font-display font-bold uppercase tracking-widest text-tertiary/80 dark:text-white/70 hover:text-primary dark:hover:text-secondary transition-colors">
              Privacy
            </a>
          </nav>

          <div className="hidden md:block w-[1px] h-3 bg-tertiary/20 dark:bg-white/10"></div>

          <a href="mailto:connect@shiftpn.com" className="flex items-center gap-2 text-[10px] font-display font-bold uppercase tracking-widest text-tertiary dark:text-white hover:text-primary dark:hover:text-secondary transition-colors group">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 group-hover:animate-pulse"></span>
            connect@shiftpn.com
          </a>
        </div>
      </div>
    </footer>
  );
};