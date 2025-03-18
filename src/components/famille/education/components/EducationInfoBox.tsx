
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Clock, GraduationCap } from 'lucide-react';
import { useEducation } from '../context/EducationContext';

export const EducationInfoBox: React.FC = () => {
  const { children } = useEducation();
  
  // Déterminer le nombre d'enfants par statut d'éducation
  const childrenWithEducation = children.filter(child => child.educationType && child.educationType !== 'none');
  const childrenCompleted = children.filter(child => child.progress === 100);
  const childrenInProgress = childrenWithEducation.filter(child => child.progress && child.progress > 0 && child.progress < 100);
  
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
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6">
          <div className="flex items-start">
            <div className="bg-green-100 p-2 rounded-md mr-4">
              <GraduationCap className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-green-800">Progrès</h3>
              <p className="text-sm text-green-700 mt-1">
                {childrenCompleted.length} enfant(s) ont terminé leur éducation.
                {childrenWithEducation.length === 0 ? " Aucun enfant n'est actuellement en formation." : ""}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
