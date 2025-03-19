
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { useBuildings } from '../hooks/useBuildings';
import { OwnedBuilding } from '../types/buildingTypes';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Wrench, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const MaintenanceTab = ({ buildingId }: { buildingId: string }) => {
  const { buildings, urbanBuildings, ruralBuildings, religiousBuildings, updateBuilding } = useBuildings();
  const building = buildings.find(b => b.id === buildingId);
  
  const [maintenanceLevel, setMaintenanceLevel] = useState(building?.maintenance?.current || 50);
  const [hasChanged, setHasChanged] = useState(false);
  
  if (!building) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>
          Bâtiment non trouvé
        </AlertDescription>
      </Alert>
    );
  }
  
  const handleMaintenanceChange = (value: number[]) => {
    setMaintenanceLevel(value[0]);
    setHasChanged(true);
  };
  
  const getMaintenanceCost = (level: number) => {
    const baseCost = building.maintenance?.baseCost || 100;
    return Math.round(baseCost * (level / 50));
  };
  
  const getMaintenanceStatus = (level: number) => {
    if (level < 20) return { label: 'Négligé', color: 'destructive' };
    if (level < 40) return { label: 'Détérioré', color: 'warning' };
    if (level < 60) return { label: 'Correct', color: 'secondary' };
    if (level < 80) return { label: 'Bon', color: 'default' };
    return { label: 'Excellent', color: 'success' };
  };
  
  const handleSave = () => {
    updateBuilding(buildingId, {
      maintenance: {
        ...building.maintenance,
        current: maintenanceLevel
      }
    });
    setHasChanged(false);
  };
  
  const status = getMaintenanceStatus(maintenanceLevel);
  const currentCost = getMaintenanceCost(maintenanceLevel);
  const previousCost = getMaintenanceCost(building.maintenance?.current || 50);
  const costDifference = currentCost - previousCost;
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            <span>Maintenance du bâtiment</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Niveau de maintenance actuel</span>
            <Badge variant={status.color as any}>{status.label}</Badge>
          </div>
          
          <Slider
            defaultValue={[maintenanceLevel]}
            max={100}
            step={5}
            onValueChange={handleMaintenanceChange}
            className="my-6"
          />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Négligé</span>
            <span>Correct</span>
            <span>Excellent</span>
          </div>
          
          <div className="mt-8 p-4 bg-slate-50 rounded-md">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Coût de maintenance</span>
              <span className="font-semibold">{currentCost} as/an</span>
            </div>
            
            {hasChanged && (
              <div className="flex items-center gap-2 mt-2 text-xs">
                <span>
                  {costDifference > 0 
                    ? `Augmentation de ${costDifference} as/an` 
                    : costDifference < 0 
                      ? `Réduction de ${Math.abs(costDifference)} as/an`
                      : 'Coût inchangé'}
                </span>
              </div>
            )}
          </div>
          
          <Alert variant="info" className="mt-4">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Une maintenance insuffisante peut entraîner une détérioration du bâtiment et une baisse de sa valeur et de ses revenus.
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
