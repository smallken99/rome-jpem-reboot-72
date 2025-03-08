
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BatimentsStats } from '@/components/republique/batiments/BatimentsStats';
import { useBatimentsPublics, PublicBuilding, ConstructionProject } from '@/components/republique/batiments/hooks/useBatimentsPublics';
import { BatimentsHeader } from '@/components/republique/batiments/BatimentsHeader';
import { BuildingsTabContent } from '@/components/republique/batiments/tabs/BuildingsTabContent';
import { ProjectsTabContent } from '@/components/republique/batiments/tabs/ProjectsTabContent';
import { ArchivesTabContent } from '@/components/republique/batiments/tabs/ArchivesTabContent';
import { MaintenanceDialog } from '@/components/republique/batiments/dialogs/MaintenanceDialog';
import { NewProjectDialog } from '@/components/republique/batiments/dialogs/NewProjectDialog';
import { DetailsDialog } from '@/components/republique/batiments/dialogs/DetailsDialog';

export const BatimentsPage: React.FC = () => {
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
          <TabsTrigger value="buildings">Bâtiments existants</TabsTrigger>
          <TabsTrigger value="projects">Projets de construction</TabsTrigger>
          <TabsTrigger value="archives">Archives historiques</TabsTrigger>
        </TabsList>
        
        <TabsContent value="buildings">
          <BuildingsTabContent 
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
