
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Building, Plus } from 'lucide-react';
import PropertyCard from './PropertyCard';
import BuildingDetailsModal from './building-details/BuildingDetailsModal';
import BuildingPurchaseDialog from './urban/BuildingPurchaseDialog';
import { Property } from '@/types/proprietes';
import { toast } from '@/components/ui-custom/toast';

interface UrbanPropertiesTabProps {
  properties: Property[];
  onPurchaseProperty?: (property: Property) => void;
  onRepairProperty?: (property: Property) => void;
  onUpgradeProperty?: (property: Property, upgrade: string) => void;
  balance?: number;
}

export const UrbanPropertiesTab: React.FC<UrbanPropertiesTabProps> = ({
  properties,
  onPurchaseProperty,
  onRepairProperty,
  onUpgradeProperty,
  balance = 0
}) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  
  // Filter urban properties (domus and insulae)
  const urbanProperties = properties.filter(
    p => p.type === 'domus' || p.type === 'insula'
  );
  
  const handleOpenPurchaseDialog = () => {
    setPurchaseDialogOpen(true);
  };
  
  const handlePurchaseProperty = (buildingOption: any) => {
    if (onPurchaseProperty) {
      const newProperty: Property = {
        id: buildingOption.id,
        name: buildingOption.name,
        type: buildingOption.type,
        location: buildingOption.location,
        value: buildingOption.price,
        income: buildingOption.income,
        maintenance: buildingOption.maintenance,
        condition: 100, // New building is in perfect condition
        acquired: new Date().toISOString()
      };
      
      onPurchaseProperty(newProperty);
      toast.success("Propriété acquise avec succès");
      setPurchaseDialogOpen(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Propriétés urbaines</h2>
        <Button onClick={handleOpenPurchaseDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Acquérir une propriété
        </Button>
      </div>
      
      {urbanProperties.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Building className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <p className="mt-4">Vous ne possédez pas encore de propriétés urbaines.</p>
          <Button variant="outline" className="mt-4" onClick={handleOpenPurchaseDialog}>
            Acheter votre première propriété
          </Button>
        </div>
      ) : (
        <ScrollArea className="h-[500px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {urbanProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={(property) => {
                  setSelectedProperty(property);
                  setDetailsModalOpen(true);
                }}
                isSelected={selectedProperty?.id === property.id}
              />
            ))}
          </div>
        </ScrollArea>
      )}
      
      {/* Property Details Modal */}
      <BuildingDetailsModal
        property={selectedProperty}
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        onRepair={onRepairProperty}
        onUpgrade={onUpgradeProperty}
      />
      
      {/* Building Purchase Dialog */}
      <BuildingPurchaseDialog
        isOpen={purchaseDialogOpen}
        onClose={() => setPurchaseDialogOpen(false)}
        onPurchase={handlePurchaseProperty}
        playerBalance={balance}
      />
    </div>
  );
};

export default UrbanPropertiesTab;
