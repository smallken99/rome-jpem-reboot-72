
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UrbanCatalogueSection } from './urban/catalogue/UrbanCatalogueSection';
import { OwnedUrbanPropertiesSection } from './urban/owned/OwnedUrbanPropertiesSection';
import { PropertyPurchaseDialog } from './dialogs/PropertyPurchaseDialog';
import { useBuildingInventory } from '../hooks/building/useBuildingInventory';
import { useBuildingSale } from '../hooks/building/useBuildingSale';
import { usePatrimoine } from '@/hooks/usePatrimoine';

export const UrbanPropertiesTab = () => {
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [selectedBuildingType, setSelectedBuildingType] = useState<'residential' | 'religious' | 'public' | 'military'>('residential');
  
  const { ownedBuildings, addBuilding } = useBuildingInventory();
  const { sellBuilding, calculateBuildingValue } = useBuildingSale();
  const { balance, availableSlaves, toggleMaintenance, performMaintenance, assignSlaves } = usePatrimoine();
  
  // Filtrer les bâtiments selon le type sélectionné
  const filteredOwnedBuildings = ownedBuildings.filter(building => {
    switch(selectedBuildingType) {
      case 'residential': return building.buildingType === 'urban';
      case 'religious': return building.buildingType === 'religious';
      case 'public': return building.buildingType === 'public';
      case 'military': return building.buildingType === 'military';
      default: return false;
    }
  });
  
  // Fonction pour gérer l'achat de propriété
  const handleAddProperty = (
    buildingId: string,
    buildingType: "urban" | "rural" | "religious" | "public",
    location: string,
    customName?: string
  ) => {
    return addBuilding({
      buildingId,
      type: buildingType,
      name: customName || buildingId,
      location,
    });
  };
  
  return (
    <Tabs defaultValue="owned" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="owned">Mes Propriétés</TabsTrigger>
        <TabsTrigger value="catalogue">Catalogue</TabsTrigger>
      </TabsList>
      
      <TabsContent value="owned" className="space-y-4 mt-4">
        <div className="flex justify-start mb-4">
          <TabsList className="inline-flex">
            <TabsTrigger 
              value="residential" 
              onClick={() => setSelectedBuildingType('residential')}
              className={selectedBuildingType === 'residential' ? 'data-[state=active]' : ''}
            >
              Résidentielles
            </TabsTrigger>
            <TabsTrigger 
              value="religious" 
              onClick={() => setSelectedBuildingType('religious')}
              className={selectedBuildingType === 'religious' ? 'data-[state=active]' : ''}
            >
              Religieuses
            </TabsTrigger>
            <TabsTrigger 
              value="public" 
              onClick={() => setSelectedBuildingType('public')}
              className={selectedBuildingType === 'public' ? 'data-[state=active]' : ''}
            >
              Publiques
            </TabsTrigger>
            <TabsTrigger 
              value="military" 
              onClick={() => setSelectedBuildingType('military')}
              className={selectedBuildingType === 'military' ? 'data-[state=active]' : ''}
            >
              Militaires
            </TabsTrigger>
          </TabsList>
        </div>
        
        <OwnedUrbanPropertiesSection
          selectedBuildingType={selectedBuildingType}
          filteredOwnedBuildings={filteredOwnedBuildings}
          balance={balance}
          availableSlaves={availableSlaves}
          setPurchaseDialogOpen={setPurchaseDialogOpen}
          toggleMaintenance={toggleMaintenance}
          performMaintenance={performMaintenance}
          assignSlaves={assignSlaves}
          sellBuilding={sellBuilding}
          calculateBuildingValue={calculateBuildingValue}
        />
      </TabsContent>
      
      <TabsContent value="catalogue" className="space-y-4 mt-4">
        <UrbanCatalogueSection 
          handleAddProperty={handleAddProperty} 
          balance={balance}
        />
      </TabsContent>
      
      <PropertyPurchaseDialog
        open={purchaseDialogOpen}
        onOpenChange={setPurchaseDialogOpen}
        propertyCategory={selectedBuildingType === 'residential' ? 'residential' : 
                          selectedBuildingType === 'religious' ? 'religious' : 
                          selectedBuildingType === 'public' ? 'public' : 'military'}
        handleAddProperty={handleAddProperty}
        balance={balance}
      />
    </Tabs>
  );
};
