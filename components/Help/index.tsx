import { useWordsContext } from '@/contexts';
import { Modal } from '../Modal';
import { Row } from '../Board/Row';
import { config } from '@/config';

export const Help = () => {
  const { setShowHelp, app } = useWordsContext();

  return (
    <Modal
      title="How to play"
      onClose={() => setShowHelp(false)}
      closeButton
    >
      <div className="flex flex-col gap-2">
        <div>
          Complete the row and press enter
        </div>
        <div>
          The color of the squares will change to show how close your guess was to the word, for example
        </div>
        <div className="flex justify-center">
          <Row
            row={config[app].helpWrongRow}
          />
        </div>
        <ul className="list-disc list-inside">
          <li>
            {config[app].helpCorrectLetter} is in the word at the correct spot
          </li>
          <li>
            {config[app].helpAlmostLetter} is in the word but in the wrong spot
          </li>
          <li>The rest of letters are not in the word</li>
        </ul>
        <div>
          In the next tries use the previous hints to guess the word
        </div>
        <div className="flex justify-center">
          <Row
            row={config[app].helpCorrectRow}
          />
        </div>
        <div className="text-center">
          A new {config[app].appTitle} will be available every day
        </div>
      </div>
    </Modal>
  );
};
