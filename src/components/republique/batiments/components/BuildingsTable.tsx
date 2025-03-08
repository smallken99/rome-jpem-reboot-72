
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Eye, Hammer, Banknote } from 'lucide-react';
import { PublicBuilding } from '../hooks/useBatimentsPublics';
import { formatMoney } from '@/utils/formatUtils';
import { StatusBadge } from './StatusBadge';

interface BuildingsTableProps {
  buildings: PublicBuilding[];
  onViewDetails?: (building: PublicBuilding) => void;
  onMaintain?: (buildingId: string) => void;
}

export const BuildingsTable: React.FC<BuildingsTableProps> = ({
  buildings = [],
  onViewDetails,
  onMaintain
}) => {
  const getConditionColor = (condition: number) => {
    if (condition >= 80) return 'bg-green-500';
    if (condition >= 50) return 'bg-yellow-500';
    if (condition >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Nom</TableHead>
            <TableHead>Emplacement</TableHead>
            <TableHead>Construction</TableHead>
            <TableHead>État</TableHead>
            <TableHead>Entretien</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {buildings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Aucun bâtiment public trouvé.
              </TableCell>
            </TableRow>
          ) : (
            buildings.map((building) => (
              <TableRow key={building.id}>
                <TableCell className="font-medium">{building.name}</TableCell>
                <TableCell>{building.location}</TableCell>
                <TableCell>{building.constructionYear} AUC</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <StatusBadge status={building.constructionStatus} />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="w-full">
                            <Progress 
                              value={building.condition} 
                              className={`h-2 ${getConditionColor(building.condition)}`}
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>État: {building.condition}%</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Banknote className="h-4 w-4 text-muted-foreground" />
                    <span>{formatMoney(building.maintenanceCost)}/an</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Niveau: {building.maintenanceLevel === 'minimal' ? 'Minimal' : 
                            building.maintenanceLevel === 'standard' ? 'Standard' : 'Excellent'}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onViewDetails && onViewDetails(building)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onMaintain && onMaintain(building.id)}
                      className={building.condition < 50 ? "border-orange-300 bg-orange-50" : ""}
                    >
                      <Hammer className={`h-4 w-4 ${building.condition < 50 ? "text-orange-600" : ""}`} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
