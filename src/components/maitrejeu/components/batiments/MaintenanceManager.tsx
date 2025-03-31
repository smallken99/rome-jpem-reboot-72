import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useMaitreJeu } from '../../context';
import { Building, MaintenanceTask } from '../../types/batiments';
import { GameDate } from '../../types/common';
import { useBatimentsManagement } from '../../hooks/useBatimentsManagement';
import { Season } from '@/components/maitrejeu/types/common';

const MaintenanceManager: React.FC = () => {
  const { buildings } = useBatimentsManagement();
  const [tasks, setTasks] = useState<MaintenanceTask[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [buildingFilter, setBuildingFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');

  useEffect(() => {
    const mockTasks: MaintenanceTask[] = [
      {
        id: 'task-1',
        buildingId: 'forum-romanum',
        buildingName: 'Forum Romanum',
        deadline: { year: 2023, season: 'Spring' },
        estimatedCost: 15000,
        priority: 'high',
        status: 'scheduled',
        description: 'Réparer les dommages causés par les récentes émeutes',
        startDate: { year: 2023, season: 'Winter' }
      },
      {
        id: 'task-2',
        buildingId: 'basilica-aemilia',
        buildingName: 'Basilica Aemilia',
        deadline: { year: 2023, season: 'Summer' },
        estimatedCost: 8000,
        priority: 'medium',
        status: 'in_progress',
        description: 'Remplacer les tuiles endommagées sur le toit',
        startDate: { year: 2023, season: 'Spring' }
      },
      {
        id: 'task-3',
        buildingId: 'temple-jupiter',
        buildingName: 'Temple de Jupiter',
        deadline: { year: 2023, season: 'Autumn' },
        estimatedCost: 12000,
        priority: 'low',
        status: 'completed',
        description: 'Nettoyer et restaurer les statues',
        startDate: { year: 2023, season: 'Spring' }
      }
    ];
    setTasks(mockTasks);
  }, []);

  const scheduleMaintenanceTasks = () => {
    const tasks = [
      {
        id: 'task-1',
        buildingId: 'temple-1',
        buildingName: 'Temple de Jupiter',
        description: 'Réparation du toit endommagé',
        estimatedCost: 5000,
        priority: 'high',
        deadline: { year: 703, season: 'SPRING' as Season },
        status: 'pending'
      },
      {
        id: 'task-2',
        buildingId: 'market-1',
        buildingName: 'Marché Central',
        description: 'Renforcement des piliers',
        estimatedCost: 3000,
        priority: 'medium',
        deadline: { year: 703, season: 'WINTER' as Season },
        status: 'in_progress'
      },
      {
        id: 'task-3',
        buildingId: 'forum-1',
        buildingName: 'Forum Romain',
        description: 'Nettoyage des canaux d\'eau',
        estimatedCost: 2000,
        priority: 'low',
        deadline: { year: 703, season: 'SUMMER' as Season },
        status: 'pending'
      },
      {
        id: 'task-4',
        buildingId: 'temple-2',
        buildingName: 'Temple de Vesta',
        description: 'Restauration des fresques',
        estimatedCost: 8000,
        priority: 'medium',
        deadline: { year: 704, season: 'SPRING' as Season },
        status: 'scheduled'
      },
      {
        id: 'task-5',
        buildingId: 'bath-1',
        buildingName: 'Thermes de Caracalla',
        description: 'Réparation du système de chauffage',
        estimatedCost: 12000,
        priority: 'high',
        deadline: { year: 703, season: 'AUTUMN' as Season },
        status: 'delayed'
      },
      {
        id: 'task-6',
        buildingId: 'palace-1',
        buildingName: 'Palais Impérial',
        description: 'Rénovation des jardins',
        estimatedCost: 15000,
        priority: 'low',
        deadline: { year: 704, season: 'SPRING' as Season },
        status: 'scheduled'
      }
    ];
    
    setMaintenanceTasks(tasks);
  };

  const formatGameDate = (gameDate: GameDate): string => {
    return `${gameDate.year}-${gameDate.season}`;
  };

  const filteredTasks = tasks.filter(task => {
    const building = buildings?.find(b => b.id === task.buildingId);
    const buildingName = building ? building.name : task.buildingName || '';
    
    const dateMatch = selectedDate 
      ? formatGameDate(task.deadline) === format(selectedDate, "yyyy-MM") 
      : true;
      
    const buildingMatch = buildingFilter 
      ? buildingName.toLowerCase().includes(buildingFilter.toLowerCase()) 
      : true;
      
    const priorityMatch = priorityFilter 
      ? task.priority === priorityFilter 
      : true;
      
    return dateMatch && buildingMatch && priorityMatch;
  });

  const getPriorityBadge = (priority: MaintenanceTask['priority']) => {
    switch (priority) {
      case 'low':
        return 'secondary';
      case 'medium':
        return 'secondary';
      case 'high':
        return 'destructive';
      case 'critical':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestion des Tâches de Maintenance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <div>
            <Label htmlFor="building-filter">Filtrer par Bâtiment</Label>
            <Input
              type="text"
              id="building-filter"
              placeholder="Nom du bâtiment"
              value={buildingFilter}
              onChange={e => setBuildingFilter(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="priority-filter">Filtrer par Priorité</Label>
            <select
              id="priority-filter"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-foreground file:text-background file:h-9 file:px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value)}
            >
              <option value="">Toutes les Priorités</option>
              <option value="low">Basse</option>
              <option value="medium">Moyenne</option>
              <option value="high">Haute</option>
              <option value="critical">Critique</option>
            </select>
          </div>
          <div>
            <Label>Filtrer par Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  {selectedDate ? (
                    format(selectedDate, "yyyy-MM-dd")
                  ) : (
                    <span>Choisir une date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={false}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <Table className="mt-4">
          <TableCaption>Liste des tâches de maintenance planifiées.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Bâtiment</TableHead>
              <TableHead>Date Limite</TableHead>
              <TableHead>Priorité</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map(task => {
              const building = buildings?.find(b => b.id === task.buildingId);
              const buildingName = building ? building.name : task.buildingName || 'Inconnu';
              return (
                <TableRow key={task.id}>
                  <TableCell>{buildingName}</TableCell>
                  <TableCell>{formatGameDate(task.deadline)}</TableCell>
                  <TableCell>
                    <Badge variant={getPriorityBadge(task.priority)}>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm">Marquer comme Terminé</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MaintenanceManager;
