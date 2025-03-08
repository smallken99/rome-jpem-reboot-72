import React, { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import PropertyManagementHeader from './property-management/PropertyManagementHeader';
import { RuralPropertiesTab } from './property-management/RuralPropertiesTab';
// Fix import by importing default export
import UrbanPropertiesTab from './property-management/UrbanPropertiesTab';
import { MonetaryManagementTab } from './property-management/MonetaryManagementTab';
import { MaintenanceTab } from './property-management/MaintenanceTab';
import { SlaveManagementTab } from './property-management/SlaveManagementTab';
import { ProfitabilityTab } from './property-management/profitability/ProfitabilityTab';

const PropertyManagement = () => {
  const [activeTab, setActiveTab] = useState("urban");

  return (
    <div className="property-management">
      <PropertyManagementHeader />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <div className="overflow-x-auto">
          <div className="w-full flex items-center justify-start space-x-4 py-2 border-b">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground ${activeTab === 'urban' ? 'bg-secondary text-secondary-foreground' : 'hover:bg-muted'}`}
              onClick={() => setActiveTab("urban")}
            >
              Propriétés Urbaines
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground ${activeTab === 'rural' ? 'bg-secondary text-secondary-foreground' : 'hover:bg-muted'}`}
              onClick={() => setActiveTab("rural")}
            >
              Propriétés Rurales
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground ${activeTab === 'monetary' ? 'bg-secondary text-secondary-foreground' : 'hover:bg-muted'}`}
              onClick={() => setActiveTab("monetary")}
            >
              Gestion Monétaire
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground ${activeTab === 'maintenance' ? 'bg-secondary text-secondary-foreground' : 'hover:bg-muted'}`}
              onClick={() => setActiveTab("maintenance")}
            >
              Maintenance
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground ${activeTab === 'slaves' ? 'bg-secondary text-secondary-foreground' : 'hover:bg-muted'}`}
              onClick={() => setActiveTab("slaves")}
            >
              Esclaves
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground ${activeTab === 'profitability' ? 'bg-secondary text-secondary-foreground' : 'hover:bg-muted'}`}
              onClick={() => setActiveTab("profitability")}
            >
              Rentabilité
            </button>
          </div>
        </div>

        <UrbanPropertiesTab />
        <RuralPropertiesTab />
        <MonetaryManagementTab />
        <MaintenanceTab />
        <SlaveManagementTab />
        <ProfitabilityTab />
      </Tabs>
    </div>
  );
};

export default PropertyManagement;
