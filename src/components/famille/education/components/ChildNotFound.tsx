
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { ChildNotFoundProps } from '../types/educationTypes';

export const ChildNotFound: React.FC<ChildNotFoundProps> = ({ onBack }) => {
  return (
    <Card>
      <CardContent className="pt-6 flex flex-col items-center justify-center space-y-4 py-12">
        <AlertTriangle className="h-12 w-12 text-amber-500" />
        <h2 className="text-xl font-semibold">Enfant non trouvé</h2>
        <p className="text-muted-foreground text-center">
          L'enfant que vous recherchez n'a pas été trouvé dans la base de données.
        </p>
        <Button onClick={onBack} variant="default">
          Retour à la liste
        </Button>
      </CardContent>
    </Card>
  );
};
