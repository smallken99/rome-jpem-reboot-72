
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash, Filter, Search, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBatimentsManagement } from '../../hooks/useBatimentsManagement';
import { Building, BuildingStatus } from '../../types/batiments';
import { formatCurrency } from '@/utils/formatters';

interface BuildingsListProps {
  onEdit: (id: string) => void;
  onDelete?: (id: string) => void;
}

const statusColors: Record<BuildingStatus, string> = {
  excellent: 'bg-green-100 text-green-800',
  good: 'bg-green-100 text-green-800',
  fair: 'bg-yellow-100 text-yellow-800',
  poor: 'bg-orange-100 text-orange-800',
  ruins: 'bg-red-100 text-red-800',
  construction: 'bg-blue-100 text-blue-800',
  renovation: 'bg-purple-100 text-purple-800',
  average: 'bg-yellow-100 text-yellow-800',
  damaged: 'bg-orange-100 text-orange-800',
  ruined: 'bg-red-100 text-red-800',
  under_construction: 'bg-blue-100 text-blue-800'
};

const BuildingsList: React.FC<BuildingsListProps> = ({ onEdit, onDelete }) => {
  const { buildings, filter, handleFilterChange, deleteBuilding } = useBatimentsManagement();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredBuildings, setFilteredBuildings] = useState<Building[]>([]);

  useEffect(() => {
    const filtered = buildings.filter(building => {
      // Filter by name and location
      if (searchTerm && 
          !building.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !building.location.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Filter by type
      if (filter.types.length > 0 && !filter.types.includes(building.type)) {
        return false;
      }
      
      // Filter by location
      if (filter.locations.length > 0 && !filter.locations.includes(building.location)) {
        return false;
      }
      
      // Filter by status
      if (filter.status && filter.status !== 'all' && building.status !== filter.status) {
        return false;
      }
      
      // Filter by revenue
      if (filter.minRevenue > 0 && building.revenue < filter.minRevenue) {
        return false;
      }
      
      // Filter by maintenance cost
      if (filter.maxMaintenance > 0 && building.maintenanceCost > filter.maxMaintenance) {
        return false;
      }
      
      return true;
    });
    
    setFilteredBuildings(filtered);
  }, [buildings, searchTerm, filter]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (id: string) => {
    if (onDelete) {
      onDelete(id);
    } else if (deleteBuilding) {
      deleteBuilding(id);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Bâtiments Publics</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative w-64">
              <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher un bâtiment..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Emplacement</TableHead>
              <TableHead>État</TableHead>
              <TableHead className="text-right">Valeur</TableHead>
              <TableHead className="text-right">Entretien</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBuildings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                  Aucun bâtiment trouvé. Ajoutez de nouveaux bâtiments avec le bouton "Nouveau bâtiment".
                </TableCell>
              </TableRow>
            ) : (
              filteredBuildings.map((building) => (
                <TableRow key={building.id}>
                  <TableCell className="font-medium">{building.name}</TableCell>
                  <TableCell>{building.type}</TableCell>
                  <TableCell>{building.location}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[building.status] || 'bg-gray-100'}>
                      {building.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(building.value)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(building.maintenanceCost)}/an
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(building.revenue)}/an
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button variant="ghost" size="icon" onClick={() => onEdit(building.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      {onDelete && (
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(building.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon">
                        <BarChart className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BuildingsList;
