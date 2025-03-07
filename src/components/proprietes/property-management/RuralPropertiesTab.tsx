
import React, { useState } from 'react';
import { ruralProperties } from '../data/buildings';
import { RuralPropertySelector } from './rural/RuralPropertySelector';
import { RuralPropertyDetails } from './rural/RuralPropertyDetails';
import { BuildingDescription } from '../data/types/buildingTypes';
import { useBuildingManagement, OwnedBuilding } from '../hooks/useBuildingManagement';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { PropertyPurchaseDialog } from './dialogs/PropertyPurchaseDialog';
import { PropertyCard } from './PropertyCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export const RuralPropertiesTab: React.FC = () => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
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
  
  // Récupération des détails de la propriété sélectionnée
  const propertyDetails = selectedPropertyId ? ruralProperties[selectedPropertyId] || null : null;
  
  // Filtrer les propriétés rurales possédées
  const ownedRuralProperties = ownedBuildings.filter(building => building.buildingType === 'rural');
  
  // Fonction pour traiter l'achat
  const handlePurchase = (
    buildingId: string, 
    buildingType: 'urban' | 'rural' | 'religious' | 'public', 
    location: string, 
    customName?: string
  ) => {
    if (!propertyDetails) return false;
    
    return purchaseBuilding(propertyDetails, buildingId, buildingType, location, customName);
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
        
        {/* Catalogue de propriétés rurales */}
        <TabsContent value="catalogue">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <div className="border border-rome-gold/30 rounded-md p-4 bg-white">
                <RuralPropertySelector 
                  selectedId={selectedPropertyId}
                  onSelect={setSelectedPropertyId}
                />
              </div>
            </div>
            
            <div className="lg:col-span-3">
              {propertyDetails ? (
                <div className="border border-rome-gold/30 rounded-md p-6 bg-white">
                  <RuralPropertyDetails propertyDetails={propertyDetails} />
                  
                  {/* Remplacer le bouton existant */}
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
          
          {/* Dialogue d'achat */}
          {propertyDetails && selectedPropertyId && (
            <PropertyPurchaseDialog
              open={purchaseDialogOpen}
              onOpenChange={setPurchaseDialogOpen}
              building={propertyDetails}
              buildingId={selectedPropertyId}
              buildingType="rural"
              onPurchase={handlePurchase}
              balance={balance}
            />
          )}
        </TabsContent>
        
        {/* Propriétés rurales possédées */}
        <TabsContent value="owned">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-cinzel text-lg text-rome-navy">Mes Domaines Ruraux</h3>
              
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
            
            {ownedRuralProperties.length === 0 ? (
              <div className="bg-white border border-rome-gold/30 rounded-md p-8 text-center">
                <p className="text-muted-foreground">
                  Vous ne possédez pas encore de domaines ruraux.
                </p>
                <Button 
                  className="roman-btn mt-4"
                  onClick={() => setPurchaseDialogOpen(true)}
                >
                  <PlusCircle className="mr-1 h-4 w-4" />
                  Acquérir votre premier domaine
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ownedRuralProperties.map((building) => {
                  const buildingDetails = ruralProperties[building.buildingId] || null;
                  
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
