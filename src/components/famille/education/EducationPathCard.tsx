
import React, { useState } from 'react';
import { Sword, Building, ScrollText, ShieldQuestion, ChevronDown, ChevronUp, CalendarRange } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Coins } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface AnnualCurriculum {
  year: number;
  name: string;
  skills: string[];
}

interface EducationPath {
  type: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  minAge: number;
  suitableFor: string;
  benefits: string[];
  careers: string[];
  duration: number;
  annualCurriculum: AnnualCurriculum[];
}

interface EducationPathCardProps {
  path: EducationPath;
}

export const EducationPathCard: React.FC<EducationPathCardProps> = ({ path }) => {
  const [showCurriculum, setShowCurriculum] = useState(false);

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
      
      <Collapsible
        open={showCurriculum}
        onOpenChange={setShowCurriculum}
        className="mt-3 pt-3 border-t border-muted"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium">
          <span className="flex items-center gap-1">
            <CalendarRange className="h-4 w-4" />
            Programme Annuel
          </span>
          {showCurriculum ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        
        <CollapsibleContent className="pt-2">
          {path.annualCurriculum.map((year) => (
            <div key={year.year} className="mb-3 last:mb-0">
              <div className="bg-muted rounded p-2">
                <p className="font-medium text-xs">Année {year.year}: {year.name}</p>
                <ul className="mt-1 ml-4 list-disc text-xs">
                  {year.skills.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
      
      <div className="mt-4 flex justify-end">
        <button className="roman-btn-outline text-xs">
          Voir les précepteurs disponibles
        </button>
      </div>
    </div>
  );
};
