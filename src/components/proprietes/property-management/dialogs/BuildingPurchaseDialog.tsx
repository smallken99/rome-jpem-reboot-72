
import React, { useState } from 'react';
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BuildingPurchaseOptions } from '../../hooks/building/types';
import { formatCurrency } from '@/utils/currencyUtils';
import { Loader2 } from 'lucide-react';

interface BuildingPurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  buildingType: string;
  buildingId: string;
  buildingName: string;
  initialCost: number;
  maintenanceCost: number;
  requiredSlaves?: number;
  locations: string[];
  onPurchase: (options: BuildingPurchaseOptions) => Promise<boolean>;
  isLoading: boolean;
  availableBalance: number;
}

export const BuildingPurchaseDialog: React.FC<BuildingPurchaseDialogProps> = ({
  open,
  onOpenChange,
  buildingType,
  buildingId,
  buildingName,
  initialCost,
  maintenanceCost,
  requiredSlaves = 0,
  locations,
  onPurchase,
  isLoading,
  availableBalance
}) => {
  const [customName, setCustomName] = useState(buildingName);
  const [location, setLocation] = useState(locations[0] || 'Rome');
  const [submitting, setSubmitting] = useState(false);
  const canAfford = availableBalance >= initialCost;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canAfford || submitting) return;
    
    setSubmitting(true);
    
    const options: BuildingPurchaseOptions = {
      buildingId,
      type: buildingType as "urban" | "rural" | "religious" | "public",
      name: customName || buildingName,
      location,
      initialCost,
      maintenanceCost,
      slaves: requiredSlaves
    };
    
    const success = await onPurchase(options);
    
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
            Acquérir un {buildingName}
          </DialogTitle>
          <DialogDescription>
            Complétez les informations pour acquérir cette propriété
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customName" className="text-right">
                Nom
              </Label>
              <Input
                id="customName"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="col-span-3"
                placeholder="Nom personnalisé de votre propriété"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Emplacement
              </Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Choisir un emplacement" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>Coût initial</Label>
                  <div className={`font-semibold text-lg ${!canAfford ? 'text-red-600' : ''}`}>
                    {formatCurrency(initialCost)}
                  </div>
                  {!canAfford && (
                    <p className="text-red-600 text-sm">Fonds insuffisants</p>
                  )}
                </div>
                
                <div className="space-y-1">
                  <Label>Entretien annuel</Label>
                  <div className="font-semibold text-lg">
                    {formatCurrency(maintenanceCost)}
                  </div>
                </div>
                
                {requiredSlaves > 0 && (
                  <div className="space-y-1 col-span-2">
                    <Label>Esclaves requis</Label>
                    <div className="font-semibold">
                      {requiredSlaves} esclaves
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={!canAfford || submitting || isLoading}
            >
              {(submitting || isLoading) ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Traitement...
                </>
              ) : (
                'Confirmer l\'achat'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
