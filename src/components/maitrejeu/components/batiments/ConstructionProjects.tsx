
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Plus, CheckCircle2, XCircle, Play, Pause } from 'lucide-react';
import { toast } from 'sonner';
import { GameDate } from '../../types/common';

// Mock data
const mockProjects = [
  {
    id: 'proj-1',
    buildingName: 'Nouveau Forum',
    buildingType: 'forum',
    location: 'Centre-ville',
    totalCost: 50000,
    expectedCompletionYear: 707,
    expectedCompletionSeason: 'Ver',
    startDate: { year: 705, season: 'Ver' },
    progress: 25,
    responsible: 'Quintus Fabius',
    approved: true,
    sponsors: ['Marcus Aurelius', 'Lucius Verus']
  },
  {
    id: 'proj-2',
    buildingName: 'Aqueduc Clodia',
    buildingType: 'aqueduc',
    location: 'Nord de Rome',
    totalCost: 30000,
    expectedCompletionYear: 708,
    expectedCompletionSeason: 'Aestas',
    startDate: { year: 706, season: 'Hiems' },
    progress: 10,
    responsible: 'Marcus Agrippa',
    approved: false,
    sponsors: ['Claudius Nero']
  },
  {
    id: 'proj-3',
    buildingName: 'Temple de Vénus',
    buildingType: 'temple',
    location: 'Forum Boarium',
    totalCost: 20000,
    expectedCompletionYear: 707,
    expectedCompletionSeason: 'Autumnus',
    startDate: { year: 706, season: 'Ver' },
    progress: 60,
    responsible: 'Publius Cornelius',
    approved: true,
    sponsors: ['Julia Augusta', 'Livia Drusilla']
  }
];

interface ConstructionProjectsProps {
  currentYear: number;
  currentSeason: string;
}

export const ConstructionProjects: React.FC<ConstructionProjectsProps> = ({
  currentYear,
  currentSeason
}) => {
  const [projects, setProjects] = useState(mockProjects);

  const handleApproveProject = (id: string) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === id ? { ...project, approved: true } : project
      )
    );
    toast.success('Projet approuvé !');
  };

  const handleAdvanceProgress = (id: string, amount: number) => {
    setProjects(prev => 
      prev.map(project => {
        if (project.id === id) {
          const newProgress = Math.min(100, project.progress + amount);
          if (newProgress === 100) {
            toast.success(`Construction de ${project.buildingName} terminée !`);
          } else {
            toast.success(`Progression de ${project.buildingName} mise à jour.`);
          }
          return { ...project, progress: newProgress };
        }
        return project;
      })
    );
  };

  const handleNewProject = () => {
    toast.info('Formulaire de nouveau projet ouvert');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Projets de construction en cours</h3>
        <Button onClick={handleNewProject} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nouveau projet
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Approuvé</TableHead>
              <TableHead>Projet</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Coût</TableHead>
              <TableHead>Progression</TableHead>
              <TableHead>Fin estimée</TableHead>
              <TableHead>Responsable</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>
                  <Checkbox checked={project.approved} disabled />
                </TableCell>
                <TableCell className="font-medium">
                  {project.buildingName}
                  <div className="text-xs text-muted-foreground">{project.location}</div>
                </TableCell>
                <TableCell className="capitalize">{project.buildingType}</TableCell>
                <TableCell>{project.totalCost} deniers</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={project.progress} className="w-[80px]" />
                    <span className="text-xs">{project.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  {project.expectedCompletionYear} ({project.expectedCompletionSeason})
                </TableCell>
                <TableCell>{project.responsible}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {!project.approved ? (
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleApproveProject(project.id)}
                        title="Approuver"
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleAdvanceProgress(project.id, 10)}
                        title="Avancer la construction"
                        disabled={project.progress >= 100}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="outline" size="icon" title="Pauser">
                      <Pause className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" title="Annuler">
                      <XCircle className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="text-sm text-muted-foreground border-t pt-4 mt-4">
        <p>Date actuelle: An {currentYear}, {currentSeason}</p>
        <p>Les projets de construction avancent automatiquement à chaque saison, mais vous pouvez accélérer ou ralentir leur progression manuellement.</p>
      </div>
    </div>
  );
};
