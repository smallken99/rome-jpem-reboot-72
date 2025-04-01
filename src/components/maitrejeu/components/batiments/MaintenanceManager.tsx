
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useBatimentsManagement } from '../../hooks/useBatimentsManagement';
import { Building, MaintenanceTask, BuildingPriority } from '../../types/batiments';
import { Season } from '../../types/common';
import { v4 as uuidv4 } from 'uuid';

export default function MaintenanceManager() {
  const { buildings, maintenanceTasks, addMaintenanceTask, setMaintenanceTasks, completeMaintenanceTask } = useBatimentsManagement();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<string>('');
  const [taskDescription, setTaskDescription] = useState('');
  const [estimatedCost, setEstimatedCost] = useState(0);
  const [priority, setPriority] = useState<BuildingPriority>('medium');
  const [deadlineYear, setDeadlineYear] = useState(new Date().getFullYear());
  const [deadlineSeason, setDeadlineSeason] = useState<string>('Ver');
  
  // Create sample data if none exists
  const sampleTasks: MaintenanceTask[] = [
    {
      id: 'task-1',
      buildingId: 'building-1',
      buildingName: 'Temple de Jupiter',
      description: 'Réparation du toit endommagé',
      estimatedCost: 5000,
      priority: 'high',
      deadline: {
        year: new Date().getFullYear(),
        season: 'Ver'
      },
      status: 'pending'
    },
    {
      id: 'task-2',
      buildingId: 'building-2',
      buildingName: 'Forum Romanum',
      description: 'Nettoyage des colonnes et réparation des escaliers',
      estimatedCost: 3000,
      priority: 'medium',
      deadline: {
        year: new Date().getFullYear(),
        season: 'Aes'
      },
      status: 'in_progress'
    },
    {
      id: 'task-3',
      buildingId: 'building-3',
      buildingName: 'Thermes de Caracalla',
      description: 'Entretien des systèmes d\'eau et chauffage',
      estimatedCost: 8000,
      priority: 'low',
      deadline: {
        year: new Date().getFullYear(),
        season: 'Aut'
      },
      status: 'completed'
    }
  ];
  
  // Initialize with sample tasks if no tasks exist
  React.useEffect(() => {
    if (maintenanceTasks.length === 0) {
      setMaintenanceTasks(sampleTasks);
    }
  }, [maintenanceTasks.length, setMaintenanceTasks]);
  
  const handleAddTask = () => {
    if (!selectedBuilding || !taskDescription) return;
    
    const building = buildings.find(b => b.id === selectedBuilding);
    if (!building) return;
    
    const newTask: MaintenanceTask = {
      id: uuidv4(),
      buildingId: selectedBuilding,
      buildingName: building.name,
      description: taskDescription,
      estimatedCost,
      priority: priority,
      deadline: {
        year: deadlineYear,
        season: deadlineSeason
      },
      status: 'pending'
    };
    
    addMaintenanceTask(newTask);
    setIsAddModalOpen(false);
    resetForm();
  };
  
  const handleCompleteTask = (taskId: string) => {
    completeMaintenanceTask(taskId);
  };
  
  const resetForm = () => {
    setSelectedBuilding('');
    setTaskDescription('');
    setEstimatedCost(0);
    setPriority('medium');
    setDeadlineYear(new Date().getFullYear());
    setDeadlineSeason('Ver');
  };
  
  const getPriorityBadge = (priority: BuildingPriority) => {
    switch(priority) {
      case 'critical':
        return <Badge className="bg-red-600">Critique</Badge>;
      case 'high':
        return <Badge className="bg-orange-500">Haute</Badge>;
      case 'medium':
        return <Badge className="bg-blue-500">Moyenne</Badge>;
      case 'low':
        return <Badge className="bg-green-500">Basse</Badge>;
      default:
        return <Badge>Inconnue</Badge>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">En attente</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">En cours</Badge>;
      case 'completed':
        return <Badge variant="outline" className="border-green-500 text-green-500">Terminée</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="border-red-500 text-red-500">Annulée</Badge>;
      default:
        return <Badge variant="outline">Inconnue</Badge>;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium">Tâches de maintenance</h2>
        <Button onClick={() => setIsAddModalOpen(true)}>Nouvelle tâche</Button>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bâtiment</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Priorité</TableHead>
                <TableHead>Coût est.</TableHead>
                <TableHead>Échéance</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenanceTasks.length > 0 ? (
                maintenanceTasks.map(task => (
                  <TableRow key={task.id}>
                    <TableCell>{task.buildingName}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                    <TableCell>{task.estimatedCost} As</TableCell>
                    <TableCell>{task.deadline.year} {task.deadline.season}</TableCell>
                    <TableCell>{getStatusBadge(task.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {task.status !== 'completed' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleCompleteTask(task.id)}
                          >
                            Terminer
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Aucune tâche de maintenance
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvelle tâche de maintenance</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="building">Bâtiment</Label>
              <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
                <SelectTrigger id="building">
                  <SelectValue placeholder="Sélectionnez un bâtiment" />
                </SelectTrigger>
                <SelectContent>
                  {buildings.map(building => (
                    <SelectItem key={building.id} value={building.id}>
                      {building.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={taskDescription}
                onChange={e => setTaskDescription(e.target.value)}
                placeholder="Décrivez les travaux à effectuer"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cost">Coût estimé (As)</Label>
                <Input 
                  id="cost" 
                  type="number"
                  value={estimatedCost}
                  onChange={e => setEstimatedCost(parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priorité</Label>
                <Select value={priority} onValueChange={value => setPriority(value as BuildingPriority)}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Niveau de priorité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critique</SelectItem>
                    <SelectItem value="high">Haute</SelectItem>
                    <SelectItem value="medium">Moyenne</SelectItem>
                    <SelectItem value="low">Basse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Année d'échéance</Label>
                <Input 
                  id="year" 
                  type="number"
                  value={deadlineYear}
                  onChange={e => setDeadlineYear(parseInt(e.target.value) || new Date().getFullYear())}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="season">Saison d'échéance</Label>
                <Select value={deadlineSeason} onValueChange={setDeadlineSeason}>
                  <SelectTrigger id="season">
                    <SelectValue placeholder="Saison" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ver">Printemps (Ver)</SelectItem>
                    <SelectItem value="Aes">Été (Aes)</SelectItem>
                    <SelectItem value="Aut">Automne (Aut)</SelectItem>
                    <SelectItem value="Hie">Hiver (Hie)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Annuler</Button>
            <Button onClick={handleAddTask}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
