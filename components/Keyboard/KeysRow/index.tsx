import { Key } from '../Key';

export interface KeysRowProps {
  row: string[];
  controls: boolean;
  onClick: (key: string) => void;
}

export const KeysRow = ({row, controls, onClick}: KeysRowProps) => {
  return (
    <div className="flex gap-2">
      {controls &&
        <Key
          k="←"
          large={true}
          status="secondary"
          onClick={onClick}
        />
      }
      {row.map((letter, index) =>
        <Key
          key={index}
          k={letter}
          status="available"
          onClick={onClick}
        />
      )}
      {controls &&
        <Key
          k="→"
          status="primary"
          large={true}
          onClick={onClick}
        />
      }
    </div>
  );
};
