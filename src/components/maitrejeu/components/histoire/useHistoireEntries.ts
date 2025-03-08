
import { useState, useEffect, useMemo } from 'react';
import { useMaitreJeu } from '../../context';
import { HistoireEntry } from '../../types/histoire';

export const useHistoireEntries = () => {
  const { histoireEntries, addHistoireEntry, currentYear, currentSeason } = useMaitreJeu();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Filter entries based on search term and category
  const filteredEntries = useMemo(() => {
    return histoireEntries.filter(entry => {
      const matchesSearch = entry.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (entry.contenu && entry.contenu.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = categoryFilter === 'ALL' || entry.catégorie === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
  }, [histoireEntries, searchTerm, categoryFilter]);

  // Alias for addHistoireEntry for better naming
  const createHistoireEntry = (entry: Omit<HistoireEntry, "id">) => {
    addHistoireEntry(entry);
  };

  return {
    histoireEntries,
    filteredEntries,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    addHistoireEntry,
    createHistoireEntry,
    currentYear,
    currentSeason
  };
};
