
import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Edit, Trash2, Building, ArrowUpDown } from 'lucide-react';

// Types fictifs pour la démonstration
interface Building {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'good' | 'average' | 'poor';
  yearBuilt: number;
  lastMaintenance: string;
  owner: string;
}

interface BuildingsListProps {
  onEdit: (buildingId: string) => void;
}

export const BuildingsList: React.FC<BuildingsListProps> = ({ onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Building>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Données fictives pour la démonstration
  const buildings: Building[] = [
    {
      id: '1',
      name: 'Temple de Jupiter',
      type: 'Temple',
      location: 'Forum Romanum',
      status: 'good',
      yearBuilt: 650,
      lastMaintenance: '720 AUC, Ver',
      owner: 'République'
    },
    {
      id: '2',
      name: 'Basilique Aemilia',
      type: 'Basilique',
      location: 'Forum Romanum',
      status: 'average',
      yearBuilt: 690,
      lastMaintenance: '715 AUC, Aestas',
      owner: 'République'
    },
    {
      id: '3',
      name: 'Aqueduc Appien',
      type: 'Aqueduc',
      location: 'Via Appia',
      status: 'poor',
      yearBuilt: 675,
      lastMaintenance: '710 AUC, Hiems',
      owner: 'République'
    }
  ];
  
  // Filtrer et trier les bâtiments
  const filteredBuildings = buildings
    .filter(building => 
      building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      building.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      building.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];
      
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortDirection === 'asc' 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      }
      
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }
      
      return 0;
    });
  
  const handleSort = (field: keyof Building) => {
    setSortDirection(prev => sortField === field && prev === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  };
  
  const getStatusColor = (status: Building['status']) => {
    switch (status) {
      case 'good': return 'bg-green-500';
      case 'average': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  const handleDelete = (id: string) => {
    console.log('Deleting building with ID:', id);
    // Logique de suppression à implémenter
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Building className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Bâtiments publics</h2>
        </div>
        <Input
          placeholder="Rechercher un bâtiment..."
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] cursor-pointer" onClick={() => handleSort('name')}>
              <div className="flex items-center gap-1">
                Nom
                {sortField === 'name' && (
                  <ArrowUpDown className={`h-4 w-4 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} />
                )}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('type')}>
              <div className="flex items-center gap-1">
                Type
                {sortField === 'type' && (
                  <ArrowUpDown className={`h-4 w-4 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} />
                )}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('location')}>
              <div className="flex items-center gap-1">
                Emplacement
                {sortField === 'location' && (
                  <ArrowUpDown className={`h-4 w-4 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} />
                )}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
              <div className="flex items-center gap-1">
                État
                {sortField === 'status' && (
                  <ArrowUpDown className={`h-4 w-4 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} />
                )}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort('yearBuilt')}>
              <div className="flex items-center gap-1">
                Construction
                {sortField === 'yearBuilt' && (
                  <ArrowUpDown className={`h-4 w-4 ${sortDirection === 'asc' ? 'rotate-0' : 'rotate-180'}`} />
                )}
              </div>
            </TableHead>
            <TableHead>Dernière maintenance</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBuildings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                Aucun bâtiment trouvé.
              </TableCell>
            </TableRow>
          ) : (
            filteredBuildings.map(building => (
              <TableRow key={building.id}>
                <TableCell className="font-medium">{building.name}</TableCell>
                <TableCell>{building.type}</TableCell>
                <TableCell>{building.location}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(building.status)}`} />
                    <span className="capitalize">
                      {building.status === 'good' ? 'Bon' : building.status === 'average' ? 'Moyen' : 'Mauvais'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{building.yearBuilt} AUC</TableCell>
                <TableCell>{building.lastMaintenance}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Ouvrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(building.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(building.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
