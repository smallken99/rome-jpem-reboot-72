
import React from 'react';

interface EducationWarningProps {
  hasInvalidEducation: boolean;
}

export const EducationWarning: React.FC<EducationWarningProps> = ({ hasInvalidEducation }) => {
  if (!hasInvalidEducation) return null;
  
  return (
    <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded">
      Les femmes n'ont pas accès à l'éducation militaire dans la Rome antique.
    </div>
  );
};
