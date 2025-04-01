
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SearchIcon, Edit, MoreHorizontal } from 'lucide-react';
import { useBatimentsManagement } from '../../hooks/useBatimentsManagement';
import { Building } from '../../types/batiments';

interface BuildingsListProps {
  onEdit: (id: string) => void;
}

const BuildingsList: React.FC<BuildingsListProps> = ({ onEdit }) => {
  const { buildings, filter, setFilter } = useBatimentsManagement();
  const [filteredBuildings, setFilteredBuildings] = useState<Building[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  // Filter buildings based on search term and filters
  useEffect(() => {
    let filtered = [...buildings];

    if (searchTerm) {
      filtered = filtered.filter(
        (building) =>
          building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          building.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          building.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter((building) => building.type === selectedType);
    }

    if (selectedLocation !== 'all') {
      filtered = filtered.filter((building) => building.location === selectedLocation);
    }

    setFilteredBuildings(filtered);
  }, [buildings, searchTerm, selectedType, selectedLocation]);

  // Get unique building types and locations for filtering
  const buildingTypes = Array.from(new Set(buildings.map((b) => b.type)));
  const locations = Array.from(new Set(buildings.map((b) => b.location)));

  // Handle filter changes
  const handleFilterChange = (type: string, value: string) => {
    if (type === 'type') {
      setSelectedType(value);
    } else if (type === 'location') {
      setSelectedLocation(value);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <Select
            value={selectedType}
            onValueChange={(value) => handleFilterChange('type', value)}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              {buildingTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedLocation}
            onValueChange={(value) => handleFilterChange('location', value)}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Emplacement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les lieux</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
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
              <TableHead className="text-right">Valeur</TableHead>
              <TableHead className="text-right">Entretien</TableHead>
              <TableHead className="text-right">Revenus</TableHead>
              <TableHead></TableHead>
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
                    <Badge
                      variant={
                        building.condition > 75
                          ? 'default'
                          : building.condition > 50
                          ? 'secondary'
                          : building.condition > 25
                          ? 'outline'
                          : 'destructive'
                      }
                    >
                      {building.condition}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{building.value.toLocaleString()} as</TableCell>
                  <TableCell className="text-right">{building.maintenanceCost.toLocaleString()} as/an</TableCell>
                  <TableCell className="text-right">{(building.revenue || 0).toLocaleString()} as/an</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(building.id)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Modifier</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Aucun bâtiment trouvé.
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
