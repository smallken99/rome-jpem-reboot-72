
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OwnedBuilding } from '@/components/proprietes/types/property';
import { MapPin, Home, Building, Landmark, Warehouse } from 'lucide-react';

interface BuildingMapProps {
  buildings: OwnedBuilding[];
  onSelectBuilding?: (buildingId: string) => void;
  className?: string;
}

const BuildingMap: React.FC<BuildingMapProps> = ({ 
  buildings, 
  onSelectBuilding,
  className = '' 
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  
  // Extraire toutes les régions uniques
  const regions = Array.from(new Set(buildings.map(b => b.location.split(',')[0].trim())));
  
  // Filtrer les bâtiments par région
  const filteredBuildings = selectedRegion === 'all' 
    ? buildings 
    : buildings.filter(b => b.location.includes(selectedRegion));
  
  // Obtenir l'icône du bâtiment en fonction de son type
  const getBuildingIcon = (building: OwnedBuilding) => {
    switch(building.buildingType) {
      case 'urban':
        return <Building className="h-4 w-4" />;
      case 'rural':
        return <Home className="h-4 w-4" />;
      case 'religious':
        return <Landmark className="h-4 w-4" />;
      case 'commercial':
        return <Warehouse className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Carte des propriétés</span>
          <div className="flex gap-2">
            <Button 
              variant={selectedRegion === 'all' ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedRegion('all')}
              className="text-xs h-7 px-2"
            >
              Toutes
            </Button>
            {regions.map(region => (
              <Button
                key={region}
                variant={selectedRegion === region ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRegion(region)}
                className="text-xs h-7 px-2"
              >
                {region}
              </Button>
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="min-h-[300px] border rounded-md p-4 relative">
          {/* Placeholder for an actual map - In a real app, you would use a map library */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBuildings.map(building => (
              <div 
                key={building.id}
                className="flex flex-col border rounded-md p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => onSelectBuilding && onSelectBuilding(building.id.toString())}
              >
                <div className="flex items-center mb-2">
                  {getBuildingIcon(building)}
                  <span className="ml-2 font-medium">{building.name}</span>
                </div>
                <div className="text-xs text-muted-foreground mb-1">{building.location}</div>
                <div className="mt-auto flex justify-between items-center">
                  <Badge 
                    variant={
                      building.condition > 75 ? "success" : 
                      building.condition > 50 ? "default" : 
                      building.condition > 30 ? "outline" : 
                      "destructive"
                    }
                    className="text-xs"
                  >
                    {building.condition}%
                  </Badge>
                  <span className="text-xs">{(building.income || 0).toLocaleString()} as</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BuildingMap;
