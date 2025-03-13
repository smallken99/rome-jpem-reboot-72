
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
      <div>
        <Label htmlFor="titre">Titre de l'événement</Label>
        <Input 
          id="titre" 
          value={titre}
          onChange={(e) => onTitreChange(e.target.value)}
          placeholder="Ex: Invasion des barbares"
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Décrivez l'événement en détail..."
          rows={4}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Type d'événement</Label>
          <Select
            value={type}
            onValueChange={(value) => onTypeChange(value as EvenementType)}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="POLITIQUE">Politique</SelectItem>
              <SelectItem value="MILITAIRE">Militaire</SelectItem>
              <SelectItem value="DIPLOMATIQUE">Diplomatique</SelectItem>
              <SelectItem value="ECONOMIQUE">Économique</SelectItem>
              <SelectItem value="SOCIAL">Social</SelectItem>
              <SelectItem value="RELIGIEUX">Religieux</SelectItem>
              <SelectItem value="CATASTROPHE">Catastrophe</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="importance">Importance</Label>
          <Select
            value={importance}
            onValueChange={(value) => onImportanceChange(value as ImportanceType)}
          >
            <SelectTrigger id="importance">
              <SelectValue placeholder="Sélectionner l'importance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mineure">Mineure</SelectItem>
              <SelectItem value="normale">Normale</SelectItem>
              <SelectItem value="majeure">Majeure</SelectItem>
              <SelectItem value="critique">Critique</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
