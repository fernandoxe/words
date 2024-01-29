
// -1: wrong, 0: default, 1: almost, 2: correct
export type Status = '-1' | '0' | '1' | '2';

export interface SquareI {
  char: string;
  guessed: Status;
}

export type RowI = SquareI[];

export type BoardI = RowI[];

export interface KeyI {
  code: string;
  row: number;
  status: Status;
  large?: boolean;
  disabled?: boolean;
}

export type KeysRowI = {[key: string]: KeyI};

export type KeysI = KeysRowI[];

export interface Word {
  word: string;
  line: string;
  track: string;
  album: string;
}

export interface WordApi {
  date?: string;
  word: Word;
}

export type KeyStates = {[key: string]: string};

export interface LocalGame {
  board: BoardI;
  keyStates: KeyStates;
  date: string;
  winner: boolean;
  word: Word;
}

export interface StatsI {
  bestStreak: number;
  currentStreak: number;
  normal: number;
  random: number;
  winner: number;
  total: number;
  byRow: number[];
}
