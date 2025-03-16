
import React from 'react';
import { BookOpen, GraduationCap, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useEducation } from '../context/EducationContext';

export const EducationInfoBox: React.FC = () => {
  const { children, preceptors } = useEducation();
  
  // Statistiques éducatives
  const childrenWithEducation = children.filter(child => child.educationType !== 'none');
  const hiredPreceptorsCount = preceptors.filter(p => !p.available).length;
  
  return (
    <Alert className="bg-blue-50 border-blue-200 mt-4">
      <Info className="h-4 w-4 text-blue-500" />
      <AlertTitle className="text-blue-700">
        Système d'éducation romaine
      </AlertTitle>
      <AlertDescription className="text-blue-600">
        <p className="mb-2">
          L'éducation de vos enfants est cruciale pour assurer l'avenir et le prestige de votre famille.
        </p>
        
        <div className="flex flex-wrap gap-x-8 gap-y-2 mt-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-600" />
            <span>{childrenWithEducation.length} enfant(s) en éducation</span>
          </div>
          
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-blue-600" />
            <span>{hiredPreceptorsCount} précepteur(s) engagé(s)</span>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
};
