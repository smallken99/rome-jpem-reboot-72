
import React from 'react';
import { ArrowUpCircle } from 'lucide-react';

interface StatBonusInfoProps {
  educationType: string;
  statBonus?: number;
}

export const StatBonusInfo: React.FC<StatBonusInfoProps> = ({ 
  educationType, 
  statBonus = 20 
}) => {
  // Helper pour déterminer la statistique qui sera améliorée
  const getRelevantStat = (type: string) => {
    switch (type) {
      case 'military':
        return { name: 'Éducation Martiale', color: 'text-red-600 bg-red-50 border-red-200' };
      case 'rhetoric':
        return { name: 'Éloquence', color: 'text-blue-600 bg-blue-50 border-blue-200' };
      case 'religious':
        return { name: 'Piété', color: 'text-amber-600 bg-amber-50 border-amber-200' };
      default:
        return { name: 'Compétences générales', color: 'text-gray-600 bg-gray-50 border-gray-200' };
    }
  };
  
  const { name, color } = getRelevantStat(educationType);
  
  return (
    <div className={`rounded-lg border p-3 ${color}`}>
      <div className="flex items-center gap-2">
        <ArrowUpCircle className="h-5 w-5" />
        <div>
          <h4 className="font-medium">Bonus de statistique</h4>
          <p className="text-sm">
            Améliore <span className="font-medium">{name}</span> de +{statBonus} points à l'issue de l'éducation
          </p>
        </div>
      </div>
    </div>
  );
};
