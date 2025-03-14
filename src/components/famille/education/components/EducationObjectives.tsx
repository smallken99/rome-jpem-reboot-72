
import React from 'react';
import { EducationObjectivesProps } from '../types/educationTypes';
import { getEducationPath } from '../data';
import { Award, Book, Target } from 'lucide-react';

export const EducationObjectives: React.FC<EducationObjectivesProps> = ({ pathType }) => {
  const educationPath = getEducationPath(pathType);
  
  if (!educationPath) {
    return (
      <div className="p-4 border rounded-md bg-amber-50 text-amber-800">
        <p>Type d'éducation non reconnu</p>
      </div>
    );
  }
  
  // Extract skills from outcomes
  const skills = typeof educationPath.outcomes === 'object' && 'skills' in educationPath.outcomes
    ? educationPath.outcomes.skills
    : [];
  
  // Extract bonuses from outcomes if available
  const bonuses = typeof educationPath.outcomes === 'object' && 'bonuses' in educationPath.outcomes
    ? educationPath.outcomes.bonuses
    : {};
  
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-md font-medium flex items-center gap-2">
          <Target className="h-4 w-4" />
          Objectifs d'apprentissage
        </h4>
        
        <div className="mt-2 p-4 border rounded-md">
          <div className="space-y-4">
            {skills.length > 0 && (
              <div>
                <h5 className="text-sm font-medium flex items-center gap-1">
                  <Book className="h-3.5 w-3.5" />
                  Compétences à acquérir:
                </h5>
                <ul className="mt-1 pl-5 list-disc text-sm space-y-1">
                  {skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {Object.keys(bonuses).length > 0 && (
              <div>
                <h5 className="text-sm font-medium flex items-center gap-1">
                  <Award className="h-3.5 w-3.5" />
                  Bonus de caractéristiques:
                </h5>
                <ul className="mt-1 pl-5 list-disc text-sm space-y-1">
                  {Object.entries(bonuses).map(([stat, value], index) => (
                    <li key={index}>
                      <span className="capitalize">{stat}</span>: +{value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="text-xs text-muted-foreground italic">
              L'éducation se déroule sur {educationPath.duration} années et 
              la progression dépend de la qualité du précepteur.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
