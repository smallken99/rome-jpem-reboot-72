
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OwnedBuilding } from '@/components/proprietes/types/property';
import { SlaveAssignment as SlaveAssignmentType } from '@/components/proprietes/types/property';

interface SlaveAssignmentProps {
  assignment: SlaveAssignmentType;
  buildings: OwnedBuilding[];
  onRevoke: (assignmentId: string) => void;
}

export const SlaveAssignment: React.FC<SlaveAssignmentProps> = ({
  assignment,
  buildings,
  onRevoke
}) => {
  const building = buildings.find(b => b.id === assignment.buildingId || b.buildingId === assignment.buildingId);
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Esclave #{assignment.slaveId.slice(-4)}</h3>
            <p className="text-sm text-muted-foreground">
              Assigné à {building?.name || 'Propriété inconnue'}
            </p>
            <p className="text-xs text-muted-foreground">
              Rôle: {assignment.role || 'Travailleur'} • Productivité: {assignment.productivity || 100}%
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onRevoke(assignment.id)}
          >
            Révoquer
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
