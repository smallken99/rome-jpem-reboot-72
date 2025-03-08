
import React, { useState } from 'react';
import { useMaitreJeu } from '../context/MaitreJeuContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Plus, Save, Trash, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Evenement, EvenementAction } from '../types/maitreJeuTypes';
import { useTimeStore } from '@/utils/timeSystem';
import { v4 as uuidv4 } from 'uuid';

export const CreateEvenementForm: React.FC = () => {
  const { addEvenement } = useMaitreJeu();
  const { toast } = useToast();
  const { year, season } = useTimeStore();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<Evenement['type']>('POLITIQUE');
  const [isPersistant, setIsPersistant] = useState(false);
  
  const [actions, setActions] = useState<EvenementAction[]>([]);
  const [newAction, setNewAction] = useState({
    description: '',
    coût: 0,
    risque: 0,
    impact: {} as any,
  });
  
  // Impact sur les différents aspects de l'équilibre
  const [impact, setImpact] = useState({
    plebeiens: 0,
    patriciens: 0,
    armée: 0,
    religion: 0,
    économie: 0,
    diplomatie: 0,
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Erreur de validation",
        description: "Le titre et la description sont obligatoires.",
        variant: "destructive",
      });
      return;
    }
    
    // Filtrer les impacts qui sont non-nuls
    const filteredImpact = Object.entries(impact).reduce((acc, [key, value]) => {
      if (value !== 0) {
        acc[key as keyof typeof impact] = value;
      }
      return acc;
    }, {} as Partial<typeof impact>);
    
    const newEvenement: Evenement = {
      id: uuidv4(),
      title,
      description,
      type,
      date: {
        year,
        season,
      },
      impact: filteredImpact,
      sourcePersistante: isPersistant,
      résolu: false,
      actions,
    };
    
    addEvenement(newEvenement);
    
    toast({
      title: "Événement créé",
      description: "L'événement a été ajouté avec succès.",
    });
    
    // Réinitialiser le formulaire
    setTitle('');
    setDescription('');
    setType('POLITIQUE');
    setIsPersistant(false);
    setActions([]);
    setImpact({
      plebeiens: 0,
      patriciens: 0,
      armée: 0,
      religion: 0,
      économie: 0,
      diplomatie: 0,
    });
  };
  
  const handleAddAction = () => {
    if (!newAction.description.trim()) {
      toast({
        title: "Erreur de validation",
        description: "La description de l'action est obligatoire.",
        variant: "destructive",
      });
      return;
    }
    
    setActions([...actions, { ...newAction, id: uuidv4() }]);
    setNewAction({
      description: '',
      coût: 0,
      risque: 0,
      impact: {},
    });
  };
  
  const handleRemoveAction = (index: number) => {
    setActions(actions.filter((_, i) => i !== index));
  };
  
  const handleChangeImpact = (aspect: keyof typeof impact, value: number) => {
    setImpact({
      ...impact,
      [aspect]: value,
    });
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Créer un nouvel événement</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Titre de l'événement"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <select 
                id="type" 
                className="w-full border rounded-md p-2" 
                value={type}
                onChange={(e) => setType(e.target.value as Evenement['type'])}
              >
                <option value="POLITIQUE">Politique</option>
                <option value="GUERRE">Guerre</option>
                <option value="CRISE">Crise</option>
                <option value="RELIGION">Religion</option>
                <option value="ÉCONOMIQUE">Économique</option>
                <option value="DIPLOMATIQUE">Diplomatique</option>
                <option value="SOCIAL">Social</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Description détaillée de l'événement"
              rows={3}
              required
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id="persistent" 
              checked={isPersistant} 
              onChange={(e) => setIsPersistant(e.target.checked)} 
              className="rounded border-gray-300"
            />
            <Label htmlFor="persistent">Source persistante (l'effet s'applique à chaque nouvelle saison)</Label>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Impact sur l'équilibre</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label htmlFor="plebeiens" className="text-xs">Plébéiens</Label>
                <div className="flex items-center">
                  <Input 
                    id="plebeiens" 
                    type="number" 
                    value={impact.plebeiens} 
                    onChange={(e) => handleChangeImpact('plebeiens', parseInt(e.target.value) || 0)} 
                    className="w-20"
                    min="-50"
                    max="50"
                  />
                  <span className="ml-2 text-xs text-muted-foreground">(-50 à +50)</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="patriciens" className="text-xs">Patriciens</Label>
                <div className="flex items-center">
                  <Input 
                    id="patriciens" 
                    type="number" 
                    value={impact.patriciens} 
                    onChange={(e) => handleChangeImpact('patriciens', parseInt(e.target.value) || 0)} 
                    className="w-20"
                    min="-50"
                    max="50"
                  />
                  <span className="ml-2 text-xs text-muted-foreground">(-50 à +50)</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="armee" className="text-xs">Armée</Label>
                <div className="flex items-center">
                  <Input 
                    id="armee" 
                    type="number" 
                    value={impact.armée} 
                    onChange={(e) => handleChangeImpact('armée', parseInt(e.target.value) || 0)} 
                    className="w-20"
                    min="-50"
                    max="50"
                  />
                  <span className="ml-2 text-xs text-muted-foreground">(-50 à +50)</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="religion" className="text-xs">Religion</Label>
                <div className="flex items-center">
                  <Input 
                    id="religion" 
                    type="number" 
                    value={impact.religion} 
                    onChange={(e) => handleChangeImpact('religion', parseInt(e.target.value) || 0)} 
                    className="w-20"
                    min="-50"
                    max="50"
                  />
                  <span className="ml-2 text-xs text-muted-foreground">(-50 à +50)</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="economie" className="text-xs">Économie</Label>
                <div className="flex items-center">
                  <Input 
                    id="economie" 
                    type="number" 
                    value={impact.économie} 
                    onChange={(e) => handleChangeImpact('économie', parseInt(e.target.value) || 0)} 
                    className="w-20"
                    min="-50"
                    max="50"
                  />
                  <span className="ml-2 text-xs text-muted-foreground">(-50 à +50)</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="diplomatie" className="text-xs">Diplomatie</Label>
                <div className="flex items-center">
                  <Input 
                    id="diplomatie" 
                    type="number" 
                    value={impact.diplomatie} 
                    onChange={(e) => handleChangeImpact('diplomatie', parseInt(e.target.value) || 0)} 
                    className="w-20"
                    min="-50"
                    max="50"
                  />
                  <span className="ml-2 text-xs text-muted-foreground">(-50 à +50)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Actions possibles</h3>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleAddAction}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Ajouter
              </Button>
            </div>
            
            <div className="space-y-3 border rounded-md p-3 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="actionDescription" className="text-xs">Description</Label>
                  <Input 
                    id="actionDescription" 
                    value={newAction.description} 
                    onChange={(e) => setNewAction({ ...newAction, description: e.target.value })} 
                    placeholder="Description de l'action"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="actionCost" className="text-xs">Coût (as)</Label>
                    <Input 
                      id="actionCost" 
                      type="number" 
                      value={newAction.coût} 
                      onChange={(e) => setNewAction({ ...newAction, coût: parseInt(e.target.value) || 0 })} 
                      min="0"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <Label htmlFor="actionRisk" className="text-xs">Risque (%)</Label>
                    <Input 
                      id="actionRisk" 
                      type="number" 
                      value={newAction.risque} 
                      onChange={(e) => setNewAction({ ...newAction, risque: parseInt(e.target.value) || 0 })} 
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {actions.length > 0 && (
              <div className="mt-2 space-y-2">
                {actions.map((action, index) => (
                  <div key={index} className="flex items-center justify-between rounded-md border p-2 bg-white">
                    <div>
                      <p className="text-sm">{action.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Coût: {action.coût} as | Risque: {action.risque}%
                      </p>
                    </div>
                    
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveAction(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end pt-4">
            <ActionButton
              type="submit"
              variant="default"
              label="Créer l'événement"
              icon={<Save className="h-4 w-4" />}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
