
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { EducationRecord, ChildEducation } from '../types/educationTypes';
import { educationPaths } from '../data';
import { BookOpen, Clock } from 'lucide-react';

export interface CurrentEducationStatusProps {
  education?: ChildEducation | EducationRecord;
  mentor?: any;
}

export const CurrentEducationStatus: React.FC<CurrentEducationStatusProps> = ({ 
  education
}) => {
  if (!education) return null;
  
  const getEducationPathName = () => {
    // Handle both ChildEducation and EducationRecord types
    const pathType = 'pathType' in education ? education.pathType : education.type;
    const path = educationPaths.find(p => p.id === pathType || p.type === pathType);
    return path?.name || 'Éducation';
  };
  
  const getCurrentYear = () => {
    if ('currentYear' in education) {
      return education.currentYear;
    }
    return 'yearsCompleted' in education ? education.yearsCompleted : 0;
  };
  
  const getTotalYears = () => {
    if ('totalYears' in education && education.totalYears !== undefined) {
      return education.totalYears;
    }
    return 10; // Default value if not specified
  };
  
  const getStatus = () => {
    if ('status' in education) {
      return education.status;
    }
    return 'in_progress';
  };
  
  // Calculate progress percentage
  const progressValue = () => {
    if ('progress' in education && education.progress !== undefined) {
      return education.progress;
    }
    
    const currentYear = getCurrentYear();
    const totalYears = getTotalYears();
    return Math.round((currentYear / totalYears) * 100);
  };
  
  const getStatusBadgeProps = () => {
    const status = getStatus();
    
    switch (status) {
      case 'completed':
        return { label: 'Complétée', className: 'bg-green-100 text-green-800' };
      case 'in_progress':
        return { label: 'En cours', className: 'bg-blue-100 text-blue-800' };
      case 'canceled':
        return { label: 'Abandonnée', className: 'bg-red-100 text-red-800' };
      default:
        return { label: 'Non démarré', className: 'bg-gray-100 text-gray-800' };
    }
  };
  
  const { label, className } = getStatusBadgeProps();
  
  return (
    <div className="bg-slate-50 border rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium">{getEducationPathName()}</h3>
            <p className="text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                Année {getCurrentYear()} sur {getTotalYears()}
              </span>
            </p>
          </div>
        </div>
        <Badge className={className}>{label}</Badge>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1 text-sm">
          <span>Progression</span>
          <span>{progressValue()}%</span>
        </div>
        <Progress value={progressValue()} className="h-2" />
      </div>
    </div>
  );
};
