
import React from 'react';
import { SlaveAssignment } from './SlaveAssignment';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Slave {
  id: string;
  name: string;
  health: number;
  skills: string[];
  origin: string;
  price: number;
  assigned?: boolean;
  buildingId?: string;
}

export interface SlaveAssignmentData {
  buildingId: string | number;
  buildingName: string;
  count: number;
  maxCount: number;
  efficiency: number;
}

interface SlaveAssignmentsProps {
  assignments: SlaveAssignmentData[];
  availableSlaves: number;
  onAssignSlaves: (buildingId: string, count: number) => void;
  onOptimizeAll?: () => void;
}

export const SlaveAssignments: React.FC<SlaveAssignmentsProps> = ({
  assignments,
  availableSlaves,
  onAssignSlaves,
  onOptimizeAll
}) => {
  const totalAssigned = assignments.reduce((sum, a) => sum + a.count, 0);
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Répartition des Esclaves</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Esclaves disponibles: <span className="font-medium">{availableSlaves}</span></p>
              <p className="text-sm text-muted-foreground">Esclaves assignés: <span className="font-medium">{totalAssigned}</span></p>
              <p className="text-sm text-muted-foreground">Total: <span className="font-medium">{availableSlaves + totalAssigned}</span></p>
            </div>
            
            {onOptimizeAll && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={onOptimizeAll}
              >
                Optimiser automatiquement
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        {assignments.map((assignment) => (
          <SlaveAssignment
            key={assignment.buildingId.toString()}
            buildingId={assignment.buildingId.toString()}
            buildingName={assignment.buildingName}
            assignedSlaves={assignment.count}
            maxSlaves={assignment.maxCount}
            efficiency={assignment.efficiency}
            onAssignSlaves={onAssignSlaves}
          />
        ))}
        
        {assignments.length === 0 && (
          <Card>
            <CardContent className="py-6 text-center text-muted-foreground">
              Aucune propriété disponible pour assigner des esclaves.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
