
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Target, TrendingUp } from 'lucide-react';
import { EducationObjectivesProps } from '../types/educationTypes';
import { educationPaths } from '../data';

export const EducationObjectives: React.FC<EducationObjectivesProps> = ({ 
  educationType,
  specialties = [],
  pathType
}) => {
  // Use either educationType or pathType based on which is provided
  const type = pathType || educationType;
  
  if (!type || type === 'none') {
    return (
      <div className="text-muted-foreground text-center py-4">
        Aucun objectif d'éducation défini
      </div>
    );
  }
  
  // Find matching education path
  const path = educationPaths.find(p => 
    p.id === type || 
    p.id === type.toLowerCase() || 
    (p.type && p.type === type)
  );
  
  if (!path) {
    return (
      <div className="text-muted-foreground text-center py-4">
        Type d'éducation non reconnu: {type}
      </div>
    );
  }
  
  const outcomes = typeof path.outcomes === 'object' && !Array.isArray(path.outcomes) 
    ? path.outcomes.skills 
    : Array.isArray(path.outcomes) 
      ? path.outcomes 
      : [];
  
  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-start gap-3">
        <Award className="h-5 w-5 text-amber-500 mt-0.5" />
        <div>
          <h4 className="font-medium">Objectifs de l'éducation {path.name}</h4>
          <p className="text-sm text-muted-foreground">{path.description}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Target className="h-4 w-4 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium">Compétences visées:</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {outcomes.map((skill, index) => (
                <Badge key={index} variant="outline" className="capitalize">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        {path.benefits && (
          <div className="flex items-start gap-3">
            <TrendingUp className="h-4 w-4 text-emerald-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Bénéfices:</p>
              <ul className="text-sm text-muted-foreground list-disc list-inside mt-1">
                {path.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
