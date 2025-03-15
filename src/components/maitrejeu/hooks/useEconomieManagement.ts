
import { useState } from 'react';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { EconomieFilter, EconomieRecord, EconomieSort, EconomieCreationData } from '@/components/maitrejeu/types/economie';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { GameDate } from '@/components/maitrejeu/types/common';

export const useEconomieManagement = () => {
  const { economieRecords, addEconomieRecord, updateEconomieRecord, deleteEconomieRecord, treasury, economicFactors } = useMaitreJeu();
  
  // États
  const [filter, setFilter] = useState<EconomieFilter>({
    type: 'all',
    searchTerm: ''
  });
  const [sort, setSort] = useState<EconomieSort>({
    field: 'date',
    direction: 'desc'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<EconomieRecord | null>(null);
  
  // Filtrer les enregistrements
  const filteredRecords = economieRecords.filter(record => {
    if (filter.type !== 'all' && record.type !== filter.type) return false;
    if (filter.categories && filter.categories.length > 0 && !filter.categories.includes(record.category)) return false;
    
    if (filter.dateRange?.start && typeof record.date === 'object') {
      const dateStart = filter.dateRange.start;
      if (record.date.year < dateStart.year) return false;
      if (record.date.year === dateStart.year && 
          getSeasonsOrder(record.date.season) < getSeasonsOrder(dateStart.season)) return false;
    }
    
    if (filter.dateRange?.end && typeof record.date === 'object') {
      const dateEnd = filter.dateRange.end;
      if (record.date.year > dateEnd.year) return false;
      if (record.date.year === dateEnd.year && 
          getSeasonsOrder(record.date.season) > getSeasonsOrder(dateEnd.season)) return false;
    }
    
    if (filter.searchTerm && !record.description.toLowerCase().includes(filter.searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Trier les enregistrements
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    const direction = sort.direction === 'asc' ? 1 : -1;
    
    if (sort.field === 'date') {
      if (typeof a.date === 'object' && typeof b.date === 'object') {
        if (a.date.year !== b.date.year) {
          return (a.date.year - b.date.year) * direction;
        } else {
          return (getSeasonsOrder(a.date.season) - getSeasonsOrder(b.date.season)) * direction;
        }
      }
      return 0;
    } else if (sort.field === 'amount') {
      return (a.amount - b.amount) * direction;
    } else {
      // @ts-ignore
      return String(a[sort.field]).localeCompare(String(b[sort.field])) * direction;
    }
  });
  
  // Utilitaire pour obtenir l'ordre des saisons
  const getSeasonsOrder = (season: string): number => {
    const seasons: Record<string, number> = { 
      'Ver': 0, 
      'Aestas': 1, 
      'Autumnus': 2, 
      'Hiems': 3 
    };
    return seasons[season] ?? 0;
  };
  
  // Handlers
  const handleFilterChange = (newFilter: Partial<EconomieFilter>) => {
    setFilter({ ...filter, ...newFilter });
  };
  
  const handleResetFilters = () => {
    setFilter({
      type: 'all',
      searchTerm: ''
    });
  };
  
  const handleSortChange = (field: keyof EconomieRecord) => {
    setSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };
  
  const handleAddTransaction = () => {
    setSelectedRecord(null);
    setIsModalOpen(true);
  };
  
  const handleEditTransaction = (record: EconomieRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };
  
  const handleDeleteTransaction = (id: string) => {
    try {
      deleteEconomieRecord(id);
      toast.success('Transaction supprimée avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de la transaction:', error);
      toast.error('Erreur lors de la suppression de la transaction');
    }
  };
  
  const handleSaveTransaction = (data: EconomieCreationData) => {
    try {
      if (selectedRecord) {
        // Mise à jour d'un enregistrement existant
        updateEconomieRecord(selectedRecord.id, data);
        toast.success('Transaction mise à jour avec succès');
      } else {
        // Création d'un nouvel enregistrement
        const newRecord: EconomieCreationData = {
          ...data,
          date: data.date || new Date().toISOString()
        };
        addEconomieRecord(newRecord);
        toast.success('Transaction ajoutée avec succès');
      }
      
      setIsModalOpen(false);
      setSelectedRecord(null);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la transaction:', error);
      toast.error('Erreur lors de l\'enregistrement de la transaction');
    }
  };
  
  const handleGenerateReport = () => {
    toast.info('Génération du rapport en cours...');
    // Logique de génération de rapport
    setTimeout(() => {
      toast.success('Rapport généré avec succès');
    }, 1500);
  };
  
  const handleCalculateProjections = () => {
    toast.info('Calcul des projections en cours...');
    // Logique de calcul des projections
    setTimeout(() => {
      toast.success('Projections calculées avec succès');
    }, 1500);
  };
  
  const handleRefreshData = () => {
    toast.info('Actualisation des données en cours...');
    // Logique d'actualisation des données
    setTimeout(() => {
      toast.success('Données actualisées avec succès');
    }, 1000);
  };
  
  return {
    economieRecords: sortedRecords,
    filter,
    sort,
    isModalOpen,
    selectedRecord,
    treasury,
    economicFactors,
    handleFilterChange,
    handleResetFilters,
    handleSortChange,
    handleAddTransaction,
    handleEditTransaction,
    handleDeleteTransaction,
    handleSaveTransaction,
    handleGenerateReport,
    handleCalculateProjections,
    handleRefreshData,
    setIsModalOpen
  };
};
