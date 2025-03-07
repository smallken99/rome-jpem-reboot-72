
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShoppingCart, CoinsIcon, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface SlaveMarketProps {
  slavePrice: number;
  balance: number;
  onPurchase: (amount: number) => void;
}

export const SlaveMarket: React.FC<SlaveMarketProps> = ({
  slavePrice,
  balance,
  onPurchase
}) => {
  const [purchaseAmount, setPurchaseAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const handlePurchaseAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setPurchaseAmount(value);
    }
  };
  
  const handlePurchase = (amount: number) => {
    const totalCost = amount * slavePrice;
    
    if (balance < totalCost) {
      toast.error(`Fonds insuffisants pour acheter ${amount} esclaves (coût: ${totalCost.toLocaleString()} As)`);
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      onPurchase(amount);
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="border border-rome-gold/30 rounded-md p-4 bg-white">
      <h4 className="font-cinzel text-rome-navy mb-4 flex items-center">
        <ShoppingCart className="h-5 w-5 mr-2" />
        Marché aux esclaves
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label className="mb-2 block">Prix actuel du marché</Label>
          <div className="text-lg font-bold text-rome-navy flex items-center">
            <CoinsIcon className="h-4 w-4 mr-2 text-rome-gold" />
            {slavePrice} As par esclave
          </div>
        </div>
        
        <div className="space-y-4">
          <Label className="mb-2 block">Acquérir des esclaves</Label>
          <div className="flex gap-2">
            <Input
              type="number"
              min="1"
              value={purchaseAmount}
              onChange={handlePurchaseAmountChange}
              className="w-20"
            />
            <Button 
              className="roman-btn"
              onClick={() => handlePurchase(purchaseAmount)}
              disabled={isLoading || balance < purchaseAmount * slavePrice}
            >
              {isLoading ? "Transaction..." : `Acheter (${(purchaseAmount * slavePrice).toLocaleString()} As)`}
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="roman-btn-outline"
              onClick={() => handlePurchase(1)}
              disabled={isLoading || balance < slavePrice}
            >
              +1
            </Button>
            <Button 
              variant="outline" 
              className="roman-btn-outline"
              onClick={() => handlePurchase(5)}
              disabled={isLoading || balance < 5 * slavePrice}
            >
              +5
            </Button>
            <Button 
              variant="outline" 
              className="roman-btn-outline"
              onClick={() => handlePurchase(10)}
              disabled={isLoading || balance < 10 * slavePrice}
            >
              +10
            </Button>
          </div>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground flex items-center">
        <AlertCircle className="h-4 w-4 mr-1" />
        Le prix varie selon la disponibilité des esclaves sur le marché et leur qualité.
      </div>
    </div>
  );
};
