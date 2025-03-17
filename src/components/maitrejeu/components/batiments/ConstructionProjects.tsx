import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { GameDate } from '@/components/maitrejeu/types/common';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { gameToStringOrDate } from '@/utils/gameDate-helpers';

interface ConstructionProject {
  id: string;
  name: string;
  type: string;
  startDate: GameDate;
  endDate: GameDate;
  cost: number;
  description: string;
  status: 'planned' | 'inProgress' | 'completed' | 'delayed';
}

export const ConstructionProjects: React.FC = () => {
  const [projects, setProjects] = useState<ConstructionProject[]>([
    {
      id: "cp-1",
      name: "Construction du Colisée",
      type: "Amphithéâtre",
      startDate: { year: 72, season: "Aestas" },
      endDate: { year: 80, season: "Aestas" },
      cost: 100000,
      description: "Construction du plus grand amphithéâtre de Rome.",
      status: "inProgress"
    },
    {
      id: "cp-2",
      name: "Agrandissement du Forum Romain",
      type: "Infrastructure",
      startDate: { year: 75, season: "Ver" },
      endDate: { year: 78, season: "Autumnus" },
      cost: 50000,
      description: "Agrandissement et rénovation du Forum Romain.",
      status: "completed"
    }
  ]);
  
  const [open, setOpen] = useState(false);
  const [newProject, setNewProject] = useState<Omit<ConstructionProject, 'id' | 'status'>>({
    name: '',
    type: '',
    startDate: { year: new Date().getFullYear(), season: 'Ver' },
    endDate: { year: new Date().getFullYear(), season: 'Ver' },
    cost: 0,
    description: ''
  });
  
  const { addEconomieRecord } = useMaitreJeu();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleDateChange = (name: 'startDate' | 'endDate', date: GameDate) => {
    setNewProject(prev => ({
      ...prev,
      [name]: date
    }));
  };
  
  const addProject = () => {
    const newId = `cp-${Date.now()}`;
    const newProjectWithId: ConstructionProject = {
      ...newProject,
      id: newId,
      status: 'planned'
    };
    
    setProjects(prev => [...prev, newProjectWithId]);
    setOpen(false);
    
    // Enregistrer la dépense dans l'économie
    addEconomieRecord({
      amount: -newProject.cost,
      description: `Construction: ${newProject.name}`,
      category: "Travaux Publics",
      type: 'expense',
      date: new Date().toISOString(),
      source: 'Gouvernement',
      approved: true
    });
  };

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(newProject.startDate.year, 2, 1),
    to: new Date(newProject.endDate.year, 2, 1),
  })

  return (
    <Card className="space-y-4">
      <CardHeader>
        <CardTitle>Projets de Construction</CardTitle>
        <CardDescription>
          Gérez les projets de construction en cours et à venir dans la ville.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Projet</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Début</TableHead>
              <TableHead>Fin</TableHead>
              <TableHead>Coût</TableHead>
              <TableHead>État</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {projects.map(project => {
              const startDate = gameToStringOrDate(project.startDate);
              const endDate = gameToStringOrDate(project.endDate);
              
              return (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>{project.type}</TableCell>
                  <TableCell>{startDate.toLocaleString()}</TableCell>
                  <TableCell>{endDate.toLocaleString()}</TableCell>
                  <TableCell>{project.cost}</TableCell>
                  <TableCell>{project.status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="ml-4">
            <Plus className="h-4 w-4 mr-2" />
            Nouveau Projet
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ajouter un Projet</DialogTitle>
            <DialogDescription>
              Ajoutez un nouveau projet de construction à la ville.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input 
                type="text" 
                id="name" 
                name="name"
                value={newProject.name}
                onChange={handleInputChange}
                className="col-span-3" 
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Input 
                type="text" 
                id="type" 
                name="type"
                value={newProject.type}
                onChange={handleInputChange}
                className="col-span-3" 
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cost" className="text-right">
                Coût
              </Label>
              <Input 
                type="number" 
                id="cost" 
                name="cost"
                value={newProject.cost}
                onChange={(e) => {
                  if (!isNaN(Number(e.target.value))) {
                    handleInputChange(e);
                  }
                }}
                className="col-span-3" 
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right mt-2">
                Description
              </Label>
              <Textarea 
                id="description" 
                name="description"
                value={newProject.description}
                onChange={handleInputChange}
                className="col-span-3" 
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dates" className="text-right">
                Dates
              </Label>
              <Popover className="col-span-3">
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[300px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    {date?.from ? (
                      date.to ? (
                        `${format(date.from, "LLL dd, y")} - ${format(
                          date.to,
                          "LLL dd, y"
                        )}`
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Choisir une date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <Calendar
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={(dateRange) => {
                      setDate(dateRange)
                      if (dateRange?.from) {
                        handleDateChange('startDate', {
                          year: dateRange.from.getFullYear(),
                          season: 'Ver'
                        })
                      }
                      if (dateRange?.to) {
                        handleDateChange('endDate', {
                          year: dateRange.to.getFullYear(),
                          season: 'Ver'
                        })
                      }
                    }}
                    numberOfMonths={2}
                    pagedNavigation
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" onClick={addProject}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
