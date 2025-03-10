
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBatimentsPublics, PublicBuilding, ConstructionProject } from './hooks/useBatimentsPublics';
import { BatimentsHeader } from './BatimentsHeader';
import { BatimentsStats } from './BatimentsStats';
import { BuildingsTabContent } from './tabs/BuildingsTabContent';
import { ProjectsTabContent } from './tabs/ProjectsTabContent';
import { MilitaryBuildingsTabContent } from './tabs/MilitaryBuildingsTabContent';
import { FamilyPropertiesTabContent } from './tabs/FamilyPropertiesTabContent';
import { StorageManagementTabContent } from './tabs/StorageManagementTabContent';
import { ArchivesTabContent } from './tabs/ArchivesTabContent';
import { MaintenanceDialog } from './dialogs/MaintenanceDialog';
import { NewProjectDialog } from './dialogs/NewProjectDialog';
import { DetailsDialog } from './dialogs/DetailsDialog';

export const GestionBatimentsPage: React.FC = () => {
  const {
    publicBuildings,
    constructionProjects,
    startConstructionProject,
    approveConstructionProject,
    advanceConstruction,
    maintainBuilding
  } = useBatimentsPublics();
  
  const [selectedItem, setSelectedItem] = useState<PublicBuilding | ConstructionProject | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isMaintenanceDialogOpen, setIsMaintenanceDialogOpen] = useState(false);
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  
  const handleViewDetails = (item: PublicBuilding | ConstructionProject) => {
    setSelectedItem(item);
    setIsDetailsOpen(true);
  };
  
  const handleMaintainBuilding = (buildingId: string) => {
    const building = publicBuildings.find(b => b.id === buildingId);
    if (building) {
      setSelectedItem(building);
      setIsMaintenanceDialogOpen(true);
    }
  };
  
  const handlePerformMaintenance = (level: 'minimal' | 'standard' | 'excellent') => {
    if (selectedItem && 'id' in selectedItem) {
      maintainBuilding(selectedItem.id, level);
      setIsMaintenanceDialogOpen(false);
    }
  };
  
  const handleApproveProject = (projectId: string) => {
    approveConstructionProject(projectId);
  };
  
  const handleAdvanceProject = (projectId: string) => {
    // Simuler une progression de 10%
    advanceConstruction(projectId, 10);
  };
  
  const handleCreateProject = (project: any) => {
    startConstructionProject(project);
  };
  
  return (
    <div className="space-y-6">
      <BatimentsHeader onNewProject={() => setIsNewProjectDialogOpen(true)} />
      
      <BatimentsStats />
      
      <Tabs defaultValue="buildings" className="space-y-4">
        <TabsList className="border border-rome-gold/30 bg-white">
          <TabsTrigger value="buildings">Bâtiments publics</TabsTrigger>
          <TabsTrigger value="military">Structures militaires</TabsTrigger>
          <TabsTrigger value="projects">Projets en cours</TabsTrigger>
          <TabsTrigger value="family">Propriétés familiales</TabsTrigger>
          <TabsTrigger value="storage">Stockage</TabsTrigger>
          <TabsTrigger value="archives">Archives</TabsTrigger>
        </TabsList>
        
        <TabsContent value="buildings">
          <BuildingsTabContent 
            buildings={publicBuildings} 
            onViewDetails={handleViewDetails} 
            onMaintain={handleMaintainBuilding} 
          />
        </TabsContent>
        
        <TabsContent value="military">
          <MilitaryBuildingsTabContent 
            buildings={publicBuildings}
            onViewDetails={handleViewDetails}
            onMaintain={handleMaintainBuilding}
          />
        </TabsContent>
        
        <TabsContent value="projects">
          <ProjectsTabContent 
            projects={constructionProjects} 
            onViewDetails={handleViewDetails} 
            onApprove={handleApproveProject} 
            onAdvance={handleAdvanceProject} 
          />
        </TabsContent>
        
        <TabsContent value="family">
          <FamilyPropertiesTabContent />
        </TabsContent>
        
        <TabsContent value="storage">
          <StorageManagementTabContent />
        </TabsContent>
        
        <TabsContent value="archives">
          <ArchivesTabContent />
        </TabsContent>
      </Tabs>
      
      {/* Dialogues */}
      <DetailsDialog 
        open={isDetailsOpen} 
        onOpenChange={setIsDetailsOpen}
        selectedItem={selectedItem}
        onMaintain={handleMaintainBuilding}
      />
      
      <MaintenanceDialog 
        open={isMaintenanceDialogOpen} 
        onOpenChange={setIsMaintenanceDialogOpen}
        selectedItem={selectedItem as PublicBuilding}
        onMaintain={handlePerformMaintenance}
      />
      
      <NewProjectDialog 
        open={isNewProjectDialogOpen} 
        onOpenChange={setIsNewProjectDialogOpen}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
};
