
import { useState, useEffect } from 'react';
import { useMaitreJeu } from '../../context';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { 
  EconomieRecord, 
  EconomieCreationData, 
  EconomieFilter, 
  ECONOMIE_CATEGORIES,
  ECONOMIE_TYPES,
  ECONOMIE_SOURCE,
  RecurringInterval
} from '../../types/economie';
import { parseStringToGameDate } from '../../types/common';

export const useEconomieManagement = () => {
  // Use appropriate functions from context
  const { 
    economieRecords, 
    addEconomieRecord, 
    treasury,
    setTreasury, 
    currentDate 
  } = useMaitreJeu();
  
  const { toast } = useToast();
  
  // States for UI
  const [activeTab, setActiveTab] = useState('apercu');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<EconomieRecord | null>(null);
  const [filter, setFilter] = useState<EconomieFilter>({
    types: 'all',
    category: 'all',
    minAmount: 0,
    maxAmount: 1000000,
    showRecurring: true,
    showApproved: true
  });
  
  // Function to filter records
  const getFilteredRecords = () => {
    return economieRecords.filter(record => {
      // Filter by type
      if (filter.types !== 'all' && record.type !== filter.types) {
        return false;
      }
      
      // Filter by category
      if (filter.category !== 'all' && record.category !== filter.category) {
        return false;
      }
      
      // Filter by amount
      if (record.amount < (filter.minAmount || 0)) {
        return false;
      }
      
      if (filter.maxAmount && record.amount > filter.maxAmount) {
        return false;
      }
      
      // Filter by date range
      if (filter.startDate && filter.endDate) {
        const recordDate = typeof record.date === 'string' 
          ? new Date(record.date) 
          : record.date instanceof Date 
            ? record.date 
            : new Date();
        
        const startDate = typeof filter.startDate === 'string'
          ? new Date(filter.startDate)
          : filter.startDate instanceof Date
            ? filter.startDate
            : parseStringToGameDate(filter.startDate as string);
        
        const endDate = typeof filter.endDate === 'string'
          ? new Date(filter.endDate)
          : filter.endDate instanceof Date
            ? filter.endDate
            : parseStringToGameDate(filter.endDate as string);
            
        // Check if the record date is within range
        if (recordDate < startDate || recordDate > endDate) {
          return false;
        }
      }
      
      // Filter by source
      if (filter.source && record.source !== filter.source) {
        return false;
      }
      
      // Filter recurring transactions
      if (filter.showRecurring === false && record.recurring) {
        return false;
      }
      
      // Filter approved transactions
      if (filter.showApproved === false && record.approved) {
        return false;
      }
      
      return true;
    });
  };
  
  // Function to calculate statistics
  const calculateStats = () => {
    const records = getFilteredRecords();
    
    const totalIncome = records
      .filter(r => r.type === ECONOMIE_TYPES.INCOME)
      .reduce((sum, r) => sum + r.amount, 0);
      
    const totalExpenses = records
      .filter(r => r.type === ECONOMIE_TYPES.EXPENSE)
      .reduce((sum, r) => sum + r.amount, 0);
      
    const byCategory = Object.values(ECONOMIE_CATEGORIES).reduce((acc, category) => {
      if (category === 'all' || category === ECONOMIE_CATEGORIES.all) return acc;
      
      acc[category] = records
        .filter(r => r.category === category)
        .reduce((sum, r) => sum + r.amount, 0);
        
      return acc;
    }, {} as Record<string, number>);
    
    return {
      totalIncome,
      totalExpenses,
      byCategory
    };
  };
  
  // Function to handle new transaction
  const handleAddTransaction = (data: EconomieCreationData) => {
    // Create transaction record
    const newRecord: EconomieRecord = {
      id: uuidv4(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Add to records
    addEconomieRecord(newRecord);
    
    // Update treasury
    if (data.type === ECONOMIE_TYPES.INCOME) {
      setTreasury({
        ...treasury,
        balance: treasury.balance + data.amount,
        income: treasury.income + data.amount,
        surplus: treasury.surplus + data.amount
      });
      
      toast({
        title: "Revenus ajoutés",
        description: `${data.amount.toLocaleString()} As ajoutés au trésor`,
        variant: "default"
      });
    } else if (data.type === ECONOMIE_TYPES.EXPENSE) {
      setTreasury({
        ...treasury,
        balance: treasury.balance - data.amount,
        expenses: treasury.expenses + data.amount,
        surplus: treasury.surplus - data.amount
      });
      
      toast({
        title: "Dépense enregistrée",
        description: `${data.amount.toLocaleString()} As dépensés`,
        variant: "default"
      });
    }
    
    return newRecord.id;
  };
  
  return {
    economieRecords,
    treasury,
    currentDate,
    activeTab,
    setActiveTab,
    showAddModal,
    setShowAddModal,
    selectedRecord,
    setSelectedRecord,
    filter,
    setFilter,
    getFilteredRecords,
    calculateStats,
    handleAddTransaction
  };
};
