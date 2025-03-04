
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ActionButton } from '@/components/ui-custom/ActionButton';

interface PageHeadingProps {
  childName: string;
}

export const PageHeading: React.FC<PageHeadingProps> = ({ childName }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-cinzel font-medium">Éducation de {childName}</h2>
      <ActionButton 
        label="Retour à l'éducation" 
        to="/famille/education"
        variant="outline"
        icon={<ArrowLeft className="h-4 w-4" />}
      />
    </div>
  );
};
