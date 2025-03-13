
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { EvenementType, ImportanceType } from '../../types/evenements';

interface EvenementBasicInfoProps {
  titre: string;
  description: string;
  type: EvenementType;
  importance: ImportanceType;
  onTitreChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onTypeChange: (value: EvenementType) => void;
  onImportanceChange: (value: ImportanceType) => void;
}

export const EvenementBasicInfo: React.FC<EvenementBasicInfoProps> = ({
  titre,
  description,
  type,
  importance,
  onTitreChange,
  onDescriptionChange,
  onTypeChange,
  onImportanceChange
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Titre</Label>
        <Input 
          id="title" 
          value={titre}
          onChange={(e) => onTitreChange(e.target.value)}
          placeholder="Titre de l'événement"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Description détaillée de l'événement"
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select 
            value={type}
            onValueChange={(value) => onTypeChange(value as EvenementType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Type d'événement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="POLITIQUE">Politique</SelectItem>
              <SelectItem value="GUERRE">Guerre</SelectItem>
              <SelectItem value="ECONOMIQUE">Économique</SelectItem>
              <SelectItem value="RELIGION">Religion</SelectItem>
              <SelectItem value="DIPLOMATIQUE">Diplomatique</SelectItem>
              <SelectItem value="SOCIAL">Social</SelectItem>
              <SelectItem value="CRISE">Crise</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>Importance</Label>
          <RadioGroup 
            value={importance} 
            onValueChange={(value) => onImportanceChange(value as ImportanceType)}
            className="flex space-x-2"
          >
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="mineure" id="mineure" />
              <Label htmlFor="mineure">Mineure</Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="normale" id="normale" />
              <Label htmlFor="normale">Normale</Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="majeure" id="majeure" />
              <Label htmlFor="majeure">Majeure</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};
