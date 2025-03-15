
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, 
  Construction, 
  Axe, 
  TrendingUp, 
  Hammer,
  LayoutPanelLeft 
} from 'lucide-react';
import { BuildingsList } from './BuildingsList';
import { ConstructionProjects } from './ConstructionProjects';
import { MaintenanceManager } from './MaintenanceManager';
import { BuildingRevenue } from './BuildingRevenue';
import { PublicBuildingModal } from './PublicBuildingModal';
import { Button } from '@/components/ui/button';
import { useBatimentsPublics } from '@/components/republique/batiments/hooks/useBatimentsPublics';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { useMaitreJeu } from '../../context';

export const BuildingManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('batiments');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { publicBuildings, constructionProjects, startConstructionProject, advanceConstruction, maintainBuilding } = useBatimentsPublics();
  const { balance, buildingPurchased } = usePatrimoine();
  const { economicFactors, addEconomieRecord } = useMaitreJeu();
  
  const handleStartConstruction = (buildingData: any) => {
    // Create a new construction project
    const projectId = startConstructionProject({
      name: buildingData.name,
      buildingTypeId: buildingData.typeId,
      location: buildingData.location,
      estimatedCost: buildingData.cost,
      duration: buildingData.constructionTime || 4,
      progress: 0,
      estimatedCompletionYear: economicFactors.currentYear + 1,
      benefits: buildingData.benefits || [],
      type: buildingData.buildingType
    });
    
    // Record the initial payment in the economy system
    if (projectId) {
      const initialCost = Math.round(buildingData.cost * 0.3); // 30% upfront cost
      
      addEconomieRecord({
        amount: -initialCost,
        description: `Démarrage construction: ${buildingData.name}`,
        category: 'construction',
        type: 'expense',
        date: new Date(),
        source: 'construction',
        approved: true,
        tags: ['construction', 'public']
      });
      
      buildingPurchased(buildingData.name, initialCost);
    }
  };
  
  const handleAdvanceConstruction = (projectId: string, amount: number) => {
    const constructionCost = Math.round(
      constructionProjects.find(p => p.id === projectId)?.estimatedCost || 0
    ) * (amount / 100) * 0.7; // Remaining 70% spread across progress
    
    // Record the payment
    if (constructionCost > 0) {
      const project = constructionProjects.find(p => p.id === projectId);
      
      addEconomieRecord({
        amount: -constructionCost,
        description: `Progression construction: ${project?.name || 'Bâtiment'}`,
        category: 'construction',
        type: 'expense',
        date: new Date(),
        source: 'construction',
        approved: true,
        tags: ['construction', 'public']
      });
      
      // Advance the construction progress
      advanceConstruction(projectId, amount);
    }
  };
  
  const handleMaintenance = (buildingId: string, cost: number) => {
    // Record the maintenance payment
    const building = publicBuildings.find(b => b.id === buildingId);
    
    addEconomieRecord({
      amount: -cost,
      description: `Maintenance: ${building?.name || 'Bâtiment public'}`,
      category: 'maintenance',
      type: 'expense',
      date: new Date(),
      source: 'maintenance',
      approved: true,
      tags: ['maintenance', 'public']
    });
    
    // Perform the maintenance
    maintainBuilding(buildingId);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          <Building className="inline-block mr-2 h-6 w-6" />
          Gestion des Bâtiments Publics
        </h2>
        <Button onClick={() => setIsModalOpen(true)}>
          <Construction className="mr-2 h-4 w-4" />
          Nouveau Projet
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="batiments">
            <LayoutPanelLeft className="h-4 w-4 mr-2" />
            Bâtiments Publics
          </TabsTrigger>
          <TabsTrigger value="construction">
            <Construction className="h-4 w-4 mr-2" />
            En Construction
          </TabsTrigger>
          <TabsTrigger value="maintenance">
            <Hammer className="h-4 w-4 mr-2" />
            Maintenance
          </TabsTrigger>
          <TabsTrigger value="revenue">
            <TrendingUp className="h-4 w-4 mr-2" />
            Revenus
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="batiments" className="space-y-4">
          <BuildingsList 
            buildings={publicBuildings} 
            balance={balance} 
            onMaintain={handleMaintenance}
          />
        </TabsContent>
        
        <TabsContent value="construction" className="space-y-4">
          <ConstructionProjects 
            projects={constructionProjects}
            balance={balance}
            onAdvance={handleAdvanceConstruction}
          />
        </TabsContent>
        
        <TabsContent value="maintenance" className="space-y-4">
          <MaintenanceManager 
            buildings={publicBuildings}
            onMaintain={handleMaintenance}
          />
        </TabsContent>
        
        <TabsContent value="revenue" className="space-y-4">
          <BuildingRevenue 
            buildings={publicBuildings} 
          />
        </TabsContent>
      </Tabs>
      
      {isModalOpen && (
        <PublicBuildingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreateProject={handleStartConstruction}
          balance={balance}
        />
      )}
    </div>
  );
};
