
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';
import { OwnedBuilding } from '../../hooks/useBuildingManagement';
import { allBuildingTypes } from '../../data/buildings';
import { toast } from 'sonner';

interface SlaveAssignmentProps {
  buildings: OwnedBuilding[];
  availableSlaves: number;
  onAssignSlaves: (propertyId: number, value: number) => void;
}

export const SlaveAssignment: React.FC<SlaveAssignmentProps> = ({
  buildings,
  availableSlaves,
  onAssignSlaves
}) => {
  // Fonction utilitaire pour obtenir le statut d'une propriété en fonction des esclaves assignés
  const getPropertyStatus = (assigned: number, required: number, optimal: number) => {
    if (assigned < required) return "insuffisant";
    if (assigned < optimal) return "adéquat";
    return "optimal";
  };
  
  // Fonction utilitaire pour obtenir la couleur du badge en fonction du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case "insuffisant": return "destructive";
      case "adéquat": return "secondary";
      case "optimal": return "default";
      default: return "secondary";
    }
  };
  
  // Obtenir les détails du bâtiment
  const getBuildingDetails = (building: OwnedBuilding) => {
    switch (building.buildingType) {
      case 'urban':
        return allBuildingTypes.urbanResidential[building.buildingId];
      case 'rural':
        return allBuildingTypes.rural[building.buildingId];
      case 'religious':
        return allBuildingTypes.religious[building.buildingId];
      case 'public':
        return allBuildingTypes.public[building.buildingId];
      default:
        return null;
    }
  };
  
  // Filtre les bâtiments qui nécessitent des esclaves
  const buildingsWithSlaves = buildings.filter(building => {
    const details = getBuildingDetails(building);
    return details && details.slaves;
  });
  
  // Mettre à jour l'attribution d'esclaves à une propriété
  const updateAssignment = (propertyId: number, value: number) => {
    const maxAvailable = availableSlaves + (buildings.find(b => b.id === propertyId)?.slaves || 0);
    
    if (value > maxAvailable) {
      toast.error(`Vous ne disposez que de ${maxAvailable} esclaves disponibles pour cette propriété`);
      return;
    }
    
    onAssignSlaves(propertyId, value);
  };
  
  return (
    <div className="border border-rome-gold/30 rounded-md p-4 bg-white">
      <h4 className="font-cinzel text-rome-navy mb-4 flex items-center">
        <TrendingUp className="h-5 w-5 mr-2" />
        Attribution des esclaves
      </h4>
      
      {buildingsWithSlaves.length === 0 ? (
        <div className="text-center p-6 text-muted-foreground">
          <p>Vous n'avez pas encore de propriétés nécessitant des esclaves.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-rome-gold/30 text-left">
                <th className="py-2 px-3 font-cinzel">Propriété</th>
                <th className="py-2 px-3 font-cinzel">Type</th>
                <th className="py-2 px-3 font-cinzel">Attribués</th>
                <th className="py-2 px-3 font-cinzel">Requis / Optimal</th>
                <th className="py-2 px-3 font-cinzel">Statut</th>
                <th className="py-2 px-3 font-cinzel">Actions</th>
              </tr>
            </thead>
            <tbody>
              {buildingsWithSlaves.map((building) => {
                const buildingDetails = getBuildingDetails(building);
                
                if (!buildingDetails || !buildingDetails.slaves) return null;
                
                const { required, optimal } = buildingDetails.slaves;
                const status = getPropertyStatus(building.slaves, required, optimal);
                
                return (
                  <tr key={building.id} className="border-b border-rome-gold/10">
                    <td className="py-3 px-3 font-medium">{building.name}</td>
                    <td className="py-3 px-3 text-sm">{building.buildingType}</td>
                    <td className="py-3 px-3">
                      <Input 
                        type="number" 
                        min="0"
                        max={availableSlaves + building.slaves} 
                        value={building.slaves}
                        onChange={(e) => updateAssignment(building.id, parseInt(e.target.value) || 0)}
                        className="w-20"
                      />
                    </td>
                    <td className="py-3 px-3">
                      {required} / {optimal}
                    </td>
                    <td className="py-3 px-3">
                      <Badge variant={getStatusColor(status)}>
                        {status}
                      </Badge>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => updateAssignment(building.id, required)}
                          disabled={availableSlaves + building.slaves < required}
                          className="text-xs"
                        >
                          Minimum
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => updateAssignment(building.id, optimal)}
                          disabled={availableSlaves + building.slaves < optimal}
                          className="text-xs roman-btn"
                        >
                          Optimal
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
