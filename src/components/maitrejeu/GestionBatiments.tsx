
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Building, Building2, Landmark, MapPin, PlusCircle, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TimePanel } from './components/TimePanel';

export const GestionBatiments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('publics');
  const [filter, setFilter] = useState<string | null>(null);
  
  // Données fictives pour l'exemple
  const batimentsPublics = [
    { id: '1', nom: 'Temple de Jupiter', type: 'religieux', état: 'bon', coût: 5000, localisation: 'Capitole' },
    { id: '2', nom: 'Basilique Aemilia', type: 'civil', état: 'moyen', coût: 4000, localisation: 'Forum' },
    { id: '3', nom: 'Aqueduc Claudia', type: 'infrastructure', état: 'excellent', coût: 8000, localisation: 'Via Appia' },
    { id: '4', nom: 'Théâtre de Pompée', type: 'divertissement', état: 'mauvais', coût: 3500, localisation: 'Champ de Mars' },
  ];
  
  const batimentsMilitaires = [
    { id: '1', nom: 'Fortifications Nord', type: 'défense', état: 'bon', coût: 3000, localisation: 'Mur d\'Aurélien' },
    { id: '2', nom: 'Camp Prétorien', type: 'caserne', état: 'excellent', coût: 6000, localisation: 'Nord-Est de Rome' },
    { id: '3', nom: 'Arsenal Maritime', type: 'naval', état: 'moyen', coût: 4500, localisation: 'Ostie' },
  ];
  
  const projetsConstruction = [
    { id: '1', nom: 'Nouveau Temple de Vesta', type: 'religieux', budget: 7000, progrès: 45, date_fin: 'Ver 653' },
    { id: '2', nom: 'Extension du Forum', type: 'civil', budget: 10000, progrès: 30, date_fin: 'Hiems 653' },
    { id: '3', nom: 'Réparation Voie Appienne', type: 'infrastructure', budget: 5000, progrès: 70, date_fin: 'Aestas 652' },
  ];
  
  const getÉtatBadgeColor = (état: string) => {
    switch(état) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'bon': return 'bg-blue-100 text-blue-800';
      case 'moyen': return 'bg-yellow-100 text-yellow-800';
      case 'mauvais': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getTypeBadgeColor = (type: string) => {
    switch(type) {
      case 'religieux': return 'bg-purple-100 text-purple-800';
      case 'civil': return 'bg-blue-100 text-blue-800';
      case 'infrastructure': return 'bg-green-100 text-green-800';
      case 'divertissement': return 'bg-pink-100 text-pink-800';
      case 'défense': return 'bg-orange-100 text-orange-800';
      case 'caserne': return 'bg-red-100 text-red-800';
      case 'naval': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const filteredBatimentsPublics = batimentsPublics.filter(b => {
    if (searchTerm && !b.nom.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (filter && b.type !== filter) {
      return false;
    }
    return true;
  });
  
  const filteredBatimentsMilitaires = batimentsMilitaires.filter(b => {
    if (searchTerm && !b.nom.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (filter && b.type !== filter) {
      return false;
    }
    return true;
  });
  
  const filteredProjets = projetsConstruction.filter(p => {
    if (searchTerm && !p.nom.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (filter && p.type !== filter) {
      return false;
    }
    return true;
  });
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Gestion des Bâtiments</h1>
      
      <TimePanel />
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Recherche et filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center border rounded-md px-3 py-2">
                <Search className="h-4 w-4 text-muted-foreground mr-2" />
                <Input
                  placeholder="Rechercher un bâtiment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-0 p-0 focus-visible:ring-0 h-8"
                />
              </div>
            </div>
            
            <div>
              <Select value={filter || ""} onValueChange={(value) => setFilter(value || null)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrer par type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tous les types</SelectItem>
                  <SelectItem value="religieux">Religieux</SelectItem>
                  <SelectItem value="civil">Civil</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="divertissement">Divertissement</SelectItem>
                  <SelectItem value="défense">Défense</SelectItem>
                  <SelectItem value="caserne">Caserne</SelectItem>
                  <SelectItem value="naval">Naval</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="publics" className="flex items-center gap-2">
            <Landmark className="h-4 w-4" />
            <span>Bâtiments Publics</span>
          </TabsTrigger>
          <TabsTrigger value="militaires" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span>Bâtiments Militaires</span>
          </TabsTrigger>
          <TabsTrigger value="projets" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span>Projets de Construction</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="publics">
          <div className="flex justify-end mb-4">
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Nouveau Bâtiment Public
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBatimentsPublics.map((batiment) => (
              <Card key={batiment.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg">{batiment.nom}</CardTitle>
                  <CardDescription className="flex items-center text-sm">
                    <MapPin className="h-3 w-3 mr-1" />
                    {batiment.localisation}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline" className={getTypeBadgeColor(batiment.type)}>
                      {batiment.type}
                    </Badge>
                    <Badge variant="outline" className={getÉtatBadgeColor(batiment.état)}>
                      État: {batiment.état}
                    </Badge>
                  </div>
                  <div className="text-sm mt-2">
                    <span className="font-medium">Coût d'entretien:</span> {batiment.coût} as/an
                  </div>
                  
                  <div className="flex justify-end mt-3">
                    <Button variant="outline" size="sm">Détails</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="militaires">
          <div className="flex justify-end mb-4">
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Nouveau Bâtiment Militaire
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBatimentsMilitaires.map((batiment) => (
              <Card key={batiment.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg">{batiment.nom}</CardTitle>
                  <CardDescription className="flex items-center text-sm">
                    <MapPin className="h-3 w-3 mr-1" />
                    {batiment.localisation}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline" className={getTypeBadgeColor(batiment.type)}>
                      {batiment.type}
                    </Badge>
                    <Badge variant="outline" className={getÉtatBadgeColor(batiment.état)}>
                      État: {batiment.état}
                    </Badge>
                  </div>
                  <div className="text-sm mt-2">
                    <span className="font-medium">Coût d'entretien:</span> {batiment.coût} as/an
                  </div>
                  
                  <div className="flex justify-end mt-3">
                    <Button variant="outline" size="sm">Détails</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="projets">
          <div className="flex justify-end mb-4">
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Nouveau Projet
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjets.map((projet) => (
              <Card key={projet.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg">{projet.nom}</CardTitle>
                  <CardDescription className="text-sm">
                    Fin prévue: {projet.date_fin}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="outline" className={getTypeBadgeColor(projet.type)}>
                      {projet.type}
                    </Badge>
                  </div>
                  
                  <div className="text-sm mt-2 space-y-1">
                    <div>
                      <span className="font-medium">Budget:</span> {projet.budget} as
                    </div>
                    <div>
                      <span className="font-medium">Progrès:</span> {projet.progrès}%
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${projet.progrès}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-3">
                    <Button variant="outline" size="sm">Détails</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
