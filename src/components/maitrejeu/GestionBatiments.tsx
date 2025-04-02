
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Wrench, ChartBar } from 'lucide-react';
import { useMaitreJeu } from './context';
import { useBuildingManagement } from './hooks/useBuildingManagement';
import { BuildingManagement } from './components/batiments/BuildingManagement';
import BuildingsList from './components/batiments/BuildingsList';
import { ConstructionProjects } from './components/batiments/ConstructionProjects';
import MaintenanceManager from './components/batiments/MaintenanceManager';
import BuildingRevenue from './components/batiments/BuildingRevenue';
import PublicBuildingModal from './components/batiments/PublicBuildingModal';
import { Building, BuildingCreationData, BuildingStatus, BuildingType } from './types/batiments';

export const GestionBatiments = () => {
  const [activeTab, setActiveTab] = useState<string>('liste');
  const { currentYear, currentSeason } = useMaitreJeu();
  const buildingManagement = useBuildingManagement();
  
  const [isAddBuildingModalOpen, setIsAddBuildingModalOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);

  // Extract methods from hook with null checks
  const {
    addBuilding,
    updateBuilding,
    addMaintenanceTask,
    completeMaintenanceTask = () => {},
    cancelMaintenanceTask = () => {}
  } = buildingManagement;

  // Use maintenanceTasks from the hook or provide a fallback
  const maintenanceTasks = buildingManagement.maintenanceTasks || [];

  const handleEditBuilding = (buildingId: string) => {
    // Dans une implémentation réelle, il faudrait récupérer le bâtiment depuis l'état
    console.log("Édition du bâtiment", buildingId);
    
    // Create example building with all required properties
    const exampleBuilding: Building = {
      id: buildingId,
      name: "Bâtiment exemple",
      type: BuildingType.TEMPLE,
      location: "Forum Romanum",
      owner: "république",
      value: 50000,
      maintenanceCost: 1000,
      maintenance: 1000,
      condition: 100,
      status: BuildingStatus.GOOD,
      description: "Description du bâtiment",
      constructionYear: currentYear - 5,
      cost: 75000,
      revenue: 5000,
      capacity: 0
    };
    
    // Create a new state update to avoid reference issues
    setSelectedBuilding(() => exampleBuilding);
  };

  const handleSaveBuilding = (data: BuildingCreationData) => {
    if (selectedBuilding) {
      // Update existing building with typed properties
      updateBuilding(selectedBuilding.id, {
        ...data,
        // Ensure all required properties have values
        maintenance: data.maintenance !== undefined ? data.maintenance : selectedBuilding.maintenance,
        condition: data.condition !== undefined ? data.condition : selectedBuilding.condition,
        value: data.value !== undefined ? data.value : selectedBuilding.value,
        maintenanceCost: data.maintenanceCost !== undefined ? data.maintenanceCost : selectedBuilding.maintenanceCost
      });
    } else {
      // Add new building with required properties
      const completeData: BuildingCreationData = {
        ...data,
        status: data.status || BuildingStatus.GOOD,
        maintenance: data.maintenance,
        description: data.description || "",
        constructionYear: data.constructionYear || currentYear,
        cost: data.cost || 10000,
        revenue: data.revenue || 0,
        capacity: data.capacity || 0
      };
      
      addBuilding(completeData);
    }
    setIsAddBuildingModalOpen(false);
    setSelectedBuilding(null);
  };

  // Convert season for compatibility with expected enum
  const formattedSeason = 
    currentSeason === "SPRING" ? "Spring" :
    currentSeason === "SUMMER" ? "Summer" :
    currentSeason === "AUTUMN" ? "Autumn" : "Winter";

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestion des Bâtiments</h1>
          <p className="text-muted-foreground">
            Gérez les bâtiments publics, les constructions et l'entretien
          </p>
        </div>
        <Button onClick={() => setIsAddBuildingModalOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nouveau bâtiment
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b pb-3">
          <CardTitle>Aperçu des Bâtiments</CardTitle>
          <CardDescription>
            État actuel, projets de construction et maintenance des bâtiments publics
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="liste" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Liste
              </TabsTrigger>
              <TabsTrigger value="construction" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Construction
              </TabsTrigger>
              <TabsTrigger value="maintenance" className="flex items-center gap-2">
                <Wrench className="h-4 w-4" />
                Maintenance
              </TabsTrigger>
              <TabsTrigger value="revenus" className="flex items-center gap-2">
                <ChartBar className="h-4 w-4" />
                Revenus
              </TabsTrigger>
            </TabsList>

            <TabsContent value="liste" className="pt-2">
              <BuildingsList onEdit={handleEditBuilding} />
            </TabsContent>

            <TabsContent value="construction" className="pt-2">
              <ConstructionProjects 
                currentYear={currentYear} 
                currentSeason={formattedSeason} 
              />
            </TabsContent>

            <TabsContent value="maintenance" className="pt-2">
              <MaintenanceManager 
                maintenanceTasks={maintenanceTasks}
                completeMaintenanceTask={completeMaintenanceTask}
                cancelMaintenanceTask={cancelMaintenanceTask}
              />
            </TabsContent>

            <TabsContent value="revenus" className="pt-2">
              <BuildingRevenue 
                buildingId="example-building-id" 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <BuildingManagement />

      <PublicBuildingModal 
        isOpen={isAddBuildingModalOpen} 
        onClose={() => setIsAddBuildingModalOpen(false)} 
        onSave={handleSaveBuilding}
        building={selectedBuilding || undefined}
      />
    </div>
  );
};
