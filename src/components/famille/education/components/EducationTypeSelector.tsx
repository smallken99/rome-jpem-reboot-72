
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { EducationTypeSelectorProps } from '../types/educationTypes';
import { educationPaths } from '../data';

export const EducationTypeSelector: React.FC<EducationTypeSelectorProps> = ({
  selectedType,
  onChange,
  onSelectType,
  disabled = false,
  gender,
  childGender,
  value
}) => {
  // Use the most appropriate prop based on what's provided
  const currentValue = value || selectedType;
  
  // Handle changes
  const handleChange = (value: string) => {
    if (onChange) onChange(value);
    if (onSelectType) onSelectType(value);
  };
  
  // Filter education paths based on gender if provided
  const filteredPaths = educationPaths.filter(path => {
    // If no gender restriction, show all
    if (!gender && !childGender) return true;
    
    // Check if path has gender requirements
    if (path.requirements && typeof path.requirements === 'object' && 'gender' in path.requirements) {
      const genderReq = path.requirements.gender;
      const checkGender = gender || childGender;
      
      // If requirement is 'both' or matches the gender
      return genderReq === 'both' || genderReq === checkGender;
    }
    
    return true;
  });
  
  return (
    <RadioGroup
      value={currentValue}
      onValueChange={handleChange}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      disabled={disabled}
    >
      {filteredPaths.map(path => {
        // Check if path has age requirements
        const hasAgeRequirement = path.requirements && 
          typeof path.requirements === 'object' && 
          'age' in path.requirements && 
          path.requirements.age !== undefined;
        
        // Format path name
        const pathName = path.name;
        
        return (
          <div key={path.id} className="relative">
            <RadioGroupItem
              value={path.id}
              id={path.id}
              className="peer sr-only"
            />
            <Label
              htmlFor={path.id}
              className="flex flex-col border rounded-md p-3 hover:bg-muted/20 hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 [&:has([data-state=checked])]:border-primary transition-colors cursor-pointer"
            >
              <span className="font-medium">{pathName}</span>
              <span className="text-xs text-muted-foreground mt-1">
                {path.description}
              </span>
              
              {/* Path details */}
              {path.requirements && (
                <div className="mt-2 text-xs space-y-1 border-t pt-2">
                  {hasAgeRequirement && (
                    <p>
                      Âge requis: {path.requirements.age}+ ans
                    </p>
                  )}
                  
                  {path.requirements && 
                   typeof path.requirements === 'object' && 
                   'gender' in path.requirements && 
                   path.requirements.gender !== 'both' && (
                    <p>
                      Genre: {path.requirements.gender === 'male' ? 'Garçon' : 'Fille'}
                    </p>
                  )}
                  
                  {typeof path.cost === 'number' && (
                    <p>
                      Coût: {path.cost} <span className="text-muted-foreground">as/an</span>
                    </p>
                  )}
                  
                  {typeof path.duration === 'number' && (
                    <p>
                      Durée: {path.duration} {path.duration > 1 ? 'années' : 'année'}
                    </p>
                  )}
                </div>
              )}
              
              {path.benefits && (
                <div className="mt-2 text-xs border-t pt-2">
                  <p className="font-medium">Bénéfices:</p>
                  <ul className="list-disc list-inside text-muted-foreground mt-1">
                    {path.benefits.slice(0, 2).map((benefit, idx) => (
                      <li key={idx}>{benefit}</li>
                    ))}
                    {path.benefits.length > 2 && <li>...</li>}
                  </ul>
                </div>
              )}
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
};
