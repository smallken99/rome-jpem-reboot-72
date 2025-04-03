
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Character } from '@/types/character';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface AddFamilyMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (character: Omit<Character, 'id'>) => void;
  existingMembers: Character[];
}

export const AddFamilyMemberDialog: React.FC<AddFamilyMemberDialogProps> = ({ 
  isOpen, 
  onClose, 
  onAdd,
  existingMembers
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [relation, setRelation] = useState('');
  const [parentId, setParentId] = useState<string>('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Créer un nouveau membre
    const newMember: Omit<Character, 'id'> = {
      name: `${firstName} ${lastName}`,
      gender,
      age,
      relation,
      parentIds: parentId ? [parentId] : [],
      stats: {
        popularity: 0,
        oratory: 0,
        piety: 0,
        martialEducation: 0
      }
    };
    
    onAdd(newMember);
    
    // Réinitialiser le formulaire
    setFirstName('');
    setLastName('');
    setAge(0);
    setGender('male');
    setRelation('');
    setParentId('');
  };
  
  // Filtrer les adultes comme parents potentiels
  const potentialParents = existingMembers.filter(m => m.age >= 18);
  
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter un membre à la famille</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input 
                id="firstName" 
                value={firstName} 
                onChange={e => setFirstName(e.target.value)} 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom de famille</Label>
              <Input 
                id="lastName" 
                value={lastName} 
                onChange={e => setLastName(e.target.value)} 
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Âge</Label>
              <Input 
                id="age" 
                type="number" 
                min={0}
                max={100}
                value={age} 
                onChange={e => setAge(parseInt(e.target.value) || 0)} 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Genre</Label>
              <RadioGroup value={gender} onValueChange={value => setGender(value as 'male' | 'female')}>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Homme</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Femme</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="relation">Relation familiale</Label>
            <Select value={relation} onValueChange={setRelation} required>
              <SelectTrigger id="relation">
                <SelectValue placeholder="Sélectionner une relation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pater Familias">Pater Familias</SelectItem>
                <SelectItem value="Mater Familias">Mater Familias</SelectItem>
                <SelectItem value="Fils">Fils</SelectItem>
                <SelectItem value="Fille">Fille</SelectItem>
                <SelectItem value="Frère">Frère</SelectItem>
                <SelectItem value="Soeur">Soeur</SelectItem>
                <SelectItem value="Cousin">Cousin</SelectItem>
                <SelectItem value="Neveu">Neveu</SelectItem>
                <SelectItem value="Nièce">Nièce</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="parent">Parent</Label>
            <Select value={parentId} onValueChange={setParentId}>
              <SelectTrigger id="parent">
                <SelectValue placeholder="Sélectionner un parent (facultatif)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Aucun</SelectItem>
                {potentialParents.map(parent => (
                  <SelectItem key={parent.id} value={parent.id}>
                    {parent.name} ({parent.gender === 'male' ? 'H' : 'F'}, {parent.age} ans)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Ajouter</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
