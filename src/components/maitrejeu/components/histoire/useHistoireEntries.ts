
import { useState, useEffect, useMemo } from 'react';
import { HistoireEntry } from '../../types/histoire';
import { useMaitreJeu } from '../../context/MaitreJeuContext';

export const useHistoireEntries = () => {
  const { histoireEntries, addHistoireEntry, gameState } = useMaitreJeu();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredEntries = useMemo(() => {
    return histoireEntries.filter(entry => 
      entry.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.contenu.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [histoireEntries, searchTerm]);
  
  return {
    histoireEntries,
    filteredEntries,
    searchTerm,
    setSearchTerm,
    addHistoireEntry,
    gameState
  };
};
