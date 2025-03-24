
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingCart, Store, AlertTriangle, Info } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

interface SlaveMarketProps {
  slavePrice: number;
  balance: number;
  availableSlaves: number;
  onPurchase: (amount: number) => boolean;
  onSell: (amount: number) => boolean;
}

export const SlaveMarket: React.FC<SlaveMarketProps> = ({
  slavePrice,
  balance,
  availableSlaves,
  onPurchase,
  onSell
}) => {
  const [purchaseAmount, setPurchaseAmount] = useState(1);
  const [sellAmount, setSellAmount] = useState(1);
  
  const maxPurchaseAmount = Math.floor(balance / slavePrice);
  const purchaseCost = purchaseAmount * slavePrice;
  const sellValue = Math.floor(sellAmount * slavePrice * 0.7); // 70% of purchase price
  
  const handlePurchase = () => {
    if (purchaseAmount <= 0) {
      toast.error("Veuillez entrer une quantité valide");
      return;
    }
    
    if (purchaseCost > balance) {
      toast.error("Fonds insuffisants pour cet achat");
      return;
    }
    
    onPurchase(purchaseAmount);
  };
  
  const handleSell = () => {
    if (sellAmount <= 0) {
      toast.error("Veuillez entrer une quantité valide");
      return;
    }
    
    if (sellAmount > availableSlaves) {
      toast.error(`Vous ne pouvez vendre que ${availableSlaves} esclaves non assignés`);
      return;
    }
    
    onSell(sellAmount);
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Acheter des esclaves</CardTitle>
            <CardDescription>
              Acquérir de nouveaux esclaves pour vos propriétés
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Quantité à acheter</label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Slider
                    value={[purchaseAmount]}
                    onValueChange={(values) => setPurchaseAmount(values[0])}
                    min={1}
                    max={Math.min(50, maxPurchaseAmount)}
                    step={1}
                  />
                </div>
                <Input
                  type="number"
                  value={purchaseAmount}
                  onChange={(e) => setPurchaseAmount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20"
                  min={1}
                  max={maxPurchaseAmount}
                />
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-md space-y-2">
              <div className="flex justify-between">
                <span>Prix unitaire:</span>
                <span className="font-medium">{slavePrice.toLocaleString()} As</span>
              </div>
              <div className="flex justify-between">
                <span>Coût total:</span>
                <span className="font-medium">{purchaseCost.toLocaleString()} As</span>
              </div>
              <div className="flex justify-between">
                <span>Balance après achat:</span>
                <span className={`font-medium ${balance - purchaseCost < 0 ? 'text-red-500' : ''}`}>
                  {(balance - purchaseCost).toLocaleString()} As
                </span>
              </div>
            </div>
            
            {purchaseCost > balance && (
              <div className="flex items-start gap-2 p-3 bg-red-50 rounded-md text-red-700 text-sm">
                <AlertTriangle className="h-4 w-4 mt-0.5" />
                <span>Fonds insuffisants pour cet achat</span>
              </div>
            )}
            
            <Button 
              onClick={handlePurchase}
              className="w-full"
              disabled={purchaseCost > balance || purchaseAmount <= 0}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Acheter {purchaseAmount} esclave{purchaseAmount > 1 ? 's' : ''}
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Vendre des esclaves</CardTitle>
            <CardDescription>
              Vendre des esclaves non assignés
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Quantité à vendre</label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Slider
                    value={[sellAmount]}
                    onValueChange={(values) => setSellAmount(values[0])}
                    min={1}
                    max={availableSlaves > 0 ? availableSlaves : 1}
                    step={1}
                    disabled={availableSlaves === 0}
                  />
                </div>
                <Input
                  type="number"
                  value={sellAmount}
                  onChange={(e) => setSellAmount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20"
                  min={1}
                  max={availableSlaves}
                  disabled={availableSlaves === 0}
                />
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-md space-y-2">
              <div className="flex justify-between">
                <span>Prix de vente unitaire:</span>
                <span className="font-medium">{Math.floor(slavePrice * 0.7).toLocaleString()} As</span>
              </div>
              <div className="flex justify-between">
                <span>Revenu total:</span>
                <span className="font-medium">{sellValue.toLocaleString()} As</span>
              </div>
              <div className="flex justify-between">
                <span>Balance après vente:</span>
                <span className="font-medium">{(balance + sellValue).toLocaleString()} As</span>
              </div>
            </div>
            
            {availableSlaves === 0 && (
              <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-md text-amber-700 text-sm">
                <Info className="h-4 w-4 mt-0.5" />
                <span>Vous n'avez pas d'esclaves disponibles à vendre</span>
              </div>
            )}
            
            <Button 
              onClick={handleSell}
              className="w-full"
              variant="secondary"
              disabled={availableSlaves === 0 || sellAmount <= 0}
            >
              <Store className="h-4 w-4 mr-2" />
              Vendre {sellAmount} esclave{sellAmount > 1 ? 's' : ''}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
