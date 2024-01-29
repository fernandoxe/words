import { Fragment, useEffect } from 'react';
import { KeysI } from '@/interfaces';
import { KeysRow } from './KeysRow';

export interface KeyboardProps {
  rows: KeysI;
  onKey: (key: string) => void;
}

export const Keyboard = ({rows, onKey}: KeyboardProps) => {
  const handleKeyClick = (k: string) => {
    onKey(k);
  };

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if(/^[a-z]$/.test(key) || key === 'enter' || key === 'backspace') onKey(key);
    };
    window.addEventListener('keyup', handleKeyboard);
    return () => {
      window.removeEventListener('keyup', handleKeyboard);
    };
  }, [onKey]);

  return (
    <div className="w-full flex flex-col items-center gap-2 select-none">
      {rows.map((row, index) =>
        <KeysRow
          key={index}
          row={row}
          onClick={handleKeyClick}
        />
      )}
    </div>
  );
};
