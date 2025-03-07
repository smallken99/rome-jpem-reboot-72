
import React from 'react';
import { Button } from '@/components/ui/button';
import { RuralPropertySelector } from '../RuralPropertySelector';
import { RuralPropertyDetails } from '../RuralPropertyDetails';
import { BuildingDescription } from '../../../data/types/buildingTypes';
import { PlusCircle } from 'lucide-react';

interface RuralCatalogueSectionProps {
  selectedPropertyId: string | null;
  setSelectedPropertyId: (id: string | null) => void;
  propertyDetails: BuildingDescription | null;
  purchaseDialogOpen: boolean;
  setPurchaseDialogOpen: (open: boolean) => void;
  propertySize: string;
  setPropertySize: (size: string) => void;
  propertyLocation: string;
  setPropertyLocation: (location: string) => void;
}

export const RuralCatalogueSection: React.FC<RuralCatalogueSectionProps> = ({
  selectedPropertyId,
  setSelectedPropertyId,
  propertyDetails,
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
        <div className="border border-rome-gold/30 rounded-md p-4 bg-white">
          <RuralPropertySelector 
            selectedId={selectedPropertyId || ''}
            onSelect={setSelectedPropertyId}
            propertySize={propertySize}
            setPropertySize={setPropertySize}
            propertyLocation={propertyLocation}
            setPropertyLocation={setPropertyLocation}
          />
        </div>
      </div>
      
      <div className="lg:col-span-3">
        {propertyDetails ? (
          <div className="border border-rome-gold/30 rounded-md p-6 bg-white">
            <RuralPropertyDetails propertyDetails={propertyDetails} />
            
            <div className="mt-6">
              <Button 
                className="roman-btn w-full sm:w-auto"
                onClick={() => setPurchaseDialogOpen(true)}
              >
                Acquérir le domaine
              </Button>
            </div>
          </div>
        ) : (
          <div className="border border-rome-gold/30 rounded-md p-6 bg-white flex items-center justify-center min-h-[300px]">
            <div className="text-center text-muted-foreground">
              <p>Sélectionnez un domaine pour voir ses détails</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
