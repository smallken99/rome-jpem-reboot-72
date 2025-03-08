
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProfitabilityData } from '../../profitability/useProfitabilityData';
import { 
  getResourcesByPropertyId, 
  getResourceTypes, 
  marketPrices,
  getTransactionsByPropertyId
} from '../data';

export const useInventoryData = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const { profitableProperties } = useProfitabilityData();
  const [resourceTypeFilter, setResourceTypeFilter] = useState<string>('all');
  
  const property = profitableProperties.find(p => p.id.toString() === propertyId);
  const resources = propertyId ? getResourcesByPropertyId(propertyId) : [];
  const resourceTypes = getResourceTypes();
  const transactions = propertyId ? getTransactionsByPropertyId(propertyId) : [];
  
  return {
    propertyId,
    property,
    resources,
    resourceTypes,
    resourceTypeFilter,
    setResourceTypeFilter,
    transactions,
    marketPrices
  };
};
