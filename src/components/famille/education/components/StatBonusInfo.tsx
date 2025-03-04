
import React from 'react';
import { Award } from 'lucide-react';
import { getRelatedStatName } from '../utils/educationUtils';

interface StatBonusInfoProps {
  statBonus: number;
  educationType: string;
}

export const StatBonusInfo: React.FC<StatBonusInfoProps> = ({ statBonus, educationType }) => {
  if (statBonus <= 0) return null;
  
  return (
    <div className="mt-2 flex items-center gap-1 text-xs bg-green-50 p-2 rounded text-green-700">
      <Award className="h-3 w-3" />
      <span>À la validation: +{statBonus} en {getRelatedStatName(educationType)}</span>
    </div>
  );
};
