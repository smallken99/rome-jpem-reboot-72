
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Settings2, BookOpen, Ban } from 'lucide-react';
import { useEducation } from '../context/EducationContext';
import { EducationType, Gender } from '../types/educationTypes';

interface CardActionsProps {
  educationType: EducationType;
  childId: string;
  childGender: Gender;
  childAge: number;
}

export const CardActions: React.FC<CardActionsProps> = ({
  educationType,
  childId,
  childGender,
  childAge
}) => {
  const navigate = useNavigate();
  const { updateChildEducation } = useEducation();
  
  const handleChangeEducationType = () => {
    navigate(`/famille/education/child/${childId}`);
  };
  
  const handleCancelEducation = () => {
    updateChildEducation(childId, 'none');
  };
  
  return (
    <div className="flex flex-wrap justify-end gap-2 mt-4">
      <Button 
        size="sm" 
        variant="outline"
        onClick={handleChangeEducationType}
        className="flex items-center gap-1 text-xs"
      >
        <Settings2 className="h-3 w-3" />
        <span>Configurer</span>
      </Button>
      
      {educationType !== 'none' && (
        <Button 
          size="sm" 
          variant="outline"
          onClick={handleCancelEducation}
          className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
        >
          <Ban className="h-3 w-3" />
          <span>Annuler</span>
        </Button>
      )}
    </div>
  );
};
