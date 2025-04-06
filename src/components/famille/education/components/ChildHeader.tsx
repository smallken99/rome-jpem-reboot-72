
import React, { useState } from 'react';
import { Child } from '../types/educationTypes';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Pencil, AlertTriangle } from 'lucide-react';

interface ChildHeaderProps {
  child: Child;
  onNameChange?: (id: string, newName: string) => void;
  hasInvalidEducation?: boolean;
}

export const ChildHeader: React.FC<ChildHeaderProps> = ({
  child,
  onNameChange,
  hasInvalidEducation = false
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nameValue, setNameValue] = useState(child.name);
  
  const handleSaveName = () => {
    if (nameValue.trim() && onNameChange) {
      onNameChange(child.id, nameValue);
    }
    setIsEditing(false);
  };
  
  return (
    <div className={`p-3 flex justify-between items-center border-b ${hasInvalidEducation ? 'bg-red-50' : (child.status === 'learning' ? 'bg-blue-50' : 'bg-primary/10')}`}>
      <div className="flex-grow">
        {isEditing ? (
          <div className="flex items-center">
            <Input
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              className="max-w-xs"
              autoFocus
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveName}
              className="ml-2"
            >
              <Check className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center">
            <h3 className="text-lg font-medium">{child.name}</h3>
            {onNameChange && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="ml-2"
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        )}
        <div className="text-sm text-muted-foreground">
          {child.age} ans • {child.gender === 'male' ? 'Garçon' : 'Fille'}
        </div>
      </div>
      
      <div className="flex items-center">
        {hasInvalidEducation && (
          <Badge variant="destructive" className="mr-2 gap-1">
            <AlertTriangle className="h-3 w-3" />
            Incompatible
          </Badge>
        )}
      </div>
    </div>
  );
};
