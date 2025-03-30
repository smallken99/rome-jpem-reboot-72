
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

export interface SlaveAssignmentProps {
  buildingId: string;
  buildingName: string;
  assignedSlaves: number;
  maxSlaves: number;
  efficiency: number;
  onAssignSlaves: (buildingId: string, count: number) => void;
}

export const SlaveAssignment: React.FC<SlaveAssignmentProps> = ({
  buildingId,
  buildingName,
  assignedSlaves,
  maxSlaves,
  efficiency,
  onAssignSlaves
}) => {
  const handleAssign = (newValue: number[]) => {
    onAssignSlaves(buildingId, newValue[0]);
  };

  const getEfficiencyColor = () => {
    if (efficiency >= 90) return 'bg-green-500';
    if (efficiency >= 75) return 'bg-green-300';
    if (efficiency >= 60) return 'bg-yellow-300';
    if (efficiency >= 40) return 'bg-orange-300';
    return 'bg-red-300';
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">{buildingName}</CardTitle>
          <Badge variant="outline">
            Efficacité: {efficiency}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label className="mb-2 block">Esclaves assignés: {assignedSlaves} / {maxSlaves}</Label>
            <Slider
              value={[assignedSlaves]}
              min={0}
              max={maxSlaves}
              step={1}
              onValueChange={handleAssign}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getEfficiencyColor()}`} 
                style={{ width: `${efficiency}%` }}
              />
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onAssignSlaves(buildingId, 0)}
            >
              Retirer tous
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onAssignSlaves(buildingId, maxSlaves)}
            >
              Max optimal
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
