
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Scales, 
  Shield, 
  Landmark, 
  ChevronsUp, 
  ChevronsDown,
  Users,
  Coins
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Equilibre } from '@/components/maitrejeu/types/equilibre';
import { useEconomy } from '@/hooks/useEconomy';
import { useBuildings } from '@/hooks/useBuildings';

interface EquilibreActionsProps {
  equilibre: Equilibre;
  onAction: (action: string, amount: number) => void;
}

export const EquilibreActions: React.FC<EquilibreActionsProps> = ({ equilibre, onAction }) => {
  const { balance } = useEconomy();
  const { stats } = useBuildings();

  // Calculer la stabilité globale de la République
  const calculateOverallStability = () => {
    const politicalStability = (equilibre.politique.moderates / 100) * 0.3;
    const economicStability = 
      ((equilibre.economie.stabilite + equilibre.economie.croissance) / 200) * 0.3;
    const militaryStability = 
      ((equilibre.militaire.moral + equilibre.militaire.discipline) / 200) * 0.2;
    const socialStability = 
      ((equilibre.social.cohesion || 50) / 100) * 0.2;
    
    return Math.round((politicalStability + economicStability + militaryStability + socialStability) * 100);
  };

  const getStabilityClass = (stability: number) => {
    if (stability >= 75) return 'bg-green-100 text-green-800';
    if (stability >= 50) return 'bg-blue-100 text-blue-800';
    if (stability >= 25) return 'bg-amber-100 text-amber-800';
    return 'bg-red-100 text-red-800';
  };

  // Actions possibles basées sur l'état de l'équilibre
  const actions = [
    {
      id: 'subsidize_plebs',
      label: 'Subventionner la plèbe',
      description: 'Augmenter la cohésion sociale et diminuer les tensions',
      icon: <Users className="h-4 w-4 mr-2" />,
      cost: 5000,
      available: balance >= 5000,
      impact: 'Cohésion sociale +10%, Soutien des populares +5%',
      onClick: () => onAction('subsidize_plebs', 5000)
    },
    {
      id: 'military_parade',
      label: 'Organiser une parade militaire',
      description: 'Montrer la puissance militaire de Rome et renforcer la discipline',
      icon: <Shield className="h-4 w-4 mr-2" />,
      cost: 3000,
      available: balance >= 3000,
      impact: 'Moral des troupes +8%, Discipline +5%, Soutien des optimates +3%',
      onClick: () => onAction('military_parade', 3000)
    },
    {
      id: 'temple_donation',
      label: 'Donation aux temples',
      description: 'Honorer les dieux et augmenter la piété publique',
      icon: <Landmark className="h-4 w-4 mr-2" />,
      cost: 2000,
      available: balance >= 2000,
      impact: 'Piété +15%, Superstition -5%',
      onClick: () => onAction('temple_donation', 2000)
    },
    {
      id: 'trade_incentives',
      label: 'Incitations commerciales',
      description: 'Stimuler le commerce avec des réductions fiscales',
      icon: <Coins className="h-4 w-4 mr-2" />,
      cost: 8000,
      available: balance >= 8000,
      impact: 'Commerce +12%, Croissance +5%, Stabilité économique +3%',
      onClick: () => onAction('trade_incentives', 8000)
    },
    {
      id: 'reconciliation_meeting',
      label: 'Réunion de réconciliation',
      description: 'Réunir les factions politiques pour apaiser les tensions',
      icon: <Scales className="h-4 w-4 mr-2" />,
      cost: 1000,
      available: balance >= 1000,
      impact: 'Modérés +7%, Tensions politiques -10%',
      onClick: () => onAction('reconciliation_meeting', 1000)
    }
  ];

  return (
    <div className="space-y-4">
      <div className="bg-muted p-3 rounded-md flex items-center justify-between">
        <div className="flex items-center">
          <Scales className="h-5 w-5 mr-2 text-purple-500" />
          <span>Stabilité globale:</span>
        </div>
        <div className={`px-2 py-0.5 rounded-full font-medium ${getStabilityClass(calculateOverallStability())}`}>
          {calculateOverallStability()}%
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {actions.map(action => (
          <TooltipProvider key={action.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant={action.available ? "outline" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={action.onClick}
                  disabled={!action.available}
                >
                  {action.icon}
                  <span className="flex-1 text-left">{action.label}</span>
                  <span className="text-muted-foreground text-xs">{action.cost} As</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="w-64 p-3">
                <p className="font-medium">{action.label}</p>
                <p className="text-sm text-muted-foreground mb-2">{action.description}</p>
                <div className="text-xs bg-accent p-1 rounded">
                  <p className="font-medium mb-1">Impact estimé:</p>
                  <p>{action.impact}</p>
                </div>
                {!action.available && (
                  <p className="text-xs text-red-500 mt-1">Fonds insuffisants</p>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};
