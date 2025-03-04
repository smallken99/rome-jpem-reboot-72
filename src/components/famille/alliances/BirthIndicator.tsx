
import React from 'react';
import { Baby } from 'lucide-react';

interface BirthIndicatorProps {
  lastBirthYear: number;
  currentYear: number;
}

export const BirthIndicator: React.FC<BirthIndicatorProps> = ({ 
  lastBirthYear, 
  currentYear 
}) => {
  if (lastBirthYear <= 0) return null;
  
  return (
    <div className="p-2 mb-4 bg-blue-50 rounded-md flex items-center gap-2 text-sm text-blue-700">
      <Baby className="h-4 w-4" />
      <span>Dernière naissance: {currentYear - lastBirthYear} an(s)</span>
    </div>
  );
};
