'use client';

import { Header } from '../Header';
import { Game } from '../Game';
import { Information } from '../Information';
import { useEffect, useState } from 'react';
import { useWordsContext } from '@/contexts';
import { initTheme, closeInformation } from '@/services/gtm';

export const Home = () => {
  const { setTheme, setHighContrast } = useWordsContext();
  const [mounted, setMounted] = useState(false);
  const [showInformation, setShowInformation] = useState(false);

  useEffect(() => {
    const infoSeen = localStorage.getItem('swiftdle-info');
    if (!infoSeen) {
      setShowInformation(true);
    }

    const theme = localStorage.getItem('theme');
    let newTheme;
    if (theme === 'dark' || theme === 'light') {
      newTheme = theme;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      newTheme = 'dark';
    } else {
      newTheme = 'light';
    }
    localStorage.setItem('theme', newTheme);
    document.documentElement.className = newTheme;

    const highContrast = localStorage.getItem('highContrast');
    let newHighContrast;
    if (highContrast === '1' || highContrast === '0') {
      newHighContrast = highContrast;
    } else {
      newHighContrast = '0';
    }
    localStorage.setItem('highContrast', newHighContrast);

    setTheme(newTheme);
    setHighContrast(newHighContrast === '1' ? true : false);
    setMounted(true);
    initTheme(newTheme, newHighContrast === '1' ? true : false);
  }, [setHighContrast, setTheme]);

  const handleCloseInformation = () => {
    closeInformation();
    localStorage.setItem('swiftdle-info', 'true');
    setShowInformation(false);
  };

  const handleOpenInformation = () => {
    setShowInformation(true);
  };

  return (
    <>
      {mounted &&
        <main className="max-w-xl mx-auto my-0">
          <div className="flex flex-col items-center gap-8">
            <Header onOpenInformation={handleOpenInformation} />
            <Game />
          </div>
        </main>
      }
      {showInformation && (
        <Information onClose={handleCloseInformation} />
      )}
    </>
  );
};
