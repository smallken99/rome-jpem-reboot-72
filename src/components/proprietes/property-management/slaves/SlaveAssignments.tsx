
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit2, Trash, PlusCircle } from 'lucide-react';
import { ActionButton } from '@/components/ui-custom/ActionButton';

// Définition du type d'affectation d'esclaves
export interface SlaveAssignment {
  slaveId: string;
  buildingId: string;
  startDate: Date;
  efficiency: number;
  count?: number;
  propertyId?: string;
  propertyName?: string;
  buildingName?: string;
}

interface SlaveAssignmentsProps {
  slaveAssignments: SlaveAssignment[];
  availableSlaves: number;
  onAssignSlaves: (propertyId: string, propertyName: string, slaveCount: number) => boolean;
  onRemoveAssignment: (propertyId: string) => boolean;
}

export const SlaveAssignments: React.FC<SlaveAssignmentsProps> = ({
  slaveAssignments,
  availableSlaves,
  onAssignSlaves,
  onRemoveAssignment
}) => {
  const [editingAssignmentId, setEditingAssignmentId] = React.useState<string | null>(null);
  const [slaveCount, setSlaveCount] = React.useState<number>(0);
  
  // Gérer le début de l'édition d'une affectation
  const handleStartEdit = (assignment: SlaveAssignment) => {
    setEditingAssignmentId(assignment.propertyId || assignment.buildingId);
    setSlaveCount(assignment.count || 1);
  };
  
  // Sauvegarder une modification d'affectation
  const handleSaveEdit = (assignment: SlaveAssignment) => {
    if (assignment.propertyId && assignment.propertyName) {
      onAssignSlaves(assignment.propertyId, assignment.propertyName, slaveCount);
    }
    setEditingAssignmentId(null);
  };
  
  // Annuler l'édition
  const handleCancelEdit = () => {
    setEditingAssignmentId(null);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Affectation des esclaves</h3>
          <p className="text-sm text-muted-foreground">
            Gérez la répartition de vos esclaves entre vos propriétés
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          Esclaves disponibles: <span className="font-medium">{availableSlaves}</span>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Propriété</TableHead>
            <TableHead className="text-right">Nombre d'esclaves</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {slaveAssignments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                Aucune affectation d'esclaves
              </TableCell>
            </TableRow>
          ) : (
            slaveAssignments.map((assignment) => (
              <TableRow key={assignment.buildingId}>
                <TableCell className="font-medium">
                  {assignment.propertyName || assignment.buildingName || "Propriété"}
                </TableCell>
                <TableCell className="text-right">
                  {editingAssignmentId === (assignment.propertyId || assignment.buildingId) ? (
                    <input 
                      type="number" 
                      value={slaveCount}
                      onChange={(e) => setSlaveCount(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-20 px-2 py-1 border rounded-md text-right"
                      min="0"
                      max={(assignment.count || 1) + availableSlaves}
                    />
                  ) : (
                    <span>{assignment.count || 1}</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {editingAssignmentId === (assignment.propertyId || assignment.buildingId) ? (
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSaveEdit(assignment)}
                      >
                        Enregistrer
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={handleCancelEdit}
                      >
                        Annuler
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-end space-x-2">
                      <ActionButton
                        icon={<Edit2 className="h-4 w-4" />}
                        label="Modifier"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStartEdit(assignment)}
                      />
                      <ActionButton
                        icon={<Trash className="h-4 w-4" />}
                        label="Supprimer"
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveAssignment(assignment.propertyId || assignment.buildingId)}
                      />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      <div className="flex justify-end">
        <ActionButton
          icon={<PlusCircle className="h-4 w-4" />}
          label="Nouvelle affectation"
          variant="outline"
          size="sm"
          disabled={availableSlaves === 0}
          title={availableSlaves === 0 ? "Aucun esclave disponible pour affectation" : undefined}
        />
      </div>
    </div>
  );
};
