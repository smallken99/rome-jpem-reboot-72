
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loi, LoiState, ImportanceType, LoiType } from '@/components/maitrejeu/types/lois';

interface LoiStatusSectionProps {
  formData: Omit<Loi, 'id'>;
  handleSelectChange: (name: string, value: string) => void;
}

export const LoiStatusSection: React.FC<LoiStatusSectionProps> = ({
  formData,
  handleSelectChange
}) => {
  // Assurer que l'état est l'une des valeurs valides pour l'UI
  const ensureValidState = (state: string | undefined): string => {
    if (!state) return 'proposed';
    return state;
  };

  // Fonction pour garantir que les types d'importance sont corrects
  const getCurrentImportance = (): string => {
    if (!formData.importance) return 'normale';
    return formData.importance as string;
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="catégorie">Catégorie</Label>
        <Select
          value={formData.catégorie || ''}
          onValueChange={(value) => handleSelectChange('catégorie', value)}
        >
          <SelectTrigger id="catégorie">
            <SelectValue placeholder="Sélectionner une catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Agraire">Agraire</SelectItem>
            <SelectItem value="Politique">Politique</SelectItem>
            <SelectItem value="Militaire">Militaire</SelectItem>
            <SelectItem value="Economique">Economique</SelectItem>
            <SelectItem value="Sociale">Sociale</SelectItem>
            <SelectItem value="Religieuse">Religieuse</SelectItem>
            <SelectItem value="Civile">Civile</SelectItem>
            <SelectItem value="Électorale">Électorale</SelectItem>
            <SelectItem value="Administrative">Administrative</SelectItem>
            <SelectItem value="Judiciaire">Judiciaire</SelectItem>
            <SelectItem value="Fiscale">Fiscale</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="état">État</Label>
        <Select
          value={ensureValidState(formData.état as string)}
          onValueChange={(value) => handleSelectChange('état', value)}
        >
          <SelectTrigger id="état">
            <SelectValue placeholder="Sélectionner un état" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="proposed">En délibération</SelectItem>
            <SelectItem value="active">Promulguée</SelectItem>
            <SelectItem value="rejected">Rejetée</SelectItem>
            <SelectItem value="expired">Expirée</SelectItem>
            <SelectItem value="promulguée">Promulguée</SelectItem>
            <SelectItem value="rejetée">Rejetée</SelectItem>
            <SelectItem value="proposée">Proposée</SelectItem>
            <SelectItem value="adoptée">Adoptée</SelectItem>
            <SelectItem value="En délibération">En délibération</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2 col-span-2">
        <Label>Importance</Label>
        <RadioGroup
          value={getCurrentImportance()}
          onValueChange={(value) => handleSelectChange('importance', value)}
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
