import { words } from '@/data/words';
import { WordApi } from '@/interfaces';

const getDailyWord = (app: string): WordApi => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const dailySeed = day + month + year;
  const dailyWord = words[app][dailySeed % words[app].length];
  return {
    date: date.toISOString().slice(0, 10),
    word: dailyWord,
  };
};

export const getWord = (app: string, random: boolean = false): WordApi => {
  if(!Object.keys(words).includes(app)) return {} as WordApi;
  if (!random) return getDailyWord(app);
  return {
    word: words[app][Math.floor(Math.random() * words[app].length)],
  };
};
