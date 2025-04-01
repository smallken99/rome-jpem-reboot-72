
import React, { useState } from 'react';
import { OwnedBuilding } from '../types/buildingTypes';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Wrench, 
  Shield, 
  Users, 
  Coins, 
  TrendingUp, 
  BarChart, 
  Info, 
  AlertTriangle 
} from 'lucide-react';
import { BuildingManagementActions } from './BuildingManagementActions';
import { formatCurrency } from '@/utils/formatters';
import { formatDate } from '@/utils/dateHelpers';

interface BuildingDashboardProps {
  building: OwnedBuilding;
  onPerformMaintenance: (buildingId: string) => void;
  onUpdateMaintenanceLevel: (buildingId: string, level: number) => void;
  onUpdateSecurityLevel: (buildingId: string, level: number) => void;
  onAssignWorkers: (buildingId: string, count: number) => void;
  onRename: (buildingId: string, newName: string) => void;
  onToggleMaintenance: (buildingId: string, enabled: boolean) => void;
  canAffordMaintenance?: boolean;
  canAffordSecurity?: boolean;
  onSell?: (buildingId: string) => void;
  onBack?: () => void;
  buildingValue?: number;
  monthlyIncome?: number;
  monthlyExpenses?: number;
}

export const BuildingDashboard: React.FC<BuildingDashboardProps> = ({
  building,
  onPerformMaintenance,
  onUpdateMaintenanceLevel,
  onUpdateSecurityLevel,
  onAssignWorkers,
  onRename,
  onToggleMaintenance,
  canAffordMaintenance = true,
  canAffordSecurity = true,
  onSell,
  onBack,
  buildingValue = 0,
  monthlyIncome = 0,
  monthlyExpenses = 0,
}) => {
  const [showSellConfirmation, setShowSellConfirmation] = useState(false);

  // Convertir la condition en classe de couleur pour la barre de progression
  const getConditionColorClass = (condition: number) => {
    if (condition >= 90) return "bg-green-500";
    if (condition >= 70) return "bg-green-400";
    if (condition >= 50) return "bg-yellow-400";
    if (condition >= 30) return "bg-orange-400";
    return "bg-red-500";
  };

  // Obtenir un statut textuel selon l'état
  const getConditionStatus = (condition: number) => {
    if (condition >= 90) return { text: "Excellent", color: "bg-green-100 text-green-800" };
    if (condition >= 70) return { text: "Bon", color: "bg-green-100 text-green-800" };
    if (condition >= 50) return { text: "Correct", color: "bg-yellow-100 text-yellow-800" };
    if (condition >= 30) return { text: "Dégradé", color: "bg-orange-100 text-orange-800" };
    return { text: "Critique", color: "bg-red-100 text-red-800" };
  };

  // Calculer le profit net
  const netProfit = monthlyIncome - monthlyExpenses;

  // Profit status
  const getProfitStatus = () => {
    if (netProfit <= 0) return { text: "Non rentable", color: "bg-red-100 text-red-800" };
    if (netProfit < building.maintenanceCost * 0.5) return { text: "Faible rentabilité", color: "bg-yellow-100 text-yellow-800" };
    if (netProfit < building.maintenanceCost) return { text: "Rentable", color: "bg-green-100 text-green-800" };
    return { text: "Très rentable", color: "bg-emerald-100 text-emerald-800" };
  };

  // Importance de la maintenance
  const maintenanceWarning = building.condition < 50;

  return (
    <div className="space-y-6">
      {onBack && (
        <Button 
          variant="outline" 
          onClick={onBack} 
          className="mb-4"
        >
          Retour à la liste des propriétés
        </Button>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Carte principale d'information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <CardTitle>{building.name}</CardTitle>
                </div>
                <CardDescription className="flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1" /> {building.location}
                </CardDescription>
              </div>
              <Badge variant="outline" className="capitalize">{building.buildingType}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Détails de l'état */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="font-medium">État du bâtiment</div>
                <Badge className={getConditionStatus(building.condition).color}>
                  {getConditionStatus(building.condition).text}
                </Badge>
              </div>
              <Progress 
                value={building.condition} 
                className={`h-2 ${getConditionColorClass(building.condition)}`} 
              />
              
              {maintenanceWarning && (
                <Alert variant="destructive" className="mt-2">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Ce bâtiment nécessite des réparations au plus vite !
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Informations principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-muted/40 p-3 rounded-md">
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Date d'acquisition
                </div>
                <div className="font-medium mt-1">
                  {formatDate(building.purchaseDate)}
                </div>
              </div>
              
              <div className="bg-muted/40 p-3 rounded-md">
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Wrench className="h-4 w-4" />
                  Niveau d'entretien
                </div>
                <div className="font-medium mt-1">
                  {building.maintenanceLevel}/10
                </div>
              </div>
              
              <div className="bg-muted/40 p-3 rounded-md">
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  Niveau de sécurité
                </div>
                <div className="font-medium mt-1">
                  {building.securityLevel}/10
                </div>
              </div>
              
              <div className="bg-muted/40 p-3 rounded-md">
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Personnel
                </div>
                <div className="font-medium mt-1">
                  {building.workers}/{building.maxWorkers} travailleurs
                </div>
              </div>
              
              <div className="bg-muted/40 p-3 rounded-md">
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <Coins className="h-4 w-4" />
                  Coût d'entretien
                </div>
                <div className="font-medium mt-1">
                  {formatCurrency(building.maintenanceCost)}/mois
                </div>
              </div>
              
              <div className="bg-muted/40 p-3 rounded-md">
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  Revenus mensuels
                </div>
                <div className="font-medium mt-1">
                  {formatCurrency(building.income)}
                </div>
              </div>
            </div>

            {/* Description du bâtiment */}
            <div>
              <div className="font-medium mb-1 flex items-center gap-1">
                <Info className="h-4 w-4" />
                Description
              </div>
              <p className="text-sm text-muted-foreground">{building.description}</p>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="w-full flex justify-between">
              <div className="flex gap-2">
                <Badge className={getProfitStatus().color}>
                  {getProfitStatus().text}
                </Badge>
                {building.maintenanceEnabled && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-800">
                    Entretien automatique
                  </Badge>
                )}
              </div>
              
              {onSell && (
                <Button 
                  variant="destructive" 
                  onClick={() => setShowSellConfirmation(true)}
                >
                  Vendre la propriété
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>

        {/* Partie droite - Finances */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Finances
            </CardTitle>
            <CardDescription>
              Résumé financier de cette propriété
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Valeur estimée</div>
              <div className="text-2xl font-bold">{formatCurrency(buildingValue)}</div>
            </div>
            
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between">
                <span>Revenus mensuels</span>
                <span className="font-medium text-green-600">{formatCurrency(monthlyIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span>Dépenses mensuelles</span>
                <span className="font-medium text-red-600">{formatCurrency(monthlyExpenses)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-medium">Profit net</span>
                <span className={`font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(netProfit)}
                </span>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <div className="text-sm text-muted-foreground mb-2">Rentabilité</div>
              <Progress 
                value={Math.max(0, Math.min(100, (netProfit / building.maintenanceCost) * 50))} 
                className={`h-2 ${netProfit >= 0 ? 'bg-green-500' : 'bg-red-500'}`} 
              />
              <div className="text-xs text-muted-foreground mt-1">
                {netProfit >= 0 
                  ? `Rentabilité: ${Math.round((netProfit / (building.maintenanceCost || 1)) * 100)}%` 
                  : 'Non rentable'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <BuildingManagementActions 
          building={building}
          onPerformMaintenance={onPerformMaintenance}
          onUpdateMaintenanceLevel={onUpdateMaintenanceLevel}
          onUpdateSecurityLevel={onUpdateSecurityLevel}
          onAssignWorkers={onAssignWorkers}
          onRename={onRename}
          onToggleMaintenance={onToggleMaintenance}
          canAffordMaintenance={canAffordMaintenance}
          canAffordSecurity={canAffordSecurity}
        />
      </div>

      {showSellConfirmation && onSell && (
        <Card className="mt-6 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Confirmation de vente</CardTitle>
            <CardDescription>
              Êtes-vous sûr de vouloir vendre cette propriété ? Cette action est irréversible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-medium">Prix de vente estimé: {formatCurrency(buildingValue * 0.8)}</div>
            <div className="text-sm text-muted-foreground mt-1">
              (80% de la valeur estimée de {formatCurrency(buildingValue)})
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setShowSellConfirmation(false)}
            >
              Annuler
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => {
                onSell(building.id);
                setShowSellConfirmation(false);
              }}
            >
              Confirmer la vente
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
