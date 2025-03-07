
import React, { useState } from 'react';
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogDescription, DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Coins, AlertTriangle } from 'lucide-react';
import { OwnedBuilding } from '../../hooks/useBuildingManagement';

interface PropertySaleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  building: OwnedBuilding | null;
  estimatedValue: number;
  onSell: (buildingId: number, value: number) => boolean;
}

export const PropertySaleDialog: React.FC<PropertySaleDialogProps> = ({
  open,
  onOpenChange,
  building,
  estimatedValue,
  onSell
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!building) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    const success = onSell(building.id, estimatedValue);
    
    if (success) {
      setIsSubmitting(false);
      onOpenChange(false);
    } else {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="font-cinzel text-xl">
            Vendre {building.name}
          </DialogTitle>
          <DialogDescription>
            Confirmez la vente de cette propriété pour recevoir sa valeur marchande.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-600 font-bold text-lg">
              <Coins className="h-5 w-5" />
              <span>Valeur marchande: {estimatedValue.toLocaleString()} As</span>
            </div>
            
            <div className="space-y-2">
              <Label>Détails de la propriété</Label>
              <div className="bg-gray-100 p-3 rounded-lg text-sm space-y-2">
                <p>
                  <span className="font-semibold">Emplacement:</span> {building.location}
                </p>
                <p>
                  <span className="font-semibold">État:</span> {building.condition}%
                </p>
                <p>
                  <span className="font-semibold">Acquis le:</span> {building.purchaseDate.toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-800">Attention</p>
                <p className="text-amber-700">
                  Cette action est irréversible. La vente de cette propriété libérera également les esclaves qui y sont assignés.
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button 
              type="submit" 
              variant="destructive"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Traitement..." : "Confirmer la vente"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
