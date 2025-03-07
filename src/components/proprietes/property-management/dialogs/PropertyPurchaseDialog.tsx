
import React, { useState } from 'react';
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogDescription, DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Building, Coins } from 'lucide-react';
import { BuildingDescription } from '../../data/types/buildingTypes';
import { toast } from 'sonner';

interface PropertyPurchaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  building: BuildingDescription | null;
  buildingId: string;
  buildingType: 'urban' | 'rural' | 'religious' | 'public';
  onPurchase: (buildingId: string, buildingType: 'urban' | 'rural' | 'religious' | 'public', location: string, customName?: string) => boolean;
  balance: number;
}

export const PropertyPurchaseDialog: React.FC<PropertyPurchaseDialogProps> = ({
  open,
  onOpenChange,
  building,
  buildingId,
  buildingType,
  onPurchase,
  balance
}) => {
  const [location, setLocation] = useState('');
  const [customName, setCustomName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!building) return null;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location) {
      toast.error("Veuillez spécifier un emplacement");
      return;
    }
    
    setIsSubmitting(true);
    
    const success = onPurchase(
      buildingId,
      buildingType,
      location,
      customName || undefined
    );
    
    if (success) {
      // Réinitialiser les champs et fermer la boîte de dialogue
      setLocation('');
      setCustomName('');
      setIsSubmitting(false);
      onOpenChange(false);
    } else {
      setIsSubmitting(false);
    }
  };
  
  const sufficientFunds = balance >= building.initialCost;
  
  // Options d'emplacement selon le type de bâtiment
  const locationOptions = buildingType === 'urban' || buildingType === 'religious' || buildingType === 'public'
    ? ['Rome - Palatin', 'Rome - Forum', 'Rome - Capitole', 'Rome - Aventin', 'Rome - Champ de Mars', 'Rome - Via Sacra']
    : ['Latium', 'Campanie', 'Toscane', 'Ombrie', 'Apulie', 'Sicile', 'Sardaigne'];
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="font-cinzel text-xl">
            Acquisition de {building.name}
          </DialogTitle>
          <DialogDescription>
            Complétez les détails pour finaliser l'acquisition de cette propriété.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-600 font-bold text-lg">
              <Coins className="h-5 w-5" />
              <span>Coût: {building.initialCost.toLocaleString()} As</span>
            </div>
            
            {!sufficientFunds && (
              <div className="text-red-500 text-sm">
                Fonds insuffisants (solde actuel: {balance.toLocaleString()} As)
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="customName">Nom personnalisé (optionnel)</Label>
              <div className="flex items-center">
                <Building className="mr-2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="customName"
                  placeholder={building.name}
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Emplacement</Label>
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger id="location" className="w-full">
                    <SelectValue placeholder="Sélectionner un emplacement" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Informations supplémentaires</Label>
              <div className="bg-gray-100 p-3 rounded-lg text-sm">
                <p className="mb-2">
                  <span className="font-semibold">Entretien annuel:</span> {building.maintenanceCost.toLocaleString()} As
                </p>
                {building.slaves && (
                  <p>
                    <span className="font-semibold">Esclaves requis:</span> {building.slaves.required} (optimal: {building.slaves.optimal})
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button 
              type="submit" 
              className="roman-btn" 
              disabled={!location || isSubmitting || !sufficientFunds}
            >
              {isSubmitting ? "Traitement..." : "Confirmer l'achat"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
