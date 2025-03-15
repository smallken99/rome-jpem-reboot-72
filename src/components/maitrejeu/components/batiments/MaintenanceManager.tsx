import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarClock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Building, BuildingStatus } from '../../types/batiments';

interface MaintenanceTask {
  id: string;
  buildingId: string;
  buildingName: string;
  deadline: string;
  estimatedCost: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'scheduled' | 'in_progress' | 'completed' | 'overdue';
}

interface MaintenanceManagerProps {
  buildings: Building[];
  onScheduleMaintenance: (buildingId: string, task: MaintenanceTask) => void;
}

export const MaintenanceManager: React.FC<MaintenanceManagerProps> = ({ buildings, onScheduleMaintenance }) => {
  const maintenanceTasks: MaintenanceTask[] = [
    {
      id: 'mt1',
      buildingId: 'b1',
      buildingName: 'Temple de Jupiter',
      deadline: '2024-06-01',
      estimatedCost: 5000,
      priority: 'medium',
      status: 'scheduled'
    },
    {
      id: 'mt2',
      buildingId: 'b2',
      buildingName: 'Aqueduc de Rome',
      deadline: '2024-07-15',
      estimatedCost: 8000,
      priority: 'high',
      status: 'in_progress'
    },
    {
      id: 'mt3',
      buildingId: 'b3',
      buildingName: 'Théâtre de Marcellus',
      deadline: '2024-08-01',
      estimatedCost: 3000,
      priority: 'low',
      status: 'completed'
    }
  ];
  
  const getPriorityVariant = (priority: 'low' | 'medium' | 'high' | 'critical') => {
    switch (priority) {
      case 'low':
        return 'success';
      case 'medium':
        return 'secondary';
      case 'high':
        return 'destructive';
      case 'critical':
        return 'destructive';
      default:
        return 'default';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <CalendarClock className="h-4 w-4 mr-2" />;
      case 'in_progress':
        return <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 mr-2 text-green-500" />;
      case 'overdue':
        return <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />;
      default:
        return null;
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gestion de la Maintenance</CardTitle>
        <CardDescription>Planifiez et suivez la maintenance des bâtiments publics</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bâtiment</TableHead>
              <TableHead>Date Limite</TableHead>
              <TableHead>Coût Estimé</TableHead>
              <TableHead>Priorité</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {maintenanceTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.buildingName}</TableCell>
                <TableCell>{task.deadline}</TableCell>
                <TableCell>{task.estimatedCost}</TableCell>
                <TableCell>
                  <Badge variant={getPriorityVariant(task.priority)}>
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {getStatusIcon(task.status)}
                    <span>{task.status}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm">Gérer</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
