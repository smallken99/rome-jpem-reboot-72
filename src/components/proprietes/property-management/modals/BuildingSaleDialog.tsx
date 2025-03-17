
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { formatCurrency } from '@/utils/currencyUtils';
import { OwnedBuilding } from '../../hooks/building/types';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Building, AlertTriangle, Coins } from 'lucide-react';

interface BuildingSaleDialogProps {
  building: OwnedBuilding | null;
  estimatedValue: number;
  isOpen: boolean;
  onClose: () => void;
  onSell: (buildingId: number | string) => Promise<boolean>;
  isLoading?: boolean;
}

export const BuildingSaleDialog: React.FC<BuildingSaleDialogProps> = ({
  building,
  estimatedValue,
  isOpen,
  onClose,
  onSell,
  isLoading = false
}) => {
  const [priceAdjustment, setPriceAdjustment] = useState([0]);
  const [confirmed, setConfirmed] = useState(false);
  
  if (!building) return null;
  
  // Calculate the adjusted price based on slider
  const minPrice = Math.round(estimatedValue * 0.7);
  const maxPrice = Math.round(estimatedValue * 1.3);
  const adjustmentRange = maxPrice - minPrice;
  const adjustedPrice = Math.round(minPrice + (adjustmentRange * (priceAdjustment[0] / 100)));
  
  const resetDialog = () => {
    setPriceAdjustment([0]);
    setConfirmed(false);
  };
  
  const handleClose = () => {
    resetDialog();
    onClose();
  };
  
  const handleSell = async () => {
    if (isLoading) return;
    
    if (!confirmed) {
      setConfirmed(true);
      return;
    }
    
    const success = await onSell(building.id);
    if (success) {
      handleClose();
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            <span>Vendre {building.name}</span>
          </DialogTitle>
          <DialogDescription>
            Définissez le prix de vente de votre propriété pour le marché immobilier romain.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Valeur estimée:</span>
              <span className="font-medium">{formatCurrency(estimatedValue)}</span>
            </div>
            
            <div className="pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Prix minimum:</span>
                <span>{formatCurrency(minPrice)}</span>
              </div>
              
              <Slider
                value={priceAdjustment}
                onValueChange={setPriceAdjustment}
                max={100}
                step={1}
                disabled={confirmed || isLoading}
              />
              
              <div className="flex justify-between mt-2">
                <span className="text-sm text-muted-foreground">Prix maximum:</span>
                <span>{formatCurrency(maxPrice)}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-md bg-muted/10">
              <span className="font-medium">Prix de vente:</span>
              <span className="text-lg font-bold">{formatCurrency(adjustedPrice)}</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>La probabilité de vente et le délai dépendent du prix fixé. Un prix plus élevé peut allonger le temps nécessaire pour trouver un acheteur.</p>
            </div>
          </div>
          
          {confirmed && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Cette action est irréversible. Confirmez-vous la vente de {building.name} pour {formatCurrency(adjustedPrice)} ?
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        <DialogFooter>
          <div className="flex gap-2 w-full justify-end">
            <Button variant="outline" onClick={handleClose}>
              Annuler
            </Button>
            <Button 
              onClick={handleSell}
              disabled={isLoading}
              variant={confirmed ? "destructive" : "default"}
              className="gap-2"
            >
              {isLoading ? (
                <>Traitement...</>
              ) : confirmed ? (
                <>
                  <Coins className="h-4 w-4" />
                  <span>Confirmer la vente</span>
                </>
              ) : (
                <>
                  <Coins className="h-4 w-4" />
                  <span>Vendre pour {formatCurrency(adjustedPrice)}</span>
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
