
import React from 'react';
import { getEducationTypeIcon, getEducationTypeName } from '../utils/educationUtils';

interface ChildProps {
  name: string;
  age: number;
  gender: string;
  educationType: string;
}

interface ChildHeaderProps {
  child: ChildProps;
  hasInvalidEducation: boolean;
}

export const ChildHeader: React.FC<ChildHeaderProps> = ({ child, hasInvalidEducation }) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-cinzel">{child.name}</h4>
        <p className="text-sm text-muted-foreground">
          {child.age} ans • {child.gender === 'male' ? 'Garçon' : 'Fille'}
        </p>
      </div>
      
      {child.educationType !== 'none' ? (
        <div className={`flex items-center gap-1 px-2 py-1 ${hasInvalidEducation ? 'bg-red-100 text-red-700' : 'bg-rome-navy/10'} rounded text-xs`}>
          {getEducationTypeIcon(child.educationType)}
          <span>{getEducationTypeName(child.educationType)}</span>
          {hasInvalidEducation && <span className="text-xs text-red-600 ml-1">⚠️</span>}
        </div>
      ) : (
        <div className="px-2 py-1 bg-muted rounded text-xs">
          Pas d'éducation
        </div>
      )}
    </div>
  );
};
