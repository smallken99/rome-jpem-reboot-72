import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { v4 as uuidv4 } from 'uuid';
import { EvenementAction, EvenementFormProps, EvenementType, ImportanceType } from '../types/evenements';
import { useMaitreJeu } from '../context';

export const CreateEvenementForm: React.FC<EvenementFormProps> = ({ 
  onSubmit, 
  currentDate,
  isOpen = false, 
  onClose = () => {}
}) => {
  const { addEvenement } = useMaitreJeu();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<EvenementType>('POLITIQUE');
  const [importance, setImportance] = useState<ImportanceType>(ImportanceType.NORMALE);
  const [options, setOptions] = useState<EvenementAction[]>([]);
  const [newOption, setNewOption] = useState('');
  const [newOptionConsequence, setNewOptionConsequence] = useState('');

  const addOption = () => {
    if (newOption && newOptionConsequence) {
      const option: EvenementAction = {
        id: uuidv4(),
        texte: newOption,
        label: newOption.substring(0, 20) + '...',
        effets: {},
        consequence: newOptionConsequence,
        description: newOptionConsequence
      };
      setOptions([...options, option]);
      setNewOption('');
      setNewOptionConsequence('');
    }
  };

  const removeOption = (id: string) => {
    setOptions(options.filter(opt => opt.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description && options.length > 0) {
      const date = currentDate || { year: 250, season: 'SPRING' };
      
      const evenement = {
        id: uuidv4(),
        title: title,
        titre: title,
        description,
        type,
        date,
        importance,
        options,
        resolved: false
      };
      
      addEvenement(evenement);
      
      setTitle('');
      setDescription('');
      setType('POLITIQUE');
      setImportance(ImportanceType.NORMALE);
      setOptions([]);
      
      if (onSubmit) {
        onSubmit(evenement);
      }
      
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer un nouvel événement</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input 
              id="title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre de l'événement"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description détaillée de l'événement"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select 
                value={type}
                onValueChange={(value) => setType(value as EvenementType)}
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
                onValueChange={(value) => setImportance(value as ImportanceType)}
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
            
            {options.map((option) => (
              <div key={option.id} className="flex items-start justify-between p-2 border rounded-md bg-slate-50">
                <div>
                  <p className="font-medium">{option.texte}</p>
                  <p className="text-sm text-muted-foreground mt-1">{option.consequence}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeOption(option.id)}
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
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder="Ex: Accepter le traité"
                />
              </div>
              <div>
                <Label htmlFor="consequence">Conséquence</Label>
                <Input 
                  id="consequence" 
                  value={newOptionConsequence}
                  onChange={(e) => setNewOptionConsequence(e.target.value)}
                  placeholder="Ex: +10 en diplomatie, -5 en richesse"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={addOption}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter cette option
              </Button>
            </div>
          </div>
        </form>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSubmit}>Créer l'événement</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
