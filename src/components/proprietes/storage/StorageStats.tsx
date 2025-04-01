
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export interface StorageStatsProps {
  totalCapacity: number;
  usedCapacity: number;
  resourceCount: number;
  totalValue: number;
}

const StorageStats: React.FC<StorageStatsProps> = ({
  totalCapacity,
  usedCapacity,
  resourceCount,
  totalValue
}) => {
  const usagePercent = Math.min(100, Math.round((usedCapacity / totalCapacity) * 100));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Capacité de stockage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{usedCapacity} / {totalCapacity}</div>
          <Progress 
            value={usagePercent} 
            className="h-2 mt-2" 
            indicator={usagePercent > 85 ? "bg-red-500" : usagePercent > 60 ? "bg-amber-500" : "bg-green-500"}
          />
          <p className="text-xs text-muted-foreground mt-2">
            {usagePercent}% de la capacité totale utilisée
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Nombre de ressources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{resourceCount}</div>
          <p className="text-xs text-muted-foreground mt-2">
            Types de ressources stockées
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Valeur totale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalValue.toLocaleString()} as</div>
          <p className="text-xs text-muted-foreground mt-2">
            Valeur marchande des stocks
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Efficacité d'utilisation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Math.round(totalValue / usedCapacity).toLocaleString()} as / unité
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Valeur moyenne par unité de stockage
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StorageStats;
