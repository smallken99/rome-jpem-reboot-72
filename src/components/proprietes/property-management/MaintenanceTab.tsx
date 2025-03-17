
import React, { useState } from 'react';
import { useBuildingManagement } from '../hooks/useBuildingManagement';
import { useBuildingMaintenance } from '../hooks/building/useBuildingMaintenance';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BuildingMaintenanceDialog } from './modals/BuildingMaintenanceDialog';
import { formatCurrency } from '@/utils/currencyUtils';
import { AlertTriangle, Wrench, Search, Filter, Building, Archive, House, Landmark } from 'lucide-react';

export const MaintenanceTab: React.FC = () => {
  const { ownedBuildings, balance } = useBuildingManagement();
  const { needsMaintenance } = useBuildingMaintenance();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedBuilding, setSelectedBuilding] = useState<number | string | null>(null);
  const [isMaintenanceDialogOpen, setIsMaintenanceDialogOpen] = useState(false);
  
  // Sort buildings by condition (worst first)
  const sortedBuildings = [...ownedBuildings].sort((a, b) => a.condition - b.condition);
  
  // Filter buildings
  const filteredBuildings = sortedBuildings.filter(building => {
    const matchesSearch = building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          building.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || building.buildingType === typeFilter;
    
    return matchesSearch && matchesType;
  });
  
  const getBuildingIcon = (type: string) => {
    switch (type) {
      case 'urban': return <House className="h-4 w-4" />;
      case 'rural': return <Building className="h-4 w-4" />;
      case 'religious': return <Landmark className="h-4 w-4" />;
      case 'public': return <Archive className="h-4 w-4" />;
      default: return <Building className="h-4 w-4" />;
    }
  };
  
  const getConditionColor = (condition: number) => {
    if (condition >= 80) return "bg-green-600";
    if (condition >= 60) return "bg-yellow-600";
    if (condition >= 40) return "bg-orange-600";
    return "bg-red-600";
  };
  
  const getConditionText = (condition: number) => {
    if (condition >= 90) return "Excellent";
    if (condition >= 75) return "Très bon";
    if (condition >= 60) return "Bon";
    if (condition >= 40) return "Moyen";
    if (condition >= 20) return "Mauvais";
    return "Critique";
  };
  
  const handleMaintenanceClick = (buildingId: number | string) => {
    setSelectedBuilding(buildingId);
    setIsMaintenanceDialogOpen(true);
  };
  
  const selectedBuildingData = ownedBuildings.find(b => b.id === selectedBuilding) || null;
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="flex-1 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-52 gap-1">
              <Filter className="h-4 w-4" />
              <SelectValue placeholder="Type de propriété" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les propriétés</SelectItem>
              <SelectItem value="urban">Urbaines</SelectItem>
              <SelectItem value="rural">Rurales</SelectItem>
              <SelectItem value="religious">Religieuses</SelectItem>
              <SelectItem value="public">Publiques</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button className="gap-2" onClick={() => {
          // Trouver le premier bâtiment qui a besoin de maintenance
          const needsMaintenanceBuilding = ownedBuildings.find(b => needsMaintenance(b.id));
          if (needsMaintenanceBuilding) {
            handleMaintenanceClick(needsMaintenanceBuilding.id);
          }
        }}>
          <Wrench className="h-4 w-4" />
          <span>Maintenance prioritaire</span>
        </Button>
      </div>
      
      {filteredBuildings.length > 0 ? (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Propriété</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Emplacement</TableHead>
                <TableHead>État</TableHead>
                <TableHead>Maintenance</TableHead>
                <TableHead>Coût</TableHead>
                <TableHead>Dernière maintenance</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBuildings.map(building => (
                <TableRow key={building.id}>
                  <TableCell className="font-medium">{building.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getBuildingIcon(building.buildingType)}
                      <span>
                        {building.buildingType === 'urban' ? 'Urbain' :
                         building.buildingType === 'rural' ? 'Rural' :
                         building.buildingType === 'religious' ? 'Religieux' : 'Public'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{building.location}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{getConditionText(building.condition)}</span>
                        {needsMaintenance(building.id) && (
                          <Badge variant="destructive" className="h-5 flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            <span>Maintenance requise</span>
                          </Badge>
                        )}
                      </div>
                      <Progress 
                        value={building.condition} 
                        className="h-2 w-24" 
                        indicatorClassName={getConditionColor(building.condition)}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={building.maintenanceEnabled ? "default" : "outline"}>
                      {building.maintenanceEnabled ? "Activée" : "Désactivée"}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatCurrency(building.maintenanceCost)}/an</TableCell>
                  <TableCell>
                    {building.lastMaintenance 
                      ? new Date(building.lastMaintenance).toLocaleDateString('fr-FR')
                      : "Jamais"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant={needsMaintenance(building.id) ? "default" : "outline"}
                      size="sm"
                      className="gap-1"
                      onClick={() => handleMaintenanceClick(building.id)}
                    >
                      <Wrench className="h-3.5 w-3.5" />
                      <span>Entretenir</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex items-center justify-center p-8 text-muted-foreground">
          Aucune propriété ne correspond aux critères de recherche.
        </div>
      )}
      
      {/* Maintenance Dialog */}
      <BuildingMaintenanceDialog 
        building={selectedBuildingData}
        isOpen={isMaintenanceDialogOpen}
        onClose={() => setIsMaintenanceDialogOpen(false)}
        balance={balance}
      />
    </div>
  );
};
