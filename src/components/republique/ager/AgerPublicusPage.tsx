
import React from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { AgerStats } from './AgerStats';
import { AgerMap } from './AgerMap';
import { AgerAllocationTable } from './AgerAllocationTable';
import { PropertyPurchaseDialog } from '@/components/proprietes/property-management/dialogs/PropertyPurchaseDialog';
import { useAgerPublicus } from './hooks/useAgerPublicus';

export const AgerPublicusPage: React.FC = () => {
  const {
    selectedLandId,
    setSelectedLandId,
    allocationDialogOpen,
    setAllocationDialogOpen,
    landDetails,
    ownedLands,
    availableLands,
    balance,
    handleAllocation
  } = useAgerPublicus();

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Ager Publicus" 
        subtitle="Gestion et attribution des terres publiques de Rome" 
      />
      
      <AgerStats />
      
      <Tabs defaultValue="map" className="space-y-4">
        <TabsList className="border border-rome-gold/30 bg-white">
          <TabsTrigger value="map">Carte des Territoires</TabsTrigger>
          <TabsTrigger value="available">Terres Disponibles</TabsTrigger>
          <TabsTrigger value="allocated">Terres Attribuées</TabsTrigger>
        </TabsList>
        
        <TabsContent value="map">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Carte de l'Ager Publicus</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <AgerMap 
                selectedLandId={selectedLandId}
                setSelectedLandId={setSelectedLandId}
                availableLands={availableLands}
                ownedLands={ownedLands}
              />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="available">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Terres Disponibles pour Attribution</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <AgerAllocationTable 
                lands={availableLands}
                type="available"
                onSelect={setSelectedLandId}
                onOpenDialog={setAllocationDialogOpen}
              />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="allocated">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Terres Déjà Attribuées</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <AgerAllocationTable 
                lands={ownedLands}
                type="allocated"
                onSelect={setSelectedLandId}
                onOpenDialog={setAllocationDialogOpen}
              />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
      </Tabs>
      
      {landDetails && selectedLandId && (
        <PropertyPurchaseDialog
          open={allocationDialogOpen}
          onOpenChange={setAllocationDialogOpen}
          building={landDetails}
          buildingId={selectedLandId}
          buildingType="rural"
          onPurchase={handleAllocation}
          balance={balance}
        />
      )}
    </div>
  );
};
