
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { educationPaths } from '../data/educationPaths';
import { EducationTypeSelectorProps } from '../types/educationTypes';
import { Sword, Heart, BookOpen } from 'lucide-react';

export const EducationTypeSelector: React.FC<EducationTypeSelectorProps> = ({
  selectedType,
  onChange,
  disabled = false,
  gender = 'male',
  value,
  childGender,
  onSelectType
}) => {
  // Use the appropriate gender, falling back to props
  const actualGender = childGender || gender;
  
  // Filter paths based on gender - handling both array and object requirements
  const availablePaths = educationPaths.filter(path => {
    if (!path.requirements) return true;
    
    if (Array.isArray(path.requirements)) {
      return true; // No gender restrictions in array format
    }
    
    return path.requirements.gender === 'both' || path.requirements.gender === actualGender;
  });
  
  // Handle type change
  const handleTypeChange = (type: string) => {
    if (disabled) return;
    
    // Use the appropriate callback
    if (onSelectType) {
      onSelectType(type);
    } else if (onChange) {
      onChange(type);
    }
  };
  
  // Map education type to icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'military':
        return <Sword className="h-5 w-5 text-red-500" />;
      case 'religious':
        return <Heart className="h-5 w-5 text-purple-500" />;
      case 'rhetoric':
      default:
        return <BookOpen className="h-5 w-5 text-blue-500" />;
    }
  };
  
  return (
    <Tabs 
      defaultValue={selectedType} 
      value={value || selectedType}
      onValueChange={handleTypeChange}
      className="w-full"
    >
      <TabsList className="grid grid-cols-3 mb-4">
        {availablePaths.map(path => (
          <TabsTrigger 
            key={path.id} 
            value={path.id}
            disabled={disabled || (
              path.requirements && 
              typeof path.requirements === 'object' &&
              !Array.isArray(path.requirements) &&
              path.requirements.gender !== 'both' && 
              path.requirements.gender !== actualGender
            )}
          >
            {path.name.split(' ')[1]}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {availablePaths.map(path => (
        <TabsContent key={path.id} value={path.id}>
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-start gap-3">
                {getTypeIcon(path.id)}
                <div>
                  <h3 className="font-medium text-lg">{path.name}</h3>
                  <p className="text-sm text-muted-foreground">{path.description}</p>
                  
                  {path.benefits && path.benefits.length > 0 && (
                    <ul className="mt-2 text-sm space-y-1">
                      {path.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center">
                          <span className="mr-2 text-green-500">•</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <div className="mt-3 pt-3 border-t text-sm space-y-1">
                    {path.requirements && (
                      <>
                        {typeof path.requirements === 'object' && !Array.isArray(path.requirements) && (
                          <>
                            {path.requirements.age && (
                              <p><span className="font-medium">Âge minimum:</span> {path.requirements.age} ans</p>
                            )}
                            {path.requirements.gender && path.requirements.gender !== 'both' && (
                              <p><span className="font-medium">Genre:</span> {path.requirements.gender === 'male' ? 'Garçons uniquement' : 'Filles uniquement'}</p>
                            )}
                          </>
                        )}
                        {typeof path.requirements === 'object' && !Array.isArray(path.requirements) && path.requirements.cost && (
                          <p><span className="font-medium">Coût:</span> {typeof path.requirements.cost === 'number' ? path.requirements.cost.toLocaleString() : path.requirements.cost} as</p>
                        )}
                        {typeof path.requirements === 'object' && !Array.isArray(path.requirements) && path.requirements.duration && (
                          <p><span className="font-medium">Durée:</span> {path.requirements.duration}</p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};
