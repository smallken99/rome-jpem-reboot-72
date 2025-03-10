
import { useState, useEffect, useMemo } from 'react';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { 
  EconomieRecord, 
  EconomieFilter, 
  EconomieSort,
  EconomieCreationData,
  TreasuryStatus
} from '@/components/maitrejeu/types/economie';
import { toast } from 'sonner';

const DEFAULT_FILTER: EconomieFilter = {
  search: '',
  categories: [],
  type: 'all',
  affectedEntity: 'all'
};

const DEFAULT_SORT: EconomieSort = {
  field: 'date',
  direction: 'desc'
};

export const useEconomieManagement = () => {
  const { 
    economieRecords, 
    setEconomieRecords,
    treasury,
    setTreasury,
    economicFactors, 
    setEconomicFactors,
    addEconomieRecord,
    updateEconomieRecord,
    deleteEconomieRecord
  } = useMaitreJeu();
  
  const [filter, setFilter] = useState<EconomieFilter>(DEFAULT_FILTER);
  const [sort, setSort] = useState<EconomieSort>(DEFAULT_SORT);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<EconomieRecord | undefined>(undefined);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isProjectionOpen, setIsProjectionOpen] = useState(false);
  
  // Fonction pour filtrer les enregistrements économiques
  const filterRecords = (records: EconomieRecord[], filter: EconomieFilter): EconomieRecord[] => {
    return records.filter(record => {
      // Filtre de recherche textuelle
      if (filter.search && !Object.values(record).some(value => 
        typeof value === 'string' && value.toLowerCase().includes(filter.search.toLowerCase())
      )) {
        return false;
      }
      
      // Filtre par catégorie
      if (filter.categories.length > 0 && !filter.categories.includes(record.category)) {
        return false;
      }
      
      // Filtre par type de transaction
      if (filter.type !== 'all' && record.type !== filter.type) {
        return false;
      }
      
      // Filtre par entité affectée
      if (filter.affectedEntity !== 'all') {
        if (filter.affectedEntity === 'senateur' && !record.affectedSenateurId) {
          return false;
        }
        if (filter.affectedEntity === 'province' && !record.affectedProvinceId) {
          return false;
        }
      }
      
      // Filtre par montant minimum
      if (filter.minAmount !== undefined && record.amount < filter.minAmount) {
        return false;
      }
      
      // Filtre par montant maximum
      if (filter.maxAmount !== undefined && record.amount > filter.maxAmount) {
        return false;
      }
      
      // Filtre par plage de dates
      if (filter.dateRange?.start) {
        const startYear = filter.dateRange.start.year;
        const startSeason = filter.dateRange.start.season;
        
        const recordYear = record.date.year;
        const recordSeason = record.date.season;
        
        if (recordYear < startYear || (recordYear === startYear && recordSeason < startSeason)) {
          return false;
        }
      }
      
      if (filter.dateRange?.end) {
        const endYear = filter.dateRange.end.year;
        const endSeason = filter.dateRange.end.season;
        
        const recordYear = record.date.year;
        const recordSeason = record.date.season;
        
        if (recordYear > endYear || (recordYear === endYear && recordSeason > endSeason)) {
          return false;
        }
      }
      
      return true;
    });
  };
  
  // Fonction pour trier les enregistrements économiques
  const sortRecords = (records: EconomieRecord[], sort: EconomieSort): EconomieRecord[] => {
    return [...records].sort((a, b) => {
      const field = sort.field;
      
      // Tri spécial pour les dates du jeu
      if (field === 'date') {
        const yearA = a.date.year;
        const yearB = b.date.year;
        
        const seasonOrder: Record<string, number> = {
          'SPRING': 0,
          'SUMMER': 1,
          'AUTUMN': 2,
          'WINTER': 3
        };
        
        const seasonA = seasonOrder[a.date.season];
        const seasonB = seasonOrder[b.date.season];
        
        if (yearA !== yearB) {
          return sort.direction === 'asc' ? yearA - yearB : yearB - yearA;
        }
        
        return sort.direction === 'asc' ? seasonA - seasonB : seasonB - seasonA;
      }
      
      // Tri pour les champs simples
      const valueA = a[field];
      const valueB = b[field];
      
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sort.direction === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sort.direction === 'asc' ? valueA - valueB : valueB - valueA;
      }
      
      return 0;
    });
  };
  
  // Obtenir les enregistrements filtrés et triés
  const filteredAndSortedRecords = useMemo(() => {
    const filtered = filterRecords(economieRecords, filter);
    return sortRecords(filtered, sort);
  }, [economieRecords, filter, sort]);
  
  // Fonctions de gestion des filtres et du tri
  const handleFilterChange = (newFilter: EconomieFilter) => {
    setFilter(newFilter);
  };
  
  const handleResetFilters = () => {
    setFilter(DEFAULT_FILTER);
  };
  
  const handleSortChange = (field: keyof EconomieRecord) => {
    setSort(prevSort => ({
      field,
      direction: prevSort.field === field && prevSort.direction === 'asc' ? 'desc' : 'asc'
    }));
  };
  
  // Fonctions de gestion des transactions
  const handleAddTransaction = () => {
    setSelectedRecord(undefined);
    setIsModalOpen(true);
  };
  
  const handleEditTransaction = (id: string) => {
    const record = economieRecords.find(r => r.id === id);
    if (record) {
      setSelectedRecord(record);
      setIsModalOpen(true);
    }
  };
  
  const handleDeleteTransaction = (id: string) => {
    deleteEconomieRecord(id);
    toast.success('Transaction supprimée avec succès');
  };
  
  const handleSaveTransaction = (data: EconomieCreationData) => {
    if (selectedRecord) {
      updateEconomieRecord(selectedRecord.id, data);
      toast.success('Transaction mise à jour avec succès');
    } else {
      addEconomieRecord(data);
      toast.success('Transaction ajoutée avec succès');
    }
    setIsModalOpen(false);
  };
  
  // Fonctions de rapports et projections
  const handleGenerateReport = () => {
    setIsReportOpen(true);
  };
  
  const handleCalculateProjections = () => {
    setIsProjectionOpen(true);
  };
  
  // Fonction de mise à jour du trésor
  const updateTreasuryBalance = (newBalance: number) => {
    setTreasury(prev => ({
      ...prev,
      balance: newBalance
    }));
  };
  
  // Fonction de rafraîchissement des données
  const handleRefreshData = () => {
    // Calculer le solde du trésor en fonction des transactions
    const totalIncome = economieRecords
      .filter(r => r.type === 'income')
      .reduce((sum, r) => sum + r.amount, 0);
      
    const totalExpenses = economieRecords
      .filter(r => r.type === 'expense')
      .reduce((sum, r) => sum + r.amount, 0);
      
    updateTreasuryBalance(totalIncome - totalExpenses);
    toast.success('Données économiques actualisées');
  };
  
  return {
    economieRecords: filteredAndSortedRecords,
    filter,
    sort,
    isModalOpen,
    selectedRecord,
    isReportOpen,
    isProjectionOpen,
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
    setIsModalOpen,
    setIsReportOpen,
    setIsProjectionOpen,
    updateTreasuryBalance
  };
};
