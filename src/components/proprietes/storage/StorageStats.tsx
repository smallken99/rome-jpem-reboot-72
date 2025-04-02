
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { StorageStats as StorageStatsType } from '../types/resource';

interface StorageStatsProps {
  stats: StorageStatsType;
}

const StorageStats: React.FC<StorageStatsProps> = ({ stats }) => {
  const usedPercentage = (stats.used / stats.capacity) * 100;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm font-medium">Capacité totale</div>
          <div className="text-2xl font-bold">{stats.capacity} unités</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm font-medium">Espace utilisé</div>
          <div className="text-2xl font-bold">{stats.used} unités</div>
          <Progress value={usedPercentage} className="h-2 mt-2" />
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm font-medium">Valeur totale</div>
          <div className="text-2xl font-bold">{stats.totalValue.toLocaleString()} As</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-sm font-medium">Diversité</div>
          <div className="text-2xl font-bold">{stats.uniqueItems} types</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StorageStats;
