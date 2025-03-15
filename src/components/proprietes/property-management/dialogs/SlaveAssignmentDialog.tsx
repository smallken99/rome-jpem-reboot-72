
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { OwnedBuilding, BuildingDescription } from '@/components/proprietes/hooks/building/types';

export interface SlaveAssignmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  building: OwnedBuilding;
  buildingDetails: BuildingDescription;
  totalAvailableSlaves: number;
  onAssignSlaves: (buildingId: number | string, slaveCount: number) => void;
}

export const SlaveAssignmentDialog: React.FC<SlaveAssignmentDialogProps> = ({
  open,
  onOpenChange,
  building,
  buildingDetails,
  totalAvailableSlaves,
  onAssignSlaves
}) => {
  const [slaveCount, setSlaveCount] = useState(building.slaves);
  const maxSlaves = buildingDetails.slaves?.optimal || 0;
  const requiredSlaves = buildingDetails.slaves?.required || 0;
  
  // Recalculate available slaves + current slaves
  const availableForAssignment = totalAvailableSlaves + building.slaves;
  
  // Reset slave count when dialog opens
  useEffect(() => {
    if (open) {
      setSlaveCount(building.slaves);
    }
  }, [open, building.slaves]);
  
  const handleConfirm = () => {
    // Call the parent's onAssignSlaves function with the selected slave count
    onAssignSlaves(building.id, slaveCount);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assigner des esclaves</DialogTitle>
          <DialogDescription>
            Assignez des esclaves à cette propriété pour augmenter sa productivité.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm mb-2">
              <div className="font-medium">Esclaves disponibles</div>
              <div>{availableForAssignment} esclaves</div>
            </div>
            
            <div className="flex justify-between text-sm mb-2">
              <div className="font-medium">Esclaves requis</div>
              <div>{requiredSlaves} esclaves</div>
            </div>
            
            <div className="flex justify-between text-sm mb-2">
              <div className="font-medium">Esclaves optimaux</div>
              <div>{maxSlaves} esclaves</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="font-medium">Esclaves assignés</div>
              <div className="font-bold text-rome-gold">{slaveCount} esclaves</div>
            </div>
            
            <Slider
              value={[slaveCount]}
              min={0}
              max={Math.min(maxSlaves, availableForAssignment)}
              step={1}
              onValueChange={(value) => setSlaveCount(value[0])}
              className="w-full"
            />
            
            <div className="flex justify-between text-sm">
              <div>0</div>
              <div>{Math.min(maxSlaves, availableForAssignment)}</div>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm text-amber-800">
            {slaveCount < requiredSlaves ? (
              <p>Attention : Le nombre d'esclaves est insuffisant pour le fonctionnement optimal de cette propriété.</p>
            ) : slaveCount > maxSlaves * 0.8 ? (
              <p>Ce nombre d'esclaves est proche de l'optimal pour maximiser la production.</p>
            ) : (
              <p>Augmenter le nombre d'esclaves améliorera significativement la production.</p>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleConfirm}>
            Confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
