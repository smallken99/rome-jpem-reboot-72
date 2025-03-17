
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Info, Loader2 } from 'lucide-react';
import { useEducation } from '../context/EducationContext';

export const EducationInfoBox = () => {
  const { children, preceptors } = useEducation();
  const loading = false; // Fixed for now
  
  if (loading) {
    return (
      <Card className="mb-6">
        <CardContent className="p-4 flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
          <span>Chargement des données éducatives...</span>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="mb-6">
      <CardContent className="p-4 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm">
            <span className="font-medium">Information sur l'éducation romaine:</span> L'éducation est un aspect crucial de la société romaine.
            Vos enfants peuvent être formés dans divers domaines pour assurer leur succès futur.
          </p>
          <ul className="text-sm mt-2 space-y-1 text-muted-foreground">
            <li>• {children.filter(c => c.educationType !== 'none').length} enfant(s) en cours d'éducation</li>
            <li>• {preceptors.filter(p => p.available).length} précepteur(s) disponible(s)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
