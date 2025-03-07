
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { UrbanPropertySelector } from '../UrbanPropertySelector';
import { UrbanPropertyDetails } from '../UrbanPropertyDetails';
import { BuildingDescription } from '../../../data/types/buildingTypes';

interface UrbanCatalogueSectionProps {
  selectedBuildingType: 'residential' | 'religious' | 'public';
  setSelectedBuildingType: (value: 'residential' | 'religious' | 'public') => void;
  selectedBuildingId: string | null;
  setSelectedBuildingId: (id: string | null) => void;
  selectedBuildingDetails: BuildingDescription | null;
  purchaseDialogOpen: boolean;
  setPurchaseDialogOpen: (open: boolean) => void;
}

export const UrbanCatalogueSection: React.FC<UrbanCatalogueSectionProps> = ({
  selectedBuildingType,
  setSelectedBuildingType,
  selectedBuildingId,
  setSelectedBuildingId,
  selectedBuildingDetails,
  purchaseDialogOpen,
  setPurchaseDialogOpen
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <Tabs value={selectedBuildingType} onValueChange={(value) => {
          setSelectedBuildingType(value as 'residential' | 'religious' | 'public');
          setSelectedBuildingId(null);
        }}>
          <TabsList className="w-full justify-start border border-rome-gold/30 bg-white mb-4">
            <TabsTrigger value="residential">Résidences</TabsTrigger>
            <TabsTrigger value="religious">Religieux</TabsTrigger>
            <TabsTrigger value="public">Publics</TabsTrigger>
          </TabsList>
          
          <div className="border border-rome-gold/30 rounded-md p-4 bg-white">
            <UrbanPropertySelector 
              buildingType={selectedBuildingType}
              selectedId={selectedBuildingId || ''}
              onSelect={setSelectedBuildingId}
            />
          </div>
        </Tabs>
      </div>
      
      <div className="lg:col-span-3">
        {selectedBuildingDetails ? (
          <div className="border border-rome-gold/30 rounded-md p-6 bg-white relative">
            <UrbanPropertyDetails buildingDetails={selectedBuildingDetails} />
            
            <div className="mt-6">
              <Button 
                className="roman-btn w-full sm:w-auto"
                onClick={() => setPurchaseDialogOpen(true)}
              >
                Lancer la construction
              </Button>
            </div>
          </div>
        ) : (
          <div className="border border-rome-gold/30 rounded-md p-6 bg-white flex items-center justify-center min-h-[300px]">
            <div className="text-center text-muted-foreground">
              <p>Sélectionnez un bâtiment pour voir ses détails</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
