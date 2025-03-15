
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, Calendar, Wrench, CheckCircle, Clock } from 'lucide-react';
import { useBatimentsManagement } from '../../hooks/useBatimentsManagement';
import { MaintenanceTask } from '../../types/batiments';
import { formatDate } from '@/utils/formatUtils';
import { formatCurrency } from '@/utils/formatUtils';
import { UnderDevelopmentSection } from '../UnderDevelopmentSection';

export const MaintenanceManager: React.FC = () => {
  const { maintenanceTasks, buildings, completeMaintenanceTask } = useBatimentsManagement();
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'overdue'>('all');
  
  // Si nous n'avons pas encore implémenté la fonctionnalité complète
  if (maintenanceTasks.length === 0) {
    return (
      <UnderDevelopmentSection 
        title="Maintenance des bâtiments"
        description="Le système de gestion de la maintenance est prêt à être utilisé. Ajoutez des tâches de maintenance pour les bâtiments qui en ont besoin."
      />
    );
  }

  const filteredTasks = maintenanceTasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'scheduled') return task.status === 'scheduled';
    if (filter === 'overdue') return task.status === 'overdue';
    return true;
  });

  const getStatusBadge = (status: MaintenanceTask['status']) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Planifiée</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">En cours</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Terminée</Badge>;
      case 'overdue':
        return <Badge variant="warning" className="bg-red-50 text-red-700 border-red-200">En retard</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: MaintenanceTask['priority']) => {
    switch (priority) {
      case 'low':
        return <Badge variant="outline" className="text-blue-600">Basse</Badge>;
      case 'medium':
        return <Badge variant="outline" className="text-yellow-600">Moyenne</Badge>;
      case 'high':
        return <Badge variant="outline" className="text-orange-600">Haute</Badge>;
      case 'critical':
        return <Badge variant="destructive">Critique</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const handleCompleteTask = (taskId: string) => {
    completeMaintenanceTask(
      taskId,
      "Maître du Jeu",
      "Maintenance standard effectuée",
      500 // Coût standard, pourrait être ajusté en fonction de la tâche
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold">Tâches de maintenance</h3>
          <p className="text-sm text-muted-foreground">
            Gérez les tâches de maintenance pour maintenir les bâtiments en bon état
          </p>
        </div>
        
        <div className="flex gap-2 self-end sm:self-auto">
          <Button 
            variant={filter === 'all' ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter('all')}
          >
            Toutes
          </Button>
          <Button 
            variant={filter === 'scheduled' ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter('scheduled')}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Planifiées
          </Button>
          <Button 
            variant={filter === 'overdue' ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter('overdue')}
            className={filter === 'overdue' ? "bg-red-600" : "text-red-600 hover:text-red-700"}
          >
            <AlertCircle className="h-4 w-4 mr-1" />
            En retard
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center">
              <Clock className="h-4 w-4 mr-2 text-yellow-500" />
              À planifier
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-center text-sm text-muted-foreground py-6">
              {maintenanceTasks.filter(t => t.status === 'scheduled').length === 0 
                ? "Aucune tâche planifiée"
                : `${maintenanceTasks.filter(t => t.status === 'scheduled').length} tâches planifiées`
              }
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center">
              <Wrench className="h-4 w-4 mr-2 text-blue-500" />
              En cours
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-center text-sm text-muted-foreground py-6">
              {maintenanceTasks.filter(t => t.status === 'in_progress').length === 0 
                ? "Aucune tâche en cours"
                : `${maintenanceTasks.filter(t => t.status === 'in_progress').length} tâches en cours`
              }
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              Terminées
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-center text-sm text-muted-foreground py-6">
              {maintenanceTasks.filter(t => t.status === 'completed').length === 0 
                ? "Aucune tâche terminée"
                : `${maintenanceTasks.filter(t => t.status === 'completed').length} tâches terminées`
              }
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bâtiment</TableHead>
              <TableHead>Priorité</TableHead>
              <TableHead>Échéance</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Coût estimé</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                  Aucune tâche ne correspond à vos critères de filtrage
                </TableCell>
              </TableRow>
            ) : (
              filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.buildingName}</TableCell>
                  <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                  <TableCell className="whitespace-nowrap">{formatDate(task.deadline)}</TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell>{formatCurrency(task.estimatedCost)}</TableCell>
                  <TableCell className="text-right">
                    {task.status !== 'completed' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCompleteTask(task.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
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
    </div>
  );
};
