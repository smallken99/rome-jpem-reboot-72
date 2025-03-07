
import React, { useState } from 'react';
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogDescription, DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Wrench, Info, AlertTriangle, Calendar } from 'lucide-react';
import { OwnedBuilding } from '../../hooks/useBuildingManagement';

interface MaintenanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  building: OwnedBuilding | null;
  onToggleMaintenance: (buildingId: number, enabled: boolean) => void;
  onPerformMaintenance: (buildingId: number) => boolean;
  balance: number;
}

export const MaintenanceDialog: React.FC<MaintenanceDialogProps> = ({
  open,
  onOpenChange,
  building,
  onToggleMaintenance,
  onPerformMaintenance,
  balance
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!building) return null;
  
  const handleToggle = (enabled: boolean) => {
    onToggleMaintenance(building.id, enabled);
  };
  
  const handleMaintenance = () => {
    setIsSubmitting(true);
    
    const success = onPerformMaintenance(building.id);
    
    if (success) {
      setIsSubmitting(false);
    } else {
      setIsSubmitting(false);
    }
  };
  
  const sufficientFunds = balance >= building.maintenanceCost;
  const needsMaintenance = building.condition < 90;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="font-cinzel text-xl">
            Entretien: {building.name}
          </DialogTitle>
          <DialogDescription>
            Gérez l'entretien de votre propriété pour maintenir sa valeur et sa fonctionnalité.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="space-y-0.5">
                <Label className="text-base">État actuel</Label>
                <div className="text-sm text-muted-foreground">Condition de la propriété</div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${building.condition > 75 ? 'text-green-600' : building.condition > 50 ? 'text-amber-500' : 'text-red-500'}`}>
                  {building.condition}%
                </div>
                <div className="text-xs text-muted-foreground">
                  {building.condition > 90 ? 'Excellent' : 
                   building.condition > 75 ? 'Bon' : 
                   building.condition > 50 ? 'Moyen' : 
                   building.condition > 25 ? 'Mauvais' : 'Critique'}
                </div>
              </div>
            </div>
            
            {building.lastMaintenance && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Dernier entretien: {building.lastMaintenance.toLocaleDateString()}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center p-4 border rounded-md">
              <div className="space-y-0.5">
                <Label className="text-base">Entretien automatique</Label>
                <div className="text-sm text-muted-foreground">Activer le paiement annuel</div>
              </div>
              <Switch 
                checked={building.maintenanceEnabled}
                onCheckedChange={handleToggle}
              />
            </div>
            
            <div className="bg-gray-100 p-3 rounded-lg text-sm space-y-1">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold">Coût d'entretien:</span> 
                <span>{building.maintenanceCost.toLocaleString()} As/an</span>
              </div>
              
              {building.maintenanceEnabled ? (
                <div className="flex items-center gap-2 text-green-600">
                  <Info className="h-4 w-4" />
                  <span>L'entretien automatique est activé</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-amber-600">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Attention: Sans entretien, l'état de la propriété se dégradera</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-base">Entretien immédiat</Label>
            <div className="text-sm text-muted-foreground mb-2">
              Effectuer l'entretien maintenant pour restaurer l'état à 100%
            </div>
            
            <Button 
              onClick={handleMaintenance}
              className="roman-btn w-full"
              disabled={!needsMaintenance || isSubmitting || !sufficientFunds}
            >
              {isSubmitting ? "Traitement..." : `Effectuer l'entretien (${building.maintenanceCost.toLocaleString()} As)`}
            </Button>
            
            {!needsMaintenance && (
              <div className="text-sm text-muted-foreground mt-1">
                La propriété est déjà en bon état
              </div>
            )}
            
            {!sufficientFunds && (
              <div className="text-sm text-red-500 mt-1">
                Fonds insuffisants (solde actuel: {balance.toLocaleString()} As)
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
