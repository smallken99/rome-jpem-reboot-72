
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { EducationWarningProps } from '../types/educationTypes';

export const EducationWarning: React.FC<EducationWarningProps> = ({ icon, text }) => {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-start gap-3">
      {icon || <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />}
      <div>
        <p className="text-amber-800">{text}</p>
      </div>
    </div>
  );
};
