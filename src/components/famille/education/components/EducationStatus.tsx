
import React from 'react';
import { Check, GraduationCap, Ban } from 'lucide-react';
import { AnnualProgress } from './AnnualProgress';
import { MentorInfo } from './MentorInfo';
import { PietyBonus } from './PietyBonus';
import { StatBonusInfo } from './StatBonusInfo';
import { Child } from '../types/educationTypes';
import { CardActions } from './CardActions';

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
  if (!hasEducation) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <GraduationCap className="h-10 w-10 text-muted-foreground mb-2" />
        <h3 className="text-lg font-medium mb-1">Aucune éducation en cours</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Cet enfant n'a actuellement aucune éducation. Choisissez un parcours éducatif pour commencer sa formation.
        </p>
        
        {child.age < 8 && (
          <EducationWarning
            icon={<Ban className="h-4 w-4" />}
            text={`${child.name} est trop jeune pour la plupart des éducations. Il/Elle peut uniquement suivre une éducation religieuse pour le moment.`}
          />
        )}
        
        <CardActions 
          educationType="none" 
          childId={child.id} 
          childGender={child.gender} 
          childAge={child.age} 
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            Éducation en cours
          </h3>
          <p className="text-sm text-muted-foreground">
            Type: {child.currentEducation.type === 'military' ? 'Militaire' : 
                  child.currentEducation.type === 'political' ? 'Politique' : 
                  child.currentEducation.type === 'religious' ? 'Religieuse' :
                  child.currentEducation.type === 'commercial' ? 'Commerce' : 'Inconnue'}
          </p>
        </div>
        
        <CardActions 
          educationType={child.currentEducation.type} 
          childId={child.id} 
          childGender={child.gender} 
          childAge={child.age} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {child.currentEducation.yearsCompleted !== undefined && 
            child.currentEducation.totalYears !== undefined && (
            <AnnualProgress 
              yearsCompleted={child.currentEducation.yearsCompleted} 
              totalYears={child.currentEducation.totalYears} 
            />
          )}
          
          <MentorInfo 
            mentor={child.currentEducation.mentor} 
            speciality={child.currentEducation.speciality}
          />
        </div>
        
        <div>
          {child.currentEducation.pityBonus !== undefined && 
            child.currentEducation.pityBonus > 0 && 
            child.gender === 'female' && (
            <PietyBonus bonus={child.currentEducation.pityBonus} />
          )}
          
          <StatBonusInfo 
            educationType={child.currentEducation.type}
            statBonus={child.currentEducation.statBonus}
          />
        </div>
      </div>
    </div>
  );
};

// Needed for the component above
import { EducationWarning } from './EducationWarning';
