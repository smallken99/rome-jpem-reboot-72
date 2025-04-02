
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface SlaveStatisticsProps {
  totalSlaves: number;
  assignedSlaves: number;
  availableSlaves: number;
  slaveValue: number;
}

export const SlaveStatistics: React.FC<SlaveStatisticsProps> = ({
  totalSlaves,
  assignedSlaves,
  availableSlaves,
  slaveValue
}) => {
  const assignedPercentage = totalSlaves > 0 
    ? Math.round((assignedSlaves / totalSlaves) * 100)
    : 0;
  
  const totalValue = totalSlaves * slaveValue;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-4">
        <h3 className="text-lg font-medium mb-3">Population d'esclaves</h3>
        <div className="grid grid-cols-2 gap-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl font-bold">{totalSlaves}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Disponibles</p>
            <p className="text-2xl font-bold">{availableSlaves}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Assignés</p>
            <p className="text-2xl font-bold">{assignedSlaves}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Valeur totale</p>
            <p className="text-2xl font-bold">{totalValue.toLocaleString()} As</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-4">
        <h3 className="text-lg font-medium mb-3">Utilisation des esclaves</h3>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm">Esclaves assignés</span>
            <span className="text-sm font-medium">{assignedPercentage}%</span>
          </div>
          <Progress value={assignedPercentage} className="h-2" />
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p className="mb-2">
            {assignedPercentage < 50 
              ? "De nombreux esclaves sont inactifs. Assignez-les à des propriétés pour augmenter vos revenus."
              : assignedPercentage > 90
                ? "Presque tous vos esclaves sont assignés. Envisagez d'en acheter davantage pour développer vos propriétés."
                : "Une bonne partie de vos esclaves contribue à la productivité de vos domaines."}
          </p>
          <p>
            Prix moyen du marché: <span className="font-medium">{slaveValue} As</span> par esclave
          </p>
        </div>
      </Card>
    </div>
  );
};
