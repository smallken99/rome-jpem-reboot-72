
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { v4 as uuidv4 } from 'uuid';
import { AlertCircle, ChevronDown, Settings, Tool, Wrench } from 'lucide-react';
import { useBuildingManagement } from '../../hooks/useBuildingManagement';
import { Building, MaintenanceTask, BuildingStatus, BuildingPriority } from '../../types/batiments';

const MaintenanceManager: React.FC = () => {
  const { 
    buildings, 
    updateBuildingCondition, 
    payBuildingMaintenance,
    maintenanceTasks,
    addMaintenanceTask,
    setMaintenanceTasks,
    completeMaintenanceTask
  } = useBuildingManagement();
  
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  
  // Simuler quelques tâches de maintenance si nécessaire
  const addDemoMaintenanceTasks = () => {
    if (buildings.length > 0 && maintenanceTasks.length === 0) {
      const tasks = [
        {
          id: uuidv4(),
          buildingId: buildings[0].id,
          buildingName: buildings[0].name,
          type: 'repair' as const,
          description: "Réparer les colonnes endommagées",
          cost: 5000,
          duration: 30,
          startDate: new Date(),
          priority: 'high' as const,
          status: 'pending' as const,
        },
        {
          id: uuidv4(),
          buildingId: buildings.length > 1 ? buildings[1].id : buildings[0].id,
          buildingName: buildings.length > 1 ? buildings[1].name : buildings[0].name,
          type: 'routine' as const,
          description: "Nettoyage et entretien général",
          cost: 2000,
          duration: 15,
          startDate: new Date(),
          priority: 'medium' as const,
          status: 'in_progress' as const,
        },
        {
          id: uuidv4(),
          buildingId: buildings[0].id,
          buildingName: buildings[0].name,
          type: 'upgrade' as const,
          description: "Ajouter une mosaïque ornementale",
          cost: 15000,
          duration: 60,
          startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
          completionDate: new Date(),
          priority: 'low' as const,
          status: 'completed' as const,
        }
      ];
      
      setMaintenanceTasks(tasks);
    }
  };
  
  // Ajouter une tâche de réparation d'urgence
  const addEmergencyRepair = () => {
    if (buildings.length > 0) {
      const worseBuildingIndex = buildings
        .map((b, i) => ({ condition: b.condition, index: i }))
        .sort((a, b) => a.condition - b.condition)[0].index;
      
      const building = buildings[worseBuildingIndex];
      
      const task: MaintenanceTask = {
        id: uuidv4(),
        buildingId: building.id,
        buildingName: building.name,
        type: 'repair',
        description: `Réparation d'urgence - Bâtiment en mauvais état`,
        cost: Math.round(building.value * 0.1), // 10% de la valeur
        duration: 14,
        startDate: new Date(),
        priority: 'high',
        status: 'pending',
      };
      
      addMaintenanceTask(task);
    }
  };
  
  // Effectuer l'entretien de tous les bâtiments
  const maintainAllBuildings = () => {
    payBuildingMaintenance('all');
  };
  
  // Filtrer les tâches en fonction du statut
  const filteredTasks = maintenanceTasks.filter(task => 
    showCompletedTasks || task.status !== 'completed'
  );
  
  // Répartition des tâches par type
  const tasksByType = {
    repair: filteredTasks.filter(t => t.type === 'repair'),
    routine: filteredTasks.filter(t => t.type === 'routine'),
    upgrade: filteredTasks.filter(t => t.type === 'upgrade')
  };
  
  // Compléter une tâche
  const handleCompleteTask = (taskId: string) => {
    completeMaintenanceTask(taskId);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-medium">Gestion de la Maintenance</h2>
          <p className="text-sm text-muted-foreground">
            Entretien et réparation des bâtiments publics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addDemoMaintenanceTasks}>
            Simuler des tâches
          </Button>
          <Button variant="default" onClick={maintainAllBuildings}>
            Entretenir tous les bâtiments
          </Button>
        </div>
      </div>
      
      {buildings.some(b => b.condition < 50) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Attention !</AlertTitle>
          <AlertDescription>
            Certains bâtiments sont en mauvais état et nécessitent des réparations urgentes.
            <Button variant="destructive" size="sm" className="mt-2" onClick={addEmergencyRepair}>
              Ajouter une réparation d'urgence
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs defaultValue="tasks">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="tasks" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Tâches
          </TabsTrigger>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Vue d'ensemble
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tasks">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-medium">
              {filteredTasks.length} tâche{filteredTasks.length !== 1 ? 's' : ''} de maintenance
            </span>
            <label className="flex items-center gap-2 text-sm">
              <input 
                type="checkbox" 
                checked={showCompletedTasks} 
                onChange={() => setShowCompletedTasks(!showCompletedTasks)}
                className="rounded"
              />
              Afficher les tâches terminées
            </label>
          </div>
          
          <div className="space-y-4">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <Card key={task.id} className={task.status === 'completed' ? 'opacity-60' : ''}>
                  <CardHeader className="pb-2 flex flex-row justify-between items-center">
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        {task.type === 'repair' ? (
                          <Tool className="h-4 w-4 text-red-500" />
                        ) : task.type === 'upgrade' ? (
                          <Settings className="h-4 w-4 text-blue-500" />
                        ) : (
                          <Wrench className="h-4 w-4 text-green-500" />
                        )}
                        {task.description}
                      </CardTitle>
                      <div className="text-sm text-muted-foreground">
                        Bâtiment: {task.buildingName || 'Non spécifié'}
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                    >
                      <ChevronDown className={`h-4 w-4 ${expandedTask === task.id ? 'rotate-180' : 'rotate-0'} transition-transform`} />
                    </Button>
                  </CardHeader>
                  
                  {expandedTask === task.id && (
                    <CardContent className="pt-0">
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span className="text-sm">Type:</span>
                          <span className="text-sm font-medium capitalize">
                            {task.type === 'repair' ? 'Réparation' : 
                            task.type === 'upgrade' ? 'Amélioration' : 'Entretien'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Coût:</span>
                          <span className="text-sm font-medium">{task.cost.toLocaleString()} As</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Durée:</span>
                          <span className="text-sm font-medium">{task.duration} jours</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Priorité:</span>
                          <span className={`text-sm font-medium ${
                            task.priority === 'high' ? 'text-red-500' :
                            task.priority === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                          }`}>
                            {task.priority === 'high' ? 'Haute' :
                            task.priority === 'medium' ? 'Moyenne' : 'Basse'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Statut:</span>
                          <span className={`text-sm font-medium ${
                            task.status === 'pending' ? 'text-yellow-500' :
                            task.status === 'in_progress' ? 'text-blue-500' :
                            task.status === 'completed' ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {task.status === 'pending' ? 'En attente' :
                            task.status === 'in_progress' ? 'En cours' :
                            task.status === 'completed' ? 'Terminée' : 'Annulée'}
                          </span>
                        </div>
                      </div>
                      
                      {task.status !== 'completed' && task.status !== 'cancelled' && (
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => setMaintenanceTasks(prev => 
                              prev.map(t => t.id === task.id ? { ...t, status: 'in_progress' } : t)
                            )}
                            disabled={task.status === 'in_progress'}
                          >
                            Démarrer
                          </Button>
                          <Button 
                            variant="default" 
                            className="flex-1"
                            onClick={() => handleCompleteTask(task.id)}
                          >
                            Terminer
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">Aucune tâche de maintenance pour le moment</p>
                <Button variant="outline" className="mt-2" onClick={addDemoMaintenanceTasks}>
                  Ajouter des tâches de démonstration
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="overview">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Réparations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tasksByType.repair.length}</div>
                <p className="text-xs text-muted-foreground">
                  {tasksByType.repair.filter(t => t.status === 'pending').length} en attente
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Entretien</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tasksByType.routine.length}</div>
                <p className="text-xs text-muted-foreground">
                  {tasksByType.routine.filter(t => t.status === 'pending').length} en attente
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Améliorations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tasksByType.upgrade.length}</div>
                <p className="text-xs text-muted-foreground">
                  {tasksByType.upgrade.filter(t => t.status === 'pending').length} en attente
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>État des bâtiments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {buildings.map(building => (
                  <div key={building.id} className="flex flex-col gap-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{building.name}</span>
                      <span className={`text-sm font-medium ${
                        building.condition >= 75 ? 'text-green-500' :
                        building.condition >= 50 ? 'text-yellow-500' :
                        'text-red-500'
                      }`}>
                        {building.condition}%
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          building.condition >= 75 ? 'bg-green-500' :
                          building.condition >= 50 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`} 
                        style={{ width: `${building.condition}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Coût d'entretien: {building.maintenanceCost.toLocaleString()} As</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => updateBuildingCondition(building.id, 20)}
                        disabled={building.condition >= 100}
                      >
                        Réparer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaintenanceManager;
