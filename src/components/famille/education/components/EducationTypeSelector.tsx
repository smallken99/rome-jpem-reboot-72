
import React from 'react';
import { BookOpen } from 'lucide-react';
import { EducationPath } from '../types/educationTypes';
import { EducationWarning } from './EducationWarning';

interface EducationTypeSelectorProps {
  availablePaths: EducationPath[];
  selectedEducationType: string;
  onSelectEducationType: (type: string) => void;
  isInvalidEducation: boolean;
  childGender: string;
}

export const EducationTypeSelector: React.FC<EducationTypeSelectorProps> = ({
  availablePaths,
  selectedEducationType,
  onSelectEducationType,
  isInvalidEducation,
  childGender
}) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-rome-navy" />
        <span>Parcours éducatif</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {availablePaths.map((path) => (
          <div 
            key={path.type}
            className={`border rounded-md p-3 cursor-pointer transition-all ${
              selectedEducationType === path.type 
                ? 'border-rome-gold bg-rome-parchment' 
                : 'border-muted hover:border-rome-gold/50'
            }`}
            onClick={() => onSelectEducationType(path.type)}
          >
            <div className="flex items-center gap-2 mb-1">
              {path.icon}
              <h4 className="font-medium">{path.title}</h4>
            </div>
            <p className="text-xs text-muted-foreground">{path.description}</p>
            <p className="text-xs mt-2">
              <span className="font-medium">Durée:</span> {path.duration} années
            </p>
            
            {isInvalidEducation && path.type === 'military' && childGender === 'female' && (
              <EducationWarning 
                text="Formation non recommandée pour une fille romaine" 
              />
            )}
          </div>
        ))}
        
        <div 
          className={`border rounded-md p-3 cursor-pointer transition-all ${
            selectedEducationType === 'none' 
              ? 'border-rome-gold bg-rome-parchment' 
              : 'border-muted hover:border-rome-gold/50'
          }`}
          onClick={() => onSelectEducationType('none')}
        >
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            <h4 className="font-medium">Aucune éducation</h4>
          </div>
          <p className="text-xs text-muted-foreground">
            Ne pas assigner d'éducation formelle à cet enfant
          </p>
        </div>
      </div>
    </div>
  );
};
