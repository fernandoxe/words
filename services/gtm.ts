const logEvent = (event: string, params?: any) => {
  gtag('event', event, params);
};

export const startGame = (nonDaily: boolean) => {
  logEvent(
    'start_game',
    {
      type: nonDaily ? 'non-daily' : 'daily'
    }
  );
};

export const startLastGame = (word: string, winner: boolean) => {
  logEvent(
    'start_last_game',
    {
      word,
      winner
    }
  );
};

export const endGame = (nonDaily: boolean, date: string, word: string, winner: boolean, tries: number) => {
  logEvent(
    'end_game',
    {
      type: nonDaily ? 'non-daily' : 'daily',
      date,
      word,
      winner,
      tries,
    }
  );
};

export const sendRowLog = (rowNumber: number) => {
  logEvent(
    'send_row',
    {
      rowNumber,
    }
  );
};

export const showResultsModal = (winner: boolean) => {
  logEvent(
    'show_result',
    {
      winner,
    }
  );
};

export const clickResults = () => {
  logEvent(
    'click_result',
  );
};

export const clickStats = () => {
  logEvent(
    'click_stats'
  );
};

export const clickHelp = () => {
  logEvent(
    'click_help'
  );
};

export const clickSettings = () => {
  logEvent(
    'click_settings'
  );
};

export const closeModal = (x: boolean) => {
  logEvent(
    'close_modal',
    {
      x,
    }
  );
};

export const share = () => {
  logEvent(
    'share'
  );
};

export const shareStats = () => {
  logEvent(
    'share_stats',
  );
};

export const copy = () => {
  logEvent(
    'copy'
  );
};

export const copyStats = () => {
  logEvent(
    'copy_stats',
  );
};

export const playAgain = (winner: boolean) => {
  logEvent(
    'play_again',
    {
      winner,
    }
  );
};

export const initTheme = (theme: string, highContrast: boolean) => {
  logEvent(
    'init_theme',
    {
      theme,
      highContrast,
    }
  );
};

export const switchTheme = (theme: string, highContrast: boolean) => {
  logEvent(
    'set_theme',
    {
      theme,
      highContrast,
    }
  );
};

export const switchHighContrast = (highContrast: boolean, theme: string) => {
  logEvent(
    'set_highcontrast',
    {
      highContrast,
      theme,
    }
  );
};
