
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Wrench, ArrowUp, ArrowUpDown } from 'lucide-react';
import { MaintenanceTask, BuildingPriority } from '../../types/batiments';
import { useBatimentsManagement } from '../../hooks/useBatimentsManagement';

const MaintenanceManager = () => {
  const [filter, setFilter] = useState('all');
  const { maintenanceTasks, completeMaintenanceTask, cancelMaintenanceTask } = useBatimentsManagement();
  const [sortField, setSortField] = useState<keyof MaintenanceTask>('priority');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Handle sort change
  const handleSortChange = (field: keyof MaintenanceTask) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Sort tasks based on current sort field and direction
  const sortedTasks = [...maintenanceTasks].sort((a, b) => {
    if (sortField === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      const aPriority = priorityOrder[a.priority as BuildingPriority] || 3;
      const bPriority = priorityOrder[b.priority as BuildingPriority] || 3;
      return sortDirection === 'asc' ? aPriority - bPriority : bPriority - aPriority;
    }
    
    if (sortField === 'cost') {
      return sortDirection === 'asc' ? a.cost - b.cost : b.cost - a.cost;
    }
    
    if (sortField === 'status') {
      return sortDirection === 'asc' 
        ? a.status.localeCompare(b.status) 
        : b.status.localeCompare(a.status);
    }
    
    if (sortField === 'type') {
      return sortDirection === 'asc' 
        ? a.type.localeCompare(b.type) 
        : b.type.localeCompare(a.type);
    }
    
    return 0;
  });
  
  // Filter tasks based on current filter
  const filteredTasks = filter === 'all' 
    ? sortedTasks 
    : sortedTasks.filter(task => task.status === filter);
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">En attente</Badge>;
      case 'in_progress':
        return <Badge variant="default">En cours</Badge>;
      case 'completed':
        return <Badge variant="success">Terminé</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Annulé</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  // Get priority badge
  const getPriorityBadge = (priority: BuildingPriority) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">Haute</Badge>;
      case 'medium':
        return <Badge variant="default">Moyenne</Badge>;
      case 'low':
        return <Badge variant="outline">Basse</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };
  
  // Get type badge
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'repair':
        return <Badge variant="destructive">Réparation</Badge>;
      case 'upgrade':
        return <Badge variant="default">Amélioration</Badge>;
      case 'routine':
        return <Badge variant="outline">Routine</Badge>;
      case 'maintenance':
        return <Badge variant="success">Entretien</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Tâches de maintenance</h2>
        <div className="flex space-x-2">
          <Input 
            placeholder="Rechercher..." 
            className="w-48"
          />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="in_progress">En cours</SelectItem>
              <SelectItem value="completed">Terminés</SelectItem>
              <SelectItem value="cancelled">Annulés</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSortChange('buildingName')} className="cursor-pointer">
              Bâtiment <ArrowUpDown className="h-4 w-4 inline ml-1" />
            </TableHead>
            <TableHead onClick={() => handleSortChange('type')} className="cursor-pointer">
              Type <ArrowUpDown className="h-4 w-4 inline ml-1" />
            </TableHead>
            <TableHead onClick={() => handleSortChange('priority')} className="cursor-pointer">
              Priorité <ArrowUpDown className="h-4 w-4 inline ml-1" />
            </TableHead>
            <TableHead onClick={() => handleSortChange('cost')} className="cursor-pointer">
              Coût <ArrowUpDown className="h-4 w-4 inline ml-1" />
            </TableHead>
            <TableHead onClick={() => handleSortChange('status')} className="cursor-pointer">
              Statut <ArrowUpDown className="h-4 w-4 inline ml-1" />
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4 italic text-muted-foreground">
                Aucune tâche de maintenance trouvée
              </TableCell>
            </TableRow>
          ) : (
            filteredTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.buildingName || `Bâtiment ${task.buildingId}`}</TableCell>
                <TableCell>{getTypeBadge(task.type)}</TableCell>
                <TableCell>{getPriorityBadge(task.priority as BuildingPriority)}</TableCell>
                <TableCell>{task.cost.toLocaleString()} As</TableCell>
                <TableCell>{getStatusBadge(task.status)}</TableCell>
                <TableCell className="space-x-2">
                  {task.status === 'pending' && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => completeMaintenanceTask(task.id)}
                      >
                        <Wrench className="h-4 w-4 mr-1" />
                        Effectuer
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => cancelMaintenanceTask(task.id)}
                      >
                        Annuler
                      </Button>
                    </>
                  )}
                  {task.status === 'in_progress' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => completeMaintenanceTask(task.id)}
                    >
                      <ArrowUp className="h-4 w-4 mr-1" />
                      Terminer
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default MaintenanceManager;
