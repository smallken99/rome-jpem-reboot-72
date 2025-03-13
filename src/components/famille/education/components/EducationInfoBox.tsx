
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export const EducationInfoBox: React.FC = () => {
  return (
    <Alert className="mb-6 bg-blue-50 text-blue-800 border-blue-200">
      <Info className="h-4 w-4" />
      <AlertDescription>
        L'éducation des enfants est cruciale pour leur future position dans la société romaine. 
        Choisissez judicieusement le type d'éducation et le précepteur pour maximiser leurs chances de succès.
      </AlertDescription>
    </Alert>
  );
};
