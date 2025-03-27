
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, Plus, Coins, Home } from 'lucide-react';
import { useUrbanPropertiesTab } from './urban/hooks/useUrbanPropertiesTab';
import { formatCurrency } from '@/utils/formatters';
import { UrbanBuildingCard } from './urban/UrbanBuildingCard';
import { BuildingDetailsModal } from '../building-details/BuildingDetailsModal';
import { useUserProfile } from '@/hooks/useUserProfile';
import { BuildingDescription } from '@/components/proprietes/hooks/building/types';

const URBAN_BUILDING_TYPES = [
  {
    id: 'domus',
    name: 'Domus',
    description: 'Une maison de ville pour une famille patricienne',
    cost: 15000,
    maintenanceCost: 500,
    income: 0,
    prestige: 10,
    workers: {
      required: 2,
      optimal: 5,
      maxProfit: 0
    },
    slaves: {
      required: 3,
      optimal: 8,
      maxProfit: 0
    }
  },
  {
    id: 'insula',
    name: 'Insula',
    description: 'Un immeuble à appartements locatifs',
    cost: 25000,
    maintenanceCost: 1000,
    income: 2500,
    workers: {
      required: 1,
      optimal: 3,
      maxProfit: 0
    },
    slaves: {
      required: 2,
      optimal: 6,
      maxProfit: 0
    }
  },
  {
    id: 'taberna',
    name: 'Taberna',
    description: 'Une boutique ou atelier pour le commerce',
    cost: 10000,
    maintenanceCost: 400,
    income: 1500,
    workers: {
      required: 2,
      optimal: 5,
      maxProfit: 0
    },
    slaves: {
      required: 1,
      optimal: 3,
      maxProfit: 0
    }
  },
  {
    id: 'horreum',
    name: 'Horreum',
    description: 'Un entrepôt pour stocker des marchandises',
    cost: 20000,
    maintenanceCost: 800,
    income: 1200,
    workers: {
      required: 3,
      optimal: 8,
      maxProfit: 0
    },
    slaves: {
      required: 5,
      optimal: 12,
      maxProfit: 0
    }
  },
  {
    id: 'balnea',
    name: 'Balnea',
    description: 'Des bains privés',
    cost: 30000,
    maintenanceCost: 1500,
    income: 3000,
    prestige: 15,
    workers: {
      required: 4,
      optimal: 10,
      maxProfit: 0
    },
    slaves: {
      required: 8,
      optimal: 20,
      maxProfit: 0
    }
  }
];

export const UrbanPropertiesTab = () => {
  const { profile } = useUserProfile();
  const {
    urbanBuildings,
    isModalOpen,
    selectedBuilding,
    setIsModalOpen,
    handleBuildingSelect,
    handlePurchaseProperty,
    handleMaintenanceLevelChange,
    handleSecurityLevelChange,
    handleSellProperty,
    calculateMonthlyIncome,
    calculateMaintenanceCost,
  } = useUrbanPropertiesTab();

  const [urbanBuildingTypeFilter, setUrbanBuildingTypeFilter] = useState<string | null>(null);

  const filteredBuildings = urbanBuildingTypeFilter
    ? urbanBuildings.filter(building => building.buildingType === urbanBuildingTypeFilter)
    : urbanBuildings;

  const totalMonthlyIncome = urbanBuildings.reduce(
    (sum, building) => sum + (calculateMonthlyIncome(building) || 0),
    0
  );

  const totalMonthlyCost = urbanBuildings.reduce(
    (sum, building) => sum + (calculateMaintenanceCost(building) || 0),
    0
  );

  const netMonthlyIncome = totalMonthlyIncome - totalMonthlyCost;

  const handlePurchaseBuilding = (buildingDescription: BuildingDescription) => {
    handlePurchaseProperty({
      buildingId: buildingDescription.id,
      type: "urban",
      name: buildingDescription.name,
      location: "Rome",
      initialCost: buildingDescription.cost,
      maintenanceCost: buildingDescription.maintenanceCost,
      buildingType: buildingDescription.id
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Propriétés Urbaines
          </CardTitle>
          <CardDescription>
            Gérez vos propriétés dans la ville de Rome
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={urbanBuildingTypeFilter === null ? "default" : "outline"}
                size="sm"
                onClick={() => setUrbanBuildingTypeFilter(null)}
              >
                Tous
              </Button>
              {URBAN_BUILDING_TYPES.map((type) => (
                <Button
                  key={type.id}
                  variant={urbanBuildingTypeFilter === type.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUrbanBuildingTypeFilter(type.id)}
                >
                  {type.name}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm">
                <span className="text-muted-foreground">Balance: </span>
                <span className={netMonthlyIncome >= 0 ? "text-green-600" : "text-red-600"}>
                  {formatCurrency(netMonthlyIncome)} / mois
                </span>
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <Coins className="h-4 w-4" />
                <span>Percevoir les loyers</span>
              </Button>
            </div>
          </div>

          {filteredBuildings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBuildings.map((building) => (
                <UrbanBuildingCard
                  key={building.id}
                  building={building}
                  onSelect={() => handleBuildingSelect(building.id.toString())}
                  income={calculateMonthlyIncome(building)}
                  cost={calculateMaintenanceCost(building)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border border-dashed rounded-lg">
              <Home className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <h3 className="text-lg font-medium mb-1">Aucune propriété urbaine</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
                Vous ne possédez pas encore de propriétés urbaines. Achetez votre première propriété pour commencer à générer des revenus.
              </p>
            </div>
          )}

          <div className="mt-6">
            <h3 className="font-medium mb-3">Acheter une propriété</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {URBAN_BUILDING_TYPES.map((buildingType) => (
                <Card key={buildingType.id} className="overflow-hidden">
                  <CardHeader className="pb-2 pt-4">
                    <CardTitle className="text-base flex justify-between items-center">
                      {buildingType.name}
                      <Badge variant="outline">{formatCurrency(buildingType.cost)}</Badge>
                    </CardTitle>
                    <CardDescription className="text-xs">{buildingType.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4 pt-0">
                    <div className="text-sm mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Revenu mensuel:</span>
                        <span className="text-green-600">{formatCurrency(buildingType.income || 0)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Coût d'entretien:</span>
                        <span className="text-red-600">{formatCurrency(buildingType.maintenanceCost)}</span>
                      </div>
                    </div>
                    <Button
                      className="w-full text-xs"
                      size="sm"
                      onClick={() => handlePurchaseBuilding(buildingType as BuildingDescription)}
                      disabled={(profile?.wealth || 0) < buildingType.cost}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Acheter
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedBuilding && (
        <BuildingDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          building={selectedBuilding}
          onMaintenanceLevelChange={handleMaintenanceLevelChange}
          onSecurityLevelChange={handleSecurityLevelChange}
          onSell={handleSellProperty}
        />
      )}
    </div>
  );
};
