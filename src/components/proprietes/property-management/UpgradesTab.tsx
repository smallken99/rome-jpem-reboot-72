
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpCircle, LocateFixed, Coins, Lock } from 'lucide-react';
import { OwnedBuilding } from '../types/buildingTypes';

interface UpgradesTabProps {
  building: OwnedBuilding;
}

interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: string;
  available: boolean;
  installed: boolean;
  requirements: string[];
  icon: React.ReactNode;
}

export const UpgradesTab: React.FC<UpgradesTabProps> = ({ building }) => {
  // Liste des améliorations possibles selon le type de bâtiment
  const getUpgrades = (): Upgrade[] => {
    const baseUpgrades: Upgrade[] = [
      {
        id: 'security',
        name: 'Système de sécurité amélioré',
        description: 'Renforce la sécurité du bâtiment avec des gardes et des équipements supplémentaires.',
        cost: 2000,
        effect: '+20% de sécurité, -5% risque de vol',
        available: building.condition >= 60,
        installed: building.securityLevel >= 2,
        requirements: ['Condition du bâtiment >= 60%'],
        icon: <LocateFixed className="h-5 w-5" />
      }
    ];
    
    // Ajout d'améliorations spécifiques selon le type de bâtiment
    if (building.type === 'urban') {
      return [
        ...baseUpgrades,
        {
          id: 'atrium',
          name: 'Atrium luxueux',
          description: 'Un atrium spacieux avec de belles mosaïques et un impluvium élégant.',
          cost: 3500,
          effect: '+15% prestige, +5% valeur',
          available: building.condition >= 70,
          installed: false,
          requirements: ['Condition du bâtiment >= 70%', 'Domus ou Villa urbaine'],
          icon: <ArrowUpCircle className="h-5 w-5" />
        },
        {
          id: 'income',
          name: 'Aménagements commerciaux',
          description: 'Création ou amélioration des espaces commerciaux pour augmenter les revenus.',
          cost: 2800,
          effect: '+10% revenu mensuel',
          available: building.condition >= 50,
          installed: false,
          requirements: ['Condition du bâtiment >= 50%', 'Propriété urbaine'],
          icon: <Coins className="h-5 w-5" />
        }
      ];
    } else if (building.type === 'rural') {
      return [
        ...baseUpgrades,
        {
          id: 'irrigation',
          name: 'Système d\'irrigation avancé',
          description: 'Réseau d\'irrigation permettant d\'améliorer le rendement des cultures.',
          cost: 4200,
          effect: '+15% production agricole',
          available: building.condition >= 60,
          installed: false,
          requirements: ['Condition du bâtiment >= 60%', 'Propriété rurale'],
          icon: <ArrowUpCircle className="h-5 w-5" />
        },
        {
          id: 'storage',
          name: 'Entrepôts améliorés',
          description: 'Agrandissement et amélioration des entrepôts pour stocker plus de marchandises.',
          cost: 3000,
          effect: '+20% capacité de stockage, -5% pertes',
          available: building.condition >= 50,
          installed: false,
          requirements: ['Condition du bâtiment >= 50%', 'Propriété rurale'],
          icon: <Coins className="h-5 w-5" />
        }
      ];
    }
    
    return baseUpgrades;
  };
  
  const upgrades = getUpgrades();
  
  const handleInstallUpgrade = (upgradeId: string) => {
    // Cette fonction serait utilisée pour installer une amélioration
    console.log(`Installing upgrade: ${upgradeId} for building: ${building.id}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {upgrades.map((upgrade) => (
          <Card key={upgrade.id} className={upgrade.installed ? 'border-green-200 bg-green-50' : ''}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {upgrade.icon}
                  <CardTitle className="text-lg">{upgrade.name}</CardTitle>
                </div>
                {upgrade.installed && (
                  <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                    Installé
                  </span>
                )}
              </div>
              <CardDescription>{upgrade.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Effet:</p>
                  <p className="text-sm text-muted-foreground">{upgrade.effect}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Coût:</p>
                  <p className="text-sm text-muted-foreground">{upgrade.cost} as</p>
                </div>
                
                {!upgrade.available && (
                  <div className="text-sm text-amber-600 flex items-center gap-1">
                    <Lock className="h-3.5 w-3.5" />
                    <span>Prérequis non remplis</span>
                  </div>
                )}
                
                <div className="pt-2">
                  <Button
                    variant={upgrade.installed ? "outline" : "default"}
                    className="w-full"
                    disabled={!upgrade.available || upgrade.installed}
                    onClick={() => handleInstallUpgrade(upgrade.id)}
                  >
                    {upgrade.installed ? "Déjà installé" : "Installer"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {upgrades.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Aucune amélioration disponible pour ce type de bâtiment.
          </p>
        </div>
      )}
    </div>
  );
};
