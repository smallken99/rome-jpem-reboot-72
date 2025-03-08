
import { HistoireEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const createHistoireOperations = (
  setHistoireEntries: React.Dispatch<React.SetStateAction<HistoireEntry[]>>
) => {
  const addHistoireEntry = (entry: Omit<HistoireEntry, "id">) => {
    const newEntry = {
      ...entry,
      id: uuidv4()
    };
    setHistoireEntries(prev => [...prev, newEntry as HistoireEntry]);
  };

  return {
    addHistoireEntry
  };
};
