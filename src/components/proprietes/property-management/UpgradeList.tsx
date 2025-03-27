
import React from 'react';
import { PropertyUpgrade } from '@/types/proprietes';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Check } from 'lucide-react';

interface UpgradeListProps {
  upgrades: PropertyUpgrade[];
  onSelectUpgrade: (upgrade: PropertyUpgrade | null) => void;
  selectedUpgrade: PropertyUpgrade | null;
}

export const UpgradeList: React.FC<UpgradeListProps> = ({ 
  upgrades, 
  onSelectUpgrade,
  selectedUpgrade
}) => {
  return (
    <div className="space-y-2">
      {upgrades.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-4">
          Aucune amélioration disponible pour cette propriété.
        </p>
      ) : (
        upgrades.map(upgrade => (
          <div 
            key={upgrade.id}
            className={`p-3 border rounded-md cursor-pointer transition-colors ${
              selectedUpgrade?.id === upgrade.id 
                ? 'bg-blue-50 border-blue-200' 
                : 'hover:bg-slate-50'
            } ${
              upgrade.installed ? 'bg-green-50 border-green-200' : ''
            }`}
            onClick={() => onSelectUpgrade(selectedUpgrade?.id === upgrade.id ? null : upgrade)}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium">{upgrade.name}</h4>
                  {upgrade.installed && (
                    <Badge className="bg-green-500">
                      <Check className="h-3 w-3 mr-1" />
                      Installé
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{upgrade.description}</p>
              </div>
              <div className="text-sm font-medium">
                {upgrade.installed ? (
                  <X className="h-4 w-4 text-gray-400" />
                ) : (
                  <div className="flex items-center">
                    <span>{upgrade.cost} as</span>
                    <Plus className={`h-4 w-4 ml-1 ${selectedUpgrade?.id === upgrade.id ? 'text-blue-500' : 'text-gray-400'}`} />
                  </div>
                )}
              </div>
            </div>
            
            <Separator className="my-2" />
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              {upgrade.effects.income && (
                <div className={upgrade.effects.income > 0 ? 'text-green-600' : 'text-red-600'}>
                  Revenu: {upgrade.effects.income > 0 ? '+' : ''}{upgrade.effects.income}
                </div>
              )}
              {upgrade.effects.maintenance && (
                <div className={upgrade.effects.maintenance < 0 ? 'text-green-600' : 'text-red-600'}>
                  Entretien: {upgrade.effects.maintenance > 0 ? '+' : ''}{upgrade.effects.maintenance}
                </div>
              )}
              {upgrade.effects.security && (
                <div className="text-blue-600">
                  Sécurité: +{upgrade.effects.security}
                </div>
              )}
              {upgrade.effects.condition && (
                <div className="text-amber-600">
                  Condition: +{upgrade.effects.condition}%
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
