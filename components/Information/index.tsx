'use client';

import { LinkIcon } from '@/icons/LinkIcon';
import { Modal } from '../Modal';

export interface InformationProps {
  onClose: () => void;
}

export const Information = ({ onClose }: InformationProps) => {
  return (
    <Modal
      title="Swiftdle"
      closeButton={true}
      onClose={onClose}
    >
      <div className="flex flex-col gap-4">
        <p className="text-base">
          Hey guys!
        </p>

        <p className="text-base">
          Swiftdle.com is closing down. But don't worry, you can still play Swiftdle (plus TLOAS) at <a href="https://swifties.games" className="font-semibold text-purple-500 dark:text-purple-400 hover:underline hover:text-purple-600 dark:hover:text-purple-300 inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer">
            swifties.games
            <span className="w-4 h-4"><LinkIcon /></span>
          </a> with more swiftie-themed games.
        </p>

        <p className="text-base">
          You can keep playing here until March 2026.
        </p>

        <p className="text-base">
          Thanks for playing Swiftdle ❤️‍🔥
        </p>
      </div>
    </Modal>
  );
};
