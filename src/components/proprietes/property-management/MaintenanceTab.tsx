
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, ArrowUp, Banknote, Hammer, Shield } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { OwnedBuilding } from '../types/buildingTypes';
import { calculateMaintenanceCost, calculateIncomeByMaintenance } from './card/buildingAdapter';

interface MaintenanceTabProps {
  building: OwnedBuilding;
  updateMaintenanceLevel: (buildingId: string, level: number) => void;
  updateSecurityLevel: (buildingId: string, level: number) => void;
  renovateBuilding: (buildingId: string) => void;
}

const MAINTENANCE_LEVELS = ['Minimal', 'Basique', 'Standard', 'Élevé', 'Luxueux'];
const SECURITY_LEVELS = ['Minimal', 'Basique', 'Standard', 'Élevé', 'Maximum'];

export const MaintenanceTab: React.FC<MaintenanceTabProps> = ({
  building,
  updateMaintenanceLevel,
  updateSecurityLevel,
  renovateBuilding
}) => {
  const [activeSection, setActiveSection] = useState('maintenance');
  
  // Handlers
  const handleMaintenanceChange = (value: number[]) => {
    updateMaintenanceLevel(building.id, value[0]);
  };
  
  const handleSecurityChange = (value: number[]) => {
    updateSecurityLevel(building.id, value[0]);
  };
  
  const handleRenovation = () => {
    renovateBuilding(building.id);
  };

  // Calculer le coût d'entretien actuel
  const maintenanceCost = calculateMaintenanceCost(building);
  
  // Calculer le revenu avec le niveau d'entretien actuel
  const currentIncome = calculateIncomeByMaintenance(building);
  
  // Calculer le ratio revenu/coût
  const profitRatio = maintenanceCost > 0 ? currentIncome / maintenanceCost : 0;
  
  // Déterminer si la rénovation est nécessaire
  const needsRenovation = building.condition < 50;
  
  // Calculer le coût de rénovation
  const renovationCost = building.buildingDescription 
    ? Math.round((100 - building.condition) / 100 * building.buildingDescription.cost * 0.5)
    : 5000;
  
  return (
    <div className="space-y-6">
      <Tabs value={activeSection} onValueChange={setActiveSection}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="maintenance">Entretien</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="repairs">Réparations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hammer className="h-5 w-5" />
                Niveau d'entretien
              </CardTitle>
              <CardDescription>
                Définissez le niveau d'entretien pour maintenir votre propriété en bon état
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h4 className="font-medium">Niveau actuel: {MAINTENANCE_LEVELS[building.maintenanceLevel]}</h4>
                  <p className="text-sm text-muted-foreground">
                    Coût mensuel: {maintenanceCost} as
                  </p>
                </div>
                <Badge variant="outline" className={profitRatio >= 2 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
                  Ratio profit: {profitRatio.toFixed(1)}x
                </Badge>
              </div>
              
              <div className="py-4">
                <Slider
                  defaultValue={[building.maintenanceLevel]}
                  max={4}
                  step={1}
                  onValueChange={handleMaintenanceChange}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  {MAINTENANCE_LEVELS.map((level, i) => (
                    <span key={i} className={i === building.maintenanceLevel ? 'font-bold text-primary' : ''}>
                      {level}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Impact du niveau d'entretien</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Revenus estimés</p>
                    <div className="flex items-center gap-2">
                      <Banknote className="h-4 w-4 text-green-600" />
                      <span>{currentIncome} as/an</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Dégradation annuelle</p>
                    <div className="flex items-center gap-2">
                      <ArrowUp className="h-4 w-4 text-red-600 rotate-180" />
                      <span>{5 - building.maintenanceLevel}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Niveau de sécurité
              </CardTitle>
              <CardDescription>
                Protégez votre propriété contre les vols et les dégradations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <h4 className="font-medium">Niveau actuel: {SECURITY_LEVELS[building.securityLevel]}</h4>
                  <p className="text-sm text-muted-foreground">
                    Coût mensuel: {building.securityLevel * 200} as
                  </p>
                </div>
                <Badge className={building.securityLevel >= 3 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}>
                  {building.securityLevel >= 3 ? 'Sécurisé' : 'Vulnérable'}
                </Badge>
              </div>
              
              <div className="py-4">
                <Slider
                  defaultValue={[building.securityLevel]}
                  max={4}
                  step={1}
                  onValueChange={handleSecurityChange}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  {SECURITY_LEVELS.map((level, i) => (
                    <span key={i} className={i === building.securityLevel ? 'font-bold text-primary' : ''}>
                      {level}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Impact du niveau de sécurité</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex gap-2">
                    <span className="text-green-600">•</span>
                    <span>Niv. 0-1: Risque élevé de vol (10-15% des revenus)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-600">•</span>
                    <span>Niv. 2: Risque modéré de vol (5-10% des revenus)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Niv. 3-4: Risque faible de vol (0-5% des revenus)</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="repairs">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hammer className="h-5 w-5" />
                État et réparations
              </CardTitle>
              <CardDescription>
                Surveillez l'état de votre propriété et effectuez des réparations si nécessaire
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">État actuel</h4>
                  <span className={`text-sm font-medium ${
                    building.condition > 75 ? 'text-green-600' :
                    building.condition > 50 ? 'text-amber-600' :
                    'text-red-600'
                  }`}>
                    {building.condition}%
                  </span>
                </div>
                
                <Progress value={building.condition} className="h-2" />
                
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Délabré</span>
                  <span>Acceptable</span>
                  <span>Excellent</span>
                </div>
              </div>
              
              {needsRenovation && (
                <Alert variant="default">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Réparations nécessaires</AlertTitle>
                  <AlertDescription>
                    Votre propriété nécessite des réparations importantes pour maintenir sa valeur et ses revenus.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="pt-4">
                <Button 
                  onClick={handleRenovation} 
                  disabled={building.condition > 95}
                  className="w-full"
                >
                  <Hammer className="mr-2 h-4 w-4" />
                  {building.condition > 95 
                    ? 'Aucune rénovation nécessaire' 
                    : `Rénover pour ${renovationCost} as`}
                </Button>
                
                <p className="text-sm text-muted-foreground mt-2">
                  La rénovation restaure complètement l'état de votre propriété.
                  Plus l'état est dégradé, plus la rénovation sera coûteuse.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
