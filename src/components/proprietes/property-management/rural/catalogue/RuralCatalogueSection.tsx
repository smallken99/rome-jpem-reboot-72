
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BuildingDescription } from '../../../data/types/buildingTypes';

interface RuralCatalogueSectionProps {
  selectedBuildingId: string | null;
  setSelectedBuildingId: (id: string | null) => void;
  selectedBuildingDetails: BuildingDescription | null;
  purchaseDialogOpen: boolean;
  setPurchaseDialogOpen: (open: boolean) => void;
  propertySize: 'petit' | 'moyen' | 'grand';
  setPropertySize: (size: 'petit' | 'moyen' | 'grand') => void;
  propertyLocation: string;
  setPropertyLocation: (location: string) => void;
}

export const RuralCatalogueSection: React.FC<RuralCatalogueSectionProps> = ({
  selectedBuildingId,
  setSelectedBuildingId,
  selectedBuildingDetails,
  purchaseDialogOpen,
  setPurchaseDialogOpen,
  propertySize,
  setPropertySize,
  propertyLocation,
  setPropertyLocation
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <Tabs value={propertySize} onValueChange={(value) => {
          setPropertySize(value as 'petit' | 'moyen' | 'grand');
          setSelectedBuildingId(null);
        }}>
          <TabsList className="w-full justify-start border border-rome-gold/30 bg-white mb-4">
            <TabsTrigger value="petit">Petit</TabsTrigger>
            <TabsTrigger value="moyen">Moyen</TabsTrigger>
            <TabsTrigger value="grand">Grand</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="lg:col-span-3">
        {selectedBuildingDetails ? (
          <div className="border border-rome-gold/30 rounded-md p-6 bg-white relative">
            <div className="mt-6">
              <Button 
                className="roman-btn w-full sm:w-auto"
                onClick={() => setPurchaseDialogOpen(true)}
              >
                Lancer l'acquisition
              </Button>
            </div>
          </div>
        ) : (
          <div className="border border-rome-gold/30 rounded-md p-6 bg-white flex items-center justify-center min-h-[300px]">
            <div className="text-center text-muted-foreground">
              <p>Sélectionnez un type de domaine pour voir les détails</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
