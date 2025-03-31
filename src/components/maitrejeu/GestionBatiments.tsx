
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
import { Building } from './types/batiments';

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
    setSelectedBuilding({
      id: buildingId,
      name: "Bâtiment exemple",
      type: "temple",
      location: "Forum Romanum",
      status: "good",
      constructionYear: 720,
      description: "Un exemple de bâtiment",
      cost: 50000,
      maintenanceCost: 1000,
      revenue: 2000,
      capacity: 500,
      owner: "république"
    });
    setIsAddBuildingModalOpen(true);
  };

  const handleSaveBuilding = (data: any) => {
    if (selectedBuilding) {
      updateBuilding(selectedBuilding.id, data);
    } else {
      addBuilding(data);
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
