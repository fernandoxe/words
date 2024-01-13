import { ReactNode } from 'react';

export interface KeyProps {
  k: string;
  status: 'available' | 'used' | 'wrong' | 'primary' | 'secondary';
  large?: boolean;
  children?: ReactNode;
  onClick: (key: string) => void;
}

export const Key = ({k, status, large, children, onClick}: KeyProps) => {
  const bgColor = {
    available: 'bg-black',
    used: 'bg-blue-500',
    wrong: 'bg-red-500',
    primary: 'bg-purple-500',
    secondary: 'bg-gray-500',
  };

  const handleClick = () => {
    onClick(k);
  };

  return (
    <button
      className={`${large ? 'w-16 h-10': 'size-10'} flex items-center justify-center uppercase border-2 border-purple-300 rounded bg-black ${bgColor[status]}`}
      onClick={handleClick}
    >
      {children || k}
    </button>
  );
};
