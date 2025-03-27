
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Award, 
  GraduationCap, 
  Clock, 
  Coins, 
  User, 
  Users, 
  BookOpen, 
  Sword, 
  Shield,
  Heart 
} from 'lucide-react';
import { EducationPath, EducationType } from './types/educationTypes';

// Icons for different education types
const typeIcons: Record<string, React.ReactElement> = {
  military: <Sword className="h-4 w-4" />,
  political: <Shield className="h-4 w-4" />,
  religious: <Heart className="h-4 w-4" />,
  artistic: <BookOpen className="h-4 w-4" />,
  philosophical: <BookOpen className="h-4 w-4" />,
  rhetoric: <Users className="h-4 w-4" />,
  academic: <GraduationCap className="h-4 w-4" />,
  none: <User className="h-4 w-4" />
};

interface EducationPathCardProps {
  path: EducationPath;
  isSelected?: boolean;
  onSelect?: () => void;
}

const EducationPathCard: React.FC<EducationPathCardProps> = ({ 
  path, 
  isSelected = false,
  onSelect
}) => {
  // Determine the icon based on education type
  const icon = typeIcons[path.type as string] || <GraduationCap className="h-4 w-4" />;
  
  // Handle click event
  const handleClick = () => {
    if (onSelect) {
      onSelect();
    }
  };

  // Check if the education is for males, females, or both
  const getGenderBadge = () => {
    if (Array.isArray(path.suitableFor)) {
      // Handle older format where suitableFor is Gender[]
      if (path.suitableFor.includes('male') && path.suitableFor.includes('female')) {
        return <Badge variant="outline">Tous genres</Badge>;
      } else if (path.suitableFor.includes('male')) {
        return <Badge variant="outline">Hommes uniquement</Badge>;
      } else if (path.suitableFor.includes('female')) {
        return <Badge variant="outline">Femmes uniquement</Badge>;
      }
    } else if (path.suitableFor && typeof path.suitableFor === 'object') {
      // Handle newer format where suitableFor is {gender: string}
      if (path.suitableFor.gender === 'both') {
        return <Badge variant="outline">Tous genres</Badge>;
      } else if (path.suitableFor.gender === 'male') {
        return <Badge variant="outline">Hommes uniquement</Badge>;
      } else if (path.suitableFor.gender === 'female') {
        return <Badge variant="outline">Femmes uniquement</Badge>;
      }
    }
    return null;
  };

  return (
    <Card 
      className={`cursor-pointer hover:shadow-md transition-shadow ${isSelected ? 'border-blue-500 shadow-blue-100' : ''}`}
      onClick={handleClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg flex items-center gap-2">
            {icon}
            {path.name}
          </CardTitle>
          {getGenderBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{path.description}</p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{path.duration} ans</span>
          </div>
          <div className="flex items-center gap-1">
            <Coins className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{path.cost} as/an</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{path.minAge}-{path.maxAge} ans</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{path.relatedStat}</span>
          </div>
        </div>
        
        {path.benefits && Array.isArray(path.benefits) && path.benefits.length > 0 && (
          <div className="mt-2">
            <h4 className="text-sm font-medium mb-1">Bénéfices</h4>
            <ul className="text-xs list-disc pl-4 space-y-1">
              {path.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EducationPathCard;
