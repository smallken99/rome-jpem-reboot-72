import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ttsService } from '@/services/tts.service';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WordTest from '../WordTest';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

const LOCAL_KEY = 'wordCards';

interface WordCard {
  word: string;
  meaning: string;
  sentence: string;
  sentence_translation?: string;
}

const speak = async (text: string): Promise<void> => {
  try {
    await ttsService.speak(text, { languageCode: 'en-US' });
    // 1秒空白
    await new Promise(res => setTimeout(res, 1000));
  } catch {
    await new Promise(res => setTimeout(res, 1000));
  }
};

const WordCardPage: React.FC = () => {
  const [wordCards, setWordCards] = useState<WordCard[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editData, setEditData] = useState<WordCard | null>(null);
  const [playing, setPlaying] = useState(false);
  const [loop, setLoop] = useState(false);
  const playingRef = useRef(playing);
  const stopRequested = useRef(false);
  const [isAddWordModalOpen, setIsAddWordModalOpen] = useState(false);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      setWordCards(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(wordCards));
  }, [wordCards]);

  const handleAddWord = async () => {
    const words = input.split(',').map(w => w.trim()).filter(w => w);
    if (words.length === 0) return;

    setLoading(true);
    setError('');
    const newCards: WordCard[] = [];
    const errors: string[] = [];

    await Promise.all(words.map(async (word) => {
      if (wordCards.some(card => card.word.toLowerCase() === word.toLowerCase())) {
        errors.push(`單字 '${word}' 已存在`);
        return;
      }
      try {
        const res = await fetch(`http://127.0.0.1:3000/serv/v2?word=${encodeURIComponent(word)}`);
        if (!res.ok) throw new Error('API 錯誤');
        const data = await res.json();
        if (!data.word) throw new Error('查無資料');
        newCards.push({ word: data.word, meaning: data.meaning, sentence: data.sentence, sentence_translation: data.sentence_translation });
      } catch (e: any) {
        errors.push(`查詢 '${word}' 失敗: ${e.message || '未知錯誤'}`);
      }
    }));

    if (newCards.length > 0) {
      setWordCards(prev => [...newCards, ...prev]);
    }

    if (errors.length > 0) {
      setError(errors.join('\n'));
    }

    setInput('');
    setLoading(false);
    if (errors.length === 0) {
        setIsAddWordModalOpen(false);
    }
  };

  const handleDelete = (idx: number) => {
    if (window.confirm('確定要刪除這張單字卡嗎？')) {
      const cardToDelete = wordCards[idx];
      ttsService.clearCache(cardToDelete.word);
      ttsService.clearCache(cardToDelete.sentence);
      setWordCards(wordCards.filter((_, i) => i !== idx));
    }
  };

  const handleEdit = (idx: number) => {
    setEditIdx(idx);
    setEditData({ ...wordCards[idx] });
  };

  const handleEditChange = (field: keyof WordCard, value: string) => {
    if (editData) setEditData({ ...editData, [field]: value });
  };

  const handleEditSave = () => {
    if (editIdx !== null && editData) {
      const updated = [...wordCards];
      updated[editIdx] = editData;
      setWordCards(updated);
      setEditIdx(null);
      setEditData(null);
    }
  };

  const handleEditCancel = () => {
    setEditIdx(null);
    setEditData(null);
  };

  // 全部播放
  const handlePlayAll = async () => {
    if (playingRef.current) return;
    setPlaying(true);
    stopRequested.current = false;
    do {
      for (let i = 0; i < wordCards.length; i++) {
        if (stopRequested.current) break;
        await speak(wordCards[i].word);
        if (stopRequested.current) break;
        await speak(wordCards[i].sentence);
      }
    } while (loop && !stopRequested.current);
    setPlaying(false);
  };

  // 停止全部播放
  const handleStopAll = () => {
    stopRequested.current = true;
    setPlaying(false);
  };

  // 停止全部播放（頁面unmount時）
  useEffect(() => {
    return () => {
      stopRequested.current = true;
      setPlaying(false);
    };
  }, []);

  return (
    <div className="p-6">
      <Tabs defaultValue="cards">
        <TabsList>
          <TabsTrigger value="cards">單字卡</TabsTrigger>
          <TabsTrigger value="test">單字測驗</TabsTrigger>
        </TabsList>
        <TabsContent value="cards">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">單字卡</h2>
                <Dialog open={isAddWordModalOpen} onOpenChange={setIsAddWordModalOpen}>
                    <DialogTrigger asChild>
                        <Button>新增單字</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>新增單字</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-4">
                        <Textarea
                            placeholder="輸入單字，以逗號分隔..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            disabled={loading}
                            rows={5}
                        />
                        <Button onClick={handleAddWord} disabled={loading}>
                            {loading ? '查詢中...' : '新增'}
                        </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
          <div className="flex items-center gap-4 mb-4">
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
              onClick={handlePlayAll}
              disabled={playing || wordCards.length === 0}
              title="全部播放"
            >▶️ 全部播放</button>
            <button
              className="bg-red-600 text-white px-3 py-1 rounded disabled:opacity-50"
              onClick={handleStopAll}
              disabled={!playing}
              title="停止播放"
            >⏹️ 停止播放</button>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={loop}
                onChange={e => setLoop(e.target.checked)}
                className="accent-rome-gold"
                disabled={playing}
              />
              無限循環播放
            </label>
            {playing && <span className="text-green-600">播放中...</span>}
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wordCards.map((card, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-xl" style={{ fontFamily: 'Arial, sans-serif' }}>
                    {editIdx === idx ? (
                      <input
                        className="border rounded px-2 py-1 w-32 mr-2"
                        value={editData?.word || ''}
                        onChange={e => handleEditChange('word', e.target.value)}
                      />
                    ) : (
                      <>
                        {card.word}
                        <button
                          className="ml-2 text-rome-gold hover:text-rome-gold/80"
                          title="播放單字"
                          onClick={() => speak(card.word)}
                          style={{ fontSize: '1.1em', verticalAlign: 'middle' }}
                        >🔊</button>
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 text-rome-gold font-semibold">
                    {editIdx === idx ? (
                      <input
                        className="border rounded px-2 py-1 w-full"
                        value={editData?.meaning || ''}
                        onChange={e => handleEditChange('meaning', e.target.value)}
                      />
                    ) : card.meaning}
                  </div>
                  <div className="text-gray-600 italic mb-1 flex items-center">
                    {editIdx === idx ? (
                      <input
                        className="border rounded px-2 py-1 w-full mr-2"
                        value={editData?.sentence || ''}
                        onChange={e => handleEditChange('sentence', e.target.value)}
                      />
                    ) : (
                      <>
                        <span>{card.sentence}</span>
                        <button
                          className="ml-2 text-rome-gold hover:text-rome-gold/80"
                          title="播放例句"
                          onClick={() => speak(card.sentence)}
                          style={{ fontSize: '1em', verticalAlign: 'middle' }}
                        >🔊</button>
                      </>
                    )}
                  </div>
                  {editIdx === idx ? (
                    <input
                      className="border rounded px-2 py-1 w-full text-sm mt-1"
                      value={editData?.sentence_translation || ''}
                      onChange={e => handleEditChange('sentence_translation', e.target.value)}
                      placeholder="例句翻譯 (可選)"
                    />
                  ) : (
                    card.sentence_translation && <div className="text-gray-500 text-sm">{card.sentence_translation}</div>
                  )}
                  <div className="flex gap-2 mt-3">
                    {editIdx === idx ? (
                      <>
                        <button
                          className="bg-green-600 text-white px-2 py-1 rounded"
                          onClick={handleEditSave}
                          title="保存"
                        >💾</button>
                        <button
                          className="bg-gray-400 text-white px-2 py-1 rounded"
                          onClick={handleEditCancel}
                          title="取消"
                        >✖️</button>
                      </>
                    ) : (
                      <>
                        <button
                          className="p-1 hover:bg-blue-100 rounded"
                          onClick={() => handleEdit(idx)}
                          title="修改"
                        >✏️</button>
                        <button
                          className="p-1 hover:bg-red-100 rounded"
                          onClick={() => handleDelete(idx)}
                          title="刪除"
                        >🗑️</button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="test">
          <WordTest wordCards={wordCards} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WordCardPage; 