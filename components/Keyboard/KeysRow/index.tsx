import { KeysRowI } from '@/interfaces';
import { Key } from '../Key';
import { Fragment } from 'react';
import { EnterIcon } from '@/icons/EnterIcon';
import { BackspaceIcon } from '@/icons/BackspaceIcon';

export interface KeysRowProps {
  row: KeysRowI;
  onClick: (key: string) => void;
}

export const KeysRow = ({row, onClick}: KeysRowProps) => {
  return (
    <div className="w-full flex justify-center gap-2">
      {Object.values(row).map(k =>
        <Fragment key={k.code}>
          {k.code === 'backspace' &&
            <Key
              k={k}
              large
              onClick={onClick}
            >
              <div className="size-7">
                <BackspaceIcon />
              </div>
            </Key>
          }
          {k.code === 'enter' &&
            <Key
              k={k}
              large
              onClick={onClick}
            >
              <div className="size-7 text-purple-500">
                <EnterIcon />
              </div>
            </Key>
          }
          {k.code !== 'backspace' && k.code !== 'enter' &&
            <Key
              k={k}
              onClick={onClick}
            />
          }
        </Fragment>
      )}
    </div>
  );
};
