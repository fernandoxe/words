import { IconButton } from '@/components/IconButton';
import { config } from '@/config';
import { useWordsContext } from '@/contexts';
import { CopyIcon } from '@/icons/CopyIcon';
import { ShareIcon } from '@/icons/ShareIcon';
import { BoardI, StatsI } from '@/interfaces';
import { getEmojisBoard } from '@/services/board';
import { formatDate } from '@/services/date';
import { copy, copyStats, share, shareStats } from '@/services/gtm';
import { captureException } from '@sentry/nextjs';

export interface ShareProps {
  board?: BoardI;
  stats?: StatsI;
}

export const Share = ({board, stats}: ShareProps) => {
  const { app, theme, highContrast, word } = useWordsContext();

  const getEmojisText = (board: BoardI) => {
    const emojisBoard = getEmojisBoard(board, theme, highContrast);
    const emojis = emojisBoard.map(row => row.join('')).join('\n');
    
    let text = `${config[app].appTitle} `;
    text += word.date ? `${formatDate(word.date)}` : '(non-daily word)';
    if(!word.date) {
      text += `\n\n🔤 ${word.word.word}\n`;
      text += `🎶 ${word.word.line}\n`;
      text += `🎼 ${word.word.track}\n`;
      text += `💿 ${word.word.album}`;
    }
    text += `\n\n${emojis}\n\n${config[app].shortUrl}`;
    return text;
  };

  const getStatsText = (stats: StatsI) => {
    let text = '';
    const today = new Date().toISOString().slice(0, 10);
    text += `My ${config[app].appTitle} statistics to ${formatDate(today)}\n\n`;
    text += `Games won: ${stats.winner}\n`;
    text += `Best streak: ${stats.bestStreak}\n`;
    text += `Current streak: ${stats.currentStreak}\n\n`;
    text += `Total games: ${stats.total}\n`;
    text += `Daily word: ${stats.normal}\n`;
    text += `Non-daily word: ${stats.random}\n\n`;
    text += `${config[app].shortUrl}`;
    return text;
  };

  const handleCopy = async () => {
    let text = '';
    if(board) {
      text = getEmojisText(board);

      copy();
    } else if(stats) {
      text = getStatsText(stats);

      copyStats();
    }
    try {
      await navigator.clipboard.writeText(text);
    } catch (error: any) {
      captureException(error);
    }
  };

  const handleShare = async () => {
    let text = '';
    if(board) {
      text = getEmojisText(board);

      share();
    } else if(stats) {
      text = getStatsText(stats);
      
      shareStats();
    }
    try {
      await navigator.share({
        text,
      });
    } catch (error: any) {
      captureException(error);
    }
  };

  return (
    <div className="text-base flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="size-8">
          <IconButton
            onClick={handleCopy}
          >
            <div className="bg-purple-500 text-neutral-200 p-1.5 rounded-full">
              <CopyIcon />
            </div>
          </IconButton>
        </div>
        <div>
          Copy
        </div>
      </div>
      {!!navigator.canShare &&
        <div className="flex items-center gap-2">
          <div className="size-8">
            <IconButton
              onClick={handleShare}
            >
              <div className="bg-purple-500 text-neutral-200 p-1.5 rounded-full">
                <ShareIcon />
              </div>
            </IconButton>
          </div>
          <div>
            Share
          </div>
        </div>
      }
    </div>
  );
};
