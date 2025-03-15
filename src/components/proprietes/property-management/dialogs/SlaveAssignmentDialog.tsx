
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Users, AlertCircle } from 'lucide-react';
import { OwnedBuilding } from '../../hooks/building/types';

export interface SlaveAssignmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  building: OwnedBuilding;
  onAssignSlaves: (buildingId: number | string, slaveCount: number) => void;
  totalAvailableSlaves: number;
}

export const SlaveAssignmentDialog: React.FC<SlaveAssignmentDialogProps> = ({
  open,
  onOpenChange,
  building,
  onAssignSlaves,
  totalAvailableSlaves
}) => {
  const [slaveCount, setSlaveCount] = useState(building.slaves);
  
  // Reset slave count when dialog opens
  useEffect(() => {
    if (open) {
      setSlaveCount(building.slaves);
    }
  }, [open, building.slaves]);
  
  const handleSave = () => {
    onAssignSlaves(building.id, slaveCount);
    onOpenChange(false);
  };
  
  const actualAvailableSlaves = totalAvailableSlaves - building.slaves + slaveCount;

  // Recommended slave count (for optimal efficiency)
  const recommendedSlaves = 5; // This would ideally come from building details
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-cinzel">
            Gestion des esclaves - {building.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Esclaves assignés:</span>
              <span className="font-semibold">{slaveCount}</span>
            </div>
            
            <Slider
              value={[slaveCount]}
              min={0}
              max={Math.max(totalAvailableSlaves, building.slaves)}
              step={1}
              onValueChange={(values) => setSlaveCount(values[0])}
              className="mt-2"
            />
            
            <div className="text-sm text-muted-foreground mt-2">
              Déplacez le curseur pour ajuster le nombre d'esclaves
            </div>
          </div>
          
          <div className="space-y-2 border-t border-border pt-4">
            <Label>Informations:</Label>
            
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Esclaves actuels:</span>
                <span className="font-medium">{building.slaves}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Esclaves disponibles:</span>
                <span className="font-medium">{actualAvailableSlaves}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Recommandé:</span>
                <span className="font-medium">{recommendedSlaves}</span>
              </div>
            </div>
            
            {slaveCount < recommendedSlaves && (
              <div className="flex items-start gap-2 p-3 mt-2 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-sm">
                <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-500" />
                <div>
                  <p className="font-medium">Attention</p>
                  <p>Un nombre insuffisant d'esclaves peut réduire l'efficacité et les revenus.</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            Annuler
          </Button>
          <Button 
            className="roman-btn"
            onClick={handleSave}
          >
            <Users className="mr-2 h-4 w-4" />
            Assigner
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
