
import React from 'react';
import { Card } from '@/components/ui/card';

export const SlaveManagementTab: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Gestion des Esclaves</h2>
      </div>
      
      <Card className="p-6">
        <div className="text-center p-10">
          <p className="text-muted-foreground">
            Module de gestion des esclaves en développement.
          </p>
        </div>
      </Card>
    </div>
  );
};
