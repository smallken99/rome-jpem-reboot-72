
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { ConstructionProject } from '../hooks/useBatimentsPublics';
import { BatimentsTable } from '../BatimentsTable';

interface ProjectsTabContentProps {
  projects: ConstructionProject[];
  onViewDetails: (project: ConstructionProject) => void;
  onApprove: (projectId: string) => void;
  onAdvance: (projectId: string) => void;
}

export const ProjectsTabContent: React.FC<ProjectsTabContentProps> = ({
  projects,
  onViewDetails,
  onApprove,
  onAdvance
}) => {
  return (
    <RomanCard>
      <RomanCard.Header>
        <h2 className="font-cinzel text-lg">Projets de construction en cours</h2>
      </RomanCard.Header>
      <RomanCard.Content>
        <p className="text-muted-foreground mb-4">
          Les projets de construction représentent l'avenir de Rome. En tant que magistrat, 
          vous pouvez proposer, approuver et superviser ces projets pour le bien de la République.
        </p>
        <BatimentsTable 
          projects={projects}
          type="projects"
          onViewDetails={onViewDetails}
          onApprove={onApprove}
          onAdvance={onAdvance}
        />
      </RomanCard.Content>
    </RomanCard>
  );
};
