
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Play, Pause, AlertTriangle } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  type: string;
  location: string;
  startYear: number;
  startSeason: string;
  estimatedEndYear: number;
  estimatedEndSeason: string;
  progress: number;
  status: 'planning' | 'in_progress' | 'paused' | 'delayed';
  cost: {
    estimated: number;
    spent: number;
    remaining: number;
  };
  issues: string[];
}

interface ConstructionProjectsProps {
  currentYear: number;
  currentSeason: string;
}

export const ConstructionProjects: React.FC<ConstructionProjectsProps> = ({
  currentYear,
  currentSeason
}) => {
  // Données fictives pour la démonstration
  const projects: Project[] = [
    {
      id: '1',
      name: 'Nouvelle Basilique',
      type: 'Basilique',
      location: 'Forum Romanum',
      startYear: 720,
      startSeason: 'Ver',
      estimatedEndYear: 722,
      estimatedEndSeason: 'Aestas',
      progress: 25,
      status: 'in_progress',
      cost: {
        estimated: 100000,
        spent: 30000,
        remaining: 70000
      },
      issues: []
    },
    {
      id: '2',
      name: 'Rénovation du Temple de Vesta',
      type: 'Temple',
      location: 'Forum Romanum',
      startYear: 719,
      startSeason: 'Hiems',
      estimatedEndYear: 721,
      estimatedEndSeason: 'Ver',
      progress: 75,
      status: 'delayed',
      cost: {
        estimated: 50000,
        spent: 40000,
        remaining: 10000
      },
      issues: ['Problèmes structurels découverts', 'Matériaux en retard']
    },
    {
      id: '3',
      name: 'Extension de l\'Aqueduc',
      type: 'Aqueduc',
      location: 'Colline Quirinal',
      startYear: 721,
      startSeason: 'Ver',
      estimatedEndYear: 723,
      estimatedEndSeason: 'Hiems',
      progress: 5,
      status: 'planning',
      cost: {
        estimated: 200000,
        spent: 10000,
        remaining: 190000
      },
      issues: []
    }
  ];

  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'planning':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Planification</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-green-100 text-green-800">En cours</Badge>;
      case 'paused':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">En pause</Badge>;
      case 'delayed':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Retardé</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  const handleEdit = (id: string) => {
    console.log('Editing project with ID:', id);
    // Logique d'édition à implémenter
  };

  const handleToggleStatus = (id: string, currentStatus: Project['status']) => {
    console.log('Toggling status for project with ID:', id);
    // Logique de changement de statut à implémenter
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Projets de construction</h2>
        <Button variant="outline">+ Nouveau projet</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map(project => (
          <Card key={project.id} className="overflow-hidden">
            <div className="bg-slate-100 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">{project.type} - {project.location}</p>
                </div>
                {getStatusBadge(project.status)}
              </div>
            </div>
            <CardContent className="p-4 space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progression: {project.progress}%</span>
                  <span>{project.cost.spent} / {project.cost.estimated} as</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              
              <div className="text-sm grid grid-cols-2 gap-2">
                <div>
                  <p className="text-muted-foreground">Début</p>
                  <p>{project.startYear} AUC, {project.startSeason}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Fin estimée</p>
                  <p>{project.estimatedEndYear} AUC, {project.estimatedEndSeason}</p>
                </div>
              </div>
              
              {project.issues.length > 0 && (
                <div className="border-t pt-2">
                  <div className="flex items-center text-amber-600 mb-1">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">Problèmes à résoudre</span>
                  </div>
                  <ul className="text-sm space-y-1">
                    {project.issues.map((issue, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex space-x-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleEdit(project.id)}
                >
                  <Pencil className="h-4 w-4 mr-1" /> Détails
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleToggleStatus(project.id, project.status)}
                >
                  {project.status === 'in_progress' ? (
                    <><Pause className="h-4 w-4 mr-1" /> Pause</>
                  ) : (
                    <><Play className="h-4 w-4 mr-1" /> Reprendre</>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
