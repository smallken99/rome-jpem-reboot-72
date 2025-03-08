
import { useState, useEffect } from 'react';
import { useMaitreJeu } from '../../context';
import { HistoireEntry } from '../../types/histoire';

export const useHistoireEntries = () => {
  const { histoireEntries, addHistoireEntry, currentYear, currentSeason } = useMaitreJeu();
  const [filteredEntries, setFilteredEntries] = useState<HistoireEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  useEffect(() => {
    let filtered = [...histoireEntries];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(entry => 
        entry.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.contenu.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.auteur.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter(entry => entry.catégorie === categoryFilter);
    }
    
    // Sort by date, newest first
    filtered.sort((a, b) => {
      if (a.date.year !== b.date.year) {
        return b.date.year - a.date.year;
      }
      
      const seasonOrder = { 'SPRING': 0, 'SUMMER': 1, 'AUTUMN': 2, 'WINTER': 3 };
      return seasonOrder[b.date.season] - seasonOrder[a.date.season];
    });
    
    setFilteredEntries(filtered);
  }, [histoireEntries, searchTerm, categoryFilter]);
  
  const createHistoireEntry = (entry: Omit<HistoireEntry, 'id'>) => {
    addHistoireEntry(entry);
  };
  
  return {
    histoireEntries: filteredEntries,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    createHistoireEntry,
    currentYear,
    currentSeason,
  };
};
