
import React, { useState, useEffect } from 'react';
import { urbanResidentialBuildings, religiousBuildings, publicBuildings } from '../data/buildings';
import { UrbanPropertySelector } from './urban/UrbanPropertySelector';
import { UrbanPropertyDetails } from './urban/UrbanPropertyDetails';
import { BuildingDescription } from '../data/types/buildingTypes';
import { useBuildingManagement, OwnedBuilding } from '../hooks/useBuildingManagement';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { PropertyPurchaseDialog } from './dialogs/PropertyPurchaseDialog';
import { PropertyCard } from './PropertyCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export const UrbanPropertiesTab: React.FC = () => {
  const [selectedBuildingType, setSelectedBuildingType] = useState<'residential' | 'religious' | 'public'>('residential');
  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  
  const { 
    ownedBuildings, 
    purchaseBuilding, 
    sellBuilding, 
    toggleMaintenance, 
    performMaintenance, 
    calculateBuildingValue,
    assignSlaves 
  } = useBuildingManagement();
  
  const { balance } = usePatrimoine();
  
  // Récupération des données du bâtiment sélectionné
  const getBuildingDetails = (): BuildingDescription | null => {
    if (!selectedBuildingId) return null;
    
    switch (selectedBuildingType) {
      case 'residential':
        return urbanResidentialBuildings[selectedBuildingId] || null;
      case 'religious':
        return religiousBuildings[selectedBuildingId] || null;
      case 'public':
        return publicBuildings[selectedBuildingId] || null;
      default:
        return null;
    }
  };
  
  const selectedBuildingDetails = getBuildingDetails();
  
  // Filtrer les bâtiments possédés selon le type
  const filteredOwnedBuildings = ownedBuildings.filter(building => {
    switch (selectedBuildingType) {
      case 'residential':
        return building.buildingType === 'urban';
      case 'religious':
        return building.buildingType === 'religious';
      case 'public':
        return building.buildingType === 'public';
      default:
        return false;
    }
  });
  
  // Fonction pour traiter l'achat
  const handlePurchase = (
    buildingId: string, 
    buildingType: 'urban' | 'rural' | 'religious' | 'public', 
    location: string, 
    customName?: string
  ) => {
    const buildingDetails = getBuildingDetails();
    
    if (!buildingDetails) return false;
    
    return purchaseBuilding(buildingDetails, buildingId, buildingType, location, customName);
  };
  
  // Nombre total d'esclaves disponibles
  const totalAssignedSlaves = ownedBuildings.reduce((sum, building) => sum + building.slaves, 0);
  const totalSlaves = 25; // Simulé - à remplacer par la source réelle
  const availableSlaves = totalSlaves - totalAssignedSlaves;
  
  return (
    <div>
      <Tabs defaultValue="catalogue" className="space-y-4">
        <TabsList className="border border-rome-gold/30 bg-white">
          <TabsTrigger value="catalogue">Catalogue</TabsTrigger>
          <TabsTrigger value="owned">Mes Propriétés</TabsTrigger>
        </TabsList>
        
        {/* Catalogue de bâtiments */}
        <TabsContent value="catalogue">
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
                    selectedId={selectedBuildingId}
                    onSelect={setSelectedBuildingId}
                  />
                </div>
              </Tabs>
            </div>
            
            <div className="lg:col-span-3">
              {selectedBuildingDetails ? (
                <div className="border border-rome-gold/30 rounded-md p-6 bg-white relative">
                  <UrbanPropertyDetails buildingDetails={selectedBuildingDetails} />
                  
                  {/* Remplacer le bouton existant */}
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
        </TabsContent>
        
        {/* Bâtiments possédés */}
        <TabsContent value="owned">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-cinzel text-lg text-rome-navy">
                Mes Propriétés {selectedBuildingType === 'residential' ? 'Résidentielles' : 
                               selectedBuildingType === 'religious' ? 'Religieuses' : 'Publiques'}
              </h3>
              
              <Button
                variant="outline"
                size="sm"
                className="roman-btn-outline"
                onClick={() => setPurchaseDialogOpen(true)}
              >
                <PlusCircle className="mr-1 h-4 w-4" />
                Nouvelle acquisition
              </Button>
            </div>
            
            {filteredOwnedBuildings.length === 0 ? (
              <div className="bg-white border border-rome-gold/30 rounded-md p-8 text-center">
                <p className="text-muted-foreground">
                  Vous ne possédez pas encore de propriétés de ce type.
                </p>
                <Button 
                  className="roman-btn mt-4"
                  onClick={() => setPurchaseDialogOpen(true)}
                >
                  <PlusCircle className="mr-1 h-4 w-4" />
                  Acquérir votre première propriété
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredOwnedBuildings.map((building) => {
                  // Déterminer le type de bâtiment pour obtenir les détails
                  let buildingDetails: BuildingDescription | null = null;
                  
                  if (building.buildingType === 'urban') {
                    buildingDetails = urbanResidentialBuildings[building.buildingId] || null;
                  } else if (building.buildingType === 'religious') {
                    buildingDetails = religiousBuildings[building.buildingId] || null;
                  } else if (building.buildingType === 'public') {
                    buildingDetails = publicBuildings[building.buildingId] || null;
                  }
                  
                  return (
                    <PropertyCard
                      key={building.id}
                      building={building}
                      buildingDetails={buildingDetails}
                      onToggleMaintenance={toggleMaintenance}
                      onPerformMaintenance={performMaintenance}
                      onAssignSlaves={assignSlaves}
                      onSell={sellBuilding}
                      balance={balance}
                      totalAvailableSlaves={availableSlaves + building.slaves}
                      buildingValue={calculateBuildingValue(building.id)}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
