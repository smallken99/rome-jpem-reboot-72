
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
const generateMockData = (): ProfitabilityData => {
  // Propriétés rentables
  const profitableProperties: PropertyProfitData[] = [
    { id: 1, name: 'Villa Pompei', type: 'Résidence de luxe', revenue: 12000, expenses: 4500, profit: 7500, profitMargin: 62.5, roi: 12.5 },
    { id: 2, name: 'Ferme de Tusculum', type: 'Domaine agricole', revenue: 8500, expenses: 3200, profit: 5300, profitMargin: 62.4, roi: 10.6 },
    { id: 3, name: 'Oliveraie de Campanie', type: 'Plantation', revenue: 6700, expenses: 2800, profit: 3900, profitMargin: 58.2, roi: 9.8 },
    { id: 4, name: 'Vignoble de Falerne', type: 'Vignoble', revenue: 7800, expenses: 3500, profit: 4300, profitMargin: 55.1, roi: 8.6 },
    { id: 5, name: 'Boutique du Forum', type: 'Commerce', revenue: 5200, expenses: 1800, profit: 3400, profitMargin: 65.4, roi: 13.6 }
  ];
  
  // Données de revenus et dépenses
  const revenueExpenseData: RevenueExpenseChartData[] = [
    { month: 'Jan', revenue: 18500, expenses: 8200, profit: 10300 },
    { month: 'Fév', revenue: 17800, expenses: 8000, profit: 9800 },
    { month: 'Mar', revenue: 19200, expenses: 8300, profit: 10900 },
    { month: 'Avr', revenue: 20100, expenses: 8500, profit: 11600 },
    { month: 'Mai', revenue: 21000, expenses: 8800, profit: 12200 },
    { month: 'Juin', revenue: 22300, expenses: 9100, profit: 13200 },
    { month: 'Juil', revenue: 24500, expenses: 9300, profit: 15200 },
    { month: 'Aoû', revenue: 26000, expenses: 9500, profit: 16500 },
    { month: 'Sep', revenue: 24800, expenses: 9200, profit: 15600 },
    { month: 'Oct', revenue: 23500, expenses: 9000, profit: 14500 },
    { month: 'Nov', revenue: 21800, expenses: 8700, profit: 13100 },
    { month: 'Déc', revenue: 20500, expenses: 8500, profit: 12000 }
  ];
  
  // Sources de revenus
  const revenueSources: RevenueSourceData[] = [
    { source: 'Agriculture', value: 45000, percentage: 35 },
    { source: 'Viticulture', value: 30000, percentage: 23 },
    { source: 'Résidences', value: 25000, percentage: 19 },
    { source: 'Commerce', value: 15000, percentage: 12 },
    { source: 'Élevage', value: 10000, percentage: 8 },
    { source: 'Autres', value: 5000, percentage: 3 }
  ];
  
  // Types de propriétés
  const propertyTypes: PropertyTypeData[] = [
    { type: 'Domaines agricoles', count: 3, value: 120000, percentage: 40 },
    { type: 'Résidences urbaines', count: 2, value: 90000, percentage: 30 },
    { type: 'Vignobles', count: 1, value: 45000, percentage: 15 },
    { type: 'Commerces', count: 2, value: 30000, percentage: 10 },
    { type: 'Entrepôts', count: 1, value: 15000, percentage: 5 }
  ];
  
  // Recommandations d'optimisation
  const optimizationRecommendations: Recommendation[] = [
    { 
      id: 1, 
      property: 'Oliveraie de Campanie', 
      action: 'Augmenter la production', 
      impact: 'high', 
      description: 'Intensifier la plantation d\'oliviers dans les zones non utilisées pourrait augmenter la production de 20%.',
      estimatedBenefit: 2000 
    },
    { 
      id: 2, 
      property: 'Boutique du Forum', 
      action: 'Élargir la gamme de produits', 
      impact: 'medium', 
      description: 'Ajouter des produits de luxe importés permettrait d\'attirer une clientèle plus aisée.',
      estimatedBenefit: 1200 
    },
    { 
      id: 3, 
      property: 'Ferme de Tusculum', 
      action: 'Réduire les coûts de main-d\'œuvre', 
      impact: 'low', 
      description: 'Acquérir 3 esclaves supplémentaires réduirait les coûts à long terme.',
      estimatedBenefit: 800 
    }
  ];
  
  return {
    profitableProperties,
    revenueExpenseData,
    revenueSources,
    propertyTypes,
    optimizationRecommendations,
    activeView: 'monthly' as ChartViewType,
    setActiveView: () => {}
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
