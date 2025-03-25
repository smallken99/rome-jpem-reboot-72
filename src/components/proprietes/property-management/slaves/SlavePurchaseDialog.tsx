
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/utils/currencyUtils';
import { Users, AlertCircle } from 'lucide-react';

interface SlavePurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPurchase: (count: number) => void;
  availableSlaves: number;
  pricePerSlave?: number;
  balance: number;
}

export const SlavePurchaseDialog: React.FC<SlavePurchaseDialogProps> = ({
  open,
  onOpenChange,
  onPurchase,
  availableSlaves,
  pricePerSlave = 1000,
  balance
}) => {
  const [slaveCount, setSlaveCount] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  
  const totalCost = slaveCount * pricePerSlave;
  const canAfford = totalCost <= balance;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    
    if (isNaN(value) || value < 1) {
      setSlaveCount(1);
      setError("Le nombre d'esclaves doit être au moins 1");
    } else {
      setSlaveCount(value);
      setError(null);
    }
  };
  
  const handlePurchase = () => {
    if (slaveCount < 1) {
      setError("Le nombre d'esclaves doit être au moins 1");
      return;
    }
    
    if (!canAfford) {
      setError("Fonds insuffisants pour cet achat");
      return;
    }
    
    onPurchase(slaveCount);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Acheter des esclaves</DialogTitle>
          <DialogDescription>
            Achetez des esclaves pour les assigner à vos propriétés.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="slave-count">Nombre d'esclaves</Label>
            <Input
              id="slave-count"
              type="number"
              min={1}
              value={slaveCount}
              onChange={handleChange}
            />
            
            {error && (
              <div className="text-sm text-destructive flex items-center gap-1 mt-1">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm text-muted-foreground">Prix unitaire</p>
              <p className="font-semibold">{formatCurrency(pricePerSlave)}</p>
            </div>
            
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm text-muted-foreground">Coût total</p>
              <p className={`font-semibold ${!canAfford ? 'text-destructive' : ''}`}>
                {formatCurrency(totalCost)}
              </p>
            </div>
          </div>
          
          <div className="mt-2">
            <p className="text-sm flex items-center">
              <Users className="h-4 w-4 mr-1 text-muted-foreground" />
              Esclaves actuels: {availableSlaves}
            </p>
            
            <p className={`text-sm flex items-center mt-1 ${!canAfford ? 'text-destructive' : ''}`}>
              <Coins className="h-4 w-4 mr-1 text-muted-foreground" />
              Balance: {formatCurrency(balance)}
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handlePurchase} disabled={!canAfford}>
            Acheter ({slaveCount})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
