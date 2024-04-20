import fs from 'fs';

const WORD_LENGTH = 6;

const RANGE = 58;

const commonWords = [
  "you're",
  "that's",
  "didn't",
  "you'll",
  "you've",
  "wasn't",
  "what's",
  "she'll",
  "here's",
  "aren't",
  "hadn't",
  "they'd",
  "one'll",
  "who'll",
  "there's",
  "they're",
  "they'll",
  "haven't",
  "doesn't",
  "weren't",
  "that'll",
  "where's",
  "would've",
  "could've",
  "couldn't",
  "wouldn't",
  "there'll",
  "should've",
  "shouldn't",
];

// read all files from the ./data/base directory and remove extension
const getFileNames = () => {
  return fs.readdirSync('./data/base').map(file => file.replace(/\.[^/.]+$/, ''));
};

const removeInvalidLines = (track) => {
  return track.lyrics.filter(line => line.length && !/^\[.*\]$/.test(line));
};

// get words of a string
const getWords = (str) => str.split(/[\s-]+/);

const getLengthWords = (filename, wordLength) => {
  const data = fs.readFileSync(`./data/base/${filename}.json`, 'utf8');
  const fileObject = JSON.parse(data);
  const title = fileObject.title;
  const tracks = fileObject.tracks;

  const newFile = [];

  for (let i = 0; i < tracks.length; i++) {
    const track = tracks[i];
    const lyrics = removeInvalidLines(track); // lines of a track
    
    for (let j = 0; j < lyrics.length; j++) {
      const line = lyrics[j];
      const words = getWords(line);

      const newWords = words.filter(word => {
        const newWord = word.replace(/^[\("']/, '').replace(/[\).,;-\?"]+$/, '');
        return newWord.length === wordLength;
      });
      
      newWords.forEach(word => {
        newFile.push({
          word: word,
          line: line,
          track: track.title,
          album: title,
        });
      });
    }
  }

  return newFile;
};

const getCSV = (words) => {
  const SEPARATOR = '|';
  const csvRows = words.map(word => {
    return `${word.word}${SEPARATOR}${word.line}${SEPARATOR}${word.track}${SEPARATOR}${word.album}`;
  });
  return csvRows.join('\n');
};

const removeCommonWords = (words) => {
  return words.filter(word => !commonWords.includes(word.word.toLowerCase()));
};

const parseAll = (csv) => {
  const fileNames = getFileNames();
  fileNames.forEach(filename => {
    const lengthWords = getLengthWords(filename, WORD_LENGTH);
    const withoutCommon = removeCommonWords(lengthWords);
    // const withoutCommon = lengthWords;
    fs.writeFileSync(`./data/final/${WORD_LENGTH} words/${filename}.json`, JSON.stringify(withoutCommon, null, 2), 'utf8');

    if(csv) {
      const csv = getCSV(withoutCommon);
      fs.writeFileSync(`./data/final/${WORD_LENGTH} words/${filename}.csv`, csv, 'utf8');
    }
  });
};

// get words with single quote in all files
export const getWordsSingleQuote = () => {
  const fileNames = getFileNames();
  const words = {};
  fileNames.forEach(filename => {
    const data = fs.readFileSync(`./data/final/${WORD_LENGTH} words/${filename}.json`, 'utf8');
    const fileObject = JSON.parse(data);
    fileObject.forEach(word => {
      const lowerCaseWord = word.word.toLowerCase();
      if (lowerCaseWord.includes("'")) {
        words[lowerCaseWord] = {
          word: lowerCaseWord,
          count: words[lowerCaseWord] ? words[lowerCaseWord].count + 1 : 1,
        };
      }
    });
  });
  const sortedWords = Object.keys(words).sort((a, b) => words[b].count - words[a].count).map(word => words[word]);
  fs.writeFileSync(`./data/final/single-quote-${WORD_LENGTH}-words.json`, JSON.stringify(sortedWords, null, 2), 'utf8');
};

// get the words count by wordLength and by album
export const getWordsCount = () => {
  const fileNames = getFileNames();

  // iterate over 6-10 words folders
  const wordsCount = {};
  for (let i = 6; i <= 10; i++) {
    const albumCount = {};
    if(fs.existsSync(`./data/final/${i} words`)) {
      fileNames.forEach(filename => {
        const data = fs.readFileSync(`./data/final/${i} words/${filename}.json`, 'utf8');
        const fileObject = JSON.parse(data);
        albumCount[filename] = fileObject.length;
        wordsCount[`${i} words`] = albumCount;
      });
    }
  }
  return wordsCount;
};

export const parseCSV = () => {
  const fileNames = getFileNames();
  fileNames.forEach(filename => {
    if(!fs.existsSync(`./data/final/${WORD_LENGTH} words/final/${filename}.csv`)) return;
    const data = fs.readFileSync(`./data/final/${WORD_LENGTH} words/final/${filename}.csv`, 'utf8');
    const lines = data.split('\n');
    const words = lines.map(line => {
      const word = line.split('|');
      return {
        word: word[0],
        line: word[1],
        track: word[2],
        album: word[3],
      };
    });
    const wordsWithoutEmpty = words.filter(word => word.word.length);
    fs.writeFileSync(`./data/final/${WORD_LENGTH} words/final/${filename}.json`, JSON.stringify(wordsWithoutEmpty, null, 2), 'utf8');
  });
};

// check if every word has the correct length, if not, print it
const checkWordsLength = () => {
  const fileNames = getFileNames();
  fileNames.forEach(filename => {
    if(!fs.existsSync(`./data/final/${WORD_LENGTH} words/final/${filename}.json`)) return;
    const data = fs.readFileSync(`./data/final/${WORD_LENGTH} words/final/${filename}.json`, 'utf8');
    const fileObject = JSON.parse(data);
    fileObject.forEach(word => {
      if(word.word.length !== WORD_LENGTH) {
        console.log(word);
      }
    });
  });
};

// check if every word exists in the line, if not, print it
const checkIfWordsExist = () => {
  const fileNames = getFileNames();
  fileNames.forEach(filename => {
    if(!fs.existsSync(`./data/final/${WORD_LENGTH} words/final/${filename}.json`)) return;
    const data = fs.readFileSync(`./data/final/${WORD_LENGTH} words/final/${filename}.json`, 'utf8');
    const fileObject = JSON.parse(data);
    fileObject.forEach(word => {
      if(!(new RegExp(`\\b${word.word}\\b`, 'gi')).test(word.line)) {
        console.log(word);
      }
    });
  });
};

// count the words and save it in a file
export const countWords = () => {
  const fileNames = getFileNames();
  const words = {};
  fileNames.forEach(filename => {
    if(!fs.existsSync(`./data/final/${WORD_LENGTH} words/final/${filename}.json`)) return;
    const data = fs.readFileSync(`./data/final/${WORD_LENGTH} words/final/${filename}.json`, 'utf8');
    const fileObject = JSON.parse(data);
    fileObject.forEach(word => {
      const lowerCaseWord = word.word.toLowerCase();
      words[lowerCaseWord] = {
        word: lowerCaseWord,
        count: words[lowerCaseWord] ? words[lowerCaseWord].count + 1 : 1,
      };
    });
  });
  const sortedWords = Object.keys(words).sort((a, b) => words[b].count - words[a].count).map(word => words[word]);
  fs.writeFileSync(`./data/final/${WORD_LENGTH} words/final/count-words.json`, JSON.stringify(sortedWords, null, 2), 'utf8');
};

// count the total words
export const totalWords = () => {
  const fileNames = getFileNames();
  let total = 0;
  fileNames.forEach(filename => {
    if(!fs.existsSync(`./data/final/${WORD_LENGTH} words/final/${filename}.json`)) return;
    const data = fs.readFileSync(`./data/final/${WORD_LENGTH} words/final/${filename}.json`, 'utf8');
    const fileObject = JSON.parse(data);
    total += fileObject.length;
  });
  console.log(total);
};

// merge all words from different albums in a single file
export const mergeWords = () => {
  const fileNames = getFileNames();
  const words = [];
  fileNames.forEach(filename => {
    if(!fs.existsSync(`./data/final/${WORD_LENGTH} words/final/${filename}.json`)) return;
    const data = fs.readFileSync(`./data/final/${WORD_LENGTH} words/final/${filename}.json`, 'utf8');
    const fileObject = JSON.parse(data);
    fileObject.forEach(word => {
      words.push(word);
    });
  });
  fs.writeFileSync(`./data/final/${WORD_LENGTH} words/final/merged-words.json`, JSON.stringify(words, null, 2), 'utf8');
};

// count the total words in the merged file
const countWordsMerged = () => {
  const data = fs.readFileSync(`./data/final/${WORD_LENGTH} words/final/merged-words.json`, 'utf8');
  const fileObject = JSON.parse(data);
  const totalWords = fileObject.length;
  console.log(totalWords);
};

// randomize the words array
const randomizeWordsArray = () => {
  const data = fs.readFileSync(`./data/final/${WORD_LENGTH} words/final/merged-words.json`, 'utf8');
  const fileObject = JSON.parse(data);
  const randomizedWords = [];

  const words = {};
  fileObject.forEach(word => {
    const lowerCaseWord = word.word.toLowerCase();
    words[lowerCaseWord] = {
      word: lowerCaseWord,
      count: words[lowerCaseWord] ? words[lowerCaseWord].count + 1 : 1,
    };
  });
  const sortedWords = Object.keys(words).sort((a, b) => words[a].count - words[b].count).map(word => words[word]);

  sortedWords.forEach(word => {
    const matchedWords = fileObject.filter(w => w.word.toLowerCase() === word.word);
    matchedWords.forEach(w => {
      // check if word exists in range 50 of the index, if not exists, add it, if exists, randomize again with a while
      let randomIndex = Math.floor(Math.random() * randomizedWords.length);
      let canPush = false;
      let i = 0
      while(!canPush) {
        const start = Math.max(0, randomIndex - RANGE);
        const end = Math.min(randomizedWords.length - 1, randomIndex + RANGE) + 1;
        const wordInRange = randomizedWords.slice(start, end).find(w2 => w2.word === w.word);
        if(wordInRange) {
          randomIndex = Math.floor(Math.random() * randomizedWords.length);
        } else {
          console.log('word not in range', w.word);
          canPush = true;
        }
      }
      randomizedWords.splice(randomIndex, 0, w);
      console.log(`word added [${w.word} in [${randomIndex}], length [${randomizedWords.length}]`);
    });
  });
  console.log('Total length', randomizedWords.reduce((acc, word) => acc + 1, 0));

  fs.writeFileSync(`./data/final/${WORD_LENGTH} words/final/random-words.json`, JSON.stringify(randomizedWords, null, 2), 'utf8');
};

// check if every word is separated by RANGE
const checkIfWordsIsSeparated = () => {
  const data = fs.readFileSync(`./data/final/${WORD_LENGTH} words/final/random-words.json`, 'utf8');
  const fileObject = JSON.parse(data);
  console.log(fileObject.length);
  
  fileObject.forEach((word, index) => {
    const start = Math.max(index + 1, index - RANGE);
    const end = Math.min(fileObject.length - 1, index + RANGE) + 1;
    const wordInRange = fileObject.slice(start, end).find(w => w.word === word.word);
    if(wordInRange) {
      console.log('word in range', word, index);
    }
  });
};

const run = () => {
  // console.log(getFileNames());
  // parseAll(true);
  // getWordsSingleQuote();
  // console.log(getWordsCount());

  // parseCSV();
  // checkWordsLength();
  // checkIfWordsExist();
  // countWords();
  // totalWords();
  // mergeWords();
  // countWordsMerged();
  // randomizeWordsArray(); // first merge all word length merged files
  // checkIfWordsIsSeparated();
};
run();

// 483 + 367 + 171 + 113 = 1134