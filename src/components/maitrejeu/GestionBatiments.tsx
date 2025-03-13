
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  Plus, 
  Hammer, 
  AlertTriangle, 
  Search,
  Filter,
  SortAsc,
  Map 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export const GestionBatiments: React.FC = () => {
  const [activeTab, setActiveTab] = useState('publics');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Données fictives pour la démonstration
  const batimentsPublics = [
    { id: '1', nom: 'Temple de Jupiter', type: 'Religieux', état: 'Bon', maintenance: 'Basse', coût: 2000 },
    { id: '2', nom: 'Théâtre de Pompée', type: 'Divertissement', état: 'Excellent', maintenance: 'Moyenne', coût: 5000 },
    { id: '3', nom: 'Forum Romain', type: 'Civil', état: 'Vétuste', maintenance: 'Haute', coût: 8000 },
    { id: '4', nom: 'Aqueduc Claudien', type: 'Infrastructure', état: 'Moyen', maintenance: 'Moyenne', coût: 12000 },
  ];
  
  const projetsConstruction = [
    { id: '1', nom: 'Nouveau Temple de Mars', type: 'Religieux', progression: 45, budget: 15000, responsable: 'Gaius Aurelius' },
    { id: '2', nom: 'Extension du Forum', type: 'Civil', progression: 20, budget: 30000, responsable: 'Marcus Tullius' },
    { id: '3', nom: 'Rénovation des Thermes', type: 'Bains', progression: 80, budget: 8000, responsable: 'Lucius Calpurnius' },
  ];
  
  // Obtenir la couleur pour le badge d'état
  const getStateColor = (état: string) => {
    switch (état.toLowerCase()) {
      case 'excellent':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'bon':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'moyen':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'vétuste':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  // Obtenir la couleur pour le badge de maintenance
  const getMaintenanceColor = (niveau: string) => {
    switch (niveau.toLowerCase()) {
      case 'basse':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'moyenne':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'haute':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des Bâtiments Publics</h1>
        
        <Button 
          onClick={() => console.log('Nouveau bâtiment/projet')}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          Nouveau Projet
        </Button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Rechercher un bâtiment..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" className="h-10 w-10">
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-10 w-10">
          <SortAsc className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" className="h-10 w-10">
          <Map className="h-4 w-4" />
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="publics">Bâtiments Publics</TabsTrigger>
          <TabsTrigger value="projets">Projets de Construction</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance & Réparations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="publics">
          <Card>
            <CardHeader>
              <CardTitle>Bâtiments Publics de Rome</CardTitle>
              <CardDescription>
                Gérez les bâtiments publics, temples, aqueducs et autres infrastructures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {batimentsPublics.map(batiment => (
                  <Card key={batiment.id} className="overflow-hidden">
                    <CardHeader className="p-4 pb-2 bg-muted/40">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        {batiment.nom}
                      </CardTitle>
                      <CardDescription>{batiment.type}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">État:</span>
                          <Badge variant="outline" className={getStateColor(batiment.état)}>
                            {batiment.état}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Maintenance:</span>
                          <Badge variant="outline" className={getMaintenanceColor(batiment.maintenance)}>
                            {batiment.maintenance}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Coût annuel:</span>
                          <span className="font-medium">{batiment.coût} denarii</span>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => console.log('Voir détails', batiment.id)}
                        >
                          Détails
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => console.log('Maintenance', batiment.id)}
                        >
                          <Hammer className="h-4 w-4 mr-1" />
                          Maintenance
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="projets">
          <Card>
            <CardHeader>
              <CardTitle>Projets de Construction</CardTitle>
              <CardDescription>
                Suivez l'avancement des projets de construction dans la République
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projetsConstruction.map(projet => (
                  <Card key={projet.id} className="overflow-hidden">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{projet.nom}</CardTitle>
                          <CardDescription>{projet.type}</CardDescription>
                        </div>
                        <Badge>{projet.progression}%</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 mb-4">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${projet.progression}%` }}
                        ></div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Budget:</p>
                          <p className="font-medium">{projet.budget} denarii</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Responsable:</p>
                          <p className="font-medium">{projet.responsable}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => console.log('Voir détails projet', projet.id)}
                        >
                          Détails
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => console.log('Modififier projet', projet.id)}
                        >
                          Modifier
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance & Réparations</CardTitle>
              <CardDescription>
                Gérez les travaux de maintenance et les réparations d'urgence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-amber-800">Alertes de maintenance</h3>
                  <p className="text-amber-700 text-sm mt-1">
                    3 bâtiments nécessitent une maintenance urgente. Planifiez des travaux de réparation pour éviter une détérioration supplémentaire.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4 mt-6">
                <h3 className="font-medium">Travaux en cours</h3>
                <p className="text-muted-foreground">Aucun travail de maintenance actuellement en cours.</p>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button 
                  onClick={() => console.log('Planifier maintenance')}
                  className="flex items-center gap-1"
                >
                  <Hammer className="h-4 w-4" />
                  Planifier des travaux
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
