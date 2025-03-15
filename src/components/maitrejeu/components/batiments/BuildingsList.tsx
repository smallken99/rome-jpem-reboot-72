
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, ArrowUpDown, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Building, BuildingStatus, BuildingType } from '../../types/batiments';
import { formatCurrency } from '@/utils/currencyUtils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BuildingsListProps {
  onEdit: (buildingId: string) => void;
}

export const BuildingsList: React.FC<BuildingsListProps> = ({ onEdit }) => {
  const [buildings, setBuildings] = React.useState<Building[]>([
    {
      id: '1',
      name: 'Temple de Jupiter',
      type: 'temple',
      location: 'Forum Romanum',
      status: 'good',
      constructionYear: 720,
      description: 'Temple principal dédié à Jupiter sur le Capitole',
      cost: 50000,
      maintenanceCost: 1000,
      revenue: 500,
      capacity: 1000,
      owner: 'république'
    },
    {
      id: '2',
      name: 'Basilique Aemilia',
      type: 'basilica',
      location: 'Forum Romanum',
      status: 'excellent',
      constructionYear: 735,
      description: 'Bâtiment administratif et centre commercial',
      cost: 35000,
      maintenanceCost: 750,
      revenue: 2000,
      capacity: 800,
      owner: 'sénat'
    },
    {
      id: '3',
      name: 'Aqueduc Appien',
      type: 'aqueduct',
      location: 'Via Appia',
      status: 'damaged',
      constructionYear: 710,
      description: 'Aqueduc amenant l\'eau à Rome depuis les montagnes',
      cost: 80000,
      maintenanceCost: 1500,
      revenue: 0,
      capacity: 0,
      owner: 'censeur'
    }
  ]);

  const [filter, setFilter] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState<BuildingType | 'all'>('all');
  const [statusFilter, setStatusFilter] = React.useState<BuildingStatus | 'all'>('all');

  const filteredBuildings = buildings.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(filter.toLowerCase()) ||
                         b.description.toLowerCase().includes(filter.toLowerCase()) ||
                         b.location.toLowerCase().includes(filter.toLowerCase());
    
    const matchesType = typeFilter === 'all' || b.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getBadgeVariant = (status: BuildingStatus) => {
    switch (status) {
      case 'excellent': return 'success';
      case 'good': return 'default';
      case 'damaged': return 'warning';
      case 'poor': return 'destructive';
      case 'ruined': return 'outline';
      case 'under_construction': return 'secondary';
      default: return 'default';
    }
  };

  const formatType = (type: BuildingType) => {
    const typeMapping: Record<BuildingType, string> = {
      'temple': 'Temple',
      'basilica': 'Basilique',
      'forum': 'Forum',
      'market': 'Marché',
      'aqueduct': 'Aqueduc',
      'theater': 'Théâtre',
      'amphitheater': 'Amphithéâtre',
      'circus': 'Cirque',
      'bath': 'Thermes',
      'bridge': 'Pont',
      'villa': 'Villa',
      'road': 'Route',
      'port': 'Port',
      'warehouse': 'Entrepôt',
      'other': 'Autre'
    };
    return typeMapping[type] || type;
  };

  const formatStatus = (status: BuildingStatus) => {
    const statusMapping: Record<BuildingStatus, string> = {
      'excellent': 'Excellent',
      'good': 'Bon',
      'damaged': 'Endommagé',
      'poor': 'Mauvais',
      'ruined': 'En ruine',
      'under_construction': 'En construction'
    };
    return statusMapping[status] || status;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un bâtiment..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as BuildingType | 'all')}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type de bâtiment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les types</SelectItem>
            <SelectItem value="temple">Temple</SelectItem>
            <SelectItem value="basilica">Basilique</SelectItem>
            <SelectItem value="forum">Forum</SelectItem>
            <SelectItem value="market">Marché</SelectItem>
            <SelectItem value="aqueduct">Aqueduc</SelectItem>
            <SelectItem value="theater">Théâtre</SelectItem>
            <SelectItem value="amphitheater">Amphithéâtre</SelectItem>
            <SelectItem value="bath">Thermes</SelectItem>
            <SelectItem value="other">Autres</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as BuildingStatus | 'all')}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="État" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les états</SelectItem>
            <SelectItem value="excellent">Excellent</SelectItem>
            <SelectItem value="good">Bon</SelectItem>
            <SelectItem value="damaged">Endommagé</SelectItem>
            <SelectItem value="poor">Mauvais</SelectItem>
            <SelectItem value="ruined">En ruine</SelectItem>
            <SelectItem value="under_construction">En construction</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredBuildings.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          Aucun bâtiment ne correspond aux critères de recherche
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBuildings.map((building) => (
            <Card key={building.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{building.name}</CardTitle>
                  <Badge variant={getBadgeVariant(building.status)}>
                    {formatStatus(building.status)}
                  </Badge>
                </div>
                <CardDescription>{formatType(building.type)} - {building.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{building.description}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Construction:</p>
                    <p>{building.constructionYear} AUC</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Propriétaire:</p>
                    <p>{building.owner}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Coût d'entretien:</p>
                    <p>{formatCurrency(building.maintenanceCost)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Revenus:</p>
                    <p>{formatCurrency(building.revenue)}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(building.id)}>
                  <Edit className="h-3.5 w-3.5 mr-1.5" />
                  Éditer
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
