
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loi } from '../../../types/lois';
import { ImportanceType } from '../../../types/common';

interface LoiStatusSectionProps {
  formData: Omit<Loi, 'id'>;
  handleSelectChange: (name: string, value: string) => void;
}

export const LoiStatusSection: React.FC<LoiStatusSectionProps> = ({
  formData,
  handleSelectChange
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="catégorie">Catégorie</Label>
        <Select
          value={formData.catégorie}
          onValueChange={(value) => handleSelectChange('catégorie', value)}
        >
          <SelectTrigger id="catégorie">
            <SelectValue placeholder="Sélectionner une catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Agraire">Agraire</SelectItem>
            <SelectItem value="Électorale">Électorale</SelectItem>
            <SelectItem value="Administrative">Administrative</SelectItem>
            <SelectItem value="Judiciaire">Judiciaire</SelectItem>
            <SelectItem value="Militaire">Militaire</SelectItem>
            <SelectItem value="Fiscale">Fiscale</SelectItem>
            <SelectItem value="Religieuse">Religieuse</SelectItem>
            <SelectItem value="Sociale">Sociale</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="état">État</Label>
        <Select
          value={formData.état}
          onValueChange={(value) => handleSelectChange('état', value)}
        >
          <SelectTrigger id="état">
            <SelectValue placeholder="Sélectionner un état" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="En délibération">En délibération</SelectItem>
            <SelectItem value="Promulguée">Promulguée</SelectItem>
            <SelectItem value="Rejetée">Rejetée</SelectItem>
            <SelectItem value="proposée">Proposée</SelectItem>
            <SelectItem value="adoptée">Adoptée</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2 col-span-2">
        <Label>Importance</Label>
        <RadioGroup
          value={formData.importance}
          onValueChange={(value) => handleSelectChange('importance', value as ImportanceType)}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mineure" id="mineure" />
            <Label htmlFor="mineure">Mineure</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="normale" id="normale" />
            <Label htmlFor="normale">Normale</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="majeure" id="majeure" />
            <Label htmlFor="majeure">Majeure</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
