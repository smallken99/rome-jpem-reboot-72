
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/utils/currencyUtils';
import { useBuildingMaintenance } from '../../hooks/building/useBuildingMaintenance';
import { OwnedBuilding } from '../../hooks/building/types';
import { Building, Wrench, AlertTriangle, BadgeCheck } from 'lucide-react';

interface BuildingMaintenanceDialogProps {
  building: OwnedBuilding | null;
  isOpen: boolean;
  onClose: () => void;
  balance: number;
}

export const BuildingMaintenanceDialog: React.FC<BuildingMaintenanceDialogProps> = ({
  building,
  isOpen,
  onClose,
  balance
}) => {
  const [maintenanceLevel, setMaintenanceLevel] = useState<'basic' | 'standard' | 'premium'>('standard');
  const { 
    performMaintenance, 
    getMaintenanceOptions, 
    isLoading, 
    toggleMaintenance 
  } = useBuildingMaintenance();
  
  if (!building) return null;
  
  const maintenanceOptions = getMaintenanceOptions(building.id);
  const selectedOption = maintenanceOptions[maintenanceLevel];
  const canAfford = balance >= selectedOption.cost;
  
  const handleMaintenanceToggle = () => {
    toggleMaintenance(building.id, !building.maintenanceEnabled);
  };
  
  const handleMaintenance = async () => {
    if (isLoading || !canAfford) return;
    
    const success = await performMaintenance(building.id, maintenanceLevel);
    if (success) {
      onClose();
    }
  };
  
  const getConditionColor = (condition: number) => {
    if (condition >= 80) return "text-green-600";
    if (condition >= 60) return "text-yellow-600";
    if (condition >= 40) return "text-orange-600";
    return "text-red-600";
  };
  
  const getConditionText = (condition: number) => {
    if (condition >= 90) return "Excellent";
    if (condition >= 75) return "Très bon";
    if (condition >= 60) return "Bon";
    if (condition >= 40) return "Moyen";
    if (condition >= 20) return "Mauvais";
    return "Critique";
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            <span>Maintenance de {building.name}</span>
          </DialogTitle>
          <DialogDescription>
            Maintenez votre propriété en bon état pour préserver sa valeur et assurer sa durabilité.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">État actuel:</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={getConditionColor(building.condition)}>
                {getConditionText(building.condition)}
              </span>
              <span className="text-sm text-muted-foreground">({building.condition}%)</span>
            </div>
          </div>
          
          <Progress 
            value={building.condition} 
            className="h-2" 
            indicatorClassName={
              building.condition >= 80 ? "bg-green-600" :
              building.condition >= 60 ? "bg-yellow-600" :
              building.condition >= 40 ? "bg-orange-600" : "bg-red-600"
            }
          />
          
          {/* Maintenance Enabled Toggle */}
          <div className="flex justify-between items-center border p-3 rounded-md">
            <span className="font-medium">Maintenance automatique</span>
            <Button 
              variant={building.maintenanceEnabled ? "default" : "outline"}
              size="sm"
              onClick={handleMaintenanceToggle}
            >
              {building.maintenanceEnabled ? "Activée" : "Désactivée"}
            </Button>
          </div>
          
          {/* Last Maintenance */}
          {building.lastMaintenance && (
            <div className="text-sm text-muted-foreground">
              Dernière maintenance: {new Date(building.lastMaintenance).toLocaleDateString('fr-FR')}
            </div>
          )}
          
          <div className="border-t pt-4">
            <div className="font-medium mb-2">Options de maintenance</div>
            
            <RadioGroup value={maintenanceLevel} onValueChange={(v) => setMaintenanceLevel(v as any)}>
              <div className="grid gap-3">
                {Object.entries(maintenanceOptions).map(([level, option]) => (
                  <div key={level} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={level} 
                      id={`option-${level}`}
                      disabled={isLoading}
                    />
                    <Label 
                      htmlFor={`option-${level}`}
                      className="flex-1 flex justify-between items-center cursor-pointer"
                    >
                      <span>{option.description} (+{option.improvement}%)</span>
                      <span className="font-medium">{formatCurrency(option.cost)}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
          
          {/* Warning if balance is insufficient */}
          {!canAfford && (
            <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Fonds insuffisants pour cette maintenance.</span>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Coût:</span> {formatCurrency(selectedOption.cost)}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button 
              onClick={handleMaintenance} 
              disabled={isLoading || !canAfford}
              className="gap-2"
            >
              {isLoading ? (
                <>Traitement...</>
              ) : (
                <>
                  <Wrench className="h-4 w-4" />
                  <span>Effectuer la maintenance</span>
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
