
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, ChevronLeft } from 'lucide-react';

interface ChildNotFoundProps {
  childId?: string;
  onBack: () => void;
}

export const ChildNotFound: React.FC<ChildNotFoundProps> = ({ childId, onBack }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          Enfant introuvable
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-6">
        <p className="text-muted-foreground mb-6">
          L'enfant avec l'identifiant "{childId}" n'a pas été trouvé dans votre famille.
          Il est possible qu'il ait été retiré ou que l'identifiant soit incorrect.
        </p>
        
        <Button onClick={onBack} className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Retourner à la liste des enfants
        </Button>
      </CardContent>
    </Card>
  );
};
