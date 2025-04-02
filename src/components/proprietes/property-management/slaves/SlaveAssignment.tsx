
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SlaveAssignment as SlaveAssignmentType } from '@/components/proprietes/types/slave';
import { Building } from '@/types/proprietes';

interface SlaveAssignmentProps {
  assignment: SlaveAssignmentType;
  buildings: Building[];
  onRevoke: (assignmentId: string) => void;
}

export const SlaveAssignment: React.FC<SlaveAssignmentProps> = ({
  assignment,
  buildings,
  onRevoke
}) => {
  const building = buildings.find(b => b.id.toString() === assignment.buildingId?.toString());
  
  // Formatage de la date
  const formatDate = (date: Date | string) => {
    if (!date) return 'Inconnue';
    
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('fr-FR');
  };
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Esclave #{assignment.slaveId.slice(-4)}</h3>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm text-muted-foreground">
                Assigné à {building?.name || 'Propriété inconnue'}
              </p>
              <Badge variant="outline" className="text-xs">
                Depuis le {formatDate(assignment.startDate)}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-x-4 text-xs text-muted-foreground mt-2">
              <div>
                <span className="font-medium">Rôle:</span> {assignment.role || 'Travailleur'}
              </div>
              <div>
                <span className="font-medium">Efficacité:</span> {assignment.efficiency || 80}%
              </div>
              {assignment.productivity && (
                <div>
                  <span className="font-medium">Productivité:</span> {assignment.productivity}%
                </div>
              )}
              {assignment.income && (
                <div>
                  <span className="font-medium">Revenu:</span> {assignment.income} as
                </div>
              )}
            </div>
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
