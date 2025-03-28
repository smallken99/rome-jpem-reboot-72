
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  XCircle, 
  Coins, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Construction 
} from 'lucide-react';
import { PropertyUpgrade } from '@/types/proprietes';

interface UpgradeListProps {
  upgrades: PropertyUpgrade[];
  onInstall: (upgradeId: string) => void;
  propertyValue: number;
  propertyCondition: number;
  installedUpgrades: string[];
}

const UpgradeList: React.FC<UpgradeListProps> = ({
  upgrades,
  onInstall,
  propertyValue,
  propertyCondition,
  installedUpgrades
}) => {
  const isInstalled = (id: string) => installedUpgrades.includes(id);
  
  const canInstall = (upgrade: PropertyUpgrade) => {
    if (isInstalled(upgrade.id)) return false;
    
    if (upgrade.requirements) {
      if (upgrade.requirements.value && propertyValue < upgrade.requirements.value) return false;
      if (upgrade.requirements.condition && propertyCondition < upgrade.requirements.condition) return false;
      if (upgrade.requirements.upgrades && 
          upgrade.requirements.upgrades.some(id => !installedUpgrades.includes(id))) return false;
    }
    
    return true;
  };
  
  return (
    <div className="space-y-4">
      {upgrades.map(upgrade => (
        <div 
          key={upgrade.id} 
          className={`border rounded-lg p-4 ${isInstalled(upgrade.id) ? 'bg-gray-50' : ''}`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{upgrade.name}</h3>
                {isInstalled(upgrade.id) && (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Installé
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{upgrade.description}</p>
              
              <div className="mt-3 grid grid-cols-2 gap-2">
                {upgrade.effects.income && (
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>Revenus: +{upgrade.effects.income} as</span>
                  </div>
                )}
                
                {upgrade.effects.maintenance && (
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingDown className="h-4 w-4 text-red-500" />
                    <span>Entretien: {upgrade.effects.maintenance > 0 ? '+' : ''}{upgrade.effects.maintenance} as</span>
                  </div>
                )}
                
                {upgrade.effects.security && (
                  <div className="flex items-center gap-1 text-sm">
                    <ShieldCheck className="h-4 w-4 text-blue-500" />
                    <span>Sécurité: +{upgrade.effects.security}%</span>
                  </div>
                )}
                
                {upgrade.effects.condition && (
                  <div className="flex items-center gap-1 text-sm">
                    <Construction className="h-4 w-4 text-amber-500" />
                    <span>État: +{upgrade.effects.condition}%</span>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <Button 
                variant={isInstalled(upgrade.id) ? "outline" : "default"} 
                size="sm"
                disabled={isInstalled(upgrade.id) || !canInstall(upgrade)}
                onClick={() => onInstall(upgrade.id)}
                className="whitespace-nowrap"
              >
                <Coins className="h-4 w-4 mr-1" />
                {isInstalled(upgrade.id) ? 'Installé' : `${upgrade.cost} as`}
              </Button>
              
              {!canInstall(upgrade) && !isInstalled(upgrade.id) && (
                <div className="text-xs text-red-500 mt-1 flex items-center">
                  <XCircle className="h-3 w-3 mr-1" />
                  <span>Prérequis manquants</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpgradeList;
