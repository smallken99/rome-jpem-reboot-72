
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';

interface SlaveStatisticsProps {
  totalSlaves: number;
  assignedSlaves: number;
}

export const SlaveStatistics: React.FC<SlaveStatisticsProps> = ({
  totalSlaves,
  assignedSlaves
}) => {
  const availableSlaves = totalSlaves - assignedSlaves;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-white border-rome-gold/30">
        <CardContent className="p-4 flex items-center">
          <Users className="h-8 w-8 mr-3 text-rome-navy" />
          <div>
            <p className="text-sm text-muted-foreground">Total d'esclaves</p>
            <p className="text-xl font-bold text-rome-navy">{totalSlaves}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white border-rome-gold/30">
        <CardContent className="p-4 flex items-center">
          <Users className="h-8 w-8 mr-3 text-rome-terracotta" />
          <div>
            <p className="text-sm text-muted-foreground">Esclaves assignés</p>
            <p className="text-xl font-bold text-rome-navy">{assignedSlaves} / {totalSlaves}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-white border-rome-gold/30">
        <CardContent className="p-4 flex items-center">
          <Users className="h-8 w-8 mr-3 text-rome-gold" />
          <div>
            <p className="text-sm text-muted-foreground">Esclaves disponibles</p>
            <p className="text-xl font-bold text-rome-navy">{availableSlaves}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
