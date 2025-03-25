
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Coins } from 'lucide-react';

interface SlavePurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPurchase: (count: number) => void;
  availableSlaves: number;
  pricePerSlave: number;
  balance: number;
}

export const SlavePurchaseDialog: React.FC<SlavePurchaseDialogProps> = ({
  open,
  onOpenChange,
  onPurchase,
  availableSlaves,
  pricePerSlave,
  balance
}) => {
  const [count, setCount] = useState<number>(1);
  const [inputValue, setInputValue] = useState<string>('1');
  const maxAffordable = Math.floor(balance / pricePerSlave);
  const maxPurchase = Math.min(10, maxAffordable);
  
  // Reset count when the dialog opens
  useEffect(() => {
    if (open) {
      setCount(1);
      setInputValue('1');
    }
  }, [open]);
  
  const handleSliderChange = (value: number[]) => {
    const newCount = value[0];
    setCount(newCount);
    setInputValue(newCount.toString());
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    const parsed = parseInt(value);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= maxPurchase) {
      setCount(parsed);
    }
  };
  
  const handleBlur = () => {
    const parsed = parseInt(inputValue);
    if (isNaN(parsed) || parsed < 1) {
      setCount(1);
      setInputValue('1');
    } else if (parsed > maxPurchase) {
      setCount(maxPurchase);
      setInputValue(maxPurchase.toString());
    }
  };
  
  const totalCost = count * pricePerSlave;
  const canAfford = totalCost <= balance;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Achat d'esclaves</DialogTitle>
          <DialogDescription>
            Acquérir des esclaves pour vos propriétés
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="slave-count">Nombre d'esclaves à acheter</Label>
              <div className="flex items-center gap-1 text-sm font-medium">
                <Coins className="h-4 w-4" />
                <span>{pricePerSlave} As par esclave</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Slider
                id="slave-count"
                value={[count]}
                min={1}
                max={maxPurchase}
                step={1}
                onValueChange={handleSliderChange}
                className="flex-1"
              />
              <Input
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleBlur}
                min={1}
                max={maxPurchase}
                className="w-20"
              />
            </div>
          </div>
          
          <div className="pt-2">
            <div className="flex justify-between font-medium">
              <span>Coût total:</span>
              <span>{totalCost.toLocaleString()} As</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>Votre solde:</span>
              <span>{balance.toLocaleString()} As</span>
            </div>
          </div>
          
          {!canAfford && (
            <Alert variant="destructive" className="mt-2">
              <AlertDescription>
                Vous n'avez pas assez de fonds pour cet achat.
              </AlertDescription>
            </Alert>
          )}
          
          {availableSlaves === 0 && (
            <Alert className="mt-2">
              <AlertDescription>
                Vous n'avez pas besoin d'esclaves supplémentaires en ce moment.
              </AlertDescription>
            </Alert>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button 
            onClick={() => {
              onPurchase(count);
              onOpenChange(false);
            }}
            disabled={!canAfford || count < 1 || availableSlaves === 0}
          >
            Acheter pour {totalCost.toLocaleString()} As
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
