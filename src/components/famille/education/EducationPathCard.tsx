
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EducationPath } from './types/educationTypes';
import { getOutcomeBonuses } from './utils/educationUtils';

interface EducationPathCardProps {
  path: EducationPath;
  onSelect?: () => void;
  isSelected?: boolean;
  showSelectButton?: boolean;
}

const EducationPathCard: React.FC<EducationPathCardProps> = ({
  path,
  onSelect,
  isSelected = false,
  showSelectButton = true
}) => {
  // Get the stat bonuses from the path
  const popularityBonus = getOutcomeBonuses(path, 'popularity');
  const oratoryBonus = getOutcomeBonuses(path, 'oratory');
  const pietyBonus = getOutcomeBonuses(path, 'piety');
  const militaryBonus = getOutcomeBonuses(path, 'martialEducation');

  // Determine which stat is most emphasized
  const mainStat = [
    { name: 'Popularité', value: popularityBonus },
    { name: 'Éloquence', value: oratoryBonus },
    { name: 'Piété', value: pietyBonus },
    { name: 'Éducation Martiale', value: militaryBonus }
  ].sort((a, b) => b.value - a.value)[0];

  return (
    <Card className={`border ${isSelected ? 'border-blue-500 bg-blue-50' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{path.name}</CardTitle>
          <Badge variant={isSelected ? "default" : "outline"}>
            {path.type.charAt(0).toUpperCase() + path.type.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-4">{path.description}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Âge recommandé:</span>
            <span>{path.minAge} - {path.maxAge} ans</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Durée:</span>
            <span>{path.duration} années</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Coût:</span>
            <span>{path.cost} deniers/an</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Stat principale:</span>
            <span className="font-medium">{mainStat.name} +{mainStat.value}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Convient pour:</span>
            <span>
              {path.suitableFor.length === 2 ? 'Tous les genres' : 
                path.suitableFor[0] === 'male' ? 'Garçons uniquement' : 
                'Filles uniquement'}
            </span>
          </div>
        </div>
        
        {path.benefits && path.benefits.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-1">Avantages:</h4>
            <ul className="text-xs space-y-1 list-disc pl-4">
              {path.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      
      {showSelectButton && (
        <CardFooter className="pt-0">
          <Button 
            onClick={onSelect} 
            variant={isSelected ? "default" : "outline"} 
            className="w-full mt-2"
          >
            {isSelected ? 'Sélectionné' : 'Sélectionner ce parcours'}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default EducationPathCard;
