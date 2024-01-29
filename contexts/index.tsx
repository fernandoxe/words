'use client';

import { WordApi } from '@/interfaces';
import { createContext, useState, Dispatch, useContext, ReactNode } from 'react';

export interface WordsContextI {
  showResults: boolean;
  setShowResults: Dispatch<boolean>;
  canShowResults: boolean;
  setCanShowResults: Dispatch<boolean>;
  showStats: boolean;
  setShowStats: Dispatch<boolean>;
  showHelp: boolean;
  setShowHelp: Dispatch<boolean>;
  showSettings: boolean;
  setShowSettings: Dispatch<boolean>;
  theme: string;
  setTheme: Dispatch<string>;
  highContrast: boolean;
  setHighContrast: Dispatch<boolean>;
  word: WordApi;
  setWord: Dispatch<WordApi>;
  app: string;
  setApp: Dispatch<string>;
}

// initial state
const initialState: WordsContextI = {
  showResults: false,
  setShowResults: () => {},
  canShowResults: false,
  setCanShowResults: () => {},
  showStats: false,
  setShowStats: () => {},
  showHelp: false,
  setShowHelp: () => {},
  showSettings: false,
  setShowSettings: () => {},
  theme: 'dark',
  setTheme: () => {},
  highContrast: false,
  setHighContrast: () => {},
  word: {} as WordApi,
  setWord: () => {},
  app: '',
  setApp: () => {},
};

// create context
const WordsContext = createContext(initialState);

// create provider
export interface WordsProviderProps {
  children: ReactNode;
  word: WordApi;
  app: string;
}

export const WordsProvider = ({ children, word, app }: WordsProviderProps) => {
  const [showResults, setShowResults] = useState(false);
  const [canShowResults, setCanShowResults] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [highContrast, setHighContrast] = useState(false);
  const [w, setW] = useState(word);
  const [a, setA] = useState(app);

  return (
    <WordsContext.Provider
      value={{
        showResults,
        setShowResults,
        canShowResults,
        setCanShowResults,
        showStats,
        setShowStats,
        showHelp,
        setShowHelp,
        showSettings,
        setShowSettings,
        theme,
        setTheme,
        highContrast,
        setHighContrast,
        word: w,
        setWord: setW,
        app: a,
        setApp: setA,
      }}
    >
      {children}
    </WordsContext.Provider>
  );
};

export const useWordsContext = () => useContext(WordsContext);
