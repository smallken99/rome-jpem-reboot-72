
import React, { useState } from 'react';
import { getEducationTypeIcon, getEducationTypeName } from '../utils/educationUtils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Edit, Check } from 'lucide-react';

interface ChildProps {
  id: string;
  name: string;
  age: number;
  gender: string;
  educationType: string;
}

interface ChildHeaderProps {
  child: ChildProps;
  hasInvalidEducation: boolean;
  onNameChange?: (childId: string, newName: string) => void;
}

export const ChildHeader: React.FC<ChildHeaderProps> = ({ 
  child, 
  hasInvalidEducation,
  onNameChange 
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(child.name);

  // Handle name save
  const handleSaveName = () => {
    if (nameValue.trim() && onNameChange) {
      onNameChange(child.id, nameValue.trim());
      setIsEditingName(false);
    }
  };

  // Handle keydown on name input
  const handleNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveName();
    } else if (e.key === 'Escape') {
      setNameValue(child.name);
      setIsEditingName(false);
    }
  };

  return (
    <div className="flex justify-between items-start">
      <div>
        {isEditingName ? (
          <div className="flex items-center gap-2">
            <Input
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              onKeyDown={handleNameKeyDown}
              className="font-cinzel h-8 text-base"
              autoFocus
            />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleSaveName}
              className="h-7 w-7"
            >
              <Check className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <h4 className="font-cinzel">{child.name}</h4>
            {onNameChange && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsEditingName(true)}
                className="h-5 w-5 opacity-50 hover:opacity-100"
              >
                <Edit className="h-3 w-3" />
              </Button>
            )}
          </div>
        )}
        <p className="text-sm text-muted-foreground">
          {child.age} ans • {child.gender === 'male' ? 'Garçon' : 'Fille'}
        </p>
      </div>
      
      {child.educationType !== 'none' ? (
        <div className={`flex items-center gap-1 px-2 py-1 ${hasInvalidEducation ? 'bg-red-100 text-red-700' : 'bg-rome-navy/10'} rounded text-xs`}>
          {getEducationTypeIcon(child.educationType)}
          <span>{getEducationTypeName(child.educationType)}</span>
          {hasInvalidEducation && <span className="text-xs text-red-600 ml-1">⚠️</span>}
        </div>
      ) : (
        <div className="px-2 py-1 bg-muted rounded text-xs">
          Pas d'éducation
        </div>
      )}
    </div>
  );
};
