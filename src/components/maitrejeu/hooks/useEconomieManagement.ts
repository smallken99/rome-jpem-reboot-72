
import { useState } from 'react';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { EconomieFilter, EconomieRecord, EconomieSort } from '@/components/maitrejeu/types/economie';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export const useEconomieManagement = () => {
  const { economieRecords, addEconomieRecord, updateEconomieRecord, deleteEconomieRecord } = useMaitreJeu();
  
  // États
  const [filter, setFilter] = useState<EconomieFilter>({
    type: 'all',
    category: 'all',
    dateRange: { start: null, end: null }
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
    if (filter.category !== 'all' && record.category !== filter.category) return false;
    if (filter.dateRange.start && record.date.year < filter.dateRange.start.year) return false;
    if (filter.dateRange.end && record.date.year > filter.dateRange.end.year) return false;
    return true;
  });
  
  // Trier les enregistrements
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    const direction = sort.direction === 'asc' ? 1 : -1;
    
    switch (sort.field) {
      case 'date':
        if (a.date.year !== b.date.year) {
          return (a.date.year - b.date.year) * direction;
        } else {
          const seasons = ['WINTER', 'SPRING', 'SUMMER', 'FALL'];
          const seasonA = seasons.indexOf(a.date.season);
          const seasonB = seasons.indexOf(b.date.season);
          return (seasonA - seasonB) * direction;
        }
      case 'amount':
        return (a.amount - b.amount) * direction;
      case 'category':
        return a.category.localeCompare(b.category) * direction;
      case 'source':
        return a.source.localeCompare(b.source) * direction;
      default:
        return 0;
    }
  });
  
  // Handlers
  const handleFilterChange = (newFilter: Partial<EconomieFilter>) => {
    setFilter({ ...filter, ...newFilter });
  };
  
  const handleResetFilters = () => {
    setFilter({
      type: 'all',
      category: 'all',
      dateRange: { start: null, end: null }
    });
  };
  
  const handleSortChange = (field: keyof EconomieSort['field']) => {
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
  
  const handleSaveTransaction = (data: Partial<EconomieRecord>) => {
    try {
      if (selectedRecord) {
        // Mise à jour d'un enregistrement existant
        updateEconomieRecord(selectedRecord.id, data);
        toast.success('Transaction mise à jour avec succès');
      } else {
        // Création d'un nouvel enregistrement
        const newRecord = {
          ...data,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
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
  
  const handleManageBuildings = () => {
    toast('Gestion des bâtiments', {
      description: 'Cette fonctionnalité permet de gérer les bâtiments publics et leurs revenus.',
      action: {
        label: 'Configurer',
        onClick: () => console.log('Configurer les bâtiments'),
      },
    });
  };
  
  const handleManageSlaves = () => {
    toast('Gestion des esclaves', {
      description: 'Cette fonctionnalité permet de gérer les esclaves publics et leurs coûts.',
      action: {
        label: 'Configurer',
        onClick: () => console.log('Configurer les esclaves'),
      },
    });
  };
  
  const handleManageTaxes = () => {
    toast('Gestion des impôts', {
      description: 'Cette fonctionnalité permet de gérer les taux d'imposition et leurs revenus.',
      action: {
        label: 'Configurer',
        onClick: () => console.log('Configurer les impôts'),
      },
    });
  };
  
  return {
    economieRecords: sortedRecords,
    filter,
    sort,
    isModalOpen,
    selectedRecord,
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
    handleManageBuildings,
    handleManageSlaves,
    handleManageTaxes,
    setIsModalOpen
  };
};
