
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, MapPin, Coins, ArrowRight, AlertTriangle } from 'lucide-react';
import { OwnedBuilding } from '@/components/proprietes/hooks/building/types';
import { formatCurrency } from '@/utils/formatters';

interface UrbanBuildingCardProps {
  building: OwnedBuilding;
  onSelect: (id: string) => void;
}

export const UrbanBuildingCard: React.FC<UrbanBuildingCardProps> = ({ building, onSelect }) => {
  // Déterminer la couleur de l'état du bâtiment
  const getConditionColor = (condition: number) => {
    if (condition >= 85) return 'bg-green-100 text-green-800 border-green-300';
    if (condition >= 65) return 'bg-blue-100 text-blue-800 border-blue-300';
    if (condition >= 40) return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  // Calculer le revenu estimé en fonction de l'état
  const estimatedRevenue = Math.round(building.income * (building.condition / 100));

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5 text-slate-600" />
            <h3 className="font-medium text-lg">{building.name}</h3>
          </div>
          <Badge className={getConditionColor(building.condition)}>
            État: {building.condition}%
          </Badge>
        </div>
        
        <div className="text-sm text-muted-foreground mb-4 flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          {building.location}
        </div>
        
        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="text-center p-2 bg-slate-50 rounded-md">
            <div className="text-sm text-muted-foreground">Revenu</div>
            <div className="font-medium text-green-600">{formatCurrency(estimatedRevenue)}</div>
          </div>
          
          <div className="text-center p-2 bg-slate-50 rounded-md">
            <div className="text-sm text-muted-foreground">Entretien</div>
            <div className="font-medium text-red-600">{formatCurrency(building.maintenanceCost)}</div>
          </div>
        </div>
        
        {!building.maintenanceEnabled && (
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-2 rounded-md mb-4">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs">Entretien désactivé</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2"
          onClick={() => onSelect(building.id.toString())}
        >
          <span>Gérer</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
