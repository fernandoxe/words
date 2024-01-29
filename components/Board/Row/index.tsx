import { SquareI } from '@/interfaces';
import { Square } from '../Square';

export interface RowProps {
  row: SquareI[];
  focusedSquare?: number;
  small?: boolean;
}

export const Row = ({row, focusedSquare, small}: RowProps) => {
  return (
    <div
      className={`w-full flex justify-center ${small ? 'gap-1' : 'gap-2'}`}
    >
      {row.map((square, index) => (
        <Square
          key={index}
          square={square}
          focused={focusedSquare === index}
          small={small}
        />
      ))}
    </div>
  );
};
