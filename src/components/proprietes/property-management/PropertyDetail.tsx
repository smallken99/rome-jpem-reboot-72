
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { useBuildingInventory } from '../hooks/building/useBuildingInventory';
import { useBuildingMaintenance } from '../hooks/building/useBuildingMaintenance';
import { useBuildingSale } from '../hooks/building/useBuildingSale';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RelatedFeatures } from '@/components/ui-custom/RelatedFeatures';
import { 
  Building, 
  Users, 
  Coins, 
  Hammer, 
  ArrowLeft, 
  Map, 
  TrendingUp, 
  Package, 
  Clock 
} from 'lucide-react';
import { OwnedBuilding } from '../hooks/building/types';
import { formatMoney } from '@/utils/formatUtils';

export const PropertyDetail: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const navigate = useNavigate();
  
  const { ownedBuildings } = useBuildingInventory();
  const { performMaintenance, toggleMaintenance } = useBuildingMaintenance();
  const { calculateBuildingValue, sellBuilding } = useBuildingSale();
  
  // Trouver la propriété dans la liste
  const property = ownedBuildings.find(b => b.id === Number(propertyId));
  
  if (!property) {
    return (
      <RomanCard>
        <RomanCard.Content>
          <div className="text-center py-8">
            <h2 className="text-lg font-semibold">Propriété non trouvée</h2>
            <p className="text-muted-foreground mt-2">La propriété demandée n'existe pas ou a été vendue.</p>
            <Button 
              className="roman-btn mt-4"
              onClick={() => navigate('/patrimoine/proprietes')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux propriétés
            </Button>
          </div>
        </RomanCard.Content>
      </RomanCard>
    );
  }
  
  const buildingValue = calculateBuildingValue(property);
  
  const getConditionColor = (condition: number) => {
    if (condition >= 80) return 'bg-green-500';
    if (condition >= 50) return 'bg-yellow-500';
    if (condition >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  const handleMaintenance = () => {
    performMaintenance(property.id);
  };
  
  const handleToggleMaintenance = () => {
    toggleMaintenance(property.id, !property.maintenanceEnabled);
  };
  
  const handleSell = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir vendre cette propriété pour ${formatMoney(buildingValue)} ?`)) {
      sellBuilding(property.id);
      navigate('/patrimoine/proprietes');
    }
  };
  
  const relatedFeatures = [
    {
      title: "Carte des propriétés",
      description: "Localisez cette propriété sur la carte",
      path: "/patrimoine/carte",
      icon: <Map className="h-5 w-5 text-rome-navy" />
    },
    {
      title: "Analyses de rentabilité",
      description: "Évaluez la rentabilité de cette propriété",
      path: "/patrimoine/proprietes?tab=profitabilite",
      icon: <TrendingUp className="h-5 w-5 text-rome-navy" />
    },
    {
      title: "Gestion des stocks",
      description: "Gérez les ressources stockées dans cette propriété",
      path: "/patrimoine/stockage",
      icon: <Package className="h-5 w-5 text-rome-navy" />
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/patrimoine/proprietes')}
          className="mr-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        <h1 className="text-2xl font-cinzel">{property.name}</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel">Informations générales</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Localisation</h3>
                  <p className="text-lg mt-1">{property.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
                  <p className="text-lg mt-1 capitalize">{property.buildingType}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Date d'acquisition</h3>
                  <p className="text-lg mt-1">{property.purchaseDate.toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Valeur actuelle</h3>
                  <p className="text-lg mt-1">{formatMoney(buildingValue)}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">État</h3>
                <Progress 
                  value={property.condition} 
                  className={`h-2 ${getConditionColor(property.condition)}`}
                />
                <div className="flex justify-between text-sm mt-1">
                  <span>{property.condition}%</span>
                  <span>Coût d'entretien: {formatMoney(property.maintenanceCost)}/an</span>
                </div>
              </div>
            </RomanCard.Content>
            <RomanCard.Footer>
              <div className="flex flex-wrap gap-3">
                <Button 
                  className="roman-btn"
                  onClick={handleMaintenance}
                  disabled={property.condition >= 100}
                >
                  <Hammer className="mr-2 h-4 w-4" />
                  Effectuer l'entretien
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleToggleMaintenance}
                >
                  {property.maintenanceEnabled ? "Désactiver" : "Activer"} l'entretien automatique
                </Button>
                <Button 
                  variant="destructive"
                  onClick={handleSell}
                  className="ml-auto"
                >
                  Vendre ({formatMoney(buildingValue)})
                </Button>
              </div>
            </RomanCard.Footer>
          </RomanCard>
          
          <Tabs defaultValue="employes" className="mt-6">
            <TabsList>
              <TabsTrigger value="employes">Esclaves & Employés</TabsTrigger>
              <TabsTrigger value="rendement">Rendement</TabsTrigger>
              <TabsTrigger value="historique">Historique</TabsTrigger>
            </TabsList>
            <TabsContent value="employes">
              <RomanCard>
                <RomanCard.Content>
                  <div className="flex items-center gap-4 p-4 bg-muted/20 rounded-md">
                    <Users className="h-8 w-8 text-rome-navy" />
                    <div>
                      <h3 className="font-medium">Esclaves assignés</h3>
                      <p className="text-2xl font-cinzel mt-1">{property.slaves}</p>
                    </div>
                  </div>
                </RomanCard.Content>
                <RomanCard.Actions className="px-4">
                  <Button variant="outline">
                    Assigner des esclaves
                  </Button>
                  <Button variant="outline">
                    Gérer les superviseurs
                  </Button>
                </RomanCard.Actions>
              </RomanCard>
            </TabsContent>
            <TabsContent value="rendement">
              <RomanCard>
                <RomanCard.Content>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-muted/20 rounded-md">
                      <Coins className="h-8 w-8 text-rome-navy" />
                      <div>
                        <h3 className="font-medium">Revenu mensuel</h3>
                        <p className="text-2xl font-cinzel mt-1">{formatMoney(property.maintenanceCost * 1.5)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-muted/20 rounded-md">
                      <TrendingUp className="h-8 w-8 text-rome-navy" />
                      <div>
                        <h3 className="font-medium">Rentabilité</h3>
                        <p className="text-2xl font-cinzel mt-1">+35%</p>
                      </div>
                    </div>
                  </div>
                </RomanCard.Content>
              </RomanCard>
            </TabsContent>
            <TabsContent value="historique">
              <RomanCard>
                <RomanCard.Content>
                  <div className="flex items-center gap-4 p-4 bg-muted/20 rounded-md">
                    <Clock className="h-8 w-8 text-rome-navy" />
                    <div>
                      <h3 className="font-medium">Dernier entretien</h3>
                      <p className="text-lg mt-1">Il y a 3 mois</p>
                    </div>
                  </div>
                </RomanCard.Content>
              </RomanCard>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel">Actions rapides</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <div className="space-y-3">
                <Button className="w-full roman-btn justify-start">
                  <Building className="mr-2 h-4 w-4" />
                  Améliorer la propriété
                </Button>
                <Button className="w-full roman-btn-outline justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Gérer le personnel
                </Button>
                <Button className="w-full roman-btn-outline justify-start" variant="outline">
                  <Coins className="mr-2 h-4 w-4" />
                  Ajuster les revenus
                </Button>
                <Button className="w-full roman-btn-outline justify-start" variant="outline">
                  <Package className="mr-2 h-4 w-4" />
                  Gérer les ressources
                </Button>
              </div>
            </RomanCard.Content>
          </RomanCard>
          
          <div className="mt-6">
            <RelatedFeatures features={relatedFeatures} title="Gestion avancée" />
          </div>
        </div>
      </div>
    </div>
  );
};
