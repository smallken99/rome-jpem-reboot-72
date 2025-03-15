
import { useState, useCallback, useEffect } from 'react';
import { useMaitreJeu } from '../context';
import { getTreasuryData, updateTreasuryData } from '@/data/db/republic';

interface TaxRate {
  id: string;
  name: string;
  description: string;
  rate: number;
  appliesTo: string[];
  minIncome?: number;
  maxIncome?: number;
  enabled: boolean;
  expectedRevenue: number;
  lastCollected?: Date;
}

interface TaxCollectionEvent {
  id: string;
  date: Date;
  taxId: string;
  taxName: string;
  amountCollected: number;
  collectionRate: number; // % of expected that was collected
  province?: string;
}

export const useTaxManagement = () => {
  const [taxRates, setTaxRates] = useState<TaxRate[]>([
    {
      id: 'tributum',
      name: 'Tributum',
      description: 'Impôt direct sur les citoyens romains',
      rate: 5,
      appliesTo: ['citizens', 'patricians', 'plebeians'],
      enabled: true,
      expectedRevenue: 1200000
    },
    {
      id: 'portoria',
      name: 'Portoria',
      description: 'Droits de douane sur les marchandises',
      rate: 8,
      appliesTo: ['trade', 'imports', 'exports'],
      enabled: true,
      expectedRevenue: 800000
    },
    {
      id: 'vectigalia',
      name: 'Vectigalia',
      description: 'Taxes sur les terres publiques',
      rate: 10,
      appliesTo: ['public_land', 'agriculture'],
      enabled: true,
      expectedRevenue: 600000
    },
    {
      id: 'scriptura',
      name: 'Scriptura',
      description: 'Taxe sur les pâturages',
      rate: 12,
      appliesTo: ['livestock', 'pasture'],
      enabled: true,
      expectedRevenue: 350000
    },
    {
      id: 'decumae',
      name: 'Decumae',
      description: 'Dîme sur les récoltes',
      rate: 10,
      appliesTo: ['agriculture', 'provinces'],
      enabled: true,
      expectedRevenue: 450000
    }
  ]);
  
  const [taxCollections, setTaxCollections] = useState<TaxCollectionEvent[]>([]);
  const [treasuryData, setTreasuryData] = useState(getTreasuryData());
  
  const { addEconomieRecord, currentYear, currentSeason } = useMaitreJeu();
  
  // Load treasury data
  useEffect(() => {
    const data = getTreasuryData();
    setTreasuryData(data);
  }, []);
  
  // Update tax rate
  const updateTaxRate = useCallback((taxId: string, updates: Partial<TaxRate>) => {
    setTaxRates(prev => prev.map(tax => 
      tax.id === taxId ? { ...tax, ...updates } : tax
    ));
  }, []);
  
  // Enable/disable a tax
  const toggleTaxEnabled = useCallback((taxId: string, enabled: boolean) => {
    updateTaxRate(taxId, { enabled });
  }, [updateTaxRate]);
  
  // Calculate expected tax revenue for all enabled taxes
  const calculateExpectedRevenue = useCallback(() => {
    return taxRates
      .filter(tax => tax.enabled)
      .reduce((sum, tax) => sum + tax.expectedRevenue, 0);
  }, [taxRates]);
  
  // Collect a specific tax
  const collectTax = useCallback((taxId: string) => {
    const tax = taxRates.find(t => t.id === taxId);
    if (!tax || !tax.enabled) return false;
    
    // Calculate collection efficiency (80-95% random)
    const collectionEfficiency = 0.8 + (Math.random() * 0.15);
    const collectedAmount = Math.round(tax.expectedRevenue * collectionEfficiency);
    
    // Record the collection event
    const collectionEvent: TaxCollectionEvent = {
      id: `tax-collection-${Date.now()}`,
      date: new Date(),
      taxId: tax.id,
      taxName: tax.name,
      amountCollected: collectedAmount,
      collectionRate: Math.round(collectionEfficiency * 100)
    };
    
    setTaxCollections(prev => [collectionEvent, ...prev]);
    
    // Add to the treasury
    const updatedTreasury = {
      ...treasuryData,
      balance: treasuryData.balance + collectedAmount,
      taxCollection: {
        ...treasuryData.taxCollection,
        totalCollected: treasuryData.taxCollection.totalCollected + collectedAmount,
        byType: {
          ...treasuryData.taxCollection.byType,
          [tax.id]: (treasuryData.taxCollection.byType[tax.id] || 0) + collectedAmount
        }
      }
    };
    
    setTreasuryData(updatedTreasury);
    updateTreasuryData(updatedTreasury);
    
    // Record in economy
    addEconomieRecord({
      amount: collectedAmount,
      description: `Perception de ${tax.name}`,
      category: 'tax',
      type: 'income',
      date: new Date(),
      source: 'Perception fiscale',
      tags: ['tax', 'revenue']
    });
    
    // Update the tax with last collected date
    updateTaxRate(taxId, { lastCollected: new Date() });
    
    return collectedAmount;
  }, [taxRates, treasuryData, addEconomieRecord, updateTaxRate]);
  
  // Collect all enabled taxes
  const collectAllTaxes = useCallback(() => {
    let totalCollected = 0;
    
    taxRates
      .filter(tax => tax.enabled)
      .forEach(tax => {
        const amount = collectTax(tax.id);
        if (amount) totalCollected += amount;
      });
    
    return totalCollected;
  }, [taxRates, collectTax]);
  
  // Calculate tax burden on population
  const calculateTaxBurden = useCallback(() => {
    const enabledTaxes = taxRates.filter(tax => tax.enabled);
    const totalRate = enabledTaxes.reduce((sum, tax) => sum + tax.rate, 0);
    const averageBurden = totalRate / enabledTaxes.length;
    
    return {
      averageBurden,
      patricianBurden: averageBurden * 0.8, // Patricians pay less due to exemptions
      plebeianBurden: averageBurden * 1.1, // Plebeians bear more of the burden
      provinceBurden: averageBurden * 1.3 // Provinces pay the most
    };
  }, [taxRates]);
  
  return {
    taxRates,
    taxCollections,
    treasuryData,
    updateTaxRate,
    toggleTaxEnabled,
    calculateExpectedRevenue,
    collectTax,
    collectAllTaxes,
    calculateTaxBurden,
    currentYear,
    currentSeason
  };
};
