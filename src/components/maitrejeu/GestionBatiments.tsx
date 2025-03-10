
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Landmark, Castle, Warehouse, Home } from 'lucide-react';

export const GestionBatiments: React.FC = () => {
  const [activeTab, setActiveTab] = useState('publics');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gestion des Bâtiments</h2>
          <p className="text-muted-foreground">
            Gérez les bâtiments publics et privés de la République
          </p>
        </div>
      </div>

      <Tabs defaultValue="publics" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="publics" className="flex items-center gap-2">
            <Landmark className="h-4 w-4" />
            <span>Bâtiments Publics</span>
          </TabsTrigger>
          <TabsTrigger value="militaires" className="flex items-center gap-2">
            <Castle className="h-4 w-4" />
            <span>Structures Militaires</span>
          </TabsTrigger>
          <TabsTrigger value="prives" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span>Bâtiments Privés</span>
          </TabsTrigger>
          <TabsTrigger value="entrepots" className="flex items-center gap-2">
            <Warehouse className="h-4 w-4" />
            <span>Entrepôts</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="publics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Temples et Édifices Publics</CardTitle>
              <CardDescription>
                Gérez les temples, basiliques, thermes et autres édifices publics de Rome
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Contenu à développer: liste des bâtiments publics, leur état, maintenance...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="militaires" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Installations Militaires</CardTitle>
              <CardDescription>
                Campements, arsenaux et fortifications de la République
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Contenu à développer: liste des structures militaires, garnisons...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="prives" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Propriétés des Familles</CardTitle>
              <CardDescription>
                Propriétés résidentielles et commerciales des citoyens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Contenu à développer: répartition des propriétés par familles...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="entrepots" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Entrepôts</CardTitle>
              <CardDescription>
                Stockage des ressources et marchandises
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                Contenu à développer: capacité de stockage, marchandises stockées...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
