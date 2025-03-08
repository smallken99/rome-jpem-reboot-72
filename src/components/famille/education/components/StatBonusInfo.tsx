
import React from 'react';
import { StatBonusInfoProps } from '../types/educationTypes';
import { getRelatedStatName } from '../utils/educationUtils';
import { TrendingUp } from 'lucide-react';

export const StatBonusInfo: React.FC<StatBonusInfoProps> = ({ 
  educationType,
  statBonus = 15
}) => {
  // Obtenir le nom de la statistique associée
  const statName = getRelatedStatName(educationType);
  
  if (!statName) return null;
  
  return (
    <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start gap-3">
      <TrendingUp className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
      <div>
        <h3 className="font-medium text-green-800">Bonus de statistique</h3>
        <p className="text-green-700">
          Cette éducation améliorera <span className="font-semibold">{statName}</span> de {statBonus} points.
        </p>
      </div>
    </div>
  );
};
