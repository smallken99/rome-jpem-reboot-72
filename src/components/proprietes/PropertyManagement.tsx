
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OverviewTab } from './property-management/OverviewTab';
import { MaintenanceTab } from './property-management/MaintenanceTab';
import { WorkersTab } from './property-management/WorkersTab';
import { UpgradesTab } from './property-management/UpgradesTab';
import { PropertyHeader } from './property-management/PropertyHeader';
import { useBuildings } from './hooks/useBuildings';
import { OwnedBuilding } from '@/types/buildings';

// Données fictives pour les tests
const mockBuildings: OwnedBuilding[] = [
  {
    id: 'building-1',
    buildingId: 'domus-1',
    name: 'Domus Palatina',
    buildingType: 'urban',
    location: 'Rome',
    condition: 85,
    maintenanceLevel: 2,
    income: 2000,
    workers: 5,
    securityLevel: 2,
    description: 'Une magnifique maison patricienne située près du forum',
    maintenanceCost: 500,
    purchaseDate: new Date()
  },
  {
    id: 'building-2',
    buildingId: 'villa-1',
    name: 'Villa Rustica',
    buildingType: 'rural',
    location: 'Campanie',
    condition: 70,
    maintenanceLevel: 1,
    income: 5000,
    workers: 50,
    securityLevel: 1,
    description: 'Une vaste propriété rurale produisant du vin et de l\'huile d\'olive',
    maintenanceCost: 1200,
    purchaseDate: new Date()
  }
];

interface PropertyManagementProps {
  buildingId?: string;
}

export const PropertyManagement: React.FC<PropertyManagementProps> = ({ buildingId = "building-1" }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { 
    buildings, 
    updateMaintenanceLevel, 
    updateSecurityLevel, 
    updateWorkers,
    renovateBuilding,
    sellBuilding,
    findBuildingById
  } = useBuildings(mockBuildings);
  
  // Adapter les fonctions pour qu'elles correspondent aux signatures attendues
  const handleUpdateMaintenanceLevel = (buildingId: string, level: number) => {
    updateMaintenanceLevel(buildingId, level);
  };
  
  const handleUpdateSecurityLevel = (buildingId: string, level: number) => {
    updateSecurityLevel(buildingId, level);
  };
  
  const handleUpdateWorkers = (buildingId: string, workers: number) => {
    updateWorkers(buildingId, workers);
  };
  
  const building = findBuildingById(buildingId);

  if (!building) {
    return <div>Bâtiment non trouvé</div>;
  }

  return (
    <div className="property-management space-y-6">
      <PropertyHeader building={building} onSell={() => sellBuilding(building.id)} />
      
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
            updateSecurityLevel={handleUpdateSecurityLevel}
            renovateBuilding={renovateBuilding}
          />
        </TabsContent>
        
        <TabsContent value="workers">
          <WorkersTab building={building} updateWorkers={handleUpdateWorkers} />
        </TabsContent>
        
        <TabsContent value="upgrades">
          <UpgradesTab building={building} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
