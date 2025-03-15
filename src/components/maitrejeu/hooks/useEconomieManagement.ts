
import { useState, useEffect } from 'react';
import { useMaitreJeu } from '../context';
import { 
  EconomieRecord, 
  EconomieFilter, 
  EconomieSort, 
  EconomieCreationData 
} from '../types/economie';
import { v4 as uuidv4 } from 'uuid';

export const useEconomieManagement = () => {
  const { 
    economieRecords, 
    setEconomieRecords,
    treasury, 
    setTreasury,
    economicFactors, 
    setEconomicFactors,
    currentSeason,
    currentYear
  } = useMaitreJeu();

  // État local pour les filtres, le tri et le modal
  const [filter, setFilter] = useState<EconomieFilter>({
    searchTerm: '',
    type: 'all'
  });
  
  const [sort, setSort] = useState<EconomieSort>({
    field: 'date',
    direction: 'desc'
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<EconomieRecord | null>(null);

  // Filtrer les enregistrements économiques
  const filteredRecords = economieRecords.filter(record => {
    // Filtre par terme de recherche
    if (filter.searchTerm && !record.description.toLowerCase().includes(filter.searchTerm.toLowerCase())) {
      return false;
    }

    // Filtre par type
    if (filter.type && filter.type !== 'all' && record.type !== filter.type) {
      return false;
    }

    // Filtre par catégorie
    if (filter.categories && filter.categories.length > 0 && !filter.categories.includes(record.category)) {
      return false;
    }

    // Filtre par montant
    if (filter.minAmount !== undefined && record.amount < filter.minAmount) {
      return false;
    }
    if (filter.maxAmount !== undefined && record.amount > filter.maxAmount) {
      return false;
    }

    // Filtre par entité affectée
    if (filter.affectedEntity) {
      const hasMatchingEntity = 
        (record.affectedSenateurId === filter.affectedEntity) || 
        (record.affectedProvinceId === filter.affectedEntity);
      
      if (!hasMatchingEntity) {
        return false;
      }
    }

    // Filtre par plage de dates
    if (filter.dateRange?.start && filter.dateRange?.end) {
      // Logique pour vérifier si la date est dans la plage
      // Cette logique dépendra de la façon dont les dates sont stockées
      // Pour l'instant, nous allons simplement laisser passer tous les enregistrements
    }

    return true;
  });

  // Trier les enregistrements filtrés
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    const fieldA = a[sort.field as keyof EconomieRecord];
    const fieldB = b[sort.field as keyof EconomieRecord];
    
    // Traitement spécial pour les dates
    if (sort.field === 'date') {
      const dateA = typeof a.date === 'string' ? a.date : `${a.date.year}-${a.date.season}`;
      const dateB = typeof b.date === 'string' ? b.date : `${b.date.year}-${b.date.season}`;
      
      return sort.direction === 'asc' 
        ? dateA.localeCompare(dateB) 
        : dateB.localeCompare(dateA);
    }
    
    // Traitement pour les autres champs
    if (typeof fieldA === 'string' && typeof fieldB === 'string') {
      return sort.direction === 'asc' 
        ? fieldA.localeCompare(fieldB) 
        : fieldB.localeCompare(fieldA);
    }
    
    // Champs numériques
    if (typeof fieldA === 'number' && typeof fieldB === 'number') {
      return sort.direction === 'asc' 
        ? fieldA - fieldB 
        : fieldB - fieldA;
    }
    
    return 0;
  });

  // Gestionnaires d'événements
  const handleFilterChange = (key: string, value: any) => {
    setFilter(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilter({
      searchTerm: '',
      type: 'all'
    });
  };

  const handleSortChange = (field: string) => {
    setSort(prev => ({
      field: field as 'date' | 'amount' | 'category' | 'source' | 'description',
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
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
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette transaction ?')) {
      const updatedRecords = economieRecords.filter(record => record.id !== id);
      setEconomieRecords(updatedRecords);
      recalculateTreasury(updatedRecords);
    }
  };

  const handleSaveTransaction = (data: EconomieCreationData) => {
    if (selectedRecord) {
      // Mise à jour d'une transaction existante
      const updatedRecords = economieRecords.map(record => 
        record.id === selectedRecord.id ? { ...record, ...data } : record
      );
      setEconomieRecords(updatedRecords);
      recalculateTreasury(updatedRecords);
    } else {
      // Ajout d'une nouvelle transaction
      const newRecord: EconomieRecord = {
        id: uuidv4(),
        ...data,
        approved: data.approved || true,
        tags: data.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const updatedRecords = [...economieRecords, newRecord];
      setEconomieRecords(updatedRecords);
      recalculateTreasury(updatedRecords);
    }
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  // Recalculer le trésor après des modifications
  const recalculateTreasury = (records: EconomieRecord[]) => {
    const totalIncome = records
      .filter(record => record.type === 'income')
      .reduce((sum, record) => sum + record.amount, 0);
      
    const totalExpenses = records
      .filter(record => record.type === 'expense')
      .reduce((sum, record) => sum + record.amount, 0);
      
    const balance = totalIncome - totalExpenses;
    
    setTreasury({
      ...treasury,
      totalIncome,
      totalExpenses,
      balance: treasury.balance + balance,
      lastUpdated: { year: currentYear, season: currentSeason }
    });
  };

  // Fonctions supplémentaires
  const handleGenerateReport = () => {
    console.log('Generating economic report...');
    // Logique pour générer un rapport économique
  };

  const handleCalculateProjections = () => {
    console.log('Calculating economic projections...');
    // Logique pour calculer des projections économiques
  };

  const handleRefreshData = () => {
    console.log('Refreshing economic data...');
    // Logique pour rafraîchir les données économiques
  };

  // Effet pour la mise à jour des facteurs économiques
  useEffect(() => {
    setEconomicFactors({
      ...economicFactors,
      currentYear,
      currentSeason
    });
  }, [currentYear, currentSeason]);

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

export default useEconomieManagement;
