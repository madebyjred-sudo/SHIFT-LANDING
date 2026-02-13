import React, { useEffect } from 'react';
import { SceneProvider } from './contexts/SceneContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { SEO } from './components/SEO';
import { SceneController } from './components/SceneController';
import { Navigation } from './components/Navigation';
import { Cursor } from './components/Cursor';
import { Footer } from './components/Footer';

function App() {
  // Mobile 100vh fix
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <SceneProvider>
          <SEO />
          <main className="relative w-full h-screen overflow-hidden antialiased">
            {/* Custom Cursor only on non-touch devices ideally */}
            <div className="hidden md:block">
              <Cursor />
            </div>

            <Navigation />
            <SceneController />
            <Footer />
          </main>
        </SceneProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;