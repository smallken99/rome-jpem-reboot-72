
import React, { useState } from 'react';
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogDescription, DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Users, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { OwnedBuilding } from '../../hooks/useBuildingManagement';
import { BuildingDescription } from '../../data/types/buildingTypes';

interface SlaveAssignmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  building: OwnedBuilding | null;
  buildingDetails: BuildingDescription | null;
  totalAvailableSlaves: number;
  onAssignSlaves: (buildingId: number, slaveCount: number) => void;
}

export const SlaveAssignmentDialog: React.FC<SlaveAssignmentDialogProps> = ({
  open,
  onOpenChange,
  building,
  buildingDetails,
  totalAvailableSlaves,
  onAssignSlaves
}) => {
  const [slaveCount, setSlaveCount] = useState<number>(building?.slaves || 0);
  
  if (!building || !buildingDetails || !buildingDetails.slaves) return null;
  
  const maxAvailable = totalAvailableSlaves + building.slaves;
  const { required, optimal } = buildingDetails.slaves;
  
  const handleSliderChange = (value: number[]) => {
    setSlaveCount(value[0]);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= maxAvailable) {
      setSlaveCount(value);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAssignSlaves(building.id, slaveCount);
    onOpenChange(false);
  };
  
  // Calculer l'efficacité en fonction du nombre d'esclaves
  const calculateEfficiency = (): number => {
    if (slaveCount < required) {
      return Math.round((slaveCount / required) * 50); // 0-50% si sous le minimum
    }
    if (slaveCount < optimal) {
      // 50-100% entre minimum et optimal
      return Math.round(50 + ((slaveCount - required) / (optimal - required)) * 50);
    }
    return 100; // 100% à l'optimal ou plus
  };
  
  const efficiency = calculateEfficiency();
  
  const getEfficiencyColor = () => {
    if (efficiency < 25) return 'text-red-600';
    if (efficiency < 50) return 'text-orange-500';
    if (efficiency < 75) return 'text-amber-500';
    if (efficiency < 100) return 'text-green-500';
    return 'text-emerald-600';
  };
  
  const getEfficiencyIcon = () => {
    if (efficiency < 50) return <TrendingDown className="h-5 w-5" />;
    if (efficiency < 100) return <TrendingUp className="h-5 w-5" />;
    return <TrendingUp className="h-5 w-5" />;
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="font-cinzel text-xl">
            Gestion des esclaves: {building.name}
          </DialogTitle>
          <DialogDescription>
            Attribuez des esclaves à cette propriété pour maximiser son rendement.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div className="bg-gray-100 p-3 rounded-lg text-sm space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <div className="text-xs text-muted-foreground">Minimum requis</div>
                  <div className="font-semibold">{required} esclaves</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Optimal</div>
                  <div className="font-semibold">{optimal} esclaves</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Disponibles</div>
                  <div className="font-semibold">{maxAvailable} esclaves</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="slaveCount">Nombre d'esclaves à attribuer</Label>
                <div className="text-sm text-muted-foreground">
                  {slaveCount} / {maxAvailable}
                </div>
              </div>
              
              <div className="flex gap-4 items-center">
                <Users className="h-5 w-5 text-muted-foreground" />
                <Slider
                  value={[slaveCount]}
                  min={0}
                  max={maxAvailable}
                  step={1}
                  onValueChange={handleSliderChange}
                  className="flex-1"
                />
                <Input
                  id="slaveCount"
                  type="number"
                  min="0"
                  max={maxAvailable}
                  value={slaveCount}
                  onChange={handleInputChange}
                  className="w-16"
                />
              </div>
            </div>
            
            <div className="space-y-2 pt-2">
              <Label>Efficacité opérationnelle</Label>
              <div className="flex items-center gap-2">
                <div className={`text-lg font-bold ${getEfficiencyColor()}`}>
                  {efficiency}%
                </div>
                <div className={getEfficiencyColor()}>
                  {getEfficiencyIcon()}
                </div>
              </div>
              
              <div className="h-2 w-full bg-gray-200 rounded-full">
                <div
                  className={`h-full rounded-full ${
                    efficiency < 25 ? 'bg-red-500' :
                    efficiency < 50 ? 'bg-orange-500' :
                    efficiency < 75 ? 'bg-amber-500' :
                    efficiency < 100 ? 'bg-green-500' :
                    'bg-emerald-500'
                  }`}
                  style={{ width: `${efficiency}%` }}
                />
              </div>
              
              {efficiency < 50 && (
                <div className="flex items-start gap-2 p-2 bg-red-50 border border-red-200 rounded mt-2">
                  <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                  <div className="text-xs text-red-600">
                    Personnel insuffisant. La propriété ne peut pas fonctionner correctement.
                  </div>
                </div>
              )}
              
              {efficiency >= 50 && efficiency < 100 && (
                <div className="flex items-start gap-2 p-2 bg-amber-50 border border-amber-200 rounded mt-2">
                  <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                  <div className="text-xs text-amber-600">
                    Personnel fonctionnel mais non optimal. Envisagez d'attribuer plus d'esclaves.
                  </div>
                </div>
              )}
              
              {efficiency === 100 && (
                <div className="flex items-start gap-2 p-2 bg-green-50 border border-green-200 rounded mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                  <div className="text-xs text-green-600">
                    Nombre optimal d'esclaves atteint. Rendement maximal.
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button 
              type="submit" 
              className="roman-btn"
            >
              Confirmer l'attribution
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
