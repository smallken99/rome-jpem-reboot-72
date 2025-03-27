
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { formatCurrency } from '@/utils/currencyUtils';
import { Building, Home, MapPin, CreditCard, Info } from 'lucide-react';
import { PropertyType } from '@/types/proprietes';

interface BuildingOption {
  id: string;
  name: string;
  type: PropertyType;
  description: string;
  location: string;
  price: number;
  income: number;
  maintenance: number;
  features: string[];
}

interface BuildingPurchaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (building: BuildingOption) => void;
  playerBalance?: number;
}

const BUILDING_OPTIONS: BuildingOption[] = [
  {
    id: 'insula-1',
    name: 'Insula du Forum Romanum',
    type: 'insula',
    description: 'Un immeuble de rapport à étages multiples situé près du Forum, offrant un bon revenu locatif.',
    location: 'Rome - Quartier du Forum',
    price: 80000,
    income: 6500,
    maintenance: 2000,
    features: [
      'Près du Forum Romanum',
      '3 étages avec 12 appartements',
      'Boutiques au rez-de-chaussée',
      'Citerne et fontaine privée'
    ]
  },
  {
    id: 'insula-2',
    name: 'Insula de la Via Sacra',
    type: 'insula',
    description: 'Un grand immeuble bien situé sur la Via Sacra, avec une forte demande locative.',
    location: 'Rome - Via Sacra',
    price: 95000,
    income: 7800,
    maintenance: 2400,
    features: [
      'Emplacement prestigieux',
      '4 étages avec 16 appartements',
      'Boutiques de luxe au rez-de-chaussée',
      'Construction récente et solide'
    ]
  },
  {
    id: 'domus-1',
    name: 'Domus du Palatin',
    type: 'domus',
    description: 'Une élégante maison urbaine située sur la colline du Palatin, idéale pour une famille patricienne.',
    location: 'Rome - Colline du Palatin',
    price: 150000,
    income: 0,
    maintenance: 3500,
    features: [
      'Quartier patricien prestigieux',
      'Atrium avec impluvium',
      'Péristyle avec jardin intérieur',
      'Fresques et mosaïques de qualité',
      'Thermes privés'
    ]
  },
  {
    id: 'villa-1',
    name: 'Villa Rustica de Campanie',
    type: 'villa',
    description: 'Une villa productive située dans les fertiles plaines de Campanie, à quelques jours de Rome.',
    location: 'Campanie - Près de Capoue',
    price: 200000,
    income: 15000,
    maintenance: 5000,
    features: [
      'Domaine de 50 jugères (12.5 hectares)',
      'Vignobles et oliveraies',
      'Partie résidentielle luxueuse',
      'Bâtiments agricoles et pressoir',
      'Logements pour les esclaves agricoles'
    ]
  }
];

export const BuildingPurchaseDialog: React.FC<BuildingPurchaseDialogProps> = ({
  isOpen,
  onClose,
  onPurchase,
  playerBalance = 0
}) => {
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('insula');
  
  const handlePurchase = () => {
    const selectedBuilding = BUILDING_OPTIONS.find(b => b.id === selectedBuildingId);
    if (selectedBuilding) {
      onPurchase(selectedBuilding);
    }
  };
  
  const getBuildingsByType = (type: PropertyType) => {
    return BUILDING_OPTIONS.filter(building => building.type === type);
  };
  
  const getTypeIcon = (type: PropertyType) => {
    switch (type) {
      case 'insula':
        return <Building className="h-5 w-5 mr-2" />;
      case 'domus':
      case 'villa':
        return <Home className="h-5 w-5 mr-2" />;
      default:
        return null;
    }
  };

  const selectedBuilding = BUILDING_OPTIONS.find(b => b.id === selectedBuildingId);
  const canAfford = selectedBuilding ? playerBalance >= selectedBuilding.price : false;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Acquisition d'une propriété</DialogTitle>
          <DialogDescription>
            Investissez votre argent dans l'immobilier pour augmenter votre prestige et vos revenus
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="insula"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mt-2"
        >
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="insula">
              <Building className="h-4 w-4 mr-2" />
              Insulae
            </TabsTrigger>
            <TabsTrigger value="domus">
              <Home className="h-4 w-4 mr-2" />
              Domus
            </TabsTrigger>
            <TabsTrigger value="villa">
              <Home className="h-4 w-4 mr-2" />
              Villae
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 mb-2 text-sm text-muted-foreground">
            <p>
              {activeTab === 'insula' && "Les insulae sont des immeubles de rapport qui génèrent des revenus locatifs réguliers."}
              {activeTab === 'domus' && "Les domus sont des résidences urbaines luxueuses qui augmentent votre prestige à Rome."}
              {activeTab === 'villa' && "Les villae rusticae sont des domaines ruraux productifs qui génèrent d'importants revenus agricoles."}
            </p>
          </div>

          <TabsContent value="insula" className="space-y-4 pt-2">
            <RadioGroup value={selectedBuildingId} onValueChange={setSelectedBuildingId}>
              {getBuildingsByType('insula').map(building => (
                <div 
                  key={building.id} 
                  className={`border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors ${
                    selectedBuildingId === building.id ? 'border-primary bg-primary/5' : ''
                  }`}
                >
                  <RadioGroupItem value={building.id} id={building.id} className="sr-only" />
                  <Label htmlFor={building.id} className="cursor-pointer w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{building.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {building.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(building.price)}</div>
                        <div className="text-sm text-emerald-600">+{formatCurrency(building.income)}/an</div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{building.description}</p>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </TabsContent>

          <TabsContent value="domus" className="space-y-4 pt-2">
            <RadioGroup value={selectedBuildingId} onValueChange={setSelectedBuildingId}>
              {getBuildingsByType('domus').map(building => (
                <div 
                  key={building.id} 
                  className={`border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors ${
                    selectedBuildingId === building.id ? 'border-primary bg-primary/5' : ''
                  }`}
                >
                  <RadioGroupItem value={building.id} id={building.id} className="sr-only" />
                  <Label htmlFor={building.id} className="cursor-pointer w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{building.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {building.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(building.price)}</div>
                        <div className="text-sm text-rose-600">-{formatCurrency(building.maintenance)}/an</div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{building.description}</p>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </TabsContent>

          <TabsContent value="villa" className="space-y-4 pt-2">
            <RadioGroup value={selectedBuildingId} onValueChange={setSelectedBuildingId}>
              {getBuildingsByType('villa').map(building => (
                <div 
                  key={building.id} 
                  className={`border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors ${
                    selectedBuildingId === building.id ? 'border-primary bg-primary/5' : ''
                  }`}
                >
                  <RadioGroupItem value={building.id} id={building.id} className="sr-only" />
                  <Label htmlFor={building.id} className="cursor-pointer w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{building.name}</h3>
                        <p className="text-sm text-muted-foreground flex items-center mt-1">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          {building.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(building.price)}</div>
                        <div className="text-sm text-emerald-600">+{formatCurrency(building.income)}/an</div>
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{building.description}</p>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </TabsContent>
        </Tabs>

        {selectedBuilding && (
          <>
            <Separator className="my-4" />
            
            <div className="rounded-lg border bg-card p-4">
              <h3 className="font-medium mb-2 flex items-center">
                {getTypeIcon(selectedBuilding.type)}
                Détails de la propriété sélectionnée
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Caractéristiques</h4>
                  <ul className="text-sm space-y-1">
                    {selectedBuilding.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-1">Finances</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Prix d'achat:</span>
                      <span className="font-medium">{formatCurrency(selectedBuilding.price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenus annuels:</span>
                      <span className={selectedBuilding.income > 0 ? 'text-emerald-600' : ''}>
                        {selectedBuilding.income > 0 ? '+' : ''}{formatCurrency(selectedBuilding.income)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Coûts d'entretien:</span>
                      <span className="text-rose-600">-{formatCurrency(selectedBuilding.maintenance)}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t">
                      <span>Bilan annuel:</span>
                      <span className={selectedBuilding.income - selectedBuilding.maintenance > 0 ? 'text-emerald-600 font-medium' : 'text-rose-600 font-medium'}>
                        {selectedBuilding.income - selectedBuilding.maintenance > 0 ? '+' : ''}
                        {formatCurrency(selectedBuilding.income - selectedBuilding.maintenance)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <div className={`flex items-center ${!canAfford && selectedBuilding ? 'text-amber-600 bg-amber-50 p-2 rounded' : ''}`}>
          {!canAfford && selectedBuilding && (
            <>
              <Info className="h-4 w-4 mr-2" />
              <span className="text-sm">
                Vous n'avez pas assez d'argent. Il vous manque {formatCurrency(selectedBuilding.price - playerBalance)}.
              </span>
            </>
          )}
        </div>

        <DialogFooter className="flex items-center justify-between sm:justify-between">
          <div className="text-sm flex items-center">
            <CreditCard className="h-4 w-4 mr-2 text-primary" />
            <span>Votre trésorerie: <strong>{formatCurrency(playerBalance)}</strong></span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button 
              disabled={!selectedBuildingId || !canAfford} 
              onClick={handlePurchase}
            >
              Acheter la propriété
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BuildingPurchaseDialog;
