
import React, { useState } from 'react';
import { OwnedBuilding, BuildingDescription } from '../hooks/building/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Tool, Wrench, Settings, Users, Coins, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '@/utils/currencyUtils';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { SlaveAssignmentDialog } from './slaves/SlaveAssignmentDialog';
import { MaintenanceDialog } from './maintenance/MaintenanceDialog';
import { PropertyCardActions } from './card/PropertyCardActions';
import { toast } from 'sonner';

interface PropertyCardProps {
  building: OwnedBuilding;
  buildingDetails: BuildingDescription | null;
  onToggleMaintenance: (buildingId: string | number, enabled: boolean) => void;
  onPerformMaintenance: (buildingId: string | number) => boolean;
  onAssignSlaves: (buildingId: string | number, slaveCount: number) => void;
  onSell: (buildingId: string | number, value: number) => boolean;
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
  const navigate = useNavigate();
  const [showAssignSlavesDialog, setShowAssignSlavesDialog] = useState(false);
  const [showMaintenanceDialog, setShowMaintenanceDialog] = useState(false);
  
  // Calculer les données d'affichage
  const conditionColor = building.condition >= 70 ? 'green' : building.condition >= 40 ? 'amber' : 'red';
  const maintenanceEnabled = building.maintenanceEnabled || false;
  const needsUrgentMaintenance = building.condition < 30;
  
  // Gérer la vente d'une propriété
  const handleSellProperty = () => {
    if (confirm(`Êtes-vous sûr de vouloir vendre ${building.name} pour ${formatCurrency(buildingValue)}?`)) {
      if (onSell(building.id, buildingValue)) {
        toast.success(`${building.name} a été vendu pour ${formatCurrency(buildingValue)}`);
      } else {
        toast.error("La vente n'a pas pu être effectuée");
      }
    }
  };
  
  // Effectuer une maintenance
  const handlePerformMaintenance = () => {
    if (balance < 1000) {
      toast.error("Fonds insuffisants pour effectuer la maintenance");
      return;
    }
    
    if (onPerformMaintenance(building.id)) {
      toast.success(`Maintenance effectuée sur ${building.name}`);
    } else {
      toast.error("La maintenance n'a pas pu être effectuée");
    }
  };
  
  return (
    <Card className="overflow-hidden border-rome-gold/30 hover:shadow-md transition-all">
      <CardHeader className="bg-white pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-cinzel">{building.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{building.location}</p>
          </div>
          <Badge className={`bg-${conditionColor}-100 text-${conditionColor}-800 border-${conditionColor}-300`}>
            État: {building.condition}%
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm">État</span>
              <span className="text-sm font-medium">{building.condition}%</span>
            </div>
            <Progress value={building.condition} className="h-2" 
              indicatorClassName={`bg-${conditionColor}-500`} />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Revenu</span>
              <span className="font-medium">{formatCurrency(building.income || 0)}/mois</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Maintenance</span>
              <span className="font-medium">{formatCurrency(building.maintenanceCost || 0)}/mois</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Personnel</span>
              <span className="font-medium">{building.slaves || 0} esclaves</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Valeur</span>
              <span className="font-medium">{formatCurrency(buildingValue)}</span>
            </div>
          </div>
          
          {needsUrgentMaintenance && (
            <div className="p-2 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-sm text-red-700">
              <AlertTriangle className="h-4 w-4" />
              <span>Réparations urgentes requises</span>
            </div>
          )}
          
          <PropertyCardActions 
            building={building}
            onViewDetails={() => navigate(`/patrimoine/proprietes/${building.id}`)}
            onPerformMaintenance={handlePerformMaintenance}
            onAssignSlaves={() => setShowAssignSlavesDialog(true)}
            onToggleMaintenance={(enabled) => onToggleMaintenance(building.id, enabled)}
            onSell={handleSellProperty}
            maintenanceEnabled={maintenanceEnabled}
            canPerformMaintenance={balance >= 1000}
          />
        </div>
      </CardContent>
      
      {/* Dialogs */}
      <SlaveAssignmentDialog 
        open={showAssignSlavesDialog}
        onClose={() => setShowAssignSlavesDialog(false)}
        building={building}
        availableSlaves={totalAvailableSlaves}
        onAssignSlaves={(count) => {
          onAssignSlaves(building.id, count);
          setShowAssignSlavesDialog(false);
        }}
      />
      
      <MaintenanceDialog 
        open={showMaintenanceDialog}
        onClose={() => setShowMaintenanceDialog(false)}
        building={building}
        onPerformMaintenance={handlePerformMaintenance}
      />
    </Card>
  );
};
