
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Trash, FileText, Eye } from 'lucide-react';
import { useBuildingManagement } from '../../hooks/useBuildingManagement';
import { Building, BuildingType, BuildingStatus } from '../../types/batiments';

interface BuildingsListProps {
  onEdit: (buildingId: string) => void;
}

const BuildingsList: React.FC<BuildingsListProps> = ({ onEdit }) => {
  const {
    buildings,
    deleteBuilding,
    filter,
    setFilter,
  } = useBuildingManagement();

  const [filteredBuildings, setFilteredBuildings] = useState<Building[]>([]);
  const [availableLocations, setAvailableLocations] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Update filtered buildings when filter or buildings change
  useEffect(() => {
    const filtered = buildings.filter(building => {
      const matchesSearch = searchTerm === '' || 
        building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        building.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });
    
    setFilteredBuildings(filtered);
    
    // Extract unique locations for the dropdown
    const locations = [...new Set(buildings.map(b => b.location))];
    setAvailableLocations(locations);
  }, [buildings, searchTerm, filter]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Rechercher un bâtiment..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="w-full sm:w-auto">
          <Select
            onValueChange={(value) => 
              setFilter({...filter, types: value === 'all' ? [] : [value]})
            }
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Type de bâtiment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="temple">Temples</SelectItem>
              <SelectItem value="forum">Forums</SelectItem>
              <SelectItem value="bath">Thermes</SelectItem>
              <SelectItem value="theater">Théâtres</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-auto">
          <Select
            onValueChange={(value) => 
              setFilter({...filter, locations: value === 'all' ? [] : [value]})
            }
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Emplacement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les emplacements</SelectItem>
              {availableLocations.map(location => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Emplacement</TableHead>
              <TableHead>État</TableHead>
              <TableHead>Propriétaire</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBuildings.length > 0 ? (
              filteredBuildings.map((building) => (
                <TableRow key={building.id}>
                  <TableCell className="font-medium">{building.name}</TableCell>
                  <TableCell>{building.type}</TableCell>
                  <TableCell>{building.location}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      building.status === 'excellent' ? 'bg-green-100 text-green-800' :
                      building.status === 'good' ? 'bg-blue-100 text-blue-800' :
                      building.status === 'average' ? 'bg-yellow-100 text-yellow-800' :
                      building.status === 'poor' ? 'bg-orange-100 text-orange-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {building.status === 'excellent' ? 'Excellent' :
                       building.status === 'good' ? 'Bon' :
                       building.status === 'average' ? 'Moyen' :
                       building.status === 'poor' ? 'Mauvais' :
                       building.status === 'under_construction' ? 'En construction' :
                       'Ruiné'}
                    </span>
                  </TableCell>
                  <TableCell>{building.owner}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => onEdit(building.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => deleteBuilding(building.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Aucun bâtiment ne correspond à vos critères de recherche.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BuildingsList;
