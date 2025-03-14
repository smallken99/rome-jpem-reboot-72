
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, ChevronLeft } from 'lucide-react';
import { ChildNotFoundProps } from '../types/educationTypes';

export const ChildNotFound: React.FC<ChildNotFoundProps> = ({ onBack }) => {
  return (
    <Card>
      <CardHeader className="bg-red-50 text-red-700 flex flex-row items-center gap-2">
        <AlertCircle className="h-5 w-5" />
        <h3 className="text-lg font-medium">Enfant non trouvé</h3>
      </CardHeader>
      
      <CardContent className="py-6">
        <div className="text-center space-y-4">
          <p>L'enfant demandé n'a pas été trouvé dans votre famille.</p>
          <p className="text-muted-foreground">
            Cela peut être dû à un lien incorrect ou à la suppression de l'enfant.
          </p>
          
          <Button onClick={onBack} className="mt-4 flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Retour à la liste des enfants
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
