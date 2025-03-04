
import React from 'react';
import { Award } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface EducationObjectivesProps {
  educationType: string;
}

export const EducationObjectives: React.FC<EducationObjectivesProps> = ({ 
  educationType 
}) => {
  if (educationType === 'none') {
    return null;
  }
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
        <Award className="h-5 w-5 text-rome-navy" />
        <span>Objectifs éducatifs</span>
      </h3>
      
      <div className="space-y-3">
        <div>
          <Label htmlFor="education-notes">Notes sur l'éducation</Label>
          <Textarea 
            id="education-notes" 
            placeholder="Ajoutez des notes sur les objectifs éducatifs de cet enfant..."
            className="min-h-32"
          />
        </div>
      </div>
    </div>
  );
};
