import { ROWS } from '@/constants';
import { Board } from '../Board';
import { Keyboard } from '../Keyboard';
import { BoardI, KeysI, StatsI } from '@/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { useWordsContext } from '@/contexts';
import { Results } from '../Results';
import { Stats } from '../Stats';
import { getClonedKeys, getEmptyKeys, getKeyRow } from '@/services/keys';
import { addLetter, getClonedBoard, getEmptyBoard, removeLetter } from '@/services/board';
import { getEmptyLocalStats, getKeysFromStates, getLastGame, getLocalStats, saveLastGame, saveStats } from '@/services/storage';
import { Loader } from '../Loader';
import { endGame, sendRowLog, showResultsModal, startGame, startLastGame } from '@/services/gtm';
import { captureException } from '@sentry/nextjs';

export const Game = () => {
  const { word,
    setWord,
    showResults,
    setShowResults,
    setCanShowResults,
    app,
    showStats,
  } = useWordsContext();
  const [keys, setKeys] = useState<KeysI>(getEmptyKeys());
  const [board, setBoard] = useState<BoardI>(getEmptyBoard(word.word.word, ROWS));
  const [row, setRow] = useState(0);
  const [column, setColumn] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [winner, setWinner] = useState(false);
  const [random, setRandom] = useState(false);
  const [stats, setStats] = useState<StatsI>(getEmptyLocalStats());

  useEffect(() => {
    const lastGame = getLastGame();
    if (lastGame?.date === word.date && lastGame?.word.word === word.word.word) {
      setKeys(getKeysFromStates(lastGame.keyStates));
      setBoard(lastGame.board);
      setRandom(false);
      setShowResults(true);
      setCanShowResults(true);
      setWinner(lastGame.winner);
      setFinished(true);

      startLastGame(word.word.word, lastGame.winner);
      showResultsModal(lastGame.winner);
    } else {
      startGame(!word.date);
    }

    const newStats = getLocalStats();
    setStats(newStats);

    // setTheme(newTheme);

    setLoading(false);
  }, [setCanShowResults, setShowResults, word]);

  const finish = useCallback((newBoard: BoardI, newKeys: KeysI, isWinner: boolean) => {
    setFinished(true);
    setTimeout(() => {
      setShowResults(true);
      setCanShowResults(true);
    }, 200);
    if (!random) {
      saveLastGame(newBoard, newKeys, word, isWinner);
    }
    const newStats = saveStats(stats, random, isWinner, row);
    setStats(newStats);

    endGame(random, word.date || '', word.word.word, isWinner, row + 1);
    showResultsModal(isWinner);
  }, [random, row, word, stats, setShowResults, setCanShowResults]);

  const sendRow = useCallback((row: number) => {
    const newKeys = getClonedKeys(keys);
    const newBoard = getClonedBoard(board);
    const newRow = newBoard[row];
    const lowerWord = word.word.word.toLowerCase();
    newRow.forEach((square, index) => {
      const keyRow = getKeyRow(newKeys, square.char);
      if (square.char === lowerWord[index]) {
        keyRow[square.char].status = '2';
        square.guessed = '2';
      } else if (lowerWord.includes(square.char)) {
        keyRow[square.char].status = '1';
        square.guessed = '1';
      } else {
        keyRow[square.char].status = '-1';
        square.guessed = '-1';
      }
    });
    const isWinner = newRow.every(square => square.guessed === '2');
    if (isWinner) {
      setWinner(true);
      finish(newBoard, newKeys, isWinner);
    } else {
      const nextRow = row + 1;
      if (nextRow === ROWS) {
        setWinner(false);
        finish(newBoard, newKeys, isWinner);
      } else {
        setRow(nextRow);
        setColumn(0);
      }
    }
    setKeys(newKeys);
    setBoard(newBoard);

    sendRowLog(row);
  }, [board, keys, word, finish]);

  const handleKey = useCallback((key: string) => {
    if (finished) return;
    if (/^[a-z]$/.test(key) && row < ROWS && column < word.word.word.length) {
      const newColumn = column + 1;
      setBoard(addLetter(board, key, row, column));
      setColumn(newColumn);
    } else if (key === 'backspace' && column > 0) {
      const newColumn = column - 1;
      setBoard(removeLetter(board, row, newColumn));
      setColumn(newColumn);
    } else if (key === 'enter' && column === word.word.word.length) {
      sendRow(row);
    }
  }, [board, column, row, word, finished, sendRow]);

  const handlePlayAgain = useCallback(async () => {
    setLoading(true);
    setKeys(getEmptyKeys());
    setFinished(false);
    setRow(0);
    setColumn(0);
    setCanShowResults(false);
    setWinner(false);
    setRandom(true);
    try {
      const response = await fetch(`/api/word/random/${app}`);
      const newWord = await response.json();
      setWord(newWord);
      setBoard(getEmptyBoard(newWord.word.word, ROWS));
    } catch (error) {
      captureException(error);
    } finally {
      setLoading(false);
    }
  }, [app, setCanShowResults, setWord]);

  return (
    <div className="w-full flex flex-col items-center gap-8">
      {/* <div>
        {word.word.word}
      </div> */}
      {loading &&
        <div className="mt-12">
          <Loader />
        </div>
      }
      {!loading &&
        <>
          {board &&
            <Board
              board={board}
              focusedRow={row}
              focusedColumn={column}
            />
          }
          <Keyboard
            rows={keys}
            onKey={handleKey}
          />
          {showResults &&
            <Results
              winner={winner}
              word={word}
              board={board}
              row={row}
              column={column}
              onPlayAgain={handlePlayAgain}
            />
          }
          {stats && showStats &&
            <Stats
              stats={stats}
            />
          }
        </>
      }
    </div>
  );
};
