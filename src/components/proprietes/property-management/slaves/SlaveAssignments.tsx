
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export interface SlaveAssignment {
  propertyId: string;
  propertyName: string;
  count: number;
}

export interface SlaveAssignmentsProps {
  slaveAssignments: SlaveAssignment[];
  availableSlaves: number;
  onAssignSlaves: (propertyId: string, propertyName: string, amount: number) => boolean;
  onRemoveAssignment: (propertyId: string) => boolean;
}

export const SlaveAssignments: React.FC<SlaveAssignmentsProps> = ({
  slaveAssignments,
  availableSlaves,
  onAssignSlaves,
  onRemoveAssignment
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Affectations actuelles</span>
          <Badge variant="outline">{availableSlaves} esclaves disponibles</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {slaveAssignments.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            Aucune affectation pour le moment
          </p>
        ) : (
          <div className="space-y-3">
            {slaveAssignments.map((assignment) => (
              <div 
                key={assignment.propertyId}
                className="flex items-center justify-between p-2 border rounded bg-muted/40"
              >
                <div>
                  <div className="font-medium">{assignment.propertyName}</div>
                  <div className="text-sm text-muted-foreground">
                    {assignment.count} esclaves
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveAssignment(assignment.propertyId)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
