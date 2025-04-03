
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Plus, Calendar, Hammer, CheckCircle } from 'lucide-react';
import { useBuildingManagement } from '../../hooks/useBuildingManagement';
import { ConstructionProject, BuildingType } from '../../types/batiments';
import { Season } from '@/utils/types/gameDate';

interface ConstructionProjectsProps {
  currentYear: number;
  currentSeason: Season;
}

export const ConstructionProjects: React.FC<ConstructionProjectsProps> = ({ currentYear, currentSeason }) => {
  const { constructionProjects, addConstructionProject, updateConstructionProgress } = useBuildingManagement();
  
  const addNewProject = () => {
    const startDate = new Date();
    const estimatedCompletion = new Date();
    estimatedCompletion.setFullYear(currentYear + 1);
    
    // Create construction project with all required properties
    const projectData = {
      name: "Nouveau Temple de Jupiter",
      type: BuildingType.TEMPLE,
      location: "Capitole",
      estimatedCost: 50000,
      cost: 50000, // Add required cost
      startDate,
      estimatedCompletion, // Add required estimatedCompletion
      expectedCompletionYear: currentYear + 1,
      status: 'planned' as const,
      description: "Construction d'un nouveau temple dédié à Jupiter",
      supervisor: "Marcus Agrippa",
      workers: 50, // Add required workers
      slaves: 20, // Add required slaves
    };
    
    const newProjectId = addConstructionProject(projectData);
    console.log(`Nouveau projet ajouté: ${newProjectId}`);
    
    // Simulate progress
    simulateConstructionProgress(newProjectId);
  };
  
  const simulateConstructionProgress = (projectId: string) => {
    const interval = setInterval(() => {
      updateConstructionProgress(projectId, 10);
      
      // Check if project is complete or at 100%
      const project = constructionProjects.find(p => p.id === projectId);
      if (project && project.progress >= 100) {
        clearInterval(interval);
      }
    }, 2000);
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Projets de Construction</h2>
        <Button onClick={addNewProject} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nouveau projet
        </Button>
      </div>
      
      {constructionProjects.length === 0 ? (
        <div className="text-center p-8">
          <h3 className="text-lg font-medium mb-2">Aucun projet en cours</h3>
          <p className="text-muted-foreground mb-4">
            Commencez par ajouter un nouveau projet de construction
          </p>
          <Button onClick={addNewProject}>Ajouter un projet</Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {constructionProjects.map(project => (
            <ConstructionProjectCard 
              key={project.id} 
              project={project}
              currentYear={currentYear}
              onProgressUpdate={(progress) => updateConstructionProgress(project.id, progress)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface ConstructionProjectCardProps {
  project: ConstructionProject;
  currentYear: number;
  onProgressUpdate: (progress: number) => void;
}

const ConstructionProjectCard: React.FC<ConstructionProjectCardProps> = ({ project, currentYear, onProgressUpdate }) => {
  const getRemainingTime = () => {
    const estimatedCompletion = project.expectedCompletionYear || (currentYear + 1);
    const yearsRemaining = estimatedCompletion - currentYear;
    return yearsRemaining <= 0 ? "Achèvement imminent" : `${yearsRemaining} an${yearsRemaining > 1 ? 's' : ''} restant${yearsRemaining > 1 ? 's' : ''}`;
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{project.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span>Type: {project.type}</span>
          <span>Emplacement: {project.location}</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Progression</span>
            <span className="text-sm">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Début: {new Date(project.startDate).getFullYear()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Fin estimée: {getRemainingTime()}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Hammer className="h-4 w-4 text-muted-foreground" />
          <span>Superviseur: {project.supervisor || "Non assigné"}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
          <span>Statut: {
            project.status === 'planned' ? 'Planifié' :
            project.status === 'in_progress' ? 'En cours' :
            project.status === 'completed' ? 'Terminé' : 'Abandonné'
          }</span>
        </div>
        
        <div className="pt-2">
          <Button 
            onClick={() => onProgressUpdate(10)}
            disabled={project.progress >= 100 || project.status === 'completed' || project.status === 'abandoned'}
          >
            Avancer les travaux (+10%)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
