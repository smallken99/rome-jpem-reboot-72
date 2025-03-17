
import React, { useState } from 'react';
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { formatCurrency } from '@/utils/currencyUtils';
import { CalendarClock, CreditCard, Users, AlertTriangle, Loader2 } from 'lucide-react';

interface BuildingConstructionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  buildingType: string;
  buildingName: string;
  baseCost: number;
  constructionTime: number;
  onStartConstruction: (data: {
    name: string;
    location: string;
    type: string;
    size: string;
    quality: string;
    slaves: number;
    finalCost: number;
    constructionTime: number;
  }) => Promise<boolean>;
  isLoading: boolean;
  availableBalance: number;
  availableSlaves: number;
}

export const BuildingConstructionDialog: React.FC<BuildingConstructionDialogProps> = ({
  open,
  onOpenChange,
  buildingType,
  buildingName,
  baseCost,
  constructionTime,
  onStartConstruction,
  isLoading,
  availableBalance,
  availableSlaves
}) => {
  const [customName, setCustomName] = useState(`Nouveau ${buildingName}`);
  const [location, setLocation] = useState('Rome');
  const [size, setSize] = useState('medium');
  const [quality, setQuality] = useState('standard');
  const [slaves, setSlaves] = useState(Math.min(5, availableSlaves));
  const [submitting, setSubmitting] = useState(false);
  
  // Calculate adjusted cost and time based on selections
  const sizeMultiplier = size === 'small' ? 0.7 : size === 'large' ? 1.5 : 1;
  const qualityMultiplier = quality === 'basic' ? 0.8 : quality === 'luxury' ? 1.4 : 1;
  const slavesTimeReduction = Math.min(0.3, slaves * 0.03); // Each slave reduces time by 3%, max 30%
  
  const finalCost = Math.round(baseCost * sizeMultiplier * qualityMultiplier);
  const adjustedConstructionTime = Math.max(1, Math.round(constructionTime * (1 - slavesTimeReduction)));
  
  const canAfford = availableBalance >= finalCost;
  const canStartConstruction = canAfford && slaves <= availableSlaves;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canStartConstruction || submitting) return;
    
    setSubmitting(true);
    
    const success = await onStartConstruction({
      name: customName,
      location,
      type: buildingType,
      size,
      quality,
      slaves,
      finalCost,
      constructionTime: adjustedConstructionTime
    });
    
    if (success) {
      setSubmitting(false);
      onOpenChange(false);
    } else {
      setSubmitting(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-cinzel text-xl">
            Construire un {buildingName}
          </DialogTitle>
          <DialogDescription>
            Définissez les spécifications de votre nouvelle construction
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="customName" className="text-right">
                Nom
              </Label>
              <Input
                id="customName"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="col-span-3"
                placeholder="Nom de votre nouvelle propriété"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Emplacement
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="col-span-3"
                placeholder="Emplacement de la construction"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="size" className="text-right">
                Taille
              </Label>
              <Select value={size} onValueChange={setSize}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Taille du bâtiment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Petite (70% du coût)</SelectItem>
                  <SelectItem value="medium">Moyenne (coût standard)</SelectItem>
                  <SelectItem value="large">Grande (150% du coût)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quality" className="text-right">
                Qualité
              </Label>
              <Select value={quality} onValueChange={setQuality}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Qualité de construction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basique (80% du coût)</SelectItem>
                  <SelectItem value="standard">Standard (coût normal)</SelectItem>
                  <SelectItem value="luxury">Luxueuse (140% du coût)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="slaves" className="text-right">
                Esclaves
              </Label>
              <div className="col-span-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">0</span>
                  <span className="text-sm text-muted-foreground">{availableSlaves}</span>
                </div>
                <Slider
                  value={[slaves]}
                  min={0}
                  max={availableSlaves}
                  step={1}
                  onValueChange={(values) => setSlaves(values[0])}
                />
                <div className="flex justify-between items-center text-sm">
                  <span>Esclaves assignés: <strong>{slaves}</strong></span>
                  <span className="text-green-600">-{Math.round(slavesTimeReduction * 100)}% de temps</span>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Coût total</p>
                    <p className={`text-lg font-semibold ${!canAfford ? 'text-red-600' : ''}`}>
                      {formatCurrency(finalCost)}
                    </p>
                    {!canAfford && (
                      <p className="text-red-600 text-xs">Fonds insuffisants</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <CalendarClock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Temps de construction</p>
                    <p className="text-lg font-semibold">
                      {adjustedConstructionTime} {adjustedConstructionTime > 1 ? 'saisons' : 'saison'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Main d'œuvre requise</p>
                    <p className={`text-lg font-semibold ${slaves > availableSlaves ? 'text-red-600' : ''}`}>
                      {slaves} esclaves
                    </p>
                    {slaves > availableSlaves && (
                      <p className="text-red-600 text-xs">Esclaves insuffisants</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {!canStartConstruction && (
              <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800">Ressources insuffisantes</p>
                  <p className="text-amber-700">
                    {!canAfford ? 'Vous n\'avez pas assez de fonds pour cette construction. ' : ''}
                    {slaves > availableSlaves ? 'Vous n\'avez pas assez d\'esclaves disponibles.' : ''}
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button 
              type="submit" 
              disabled={!canStartConstruction || submitting || isLoading}
            >
              {(submitting || isLoading) ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Traitement...
                </>
              ) : (
                'Démarrer la construction'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
