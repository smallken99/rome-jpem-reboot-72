
import React from 'react';
import { Child } from '../types/educationTypes';
import { Scroll, Sword, BookOpen, Scale } from 'lucide-react';

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
      <div className="p-2 mb-4 bg-slate-100 rounded text-slate-600 text-sm">
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
    if (hasInvalidEducation) return 'bg-red-200';
    
    const progress = child.progress;
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-green-400';
    if (progress >= 25) return 'bg-amber-400';
    return 'bg-amber-300';
  };
  
  return (
    <div className="my-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getEducationIcon()}
          <span className="font-medium">Éducation {getEducationName()}</span>
        </div>
        <span className="text-sm">{child.progress}% complété</span>
      </div>
      
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${getProgressColor()}`} 
          style={{ width: `${child.progress}%` }}
        ></div>
      </div>
      
      {hasInvalidEducation && (
        <div className="p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          Attention : L'éducation militaire n'est pas adaptée aux filles romaines.
        </div>
      )}
    </div>
  );
};
