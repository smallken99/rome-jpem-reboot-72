
import { useState } from 'react';
import { RevenueData, PropertyProfitData, OptimizationRecommendation } from '../types/profitabilityTypes';

export const useProfitabilityData = () => {
  const [activeView, setActiveView] = useState<'overview' | 'detail'>('overview');
  
  // Revenue and expense data for charts
  const revenueData: RevenueData[] = [
    { name: 'Janvier', value: 12000 },
    { name: 'Février', value: 13500 },
    { name: 'Mars', value: 14000 },
    { name: 'Avril', value: 15200 },
    { name: 'Mai', value: 16000 },
    { name: 'Juin', value: 14800 },
  ];
  
  const expenseData: RevenueData[] = [
    { name: 'Janvier', value: 8000 },
    { name: 'Février', value: 8200 },
    { name: 'Mars', value: 8500 },
    { name: 'Avril', value: 9000 },
    { name: 'Mai', value: 9500 },
    { name: 'Juin', value: 9200 },
  ];
  
  const revenueExpenseData = revenueData.map((item, index) => ({
    name: item.name,
    revenus: item.value,
    dépenses: expenseData[index].value,
    profit: item.value - expenseData[index].value
  }));
  
  // Revenue sources data for pie chart
  const revenueSourcesData = [
    { name: 'Propriétés Rurales', value: 45000, color: '#8884d8' },
    { name: 'Propriétés Urbaines', value: 30000, color: '#82ca9d' },
    { name: 'Bâtiments Publics', value: 15000, color: '#ffc658' },
    { name: 'Temples', value: 10000, color: '#ff8042' },
  ];
  
  // Properties profit data
  const topProperties: PropertyProfitData[] = [
    { id: 1, name: 'Domaine viticole de Campanie', type: 'Rural', revenue: 25000, expenses: 10000, profit: 15000, roi: 60 },
    { id: 2, name: 'Villa Urbana du Palatin', type: 'Urbain', revenue: 15000, expenses: 5000, profit: 10000, roi: 66.67 },
    { id: 3, name: 'Insula de la Via Sacra', type: 'Urbain', revenue: 8000, expenses: 3000, profit: 5000, roi: 62.5 },
    { id: 4, name: 'Domaine agricole de Latium', type: 'Rural', revenue: 12000, expenses: 7000, profit: 5000, roi: 41.67 },
    { id: 5, name: 'Temple de Minerve', type: 'Religieux', revenue: 6000, expenses: 2000, profit: 4000, roi: 66.67 },
  ];
  
  // Optimization recommendations
  const recommendations: OptimizationRecommendation[] = [
    { 
      id: 1, 
      title: 'Optimisation des esclaves sur le domaine viticole', 
      description: 'Augmenter le nombre d\'esclaves de 25 à 35 pourrait améliorer la production de 20%.',
      impact: 'high',
      estimatedRevenue: 5000
    },
    { 
      id: 2, 
      title: 'Réduction des coûts d\'entretien de la Villa Urbana', 
      description: 'Une restauration complète réduirait les coûts annuels d\'entretien de 15%.',
      impact: 'medium',
      estimatedSavings: 750
    },
    { 
      id: 3, 
      title: 'Conversion partielle du domaine agricole', 
      description: 'Convertir 30% des terres en oliveraies pour diversifier les revenus.',
      impact: 'medium',
      estimatedRevenue: 2000
    },
  ];
  
  // Calculate overall financial metrics
  const totalRevenue = {
    name: 'Total des revenus',
    value: revenueSourcesData.reduce((sum, item) => sum + item.value, 0)
  };
  
  const totalExpenses = {
    name: 'Total des dépenses',
    value: expenseData.reduce((sum, item) => sum + item.value, 0)
  };
  
  const totalProfit = totalRevenue.value - totalExpenses.value;
  const overallRoi = (totalProfit / totalExpenses.value) * 100;
  
  return {
    activeView,
    setActiveView,
    revenueExpenseData,
    revenueSourcesData,
    topProperties,
    revenueData,
    revenueSources: revenueSourcesData,
    profitableProperties: topProperties,
    recommendations,
    totalRevenue,
    totalExpenses,
    totalProfit,
    overallRoi
  };
};
