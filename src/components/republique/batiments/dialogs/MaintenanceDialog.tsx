
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { PublicBuilding } from '../hooks/useBatimentsPublics';
import { Wrench, Coins } from 'lucide-react';
import { useEconomy } from '@/hooks/useEconomy';
import { toast } from 'sonner';

interface MaintenanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedItem: PublicBuilding | null;
  onMaintain: (level: 'minimal' | 'standard' | 'excellent') => void;
}

export const MaintenanceDialog: React.FC<MaintenanceDialogProps> = ({
  open,
  onOpenChange,
  selectedItem,
  onMaintain
}) => {
  const [selectedLevel, setSelectedLevel] = useState<'minimal' | 'standard' | 'excellent'>('standard');
  const economy = useEconomy();
  const [treasuryFunds, setTreasuryFunds] = useState(10000000);
  
  useEffect(() => {
    // Dans une implémentation réelle, nous récupérerions les fonds du trésor depuis l'API
    // Pour l'instant, nous utilisons directement le solde de l'économie
    setTreasuryFunds(economy.balance);
  }, [economy.balance]);
  
  if (!selectedItem) return null;
  
  const getMaintenanceCost = (level: 'minimal' | 'standard' | 'excellent') => {
    switch (level) {
      case 'minimal': return Math.round(selectedItem.maintenanceCost * 0.7);
      case 'standard': return selectedItem.maintenanceCost;
      case 'excellent': return Math.round(selectedItem.maintenanceCost * 1.5);
    }
  };
  
  const getImprovement = (level: 'minimal' | 'standard' | 'excellent') => {
    switch (level) {
      case 'minimal': return '5%';
      case 'standard': return '15%';
      case 'excellent': return '30%';
    }
  };

  const handleSubmit = () => {
    const cost = getMaintenanceCost(selectedLevel);
    if (cost > treasuryFunds) {
      toast.error("Fonds insuffisants dans le trésor public");
      return;
    }
    
    onMaintain(selectedLevel);
    toast.success(`Maintenance ${selectedLevel} effectuée avec succès`);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-cinzel">Maintenance de {selectedItem.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-muted-foreground" />
              <span>État actuel:</span>
            </div>
            <span className={`font-medium ${
              selectedItem.condition < 30 ? "text-red-500" : 
              selectedItem.condition < 70 ? "text-yellow-500" : 
              "text-green-500"
            }`}>
              {selectedItem.condition}%
            </span>
          </div>
          
          <div className="space-y-2">
            <Label>Niveau de maintenance</Label>
            <RadioGroup value={selectedLevel} onValueChange={(value) => setSelectedLevel(value as any)}>
              <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted">
                <RadioGroupItem value="minimal" id="minimal" />
                <Label htmlFor="minimal" className="flex-1 cursor-pointer">
                  <div className="font-medium">Minimal</div>
                  <div className="text-sm text-muted-foreground">Réparations essentielles seulement</div>
                </Label>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium">{getMaintenanceCost('minimal').toLocaleString()} As</span>
                  <span className="text-xs text-green-600">+{getImprovement('minimal')}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted">
                <RadioGroupItem value="standard" id="standard" />
                <Label htmlFor="standard" className="flex-1 cursor-pointer">
                  <div className="font-medium">Standard</div>
                  <div className="text-sm text-muted-foreground">Maintenance complète</div>
                </Label>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium">{getMaintenanceCost('standard').toLocaleString()} As</span>
                  <span className="text-xs text-green-600">+{getImprovement('standard')}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted">
                <RadioGroupItem value="excellent" id="excellent" />
                <Label htmlFor="excellent" className="flex-1 cursor-pointer">
                  <div className="font-medium">Excellent</div>
                  <div className="text-sm text-muted-foreground">Rénovation complète</div>
                </Label>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium">{getMaintenanceCost('excellent').toLocaleString()} As</span>
                  <span className="text-xs text-green-600">+{getImprovement('excellent')}</span>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <div className={`p-3 rounded-md ${getMaintenanceCost(selectedLevel) > treasuryFunds ? 'bg-red-50 border-red-200 border' : 'bg-muted/30'}`}>
            <div className="flex items-center gap-2 text-sm">
              <Coins className="h-4 w-4 text-muted-foreground" />
              <span>Trésor public disponible:</span>
              <span className="font-medium">{treasuryFunds.toLocaleString()} As</span>
              
              {getMaintenanceCost(selectedLevel) > treasuryFunds && (
                <span className="text-xs text-red-500 ml-auto">Fonds insuffisants</span>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
          <Button 
            onClick={handleSubmit}
            disabled={getMaintenanceCost(selectedLevel) > treasuryFunds}
          >
            <Wrench className="h-4 w-4 mr-2" />
            Effectuer la maintenance
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
