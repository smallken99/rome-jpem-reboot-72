import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OverviewTab } from './OverviewTab';
import { MaintenanceTab } from './MaintenanceTab';
import { WorkersTab } from './WorkersTab';
import { UpgradesTab } from './UpgradesTab';
import { PropertyHeader } from './PropertyHeader';
import { useBuildingManagement } from '@/hooks/useBuildingManagement';
import { OwnedBuilding, PropertyUpgrade } from '@/types/property';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

// Define the BuildingType enum that was missing
enum BuildingType {
  VILLA = 'villa',
  DOMUS = 'domus',
  INSULA = 'insula',
  SHOP = 'shop',
  WORKSHOP = 'workshop',
  WAREHOUSE = 'warehouse',
  FARM = 'farm',
  OTHER = 'other'
}

export const PropertyManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { buildingId } = useParams<{ buildingId: string }>();
  const navigate = useNavigate();
  
  const { 
    buildings, 
    updateMaintenanceLevel,
    updateBuildingCondition,
    assignWorkers,
    sellBuilding,
    addBuilding,
    setSelectedBuilding
  } = useBuildingManagement();
  
  const buildingWithType = buildings.find(b => b.id === (buildingId || "building-1"));
  const building = buildingWithType ? {
    ...buildingWithType,
    type: buildingWithType.type || BuildingType.OTHER,
    maintenanceLevel: buildingWithType.maintenanceLevel || 1,
    income: buildingWithType.income || 0,
    workers: buildingWithType.workers || 0,
    securityLevel: buildingWithType.securityLevel || 1,
    buildingId: buildingWithType.id // ensure buildingId is set correctly
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

  const handleUpdateMaintenanceLevel = (level: number) => {
    updateMaintenanceLevel(building.id);
    toast.success(`Niveau d'entretien mis à jour pour ${building.name}`);
  };

  const handleRenovateBuilding = () => {
    updateBuildingCondition(building.id);
    toast.success(`${building.name} a été entièrement rénové`);
  };

  const handleUpdateWorkers = (count: number) => {
    assignWorkers(building.id);
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
            toggleMaintenance={() => {}}
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
