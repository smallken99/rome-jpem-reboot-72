
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { formatCurrency, formatDate } from '@/utils/formatUtils';
import { 
  Wrench, Clock, AlertCircle, CheckCircle, 
  ListChecks, History, FilePlus
} from 'lucide-react';
import { useBatimentsManagement } from '@/components/maitrejeu/hooks/useBatimentsManagement';
import { 
  MaintenanceTask, MaintenanceRecord, Building as BuildingType
} from '@/components/maitrejeu/types/batiments';

export const MaintenanceManager: React.FC = () => {
  const { 
    buildings,
    maintenanceTasks,
    maintenanceRecords,
    completeMaintenanceTask
  } = useBatimentsManagement();
  
  const [currentTab, setCurrentTab] = useState('tasks');
  
  // Fonctions pour filtrer les tâches par statut
  const scheduledTasks = maintenanceTasks.filter(task => task.status === 'scheduled');
  const overdueTasks = maintenanceTasks.filter(task => task.status === 'overdue');
  const inProgressTasks = maintenanceTasks.filter(task => task.status === 'in_progress');
  
  // Fonction pour marquer une tâche comme terminée
  const handleCompleteTask = (taskId: string) => {
    if (window.confirm('Confirmer que cette maintenance a été effectuée ?')) {
      completeMaintenanceTask(taskId);
    }
  };
  
  // Fonction pour obtenir le nom d'un bâtiment à partir de son ID
  const getBuildingName = (buildingId: string): string => {
    const building = buildings.find(b => b.id === buildingId);
    return building ? building.name : 'Bâtiment inconnu';
  };
  
  // Fonction pour afficher une badge de priorité
  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'critical':
        return <Badge variant="destructive">Critique</Badge>;
      case 'high':
        return <Badge variant="warning">Haute</Badge>;
      case 'medium':
        return <Badge>Moyenne</Badge>;
      case 'low':
        return <Badge variant="outline">Basse</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };
  
  // Fonction pour afficher une badge de statut
  const getTaskStatusBadge = (status: string) => {
    switch(status) {
      case 'scheduled':
        return <Badge variant="outline">Planifiée</Badge>;
      case 'in_progress':
        return <Badge variant="secondary">En cours</Badge>;
      case 'completed':
        return <Badge variant="success">Terminée</Badge>;
      case 'overdue':
        return <Badge variant="destructive">En retard</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-4">
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <ListChecks className="h-4 w-4" />
            Tâches
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Historique
          </TabsTrigger>
          <TabsTrigger value="planning" className="flex items-center gap-2">
            <FilePlus className="h-4 w-4" />
            Planification
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tasks" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-500" />
                  Tâches planifiées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{scheduledTasks.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                  Tâches en retard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{overdueTasks.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Wrench className="h-4 w-4 mr-2 text-yellow-500" />
                  En cours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inProgressTasks.length}</div>
              </CardContent>
            </Card>
          </div>
          
          <ScrollArea className="h-[350px]">
            <div className="space-y-4 pr-4">
              {maintenanceTasks.length > 0 ? (
                maintenanceTasks.map((task) => (
                  <Card key={task.id} className={task.status === 'overdue' ? "border-red-400" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{task.buildingName}</CardTitle>
                        <div className="flex space-x-2">
                          {getPriorityBadge(task.priority)}
                          {getTaskStatusBadge(task.status)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
                      
                      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div>
                          <dt className="text-muted-foreground">Date limite:</dt>
                          <dd>{formatDate(task.deadline)}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Coût estimé:</dt>
                          <dd>{formatCurrency(task.estimatedCost)}</dd>
                        </div>
                      </dl>
                      
                      <div className="mt-4 flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => console.log("Modification de la tâche", task.id)}
                        >
                          Détails
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => console.log("Démarrer la tâche", task.id)}
                        >
                          Démarrer
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => handleCompleteTask(task.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Terminer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 bg-muted/20 rounded-lg border border-dashed">
                  <Wrench className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    Aucune tâche de maintenance programmée
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="history" className="mt-4">
          <ScrollArea className="h-[400px]">
            <div className="space-y-4 pr-4">
              {maintenanceRecords.length > 0 ? (
                maintenanceRecords.map((record) => (
                  <Card key={record.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">
                          {getBuildingName(record.buildingId)}
                        </CardTitle>
                        <Badge>
                          {record.repairLevel === 'minor' ? 'Réparation mineure' :
                           record.repairLevel === 'moderate' ? 'Réparation moyenne' :
                           record.repairLevel === 'major' ? 'Réparation majeure' :
                           'Restauration complète'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{record.description}</p>
                      
                      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div>
                          <dt className="text-muted-foreground">Date:</dt>
                          <dd>{formatDate(record.date)}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Coût:</dt>
                          <dd>{formatCurrency(record.cost)}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Effectuée par:</dt>
                          <dd>{record.performedBy}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Nouveau statut:</dt>
                          <dd className="capitalize">{record.newStatus.replace('_', ' ')}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 bg-muted/20 rounded-lg border border-dashed">
                  <History className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    Aucun historique de maintenance
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="planning" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center p-8">
                <FilePlus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Planification de maintenance</h3>
                <p className="text-muted-foreground mb-4">
                  Cette fonctionnalité vous permet de planifier des maintenances régulières pour les bâtiments publics.
                </p>
                <Button>Planifier une nouvelle maintenance</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaintenanceManager;
