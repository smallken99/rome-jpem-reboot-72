
import React from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { ActionButton } from '@/components/ui-custom/ActionButton';

export const ChildNotFound: React.FC = () => {
  return (
    <div className="p-6 text-center">
      <div className="flex flex-col items-center justify-center gap-4 py-8">
        <AlertTriangle className="h-12 w-12 text-amber-500" />
        <h2 className="text-xl font-medium">Enfant non trouvé</h2>
        <p className="text-muted-foreground mb-4">
          L'enfant que vous recherchez n'existe pas ou n'est pas accessible.
        </p>
        
        <div className="flex gap-3">
          <ActionButton 
            label="Retour à l'éducation" 
            to="/famille/education"
            icon={<ArrowLeft className="h-4 w-4" />}
            variant="outline"
          />
          <ActionButton 
            label="Retour à la famille" 
            to="/famille"
            variant="default"
          />
        </div>
      </div>
    </div>
  );
};
