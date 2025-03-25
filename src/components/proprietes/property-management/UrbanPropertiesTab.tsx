
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Building2 } from "lucide-react";
import { OwnedUrbanPropertiesSection } from './urban/owned/OwnedUrbanPropertiesSection';
import { BuildingPurchaseDialog } from './modals/BuildingPurchaseDialog';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { BaseBuildingDescription } from '@/types/buildings';
import { useBuildingPurchase } from '../hooks/building/useBuildingPurchase';
import { useOwnedBuildings } from '../hooks/building/useOwnedBuildings';

const urbanPropertyTypes = [
  {
    id: 'domus',
    name: 'Domus',
    type: 'urban',
    description: 'Une maison patricienne de luxe, idéale pour une famille noble de Rome.',
    initialCost: 50000,
    maintenanceCost: 5000,
    prestige: 5,
    advantages: ['Prestige élevé', 'Confort luxueux', 'Position sociale avantageuse'],
    slaves: {
      required: 3,
      optimal: 10
    }
  },
  {
    id: 'insula',
    name: 'Insula',
    type: 'urban',
    description: 'Un immeuble de rapport à plusieurs étages avec des appartements à louer.',
    initialCost: 35000,
    maintenanceCost: 3500,
    prestige: 2,
    advantages: ['Revenus locatifs réguliers', 'Investissement rentable', 'Facile à gérer'],
    slaves: {
      required: 1,
      optimal: 5
    }
  },
  {
    id: 'taberna',
    name: 'Taberna',
    type: 'urban',
    description: 'Un local commercial situé au rez-de-chaussée qui peut servir de boutique ou d\'atelier.',
    initialCost: 20000,
    maintenanceCost: 2000,
    prestige: 1,
    advantages: ['Revenus commerciaux', 'Emplacement stratégique', 'Possibilité d\'expansion'],
    slaves: {
      required: 1,
      optimal: 3
    }
  }
];

export function UrbanPropertiesTab() {
  const [activeTab, setActiveTab] = useState("owned");
  const [isPurchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState<BaseBuildingDescription | null>(null);
  
  const { balance } = usePatrimoine();
  const { purchaseBuilding } = useBuildingPurchase();
  
  const handleOpenPurchaseDialog = (property: BaseBuildingDescription) => {
    setSelectedPropertyType(property);
    setPurchaseDialogOpen(true);
  };
  
  const locations = ['Rome - Palatin', 'Rome - Aventin', 'Rome - Forum', 'Rome - Via Sacra', 'Rome - Subure'];
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="owned">Mes propriétés</TabsTrigger>
            <TabsTrigger value="available">Acheter une propriété</TabsTrigger>
          </TabsList>
          
          {activeTab === "owned" && (
            <Button 
              onClick={() => setActiveTab("available")} 
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Nouvelle propriété
            </Button>
          )}
        </div>
        
        <TabsContent value="owned" className="space-y-6">
          <OwnedUrbanPropertiesSection />
        </TabsContent>
        
        <TabsContent value="available" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {urbanPropertyTypes.map((property) => (
              <div 
                key={property.id} 
                className="border rounded-lg p-6 hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => handleOpenPurchaseDialog(property)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-medium">{property.name}</h3>
                  <span className="font-bold">{property.initialCost.toLocaleString()} As</span>
                </div>
                
                <p className="text-muted-foreground mb-4">{property.description}</p>
                
                <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
                  <div>
                    <span className="text-muted-foreground">Entretien annuel:</span>
                    <span className="ml-2">{property.maintenanceCost.toLocaleString()} As</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Prestige:</span>
                    <span className="ml-2">+{property.prestige}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Esclaves requis:</span>
                    <span className="ml-2">{property.slaves.required}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Esclaves optimaux:</span>
                    <span className="ml-2">{property.slaves.optimal}</span>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenPurchaseDialog(property);
                  }}
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  Acheter cette propriété
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <BuildingPurchaseDialog
        building={selectedPropertyType}
        isOpen={isPurchaseDialogOpen}
        onClose={() => setPurchaseDialogOpen(false)}
        onPurchase={purchaseBuilding}
        balance={balance}
        locations={locations}
      />
    </div>
  );
}
