
import React from 'react';
import { ChildEducation } from '../context/types';
import { AnnualProgress } from './AnnualProgress';
import { MentorInfo } from './MentorInfo';
import { PietyBonus } from './PietyBonus';
import { StatBonusInfo } from './StatBonusInfo';

interface CurrentEducationStatusProps {
  currentEducation: ChildEducation;
  childGender: string;
}

export const CurrentEducationStatus: React.FC<CurrentEducationStatusProps> = ({ 
  currentEducation, 
  childGender 
}) => {
  if (currentEducation.type === 'none') {
    return null;
  }
  
  return (
    <div className="border-t border-muted pt-4 mt-6">
      <h3 className="text-lg font-medium mb-3">Éducation actuelle</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {currentEducation.yearsCompleted !== undefined && 
           currentEducation.totalYears !== undefined && (
            <AnnualProgress 
              yearsCompleted={currentEducation.yearsCompleted} 
              totalYears={currentEducation.totalYears} 
            />
          )}
          
          <MentorInfo 
            mentor={currentEducation.mentor} 
            speciality={currentEducation.speciality}
          />
        </div>
        
        <div>
          {currentEducation.pityBonus !== undefined && 
           currentEducation.pityBonus > 0 && 
           childGender === 'female' && (
            <PietyBonus 
              bonus={currentEducation.pityBonus}
              gender={childGender}
            />
          )}
          
          <StatBonusInfo 
            educationType={currentEducation.type}
            statBonus={currentEducation.statBonus}
          />
        </div>
      </div>
    </div>
  );
};
