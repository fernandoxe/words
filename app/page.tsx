import { Board } from '@/components/Board';
import { Keyboard } from '@/components/Keyboard';

const WORD = 'dancing';
const ROWS = 7;

export default function Home() {
  return (
    <main className="flex justify-center text-xl">
      <div className="flex flex-col items-center gap-8">
        <Board
          word={WORD}
          rows={ROWS}
        />
        <Keyboard />
      </div>
    </main>
  );
}
