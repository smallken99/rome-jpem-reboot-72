
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, Trash } from 'lucide-react';
import { useMaitreJeu } from '../context/MaitreJeuContext';
import { 
  Evenement, 
  EvenementType, 
  EvenementAction,
  Season
} from '../types/maitreJeuTypes';

export const CreateEvenementForm: React.FC = () => {
  const { currentYear, currentSeason, addEvenement } = useMaitreJeu();
  
  // État du formulaire principal
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState<EvenementType>('POLITIQUE');
  const [eventYear, setEventYear] = useState(currentYear);
  const [eventSeason, setEventSeason] = useState<Season>(currentSeason);
  const [isPersistent, setIsPersistent] = useState(false);
  
  // Impact de l'événement
  const [influenceImpact, setInfluenceImpact] = useState(0);
  const [financeImpact, setFinanceImpact] = useState(0);
  const [militaryImpact, setMilitaryImpact] = useState(0);
  const [religionImpact, setReligionImpact] = useState(0);
  const [economyImpact, setEconomyImpact] = useState(0);
  
  // Actions possibles
  const [actions, setActions] = useState<EvenementAction[]>([]);
  const [newActionTitle, setNewActionTitle] = useState('');
  const [newActionDescription, setNewActionDescription] = useState('');
  const [newActionConsequences, setNewActionConsequences] = useState('');
  const [newActionCost, setNewActionCost] = useState(0);
  const [newActionRisk, setNewActionRisk] = useState(0);
  
  // Réinitialiser le formulaire
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setEventType('POLITIQUE');
    setEventYear(currentYear);
    setEventSeason(currentSeason);
    setIsPersistent(false);
    
    setInfluenceImpact(0);
    setFinanceImpact(0);
    setMilitaryImpact(0);
    setReligionImpact(0);
    setEconomyImpact(0);
    
    setActions([]);
    setNewActionTitle('');
    setNewActionDescription('');
    setNewActionConsequences('');
    setNewActionCost(0);
    setNewActionRisk(0);
  };
  
  // Créer l'événement
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEvent: Omit<Evenement, 'id'> = {
      titre: title,
      description,
      type: eventType,
      date: {
        year: eventYear,
        season: eventSeason,
        day: 1 // default day
      },
      impact: {
        influence: influenceImpact,
        finance: financeImpact,
        militaire: militaryImpact,
        religion: religionImpact,
        economie: economyImpact
      },
      actions: actions,
      sourcePersistante: isPersistent
    };
    
    addEvenement(newEvent);
    resetForm();
  };
  
  // Ajouter une action
  const handleAddAction = () => {
    if (!newActionTitle || !newActionDescription || !newActionConsequences) return;
    
    const newAction: EvenementAction = {
      id: `action-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      titre: newActionTitle,
      description: newActionDescription,
      conséquences: newActionConsequences,
      coût: newActionCost,
      risque: newActionRisk,
      impact: {
        influence: influenceImpact / 2,
        finance: financeImpact / 2,
        militaire: militaryImpact / 2,
        religion: religionImpact / 2,
        economie: economyImpact / 2
      }
    };
    
    setActions([...actions, newAction]);
    
    // Réinitialiser le formulaire d'action
    setNewActionTitle('');
    setNewActionDescription('');
    setNewActionConsequences('');
    setNewActionCost(0);
    setNewActionRisk(0);
  };
  
  // Supprimer une action
  const handleRemoveAction = (id: string) => {
    setActions(actions.filter(action => action.id !== id));
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Titre de l'événement</Label>
          <Input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre descriptif" 
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label>Type d'événement</Label>
          <Select value={eventType} onValueChange={(value) => setEventType(value as EvenementType)}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="POLITIQUE">Politique</SelectItem>
              <SelectItem value="SOCIAL">Social</SelectItem>
              <SelectItem value="ÉCONOMIQUE">Économique</SelectItem>
              <SelectItem value="GUERRE">Guerre</SelectItem>
              <SelectItem value="RELIGION">Religion</SelectItem>
              <SelectItem value="DIPLOMATIQUE">Diplomatique</SelectItem>
              <SelectItem value="CRISE">Crise</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description détaillée de l'événement" 
          className="min-h-[100px]"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label>Année</Label>
          <Input 
            type="number" 
            value={eventYear} 
            onChange={(e) => setEventYear(parseInt(e.target.value))}
            min={currentYear - 5}
            max={currentYear + 5}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Saison</Label>
          <Select value={eventSeason} onValueChange={(value) => setEventSeason(value as Season)}>
            <SelectTrigger>
              <SelectValue placeholder="Saison" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SPRING">Printemps</SelectItem>
              <SelectItem value="SUMMER">Été</SelectItem>
              <SelectItem value="AUTUMN">Automne</SelectItem>
              <SelectItem value="WINTER">Hiver</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2 flex items-end">
          <div className="flex items-center space-x-2">
            <Switch 
              id="persistent" 
              checked={isPersistent} 
              onCheckedChange={setIsPersistent} 
            />
            <Label htmlFor="persistent">Source persistante</Label>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Impact</h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Influence politique ({influenceImpact})</Label>
            </div>
            <Slider 
              value={[influenceImpact]} 
              onValueChange={(value) => setInfluenceImpact(value[0])}
              min={-50}
              max={50}
              step={1}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Finances ({financeImpact})</Label>
            </div>
            <Slider 
              value={[financeImpact]} 
              onValueChange={(value) => setFinanceImpact(value[0])}
              min={-50}
              max={50}
              step={1}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Impact militaire ({militaryImpact})</Label>
            </div>
            <Slider 
              value={[militaryImpact]} 
              onValueChange={(value) => setMilitaryImpact(value[0])}
              min={-50}
              max={50}
              step={1}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Religion ({religionImpact})</Label>
            </div>
            <Slider 
              value={[religionImpact]} 
              onValueChange={(value) => setReligionImpact(value[0])}
              min={-50}
              max={50}
              step={1}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Économie ({economyImpact})</Label>
            </div>
            <Slider 
              value={[economyImpact]} 
              onValueChange={(value) => setEconomyImpact(value[0])}
              min={-50}
              max={50}
              step={1}
            />
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6 mt-6">
        <h3 className="font-semibold text-lg mb-4">Actions possibles</h3>
        
        {actions.length > 0 ? (
          <div className="space-y-4 mb-6">
            {actions.map((action, index) => (
              <div 
                key={action.id} 
                className="p-4 border rounded-md bg-gray-50 relative"
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2"
                  type="button"
                  onClick={() => handleRemoveAction(action.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
                
                <div className="pr-8">
                  <h4 className="font-medium">{action.titre}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                  
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Conséquences:</span> {action.conséquences}
                  </div>
                  
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <div>Coût: {action.coût}</div>
                    <div>Risque: {action.risque}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            Aucune action définie
          </div>
        )}
        
        <div className="bg-gray-50 p-4 rounded-md border mt-4">
          <h4 className="font-medium mb-3">Ajouter une action</h4>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <Label>Titre de l'action</Label>
              <Input 
                value={newActionTitle} 
                onChange={(e) => setNewActionTitle(e.target.value)}
                placeholder="Titre de l'action" 
              />
            </div>
            
            <div className="space-y-2">
              <Label>Description</Label>
              <Input 
                value={newActionDescription} 
                onChange={(e) => setNewActionDescription(e.target.value)}
                placeholder="Description de l'action" 
              />
            </div>
            
            <div className="space-y-2">
              <Label>Conséquences</Label>
              <Input 
                value={newActionConsequences} 
                onChange={(e) => setNewActionConsequences(e.target.value)}
                placeholder="Conséquences de l'action" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Coût ({newActionCost})</Label>
                <Slider 
                  value={[newActionCost]} 
                  onValueChange={(value) => setNewActionCost(value[0])}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Risque ({newActionRisk})</Label>
                <Slider 
                  value={[newActionRisk]} 
                  onValueChange={(value) => setNewActionRisk(value[0])}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>
            </div>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleAddAction}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter l'action
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-4 border-t">
        <Button type="button" variant="outline" onClick={resetForm}>
          Réinitialiser
        </Button>
        <Button type="submit">
          Créer l'événement
        </Button>
      </div>
    </form>
  );
};
