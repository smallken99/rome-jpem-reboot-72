
import { useState, useCallback } from 'react';
import { useMaitreJeu } from '../../context';
import { EconomieRecord, EconomieCreationData, EconomieFilter, EconomieSort } from '../../types/economie';

export const useEconomieManagement = () => {
  const { 
    economieRecords, 
    setEconomieRecords, 
    addEconomieRecord,
    updateEconomieRecord,
    deleteEconomieRecord,
    treasury,
    economicFactors
  } = useMaitreJeu();
  
  // State for filtering and sorting
  const [filter, setFilter] = useState<EconomieFilter>({
    searchTerm: '',
    type: 'all'
  });
  
  const [sort, setSort] = useState<EconomieSort>({
    field: 'date',
    direction: 'desc'
  });
  
  // State for modal and selected record
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<EconomieRecord | null>(null);
  
  // Filter records
  const filteredRecords = useCallback(() => {
    return economieRecords.filter(record => {
      // Search term filter
      if (filter.searchTerm && !record.description.toLowerCase().includes(filter.searchTerm.toLowerCase())) {
        return false;
      }
      
      // Type filter
      if (filter.type !== 'all' && record.type !== filter.type) {
        return false;
      }
      
      // Categories filter
      if (filter.categories && filter.categories.length > 0 && !filter.categories.includes(record.category)) {
        return false;
      }
      
      // Amount range filter
      if (filter.minAmount !== undefined && Math.abs(record.amount) < filter.minAmount) {
        return false;
      }
      
      if (filter.maxAmount !== undefined && Math.abs(record.amount) > filter.maxAmount) {
        return false;
      }
      
      // Entity filter
      if (filter.affectedEntity) {
        if (record.affectedSenateurId && record.affectedSenateurId === filter.affectedEntity) {
          return true;
        }
        
        if (record.affectedProvinceId && record.affectedProvinceId === filter.affectedEntity) {
          return true;
        }
        
        return false;
      }
      
      return true;
    }).sort((a, b) => {
      if (sort.field === 'date') {
        // Handle date comparison
        const dateA = new Date(a.date instanceof Date ? a.date : String(a.date));
        const dateB = new Date(b.date instanceof Date ? b.date : String(b.date));
        
        return sort.direction === 'asc' 
          ? dateA.getTime() - dateB.getTime() 
          : dateB.getTime() - dateA.getTime();
      }
      
      if (sort.field === 'amount') {
        return sort.direction === 'asc' 
          ? a.amount - b.amount 
          : b.amount - a.amount;
      }
      
      // Handle string fields
      const valA = String(a[sort.field]);
      const valB = String(b[sort.field]);
      
      return sort.direction === 'asc' 
        ? valA.localeCompare(valB) 
        : valB.localeCompare(valA);
    });
  }, [economieRecords, filter, sort]);
  
  // Handle filter changes
  const handleFilterChange = (newFilter: Partial<EconomieFilter>) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
  };
  
  // Reset filters
  const handleResetFilters = () => {
    setFilter({
      searchTerm: '',
      type: 'all'
    });
  };
  
  // Handle sort changes
  const handleSortChange = (field: keyof EconomieRecord) => {
    setSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };
  
  // Open modal for adding a new transaction
  const handleAddTransaction = () => {
    setSelectedRecord(null);
    setIsModalOpen(true);
  };
  
  // Open modal for editing a transaction
  const handleEditTransaction = (record: EconomieRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };
  
  // Delete a transaction
  const handleDeleteTransaction = (id: string) => {
    deleteEconomieRecord(id);
  };
  
  // Save a transaction (add or update)
  const handleSaveTransaction = (data: EconomieCreationData) => {
    if (selectedRecord) {
      // Update existing record
      updateEconomieRecord(selectedRecord.id, data);
    } else {
      // Add new record
      addEconomieRecord(data);
    }
    
    setIsModalOpen(false);
  };
  
  // Generate a financial report
  const handleGenerateReport = () => {
    console.log('Generating financial report...');
    // Implementation would prepare a printable report of financial data
  };
  
  // Calculate economic projections
  const handleCalculateProjections = () => {
    console.log('Calculating economic projections...');
    // Implementation would show projections based on current economic factors
  };
  
  // Refresh economic data
  const handleRefreshData = () => {
    console.log('Refreshing economic data...');
    // Implementation would refresh data, possibly with updated calculations
  };
  
  return {
    economieRecords: filteredRecords(),
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
