
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ChevronRight, Save, UserMinus } from 'lucide-react';
import { SlaveAssignment } from './useSlaveManagement';
import { toast } from 'sonner';

interface SlaveAssignmentsProps {
  slaveAssignments: SlaveAssignment[];
  properties: { id: string; name: string }[];
  totalSlaves: number;
  assignedSlaves: number;
  onAssignSlaves: (propertyId: string, propertyName: string, amount: number) => boolean;
  onRemoveAssignment: (propertyId: string) => boolean;
}

export const SlaveAssignments: React.FC<SlaveAssignmentsProps> = ({
  slaveAssignments,
  properties,
  totalSlaves,
  assignedSlaves,
  onAssignSlaves,
  onRemoveAssignment
}) => {
  const [selectedProperty, setSelectedProperty] = useState<string>('');
  const [slaveCount, setSlaveCount] = useState<number>(5);
  
  // Propriétés sans assignation
  const unassignedProperties = properties.filter(
    property => !slaveAssignments.some(assignment => assignment.propertyId === property.id)
  );
  
  // Esclaves disponibles
  const availableSlaves = totalSlaves - assignedSlaves;
  
  const handleSliderChange = (value: number[]) => {
    setSlaveCount(value[0]);
  };
  
  const handleAssignSlaves = () => {
    if (!selectedProperty) {
      toast.error('Veuillez sélectionner une propriété');
      return;
    }
    
    if (slaveCount <= 0) {
      toast.error('Le nombre d\'esclaves doit être supérieur à 0');
      return;
    }
    
    const property = properties.find(p => p.id === selectedProperty);
    if (!property) {
      toast.error('Propriété invalide');
      return;
    }
    
    const success = onAssignSlaves(property.id, property.name, slaveCount);
    
    if (success) {
      setSelectedProperty('');
      setSlaveCount(5);
    }
  };
  
  const handleManualInput = (value: string) => {
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue)) {
      setSlaveCount(Math.min(numericValue, availableSlaves));
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-cinzel">Assignation des esclaves</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {slaveAssignments.length > 0 ? (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Esclaves assignés</h4>
            {slaveAssignments.map((assignment) => (
              <div key={assignment.propertyId} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                <div>
                  <p className="font-medium text-sm">{assignment.propertyName}</p>
                  <p className="text-xs text-muted-foreground">{assignment.assignedSlaves} esclaves</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onRemoveAssignment(assignment.propertyId)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-100/50"
                >
                  <UserMinus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Aucune assignation d'esclaves active.</p>
        )}
        
        <div className="space-y-4 pt-4 border-t">
          <h4 className="text-sm font-medium">Nouvelle assignation</h4>
          
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="property">Propriété</Label>
              <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                <SelectTrigger id="property">
                  <SelectValue placeholder="Sélectionner une propriété" />
                </SelectTrigger>
                <SelectContent>
                  {unassignedProperties.map((property) => (
                    <SelectItem key={property.id} value={property.id}>{property.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between">
                <Label htmlFor="slave-count">Nombre d'esclaves</Label>
                <span className="text-xs text-muted-foreground">{availableSlaves} disponibles</span>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Slider
                    id="slave-count"
                    min={1}
                    max={availableSlaves || 1}
                    step={1}
                    value={[slaveCount]}
                    onValueChange={handleSliderChange}
                    disabled={availableSlaves === 0}
                  />
                </div>
                <Input
                  type="number"
                  value={slaveCount}
                  onChange={(e) => handleManualInput(e.target.value)}
                  className="w-16"
                  min={1}
                  max={availableSlaves}
                  disabled={availableSlaves === 0}
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleAssignSlaves}
              disabled={!selectedProperty || availableSlaves === 0}
              size="sm"
              className="gap-1"
            >
              <Save className="h-4 w-4" />
              Assigner
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
