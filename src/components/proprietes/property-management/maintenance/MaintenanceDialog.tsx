
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Wrench, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { OwnedBuilding } from '../../hooks/building/types';
import { formatCurrency } from '@/utils/currencyUtils';

interface MaintenanceDialogProps {
  open: boolean;
  onClose: () => void;
  building: OwnedBuilding;
  onPerformMaintenance: () => void;
}

export const MaintenanceDialog: React.FC<MaintenanceDialogProps> = ({
  open,
  onClose,
  building,
  onPerformMaintenance
}) => {
  const conditionColor = building.condition >= 70 ? 'green' : building.condition >= 40 ? 'amber' : 'red';
  const needsRepair = building.condition < 70;
  const costEstimate = 1000 + Math.round((100 - building.condition) * 50);
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Maintenance de la propriété</DialogTitle>
          <DialogDescription>
            Évaluez et entretenez l'état de {building.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">État actuel</span>
              <span className="text-sm font-medium">{building.condition}%</span>
            </div>
            <Progress value={building.condition} className="h-2" 
              color={conditionColor} />
          </div>
          
          <div className="border rounded-md p-4">
            {needsRepair ? (
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <AlertTriangle className={`h-6 w-6 text-${conditionColor}-500`} />
                </div>
                <div>
                  <h4 className="font-medium mb-2">Des réparations sont nécessaires</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Cette propriété nécessite des travaux d'entretien pour prévenir une 
                    détérioration plus importante et maintenir sa valeur.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Coût estimé:</span>
                      <p className="font-medium">{formatCurrency(costEstimate)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Amélioration prévue:</span>
                      <p className="font-medium">+{Math.min(100 - building.condition, 30)}%</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <h4 className="font-medium mb-2">Propriété en bon état</h4>
                  <p className="text-sm text-muted-foreground">
                    Cette propriété est bien entretenue et ne nécessite pas
                    de réparations immédiates.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Fermer</Button>
          {needsRepair && (
            <Button 
              onClick={() => {
                onPerformMaintenance();
                onClose();
              }}
              className="gap-2"
            >
              <Wrench className="h-4 w-4" />
              <span>Réparer ({formatCurrency(costEstimate)})</span>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
