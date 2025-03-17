
import React, { useState } from 'react';
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { OwnedBuilding } from '../../hooks/building/types';
import { formatCurrency } from '@/utils/currencyUtils';
import { Hammer, Wallet, ArrowUp, AlertTriangle, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface BuildingMaintenanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  building: OwnedBuilding | null;
  onPerformMaintenance: (buildingId: number | string, level: 'basic' | 'standard' | 'premium') => Promise<boolean>;
  isLoading: boolean;
  availableBalance: number;
}

export const BuildingMaintenanceDialog: React.FC<BuildingMaintenanceDialogProps> = ({
  open,
  onOpenChange,
  building,
  onPerformMaintenance,
  isLoading,
  availableBalance
}) => {
  const [maintenanceLevel, setMaintenanceLevel] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [submitting, setSubmitting] = useState(false);
  
  if (!building) return null;
  
  // Calculate maintenance costs based on level
  const basicCost = Math.round(building.maintenanceCost * 0.6);
  const standardCost = building.maintenanceCost;
  const premiumCost = Math.round(building.maintenanceCost * 1.5);
  
  // Calculate condition improvements
  const basicImprovement = 10;
  const standardImprovement = 20;
  const premiumImprovement = 40;
  
  // Set current cost and improvement based on selected level
  let currentCost = standardCost;
  let currentImprovement = standardImprovement;
  
  switch (maintenanceLevel) {
    case 'basic':
      currentCost = basicCost;
      currentImprovement = basicImprovement;
      break;
    case 'standard':
      currentCost = standardCost;
      currentImprovement = standardImprovement;
      break;
    case 'premium':
      currentCost = premiumCost;
      currentImprovement = premiumImprovement;
      break;
  }
  
  const newCondition = Math.min(100, building.condition + currentImprovement);
  const canAfford = availableBalance >= currentCost;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canAfford || submitting) return;
    
    setSubmitting(true);
    
    const success = await onPerformMaintenance(building.id, maintenanceLevel);
    
    if (success) {
      setSubmitting(false);
      onOpenChange(false);
    } else {
      setSubmitting(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="font-cinzel text-xl">
            Maintenance de {building.name}
          </DialogTitle>
          <DialogDescription>
            Effectuez l'entretien de votre propriété pour maintenir sa valeur et son état
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>État actuel</Label>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Condition: {building.condition}%</span>
                <span className={building.condition < 50 ? 'text-red-500' : 
                                building.condition < 75 ? 'text-amber-500' : 'text-green-600'}>
                  {building.condition < 30 ? 'Délabré' : 
                   building.condition < 50 ? 'Mauvais état' : 
                   building.condition < 75 ? 'État moyen' : 
                   building.condition < 90 ? 'Bon état' : 'Excellent état'}
                </span>
              </div>
              <Progress value={building.condition} className="h-2" />
            </div>
          </div>
          
          <div className="space-y-3">
            <Label>Niveau de maintenance</Label>
            <RadioGroup value={maintenanceLevel} onValueChange={(v) => setMaintenanceLevel(v as 'basic' | 'standard' | 'premium')}>
              <div className="border rounded-md p-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="basic" id="basic" />
                  <Label htmlFor="basic" className="font-medium">Maintenance basique ({formatCurrency(basicCost)})</Label>
                </div>
                <div className="pl-6 text-sm text-muted-foreground">
                  Réparations essentielles uniquement. Améliore l'état de {basicImprovement}%.
                </div>
              </div>
              
              <div className="border rounded-md p-3 space-y-2 border-primary">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard" className="font-medium">Maintenance standard ({formatCurrency(standardCost)})</Label>
                </div>
                <div className="pl-6 text-sm text-muted-foreground">
                  Entretien complet. Améliore l'état de {standardImprovement}%.
                </div>
              </div>
              
              <div className="border rounded-md p-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="premium" id="premium" />
                  <Label htmlFor="premium" className="font-medium">Maintenance premium ({formatCurrency(premiumCost)})</Label>
                </div>
                <div className="pl-6 text-sm text-muted-foreground">
                  Rénovation intensive avec des matériaux de haute qualité. Améliore l'état de {premiumImprovement}%.
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Coût</p>
                  <p className={`text-lg font-semibold ${!canAfford ? 'text-red-600' : ''}`}>
                    {formatCurrency(currentCost)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <ArrowUp className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Nouvelle condition</p>
                  <p className="text-lg font-semibold text-green-600">
                    {newCondition}% (+{currentImprovement}%)
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {!canAfford && (
            <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-800">Fonds insuffisants</p>
                <p className="text-amber-700">
                  Vous n'avez pas assez d'argent pour effectuer cette maintenance.
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={!canAfford || submitting || isLoading}
              className="gap-2"
            >
              {(submitting || isLoading) ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Traitement...
                </>
              ) : (
                <>
                  <Hammer className="h-4 w-4" />
                  Effectuer la maintenance
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
