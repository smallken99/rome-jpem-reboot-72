
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Character } from '@/types/character';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NewCharacterData } from '../hooks/useCharacters';

interface AddFamilyMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (member: Partial<Character>) => void;
  existingMembers: Character[];
}

export const AddFamilyMemberDialog: React.FC<AddFamilyMemberDialogProps> = ({
  isOpen,
  onClose,
  onAdd,
  existingMembers
}) => {
  const [formData, setFormData] = useState<Partial<Character>>({
    name: '',
    gender: 'male',
    age: 30,
    relation: 'Père',
    isHeadOfFamily: false,
    stats: {
      popularity: 5,
      oratory: 5,
      piety: 5,
      martialEducation: 5
    }
  });

  const handleChange = (field: keyof Character, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert and adapt the form data to meet NewCharacterData requirements
    const memberData: NewCharacterData = {
      ...formData,
      name: formData.name || 'Nouveau membre',
      gender: formData.gender as 'male' | 'female',
      age: formData.age || 30,
      stats: {
        popularity: formData.stats?.popularity || 5,
        oratory: formData.stats?.oratory || 5,
        piety: formData.stats?.piety || 5,
        martialEducation: formData.stats?.martialEducation || 5,
      }
    };
    
    onAdd(memberData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Ajouter un membre à la famille</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Nom du membre"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Genre</Label>
            <RadioGroup
              value={formData.gender}
              onValueChange={(value) => handleChange('gender', value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Homme</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Femme</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Âge</Label>
            <Input
              id="age"
              type="number"
              value={formData.age || 30}
              onChange={(e) => handleChange('age', parseInt(e.target.value))}
              min="0"
              max="100"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="relation">Relation</Label>
            <Select
              value={formData.relation || 'Père'}
              onValueChange={(value) => handleChange('relation', value)}
            >
              <SelectTrigger id="relation">
                <SelectValue placeholder="Choisir une relation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Père">Père</SelectItem>
                <SelectItem value="Mère">Mère</SelectItem>
                <SelectItem value="Fils">Fils</SelectItem>
                <SelectItem value="Fille">Fille</SelectItem>
                <SelectItem value="Frère">Frère</SelectItem>
                <SelectItem value="Soeur">Sœur</SelectItem>
                <SelectItem value="Époux">Époux</SelectItem>
                <SelectItem value="Épouse">Épouse</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
            <Button type="submit">Ajouter</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
