
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Plus, Minus } from 'lucide-react';

export interface SlavePurchaseFormProps {
  balance: number;
  slavePrice: number;
  totalSlaves: number;
  onPurchase: (count: number, price: number) => boolean;
  onSell: (count: number) => boolean;
}

export const SlavePurchaseForm: React.FC<SlavePurchaseFormProps> = ({
  balance,
  slavePrice,
  totalSlaves,
  onPurchase,
  onSell
}) => {
  const [purchaseCount, setPurchaseCount] = useState(1);
  const [sellCount, setSellCount] = useState(1);
  
  const handlePurchase = () => {
    if (purchaseCount > 0) {
      onPurchase(purchaseCount, slavePrice);
    }
  };
  
  const handleSell = () => {
    if (sellCount > 0 && sellCount <= totalSlaves) {
      onSell(sellCount);
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Acheter des esclaves</CardTitle>
          <CardDescription>
            Prix du marché: {slavePrice} as par esclave
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Nombre d'esclaves à acheter</Label>
                <span className="font-medium">{purchaseCount}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setPurchaseCount(Math.max(1, purchaseCount - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Slider
                  value={[purchaseCount]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => setPurchaseCount(value[0])}
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setPurchaseCount(Math.min(10, purchaseCount + 1))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Coût total</Label>
              <div className="text-2xl font-bold">{purchaseCount * slavePrice} as</div>
              <p className="text-sm text-muted-foreground">
                Solde disponible: {balance} as
              </p>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handlePurchase}
              disabled={purchaseCount * slavePrice > balance}
            >
              Acheter {purchaseCount} esclave{purchaseCount > 1 ? 's' : ''}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Vendre des esclaves</CardTitle>
          <CardDescription>
            Prix de vente: {Math.round(slavePrice * 0.7)} as par esclave
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Nombre d'esclaves à vendre</Label>
                <span className="font-medium">{sellCount}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setSellCount(Math.max(1, sellCount - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Slider
                  value={[sellCount]}
                  min={1}
                  max={totalSlaves}
                  step={1}
                  onValueChange={(value) => setSellCount(value[0])}
                  disabled={totalSlaves <= 0}
                  className="flex-1"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setSellCount(Math.min(totalSlaves, sellCount + 1))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Revenu total</Label>
              <div className="text-2xl font-bold">{sellCount * Math.round(slavePrice * 0.7)} as</div>
              <p className="text-sm text-muted-foreground">
                Esclaves disponibles: {totalSlaves}
              </p>
            </div>
            
            <Button 
              variant="outline"
              className="w-full" 
              onClick={handleSell}
              disabled={totalSlaves <= 0 || sellCount > totalSlaves}
            >
              Vendre {sellCount} esclave{sellCount > 1 ? 's' : ''}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
