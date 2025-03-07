
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wrench, Users, Coins, MoreHorizontal, Building, Trash2 } from 'lucide-react';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger, DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { OwnedBuilding } from '../hooks/useBuildingManagement';
import { MaintenanceDialog } from './dialogs/MaintenanceDialog';
import { SlaveAssignmentDialog } from './dialogs/SlaveAssignmentDialog';
import { PropertySaleDialog } from './dialogs/PropertySaleDialog';
import { BuildingDescription } from '../data/types/buildingTypes';

interface PropertyCardProps {
  building: OwnedBuilding;
  buildingDetails: BuildingDescription | null;
  onToggleMaintenance: (buildingId: number, enabled: boolean) => void;
  onPerformMaintenance: (buildingId: number) => boolean;
  onAssignSlaves: (buildingId: number, slaveCount: number) => void;
  onSell: (buildingId: number, value: number) => boolean;
  balance: number;
  totalAvailableSlaves: number;
  buildingValue: number;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  building,
  buildingDetails,
  onToggleMaintenance,
  onPerformMaintenance,
  onAssignSlaves,
  onSell,
  balance,
  totalAvailableSlaves,
  buildingValue
}) => {
  const [maintenanceDialogOpen, setMaintenanceDialogOpen] = useState(false);
  const [slaveDialogOpen, setSlaveDialogOpen] = useState(false);
  const [saleDialogOpen, setSaleDialogOpen] = useState(false);
  
  // Obtenir la classe CSS pour la condition
  const getConditionClass = () => {
    if (building.condition > 75) return 'bg-green-100 text-green-800 border-green-200';
    if (building.condition > 50) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };
  
  // Obtenir le texte pour la condition
  const getConditionText = () => {
    if (building.condition > 90) return 'Excellent';
    if (building.condition > 75) return 'Bon';
    if (building.condition > 50) return 'Moyen';
    if (building.condition > 25) return 'Mauvais';
    return 'Critique';
  };
  
  return (
    <>
      <Card className="border-rome-gold/30">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="font-cinzel text-base">{building.name}</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setMaintenanceDialogOpen(true)}>
                <Wrench className="mr-2 h-4 w-4" />
                <span>Gérer l'entretien</span>
              </DropdownMenuItem>
              {buildingDetails?.slaves && (
                <DropdownMenuItem onClick={() => setSlaveDialogOpen(true)}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Gérer les esclaves</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSaleDialogOpen(true)} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Vendre la propriété</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground mb-3">{building.location}</div>
          
          <div className="flex justify-between items-center mb-3">
            <Badge variant="outline" className={getConditionClass()}>
              {getConditionText()} ({building.condition}%)
            </Badge>
            
            {building.maintenanceEnabled ? (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                Entretien actif
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                Sans entretien
              </Badge>
            )}
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Coût d'entretien:</span>
              <span className="font-medium">{building.maintenanceCost.toLocaleString()} As/an</span>
            </div>
            
            {buildingDetails?.slaves && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Esclaves assignés:</span>
                <span className="font-medium">
                  {building.slaves} / {buildingDetails.slaves.optimal}
                </span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Valeur estimée:</span>
              <span className="font-medium">{buildingValue.toLocaleString()} As</span>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="roman-btn-outline flex-1"
              onClick={() => setMaintenanceDialogOpen(true)}
            >
              <Wrench className="mr-1 h-4 w-4" />
              Entretien
            </Button>
            
            {buildingDetails?.slaves && (
              <Button 
                variant="outline" 
                size="sm" 
                className="roman-btn-outline flex-1"
                onClick={() => setSlaveDialogOpen(true)}
              >
                <Users className="mr-1 h-4 w-4" />
                Esclaves
              </Button>
            )}
            
            <Button 
              variant="outline" 
              size="sm" 
              className="roman-btn-outline flex-1"
              onClick={() => setSaleDialogOpen(true)}
            >
              <Coins className="mr-1 h-4 w-4" />
              Vendre
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Dialogues pour les actions */}
      <MaintenanceDialog 
        open={maintenanceDialogOpen}
        onOpenChange={setMaintenanceDialogOpen}
        building={building}
        onToggleMaintenance={onToggleMaintenance}
        onPerformMaintenance={onPerformMaintenance}
        balance={balance}
      />
      
      {buildingDetails?.slaves && (
        <SlaveAssignmentDialog 
          open={slaveDialogOpen}
          onOpenChange={setSlaveDialogOpen}
          building={building}
          buildingDetails={buildingDetails}
          totalAvailableSlaves={totalAvailableSlaves}
          onAssignSlaves={onAssignSlaves}
        />
      )}
      
      <PropertySaleDialog 
        open={saleDialogOpen}
        onOpenChange={setSaleDialogOpen}
        building={building}
        estimatedValue={buildingValue}
        onSell={onSell}
      />
    </>
  );
};
