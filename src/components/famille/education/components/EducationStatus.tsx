
import React from 'react';
import { Child } from '../types/educationTypes';
import { Scroll, Sword, BookOpen, Scale, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface EducationStatusProps {
  child: Child;
  hasEducation: boolean;
  hasInvalidEducation?: boolean;
}

export const EducationStatus: React.FC<EducationStatusProps> = ({ 
  child, 
  hasEducation, 
  hasInvalidEducation = false 
}) => {
  if (!hasEducation) {
    return (
      <div className="p-2 mb-4 bg-slate-100 rounded text-slate-600 text-sm flex items-center">
        <BookOpen className="h-4 w-4 mr-2 text-slate-400" />
        Aucune éducation en cours
      </div>
    );
  }
  
  const getEducationIcon = () => {
    switch (child.educationType) {
      case 'military':
        return <Sword className="h-5 w-5 text-red-600" />;
      case 'rhetoric':
        return <Scale className="h-5 w-5 text-blue-600" />;
      case 'religious':
        return <BookOpen className="h-5 w-5 text-amber-600" />;
      case 'academic':
        return <Scroll className="h-5 w-5 text-indigo-600" />;
      default:
        return null;
    }
  };
  
  const getEducationName = () => {
    switch (child.educationType) {
      case 'military':
        return 'Militaire';
      case 'rhetoric':
        return 'Rhétorique';
      case 'religious':
        return 'Religieuse';
      case 'academic':
        return 'Académique';
      default:
        return 'Inconnue';
    }
  };
  
  const getProgressColor = () => {
    if (hasInvalidEducation) return 'bg-red-500';
    
    const progress = child.progress;
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-green-400';
    if (progress >= 25) return 'bg-amber-400';
    return 'bg-amber-300';
  };

  const getYearLabel = () => {
    const currentYear = Math.ceil(child.progress / 25);
    const totalYears = 4; // Standard Roman education
    return `Année ${currentYear}/${totalYears}`;
  };
  
  return (
    <div className="my-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getEducationIcon()}
          <span className="font-medium">Éducation {getEducationName()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{getYearLabel()}</span>
          <span className="text-sm font-medium">{child.progress}%</span>
        </div>
      </div>
      
      <Progress value={child.progress} className="h-2" indicatorClassName={getProgressColor()} />
      
      {hasInvalidEducation && (
        <div className="p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm flex items-center">
          <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
          Éducation militaire non adaptée aux filles romaines.
        </div>
      )}

      {child.preceptorId && (
        <div className="mt-1 text-xs text-muted-foreground flex items-center">
          <span className="mr-1">Précepteur assigné</span>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      )}
    </div>
  );
};
