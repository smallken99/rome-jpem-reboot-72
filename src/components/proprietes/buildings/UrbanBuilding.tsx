
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Home, Users, Wrench, Coins, ShieldCheck } from 'lucide-react';
import { OwnedBuilding } from '@/types/buildings';
import { formatCurrency } from '@/utils/currencyUtils';

interface UrbanBuildingProps {
  building: OwnedBuilding;
  onManage: (id: string) => void;
  onSell: (id: string) => void;
}

export const UrbanBuilding: React.FC<UrbanBuildingProps> = ({ building, onManage, onSell }) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              {building.name}
            </CardTitle>
            <CardDescription>{building.location}</CardDescription>
          </div>
          <Badge variant={building.condition > 75 ? "default" : building.condition > 50 ? "secondary" : "destructive"}>
            {building.condition}% état
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Coins className="h-4 w-4 text-amber-500" />
            <span>{formatCurrency(building.income || 0)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Wrench className="h-4 w-4 text-slate-500" />
            <span>{formatCurrency(building.maintenanceCost)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-500" />
            <span>{building.workers || 0} travailleurs</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-green-500" />
            <span>Niveau {building.securityLevel || 0}</span>
          </div>
        </div>
        {building.description && (
          <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{building.description}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm" onClick={() => onManage(building.id)}>
          Gérer
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onSell(building.id)}>
          Vendre
        </Button>
      </CardFooter>
    </Card>
  );
};
