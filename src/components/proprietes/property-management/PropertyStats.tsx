
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Property, PropertyStats } from '@/types/proprietes';
import { Building, Coins, Home, Ruler, TrendingUp, FileBarChart } from 'lucide-react';

interface PropertyStatsProps {
  statistics: PropertyStats;
}

const PropertyStats: React.FC<PropertyStatsProps> = ({ statistics }) => {
  const {
    totalValue,
    yearlyIncome,
    yearlyMaintenance,
    netYearlyProfit,
    propertyCount,
    buildingCount,
    upgradePotential
  } = statistics;

  const formatCurrency = (amount: number): string => {
    return `${amount.toLocaleString()} as`;
  };

  const statCards = [
    {
      title: 'Valeur Totale',
      value: formatCurrency(totalValue),
      icon: <Coins className="h-4 w-4 text-blue-500" />,
      description: 'Valeur estimée de toutes vos propriétés'
    },
    {
      title: 'Revenu Annuel',
      value: formatCurrency(yearlyIncome),
      icon: <TrendingUp className="h-4 w-4 text-green-500" />,
      description: 'Revenu total généré par an'
    },
    {
      title: 'Coûts de Maintenance',
      value: formatCurrency(yearlyMaintenance),
      icon: <Building className="h-4 w-4 text-red-500" />,
      description: 'Dépenses annuelles pour l\'entretien'
    },
    {
      title: 'Profit Net Annuel',
      value: formatCurrency(netYearlyProfit),
      icon: <FileBarChart className="h-4 w-4 text-purple-500" />,
      description: 'Revenu moins les coûts de maintenance'
    },
    {
      title: 'Nombre de Propriétés',
      value: propertyCount.toString(),
      icon: <Home className="h-4 w-4 text-amber-500" />,
      description: 'Total des propriétés détenues'
    },
    {
      title: 'Potentiel d\'Amélioration',
      value: `${upgradePotential}%`,
      icon: <Ruler className="h-4 w-4 text-indigo-500" />,
      description: 'Potentiel d\'augmentation de valeur'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              {stat.icon}
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PropertyStats;
