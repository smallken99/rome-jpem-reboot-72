
import React from 'react';
import { SlaveAssignment } from './SlaveAssignment';
import { useSlaveManagement } from './useSlaveManagement';

interface SlaveAssignmentsProps {
  buildingId: string;
}

export const SlaveAssignments: React.FC<SlaveAssignmentsProps> = ({ buildingId }) => {
  const { 
    slaves, 
    assignments,
    assignSlave,
    unassignSlave,
    getAssignmentsByBuilding
  } = useSlaveManagement();

  const buildingAssignments = getAssignmentsByBuilding(buildingId);
  const buildingSlaves = assignments
    .filter(assignment => assignment.buildingId === buildingId)
    .map(assignment => {
      const slave = slaves.find(s => s.id === assignment.slaveId);
      return { assignment, slave };
    })
    .filter(item => item.slave);

  const handleAssignSlaves = (buildingId: string, count: number) => {
    // Implementation depends on your specific business logic
    console.log(`Assigning ${count} slaves to building ${buildingId}`);
  };

  if (buildingAssignments.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        <p>Aucun esclave n'est assigné à cette propriété</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {buildingAssignments.map(assignment => (
        <SlaveAssignment
          key={assignment.id}
          buildingId={buildingId}
          buildingName="Propriété"
          assignedSlaves={assignment.efficiency || 5}
          maxSlaves={10}
          efficiency={assignment.efficiency || 75}
          onAssignSlaves={handleAssignSlaves}
        />
      ))}
    </div>
  );
};
