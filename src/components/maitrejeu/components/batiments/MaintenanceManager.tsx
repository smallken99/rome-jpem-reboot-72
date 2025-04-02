
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MaintenanceTask, BuildingPriority, Building } from '../../types/batiments';

interface MaintenanceManagerProps {
  maintenanceTasks: MaintenanceTask[];
  completeMaintenanceTask: (taskId: string) => void;
  cancelMaintenanceTask: (taskId: string) => void;
}

const MaintenanceManager: React.FC<MaintenanceManagerProps> = ({ 
  maintenanceTasks, 
  completeMaintenanceTask, 
  cancelMaintenanceTask 
}) => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState<keyof MaintenanceTask>("priority");
  const [filteredTasks, setFilteredTasks] = useState<MaintenanceTask[]>([]);
  
  // Sort and filter tasks
  useEffect(() => {
    let tasks = [...maintenanceTasks];
    
    // Filter by status
    if (filterStatus !== "all") {
      tasks = tasks.filter(task => task.status === filterStatus);
    }
    
    // Sort tasks
    tasks.sort((a, b) => {
      if (sortBy === "priority") {
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        const aPriority = a.priority || "low";
        const bPriority = b.priority || "low";
        return priorityOrder[aPriority as keyof typeof priorityOrder] - priorityOrder[bPriority as keyof typeof priorityOrder];
      }
      
      if (a[sortBy] && b[sortBy]) {
        return String(a[sortBy]).localeCompare(String(b[sortBy]));
      }
      
      return 0;
    });
    
    setFilteredTasks(tasks);
  }, [maintenanceTasks, filterStatus, sortBy]);
  
  // Get task status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "in_progress": return "bg-blue-500";
      case "completed": return "bg-green-500";
      case "cancelled": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };
  
  // Get priority badge color
  const getPriorityColor = (priority: BuildingPriority) => {
    switch (priority) {
      case BuildingPriority.CRITICAL: return "bg-red-500";
      case BuildingPriority.HIGH: return "bg-orange-500";
      case BuildingPriority.MEDIUM: return "bg-yellow-500";
      case BuildingPriority.LOW: return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="text-sm font-medium">Filtrer par statut:</div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="in_progress">En cours</SelectItem>
              <SelectItem value="completed">Terminé</SelectItem>
              <SelectItem value="cancelled">Annulé</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-sm font-medium">Trier par:</div>
          <Select value={sortBy} onValueChange={(value: string) => setSortBy(value as keyof MaintenanceTask)}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Tri" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="priority">Priorité</SelectItem>
              <SelectItem value="buildingName">Nom du bâtiment</SelectItem>
              <SelectItem value="type">Type</SelectItem>
              <SelectItem value="startDate">Date de début</SelectItem>
              <SelectItem value="cost">Coût</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredTasks.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Aucune tâche de maintenance trouvée.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map(task => (
            <Card key={task.id} className="border relative">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">
                    {task.buildingName || `Bâtiment #${task.buildingId.substring(0, 8)}`}
                  </CardTitle>
                  <Badge className={`${getStatusColor(task.status)}`}>
                    {task.status === "pending" ? "En attente" : 
                     task.status === "in_progress" ? "En cours" : 
                     task.status === "completed" ? "Terminé" : "Annulé"}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground">
                  {task.type === "repair" ? "Réparation" :
                   task.type === "upgrade" ? "Amélioration" :
                   task.type === "maintenance" ? "Maintenance" : "Routine"}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="text-sm mb-2">{task.description || "Tâche de maintenance"}</div>
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
                  <div className="text-xs text-muted-foreground">Coût:</div>
                  <div className="text-xs font-medium">{task.cost.toLocaleString()} As</div>
                  
                  <div className="text-xs text-muted-foreground">Durée:</div>
                  <div className="text-xs font-medium">{task.duration} jours</div>
                  
                  <div className="text-xs text-muted-foreground">Début:</div>
                  <div className="text-xs font-medium">{new Date(task.startDate).toLocaleDateString()}</div>
                  
                  <div className="text-xs text-muted-foreground">Priorité:</div>
                  <div className="flex items-center">
                    <Badge className={`text-xs ${getPriorityColor(task.priority || BuildingPriority.MEDIUM)}`}>
                      {task.priority || "Moyenne"}
                    </Badge>
                  </div>
                </div>
                
                {task.status === "pending" && (
                  <div className="flex justify-between mt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-500 border-red-500 hover:bg-red-50"
                      onClick={() => cancelMaintenanceTask(task.id)}
                    >
                      Annuler
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => completeMaintenanceTask(task.id)}
                    >
                      Achever
                    </Button>
                  </div>
                )}
                
                {task.status === "in_progress" && (
                  <div className="flex justify-end mt-2">
                    <Button 
                      size="sm"
                      onClick={() => completeMaintenanceTask(task.id)}
                    >
                      Compléter
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MaintenanceManager;
