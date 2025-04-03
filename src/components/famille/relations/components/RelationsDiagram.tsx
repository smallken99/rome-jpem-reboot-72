
import React from 'react';
import { FamilyRelation } from '../types/relationTypes';
import { Card, CardContent } from '@/components/ui/card';

interface RelationsDiagramProps {
  relations: FamilyRelation[];
}

export const RelationsDiagram: React.FC<RelationsDiagramProps> = ({ relations }) => {
  if (relations.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Aucune relation à visualiser.</p>
      </div>
    );
  }
  
  return (
    <Card>
      <CardContent className="p-6 min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <p>Diagramme des relations familiales</p>
          <p className="text-sm text-muted-foreground mt-2">
            Cette fonctionnalité sera disponible prochainement.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
