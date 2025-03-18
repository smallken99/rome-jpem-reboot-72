
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Clock, GraduationCap, BookOpen, Trophy } from 'lucide-react';
import { useEducation } from '../context/EducationContext';
import { EducationType } from '../types/educationTypes';

export const EducationInfoBox: React.FC = () => {
  const { children, preceptors } = useEducation();
  
  // Déterminer le nombre d'enfants par statut d'éducation
  const childrenWithEducation = children.filter(child => child.educationType && child.educationType !== 'none');
  const childrenCompleted = children.filter(child => child.progress === 100);
  const childrenInProgress = childrenWithEducation.filter(child => child.progress && child.progress > 0 && child.progress < 100);
  
  // Statistiques sur les types d'éducation
  const educationTypes = childrenWithEducation.reduce((acc, child) => {
    const type = child.educationType as EducationType;
    if (type) {
      acc[type] = (acc[type] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  // Trouver le type d'éducation le plus populaire
  let mostPopularType = '';
  let mostPopularCount = 0;
  
  Object.entries(educationTypes).forEach(([type, count]) => {
    if (count > mostPopularCount) {
      mostPopularType = type;
      mostPopularCount = count;
    }
  });
  
  const getEducationTypeLabel = (type: string): string => {
    switch (type) {
      case 'military': return 'Militaire';
      case 'political': return 'Politique';
      case 'religious': return 'Religieuse';
      case 'philosophical': return 'Philosophique';
      default: return type;
    }
  };
  
  const getEducationIcon = (type: string) => {
    switch (type) {
      case 'military': return <Trophy className="h-6 w-6 text-amber-600" />;
      case 'political': return <BookOpen className="h-6 w-6 text-amber-600" />;
      case 'religious': return <GraduationCap className="h-6 w-6 text-amber-600" />;
      default: return <Lightbulb className="h-6 w-6 text-amber-600" />;
    }
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="pt-6">
          <div className="flex items-start">
            <div className="bg-amber-100 p-2 rounded-md mr-4">
              <Lightbulb className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-medium text-amber-800">Saviez-vous que?</h3>
              <p className="text-sm text-amber-700 mt-1">
                Dans la Rome antique, l'éducation des garçons patriciens suivait le cursus honorum, 
                les préparant aux fonctions politiques et militaires.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-md mr-4">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-blue-800">Temps d'apprentissage</h3>
              <p className="text-sm text-blue-700 mt-1">
                Une éducation complète prend généralement 4 ans. {childrenInProgress.length} enfant(s) en cours de formation.
              </p>
              {preceptors.length > 0 && (
                <p className="text-xs text-blue-700/80 mt-1">
                  {preceptors.filter(p => !p.available).length} précepteur(s) assigné(s)
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-start">
            <div className="bg-green-100 p-2 rounded-md mr-4">
              {mostPopularType ? 
                getEducationIcon(mostPopularType) : 
                <GraduationCap className="h-6 w-6 text-green-600" />
              }
            </div>
            <div>
              <h3 className="font-medium text-green-800">Progrès</h3>
              <p className="text-sm text-green-700 mt-1">
                {childrenCompleted.length} enfant(s) ont terminé leur éducation.
                {childrenWithEducation.length === 0 ? 
                  " Aucun enfant n'est actuellement en formation." : 
                  mostPopularType ? 
                    ` Éducation ${getEducationTypeLabel(mostPopularType)} populaire.` : 
                    ""
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
