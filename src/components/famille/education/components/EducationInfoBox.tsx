
import React from 'react';
import { BookOpen, GraduationCap, Info, Clock } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useEducation } from '../context/EducationContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const EducationInfoBox: React.FC = () => {
  const { children, preceptors, isLoading } = useEducation();
  const navigate = useNavigate();
  
  // Statistiques éducatives
  const childrenWithEducation = children.filter(child => child.educationType !== 'none');
  const hiredPreceptorsCount = preceptors.filter(p => !p.available).length;
  
  // Fonctions pour gérer les actions
  const handleAddPreceptor = () => {
    navigate('/famille/education?tab=preceptors');
  };
  
  const handleManageEducation = () => {
    if (children.length > 0) {
      if (childrenWithEducation.length > 0) {
        navigate(`/famille/education/child/${childrenWithEducation[0].id}`);
      } else {
        navigate(`/famille/education/child/${children[0].id}`);
      }
    }
  };
  
  return (
    <Alert className="bg-blue-50 border-blue-200 mt-4">
      <Info className="h-4 w-4 text-blue-500" />
      <AlertTitle className="text-blue-700 flex justify-between items-center">
        <span>Système d'éducation romaine</span>
        {isLoading && <Clock className="h-4 w-4 animate-spin text-blue-500" />}
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
        
        <div className="flex gap-2 mt-4">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white border-blue-200 text-blue-600 hover:bg-blue-50"
            onClick={handleAddPreceptor}
          >
            Engager un précepteur
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white border-blue-200 text-blue-600 hover:bg-blue-50"
            onClick={handleManageEducation}
            disabled={children.length === 0}
          >
            Gérer l'éducation
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};
