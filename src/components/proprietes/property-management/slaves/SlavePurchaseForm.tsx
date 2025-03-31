
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, PlusCircle, MinusCircle } from 'lucide-react';
import { formatCurrency } from '@/utils/currencyUtils';

export interface SlavePurchaseFormProps {
  slavePrice: number;
  totalSlaves: number;
  onPurchase: (count: number, price: number) => boolean;
  onSell: (count: number) => boolean;
  balance?: number;
  maxPurchase?: number;
}

export const SlavePurchaseForm: React.FC<SlavePurchaseFormProps> = ({
  slavePrice,
  totalSlaves,
  onPurchase,
  onSell,
  balance = 0,
  maxPurchase = 100
}) => {
  const [purchaseCount, setPurchaseCount] = useState(1);
  const [sellCount, setSellCount] = useState(1);
  const [error, setError] = useState('');
  
  // Calculate total purchase price
  const totalPurchasePrice = purchaseCount * slavePrice;
  
  // Check if purchase is possible
  const canPurchase = purchaseCount > 0 && purchaseCount <= maxPurchase && totalPurchasePrice <= balance;
  
  // Check if selling is possible
  const canSell = sellCount > 0 && sellCount <= totalSlaves;
  
  const handlePurchase = () => {
    if (!canPurchase) {
      setError('Impossible d\'acheter ce nombre d\'esclaves. Vérifiez votre solde ou la quantité.');
      return;
    }
    
    setError('');
    const success = onPurchase(purchaseCount, slavePrice);
    if (success) {
      setPurchaseCount(1);
    } else {
      setError('Une erreur est survenue lors de l\'achat');
    }
  };
  
  const handleSell = () => {
    if (!canSell) {
      setError('Impossible de vendre ce nombre d\'esclaves');
      return;
    }
    
    setError('');
    const success = onSell(sellCount);
    if (success) {
      setSellCount(1);
    } else {
      setError('Une erreur est survenue lors de la vente');
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acheter et vendre des esclaves</CardTitle>
        <CardDescription>Gérez votre main d'œuvre servile</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Purchase section */}
          <div className="space-y-4">
            <h3 className="font-medium">Acheter des esclaves</h3>
            
            <div className="space-y-2">
              <Label htmlFor="purchaseCount">Nombre d'esclaves à acheter</Label>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setPurchaseCount(Math.max(1, purchaseCount - 1))}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <Input 
                  id="purchaseCount"
                  type="number" 
                  min="1"
                  value={purchaseCount}
                  onChange={(e) => setPurchaseCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="text-center"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setPurchaseCount(purchaseCount + 1)}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Prix unitaire:</span>
                <span>{formatCurrency(slavePrice)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Coût total:</span>
                <span>{formatCurrency(totalPurchasePrice)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Solde disponible:</span>
                <span>{formatCurrency(balance)}</span>
              </div>
            </div>
            
            <Button 
              onClick={handlePurchase}
              disabled={!canPurchase}
              className="w-full"
            >
              Acheter
            </Button>
          </div>
          
          {/* Sell section */}
          <div className="space-y-4">
            <h3 className="font-medium">Vendre des esclaves</h3>
            
            <div className="space-y-2">
              <Label htmlFor="sellCount">Nombre d'esclaves à vendre</Label>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setSellCount(Math.max(1, sellCount - 1))}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <Input 
                  id="sellCount"
                  type="number" 
                  min="1"
                  max={totalSlaves}
                  value={sellCount}
                  onChange={(e) => setSellCount(Math.max(1, parseInt(e.target.value) || 1))}
                  className="text-center"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setSellCount(Math.min(totalSlaves, sellCount + 1))}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Prix de vente estimé:</span>
                <span>{formatCurrency(sellCount * (slavePrice * 0.8))}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Esclaves disponibles:</span>
                <span>{totalSlaves}</span>
              </div>
            </div>
            
            <Button 
              onClick={handleSell}
              disabled={!canSell}
              variant="outline"
              className="w-full"
            >
              Vendre
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
