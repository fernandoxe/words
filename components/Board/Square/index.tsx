import { useWordsContext } from "@/contexts";
import { SquareI } from "@/interfaces";

export interface SquareProps {
  square: SquareI;
  focused?: boolean;
  small?: boolean;
};

export const Square = ({square, focused, small}: SquareProps) => {
  const { highContrast } = useWordsContext();

  const colors = {
    '-1': 'bg-slate-300 border-slate-300 dark:bg-slate-700 dark:border-slate-700',
    '0': `bg-transparent ${focused ? 'border-purple-500' : 'border-slate-300 dark:border-slate-700'}`,
    '1': `${highContrast ? 'bg-orange-400 border-orange-400 dark:bg-orange-500 dark:border-orange-500' : 'bg-yellow-500 border-yellow-500'} text-neutral-800`,
    '2': `${highContrast ? 'bg-blue-600 border-blue-600 dark:bg-blue-700 dark:border-blue-700' : 'bg-green-700 border-green-700'} text-neutral-200`,
  };

  return (
    <div
      className={`
        ${small ? 'size-4': 'size-12'}
        flex items-center justify-center uppercase border-2 select-none
        ${colors[square.guessed]}
      `}
    >
      {small ? '' : square.char}
    </div>
  );
};
