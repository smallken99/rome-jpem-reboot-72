import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OverviewTab } from './OverviewTab';
import { MaintenanceTab } from './MaintenanceTab';
import { WorkersTab } from './WorkersTab';
import { UpgradesTab } from './UpgradesTab';
import { PropertyHeader } from './PropertyHeader';
import { useBuildingManagement } from '@/hooks/useBuildingManagement';
import { Building, OwnedBuilding, Property, PropertyUpgrade } from '@/types/proprietes';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export const PropertyManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { buildingId } = useParams<{ buildingId: string }>();
  const navigate = useNavigate();
  
  const { 
    buildings, 
    updateMaintenanceEnabled,
    updateBuildingCondition,
    assignSlaves,
    sellBuilding,
    addBuilding,
    setSelectedBuilding
  } = useBuildingManagement();
  
  const buildingWithType = buildings.find(b => b.id === (buildingId || "building-1"));
  const building = buildingWithType ? {
    ...buildingWithType,
    type: buildingWithType.type || 'other' as BuildingType,
    maintenanceLevel: buildingWithType.maintenanceLevel || 1,
    income: buildingWithType.income || 0,
    workers: buildingWithType.workers || 0,
    securityLevel: buildingWithType.securityLevel || 1
  } : null;

  if (!building) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-medium mb-4">Propriété non trouvée</h2>
        <p className="text-muted-foreground mb-4">
          Cette propriété n'existe pas ou a été supprimée.
        </p>
        <button 
          className="inline-flex items-center px-4 py-2 bg-rome-red text-white rounded-md hover:bg-red-700 transition-colors"
          onClick={() => navigate('/patrimoine/proprietes')}
        >
          Retour à la liste des propriétés
        </button>
      </div>
    );
  }

  const handleSellBuilding = () => {
    if (sellBuilding(building.id)) {
      navigate('/patrimoine/proprietes');
    }
  };

  const handleUpdateMaintenanceLevel = (buildingId: string, level: number) => {
    updateBuildingCondition(buildingId, level);
    toast.success(`Niveau d'entretien mis à jour pour ${building.name}`);
  };

  const handleRenovateBuilding = () => {
    updateBuildingCondition(building.id, 100);
    toast.success(`${building.name} a été entièrement rénové`);
  };

  const handleUpdateWorkers = (buildingId: string, count: number) => {
    assignSlaves(buildingId, count);
  };

  const handleToggleMaintenance = (enabled: boolean) => {
    updateMaintenanceEnabled(building.id, enabled);
  };

  const addNewBuilding = (newBuilding: Omit<Building, 'id'>) => {
    const buildingWithId = {
      ...newBuilding,
      id: uuidv4(),
    };
    
    const ownedBuilding: OwnedBuilding = {
      ...buildingWithId,
      buildingId: buildingWithId.id,
    };
    
    addBuilding(ownedBuilding);
    setSelectedBuilding(ownedBuilding);
  };

  const handleBuildingSelection = (building: Building) => {
    const ownedBuilding: OwnedBuilding = {
      ...building,
      buildingId: building.id,
    };
    setSelectedBuilding(ownedBuilding);
  };

  const buildingFromOwned = (owned: OwnedBuilding): Building => {
    return {
      id: owned.id,
      buildingId: owned.buildingId,
      buildingType: owned.buildingType,
      name: owned.name,
      type: owned.type,
      location: owned.location,
      condition: owned.condition,
      value: owned.value || 0,
      maintenance: owned.maintenance || 0,
      income: 0,
      workers: 0,
      securityLevel: 0,
      maintenanceLevel: 0
    };
  };

  return (
    <div className="property-management space-y-6">
      <PropertyHeader 
        building={building} 
        onSell={handleSellBuilding} 
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue générale</TabsTrigger>
          <TabsTrigger value="maintenance">Entretien</TabsTrigger>
          <TabsTrigger value="workers">Personnel</TabsTrigger>
          <TabsTrigger value="upgrades">Améliorations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <OverviewTab building={building} />
        </TabsContent>
        
        <TabsContent value="maintenance">
          <MaintenanceTab 
            building={building} 
            updateMaintenanceLevel={handleUpdateMaintenanceLevel}
            updateSecurityLevel={() => {}}
            renovateBuilding={handleRenovateBuilding}
            toggleMaintenance={handleToggleMaintenance}
          />
        </TabsContent>
        
        <TabsContent value="workers">
          <WorkersTab 
            building={building} 
            updateWorkers={handleUpdateWorkers} 
          />
        </TabsContent>
        
        <TabsContent value="upgrades">
          <UpgradesTab building={building} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
