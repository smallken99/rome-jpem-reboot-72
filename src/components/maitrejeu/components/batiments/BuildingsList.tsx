import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Building, BuildingStatus } from '../../types/batiments';
import { Edit, Trash2, Search, FileText } from 'lucide-react';
import { useBatimentsManagement } from '../../hooks/useBatimentsManagement';
import { BuildingsListProps } from '../../types/batiments';
import { UnderDevelopmentSection } from '../UnderDevelopmentSection';

export const BuildingsList: React.FC<BuildingsListProps> = ({ 
  buildings = [], 
  onEdit,
  onDelete,
  onSelect 
}) => {
  const { buildings: hookBuildings } = useBatimentsManagement();
  const allBuildings = buildings.length > 0 ? buildings : hookBuildings;
  
  const [filter, setFilter] = useState('');
  
  const filteredBuildings = allBuildings.filter(building => 
    building.name.toLowerCase().includes(filter.toLowerCase()) ||
    building.location.toLowerCase().includes(filter.toLowerCase()) ||
    building.type.toLowerCase().includes(filter.toLowerCase())
  );
  
  const getBuildingStatusBadge = (status: BuildingStatus) => {
    switch (status) {
      case 'excellent':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Excellent</Badge>;
      case 'good':
        return <Badge variant="outline" className="text-green-600">Bon</Badge>;
      case 'damaged':
        return <Badge variant="outline" className="text-amber-600">Endommagé</Badge>;
      case 'poor':
        return <Badge variant="secondary" className="bg-amber-100 text-amber-800">Mauvais</Badge>;
      case 'ruined':
        return <Badge variant="destructive">Ruiné</Badge>;
      case 'under_construction':
        return <Badge variant="outline" className="text-blue-600">En construction</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getBadgeVariant = (status: BuildingStatus) => {
    switch (status) {
      case 'excellent':
      case 'good':
        return 'success';
      case 'damaged':
      case 'average':
        return 'secondary';
      case 'poor':
      case 'ruined':
        return 'destructive';
      case 'under_construction':
        return 'outline';
      default:
        return 'default';
    }
  };
  
  if (allBuildings.length === 0) {
    return (
      <UnderDevelopmentSection 
        title="Liste des bâtiments"
        description="Aucun bâtiment n'a encore été ajouté. Créez de nouveaux bâtiments avec le bouton 'Nouveau bâtiment'."
      />
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un bâtiment..."
            className="pl-8"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm">Exporter</Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Emplacement</TableHead>
              <TableHead>État</TableHead>
              <TableHead>Propriétaire</TableHead>
              <TableHead>Revenus</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBuildings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                  Aucun bâtiment ne correspond à votre recherche
                </TableCell>
              </TableRow>
            ) : (
              filteredBuildings.map((building) => (
                <TableRow key={building.id}>
                  <TableCell className="font-medium">{building.name}</TableCell>
                  <TableCell>
                    {building.type.charAt(0).toUpperCase() + building.type.slice(1).replace('_', ' ')}
                  </TableCell>
                  <TableCell>{building.location}</TableCell>
                  <TableCell>
                    {getBuildingStatusBadge(building.status)}
                  </TableCell>
                  <TableCell>{building.owner}</TableCell>
                  <TableCell>{building.revenue} deniers</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onSelect && onSelect(building.id)}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onEdit(building.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {onDelete && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onDelete(building.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
