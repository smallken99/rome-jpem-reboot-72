
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, Home, Tools, Shield, Users, Coins, TrendingUp } from 'lucide-react';
import { OwnedBuilding } from '@/components/proprietes/hooks/building/types';
import { formatCurrency } from '@/utils/formatters';

interface BuildingDetailsModalProps {
  building: OwnedBuilding | null;
  isOpen: boolean;
  onClose: () => void;
  onSell: (buildingId: string) => void;
  onMaintenanceLevelChange: (buildingId: string, level: number) => void;
  onSecurityLevelChange: (buildingId: string, level: number) => void;
  onWorkerAssign: (buildingId: string, count: number) => void;
  calculateMonthlyIncome: (buildingId: string) => number;
  calculateMaintenanceCost: (buildingId: string) => number;
}

export const BuildingDetailsModal: React.FC<BuildingDetailsModalProps> = ({
  building,
  isOpen,
  onClose,
  onSell,
  onMaintenanceLevelChange,
  onSecurityLevelChange,
  onWorkerAssign,
  calculateMonthlyIncome,
  calculateMaintenanceCost
}) => {
  const [activeTab, setActiveTab] = React.useState('overview');
  const [workerCount, setWorkerCount] = React.useState(0);
  
  React.useEffect(() => {
    if (building) {
      setWorkerCount(building.slaves || 0);
    }
  }, [building]);
  
  if (!building) return null;
  
  const monthlyIncome = calculateMonthlyIncome(building.id.toString());
  const maintenanceCost = calculateMaintenanceCost(building.id.toString());
  const netIncome = monthlyIncome - maintenanceCost;
  
  const handleSellProperty = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir vendre ${building.name}?`)) {
      onSell(building.id.toString());
      onClose();
    }
  };
  
  const handleWorkerAssign = () => {
    onWorkerAssign(building.id.toString(), workerCount);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            {building.name}
          </DialogTitle>
          <DialogDescription>
            {building.location} - Propriété de type {building.buildingType}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue générale</TabsTrigger>
            <TabsTrigger value="maintenance">Entretien</TabsTrigger>
            <TabsTrigger value="personnel">Personnel</TabsTrigger>
            <TabsTrigger value="finances">Finances</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2">État et condition</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>État actuel:</span>
                      <span className="font-medium">{building.condition}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Entretien:</span>
                      <span className="font-medium">{building.maintenanceEnabled ? 'Activé' : 'Désactivé'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dernier entretien:</span>
                      <span className="font-medium">
                        {building.lastMaintenance 
                          ? new Date(building.lastMaintenance).toLocaleDateString() 
                          : "Jamais"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2">Finances</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Revenu mensuel:</span>
                      <span className="font-medium text-green-600">{formatCurrency(monthlyIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Coût d'entretien:</span>
                      <span className="font-medium text-red-600">{formatCurrency(maintenanceCost)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span>Revenu net:</span>
                      <span className={`font-medium ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(netIncome)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-end">
              <Button variant="destructive" onClick={handleSellProperty}>
                Vendre la propriété
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="maintenance" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Tools className="h-5 w-5" />
                  <h3 className="font-medium">Niveau d'entretien</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Niveau actuel:</span>
                      <span>{building.maintenanceLevel || 1}/5</span>
                    </div>
                    <Slider
                      defaultValue={[building.maintenanceLevel || 1]}
                      max={5}
                      min={1}
                      step={1}
                      onValueChange={(value) => onMaintenanceLevelChange(building.id.toString(), value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Minimal</span>
                      <span>Standard</span>
                      <span>Premium</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5" />
                      <h3 className="font-medium">Niveau de sécurité</h3>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Niveau actuel:</span>
                      <span>{building.securityLevel || 1}/5</span>
                    </div>
                    <Slider
                      defaultValue={[building.securityLevel || 1]}
                      max={5}
                      min={1}
                      step={1}
                      onValueChange={(value) => onSecurityLevelChange(building.id.toString(), value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Minimal</span>
                      <span>Standard</span>
                      <span>Élevé</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="personnel" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5" />
                  <h3 className="font-medium">Personnel assigné</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Esclaves actuellement assignés:</span>
                    <span className="font-medium">{building.slaves || 0}</span>
                  </div>
                  
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <span className="text-sm">Nouvel assignement:</span>
                      <Input
                        type="number"
                        min="0"
                        value={workerCount}
                        onChange={(e) => setWorkerCount(parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                    <Button onClick={handleWorkerAssign}>
                      Assigner
                    </Button>
                  </div>
                  
                  <div className="bg-slate-50 p-3 rounded-md text-sm">
                    <p>
                      <span className="font-medium">Note:</span> Le nombre optimal d'esclaves pour ce type de propriété 
                      est estimé à {building.buildingType === 'rural' ? '20-30' : '5-15'} esclaves selon la taille.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="finances" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Coins className="h-5 w-5" />
                  <h3 className="font-medium">Aperçu financier</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-3 rounded-md">
                      <div className="text-sm text-muted-foreground">Revenu brut annuel</div>
                      <div className="text-xl font-medium text-green-600">
                        {formatCurrency(monthlyIncome * 12)}
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 p-3 rounded-md">
                      <div className="text-sm text-muted-foreground">Coûts annuels</div>
                      <div className="text-xl font-medium text-red-600">
                        {formatCurrency(maintenanceCost * 12)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-3 rounded-md">
                    <div className="text-sm text-muted-foreground">Profit net annuel</div>
                    <div className={`text-xl font-medium ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(netIncome * 12)}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4">
                    <TrendingUp className="h-5 w-5" />
                    <h3 className="font-medium">Optimisation des revenus</h3>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800">
                    <p className="mb-2">
                      Conseils pour améliorer la rentabilité:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Maintenir le bâtiment en bon état (condition &gt; 80%)</li>
                      <li>Assigner le nombre optimal d'esclaves pour ce type de propriété</li>
                      <li>Améliorer la sécurité pour réduire les risques de vol et de vandalisme</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-start mt-4">
          <Button variant="outline" onClick={onClose} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
