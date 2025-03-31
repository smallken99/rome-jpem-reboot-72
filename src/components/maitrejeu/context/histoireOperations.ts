
import { HistoireEntry } from "../types/histoire";
import { v4 as uuidv4 } from 'uuid';

export const createHistoireOperations = (
  setHistoireEntries: React.Dispatch<React.SetStateAction<HistoireEntry[]>>
) => {
  
  const addHistoireEntry = (entry: Omit<HistoireEntry, "id"> | HistoireEntry) => {
    const newEntry: HistoireEntry = {
      id: 'id' in entry ? entry.id : uuidv4(),
      titre: entry.titre,
      contenu: entry.contenu,
      date: entry.date,
      type: entry.type,
      importanceLevel: entry.importanceLevel,
      personnesImpliquées: entry.personnesImpliquées,
      tags: entry.tags,
      importance: entry.importance,
      catégorie: entry.catégorie
    };
    
    setHistoireEntries(prev => [...prev, newEntry]);
    return newEntry.id;
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
