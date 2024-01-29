import { useWordsContext } from '@/contexts';
import { Modal } from '../Modal';
import { Switch } from '../Switch';
import { useEffect } from 'react';
import { config } from '@/config';
import { switchHighContrast, switchTheme } from '@/services/gtm';

export const Settings = () => {
  const { app, setShowSettings, theme, setTheme, highContrast, setHighContrast } = useWordsContext();

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.className = theme;
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('highContrast', highContrast ? '1' : '0');
  }, [highContrast]);

  const handleThemeClick = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    switchTheme(newTheme, highContrast);
  };

  const handleHighContrastClick = () => {
    const newHighContrast = !highContrast;
    setHighContrast(newHighContrast);

    switchHighContrast(newHighContrast, theme);
  };

  return (
    <Modal
      title="Settings"
      onClose={() => setShowSettings(false)}
      closeButton
    >
      <div className="flex flex-col gap-4">
        <Switch
          checked={theme === 'dark'}
          onClick={handleThemeClick}
        >
          <div>
            <div>
              {config[app].themeTitle}
            </div>
            <div className="text-xs">
              {config[app].themeDescription}
            </div>
          </div>
        </Switch>
        <Switch
          checked={highContrast}
          onClick={handleHighContrastClick}
        >
          <div>
            <div>
              {config[app].highContrastTitle}
            </div>
            <div className="text-xs">
              {config[app].highContrastDescription}
            </div>
          </div>
        </Switch>
      </div>
    </Modal>
  );
}