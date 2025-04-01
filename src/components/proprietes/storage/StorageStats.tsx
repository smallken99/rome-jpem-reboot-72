
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  PackagePlus, 
  PackageMinus, 
  Warehouse, 
  Coins 
} from 'lucide-react';

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
  // Calculate usage percentage
  const usagePercentage = totalCapacity > 0 
    ? Math.min(100, Math.round((usedCapacity / totalCapacity) * 100)) 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Capacité utilisée</CardTitle>
          <Warehouse className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{usagePercentage}%</div>
          <p className="text-xs text-muted-foreground">
            {usedCapacity.toLocaleString()} / {totalCapacity.toLocaleString()} unités
          </p>
          <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${
                usagePercentage > 90 ? 'bg-red-500' : 
                usagePercentage > 75 ? 'bg-yellow-500' : 
                'bg-green-500'
              }`} 
              style={{ width: `${usagePercentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Ressources distinctes</CardTitle>
          <PackagePlus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{resourceCount}</div>
          <p className="text-xs text-muted-foreground">
            Types de ressources différents
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Valeur totale</CardTitle>
          <Coins className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalValue.toLocaleString()} As</div>
          <p className="text-xs text-muted-foreground">
            Estimation des biens entreposés
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Espace disponible</CardTitle>
          <PackageMinus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{(totalCapacity - usedCapacity).toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Unités de stockage disponibles
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StorageStats;
