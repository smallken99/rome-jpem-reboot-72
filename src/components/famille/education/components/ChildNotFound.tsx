
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, AlertTriangle } from 'lucide-react';

interface ChildNotFoundProps {
  onBack: () => void;
  childId?: string;
}

export const ChildNotFound: React.FC<ChildNotFoundProps> = ({ onBack, childId }) => {
  return (
    <Card>
      <CardContent className="pt-6 pb-8 flex flex-col items-center justify-center">
        <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Enfant non trouvé</h2>
        <p className="text-muted-foreground text-center mb-4">
          L'enfant avec l'identifiant "{childId}" n'a pas été trouvé dans la liste des enfants disponibles.
        </p>
        <Button onClick={onBack} className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          <span>Retour à la liste</span>
        </Button>
      </CardContent>
    </Card>
  );
};
