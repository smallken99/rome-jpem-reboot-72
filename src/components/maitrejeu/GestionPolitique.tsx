
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ProcessusLegislatif } from './components/republique/processus-legislatif/ProcessusLegislatif';
import { useMaitreJeu } from './context';
import { PoliticalParties } from './components/republique/political-parties/PoliticalParties';
import { ElectionsManager } from './components/republique/elections/ElectionsManager';
import { MagistraturesManager } from './components/republique/magistratures/MagistraturesManager';

export const GestionPolitique: React.FC = () => {
  const { lois, addLoi } = useMaitreJeu();
  const [activeTab, setActiveTab] = useState('lois');
  
  const getLoisWarningCount = () => {
    // Compter les lois en attente
    return lois.filter(loi => loi.état === 'proposed' || loi.state === 'proposed').length;
  };
  
  const getWarningColor = (count: number) => {
    if (count > 5) return "destructive";
    if (count > 2) return "secondary";
    return "default";
  };
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="lois" className="relative">
            Lois
            {getLoisWarningCount() > 0 && (
              <Badge 
                variant={getWarningColor(getLoisWarningCount()) as "default" | "secondary" | "destructive" | "outline" | "success"} 
                className="ml-2"
              >
                {getLoisWarningCount()}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="partis">Partis</TabsTrigger>
          <TabsTrigger value="elections">Élections</TabsTrigger>
          <TabsTrigger value="magistratures">Magistratures</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lois" className="py-6">
          <ProcessusLegislatif />
        </TabsContent>
        
        <TabsContent value="partis" className="py-6">
          <PoliticalParties />
        </TabsContent>
        
        <TabsContent value="elections" className="py-6">
          <ElectionsManager />
        </TabsContent>
        
        <TabsContent value="magistratures" className="py-6">
          <MagistraturesManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};
