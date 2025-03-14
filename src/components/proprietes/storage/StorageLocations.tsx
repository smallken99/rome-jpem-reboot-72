
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Warehouse, MapPin, Package, ArrowRight, Edit, BarChart } from 'lucide-react';

interface StorageLocation {
  id: string;
  name: string;
  capacity: number;
  used: number;
  location: string;
  type: 'entrepôt' | 'magasin' | 'cellier' | 'autre';
  resourceCount: number;
}

export const StorageLocations: React.FC = () => {
  // Données fictives de lieux de stockage
  const storageLocations: StorageLocation[] = [
    {
      id: '1',
      name: 'Entrepôt du Tibre',
      capacity: 50000,
      used: 32500,
      location: 'Rome, quartier du port',
      type: 'entrepôt',
      resourceCount: 8
    },
    {
      id: '2',
      name: 'Cellier de la Villa',
      capacity: 5000,
      used: 3200,
      location: 'Villa Campanie',
      type: 'cellier',
      resourceCount: 6
    },
    {
      id: '3',
      name: 'Magasin du Forum',
      capacity: 8000,
      used: 2600,
      location: 'Rome, Forum',
      type: 'magasin',
      resourceCount: 4
    },
    {
      id: '4',
      name: 'Dépôt de matériaux',
      capacity: 12000,
      used: 9800,
      location: 'Rome, Quirinal',
      type: 'entrepôt',
      resourceCount: 5
    }
  ];

  // Obtenir la couleur pour le type de stockage
  const getStorageTypeBadge = (type: string) => {
    switch (type) {
      case 'entrepôt': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'magasin': return 'bg-green-100 text-green-800 border-green-200';
      case 'cellier': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Obtenir la couleur pour l'indicateur de capacité
  const getCapacityColor = (usedPercent: number) => {
    if (usedPercent >= 90) return 'bg-red-600';
    if (usedPercent >= 75) return 'bg-amber-500';
    if (usedPercent >= 50) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Lieux de stockage</h3>
        <Button size="sm">
          <Warehouse className="h-4 w-4 mr-2" /> Ajouter un lieu
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {storageLocations.map((location) => {
          const usedPercent = (location.used / location.capacity) * 100;
          return (
            <Card key={location.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{location.name}</CardTitle>
                  <Badge className={getStorageTypeBadge(location.type)}>
                    {location.type.charAt(0).toUpperCase() + location.type.slice(1)}
                  </Badge>
                </div>
                <CardDescription className="flex items-center text-sm mt-1">
                  <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  {location.location}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-2">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-muted-foreground">Capacité utilisée</span>
                      <span className="text-sm font-medium">
                        {Math.round(usedPercent)}% ({location.used}/{location.capacity})
                      </span>
                    </div>
                    <Progress 
                      value={usedPercent} 
                      className={`h-2 ${getCapacityColor(usedPercent)}`} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Ressources stockées</span>
                    </div>
                    <span className="font-medium">{location.resourceCount}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-2">
                <div className="flex justify-between w-full">
                  <Button variant="outline" size="sm">
                    <Edit className="h-3.5 w-3.5 mr-1" /> Modifier
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <BarChart className="h-3.5 w-3.5 mr-1" /> Statistiques
                    </Button>
                    <Button size="sm">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
