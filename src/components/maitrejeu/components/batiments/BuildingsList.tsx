
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon, Filter, AlertTriangle, Building, Tool } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { PublicBuilding } from '@/components/republique/batiments/types/buildingTypes';
import { ConditionBadge } from './ConditionBadge';

interface BuildingsListProps {
  buildings: PublicBuilding[];
  balance: number;
  onMaintain: (buildingId: string, cost: number) => void;
}

export const BuildingsList: React.FC<BuildingsListProps> = ({ 
  buildings, 
  balance,
  onMaintain 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string>('all');
  
  // Filter buildings
  const filteredBuildings = buildings
    .filter(building => {
      // Filter by search term
      if (searchTerm && !building.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Filter by condition
      if (filter === 'needs_maintenance' && building.condition > 60) {
        return false;
      }
      
      if (filter === 'critical' && building.condition > 30) {
        return false;
      }
      
      if (filter === 'good' && building.condition < 80) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => a.condition - b.condition); // Sort by condition ascending (worst first)
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un bâtiment..."
                className="pl-9 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrer
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilter('all')}>
                  Tous les bâtiments
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('needs_maintenance')}>
                  Nécessite maintenance
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('critical')}>
                  État critique
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('good')}>
                  Bon état
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              Total: {buildings.length} bâtiments
            </span>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Lieu</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Coût maintenance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBuildings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  Aucun bâtiment trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredBuildings.map((building) => (
                <TableRow key={building.id} className={building.condition < 30 ? "bg-red-50" : ""}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-amber-600" />
                      {building.name}
                      {building.condition < 30 && (
                        <AlertTriangle className="h-4 w-4 ml-2 text-red-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{building.buildingTypeId}</Badge>
                  </TableCell>
                  <TableCell>{building.location}</TableCell>
                  <TableCell>
                    <ConditionBadge condition={building.condition} />
                  </TableCell>
                  <TableCell>
                    {building.maintenanceCost.toLocaleString()} As
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onMaintain(building.id, building.maintenanceCost)}
                      disabled={balance < building.maintenanceCost}
                    >
                      <Tool className="h-3.5 w-3.5 mr-1.5" />
                      Maintenance
                    </Button>
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
