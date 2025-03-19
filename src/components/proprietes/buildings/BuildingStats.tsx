
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Coins, Wrench, Users, Calendar } from 'lucide-react';
import { formatCurrency } from '@/utils/currencyUtils';
import { OwnedBuilding } from '@/types/buildings';
import { Progress } from '@/components/ui/progress';

interface BuildingStatsProps {
  building: OwnedBuilding;
}

export const BuildingStats: React.FC<BuildingStatsProps> = ({ building }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Building className="h-5 w-5 mr-2" />
            État du bâtiment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Condition:</span>
              <span className="font-medium">{building.condition}%</span>
            </div>
            <Progress value={building.condition} className="h-2" />
            
            <div className="flex justify-between items-center text-sm mt-4">
              <span>Niveau d'entretien:</span>
              <span className="font-medium">
                {building.maintenanceLevel === 0 ? 'Minimal' :
                 building.maintenanceLevel === 1 ? 'Basique' :
                 building.maintenanceLevel === 2 ? 'Standard' :
                 building.maintenanceLevel === 3 ? 'Élevé' : 'Luxueux'}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span>Niveau de sécurité:</span>
              <span className="font-medium">
                {building.securityLevel === 0 ? 'Aucun' :
                 building.securityLevel === 1 ? 'Basique' :
                 building.securityLevel === 2 ? 'Standard' : 'Élevé'}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span>Acquisition:</span>
              <span className="font-medium">{building.purchaseDate.toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Coins className="h-5 w-5 mr-2" />
            Économie
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Revenu mensuel:</span>
              <span className="font-medium text-green-600">{formatCurrency(building.income || 0)}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span>Coût d'entretien:</span>
              <span className="font-medium text-red-500">{formatCurrency(building.maintenanceCost)}</span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span>Bénéfice net:</span>
              <span className={`font-medium ${(building.income || 0) - building.maintenanceCost > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {formatCurrency((building.income || 0) - building.maintenanceCost)}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <span>Personnel:</span>
              <span className="font-medium flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {building.workers || 0} / {building.slaves || 0} esclaves
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
