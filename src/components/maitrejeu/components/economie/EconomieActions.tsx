
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, FileText, LineChart, RefreshCw } from 'lucide-react';

interface EconomieActionsProps {
  onAddTransaction: () => void;
  onGenerateReport: () => void;
  onCalculateProjections: () => void;
  onRefreshData: () => void;
}

export const EconomieActions: React.FC<EconomieActionsProps> = ({
  onAddTransaction,
  onGenerateReport,
  onCalculateProjections,
  onRefreshData
}) => {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <Button onClick={onAddTransaction}>
        <Plus className="h-4 w-4 mr-1.5" />
        Nouvelle Transaction
      </Button>
      
      <Button variant="outline" onClick={onGenerateReport}>
        <FileText className="h-4 w-4 mr-1.5" />
        Générer un Rapport
      </Button>
      
      <Button variant="outline" onClick={onCalculateProjections}>
        <LineChart className="h-4 w-4 mr-1.5" />
        Projections
      </Button>
      
      <Button variant="ghost" onClick={onRefreshData}>
        <RefreshCw className="h-4 w-4 mr-1.5" />
        Actualiser
      </Button>
    </div>
  );
};
