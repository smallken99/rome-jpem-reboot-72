
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SenatComposition } from './components/republique/SenatComposition';
import { MagistraturesList } from './components/republique/MagistraturesList';
import { ProcessusLegislatif } from './components/republique/processus-legislatif/ProcessusLegislatif';
import { SystemeJudiciaire } from './components/republique/SystemeJudiciaire';
import { RelationsDiplomatiques } from './components/republique/RelationsDiplomatiques';
import ElectionPlanner from './components/ElectionPlanner';
import { Button } from '@/components/ui/button';
import { CalendarDays, Flag, Gavel, LandPlot, User } from 'lucide-react';

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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Planifier les élections</CardTitle>
          </CardHeader>
          <CardContent>
            <ElectionPlanner />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Nominations spéciales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Nommez des sénateurs à des postes spéciaux en cas de crise ou de vacance.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>Consul suffect</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Flag className="h-4 w-4" />
                <span>Dictateur</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Gavel className="h-4 w-4" />
                <span>Préfet urbain</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <LandPlot className="h-4 w-4" />
                <span>Gouverneur</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Progression temporelle</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Avancez le temps pour simuler le passage des saisons et années de la République.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>Nouvelle saison</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>Nouvelle année</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
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
