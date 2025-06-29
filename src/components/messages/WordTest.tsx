import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ttsService } from '@/services/tts.service';

interface WordCard {
  word: string;
  meaning: string;
  sentence: string;
  sentence_translation?: string;
}

interface WordTestProps {
  wordCards: WordCard[];
}

const speak = async (text: string): Promise<void> => {
  try {
    await ttsService.speak(text, { languageCode: 'en-US' });
  } catch (error) {
    console.error('Speech synthesis failed', error);
  }
};

const WordTest: React.FC<WordTestProps> = ({ wordCards }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState<number | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const shuffledWords = useMemo(() => wordCards.sort(() => 0.5 - Math.random()), [wordCards]);

  const startTest = () => {
    setCurrentWordIndex(0);
    setScore(0);
    setShowResult(false);
    setIsFinished(false);
    generateOptions(0, true);
  };

  const generateOptions = (index: number, shouldSpeak: boolean = false) => {
    if (index >= shuffledWords.length) {
      setIsFinished(true);
      return;
    }

    const correctWord = shuffledWords[index];
    if (shouldSpeak) {
      speak(correctWord.word);
    }

    let randomOptions = shuffledWords
      .filter(w => w.word !== correctWord.word)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(w => w.meaning);
    
    const allOptions = [correctWord.meaning, ...randomOptions].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
  };

  const handleOptionClick = (option: string) => {
    if (currentWordIndex === null) return;

    const correctWord = shuffledWords[currentWordIndex];
    if (option === correctWord.meaning) {
      setScore(score + 1);
    }
    setShowResult(true);

    setTimeout(() => {
      setShowResult(false);
      const nextIndex = currentWordIndex + 1;
      if (nextIndex < shuffledWords.length) {
        setCurrentWordIndex(nextIndex);
        generateOptions(nextIndex, true);
      } else {
        setIsFinished(true);
      }
    }, 2000);
  };

  if (wordCards.length < 4) {
    return <p>需要至少 4 個單字才能開始測驗。</p>;
  }

  if (isFinished) {
    return (
      <div>
        <h3 className="text-xl font-bold">測驗完成！</h3>
        <p className="text-lg">你的分數是：{score} / {shuffledWords.length}</p>
        <Button onClick={startTest} className="mt-4">重新測驗</Button>
      </div>
    );
  }

  if (currentWordIndex === null) {
    return <Button onClick={startTest}>開始測驗</Button>;
  }

  const currentWord = shuffledWords[currentWordIndex];

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">聽力測驗</h3>
      <p className="mb-4">進度：{currentWordIndex + 1} / {shuffledWords.length}</p>
      <Button onClick={() => speak(currentWord.word)}>重播語音</Button>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {options.map((option, index) => (
          <Button 
            key={index} 
            onClick={() => handleOptionClick(option)}
            disabled={showResult}
            variant={showResult ? (option === currentWord.meaning ? 'default' : 'destructive') : 'outline'}
            className="h-24 text-lg"
          >
            {option}
          </Button>
        ))}
      </div>
      {showResult && (
        <div className="mt-4 text-center">
          <p className="text-xl font-bold">正確答案是：{currentWord.meaning}</p>
        </div>
      )}
    </div>
  );
};

export default WordTest;
