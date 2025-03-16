
import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { ChildHeaderProps } from '../types/educationTypes';

export const ChildHeader: React.FC<ChildHeaderProps> = ({ 
  child, 
  onNameChange,
  hasInvalidEducation = false 
}) => {
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
            <h3 className="font-medium text-lg">{child.name}</h3>
            <div className="text-sm text-muted-foreground">
              {child.age} ans - {child.gender === 'male' ? 'Garçon' : 'Fille'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
