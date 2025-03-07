
import { useState, useEffect } from 'react';
import { useBuildingManagement } from '../../hooks/useBuildingManagement';
import { RevenueData, PropertyProfitData, OptimizationRecommendation } from '../types/profitabilityTypes';

export const useProfitabilityData = () => {
  const { ownedBuildings } = useBuildingManagement();
  
  // Données de revenus et dépenses pour le graphique
  const [revenueData, setRevenueData] = useState<RevenueData[]>([
    { name: 'Jan', revenue: 12000, expenses: 8000 },
    { name: 'Fév', revenue: 15000, expenses: 8500 },
    { name: 'Mar', revenue: 14000, expenses: 9000 },
    { name: 'Avr', revenue: 16500, expenses: 9500 },
    { name: 'Mai', revenue: 18000, expenses: 10000 },
    { name: 'Juin', revenue: 19500, expenses: 10500 },
  ]);
  
  // Sources de revenus pour le graphique camembert
  const [revenueSources, setRevenueSources] = useState<{ name: string, value: number }[]>([
    { name: 'Propriétés urbaines', value: 45 },
    { name: 'Domaines ruraux', value: 30 },
    { name: 'Investissements', value: 15 },
    { name: 'Autres sources', value: 10 },
  ]);
  
  // Données de propriétés les plus rentables
  const [profitableProperties, setProfitableProperties] = useState<PropertyProfitData[]>([
    { id: 1, name: 'Villa du Palatin', type: 'Urbaine', income: 12000, expenses: 4000, profit: 8000, roi: 18.2 },
    { id: 2, name: 'Vignoble de Campanie', type: 'Rurale', income: 15000, expenses: 6000, profit: 9000, roi: 15.0 },
    { id: 3, name: 'Insula du Forum', type: 'Urbaine', income: 8000, expenses: 2000, profit: 6000, roi: 12.0 },
    { id: 4, name: 'Oliveraie de Toscane', type: 'Rurale', income: 10000, expenses: 4500, profit: 5500, roi: 9.2 },
    { id: 5, name: 'Boutiques du Tibre', type: 'Urbaine', income: 6000, expenses: 1500, profit: 4500, roi: 7.5 },
  ]);
  
  // Recommandations d'optimisation
  const [recommendations, setRecommendations] = useState<OptimizationRecommendation[]>([
    {
      id: 1,
      title: 'Optimiser l\'entretien',
      description: 'Réduire les coûts d\'entretien des propriétés urbaines de 15% en planifiant les travaux en basse saison',
      potentialSavings: 3000,
      difficulty: 'Facile'
    },
    {
      id: 2,
      title: 'Augmenter la production viticole',
      description: 'Investir 5000 As dans l\'amélioration du domaine viticole pour augmenter la production de 20%',
      potentialGain: 6000,
      initialInvestment: 5000,
      difficulty: 'Moyenne'
    },
    {
      id: 3,
      title: 'Convertir les espaces inutilisés',
      description: 'Transformer les espaces inutilisés de l\'insula en boutiques à louer',
      potentialGain: 4500,
      initialInvestment: 8000,
      difficulty: 'Difficile'
    }
  ]);
  
  // Calculer les statistiques globales
  const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalExpenses = revenueData.reduce((acc, curr) => acc + curr.expenses, 0);
  const totalProfit = totalRevenue - totalExpenses;
  const overallRoi = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
  
  // Actualiser les données en fonction des propriétés
  useEffect(() => {
    // Ici, on pourrait ajouter une logique pour calculer les revenus, dépenses et rentabilité
    // à partir des propriétés réelles détenues par le joueur
    // Cela reste simulé pour le moment
  }, [ownedBuildings]);
  
  return {
    revenueData,
    revenueSources,
    profitableProperties,
    recommendations,
    totalRevenue,
    totalExpenses,
    totalProfit,
    overallRoi
  };
};
