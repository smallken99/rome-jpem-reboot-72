
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RuralPropertySelector } from './rural/RuralPropertySelector';
import { RuralPropertyDetails } from './rural/RuralPropertyDetails';
import { useRuralPropertyCalculator } from './rural/hooks/useRuralPropertyCalculator';
import { OwnedRuralPropertiesSection } from './rural/owned/OwnedRuralPropertiesSection';
import { PropertyPurchaseDialog } from './dialogs/PropertyPurchaseDialog';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { Separator } from '@/components/ui/separator';
import { BuildingDescription } from '../data/types/buildingTypes';

export const RuralPropertiesTab = () => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');
  const [selectedProperty, setSelectedProperty] = useState<BuildingDescription | null>(null);
  const [propertySize, setPropertySize] = useState<string>('moyen');
  const [propertyLocation, setPropertyLocation] = useState<string>('campagne_latium');
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);

  const { 
    buildings, 
    getBuildingDetails,
    handleAddProperty,
    sellBuilding,
    calculateBuildingValue,
    calculateBuildingValueById 
  } = useRuralPropertyCalculator(selectedPropertyId);

  const { balance, availableSlaves, toggleMaintenance, performMaintenance, assignSlaves } = usePatrimoine();

  const handleSelectProperty = (id: string) => {
    setSelectedPropertyId(id);
    const propertyDetails = getBuildingDetails(id);
    setSelectedProperty(propertyDetails);
  };

  // This function wraps the async handleAddProperty to make it synchronous for the component
  const handleAddPropertySync = (
    buildingId: string,
    buildingType: "urban" | "rural" | "religious" | "public",
    location: string,
    customName?: string
  ): boolean => {
    handleAddProperty(buildingId, buildingType, location, customName);
    return true;
  };

  return (
    <Tabs defaultValue="owned" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="owned">Mes Propriétés</TabsTrigger>
        <TabsTrigger value="catalogue">Catalogue</TabsTrigger>
      </TabsList>
      
      <TabsContent value="owned" className="space-y-4 mt-4">
        <OwnedRuralPropertiesSection 
          filteredOwnedBuildings={buildings}
          setPurchaseDialogOpen={setPurchaseDialogOpen}
          balance={balance}
          availableSlaves={availableSlaves}
          toggleMaintenance={toggleMaintenance}
          performMaintenance={performMaintenance}
          assignSlaves={assignSlaves}
          sellBuilding={sellBuilding}
          calculateBuildingValue={calculateBuildingValue}
        />
      </TabsContent>
      
      <TabsContent value="catalogue" className="space-y-4 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <h3 className="font-cinzel text-lg text-rome-navy mb-4">Types de propriétés</h3>
            <RuralPropertySelector
              selectedId={selectedPropertyId}
              onSelect={handleSelectProperty}
              propertySize={propertySize}
              setPropertySize={setPropertySize}
              propertyLocation={propertyLocation}
              setPropertyLocation={setPropertyLocation}
            />
          </div>
          
          <div className="md:col-span-2">
            <h3 className="font-cinzel text-lg text-rome-navy mb-4">Détails de la propriété</h3>
            <RuralPropertyDetails propertyDetails={selectedProperty} />
          </div>
        </div>
      </TabsContent>
      
      <PropertyPurchaseDialog
        open={purchaseDialogOpen}
        onOpenChange={setPurchaseDialogOpen}
        propertyCategory="rural"
        handleAddProperty={handleAddPropertySync}
        balance={balance}
      />
    </Tabs>
  );
};
