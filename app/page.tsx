import { Home as HomeComponent } from '@/components/Home';
import { WordsProvider } from '@/contexts';
import { getWord } from '@/services/words-api';
import { headers } from 'next/headers';

export default function Home() {
  const headerList = headers();
  const host = headerList.get('host') || '';
  const word = getWord(host);
  
  return (
    <WordsProvider
      word={word}
      app={host}
    >
      <HomeComponent />
    </WordsProvider>
  );
}
