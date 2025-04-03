
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Building2, 
  Users, 
  Swords, 
  ScrollText, 
  Trophy, 
  HandCoins 
} from 'lucide-react';

interface RepFactorSelectorProps {
  onSelectAction: (event: string, impact: number) => void;
}

interface RepAction {
  id: string;
  title: string;
  description: string;
  impact: number;
  icon: React.ReactNode;
  customizable?: boolean;
}

export const RepFactorSelector: React.FC<RepFactorSelectorProps> = ({ onSelectAction }) => {
  const [selectedAction, setSelectedAction] = useState<string>('');
  const [customEvent, setCustomEvent] = useState<string>('');
  const [customImpact, setCustomImpact] = useState<number>(5);
  
  const actionTypes = [
    { id: 'public', name: 'Oeuvres Publiques', icon: <Building2 className="h-4 w-4" /> },
    { id: 'social', name: 'Actions Sociales', icon: <Users className="h-4 w-4" /> },
    { id: 'military', name: 'Exploits Militaires', icon: <Swords className="h-4 w-4" /> },
    { id: 'political', name: 'Actions Politiques', icon: <ScrollText className="h-4 w-4" /> },
    { id: 'games', name: 'Jeux et Célébrations', icon: <Trophy className="h-4 w-4" /> },
    { id: 'custom', name: 'Action Personnalisée', icon: <HandCoins className="h-4 w-4" /> }
  ];
  
  const reputationActions: Record<string, RepAction[]> = {
    public: [
      { 
        id: 'temple', 
        title: 'Construire un temple', 
        description: 'Financez la construction d\'un temple pour honorer les dieux de Rome',
        impact: 15,
        icon: <Building2 className="h-4 w-4" />
      },
      { 
        id: 'aqueduct', 
        title: 'Financer un aqueduc', 
        description: 'Contribuez au financement d\'un nouvel aqueduc pour la ville',
        impact: 20,
        icon: <Building2 className="h-4 w-4" />
      },
      { 
        id: 'road', 
        title: 'Restaurer une voie romaine', 
        description: 'Financez la restauration d\'une importante voie de communication',
        impact: 10,
        icon: <Building2 className="h-4 w-4" />
      }
    ],
    social: [
      { 
        id: 'grain', 
        title: 'Distribution de grain', 
        description: 'Organisez une distribution de grain pour les plus démunis',
        impact: 8,
        icon: <Users className="h-4 w-4" />
      },
      { 
        id: 'feast', 
        title: 'Banquet public', 
        description: 'Offrez un banquet ouvert au public',
        impact: 5,
        icon: <Users className="h-4 w-4" />
      }
    ],
    military: [
      { 
        id: 'legion', 
        title: 'Financer une légion', 
        description: 'Participez au financement d\'une légion romaine',
        impact: 12,
        icon: <Swords className="h-4 w-4" />
      },
      { 
        id: 'victory', 
        title: 'Célébrer une victoire', 
        description: 'Organisez une célébration pour une victoire militaire',
        impact: 8,
        icon: <Trophy className="h-4 w-4" />
      }
    ],
    political: [
      { 
        id: 'law', 
        title: 'Proposer une loi populaire', 
        description: 'Présentez une loi favorable au peuple romain',
        impact: 10,
        icon: <ScrollText className="h-4 w-4" />
      },
      { 
        id: 'alliance', 
        title: 'Forger une alliance politique', 
        description: 'Établissez une alliance avec une autre famille influente',
        impact: 7,
        icon: <HandCoins className="h-4 w-4" />
      }
    ],
    games: [
      { 
        id: 'gladiators', 
        title: 'Organiser des jeux gladiatoriens', 
        description: 'Financez des combats de gladiateurs pour divertir le peuple',
        impact: 15,
        icon: <Trophy className="h-4 w-4" />
      },
      { 
        id: 'chariot', 
        title: 'Parrainer des courses de chars', 
        description: 'Soutenez financièrement des courses de chars au Circus Maximus',
        impact: 12,
        icon: <Trophy className="h-4 w-4" />
      }
    ],
    custom: [
      {
        id: 'custom',
        title: 'Action personnalisée',
        description: 'Créez votre propre action avec un impact personnalisé',
        impact: 0,
        icon: <HandCoins className="h-4 w-4" />,
        customizable: true
      }
    ]
  };
  
  const [selectedActionType, setSelectedActionType] = useState<string>('');
  const [selectedActionId, setSelectedActionId] = useState<string>('');
  
  const handleActionTypeChange = (type: string) => {
    setSelectedActionType(type);
    setSelectedActionId('');
  };
  
  const handleActionSelect = (actionId: string) => {
    setSelectedActionId(actionId);
  };
  
  const handleExecuteAction = () => {
    if (selectedActionType === 'custom') {
      if (!customEvent.trim()) {
        alert('Veuillez décrire l\'action personnalisée');
        return;
      }
      onSelectAction(customEvent, customImpact);
      
      // Réinitialiser
      setCustomEvent('');
      setCustomImpact(5);
    } else if (selectedActionType && selectedActionId) {
      const action = reputationActions[selectedActionType].find(a => a.id === selectedActionId);
      if (action) {
        onSelectAction(action.title, action.impact);
      }
    }
    
    // Réinitialiser
    setSelectedActionType('');
    setSelectedActionId('');
  };
  
  const selectedAction1 = selectedActionType && selectedActionId 
    ? reputationActions[selectedActionType].find(a => a.id === selectedActionId)
    : null;
  
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Améliorer votre réputation</h3>
        <p className="text-sm text-muted-foreground">
          Choisissez une action à entreprendre pour influencer la réputation de votre famille
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="action-type">Type d'action</Label>
          <Select value={selectedActionType} onValueChange={handleActionTypeChange}>
            <SelectTrigger id="action-type">
              <SelectValue placeholder="Sélectionnez un type d'action" />
            </SelectTrigger>
            <SelectContent>
              {actionTypes.map(type => (
                <SelectItem key={type.id} value={type.id}>
                  <div className="flex items-center gap-2">
                    {type.icon}
                    <span>{type.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {selectedActionType && (
          <div>
            <Label htmlFor="specific-action">Action spécifique</Label>
            <Select 
              value={selectedActionId} 
              onValueChange={handleActionSelect}
              disabled={!selectedActionType}
            >
              <SelectTrigger id="specific-action">
                <SelectValue placeholder="Sélectionnez une action" />
              </SelectTrigger>
              <SelectContent>
                {selectedActionType && reputationActions[selectedActionType]?.map(action => (
                  <SelectItem key={action.id} value={action.id}>
                    <div className="flex items-center gap-2">
                      {action.icon}
                      <span>{action.title}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      
      {selectedAction1 && !selectedAction1.customizable && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <h4 className="font-medium">{selectedAction1.title}</h4>
            <p className="text-sm mt-1">{selectedAction1.description}</p>
            <div className="mt-3 flex items-center">
              <span className="text-sm font-medium">Impact sur la réputation:</span>
              <span className="ml-2 text-green-600 font-semibold">+{selectedAction1.impact}</span>
            </div>
          </CardContent>
        </Card>
      )}
      
      {selectedActionType === 'custom' && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="custom-action">Description de l'action</Label>
            <Textarea 
              id="custom-action"
              placeholder="Décrivez votre action personnalisée..."
              value={customEvent}
              onChange={(e) => setCustomEvent(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="custom-impact">Impact estimé (1-25)</Label>
            <Input 
              id="custom-impact"
              type="number"
              min="1"
              max="25"
              value={customImpact}
              onChange={(e) => setCustomImpact(Number(e.target.value))}
            />
          </div>
        </div>
      )}
      
      <div className="flex justify-end">
        <Button 
          onClick={handleExecuteAction}
          disabled={
            (!selectedActionType || !selectedActionId) && 
            !(selectedActionType === 'custom' && customEvent)
          }
        >
          Exécuter cette action
        </Button>
      </div>
    </div>
  );
};
