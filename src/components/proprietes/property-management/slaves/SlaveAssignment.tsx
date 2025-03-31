
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OwnedBuilding } from '@/components/proprietes/types/property';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';

interface SlaveAssignmentProps {
  assignment: {
    id: string;
    slaveId: string;
    buildingId: string;
    assignedAt: Date;
    role: string;
    productivity: number;
  };
  buildings: OwnedBuilding[];
  onRevoke: (assignmentId: string) => void;
}

export const SlaveAssignment: React.FC<SlaveAssignmentProps> = ({
  assignment,
  buildings,
  onRevoke
}) => {
  const building = buildings.find(b => b.id === assignment.buildingId);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-md">{building?.name || 'Propriété inconnue'}</CardTitle>
          <Badge variant="outline">{assignment.role}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">
              Productivité: {assignment.productivity}%
            </p>
            <p className="text-sm text-muted-foreground">
              Assigné le: {assignment.assignedAt.toLocaleDateString()}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onRevoke(assignment.id)}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
