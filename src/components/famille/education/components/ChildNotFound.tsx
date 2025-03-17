
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, ChevronLeft } from 'lucide-react';

interface ChildNotFoundProps {
  childId?: string;
  onBack: () => void;
}

export const ChildNotFound: React.FC<ChildNotFoundProps> = ({ childId, onBack }) => {
  return (
    <Card>
      <CardContent className="pt-6 pb-4">
        <div className="flex flex-col items-center justify-center space-y-4 py-8">
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          
          <div className="text-center space-y-2">
            <h3 className="text-lg font-medium">Enfant non trouvé</h3>
            <p className="text-muted-foreground max-w-md">
              {childId 
                ? `L'enfant avec l'identifiant "${childId}" n'existe pas ou n'est plus disponible.`
                : "Aucun enfant trouvé avec cet identifiant."}
            </p>
          </div>
          
          <Button 
            variant="outline" 
            onClick={onBack}
            className="mt-4 flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Retour à la liste</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
