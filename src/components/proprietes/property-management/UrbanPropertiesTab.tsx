
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PropertyPurchaseDialog } from './dialogs/PropertyPurchaseDialog';
import { useUrbanPropertiesTab } from './urban/hooks/useUrbanPropertiesTab';
import { UrbanCatalogueSection } from './urban/catalogue/UrbanCatalogueSection';
import { OwnedUrbanPropertiesSection } from './urban/owned/OwnedUrbanPropertiesSection';

export const UrbanPropertiesTab: React.FC = () => {
  const {
    selectedBuildingType,
    setSelectedBuildingType,
    selectedBuildingId,
    setSelectedBuildingId,
    purchaseDialogOpen,
    setPurchaseDialogOpen,
    selectedBuildingDetails,
    filteredOwnedBuildings,
    handlePurchase,
    balance,
    toggleMaintenance,
    performMaintenance,
    sellBuilding,
    calculateBuildingValue,
    assignSlaves,
    availableSlaves
  } = useUrbanPropertiesTab();
  
  return (
    <div>
      <Tabs defaultValue="catalogue" className="space-y-4">
        <TabsList className="border border-rome-gold/30 bg-white">
          <TabsTrigger value="catalogue">Catalogue</TabsTrigger>
          <TabsTrigger value="owned">Mes Propriétés</TabsTrigger>
        </TabsList>
        
        {/* Catalogue de bâtiments */}
        <TabsContent value="catalogue">
          <UrbanCatalogueSection
            selectedBuildingType={selectedBuildingType}
            setSelectedBuildingType={setSelectedBuildingType}
            selectedBuildingId={selectedBuildingId}
            setSelectedBuildingId={setSelectedBuildingId}
            selectedBuildingDetails={selectedBuildingDetails}
            purchaseDialogOpen={purchaseDialogOpen}
            setPurchaseDialogOpen={setPurchaseDialogOpen}
          />
        </TabsContent>
        
        {/* Bâtiments possédés */}
        <TabsContent value="owned">
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
      </Tabs>
      
      {/* Dialogue d'achat */}
      {selectedBuildingDetails && selectedBuildingId && (
        <PropertyPurchaseDialog
          open={purchaseDialogOpen}
          onOpenChange={setPurchaseDialogOpen}
          building={selectedBuildingDetails}
          buildingId={selectedBuildingId}
          buildingType={
            selectedBuildingType === 'residential' ? 'urban' : 
            selectedBuildingType === 'religious' ? 'religious' : 'public'
          }
          onPurchase={handlePurchase}
          balance={balance}
        />
      )}
    </div>
  );
};
