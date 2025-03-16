
import React from 'react';
import { PublicBuilding, ConstructionProject } from './hooks/useBatimentsPublics';
import { BuildingsTable } from './components/BuildingsTable';
import { ProjectsTable } from './components/ProjectsTable';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface BatimentsTableProps {
  buildings?: PublicBuilding[];
  projects?: ConstructionProject[];
  type: 'buildings' | 'projects';
  onViewDetails?: (item: PublicBuilding | ConstructionProject) => void;
  onMaintain?: (buildingId: string) => void;
  onApprove?: (projectId: string) => void;
  onAdvance?: (projectId: string) => void;
}

export const BatimentsTable: React.FC<BatimentsTableProps> = ({
  buildings = [],
  projects = [],
  type,
  onViewDetails,
  onMaintain,
  onApprove,
  onAdvance
}) => {
  // Fonction pour gérer la maintenance standard rapide
  const handleQuickMaintain = (buildingId: string) => {
    if (onMaintain) {
      onMaintain(buildingId);
    } else {
      toast.info("Fonctionnalité en cours de développement");
    }
  };
  
  // Fonction pour approuver rapidement un projet
  const handleQuickApprove = (projectId: string) => {
    if (onApprove) {
      onApprove(projectId);
      toast.success("Projet approuvé");
    } else {
      toast.info("Fonctionnalité en cours de développement");
    }
  };
  
  // Fonction pour faire avancer rapidement un projet
  const handleQuickAdvance = (projectId: string) => {
    if (onAdvance) {
      onAdvance(projectId);
      toast.success("Construction avancée");
    } else {
      toast.info("Fonctionnalité en cours de développement");
    }
  };
  
  const renderActionButtons = () => {
    if (type === 'buildings' && buildings.length > 0) {
      return (
        <div className="flex justify-end mb-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              buildings.forEach(b => handleQuickMaintain(b.id));
              toast.success("Maintenance appliquée à tous les bâtiments");
            }}
          >
            Maintenance globale
          </Button>
        </div>
      );
    }
    
    if (type === 'projects' && projects.length > 0) {
      return (
        <div className="flex justify-end gap-2 mb-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              const unapprovedProjects = projects.filter(p => !p.approved);
              if (unapprovedProjects.length > 0) {
                unapprovedProjects.forEach(p => handleQuickApprove(p.id));
                toast.success(`${unapprovedProjects.length} projet(s) approuvé(s)`);
              } else {
                toast.info("Tous les projets sont déjà approuvés");
              }
            }}
          >
            Approuver tous les projets
          </Button>
          
          <Button 
            variant="default" 
            size="sm"
            onClick={() => {
              const approvedProjects = projects.filter(p => p.approved && p.progress < 100);
              if (approvedProjects.length > 0) {
                approvedProjects.forEach(p => handleQuickAdvance(p.id));
                toast.success(`${approvedProjects.length} projet(s) avancé(s)`);
              } else {
                toast.info("Aucun projet en cours n'est disponible");
              }
            }}
          >
            Avancer toutes les constructions
          </Button>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div>
      {renderActionButtons()}
      
      {type === 'buildings' ? (
        <BuildingsTable
          buildings={buildings}
          onViewDetails={onViewDetails}
          onMaintain={onMaintain}
        />
      ) : (
        <ProjectsTable
          projects={projects}
          onViewDetails={onViewDetails}
          onApprove={onApprove}
          onAdvance={onAdvance}
        />
      )}
    </div>
  );
};
