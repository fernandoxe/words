import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface SwitchProps {
  checked: boolean;
  onClick: () => void;
  children: ReactNode;
};

export const Switch = ({checked, onClick, children}: SwitchProps) => {
  return (
    <div
      className="flex items-center justify-start gap-2"
      >
      <motion.div
        className={`
        w-10 h-6
        flex items-center justify-start
        rounded-full border-2
        ${checked ? 'border-green-700 bg-green-700' : 'border-neutral-300'}
        data-[checked=true]:justify-end
        `}
        data-checked={checked}
        animate={{
          background: checked ? 'rgba(21 128 61)' : 'rgba(212 212 212 / 0)',
          borderColor: checked ? 'rgb(21 128 61)' : 'rgb(212 212 212)',
        }}
        transition={{duration: 0.2}}
        onClick={onClick}
      >
        <motion.div
          layout
          className={`
            size-5 rounded-full bg-purple-700
          `}
          initial={{scale: `${checked ? 1 : 0.6}`}}
          animate={{
            scale: checked ? 1 : 0.6,
          }}
          transition={{duration: 0.2}}
        >
        </motion.div>
      </motion.div>
      <label>
        {children}
      </label>
    </div>
  );
};
