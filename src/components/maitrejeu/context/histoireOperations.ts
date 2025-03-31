
import { HistoireEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const createHistoireOperations = (
  setHistoireEntries: React.Dispatch<React.SetStateAction<HistoireEntry[]>>
) => {
  const addHistoireEntry = (entry: Omit<HistoireEntry, "id">) => {
    const newEntry: HistoireEntry = {
      ...entry,
      id: uuidv4()
    };
    setHistoireEntries(prev => [...prev, newEntry]);
    return newEntry; // Return the newly created entry
  };

  const updateHistoireEntry = (id: string, updates: Partial<HistoireEntry>) => {
    setHistoireEntries(prev => 
      prev.map(entry => entry.id === id ? { ...entry, ...updates } : entry)
    );
  };

  const deleteHistoireEntry = (id: string) => {
    setHistoireEntries(prev => prev.filter(entry => entry.id !== id));
  };

  return {
    addHistoireEntry,
    updateHistoireEntry,
    deleteHistoireEntry
  };
};
