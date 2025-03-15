
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { OwnedBuilding } from '../../hooks/building/types';

interface SlaveAssignmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  building: OwnedBuilding;
  totalAvailableSlaves: number;
  onAssignSlaves: (buildingId: string | number, slaveCount: number) => void;
}

export const SlaveAssignmentDialog: React.FC<SlaveAssignmentDialogProps> = ({
  open,
  onOpenChange,
  building,
  totalAvailableSlaves,
  onAssignSlaves
}) => {
  const [slaveCount, setSlaveCount] = useState(building.slaves);
  const maxSlaves = totalAvailableSlaves || 0;
  
  const handleUpdateSlaves = () => {
    // Récupérer l'ID sous forme de number si possible
    const buildingId = typeof building.id === 'string' ? parseInt(building.id, 10) : building.id;
    
    onAssignSlaves(buildingId, slaveCount);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assigner des esclaves</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="slaves-count">Nombre d'esclaves</Label>
            <Input 
              id="slaves-count"
              type="number"
              value={slaveCount}
              onChange={(e) => setSlaveCount(parseInt(e.target.value))}
              min={0}
              max={maxSlaves}
            />
            <p className="text-xs text-muted-foreground">
              Esclaves disponibles: {maxSlaves - building.slaves + slaveCount}
            </p>
          </div>
          
          <div className="space-y-2">
            <Label>Informations</Label>
            <div className="text-sm bg-muted p-3 rounded-md">
              <ul className="list-disc list-inside space-y-1">
                <li>Plus d'esclaves = plus de rendement</li>
                <li>Chaque esclave coûte en nourriture et logement</li>
                <li>Les esclaves spécialisés sont plus efficaces</li>
              </ul>
            </div>
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
            onClick={handleUpdateSlaves}
            disabled={slaveCount < 0 || slaveCount > maxSlaves}
          >
            Confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
