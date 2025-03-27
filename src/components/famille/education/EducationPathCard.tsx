
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EducationPath, Gender } from './types/educationTypes';
import { Book, Scroll, Sword, Heart, Users, MessageCircle } from 'lucide-react';
import { getOutcomeBonuses, getOutcomeSkills } from './utils/educationUtils';

interface EducationPathCardProps {
  path: EducationPath;
  onClick?: () => void;
  selected?: boolean;
  compact?: boolean;
  gender?: Gender;
}

const EducationPathCard: React.FC<EducationPathCardProps> = ({
  path,
  onClick,
  selected = false,
  compact = false,
  gender
}) => {
  // Get the appropriate icon for the path type
  const getPathIcon = (type: string) => {
    switch (type) {
      case 'military':
        return <Sword className="h-5 w-5 text-red-500" />;
      case 'religious':
        return <Heart className="h-5 w-5 text-purple-500" />;
      case 'political':
        return <Users className="h-5 w-5 text-blue-500" />;
      case 'rhetoric':
        return <MessageCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Book className="h-5 w-5 text-gray-500" />;
    }
  };

  // Check if this education path is valid for the given gender
  const isValidForGender = !gender || !path.suitableFor || path.suitableFor.includes(gender);

  // Get stats bonuses
  const popularityBonus = getOutcomeBonuses(path, 'popularity');
  const oratoryBonus = getOutcomeBonuses(path, 'oratory');
  const pietyBonus = getOutcomeBonuses(path, 'piety');
  const martialBonus = getOutcomeBonuses(path, 'martialEducation');

  const cardClassName = `
    border rounded-md overflow-hidden
    ${selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
    ${onClick ? 'cursor-pointer hover:border-blue-300 transition-colors' : ''}
    ${compact ? 'h-full' : ''}
  `;

  return (
    <Card
      className={cardClassName}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {getPathIcon(path.type)}
            <CardTitle className={compact ? "text-lg" : "text-xl"}>
              {path.name}
            </CardTitle>
          </div>
          {!isValidForGender && (
            <Badge variant="outline" className="text-red-500 border-red-300 bg-red-50">
              Non disponible pour ce genre
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-3">
          {path.description}
        </p>

        {!compact && (
          <>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <span className="text-xs text-gray-500">Âge minimum</span>
                <p className="text-sm font-medium">{path.minAge} ans</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Durée</span>
                <p className="text-sm font-medium">{path.duration} ans</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Coût</span>
                <p className="text-sm font-medium">{path.cost} as</p>
              </div>
              <div>
                <span className="text-xs text-gray-500">Stat clé</span>
                <p className="text-sm font-medium">{path.relatedStat}</p>
              </div>
            </div>

            <div className="mb-3">
              <h4 className="text-sm font-medium mb-1">Bonifications de stats</h4>
              <div className="grid grid-cols-2 gap-1">
                {popularityBonus > 0 && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    Popularité +{popularityBonus}
                  </span>
                )}
                {oratoryBonus > 0 && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    Éloquence +{oratoryBonus}
                  </span>
                )}
                {pietyBonus > 0 && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    Piété +{pietyBonus}
                  </span>
                )}
                {martialBonus > 0 && (
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    Éducation Martiale +{martialBonus}
                  </span>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-1">Compétences acquises</h4>
              <div className="flex flex-wrap gap-1">
                {getOutcomeSkills(path).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    <Scroll className="h-3 w-3 mr-1" />
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {path.benefits && path.benefits.length > 0 && (
              <div className="mt-3">
                <h4 className="text-sm font-medium mb-1">Bénéfices additionnels</h4>
                <ul className="text-xs text-gray-600 list-disc pl-5 space-y-1">
                  {path.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default EducationPathCard;
