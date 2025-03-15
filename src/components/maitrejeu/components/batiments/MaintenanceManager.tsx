
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Wrench, AlertCircle, Wallet, CalendarDays, CheckCircle, Filter } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface MaintenanceTask {
  id: string;
  buildingId: string;
  buildingName: string;
  type: 'routine' | 'repair' | 'emergency';
  status: 'scheduled' | 'in_progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedCost: number;
  actualCost?: number;
  scheduledDate: string;
  completedDate?: string;
  description: string;
}

export const MaintenanceManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState('scheduled');
  const [filter, setFilter] = useState('all');

  // Données fictives pour la démonstration
  const maintenanceTasks: MaintenanceTask[] = [
    {
      id: '1',
      buildingId: '1',
      buildingName: 'Temple de Jupiter',
      type: 'routine',
      status: 'scheduled',
      priority: 'medium',
      estimatedCost: 5000,
      scheduledDate: '721 AUC, Aestas',
      description: 'Inspection et nettoyage des colonnes extérieures'
    },
    {
      id: '2',
      buildingId: '3',
      buildingName: 'Aqueduc Appien',
      type: 'repair',
      status: 'in_progress',
      priority: 'high',
      estimatedCost: 12000,
      actualCost: 8000,
      scheduledDate: '721 AUC, Ver',
      description: 'Réparation de la structure endommagée par les intempéries'
    },
    {
      id: '3',
      buildingId: '2',
      buildingName: 'Basilique Aemilia',
      type: 'emergency',
      status: 'completed',
      priority: 'critical',
      estimatedCost: 8000,
      actualCost: 9500,
      scheduledDate: '720 AUC, Hiems',
      completedDate: '720 AUC, Hiems',
      description: 'Renforcement urgent du toit qui menaçait de s\'effondrer'
    },
    {
      id: '4',
      buildingId: '1',
      buildingName: 'Temple de Jupiter',
      type: 'routine',
      status: 'overdue',
      priority: 'low',
      estimatedCost: 3000,
      scheduledDate: '720 AUC, Autumnus',
      description: 'Rénovation des décorations intérieures'
    }
  ];

  // Filtrer les tâches selon l'onglet actif
  const filteredTasks = maintenanceTasks.filter(task => {
    // Filtrer par statut (onglet)
    const statusMatch = activeTab === 'all' || task.status === activeTab;
    
    // Filtrer par type (sélecteur)
    const typeMatch = filter === 'all' || task.type === filter;
    
    return statusMatch && typeMatch;
  });

  const getStatusBadge = (status: MaintenanceTask['status']) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Planifiée</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-orange-100 text-orange-800">En cours</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Terminée</Badge>;
      case 'overdue':
        return <Badge variant="outline" className="bg-red-100 text-red-800">En retard</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const getPriorityBadge = (priority: MaintenanceTask['priority']) => {
    switch (priority) {
      case 'low':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Basse</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Moyenne</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-orange-100 text-orange-800">Haute</Badge>;
      case 'critical':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Critique</Badge>;
      default:
        return <Badge variant="outline">Inconnue</Badge>;
    }
  };

  const handleStartTask = (id: string) => {
    console.log('Starting task with ID:', id);
    // Logique de démarrage à implémenter
  };

  const handleCompleteTask = (id: string) => {
    console.log('Completing task with ID:', id);
    // Logique de complétion à implémenter
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Wrench className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Maintenance des bâtiments</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Type:</span>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tous les types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="routine">Entretien régulier</SelectItem>
              <SelectItem value="repair">Réparation</SelectItem>
              <SelectItem value="emergency">Urgence</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="ml-2">
            + Nouvelle tâche
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="scheduled">Planifiées</TabsTrigger>
          <TabsTrigger value="in_progress">En cours</TabsTrigger>
          <TabsTrigger value="completed">Terminées</TabsTrigger>
          <TabsTrigger value="overdue">En retard</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bâtiment</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Priorité</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Coût estimé</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        Aucune tâche trouvée.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTasks.map(task => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.buildingName}</TableCell>
                        <TableCell>
                          {task.type === 'routine' ? 'Entretien' : 
                           task.type === 'repair' ? 'Réparation' : 'Urgence'}
                        </TableCell>
                        <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                        <TableCell>{getStatusBadge(task.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <CalendarDays className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{task.scheduledDate}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Wallet className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{task.estimatedCost} as</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {task.status === 'scheduled' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleStartTask(task.id)}
                            >
                              Démarrer
                            </Button>
                          )}
                          {task.status === 'in_progress' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleCompleteTask(task.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Terminer
                            </Button>
                          )}
                          {task.status === 'overdue' && (
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleStartTask(task.id)}
                            >
                              <AlertCircle className="h-4 w-4 mr-1" />
                              Traiter
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
