
import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Building, BuildingType, BuildingStatus } from '../../types/batiments';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash, Construction, Info } from 'lucide-react';
import { useMaitreJeu } from '../../context';
import { Card, CardContent } from '@/components/ui/card';

interface BuildingsListProps {
  onEdit: (id: string) => void;
}

const BuildingsList: React.FC<BuildingsListProps> = ({ onEdit }) => {
  const { buildings = [] } = useMaitreJeu();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<BuildingStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  // Status mapping for display and filtering
  const statusMap: Record<string, BuildingStatus> = {
    'excellent': 'excellent',
    'good': 'good',
    'fair': 'fair',
    'poor': 'poor',
    'average': 'fair', // Map 'average' to 'fair'
    'damaged': 'poor', // Map 'damaged' to 'poor'
    'ruins': 'ruins',
    'ruined': 'ruins', // Map 'ruined' to 'ruins'
    'under_construction': 'construction', // Map 'under_construction' to 'construction'
    'construction': 'construction',
    'renovation': 'renovation'
  };
  
  // Filter buildings based on search term and filters
  const filteredBuildings = buildings.filter(building => {
    // Check if building matches the search term
    const matchesSearch = building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         building.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Check if building matches the status filter
    const matchesStatus = statusFilter === 'all' || 
                         (building.status && statusMap[building.status] === statusFilter);
    
    // Check if building matches the type filter
    const matchesType = typeFilter === 'all' || building.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Building types for the filter dropdown
  const buildingTypes = ['temple', 'forum', 'market', 'villa', 'domus', 'insula', 
                        'warehouse', 'baths', 'theater', 'port', 'aqueduct', 'road', 
                        'bridge', 'military', 'other', 'wall'];
  
  // Get status badge color
  const getStatusColor = (status: BuildingStatus | string | undefined): string => {
    const mappedStatus = status ? (statusMap[status] || status) : 'fair';
    
    switch (mappedStatus) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-emerald-400';
      case 'fair': return 'bg-blue-400';
      case 'poor': return 'bg-amber-400';
      case 'ruins': return 'bg-red-500';
      case 'construction': return 'bg-purple-400';
      case 'renovation': return 'bg-indigo-400';
      default: return 'bg-gray-400';
    }
  };
  
  // Get icon for building type
  const getBuildingTypeIcon: Record<BuildingType, string> = {
    'temple': '🏛️',
    'forum': '🏢',
    'market': '🏪',
    'villa': '🏡',
    'domus': '🏠',
    'insula': '🏘️',
    'warehouse': '🏭',
    'baths': '🧖‍♀️',
    'theater': '🎭',
    'amphitheater': '🏟️',
    'senate': '🏛️',
    'basilica': '⚖️',
    'market': '🛒',
    'warehouse': '📦',
    'workshop': '🔨',
    'port': '⚓',
    'aqueduct': '🌊',
    'road': '🛣️',
    'bridge': '🌉',
    'military': '⚔️',
    'other': '❓',
    'wall': '🧱'
  };
  
  return (
    <div className="space-y-4">
      {/* Filtres et recherche */}
      <Card>
        <CardContent className="pt-4 pb-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="searchTerm">Recherche</Label>
              <Input
                id="searchTerm"
                placeholder="Nom ou emplacement..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="statusFilter">État</Label>
              <Select 
                value={statusFilter} 
                onValueChange={(value) => setStatusFilter(value as BuildingStatus | 'all')}
              >
                <SelectTrigger id="statusFilter">
                  <SelectValue placeholder="Tous les états" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les états</SelectItem>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="good">Bon</SelectItem>
                  <SelectItem value="fair">Correct</SelectItem>
                  <SelectItem value="poor">Médiocre</SelectItem>
                  <SelectItem value="ruins">En ruine</SelectItem>
                  <SelectItem value="construction">En construction</SelectItem>
                  <SelectItem value="renovation">En rénovation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="typeFilter">Type</Label>
              <Select 
                value={typeFilter} 
                onValueChange={setTypeFilter}
              >
                <SelectTrigger id="typeFilter">
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  {buildingTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Liste des bâtiments */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Emplacement</TableHead>
              <TableHead>État</TableHead>
              <TableHead>Valeur</TableHead>
              <TableHead>Maintenance</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBuildings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Aucun bâtiment trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredBuildings.map((building) => (
                <TableRow key={building.id}>
                  <TableCell className="font-medium">{building.name}</TableCell>
                  <TableCell>
                    {getBuildingTypeIcon[building.type as BuildingType]} {building.type.charAt(0).toUpperCase() + building.type.slice(1)}
                  </TableCell>
                  <TableCell>{building.location}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(building.status)}`}>
                      {building.status || 'Inconnu'}
                    </Badge>
                  </TableCell>
                  <TableCell>{building.value.toLocaleString()} As</TableCell>
                  <TableCell>{building.maintenanceCost.toLocaleString()} As/an</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onEdit(building.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                    >
                      <Info className="h-4 w-4" />
                    </Button>
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

export default BuildingsList;
