import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Wrench, ChartBar } from 'lucide-react';
import { useMaitreJeu } from './context';
import { useBatimentsManagement } from './hooks/useBatimentsManagement';
import { BuildingManagement } from './components/batiments/BuildingManagement';
import BuildingsList from './components/batiments/BuildingsList';
import { ConstructionProjects } from './components/batiments/ConstructionProjects';
import MaintenanceManager from './components/batiments/MaintenanceManager';
import BuildingRevenue from './components/batiments/BuildingRevenue';
import PublicBuildingModal from './components/batiments/PublicBuildingModal';
import { Building, BuildingCreationData, BuildingStatus } from './types/batiments';

export const GestionBatiments = () => {
  const [activeTab, setActiveTab] = useState<string>('liste');
  const { currentYear, currentSeason } = useMaitreJeu();
  const {
    isAddBuildingModalOpen,
    setIsAddBuildingModalOpen,
    selectedBuilding,
    setSelectedBuilding,
    addBuilding,
    updateBuilding
  } = useBatimentsManagement();

  const handleEditBuilding = (buildingId: string) => {
    // Dans une implémentation réelle, il faudrait récupérer le bâtiment depuis l'état
    console.log("Édition du bâtiment", buildingId);
    
    // Create example building with required properties from Building type
    const example: Building = {
      id: buildingId,
      name: "Bâtiment exemple",
      type: "temple",
      location: "Forum Romanum",
      value: 50000,
      maintenance: 1000,
      maintenanceCost: 1000,
      condition: 100,
      status: "good" as BuildingStatus,  // Cast to BuildingStatus to avoid specific enum type issues
      description: "" // Make description a required field with default value
    };
    
    // Use functional form of setSelectedBuilding to avoid type issues
    setSelectedBuilding(() => example);
  };

  const handleSaveBuilding = (data: BuildingCreationData) => {
    if (selectedBuilding) {
      // Using spread to keep all properties from Building type
      updateBuilding(selectedBuilding.id, {
        ...data,
        revenue: 0,      // Add missing revenue property
        maintenance: data.maintenanceCost || 0, // Set maintenance equal to maintenanceCost
        status: data.status || 'good' as BuildingStatus, // Ensure status is provided with correct type
        description: data.description || "", // Ensure description is provided
      });
    } else {
      // Add missing properties required by Building type
      const completeData: Omit<Building, 'id'> = {
        ...data,
        revenue: 0,      // Add missing revenue property
        maintenance: data.maintenanceCost || 0, // Set maintenance equal to maintenanceCost
        status: data.status || 'good' as BuildingStatus, // Ensure status is provided with correct type
        description: data.description || "" // Ensure description is provided
      };
      
      addBuilding(completeData);
    }
    setIsAddBuildingModalOpen(false);
    setSelectedBuilding(undefined);
  };

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
                currentSeason={currentSeason} 
              />
            </TabsContent>

            <TabsContent value="maintenance" className="pt-2">
              <MaintenanceManager />
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
        building={selectedBuilding}
      />
    </div>
  );
};
