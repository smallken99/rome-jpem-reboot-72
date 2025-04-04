
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OverviewTab } from './property-management/OverviewTab';
import { MaintenanceTab } from './property-management/MaintenanceTab';
import { WorkersTab } from './property-management/WorkersTab';
import { UpgradesTab } from './property-management/UpgradesTab';
import { PropertyHeader } from './property-management/PropertyHeader';
import { useBuildingManagement } from '@/hooks/useBuildingManagement';
import { OwnedBuilding } from '@/components/proprietes/types/property';
import { toast } from 'sonner';
import { adaptOwnedBuilding } from '@/utils/typeAdapters';

export const PropertyManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { propertyId } = useParams<{ propertyId: string }>();
  const navigate = useNavigate();
  
  const { 
    buildings,
    sellBuilding,
    updateBuildingCondition
  } = useBuildingManagement();
  
  const buildingWithType = buildings.find(b => b.id === (propertyId || "building-1"));
  
  // Complete the building with all required properties for the OwnedBuilding type
  const building: OwnedBuilding | null = buildingWithType ? adaptOwnedBuilding(buildingWithType) : null;

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
    // Adapter for function signature
    toast.success(`Niveau d'entretien mis à jour pour ${building.name}`);
  };

  const handleRenovateBuilding = () => {
    // Convert id to string to match the expected parameter type
    updateBuildingCondition(String(building.id));
    toast.success(`${building.name} a été entièrement rénové`);
  };

  const handleUpdateWorkers = (count: number) => {
    // Adapter for function signature
    toast.success(`Personnel mis à jour pour ${building.name}`);
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
