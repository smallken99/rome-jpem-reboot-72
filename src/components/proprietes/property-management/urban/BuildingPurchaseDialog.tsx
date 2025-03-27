
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Building, Home, Buildings, Store, MapPin, Coins, Info } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface BuildingPurchaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (buildingType: string, cost: number) => void;
  availableFunds: number;
}

type UrbanBuildingOption = {
  id: string;
  type: string;
  name: string;
  baseCost: number;
  monthlyIncome: number;
  maintenanceCost: number;
  description: string;
};

const URBAN_BUILDING_OPTIONS: UrbanBuildingOption[] = [
  {
    id: 'domus',
    type: 'domus',
    name: 'Domus',
    baseCost: 120000,
    monthlyIncome: 0,
    maintenanceCost: 2000,
    description: 'Maison patricienne pour une famille romaine. Prestigieuse mais coûteuse à entretenir.'
  },
  {
    id: 'insula',
    type: 'insula',
    name: 'Insula',
    baseCost: 80000,
    monthlyIncome: 3000,
    maintenanceCost: 1500,
    description: 'Immeuble d\'habitation locative pour la plèbe urbaine. Génère des revenus réguliers.'
  },
  {
    id: 'taberna',
    type: 'taberna',
    name: 'Taberna',
    baseCost: 50000,
    monthlyIncome: 2000,
    maintenanceCost: 800,
    description: 'Boutique ou taverne. Un investissement commercial rentable mais risqué.'
  }
];

export const BuildingPurchaseDialog: React.FC<BuildingPurchaseDialogProps> = ({
  isOpen,
  onClose,
  onPurchase,
  availableFunds
}) => {
  const [activeTab, setActiveTab] = useState('urban');
  const [selectedBuildingId, setSelectedBuildingId] = useState('');
  const [buildingName, setBuildingName] = useState('');
  const [buildingLocation, setBuildingLocation] = useState('Rome');
  
  const selectedBuilding = URBAN_BUILDING_OPTIONS.find(b => b.id === selectedBuildingId);
  
  const canAfford = selectedBuilding ? availableFunds >= selectedBuilding.baseCost : false;
  
  const handlePurchase = () => {
    if (!selectedBuilding || !buildingName || !buildingLocation) return;
    
    onPurchase(selectedBuilding.type, selectedBuilding.baseCost);
  };
  
  const handleBuildingSelect = (buildingId: string) => {
    setSelectedBuildingId(buildingId);
    const building = URBAN_BUILDING_OPTIONS.find(b => b.id === buildingId);
    if (building) {
      setBuildingName(`${building.name} sur ${buildingLocation}`);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Building className="h-5 w-5" />
            Acquérir une nouvelle propriété
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="urban">Propriétés Urbaines</TabsTrigger>
            <TabsTrigger value="rural">Propriétés Rurales</TabsTrigger>
          </TabsList>
          
          <TabsContent value="urban" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {URBAN_BUILDING_OPTIONS.map(option => (
                  <Card 
                    key={option.id}
                    className={`cursor-pointer transition-colors ${selectedBuildingId === option.id ? 'border-primary' : ''}`}
                    onClick={() => handleBuildingSelect(option.id)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {option.type === 'domus' && <Home className="h-4 w-4" />}
                        {option.type === 'insula' && <Buildings className="h-4 w-4" />}
                        {option.type === 'taberna' && <Store className="h-4 w-4" />}
                        {option.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Coût:</span>
                          <div className="font-medium">{formatCurrency(option.baseCost)}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Revenu:</span>
                          <div className="font-medium text-green-600">{formatCurrency(option.monthlyIncome)}/mois</div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <RadioGroup value={selectedBuildingId} className="flex">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={option.id} id={option.id} />
                          <Label htmlFor={option.id}>Sélectionner</Label>
                        </div>
                      </RadioGroup>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {selectedBuilding && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Détails de l'acquisition</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="building-name">Nom de la propriété</Label>
                        <Input 
                          id="building-name" 
                          value={buildingName}
                          onChange={(e) => setBuildingName(e.target.value)}
                          placeholder="Domus du Palatin"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="building-location">Emplacement</Label>
                        <Input 
                          id="building-location" 
                          value={buildingLocation}
                          onChange={(e) => setBuildingLocation(e.target.value)}
                          placeholder="Rome"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-800 rounded-md">
                      <Info className="h-5 w-5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Détails de l'investissement:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Coût initial: {formatCurrency(selectedBuilding.baseCost)}</li>
                          <li>Revenu mensuel estimé: {formatCurrency(selectedBuilding.monthlyIncome)}</li>
                          <li>Coût d'entretien mensuel: {formatCurrency(selectedBuilding.maintenanceCost)}</li>
                          <li>Profit net mensuel: {formatCurrency(selectedBuilding.monthlyIncome - selectedBuilding.maintenanceCost)}</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center gap-2">
                        <Coins className="h-5 w-5" />
                        <span>Fonds disponibles: {formatCurrency(availableFunds)}</span>
                      </div>
                      
                      {!canAfford && (
                        <div className="text-sm text-red-600">
                          Fonds insuffisants pour cette acquisition
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="rural">
            <Card className="border-dashed">
              <CardContent className="pt-6">
                <UnderDevelopmentSection 
                  title="Propriétés Rurales" 
                  description="L'achat de propriétés rurales sera disponible prochainement."
                  features={[
                    "Achat de villas rusticae, fermes et domaines agricoles",
                    "Production de denrées et de matières premières",
                    "Gestion des cultures et de l'élevage",
                    "Recrutement et gestion des travailleurs agricoles"
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            onClick={handlePurchase}
            disabled={!selectedBuilding || !buildingName || !buildingLocation || !canAfford}
          >
            Acheter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
