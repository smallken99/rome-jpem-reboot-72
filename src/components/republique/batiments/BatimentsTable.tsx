import React from 'react';
import { PublicBuilding, ConstructionProject } from './hooks/useBatimentsPublics';
import { BuildingsTable } from './components/BuildingsTable';
import { ProjectsTable } from './components/ProjectsTable';

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
  if (type === 'buildings') {
    return (
      <BuildingsTable
        buildings={buildings}
        onViewDetails={onViewDetails}
        onMaintain={onMaintain}
      />
    );
  }
  
  // Projects table
  return (
    <ProjectsTable
      projects={projects}
      onViewDetails={onViewDetails}
      onApprove={onApprove}
      onAdvance={onAdvance}
    />
  );
};
