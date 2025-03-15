
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoisActivesTab } from './tabs/LoisActivesTab';
import { LoisProposeesTab } from './tabs/LoisProposeesTab';
import { LoisRejeteesTab } from './tabs/LoisRejeteesTab';
import { HistoriqueLoiTab } from './tabs/HistoriqueLoiTab';
import { Loi } from '../../types/lois';
import { convertMJArrayToRepublique } from './utils/loiAdapter';

interface LoisTabsContainerProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  loisActives: Loi[];
  loisProposees: Loi[];
  loisRejetees: Loi[];
  allLois: Loi[];
  onViewLoi: (loi?: Loi) => void;
  formatSeason: (season: string) => string;
}

export const LoisTabsContainer: React.FC<LoisTabsContainerProps> = ({
  activeTab,
  onTabChange,
  loisActives,
  loisProposees,
  loisRejetees,
  allLois,
  onViewLoi,
  formatSeason
}) => {
  // Convert lois for component usage
  const convertedLoisActives = convertMJArrayToRepublique(loisActives);
  const convertedLoisProposees = convertMJArrayToRepublique(loisProposees);
  const convertedLoisRejetees = convertMJArrayToRepublique(loisRejetees);
  
  // Handler for viewing a specific loi
  const handleViewLoi = (loi: any) => {
    if (loi) {
      const mjLoi = allLois.find(l => l.id === loi.id) || null;
      if (mjLoi) {
        onViewLoi(mjLoi);
      }
    } else {
      onViewLoi(undefined);
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="actives">Lois Actives</TabsTrigger>
        <TabsTrigger value="proposees">Propositions</TabsTrigger>
        <TabsTrigger value="rejetees">Rejetées</TabsTrigger>
        <TabsTrigger value="historique">Historique</TabsTrigger>
      </TabsList>
      
      <TabsContent value="actives" className="mt-6">
        <LoisActivesTab 
          lois={convertedLoisActives} 
          onViewLoi={handleViewLoi}
        />
      </TabsContent>
      
      <TabsContent value="proposees" className="mt-6">
        <LoisProposeesTab 
          lois={convertedLoisProposees} 
          onViewLoi={handleViewLoi}
        />
      </TabsContent>
      
      <TabsContent value="rejetees" className="mt-6">
        <LoisRejeteesTab 
          lois={convertedLoisRejetees} 
          onViewLoi={handleViewLoi}
        />
      </TabsContent>
      
      <TabsContent value="historique" className="mt-6">
        <HistoriqueLoiTab 
          lois={convertMJArrayToRepublique(allLois)}
          onViewLoi={handleViewLoi}
          formatSeason={formatSeason}
        />
      </TabsContent>
    </Tabs>
  );
};
