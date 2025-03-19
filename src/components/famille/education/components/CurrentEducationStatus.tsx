
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { EducationRecord, ChildEducation } from '../types/educationTypes';

interface CurrentEducationStatusProps {
  education: EducationRecord;
}

export const CurrentEducationStatus: React.FC<CurrentEducationStatusProps> = ({ education }) => {
  // Helper to get color based on status
  const getStatusColor = () => {
    switch (education.status) {
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'not_started': return 'bg-slate-100 text-slate-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Helper to format the education type
  const formatEducationType = (type: string) => {
    switch (type) {
      case 'military': return 'Militaire';
      case 'rhetoric': return 'Rhétorique';
      case 'academic': return 'Académique';
      case 'religious': return 'Religieuse';
      default: return type;
    }
  };
  
  // Calculate progress percentage
  const progressPercentage = education.currentYear && education.totalYears 
    ? Math.min(100, Math.round((education.currentYear / education.totalYears) * 100))
    : 0;
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Éducation {formatEducationType(education.pathType)}
        </h3>
        <Badge className={getStatusColor()}>
          {education.status === 'in_progress' ? 'En cours' : 
           education.status === 'completed' ? 'Terminée' :
           education.status === 'not_started' ? 'Non commencée' : 'Annulée'}
        </Badge>
      </div>
      
      {education.status === 'in_progress' && (
        <div className="space-y-1">
          <div className="flex justify-between items-center text-sm">
            <span>Progression de l'éducation</span>
            <span>{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
            <span>Année {education.currentYear} sur {education.totalYears}</span>
            {education.startYear && (
              <span>Débutée en {education.startYear}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
