
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ActionButton } from '@/components/ui-custom/ActionButton';

export const ChildNotFound: React.FC = () => {
  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-medium mb-4">Enfant non trouvé</h2>
      <ActionButton 
        label="Retour à l'éducation" 
        to="/famille/education"
        icon={<ArrowLeft className="h-4 w-4" />}
      />
    </div>
  );
};
