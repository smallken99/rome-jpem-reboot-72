
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building, MaintenanceTask } from '../../types/batiments';
import { useBuildingManagement } from '../../hooks/useBuildingManagement';
import { Wrench, Check } from 'lucide-react';

interface MaintenanceManagerProps {
  onClose?: () => void;
}

export const MaintenanceManager: React.FC<MaintenanceManagerProps> = ({ onClose }) => {
  const { 
    buildings,
    maintenanceTasks = [],
    addMaintenanceTask,
    completeMaintenanceTask
  } = useBuildingManagement();
  
  const handleAddTask = (buildingId: string, taskType: 'repair' | 'upgrade' | 'maintenance') => {
    // Create a new task
    if (addMaintenanceTask) {
      const building = buildings.find(b => b.id === buildingId);
      
      const task: MaintenanceTask = {
        id: `task-${Date.now()}`,
        buildingId,
        buildingName: building?.name || 'Bâtiment',
        type: taskType,
        status: 'pending',
        priority: 'medium',
        cost: taskType === 'repair' ? 500 : taskType === 'upgrade' ? 1000 : 200,
        createdAt: new Date().toISOString(),
        assignedTo: '',
        estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        notes: `Tâche de ${taskType === 'repair' ? 'réparation' : taskType === 'upgrade' ? 'amélioration' : 'maintenance'}`
      };
      
      addMaintenanceTask(task);
    }
  };
  
  const handleCompleteTask = (taskId: string) => {
    if (completeMaintenanceTask) {
      completeMaintenanceTask(taskId);
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Gestion des Tâches de Maintenance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Tâches en cours</h3>
          {maintenanceTasks && maintenanceTasks.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bâtiment</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Coût</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenanceTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.buildingName}</TableCell>
                    <TableCell>
                      <Badge variant={task.type === 'repair' ? "destructive" : task.type === 'upgrade' ? "default" : "outline"}>
                        {task.type === 'repair' ? 'Réparation' : task.type === 'upgrade' ? 'Amélioration' : 'Maintenance'}
                      </Badge>
                    </TableCell>
                    <TableCell>{task.cost} as</TableCell>
                    <TableCell>
                      <Badge variant={task.status === 'completed' ? "success" : task.status === 'in_progress' ? "warning" : "secondary"}>
                        {task.status === 'completed' ? 'Terminé' : task.status === 'in_progress' ? 'En cours' : 'En attente'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {task.status !== 'completed' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleCompleteTask(task.id)}
                        >
                          <Check className="h-4 w-4 mr-1" /> Terminer
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground">Aucune tâche de maintenance actuellement planifiée.</p>
          )}
          
          <h3 className="text-lg font-medium mt-6">Planifier une nouvelle tâche</h3>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bâtiment</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {buildings.map((building) => (
                <TableRow key={building.id}>
                  <TableCell>{building.name}</TableCell>
                  <TableCell>
                    <Badge variant={
                      building.condition >= 80 ? "success" : 
                      building.condition >= 50 ? "default" : 
                      building.condition >= 30 ? "warning" : 
                      "destructive"
                    }>
                      {building.condition}%
                    </Badge>
                  </TableCell>
                  <TableCell className="space-x-2">
                    {building.condition < 50 && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAddTask(building.id, 'repair')}
                      >
                        <Wrench className="h-4 w-4 mr-1" /> Réparer
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAddTask(building.id, 'maintenance')}
                    >
                      Entretenir
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleAddTask(building.id, 'upgrade')}
                    >
                      Améliorer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {onClose && (
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={onClose}>Fermer</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MaintenanceManager;
