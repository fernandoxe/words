import { HelpIcon } from '@/icons/HelpIcon';
import { ResultsIcon } from '@/icons/ResultsIcon';
import { SettingsIcon } from '@/icons/SettingsIcon';
import { StatsIcon } from '@/icons/StatsIcon';
import { IconButton } from '../IconButton';
import { useWordsContext } from '@/contexts';
import { Help } from '../Help';
import { Settings } from '../Settings';
import { config } from '@/config';
import { clickHelp, clickResults, clickSettings, clickStats } from '@/services/gtm';

export const Header = () => {
  const {
    app,
    canShowResults,
    setShowResults,
    showHelp,
    setShowHelp,
    showSettings,
    setShowSettings,
    setShowStats,
  } = useWordsContext();

  const handleResultsClick = () => {
    setShowResults(true);
    clickResults();
  };

  const handleStatsClick = () => {
    setShowStats(true);
    clickStats();
  };

  const handleHelpClick = () => {
    setShowHelp(true);
    clickHelp();
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
    clickSettings();
  };

  return (
    <div className="w-full flex items-center justify-between gap-2">
      <div className="flex flex-col items-center select-none">
        <h1 className="text-[1.75rem] font-semibold leading-none">
          {config[app].appTitle}
        </h1>
        <div className="text-xs">
          {config[app].appSubtitle}
        </div>
      </div>
      <div className="flex gap-2">
        { canShowResults &&
          <div className="size-7">
            <IconButton
              onClick={handleResultsClick}
            >
              <ResultsIcon />
            </IconButton>
          </div>
        }
        <div className="size-7">
          <IconButton
            onClick={handleStatsClick}
          >
            <StatsIcon />
          </IconButton>
        </div>
        <div className="size-7">
          <IconButton
            onClick={handleHelpClick}
          >
            <HelpIcon />
          </IconButton>
        </div>
        <div className="size-7">
          <IconButton
              onClick={handleSettingsClick}
          >
            <SettingsIcon />
          </IconButton>
        </div>
        {showHelp &&
          <Help />
        }
        {showSettings &&
          <Settings />
        }
      </div>
    </div>
  );
};
