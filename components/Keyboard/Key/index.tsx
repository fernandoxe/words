import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { KeyI } from '@/interfaces';
import { useWordsContext } from '@/contexts';

export interface KeyProps {
  k: KeyI;
  large?: boolean;
  children?: ReactNode;
  onClick: (key: string) => void;
}

export const Key = ({k, large, children, onClick}: KeyProps) => {
  const { highContrast } = useWordsContext();

  const colors = {
    '-1': 'bg-slate-300 border-slate-300 dark:bg-slate-700 dark:border-slate-700',
    '0': 'bg-transparent border-slate-300 dark:border-slate-700',
    '1': `${highContrast ? 'bg-orange-400 border-orange-400 dark:bg-orange-500 dark:border-orange-500' : 'bg-yellow-500 border-yellow-500'} text-neutral-800`,
    '2': `${highContrast ? 'bg-blue-600 border-blue-600 dark:bg-blue-700 dark:border-blue-700' : 'bg-green-700 border-green-700'} text-neutral-200`,
  };

  const handleClick = () => {
    onClick(k.code);
  };

  return (
    <motion.button
      className={`
        ${large ? 'w-16 h-10': 'size-10'}
        flex items-center justify-center uppercase border-2 rounded
        shadow-md dark:shadow-none
        ${colors[k.status]}
      `}
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 0.9,
      }}
      onTap={handleClick}
      disabled={k.disabled}
      aria-label={k.code}
    >
      {children || k.code}
    </motion.button>
  );
};
