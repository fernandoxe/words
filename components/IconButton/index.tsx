import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface IconButtonProps {
  children: ReactNode;
  onClick: () => void;
};

export const IconButton = ({children, onClick}: IconButtonProps) => {
  return (
    <motion.div
      className="cursor-pointer select-none"
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
