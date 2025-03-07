
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PropertyManagementHeader } from './property-management/PropertyManagementHeader';
import { UrbanPropertiesTab } from './property-management/UrbanPropertiesTab';
import { RuralPropertiesTab } from './property-management/RuralPropertiesTab';
import { MaintenanceTab } from './property-management/MaintenanceTab';
import { ProfitabilityTab } from './property-management/ProfitabilityTab';
import { SlaveManagementTab } from './property-management/SlaveManagementTab';

export const PropertyManagement: React.FC = () => {
  return (
    <RomanCard className="mb-6">
      <PropertyManagementHeader />
      <RomanCard.Content>
        <Tabs defaultValue="urbaines" className="mb-6">
          <TabsList className="w-full justify-start border border-rome-gold/30 bg-rome-parchment">
            <TabsTrigger value="urbaines" className="data-[state=active]:bg-white">Urbaines</TabsTrigger>
            <TabsTrigger value="rurales" className="data-[state=active]:bg-white">Rurales</TabsTrigger>
            <TabsTrigger value="esclaves" className="data-[state=active]:bg-white">Esclaves</TabsTrigger>
            <TabsTrigger value="entretien" className="data-[state=active]:bg-white">Entretien</TabsTrigger>
            <TabsTrigger value="revenus" className="data-[state=active]:bg-white">Rentabilité</TabsTrigger>
          </TabsList>
          
          <TabsContent value="urbaines" className="pt-4">
            <UrbanPropertiesTab />
          </TabsContent>
          
          <TabsContent value="rurales" className="pt-4">
            <RuralPropertiesTab />
          </TabsContent>
          
          <TabsContent value="esclaves" className="pt-4">
            <SlaveManagementTab />
          </TabsContent>
          
          <TabsContent value="entretien" className="pt-4">
            <MaintenanceTab />
          </TabsContent>
          
          <TabsContent value="revenus" className="pt-4">
            <ProfitabilityTab />
          </TabsContent>
        </Tabs>
      </RomanCard.Content>
    </RomanCard>
  );
};
