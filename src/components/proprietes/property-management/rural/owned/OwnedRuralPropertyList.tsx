
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleDollarSign, Home, Map, Landmark, Wheat } from "lucide-react";
import { OwnedBuilding } from "@/components/proprietes/hooks/building/types";
import { formatCurrency } from "@/utils/formatters";

interface OwnedRuralPropertyListProps {
  buildings: OwnedBuilding[];
  onSelectBuilding: (id: string) => void;
}

export const OwnedRuralPropertyList: React.FC<OwnedRuralPropertyListProps> = ({
  buildings,
  onSelectBuilding
}) => {
  if (buildings.length === 0) {
    return (
      <Card className="bg-background">
        <CardContent className="pt-6 text-center">
          <div className="flex flex-col items-center justify-center py-8">
            <Wheat className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">Aucune propriété rurale</h3>
            <p className="text-muted-foreground mt-2">
              Vous ne possédez pas encore de propriétés rurales. 
              Consultez le marché foncier pour en acquérir.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {buildings.map((building) => (
        <Card key={building.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl flex items-center gap-2">
                <Home className="h-5 w-5" />
                {building.name}
              </CardTitle>
              <Badge variant={building.maintenanceEnabled ? "outline" : "destructive"}>
                {building.maintenanceEnabled ? "Entretenue" : "Négligée"}
              </Badge>
            </div>
            <CardDescription className="flex items-center mt-1">
              <Map className="h-4 w-4 mr-1" />
              {building.location}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <p className="text-muted-foreground">État</p>
                <p className="font-medium">{building.condition}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Esclaves</p>
                <p className="font-medium">{building.slaves || 0}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Maintenance</p>
                <p className="font-medium">{formatCurrency(building.maintenanceCost)} As/an</p>
              </div>
              <div>
                <p className="text-muted-foreground">Revenus</p>
                <p className="font-medium">{formatCurrency(building.income || 0)} As/an</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => onSelectBuilding(building.id.toString())}
            >
              Gérer cette propriété
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
