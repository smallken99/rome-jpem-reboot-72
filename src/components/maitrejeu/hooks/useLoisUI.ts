
import { useState } from 'react';
import { Loi } from '../types/lois';

export function useLoisUI() {
  const [activeTab, setActiveTab] = useState('actives');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoi, setSelectedLoi] = useState<Loi | null>(null);
  
  const handleOpenModal = (loi: Loi | null = null) => {
    setSelectedLoi(loi);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLoi(null);
  };
  
  // Helper for formatting seasons
  const formatSeason = (season: string): string => {
    switch(season) {
      case 'SPRING': return 'Printemps';
      case 'SUMMER': return 'Été';
      case 'AUTUMN': return 'Automne';
      case 'WINTER': return 'Hiver';
      case 'Ver': return 'Printemps';
      case 'Aestas': return 'Été';
      case 'Autumnus': return 'Automne';
      case 'Hiems': return 'Hiver';
      default: return season;
    }
  };

  return {
    activeTab,
    setActiveTab,
    isModalOpen,
    selectedLoi,
    handleOpenModal,
    handleCloseModal,
    formatSeason
  };
}
