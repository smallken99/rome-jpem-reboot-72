
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Check, ArrowRight } from 'lucide-react';
import { EducationObjectivesProps } from '../types/educationTypes';
import { militaryPath } from '../data/paths/militaryPath';
import { rhetoricPath } from '../data/paths/rhetoricPath';
import { religiousPath } from '../data/paths/religiousPath';

export const EducationObjectives: React.FC<EducationObjectivesProps> = ({ pathType }) => {
  // Récupérer les données du chemin d'éducation
  const getPath = () => {
    switch (pathType) {
      case 'military':
        return militaryPath;
      case 'rhetoric':
        return rhetoricPath;
      case 'religious':
        return religiousPath;
      default:
        return null;
    }
  };

  const path = getPath();

  if (!path) {
    return <div>Type d'éducation non reconnu</div>;
  }

  // Traiter les résultats en fonction du type
  const getSkills = () => {
    if (!path.outcomes) return [];
    
    if (Array.isArray(path.outcomes)) {
      return path.outcomes;
    }
    
    return path.outcomes.skills || [];
  };

  const skills = getSkills();

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="pt-4 pb-3">
        <h4 className="font-medium flex items-center gap-2 mb-2">
          <Target className="h-4 w-4 text-primary" />
          Objectifs de l'éducation {path.name}
        </h4>
        
        <div className="space-y-3 mb-3">
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              {path.description}
            </p>
          </div>
          
          <div>
            <p className="text-xs font-medium mb-1">Bénéfices:</p>
            <ul className="text-xs space-y-1">
              {path.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-1">
                  <Check className="h-3 w-3 text-green-600 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-2">
          <p className="text-xs font-medium mb-1">Compétences à acquérir:</p>
          <div className="flex flex-wrap gap-1">
            {skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        {path.relatedStat && (
          <div className="mt-2 pt-2 border-t">
            <p className="text-xs flex items-center gap-1">
              <ArrowRight className="h-3 w-3 text-primary" />
              <span>Attribut principal amélioré: </span>
              <span className="font-medium capitalize">{path.relatedStat}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
