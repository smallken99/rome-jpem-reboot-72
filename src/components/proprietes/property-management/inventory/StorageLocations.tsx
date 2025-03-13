
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface StorageLocation {
  id: string;
  name: string;
  type: 'entrepôt' | 'villa' | 'domus' | 'grenier';
  capacity: number;
  usedCapacity: number;
  location: string;
  security: 'basse' | 'moyenne' | 'haute';
}

interface StorageLocationsProps {
  searchTerm: string;
}

export const StorageLocations: React.FC<StorageLocationsProps> = ({ searchTerm }) => {
  // Exemple de données
  const locations: StorageLocation[] = [
    {
      id: '1',
      name: 'Entrepôt Principal',
      type: 'entrepôt',
      capacity: 5000,
      usedCapacity: 3200,
      location: 'Rome',
      security: 'haute'
    },
    {
      id: '2',
      name: 'Villa Toscana',
      type: 'villa',
      capacity: 1200,
      usedCapacity: 800,
      location: 'Toscane',
      security: 'moyenne'
    },
    {
      id: '3',
      name: 'Domus Palatinus',
      type: 'domus',
      capacity: 500,
      usedCapacity: 200,
      location: 'Rome',
      security: 'haute'
    },
    {
      id: '4',
      name: 'Grenier Campania',
      type: 'grenier',
      capacity: 3000,
      usedCapacity: 2700,
      location: 'Campanie',
      security: 'basse'
    }
  ];
  
  // Filtrer les emplacements selon le terme de recherche
  const filteredLocations = locations.filter(
    location => location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Rendu des badges de sécurité
  const renderSecurityBadge = (security: 'basse' | 'moyenne' | 'haute') => {
    switch (security) {
      case 'basse':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Basse</Badge>;
      case 'moyenne':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Moyenne</Badge>;
      case 'haute':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Haute</Badge>;
      default:
        return <Badge variant="outline">Inconnue</Badge>;
    }
  };
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Emplacement</TableHead>
            <TableHead>Capacité</TableHead>
            <TableHead>Utilisation</TableHead>
            <TableHead>Sécurité</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLocations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                Aucun emplacement de stockage trouvé.
              </TableCell>
            </TableRow>
          ) : (
            filteredLocations.map((location) => (
              <TableRow key={location.id}>
                <TableCell className="font-medium">{location.name}</TableCell>
                <TableCell className="capitalize">{location.type}</TableCell>
                <TableCell>{location.location}</TableCell>
                <TableCell>{location.capacity} unités</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          location.usedCapacity / location.capacity > 0.8 ? 'bg-red-500' :
                          location.usedCapacity / location.capacity > 0.6 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${(location.usedCapacity / location.capacity) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs">
                      {Math.round((location.usedCapacity / location.capacity) * 100)}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>{renderSecurityBadge(location.security)}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => console.log(`Edit location ${location.id}`)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => console.log(`Delete location ${location.id}`)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
