import { useWordsContext } from '@/contexts';
import { Modal } from '../Modal';
import { StatsI } from '@/interfaces';
import { Bar } from './Bar';
import { Share } from '../Share';

export interface StatsProps {
  stats: StatsI;
}

export const Stats = ({stats}: StatsProps) => {
  const { setShowStats } = useWordsContext();
  
  return (
    <Modal
      title="Statistics"
      onClose={() => setShowStats(false)}
      closeButton
    >
      {stats &&
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center gap-2 text-center">
            <div className="flex flex-col items-center">
              <div className="text-2xl">
                {stats.winner}
              </div>
              <div>
                games won
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div>
                {stats.bestStreak}
              </div>
              <div className="text-xs">
                best streak
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="">
                {stats.currentStreak}
              </div>
              <div className="text-xs">
                current streak
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center gap-2 text-center">
            <div className="flex flex-col items-center">
              <div className="text-2xl">
                {stats.total}
              </div>
              <div>
                total games
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="">
                {stats.normal}
              </div>
              <div className="text-xs">
                daily word
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="">
                {stats.random}
              </div>
              <div className="text-xs">
                non-daily word
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>
              Games won by row
            </div>
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2/3 flex flex-col gap-2">
                  {stats.byRow.map((row, index) => (
                    <div
                      key={index}
                      className="flex gap-2"
                    >
                      <div>
                        {index + 1}
                      </div>
                      <div className="grow flex gap-2">
                        <Bar
                          value={row}
                          total={stats.total}
                        />
                        <div>
                          {row}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Share
                  stats={stats}
                />
              </div>
            </div>
          </div>
        </div>
      }
    </Modal>
  );
};