
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { OwnedBuilding } from '../types/buildingTypes';
import { Users, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface WorkersTabProps {
  building: OwnedBuilding;
  updateWorkers: (buildingId: string, workers: number) => void;
}

export const WorkersTab: React.FC<WorkersTabProps> = ({ building, updateWorkers }) => {
  const [workers, setWorkers] = useState(building.workers);
  const [hasChanged, setHasChanged] = useState(false);
  
  // Determine optimal and maximum workers
  const minWorkers = Math.max(1, Math.floor(building.workers * 0.5));
  const optimalWorkers = building.workers;
  const maxWorkers = Math.ceil(building.workers * 1.5);
  
  const handleWorkersChange = (value: number[]) => {
    setWorkers(value[0]);
    setHasChanged(true);
  };
  
  const handleSave = () => {
    updateWorkers(building.id, workers);
    setHasChanged(false);
  };
  
  const getEfficiencyText = (workersCount: number) => {
    if (workersCount < minWorkers) return "Insuffisant - Productivité très réduite";
    if (workersCount < optimalWorkers * 0.8) return "Sous-optimal - Productivité réduite";
    if (workersCount <= optimalWorkers * 1.2) return "Optimal - Excellente productivité";
    if (workersCount <= maxWorkers) return "Surchargé - Productivité légèrement réduite";
    return "Trop nombreux - Productivité réduite et coûts élevés";
  };
  
  const getEfficiencyClass = (workersCount: number) => {
    if (workersCount < minWorkers) return "text-red-500";
    if (workersCount < optimalWorkers * 0.8) return "text-orange-500";
    if (workersCount <= optimalWorkers * 1.2) return "text-green-600";
    if (workersCount <= maxWorkers) return "text-amber-500";
    return "text-red-500";
  };
  
  const getCostPerWorker = () => {
    // Coût par travailleur selon le type de propriété
    if (building.type === 'urban') return 50;
    if (building.type === 'rural') return 30;
    return 40; // Default
  };
  
  const costPerWorker = getCostPerWorker();
  const currentCost = workers * costPerWorker;
  const previousCost = building.workers * costPerWorker;
  const costDifference = currentCost - previousCost;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span>Gestion du personnel</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Personnel actuel</span>
            <span className="font-semibold">{workers} personnes</span>
          </div>
          
          <div className="mt-4">
            <Slider
              defaultValue={[workers]}
              max={maxWorkers * 1.2}
              min={Math.max(1, minWorkers * 0.8)}
              step={1}
              onValueChange={handleWorkersChange}
            />
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Minimum ({minWorkers})</span>
            <span>Optimal ({optimalWorkers})</span>
            <span>Maximum ({maxWorkers})</span>
          </div>
          
          <div className="mt-6 p-4 bg-slate-50 rounded-md">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Efficacité actuelle</span>
              <span className={getEfficiencyClass(workers)}>
                {getEfficiencyText(workers)}
              </span>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm font-medium">Coût du personnel</span>
              <span className="font-semibold">{currentCost} as/an</span>
            </div>
            
            {hasChanged && (
              <div className="flex items-center gap-2 mt-2 text-xs">
                <span>
                  {costDifference > 0 
                    ? `Augmentation de ${costDifference} as/an`
                    : costDifference < 0 
                      ? `Réduction de ${Math.abs(costDifference)} as/an`
                      : 'Coût inchangé'
                  }
                </span>
              </div>
            )}
          </div>
          
          <Alert variant="default" className="mt-4">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Maintenir un nombre optimal de personnel améliore l'efficacité et la productivité de votre propriété.
            </AlertDescription>
          </Alert>
          
          {hasChanged && (
            <div className="flex justify-end mt-6">
              <Button onClick={handleSave}>
                Enregistrer les modifications
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
