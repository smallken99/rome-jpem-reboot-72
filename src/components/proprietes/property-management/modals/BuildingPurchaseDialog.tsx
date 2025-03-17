
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/utils/currencyUtils';
import { BuildingDescription } from '../../data/types/buildingTypes';
import { BuildingPurchaseOptions } from '../../hooks/building/types';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Building, Landmark, MapPin, Coins, User, Info } from 'lucide-react';

interface BuildingPurchaseDialogProps {
  building: BuildingDescription | null;
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (options: BuildingPurchaseOptions) => Promise<boolean>;
  balance: number;
  locations?: string[];
  isLoading?: boolean;
}

export const BuildingPurchaseDialog: React.FC<BuildingPurchaseDialogProps> = ({
  building,
  isOpen,
  onClose,
  onPurchase,
  balance,
  locations = ['Rome', 'Latium', 'Campanie', 'Étrurie', 'Apulie'],
  isLoading = false
}) => {
  const [customName, setCustomName] = useState('');
  const [location, setLocation] = useState(locations[0]);
  
  if (!building) return null;
  
  const canAfford = balance >= building.initialCost;
  
  const handlePurchase = async () => {
    if (isLoading || !canAfford) return;
    
    const options: BuildingPurchaseOptions = {
      buildingId: building.id,
      type: building.type,
      name: customName || building.name,
      location,
      initialCost: building.initialCost,
      maintenanceCost: building.maintenanceCost,
      slaves: building.slaves?.required || 0
    };
    
    const success = await onPurchase(options);
    if (success) {
      onClose();
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            <span>Achat de {building.name}</span>
          </DialogTitle>
          <DialogDescription>
            Confirmez les détails de votre acquisition pour développer votre patrimoine.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <RomanCard>
            <RomanCard.Content className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-rome-navy font-cinzel">{building.name}</span>
                <span className="font-bold">{formatCurrency(building.initialCost)}</span>
              </div>
              
              <p className="text-sm text-muted-foreground">{building.description}</p>
              
              <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                <div className="flex items-center gap-1">
                  <Coins className="h-4 w-4 text-muted-foreground" />
                  <span>Entretien: {formatCurrency(building.maintenanceCost)}/an</span>
                </div>
                
                {building.slaves && (
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{building.slaves.required} esclaves requis</span>
                  </div>
                )}
                
                {building.prestige > 0 && (
                  <div className="flex items-center gap-1">
                    <Landmark className="h-4 w-4 text-muted-foreground" />
                    <span>+{building.prestige} prestige</span>
                  </div>
                )}
              </div>
            </RomanCard.Content>
          </RomanCard>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="customName">Nom personnalisé (optionnel)</Label>
              <Input 
                id="customName" 
                value={customName} 
                onChange={(e) => setCustomName(e.target.value)}
                placeholder={building.name}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Emplacement</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger id="location" className="w-full">
                  <SelectValue placeholder="Choisir un emplacement" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(loc => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {building.advantages && building.advantages.length > 0 && (
            <div className="border rounded-md p-3 bg-muted/20">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                <Info className="h-4 w-4" />
                <span>Avantages:</span>
              </h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {building.advantages.map((advantage, idx) => (
                  <li key={idx}>{advantage}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Warning if balance is insufficient */}
          {!canAfford && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              Fonds insuffisants pour cet achat. {formatCurrency(building.initialCost)} requis.
            </div>
          )}
        </div>
        
        <DialogFooter className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Solde disponible:</span> {formatCurrency(balance)}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button 
              onClick={handlePurchase} 
              disabled={isLoading || !canAfford}
              className="gap-2"
            >
              {isLoading ? (
                <>Traitement...</>
              ) : (
                <>
                  <Coins className="h-4 w-4" />
                  <span>Confirmer l'achat</span>
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
