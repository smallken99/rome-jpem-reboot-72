
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { militaryPath, religiousPath, rhetoricPath } from '../data/paths';
import { EducationObjectivesProps } from '../types/educationTypes';

export const EducationObjectives: React.FC<EducationObjectivesProps> = ({ educationType }) => {
  const getEducationPath = () => {
    switch (educationType) {
      case 'military': return militaryPath;
      case 'religious': return religiousPath;
      case 'rhetoric': return rhetoricPath;
      default: return null;
    }
  };
  
  const path = getEducationPath();
  
  if (!path) {
    return null;
  }
  
  return (
    <Card>
      <CardContent className="p-4">
        <h4 className="text-sm font-medium mb-2">Objectifs de l'éducation</h4>
        <ul className="space-y-2">
          {path.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-2 text-xs">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-600 mt-0.5 flex-shrink-0" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        
        <div className="mt-3 pt-3 border-t text-xs">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <span className="text-muted-foreground">Durée:</span>
              <p>{path.duration} ans</p>
            </div>
            <div>
              <span className="text-muted-foreground">Coût:</span>
              <p>{path.cost} as</p>
            </div>
            <div>
              <span className="text-muted-foreground">Âge minimum:</span>
              <p>{path.minAge} ans</p>
            </div>
            <div>
              <span className="text-muted-foreground">Statistique liée:</span>
              <p className="capitalize">{path.relatedStat}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
