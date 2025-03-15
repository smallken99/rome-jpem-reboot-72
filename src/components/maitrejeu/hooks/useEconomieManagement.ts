
import { useState, useEffect, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  EconomieRecord, 
  EconomieCreationData, 
  EconomieFilter, 
  EconomieSort,
  TreasuryStatus,
  EconomicFactors
} from '../types/economie';
import { useMaitreJeu } from '../context/MaitreJeuContext';
import { GameDate } from '../types/common';

export const useEconomieManagement = () => {
  // Obtenir le contexte du jeu
  const { 
    economieRecords, 
    setEconomieRecords, 
    addEconomieRecord: addRecord,
    treasury, 
    setTreasury, 
    economicFactors, 
    setEconomicFactors,
    currentYear,
    currentSeason
  } = useMaitreJeu();

  // États
  const [filter, setFilter] = useState<EconomieFilter>({});
  const [sort, setSort] = useState<EconomieSort>({ field: 'date', direction: 'desc' });

  // Créer un nouvel enregistrement économique
  const createEconomieRecord = useCallback((data: EconomieCreationData) => {
    const id = addRecord(data);
    
    // Mettre à jour les facteurs économiques et le trésor en fonction du type d'enregistrement
    updateEconomicStats(data);
    
    return id;
  }, [addRecord]);

  // Mise à jour des statistiques économiques après une transaction
  const updateEconomicStats = useCallback((data: EconomieCreationData) => {
    // Mise à jour du trésor
    setTreasury(prev => {
      const amount = data.type === 'income' ? data.amount : -data.amount;
      return {
        ...prev,
        balance: prev.balance + amount,
        totalIncome: data.type === 'income' ? prev.totalIncome + data.amount : prev.totalIncome,
        totalExpenses: data.type === 'expense' ? prev.totalExpenses + data.amount : prev.totalExpenses,
        surplus: prev.surplus + amount,
        lastUpdated: { year: currentYear, season: currentSeason }
      };
    });
    
    // Mise à jour conditionnelle des facteurs économiques selon la catégorie
    setEconomicFactors(prev => {
      const updates: Partial<EconomicFactors> = {};
      
      if (data.category === 'tax' || data.category === 'Impôts') {
        updates.taxCollection = prev.taxCollection + (data.type === 'income' ? data.amount : 0);
      } else if (data.category === 'trade' || data.category === 'Commerce') {
        updates.tradeRevenue = prev.tradeRevenue + (data.type === 'income' ? data.amount : 0);
      } else if (data.category === 'military' || data.category === 'Armée') {
        updates.militaryExpense = prev.militaryExpense + (data.type === 'expense' ? data.amount : 0);
      }
      
      return { ...prev, ...updates };
    });
  }, [currentYear, currentSeason, setTreasury, setEconomicFactors]);

  // Transactions filtrées selon les critères actuels
  const filteredRecords = useMemo(() => {
    if (!economieRecords) return [];

    let results = [...economieRecords];
    
    // Filtrer par type
    if (filter.type && filter.type !== 'all') {
      results = results.filter(record => record.type === filter.type);
    }
    
    // Filtrer par catégories
    if (filter.categories && filter.categories.length > 0 && !filter.categories.includes('all')) {
      results = results.filter(record => filter.categories?.includes(record.category));
    }
    
    // Filtrer par montant
    if (filter.minAmount !== undefined) {
      results = results.filter(record => record.amount >= (filter.minAmount || 0));
    }
    if (filter.maxAmount !== undefined) {
      results = results.filter(record => record.amount <= (filter.maxAmount || Infinity));
    }
    
    // Filtrer par entité affectée
    if (filter.affectedEntity) {
      results = results.filter(record => 
        record.affectedSenateurId === filter.affectedEntity || 
        record.affectedProvinceId === filter.affectedEntity
      );
    }
    
    // Filtrer par plage de dates
    if (filter.dateRange?.start) {
      // Implémenter la logique de filtrage par date
      // Cette partie est plus complexe car il faut comparer les GameDate
    }
    
    // Filtrer par terme de recherche
    if (filter.searchTerm) {
      const searchLower = filter.searchTerm.toLowerCase();
      results = results.filter(record => 
        record.description.toLowerCase().includes(searchLower) ||
        record.category.toString().toLowerCase().includes(searchLower) ||
        record.source.toString().toLowerCase().includes(searchLower)
      );
    }
    
    return results;
  }, [economieRecords, filter]);

  // Transactions triées après filtrage
  const sortedRecords = useMemo(() => {
    if (!filteredRecords) return [];

    return [...filteredRecords].sort((a, b) => {
      // Trier par date
      if (sort.field === 'date') {
        // Convertir les dates en formats comparables
        const dateA = typeof a.date === 'string' ? a.date : `${a.date.year}-${a.date.season}`;
        const dateB = typeof b.date === 'string' ? b.date : `${b.date.year}-${b.date.season}`;
        
        return sort.direction === 'asc' 
          ? dateA.localeCompare(dateB) 
          : dateB.localeCompare(dateA);
      }
      
      // Trier par montant
      if (sort.field === 'amount') {
        return sort.direction === 'asc' 
          ? a.amount - b.amount 
          : b.amount - a.amount;
      }
      
      // Trier par description, catégorie ou source
      const aValue = String(a[sort.field]);
      const bValue = String(b[sort.field]);
      
      return sort.direction === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    });
  }, [filteredRecords, sort]);

  // Mettre à jour les critères de filtrage
  const updateFilter = useCallback((key: string, value: any) => {
    setFilter(prev => ({ ...prev, [key]: value }));
  }, []);

  // Réinitialiser les filtres
  const resetFilters = useCallback(() => {
    setFilter({});
  }, []);

  // Mettre à jour les critères de tri
  const updateSort = useCallback((field: string) => {
    setSort(prevSort => ({
      field: field as 'date' | 'amount' | 'category' | 'source' | 'description',
      direction: prevSort.field === field && prevSort.direction === 'asc' ? 'desc' : 'asc'
    }));
  }, []);

  // Génération de rapports financiers
  const generateFinancialReport = useCallback((startDate?: GameDate, endDate?: GameDate) => {
    // Filtrer les transactions par date si nécessaire
    let reportRecords = economieRecords;
    
    // Calcul des totaux
    const incomeByCategory: Record<string, number> = {};
    const expensesByCategory: Record<string, number> = {};
    let totalIncome = 0;
    let totalExpenses = 0;
    
    reportRecords.forEach(record => {
      if (record.type === 'income') {
        totalIncome += record.amount;
        incomeByCategory[record.category] = (incomeByCategory[record.category] || 0) + record.amount;
      } else if (record.type === 'expense') {
        totalExpenses += record.amount;
        expensesByCategory[record.category] = (expensesByCategory[record.category] || 0) + record.amount;
      }
    });
    
    return {
      treasury: { ...treasury },
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      incomeByCategory,
      expensesByCategory,
      economicFactors: { ...economicFactors },
      totalTransactions: reportRecords.length,
      reportDate: { year: currentYear, season: currentSeason }
    };
  }, [economieRecords, treasury, economicFactors, currentYear, currentSeason]);

  // Projection des revenus et dépenses futurs
  const generateFinancialProjection = useCallback((quarters: number = 4) => {
    // Analyser les transactions récurrentes
    const recurringIncome = economieRecords.filter(r => r.isRecurring && r.type === 'income');
    const recurringExpenses = economieRecords.filter(r => r.isRecurring && r.type === 'expense');
    
    // Calculer les moyennes d'entrées/sorties par saison
    const incomePerQuarter = recurringIncome.reduce((sum, record) => sum + record.amount, 0);
    const expensesPerQuarter = recurringExpenses.reduce((sum, record) => sum + record.amount, 0);
    
    // Prendre en compte d'autres facteurs (croissance, inflation, etc.)
    const growthRate = economicFactors.growthRate || 1.02;
    const inflationRate = economicFactors.inflationRate || 1.01;
    
    // Projections par trimestre
    const projections = [];
    let projectedBalance = treasury.balance;
    
    for (let i = 0; i < quarters; i++) {
      const quarterIncome = Math.round(incomePerQuarter * Math.pow(growthRate, i));
      const quarterExpenses = Math.round(expensesPerQuarter * Math.pow(inflationRate, i));
      
      projectedBalance += (quarterIncome - quarterExpenses);
      
      projections.push({
        quarter: i + 1,
        income: quarterIncome,
        expenses: quarterExpenses,
        balance: quarterIncome - quarterExpenses,
        cumulativeBalance: projectedBalance
      });
    }
    
    return {
      currentBalance: treasury.balance,
      projections,
      estimatedEndBalance: projectedBalance,
      growthAssumption: growthRate,
      inflationAssumption: inflationRate
    };
  }, [economieRecords, treasury, economicFactors]);

  return {
    records: economieRecords,
    filteredRecords,
    sortedRecords,
    filter,
    sort,
    treasury,
    economicFactors,
    currentYear,
    currentSeason,
    createEconomieRecord,
    updateFilter,
    resetFilters,
    updateSort,
    generateFinancialReport,
    generateFinancialProjection,
    setEconomieRecords,
    setTreasury,
    setEconomicFactors
  };
};
