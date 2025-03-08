
import { useState } from 'react';
import { toast } from 'sonner';
import { ConstructionProject } from '../types/buildingTypes';
import { mockConstructionProjects } from '../data/mockBuildingsData';

export const useConstructionProjects = () => {
  const [constructionProjects, setConstructionProjects] = useState<ConstructionProject[]>(mockConstructionProjects);

  // Démarrer un nouveau projet de construction
  const startConstructionProject = (project: Omit<ConstructionProject, 'id' | 'progress' | 'approved'>) => {
    const currentYear = 705; // À remplacer par l'année actuelle du jeu
    const newProject: ConstructionProject = {
      ...project,
      id: `project-${Date.now()}`,
      progress: 0,
      startedYear: currentYear,
      expectedCompletionYear: currentYear + project.duration,
      approved: false
    };
    
    setConstructionProjects(prev => [...prev, newProject]);
    toast.success(`Projet de construction proposé: ${project.name}`);
    return newProject;
  };
  
  // Approuver un projet de construction
  const approveConstructionProject = (projectId: string) => {
    setConstructionProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        return { ...project, approved: true };
      }
      return project;
    }));
    
    const project = constructionProjects.find(p => p.id === projectId);
    if (project) {
      toast.success(`Projet approuvé: ${project.name}`);
    }
  };
  
  // Faire progresser la construction d'un projet
  const advanceConstruction = (projectId: string, progressAmount: number) => {
    let completedProject: ConstructionProject | null = null;
    
    setConstructionProjects(prev => prev.map(project => {
      if (project.id !== projectId || !project.approved) return project;
      
      const newProgress = Math.min(100, project.progress + progressAmount);
      
      // Si le projet est terminé, le marquer comme tel
      if (newProgress >= 100) {
        completedProject = { ...project, progress: 100 };
      }
      
      return { ...project, progress: newProgress };
    }));
    
    return completedProject;
  };

  // Supprimer un projet de construction
  const removeConstructionProject = (projectId: string) => {
    setConstructionProjects(prev => prev.filter(project => project.id !== projectId));
  };

  return {
    constructionProjects,
    setConstructionProjects,
    startConstructionProject,
    approveConstructionProject,
    advanceConstruction,
    removeConstructionProject
  };
};
