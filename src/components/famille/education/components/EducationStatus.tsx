
import React from 'react';
import { Child } from '../types/educationTypes';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, BookOpen, GraduationCap, Swords, ScrollText } from 'lucide-react';

interface EducationStatusProps {
  child: Child;
  hasEducation: boolean;
  hasInvalidEducation: boolean;
}

export const EducationStatus: React.FC<EducationStatusProps> = ({ 
  child, 
  hasEducation,
  hasInvalidEducation 
}) => {
  // Map education type to icon and color
  const getEducationIcon = () => {
    switch (child.educationType) {
      case 'military':
        return <Swords className="h-5 w-5 mr-2 text-rome-red" />;
      case 'rhetoric':
        return <ScrollText className="h-5 w-5 mr-2 text-purple-600" />;
      case 'academic':
        return <BookOpen className="h-5 w-5 mr-2 text-blue-600" />;
      default:
        return <GraduationCap className="h-5 w-5 mr-2 text-gray-500" />;
    }
  };
  
  const getEducationName = () => {
    switch (child.educationType) {
      case 'military':
        return 'Militaire';
      case 'rhetoric':
        return 'Rhétorique';
      case 'academic':
        return 'Académique';
      default:
        return 'Aucune';
    }
  };
  
  if (hasInvalidEducation) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-3 mb-4">
        <div className="flex items-center text-red-700">
          <AlertTriangle className="h-5 w-5 mr-2" />
          <p className="text-sm">
            L'éducation militaire n'est pas adaptée pour une fille romaine. 
            Veuillez choisir une éducation plus appropriée.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mb-4">
      <div className="flex items-center mb-2">
        {hasEducation ? (
          <>
            {getEducationIcon()}
            <h3 className="font-medium">Éducation: {getEducationName()}</h3>
          </>
        ) : (
          <>
            <GraduationCap className="h-5 w-5 mr-2 text-gray-500" />
            <h3 className="font-medium text-muted-foreground">Aucune éducation assignée</h3>
          </>
        )}
      </div>
      
      {hasEducation && (
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Progrès</span>
            <span>{child.progress}%</span>
          </div>
          <Progress value={child.progress} className="h-2" />
        </div>
      )}
    </div>
  );
};
