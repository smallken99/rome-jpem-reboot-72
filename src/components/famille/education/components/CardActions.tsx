
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Eye, UserPlus, BookOpen } from 'lucide-react';
import { useEducation } from '../context/EducationContext';

interface CardActionsProps {
  educationType: string;
  childId: string;
  childGender: string;
  childAge: number;
}

export const CardActions: React.FC<CardActionsProps> = ({
  educationType,
  childId,
  childGender,
  childAge
}) => {
  const navigate = useNavigate();
  const { startEducation } = useEducation();
  
  const handleViewDetails = () => {
    navigate(`/famille/education/child/${childId}`);
  };
  
  const handleStartEducation = () => {
    if (educationType === 'none') {
      navigate(`/famille/education/child/${childId}?tab=new`);
    } else {
      startEducation(childId);
    }
  };
  
  return (
    <div className="flex justify-end gap-2 mt-4 border-t pt-4">
      <Button variant="outline" size="sm" onClick={handleViewDetails}>
        <Eye className="h-4 w-4 mr-1" />
        Détails
      </Button>
      
      {educationType === 'none' ? (
        <Button size="sm" onClick={handleStartEducation}>
          <UserPlus className="h-4 w-4 mr-1" />
          Configurer
        </Button>
      ) : (
        <Button
          size="sm"
          variant="secondary"
          onClick={handleStartEducation}
          disabled={educationType === 'none'}
        >
          <BookOpen className="h-4 w-4 mr-1" />
          Étudier
        </Button>
      )}
    </div>
  );
};
