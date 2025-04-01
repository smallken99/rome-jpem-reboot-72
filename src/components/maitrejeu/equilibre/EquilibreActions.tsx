
import React from 'react';
import { 
  ArrowUpDown, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Scale,
  Gavel, 
  Building2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EquilibreActionProps {
  onApplyAction: (action: string, intensity: number) => void;
}

export const EquilibreActions: React.FC<EquilibreActionProps> = ({ onApplyAction }) => {
  const handleActionClick = (action: string, intensity: number) => {
    onApplyAction(action, intensity);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Actions d'Équilibrage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <ActionButton
              icon={<TrendingUp className="h-5 w-5 text-green-500" />}
              label="Stimuler l'Économie"
              description="Augmenter les investissements publics et le commerce"
              onClick={() => handleActionClick('boost_economy', 10)}
            />
            
            <ActionButton
              icon={<TrendingDown className="h-5 w-5 text-red-500" />}
              label="Austérité Économique"
              description="Réduire les dépenses publiques et rationner les ressources"
              onClick={() => handleActionClick('economic_austerity', 10)}
            />
            
            <ActionButton
              icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
              label="Mesures d'Urgence"
              description="Actions exceptionnelles pour situation de crise"
              onClick={() => handleActionClick('emergency_measures', 15)}
            />
            
            <ActionButton
              icon={<Scale className="h-5 w-5 text-blue-500" />}
              label="Réformes Sociales"
              description="Améliorer les conditions de vie des citoyens"
              onClick={() => handleActionClick('social_reforms', 8)}
            />
            
            <ActionButton
              icon={<Gavel className="h-5 w-5 text-purple-500" />}
              label="Lois Conservatrices"
              description="Renforcer l'ordre traditionnel"
              onClick={() => handleActionClick('conservative_laws', 8)}
            />
            
            <ActionButton
              icon={<Building2 className="h-5 w-5 text-indigo-500" />}
              label="Concessions Politiques"
              description="Équilibrer les factions politiques"
              onClick={() => handleActionClick('political_concessions', 12)}
            />
            
            <ActionButton
              icon={<ArrowUpDown className="h-5 w-5 text-gray-500" />}
              label="Équilibre Neutre"
              description="Ajustements mineurs pour maintenir le statu quo"
              onClick={() => handleActionClick('neutral_balance', 5)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, label, description, onClick }) => {
  return (
    <Button
      variant="outline"
      className="w-full justify-start h-auto py-3 px-4"
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className="mr-3 mt-0.5">{icon}</div>
        <div className="text-left">
          <div className="font-medium">{label}</div>
          <div className="text-xs text-muted-foreground mt-1">{description}</div>
        </div>
      </div>
    </Button>
  );
};
