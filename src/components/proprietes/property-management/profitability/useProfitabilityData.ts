
import { useState } from 'react';
import { Building, Home, Tractor, Landmark } from 'lucide-react';
import { BuildingData, RevenueSource, ProfitableProperty } from '../types/profitabilityTypes';

export const useProfitabilityData = () => {
  const [activeView, setActiveView] = useState<'yearly' | 'monthly'>('yearly');
  
  // Données simulées pour le graphique des revenus et dépenses par type de propriété
  const revenueExpenseData: BuildingData[] = [
    {
      name: 'Insulae',
      revenus: 48000,
      depenses: 20000,
      icon: <Building className="h-4 w-4" />,
    },
    {
      name: 'Domus',
      revenus: 15000,
      depenses: 30000,
      icon: <Home className="h-4 w-4" />,
    },
    {
      name: 'Domaines',
      revenus: 75000,
      depenses: 35000,
      icon: <Tractor className="h-4 w-4" />,
    },
    {
      name: 'Publics',
      revenus: 10000,
      depenses: 45000,
      icon: <Landmark className="h-4 w-4" />,
    },
  ];
  
  // Données simulées pour le graphique circulaire des sources de revenus
  const revenueSourcesData: RevenueSource[] = [
    { name: 'Loyers', value: 45, color: '#7A9E7E' },
    { name: 'Agriculture', value: 30, color: '#EEA243' },
    { name: 'Commerce', value: 15, color: '#CF5C36' },
    { name: 'Autres', value: 10, color: '#1F487E' },
  ];
  
  // Données simulées des propriétés les plus rentables
  const topProperties: ProfitableProperty[] = [
    {
      name: 'Insula de la Via Sacra',
      type: 'Insula',
      revenue: 12000,
      expenses: 4000,
      roi: 200,
      trend: 'up'
    },
    {
      name: 'Domaine Viticole de Campanie',
      type: 'Vignoble',
      revenue: 18000,
      expenses: 7000,
      roi: 157,
      trend: 'up'
    },
    {
      name: 'Insula du Champ de Mars',
      type: 'Insula',
      revenue: 10000,
      expenses: 4500,
      roi: 122,
      trend: 'down'
    },
    {
      name: 'Oliveraie d\'Apulie',
      type: 'Domaine rural',
      revenue: 15000,
      expenses: 7500,
      roi: 100,
      trend: 'neutral'
    },
  ];

  return {
    activeView,
    setActiveView,
    revenueExpenseData,
    revenueSourcesData,
    topProperties
  };
};
