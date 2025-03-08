
import React from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Button } from '@/components/ui/button';
import { CirclePlus, RefreshCw, FileText } from 'lucide-react';

interface BatimentsHeaderProps {
  onNewProject: () => void;
}

export const BatimentsHeader: React.FC<BatimentsHeaderProps> = ({ onNewProject }) => {
  return (
    <div className="flex justify-between items-center">
      <PageHeader 
        title="Bâtiments Publics" 
        subtitle="Gestion des constructions et infrastructures publiques de Rome" 
      />
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onNewProject}
          className="roman-btn-outline"
        >
          <CirclePlus className="h-4 w-4 mr-1" />
          Nouveau projet
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="roman-btn-outline"
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Mettre à jour
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="roman-btn-outline"
        >
          <FileText className="h-4 w-4 mr-1" />
          Rapport
        </Button>
      </div>
    </div>
  );
};
