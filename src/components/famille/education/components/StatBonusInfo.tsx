
import React from 'react';
import { StatBonusInfoProps } from '../context/types';
import { ArrowUpCircle } from 'lucide-react';

export const StatBonusInfo: React.FC<StatBonusInfoProps> = ({ 
  educationType, 
  statBonus = 20 
}) => {
  // Helper pour déterminer la statistique qui sera améliorée
  const getRelevantStat = (type: string) => {
    switch (type) {
      case 'military':
        return 'Éducation Martiale';
      case 'political':
      case 'rhetoric':
        return 'Éloquence';
      case 'religious':
        return 'Piété';
      case 'philosophical':
        return 'Intelligence';
      default:
        return 'Compétences générales';
    }
  };
  
  const statName = getRelevantStat(educationType);
  
  return (
    <div className="rounded-lg border p-3 bg-blue-50 border-blue-200 text-blue-800">
      <div className="flex items-center gap-2">
        <ArrowUpCircle className="h-5 w-5 text-blue-600" />
        <div>
          <h4 className="font-medium">Bonus de statistique</h4>
          <p className="text-sm">
            Améliore <span className="font-medium">{statName}</span> de +{statBonus} points à l'issue de l'éducation
          </p>
        </div>
      </div>
    </div>
  );
};
