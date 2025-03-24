
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { OwnedBuilding } from '../../hooks/building/types';

interface SlaveAssignmentDialogProps {
  open: boolean;
  onClose: () => void;
  building: OwnedBuilding;
  availableSlaves: number;
  onAssignSlaves: (count: number) => void;
}

export const SlaveAssignmentDialog: React.FC<SlaveAssignmentDialogProps> = ({
  open,
  onClose,
  building,
  availableSlaves,
  onAssignSlaves
}) => {
  const currentAssigned = building.slaves || 0;
  const [slaveCount, setSlaveCount] = useState(currentAssigned);
  const maxAvailable = currentAssigned + availableSlaves;
  
  const handleSliderChange = (value: number[]) => {
    setSlaveCount(value[0]);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= maxAvailable) {
      setSlaveCount(value);
    }
  };
  
  const handleSubmit = () => {
    onAssignSlaves(slaveCount);
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assigner du personnel</DialogTitle>
          <DialogDescription>
            Définissez le nombre d'esclaves à affecter à {building.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="slave-count">Nombre d'esclaves</Label>
              <span className="text-sm text-muted-foreground">
                Maximum: {maxAvailable}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <Slider
                value={[slaveCount]}
                min={0}
                max={maxAvailable}
                step={1}
                onValueChange={handleSliderChange}
                className="flex-1"
              />
              <Input
                id="slave-count"
                value={slaveCount}
                onChange={handleInputChange}
                className="w-20"
                type="number"
                min={0}
                max={maxAvailable}
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <Label>Impact estimé</Label>
            <div className="grid grid-cols-2 gap-4 p-3 border rounded-md bg-muted/20">
              <div>
                <div className="text-sm font-medium">Productivité</div>
                <div className="text-lg mt-1">
                  {slaveCount === 0 ? (
                    <span className="text-red-500">Inactif</span>
                  ) : slaveCount < 5 ? (
                    <span className="text-orange-500">Faible</span>
                  ) : slaveCount < 15 ? (
                    <span className="text-yellow-500">Moyenne</span>
                  ) : (
                    <span className="text-green-500">Élevée</span>
                  )}
                </div>
              </div>
              
              <div>
                <div className="text-sm font-medium">Revenu mensuel</div>
                <div className="text-lg mt-1">
                  {slaveCount === 0 ? (
                    <span className="text-red-500">0 As</span>
                  ) : (
                    <span className="text-green-500">+{slaveCount * 50} As</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit}>Confirmer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
