
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useMaitreJeu } from '../context';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Plus, Trash } from 'lucide-react';
import { EvenementType, EvenementAction, EvenementFormProps } from '../types/evenements';
import { ImportanceType } from '../types/common';

export const CreateEvenementForm: React.FC<EvenementFormProps> = ({ isOpen, onClose }) => {
  const { currentYear, currentSeason, addEvenement } = useMaitreJeu();
  
  const [evenement, setEvenement] = useState({
    titre: '',
    description: '',
    type: 'POLITIQUE' as EvenementType,
    date: { year: currentYear, season: currentSeason },
    importance: 'normale' as ImportanceType,
    options: [] as EvenementAction[],
    resolved: false
  });
  
  const [optionText, setOptionText] = useState('');
  const [consequence, setConsequence] = useState('');
  
  const handleAddOption = () => {
    if (optionText.trim() === '') return;
    
    // Create a new option with the correct structure
    const newOption: EvenementAction = {
      id: uuidv4(),
      texte: optionText,
      effets: {},
      label: optionText,
      consequence: consequence
    };
    
    // Update the evenement state with the new option
    setEvenement(prev => ({
      ...prev,
      options: [...prev.options, newOption]
    }));
    
    // Clear the input fields
    setOptionText('');
    setConsequence('');
  };
  
  const handleRemoveOption = (id: string) => {
    setEvenement(prev => ({
      ...prev,
      options: prev.options.filter(opt => opt.id !== id)
    }));
  };
  
  const handleSubmit = () => {
    if (evenement.titre.trim() === '' || evenement.description.trim() === '' || evenement.options.length === 0) {
      // Show error toast or validation message
      return;
    }
    
    // Add an id to the event
    const eventWithId = {
      ...evenement,
      id: uuidv4()
    };
    
    addEvenement(eventWithId);
    onClose();
    
    // Reset the form
    setEvenement({
      titre: '',
      description: '',
      type: 'POLITIQUE',
      date: { year: currentYear, season: currentSeason },
      importance: 'normale',
      options: [],
      resolved: false
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>Créer un nouvel événement</DialogTitle>
          <DialogDescription>
            Définissez les détails de l'événement et ses options de résolution.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input 
              id="title" 
              value={evenement.titre}
              onChange={(e) => setEvenement(prev => ({ ...prev, titre: e.target.value }))}
              placeholder="Titre de l'événement"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={evenement.description}
              onChange={(e) => setEvenement(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Description détaillée de l'événement"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select 
                value={evenement.type}
                onValueChange={(value) => setEvenement(prev => ({ ...prev, type: value as EvenementType }))}
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
                value={evenement.importance} 
                onValueChange={(value) => setEvenement(prev => ({ ...prev, importance: value as ImportanceType }))}
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
          
          <div className="space-y-4 border-t pt-4">
            <Label>Options de résolution</Label>
            
            {evenement.options.map((option) => (
              <div key={option.id} className="flex items-start justify-between p-2 border rounded-md bg-slate-50">
                <div>
                  <p className="font-medium">{option.texte}</p>
                  <p className="text-sm text-muted-foreground mt-1">{option.consequence}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveOption(option.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            
            <div className="space-y-2">
              <div>
                <Label htmlFor="option-text">Texte de l'option</Label>
                <Input 
                  id="option-text" 
                  value={optionText}
                  onChange={(e) => setOptionText(e.target.value)}
                  placeholder="Ex: Accepter le traité"
                />
              </div>
              <div>
                <Label htmlFor="consequence">Conséquence</Label>
                <Input 
                  id="consequence" 
                  value={consequence}
                  onChange={(e) => setConsequence(e.target.value)}
                  placeholder="Ex: +10 en diplomatie, -5 en richesse"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleAddOption}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter cette option
              </Button>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit}>Créer l'événement</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
