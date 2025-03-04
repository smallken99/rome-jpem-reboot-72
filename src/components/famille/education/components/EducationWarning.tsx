
import React from 'react';

interface EducationWarningProps {
  icon?: React.ReactNode;
  text: string;
}

export const EducationWarning: React.FC<EducationWarningProps> = ({ icon, text }) => {
  return (
    <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded flex items-center gap-1.5">
      {icon}
      <span>{text}</span>
    </div>
  );
};
