
import React, { useState } from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PropertyManagementHeader } from './property-management/PropertyManagementHeader';
import { UrbanPropertiesTab } from './property-management/UrbanPropertiesTab';
import { RuralPropertiesTab } from './property-management/RuralPropertiesTab';
import { MaintenanceTab } from './property-management/MaintenanceTab';
import { ProfitabilityTab } from './property-management/ProfitabilityTab';
import { SlaveManagementTab } from './property-management/SlaveManagementTab';
import { MonetaryManagementTab } from './property-management/MonetaryManagementTab';
import { useLocation, useNavigate } from 'react-router-dom';

export const PropertyManagement: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(() => {
    // Get tab from URL hash or default to 'urbaines'
    const hash = location.hash.replace('#', '');
    return hash || 'urbaines';
  });

  // Update URL hash when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`${location.pathname}#${value}`, { replace: true });
  };

  return (
    <RomanCard className="mb-6">
      <PropertyManagementHeader />
      <RomanCard.Content>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
          <TabsList className="w-full justify-start border border-rome-gold/30 bg-rome-parchment overflow-x-auto">
            <TabsTrigger value="urbaines" className="data-[state=active]:bg-white">Urbaines</TabsTrigger>
            <TabsTrigger value="rurales" className="data-[state=active]:bg-white">Rurales</TabsTrigger>
            <TabsTrigger value="esclaves" className="data-[state=active]:bg-white">Esclaves</TabsTrigger>
            <TabsTrigger value="monetaire" className="data-[state=active]:bg-white">Finances</TabsTrigger>
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
          
          <TabsContent value="monetaire" className="pt-4">
            <MonetaryManagementTab />
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
