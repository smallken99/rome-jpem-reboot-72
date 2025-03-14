
import React from 'react';
import { EducationRecord } from '../types/educationTypes';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, Award, User } from 'lucide-react';

interface CurrentEducationStatusProps {
  education: EducationRecord;
}

export const CurrentEducationStatus: React.FC<CurrentEducationStatusProps> = ({ education }) => {
  const progress = (education.currentYear / education.totalYears) * 100;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'canceled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const getEducationTypeColor = (type: string) => {
    switch (type) {
      case 'military': return 'bg-red-100 text-red-800 border-red-200';
      case 'rhetoric': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'religious': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-wrap justify-between mb-4">
          <div className="flex items-center">
            <Badge className={getEducationTypeColor(education.pathType)}>
              {education.pathType === 'military' ? 'Militaire' : 
               education.pathType === 'rhetoric' ? 'Rhétorique' : 
               education.pathType === 'religious' ? 'Religieuse' : 
               education.pathType}
            </Badge>
          </div>
          <div className="flex items-center">
            <Badge className={getStatusColor(education.status)}>
              {education.status === 'in_progress' ? 'En cours' :
               education.status === 'completed' ? 'Terminée' :
               education.status === 'canceled' ? 'Abandonnée' :
               education.status}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-4 mb-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-2" />
              Progression globale
            </span>
            <span className="text-sm font-medium">
              Année {education.currentYear} sur {education.totalYears}
            </span>
          </div>
          
          <Progress value={progress} className="h-2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center text-sm text-muted-foreground">
                <Award className="w-4 h-4 mr-2" />
                Spécialités acquises
              </span>
              <span className="text-sm font-medium">
                {education.specialties.length}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="flex items-center text-sm text-muted-foreground">
                <User className="w-4 h-4 mr-2" />
                Début de l'éducation
              </span>
              <span className="text-sm font-medium">
                Année {education.startYear}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
