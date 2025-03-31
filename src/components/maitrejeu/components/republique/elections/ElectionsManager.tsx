
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ElectionPlanner } from '../../ElectionPlanner';

export const ElectionsManager: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gestion des élections</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Interface complète de gestion des élections à implémenter</p>
        </CardContent>
      </Card>
      
      <ElectionPlanner />
    </div>
  );
};
