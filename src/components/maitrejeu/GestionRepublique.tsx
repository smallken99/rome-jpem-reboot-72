
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SenatComposition } from './components/republique/SenatComposition';
import { MagistraturesList } from './components/republique/MagistraturesList';
import { ProcessusLegislatif } from './components/republique/ProcessusLegislatif';
import { SystemeJudiciaire } from './components/republique/SystemeJudiciaire';
import { RelationsDiplomatiques } from './components/republique/RelationsDiplomatiques';

export const GestionRepublique: React.FC = () => {
  const [activeTab, setActiveTab] = useState('senat');

  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold font-cinzel mb-2">Gestion de la République</h1>
        <p className="text-muted-foreground mb-6">
          Administrez les différentes institutions de la République Romaine, des assemblées aux magistratures.
        </p>
      </header>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 md:w-full w-full">
          <TabsTrigger value="senat">Sénat</TabsTrigger>
          <TabsTrigger value="magistratures">Magistratures</TabsTrigger>
          <TabsTrigger value="lois">Processus Législatif</TabsTrigger>
          <TabsTrigger value="justice">Système Judiciaire</TabsTrigger>
          <TabsTrigger value="diplomatie">Relations Diplomatiques</TabsTrigger>
        </TabsList>
        
        <TabsContent value="senat" className="space-y-4">
          <SenatComposition role="mj" />
        </TabsContent>
        
        <TabsContent value="magistratures" className="space-y-4">
          <MagistraturesList />
        </TabsContent>
        
        <TabsContent value="lois" className="space-y-4">
          <ProcessusLegislatif />
        </TabsContent>
        
        <TabsContent value="justice" className="space-y-4">
          <SystemeJudiciaire />
        </TabsContent>
        
        <TabsContent value="diplomatie" className="space-y-4">
          <RelationsDiplomatiques />
        </TabsContent>
      </Tabs>
    </div>
  );
};
