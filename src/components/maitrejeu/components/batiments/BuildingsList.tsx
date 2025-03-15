
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, PlusCircle, Wrench } from 'lucide-react';
import { ConditionBadge } from './ConditionBadge';
import { Building } from '@/components/maitrejeu/types/batiments';

interface BuildingsListProps {
  buildings: Building[];
  onEdit: (building: Building) => void;
  onDelete: (buildingId: string) => void;
  onAddBuilding: () => void;
  onMaintenance: (building: Building) => void;
}

export const BuildingsList: React.FC<BuildingsListProps> = ({
  buildings,
  onEdit,
  onDelete,
  onAddBuilding,
  onMaintenance
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Liste des Bâtiments</h3>
        <Button onClick={onAddBuilding}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Nouveau Bâtiment
        </Button>
      </div>
      
      {buildings.length === 0 ? (
        <div className="text-center py-10 bg-muted/40 rounded-md">
          <p className="text-muted-foreground">Aucun bâtiment enregistré</p>
          <Button variant="outline" className="mt-4" onClick={onAddBuilding}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Ajouter un bâtiment
          </Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Localisation</TableHead>
              <TableHead>État</TableHead>
              <TableHead>Revenu/Coût</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {buildings.map((building) => (
              <TableRow key={building.id}>
                <TableCell className="font-medium">{building.name}</TableCell>
                <TableCell>{building.type}</TableCell>
                <TableCell>{building.location}</TableCell>
                <TableCell>
                  <ConditionBadge condition={building.condition} />
                </TableCell>
                <TableCell>
                  {building.revenue > 0 ? (
                    <span className="text-green-600">+{building.revenue} As</span>
                  ) : (
                    <span className="text-red-600">{building.cost} As</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={building.isPublic ? "default" : "secondary"}>
                    {building.isPublic ? "Public" : "Privé"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => onMaintenance(building)}>
                    <Wrench className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(building)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(building.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
