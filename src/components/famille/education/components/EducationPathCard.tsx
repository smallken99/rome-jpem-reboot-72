
import React from 'react';
import { EducationPath } from '../types/educationTypes';
import { Card, CardContent } from '@/components/ui/card';

export interface EducationPathCardProps {
  path: EducationPath;
  isSelected?: boolean;
  onSelect?: () => void;
}

const EducationPathCard: React.FC<EducationPathCardProps> = ({ path, isSelected, onSelect }) => {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${isSelected ? 'border-primary border-2' : ''}`} 
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary`}>
            {path.icon && <span>{path.icon}</span>}
          </div>
          <div>
            <h3 className="font-medium">{path.name}</h3>
            <p className="text-xs text-muted-foreground">{path.description.substring(0, 60)}...</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationPathCard;
