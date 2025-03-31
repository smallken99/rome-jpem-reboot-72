
import React from 'react';
import { Building } from '@/types/building';

export interface SlaveAssignment {
  id: string;
  slaveId: string;
  buildingId: string;
  assignedAt: Date;
  role: string;
  productivity: number;
  slaveName?: string;
  buildingName?: string;
}

export interface SlaveAssignmentProps {
  assignment: SlaveAssignment;
  buildings: Building[];
  onRevoke: (assignmentId: string) => void;
}

export const SlaveAssignment: React.FC<SlaveAssignmentProps> = ({
  assignment,
  buildings,
  onRevoke
}) => {
  const building = buildings.find(b => b.id === assignment.buildingId);
  
  return (
    <div className="border rounded-md p-4 mb-4 bg-white shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">
            {assignment.slaveName || 'Esclave sans nom'} 
          </h3>
          <p className="text-sm text-muted-foreground">
            Assigné à: {building?.name || 'Bâtiment inconnu'}
          </p>
          <p className="text-sm text-muted-foreground">
            Rôle: {assignment.role}
          </p>
          <p className="text-sm text-muted-foreground">
            Productivité: {assignment.productivity}%
          </p>
        </div>
        <button
          onClick={() => onRevoke(assignment.id)}
          className="text-destructive hover:text-destructive hover:underline text-sm"
        >
          Retirer
        </button>
      </div>
    </div>
  );
};
