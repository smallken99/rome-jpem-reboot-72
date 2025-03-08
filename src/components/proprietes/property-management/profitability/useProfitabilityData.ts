
import { useState } from 'react';
import { 
  PropertyProfitData, 
  OptimizationRecommendation, 
  RevenueExpenseChartData, 
  RevenueSourceData,
  ChartViewType
} from '../types/profitabilityTypes';

export const useProfitabilityData = () => {
  const [activeView, setActiveView] = useState<'overview' | 'detail'>('overview');
  const [chartViewType, setChartViewType] = useState<ChartViewType>('yearly');
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  
  // Revenue and expense data for charts
  const chartData: RevenueExpenseChartData[] = [
    { name: 'Janvier', revenus: 12000, dépenses: 8000, profit: 4000 },
    { name: 'Février', revenus: 13500, dépenses: 8200, profit: 5300 },
    { name: 'Mars', revenus: 14000, dépenses: 8500, profit: 5500 },
    { name: 'Avril', revenus: 15200, dépenses: 9000, profit: 6200 },
    { name: 'Mai', revenus: 16000, dépenses: 9500, profit: 6500 },
    { name: 'Juin', revenus: 14800, dépenses: 9200, profit: 5600 },
  ];
  
  // Revenue sources data for pie chart
  const revenueSourcesData: RevenueSourceData[] = [
    { name: 'Propriétés Rurales', value: 45000, color: '#8884d8' },
    { name: 'Propriétés Urbaines', value: 30000, color: '#82ca9d' },
    { name: 'Bâtiments Publics', value: 15000, color: '#ffc658' },
    { name: 'Temples', value: 10000, color: '#ff8042' },
  ];
  
  // Properties profit data
  const profitableProperties: PropertyProfitData[] = [
    { id: 1, name: 'Domaine viticole de Campanie', type: 'Rural', revenue: 25000, expenses: 10000, profit: 15000, profitMargin: 60 },
    { id: 2, name: 'Villa Urbana du Palatin', type: 'Urbain', revenue: 15000, expenses: 5000, profit: 10000, profitMargin: 66.67 },
    { id: 3, name: 'Insula de la Via Sacra', type: 'Urbain', revenue: 8000, expenses: 3000, profit: 5000, profitMargin: 62.5 },
    { id: 4, name: 'Domaine agricole de Latium', type: 'Rural', revenue: 12000, expenses: 7000, profit: 5000, profitMargin: 41.67 },
    { id: 5, name: 'Temple de Minerve', type: 'Religieux', revenue: 6000, expenses: 2000, profit: 4000, profitMargin: 66.67 },
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
  const totalRevenue = revenueSourcesData.reduce((sum, item) => sum + item.value, 0);
  const totalExpenses = chartData.reduce((sum, item) => sum + item.dépenses, 0);
  const totalProfit = totalRevenue - totalExpenses;
  const overallRoi = (totalProfit / totalExpenses) * 100;
  
  // Get property by ID
  const getPropertyById = (id: number | string): PropertyProfitData | undefined => {
    const propertyId = typeof id === 'string' ? parseInt(id, 10) : id;
    return profitableProperties.find(property => property.id === propertyId);
  };
  
  // Filter properties by type
  const filterPropertiesByType = (type: string): PropertyProfitData[] => {
    return profitableProperties.filter(property => property.type === type);
  };
  
  // Sort properties by profitability
  const sortPropertiesByProfitability = (order: 'asc' | 'desc' = 'desc'): PropertyProfitData[] => {
    return [...profitableProperties].sort((a, b) => {
      return order === 'desc' 
        ? b.profitMargin - a.profitMargin
        : a.profitMargin - b.profitMargin;
    });
  };
  
  return {
    activeView,
    setActiveView,
    chartViewType,
    setChartViewType,
    selectedYear,
    setSelectedYear,
    chartData,
    revenueSourcesData,
    profitableProperties,
    recommendations,
    totalRevenue,
    totalExpenses,
    totalProfit,
    overallRoi,
    getPropertyById,
    filterPropertiesByType,
    sortPropertiesByProfitability
  };
};
