
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Trees, TriangleAlert, Users, Wallet } from 'lucide-react';
import { UrbanPropertiesTab } from './property-management/UrbanPropertiesTab';
import { RuralPropertiesTab } from './property-management/RuralPropertiesTab';
import { SlaveManagementTab } from './property-management/SlaveManagementTab';
import { MaintenanceTab } from './property-management/MaintenanceTab';
import { MonetaryManagementTab } from './property-management/MonetaryManagementTab';

export const PropertyManagement: React.FC = () => {
  return (
    <Tabs defaultValue="urban" className="w-full space-y-4">
      <TabsList>
        <TabsTrigger value="urban">
          <Building className="mr-2 h-4 w-4" />
          Propriétés Urbaines
        </TabsTrigger>
        <TabsTrigger value="rural">
          <Trees className="mr-2 h-4 w-4" />
          Domaines Ruraux
        </TabsTrigger>
        <TabsTrigger value="slaves">
          <Users className="mr-2 h-4 w-4" />
          Gestion des Esclaves
        </TabsTrigger>
        <TabsTrigger value="maintenance">
          <TriangleAlert className="mr-2 h-4 w-4" />
          Maintenance
        </TabsTrigger>
        <TabsTrigger value="monetary">
          <Wallet className="mr-2 h-4 w-4" />
          Gestion Monétaire
        </TabsTrigger>
      </TabsList>
      <TabsContent value="urban">
        <UrbanPropertiesTab />
      </TabsContent>
      <TabsContent value="rural">
        <RuralPropertiesTab />
      </TabsContent>
      <TabsContent value="slaves">
        <SlaveManagementTab />
      </TabsContent>
      <TabsContent value="maintenance">
        <MaintenanceTab />
      </TabsContent>
      <TabsContent value="monetary">
        <MonetaryManagementTab />
      </TabsContent>
    </Tabs>
  );
};
