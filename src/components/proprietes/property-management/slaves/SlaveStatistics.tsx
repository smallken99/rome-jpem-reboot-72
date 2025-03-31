
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface SlaveStatisticsProps {
  totalSlaves: number;
  assignedSlaves: number;
  slaveValue: number;
  availableSlaves?: number;
}

export const SlaveStatistics: React.FC<SlaveStatisticsProps> = ({ 
  totalSlaves, 
  assignedSlaves, 
  slaveValue,
  availableSlaves
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Slaves</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalSlaves}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Assigned Slaves</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{assignedSlaves}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Available Slaves</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{availableSlaves || (totalSlaves - assignedSlaves)}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{slaveValue} <span className="text-sm font-normal">as</span></div>
        </CardContent>
      </Card>
    </div>
  );
};
