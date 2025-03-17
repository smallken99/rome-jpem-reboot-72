
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/currencyUtils';
import { BuildingDescription } from '../../data/types/buildingTypes';
import { CircleDollarSign, Clock, User, Star, Tool } from 'lucide-react';

interface BuildingCatalogueItemProps {
  building: BuildingDescription;
  onSelect: (buildingId: string) => void;
  onPurchase: (buildingId: string) => void;
  onMaintenance?: (buildingId: string) => void;
  selected: boolean;
}

export const BuildingCatalogueItem: React.FC<BuildingCatalogueItemProps> = ({
  building,
  onSelect,
  onPurchase,
  onMaintenance,
  selected
}) => {
  return (
    <Card 
      className={`transition-all cursor-pointer hover:shadow-md ${
        selected ? 'border-primary border-2' : 'border'
      }`}
      onClick={() => onSelect(building.id)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-cinzel">{building.name}</CardTitle>
          <Badge variant={building.type === 'urban' ? 'default' : 
                          building.type === 'rural' ? 'secondary' : 
                          building.type === 'religious' ? 'outline' : 'destructive'}>
            {building.type === 'urban' ? 'Urbain' : 
             building.type === 'rural' ? 'Rural' : 
             building.type === 'religious' ? 'Religieux' : 'Public'}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">{building.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
            <span>{formatCurrency(building.initialCost)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{building.maintenanceCost}/an</span>
          </div>
          {building.slaves && (
            <div className="flex items-center gap-1">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{building.slaves.required} esclaves</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-muted-foreground" />
            <span>+{building.prestige} prestige</span>
          </div>
        </div>
        
        {building.advantages && building.advantages.length > 0 && (
          <div className="mt-2 text-sm">
            <p className="text-xs text-muted-foreground">Avantages:</p>
            <ul className="list-disc list-inside text-xs">
              {building.advantages.slice(0, 2).map((advantage, idx) => (
                <li key={idx} className="line-clamp-1">{advantage}</li>
              ))}
              {building.advantages.length > 2 && (
                <li className="text-muted-foreground">+ {building.advantages.length - 2} autres...</li>
              )}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button 
          className="w-full text-sm h-8" 
          onClick={(e) => {
            e.stopPropagation();
            onPurchase(building.id);
          }}
        >
          Acquérir
        </Button>
        
        {onMaintenance && (
          <Button 
            variant="outline"
            className="w-full text-sm h-8"
            onClick={(e) => {
              e.stopPropagation();
              onMaintenance(building.id);
            }}
          >
            <Tool className="h-3.5 w-3.5 mr-1" />
            Entretien
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
