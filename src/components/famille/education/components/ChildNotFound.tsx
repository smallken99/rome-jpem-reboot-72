
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export interface ChildNotFoundProps {
  childId?: string;
  onBack: () => void;
}

export const ChildNotFound: React.FC<ChildNotFoundProps> = ({ childId, onBack }) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Enfant introuvable</h2>
        <p className="text-muted-foreground text-center mb-6">
          {childId 
            ? `Nous n'avons pas pu trouver l'enfant avec l'identifiant "${childId}".`
            : "Nous n'avons pas pu trouver l'enfant demandé."}
        </p>
        <Button onClick={onBack}>Retourner à la liste</Button>
      </CardContent>
    </Card>
  );
};
