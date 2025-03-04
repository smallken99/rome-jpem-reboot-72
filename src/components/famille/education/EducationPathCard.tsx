
import React from 'react';
import { Sword, Building, ScrollText, ShieldQuestion } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Coins } from 'lucide-react';

interface EducationPath {
  type: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  minAge: number;
  suitableFor: string;
  benefits: string[];
  careers: string[];
}

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

  return (
    <div className={`roman-card p-4 border-t-4 ${isMaleOnly ? 'border-t-blue-500' : isFemaleOnly ? 'border-t-pink-500' : 'border-t-rome-navy'} hover:shadow-md transition-all duration-300`}>
      <div className="flex items-center gap-2 mb-2">
        <div className="text-rome-navy">{path.icon}</div>
        <h4 className="font-cinzel">{path.title}</h4>
      </div>
      
      <p className="text-sm text-muted-foreground mb-3">{path.description}</p>
      
      <div className="text-xs grid grid-cols-2 gap-x-3 gap-y-2">
        <div>
          <span className="font-medium">Âge minimum:</span> {path.minAge} ans
        </div>
        <div>
          <span className="font-medium">Convient:</span> <span className={isMaleOnly ? 'text-blue-600 font-semibold' : isFemaleOnly ? 'text-pink-600 font-semibold' : ''}>{getSuitabilityText(path.suitableFor)}</span>
        </div>
      </div>
      
      {isMaleOnly && (
        <div className="text-xs text-blue-700 bg-blue-50 p-2 mt-2 rounded">
          L'éducation militaire n'est accessible qu'aux hommes dans la Rome antique.
        </div>
      )}
      
      <Separator className="my-3" />
      
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="font-medium mb-1">Bénéfices:</p>
          <ul className="ml-4 list-disc">
            {path.benefits.map((benefit, idx) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <p className="font-medium mb-1">Carrières possibles:</p>
          <ul className="ml-4 list-disc">
            {path.careers.map((career, idx) => (
              <li key={idx}>{career}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
