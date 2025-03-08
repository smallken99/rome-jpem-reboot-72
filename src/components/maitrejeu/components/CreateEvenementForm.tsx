import React, { useState } from 'react';
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MaitreJeuContext } from '../context/MaitreJeuContext';
import { EvenementType, EvenementAction } from '../types/evenements';
import { Season } from '../types/common';
import { z } from 'zod';

// Schéma de validation pour EvenementAction
const evenementActionSchema = z.object({
  id: z.string(),
  texte: z.string().min(1, "Le texte est requis"),
  effets: z.object({
    stabilité: z.number().default(0),
    trésorPublique: z.number().default(0),
    prestigeRome: z.number().default(0),
    religion: z.number().default(0),
    influence: z.number().default(0),
    finance: z.number().default(0),
    militaire: z.number().default(0),
    economie: z.number().default(0),
    autre: z.string().optional(),
  }),
});

interface CreateEvenementFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateEvenementForm: React.FC<CreateEvenementFormProps> = ({ isOpen, onClose }) => {
  const { currentYear, currentSeason, addEvenement } = useContext(MaitreJeuContext);
  
  // Initialisation correcte des états
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<EvenementType>('POLITIQUE');
  const [importance, setImportance] = useState<'normale' | 'majeure' | 'mineure'>('normale');
  const [date, setDate] = useState<{year: number; season: Season; day?: number}>({
    year: currentYear,
    season: currentSeason
  });
  
  // Corrections pour assurer que options est du bon type
  const [options, setOptions] = useState<EvenementAction[]>([{
    id: uuidv4(),
    texte: '',
    effets: {
      stabilité: 0,
      trésorPublique: 0,
      prestigeRome: 0,
      religion: 0,
      influence: 0,
      finance: 0,
      militaire: 0,
      economie: 0
    }
  }]);
  
  const handleAddOption = () => {
    setOptions([...options, {
      id: uuidv4(),
      texte: '',
      effets: {
        stabilité: 0,
        trésorPublique: 0,
        prestigeRome: 0,
        religion: 0,
        influence: 0,
        finance: 0,
        militaire: 0,
        economie: 0
      }
    }]);
  };
  
  const handleRemoveOption = (id: string) => {
    setOptions(options.filter(option => option.id !== id));
  };
  
  const handleOptionChange = (id: string, field: string, value: string | number) => {
    setOptions(options.map(option => {
      if (option.id === id) {
        if (field.startsWith('effets.')) {
          const effet = field.substring(7);
          return {
            ...option,
            effets: {
              ...option.effets,
              [effet]: value
            }
          };
        } else {
          return {
            ...option,
            [field]: value
          };
        }
      }
      return option;
    }));
  };

  // Mise à jour de la validation pour utiliser zod
  const handleSubmit = () => {
    if (!title || !description) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    // Valider que tous les options ont un texte
    for (const option of options) {
      try {
        evenementActionSchema.parse(option);
      } catch (error) {
        alert('Chaque option doit avoir un texte.');
        return;
      }
    }
    
    addEvenement({
      titre: title,
      description,
      type,
      date,
      importance,
      options,
      resolved: false
    });
    
    onClose();
    
    // Réinitialiser le formulaire
    setTitle('');
    setDescription('');
    setType('POLITIQUE');
    setImportance('normale');
    setDate({
      year: currentYear,
      season: currentSeason
    });
    setOptions([{
      id: uuidv4(),
      texte: '',
      effets: {
        stabilité: 0,
        trésorPublique: 0,
        prestigeRome: 0,
        influence: 0,
        finance: 0,
        militaire: 0,
        economie: 0
      }
    }]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Créer un nouvel événement</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="options">Options</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="title">Titre</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={type} onValueChange={(value) => setType(value as EvenementType)}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="POLITIQUE">Politique</SelectItem>
                      <SelectItem value="GUERRE">Guerre</SelectItem>
                      <SelectItem value="CRISE">Crise</SelectItem>
                      <SelectItem value="ECONOMIQUE">Économique</SelectItem>
                      <SelectItem value="RELIGION">Religion</SelectItem>
                      <SelectItem value="DIPLOMATIQUE">Diplomatique</SelectItem>
                      <SelectItem value="SOCIAL">Social</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="importance">Importance</Label>
                  <Select value={importance} onValueChange={(value) => setImportance(value as 'normale' | 'majeure' | 'mineure')}>
                    <SelectTrigger id="importance">
                      <SelectValue placeholder="Sélectionner l'importance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normale">Normale</SelectItem>
                      <SelectItem value="majeure">Majeure</SelectItem>
                      <SelectItem value="mineure">Mineure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="options">
            <div className="grid gap-4 py-4">
              {options.map((option) => (
                <div key={option.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-semibold">Option #{options.indexOf(option) + 1}</h4>
                    <Button 
                      variant="destructive" 
                      size="icon"
                      onClick={() => handleRemoveOption(option.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div>
                    <Label htmlFor={`texte-${option.id}`}>Texte</Label>
                    <Input
                      id={`texte-${option.id}`}
                      value={option.texte}
                      onChange={(e) => handleOptionChange(option.id, 'texte', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <Label htmlFor={`stabilité-${option.id}`}>Stabilité</Label>
                      <Input
                        type="number"
                        id={`stabilité-${option.id}`}
                        value={option.effets.stabilité || 0}
                        onChange={(e) => handleOptionChange(option.id, 'effets.stabilité', parseFloat(e.target.value))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`trésorPublique-${option.id}`}>Trésor Public</Label>
                      <Input
                        type="number"
                        id={`trésorPublique-${option.id}`}
                        value={option.effets.trésorPublique || 0}
                        onChange={(e) => handleOptionChange(option.id, 'effets.trésorPublique', parseFloat(e.target.value))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`prestigeRome-${option.id}`}>Prestige de Rome</Label>
                      <Input
                        type="number"
                        id={`prestigeRome-${option.id}`}
                        value={option.effets.prestigeRome || 0}
                        onChange={(e) => handleOptionChange(option.id, 'effets.prestigeRome', parseFloat(e.target.value))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`religion-${option.id}`}>Religion</Label>
                      <Input
                        type="number"
                        id={`religion-${option.id}`}
                        value={option.effets.religion || 0}
                        onChange={(e) => handleOptionChange(option.id, 'effets.religion', parseFloat(e.target.value))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`influence-${option.id}`}>Influence</Label>
                      <Input
                        type="number"
                        id={`influence-${option.id}`}
                        value={option.effets.influence || 0}
                        onChange={(e) => handleOptionChange(option.id, 'effets.influence', parseFloat(e.target.value))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`finance-${option.id}`}>Finance</Label>
                      <Input
                        type="number"
                        id={`finance-${option.id}`}
                        value={option.effets.finance || 0}
                        onChange={(e) => handleOptionChange(option.id, 'effets.finance', parseFloat(e.target.value))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`militaire-${option.id}`}>Militaire</Label>
                      <Input
                        type="number"
                        id={`militaire-${option.id}`}
                        value={option.effets.militaire || 0}
                        onChange={(e) => handleOptionChange(option.id, 'effets.militaire', parseFloat(e.target.value))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`economie-${option.id}`}>Économie</Label>
                      <Input
                        type="number"
                        id={`economie-${option.id}`}
                        value={option.effets.economie || 0}
                        onChange={(e) => handleOptionChange(option.id, 'effets.economie', parseFloat(e.target.value))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`autre-${option.id}`}>Autre</Label>
                      <Input
                        type="text"
                        id={`autre-${option.id}`}
                        value={option.effets.autre || ''}
                        onChange={(e) => handleOptionChange(option.id, 'effets.autre', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" onClick={handleAddOption}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Ajouter une option
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Créer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
