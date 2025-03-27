
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Filter } from 'lucide-react';
import { useBuildings } from '@/hooks/useBuildingManagement';
import { OwnedBuilding } from '@/types/buildings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UrbanBuildingCard } from './urban/UrbanBuildingCard';
import { BuildingDetailsModal } from './building-details/BuildingDetailsModal';
import { useUserProfile } from '@/hooks/useUserProfile';
import { BuildingPurchaseDialog } from './urban/BuildingPurchaseDialog';
import { UnderDevelopmentSection } from '@/components/maitrejeu/components/UnderDevelopmentSection';

export const UrbanPropertiesTab: React.FC = () => {
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>("");
  const [isPurchaseDialogOpen, setIsPurchaseDialogOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  const { 
    buildings, 
    updateMaintenanceLevel, 
    updateSecurityLevel, 
    updateWorkers,
    renovateBuilding,
    sellBuilding,
    calculateMonthlyIncome,
    calculateMaintenanceCost,
    assignSlaves
  } = useBuildings();
  
  const { profile, updateWealth } = useUserProfile();
  
  // Filtrer uniquement les bâtiments urbains
  const urbanBuildings = buildings.filter(building => 
    building.buildingType === 'urban'
  );
  
  const selectedBuilding = selectedBuildingId ? 
    buildings.find(b => b.id === selectedBuildingId) : null;
  
  const handleBuildingSelect = (buildingId: string) => {
    setSelectedBuildingId(buildingId);
    setIsDetailModalOpen(true);
  };
  
  const handleClosePurchaseDialog = () => {
    setIsPurchaseDialogOpen(false);
  };
  
  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
  };
  
  const handlePurchaseBuilding = (buildingType: string, cost: number) => {
    // Logique d'achat - à implémenter
    updateWealth(-cost);
    toast.success(`Propriété achetée pour ${cost.toLocaleString()} As`);
    setIsPurchaseDialogOpen(false);
  };
  
  const handleMaintenanceLevelChange = (buildingId: string, level: number) => {
    updateMaintenanceLevel(buildingId, level);
  };
  
  const handleSecurityLevelChange = (buildingId: string, level: number) => {
    updateSecurityLevel(buildingId, level);
  };
  
  const handleSellProperty = (buildingId: string) => {
    const building = buildings.find(b => b.id === buildingId);
    if (building) {
      const value = calculatePropertyValue(building);
      updateWealth(value);
      sellBuilding(buildingId);
    }
  };
  
  const calculatePropertyValue = (building: OwnedBuilding): number => {
    // Algorithme simplifié de calcul de valeur
    const baseValue = 50000;
    const conditionFactor = building.condition / 100;
    const ageFactor = 1; // À implémenter avec l'âge du bâtiment
    
    return Math.round(baseValue * conditionFactor * ageFactor);
  };
  
  const handleWorkerAssign = (buildingId: string, count: number) => {
    assignSlaves(buildingId, count);
  };
  
  // Si nous n'avons pas encore implémenté cette fonctionnalité
  if (urbanBuildings.length === 0) {
    return (
      <UnderDevelopmentSection 
        title="Propriétés Urbaines" 
        description="La gestion des propriétés urbaines est en cours de développement."
        estimatedRelease="Disponible prochainement"
        features={[
          "Achat de domus, insulae et autres propriétés urbaines",
          "Gestion des loyers et des locataires",
          "Maintenance et rénovation des bâtiments",
          "Protection contre les incendies et autres désastres urbains",
          "Amélioration et extension des propriétés"
        ]}
      />
    );
  }
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Propriétés Urbaines</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filtrer</span>
          </Button>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setIsPurchaseDialogOpen(true)}
          >
            <Plus className="h-4 w-4" />
            <span>Nouvelle propriété</span>
          </Button>
        </div>
      </div>
      
      {urbanBuildings.length === 0 ? (
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>Aucune propriété urbaine</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Vous ne possédez pas encore de propriété urbaine. Achetez votre première propriété pour commencer.
            </p>
            <Button onClick={() => setIsPurchaseDialogOpen(true)}>
              Acheter une propriété
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {urbanBuildings.map(building => (
            <UrbanBuildingCard
              key={building.id}
              building={building}
              onSelect={handleBuildingSelect}
            />
          ))}
        </div>
      )}
      
      {/* Détails du bâtiment */}
      <BuildingDetailsModal
        building={selectedBuilding}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        onSell={handleSellProperty}
        onMaintenanceLevelChange={handleMaintenanceLevelChange}
        onSecurityLevelChange={handleSecurityLevelChange}
        onWorkerAssign={handleWorkerAssign}
        calculateMonthlyIncome={calculateMonthlyIncome}
        calculateMaintenanceCost={calculateMaintenanceCost}
      />
      
      {/* Dialog d'achat de propriété */}
      <BuildingPurchaseDialog
        isOpen={isPurchaseDialogOpen}
        onClose={handleClosePurchaseDialog}
        onPurchase={handlePurchaseBuilding}
        availableFunds={profile.wealth}
      />
    </div>
  );
};
