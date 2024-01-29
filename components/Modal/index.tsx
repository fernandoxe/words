import { ReactNode } from 'react';
import { IconButton } from '../IconButton';
import { CloseIcon } from '@/icons/CloseIcon';
import { closeModal } from '@/services/gtm';

export interface ModalProps {
  children: ReactNode;
  title?: ReactNode;
  closeButton?: boolean;
  onClose: () => void;
};

export const Modal = ({children, title, closeButton, onClose}: ModalProps) => {

  const handleClose = (x: boolean) => {
    onClose();
    
    closeModal(x);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => handleClose(false)}
    >
      <div
        className="flex flex-col gap-2 w-4/5 max-w-md max-h-[80%] bg-slate-100 dark:bg-slate-800 rounded p-4"
        onClick={e => e.stopPropagation()}
      >
        {(title || closeButton) &&
          <div className="flex items-center justify-between">
            {title &&
              <div className="font-semibold text-lg">
                {title}
              </div>
            }
            {closeButton &&
              <IconButton
                onClick={() => handleClose(true)}
              >
                <div className="size-7">
                  <CloseIcon />
                </div>
              </IconButton>
            }
          </div>
        }
        <div className="overflow-scroll">
          {children}
        </div>
      </div>
    </div>
  );
};
