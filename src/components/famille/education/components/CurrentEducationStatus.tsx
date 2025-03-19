
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, GraduationCap } from 'lucide-react';
import { EducationRecord, ChildEducation } from '../types/educationTypes';

interface CurrentEducationStatusProps {
  education: EducationRecord;
}

export const CurrentEducationStatus: React.FC<CurrentEducationStatusProps> = ({ education }) => {
  const getEducationTypeName = (type: string) => {
    switch (type) {
      case 'military': return 'Militaire';
      case 'rhetoric': return 'Rhétorique';
      case 'religious': return 'Religieuse';
      case 'academic': return 'Académique';
      default: return type;
    }
  };

  const getEducationStatusName = (status: string) => {
    switch (status) {
      case 'in_progress': return 'En cours';
      case 'completed': return 'Terminée';
      case 'canceled': return 'Abandonnée';
      case 'not_started': return 'Non commencée';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      case 'not_started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const progressPercentage = education.currentYear && education.totalYears 
    ? Math.min(100, (education.currentYear / education.totalYears) * 100)
    : 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-start gap-2">
        <div>
          <h3 className="text-lg font-medium flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Éducation {getEducationTypeName(education.pathType)}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge className={getStatusColor(education.status)}>
              {getEducationStatusName(education.status)}
            </Badge>
            {education.startYear && (
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Début: {education.startYear}
              </span>
            )}
          </div>
        </div>

        {education.status === 'in_progress' && education.currentYear && education.totalYears && (
          <div className="text-right">
            <div className="text-sm font-medium">
              {education.currentYear} / {education.totalYears} années
            </div>
            <div className="text-xs text-muted-foreground">
              {Math.floor(progressPercentage)}% terminé
            </div>
          </div>
        )}
      </div>

      {education.status === 'in_progress' && (
        <div className="space-y-1">
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Début</span>
            <span>Mi-parcours</span>
            <span>Fin</span>
          </div>
        </div>
      )}
    </div>
  );
};
