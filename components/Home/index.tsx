'use client';

import { Header } from '../Header';
import { Game } from '../Game';
import { useEffect, useState } from 'react';
import { useWordsContext } from '@/contexts';
import { initTheme } from '@/services/gtm';

export const Home = () => {
  const { setTheme, setHighContrast } = useWordsContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    let newTheme;
    if(theme === 'dark' || theme === 'light') {
      newTheme = theme;
    } else if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
      newTheme = 'dark';
    } else {
      newTheme = 'light';
    }
    localStorage.setItem('theme', newTheme);
    document.documentElement.className = newTheme;

    const highContrast = localStorage.getItem('highContrast');
    let newHighContrast;
    if(highContrast === '1' || highContrast === '0') {
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

  return (
    <>
      { mounted &&
        <main className="max-w-xl mx-auto my-0">
          <div className="flex flex-col items-center gap-8">
            <Header />
            <Game />
          </div>
        </main>
      }
    </>
  );
};
