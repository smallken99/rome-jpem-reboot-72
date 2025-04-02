
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Plus, Minus, ShoppingCart, CoinsIcon } from 'lucide-react';

interface SlavePurchaseFormProps {
  balance: number;
  slavePrice: number;
  totalSlaves: number;
  onPurchase: (count: number, type: string) => boolean;
  onSell: (slaveIds: string[]) => number;
}

export const SlavePurchaseForm: React.FC<SlavePurchaseFormProps> = ({
  balance,
  slavePrice,
  totalSlaves,
  onPurchase,
  onSell
}) => {
  const [quantity, setQuantity] = useState(1);
  const [type, setType] = useState('agriculture');
  
  const totalCost = quantity * slavePrice;
  const canAfford = balance >= totalCost;
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };
  
  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecrement = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };
  
  const handlePurchase = () => {
    if (!canAfford) return;
    onPurchase(quantity, type);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Commerce d'esclaves</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="quantity">Quantité à acheter</Label>
              <div className="flex mt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="mx-2 text-center"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleIncrement}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="type">Spécialisation</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type" className="w-full">
                  <SelectValue placeholder="Choisir une spécialisation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agriculture">Agriculture</SelectItem>
                  <SelectItem value="mining">Extraction</SelectItem>
                  <SelectItem value="household">Domestique</SelectItem>
                  <SelectItem value="craftsman">Artisanat</SelectItem>
                  <SelectItem value="labor">Main d'œuvre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handlePurchase}
              disabled={!canAfford}
              className="w-full mt-2"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Acheter pour {totalCost.toLocaleString()} As
            </Button>
            
            {!canAfford && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Fonds insuffisants. Il vous manque {(totalCost - balance).toLocaleString()} As.
                </AlertDescription>
              </Alert>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="border rounded-md p-4">
              <h3 className="font-medium text-lg mb-2">Informations</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Prix unitaire:</dt>
                  <dd className="font-medium">{slavePrice.toLocaleString()} As</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Esclaves actuels:</dt>
                  <dd className="font-medium">{totalSlaves}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Balance disponible:</dt>
                  <dd className="font-medium">{balance.toLocaleString()} As</dd>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <dt className="text-muted-foreground">Total à payer:</dt>
                  <dd className="font-bold">{totalCost.toLocaleString()} As</dd>
                </div>
              </dl>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p className="mb-2">
                Les esclaves contribuent significativement à la productivité de vos propriétés.
                Investir dans des esclaves spécialisés peut accroître vos revenus.
              </p>
              <p>
                Note: Les esclaves nécessitent un entretien régulier pour maintenir leur productivité.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
