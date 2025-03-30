
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slave } from './SlaveAssignmentAdapter';

interface SlaveAssignmentProps {
  slave: Slave;
  buildingName?: string;
  onRemove?: () => void;
  onReassign?: () => void;
  efficiency?: number;
  role?: string;
}

export const SlaveAssignment: React.FC<SlaveAssignmentProps> = ({
  slave,
  buildingName,
  onRemove,
  onReassign,
  efficiency = 1.0,
  role = 'worker'
}) => {
  const efficiencyColor = 
    efficiency > 1.1 ? 'text-green-600' :
    efficiency < 0.9 ? 'text-red-600' :
    'text-yellow-600';

  return (
    <Card className="shadow-sm border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">{slave.name}</CardTitle>
          <Badge variant={role === 'overseer' ? 'secondary' : 'outline'}>
            {role === 'overseer' ? 'Superviseur' : 'Travailleur'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2 pt-0">
        <div className="grid grid-cols-2 gap-1 text-sm">
          <div>
            <span className="text-muted-foreground">Origine:</span> {slave.origin}
          </div>
          <div>
            <span className="text-muted-foreground">Âge:</span> {slave.age} ans
          </div>
          <div>
            <span className="text-muted-foreground">Compétence:</span> {slave.skill}/10
          </div>
          <div>
            <span className="text-muted-foreground">Santé:</span> {slave.health}/10
          </div>
          {slave.specialization && (
            <div className="col-span-2">
              <span className="text-muted-foreground">Spécialisation:</span> {slave.specialization}
            </div>
          )}
          {buildingName && (
            <div className="col-span-2">
              <span className="text-muted-foreground">Assigné à:</span> {buildingName}
            </div>
          )}
          <div className="col-span-2">
            <span className="text-muted-foreground">Efficacité:</span>{' '}
            <span className={efficiencyColor}>{Math.round(efficiency * 100)}%</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-1 flex justify-between gap-2">
        {onReassign && (
          <Button variant="outline" className="w-full" size="sm" onClick={onReassign}>
            Réassigner
          </Button>
        )}
        {onRemove && (
          <Button variant="outline" className="w-full" size="sm" onClick={onRemove}>
            Retirer
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
