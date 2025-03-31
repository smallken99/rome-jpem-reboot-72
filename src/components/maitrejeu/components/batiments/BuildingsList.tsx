
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Pencil, Trash } from 'lucide-react';
import { useBatimentsManagement } from '../../hooks/useBatimentsManagement';
import { Building, BuildingStatus, BuildingType } from '../../types/batiments';

interface BuildingsListProps {
  onEdit: (id: string) => void;
  onDelete?: (id: string) => void;
  onSelect?: (id: string) => void;
}

const BuildingsList: React.FC<BuildingsListProps> = ({ onEdit, onDelete, onSelect }) => {
  const { buildings } = useBatimentsManagement();
  const [filter, setFilter] = useState('');

  // Define a mapping from string to BuildingStatus
  const buildingStatusMap: Record<string, BuildingStatus> = {
    'excellent': 'excellent',
    'good': 'good',
    'average': 'average',
    'damaged': 'damaged',
    'poor': 'poor',
    'ruined': 'ruined',
    'under_construction': 'under_construction'
  };

  const getStatusBadge = (status: BuildingStatus) => {
    switch (status) {
      case 'excellent':
        return <Badge className="bg-green-500">Excellent</Badge>;
      case 'good':
        return <Badge className="bg-green-400">Bon</Badge>;
      case 'average':
        return <Badge className="bg-yellow-400">Moyen</Badge>;
      case 'damaged':
        return <Badge className="bg-orange-400">Endommagé</Badge>;
      case 'poor':
        return <Badge className="bg-red-400">Mauvais</Badge>;
      case 'ruined':
        return <Badge className="bg-red-600">Ruiné</Badge>;
      case 'under_construction':
        return <Badge className="bg-blue-400">En construction</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  const getTypeDisplay = (type: BuildingType) => {
    const types: Record<BuildingType, string> = {
      temple: 'Temple',
      forum: 'Forum',
      market: 'Marché',
      villa: 'Villa',
      domus: 'Domus',
      insula: 'Insula',
      warehouse: 'Entrepôt',
      baths: 'Thermes',
      theater: 'Théâtre',
      port: 'Port',
      aqueduct: 'Aqueduc',
      road: 'Route',
      wall: 'Mur',
      barracks: 'Caserne',
      palace: 'Palais',
      senate: 'Sénat',
      basilica: 'Basilique',
      amphitheater: 'Amphithéâtre',
      circus: 'Cirque',
      bath: 'Bain',
      bridge: 'Pont',
      other: 'Autre'
    };
    
    return types[type] || 'Autre';
  };

  const filteredBuildings = buildings.filter(building => 
    building.name.toLowerCase().includes(filter.toLowerCase()) ||
    building.location.toLowerCase().includes(filter.toLowerCase()) ||
    getTypeDisplay(building.type).toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Liste des Bâtiments</CardTitle>
        <div className="mt-4">
          <Input
            placeholder="Rechercher un bâtiment..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Emplacement</TableHead>
              <TableHead>État</TableHead>
              <TableHead>Coût d'entretien</TableHead>
              <TableHead>Revenu</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBuildings.map((building) => (
              <TableRow key={building.id} onClick={() => onSelect && onSelect(building.id)} className="cursor-pointer">
                <TableCell className="font-medium">{building.name}</TableCell>
                <TableCell>{getTypeDisplay(building.type)}</TableCell>
                <TableCell>{building.location}</TableCell>
                <TableCell>
                  {getStatusBadge(buildingStatusMap[building.status] || 'average')}
                </TableCell>
                <TableCell>{building.maintenanceCost.toLocaleString()} as</TableCell>
                <TableCell>{building.revenue.toLocaleString()} as</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      onEdit(building.id);
                    }}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    {onDelete && (
                      <Button variant="destructive" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        onDelete(building.id);
                      }}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {filteredBuildings.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  Aucun bâtiment trouvé
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BuildingsList;
