
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Property, PropertyUpgrade } from '@/types/proprietes';
import { ArrowUpCircle, Check, Lock } from 'lucide-react';

interface PropertyUpgradePanelProps {
  property: Property;
  onUpgrade?: (propertyId: string, upgradeId: string) => void;
}

export const PropertyUpgradePanel: React.FC<PropertyUpgradePanelProps> = ({
  property,
  onUpgrade
}) => {
  // Use provided upgrades or default to empty array
  const availableUpgrades = property.upgrades || [];

  const handleUpgrade = (upgradeId: string) => {
    if (onUpgrade) {
      onUpgrade(property.id, upgradeId);
    }
  };

  const isUpgradeAvailable = (upgrade: PropertyUpgrade): boolean => {
    if (!upgrade.prerequisiteUpgradeId) return true;
    return availableUpgrades.some(u => 
      u.id === upgrade.prerequisiteUpgradeId && u.installed
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <ArrowUpCircle className="h-5 w-5" />
          Améliorations Disponibles
        </CardTitle>
      </CardHeader>
      <CardContent>
        {availableUpgrades.length > 0 ? (
          <div className="space-y-4">
            {availableUpgrades.map((upgrade) => {
              const isAvailable = isUpgradeAvailable(upgrade);
              
              return (
                <div 
                  key={upgrade.id}
                  className={`p-3 border rounded-md ${
                    upgrade.installed 
                      ? 'bg-green-50 border-green-200' 
                      : isAvailable 
                        ? 'bg-white border-gray-200 hover:border-blue-200' 
                        : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-sm">{upgrade.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{upgrade.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {upgrade.installed ? (
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                      ) : (
                        <div className="text-xs font-medium text-right">
                          {upgrade.cost.toLocaleString()} as
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {!upgrade.installed && (
                    <div className="mt-3">
                      <div className="text-xs text-green-700 mb-2">
                        <span className="font-medium">Bénéfice:</span> {upgrade.benefitDescription}
                      </div>
                      
                      <Button 
                        size="sm" 
                        variant={isAvailable ? "default" : "outline"}
                        className="w-full"
                        disabled={!isAvailable}
                        onClick={() => handleUpgrade(upgrade.id)}
                      >
                        {isAvailable ? (
                          "Installer"
                        ) : (
                          <div className="flex items-center gap-1">
                            <Lock className="h-3 w-3" />
                            <span>Prérequis manquant</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            <p>Aucune amélioration disponible pour cette propriété.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyUpgradePanel;
