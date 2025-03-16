
import React from 'react';
import { ChildHeader } from './components/ChildHeader';
import { EducationStatus } from './components/EducationStatus';
import { EducationProgressButtons } from './components/EducationProgressButtons';
import { CardActions } from './components/CardActions';
import { Child } from './types/educationTypes';
import { useEducation } from './context/EducationContext';

interface ChildEducationCardProps {
  child: Child;
}

const ChildEducationCard: React.FC<ChildEducationCardProps> = ({ child }) => {
  // Use our education context for functionality
  const { 
    isEducating,
    advanceEducation,
    completeEducation,
    setSelectedChildId
  } = useEducation();
  
  // Determine if the child has an ongoing education
  const hasEducation = child.educationType !== 'none';
  
  // Check if female with military education (invalid in Roman times)
  const hasInvalidEducation = child.gender === 'female' && child.educationType === 'military';
  
  // Check if education is in progress
  const isEducatingThisChild = isEducating;
  
  // Handle advancing education by a year
  const handleAdvanceYear = () => {
    advanceEducation(child.id);
  };
  
  // Handle name change
  const handleNameChange = (id: string, newName: string) => {
    // This will now be handled by the context
    setSelectedChildId(id);
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
          isEducating={isEducatingThisChild}
          hasEducation={hasEducation}
          educationProgress={child.progress}
          onAdvanceYear={handleAdvanceYear}
          onCompleteEducation={() => completeEducation(child.id)}
          canComplete={child.progress >= 75}
        />
        
        <CardActions 
          educationType={child.educationType}
          childId={child.id}
          childGender={child.gender}
          childAge={child.age}
        />
      </div>
    </div>
  );
};

export default ChildEducationCard;
