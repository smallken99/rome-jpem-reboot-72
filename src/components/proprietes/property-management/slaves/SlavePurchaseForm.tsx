
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface SlavePurchaseFormProps {
  onPurchase: (quantity: number, type: string, quality: number) => void;
  currentBalance: number;
  slavePrice: number;
}

export const SlavePurchaseForm: React.FC<SlavePurchaseFormProps> = ({ 
  onPurchase, 
  currentBalance,
  slavePrice
}) => {
  const [quantity, setQuantity] = useState(1);
  const [type, setType] = useState('general');
  const [quality, setQuality] = useState(3);
  
  const slaveTypes = [
    { value: 'general', label: 'Usage général' },
    { value: 'domestic', label: 'Domestique' },
    { value: 'field', label: 'Travail des champs' },
    { value: 'artisan', label: 'Artisan' },
    { value: 'educated', label: 'Éduqué' },
    { value: 'gladiator', label: 'Gladiateur' }
  ];
  
  const totalCost = quantity * slavePrice * (quality / 3);
  const canAfford = currentBalance >= totalCost;
  
  const handlePurchase = () => {
    if (canAfford) {
      onPurchase(quantity, type, quality);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Achat d'esclaves</h3>
        <p className="text-sm text-muted-foreground">
          Les esclaves peuvent être assignés à vos propriétés pour augmenter leur productivité ou vendus pour profit.
        </p>
      </div>
      
      <div className="grid gap-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="quantity" className="text-right">
            Quantité
          </Label>
          <div className="col-span-3">
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
              min="1"
              className="w-full"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="type" className="text-right">
            Type
          </Label>
          <div className="col-span-3">
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                {slaveTypes.map((slaveType) => (
                  <SelectItem key={slaveType.value} value={slaveType.value}>
                    {slaveType.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="quality" className="text-right">
            Qualité
          </Label>
          <div className="col-span-3 space-y-2">
            <Slider
              value={[quality]}
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => setQuality(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Basique</span>
              <span>Standard</span>
              <span>Premium</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-4 mt-6">
        <div className="flex justify-between mb-4">
          <span className="font-medium">Coût total:</span>
          <span className={canAfford ? 'font-semibold' : 'font-semibold text-destructive'}>
            {totalCost.toFixed(0)} as
          </span>
        </div>
        
        <div className="flex justify-between mb-6">
          <span className="text-sm text-muted-foreground">Balance actuelle:</span>
          <span className="text-sm">{currentBalance.toFixed(0)} as</span>
        </div>
        
        <Button 
          onClick={handlePurchase} 
          disabled={!canAfford}
          className="w-full"
        >
          Acheter
        </Button>
        
        {!canAfford && (
          <p className="text-sm text-destructive mt-2">
            Vous n'avez pas assez de fonds pour cet achat.
          </p>
        )}
      </div>
    </div>
  );
};
