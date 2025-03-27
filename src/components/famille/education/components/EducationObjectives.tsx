
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { EducationPath } from '../types/educationTypes';

export interface EducationObjectivesProps {
  childId: string;
  path?: EducationPath;
  educationType?: string;
}

export const EducationObjectives: React.FC<EducationObjectivesProps> = ({ childId, path, educationType }) => {
  // If no path is provided, return empty component
  if (!path) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Objectifs d'Apprentissage</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Veuillez sélectionner un type d'éducation pour voir les objectifs.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Extract skills from the path's outcomes
  const skills = Array.isArray(path.outcomes) 
    ? path.outcomes 
    : (path.outcomes.skills || []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Objectifs d'Apprentissage</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">
          L'éducation {path.name.toLowerCase()} permettra à l'enfant d'acquérir les compétences suivantes:
        </p>
        
        <ul className="space-y-2">
          {skills.map((skill, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <div className="rounded-full bg-green-100 p-1">
                <Check className="h-3 w-3 text-green-600" />
              </div>
              {skill}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
