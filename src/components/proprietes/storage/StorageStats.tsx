
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Resource } from '../types/resourceTypes';
import { formatCurrency } from '@/utils/formatters';

interface StorageStatsProps {
  resources: Resource[];
}

const StorageStats: React.FC<StorageStatsProps> = ({ resources }) => {
  const totalValue = resources.reduce((total, resource) => total + (resource.value * resource.quantity), 0);
  const totalItems = resources.reduce((total, resource) => total + resource.quantity, 0);
  
  const categoryCounts = resources.reduce((counts, resource) => {
    const category = resource.type.toString();
    counts[category] = (counts[category] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
  
  const highestCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Valeur totale</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{formatCurrency(totalValue)}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Nombre d'articles</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{totalItems.toLocaleString()}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Catégorie principale</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold capitalize">
            {highestCategory ? highestCategory[0] : 'Aucune'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StorageStats;
