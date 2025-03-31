
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface SlavePurchaseFormProps {
  slavePrice: number;
  totalSlaves: number;
  onPurchase: (count: number) => void;
  onSell: (count: number) => void;
  balance?: number;
}

export const SlavePurchaseForm: React.FC<SlavePurchaseFormProps> = ({ 
  slavePrice, 
  totalSlaves, 
  onPurchase, 
  onSell,
  balance
}) => {
  const [purchaseCount, setPurchaseCount] = useState(1);
  const [sellCount, setSellCount] = useState(1);

  const handlePurchase = () => {
    if (purchaseCount > 0) {
      onPurchase(purchaseCount);
      setPurchaseCount(1);
    }
  };

  const handleSell = () => {
    if (sellCount > 0 && sellCount <= totalSlaves) {
      onSell(sellCount);
      setSellCount(1);
    }
  };

  const canPurchase = balance ? slavePrice * purchaseCount <= balance : true;
  const canSell = sellCount <= totalSlaves;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase or Sell Slaves</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="purchase-count">Purchase Slaves</Label>
              <div className="flex mt-2">
                <Input
                  id="purchase-count"
                  type="number"
                  min="1"
                  value={purchaseCount}
                  onChange={(e) => setPurchaseCount(parseInt(e.target.value) || 1)}
                  className="mr-2"
                />
                <Button 
                  onClick={handlePurchase} 
                  disabled={!canPurchase}
                  className="whitespace-nowrap"
                >
                  Buy ({slavePrice * purchaseCount} as)
                </Button>
              </div>
              {!canPurchase && (
                <p className="text-sm text-red-500 mt-1">Insufficient funds</p>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Current slave market price: <span className="font-medium">{slavePrice} as</span> per slave
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="sell-count">Sell Slaves</Label>
              <div className="flex mt-2">
                <Input
                  id="sell-count"
                  type="number"
                  min="1"
                  max={totalSlaves}
                  value={sellCount}
                  onChange={(e) => setSellCount(parseInt(e.target.value) || 1)}
                  className="mr-2"
                />
                <Button 
                  onClick={handleSell} 
                  disabled={!canSell}
                  variant="outline"
                  className="whitespace-nowrap"
                >
                  Sell ({Math.floor(slavePrice * 0.8) * sellCount} as)
                </Button>
              </div>
              {!canSell && (
                <p className="text-sm text-red-500 mt-1">Not enough slaves to sell</p>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Selling price: <span className="font-medium">{Math.floor(slavePrice * 0.8)} as</span> per slave (80% of market price)
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
