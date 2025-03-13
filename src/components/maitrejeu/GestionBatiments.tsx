
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  Home, 
  Landmark, 
  Castle, 
  Map, 
  Plus, 
  Search,
  Filter
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const GestionBatiments: React.FC = () => {
  const [activeTab, setActiveTab] = useState('publics');
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('tous');
  
  // Données fictives pour les bâtiments
  const buildingsData = {
    publics: [
      { id: 'b1', nom: 'Forum Romanum', type: 'Forum', statut: 'Construit', année: 753, construction: 100 },
      { id: 'b2', nom: 'Temple de Jupiter', type: 'Temple', statut: 'Construit', année: 509, construction: 100 },
      { id: 'b3', nom: 'Basilique Aemilia', type: 'Basilique', statut: 'Construit', année: 179, construction: 100 },
      { id: 'b4', nom: 'Théâtre de Pompée', type: 'Théâtre', statut: 'En projet', année: 61, construction: 0 }
    ],
    privés: [
      { id: 'p1', nom: 'Domus Augusti', type: 'Domus', propriétaire: 'Auguste', valeur: 5000000 },
      { id: 'p2', nom: 'Villa des Papyrus', type: 'Villa', propriétaire: 'Lucius Calpurnius Piso Caesoninus', valeur: 3000000 },
      { id: 'p3', nom: 'Domus Aurea', type: 'Domus', propriétaire: 'Néron', valeur: 10000000 }
    ],
    religieux: [
      { id: 'r1', nom: 'Temple de Vesta', type: 'Temple', divinité: 'Vesta', prêtre: 'Vestales' },
      { id: 'r2', nom: 'Temple de Mars', type: 'Temple', divinité: 'Mars', prêtre: 'Flamine de Mars' },
      { id: 'r3', nom: 'Temple de Saturne', type: 'Temple', divinité: 'Saturne', prêtre: 'Flamine de Saturne' }
    ],
    militaires: [
      { id: 'm1', nom: 'Camp Prétorien', type: 'Camp', garnison: 'Garde Prétorienne', capacité: 5000 },
      { id: 'm2', nom: 'Castra Albana', type: 'Fort', garnison: 'Legio II Parthica', capacité: 2000 },
      { id: 'm3', nom: 'Mur Servien', type: 'Fortification', garnison: 'Milice urbaine', capacité: 500 }
    ]
  };
  
  // Filtrer les bâtiments par terme de recherche et filtre
  const filterBuildings = (buildings: any[]) => {
    return buildings.filter(building => {
      if (searchTerm && !building.nom.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      if (filter !== 'tous' && building.type !== filter) {
        return false;
      }
      
      return true;
    });
  };
  
  // Obtenir les filtres disponibles pour l'onglet actif
  const getFiltersForActiveTab = () => {
    const allBuildingsInTab = buildingsData[activeTab as keyof typeof buildingsData];
    const types = [...new Set(allBuildingsInTab.map(b => b.type))];
    
    return types;
  };
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Gestion des Bâtiments</h1>
      
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un bâtiment..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tous">Tous les types</SelectItem>
              {getFiltersForActiveTab().map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nouveau Bâtiment
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
          <TabsTrigger value="publics" className="flex items-center gap-2">
            <Landmark className="h-4 w-4" />
            <span className="hidden md:inline">Publics</span>
          </TabsTrigger>
          <TabsTrigger value="privés" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span className="hidden md:inline">Privés</span>
          </TabsTrigger>
          <TabsTrigger value="religieux" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden md:inline">Religieux</span>
          </TabsTrigger>
          <TabsTrigger value="militaires" className="flex items-center gap-2">
            <Castle className="h-4 w-4" />
            <span className="hidden md:inline">Militaires</span>
          </TabsTrigger>
          <TabsTrigger value="carte" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            <span className="hidden md:inline">Carte</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="publics">
          <Card>
            <CardHeader>
              <CardTitle>Bâtiments Publics</CardTitle>
              <CardDescription>
                Édifices appartenant à la République Romaine, financés par le trésor public.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-medium">Nom</th>
                    <th className="text-left py-2 px-4 font-medium">Type</th>
                    <th className="text-left py-2 px-4 font-medium">Statut</th>
                    <th className="text-left py-2 px-4 font-medium">Année</th>
                    <th className="text-left py-2 px-4 font-medium">Construction</th>
                    <th className="text-left py-2 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filterBuildings(buildingsData.publics).map(building => (
                    <tr key={building.id} className="border-b">
                      <td className="py-2 px-4">{building.nom}</td>
                      <td className="py-2 px-4">{building.type}</td>
                      <td className="py-2 px-4">{building.statut}</td>
                      <td className="py-2 px-4">{building.année} av. J.-C.</td>
                      <td className="py-2 px-4">{building.construction}%</td>
                      <td className="py-2 px-4">
                        <Button variant="outline" size="sm">Détails</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privés">
          <Card>
            <CardHeader>
              <CardTitle>Bâtiments Privés</CardTitle>
              <CardDescription>
                Propriétés des citoyens romains, résidences et villas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-medium">Nom</th>
                    <th className="text-left py-2 px-4 font-medium">Type</th>
                    <th className="text-left py-2 px-4 font-medium">Propriétaire</th>
                    <th className="text-left py-2 px-4 font-medium">Valeur</th>
                    <th className="text-left py-2 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filterBuildings(buildingsData.privés).map(building => (
                    <tr key={building.id} className="border-b">
                      <td className="py-2 px-4">{building.nom}</td>
                      <td className="py-2 px-4">{building.type}</td>
                      <td className="py-2 px-4">{building.propriétaire}</td>
                      <td className="py-2 px-4">{building.valeur.toLocaleString()} sesterces</td>
                      <td className="py-2 px-4">
                        <Button variant="outline" size="sm">Détails</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="religieux">
          <Card>
            <CardHeader>
              <CardTitle>Bâtiments Religieux</CardTitle>
              <CardDescription>
                Temples et lieux sacrés dédiés aux divinités romaines.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-medium">Nom</th>
                    <th className="text-left py-2 px-4 font-medium">Type</th>
                    <th className="text-left py-2 px-4 font-medium">Divinité</th>
                    <th className="text-left py-2 px-4 font-medium">Prêtre</th>
                    <th className="text-left py-2 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filterBuildings(buildingsData.religieux).map(building => (
                    <tr key={building.id} className="border-b">
                      <td className="py-2 px-4">{building.nom}</td>
                      <td className="py-2 px-4">{building.type}</td>
                      <td className="py-2 px-4">{building.divinité}</td>
                      <td className="py-2 px-4">{building.prêtre}</td>
                      <td className="py-2 px-4">
                        <Button variant="outline" size="sm">Détails</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="militaires">
          <Card>
            <CardHeader>
              <CardTitle>Bâtiments Militaires</CardTitle>
              <CardDescription>
                Forts, camps et autres installations militaires de la République.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-medium">Nom</th>
                    <th className="text-left py-2 px-4 font-medium">Type</th>
                    <th className="text-left py-2 px-4 font-medium">Garnison</th>
                    <th className="text-left py-2 px-4 font-medium">Capacité</th>
                    <th className="text-left py-2 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filterBuildings(buildingsData.militaires).map(building => (
                    <tr key={building.id} className="border-b">
                      <td className="py-2 px-4">{building.nom}</td>
                      <td className="py-2 px-4">{building.type}</td>
                      <td className="py-2 px-4">{building.garnison}</td>
                      <td className="py-2 px-4">{building.capacité} soldats</td>
                      <td className="py-2 px-4">
                        <Button variant="outline" size="sm">Détails</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="carte">
          <Card>
            <CardHeader>
              <CardTitle>Carte des Bâtiments</CardTitle>
              <CardDescription>
                Visualisation géographique des bâtiments de Rome et de l'Empire.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center bg-muted">
              <div className="text-center">
                <Map className="h-16 w-16 mx-auto text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">La carte interactive sera disponible prochainement</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GestionBatiments;
