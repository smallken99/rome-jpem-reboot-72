
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { GestionHeader } from './GestionHeader';

interface GestionContainerProps {
  title: string;
  description?: string;
  onAddNew?: () => void;
  addButtonLabel?: string;
  showAddButton?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const GestionContainer: React.FC<GestionContainerProps> = ({
  title,
  description,
  onAddNew,
  addButtonLabel,
  showAddButton = true,
  children,
  className = ""
}) => {
  return (
    <div className={`space-y-6 p-6 ${className}`}>
      <GestionHeader
        title={title}
        description={description}
        onAddNew={onAddNew}
        addButtonLabel={addButtonLabel}
        showAddButton={showAddButton}
      />
      
      <Card>
        <CardContent className="p-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );
};
