
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PropertyNotFound: React.FC = () => {
  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[400px] text-center">
      <AlertTriangle className="h-16 w-16 text-amber-500 mb-4" />
      <h2 className="text-2xl font-cinzel font-bold mb-2">Propriété non trouvée</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        La propriété demandée n'existe pas ou vous n'avez pas les permissions nécessaires pour y accéder.
      </p>
      <Button asChild>
        <Link to="/patrimoine/proprietes" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Retour à la liste des propriétés
        </Link>
      </Button>
    </div>
  );
};
