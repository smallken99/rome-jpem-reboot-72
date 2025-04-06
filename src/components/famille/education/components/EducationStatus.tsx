
import React from 'react';
import { Child } from '../types/educationTypes';
import { AlertTriangle, GraduationCap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { getAllPreceptors } from '../data/preceptors';

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
  // Format education type for display
  const formatEducationType = (type: string): string => {
    const types: Record<string, string> = {
      'military': 'Militaire',
      'rhetoric': 'Rhétorique',
      'political': 'Politique',
      'religious': 'Religieuse',
      'philosophical': 'Philosophique',
      'academic': 'Académique',
      'none': 'Non éduqué'
    };
    
    return types[type] || type;
  };
  
  // Get preceptor name if assigned
  const getPreceptorName = (): string => {
    if (!child.preceptorId) return "Aucun";
    
    // Dans un cas réel, cette donnée viendrait du contexte ou d'un hook
    const preceptors = getAllPreceptors();
    const preceptor = preceptors.find(p => p.id === child.preceptorId);
    return preceptor ? preceptor.name : "Inconnu";
  };
  
  if (!hasEducation) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">Cet enfant n'a pas encore commencé son éducation.</p>
      </div>
    );
  }
  
  if (hasInvalidEducation) {
    return (
      <div className="p-4 bg-red-50 rounded-md mb-4">
        <div className="flex items-center">
          <AlertTriangle className="text-red-500 h-5 w-5 mr-2" />
          <p className="text-red-800 font-medium">Éducation incompatible</p>
        </div>
        <p className="text-red-700 mt-1 text-sm">
          Une fille ne peut pas recevoir une éducation militaire dans la Rome antique.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-3 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center">
            <GraduationCap className="h-4 w-4 mr-1 text-primary" />
            <span className="font-medium">
              Éducation {formatEducationType(child.educationType)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Précepteur: {getPreceptorName()}
          </p>
        </div>
        
        <div className="text-right">
          <p className="font-medium">{child.progress}%</p>
          <p className="text-xs text-muted-foreground">Progression</p>
        </div>
      </div>
      
      <Progress value={child.progress} className="h-2" />
    </div>
  );
};
