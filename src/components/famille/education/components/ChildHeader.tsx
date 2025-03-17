
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Child } from '../types/educationTypes';

interface ChildHeaderProps {
  child: Child;
  onNameChange?: (id: string, newName: string) => void;
  hasInvalidEducation?: boolean;
}

export const ChildHeader: React.FC<ChildHeaderProps> = ({ 
  child, 
  onNameChange,
  hasInvalidEducation
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(child.name);
  
  const handleSave = () => {
    if (newName.trim() && onNameChange) {
      onNameChange(child.id, newName);
    }
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setNewName(child.name);
    setIsEditing(false);
  };
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="max-w-[200px]"
              autoFocus
            />
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={handleSave} 
              className="h-8 w-8 text-green-600"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={handleCancel} 
              className="h-8 w-8 text-red-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-semibold">{child.name}</h3>
            {onNameChange && (
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => setIsEditing(true)} 
                className="h-8 w-8"
              >
                <Edit className="h-3.5 w-3.5" />
              </Button>
            )}
          </>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <Badge variant="outline" className={`${child.gender === 'male' ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'}`}>
          {child.gender === 'male' ? 'Garçon' : 'Fille'}
        </Badge>
        <Badge variant="outline" className="bg-amber-50 text-amber-700">
          {child.age} ans
        </Badge>
        
        {hasInvalidEducation && (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Éducation incompatible
          </Badge>
        )}
      </div>
    </div>
  );
};
