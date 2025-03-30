import React, { useState } from 'react';
import { SlaveAssignment } from './SlaveAssignment';
import { Slave } from './SlaveAssignmentAdapter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface SlaveAssignmentsProps {
  buildingId: string;
  buildingName: string;
  slaves: Slave[];
  assignedSlaves: Slave[];
  onAssignSlave?: (slaveId: string, buildingId: string) => void;
  onRemoveSlave?: (slaveId: string, buildingId: string) => void;
}

export const SlaveAssignments: React.FC<SlaveAssignmentsProps> = ({
  buildingId,
  buildingName,
  slaves,
  assignedSlaves,
  onAssignSlave,
  onRemoveSlave
}) => {
  const [showAssignModal, setShowAssignModal] = useState(false);

  const availableSlaves = slaves.filter(slave => !slave.assigned);

  const handleRemoveSlave = (slaveId: string) => {
    if (onRemoveSlave) {
      onRemoveSlave(slaveId, buildingId);
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Esclaves Assignés à {buildingName}</span>
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-auto"
              onClick={() => setShowAssignModal(true)}
              disabled={availableSlaves.length === 0}
            >
              <Plus className="h-4 w-4 mr-1" />
              Assigner des esclaves
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {assignedSlaves.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Aucun esclave n'est assigné à cette propriété.</p>
              <p className="text-sm">
                Assignez des esclaves pour augmenter la productivité et l'efficacité de votre propriété.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assignedSlaves.map(slave => (
                <SlaveAssignment
                  key={slave.id}
                  slave={slave}
                  buildingName={buildingName}
                  onRemove={() => handleRemoveSlave(slave.id)}
                  efficiency={1.0} // Calculer dynamiquement en fonction des compétences et spécialisations
                  role="worker"
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal pour assigner des esclaves - Implémenté séparément */}
      {/* {showAssignModal && (
        <AssignSlaveModal
          slaves={availableSlaves}
          buildingId={buildingId}
          onAssign={onAssignSlave}
          onClose={() => setShowAssignModal(false)}
        />
      )} */}
    </div>
  );
};
