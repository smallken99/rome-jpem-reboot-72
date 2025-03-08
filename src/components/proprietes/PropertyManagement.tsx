
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PropertyManagementHeader } from './property-management/PropertyManagementHeader';
import { MonetaryManagementTab } from './property-management/MonetaryManagementTab';
import { RuralPropertiesTab } from './property-management/RuralPropertiesTab';
import UrbanPropertiesTab from './property-management/UrbanPropertiesTab';
import { ProfitabilityTab } from './property-management/profitability/ProfitabilityTab';
import { SlaveManagementTab } from './property-management/SlaveManagementTab';
import { MaintenanceTab } from './property-management/MaintenanceTab';

const PropertyManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('urbain');
  
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
    </div>
  );
};

export default PropertyManagement;
