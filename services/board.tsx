import { BoardI, RowI } from '@/interfaces';

export const getEmptyRow = (word: string): RowI => {
  return Array.from({ length: word.length }, () => ({
    char: '',
    guessed: '0',
  }));
};

export const getEmptyBoard = (word: string, rows: number): BoardI => {
  return Array.from({ length: rows }, () => getEmptyRow(word));
};

export const getClonedBoard = (board: BoardI): BoardI => {
  const newBoard = board.map((row) => row.map((square) => ({...square})));
  return newBoard;
};

export const addLetter = (board: BoardI, letter: string, row: number, column: number): BoardI => {
  const clonedBoard = getClonedBoard(board);
  clonedBoard[row][column].char = letter;
  return clonedBoard;
};

export const removeLetter = (board: BoardI, row: number, column: number): BoardI => {
  const clonedBoard = getClonedBoard(board);
  clonedBoard[row][column].char = '';
  return clonedBoard;
};

export const removeEmptyRows = (board: BoardI) => {
  const newBoard = board.filter(row => row.some(square => square.char));
  return newBoard;
};

export const getEmojisBoard = (board: BoardI, theme: string, highContrast: boolean) => {
  const baseEmojis = {
    '-1': theme === 'dark' ? '⬛️' : '⬜️',
    '0': highContrast ? '🟥' : '🔴',
    '1': highContrast ? '🟧' : '🟨',
    '2': highContrast ? '🟦' : '🟩',
  };

  const newBoard = removeEmptyRows(board);

  const emojis = newBoard.map(row => row.map(square => baseEmojis[square.guessed]));

  return emojis;
};
