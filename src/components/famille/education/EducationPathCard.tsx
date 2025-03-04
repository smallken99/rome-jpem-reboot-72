import React from 'react';
import { Sword, Building, ScrollText, ShieldQuestion } from 'lucide-react';
import { EducationPath } from './types/educationTypes';

interface EducationPathCardProps {
  path: EducationPath;
}

export const EducationPathCard: React.FC<EducationPathCardProps> = ({ path }) => {
  const getSuitabilityText = (suitableFor: string) => {
    switch(suitableFor) {
      case 'both':
        return 'Tous';
      case 'male':
        return 'Garçons uniquement';
      case 'female':
        return 'Filles uniquement';
      default:
        return 'Tous';
    }
  };

  const isMaleOnly = path.suitableFor === 'male';
  const isFemaleOnly = path.suitableFor === 'female';

  // Get stat bonus description based on related stat
  const getStatBonusDescription = (relatedStat: string) => {
    switch(relatedStat) {
      case 'martialEducation':
        return 'Améliore l\'Éducation Martiale';
      case 'oratory':
        return 'Améliore l\'Éloquence';
      case 'piety':
        return 'Améliore la Piété';
      default:
        return 'Améliore une caractéristique';
    }
  };

  return (
    <div className={`roman-card p-4 border-t-4 ${isMaleOnly ? 'border-t-blue-500' : isFemaleOnly ? 'border-t-pink-500' : 'border-t-rome-navy'} hover:shadow-md transition-all duration-300`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="text-rome-navy">{path.icon}</div>
        <h4 className="font-cinzel">{path.title}</h4>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3">{path.description}</p>
      
      <div className="text-xs grid grid-cols-3 gap-x-3 gap-y-2">
        <div>
          <span className="font-medium">Âge minimum:</span> {path.minAge} ans
        </div>
        <div>
          <span className="font-medium">Convient:</span> <span className={isMaleOnly ? 'text-blue-600 font-semibold' : isFemaleOnly ? 'text-pink-600 font-semibold' : ''}>{getSuitabilityText(path.suitableFor)}</span>
        </div>
        <div>
          <span className="font-medium">Durée:</span> {path.duration} années
        </div>
      </div>
      
      {isMaleOnly && (
        <div className="text-xs text-blue-700 bg-blue-50 p-2 mt-2 rounded">
          L'éducation militaire n'est accessible qu'aux hommes dans la Rome antique.
        </div>
      )}

      {/* Add a section that displays the related stat improvement */}
      <div className="text-xs bg-green-50 p-2 mt-2 rounded text-green-700">
        <span className="font-medium">Bonus après validation:</span> {getStatBonusDescription(path.relatedStat)}
      </div>
      
      <div className="mt-4 flex justify-end">
        <button className="roman-btn-outline text-xs">
          Voir les précepteurs disponibles
        </button>
      </div>
    </div>
  );
};
