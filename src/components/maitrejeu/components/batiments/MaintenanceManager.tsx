
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tool, AlertTriangle, BarChart4, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ConditionBadge } from './ConditionBadge';
import { PublicBuilding } from '@/components/republique/batiments/types/buildingTypes';

interface MaintenanceManagerProps {
  buildings: PublicBuilding[];
  onMaintain: (buildingId: string, cost: number) => void;
}

export const MaintenanceManager: React.FC<MaintenanceManagerProps> = ({ 
  buildings, 
  onMaintain 
}) => {
  const [filter, setFilter] = useState<'all' | 'critical' | 'needs_maintenance'>('all');
  
  // Sort buildings by condition (worst first)
  const sortedBuildings = [...buildings].sort((a, b) => a.condition - b.condition);
  
  // Filter buildings based on selected filter
  const filteredBuildings = sortedBuildings.filter((building) => {
    if (filter === 'critical') return building.condition < 30;
    if (filter === 'needs_maintenance') return building.condition < 60;
    return true;
  });
  
  // Group buildings by condition category
  const criticalCount = buildings.filter(b => b.condition < 30).length;
  const needsMaintenanceCount = buildings.filter(b => b.condition >= 30 && b.condition < 60).length;
  const goodConditionCount = buildings.filter(b => b.condition >= 60).length;
  
  // Calculate total maintenance costs
  const totalMaintenanceCost = filteredBuildings.reduce((sum, building) => sum + building.maintenanceCost, 0);
  
  // Calculate average condition
  const averageCondition = buildings.length > 0
    ? Math.round(buildings.reduce((sum, building) => sum + building.condition, 0) / buildings.length)
    : 0;
  
  const handleMaintainAll = () => {
    // Perform maintenance on all filtered buildings
    filteredBuildings.forEach(building => {
      onMaintain(building.id, building.maintenanceCost);
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              État moyen des bâtiments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {averageCondition}%
            </div>
            <Progress value={averageCondition} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Bâtiments en état critique
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {criticalCount}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {Math.round((criticalCount / buildings.length) * 100)}% du total
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Bâtiments à entretenir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">
              {needsMaintenanceCount}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {Math.round((needsMaintenanceCount / buildings.length) * 100)}% du total
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Coût total maintenance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalMaintenanceCost.toLocaleString()} As
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Pour {filteredBuildings.length} bâtiments
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
              >
                Tous
              </Button>
              <Button
                variant={filter === 'critical' ? 'default' : 'outline'}
                onClick={() => setFilter('critical')}
              >
                <AlertTriangle className="h-4 w-4 mr-1.5 text-red-500" />
                État critique
              </Button>
              <Button
                variant={filter === 'needs_maintenance' ? 'default' : 'outline'}
                onClick={() => setFilter('needs_maintenance')}
              >
                <Tool className="h-4 w-4 mr-1.5 text-amber-500" />
                Nécessite entretien
              </Button>
            </div>
            
            <Button
              variant="default"
              onClick={handleMaintainAll}
              disabled={filteredBuildings.length === 0}
            >
              <Tool className="h-4 w-4 mr-1.5" />
              Entretenir tous les bâtiments ({totalMaintenanceCost.toLocaleString()} As)
            </Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bâtiment</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Dernière maintenance</TableHead>
                <TableHead>Coût</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBuildings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    Aucun bâtiment ne correspond au filtre actuel
                  </TableCell>
                </TableRow>
              ) : (
                filteredBuildings.map((building) => (
                  <TableRow key={building.id}>
                    <TableCell className="font-medium">
                      {building.name}
                      {building.condition < 30 && (
                        <Badge variant="destructive" className="ml-2">Urgent</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <ConditionBadge condition={building.condition} />
                    </TableCell>
                    <TableCell>
                      {building.lastMaintenance 
                        ? new Date(building.lastMaintenance).toLocaleDateString() 
                        : "Jamais"}
                    </TableCell>
                    <TableCell>
                      {building.maintenanceCost.toLocaleString()} As
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onMaintain(building.id, building.maintenanceCost)}
                      >
                        <Tool className="h-3.5 w-3.5 mr-1.5" />
                        Entretenir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
