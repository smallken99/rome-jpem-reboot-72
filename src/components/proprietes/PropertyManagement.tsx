
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OverviewTab } from './property-management/OverviewTab';
import { MaintenanceTab } from './property-management/MaintenanceTab';
import { WorkersTab } from './property-management/WorkersTab';
import { UpgradesTab } from './property-management/UpgradesTab';
import { PropertyHeader } from './property-management/PropertyHeader';
import { useBuildingManagement } from '@/hooks/useBuildingManagement';
import { OwnedBuilding, PropertyUpgrade } from '@/components/proprietes/types/property';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { BuildingType } from '@/components/proprietes/types/buildingTypes';

export const PropertyManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { buildingId } = useParams<{ buildingId: string }>();
  const navigate = useNavigate();
  
  const { 
    buildings,
    sellBuilding,
    updateBuildingCondition
  } = useBuildingManagement();
  
  const buildingWithType = buildings.find(b => b.id === (buildingId || "building-1"));
  
  // Complete the building with all required properties for the OwnedBuilding type
  const building: OwnedBuilding | null = buildingWithType ? {
    id: buildingWithType.id,
    buildingId: buildingWithType.id,
    name: buildingWithType.name || '',
    buildingType: buildingWithType.buildingType || buildingWithType.type || '',
    type: buildingWithType.type || BuildingType.OTHER,
    location: buildingWithType.location || '',
    size: buildingWithType.size || 1,
    value: buildingWithType.value || 0,
    condition: buildingWithType.condition || 100,
    maintenanceLevel: buildingWithType.maintenanceLevel || 1,
    maintenanceCost: buildingWithType.maintenanceCost || buildingWithType.maintenance || 0,
    maintenance: buildingWithType.maintenance || buildingWithType.maintenanceCost || 0,
    income: buildingWithType.income || 0,
    workers: buildingWithType.workers || 0,
    maxWorkers: buildingWithType.maxWorkers || 10,
    securityLevel: buildingWithType.securityLevel || 1,
    description: buildingWithType.description || '',
    purchaseDate: buildingWithType.purchaseDate || new Date(),
    status: buildingWithType.status || 'active',
    upgrades: (buildingWithType.upgrades || []).map(upgrade => ({
      ...upgrade,
      applied: upgrade.applied || upgrade.installed || false
    })) as PropertyUpgrade[]
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
    // Convert id to string to match the expected parameter type
    if (sellBuilding(String(building.id))) {
      navigate('/patrimoine/proprietes');
    }
  };

  const handleUpdateMaintenanceLevel = (level: number) => {
    // Create adapter for different function signatures
    const updateMaintenanceLevel = (buildingId: string, level: number) => {
      // Logic to update maintenance level
      toast.success(`Niveau d'entretien mis à jour pour ${building.name}`);
    };
    
    // Adapt to expected signature by creating a wrapper function
    const adapter = (level: number) => {
      updateMaintenanceLevel(String(building.id), level);
    };
    
    // Call the adapter function
    adapter(level);
  };

  const handleRenovateBuilding = () => {
    // Convert id to string to match the expected parameter type
    updateBuildingCondition(String(building.id));
    toast.success(`${building.name} a été entièrement rénové`);
  };

  const handleUpdateWorkers = (count: number) => {
    // Create adapter for different function signatures
    const assignWorkers = (buildingId: string, workers: number) => {
      // Logic to assign workers
      toast.success(`Personnel mis à jour pour ${building.name}`);
    };
    
    // Adapt to expected signature by creating a wrapper function
    const adapter = (count: number) => {
      assignWorkers(String(building.id), count);
    };
    
    // Call the adapter function
    adapter(count);
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
