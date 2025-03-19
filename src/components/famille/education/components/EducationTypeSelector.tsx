
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Sword, BookOpen, Heart } from 'lucide-react';
import { EducationTypeSelectorProps } from '../types/educationTypes';

export const EducationTypeSelector: React.FC<EducationTypeSelectorProps> = ({
  selectedType,
  onChange,
  childGender
}) => {
  const handleTypeChange = (value: string) => {
    onChange(value);
  };
  
  return (
    <RadioGroup value={selectedType} onValueChange={handleTypeChange} className="space-y-3">
      <div>
        <Label className="text-base mb-2 block">Choisissez un type d'éducation</Label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Military education - only for boys */}
          <Card className={`cursor-pointer transition ${
            childGender === 'female' ? 'opacity-50 cursor-not-allowed' : 
            selectedType === 'military' ? 'border-primary ring-1 ring-primary' : ''
          }`}>
            <CardContent className="p-3 flex items-center gap-3">
              <RadioGroupItem 
                value="military" 
                id="military" 
                disabled={childGender === 'female'}
                className="text-primary"
              />
              <div className="bg-red-50 rounded-full p-2">
                <Sword className="h-4 w-4 text-red-600" />
              </div>
              <Label htmlFor="military" className="cursor-pointer font-medium">
                Militaire
              </Label>
            </CardContent>
          </Card>

          {/* Rhetoric education */}
          <Card className={`cursor-pointer transition ${
            selectedType === 'rhetoric' ? 'border-primary ring-1 ring-primary' : ''
          }`}>
            <CardContent className="p-3 flex items-center gap-3">
              <RadioGroupItem value="rhetoric" id="rhetoric" className="text-primary" />
              <div className="bg-blue-50 rounded-full p-2">
                <BookOpen className="h-4 w-4 text-blue-600" />
              </div>
              <Label htmlFor="rhetoric" className="cursor-pointer font-medium">
                Rhétorique
              </Label>
            </CardContent>
          </Card>

          {/* Religious education */}
          <Card className={`cursor-pointer transition ${
            selectedType === 'religious' ? 'border-primary ring-1 ring-primary' : ''
          }`}>
            <CardContent className="p-3 flex items-center gap-3">
              <RadioGroupItem value="religious" id="religious" className="text-primary" />
              <div className="bg-amber-50 rounded-full p-2">
                <Heart className="h-4 w-4 text-amber-600" />
              </div>
              <Label htmlFor="religious" className="cursor-pointer font-medium">
                Religieuse
              </Label>
            </CardContent>
          </Card>
        </div>
      </div>
    </RadioGroup>
  );
};
