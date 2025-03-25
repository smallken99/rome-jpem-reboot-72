
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useBuildingManagement } from "@/components/proprietes/hooks/useBuildingManagement";
import { Plus, Search, Building } from "lucide-react";
import { OwnedRuralPropertiesSection } from './rural/owned/OwnedRuralPropertiesSection';
import { BuildingPurchaseDialog } from './modals/BuildingPurchaseDialog';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { BaseBuildingDescription } from '@/types/buildings';
import { useBuildingPurchase } from '../hooks/building/useBuildingPurchase';
import { useOwnedBuildings } from '../hooks/building/useOwnedBuildings';
import { useSlaveAssignment } from '../hooks/building/useSlaveAssignment';

const ruralPropertyTypes = [
  {
    id: 'villa_rustica',
    name: 'Villa Rustica',
    type: 'rural',
    description: 'Une villa rurale de taille moyenne, idéale pour l\'agriculture et l\'élevage.',
    initialCost: 25000,
    maintenanceCost: 3000,
    prestige: 2,
    advantages: ['Production agricole', 'Revenus stables', 'Possibilité d\'expansion'],
    slaves: {
      required: 5,
      optimal: 15
    }
  },
  {
    id: 'latifundium',
    name: 'Latifundium',
    type: 'rural',
    description: 'Une grande exploitation agricole qui nécessite beaucoup d\'esclaves mais génère des revenus importants.',
    initialCost: 85000,
    maintenanceCost: 8000,
    prestige: 4,
    advantages: ['Revenus élevés', 'Production à grande échelle', 'Prestige important'],
    slaves: {
      required: 20,
      optimal: 50
    }
  }
];

export function RuralPropertiesTab() {
  const [activeTab, setActiveTab] = useState("owned");
  const [isPurchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState<BaseBuildingDescription | null>(null);
  
  const { balance } = usePatrimoine();
  const { purchaseBuilding } = useBuildingPurchase();
  const { 
    performMaintenance, 
    toggleMaintenanceStatus, 
    sellBuilding 
  } = useOwnedBuildings();
  const { assignSlavesToBuilding } = useSlaveAssignment();
  
  const handleOpenPurchaseDialog = (property: BaseBuildingDescription) => {
    setSelectedPropertyType(property);
    setPurchaseDialogOpen(true);
  };
  
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
          <OwnedRuralPropertiesSection />
        </TabsContent>
        
        <TabsContent value="available" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ruralPropertyTypes.map((property) => (
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
                  <Building className="mr-2 h-4 w-4" />
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
      />
    </div>
  );
}
