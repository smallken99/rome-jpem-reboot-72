
import React from 'react';
import { PropertyHeader } from './components/PropertyHeader';
import { InventoryTabs } from './components/InventoryTabs';
import { PropertyNotFound } from './components/PropertyNotFound';
import { useInventoryData } from './hooks/useInventoryData';

export const PropertyInventory: React.FC = () => {
  const {
    propertyId,
    property,
    resources,
    resourceTypes,
    transactions,
    marketPrices
  } = useInventoryData();
  
  if (!property) {
    return <PropertyNotFound />;
  }

  return (
    <div className="p-6 space-y-6">
      <PropertyHeader 
        propertyName={property.name} 
        propertyId={propertyId || ''} 
      />
      
      <InventoryTabs 
        resources={resources}
        resourceTypes={resourceTypes}
        transactions={transactions}
        marketPrices={marketPrices}
      />
    </div>
  );
};
