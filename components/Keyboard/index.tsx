'use client';

import { KeysRow } from './KeysRow';

const FIRST_ROW = [
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
];

const SECOND_ROW = [
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
];

const THIRD_ROW = [
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm',
];

export const rows = [
  FIRST_ROW,
  SECOND_ROW,
  THIRD_ROW,
];

export const Keyboard = () => {
  const handleKeyClick = (k: string) => {
    console.log('key', k);
  };

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      {rows.map((row, index) =>
        <KeysRow
          key={index}
          row={row}
          controls={index === 2}
          onClick={handleKeyClick}
        />
      )}
    </div>
  );
};
