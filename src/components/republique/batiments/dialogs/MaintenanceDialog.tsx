
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { formatMoney } from '@/utils/formatUtils';
import { PublicBuilding } from '../hooks/useBatimentsPublics';

interface MaintenanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedItem: PublicBuilding | null;
  onMaintain: (level: 'minimal' | 'standard' | 'excellent') => void;
}

export const MaintenanceDialog: React.FC<MaintenanceDialogProps> = ({
  open,
  onOpenChange,
  selectedItem,
  onMaintain,
}) => {
  const [maintenanceLevel, setMaintenanceLevel] = useState<'minimal' | 'standard' | 'excellent'>('standard');

  if (!selectedItem) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Maintenance du bâtiment</DialogTitle>
          <DialogDescription>
            Choisissez le niveau de maintenance à effectuer pour {selectedItem?.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="maintenance-minimal">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="maintenance-minimal"
                  name="maintenance"
                  checked={maintenanceLevel === 'minimal'}
                  onChange={() => setMaintenanceLevel('minimal')}
                  className="h-4 w-4"
                />
                <span>Minimal (70% du coût)</span>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Réparations essentielles uniquement. Améliore l'état de 5%.
              </p>
            </Label>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="maintenance-standard">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="maintenance-standard"
                  name="maintenance"
                  checked={maintenanceLevel === 'standard'}
                  onChange={() => setMaintenanceLevel('standard')}
                  className="h-4 w-4"
                />
                <span>Standard (100% du coût)</span>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Maintenance complète. Améliore l'état de 15%.
              </p>
            </Label>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="maintenance-excellent">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="maintenance-excellent"
                  name="maintenance"
                  checked={maintenanceLevel === 'excellent'}
                  onChange={() => setMaintenanceLevel('excellent')}
                  className="h-4 w-4"
                />
                <span>Excellent (150% du coût)</span>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Maintenance de luxe avec améliorations. Améliore l'état de 30%.
              </p>
            </Label>
          </div>
          
          {selectedItem && (
            <div className="mt-2 p-3 bg-muted rounded-md">
              <p className="text-sm">
                Coût estimé: {formatMoney(selectedItem.maintenanceCost * (
                  maintenanceLevel === 'minimal' ? 0.7 : 
                  maintenanceLevel === 'standard' ? 1 : 1.5
                ))}
              </p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={() => onMaintain(maintenanceLevel)}>
            Effectuer la maintenance
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
