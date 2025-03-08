import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useMaitreJeu } from '../context';
import { EvenementType, EvenementAction, Season } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface CreateEvenementFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateEvenementForm: React.FC<CreateEvenementFormProps> = ({ isOpen, onClose }) => {
  const { addEvenement, currentYear, currentSeason } = useMaitreJeu();
  const [evenement, setEvenement] = useState({
    titre: '',
    description: '',
    type: 'POLITIQUE' as EvenementType,
    date: { year: currentYear, season: currentSeason },
    importance: 'normale' as 'majeure' | 'mineure' | 'normale',
    options: [] as EvenementAction[],
    resolved: false
  });
  const [newOption, setNewOption] = useState({ label: '', consequence: '' });
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEvenement(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: EvenementType | 'majeure' | 'mineure' | 'normale') => {
    setEvenement(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddOption = () => {
    if (!newOption.label || !newOption.consequence) {
      setErrorMessage("Veuillez remplir tous les champs de l'option.");
      return;
    }
    setEvenement(prev => ({
      ...prev,
      options: [...prev.options, { ...newOption, id: uuidv4() }]
    }));
    setNewOption({ label: '', consequence: '' });
    setErrorMessage('');
  };
  
  const handleRemoveOption = (id: string) => {
    setEvenement(prev => ({
      ...prev,
      options: prev.options.filter(option => option.id !== id)
    }));
  };
  
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewOption(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!evenement.titre || !evenement.description || evenement.options.length === 0) {
      setErrorMessage("Veuillez remplir tous les champs et ajouter au moins une option.");
      return;
    }
    
    // Ajouter ID à l'événement
    const evenementWithId = {
      ...evenement,
      id: uuidv4(), // Utiliser UUID pour générer un ID unique
      date: { year: currentYear, season: currentSeason },
      resolved: false
    };
    
    addEvenement(evenementWithId);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Créer un nouvel événement</DialogTitle>
          <DialogDescription>
            Ajoutez un événement qui aura un impact sur le jeu.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="titre">Titre de l'événement</Label>
            <Input 
              id="titre" 
              name="titre" 
              value={evenement.titre} 
              onChange={handleInputChange} 
            />
          </div>
          <div>
            <Label htmlFor="description">Description de l'événement</Label>
            <Textarea
              id="description"
              name="description"
              value={evenement.description}
              onChange={handleInputChange}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Type d'événement</Label>
              <Select value={evenement.type} onValueChange={(value) => handleSelectChange('type', value as EvenementType)}>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="POLITIQUE">Politique</SelectItem>
                  <SelectItem value="ECONOMIQUE">Économique</SelectItem>
                  <SelectItem value="GUERRE">Guerre</SelectItem>
                  <SelectItem value="RELIGION">Religion</SelectItem>
                  <SelectItem value="DIPLOMATIQUE">Diplomatique</SelectItem>
                  <SelectItem value="SOCIAL">Social</SelectItem>
                  <SelectItem value="CRISE">Crise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="importance">Importance</Label>
              <Select value={evenement.importance} onValueChange={(value) => handleSelectChange('importance', value as 'majeure' | 'mineure' | 'normale')}>
                <SelectTrigger id="importance">
                  <SelectValue placeholder="Sélectionner l'importance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="majeure">Majeure</SelectItem>
                  <SelectItem value="mineure">Mineure</SelectItem>
                  <SelectItem value="normale">Normale</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium">Options de l'événement</h4>
            <div className="space-y-2">
              {evenement.options.map(option => (
                <div key={option.id} className="flex items-center space-x-2">
                  <div className="flex-1">
                    <p className="text-sm">{option.label}</p>
                    <p className="text-xs text-muted-foreground">{option.consequence}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveOption(option.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Input
                type="text"
                placeholder="Label de l'option"
                name="label"
                value={newOption.label}
                onChange={handleOptionChange}
              />
              <Input
                type="text"
                placeholder="Conséquence de l'option"
                name="consequence"
                value={newOption.consequence}
                onChange={handleOptionChange}
              />
              <Button type="button" variant="secondary" size="sm" onClick={handleAddOption}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </div>
          </div>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Créer l'événement</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
