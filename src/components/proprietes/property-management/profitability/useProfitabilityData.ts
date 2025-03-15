
import { useState } from 'react';
import { 
  PropertyProfitData, 
  RevenueExpenseChartData, 
  PropertyTypeData,
  RevenueSourceData,
  Recommendation,
  ChartViewType 
} from './types/profitabilityTypes';

export const useProfitabilityData = () => {
  const [activeView, setActiveView] = useState<ChartViewType>('monthly');
  
  // Données de profitabilité des propriétés
  const profitableProperties: PropertyProfitData[] = [
    { id: 1, name: 'Insula de la Via Sacra', type: 'Urbain', revenue: 20000, expenses: 12000, profitMargin: 40, roi: 15 },
    { id: 2, name: 'Domaine viticole de Campanie', type: 'Rural', revenue: 35000, expenses: 18000, profitMargin: 48.6, roi: 22 },
    { id: 3, name: 'Villa Urbana du Palatin', type: 'Urbain', revenue: 18000, expenses: 11000, profitMargin: 38.9, roi: 12 },
    { id: 4, name: 'Ferme en Sicile', type: 'Rural', revenue: 27000, expenses: 12000, profitMargin: 55.6, roi: 25 },
    { id: 5, name: 'Oliveraie en Hispanie', type: 'Rural', revenue: 32000, expenses: 15000, profitMargin: 53.1, roi: 28 }
  ];
  
  // Données pour le graphique des revenus et dépenses
  const revenueExpenseData: RevenueExpenseChartData[] = [
    { month: 'Janvier', revenue: 12000, expenses: 8000, profit: 4000 },
    { month: 'Février', revenue: 14000, expenses: 7500, profit: 6500 },
    { month: 'Mars', revenue: 15000, expenses: 9000, profit: 6000 },
    { month: 'Avril', revenue: 17000, expenses: 8200, profit: 8800 },
    { month: 'Mai', revenue: 18500, expenses: 10000, profit: 8500 },
    { month: 'Juin', revenue: 20000, expenses: 9500, profit: 10500 }
  ];
  
  // Données pour le graphique de distribution des sources de revenus
  const revenueSources: RevenueSourceData[] = [
    { id: "loyers", value: 35, name: "Loyers" },
    { id: "agriculture", value: 30, name: "Agriculture" },
    { id: "commerce", value: 20, name: "Commerce" },
    { id: "autres", value: 15, name: "Autres" }
  ];
  
  // Données pour le graphique de distribution des types de propriétés
  const propertyTypes: PropertyTypeData[] = [
    { label: "Urbain", value: 45 },
    { label: "Rural", value: 35 },
    { label: "Religieux", value: 10 },
    { label: "Public", value: 5 },
    { label: "Autres", value: 5 }
  ];
  
  // Recommandations d'optimisation
  const optimizationRecommendations: Recommendation[] = [
    {
      id: '1',
      title: 'Améliorer la gestion des esclaves',
      description: 'Réaffecter les esclaves pour optimiser la production dans le domaine viticole',
      type: 'high',
      impact: 'Augmentation de 15% de la production'
    },
    {
      id: '2',
      title: 'Rénovation des insulae',
      description: 'Investir dans la rénovation pour augmenter les loyers',
      type: 'medium',
      impact: 'Augmentation de 10% des revenus locatifs'
    },
    {
      id: '3',
      title: 'Diversification agricole',
      description: 'Ajouter des cultures plus rentables dans la ferme sicilienne',
      type: 'high',
      impact: 'Amélioration du ROI de 25%'
    }
  ];
  
  // Filtrer les données en fonction de la vue active
  const getFilteredRevenueData = () => {
    if (activeView === 'monthly') {
      return revenueExpenseData;
    } else if (activeView === 'quarterly') {
      // Données regroupées par trimestre
      return [
        { month: 'T1', revenue: 41000, expenses: 24500, profit: 16500 },
        { month: 'T2', revenue: 55500, expenses: 27700, profit: 27800 }
      ];
    } else { // yearly
      // Données annuelles
      return [
        { month: 'Année courante', revenue: 96500, expenses: 52200, profit: 44300 }
      ];
    }
  };
  
  return {
    profitableProperties,
    revenueExpenseData: getFilteredRevenueData(),
    revenueSources,
    propertyTypes,
    optimizationRecommendations,
    activeView,
    setActiveView
  };
};
