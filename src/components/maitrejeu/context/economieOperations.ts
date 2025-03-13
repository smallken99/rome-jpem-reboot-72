
import { generateId } from '../types/common';
import { EconomieRecord, EconomieCreationData } from '../types/economie';

export const createEconomieOperations = (
  setEconomieRecords: React.Dispatch<React.SetStateAction<EconomieRecord[]>>
) => {
  // Ajouter un nouvel enregistrement économique
  const addEconomieRecord = (data: EconomieCreationData): string => {
    const id = generateId();
    const now = new Date();
    
    const newRecord: EconomieRecord = {
      id,
      date: {
        year: new Date().getFullYear() - 753, // AUC (Ab Urbe Condita) - année de fondation de Rome
        season: getCurrentSeason(),
      },
      ...data,
      createdAt: now,
      updatedAt: now
    };
    
    setEconomieRecords(prev => [newRecord, ...prev]);
    return id;
  };
  
  // Mettre à jour un enregistrement économique existant
  const updateEconomieRecord = (id: string, updates: Partial<EconomieCreationData>) => {
    setEconomieRecords(prev => 
      prev.map(record => 
        record.id === id 
          ? { 
              ...record, 
              ...updates, 
              updatedAt: new Date() 
            } 
          : record
      )
    );
  };
  
  // Supprimer un enregistrement économique
  const deleteEconomieRecord = (id: string) => {
    setEconomieRecords(prev => prev.filter(record => record.id !== id));
  };
  
  // Utilitaire pour obtenir la saison actuelle
  const getCurrentSeason = (): 'SPRING' | 'SUMMER' | 'AUTUMN' | 'WINTER' => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'SPRING';
    if (month >= 5 && month <= 7) return 'SUMMER';
    if (month >= 8 && month <= 10) return 'AUTUMN';
    return 'WINTER';
  };

  // Générer des rapports économiques
  const generateEconomicReport = (
    startYear: number,
    startSeason: string,
    endYear: number,
    endSeason: string,
    records: EconomieRecord[]
  ) => {
    // Filtrer les enregistrements dans la période
    const filteredRecords = records.filter(record => {
      if (record.date.year < startYear) return false;
      if (record.date.year > endYear) return false;
      
      // Même année que le début, vérifier la saison
      if (record.date.year === startYear && record.date.season < startSeason) return false;
      
      // Même année que la fin, vérifier la saison
      if (record.date.year === endYear && record.date.season > endSeason) return false;
      
      return true;
    });
    
    // Calculer les totaux
    const totalIncome = filteredRecords
      .filter(r => r.type === 'income')
      .reduce((sum, r) => sum + r.amount, 0);
      
    const totalExpenses = filteredRecords
      .filter(r => r.type === 'expense')
      .reduce((sum, r) => sum + r.amount, 0);
      
    // Calculer par catégorie
    const categories: Record<string, { income: number, expense: number }> = {};
    
    filteredRecords.forEach(record => {
      if (!categories[record.category]) {
        categories[record.category] = { income: 0, expense: 0 };
      }
      
      if (record.type === 'income') {
        categories[record.category].income += record.amount;
      } else {
        categories[record.category].expense += record.amount;
      }
    });
    
    return {
      period: {
        start: { year: startYear, season: startSeason },
        end: { year: endYear, season: endSeason }
      },
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      categories
    };
  };
  
  // Calculer l'impact économique d'un événement
  const calculateEventEconomicImpact = (
    eventType: string,
    baseAmount: number,
    treasuryBalance: number,
    inflationRate: number
  ): { income: number, expense: number, netImpact: number } => {
    let income = 0;
    let expense = 0;
    
    // Ajuster en fonction de l'inflation
    const inflationFactor = 1 + (inflationRate / 100);
    
    switch (eventType) {
      case 'guerre':
        expense = baseAmount * 1.5 * inflationFactor;
        break;
      case 'famine':
        expense = baseAmount * inflationFactor;
        // Le coût augmente si le trésor est bas
        if (treasuryBalance < baseAmount * 10) {
          expense *= 1.25;
        }
        break;
      case 'commerce':
        income = baseAmount * inflationFactor;
        // Les profits augmentent si le trésor est élevé (meilleure infrastructure)
        if (treasuryBalance > baseAmount * 20) {
          income *= 1.2;
        }
        break;
      case 'tribut':
        income = baseAmount * inflationFactor;
        break;
      default:
        // Événement générique
        const random = Math.random();
        if (random < 0.6) {
          expense = baseAmount * inflationFactor * (0.5 + random);
        } else {
          income = baseAmount * inflationFactor * random;
        }
    }
    
    return {
      income,
      expense,
      netImpact: income - expense
    };
  };
  
  // Gérer les impôts et revenus récurrents
  const processRecurringTransactions = (date: { year: number, season: string }, records: EconomieRecord[]) => {
    const recurringRecords = records.filter(r => r.isRecurring);
    const newTransactions: EconomieRecord[] = [];
    
    recurringRecords.forEach(record => {
      if (
        (record.recurringInterval === 'seasonal') ||
        (record.recurringInterval === 'yearly' && date.season === 'SPRING')
      ) {
        // Créer un nouvel enregistrement basé sur la transaction récurrente
        const now = new Date();
        const newRecord: EconomieRecord = {
          ...record,
          id: generateId(),
          date: { ...date },
          createdAt: now,
          updatedAt: now
        };
        
        newTransactions.push(newRecord);
      }
    });
    
    // Ajouter les nouvelles transactions
    if (newTransactions.length > 0) {
      setEconomieRecords(prev => [...newTransactions, ...prev]);
    }
    
    return newTransactions;
  };
  
  return {
    addEconomieRecord,
    updateEconomieRecord,
    deleteEconomieRecord,
    generateEconomicReport,
    calculateEventEconomicImpact,
    processRecurringTransactions
  };
};
