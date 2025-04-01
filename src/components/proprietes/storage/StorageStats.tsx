
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const StorageStats: React.FC = () => {
  // Mock data - in a real implementation, this would come from a hook or context
  const stats = {
    totalResources: 15,
    totalValue: 75000,
    lowStockItems: 3,
    recentTransactions: 8
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{stats.totalResources}</div>
          <p className="text-muted-foreground">Ressources Totales</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{stats.totalValue.toLocaleString()} as</div>
          <p className="text-muted-foreground">Valeur Totale</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{stats.lowStockItems}</div>
          <p className="text-muted-foreground">Stock Faible</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{stats.recentTransactions}</div>
          <p className="text-muted-foreground">Transactions Récentes</p>
        </CardContent>
      </Card>
    </div>
  );
};
