import { SuccessIcon } from '@/icons/SuccessIcon';
import { Modal } from '../Modal';
import { TrackIcon } from '@/icons/TrackIcon';
import { AlbumIcon } from '@/icons/AlbumIcon';
import { useWordsContext } from '@/contexts';
import { Board } from '../Board';
import { IconButton } from '../IconButton';
import { RepeatIcon } from '@/icons/RepeatIcon';
import { BoardI, WordApi } from '@/interfaces';
import { formatDate } from '@/services/date';
import { WrongIcon } from '@/icons/WrongIcon';
import { Share } from '../Share';
import { removeEmptyRows } from '@/services/board';
import { config } from '@/config';
import { playAgain } from '@/services/gtm';
import { LinkIcon } from '@/icons/LinkIcon';

export interface ResultsProps {
  winner: boolean;
  word: WordApi;
  board: BoardI;
  row: number;
  column: number;
  onPlayAgain: () => void;
}

export const Results = ({ winner, word, board, row, column, onPlayAgain }: ResultsProps) => {
  const { app, setShowResults } = useWordsContext();

  const highlightWord = (word: string, text: string) => {
    const regexp = new RegExp(`\\b${word}\\b`, 'gi');
    return text.replace(regexp, x => `<span class="text-purple-500">${x}</span>`);
  };

  const handlePlayAgain = () => {
    setShowResults(false);
    onPlayAgain();

    playAgain(winner);
  };

  return (
    <Modal
      onClose={() => setShowResults(false)}
      title={`${config[app].appTitle} ${word.date ? formatDate(word.date) : '(non-daily word)'}`}
      closeButton
    >
      <div className="flex flex-col items-center gap-2">
        {winner &&
          <div className="w-12 h-12 text-green-700">
            <SuccessIcon />
          </div>
        }
        {!winner &&
          <div className="w-12 h-12 text-red-600">
            <WrongIcon />
          </div>
        }
        <div className="text-3xl text-purple-500 leading-none">
          {word.word.word.toLowerCase()}
        </div>
        <div
          className="italic text-center leading-tight my-1"
          dangerouslySetInnerHTML={{ __html: highlightWord(word.word.word, word.word.line) }}
        >
        </div>
        <div className="flex items-center gap-2">
          <div className="size-6 shrink-0">
            <TrackIcon />
          </div>
          <div className="leading-tight">
            {word.word.track}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-6 shrink-0">
            <AlbumIcon />
          </div>
          <div className="leading-tight">
            {word.word.album}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <Board
              board={removeEmptyRows(board)}
              focusedRow={row}
              focusedColumn={column}
              small
            />
          </div>
          <Share
            board={board}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="size-8">
            <IconButton
              onClick={handlePlayAgain}
            >
              <div className="bg-purple-500 text-neutral-200 p-1.5 rounded-full">
                <RepeatIcon />
              </div>
            </IconButton>
          </div>
          <div className="leading-tight">
            <div>
              Play again
            </div>
            <div className="text-xs">
              (non-daily word)
            </div>
          </div>
        </div>
        <div className="mt-2">
          Play more at <a href="https://swifties.games" className="font-semibold text-purple-500 dark:text-purple-400 hover:underline hover:text-purple-600 dark:hover:text-purple-300 inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer">
            swifties.games
            <span className="w-4 h-4"><LinkIcon /></span>
          </a>
        </div>
        {/* <div className="mt-2">
          <a
            href={config[app].linkUrl}
            >
              <div className="flex items-center gap-1">
                <div className="text-purple-500 underline">
                  Play {config[app].linkText}
                </div>
                <div className="h-4">
                  <img
                    className="size-full"
                    src={`${config[app].publicPath}/referred.svg`}
                    alt={config[app].linkText}
                  />
                </div>
              </div>
            </a>
        </div> */}
      </div>
    </Modal>
  );
};
