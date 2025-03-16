
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoisActivesTab } from './tabs/LoisActivesTab';
import { LoisProposeesTab } from './tabs/LoisProposeesTab';
import { LoisRejeteesTab } from './tabs/LoisRejeteesTab';
import { LoisAllTab } from './tabs/LoisAllTab';
import { Loi } from '../../types/lois';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface LoisTabsContainerProps {
  activeTab: string;
  onTabChange: (value: string) => void;
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
  const handleVoterPour = (loiId: string) => {
    // Simuler un vote pour
    toast.success("Vote POUR enregistré pour cette loi");
  };
  
  const handleVoterContre = (loiId: string) => {
    // Simuler un vote contre
    toast.error("Vote CONTRE enregistré pour cette loi");
  };
  
  const handleVoterAbstention = (loiId: string) => {
    // Simuler une abstention
    toast.info("ABSTENTION enregistrée pour cette loi");
  };
  
  const handlePromulguer = (loiId: string) => {
    // Simuler la promulgation d'une loi
    toast.success("La loi a été promulguée avec succès");
  };
  
  const handleRejeter = (loiId: string) => {
    // Simuler le rejet d'une loi
    toast.error("La loi a été rejetée");
  };
  
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid grid-cols-4">
        <TabsTrigger value="actives">
          Lois Actives
          {loisActives.length > 0 && (
            <span className="ml-2 bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs">
              {loisActives.length}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="proposees">
          Lois Proposées
          {loisProposees.length > 0 && (
            <span className="ml-2 bg-amber-500/20 text-amber-700 px-2 py-0.5 rounded-full text-xs">
              {loisProposees.length}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="rejetees">
          Lois Rejetées
          {loisRejetees.length > 0 && (
            <span className="ml-2 bg-destructive/20 text-destructive px-2 py-0.5 rounded-full text-xs">
              {loisRejetees.length}
            </span>
          )}
        </TabsTrigger>
        <TabsTrigger value="all">
          Toutes les Lois
          <span className="ml-2 bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-xs">
            {allLois.length}
          </span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="actives" className="mt-4 border rounded-lg p-0 overflow-auto">
        <LoisActivesTab 
          lois={loisActives} 
          onViewLoi={onViewLoi} 
          formatSeason={formatSeason}
          onPromulguer={handlePromulguer}
        />
      </TabsContent>

      <TabsContent value="proposees" className="mt-4 border rounded-lg p-0 overflow-auto">
        <LoisProposeesTab 
          lois={loisProposees} 
          onViewLoi={onViewLoi} 
          formatSeason={formatSeason}
          onVoterPour={handleVoterPour}
          onVoterContre={handleVoterContre}
          onVoterAbstention={handleVoterAbstention}
        />
      </TabsContent>

      <TabsContent value="rejetees" className="mt-4 border rounded-lg p-0 overflow-auto">
        <LoisRejeteesTab 
          lois={loisRejetees} 
          onViewLoi={onViewLoi} 
          formatSeason={formatSeason}
        />
      </TabsContent>

      <TabsContent value="all" className="mt-4 border rounded-lg p-0 overflow-auto">
        <LoisAllTab 
          lois={allLois} 
          onViewLoi={onViewLoi} 
          formatSeason={formatSeason}
        />
      </TabsContent>
    </Tabs>
  );
};
