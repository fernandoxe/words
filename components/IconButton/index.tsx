import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface IconButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
};

export const IconButton = ({ children, onClick, className = '' }: IconButtonProps) => {
  return (
    <motion.div
      className={`cursor-pointer select-none ${className}`}
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: 0.9,
      }}
      onTap={onClick}
    >
      {children}
    </motion.div>
  );
};
