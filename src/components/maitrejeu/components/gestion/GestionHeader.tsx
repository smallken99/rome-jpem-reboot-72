
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface GestionHeaderProps {
  title: string;
  description?: string;
  onAddNew?: () => void;
  addButtonLabel?: string;
  showAddButton?: boolean;
}

export const GestionHeader: React.FC<GestionHeaderProps> = ({
  title,
  description,
  onAddNew,
  addButtonLabel = "Ajouter",
  showAddButton = true
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      
      {showAddButton && onAddNew && (
        <Button onClick={onAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          {addButtonLabel}
        </Button>
      )}
    </div>
  );
};
