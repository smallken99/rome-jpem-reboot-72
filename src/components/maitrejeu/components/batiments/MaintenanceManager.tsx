
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wrench, AlertTriangle, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ConditionBadge } from './ConditionBadge';
import { toast } from 'sonner';

// Mock data
const mockMaintenanceTasks = [
  {
    id: 'task-1',
    buildingId: '1',
    buildingName: 'Temple de Jupiter',
    description: 'Réparation de la toiture',
    cost: 1200,
    duration: 30,
    startDate: { year: 706, season: 'Ver', day: 15 },
    endDate: null,
    status: 'planned',
    priority: 'high',
    responsibleId: null,
    notes: 'Matériaux commandés, en attente de livraison.'
  },
  {
    id: 'task-2',
    buildingId: '3',
    buildingName: 'Aqueduc Claudien',
    description: 'Nettoyage du canal principal',
    cost: 800,
    duration: 15,
    startDate: { year: 706, season: 'Ver', day: 20 },
    endDate: null,
    status: 'ongoing',
    priority: 'medium',
    responsibleId: 'resp-1',
    responsibleName: 'Marcus Valerius',
    notes: 'Travaux en cours, progresse comme prévu.'
  },
  {
    id: 'task-3',
    buildingId: '5',
    buildingName: 'Amphithéâtre',
    description: 'Renforcement structural urgent',
    cost: 5000,
    duration: 60,
    startDate: { year: 706, season: 'Ver', day: 10 },
    endDate: null,
    status: 'planned',
    priority: 'urgent',
    responsibleId: null,
    notes: 'Risque d\'effondrement si les travaux ne sont pas effectués rapidement.'
  },
  {
    id: 'task-4',
    buildingId: '2',
    buildingName: 'Thermes de Caracalla',
    description: 'Maintenance du système de chauffage',
    cost: 1500,
    duration: 45,
    startDate: { year: 705, season: 'Hiems', day: 5 },
    endDate: { year: 705, season: 'Hiems', day: 50 },
    status: 'completed',
    priority: 'medium',
    responsibleId: 'resp-2',
    responsibleName: 'Lucius Cornelius',
    notes: 'Travaux terminés avec succès, performance améliorée.'
  }
];

export const MaintenanceManager: React.FC = () => {
  const [tasks, setTasks] = useState(mockMaintenanceTasks);
  const [activeTab, setActiveTab] = useState('scheduled');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const getFilteredTasks = () => {
    return tasks.filter(task => {
      if (activeTab === 'scheduled' && task.status !== 'planned') return false;
      if (activeTab === 'ongoing' && task.status !== 'ongoing') return false;
      if (activeTab === 'completed' && task.status !== 'completed') return false;
      
      if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
      
      return true;
    });
  };

  const handleStartTask = (id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, status: 'ongoing' } : task
      )
    );
    toast.success('Tâche de maintenance démarrée !');
  };

  const handleCompleteTask = (id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { 
          ...task, 
          status: 'completed', 
          endDate: { year: 706, season: 'Ver', day: 30 } 
        } : task
      )
    );
    toast.success('Tâche de maintenance terminée !');
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'low':
        return <Badge variant="outline" className="capitalize">Faible</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="capitalize">Moyenne</Badge>;
      case 'high':
        return <Badge variant="default" className="capitalize">Élevée</Badge>;
      case 'urgent':
        return <Badge variant="destructive" className="capitalize">Urgente</Badge>;
      default:
        return <Badge variant="outline" className="capitalize">{priority}</Badge>;
    }
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h3 className="text-lg font-medium">Gestion de la Maintenance</h3>
        
        <div className="flex gap-2">
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Priorité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes priorités</SelectItem>
              <SelectItem value="low">Faible</SelectItem>
              <SelectItem value="medium">Moyenne</SelectItem>
              <SelectItem value="high">Élevée</SelectItem>
              <SelectItem value="urgent">Urgente</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Nouvelle tâche
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scheduled" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Planifiées
          </TabsTrigger>
          <TabsTrigger value="ongoing" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            En cours
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Terminées
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="pt-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bâtiment</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Priorité</TableHead>
                  <TableHead>Coût</TableHead>
                  <TableHead>Durée (jours)</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTasks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                      Aucune tâche {activeTab === 'scheduled' ? 'planifiée' : 
                                    activeTab === 'ongoing' ? 'en cours' : 'terminée'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">
                        {task.buildingName}
                      </TableCell>
                      <TableCell>{task.description}</TableCell>
                      <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                      <TableCell>{task.cost} deniers</TableCell>
                      <TableCell>{task.duration}</TableCell>
                      <TableCell>
                        {task.responsibleName || 'Non assigné'}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {task.status === 'planned' && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleStartTask(task.id)}
                            >
                              Démarrer
                            </Button>
                          )}
                          {task.status === 'ongoing' && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleCompleteTask(task.id)}
                            >
                              Terminer
                            </Button>
                          )}
                          {task.status === 'completed' && (
                            <Badge variant="outline" className="bg-green-50">
                              Terminée
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
      
      {activeTab === 'scheduled' && filteredTasks.some(t => t.priority === 'urgent') && (
        <div className="bg-red-50 p-4 rounded-md border border-red-200 flex items-center gap-3 mt-4">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <p className="text-red-700 text-sm">
            Il y a des tâches de maintenance urgentes qui nécessitent une attention immédiate.
          </p>
        </div>
      )}
    </div>
  );
};
