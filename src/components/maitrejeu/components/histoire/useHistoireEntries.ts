
import { useState, useEffect } from 'react';
import { useMaitreJeu } from '../../context';
import { HistoireEntry } from '../../types/histoire';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export const useHistoireEntries = () => {
  const { histoireEntries = [], addHistoireEntry, currentDate } = useMaitreJeu();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);

  // Filtering histoire entries
  const filteredEntries = histoireEntries.filter(entry => {
    const matchesTerm = !searchTerm || 
      entry.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.contenu.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !filterType || 
      entry.type === filterType;
    
    return matchesTerm && matchesType;
  });

  // Create a new histoire entry
  const handleAddHistoireEntry = (entry: Omit<HistoireEntry, "id">) => {
    const newEntry: HistoireEntry = {
      ...entry,
      id: uuidv4()
    };
    
    addHistoireEntry(entry);
    setIsModalOpen(false);
    toast.success("Nouvelle entrée historique ajoutée");
  };

  // Open modal for creating new entry
  const openNewEntryModal = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    histoireEntries: filteredEntries,
    isModalOpen,
    searchTerm,
    filterType,
    currentDate,
    setSearchTerm,
    setFilterType,
    handleAddHistoireEntry,
    openNewEntryModal,
    closeModal
  };
};
