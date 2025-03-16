
import { useState, useEffect, useCallback } from 'react';
import { useMaitreJeu } from '../context/MaitreJeuContext';
import { EconomieRecord, TreasuryStatus, EconomieCategory } from '../types/economie';
import { GameDate } from '../types/common';
import { formatCurrency } from '@/utils/currencyUtils';
import { useToast } from '@/components/ui/use-toast';

// Define necessary interfaces for tax management
interface TaxType {
  id: string;
  name: string;
  rate: number;
  description: string;
  targetGroup: string;
  collectingInterval: 'yearly' | 'monthly' | 'seasonal';
  expectedRevenue: number;
  lastCollected?: GameDate;
  isActive: boolean;
}

interface TaxCollection {
  totalCollected: number;
  byType: Record<string, number>;
}

interface TreasuryData {
  balance: number;
  taxCollection: number; // The basic property expected by the application
}

// Extended treasury data with structured tax collection
interface TreasuryDataWithTax extends Omit<TreasuryData, 'taxCollection'> {
  taxCollection: TaxCollection;
}

export const useTaxManagement = () => {
  const { 
    treasury, 
    setTreasury, 
    economieRecords, 
    setEconomieRecords,
    currentYear, 
    currentSeason 
  } = useMaitreJeu();
  
  const [taxTypes, setTaxTypes] = useState<TaxType[]>([]);
  const [taxRates, setTaxRates] = useState<Record<string, number>>({});
  const [taxHistory, setTaxHistory] = useState<EconomieRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  
  // Filter tax records from economie records
  useEffect(() => {
    const taxRecords = economieRecords.filter(record => 
      record.type === 'tax' || record.type === 'income' && record.source.toLowerCase().includes('taxe')
    );
    setTaxHistory(taxRecords);
  }, [economieRecords]);
  
  // Initialize tax types (normally would come from API)
  useEffect(() => {
    // Example tax types
    const initialTaxTypes: TaxType[] = [
      {
        id: "1",
        name: "Taxe foncière",
        rate: 5,
        description: "Taxe sur les propriétés",
        targetGroup: "Propriétaires",
        collectingInterval: "yearly",
        expectedRevenue: 100000,
        isActive: true
      },
      {
        id: "2",
        name: "Taxe commerciale",
        rate: 8,
        description: "Taxe sur les activités commerciales",
        targetGroup: "Commerçants",
        collectingInterval: "seasonal",
        expectedRevenue: 75000,
        isActive: true
      },
      {
        id: "3",
        name: "Capitation",
        rate: 2,
        description: "Taxe par citoyen",
        targetGroup: "Citoyens",
        collectingInterval: "yearly",
        expectedRevenue: 120000,
        isActive: true
      }
    ];
    
    setTaxTypes(initialTaxTypes);
    
    // Initialize tax rates map
    const rates: Record<string, number> = {};
    initialTaxTypes.forEach(tax => {
      rates[tax.id] = tax.rate;
    });
    setTaxRates(rates);
  }, []);
  
  // Calculate tax statistics
  const getTaxStatistics = useCallback(() => {
    if (!taxHistory.length) return null;
    
    const currentYearTaxes = taxHistory.filter(record => {
      if (typeof record.date === 'object' && 'year' in record.date) {
        return record.date.year === currentYear;
      }
      return false;
    });
    
    const totalCollected = currentYearTaxes.reduce((sum, record) => sum + record.amount, 0);
    
    // Group by type/category
    const byType: Record<string, number> = {};
    currentYearTaxes.forEach(record => {
      const category = record.category;
      byType[category] = (byType[category] || 0) + record.amount;
    });
    
    return {
      totalCollected,
      byType
    } as TaxCollection;
  }, [taxHistory, currentYear]);
  
  // Convert to TreasuryDataWithTax for internal use
  const getTreasuryWithTaxData = useCallback((): TreasuryDataWithTax => {
    const taxStats = getTaxStatistics() || { totalCollected: 0, byType: {} };
    
    // Cast the treasury to the required type
    const treasuryData = treasury as unknown as TreasuryData;
    
    return {
      balance: treasuryData.balance,
      taxCollection: taxStats
    };
  }, [treasury, getTaxStatistics]);
  
  // Update tax rate
  const updateTaxRate = useCallback((taxId: string, newRate: number) => {
    setTaxTypes(prev => prev.map(tax => 
      tax.id === taxId ? { ...tax, rate: newRate } : tax
    ));
    
    setTaxRates(prev => ({ ...prev, [taxId]: newRate }));
    
    toast({
      title: "Taux de taxe mis à jour",
      description: `Le nouveau taux est de ${newRate}%`,
    });
  }, [toast]);
  
  // Collect taxes
  const collectTaxes = useCallback((taxId?: string) => {
    setIsLoading(true);
    
    // Determine which taxes to collect
    const taxesToCollect = taxId 
      ? taxTypes.filter(tax => tax.id === taxId && tax.isActive)
      : taxTypes.filter(tax => tax.isActive);
    
    if (taxesToCollect.length === 0) {
      toast({
        title: "Aucune taxe à collecter",
        description: "Vérifiez les taxes actives ou sélectionnez une taxe spécifique",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    
    // Calculate total tax to collect
    let totalTaxes = 0;
    const collectionByType: Record<string, number> = {};
    
    taxesToCollect.forEach(tax => {
      // Calculate actual collected amount (with some randomization for simulation)
      const collectionEfficiency = 0.8 + Math.random() * 0.4; // Between 80% and 120%
      const collectedAmount = Math.floor(tax.expectedRevenue * (tax.rate / 100) * collectionEfficiency);
      
      totalTaxes += collectedAmount;
      collectionByType[tax.id] = collectedAmount;
      
      // Create tax record in economy
      const economieRecord: EconomieRecord = {
        id: `tax-${Date.now()}-${tax.id}`,
        date: { year: currentYear, season: currentSeason },
        source: "Collecte fiscale",
        category: "Impôts" as EconomieCategory,
        amount: collectedAmount,
        description: `Collecte de ${tax.name} (${tax.rate}%)`,
        type: "income",
        isRecurring: true,
        recurringInterval: "seasonal",
        tags: ["taxes", tax.targetGroup.toLowerCase()],
        approved: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setEconomieRecords(prev => [economieRecord, ...prev]);
    });
    
    // Update treasury
    const taxCollection = {
      totalCollected: totalTaxes,
      byType: collectionByType
    };
    
    // Convert to the basic property expected by the base structure
    setTreasury(prev => ({
      ...prev,
      balance: prev.balance + totalTaxes,
      income: prev.income + totalTaxes,
      totalIncome: prev.totalIncome + totalTaxes
    }));
    
    toast({
      title: "Taxes collectées avec succès",
      description: `${formatCurrency(totalTaxes)} ont été ajoutés au trésor public.`,
    });
    
    setIsLoading(false);
  }, [taxTypes, currentYear, currentSeason, setEconomieRecords, setTreasury, toast]);
  
  return {
    taxTypes,
    taxRates,
    taxHistory,
    isLoading,
    treasuryWithTaxData: getTreasuryWithTaxData(),
    updateTaxRate,
    collectTaxes,
    getTaxStatistics
  };
};
