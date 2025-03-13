
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, Users } from 'lucide-react';
import { EducationPath } from './types/educationTypes';

interface EducationPathCardProps {
  path: EducationPath;
}

export const EducationPathCard: React.FC<EducationPathCardProps> = ({ path }) => {
  // Helper to format the education type
  const formatEducationType = (type: string) => {
    switch (type) {
      case 'rhetoric': return { name: 'Rhétorique', color: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 'politics': return { name: 'Politique', color: 'bg-purple-100 text-purple-800 border-purple-200' };
      case 'military': return { name: 'Militaire', color: 'bg-red-100 text-red-800 border-red-200' };
      case 'religious': return { name: 'Religieuse', color: 'bg-amber-100 text-amber-800 border-amber-200' };
      default: return { name: type, color: 'bg-gray-100 text-gray-800 border-gray-200' };
    }
  };
  
  const { name, color } = formatEducationType(path.id);
  
  // Get skills based on outcomes type
  const getSkills = () => {
    if (!path.outcomes) return [];
    if (Array.isArray(path.outcomes)) return path.outcomes;
    return path.outcomes.skills || [];
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{path.name}</CardTitle>
          <Badge className={color}>{name}</Badge>
        </div>
        <CardDescription>{path.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>Durée: {path.duration} {path.duration > 1 ? 'années' : 'année'}</span>
        </div>
        
        {path.requirements && (
          <div className="text-sm">
            <p className="font-medium mb-1">Conditions:</p>
            <ul className="space-y-1 text-muted-foreground">
              {path.requirements.age && (
                <li className="flex items-center gap-1">
                  <span>• Âge minimum: {path.requirements.age} ans</span>
                </li>
              )}
              {path.requirements.gender && (
                <li className="flex items-center gap-1">
                  <span>• Genre: {path.requirements.gender === 'both' 
                    ? 'Tous' 
                    : path.requirements.gender === 'male' 
                      ? 'Garçons uniquement' 
                      : 'Filles uniquement'}</span>
                </li>
              )}
            </ul>
          </div>
        )}
        
        <div className="text-sm pt-2 border-t">
          <p className="font-medium mb-1">Bénéfices:</p>
          <ul className="space-y-1">
            {path.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-1 text-muted-foreground">
                <Check className="h-3 w-3 text-green-600 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="text-sm pt-2 border-t">
          <p className="font-medium mb-1">Compétences acquises:</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {getSkills().map((skill, idx) => (
              <Badge key={idx} variant="outline" className="capitalize">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
