
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BuildingsListProps, Building, BuildingStatus } from '@/components/maitrejeu/types/batiments';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Edit2, Trash2, Building2, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/utils/formatUtils';
import { useBatimentsManagement } from '@/components/maitrejeu/hooks/useBatimentsManagement';

export const BuildingsList: React.FC<BuildingsListProps> = ({ 
  onEdit, 
  onDelete,
  onSelect
}) => {
  const { buildings, getBuildingsByType } = useBatimentsManagement();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTab, setCurrentTab] = useState('all');
  
  // Filtrer les bâtiments en fonction de la recherche et de l'onglet
  const filteredBuildings = buildings.filter(building => {
    const matchesSearch = 
      building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      building.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      building.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (!matchesSearch) return false;
    
    if (currentTab === 'all') return true;
    if (currentTab === 'temples' && building.type === 'temple') return true;
    if (currentTab === 'government' && ['basilica', 'forum'].includes(building.type)) return true;
    if (currentTab === 'entertainment' && ['theater', 'amphitheater', 'circus'].includes(building.type)) return true;
    if (currentTab === 'infrastructure' && ['aqueduct', 'bridge', 'road'].includes(building.type)) return true;
    if (currentTab === 'commercial' && ['market', 'port', 'warehouse'].includes(building.type)) return true;
    if (currentTab === 'other' && (building.type === 'other' || building.type === 'villa')) return true;
    
    return false;
  });
  
  // Obtenir les bâtiments par type pour les statistiques
  const buildingsByType = getBuildingsByType();
  
  // Fonction pour afficher une badge en fonction du statut
  const getStatusBadge = (status: BuildingStatus) => {
    switch(status) {
      case 'excellent':
        return <Badge variant="success">Excellent</Badge>;
      case 'good':
        return <Badge>Bon</Badge>;
      case 'damaged':
        return <Badge variant="secondary">Endommagé</Badge>;
      case 'poor':
        return <Badge variant="warning">Mauvais état</Badge>;
      case 'ruined':
        return <Badge variant="destructive">En ruine</Badge>;
      case 'under_construction':
        return <Badge variant="outline">En construction</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  // Fonction pour afficher une icône en fonction du type
  const getBuildingTypeIcon = (type: string) => {
    return <Building2 className="h-4 w-4" />;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un bâtiment..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid grid-cols-4 lg:grid-cols-7">
          <TabsTrigger value="all">Tous <span className="ml-1 text-xs">({buildings.length})</span></TabsTrigger>
          <TabsTrigger value="temples">Temples <span className="ml-1 text-xs">({buildingsByType.temples.length})</span></TabsTrigger>
          <TabsTrigger value="government">Gouvernement <span className="ml-1 text-xs">({buildingsByType.government.length})</span></TabsTrigger>
          <TabsTrigger value="entertainment">Divertissement <span className="ml-1 text-xs">({buildingsByType.entertainment.length})</span></TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure <span className="ml-1 text-xs">({buildingsByType.infrastructure.length})</span></TabsTrigger>
          <TabsTrigger value="commercial">Commercial <span className="ml-1 text-xs">({buildingsByType.commercial.length})</span></TabsTrigger>
          <TabsTrigger value="other">Autres <span className="ml-1 text-xs">({buildingsByType.other.length})</span></TabsTrigger>
        </TabsList>
        
        <TabsContent value={currentTab} className="mt-4">
          {filteredBuildings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBuildings.map((building) => (
                <Card key={building.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {getBuildingTypeIcon(building.type)}
                          {building.name}
                        </CardTitle>
                        <CardDescription>{building.location}</CardDescription>
                      </div>
                      {getStatusBadge(building.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Année de construction:</dt>
                        <dd>{building.constructionYear} AUC</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Coût d'entretien:</dt>
                        <dd>{formatCurrency(building.maintenanceCost)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Revenu:</dt>
                        <dd>{formatCurrency(building.revenue)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Propriétaire:</dt>
                        <dd className="capitalize">{building.owner}</dd>
                      </div>
                    </dl>
                    
                    <div className="mt-4 flex space-x-2 justify-end">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onSelect && onSelect(building.id)}
                      >
                        Détails
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onEdit(building.id)}
                      >
                        <Edit2 className="h-4 w-4 mr-1" />
                        Modifier
                      </Button>
                      {onDelete && (
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => onDelete(building.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Supprimer
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed">
              <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">Aucun bâtiment trouvé</h3>
              <p className="text-muted-foreground mt-1">
                Aucun bâtiment ne correspond à vos critères de recherche.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BuildingsList;
