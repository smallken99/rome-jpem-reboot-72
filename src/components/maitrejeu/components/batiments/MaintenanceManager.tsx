
import React, { useState } from 'react';
import { 
  Card, CardContent, CardHeader, CardTitle, 
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Wrench, AlertTriangle, CheckCircle, Clock, Plus, 
  ArrowUpDown, ChevronDown, MoreHorizontal, Calendar 
} from 'lucide-react';
import { useBuildingManagement } from '../../hooks/useBuildingManagement';
import { MaintenanceTask, BuildingStatus } from '../../types/batiments';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

// Define BuildingPriority type as it's missing
type BuildingPriority = 'high' | 'medium' | 'low';

const MaintenanceManager: React.FC = () => {
  // Destructure all needed methods from the hook
  const { 
    buildings, 
    maintenanceRecords,
    // Use empty array as fallback if they don't exist yet
    maintenanceTasks = [], 
    addMaintenanceTask = () => {}, 
    setMaintenanceTasks = () => {}, 
    completeMaintenanceTask = () => {} 
  } = useBuildingManagement();
  
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  
  // Add a maintenance task example
  const handleAddTask = () => {
    // Use a building ID from the buildings array if available
    const buildingId = buildings.length > 0 ? buildings[0].id : 'example-building';
    
    const newTask: MaintenanceTask = {
      id: `task-${Date.now()}`,
      buildingId,
      buildingName: buildings.find(b => b.id === buildingId)?.name || 'Bâtiment inconnu',
      type: 'repair',
      description: 'Réparation du toit',
      cost: 1500,
      duration: 30,
      startDate: new Date(),
      priority: 'high',
      status: 'pending',
      assignedTo: 'Marcus Aurelius'
    };
    
    addMaintenanceTask(newTask);
  };
  
  // Complete a task example
  const handleCompleteTask = (taskId: string) => {
    completeMaintenanceTask(taskId);
  };
  
  // Function to render different task status badges
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">En attente</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">En cours</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Terminé</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Annulé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Function to render priority badges
  const getPriorityBadge = (priority: BuildingPriority) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-500">Haute</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Moyenne</Badge>;
      case 'low':
        return <Badge className="bg-green-500">Basse</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };
  
  // Example maintenance task if none exist
  const exampleTask: MaintenanceTask = {
    id: 'example-task',
    buildingId: 'example-building',
    buildingName: 'Temple de Jupiter',
    type: 'repair',
    description: 'Réparation de la colonnade endommagée',
    cost: 2500,
    duration: 45,
    startDate: new Date(),
    completionDate: undefined,
    priority: 'high',
    status: 'in_progress',
    assignedTo: 'Marcus Vipsanius Agrippa'
  };
  
  const tasksToShow = maintenanceTasks.length > 0 ? maintenanceTasks : [exampleTask];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Tâches de maintenance</h2>
          <p className="text-muted-foreground">Gérez les opérations de maintenance et de réparation</p>
        </div>
        <Button onClick={handleAddTask} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nouvelle tâche
        </Button>
      </div>
      
      <Card>
        <CardHeader className="px-6 py-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Tâches actives</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                <Calendar className="mr-1 h-3 w-3" />
                Planifier
              </Button>
              <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                <ArrowUpDown className="mr-1 h-3 w-3" />
                Trier
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Bâtiment</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Priorité</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Coût</TableHead>
                <TableHead>Progression</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasksToShow.map(task => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.buildingName || "Bâtiment inconnu"}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell>{task.cost} as</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={task.status === 'completed' ? 100 : task.status === 'in_progress' ? 65 : 0} 
                        className="h-2 w-full"
                      />
                      <span className="text-xs whitespace-nowrap">
                        {task.status === 'completed' ? '100%' : task.status === 'in_progress' ? '65%' : '0%'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => handleCompleteTask(task.id)}
                      disabled={task.status === 'completed'}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Terminer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Coûts de maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              12,500 <span className="text-lg font-normal text-muted-foreground">as/an</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Budget alloué pour l'entretien des bâtiments publics
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Tâches en cours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              3 <span className="text-lg font-normal text-muted-foreground">tâches</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Opérations de maintenance actuellement en cours
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">État général</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-500">
              Acceptable
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Évaluation globale de l'état des bâtiments publics
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MaintenanceManager;
