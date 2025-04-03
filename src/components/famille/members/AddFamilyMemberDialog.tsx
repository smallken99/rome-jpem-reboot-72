
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useCharacters } from '../hooks/useCharacters';
import { Character } from '@/types/character';
import { toast } from 'sonner';

interface AddFamilyMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddFamilyMemberDialog: React.FC<AddFamilyMemberDialogProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const { localCharacters, addCharacter } = useCharacters();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: localCharacters[0]?.lastName || '',
    gender: 'male',
    age: 30,
    relation: 'Fils',
    parentId: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };
  
  const handleSubmit = () => {
    try {
      const parentCharacter = localCharacters.find(c => c.id === formData.parentId);
      
      const newCharacter: Partial<Character> = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`,
        gender: formData.gender as 'male' | 'female',
        age: formData.age,
        relation: formData.relation,
        status: 'alive',
        stats: {
          popularity: { value: 10, maxValue: 100, name: 'Popularité', icon: 'users', description: 'Votre réputation auprès du peuple', color: 'blue' },
          oratory: { value: 10, maxValue: 100, name: 'Éloquence', icon: 'message-square', description: 'Votre capacité à convaincre', color: 'amber' },
          piety: { value: 10, maxValue: 100, name: 'Piété', icon: 'shrine', description: 'Votre dévotion aux dieux', color: 'purple' },
          martialEducation: { value: 10, maxValue: 100, name: 'Art militaire', icon: 'sword', description: 'Votre expertise militaire', color: 'red' }
        }
      };
      
      // Définir les relations parent-enfant
      if (parentCharacter) {
        newCharacter.parentIds = [parentCharacter.id];
        
        // Mettre à jour les relations si le parent est le chef de famille
        if (parentCharacter.isHeadOfFamily) {
          newCharacter.isHeadOfFamily = false;
        }
      }
      
      addCharacter(newCharacter);
      toast.success(`${formData.firstName} ${formData.lastName} a été ajouté à la famille`);
      onClose();
      
      // Réinitialiser le formulaire
      setFormData({
        firstName: '',
        lastName: localCharacters[0]?.lastName || '',
        gender: 'male',
        age: 30,
        relation: 'Fils',
        parentId: ''
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du membre:", error);
      toast.error("Une erreur s'est produite lors de l'ajout du membre");
    }
  };
  
  const potentialParents = localCharacters.filter(c => c.age >= 18);
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter un membre à la famille</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Prénom</Label>
              <Input 
                id="firstName" 
                name="firstName" 
                value={formData.firstName} 
                onChange={handleInputChange} 
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Nom de famille</Label>
              <Input 
                id="lastName" 
                name="lastName" 
                value={formData.lastName} 
                onChange={handleInputChange} 
                className="mt-1"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gender">Genre</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => handleSelectChange('gender', value)}
              >
                <SelectTrigger id="gender" className="mt-1">
                  <SelectValue placeholder="Sélectionner le genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Homme</SelectItem>
                  <SelectItem value="female">Femme</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="age">Âge</Label>
              <Input 
                id="age" 
                name="age" 
                type="number" 
                value={formData.age.toString()} 
                onChange={handleNumberChange} 
                className="mt-1"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="relation">Relation</Label>
              <Select
                value={formData.relation}
                onValueChange={(value) => handleSelectChange('relation', value)}
              >
                <SelectTrigger id="relation" className="mt-1">
                  <SelectValue placeholder="Sélectionner la relation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Père">Père</SelectItem>
                  <SelectItem value="Mère">Mère</SelectItem>
                  <SelectItem value="Fils">Fils</SelectItem>
                  <SelectItem value="Fille">Fille</SelectItem>
                  <SelectItem value="Frère">Frère</SelectItem>
                  <SelectItem value="Soeur">Soeur</SelectItem>
                  <SelectItem value="Époux">Époux</SelectItem>
                  <SelectItem value="Épouse">Épouse</SelectItem>
                  <SelectItem value="Cousin">Cousin</SelectItem>
                  <SelectItem value="Cousin">Cousine</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="parentId">Parent</Label>
              <Select
                value={formData.parentId}
                onValueChange={(value) => handleSelectChange('parentId', value)}
              >
                <SelectTrigger id="parentId" className="mt-1">
                  <SelectValue placeholder="Sélectionner un parent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Aucun parent</SelectItem>
                  {potentialParents.map(parent => (
                    <SelectItem key={parent.id} value={parent.id}>
                      {parent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit}>Ajouter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
