
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProcessusLegislatif } from './components/republique/processus-legislatif/ProcessusLegislatif';
import { RelationsDiplomatiques } from './components/republique/relations/RelationsDiplomatiques';
import { SenatComposition } from './components/republique/SenatComposition';
import { MagistraturesList } from './components/republique/MagistraturesList';
import { SystemeJudiciaire } from './components/republique/SystemeJudiciaire';

export const GestionRepublique: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('senat');

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Gestion de la République</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="senat">Sénat</TabsTrigger>
          <TabsTrigger value="lois">Processus Législatif</TabsTrigger>
          <TabsTrigger value="magistratures">Magistratures</TabsTrigger>
          <TabsTrigger value="diplomatie">Relations Diplomatiques</TabsTrigger>
          <TabsTrigger value="justice">Système Judiciaire</TabsTrigger>
        </TabsList>
        
        <TabsContent value="senat" className="space-y-6">
          <SenatComposition />
        </TabsContent>
        
        <TabsContent value="lois" className="space-y-6">
          <ProcessusLegislatif />
        </TabsContent>
        
        <TabsContent value="magistratures" className="space-y-6">
          <MagistraturesList />
        </TabsContent>
        
        <TabsContent value="diplomatie" className="space-y-6">
          <RelationsDiplomatiques />
        </TabsContent>
        
        <TabsContent value="justice" className="space-y-6">
          <SystemeJudiciaire />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GestionRepublique;
