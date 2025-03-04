
import React, { useState } from 'react';
import { getEducationTypeIcon, getEducationTypeName } from '../utils/educationUtils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Edit, Check, BookOpen, GraduationCap } from 'lucide-react';
import { RomanCard } from '@/components/ui-custom/RomanCard';

interface ChildHeaderProps {
  child: {
    id: string;
    name: string;
    age: number;
    gender: string;
    currentEducation?: {
      type: string;
      educationHistory?: {
        type: string;
        completedAt: number;
      }[];
    };
  };
  hasInvalidEducation?: boolean;
  onNameChange?: (childId: string, newName: string) => void;
}

export const ChildHeader: React.FC<ChildHeaderProps> = ({ 
  child, 
  hasInvalidEducation = false,
  onNameChange 
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(child.name);
  const educationType = child.currentEducation?.type || 'none';
  const educationHistory = child.currentEducation?.educationHistory || [];

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
    <div className="flex justify-between items-start p-4 border-b border-muted">
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
            <h4 className="font-cinzel text-lg">{child.name}</h4>
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
        
        {/* Education history */}
        {educationHistory.length > 0 && (
          <div className="mt-2 flex items-center gap-1 text-xs">
            <GraduationCap className="h-3 w-3 text-rome-gold" />
            <span className="text-muted-foreground">
              Formations complétées: {educationHistory.length}
            </span>
          </div>
        )}
      </div>
      
      <div className="flex flex-col items-end gap-2">
        {educationType !== 'none' ? (
          <div className={`flex items-center gap-1 px-2 py-1 ${hasInvalidEducation ? 'bg-red-100 text-red-700' : 'bg-rome-navy/10'} rounded text-xs`}>
            {getEducationTypeIcon(educationType)}
            <span>{getEducationTypeName(educationType)}</span>
            {hasInvalidEducation && <span className="text-xs text-red-600 ml-1">⚠️</span>}
          </div>
        ) : (
          <div className="px-2 py-1 bg-muted rounded text-xs">
            <BookOpen className="h-3 w-3 inline mr-1" />
            <span>Pas d'éducation</span>
          </div>
        )}
        
        {/* Display past educations as small badges */}
        {educationHistory.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-end max-w-[200px]">
            {educationHistory.map((edu, idx) => (
              <div key={idx} className="bg-green-50 text-green-700 text-xs px-1.5 py-0.5 rounded-full">
                {getEducationTypeIcon(edu.type, { size: 10 })}
                <span className="ml-0.5">{getEducationTypeName(edu.type)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
