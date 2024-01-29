import { BoardI, KeyStates, KeysI, LocalGame, StatsI, Status, WordApi } from '@/interfaces';
import { getEmptyKeys } from './keys';
import { ROWS } from '@/constants';

export const getEmptyLocalStats = (): StatsI => ({
  bestStreak: 0,
  currentStreak: 0,
  normal: 0,
  random: 0,
  winner: 0,
  total: 0,
  byRow: Array.from({ length: ROWS }, () => 0),
});

export const getStatesFromKeys = (keys: KeysI): KeyStates => {
  const status: {[key: string]: string} = {};
  keys.forEach(row => {
    Object.keys(row).forEach(key => {
      status[key] = row[key].status;
    });
  });
  return status;
};

export const getKeysFromStates = (states: KeyStates): KeysI => {
  const keys = getEmptyKeys();
  keys.forEach(row => {
    Object.keys(row).forEach(key => {
      row[key].status = states[key] as Status;
    });
  });
  return keys;
};

const getLocalGameFromGame = (board: BoardI, keys: KeysI, word: WordApi, winner: boolean): LocalGame => {
  return {
    board,
    keyStates: getStatesFromKeys(keys),
    date: word.date || '',
    winner,
    word: word.word,
  };
};

export const getLocalStats = (): StatsI => {
  const localStats = localStorage.getItem('stats');
  const gameStats = localStats ? JSON.parse(localStats) : getEmptyLocalStats();
  return gameStats;
};

export const getLastGame = (): LocalGame => {
  const lastGame = localStorage.getItem('lastGame');
  const game = lastGame && JSON.parse(lastGame);
  return game;
};

const getClonedStats = (stats: StatsI) => {
  return {
    ...stats,
    byRow: [...stats.byRow],
  };
};

export const saveStats = (stats: StatsI, random: boolean, isWinner: boolean, row: number) => {
  const newStats = getClonedStats(stats);
  newStats.total = newStats.total + 1;
  newStats.normal = !random ? newStats.normal + 1 : newStats.normal;
  newStats.random = random ? newStats.random + 1 : newStats.random;
  newStats.winner = isWinner ? newStats.winner + 1 : newStats.winner;
  newStats.currentStreak = isWinner ? newStats.currentStreak + 1 : 0;
  newStats.bestStreak = Math.max(newStats.bestStreak, newStats.currentStreak);
  newStats.byRow[row] = isWinner ? newStats.byRow[row] + 1 : newStats.byRow[row];

  localStorage.setItem('stats', JSON.stringify(newStats));
  return newStats;
};

export const saveLastGame = (board: BoardI, keys: KeysI, word: WordApi, isWinner: boolean) => {
  const game = getLocalGameFromGame(board, keys, word, isWinner);
  localStorage.setItem('lastGame', JSON.stringify(game));
};
