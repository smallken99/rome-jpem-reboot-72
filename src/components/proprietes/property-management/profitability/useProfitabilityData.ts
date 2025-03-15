
import { useState, useEffect } from 'react';
import { 
  ProfitabilityData,
  PropertyProfitData,
  RevenueExpenseChartData,
  RevenueSourceData,
  PropertyTypeData,
  Recommendation,
  ChartViewType
} from './types/profitabilityTypes';

// Données fictives pour le développement
const generateMockData = (): Omit<ProfitabilityData, 'activeView' | 'setActiveView'> => {
  // Propriétés rentables
  const propertiesData: PropertyProfitData[] = [
    { id: 1, name: 'Villa Pompei', type: 'Résidence de luxe', revenue: 12000, expenses: 4500, profit: 7500, profitMargin: 62.5, roi: 12.5 },
    { id: 2, name: 'Ferme de Tusculum', type: 'Domaine agricole', revenue: 8500, expenses: 3200, profit: 5300, profitMargin: 62.4, roi: 10.6 },
    { id: 3, name: 'Oliveraie de Campanie', type: 'Plantation', revenue: 6700, expenses: 2800, profit: 3900, profitMargin: 58.2, roi: 9.8 },
    { id: 4, name: 'Vignoble de Falerne', type: 'Vignoble', revenue: 7800, expenses: 3500, profit: 4300, profitMargin: 55.1, roi: 8.6 },
    { id: 5, name: 'Boutique du Forum', type: 'Commerce', revenue: 5200, expenses: 1800, profit: 3400, profitMargin: 65.4, roi: 13.6 }
  ];
  
  // Données de revenus et dépenses
  const revenueExpenseData: RevenueExpenseChartData[] = [
    { name: 'Jan', revenue: 18500, expenses: 8200, profit: 10300, month: 'Jan' },
    { name: 'Fév', revenue: 17800, expenses: 8000, profit: 9800, month: 'Fév' },
    { name: 'Mar', revenue: 19200, expenses: 8300, profit: 10900, month: 'Mar' },
    { name: 'Avr', revenue: 20100, expenses: 8500, profit: 11600, month: 'Avr' },
    { name: 'Mai', revenue: 21000, expenses: 8800, profit: 12200, month: 'Mai' },
    { name: 'Juin', revenue: 22300, expenses: 9100, profit: 13200, month: 'Juin' },
    { name: 'Juil', revenue: 24500, expenses: 9300, profit: 15200, month: 'Juil' },
    { name: 'Aoû', revenue: 26000, expenses: 9500, profit: 16500, month: 'Aoû' },
    { name: 'Sep', revenue: 24800, expenses: 9200, profit: 15600, month: 'Sep' },
    { name: 'Oct', revenue: 23500, expenses: 9000, profit: 14500, month: 'Oct' },
    { name: 'Nov', revenue: 21800, expenses: 8700, profit: 13100, month: 'Nov' },
    { name: 'Déc', revenue: 20500, expenses: 8500, profit: 12000, month: 'Déc' }
  ];
  
  // Sources de revenus
  const revenueSources: RevenueSourceData[] = [
    { name: 'Agriculture', value: 45000, percent: 35, source: 'Agriculture', percentage: 35 },
    { name: 'Viticulture', value: 30000, percent: 23, source: 'Viticulture', percentage: 23 },
    { name: 'Résidences', value: 25000, percent: 19, source: 'Résidences', percentage: 19 },
    { name: 'Commerce', value: 15000, percent: 12, source: 'Commerce', percentage: 12 },
    { name: 'Élevage', value: 10000, percent: 8, source: 'Élevage', percentage: 8 },
    { name: 'Autres', value: 5000, percent: 3, source: 'Autres', percentage: 3 }
  ];
  
  // Types de propriétés
  const propertyTypes: PropertyTypeData[] = [
    { name: 'Domaines agricoles', count: 3, revenue: 120000, percent: 40, type: 'Domaines agricoles', value: 120000, percentage: 40 },
    { name: 'Résidences urbaines', count: 2, revenue: 90000, percent: 30, type: 'Résidences urbaines', value: 90000, percentage: 30 },
    { name: 'Vignobles', count: 1, revenue: 45000, percent: 15, type: 'Vignobles', value: 45000, percentage: 15 },
    { name: 'Commerces', count: 2, revenue: 30000, percent: 10, type: 'Commerces', value: 30000, percentage: 10 },
    { name: 'Entrepôts', count: 1, revenue: 15000, percent: 5, type: 'Entrepôts', value: 15000, percentage: 5 }
  ];
  
  // Recommandations d'optimisation
  const recommendations: Recommendation[] = [
    { 
      id: "1", 
      title: "Augmenter la production d'oliveraie",
      property: 'Oliveraie de Campanie', 
      action: 'Augmenter la production', 
      impact: 'high', 
      description: 'Intensifier la plantation d\'oliviers dans les zones non utilisées pourrait augmenter la production de 20%.',
      estimatedBenefit: 2000 
    },
    { 
      id: "2", 
      title: "Élargir la gamme de produits",
      property: 'Boutique du Forum', 
      action: 'Élargir la gamme de produits', 
      impact: 'medium', 
      description: 'Ajouter des produits de luxe importés permettrait d\'attirer une clientèle plus aisée.',
      estimatedBenefit: 1200 
    },
    { 
      id: "3", 
      title: "Réduire les coûts de main-d'œuvre",
      property: 'Ferme de Tusculum', 
      action: 'Réduire les coûts de main-d\'œuvre', 
      impact: 'low', 
      description: 'Acquérir 3 esclaves supplémentaires réduirait les coûts à long terme.',
      estimatedBenefit: 800 
    }
  ];

  // Calculate totals
  const totalRevenue = propertiesData.reduce((sum, prop) => sum + prop.revenue, 0);
  const totalExpenses = propertiesData.reduce((sum, prop) => sum + prop.expenses, 0);
  const totalProfit = totalRevenue - totalExpenses;
  const profitMargin = (totalProfit / totalRevenue) * 100;
  const roi = (totalProfit / totalExpenses) * 100;
  
  // Find most and least profitable properties
  const mostProfitable = [...propertiesData].sort((a, b) => b.profit - a.profit)[0] || null;
  const leastProfitable = [...propertiesData].sort((a, b) => a.profit - b.profit)[0] || null;
  
  return {
    totalRevenue,
    totalExpenses,
    totalProfit,
    profitMargin,
    roi,
    mostProfitable,
    leastProfitable,
    timeSeriesData: revenueExpenseData,
    propertiesData,
    revenueSources,
    propertyTypes,
    recommendations,
    // Aliases for compatibility
    profitableProperties: propertiesData,
    revenueExpenseData,
    optimizationRecommendations: recommendations
  };
};

export const useProfitabilityData = (): ProfitabilityData => {
  const [data, setData] = useState<Omit<ProfitabilityData, 'activeView' | 'setActiveView'>>(generateMockData());
  const [activeView, setActiveView] = useState<ChartViewType>('monthly');
  
  // Dans une application réelle, nous chargerions les données depuis une API
  useEffect(() => {
    // Simulation d'un chargement de données
    const timer = setTimeout(() => {
      setData(generateMockData());
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return {
    ...data,
    activeView,
    setActiveView
  };
};
