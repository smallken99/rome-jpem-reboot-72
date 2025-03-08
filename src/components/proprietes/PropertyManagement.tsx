
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PropertyManagementHeader } from './property-management/PropertyManagementHeader';
import { MonetaryManagementTab } from './property-management/MonetaryManagementTab';
import { RuralPropertiesTab } from './property-management/RuralPropertiesTab';
import UrbanPropertiesTab from './property-management/UrbanPropertiesTab';
import { ProfitabilityTab } from './property-management/profitability/ProfitabilityTab';
import { SlaveManagementTab } from './property-management/SlaveManagementTab';
import { MaintenanceTab } from './property-management/MaintenanceTab';
import { RelatedFeatures, RelatedFeature } from '@/components/ui-custom/RelatedFeatures';
import { MapPin, Wallet, Archive, TrendingUp, Home, Wheat, Coins } from 'lucide-react';

const PropertyManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('urbain');
  
  // Fonctionnalités liées au patrimoine
  const relatedFeatures: RelatedFeature[] = [
    {
      title: "Carte des propriétés",
      description: "Visualisez vos propriétés sur une carte interactive de l'Empire",
      path: "/patrimoine/carte",
      icon: <MapPin className="h-5 w-5 text-rome-navy" />
    },
    {
      title: "Gestion économique",
      description: "Gérez vos finances, revenus et dépenses",
      path: "/patrimoine/economie",
      icon: <Wallet className="h-5 w-5 text-rome-navy" />
    },
    {
      title: "Gestion des stocks",
      description: "Gérez les ressources stockées dans vos propriétés",
      path: "/patrimoine/stockage",
      icon: <Archive className="h-5 w-5 text-rome-navy" />
    }
  ];
  
  return (
    <div className="space-y-6">
      <PropertyManagementHeader />
      
      <Tabs 
        defaultValue="urbain" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 md:grid-cols-7 w-full mb-8">
          <TabsTrigger value="urbain" className="text-xs md:text-sm">Propriétés urbaines</TabsTrigger>
          <TabsTrigger value="rural" className="text-xs md:text-sm">Propriétés rurales</TabsTrigger>
          <TabsTrigger value="esclaves" className="text-xs md:text-sm">Esclaves</TabsTrigger>
          <TabsTrigger value="monetaire" className="text-xs md:text-sm">Gestion monétaire</TabsTrigger>
          <TabsTrigger value="entretien" className="text-xs md:text-sm">Entretien</TabsTrigger>
          <TabsTrigger value="profitabilite" className="text-xs md:text-sm">Profitabilité</TabsTrigger>
          <TabsTrigger value="expansion" className="text-xs md:text-sm">Expansion</TabsTrigger>
        </TabsList>
        
        <TabsContent value="urbain">
          <UrbanPropertiesTab />
        </TabsContent>
        
        <TabsContent value="rural">
          <RuralPropertiesTab />
        </TabsContent>
        
        <TabsContent value="esclaves">
          <SlaveManagementTab />
        </TabsContent>
        
        <TabsContent value="monetaire">
          <MonetaryManagementTab />
        </TabsContent>
        
        <TabsContent value="entretien">
          <MaintenanceTab />
        </TabsContent>
        
        <TabsContent value="profitabilite">
          <ProfitabilityTab />
        </TabsContent>
        
        <TabsContent value="expansion">
          <div className="text-center py-12 text-muted-foreground italic">
            Module d'expansion en cours de développement
          </div>
        </TabsContent>
      </Tabs>
      
      <RelatedFeatures features={relatedFeatures} title="Autres aspects de la gestion patrimoniale" />
    </div>
  );
};

export default PropertyManagement;
