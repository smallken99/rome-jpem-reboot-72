import React from 'react';
import { ChildHeader } from './components/ChildHeader';
import { StatBonusInfo } from './components/StatBonusInfo';
import { AnnualProgress } from './components/AnnualProgress';
import { SkillProgress } from './components/SkillProgress';
import { PietyBonus } from './components/PietyBonus';
import { MentorInfo } from './components/MentorInfo';
import { EducationWarning } from './components/EducationWarning';
import { CardActions } from './components/CardActions';
import { ChildProps } from './types/educationTypes';

interface ChildEducationCardProps {
  child: ChildProps;
}

export const ChildEducationCard: React.FC<ChildEducationCardProps> = ({ child }) => {
  // Check if there's an invalid education assignment (military for females)
  const hasInvalidEducation = child.gender === 'female' && child.currentEducation.type === 'military';
  
  // Calculate the base progress
  const baseProgress = child.currentEducation.progress;
  const pityBonus = child.currentEducation.pityBonus || 0;
  
  // Years information
  const yearsCompleted = child.currentEducation.yearsCompleted || 0;
  const totalYears = child.currentEducation.totalYears || 0;
  
  // Stat bonus that will be applied upon completion
  const statBonus = child.currentEducation.statBonus || 0;
  
  // Check if the child has any education
  const hasEducation = child.currentEducation.type !== 'none';
  
  return (
    <div className="roman-card p-4 hover:shadow-md transition-all duration-300">
      <ChildHeader 
        child={{
          name: child.name,
          age: child.age,
          gender: child.gender,
          educationType: child.currentEducation.type
        }}
        hasInvalidEducation={hasInvalidEducation}
      />
      
      {hasEducation && (
        <>
          <EducationWarning hasInvalidEducation={hasInvalidEducation} />
          
          <StatBonusInfo 
            statBonus={statBonus} 
            educationType={child.currentEducation.type}
          />
          
          <AnnualProgress 
            yearsCompleted={yearsCompleted} 
            totalYears={totalYears}
          />
          
          <SkillProgress 
            baseProgress={baseProgress} 
            pityBonus={pityBonus} 
            hasInvalidEducation={hasInvalidEducation}
          />
          
          <PietyBonus pityBonus={pityBonus} />
          
          <MentorInfo 
            mentor={child.currentEducation.mentor} 
            skills={child.currentEducation.skills}
          />
        </>
      )}
      
      <CardActions hasEducation={hasEducation} />
    </div>
  );
};
