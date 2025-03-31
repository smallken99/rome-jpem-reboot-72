
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/utils/currencyUtils';

export interface SlaveStatisticsProps {
  totalSlaves: number;
  assignedSlaves: number;
  unassignedSlaves?: number;
  slaveValue: number;
  availableSlaves?: number;
}

export const SlaveStatistics: React.FC<SlaveStatisticsProps> = ({
  totalSlaves,
  assignedSlaves,
  unassignedSlaves,
  slaveValue,
  availableSlaves
}) => {
  // Calculate unassigned if not provided
  const unassignedCount = unassignedSlaves !== undefined 
    ? unassignedSlaves 
    : (availableSlaves !== undefined ? availableSlaves : totalSlaves - assignedSlaves);
  
  // Calculate total asset value
  const totalValue = totalSlaves * slaveValue;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Total des esclaves</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{totalSlaves}</p>
          <p className="text-sm text-muted-foreground">Valeur: {formatCurrency(totalValue)}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Esclaves assignés</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{assignedSlaves}</p>
          <p className="text-sm text-muted-foreground">
            {Math.round((assignedSlaves / totalSlaves) * 100)}% du total
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Esclaves disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{unassignedCount}</p>
          <p className="text-sm text-muted-foreground">
            {Math.round((unassignedCount / totalSlaves) * 100)}% du total
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Valeur unitaire</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{formatCurrency(slaveValue)}</p>
          <p className="text-sm text-muted-foreground">Prix moyen du marché</p>
        </CardContent>
      </Card>
    </div>
  );
};
