
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Property } from '@/types/proprietes';
import { Wrench, AlertTriangle, ArrowDown, ArrowUp } from 'lucide-react';

interface MaintenanceCostsPanelProps {
  property: Property;
  onMaintain?: (buildingId: string, amount: number) => void;
}

export const MaintenanceCostsPanel: React.FC<MaintenanceCostsPanelProps> = ({
  property,
  onMaintain
}) => {
  const getStatusColor = () => {
    switch (property.status) {
      case 'excellent': return 'text-green-500';
      case 'good': return 'text-teal-500';
      case 'fair': return 'text-blue-500';
      case 'poor': return 'text-amber-500';
      case 'dilapidated': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusDescription = () => {
    switch (property.status) {
      case 'excellent': 
        return 'La propriété est en parfait état et génère un revenu maximal.';
      case 'good': 
        return 'La propriété est bien entretenue et génère un bon revenu.';
      case 'fair': 
        return 'La propriété nécessite un entretien régulier pour maintenir sa valeur.';
      case 'poor': 
        return 'La propriété se dégrade et génère moins de revenus. Une rénovation serait bénéfique.';
      case 'dilapidated': 
        return 'La propriété est en très mauvais état. Une rénovation complète est nécessaire.';
      default: 
        return 'État inconnu';
    }
  };

  const handleMaintain = () => {
    if (onMaintain) {
      // Calculate maintenance cost: 5% of building value for regular maintenance
      const maintenanceCost = Math.floor(property.value * 0.05);
      onMaintain(property.id, maintenanceCost);
    }
  };

  const needsMajorRepairs = property.status === 'poor' || property.status === 'dilapidated';
  const maintenance = property.maintenance || property.maintenanceCost || 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Entretien et Maintenance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">État Actuel</span>
              <span className={`text-sm font-medium ${getStatusColor()}`}>
                {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{getStatusDescription()}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <div className="text-sm font-medium mb-1">Coût Annuel</div>
              <div className="text-xl font-bold">{maintenance.toLocaleString()} as</div>
              <p className="text-xs text-muted-foreground mt-1">Entretien régulier nécessaire</p>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Impact sur le Revenu</div>
              <div className="flex items-center">
                {needsMajorRepairs ? (
                  <>
                    <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-xl font-bold text-red-500">-30%</span>
                  </>
                ) : (
                  <>
                    <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-xl font-bold text-green-500">+5%</span>
                  </>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {needsMajorRepairs 
                  ? 'Les réparations augmenteront vos revenus'
                  : 'Un bon entretien maximise vos revenus'}
              </p>
            </div>
          </div>

          {needsMajorRepairs && (
            <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md mt-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800">Réparations majeures recommandées</p>
                <p className="text-xs text-amber-700 mt-1">
                  Cette propriété nécessite des réparations importantes pour retrouver sa valeur et sa rentabilité.
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MaintenanceCostsPanel;
