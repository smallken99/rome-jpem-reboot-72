
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Clock, Coins } from 'lucide-react';
import { EducationPath, Gender } from './types/educationTypes';

interface EducationPathCardProps {
  path: EducationPath;
  onSelect?: () => void;
  selectedPath?: string;
  disabled?: boolean;
  childGender?: Gender;
}

export const EducationPathCard: React.FC<EducationPathCardProps> = ({
  path,
  onSelect,
  selectedPath,
  disabled = false,
  childGender
}) => {
  const isSelected = selectedPath === path.id;
  
  // Check if this path is suitable for the child's gender
  const isGenderCompatible = !childGender || path.suitableFor.includes(childGender);
  
  // Function to get appropriate color based on path type
  const getPathColor = () => {
    switch (path.type) {
      case 'military': return 'bg-red-100 text-red-800';
      case 'political': return 'bg-blue-100 text-blue-800';
      case 'religious': return 'bg-purple-100 text-purple-800';
      case 'rhetoric': return 'bg-amber-100 text-amber-800';
      case 'academic': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <Card 
      className={`
        overflow-hidden transition-all duration-200
        ${isSelected ? 'ring-2 ring-primary' : ''}
        ${disabled || !isGenderCompatible ? 'opacity-60' : ''}
      `}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{path.name}</CardTitle>
            <Badge className={getPathColor()}>
              {path.type.charAt(0).toUpperCase() + path.type.slice(1)}
            </Badge>
          </div>
          
          {!isGenderCompatible && (
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              {childGender === 'female' ? 'Réservé aux garçons' : 'Réservé aux filles'}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{path.description}</p>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>Âge: {path.minAge}-{path.maxAge} ans</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>Durée: {path.duration} ans</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Coins className="h-4 w-4 text-muted-foreground" />
            <span>Coût: {path.cost} as/an</span>
          </div>
          
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>Stat: +{path.outcomes.bonuses?.[path.relatedStat] || 0}</span>
          </div>
        </div>
        
        {onSelect && (
          <Button 
            onClick={onSelect} 
            className="w-full"
            disabled={disabled || !isGenderCompatible}
            variant={isSelected ? "default" : "outline"}
          >
            {isSelected ? "Sélectionné" : "Choisir"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
