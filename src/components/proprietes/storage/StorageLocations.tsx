
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MapPin, Package } from 'lucide-react';

interface StorageLocation {
  id: string;
  name: string;
  type: 'villa' | 'domus' | 'entrepôt' | 'terre';
  capacity: number;
  used: number;
  security: 'faible' | 'normale' | 'élevée';
}

// Sample data
const storageLocations: StorageLocation[] = [
  { id: '1', name: 'Villa Tusculana', type: 'villa', capacity: 5000, used: 3200, security: 'élevée' },
  { id: '2', name: 'Domus Palatina', type: 'domus', capacity: 1000, used: 850, security: 'normale' },
  { id: '3', name: 'Entrepôt du Port', type: 'entrepôt', capacity: 8000, used: 6300, security: 'normale' },
  { id: '4', name: 'Terres Agricoles', type: 'terre', capacity: 15000, used: 9800, security: 'faible' },
];

export const StorageLocations: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          Lieux de Stockage
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Capacité</TableHead>
              <TableHead>Utilisation</TableHead>
              <TableHead>Sécurité</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {storageLocations.map((location) => (
              <TableRow key={location.id}>
                <TableCell className="font-medium">{location.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {location.type}
                  </Badge>
                </TableCell>
                <TableCell>{location.capacity.toLocaleString()} unités</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          location.used / location.capacity > 0.9 ? 'bg-red-500' :
                          location.used / location.capacity > 0.7 ? 'bg-amber-500' : 'bg-green-500'
                        }`} 
                        style={{ width: `${(location.used / location.capacity) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {Math.round((location.used / location.capacity) * 100)}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={
                      location.security === 'élevée' ? 'success' : 
                      location.security === 'normale' ? 'default' : 'outline'
                    }
                  >
                    {location.security}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
