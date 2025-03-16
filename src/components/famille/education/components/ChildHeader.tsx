
import React, { useState } from 'react';
import { Shield, AlertTriangle, Edit, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChildHeaderProps } from '../types/educationTypes';
import { toast } from 'sonner';

export const ChildHeader: React.FC<ChildHeaderProps> = ({ 
  child, 
  onNameChange,
  hasInvalidEducation = false 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nameValue, setNameValue] = useState(child.name);

  const handleSubmitNameChange = () => {
    if (nameValue.trim() === '') {
      toast.error("Le nom ne peut pas être vide");
      return;
    }
    
    if (onNameChange) {
      onNameChange(child.id, nameValue);
      toast.success(`Nom changé en ${nameValue}`);
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmitNameChange();
    }
    if (e.key === 'Escape') {
      setNameValue(child.name);
      setIsEditing(false);
    }
  };

  return (
    <div className={`p-4 ${hasInvalidEducation ? 'bg-amber-50' : child.gender === 'male' ? 'bg-blue-50' : 'bg-rose-50'}`}>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          {hasInvalidEducation ? (
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          ) : (
            <Shield className={`h-5 w-5 ${child.gender === 'male' ? 'text-blue-500' : 'text-rose-500'}`} />
          )}
          <div>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  autoFocus
                  className="py-1 h-8 text-lg"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleSubmitNameChange}
                  className="h-8 w-8"
                >
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-lg">{child.name}</h3>
                {onNameChange && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsEditing(true)}
                    className="h-6 w-6 opacity-50 hover:opacity-100"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                )}
              </div>
            )}
            <div className="text-sm text-muted-foreground">
              {child.age} ans - {child.gender === 'male' ? 'Garçon' : 'Fille'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
