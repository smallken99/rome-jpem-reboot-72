
import { v4 as uuidv4 } from 'uuid';
import { EconomieRecord, EconomieCreationData, TreasuryStatus, EconomicFactors, ECONOMIE_SOURCE } from '../types/economie';
import { GameDate, stringToGameDate } from '../types/common';

// Crée les opérations pour la gestion de l'économie par le MJ
export const createEconomieOperations = (
  setEconomieRecords: React.Dispatch<React.SetStateAction<EconomieRecord[]>>
) => {
  // Ajouter un nouvel enregistrement économique
  const addEconomieRecord = (data: EconomieCreationData): string => {
    const newRecord: EconomieRecord = {
      id: uuidv4(),
      amount: data.amount,
      category: data.category,
      description: data.description,
      date: data.date || new Date(),
      source: data.source || ECONOMIE_SOURCE.MANUAL_ENTRY,
      approvedBy: data.approvedBy,
      tags: data.tags || [],
      type: data.type,
      recurring: data.recurring || data.isRecurring || false,
      recurringInterval: data.recurringInterval,
      affectedSenateurId: data.affectedSenateurId,
      affectedProvinceId: data.affectedProvinceId,
      approved: data.approved !== undefined ? data.approved : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setEconomieRecords(prev => [newRecord, ...prev]);
    return newRecord.id;
  };
  
  // Mettre à jour un enregistrement existant
  const updateEconomieRecord = (id: string, updates: Partial<EconomieCreationData>) => {
    setEconomieRecords(prev => 
      prev.map(record => 
        record.id === id 
          ? { 
              ...record, 
              ...updates, 
              updatedAt: new Date().toISOString() 
            } 
          : record
      )
    );
  };
  
  // Supprimer un enregistrement
  const deleteEconomieRecord = (id: string) => {
    setEconomieRecords(prev => prev.filter(record => record.id !== id));
  };
  
  // Calculer le bilan économique
  const calculateEconomicBalance = (
    records: EconomieRecord[], 
    startDate?: GameDate | Date | string, 
    endDate?: GameDate | Date | string
  ) => {
    let filteredRecords = [...records];
    
    if (startDate) {
      const compareDate = typeof startDate === 'string' ? stringToGameDate(startDate) : startDate;
      filteredRecords = filteredRecords.filter(r => {
        const recordDate = typeof r.date === 'string' ? stringToGameDate(r.date as string) : r.date;
        
        if (recordDate instanceof Date && compareDate instanceof Date) {
          return recordDate >= compareDate;
        }
        
        // Comparaison de GameDate
        if (recordDate && 'year' in recordDate && compareDate && 'year' in compareDate) {
          if (recordDate.year > compareDate.year) return true;
          if (recordDate.year < compareDate.year) return false;
          
          // Même année, comparer la saison
          const seasonOrder: Record<string, number> = { 'SPRING': 0, 'SUMMER': 1, 'AUTUMN': 2, 'WINTER': 3 };
          return seasonOrder[recordDate.season] >= seasonOrder[compareDate.season];
        }
        
        return true;
      });
    }
    
    if (endDate) {
      const compareDate = typeof endDate === 'string' ? stringToGameDate(endDate as string) : endDate;
      filteredRecords = filteredRecords.filter(r => {
        const recordDate = typeof r.date === 'string' ? stringToGameDate(r.date as string) : r.date;
        
        if (recordDate instanceof Date && compareDate instanceof Date) {
          return recordDate <= compareDate;
        }
        
        // Comparaison de GameDate
        if (recordDate && 'year' in recordDate && compareDate && 'year' in compareDate) {
          if (recordDate.year < compareDate.year) return true;
          if (recordDate.year > compareDate.year) return false;
          
          // Même année, comparer la saison
          const seasonOrder: Record<string, number> = { 'SPRING': 0, 'SUMMER': 1, 'AUTUMN': 2, 'WINTER': 3 };
          return seasonOrder[recordDate.season] <= seasonOrder[compareDate.season];
        }
        
        return true;
      });
    }
    
    const totalIncome = filteredRecords
      .filter(r => r.amount > 0)
      .reduce((sum, r) => sum + r.amount, 0);
      
    const totalExpenses = filteredRecords
      .filter(r => r.amount < 0)
      .reduce((sum, r) => sum + Math.abs(r.amount), 0);
      
    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      recordCount: filteredRecords.length,
      categories: getCategorySummary(filteredRecords)
    };
  };
  
  // Obtenir un résumé par catégorie
  const getCategorySummary = (records: EconomieRecord[]) => {
    const categories: Record<string, { income: number; expenses: number }> = {};
    
    records.forEach(record => {
      if (!categories[record.category]) {
        categories[record.category] = { income: 0, expenses: 0 };
      }
      
      if (record.amount > 0) {
        categories[record.category].income += record.amount;
      } else {
        categories[record.category].expenses += Math.abs(record.amount);
      }
    });
    
    return categories;
  };
  
  // Calculer l'impact économique d'un événement
  const calculateEventEconomicImpact = (
    event: { 
      type: string; 
      severity: number; 
      duration: number;
      impactAreas: string[];
    },
    currentFactors: EconomicFactors
  ): Partial<EconomicFactors> => {
    // Créer une copie des facteurs actuels
    const updatedFactors: Partial<EconomicFactors> = {};
    const impactMultiplier = event.severity / 10; // 0.1 à 1.0
    
    // Appliquer les impacts selon les domaines affectés
    event.impactAreas.forEach(area => {
      switch (area) {
        case 'tax':
          updatedFactors.taxCollection = currentFactors.taxCollection * (1 - impactMultiplier * 0.2);
          break;
        case 'trade':
          updatedFactors.tradeRevenue = currentFactors.tradeRevenue * (1 - impactMultiplier * 0.3);
          break;
        case 'military':
          updatedFactors.militaryExpense = currentFactors.militaryExpense * (1 + impactMultiplier * 0.5);
          break;
        case 'province':
          updatedFactors.provinceRevenue = currentFactors.provinceRevenue * (1 - impactMultiplier * 0.25);
          break;
        case 'religion':
          updatedFactors.religiousCeremonyExpense = currentFactors.religiousCeremonyExpense * (1 + impactMultiplier * 0.2);
          break;
        case 'public':
          updatedFactors.publicWorksExpense = currentFactors.publicWorksExpense * (1 + impactMultiplier * 0.4);
          break;
        case 'war':
          updatedFactors.warSpoilsRevenue = currentFactors.warSpoilsRevenue * (1 + impactMultiplier);
          updatedFactors.militaryExpense = currentFactors.militaryExpense * (1 + impactMultiplier * 0.8);
          break;
        case 'admin':
          updatedFactors.adminExpense = currentFactors.adminExpense * (1 + impactMultiplier * 0.15);
          break;
      }
    });
    
    return updatedFactors;
  };
  
  // Simuler des projections économiques
  const simulateEconomicProjection = (
    currentFactors: EconomicFactors,
    seasons: number,
    events: Array<{ impact: Partial<EconomicFactors>; startSeason: number; duration: number }>
  ) => {
    // Copie profonde des facteurs pour éviter la mutation
    const projectedFactors: EconomicFactors[] = Array(seasons).fill(0).map(() => ({ ...currentFactors }));
    
    // Appliquer une tendance naturelle (croissance économique, inflation)
    for (let i = 0; i < seasons; i++) {
      projectedFactors[i].taxCollection *= (1 + 0.01); // +1% par saison
      projectedFactors[i].tradeRevenue *= (1 + 0.015); // +1.5% par saison
      projectedFactors[i].militaryExpense *= (1 + 0.02); // +2% par saison
      projectedFactors[i].adminExpense *= (1 + 0.01); // +1% par saison
    }
    
    // Appliquer les événements
    events.forEach(event => {
      const startIndex = Math.max(0, event.startSeason);
      const endIndex = Math.min(seasons - 1, startIndex + event.duration - 1);
      
      for (let i = startIndex; i <= endIndex; i++) {
        // Appliquer chaque impact à la projection de cette saison
        Object.entries(event.impact).forEach(([key, value]) => {
          // Type assertion nécessaire ici
          const economicKey = key as keyof EconomicFactors;
          if (typeof value === 'number') {
            (projectedFactors[i][economicKey] as number) = value;
          }
        });
      }
    });
    
    // Calculer les totaux et les soldes pour chaque saison
    const projections = projectedFactors.map((factors, index) => {
      const totalRevenue = factors.taxCollection + factors.provinceRevenue + 
                          factors.tradeRevenue + factors.warSpoilsRevenue;
      const totalExpenses = factors.militaryExpense + factors.publicWorksExpense + 
                            factors.religiousCeremonyExpense + factors.adminExpense;
      
      // Créer un objet date pour cette projection
      // Correction du typage ici:
      const year = currentFactors.currentYear || 721;
      const seasonIndex = index % 4;
      const seasonMap: Season[] = ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'];
      
      const dateInfo: GameDate = {
        year: Math.floor(year + index / 4),
        season: seasonMap[seasonIndex],
        day: 1
      };
      
      return {
        seasonIndex: index,
        date: dateInfo,
        factors: { ...factors },
        totalRevenue,
        totalExpenses,
        balance: totalRevenue - totalExpenses
      };
    });
    
    return projections;
  };
  
  return {
    addEconomieRecord,
    updateEconomieRecord,
    deleteEconomieRecord,
    calculateEconomicBalance,
    getCategorySummary,
    calculateEventEconomicImpact,
    simulateEconomicProjection
  };
};
