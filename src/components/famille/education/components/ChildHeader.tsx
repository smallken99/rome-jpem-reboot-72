
import React from 'react';
import { Child } from '../types/educationTypes';
import { GenderIcon } from './GenderIcon';

export interface ChildHeaderProps {
  child: Child;
  hasInvalidEducation?: boolean;
  onNameChange?: (id: string, name: string) => void;
}

export const ChildHeader: React.FC<ChildHeaderProps> = ({ 
  child, 
  hasInvalidEducation = false,
  onNameChange = () => {} // Default empty function
}) => {
  return (
    <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <GenderIcon gender={child.gender} size={20} />
        <h3 className="font-semibold">{child.name}</h3>
        <span className="text-sm text-slate-500">{child.age} ans</span>
        
        {hasInvalidEducation && (
          <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">
            Éducation inappropriée
          </span>
        )}
      </div>
      
      <div className="text-sm">
        Status: <span className="font-medium">{child.status || 'En formation'}</span>
      </div>
    </div>
  );
};
