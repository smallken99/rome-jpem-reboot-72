
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Trash, Plus } from 'lucide-react';
import { 
  EvenementType, 
  ImportanceType, 
  EvenementAction, 
  Evenement,
  EvenementFormProps
} from '../types/evenements';
import { v4 as uuidv4 } from 'uuid';
import { useMaitreJeu } from '../context';

export const CreateEvenementForm: React.FC<EvenementFormProps> = ({ 
  onSubmit,
  currentDate,
  isOpen = false,
  onClose = () => {}
}) => {
  const { currentDate: contextDate } = useMaitreJeu();
  const eventDate = currentDate || contextDate;
  
  const [type, setType] = useState<EvenementType>('POLITIQUE');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [importance, setImportance] = useState<ImportanceType>(ImportanceType.NORMALE);
  const [actions, setActions] = useState<EvenementAction[]>([]);
  const [actionText, setActionText] = useState('');
  const [actionEffects, setActionEffects] = useState('');
  const [actionConsequence, setActionConsequence] = useState('');
  
  const handleAddAction = () => {
    if (!actionText.trim()) return;
    
    const action: EvenementAction = {
      id: uuidv4(),
      texte: actionText,
      effets: {},
      label: actionText.substring(0, 20) + (actionText.length > 20 ? '...' : ''),
      consequence: actionConsequence,
      description: actionEffects
    };
    
    setActions([...actions, action]);
    setActionText('');
    setActionEffects('');
    setActionConsequence('');
  };
  
  const handleRemoveAction = (id: string) => {
    setActions(actions.filter(action => action.id !== id));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || actions.length === 0) return;
    
    const newEvent: Evenement = {
      id: uuidv4(),
      title: title,
      description: description,
      type: type,
      date: eventDate,
      importance: importance,
      options: actions,
      resolved: false,
      titre: title, // French alias
    };
    
    onSubmit(newEvent);
    
    // Reset form
    setTitle('');
    setDescription('');
    setType('POLITIQUE');
    setImportance(ImportanceType.NORMALE);
    setActions([]);
    
    if (onClose) onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Créer un nouvel événement</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Titre de l'événement</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="Saisir un titre évocateur" 
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="type">Type d'événement</Label>
                <Select value={type} onValueChange={(value) => setType(value as EvenementType)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="POLITIQUE">Politique</SelectItem>
                    <SelectItem value="MILITAIRE">Militaire</SelectItem>
                    <SelectItem value="ECONOMIQUE">Économique</SelectItem>
                    <SelectItem value="SOCIAL">Social</SelectItem>
                    <SelectItem value="RELIGIEUX">Religieux</SelectItem>
                    <SelectItem value="CATASTROPHE">Catastrophe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Importance</Label>
                <RadioGroup defaultValue={importance} onValueChange={(value) => setImportance(value as ImportanceType)} className="flex flex-col space-y-1 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={ImportanceType.MINEURE} id="mineure" />
                    <Label htmlFor="mineure">Mineure</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={ImportanceType.NORMALE} id="normale" />
                    <Label htmlFor="normale">Normale</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={ImportanceType.MAJEURE} id="majeure" />
                    <Label htmlFor="majeure">Majeure</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={ImportanceType.CRITIQUE} id="critique" />
                    <Label htmlFor="critique">Critique</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Décrivez l'événement avec ses implications potentielles..." 
                className="h-[210px]"
                required
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Actions possibles</h3>
              <Button type="button" size="sm" variant="outline" onClick={handleAddAction} disabled={!actionText.trim()}>
                <Plus className="h-4 w-4 mr-1" />
                Ajouter
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="actionText">Texte de l'action</Label>
                <Textarea 
                  id="actionText" 
                  value={actionText} 
                  onChange={(e) => setActionText(e.target.value)} 
                  placeholder="Que peut faire le joueur?" 
                  className="h-24"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="actionEffects">Effets de l'action</Label>
                <Input 
                  id="actionEffects" 
                  value={actionEffects} 
                  onChange={(e) => setActionEffects(e.target.value)} 
                  placeholder="Description des effets" 
                />
                <Label htmlFor="actionConsequence">Conséquence de l'action</Label>
                <Input 
                  id="actionConsequence" 
                  value={actionConsequence} 
                  onChange={(e) => setActionConsequence(e.target.value)} 
                  placeholder="Que se passe-t-il ensuite?" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Actions ajoutées:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {actions.map(action => (
                  <Card key={action.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex justify-between">
                        <span className="truncate">{action.label}</span>
                        <Button 
                          type="button" 
                          size="icon" 
                          variant="ghost" 
                          className="h-6 w-6" 
                          onClick={() => handleRemoveAction(action.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm pb-2">
                      <p className="line-clamp-2">{action.texte}</p>
                      {action.description && (
                        <p className="text-muted-foreground mt-1 line-clamp-1">
                          Effets: {action.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
                
                {actions.length === 0 && (
                  <div className="col-span-2 py-4 text-center text-muted-foreground">
                    Aucune action ajoutée. Ajoutez au moins une action possible.
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
            <Button type="submit" disabled={!title || !description || actions.length === 0}>
              Créer l'événement
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
