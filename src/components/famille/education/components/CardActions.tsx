
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Plus, Trash } from 'lucide-react';
import { EducationType } from '../types/educationTypes';

interface CardActionsProps {
  educationType: EducationType | 'none';
  childId: string;
  childGender: 'male' | 'female';
  childAge: number;
  onChangeEducation?: () => void;
  onStartEducation?: () => void;
  onRemoveEducation?: () => void;
}

export const CardActions: React.FC<CardActionsProps> = ({
  educationType,
  childId,
  childGender,
  childAge,
  onChangeEducation,
  onStartEducation,
  onRemoveEducation
}) => {
  // Check if child has education
  const hasEducation = educationType !== 'none';
  
  // Check if child is eligible for education (age between 7 and 17)
  const isEligible = childAge >= 7 && childAge <= 17;
  
  if (!isEligible) {
    return (
      <div className="mt-4 text-xs text-slate-500 italic">
        {childAge < 7 
          ? 'Trop jeune pour l\'éducation (minimum 7 ans)' 
          : 'Trop âgé pour l\'éducation (maximum 17 ans)'}
      </div>
    );
  }
  
  if (hasEducation) {
    return (
      <div className="flex justify-end gap-2 mt-4">
        {onChangeEducation && (
          <Button variant="outline" size="sm" onClick={onChangeEducation}>
            <Edit className="mr-1 h-4 w-4" />
            Modifier
          </Button>
        )}
        
        {onRemoveEducation && (
          <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={onRemoveEducation}>
            <Trash className="mr-1 h-4 w-4" />
            Arrêter
          </Button>
        )}
      </div>
    );
  }
  
  return (
    <div className="flex justify-end mt-4">
      {onStartEducation && (
        <Button size="sm" onClick={onStartEducation}>
          <Plus className="mr-1 h-4 w-4" />
          Commencer l'éducation
        </Button>
      )}
    </div>
  );
};
