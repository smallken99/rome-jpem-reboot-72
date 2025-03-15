
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Construction } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const GestionBatiments: React.FC = () => {
  const [activeTab, setActiveTab] = useState('batiments');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Données simulées pour les bâtiments (à remplacer par les vraies données)
  const batiments = [
    { id: 1, nom: 'Temple de Jupiter', type: 'Temple', etat: 'Bon', cout: 5000, revenu: 200 },
    { id: 2, nom: 'Forum Romanum', type: 'Forum', etat: 'Excellent', cout: 10000, revenu: 500 },
    { id: 3, nom: 'Aqueduc Appien', type: 'Aqueduc', etat: 'Moyen', cout: 8000, revenu: 0 },
  ];
  
  const constructions = [
    { id: 1, nom: 'Nouveau Temple', type: 'Temple', progression: 60, coutTotal: 6000 },
    { id: 2, nom: 'Thermes', type: 'Bains', progression: 30, coutTotal: 4000 },
  ];
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="flex items-center gap-2">
              <Building className="h-8 w-8 text-amber-600" />
              Gestion des Bâtiments
            </span>
          </h1>
          <p className="text-muted-foreground">
            Administration des infrastructures publiques et militaires de la République
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Infrastructure de Rome</CardTitle>
            <div className="flex items-center gap-4">
              <Input
                placeholder="Rechercher un bâtiment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Button>
                <Construction className="h-4 w-4 mr-2" />
                Nouvelle Construction
              </Button>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList>
              <TabsTrigger value="batiments">Bâtiments</TabsTrigger>
              <TabsTrigger value="constructions">En Construction</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        
        <CardContent>
          <TabsContent value="batiments" className="mt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>État</TableHead>
                  <TableHead>Coût</TableHead>
                  <TableHead>Revenu</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batiments.map((batiment) => (
                  <TableRow key={batiment.id}>
                    <TableCell className="font-medium">{batiment.nom}</TableCell>
                    <TableCell>{batiment.type}</TableCell>
                    <TableCell>{batiment.etat}</TableCell>
                    <TableCell>{batiment.cout} As</TableCell>
                    <TableCell>{batiment.revenu} As</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="constructions" className="mt-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Progression</TableHead>
                  <TableHead>Coût Total</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {constructions.map((construction) => (
                  <TableRow key={construction.id}>
                    <TableCell className="font-medium">{construction.nom}</TableCell>
                    <TableCell>{construction.type}</TableCell>
                    <TableCell>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-amber-500"
                          style={{ width: `${construction.progression}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">
                        {construction.progression}%
                      </span>
                    </TableCell>
                    <TableCell>{construction.coutTotal} As</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Gérer
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="maintenance" className="mt-0">
            <div className="text-center py-8 text-muted-foreground">
              Le système de maintenance est en cours de développement.
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
};
