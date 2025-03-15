
import React from 'react';
import { ChildHeader } from './education/components/ChildHeader';
import { EducationStatus } from './education/components/EducationStatus';
import { EducationProgressButtons } from './education/components/EducationProgressButtons';
import { CardActions } from './education/components/CardActions';
import { Child } from './education/types/educationTypes';
import { useEducation } from './education/context/EducationContext';

interface ChildEducationCardProps {
  child: Child;
}

const ChildEducationCard: React.FC<ChildEducationCardProps> = ({ child }) => {
  // Use our education context for functionality
  const { 
    educatingChildren, 
    advanceEducationYear, 
    completeEducation,
    updateChildName 
  } = useEducation();
  
  // Determine if the child has an ongoing education
  const hasEducation = child.currentEducation?.type && child.currentEducation.type !== 'none';
  
  // Check if female with military education (invalid in Roman times)
  const hasInvalidEducation = child.gender === 'female' && child.currentEducation?.type === 'military';
  
  // Check if education is in progress
  const isEducating = educatingChildren.includes(child.id);
  
  // Handle advancing education by a year
  const handleAdvanceYear = () => {
    advanceEducationYear(child.id);
  };
  
  // Handle name change
  const handleNameChange = (id: string, newName: string) => {
    updateChildName(id, newName);
  };
  
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <ChildHeader 
        child={child} 
        onNameChange={handleNameChange}
        hasInvalidEducation={hasInvalidEducation}
      />
      
      <div className="p-4">
        <EducationStatus 
          child={child}
          hasEducation={hasEducation}
          hasInvalidEducation={hasInvalidEducation}
        />
        
        <EducationProgressButtons 
          isEducating={isEducating}
          hasEducation={hasEducation}
          educationProgress={child.currentEducation?.progress}
          onAdvanceYear={handleAdvanceYear}
          onCompleteEducation={() => completeEducation(child.id)}
          canComplete={child.currentEducation?.yearsCompleted >= (child.currentEducation?.totalYears || 0) * 0.75}
        />
        
        <CardActions 
          educationType={child.currentEducation?.type || 'none'}
          childId={child.id}
          childGender={child.gender}
          childAge={child.age}
        />
      </div>
    </div>
  );
};

export default ChildEducationCard;
