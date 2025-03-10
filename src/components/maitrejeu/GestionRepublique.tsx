
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Landmark, Users, Scale, Globe, Scroll } from 'lucide-react';
import { MagistraturesList } from './components/republique/MagistraturesList';

export const GestionRepublique: React.FC = () => {
  const [activeTab, setActiveTab] = useState('institutions');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gestion de la République</h2>
          <p className="text-muted-foreground">
            Administration centrale de la République romaine
          </p>
        </div>
      </div>

      <Tabs defaultValue="institutions" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="institutions" className="flex items-center gap-2">
            <Landmark className="h-4 w-4" />
            <span>Institutions</span>
          </TabsTrigger>
          <TabsTrigger value="senat" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Sénat</span>
          </TabsTrigger>
          <TabsTrigger value="lois" className="flex items-center gap-2">
            <Scroll className="h-4 w-4" />
            <span>Lois</span>
          </TabsTrigger>
          <TabsTrigger value="justice" className="flex items-center gap-2">
            <Scale className="h-4 w-4" />
            <span>Justice</span>
          </TabsTrigger>
          <TabsTrigger value="diplomatic" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>Relations</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="institutions" className="space-y-4">
          <MagistraturesList />
        </TabsContent>
        
        <TabsContent value="senat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Composition du Sénat</CardTitle>
              <CardDescription>
                Répartition des factions et influence des sénateurs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Contenu à développer: composition du Sénat, répartition des pouvoirs...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="lois" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Processus Législatif</CardTitle>
              <CardDescription>
                Suivi des propositions et votes de lois
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Contenu à développer: processus législatif, votes en cours...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="justice" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Système Judiciaire</CardTitle>
              <CardDescription>
                Affaires judiciaires et tribunaux
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Contenu à développer: tribunaux, procès en cours...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="diplomatic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relations Diplomatiques</CardTitle>
              <CardDescription>
                Traités, alliances et relations avec les peuples étrangers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Contenu à développer: relations avec d'autres peuples, traités existants...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
