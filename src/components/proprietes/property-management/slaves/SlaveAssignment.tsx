
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SlaveAssignment as SlaveAssignmentType, Slave } from './SlaveAssignmentAdapter';
import { OwnedBuilding } from '@/components/proprietes/types/property';

interface SlaveAssignmentsProps {
  slaves: Slave[];
  buildings: OwnedBuilding[];
  assignments: SlaveAssignmentType[];
  onAssignSlave: (slaveId: string, buildingId: string, role: string) => void;
  onRemoveAssignment: (assignmentId: string) => void;
}

export const SlaveAssignment: React.FC<SlaveAssignmentsProps> = ({
  slaves,
  buildings,
  assignments,
  onAssignSlave,
  onRemoveAssignment
}) => {
  const [selectedSlave, setSelectedSlave] = React.useState<string>('');
  const [selectedBuilding, setSelectedBuilding] = React.useState<string>('');
  const [selectedRole, setSelectedRole] = React.useState<string>('worker');

  const unassignedSlaves = slaves.filter(
    slave => !assignments.some(assignment => assignment.slaveId === slave.id)
  );

  const handleAssignSlave = () => {
    if (selectedSlave && selectedBuilding) {
      onAssignSlave(selectedSlave, selectedBuilding, selectedRole);
      setSelectedSlave('');
      setSelectedBuilding('');
      setSelectedRole('worker');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Assigner des esclaves</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Esclave</label>
              <Select value={selectedSlave} onValueChange={setSelectedSlave}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un esclave" />
                </SelectTrigger>
                <SelectContent>
                  {unassignedSlaves.map(slave => (
                    <SelectItem key={slave.id} value={slave.id}>
                      {slave.name} ({slave.age} ans, {slave.skill}/10)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Propriété</label>
              <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une propriété" />
                </SelectTrigger>
                <SelectContent>
                  {buildings.map(building => (
                    <SelectItem key={building.id} value={building.id}>
                      {building.name} ({building.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Rôle</label>
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="worker">Ouvrier</SelectItem>
                  <SelectItem value="craftsman">Artisan</SelectItem>
                  <SelectItem value="supervisor">Superviseur</SelectItem>
                  <SelectItem value="domestic">Domestique</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleAssignSlave}
            disabled={!selectedSlave || !selectedBuilding}
            className="w-full"
          >
            Assigner l'esclave
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Assignations actuelles</CardTitle>
        </CardHeader>
        <CardContent>
          {assignments.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              Aucun esclave n'est assigné pour le moment.
            </p>
          ) : (
            <div className="divide-y">
              {assignments.map(assignment => {
                const slave = slaves.find(s => s.id === assignment.slaveId);
                const building = buildings.find(b => b.id === assignment.buildingId);
                
                if (!slave || !building) return null;
                
                return (
                  <div key={assignment.id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{slave.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {building.name} - {assignment.role}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRemoveAssignment(assignment.id)}
                    >
                      Retirer
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
