
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, BookOpen, Award } from 'lucide-react';
import { CurrentEducationStatusProps } from '../types/educationTypes';

export const CurrentEducationStatus: React.FC<CurrentEducationStatusProps> = ({ 
  education,
  currentEducation,
  mentor
}) => {
  // Use either education or currentEducation depending on which is provided
  const edu = education || currentEducation;
  
  if (!edu) {
    return (
      <div className="text-center py-6 border rounded-md bg-gray-50">
        <BookOpen className="h-8 w-8 mx-auto text-gray-400 mb-2" />
        <p className="text-muted-foreground">Aucune éducation en cours</p>
      </div>
    );
  }
  
  // Get type from either pathType or type
  const educationType = 'pathType' in edu ? edu.pathType : edu.type;
  
  // Get progress - handle both EducationRecord and ChildEducation formats
  const progress = 'currentYear' in edu && edu.totalYears
    ? (edu.currentYear / edu.totalYears) * 100
    : ('progress' in edu ? edu.progress : 0);
  
  // Handle years completed
  const years = 'currentYear' in edu ? edu.currentYear : ('yearsCompleted' in edu ? edu.yearsCompleted : 0);
  const totalYears = edu.totalYears || 3;
  
  // Handle status
  const status = 'status' in edu ? edu.status : (educationType && educationType !== 'none' ? 'in_progress' : 'not_started');
  
  // Helper to get education type display name
  const getEducationTypeName = (type: string) => {
    switch(type) {
      case 'military': return 'Militaire';
      case 'religious': return 'Religieuse';
      case 'rhetoric': return 'Rhétorique';
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };
  
  // Helper to get status display style
  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'completed':
        return { label: 'Complétée', className: 'bg-green-100 text-green-800 border-green-200' };
      case 'canceled':
        return { label: 'Abandonnée', className: 'bg-red-100 text-red-800 border-red-200' };
      case 'in_progress':
        return { label: 'En cours', className: 'bg-blue-100 text-blue-800 border-blue-200' };
      default:
        return { label: 'Non commencée', className: 'bg-gray-100 text-gray-800 border-gray-200' };
    }
  };
  
  const statusStyle = getStatusStyle(status as string);
  
  if (educationType === 'none') {
    return (
      <div className="text-center py-6 border rounded-md bg-gray-50">
        <BookOpen className="h-8 w-8 mx-auto text-gray-400 mb-2" />
        <p className="text-muted-foreground">Aucune éducation en cours</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-medium">
            Éducation {getEducationTypeName(educationType as string)}
          </h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            Année {years} sur {totalYears}
          </p>
        </div>
        
        <Badge className={statusStyle.className}>
          {statusStyle.label}
        </Badge>
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>Progression</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      {'statBonus' in edu && edu.statBonus && (
        <div className="flex items-center gap-2 text-sm border-t pt-2 mt-2">
          <Award className="h-4 w-4 text-amber-500" />
          <span>Bonus d'attribut: +{edu.statBonus}</span>
        </div>
      )}
    </div>
  );
};
