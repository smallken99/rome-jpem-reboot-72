
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { MentorInfoProps } from '../types/educationTypes';

export const MentorInfo: React.FC<MentorInfoProps> = ({ 
  mentor, 
  preceptor,
  educationType, 
  onChangeMentor 
}) => {
  // Use either mentor or preceptor based on which is provided
  const mentorData = mentor || preceptor;
  
  if (!mentorData) {
    return (
      <div className="text-muted-foreground">
        Aucun précepteur assigné
      </div>
    );
  }
  
  return (
    <div className="border rounded-md p-3 space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium">{mentorData.name}</p>
          <p className="text-sm text-muted-foreground">
            {mentorData.specialty || mentorData.specialties?.[0] || "Généraliste"}
          </p>
        </div>
        
        <Badge variant="outline">
          Qualité: {mentorData.quality || mentorData.expertise || 3}/5
        </Badge>
      </div>
      
      {mentorData.description && (
        <p className="text-sm text-muted-foreground mt-2 border-t pt-2">
          {mentorData.description}
        </p>
      )}
      
      {onChangeMentor && (
        <button 
          onClick={onChangeMentor}
          className="text-sm text-primary hover:underline mt-2"
        >
          Changer de précepteur
        </button>
      )}
    </div>
  );
};
