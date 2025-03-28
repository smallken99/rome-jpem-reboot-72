import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Building } from '@/types/proprietes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Building2, ShoppingBag } from 'lucide-react';
import BuildingDetailsModal from './building-details/BuildingDetailsModal';

interface UrbanPropertiesTabProps {
  urbanProperties: Building[];
  onBuildingCreate: (building: Building) => void;
  onBuildingUpgrade: (buildingId: string, upgradeId: string) => void;
}

export const UrbanPropertiesTab: React.FC<UrbanPropertiesTabProps> = ({
  urbanProperties,
  onBuildingCreate,
  onBuildingUpgrade
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  
  const handleOpenModal = (building: Building) => {
    setSelectedBuilding(building);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setSelectedBuilding(null);
    setIsModalOpen(false);
  };
  
  const handleUpgradeInstall = (buildingId: string, upgradeId: string) => {
    onBuildingUpgrade(buildingId, upgradeId);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Propriétés Urbaines</h2>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Acquérir une propriété
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {urbanProperties.map((building) => (
          <Card key={building.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="space-y-0.5">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                {building.name}
              </CardTitle>
              <CardDescription>
                {building.location} - Valeur: {building.value} as
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Type:</p>
                  <p className="text-sm text-muted-foreground">{building.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Condition:</p>
                  <p className="text-sm text-muted-foreground">{building.condition}%</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Revenu:</p>
                  <p className="text-sm text-muted-foreground">{building.maintenance} as/an</p>
                </div>
              </div>
              
              <Button 
                variant="secondary" 
                className="mt-4 w-full"
                onClick={() => handleOpenModal(building)}
              >
                Gérer la propriété
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {urbanProperties.length === 0 && (
        <div className="text-center py-12">
          <ShoppingBag className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground">
            Aucune propriété urbaine acquise pour le moment.
          </p>
        </div>
      )}
      
      {selectedBuilding && (
        <BuildingDetailsModal
          building={selectedBuilding}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpgradeInstall={handleUpgradeInstall}
        />
      )}
    </div>
  );
};
