import { BoardI } from '@/interfaces';
import { Row } from './Row';

export interface BoardProps {
  board: BoardI;
  focusedRow: number;
  focusedColumn: number;
  small?: boolean;
}

export const Board = ({board, focusedRow, focusedColumn, small}: BoardProps) => {
  return (
    <div className={`w-full flex flex-col ${small ? 'gap-1' : 'gap-2'}`}>
      {board.map((row, index) =>
        <Row
          key={index}
          row={row}
          focusedSquare={focusedRow === index ? focusedColumn : undefined}
          small={small}
        />
      )}
    </div>
  );
};
