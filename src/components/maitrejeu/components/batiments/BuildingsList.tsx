
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, Edit, Search, Filter } from 'lucide-react';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBatimentsManagement } from '../../hooks/useBatimentsManagement';
import { Building, BuildingType } from '../../types/batiments';

interface BuildingsListProps {
  onEdit: (buildingId: string) => void;
}

const BuildingsList: React.FC<BuildingsListProps> = ({ onEdit }) => {
  const { buildings, filter, handleFilterChange } = useBatimentsManagement();
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = () => {
    handleFilterChange({ searchTerm });
  };
  
  const clearFilters = () => {
    setSearchTerm("");
    handleFilterChange({ 
      searchTerm: "", 
      types: [], 
      locations: [], 
      status: "", 
      minRevenue: 0, 
      maxMaintenance: 0 
    });
  };
  
  // Helper function to get badge color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-500';
      case 'good':
        return 'bg-green-300';
      case 'fair':
        return 'bg-yellow-300';
      case 'poor':
        return 'bg-yellow-600';
      case 'ruins':
        return 'bg-red-500';
      case 'construction':
      case 'under_construction':
        return 'bg-blue-500';
      case 'renovation':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} As`;
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Liste des Bâtiments Publics</CardTitle>
        <CardDescription>
          Gérez les bâtiments et infrastructures publiques de Rome
        </CardDescription>
        
        <div className="flex items-center space-x-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher un bâtiment..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button variant="outline" size="icon" onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => {}}>
            <Filter className="h-4 w-4" />
          </Button>
          {filter.searchTerm && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Effacer les filtres
            </Button>
          )}
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
              <TableHead>Valeur</TableHead>
              <TableHead>Maintenance</TableHead>
              <TableHead>Revenus</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {buildings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                  Aucun bâtiment trouvé
                </TableCell>
              </TableRow>
            ) : (
              buildings.map((building) => (
                <TableRow key={building.id}>
                  <TableCell className="font-medium">{building.name}</TableCell>
                  <TableCell>{building.type}</TableCell>
                  <TableCell>{building.location}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(building.status)}>
                      {building.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(building.value)}</TableCell>
                  <TableCell>{formatCurrency(building.maintenanceCost)}</TableCell>
                  <TableCell>{formatCurrency(building.income || 0)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 p-0"
                        onClick={() => {}}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="h-8 w-8 p-0"
                        onClick={() => onEdit(building.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      
      <CardFooter className="justify-between">
        <div className="text-sm text-muted-foreground">
          {buildings.length} bâtiments au total
        </div>
        <div className="text-sm text-muted-foreground">
          Valeur totale: {formatCurrency(buildings.reduce((sum, b) => sum + b.value, 0))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default BuildingsList;
