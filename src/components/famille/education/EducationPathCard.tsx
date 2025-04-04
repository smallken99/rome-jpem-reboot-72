
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EducationPath } from './types/educationTypes';

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
  return (
    <Card 
      className={`cursor-pointer overflow-hidden transition-shadow hover:shadow-md ${
        isSelected ? 'border-2 border-blue-500 bg-blue-50/50' : ''
      }`}
      onClick={onSelect}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{path.name}</CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-gray-600 mb-3">{path.description}</p>
        
        {path.benefits && (
          <div className="mb-3">
            <div className="text-xs font-medium text-gray-500 mb-1">Bénéfices</div>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              {path.benefits.map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>
          </div>
        )}
        
        {path.specialties && (
          <div className="flex flex-wrap gap-1 mt-2">
            {path.specialties.map((specialty, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EducationPathCard;
