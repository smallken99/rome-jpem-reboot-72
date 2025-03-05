
import React from 'react';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { ArrowLeft } from 'lucide-react';

export const PreceptorNotFound: React.FC = () => {
  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-medium mb-4">Précepteur non trouvé</h2>
      <ActionButton 
        label="Retour aux précepteurs" 
        to="/famille/education/preceptors"
        icon={<ArrowLeft className="h-4 w-4" />}
      />
    </div>
  );
};
