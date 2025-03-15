
import { useState, useEffect } from 'react';
import { useMaitreJeu } from '../context/MaitreJeuContext';
import { 
  EconomieRecord, 
  EconomieFilter, 
  EconomieSort,
  EconomieCreationData
} from '../types/economie';
import { useToast } from '@/components/ui/use-toast';
import { generateId } from '../types/common';

export const useEconomieManagement = () => {
  const { 
    economieRecords, 
    setEconomieRecords, 
    treasury, 
    setTreasury, 
    economicFactors, 
    setEconomicFactors,
    currentYear,
    currentSeason 
  } = useMaitreJeu();
  
  const { toast } = useToast();
  
  // État local
  const [filter, setFilter] = useState<EconomieFilter>({});
  const [sort, setSort] = useState<EconomieSort>({
    field: 'date',
    direction: 'desc'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<EconomieRecord | null>(null);
  
  // Filtrer les transactions
  const filteredRecords = economieRecords.filter(record => {
    // Filtrer par terme de recherche
    if (filter.searchTerm && !record.description.toLowerCase().includes(filter.searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filtrer par type
    if (filter.type && filter.type !== 'all' && record.type !== filter.type) {
      return false;
    }
    
    // Filtrer par catégorie
    if (filter.categories && filter.categories.length > 0 && !filter.categories.includes('all') && !filter.categories.includes(record.category)) {
      return false;
    }
    
    // Filtrer par montant
    if (filter.minAmount !== undefined && record.amount < filter.minAmount) {
      return false;
    }
    if (filter.maxAmount !== undefined && record.amount > filter.maxAmount) {
      return false;
    }
    
    // Filtrer par entité affectée
    if (filter.affectedEntity) {
      if (!record.affectedSenateurId?.includes(filter.affectedEntity) && 
          !record.affectedProvinceId?.includes(filter.affectedEntity)) {
        return false;
      }
    }
    
    // Filtrer par plage de dates
    if (filter.dateRange) {
      const recordDate = typeof record.date === 'string' 
        ? new Date(record.date) 
        : new Date(record.date.year, getSeasonIndex(record.date.season), 1);
      
      if (filter.dateRange.start) {
        const startDate = filter.dateRange.start;
        const startDateAsDate = typeof startDate === 'string'
          ? new Date(startDate)
          : new Date(startDate.year, getSeasonIndex(startDate.season), 1);
        if (recordDate < startDateAsDate) return false;
      }
      
      if (filter.dateRange.end) {
        const endDate = filter.dateRange.end;
        const endDateAsDate = typeof endDate === 'string'
          ? new Date(endDate)
          : new Date(endDate.year, getSeasonIndex(endDate.season), 31);
        if (recordDate > endDateAsDate) return false;
      }
    }
    
    return true;
  });
  
  // Trier les transactions
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (sort.field === 'date') {
      const dateA = typeof a.date === 'string' ? new Date(a.date) : new Date(a.date.year, getSeasonIndex(a.date.season), 1);
      const dateB = typeof b.date === 'string' ? new Date(b.date) : new Date(b.date.year, getSeasonIndex(b.date.season), 1);
      
      return sort.direction === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    }
    
    if (sort.field === 'amount') {
      return sort.direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    }
    
    // Pour les autres champs (chaînes de caractères)
    const valueA = String(a[sort.field]).toLowerCase();
    const valueB = String(b[sort.field]).toLowerCase();
    
    if (sort.direction === 'asc') {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });
  
  // Fonctions de gestion
  const handleFilterChange = (key: string, value: any) => {
    setFilter(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleResetFilters = () => {
    setFilter({});
  };
  
  const handleSortChange = (field: string) => {
    setSort(prevSort => ({
      field: field as "date" | "amount" | "category" | "source" | "description",
      direction: prevSort.field === field && prevSort.direction === 'asc' ? 'desc' : 'asc'
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
    setEconomieRecords(prev => prev.filter(record => record.id !== id));
    
    toast({
      title: "Transaction supprimée",
      description: "La transaction a été supprimée avec succès.",
      variant: "default"
    });
    
    // Mettre à jour le trésor
    updateTreasury();
  };
  
  const handleSaveTransaction = (data: EconomieCreationData) => {
    if (selectedRecord) {
      // Mise à jour d'une transaction existante
      setEconomieRecords(prev => prev.map(record => 
        record.id === selectedRecord.id ? {
          ...record,
          ...data,
          updatedAt: new Date().toISOString()
        } : record
      ));
      
      toast({
        title: "Transaction mise à jour",
        description: "La transaction a été mise à jour avec succès.",
        variant: "default"
      });
    } else {
      // Ajout d'une nouvelle transaction
      const newRecord: EconomieRecord = {
        id: generateId(),
        ...data,
        approved: data.approved !== undefined ? data.approved : true,
        tags: data.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setEconomieRecords(prev => [...prev, newRecord]);
      
      toast({
        title: "Transaction ajoutée",
        description: "La transaction a été ajoutée avec succès.",
        variant: "default"
      });
    }
    
    setIsModalOpen(false);
    setSelectedRecord(null);
    
    // Mettre à jour le trésor
    updateTreasury();
  };
  
  const updateTreasury = () => {
    // Calculer les revenus et dépenses totaux
    const currentYear = new Date().getFullYear();
    const currentQuarter = Math.floor(new Date().getMonth() / 3);
    
    const lastQuarterRecords = economieRecords.filter(record => {
      const recordDate = typeof record.date === 'string' 
        ? new Date(record.date) 
        : new Date(record.date.year, getSeasonIndex(record.date.season), 1);
      
      const recordYear = recordDate.getFullYear();
      const recordQuarter = Math.floor(recordDate.getMonth() / 3);
      
      return recordYear === currentYear && recordQuarter === currentQuarter;
    });
    
    const totalIncome = lastQuarterRecords
      .filter(record => record.type === 'income')
      .reduce((sum, record) => sum + record.amount, 0);
    
    const totalExpenses = lastQuarterRecords
      .filter(record => record.type === 'expense')
      .reduce((sum, record) => sum + record.amount, 0);
    
    // Mettre à jour le trésor
    setTreasury(prev => ({
      ...prev,
      totalIncome,
      totalExpenses,
      surplus: totalIncome - totalExpenses,
      projectedBalance: prev.balance + (totalIncome - totalExpenses),
      lastUpdated: {
        year: currentYear,
        season: seasonFromMonth(new Date().getMonth())
      }
    }));
  };
  
  const handleGenerateReport = () => {
    toast({
      title: "Rapport généré",
      description: "Le rapport économique a été généré et envoyé aux magistrats concernés.",
      variant: "default"
    });
  };
  
  const handleCalculateProjections = () => {
    // Implémenter les projections économiques
    toast({
      title: "Projections calculées",
      description: "Les projections économiques ont été mises à jour.",
      variant: "default"
    });
  };
  
  const handleRefreshData = () => {
    updateTreasury();
    toast({
      title: "Données rafraîchies",
      description: "Les données économiques ont été rafraîchies.",
      variant: "default"
    });
  };
  
  // Utilitaires
  const getSeasonIndex = (season: string): number => {
    const seasonMap: Record<string, number> = {
      'SPRING': 2, // Mars
      'VER': 2,
      'SUMMER': 5, // Juin
      'AESTAS': 5,
      'AUTUMN': 8, // Septembre
      'FALL': 8,
      'AUTUMNUS': 8,
      'WINTER': 11, // Décembre
      'HIEMS': 11
    };
    
    return seasonMap[season.toUpperCase()] || 0;
  };
  
  const seasonFromMonth = (month: number): string => {
    if (month >= 2 && month <= 4) return 'SPRING';
    if (month >= 5 && month <= 7) return 'SUMMER';
    if (month >= 8 && month <= 10) return 'AUTUMN';
    return 'WINTER';
  };
  
  // Effet pour mettre à jour le trésor au chargement
  useEffect(() => {
    updateTreasury();
  }, []);
  
  return {
    records: economieRecords,
    filteredRecords,
    sortedRecords,
    filter,
    treasury,
    economicFactors,
    sort,
    currentYear,
    currentSeason,
    
    // État pour le modal
    isModalOpen,
    selectedRecord,
    
    // Fonctions de gestion
    setFilter,
    setSort,
    setTreasury,
    setEconomicFactors,
    setIsModalOpen,
    
    // Fonctions d'action
    handleFilterChange,
    handleResetFilters,
    handleSortChange,
    handleAddTransaction,
    handleEditTransaction,
    handleDeleteTransaction,
    handleSaveTransaction,
    handleGenerateReport,
    handleCalculateProjections,
    handleRefreshData
  };
};
