
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMaitreJeu } from '../context/MaitreJeuContext';
import {
  EvenementType,
  ImportanceType,
  Season,
  EvenementAction
} from '../types/maitreJeuTypes';

interface CreateEvenementFormProps {
  onCreated?: () => void;
}

export const CreateEvenementForm: React.FC<CreateEvenementFormProps> = ({ onCreated }) => {
  const { addEvenement, gameState } = useMaitreJeu();
  const { year, season } = gameState;
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<EvenementType>('POLITIQUE');
  const [importance, setImportance] = useState<ImportanceType>('normale');
  const [selectedDate, setSelectedDate] = useState({
    year: year,
    season: season,
    day: 1
  });
  const [actions, setActions] = useState<EvenementAction[]>([]);
  const [newAction, setNewAction] = useState({
    texte: '',
    effets: {
      stabilité: 0,
      trésorPublique: 0,
      prestigeRome: 0
    }
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEvenement = {
      titre: title,
      description,
      type,
      date: selectedDate,
      importance,
      options: actions,
      resolved: false
    };
    
    addEvenement(newEvenement);
    
    // Reset form
    setTitle('');
    setDescription('');
    setType('POLITIQUE');
    setImportance('normale');
    setActions([]);
    
    if (onCreated) {
      onCreated();
    }
  };
  
  const handleAddAction = () => {
    if (newAction.texte.trim()) {
      setActions([
        ...actions,
        {
          id: `action-${Date.now()}`,
          texte: newAction.texte,
          effets: newAction.effets
        }
      ]);
      
      setNewAction({
        texte: '',
        effets: {
          stabilité: 0,
          trésorPublique: 0,
          prestigeRome: 0
        }
      });
    }
  };
  
  const handleRemoveAction = (index: number) => {
    setActions(actions.filter((_, i) => i !== index));
  };
  
  const handleEffectChange = (key: string, value: number) => {
    setNewAction({
      ...newAction,
      effets: {
        ...newAction.effets,
        [key]: value
      }
    });
  };
  
  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Titre</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre de l'événement"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <Select 
              value={type} 
              onValueChange={(value: EvenementType) => setType(value)}
            >
              <SelectTrigger>
                <SelectValue />
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
            <label className="block text-sm font-medium mb-1">Importance</label>
            <Select 
              value={importance} 
              onValueChange={(value: ImportanceType) => setImportance(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mineure">Mineure</SelectItem>
                <SelectItem value="normale">Normale</SelectItem>
                <SelectItem value="majeure">Majeure</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description détaillée de l'événement..."
            rows={4}
            required
          />
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Année</label>
            <Input
              type="number"
              value={selectedDate.year}
              onChange={(e) => setSelectedDate({
                ...selectedDate,
                year: parseInt(e.target.value) || year
              })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Saison</label>
            <Select 
              value={selectedDate.season} 
              onValueChange={(value: Season) => setSelectedDate({
                ...selectedDate,
                season: value
              })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SPRING">Printemps</SelectItem>
                <SelectItem value="SUMMER">Été</SelectItem>
                <SelectItem value="AUTUMN">Automne</SelectItem>
                <SelectItem value="WINTER">Hiver</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Jour</label>
            <Input
              type="number"
              value={selectedDate.day}
              onChange={(e) => setSelectedDate({
                ...selectedDate,
                day: parseInt(e.target.value) || 1
              })}
              min="1"
              max="30"
            />
          </div>
        </div>
        
        <div className="border-t pt-4 mt-4">
          <h3 className="font-medium mb-2">Options de résolution</h3>
          
          <div className="space-y-4 mb-4">
            {actions.map((action, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded border">
                <div className="flex justify-between items-start">
                  <p className="font-medium">{action.texte}</p>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveAction(index)}
                    className="text-red-600 h-7"
                  >
                    Supprimer
                  </Button>
                </div>
                <div className="mt-2 text-sm text-gray-600 space-y-1">
                  {Object.entries(action.effets).map(([key, value]) => (
                    value !== 0 && (
                      <div key={key} className="flex items-center">
                        <span>{key}:</span>
                        <span className={value > 0 ? 'text-green-600 ml-1' : 'text-red-600 ml-1'}>
                          {value > 0 ? `+${value}` : value}
                        </span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Texte de l'option</label>
              <Input
                value={newAction.texte}
                onChange={(e) => setNewAction({...newAction, texte: e.target.value})}
                placeholder="Description de cette option..."
              />
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs mb-1">Effet: Stabilité</label>
                <Input
                  type="number"
                  value={newAction.effets.stabilité}
                  onChange={(e) => handleEffectChange('stabilité', parseInt(e.target.value) || 0)}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Effet: Trésor</label>
                <Input
                  type="number"
                  value={newAction.effets.trésorPublique}
                  onChange={(e) => handleEffectChange('trésorPublique', parseInt(e.target.value) || 0)}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Effet: Prestige</label>
                <Input
                  type="number"
                  value={newAction.effets.prestigeRome}
                  onChange={(e) => handleEffectChange('prestigeRome', parseInt(e.target.value) || 0)}
                  className="text-sm"
                />
              </div>
            </div>
            
            <Button 
              type="button" 
              onClick={handleAddAction} 
              variant="outline" 
              className="w-full"
              disabled={!newAction.texte.trim()}
            >
              Ajouter cette option
            </Button>
          </div>
        </div>
        
        <Button type="submit" className="w-full" disabled={title === '' || description === '' || actions.length === 0}>
          Créer l'événement
        </Button>
      </form>
    </div>
  );
};
