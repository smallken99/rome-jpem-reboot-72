
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface StorageStatsProps {
  totalCapacity: number;
  usedCapacity: number;
  resourceCount: number;
  totalValue: number;
}

const StorageStats: React.FC<StorageStatsProps> = ({ 
  totalCapacity = 1000,
  usedCapacity = 0,
  resourceCount = 0,
  totalValue = 0
}) => {
  const usagePercentage = Math.min(100, Math.round((usedCapacity / totalCapacity) * 100));
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Capacité de stockage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{usedCapacity} / {totalCapacity}</div>
          <Progress className="mt-2" value={usagePercentage} />
          <p className="text-xs text-muted-foreground mt-2">
            {usagePercentage}% de l'espace utilisé
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
            Types différents de ressources
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Valeur totale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalValue} as</div>
          <p className="text-xs text-muted-foreground mt-2">
            Valeur estimée au prix du marché
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Efficacité</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Math.round(totalValue / (usedCapacity || 1))} as/unité
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
